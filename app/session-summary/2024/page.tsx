import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { RevealImage } from "@/components/home/RevealImage";
import { FeatureBand } from "@/components/home/FeatureBand";
import { CountUp } from "@/components/home/CountUp";
import { CtaBand } from "@/components/interior/CtaBand";
import { InteriorHero } from "@/components/interior/InteriorHero";
import {
  CostGlyph,
  GovernmentGlyph,
  EconomyGlyph,
  PinGlyph,
  CheckGlyph,
} from "@/components/home/Glyphs";

export const metadata: Metadata = {
  title: "2024 End of Session Summary",
  description:
    "Delegate Nawrocki's recap of the 2024 Maryland legislative session.",
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

const stats = [
  {
    value: 338,
    numeric: true,
    suffix: "",
    label: "New or increased taxes & fees tracked statewide",
    Glyph: CostGlyph,
  },
  {
    value: 38,
    numeric: true,
    suffix: "",
    label: "Of those came from the 2024 legislative session",
    Glyph: GovernmentGlyph,
  },
  {
    value: "2nd",
    numeric: false,
    label: "Year of the Moore Administration",
    Glyph: PinGlyph,
  },
  {
    value: "4×",
    numeric: false,
    label: "Pace of fee increases vs. the O'Malley years",
    Glyph: EconomyGlyph,
  },
] as const;

const opposed = [
  "The Housing Expansion and Affordability Act",
  "338-line list of new or increased fees",
  "FY25 operating budget",
];

const highlights = [
  {
    numeral: "01",
    title: "Bipartisan IG Reform",
    body: "Supported bipartisan Inspectors General reform to strengthen accountability and oversight of state spending.",
  },
  {
    numeral: "02",
    title: "District 7 Scholarships",
    body: "Awarded more than 250 scholarships to District 7 students — representing over $100,000 in educational support.",
  },
  {
    numeral: "03",
    title: "Community Presence",
    body: "Ride-alongs with Baltimore County police, town halls, and a steady presence at community events across District 7A.",
  },
  {
    numeral: "04",
    title: "Votes Against New Taxes",
    body: "Voted against every new tax and fee increase on working families — a consistent record of fiscal responsibility.",
  },
  {
    numeral: "05",
    title: "Opposed Housing Act",
    body: "Challenged the Governor's Housing Expansion and Affordability Act, defending county-level safeguards on development.",
  },
  {
    numeral: "06",
    title: "Air National Guard Fight",
    body: "Led opposition to the removal of the flying mission from the Maryland Air National Guard at Martin State Airport.",
  },
];

export default function SessionSummary2024() {
  return (
    <>
      {/* ── Cover hero ─────────────────────────────────── */}
      <InteriorHero
        eyebrow="End of Session"
        title={
          <>
            2024 Legislative Session <Underline>Summary</Underline>
          </>
        }
        lede="A recap of the legislation Delegate Nawrocki worked on, voted against, and brought forward on behalf of District 7A — in his own words."
        media={{
          src: "/images/653012665_1347978293815187_1183977203978678287_n.jpg",
          alt: "Ryan with fellow Maryland legislators",
          objectPosition: "center 25%",
        }}
      />

      {/* ── By the numbers ─────────────────────────────── */}
      <FeatureBand
        bgSrc="/images/priorities/accountable-transparent-government.png"
        bgOpacity={0.16}
        bgPosition="center 30%"
      >
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <div className="gold-tick" />
            <p className="eyebrow eyebrow--light mt-5">By the Numbers</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white md:text-[2.75rem]">
              What we tracked. What we opposed.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:gap-x-16">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="icon-chip icon-chip--gold icon-chip--mini">
                  <s.Glyph size={20} />
                </div>
                <p className="stat-figure mt-5">
                  {s.numeric ? (
                    <CountUp value={s.value as number} suffix={s.suffix} />
                  ) : (
                    s.value
                  )}
                </p>
                <div className="mt-4 h-px w-12 bg-gradient-to-r from-brand-gold to-transparent" />
                <p className="mt-4 text-sm leading-snug text-white/65">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </FeatureBand>

      {/* ── What we opposed — long-form ────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[760px] px-6 py-16 md:px-10 md:py-24">
          <Reveal>
            <div className="gold-tick" />
            <p className="eyebrow mt-5">What We Opposed</p>
            <h2 className="h-section mt-4">
              A budget that has doubled in ten years.
            </h2>
            <div className="mt-6">
              <GoldRule />
            </div>
            <div className="prose-light mt-8">
              <p>
                Each of the 38 new or increased fees and taxes from the 2024
                session was opposed by your delegate. So was the operating budget
                that funded them. The budget has doubled in ten years, and we
                continue to demand that spending be curtailed and cuts made.
              </p>
              <p>
                The vast majority of the 338 tax and fee increases tracked
                statewide came through regulation at the administration&rsquo;s
                request — meaning most Marylanders won&rsquo;t see them until the
                bill arrives.
              </p>
              <p>
                From 2007 to 2014, the O&rsquo;Malley Administration raised 84
                taxes, tolls, and fees. We are only halfway through the Moore
                Administration&rsquo;s second year, and they have already raised
                nearly four times as many taxes and fees.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="card-soft p-7 md:p-8">
              <p className="eyebrow mb-6">Bills Opposed</p>
              <ul className="space-y-5">
                {opposed.map((item) => (
                  <li key={item} className="check-row">
                    <span className="check-badge">
                      <CheckGlyph size={14} />
                    </span>
                    <span className="leading-relaxed text-brand-slate">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Session highlights grid ─────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">Session Highlights</p>
            <h2 className="h-section mt-4">
              Showing up for District 7A.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.numeral} delay={(i % 3) * 0.07} as="div">
                <div className="card-soft flex h-full flex-col p-7">
                  <span className="font-display text-2xl font-extrabold text-brand-gold">
                    {h.numeral}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-brand-navy">
                    {h.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-slate">
                    {h.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull quote ─────────────────────────────────── */}
      <FeatureBand
        bgSrc="/images/585539011_1262366392376378_1579570939959378754_n.jpg"
        bgOpacity={0.16}
        bgPosition="center 32%"
      >
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <div className="gold-tick" />
            <p className="eyebrow eyebrow--light mt-5">From the Delegate</p>
            <blockquote className="mt-6 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
              &ldquo;We continue to demand that spending be curtailed and cuts
              made to a budget that has doubled in ten years.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-white/60">
              — Delegate Ryan Nawrocki
            </p>
          </Reveal>
        </div>
      </FeatureBand>

      {/* ── Session photo ──────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-10 md:py-20">
          <Reveal>
            <RevealImage
              src="/images/585539011_1262366392376378_1579570939959378754_n.jpg"
              alt="Delegate Nawrocki with legislative colleagues at a press briefing in Annapolis"
              from="up"
              frameClassName="photo-frame aspect-[4/3] w-full md:aspect-[16/9]"
              imgClassName="h-full w-full object-cover"
              objectPosition="center 32%"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────────────── */}
      <CtaBand
        eyebrow="Stay Connected"
        bgSrc="/images/priorities/accountable-transparent-government.png"
        bgPosition="center 30%"
        title="Follow the 2025 session."
        blurb="The fight continues. Follow along for updates from the 2025 legislative session and beyond."
      >
        <Link href="/issues" className="btn-maroon">
          All Updates <Arrow />
        </Link>
        <Link href="/priorities" className="btn-outline-light">
          2026 Priorities <Arrow />
        </Link>
      </CtaBand>
    </>
  );
}
