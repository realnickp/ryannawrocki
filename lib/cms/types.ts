import { z } from "zod";

/* ── utils ─────────────────────────────────────────────── */

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

/** Split serialized HTML after the nth top-level closing </p>. */
export function splitHtmlAfterParagraphs(html: string, n: number): [string, string] {
  let idx = -1;
  for (let i = 0; i < n; i++) {
    idx = html.indexOf("</p>", idx + 1);
    if (idx === -1) return [html, ""];
  }
  const cut = idx + "</p>".length;
  return [html.slice(0, cut), html.slice(cut)];
}

/* ── zod input schemas (camelCase, what the admin UI sends) ───────── */

const dateStr = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");
const slugStr = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase-with-hyphens")
  .min(3)
  .max(120);
const emptyToNull = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === "" ? null : v), schema.nullish());

export const postInputSchema = z.object({
  title: z.string().min(3).max(200),
  slug: slugStr,
  topic: z.string().min(2).max(60),
  status: z.enum(["draft", "published"]),
  featured: z.boolean().default(false),
  date: dateStr,
  author: z.string().min(2).max(80).default("Delegate Ryan Nawrocki"),
  excerpt: emptyToNull(z.string().max(600)),
  dek: emptyToNull(z.string().max(600)),
  bodyHtml: z.string().min(1).max(200_000),
  coverImage: emptyToNull(z.string().url()),
  coverAlt: emptyToNull(z.string().max(250)),
  coverPosition: emptyToNull(z.string().max(40)),
  readTime: emptyToNull(z.string().max(30)),
  keyPoints: z.array(z.string().min(1).max(400)).max(12).nullish(),
  pullQuote: emptyToNull(z.string().max(500)),
  links: z
    .array(z.object({ label: z.string().min(1).max(200), href: z.string().url() }))
    .max(12)
    .nullish(),
  sources: z
    .array(
      z.object({
        label: z.string().min(1).max(300),
        href: z.string().url(),
        publisher: emptyToNull(z.string().max(120)),
      }),
    )
    .max(20)
    .nullish(),
});
export type PostInput = z.infer<typeof postInputSchema>;

export const eventInputSchema = z.object({
  title: z.string().min(3).max(200),
  slug: slugStr,
  type: z.enum(["fundraiser", "town-hall", "community", "volunteer"]),
  status: z.enum(["draft", "published"]),
  featured: z.boolean().default(false),
  date: dateStr,
  time: emptyToNull(z.string().max(80)),
  venue: z.string().min(2).max(200),
  address: z.string().min(2).max(300),
  summary: z.string().min(2).max(2000),
  contributions: z.array(z.string().min(1).max(120)).max(10).nullish(),
  sponsorLevels: z.array(z.string().min(1).max(120)).max(10).nullish(),
  rsvpUrl: emptyToNull(z.string().url()),
  rsvpBy: emptyToNull(z.string().max(60)),
  contact: z
    .object({
      name: emptyToNull(z.string().max(120)),
      email: emptyToNull(z.string().email()),
      phone: emptyToNull(z.string().max(40)),
    })
    .nullish(),
});
export type EventInput = z.infer<typeof eventInputSchema>;

export const videoInputSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("clip"),
    url: z.string().url(), // any YouTube URL; ID extracted server-side
    title: z.string().max(300).default(""),
    channel: emptyToNull(z.string().max(60)),
    date: emptyToNull(dateStr),
    noEmbed: z.boolean().default(false),
    startSeconds: z.number().int().min(0).max(86_400).nullish(),
  }),
  z.object({
    kind: z.literal("link"),
    href: z.string().url(),
    title: z.string().min(3).max(300),
    channel: z.string().min(1).max(60), // station label, e.g. "FOX45"
    date: emptyToNull(dateStr),
  }),
]);
export type VideoInput = z.infer<typeof videoInputSchema>;

/* ── DB row types (snake_case — must match supabase/migration.sql) ── */

export type PostRow = {
  id: string; slug: string; title: string; topic: string;
  status: "draft" | "published"; featured: boolean; date: string;
  author: string; excerpt: string | null; dek: string | null;
  body_html: string; cover_image: string | null; cover_alt: string | null;
  cover_position: string | null; read_time: string | null;
  key_points: string[] | null; pull_quote: string | null;
  links: { label: string; href: string }[] | null;
  sources: { label: string; href: string; publisher?: string | null }[] | null;
  created_at: string; updated_at: string;
};

export type EventRow = {
  id: string; slug: string; title: string;
  type: "fundraiser" | "town-hall" | "community" | "volunteer";
  status: "draft" | "published"; featured: boolean; date: string;
  time: string | null; venue: string; address: string; summary: string;
  contributions: string[] | null; sponsor_levels: string[] | null;
  rsvp_url: string | null; rsvp_by: string | null;
  contact: { name?: string | null; email?: string | null; phone?: string | null } | null;
  created_at: string; updated_at: string;
};

export type VideoRow = {
  id: string; kind: "clip" | "link"; youtube_id: string | null;
  channel: string | null; title: string; date: string | null;
  no_embed: boolean; start_seconds: number | null; href: string | null;
  status: "draft" | "published"; created_at: string;
};

/* ── mapping helpers ──────────────────────────────────── */

export function postInputToRow(p: PostInput) {
  return {
    slug: p.slug, title: p.title, topic: p.topic, status: p.status,
    featured: p.featured, date: p.date, author: p.author,
    excerpt: p.excerpt ?? null, dek: p.dek ?? null, body_html: p.bodyHtml,
    cover_image: p.coverImage ?? null, cover_alt: p.coverAlt ?? null,
    cover_position: p.coverPosition ?? null, read_time: p.readTime ?? null,
    key_points: p.keyPoints ?? null, pull_quote: p.pullQuote ?? null,
    links: p.links ?? null, sources: p.sources ?? null,
    updated_at: new Date().toISOString(),
  };
}

export function eventInputToRow(e: EventInput) {
  return {
    slug: e.slug, title: e.title, type: e.type, status: e.status,
    featured: e.featured, date: e.date, time: e.time ?? null,
    venue: e.venue, address: e.address, summary: e.summary,
    contributions: e.contributions ?? null,
    sponsor_levels: e.sponsorLevels ?? null,
    rsvp_url: e.rsvpUrl ?? null, rsvp_by: e.rsvpBy ?? null,
    contact: e.contact ?? null, updated_at: new Date().toISOString(),
  };
}

/* ── public-site shapes (mirror the old static types) ─── */

export type PublishedPost = {
  slug: string; title: string; topic: string; date: string; author: string;
  readTime?: string; excerpt: string; dek?: string; bodyHtml: string;
  keyPoints?: string[]; pullQuote?: string;
  links?: { label: string; href: string }[];
  sources?: { label: string; href: string; publisher?: string | null }[];
  image?: { src: string; alt: string }; imagePosition?: string;
  featured: boolean;
};

export function rowToPublishedPost(r: PostRow): PublishedPost {
  return {
    slug: r.slug, title: r.title, topic: r.topic, date: r.date,
    author: r.author, readTime: r.read_time ?? undefined,
    excerpt: r.excerpt ?? "", dek: r.dek ?? undefined, bodyHtml: r.body_html,
    keyPoints: r.key_points ?? undefined, pullQuote: r.pull_quote ?? undefined,
    links: r.links ?? undefined, sources: r.sources ?? undefined,
    image: r.cover_image
      ? { src: r.cover_image, alt: r.cover_alt ?? r.title }
      : undefined,
    imagePosition: r.cover_position ?? undefined,
    featured: r.featured,
  };
}

export type PublicEvent = {
  slug: string; date: string; time?: string; title: string; venue: string;
  address: string; summary: string; rsvpUrl?: string;
  type: "fundraiser" | "town-hall" | "community" | "volunteer";
  contributions?: string[]; sponsorLevels?: string[]; rsvpBy?: string;
  contact?: { name?: string; email?: string; phone?: string };
  featured?: boolean;
};

export function rowToEventItem(r: EventRow): PublicEvent {
  return {
    slug: r.slug, date: r.date, time: r.time ?? undefined, title: r.title,
    venue: r.venue, address: r.address, summary: r.summary,
    rsvpUrl: r.rsvp_url ?? undefined, type: r.type,
    contributions: r.contributions ?? undefined,
    sponsorLevels: r.sponsor_levels ?? undefined,
    rsvpBy: r.rsvp_by ?? undefined,
    contact: r.contact
      ? {
          name: r.contact.name ?? undefined,
          email: r.contact.email ?? undefined,
          phone: r.contact.phone ?? undefined,
        }
      : undefined,
    featured: r.featured,
  };
}
