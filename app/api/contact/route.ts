import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/data/site";

// Mirrors what components/ContactForm.tsx submits — keep the two in sync.
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().max(30).optional().or(z.literal("")),
  topic: z.string().min(1),
  message: z.string().min(20),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const { name, email, phone, topic, message } = parsed.data;

  const key = process.env.RESEND_API_KEY;
  // In dev (no key configured), log and succeed so the UI can be exercised.
  if (!key) {
    console.info("[contact] dev-mode submission", parsed.data);
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(key);
  try {
    // The SDK reports API rejections via `error`, not by throwing.
    const { error } = await resend.emails.send({
      // Must be an address on a Resend-verified domain; we have no DNS access
      // to ryannawrocki.com, so we send from the agency's verified domain.
      from:
        process.env.RESEND_FROM ??
        "Ryan Nawrocki Website <nawrocki-site@legacylinqdigital.com>",
      to: [process.env.CONTACT_NOTIFY_EMAIL ?? site.officeEmail],
      replyTo: email,
      subject: `[Site] ${topic} — ${name}`,
      text: [
        `From: ${name} <${email}>`,
        phone ? `Phone: ${phone}` : null,
        `Topic: ${topic}`,
        "",
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });
    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json({ error: "Send failed" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] resend error", e);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
