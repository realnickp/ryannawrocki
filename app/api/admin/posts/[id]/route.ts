import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { postInputSchema, postInputToRow } from "@/lib/cms/types";
import { sanitizeBodyHtml } from "@/lib/cms/sanitize";
import { revalidateContent } from "@/lib/cms/revalidate";

export const runtime = "nodejs";

type Ctx = { params: { id: string } };

export async function GET(_req: Request, { params }: Ctx) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin()
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: "Database error" }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post: data });
}

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = postInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { error: `${issue?.path.join(".")}: ${issue?.message}` },
      { status: 400 },
    );
  }
  const db = supabaseAdmin();
  const { data: existing } = await db
    .from("posts")
    .select("slug")
    .eq("id", params.id)
    .maybeSingle();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const row = postInputToRow({
    ...parsed.data,
    bodyHtml: sanitizeBodyHtml(parsed.data.bodyHtml),
  });
  const { error } = await db.from("posts").update(row).eq("id", params.id);
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }
    console.error("[posts:update]", error.message);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
  revalidateContent("posts", parsed.data.slug);
  if (existing.slug !== parsed.data.slug) revalidateContent("posts", existing.slug);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = supabaseAdmin();
  const { data: existing } = await db
    .from("posts")
    .select("slug")
    .eq("id", params.id)
    .maybeSingle();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { error } = await db.from("posts").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: "Database error" }, { status: 500 });
  revalidateContent("posts", existing.slug);
  return NextResponse.json({ ok: true });
}
