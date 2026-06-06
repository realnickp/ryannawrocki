import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { issues, issueBySlug } from "@/data/issues";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { RevealImage } from "@/components/home/RevealImage";
import { CtaBand } from "@/components/interior/CtaBand";
import { StarGlyph, CheckGlyph } from "@/components/home/Glyphs";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return issues.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const issue = issueBySlug(params.slug);
  if (!issue) return { title: "Issue not found" };
  return { title: issue.title, description: issue.excerpt };
}

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

/** Per-image object-position so heads / focal points are never cropped. */
const imagePosition: Record<string, string> = {
  "inspector-general-reform": "center 42%",
  "bcps-inspector-general-oversight": "center 50%",
  "middle-river-fire-station": "center 55%",
  "deer-management": "center 45%",
  "hb202-anti-squatters": "center 30%",
  "power-lines-and-brandon-shores": "center 30%",
  "war-on-drivers": "center 25%",
  "immigration-and-public-safety": "center 28%",
  "housing-expansion-act": "center 25%",
  "air-national-guard-flying-mission": "center 30%",
  "eastern-avenue-traffic": "center 30%",
  "rocket-lab-middle-river": "center 88%",
};

export default function IssuePage({ params }: { params: Params }) {
  const issue = issueBySlug(params.slug);
  if (!issue) notFound();

  const idx = issues.findIndex((i) => i.slug === issue.slug);
  const related = [
    issues[(idx + 1) % issues.length],
    issues[(idx + 2) % issues.length],
  ];

  // Split body so the pull-quote sits after the opening, not at the very end.
  const splitAt = issue.pullQuote && issue.body.length > 2 ? 2 : issue.body.length;
  const leadParas = issue.body.slice(0, splitAt);
  const restParas = issue.body.slice(splitAt);

  return (
    <>
      {/* ── Hero band ─────────────────────────────────── */}
      <section className="page-hero pt-32 md:pt-40">
        <div className="mx-auto max-w-[860px] px-6 py-16 md:px-10 md:py-20">
          <Reveal>
            <Link
              href="/issues"
              className="link-arrow link-arrow--navy inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
            >
              <svg
                width="14"
                height="10"
                viewBox="0 0 18 14"
                fill="none"
                aria-hidden
                className="rotate-180"
              >
                <path
                  d="M1 7h15M11 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All Updates
            </Link>
            <div className="gold-tick mt-6" />
            <p className="eyebrow mt-5">
              {issue.topic}
              {issue.date ? ` · ${formatDate(issue.date)}` : null}
            </p>
            <h1 className="h-display mt-4 max-w-[24ch]">{issue.title}</h1>
            {issue.dek && (
              <p className="lede mt-6 max-w-[60ch]">{issue.dek}</p>
            )}
            <div className="article-byline mt-7">
              <span>
                By <strong>{issue.author ?? "Delegate Ryan Nawrocki"}</strong>
              </span>
              {issue.date && (
                <>
                  <span className="dot" />
                  <span>{formatDate(issue.date)}</span>
                </>
              )}
              {issue.readTime && (
                <>
                  <span className="dot" />
                  <span>{issue.readTime}</span>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Framed image ──────────────────────────────── */}
      {issue.image && (
        <section className="bg-white">
          <div className="mx-auto max-w-[1180px] px-6 py-12 md:px-10 md:py-16">
            <RevealImage
              src={issue.image.src}
              alt={issue.image.alt}
              from="up"
              frameClassName="photo-frame aspect-[16/9] w-full"
              imgClassName="h-full w-full object-cover"
              objectPosition={imagePosition[issue.slug] ?? "center 30%"}
            />
          </div>
        </section>
      )}

      {/* ── Article body ──────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[760px] px-6 py-16 md:px-10 md:py-20">
          {/* Lead paragraphs + pull-quote interleaved */}
          <Reveal className="prose-light article-body">
            {leadParas.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </Reveal>

          {issue.pullQuote && (
            <Reveal className="article-pullquote">
              <p>“{issue.pullQuote}”</p>
            </Reveal>
          )}

          {restParas.length > 0 && (
            <Reveal className="prose-light">
              {restParas.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </Reveal>
          )}

          {/* Where Ryan stands */}
          {issue.keyPoints && issue.keyPoints.length > 0 && (
            <Reveal className="keypoints mt-12">
              <div className="flex items-center gap-3">
                <span className="icon-chip icon-chip--gold icon-chip--mini">
                  <StarGlyph size={18} />
                </span>
                <p className="eyebrow">Where Ryan Stands</p>
              </div>
              <ul className="mt-5 space-y-4">
                {issue.keyPoints.map((k) => (
                  <li key={k} className="check-row">
                    <span className="check-badge">
                      <CheckGlyph size={14} />
                    </span>
                    <span className="leading-relaxed text-brand-slate">{k}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* Our Asks */}
          {issue.bullets && issue.bullets.length > 0 && (
            <Reveal className="prose-light">
              <div className="my-10 flex items-center gap-3">
                <span className="block h-px w-8 bg-brand-gold" />
                <p className="eyebrow eyebrow--gold">Our Asks</p>
                <span className="block h-px flex-1 bg-brand-hairline" />
              </div>
              <ul>
                {issue.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* Action links */}
          {issue.links && issue.links.length > 0 && (
            <div className="mt-12 rounded-xl border border-brand-hairline bg-brand-paper2 p-7">
              <p className="eyebrow eyebrow--gold">Read &amp; Take Action</p>
              <ul className="mt-5 space-y-3 list-none p-0">
                {issue.links.map((l) => (
                  <li key={l.label} className="flex items-baseline gap-3">
                    <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" />
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[15px] text-brand-maroon hover:underline"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sources */}
          {issue.sources && issue.sources.length > 0 && (
            <div className="mt-12 border-t border-brand-hairline pt-8">
              <p className="eyebrow">Sources</p>
              <div className="mt-4">
                {issue.sources.map((s, i) => (
                  <div key={s.href} className="source-row">
                    <span className="source-row__num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] leading-relaxed text-brand-slate">
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-brand-navy hover:text-brand-maroon hover:underline"
                      >
                        {s.label}
                      </a>
                      {s.publisher && (
                        <span className="text-brand-slate/70"> — {s.publisher}</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 border-t border-brand-hairline pt-8">
            <Link href="/issues" className="link-arrow link-arrow--navy">
              Back to All Updates <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related updates ───────────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">Continue Reading</p>
            <h2 className="h-section mt-4">
              More from the <Underline>district</Underline>.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {related.filter(Boolean).map((r, i) =>
              r ? (
                <Reveal key={r.slug} as="div" delay={(i % 2) * 0.07}>
                  <Link href={`/issues/${r.slug}`} className="news-card">
                    {r.image && (
                      <div className="news-card__media">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={r.image.src}
                          alt={r.image.alt}
                          loading="lazy"
                          className="h-full w-full object-cover"
                          style={{ objectPosition: imagePosition[r.slug] ?? "center 28%" }}
                        />
                        <span className="news-card__tag">{r.topic}</span>
                      </div>
                    )}
                    <div className="news-card__body">
                      <h3 className="news-card__title">{r.title}</h3>
                      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-slate">
                        {r.excerpt}
                      </p>
                      <div className="news-card__foot">
                        <span className="news-card__meta">
                          {r.date ? formatDate(r.date) : "District 7A"}
                          {r.readTime ? ` · ${r.readTime}` : ""}
                        </span>
                        <span className="link-arrow text-[11px]">
                          Read <Arrow />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ) : null
            )}
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
