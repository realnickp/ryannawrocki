import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/data/site";
import { parseRecipients } from "@/lib/contact";

// Mirrors what components/ContactForm.tsx submits — keep the two in sync.
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().max(30).optional().or(z.literal("")),
  topic: z.string().min(1),
  message: z.string().min(20),
  // Bot traps: `company` is an off-screen honeypot humans never see;
  // `elapsedMs` is how long the visitor had the form open before submitting.
  company: z.string().optional(),
  elapsedMs: z.number().optional(),
});

// No human completes name + email + subject + a 20-char message this fast.
const MIN_FILL_MS = 4000;

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const { name, email, phone, topic, message, company, elapsedMs } =
    parsed.data;

  // Filled honeypot, missing timing (direct POST), or an impossibly fast
  // fill all mean a bot. Fake success so it doesn't learn and retry.
  if (company || typeof elapsedMs !== "number" || elapsedMs < MIN_FILL_MS) {
    console.warn("[contact] flagged suspected bot submission", {
      email,
      elapsedMs,
      honeypotFilled: Boolean(company),
    });
    return NextResponse.json({ ok: true });
  }

  // `|| fallback` (not ??) everywhere below: a var saved as an empty string
  // in Vercel must behave like an unset var, not get sent to Resend.
  const key = process.env.RESEND_API_KEY?.trim();
  // In dev (no key configured), log and succeed so the UI can be exercised.
  if (!key) {
    console.info("[contact] dev-mode submission", parsed.data);
    return NextResponse.json({ ok: true });
  }

  const recipients = parseRecipients(process.env.CONTACT_NOTIFY_EMAIL);

  const resend = new Resend(key);
  try {
    // The SDK reports API rejections via `error`, not by throwing.
    const { error } = await resend.emails.send({
      // Must be an address on a Resend-verified domain; we have no DNS access
      // to ryannawrocki.com, so we send from the agency's verified domain.
      from:
        process.env.RESEND_FROM?.trim() ||
        "Ryan Nawrocki Website <nawrocki-site@legacylinqdigital.com>",
      to: recipients.length ? recipients : [site.officeEmail],
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
