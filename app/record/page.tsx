import type { Metadata } from "next";
import Link from "next/link";
import { record } from "@/data/record";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { RevealImage } from "@/components/home/RevealImage";
import { FeatureBand } from "@/components/home/FeatureBand";
import { CountUp } from "@/components/home/CountUp";
import { InteriorHero } from "@/components/interior/InteriorHero";
import { CtaBand } from "@/components/interior/CtaBand";
import {
  SchoolsGlyph,
  CostGlyph,
  PeopleGlyph,
  PinGlyph,
  CheckGlyph,
} from "@/components/home/Glyphs";

export const metadata: Metadata = {
  title: "Record",
  description:
    "Concrete wins for District 7A — Inspectors General reform, HB 1063 sportsmen, 250+ scholarships, and a presence at every major community event.",
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
  { value: 250, prefix: "", suffix: "+", label: "Scholarships awarded to District 7 students", Glyph: SchoolsGlyph },
  { value: 100, prefix: "$", suffix: "K+", label: "In legislative scholarships every single year", Glyph: CostGlyph },
  { value: 85, prefix: "", suffix: "K+", label: "Constituents represented across District 7A", Glyph: PeopleGlyph },
  { value: 11, prefix: "", suffix: "", label: "Communities across eastern & northeastern Baltimore County", Glyph: PinGlyph },
];

const sessionHighlights = [
  "Voted against all 38 new or increased fees that came out of the 2024 session.",
  "Opposed the FY25 operating budget.",
  "Stood against legislation that would have stripped Baltimore County's authority to plan its own growth.",
];

export default function RecordPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <InteriorHero
        eyebrow="Delivering For District 7A"
        title={
          <>
            A record of <Underline>showing up</Underline> — and following
            through.
          </>
        }
        lede="Bipartisan reform. Stronger oversight. Scholarships for our students. A relentless presence in eastern and northeastern Baltimore County."
        media={{
          src: "/images/585340610_1262366382376379_126256103555317218_n.jpg",
          alt: "Ryan with a colleague presenting legislation in the Maryland State House",
          objectPosition: "center 28%",
        }}
      />

      {/* ── Stats band ───────────────────────────────────── */}
      <FeatureBand
        bgSrc="/images/580541720_1253084943304523_5959235873528429245_n.jpg"
        bgOpacity={0.15}
        bgPosition="center 30%"
      >
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <div className="gold-tick" />
            <p className="eyebrow eyebrow--light mt-5">By the Numbers</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white md:text-[2.75rem]">
              Results that matter.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:gap-x-16">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="icon-chip icon-chip--gold icon-chip--mini">
                  <s.Glyph size={20} />
                </div>
                <p className="stat-figure mt-5">
                  {s.prefix && <span className="accent">{s.prefix}</span>}
                  <CountUp value={s.value} suffix={s.suffix} />
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

      {/* ── Record entries ───────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">What I&rsquo;ve Done</p>
            <h2 className="h-section mt-4">Concrete wins — not talking points.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {record.map((r, i) => (
              <Reveal key={r.slug} delay={(i % 2) * 0.07} as="div">
                <article className="card-soft flex h-full flex-col p-7 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="inline-block h-0.5 w-8 flex-shrink-0 bg-brand-gold" />
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
                      {r.category}
                      {r.date ? ` · ${r.date}` : null}
                    </p>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-extrabold leading-snug tracking-tight text-brand-navy md:text-2xl">
                    {r.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-brand-slate">
                    {r.summary}
                  </p>
                  {r.detail && (
                    <p className="mt-3 text-sm leading-relaxed text-brand-slate/80">
                      {r.detail}
                    </p>
                  )}
                  {r.billRef && (
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                      {r.billRef}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── On the floor ─────────────────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <RevealImage
                src="/images/642865957_1334736615139355_8979806438955097043_n.jpg"
                alt="Ryan speaking at a Maryland Freedom Caucus press conference on lowering electric bills"
                from="left"
                frameClassName="photo-frame aspect-[4/3] w-full"
                imgClassName="h-full w-full object-cover"
                objectPosition="center 24%"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="gold-tick" />
              <p className="eyebrow mt-5">On the Floor</p>
              <h2 className="h-section mt-4">
                Showing up is half the job. Following through is the rest.
              </h2>
              <div className="mt-6">
                <GoldRule />
              </div>
              <p className="lede mt-6">
                From the Environment and Transportation Committee to its Housing
                &amp; Real Property and Land Use &amp; Ethics subcommittees, Ryan
                reads the bills, asks the hard questions, and votes the values of
                District 7A — every time.
              </p>
              <Link href="/priorities" className="link-arrow mt-8">
                Read the Priorities <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2024 Session review ──────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <div className="gold-tick" />
              <p className="eyebrow mt-5">2024 Session In Review</p>
              <h2 className="h-section mt-4">
                What I voted against, and why it mattered.
              </h2>
              <div className="mt-6">
                <GoldRule />
              </div>
              <p className="lede mt-6">
                Ryan stood firm against the spending, the fees, and the bills
                that took power away from local communities — because District
                7A deserves a delegate who votes its values, not the
                capital&rsquo;s.
              </p>
              <Link href="/session-summary/2024" className="link-arrow mt-8">
                Read the Full 2024 Recap <Arrow />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-soft p-7 md:p-8">
                <p className="eyebrow mb-6">Key Votes</p>
                <ul className="space-y-5">
                  {sessionHighlights.map((h) => (
                    <li key={h} className="check-row">
                      <span className="check-badge">
                        <CheckGlyph size={14} />
                      </span>
                      <span className="leading-relaxed text-brand-slate">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────── */}
      <CtaBand
        eyebrow="Stand With District 7A"
        bgSrc="/images/618635804_1308182807794736_1735708178472901723_n.jpg"
        bgPosition="center 30%"
        title={
          <>
            Showing up. Speaking up. Following through.{" "}
            <span className="text-brand-gold">That&rsquo;s the job.</span>
          </>
        }
        blurb="Support a delegate who fights for District 7A every day — in Annapolis and in your neighborhood."
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
