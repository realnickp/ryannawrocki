# Contact Form Email Delivery — Design

**Date:** 2026-07-17
**Status:** Approved (simplified per client 2026-07-17: email-only)

## Problem

The contact form posts to `app/api/contact/route.ts`, which sends via Resend
from `no-reply@ryannawrocki.com`. We have no DNS access to ryannawrocki.com, so
that domain can never be verified and sends fail. Requirements:

- **Free.** No new paid services.
- **Reliable inbox placement.** Notifications must land in the recipient's
  primary inbox — not spam, not Promotions — every time.
- **Testing phase:** notifications go to `realnickpatrick@gmail.com`; after
  verification, cut over to `ryan@ryannawrocki.com` with no code change.

## Decision

Email-only via Resend, sending from the agency's already-verified domain:
`Ryan Nawrocki Website <nawrocki-site@legacylinqdigital.com>` (verified in
Resend since 2026-01-27, sending enabled). Authenticated SPF/DKIM sending from
a verified domain is what guarantees deliverability — DNS on the *sending*
domain is sufficient; ryannawrocki.com is never involved. `replyTo` is the
visitor, so Ryan answers a constituent by hitting Reply. Plain-text body with
every form field (name, email, ZIP, topic, message), single recipient, no
links/images — the profile Gmail classifies as personal correspondence, not
Promotions.

CRM capture is explicitly out of scope: the site's Constant Contact signup
handles list-building separately. GHL integration and a Supabase submission
log were considered and dropped as unneeded complexity; either can be added
later without touching this design.

## Implementation

`app/api/contact/route.ts` keeps its zod validation and dev-mode fallback
(no key → log and succeed). Changes:

- `from`: `RESEND_FROM` env var, defaulting to the verified agency address.
- `to`: `CONTACT_NOTIFY_EMAIL` env var, defaulting to `site.officeEmail`.

Env vars live in `.env.local` (gitignored) and the hosting environment:
`RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_NOTIFY_EMAIL`.

## Testing & cutover

1. Submit the form (or POST to the route) locally with real keys; confirm the
   email arrives in `realnickpatrick@gmail.com` **Primary** tab with all five
   fields and working Reply-To.
2. Deploy env vars to hosting; retest in production.
3. Cutover: set `CONTACT_NOTIFY_EMAIL=ryan@ryannawrocki.com`. Recommend a
   one-time filter on Ryan's mailbox for `nawrocki-site@legacylinqdigital.com`
   → "never send to spam" — makes inbox placement deterministic.

## Security notes

- The Resend API key was shared in chat during planning — rotate it in the
  Resend dashboard after go-live and update envs.
- Keys live only in `.env.local` / hosting env; never committed.
