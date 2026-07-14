import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPosts, getPostBySlug } from "@/lib/cms/queries";
import { sanitizeBodyHtml } from "@/lib/cms/sanitize";
import { splitHtmlAfterParagraphs } from "@/lib/cms/types";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { RevealImage } from "@/components/home/RevealImage";
import { CtaBand } from "@/components/interior/CtaBand";
import { StarGlyph, CheckGlyph } from "@/components/home/Glyphs";

type Params = { slug: string };

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Update not found" };
  return { title: post.title, description: post.excerpt };
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

export default async function IssuePage({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const posts = await getPublishedPosts();
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const related = [
    posts[(idx + 1) % posts.length],
    posts[(idx + 2) % posts.length],
  ];

  // Sanitize again at render (defense in depth), then split so the
  // pull-quote sits after the opening rather than at the very end.
  const safe = sanitizeBodyHtml(post.bodyHtml);
  const [lead, rest] = splitHtmlAfterParagraphs(safe, 2);

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
              {post.topic}
              {post.date ? ` · ${formatDate(post.date)}` : null}
            </p>
            <h1 className="h-display mt-4 max-w-[24ch]">{post.title}</h1>
            {post.dek && (
              <p className="lede mt-6 max-w-[60ch]">{post.dek}</p>
            )}
            <div className="article-byline mt-7">
              <span>
                By <strong>{post.author}</strong>
              </span>
              {post.date && (
                <>
                  <span className="dot" />
                  <span>{formatDate(post.date)}</span>
                </>
              )}
              {post.readTime && (
                <>
                  <span className="dot" />
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Framed image ──────────────────────────────── */}
      {post.image && (
        <section className="bg-white">
          <div className="mx-auto max-w-[1180px] px-6 py-12 md:px-10 md:py-16">
            <RevealImage
              src={post.image.src}
              alt={post.image.alt}
              from="up"
              frameClassName="photo-frame aspect-[16/9] w-full"
              imgClassName="h-full w-full object-cover"
              objectPosition={post.imagePosition ?? "center 30%"}
            />
          </div>
        </section>
      )}

      {/* ── Article body ──────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[760px] px-6 py-16 md:px-10 md:py-20">
          {/* Lead paragraphs + pull-quote interleaved */}
          <Reveal className="prose-light article-body">
            <div dangerouslySetInnerHTML={{ __html: lead }} />
          </Reveal>

          {post.pullQuote && (
            <Reveal className="article-pullquote">
              <p>“{post.pullQuote}”</p>
            </Reveal>
          )}

          {rest && (
            <Reveal className="prose-light article-body">
              <div dangerouslySetInnerHTML={{ __html: rest }} />
            </Reveal>
          )}

          {/* Where Ryan stands */}
          {post.keyPoints && post.keyPoints.length > 0 && (
            <Reveal className="keypoints mt-12">
              <div className="flex items-center gap-3">
                <span className="icon-chip icon-chip--gold icon-chip--mini">
                  <StarGlyph size={18} />
                </span>
                <p className="eyebrow">Where Ryan Stands</p>
              </div>
              <ul className="mt-5 space-y-4">
                {post.keyPoints.map((k) => (
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

          {/* Action links */}
          {post.links && post.links.length > 0 && (
            <div className="mt-12 rounded-xl border border-brand-hairline bg-brand-paper2 p-7">
              <p className="eyebrow eyebrow--gold">Read &amp; Take Action</p>
              <ul className="mt-5 space-y-3 list-none p-0">
                {post.links.map((l) => (
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
          {post.sources && post.sources.length > 0 && (
            <div className="mt-12 border-t border-brand-hairline pt-8">
              <p className="eyebrow">Sources</p>
              <div className="mt-4">
                {post.sources.map((s, i) => (
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
              r && r.slug !== post.slug ? (
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
                          style={{ objectPosition: r.imagePosition ?? "center 28%" }}
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
