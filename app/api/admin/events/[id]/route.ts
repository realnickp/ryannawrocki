import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { eventInputSchema, eventInputToRow } from "@/lib/cms/types";
import { revalidateContent } from "@/lib/cms/revalidate";

export const runtime = "nodejs";

type Ctx = { params: { id: string } };

export async function GET(_req: Request, { params }: Ctx) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin()
    .from("events")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: "Database error" }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ event: data });
}

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = eventInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { error: `${issue?.path.join(".")}: ${issue?.message}` },
      { status: 400 },
    );
  }
  const { error, count } = await supabaseAdmin()
    .from("events")
    .update(eventInputToRow(parsed.data), { count: "exact" })
    .eq("id", params.id);
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }
    console.error("[events:update]", error.message);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
  if (count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidateContent("events");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { error } = await supabaseAdmin().from("events").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: "Database error" }, { status: 500 });
  revalidateContent("events");
  return NextResponse.json({ ok: true });
}
