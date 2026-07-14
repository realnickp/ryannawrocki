/**
 * One-time seed: creates the media bucket, admin users, and migrates the
 * static content (data/issues.ts, data/events.ts, News-page video lists).
 * Run:  SEED_ADMIN_PASSWORD='...' npx tsx scripts/seed.ts
 * Idempotent — upserts by slug/email; safe to re-run.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { issues } from "../data/issues";
import { events } from "../data/events";

// Minimal .env.local loader (no dotenv dependency).
for (const line of fs
  .readFileSync(path.join(__dirname, "..", ".env.local"), "utf8")
  .split("\n")) {
  const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
  if (m && m[1] && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const password = process.env.SEED_ADMIN_PASSWORD;
if (!url || !serviceKey) throw new Error("Missing Supabase env vars");
if (!password) throw new Error("Set SEED_ADMIN_PASSWORD when running the seed");

const db = createClient(url, serviceKey, { auth: { persistSession: false } });

const esc = (s: string) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const paragraphsToHtml = (paras: string[]) =>
  paras.map((p) => `<p>${esc(p)}</p>`).join("");

/** "On the Air" clips — copied verbatim from app/issues/page.tsx. */
const CLIPS: Array<{
  youtube_id: string;
  channel: string;
  date: string;
  title: string;
  no_embed?: boolean;
  start_seconds?: number;
}> = [
  { youtube_id: "_5idNwWCcwQ", channel: "FOX45", date: "2026-04-10", title: "Backing the BPD commissioner's criticism of juvenile ankle monitoring" },
  { youtube_id: "NnvIePnor8M", channel: "FOX45", date: "2026-04-08", title: "Juvenile records bill nears approval as IG-access proposal stalls in Annapolis" },
  { youtube_id: "pCAhCfvqtCU", channel: "FOX45", date: "2026-02-27", title: "Push for transparency: a bill to ensure Inspectors General can access documents" },
  { youtube_id: "bxmAKrhGvkA", channel: "WMAR-2", date: "2026-02-27", title: "Lawmakers want watchdogs to have better access to government records", no_embed: true },
  { youtube_id: "MQDoKcv3Fuc", channel: "WMAR-2", date: "2026-02-19", title: "Bipartisan push seeks Inspector General oversight of Baltimore County schools", no_embed: true },
  { youtube_id: "0yVEldwx6mI", channel: "FOX45", date: "2026-02-17", title: "Del. Ryan Nawrocki discusses a possible statewide Inspector General" },
  { youtube_id: "JhGwSsNoCdo", channel: "FOX45", date: "2026-02-10", title: "Face Off on energy issues with Del. Korman and Del. Nawrocki", start_seconds: 139 },
  { youtube_id: "fXZhEnxe_bM", channel: "FOX45", date: "2026-01-21", title: "Rep. Andy Harris calls Maryland's proposed congressional map 'unconstitutional'" },
  { youtube_id: "sx5dqbRV_ek", channel: "FOX45", date: "2026-01-09", title: "Maryland Freedom Caucus pushes for new laws to secure voter registration" },
  { youtube_id: "-v3-P7DXwqE", channel: "FOX45", date: "2025-03-25", title: "Maryland's budget woes — compared with thrifty neighbors Pennsylvania and Virginia" },
  { youtube_id: "3LgpHGINLU4", channel: "WBAL", date: "2025-01-23", title: "Del. Ryan Nawrocki talks the squatting issue with Baltimore housing" },
  { youtube_id: "KXnORzvxOyQ", channel: "FOX45", date: "2023-08-29", title: "Calling for a special hearing to investigate issues at the State Dept. of Education" },
];

/** "More Coverage" links — copied verbatim from app/issues/page.tsx. */
const COVERAGE = [
  { channel: "FOX45", title: "Del. Nawrocki's priorities ahead of the 2026 session", href: "https://foxbaltimore.com/fox45-mornings/del-nawrockis-priorities-ahead-of-2026-legislative-session" },
  { channel: "FOX45", title: "On the future of the Blueprint education plan (In Depth)", href: "https://foxbaltimore.com/fox45-in-depth/ryan-nawrocki-perspective-blueprint-plan-potential-changes" },
  { channel: "FOX45", title: "Lawmaker slams loopholes fueling the squatter underworld (Spotlight)", href: "https://foxbaltimore.com/news/local/maryland-lawmaker-slams-state-assembly-for-loopholes-fueling-squatter-placement-underworld" },
  { channel: "WJZ / CBS", title: "Proposed statewide Inspector General office", href: "https://www.cbsnews.com/baltimore/news/maryland-legislation-inspector-general-statewide-oversight/" },
  { channel: "WJZ / CBS", title: "GOP lawmakers call on Moore to halt energy taxes and fees", href: "https://www.cbsnews.com/baltimore/news/maryland-petition-energy-bills-taxes-fees-wes-moore/" },
  { channel: "WMAR-2", title: "Push back on plans to retire the A-10 'Warthogs'", href: "https://www.wmar2news.com/local/push-back-on-plans-to-retire-a-10-warthogs" },
  { channel: "WMAR-2", title: "Eastern Boulevard traffic-safety study community meeting", href: "https://www.wmar2news.com/news/region/baltimore-county/eastern-boulevard-traffic-safety-study-the-focus-of-a-community-meeting" },
];

/** Per-slug card crop positions — from app/issues/page.tsx cardPos. */
const COVER_POS: Record<string, string> = {
  "inspector-general-reform": "center 42%",
  "bcps-inspector-general-oversight": "center 50%",
  "middle-river-fire-station": "center 55%",
  "hb202-anti-squatters": "center 26%",
  "power-lines-and-brandon-shores": "center 18%",
  "war-on-drivers": "center 22%",
  "housing-expansion-act": "center 18%",
  "air-national-guard-flying-mission": "center 28%",
  "eastern-avenue-traffic": "center 30%",
};

async function main() {
  // 1. Storage bucket (public read; writes are service-role only).
  const { error: bucketErr } = await db.storage.createBucket("media", {
    public: true,
    fileSizeLimit: "10MB",
  });
  if (bucketErr && !/already exists/i.test(bucketErr.message)) throw bucketErr;
  console.log("bucket: ok");

  // 2. Admin users.
  const hash = await bcrypt.hash(password!, 12);
  for (const [email, name] of [
    ["ryan@ryannawrocki.com", "Ryan Nawrocki"],
    ["realnickpatrick@gmail.com", "Nick Patrick"],
  ] as const) {
    const { error } = await db
      .from("admin_users")
      .upsert({ email, name, password_hash: hash }, { onConflict: "email" });
    if (error) throw error;
  }
  console.log("admin users: 2 upserted");

  // 3. Posts from data/issues.ts (dates like "2026-02" get day 01).
  for (const i of issues) {
    const date = /^\d{4}-\d{2}$/.test(i.date ?? "")
      ? `${i.date}-01`
      : (i.date ?? "2026-01-01");
    const { error } = await db.from("posts").upsert(
      {
        slug: i.slug, title: i.title, topic: i.topic, status: "published",
        featured: i.slug === "inspector-general-reform", date,
        author: i.author ?? "Delegate Ryan Nawrocki",
        excerpt: i.excerpt, dek: i.dek ?? null,
        body_html: paragraphsToHtml(i.body),
        cover_image: i.image?.src ?? null, cover_alt: i.image?.alt ?? null,
        cover_position: COVER_POS[i.slug] ?? null,
        read_time: i.readTime ?? null, key_points: i.keyPoints ?? null,
        pull_quote: i.pullQuote ?? null, links: i.links ?? null,
        sources: i.sources ?? null,
      },
      { onConflict: "slug" },
    );
    if (error) throw new Error(`post ${i.slug}: ${error.message}`);
  }
  console.log(`posts: ${issues.length} upserted`);

  // 4. Events from data/events.ts.
  for (const e of events) {
    const { error } = await db.from("events").upsert(
      {
        slug: e.slug, title: e.title, type: e.type, status: "published",
        featured: e.featured ?? false, date: e.date, time: e.time ?? null,
        venue: e.venue, address: e.address, summary: e.summary,
        contributions: e.contributions ?? null,
        sponsor_levels: e.sponsorLevels ?? null,
        rsvp_url: e.rsvpUrl ?? null, rsvp_by: e.rsvpBy ?? null,
        contact: e.contact ?? null,
      },
      { onConflict: "slug" },
    );
    if (error) throw new Error(`event ${e.slug}: ${error.message}`);
  }
  console.log(`events: ${events.length} upserted`);

  // 5. Videos — delete-and-reinsert (no natural unique key).
  await db.from("videos").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  for (const c of CLIPS) {
    const { error } = await db.from("videos").insert({
      kind: "clip", youtube_id: c.youtube_id, channel: c.channel,
      title: c.title, date: c.date, no_embed: c.no_embed ?? false,
      start_seconds: c.start_seconds ?? null, status: "published",
    });
    if (error) throw error;
  }
  for (const l of COVERAGE) {
    const { error } = await db.from("videos").insert({
      kind: "link", channel: l.channel, title: l.title, href: l.href,
      status: "published",
    });
    if (error) throw error;
  }
  console.log(`videos: ${CLIPS.length} clips + ${COVERAGE.length} links inserted`);
}

main().then(() => console.log("SEED COMPLETE"));
