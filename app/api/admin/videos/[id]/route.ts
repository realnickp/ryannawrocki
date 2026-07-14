import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSession } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidateContent } from "@/lib/cms/revalidate";

export const runtime = "nodejs";

type Ctx = { params: { id: string } };

const patchSchema = z.object({
  title: z.string().min(1).max(300).optional(),
  channel: z.string().max(60).nullish(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullish(),
  noEmbed: z.boolean().optional(),
});

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const p = parsed.data;
  const row: Record<string, unknown> = {};
  if (p.title !== undefined) row.title = p.title;
  if (p.channel !== undefined) row.channel = p.channel;
  if (p.date !== undefined) row.date = p.date;
  if (p.noEmbed !== undefined) row.no_embed = p.noEmbed;
  const { error, count } = await supabaseAdmin()
    .from("videos")
    .update(row, { count: "exact" })
    .eq("id", params.id);
  if (error) return NextResponse.json({ error: "Database error" }, { status: 500 });
  if (count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidateContent("videos");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { error } = await supabaseAdmin().from("videos").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: "Database error" }, { status: 500 });
  revalidateContent("videos");
  return NextResponse.json({ ok: true });
}
