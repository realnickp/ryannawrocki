import type { Metadata } from "next";
import Link from "next/link";
import { issueBySlug } from "@/data/issues";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { RevealImage } from "@/components/home/RevealImage";
import { FeatureBand } from "@/components/home/FeatureBand";
import { InteriorHero } from "@/components/interior/InteriorHero";
import { CtaBand } from "@/components/interior/CtaBand";

export const metadata: Metadata = {
  title: "HB 202 — Anti-Squatters",
  description:
    "Common-sense legislation to protect Maryland homeowners, hold criminals accountable, and restore the rule of law.",
};

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

function ExternalArrow() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M2 11L11 2M11 2H5M11 2v6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoldRule() {
  return (
    <div className="gold-rule">
      <span className="line" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hero/md-outline.png" alt="" aria-hidden />
      <span className="line" />
    </div>
  );
}

const billMeta = [
  ["Sponsor", "Del. Ryan Nawrocki"],
  ["Committee", "Judiciary"],
  ["Session", "2025 Regular"],
  ["Status", "Introduced"],
  ["Type", "Criminal Law"],
] as const;

const keyPoints = [
  {
    title: "Criminalizes fraudulent conveyance",
    body: "Makes it a criminal offense to fraudulently convey, lease, or take possession of residential real property that belongs to another person.",
  },
  {
    title: "Protects homeowners from fake documents",
    body: "Addresses scenarios where squatters present forged deeds or fake leases — currently a gap that leaves property owners with only slow civil remedies.",
  },
  {
    title: "Involves criminal justice, not just civil court",
    body: "Gives law enforcement clear authority to act quickly, without waiting for months of civil-court proceedings to resolve.",
  },
  {
    title: "Common-sense, bipartisan need",
    body: "Property rights are a cornerstone of Maryland's communities. This legislation restores faith in the rule of law for homeowners across the state.",
  },
];

export default function HB202Page() {
  const issue = issueBySlug("hb202-anti-squatters")!;

  return (
    <>
      {/* ── Hero band ──────────────────────────────────── */}
      <InteriorHero
        eyebrow="2025 Legislative Session"
        title={
          <>
            <span className="block text-brand-gold">HB 202</span>
            <span className="mt-3 block">
              Maryland must protect property owners from{" "}
              <Underline>squatters</Underline>.
            </span>
          </>
        }
        lede={issue.body[0]}
        media={{
          src: "/images/priorities/safe-streets-public-safety.png",
          alt: "A row of Maryland homes at dusk",
        }}
        actions={
          <>
            <Link href="/contact" className="btn-maroon">
              Stand With Us <Arrow />
            </Link>
            <Link href="/issues" className="btn-outline-light">
              More from Annapolis <Arrow />
            </Link>
          </>
        }
      />

      {/* ── Bill metadata strip ────────────────────────── */}
      <section className="border-b border-brand-hairline bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <dl className="grid divide-y divide-brand-hairline py-2 md:grid-cols-5 md:divide-x md:divide-y-0">
            {billMeta.map(([label, value]) => (
              <div key={label} className="px-4 py-4 md:px-6">
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-slate/60">
                  {label}
                </dt>
                <dd className="mt-1.5 text-sm font-semibold text-brand-navy">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Featured photo ─────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-10 md:px-10 md:py-14">
          <Reveal>
            <RevealImage
              src="/images/priorities/safe-streets-public-safety.png"
              alt="A row of Maryland homes — the residential property HB 202 protects"
              from="up"
              frameClassName="photo-frame aspect-[16/9] w-full"
              imgClassName="h-full w-full object-cover"
              objectPosition="center 50%"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Why it matters — long-form ─────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[760px] px-6 py-16 md:px-10 md:py-24">
          <Reveal>
            <div className="gold-tick" />
            <p className="eyebrow mt-5">Why It Matters</p>
            <h2 className="h-section mt-4">
              Closing the gap in Maryland&rsquo;s property law.
            </h2>
            <div className="mt-6">
              <GoldRule />
            </div>
            <div className="prose-light mt-8">
              <p>
                Squatting strikes at the foundations of property, neighborhood
                safety, and the rule of law. Maryland&rsquo;s current statutes
                leave property owners with months of legal expense and limited
                remedy — even when documents are clearly forged.
              </p>
              <p>
                HB 202 closes that gap. It defines and criminalizes the
                fraudulent conveyance, lease, or possession of residential real
                property, so that the criminal justice system — not just civil
                court — can respond when a homeowner is victimized.
              </p>
              <p>
                This is a common-sense solution that protects Maryland families,
                holds criminals accountable, and restores faith in the rule of
                law — regardless of party.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Key points ─────────────────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">What the Bill Does</p>
            <h2 className="h-section mt-4">Four key provisions.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {keyPoints.map((kp, i) => (
              <Reveal key={kp.title} delay={(i % 2) * 0.07} as="div">
                <div className="card-soft h-full p-8">
                  <span className="font-display text-2xl font-extrabold text-brand-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-brand-navy">
                    {kp.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-brand-slate">
                    {kp.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull quote ─────────────────────────────────── */}
      <FeatureBand
        bgSrc="/images/priorities/protecting-from-overdevelopment.png"
        bgOpacity={0.16}
        bgPosition="center 40%"
      >
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <div className="gold-tick" />
            <p className="eyebrow eyebrow--light mt-5">Baltimore Sun Op-Ed</p>
            <blockquote className="mt-6 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
              &ldquo;Maryland must protect property owners from squatters.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-white/60">
              — Delegate Ryan Nawrocki, Baltimore Sun
            </p>
          </Reveal>
        </div>
      </FeatureBand>

      {/* ── Documents dossier ──────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">The Dossier</p>
            <h2 className="h-section mt-4">Read it. Track it. Speak on it.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {(issue.links ?? []).slice(0, 4).map((l, i) => (
              <Reveal key={l.label} delay={(i % 2) * 0.07} as="div">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-soft group flex h-full flex-col gap-4 p-8"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-maroon">
                    Document {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="flex-1 font-display text-xl font-bold leading-snug text-brand-navy">
                    {l.label}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-maroon transition-gap group-hover:gap-3">
                    Open <ExternalArrow />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────────────── */}
      <CtaBand
        eyebrow="Take Action"
        bgSrc="/images/priorities/safe-streets-public-safety.png"
        bgPosition="center 50%"
        title={
          <>
            Help defend{" "}
            <span className="text-brand-gold">Maryland homeowners.</span>
          </>
        }
        blurb="Contact the office to express your support, or read more about the legislation and other priorities from the 2025 session."
      >
        <Link href="/contact" className="btn-maroon">
          Contact the Office <Arrow />
        </Link>
        <Link href="/issues" className="btn-outline-light">
          More Updates <Arrow />
        </Link>
      </CtaBand>
    </>
  );
}
