import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { RevealImage } from "@/components/home/RevealImage";
import { InteriorHero } from "@/components/interior/InteriorHero";
import { CtaBand } from "@/components/interior/CtaBand";

export const metadata: Metadata = {
  title: "Meet Ryan",
  description:
    "A lifelong Baltimore Countian, small business owner, and dedicated public servant.",
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

const committees = [
  "Energy Subcommittee",
  "Motor Vehicle & Transportation Subcommittee",
  "Nonenergy Utilities Subcommittee",
];

const childrenNames = ["Emily", "Matthew", "Luke", "Jacob", "Caleb", "Madelyn"];

export default function MeetRyanPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <InteriorHero
        eyebrow="Husband · Father of Six · Delegate"
        title={
          <>
            Husband. Father of <Underline>six</Underline>. Small-business
            owner.
          </>
        }
        lede="A Parkville native, Middle River resident, and lifelong Baltimore Countian — fighting for a safer, freer, more prosperous Maryland."
        media={{
          src: "/images/ryan-headshot-flag.jpg",
          alt: "Delegate Ryan Nawrocki on the Baltimore County waterfront",
          objectPosition: "center 20%",
          aspect: "aspect-[4/5]",
        }}
        actions={
          <>
            <a
              href={site.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-maroon"
            >
              Support Ryan <Arrow />
            </a>
            <Link href="/priorities" className="btn-outline-light">
              See Priorities <Arrow />
            </Link>
          </>
        }
      />

      {/* ── Bio (story + portrait) ───────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">About Ryan</p>
            <h2 className="h-section mt-4">
              Rooted in <Underline delay={0.1}>Baltimore County</Underline>.
            </h2>
          </Reveal>

          <div className="mt-12 grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
            <Reveal>
              <RevealImage
                src="/images/ryan-lauren-portrait.jpg"
                alt="Ryan and Dr. Lauren Nawrocki on the Baltimore County waterfront"
                from="left"
                frameClassName="photo-frame aspect-[4/5] w-full"
                imgClassName="h-full w-full object-cover"
                objectPosition="center 20%"
              />
            </Reveal>

            <Reveal delay={0.1} className="prose-light">
              <p>
                Ryan was born and raised in Parkville and lives in Middle River
                with his wife, Dr. Lauren Nawrocki, and their six children.
                He&rsquo;s a proud product of Baltimore County &mdash; and
                everything he does in Annapolis comes back to the place that
                raised him.
              </p>
              <p>
                A graduate of Loyola Blakefield, Ryan earned a B.A. with honors
                from St. Mary&rsquo;s College of Maryland and a Master of Public
                Administration from Johns Hopkins University. He is also a
                graduate of Leadership Baltimore County.
              </p>
              <p>
                His career has been built around public service and
                communication. He served as a Public Information Officer for the
                Maryland Aviation Administration &mdash; managing communications
                for BWI Thurgood Marshall and Martin State Airports &mdash;
                worked at LifeBridge Health, and served as a Communications
                Director in the U.S. House of Representatives for several Members
                of Congress, including Congressman Andy Harris. In 2016 he was
                named Senior Director of Communications and Marketing at the
                Maryland Transit Administration, work that earned him a place on
                The Daily Record&rsquo;s VIP List of 40 leaders under 40.
              </p>
              <p>
                Ryan is also a small-business owner &mdash; the owner of Green
                Relief Health, a wellness medical practice.
              </p>
              <p>
                In 2022, the voters of District 7A elected Ryan to the Maryland
                House of Delegates, where his approach to the job is simple: show
                up, listen, and bring Eastern Baltimore County&rsquo;s voice to
                Annapolis.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Family (brought up high) ─────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
            <Reveal>
              <RevealImage
                src="/images/family-grass.jpg"
                alt="Ryan and Dr. Lauren Nawrocki with their six children by the water"
                from="up"
                frameClassName="photo-frame aspect-[4/3] w-full"
                imgClassName="h-full w-full object-cover"
                objectPosition="center 32%"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="gold-tick" />
              <p className="eyebrow mt-5">Family First</p>
              <h2 className="h-section mt-4">
                Middle River. Six kids and counting.
              </h2>
              <p className="lede mt-6">
                Ryan lives in Middle River with his wife, Dr. Lauren Nawrocki,
                and their six children &mdash; the reason he fights for safer
                streets, stronger schools, and a future worth staying for.
              </p>
              <div className="mt-8">
                <p className="eyebrow mb-4">The Nawrocki Kids</p>
                <ul className="grid grid-cols-3 gap-x-4 gap-y-3">
                  {childrenNames.map((name) => (
                    <li
                      key={name}
                      className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-navy"
                    >
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── In the House of Delegates ────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
            <Reveal>
              <div className="gold-tick" />
              <p className="eyebrow mt-5">In Annapolis</p>
              <h2 className="h-section mt-4">Elected 2022. Sworn in to represent.</h2>
              <p className="lede mt-6">
                In the House of Delegates, Ryan represents the people of eastern
                Baltimore County with a focus on public safety, economic growth,
                and government accountability.
              </p>
              <div className="mt-8 card-soft p-7">
                <p className="eyebrow">Subcommittee Assignments</p>
                <ul className="mt-5 divide-y divide-brand-hairline">
                  {committees.map((c) => (
                    <li
                      key={c}
                      className="py-4 font-display text-lg font-semibold leading-snug text-brand-navy"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/record" className="link-arrow mt-8">
                See the Record <Arrow />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <RevealImage
                src="/images/618635804_1308182807794736_1735708178472901723_n.jpg"
                alt="Delegate Nawrocki with colleagues and constituents in Annapolis"
                from="right"
                frameClassName="photo-frame aspect-[4/5] w-full"
                imgClassName="h-full w-full object-cover"
                objectPosition="center 32%"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Rooted in the community ──────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
            <Reveal delay={0.1} className="md:order-2">
              <RevealImage
                src="/images/ryan-constituents.jpg"
                alt="Ryan listening to constituents out in the community"
                from="right"
                frameClassName="photo-frame aspect-[4/3] w-full"
                imgClassName="h-full w-full object-cover"
                objectPosition="center 45%"
              />
            </Reveal>
            <Reveal className="md:order-1">
              <div className="gold-tick" />
              <p className="eyebrow mt-5">In the Community</p>
              <h2 className="h-section mt-4">Roots that run deep.</h2>
              <div className="prose-light mt-6">
                <p>
                  Ryan&rsquo;s community involvement runs deep. He serves on the
                  Board of Directors for the Middle River Volunteer Fire &amp;
                  Rescue Company and has been a member of the Sons of the
                  American Legion (Post No. 180 in Rosedale), the White
                  Marsh&ndash;Cowenton Community Association, the Bird River Road
                  Neighborhood Association, and the White Marsh Police &amp;
                  Community Relations Council. He is also a member of the Knights
                  of Columbus, Pope John Paul the Great Council at Our Lady Queen
                  of Peace Church in Middle River.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────── */}
      <CtaBand
        eyebrow="Stand With District 7A"
        bgSrc="/images/569760336_1241608057785545_2659619059895616197_n.jpg"
        bgPosition="center 30%"
        title="Every neighbor who steps up keeps Eastern Baltimore County at the table."
        blurb="This grassroots campaign could not be possible without your help."
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
