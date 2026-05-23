import type { Metadata } from "next";
import Link from "next/link";
import { DonationStrip } from "@/components/DonationStrip";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { RevealImage } from "@/components/home/RevealImage";
import { InteriorHero } from "@/components/interior/InteriorHero";
import { CtaBand } from "@/components/interior/CtaBand";
import {
  CostGlyph,
  PeopleGlyph,
  PinGlyph,
  CommunityShieldGlyph,
  StarGlyph,
  CheckGlyph,
} from "@/components/home/Glyphs";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Contribute, volunteer, grab a yard sign, host a large sign, or share with your neighbors. Every voice keeps District 7A at the table.",
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

function ActionCard({
  num,
  label,
  title,
  body,
  cta,
  Glyph,
}: {
  num: string;
  label: string;
  title: string;
  body: string;
  cta: { label: string; href: string; external?: boolean };
  Glyph: (p: { size?: number }) => JSX.Element;
}) {
  return (
    <article className="card-soft flex h-full flex-col p-7 md:p-8">
      <div className="flex items-center justify-between">
        <div className="icon-chip icon-chip--soft">
          <Glyph size={24} />
        </div>
        <span className="font-display text-2xl font-extrabold text-brand-gold">
          {num}
        </span>
      </div>
      <span className="mt-5 text-xs font-bold uppercase tracking-widest text-brand-slate/60">
        {label}
      </span>
      <h3 className="mt-2 font-display text-xl font-bold leading-snug text-brand-navy">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-slate">
        {body}
      </p>
      <a
        href={cta.href}
        target={cta.external ? "_blank" : undefined}
        rel={cta.external ? "noopener noreferrer" : undefined}
        className="link-arrow mt-6 text-[11px]"
      >
        {cta.label} <Arrow />
      </a>
    </article>
  );
}

const actions = [
  {
    num: "01",
    label: "Contribute",
    title: "Fund the fight.",
    body: "Maryland's small-dollar limits keep this honest. Every $25 from a District 7A neighbor goes further than out-of-state corporate money ever could.",
    cta: { label: "Contribute Now", href: site.donateUrl, external: true },
    Glyph: CostGlyph,
  },
  {
    num: "02",
    label: "Volunteer",
    title: "Put boots on the ground.",
    body: "Door-knocks. Phone calls. Parade walks. Lit drops on a Saturday morning. If you've got an hour or an afternoon, we've got a job that needs doing.",
    cta: { label: "Sign Up", href: "/contact?subject=Volunteer" },
    Glyph: PeopleGlyph,
  },
  {
    num: "03",
    label: "Yard Sign",
    title: "Put one in your yard.",
    body: "Lawn-sized for the front yard, large-format for the corner lot or business storefront. Pick-up locations across the district once the season ramps up.",
    cta: { label: "Request a Sign", href: "/contact?subject=Yard%20Sign" },
    Glyph: PinGlyph,
  },
  {
    num: "04",
    label: "Host A Sign",
    title: "Big-format. Big visibility.",
    body: "If you've got a high-traffic corner, a business storefront, or a long driveway on a main road — we'd love to put a large-format sign in your yard.",
    cta: { label: "Host a Sign", href: "/contact?subject=Host%20a%20Large%20Sign" },
    Glyph: CommunityShieldGlyph,
  },
  {
    num: "05",
    label: "Share",
    title: "Share with your neighbors.",
    body: "Send this site to one neighbor. Share a post on Facebook, X, or Instagram. Endorse Ryan to your civic group, parish, or local business association.",
    cta: {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(site.url)}`,
      external: true,
    },
    Glyph: StarGlyph,
  },
  {
    num: "06",
    label: "Stay In Touch",
    title: "Get the campaign update.",
    body: "Periodic email updates from the campaign — never daily, never spammy. Town halls, big votes in Annapolis, and how to plug in when it matters.",
    cta: {
      label: "Email the Office",
      href: `mailto:${site.campaignEmail}?subject=Add%20me%20to%20the%20list`,
    },
    Glyph: CheckGlyph,
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <InteriorHero
        eyebrow="Join Us"
        title={
          <>
            Stand with <Underline>District&nbsp;7A</Underline>.
          </>
        }
        lede="Contribute. Volunteer. Grab a yard sign. Host a sign in your yard. Share with your neighbors. Every one of these makes a difference."
        media={{
          src: "/images/683140769_1380774737202209_6224571852968689830_n.jpg",
          alt: "Volunteers with a stack of Nawrocki campaign signs",
          objectPosition: "center 28%",
        }}
      />

      {/* ── Six ways to help ─────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">Six Ways to Help</p>
            <h2 className="h-section mt-4">Pick your lane — or all six.</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {actions.map((a, i) => (
              <Reveal key={a.num} delay={(i % 3) * 0.07} as="div">
                <ActionCard
                  num={a.num}
                  label={a.label}
                  title={a.title}
                  body={a.body}
                  cta={a.cta}
                  Glyph={a.Glyph}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Boots on the ground ──────────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <RevealImage
                src="/images/702466141_1399811325298550_357608900836313063_n.jpg"
                alt="Volunteers building yard-sign frames for the District 7A campaign"
                from="left"
                frameClassName="photo-frame aspect-[4/3] w-full"
                imgClassName="h-full w-full object-cover"
                objectPosition="center 38%"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="gold-tick" />
              <p className="eyebrow mt-5">Grassroots, For Real</p>
              <h2 className="h-section mt-4">
                Neighbors, <Underline>showing up</Underline> for neighbors.
              </h2>
              <div className="mt-6">
                <GoldRule />
              </div>
              <p className="lede mt-6">
                This campaign runs on volunteers — folks who build the sign
                frames, knock the doors, and walk the parade routes. No
                consultants, no out-of-state machine. Just District 7A neighbors
                doing the work.
              </p>
              <Link
                href="/contact?subject=Volunteer"
                className="link-arrow mt-8"
              >
                Join the Team <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Contribute deep-dive ─────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1180px] items-center gap-16 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
          <Reveal>
            <div className="gold-tick" />
            <p className="eyebrow mt-5">Why It Matters</p>
            <h2 className="h-section mt-4">
              Small-dollar, in-district, grassroots-funded.
            </h2>
            <div className="mt-6">
              <GoldRule />
            </div>
            <p className="lede mt-6">
              Friends of Ryan Nawrocki is a Maryland-registered, in-district
              committee. Every contribution is processed securely through
              Anedot. By Maryland law, we collect name, address, occupation,
              and employer on contributions of $50 or more.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-soft p-7">
              <p className="eyebrow">Suggested Levels</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[25, 50, 100, 250, 500, 1000].map((amt) => (
                  <a
                    key={amt}
                    href={`${site.donateUrl}?amount=${amt}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 items-center justify-center rounded border border-brand-hairline font-display text-lg font-extrabold text-brand-navy transition-colors hover:border-brand-maroon hover:bg-brand-maroon hover:text-white"
                  >
                    ${amt}
                  </a>
                ))}
              </div>
              <a
                href={site.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-maroon mt-6 w-full justify-center"
              >
                Contribute Now <Arrow />
              </a>
              <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-brand-slate/50">
                {site.authorityLine}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Out in the community ─────────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal delay={0.1} className="md:order-2">
              <RevealImage
                src="/images/678846962_1379904260622590_904275417940980376_n.jpg"
                alt="The campaign booth and volunteers at a District 7A community event"
                from="right"
                frameClassName="photo-frame aspect-[4/5] w-full"
                imgClassName="h-full w-full object-cover"
                objectPosition="center 32%"
              />
            </Reveal>
            <Reveal className="md:order-1">
              <div className="gold-tick" />
              <p className="eyebrow mt-5">Be Where We Are</p>
              <h2 className="h-section mt-4">
                Festivals, parades, and a booth near you.
              </h2>
              <div className="mt-6">
                <GoldRule />
              </div>
              <p className="lede mt-6">
                Find us at community events across eastern and northeastern
                Baltimore County. Stop by the booth, grab a sign, meet the team,
                and tell us what matters most to your block.
              </p>
              <Link href="/contact?subject=Events" className="link-arrow mt-8">
                Ask About Events <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Donation Strip ───────────────────────────────── */}
      <DonationStrip />

      {/* ── Closing CTA ──────────────────────────────────── */}
      <CtaBand
        eyebrow="Questions?"
        bgPosition="center 30%"
        title={
          <>
            Got a question?{" "}
            <span className="text-brand-gold">The office is open.</span>
          </>
        }
        blurb="Want to volunteer in a specific way? Have a sign location to offer? Hosting an event? Reach out directly."
      >
        <Link href="/contact" className="btn-maroon">
          Contact the Office <Arrow />
        </Link>
        <a
          href={`mailto:${site.campaignEmail}`}
          className="btn-outline-light"
        >
          {site.campaignEmail}
        </a>
      </CtaBand>
    </>
  );
}
