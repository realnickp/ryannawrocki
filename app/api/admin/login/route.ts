import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { verifyPassword, DUMMY_HASH } from "@/lib/auth/password";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/session";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(200),
});
const GENERIC = { error: "Invalid email or password." };
const MAX_ATTEMPTS = 8;
const LOCK_MINUTES = 15;

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json(GENERIC, { status: 400 });

  const email = parsed.data.email.trim().toLowerCase();
  const db = supabaseAdmin();
  const { data: user } = await db
    .from("admin_users")
    .select("id, email, password_hash, failed_attempts, locked_until")
    .eq("email", email)
    .maybeSingle();

  if (!user) {
    await verifyPassword(parsed.data.password, DUMMY_HASH); // equalize timing
    return NextResponse.json(GENERIC, { status: 401 });
  }

  if (user.locked_until && new Date(user.locked_until) > new Date()) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a few minutes." },
      { status: 429 },
    );
  }

  const ok = await verifyPassword(parsed.data.password, user.password_hash);
  if (!ok) {
    const attempts = (user.failed_attempts ?? 0) + 1;
    const lock = attempts >= MAX_ATTEMPTS;
    await db
      .from("admin_users")
      .update({
        failed_attempts: lock ? 0 : attempts,
        locked_until: lock
          ? new Date(Date.now() + LOCK_MINUTES * 60_000).toISOString()
          : null,
      })
      .eq("id", user.id);
    return NextResponse.json(GENERIC, { status: 401 });
  }

  await db
    .from("admin_users")
    .update({ failed_attempts: 0, locked_until: null })
    .eq("id", user.id);

  const token = await createSessionToken({ sub: user.id, email: user.email });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return res;
}
