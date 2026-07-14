import Link from "next/link";
import { HeroLanding } from "@/components/hero/HeroLanding";
import { Reveal } from "@/components/primitives/Reveal";
import { CountUp } from "@/components/home/CountUp";
import { FeatureBand } from "@/components/home/FeatureBand";
import { CommunityMarquee } from "@/components/home/CommunityMarquee";
import { MobilePriorityList } from "@/components/home/MobilePriorityList";
import { ValueMarquee } from "@/components/home/ValueMarquee";
import { VideoBand } from "@/components/home/VideoBand";
import { RevealImage } from "@/components/home/RevealImage";
import { Underline } from "@/components/home/Underline";
import {
  PriorityGlyph,
  PeopleGlyph,
  BriefcaseGlyph,
  PinGlyph,
  CheckGlyph,
  CommunityShieldGlyph,
  FaithGlyph,
} from "@/components/home/Glyphs";
import { site } from "@/data/site";
import { priorities } from "@/data/priorities";
import { issues } from "@/data/issues";

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
    prefix: "",
    value: 85,
    suffix: "K+",
    label: "Constituents represented across District 7A",
    Glyph: PeopleGlyph,
  },
  {
    prefix: "$",
    value: 18,
    suffix: "M+",
    label: "Secured for local fire & rescue companies",
    Glyph: CommunityShieldGlyph,
  },
  {
    prefix: "$",
    value: 10,
    suffix: "M+",
    label: "In state bond funding secured this year alone",
    Glyph: BriefcaseGlyph,
  },
  {
    prefix: "",
    value: 100,
    suffix: "%",
    label: "Of new tax & fee hikes opposed",
    Glyph: CheckGlyph,
  },
];

const recordHighlights = [
  "Bipartisan Inspectors General reform to strengthen oversight.",
  "A property tax credit for all volunteer fire departments in Baltimore County.",
  "A property tax credit for police.",
  "Voted against ALL tax and fee increases on working families.",
];

const credentials = [
  { label: "Father of six", Glyph: FaithGlyph },
  { label: "Small-business owner", Glyph: BriefcaseGlyph },
  { label: "Lifelong Baltimore County", Glyph: PinGlyph },
];

const galleryRowA = [
  { src: "/images/645446748_1339363261343357_6092768245358700287_n.jpg", alt: "Ryan addressing the floor of the Maryland House of Delegates", position: "center 18%" },
  { src: "/images/689020973_1387987659814250_6988994727670242851_n.jpg", alt: "Ryan touring a Baltimore County recycling facility in a hard hat", position: "center 16%" },
  { src: "/images/700625466_1394039969209019_537555043998327653_n.jpg", alt: "Ryan speaking with constituents at a community center", position: "center 30%" },
  { src: "/images/701658114_1398120312134318_8447508087485607984_n.jpg", alt: "Ryan with a Girl Scouts of Central Maryland leader", position: "center 18%" },
  { src: "/images/641328756_1334733881806295_2224696825377124176_n.jpg", alt: "Delegate Nawrocki at a press briefing in Annapolis", position: "center 26%" },
  { src: "/images/589965019_1267314725214878_3925349742753260125_n.jpg", alt: "The Nawrocki family at a community event", position: "center 28%" },
  { src: "/images/family-patio.jpg", alt: "The Nawrocki family together on the Baltimore County waterfront", position: "center 42%" },
  { src: "/images/ryan-colleague.jpg", alt: "Ryan on the campaign trail across District 7A", position: "center 26%" },
];

const galleryRowB = [
  { src: "/images/672672916_1370489128230770_8338417330306756349_n.jpg", alt: "Ryan at work at his desk on the State House floor", position: "center 22%" },
  { src: "/images/667893278_1364758075470542_4539519443582783821_n.jpg", alt: "The Nawrocki family at a community event", position: "center 20%" },
  { src: "/images/685159083_1383746306905052_5733952956081640845_n.jpg", alt: "Ryan presenting a Maryland General Assembly citation", position: "center 30%" },
  { src: "/images/584546603_1262366352376382_7717335952773960812_n.jpg", alt: "Ryan at a press conference with the Maryland flag", position: "center 26%" },
  { src: "/images/680374620_1380667633879586_3268737700050580309_n.jpg", alt: "Ryan and his wife at a One Maryland One Shock Trauma event", position: "center 38%" },
  { src: "/images/577633690_1251974583415559_7591288720081703601_n.jpg", alt: "The Nawrocki family with the American and Maryland flags", position: "center 22%" },
  { src: "/images/ryan-table-meeting.jpg", alt: "Ryan meeting with residents around the table", position: "center 45%" },
];

const values = [
  "Lower Costs",
  "Safer Streets",
  "Reliable Energy",
  "Stronger Schools",
  "Accountable Government",
  "Faith & Family",
];

export default function HomePage() {
  const updates = issues.slice(0, 3);

  return (
    <>
      <HeroLanding />

      {/* ── District ribbon ───────────────────────────── */}
      <div className="district-ribbon" aria-hidden>
        <div className="district-ribbon__track">
          {[...site.districtAreas, ...site.districtAreas, "Proudly serving District 7A"].map(
            (area, i) => (
              <span key={`${area}-${i}`} className="flex items-center gap-[30px]">
                <span className="district-ribbon__item">{area}</span>
                <span className="district-ribbon__dot" />
              </span>
            ),
          )}
        </div>
      </div>

      {/* ── Intro / Meet Ryan ─────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-28">
          <Reveal>
            <p className="eyebrow">Husband · Father of Six · Delegate</p>
            <h2 className="h-section mt-4">
              Fighting for{" "}
              <span className="whitespace-nowrap">
                <Underline>Baltimore County</Underline>.
              </span>
            </h2>
            <div className="mt-6 max-[900px]:hidden">
              <GoldRule />
            </div>
            <p className="lede mt-6">
              Ryan Nawrocki is a husband, father of six, and small-business
              owner who has spent his life in Baltimore County. In Annapolis he
              fights for safer neighborhoods, lower costs, stronger schools, and
              a government that answers to the people it serves.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {credentials.map(({ label, Glyph }) => (
                <span key={label} className="cred-chip">
                  <Glyph size={17} />
                  {label}
                </span>
              ))}
            </div>
            <Link href="/meet-ryan" className="link-arrow mt-8">
              Meet Ryan <Arrow />
            </Link>
          </Reveal>

          {/* Layered photo composition */}
          <Reveal delay={0.1}>
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero/md-outline.png"
                alt=""
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-10 w-28 opacity-[0.10]"
              />
              <RevealImage
                src="/images/family-waterfront.jpg"
                alt="Ryan and Dr. Lauren Nawrocki with their six children on the Baltimore County waterfront"
                from="up"
                frameClassName="photo-frame aspect-[4/3] w-full"
                imgClassName="h-full w-full object-cover"
                objectPosition="center 42%"
              />
              <div className="absolute -bottom-6 right-5 flex items-center gap-3 rounded-2xl bg-brand-navy px-5 py-3.5 shadow-[0_18px_40px_rgba(7,25,63,0.28)]">
                <span className="font-display text-3xl font-extrabold text-brand-gold">
                  7A
                </span>
                <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-white/80">
                  District
                  <br />
                  delegate
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── By the numbers (photographic navy band) ───── */}
      <FeatureBand
        bgSrc="/images/672672916_1370489128230770_8338417330306756349_n.jpg"
        bgOpacity={0.18}
        bgPosition="center 28%"
      >
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <div className="gold-tick" />
            <p className="eyebrow eyebrow--light mt-5">By the Numbers</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white md:text-[2.75rem]">
              A district worth fighting for.
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

      {/* ── Kinetic value ticker ──────────────────────── */}
      <ValueMarquee items={values} />

      {/* ── Priorities (sticky two-column) ────────────── */}
      <section className="tex-grid">
        <div className="mx-auto grid max-w-[1180px] items-start gap-10 px-6 py-20 md:grid-cols-[0.82fr_1.18fr] md:gap-14 md:px-10 md:py-28">
          {/* Sticky rail */}
          <div className="md:sticky md:top-28 md:self-start">
            <Reveal>
              <div className="gold-tick" />
              <p className="eyebrow mt-5">What I&rsquo;m Fighting For</p>
              <h2 className="h-section mt-4">
                Ten priorities. One promise to District 7A.
              </h2>
              <p className="lede mt-5">
                Lower costs. Reliable energy. Safer streets. Stronger schools.
                An accountable government. Every vote starts with one question —
                does it serve District 7A?
              </p>
              <Link href="/priorities" className="btn-maroon mt-8 max-[900px]:hidden">
                See All Priorities <Arrow />
              </Link>
            </Reveal>
          </div>

          {/* Desktop: scrolling card grid beside the sticky rail */}
          <div className="grid gap-5 sm:grid-cols-2 max-[900px]:hidden">
            {priorities.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.06} as="div">
                <Link
                  href={`/priorities#${p.slug}`}
                  className="priority-card h-full"
                >
                  <div className="priority-card__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image ?? `/images/priorities/${p.slug}.png`}
                      alt=""
                      loading="lazy"
                      style={
                        p.imagePosition
                          ? { objectPosition: p.imagePosition }
                          : undefined
                      }
                    />
                    <span className="priority-card__tag">{p.numeral}</span>
                  </div>
                  <div className="priority-card__inner">
                    <div className="icon-chip icon-chip--soft priority-card__chip">
                      <PriorityGlyph slug={p.slug} size={26} />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold leading-snug text-brand-navy">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-brand-slate">
                      {p.summary.split(". ")[0]}.
                    </p>
                    <span className="link-arrow mt-5 text-[11px]">
                      Read more <Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Mobile: tap a card to expand a short summary inline */}
          <MobilePriorityList />
        </div>
      </section>

      {/* ── Cinematic video band ──────────────────────── */}
      <VideoBand
        src="/hero/hero-clip.mp4"
        poster="/images/645446748_1339363261343357_6092768245358700287_n.jpg"
        kicker="From the Floor in Annapolis"
        quote="Every vote I take starts with one question — does it make life safer, freer, and more prosperous for the families of District 7A?"
        cite="Ryan Nawrocki · Delegate, Maryland District 7A"
      />

      {/* ── Record ────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
          <Reveal className="md:order-2">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">What I&rsquo;ve Delivered</p>
            <h2 className="h-section mt-4">
              A record of <Underline delay={0.1}>showing up</Underline>.
            </h2>
            <ul className="mt-8 space-y-5">
              {recordHighlights.map((t) => (
                <li key={t} className="check-row">
                  <span className="check-badge">
                    <CheckGlyph size={15} />
                  </span>
                  <span className="leading-relaxed text-brand-slate">{t}</span>
                </li>
              ))}
            </ul>
            <Link href="/record" className="link-arrow mt-9">
              See the Record <Arrow />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="md:order-1">
            <div className="relative">
              <RevealImage
                src="/images/641328756_1334733881806295_2224696825377124176_n.jpg"
                alt="Delegate Nawrocki with colleagues at a press briefing in Annapolis"
                from="left"
                frameClassName="photo-frame aspect-[4/3] w-full"
                imgClassName="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── On the ground (two-row photo marquee) ─────── */}
      <section className="tex-grid py-16 md:py-20">
        <div className="mx-auto mb-10 max-w-[1180px] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow">Out in the Community</p>
            <h2 className="h-section mt-4">
              On the ground across{" "}
              <Underline delay={0.1}>District 7A</Underline>.
            </h2>
          </Reveal>
        </div>
        <CommunityMarquee shots={[...galleryRowA, ...galleryRowB]} />
      </section>

      {/* ── Updates ───────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <p className="eyebrow">Latest Updates</p>
              <h2 className="h-section mt-4">
                News from Annapolis &amp; the district.
              </h2>
            </Reveal>
            <Link href="/issues" className="link-arrow link-arrow--navy">
              All Updates <Arrow />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {updates.map((u, i) => (
              <Reveal key={u.slug} delay={i * 0.08} as="div">
                <Link
                  href={`/issues/${u.slug}`}
                  className="card-soft flex h-full flex-col overflow-hidden"
                >
                  {u.image && (
                    <div className="update-card__media aspect-[16/10] w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={u.image.src}
                        alt={u.image.alt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-maroon">
                      {u.topic}
                    </p>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-brand-navy">
                      {u.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-slate">
                      {u.excerpt}
                    </p>
                    <span className="link-arrow mt-5 text-[11px]">
                      Read more <Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA (photographic navy band) ──────── */}
      <FeatureBand
        bgSrc="/images/588512414_1266055232007494_3344370248710133705_n.jpg"
        bgOpacity={0.2}
        bgPosition="center 30%"
      >
        <div className="mx-auto max-w-[1180px] px-6 py-12 text-center md:px-10 md:py-14">
          <Reveal>
            <div className="mx-auto flex w-fit"><div className="gold-tick" /></div>
            <p className="eyebrow eyebrow--light mt-4">Stand With District 7A</p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
              Every neighbor who steps up keeps Eastern Baltimore County at the
              table.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/75">
              This grassroots campaign could not be possible without your help.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
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
            </div>
          </Reveal>
        </div>
      </FeatureBand>
    </>
  );
}
