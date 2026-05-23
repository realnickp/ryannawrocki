import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/data/site";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  zip: z.string().min(5).max(10),
  topic: z.string().min(1),
  message: z.string().min(20),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const { name, email, zip, topic, message } = parsed.data;

  const key = process.env.RESEND_API_KEY;
  // In dev (no key configured), log and succeed so the UI can be exercised.
  if (!key) {
    console.info("[contact] dev-mode submission", parsed.data);
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(key);
  try {
    await resend.emails.send({
      from: "Friends of Ryan Nawrocki <no-reply@ryannawrocki.com>",
      to: [site.officeEmail],
      replyTo: email,
      subject: `[Site] ${topic} — ${name} (${zip})`,
      text: `From: ${name} <${email}>\nZIP: ${zip}\nTopic: ${topic}\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] resend error", e);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
