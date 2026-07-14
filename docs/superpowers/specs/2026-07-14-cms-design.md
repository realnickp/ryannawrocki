# CMS for News/Updates, Events, and Media — Design

**Date:** 2026-07-14
**Status:** Approved approach (Supabase + in-app admin); spec pending final review
**Owners:** Nick (realnickpatrick@gmail.com), Ryan (ryan@ryannawrocki.com)

## 1. Goal

Let Ryan publish and edit News/Updates posts and Events himself — including image
uploads, rich text (bold/italic/underline, headings, lists, links), and embedded
video (YouTube/Vimeo/Rumble links) — plus manage the News page's "On the Air"
video clips and "More Coverage" links. Admin access is restricted to exactly two
accounts. Nothing unpublished is publicly readable — enforced at the database,
not just the UI.

Out of scope (explicitly): video *file* uploads (embeds only), public comments,
more than two admin users, editing any other page of the site.

## 2. Architecture

- **Host:** existing Next.js 14 App Router app on Vercel (unchanged).
- **Database:** Supabase Postgres (project `mqvxwhdiptxwwnhueqda`).
- **Media:** Supabase Storage, single `media` bucket (public-read files,
  server-only writes).
- **Admin:** `/admin` routes inside this app, gated by middleware + session
  cookie. Rich text via **TipTap**.
- **Auth:** custom minimal email+password auth (two seeded users, bcrypt
  hashes), session = HMAC-signed token (jose) in an httpOnly secure cookie.
  We do NOT use Supabase Auth — no public signup surface at all.
- **Reads (public site):** server components using the **anon key**; RLS
  guarantees only published rows are visible.
- **Writes (admin):** server-only API routes using the **service_role key**
  after session verification. The service key never reaches the browser.

### Environment variables (in `.env.local`, mirrored to Vercel)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public-safe.
- `SUPABASE_SERVICE_ROLE_KEY` — server-only.
- `SESSION_SECRET` — server-only, signs session tokens.

## 3. Data model

All tables have RLS **enabled**. Anon policies are read-only and filtered to
published content. There are **no** insert/update/delete policies — writes go
through the service role only (which bypasses RLS by design).

### `posts` (News & Updates)
| column | type | notes |
|---|---|---|
| id | uuid pk default gen_random_uuid() | |
| slug | text unique not null | auto from title, editable |
| title | text not null | |
| topic | text not null | category chip, e.g. "Public Safety" |
| status | text not null default 'draft' | 'draft' \| 'published' |
| featured | boolean default false | featured slot on /issues |
| date | date not null | display date |
| author | text default 'Delegate Ryan Nawrocki' | |
| excerpt | text | card text |
| dek | text | article subtitle |
| body_html | text not null | sanitized TipTap HTML |
| cover_image | text | URL in media bucket |
| cover_position | text | CSS object-position |
| read_time | text | e.g. "4 min read" |
| key_points | jsonb | string[] ("Where Ryan Stands") |
| pull_quote | text | |
| sources | jsonb | {label, href, publisher}[] |
| created_at / updated_at | timestamptz | |

Anon RLS: `SELECT ... WHERE status = 'published'`.

### `events`
Mirrors `data/events.ts` `EventItem`: id, slug, title, type
('fundraiser'|'town-hall'|'community'|'volunteer'), status, featured, date
(ISO), time, venue, address, summary, contributions jsonb (string[]),
sponsor_levels jsonb, rsvp_url, rsvp_by, contact jsonb ({name, phone, email}),
timestamps. Anon RLS: published only.

### `videos` (News page "On the Air" + "More Coverage")
| column | type | notes |
|---|---|---|
| id | uuid pk | |
| kind | text not null | 'clip' (YouTube embed) \| 'link' (external article/segment) |
| youtube_id | text | for clips |
| channel | text | e.g. FOX45 |
| title | text not null | |
| date | date | sort key |
| no_embed | boolean default false | fall back to YouTube link |
| start_seconds | int | optional embed start |
| href | text | for kind='link' |
| status | text default 'published' | |

Anon RLS: published only.

### `admin_users`
id, email (text unique, always stored lowercased), password_hash (bcrypt,
cost 12), name,
failed_attempts int, locked_until timestamptz, created_at. **No anon policies
at all** — this table is invisible to the anon key.

Seeded with exactly `ryan@ryannawrocki.com` and `realnickpatrick@gmail.com`.
The initial password is supplied at seed time via env var — never committed.
Each user can change their own password in the admin UI. (The initial password
was shared in chat → treat as exposed; both users should change it after
first login.)

### Storage
Bucket `media`, public read. Storage RLS: no anon/authenticated write policies;
uploads happen server-side via service role. Object keys:
`posts/<uuid>.<ext>` — unguessable, unlinked until published.

## 4. Auth & security model

- **Login:** POST `/api/admin/login` — bcrypt compare; on success set
  `admin_session` cookie: HMAC-SHA256-signed token (jose `SignJWT`), httpOnly,
  Secure, SameSite=Lax, 7-day expiry. Constant-time comparisons; identical
  error message for unknown email vs. wrong password.
- **Brute force:** per-user `failed_attempts`; ≥8 failures locks the account
  for 15 minutes (`locked_until`). Attempt counters reset on success.
- **Gate:** `middleware.ts` protects `/admin/**` (except `/admin/login`) and
  every `/api/admin/**` route — verifies the signed cookie; invalid/absent →
  redirect to login (pages) or 401 (APIs).
- **Defense in depth:** every `/api/admin/**` handler ALSO re-verifies the
  session server-side (middleware is not the only wall).
- **CSRF:** admin mutations require a custom header (`x-admin-csrf: 1`) —
  cross-origin forms can't set custom headers; combined with SameSite=Lax
  cookies this blocks CSRF without a token dance.
- **XSS:** TipTap HTML is sanitized **server-side on save** (`sanitize-html`)
  with a strict allowlist: p, h2–h4, strong, em, u, s, a[href http/https],
  ul/ol/li, blockquote, img[src from our media bucket], figure/figcaption,
  and iframe restricted to youtube.com/youtube-nocookie.com/player.vimeo.com/
  rumble.com embed URLs. Sanitized again defensively at render.
- **Uploads:** server route checks session → MIME sniff (magic bytes, not
  filename) → images only (jpeg/png/webp) → ≤8 MB → re-encode via `sharp`
  (strips EXIF/GPS, caps at 2400px) → upload with service role.
- **Secrets hygiene:** `.env.local` git-ignored (verified); service key +
  SESSION_SECRET server-only. After launch, rotate the service_role key in
  Supabase dashboard (it was pasted in chat) and update Vercel env.
- **Headers:** `/admin/**` responses get `X-Robots-Tag: noindex, nofollow`;
  admin routes excluded from `sitemap.ts`.

## 5. Admin UI (`/admin`, styled with the site's design system)

- `/admin/login` — email + password.
- `/admin` — dashboard: two tabs/lists (Posts, Events) with status chips,
  edit/delete, "New Post" / "New Event" buttons; link to Videos manager and
  Account (change password).
- `/admin/posts/[id]` — post editor:
  - Fields: title, topic (select w/ free entry), date, excerpt, dek, cover
    image (upload w/ preview + focal position select), featured toggle,
    read time (auto-estimated, editable).
  - **TipTap body editor** with toolbar: paragraph/H2/H3, bold, italic,
    underline, strikethrough, link, bulleted/numbered list, blockquote,
    image upload (inserts uploaded image), video embed (paste URL dialog →
    iframe embed), undo/redo.
  - Advanced (collapsed): key points (repeatable text rows), pull quote,
    sources (repeatable label+URL+publisher rows).
  - Actions: Save draft, Publish/Unpublish, Preview (renders the article
    template with draft content, admin-only), Delete (confirm).
- `/admin/events/[id]` — event form mirroring all event fields; Save draft /
  Publish / Delete.
- `/admin/videos` — list + add/remove/edit "On the Air" clips (paste YouTube
  URL → we extract the ID, fetch title/channel via YouTube oEmbed as a
  convenience, editable) and "More Coverage" links (station, label, URL).
- `/admin/account` — change your own password (requires current password).

## 6. Public site integration

- `app/issues/page.tsx`, `app/issues/[slug]/page.tsx`, `app/events/page.tsx`,
  and the homepage "Latest Updates" strip read from Supabase (anon key)
  instead of `data/issues.ts` / `data/events.ts`.
- Rendering: article body renders sanitized `body_html` through the existing
  `.article-body` styles; keyPoints/pullQuote/sources render exactly as today
  when present.
- **Caching:** pages use tag-based ISR (`revalidateTag('posts')` /
  `('events')` / `('videos')` fired by the admin API on any write) plus a
  60-second `revalidate` safety net. Publish → live within seconds.
- `sitemap.ts` builds `/issues/<slug>` entries from published posts.
- The old static files remain in the repo only as seed input; after migration
  the pages no longer import them.

## 7. Migration / seeding

One-time script `scripts/seed.ts` (run locally, service key from env):
1. Create tables + RLS policies (SQL migration file, run via Supabase SQL
   editor or the script).
2. Import the 9 posts from `data/issues.ts` (convert body paragraphs →
   `body_html`), events from `data/events.ts`, videos + coverage links from
   `app/issues/page.tsx`.
3. Create the two admin users (bcrypt hash of `SEED_ADMIN_PASSWORD` env var).
4. Idempotent: safe to re-run (upserts by slug/email).

## 8. Error handling

- All admin APIs: zod-validated input → 400 with field errors; auth failure →
  401; not found → 404; Supabase errors → 500 with generic message (details
  server-logged only).
- Public pages: if Supabase is unreachable at request time, ISR serves the
  last cached version (fail-open on reads); a fresh build with Supabase down
  fails the build loudly rather than shipping empty pages.
- Editor: autosave draft to localStorage every 10s so a dropped session
  doesn't lose writing; unsaved-changes warning on navigation.

## 9. Testing / verification

- `tsc --noEmit` + `next build` clean.
- Manual E2E via browser: login (wrong + right password), lockout after 8
  failures, create draft w/ image upload + video embed, verify draft is NOT
  on public /issues (and not readable via anon REST query — curl check),
  publish, verify live + sitemap, edit, unpublish, delete; events same;
  videos manager add/remove; change password; logout.
- Security spot-checks: anon REST query for drafts returns empty; anon
  insert/update rejected; `/api/admin/*` without cookie → 401; upload
  rejects non-image and >8MB; sanitizer strips `<script>` and rogue iframes.

## 10. Rollout

1. Nick imports `.env.local` into Vercel env vars (all environments).
2. Run SQL migration + seed against Supabase.
3. Deploy; verify on production.
4. Rotate the service_role key (dashboard) and update Vercel + `.env.local`;
   both admins change their passwords.
