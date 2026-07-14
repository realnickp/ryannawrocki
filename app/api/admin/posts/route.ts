import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { postInputSchema, postInputToRow, friendlyIssue } from "@/lib/cms/types";
import { sanitizeBodyHtml } from "@/lib/cms/sanitize";
import { revalidateContent } from "@/lib/cms/revalidate";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin()
    .from("posts")
    .select("*")
    .order("date", { ascending: false });
  if (error) return NextResponse.json({ error: "Database error" }, { status: 500 });
  return NextResponse.json({ posts: data });
}

export async function POST(req: Request) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = postInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { error: issue ? friendlyIssue(issue) : "Please check the form and try again." },
      { status: 400 },
    );
  }
  const row = postInputToRow({
    ...parsed.data,
    bodyHtml: sanitizeBodyHtml(parsed.data.bodyHtml),
  });
  const { data, error } = await supabaseAdmin()
    .from("posts")
    .insert(row)
    .select("id, slug")
    .single();
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }
    console.error("[posts:create]", error.message);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
  revalidateContent("posts", data.slug);
  return NextResponse.json({ id: data.id });
}
