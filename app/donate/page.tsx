import type { Metadata } from "next";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { CtaBand } from "@/components/interior/CtaBand";
import { InteriorHero } from "@/components/interior/InteriorHero";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Contribute to Friends of Ryan Nawrocki securely through Anedot.",
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

export default function DonatePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <InteriorHero
        eyebrow="Support the Campaign"
        title={
          <>
            <Underline>Contribute</Underline>.
          </>
        }
        lede="Contributions to Friends of Ryan Nawrocki are processed securely by Anedot. You will be directed to our official donation page to complete your contribution."
        media={{
          src: "/images/589965019_1267314725214878_3925349742753260125_n.jpg",
          alt: "The Nawrocki family at a community event",
          objectPosition: "center 28%",
        }}
        actions={
          <a
            href={site.donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-maroon"
          >
            Contribute <Arrow />
          </a>
        }
      />

      {/* ── Suggested amounts ────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[680px]">
            <Reveal>
              <div className="gold-tick" />
              <p className="eyebrow mt-5">Suggested Levels</p>
              <h2 className="h-section mt-4">Choose an amount.</h2>
              <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-6">
                {[25, 50, 100, 250, 500, 1000].map((amt) => (
                  <a
                    key={amt}
                    href={`${site.donateUrl}?amount=${amt}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-16 items-center justify-center rounded-lg border border-brand-hairline font-display text-xl font-extrabold text-brand-navy transition-colors hover:border-brand-maroon hover:bg-brand-maroon hover:text-white"
                  >
                    ${amt}
                  </a>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={site.donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-maroon"
                >
                  Continue to Anedot <Arrow />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <div className="rounded-xl border border-brand-hairline bg-brand-paper2 p-7">
                <p className="eyebrow">Why Contribute?</p>
                <ul className="mt-5 space-y-4">
                  {[
                    "Every dollar stays in the district — fighting for Eastern Baltimore County families.",
                    "Maryland's small-dollar limits keep this race honest and grassroots-funded.",
                    "Your contribution directly powers door-knocks, mailers, and community outreach.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] text-brand-slate">
                      <span className="mt-2 h-0.5 w-4 flex-shrink-0 bg-brand-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-8 text-[11px] uppercase tracking-[0.18em] text-brand-slate/50">
                {site.authorityLine}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Navy CTA ─────────────────────────────────────── */}
      <CtaBand
        eyebrow="Get Involved"
        title="There are more ways to help beyond writing a check."
      >
        <a
          href={site.donateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-maroon"
        >
          Contribute <Arrow />
        </a>
        <a href="/contact" className="btn-outline-light">
          Volunteer or Sign Up <Arrow />
        </a>
      </CtaBand>
    </>
  );
}
