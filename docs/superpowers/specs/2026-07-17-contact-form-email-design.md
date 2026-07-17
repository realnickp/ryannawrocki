# Contact Form Email Delivery — Design

**Date:** 2026-07-17
**Status:** Approved pending user review

## Problem

The contact form posts to `app/api/contact/route.ts`, which sends via Resend from
`no-reply@ryannawrocki.com`. We have no DNS access to ryannawrocki.com, so that
domain can never be verified and sends fail. Requirements:

- **Free.** No new paid services.
- **Reliable inbox placement.** Notifications must land in the recipient's
  primary inbox — not spam, not Promotions — every time.
- **Testing phase:** notifications go to `realnickpatrick@gmail.com`; after
  verification, cut over to `ryan@ryannawrocki.com` with no code change.

## Decision

Hybrid, three sinks per submission — each service doing what it's best at:

1. **Resend sends the notification email** from the agency's already-verified
   domain: `Ryan Nawrocki Website <nawrocki-site@legacylinqdigital.com>`
   (verified in Resend since 2026-01-27, sending enabled, us-east-1).
   Authenticated SPF/DKIM sending is what guarantees deliverability — DNS on
   the *sending* domain is sufficient; ryannawrocki.com is never involved.
   `replyTo` is set to the visitor, so Ryan answers constituents by hitting
   Reply. Plain-text body, single recipient, no links/images — the profile
   Gmail classifies as personal correspondence, not Promotions.
2. **GoHighLevel upserts the visitor as a contact** in Ryan's subaccount
   (`Q9AVDiXAlZYaapHu08OL`): name, email, ZIP → `postalCode`, custom fields
   `website_topic` + `website_message`, tag `website-contact`. The constituent
   CRM builds itself. No GHL workflow and no GHL email sending — GHL's shared
   sending domain couldn't meet the deliverability bar, and workflows can't be
   created via API anyway.
3. **Supabase logs the submission** to a `contact_submissions` table as a
   durable backup. Nothing is lost if either external API fails.

Alternatives considered: GHL-only (embed or tag→workflow email) — rejected
because shared-domain deliverability is not guaranteed and workflow creation is
UI-only; Gmail SMTP — rejected as janky long-term; Web3Forms/FormSubmit —
rejected (third party holding constituent messages, no CRM).

## Components

### API route (`app/api/contact/route.ts`)

Existing zod validation and dev-mode fallback (no keys → log and succeed) are
kept. After validation, the route runs Resend and GHL concurrently
(`Promise.allSettled`), then writes the Supabase row with their outcome flags.
Each sink is guarded by its env vars being present:

- Resend send → recipient `CONTACT_NOTIFY_EMAIL`, from `RESEND_FROM`,
  `replyTo` visitor, subject `[Site] {topic} — {name} ({zip})`.
- GHL upsert → `POST https://services.leadconnectorhq.com/contacts/upsert`
  with `GHL_PIT_TOKEN` + `GHL_LOCATION_ID`. Skipped (logged) until the token
  is configured.
- Supabase insert → service-role client, `contact_submissions` row including
  per-sink success flags (`email_sent`, `ghl_synced`).

**Response policy:** 200 if at least one sink succeeded (the message is
somewhere we can act on); 500 only if all sinks failed, so the visitor sees the
form's error state and can retry. Sink failures are `console.error`'d for
hosting logs.

### Supabase (`contact_submissions`)

`id uuid pk`, `created_at timestamptz default now()`, `name`, `email`, `zip`,
`topic`, `message` (text), `email_sent bool`, `ghl_synced bool`. RLS enabled
with no anon policies — service-role access only. Migration lives with the
existing CMS migrations in `supabase/`. Admin UI for browsing submissions is
out of scope (GHL is the working view).

### GHL setup (one-time, via REST with the PIT)

Create contact custom fields `website_topic` and `website_message` in Ryan's
subaccount, then a test upsert to confirm scopes. No workflows, no UI steps.

### Environment variables

`RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_NOTIFY_EMAIL`, `GHL_PIT_TOKEN`,
`GHL_LOCATION_ID` — set in `.env.local` (gitignored) and the hosting
environment. Existing Supabase vars are reused.

## Prerequisites (user)

- Private Integration token from Ryan's subaccount (Settings → Private
  Integrations; contacts write + custom fields write scopes) → `GHL_PIT_TOKEN`.

## Testing & cutover

1. Local: submit the real form; confirm email arrives in
   `realnickpatrick@gmail.com` **Primary** tab, contact appears in Ryan's GHL
   subaccount with tag/fields, Supabase row written.
2. Repeat-submission test: same email twice → GHL upserts (no duplicate),
   both submissions emailed and logged.
3. Deploy env vars to hosting; retest in production.
4. Cutover: set `CONTACT_NOTIFY_EMAIL=ryan@ryannawrocki.com`. Recommend a
   one-time Gmail/mailbox filter on Ryan's account for
   `nawrocki-site@legacylinqdigital.com` → "never send to spam" — makes inbox
   placement deterministic.

## Security notes

- The Resend API key was shared in chat during planning — rotate it in the
  Resend dashboard after go-live and update envs.
- Keys live only in `.env.local` / hosting env; never committed. Route is
  server-only; nothing new is exposed to the browser.
