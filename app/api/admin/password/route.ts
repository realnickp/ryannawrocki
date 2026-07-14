import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSession } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

export const runtime = "nodejs";

const schema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z.string().min(10, "New password must be at least 10 characters").max(200),
});

export async function POST(req: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }
  const db = supabaseAdmin();
  const { data: user } = await db
    .from("admin_users")
    .select("id, password_hash")
    .eq("id", session.sub)
    .maybeSingle();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!(await verifyPassword(parsed.data.currentPassword, user.password_hash))) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
  }
  const { error } = await db
    .from("admin_users")
    .update({ password_hash: await hashPassword(parsed.data.newPassword) })
    .eq("id", user.id);
  if (error) return NextResponse.json({ error: "Database error" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
