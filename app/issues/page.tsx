import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts, getPublishedVideos } from "@/lib/cms/queries";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { RevealImage } from "@/components/home/RevealImage";
import { InteriorHero } from "@/components/interior/InteriorHero";
import { CtaBand } from "@/components/interior/CtaBand";
import { VideoGallery, type Video } from "@/components/interior/VideoGallery";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Squatters and property rights. Power lines through our farmland. The flying mission at Martin State. The war on drivers. The latest from Annapolis and across District 7A.",
};

export const revalidate = 60;

function Arrow() {
  return (
    <svg
      className="arrow"
      width="16"
      height="12"
      viewBox="0 0 18 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M1 7h15M11 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatDate(d: string): string {
  const parts = d.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const yStr = parts[0] ?? "";
  const mStr = parts[1] ?? "";
  const m = parseInt(mStr, 10);
  if (Number.isNaN(m)) return yStr;
  const monthName = months[m - 1] ?? "";
  return `${monthName} ${yStr}`;
}

function Meta({
  topic,
  date,
  readTime,
}: {
  topic: string;
  date?: string;
  readTime?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="font-semibold uppercase tracking-wider text-brand-maroon">
        {topic}
      </span>
      {date && <span className="text-brand-slate/55">· {formatDate(date)}</span>}
      {readTime && <span className="text-brand-slate/55">· {readTime}</span>}
    </div>
  );
}

export default async function IssuesIndex() {
  const posts = await getPublishedPosts();
  const { clips, coverage } = await getPublishedVideos();

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;
  const topics = Array.from(new Set(posts.map((p) => p.topic)));

  /** Ryan's TV appearances — managed in the admin Videos section. */
  const videos: Video[] = clips
    .filter((c) => c.youtube_id)
    .map((c) => ({
      id: c.youtube_id as string,
      channel: c.channel ?? "",
      date: c.date ?? undefined,
      title: c.title,
      noEmbed: c.no_embed || undefined,
      start: c.start_seconds ?? undefined,
    }));

  /** Additional TV / station coverage (links out to the broadcast page). */
  const coverageLinks = coverage
    .filter((l) => l.href)
    .map((l) => ({
      station: l.channel ?? "",
      label: l.title,
      href: l.href as string,
    }));

  return (
    <>
      {/* ── Hero band ─────────────────────────────────── */}
      <InteriorHero
        eyebrow="From Annapolis & the District"
        title={
          <>
            News &amp; <Underline>updates</Underline>.
          </>
        }
        lede="The fights from the floor, the committee room, and the neighborhood — public safety, lower costs, reliable energy, and local control across District 7A."
        media={{
          src: "/images/642865957_1334736615139355_8979806438955097043_n.jpg",
          alt: "Ryan speaking at a Maryland Freedom Caucus press conference on lower electric bills",
          objectPosition: "center 25%",
        }}
      />

      {/* ── Topics strip ──────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 pt-12 md:px-10">
          <Reveal className="flex flex-wrap items-center gap-2.5">
            <span className="eyebrow eyebrow--gold mr-1">Filed under</span>
            {topics.map((t) => (
              <span key={t} className="cred-chip">
                {t}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Featured story ────────────────────────────── */}
      {featured && (
        <section className="bg-white">
          <div className="mx-auto max-w-[1180px] px-6 pt-4 md:px-10">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="block h-px w-8 bg-brand-gold" />
                <p className="eyebrow eyebrow--gold">Featured</p>
              </div>
            </Reveal>
            <Reveal delay={0.05} className="mt-7">
              <Link
                href={`/issues/${featured.slug}`}
                className="group grid items-center gap-10 md:grid-cols-2 md:gap-14"
              >
                {featured.image && (
                  <RevealImage
                    src={featured.image.src}
                    alt={featured.image.alt}
                    from="left"
                    frameClassName="photo-frame aspect-[4/3] w-full"
                    imgClassName="h-full w-full object-cover"
                    objectPosition={featured.imagePosition ?? "center 28%"}
                  />
                )}
                <div>
                  <Meta
                    topic={featured.topic}
                    date={featured.date}
                    readTime={featured.readTime}
                  />
                  <h2 className="h-section mt-4 transition-colors group-hover:text-brand-maroon">
                    {featured.title}
                  </h2>
                  <p className="lede mt-5">{featured.dek ?? featured.excerpt}</p>
                  <span className="link-arrow mt-7">
                    Read the full story <Arrow />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Updates grid ──────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-24">
          <Reveal className="mb-10 flex items-center gap-3">
            <span className="block h-px w-8 bg-brand-gold" />
            <p className="eyebrow">More Updates</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {rest.map((u, i) => (
              <Reveal key={u.slug} as="div" delay={(i % 3) * 0.07}>
                <Link href={`/issues/${u.slug}`} className="news-card">
                  {u.image && (
                    <div className="news-card__media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={u.image.src}
                        alt={u.image.alt}
                        loading="lazy"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: u.imagePosition ?? "center 28%" }}
                      />
                      <span className="news-card__tag">{u.topic}</span>
                    </div>
                  )}
                  <div className="news-card__body">
                    <h3 className="news-card__title">{u.title}</h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-slate">
                      {u.excerpt}
                    </p>
                    <div className="news-card__foot">
                      <span className="news-card__meta">
                        {u.date ? formatDate(u.date) : "District 7A"}
                        {u.readTime ? ` · ${u.readTime}` : ""}
                      </span>
                      <span className="link-arrow text-[11px]">
                        Read <Arrow />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── On the Air (video gallery) ────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">On the Air</p>
            <h2 className="h-section mt-4">
              Ryan in the <Underline>news</Underline>.
            </h2>
            <p className="lede mt-5">
              From FOX45 and WMAR‑2 to WBAL — Delegate Nawrocki making the case
              for District 7A on Maryland television. Click any clip to watch.
            </p>
          </Reveal>

          <div className="mt-12">
            <VideoGallery videos={videos} />
          </div>

          {/* More station coverage */}
          <Reveal className="mt-16 flex items-center gap-3">
            <span className="block h-px w-8 bg-brand-gold" />
            <p className="eyebrow eyebrow--gold">More Coverage</p>
          </Reveal>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {coverageLinks.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-brand-hairline bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:border-brand-navy/30 hover:shadow-[0_12px_30px_rgba(7,25,63,0.08)]"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex flex-shrink-0 rounded-md bg-brand-navy px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {c.station}
                  </span>
                  <span className="text-[14px] font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-maroon">
                    {c.label}
                  </span>
                </span>
                <svg
                  className="flex-shrink-0 text-brand-slate"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M7 17 17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ──────────────────────────────────── */}
      <CtaBand
        eyebrow="Stand With District 7A"
        bgSrc="/images/588512414_1266055232007494_3344370248710133705_n.jpg"
        bgPosition="center 30%"
        title="Every neighbor who steps up keeps Eastern Baltimore County at the table."
        blurb="Contribute, volunteer, or request a yard sign — it all makes a difference."
      >
        <a
          href={site.donateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-maroon"
        >
          Contribute <Arrow />
        </a>
        <Link href="/contact" className="btn-outline-light">
          Get Involved <Arrow />
        </Link>
      </CtaBand>
    </>
  );
}
