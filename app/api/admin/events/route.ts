import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { eventInputSchema, eventInputToRow } from "@/lib/cms/types";
import { revalidateContent } from "@/lib/cms/revalidate";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin()
    .from("events")
    .select("*")
    .order("date", { ascending: false });
  if (error) return NextResponse.json({ error: "Database error" }, { status: 500 });
  return NextResponse.json({ events: data });
}

export async function POST(req: Request) {
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
  const { data, error } = await supabaseAdmin()
    .from("events")
    .insert(eventInputToRow(parsed.data))
    .select("id")
    .single();
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }
    console.error("[events:create]", error.message);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
  revalidateContent("events");
  return NextResponse.json({ id: data.id });
}
