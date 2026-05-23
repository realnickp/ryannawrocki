import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { RevealImage } from "@/components/home/RevealImage";
import { InteriorHero } from "@/components/interior/InteriorHero";
import { CtaBand } from "@/components/interior/CtaBand";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press appearances, op-eds, and coverage of Delegate Nawrocki's work in Annapolis and across District 7A.",
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

type PressItem = {
  outlet: string;
  date: string;
  title: string;
  href: string;
};

type PressGroup = {
  topic: string;
  items: PressItem[];
};

const groups: PressGroup[] = [
  {
    topic: "HB 202 — Anti-Squatters",
    items: [
      {
        outlet: "The Baltimore Sun",
        date: "Jan 2025",
        title: "Maryland must protect property owners from squatters.",
        href: "#",
      },
      {
        outlet: "Maryland Matters",
        date: "Feb 2025",
        title: "House Republicans introduce squatter-fraud bill.",
        href: "#",
      },
    ],
  },
  {
    topic: "Energy & Environment",
    items: [
      {
        outlet: "Baltimore Sun",
        date: "Mar 2025",
        title: "Nawrocki opposes Piedmont power-line route through farmland.",
        href: "#",
      },
      {
        outlet: "WBAL-TV",
        date: "Apr 2025",
        title: "Brandon Shores closure debate intensifies.",
        href: "#",
      },
    ],
  },
  {
    topic: "Public Safety",
    items: [
      {
        outlet: "WBAL-TV",
        date: "Jun 2024",
        title: "Eastern Avenue safety push, joint statement.",
        href: "#",
      },
    ],
  },
  {
    topic: "Community",
    items: [
      {
        outlet: "Baltimore County",
        date: "Nov 2023",
        title: "Rocket Lab Space Structures Complex opens in Middle River.",
        href: "#",
      },
    ],
  },
];

const featured = [
  {
    outlet: "The Baltimore Sun",
    quote: "Maryland must protect property owners from squatters.",
  },
  {
    outlet: "Maryland Freedom Caucus",
    quote: "Eastern Baltimore County deserves a voice on the floor.",
  },
  {
    outlet: "WBAL-TV",
    quote: "Eastern Avenue safety push — joint statement delivered.",
  },
];

export default function PressPage() {
  return (
    <>
      {/* ── Hero band ──────────────────────────────────── */}
      <InteriorHero
        eyebrow="Press & Coverage"
        title={
          <>
            A record of <Underline>the work</Underline>.
          </>
        }
        lede="Op-eds, press briefings, and coverage of Delegate Nawrocki's work in Annapolis and across District 7A."
        media={{
          src: "/images/priorities/accountable-transparent-government.png",
          alt: "The Maryland State House",
        }}
      />

      {/* ── Featured photo ─────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-10 md:px-10 md:py-14">
          <Reveal>
            <RevealImage
              src="/images/585539011_1262366392376378_1579570939959378754_n.jpg"
              alt="Delegate Nawrocki with colleagues at a Maryland press briefing podium in Annapolis"
              from="up"
              frameClassName="photo-frame aspect-[16/10] w-full"
              imgClassName="h-full w-full object-cover"
              objectPosition="center 30%"
            />
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-slate/60">
              Annapolis &middot; Maryland Freedom Caucus &middot; Press Briefing
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Press by topic ─────────────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">By Topic</p>
            <h2 className="h-section mt-4">Coverage that matters.</h2>
          </Reveal>

          <Reveal className="mt-12">
            <div className="divide-y divide-brand-hairline border-y border-brand-hairline">
              {groups.map((g) => (
                <details key={g.topic} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                    <h3 className="font-display text-xl font-bold text-brand-navy transition-colors group-hover:text-brand-maroon md:text-2xl">
                      {g.topic}
                    </h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-hairline text-brand-navy transition-transform group-open:rotate-45">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <ul className="mt-6 space-y-3">
                    {g.items.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href}
                          className="group/link flex items-baseline gap-4 border-l-2 border-brand-hairline py-3 pl-5 transition-colors hover:border-brand-gold"
                        >
                          <span className="hidden shrink-0 text-xs font-bold uppercase tracking-wider text-brand-maroon md:block md:w-28">
                            {item.outlet}
                          </span>
                          <span className="hidden shrink-0 text-xs font-medium uppercase tracking-wider text-brand-slate/60 md:block md:w-20">
                            {item.date}
                          </span>
                          <span className="flex-1 text-[15px] leading-snug text-brand-navy md:text-base">
                            {item.title}
                          </span>
                          <svg
                            className="shrink-0 text-brand-slate/40 transition-colors group-hover/link:text-brand-maroon"
                            width="14"
                            height="10"
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
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Most cited ─────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">Most Cited</p>
            <h2 className="h-section mt-4">
              The work that made the front page.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((f, i) => (
              <Reveal key={f.quote} delay={(i % 3) * 0.07} as="div">
                <blockquote className="card-soft h-full p-8 md:p-10">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-maroon">
                    {f.outlet}
                  </p>
                  <p className="mt-5 font-display text-xl font-bold leading-snug tracking-tight text-brand-navy md:text-2xl">
                    &ldquo;{f.quote}&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media contact CTA ──────────────────────────── */}
      <CtaBand
        eyebrow="Media Inquiries"
        title="Press requests & interview bookings."
        blurb="For media inquiries, interview requests, or press credentials, contact the campaign directly."
      >
        <a href={`mailto:${site.campaignEmail}`} className="btn-maroon">
          Email the Campaign <Arrow />
        </a>
        <Link href="/contact" className="btn-outline-light">
          Contact Page <Arrow />
        </Link>
      </CtaBand>
    </>
  );
}
