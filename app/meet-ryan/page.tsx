import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { RevealImage } from "@/components/home/RevealImage";
import { FeatureBand } from "@/components/home/FeatureBand";
import { CountUp } from "@/components/home/CountUp";
import { InteriorHero } from "@/components/interior/InteriorHero";
import { CtaBand } from "@/components/interior/CtaBand";
import {
  FaithGlyph,
  BriefcaseGlyph,
  StarGlyph,
  GovernmentGlyph,
} from "@/components/home/Glyphs";

export const metadata: Metadata = {
  title: "Meet Ryan",
  description:
    "A lifelong Baltimore County resident, small business owner, and dedicated public servant.",
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

const educationItems = [
  { year: "2002", school: "Loyola Blakefield", detail: "Graduated — Towson, MD" },
  {
    year: "2006",
    school: "St. Mary's College of Maryland",
    detail:
      "B.A., honors — Political Science, Public Policy, Economics, Sociology & Anthropology",
  },
  {
    year: "2017",
    school: "Johns Hopkins University",
    detail: "Master of Public Administration",
  },
  { year: "—", school: "Leadership Baltimore County", detail: "Program graduate" },
];

const stats = [
  { value: 6, suffix: "", count: true, label: "Children at home in Middle River", Glyph: FaithGlyph },
  { value: 3, suffix: "", count: true, label: "Businesses founded or co-owned", Glyph: BriefcaseGlyph },
  { value: 40, suffix: "", count: true, label: "Named to the Daily Record VIP List — 40 Under 40", Glyph: StarGlyph },
  { value: 2022, suffix: "", count: false, label: "Elected to the Maryland House of Delegates", Glyph: GovernmentGlyph },
];

const businesses = [
  { name: "Red, White & Blue Group", role: "Founder · Communications consulting" },
  { name: "Latitude Red", role: "Partner" },
  { name: "Green Relief Health", role: "Owner · Wellness medical practice" },
];

const committees = [
  "Environment and Transportation Committee",
  "Housing & Real Property Subcommittee",
  "Land Use & Ethics Subcommittee",
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
        lede="A Parkville native, Middle River resident, and lifelong Baltimore County guy — fighting for faith, freedom, and strong communities across Maryland."
        media={{
          src: "/images/443842377_873239447955743_503516871382094373_n.jpg",
          alt: "Official portrait of Delegate Ryan Nawrocki",
          objectPosition: "center 25%",
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

      {/* ── Opening bio ──────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex w-fit">
              <div className="gold-tick" />
            </div>
            <p className="eyebrow mt-5">About Ryan</p>
            <h2 className="h-section mt-4">
              Born in Parkville. Rooted in{" "}
              <Underline delay={0.1}>Middle River</Underline>.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="prose-light mx-auto mt-10 max-w-3xl">
            <p>
              Ryan was born and raised in Parkville. He lives in Middle River
              with his wife, Dr. Lauren Nawrocki, and their six children.
              He&rsquo;s a small-business owner, a Loyola Blakefield grad, a
              Johns Hopkins grad — and the Maryland State Delegate for District
              7A.
            </p>
            <p>
              His approach to public service is simple: show up, listen, and
              bring Eastern Baltimore County&rsquo;s voice to Annapolis. That
              means riding along with local police, attending community events,
              fighting the bills that raise costs on working families, and
              returning every call from a constituent who needs help.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stats band ───────────────────────────────────── */}
      <FeatureBand
        bgSrc="/images/580541720_1253084943304523_5959235873528429245_n.jpg"
        bgOpacity={0.16}
        bgPosition="center 30%"
      >
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <div className="gold-tick" />
            <p className="eyebrow eyebrow--light mt-5">By the Numbers</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white md:text-[2.75rem]">
              A life built in Baltimore County.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="icon-chip icon-chip--gold icon-chip--mini">
                  <s.Glyph size={20} />
                </div>
                <p className="stat-figure mt-5">
                  {s.count === false ? (
                    s.value
                  ) : (
                    <CountUp value={s.value} suffix={s.suffix} />
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

      {/* ── Education ────────────────────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-start gap-12 md:grid-cols-2">
            <Reveal>
              <div className="gold-tick" />
              <p className="eyebrow mt-5">01 — Education</p>
              <h2 className="h-section mt-4">Four majors, two degrees, one home.</h2>
              <div className="mt-6">
                <GoldRule />
              </div>
              <p className="lede mt-6">
                A proud product of Baltimore County schools, Ryan earned a B.A.
                with honors from St. Mary&rsquo;s College and an M.P.A. from
                Johns Hopkins — then came home to serve the community that
                shaped him.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-0 divide-y divide-brand-hairline">
                {educationItems.map((e) => (
                  <li key={e.school} className="py-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                      {e.year}
                    </p>
                    <p className="mt-1 font-display text-lg font-bold leading-snug text-brand-navy">
                      {e.school}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-brand-slate">
                      {e.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Public Service ───────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal delay={0.1} className="md:order-2">
              <RevealImage
                src="/images/476161168_1045596097386743_6346812120011350622_n.jpg"
                alt="Ryan speaking with constituents at a District 7A town hall"
                from="right"
                frameClassName="photo-frame aspect-[4/3] w-full"
                imgClassName="h-full w-full object-cover"
                objectPosition="center 35%"
              />
            </Reveal>
            <Reveal className="md:order-1">
              <div className="gold-tick" />
              <p className="eyebrow mt-5">02 — Public Service</p>
              <h2 className="h-section mt-4">
                From BWI to Capitol Hill. From MTA to a Top 40 Under 40.
              </h2>
              <div className="mt-6">
                <GoldRule />
              </div>
              <div className="prose-light mt-6">
                <p>
                  Ryan began his public service as a Public Information Officer
                  for the Maryland Aviation Administration, managing
                  communications for BWI Thurgood Marshall and Martin State
                  Airports. He served as Communications Coordinator at
                  LifeBridge Health and then as Communications Director in the
                  U.S. House of Representatives for several Members of Congress,
                  including Congressman Andy Harris.
                </p>
                <p>
                  In 2016, he was appointed Senior Director of Communications
                  and Marketing at the Maryland Transit Administration, where
                  his leadership earned him a place on The Daily Record&rsquo;s
                  VIP List — honoring 40 top leaders under age 40 across
                  Maryland.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Entrepreneurship ─────────────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">03 — Entrepreneurship</p>
            <h2 className="h-section mt-4">Three businesses. Three perspectives.</h2>
            <p className="lede mt-5">
              Leveraging his public and private-sector experience, Ryan founded
              and built ventures rooted in communication, strategy, and
              community health.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {businesses.map((b, i) => (
              <Reveal key={b.name} delay={i * 0.07} as="div">
                <div className="card-soft h-full p-7">
                  <div className="icon-chip icon-chip--soft">
                    <BriefcaseGlyph size={24} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold leading-snug text-brand-navy">
                    {b.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-brand-maroon">
                    {b.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── House of Delegates ───────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-start gap-12 md:grid-cols-2">
            <Reveal>
              <div className="gold-tick" />
              <p className="eyebrow mt-5">04 — House of Delegates</p>
              <h2 className="h-section mt-4">Elected 2022. Sworn in to represent.</h2>
              <div className="mt-6">
                <GoldRule />
              </div>
              <div className="prose-light mt-6">
                <p>
                  In 2022, voters in District 7A elected Ryan to the Maryland
                  House of Delegates, where he works to represent the people of
                  eastern Baltimore County with a focus on public safety,
                  economic growth, and government accountability.
                </p>
              </div>
              <Link href="/record" className="link-arrow mt-8">
                See the Record <Arrow />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-soft p-7">
                <p className="eyebrow">Committee Assignments</p>
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
              <div className="mt-6">
                <RevealImage
                  src="/images/618635804_1308182807794736_1735708178472901723_n.jpg"
                  alt="Delegate Nawrocki with colleagues and constituents in Annapolis"
                  from="up"
                  frameClassName="photo-frame aspect-[16/9] w-full"
                  imgClassName="h-full w-full object-cover"
                  objectPosition="center 32%"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Community ────────────────────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <div className="gold-tick" />
              <p className="eyebrow mt-5">05 — Community</p>
              <h2 className="h-section mt-4">Roots that run deep.</h2>
              <div className="mt-6">
                <GoldRule />
              </div>
              <div className="prose-light mt-6">
                <p>
                  Ryan&rsquo;s community involvement runs deep. He serves on the
                  Board of Directors for the Middle River Volunteer Fire &amp;
                  Rescue Company and has been a member of the Sons of the
                  American Legion (Post No. 180 in Rosedale), the White
                  Marsh&ndash;Cowenton Community Association, the Bird River Road
                  Neighborhood Association, and the White Marsh Police &amp;
                  Community Relations Council. He is also a member of the
                  Knights of Columbus, Pope John Paul the Great Council at Our
                  Lady Queen of Peace Church in Middle River.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <RevealImage
                src="/images/594837368_1273602047919479_5801360689140435190_n.jpg"
                alt="Ryan and his children at a District 7A community parade"
                from="left"
                frameClassName="photo-frame aspect-[4/3] w-full"
                imgClassName="h-full w-full object-cover"
                objectPosition="center 22%"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Family ───────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
            <Reveal>
              <RevealImage
                src="/images/666633152_1364758068803876_5967444482849672305_n.jpg"
                alt="Ryan and Dr. Lauren Nawrocki with their six children"
                from="up"
                frameClassName="photo-frame aspect-[2/3] w-full"
                imgClassName="h-full w-full object-cover"
                objectPosition="center 18%"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="gold-tick" />
              <p className="eyebrow mt-5">06 — Family</p>
              <h2 className="h-section mt-4">
                Middle River. Six kids and counting.
              </h2>
              <div className="mt-6">
                <GoldRule />
              </div>
              <p className="lede mt-6">
                Ryan lives in Middle River with his wife, Dr. Lauren Nawrocki,
                and their six children — the reason he fights for safer streets,
                stronger schools, and a future worth staying for.
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

      {/* ── Closing CTA ──────────────────────────────────── */}
      <CtaBand
        eyebrow="Stand With District 7A"
        bgSrc="/images/569760336_1241608057785545_2659619059895616197_n.jpg"
        bgPosition="center 30%"
        title="My job is simple: show up, listen, and bring Eastern Baltimore County's voice to Annapolis."
        blurb="— Delegate Ryan Nawrocki"
      >
        <a
          href={site.donateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-maroon"
        >
          Contribute <Arrow />
        </a>
        <Link href="/get-involved" className="btn-outline-light">
          Get Involved <Arrow />
        </Link>
      </CtaBand>
    </>
  );
}
