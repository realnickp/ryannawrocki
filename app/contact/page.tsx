import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { InteriorHero } from "@/components/interior/InteriorHero";
import { CtaBand } from "@/components/interior/CtaBand";
import { PhoneIcon } from "@/components/signature/Icons";
import {
  CostGlyph,
  PeopleGlyph,
  PinGlyph,
  CommunityShieldGlyph,
} from "@/components/home/Glyphs";

export const metadata: Metadata = {
  title: "Contact & Get Involved",
  description:
    "Volunteer, order a yard sign, contribute, or ask a question. Get in touch with the Ryan Nawrocki campaign.",
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

type Way = {
  label: string;
  body: string;
  Glyph: (props: { size?: number }) => JSX.Element;
  cta?: { label: string; href: string };
};

const ways: Way[] = [
  {
    label: "Contribute",
    body: "Fuel a grassroots, in-district campaign — every dollar stays local.",
    cta: { label: "Donate", href: site.donateUrl },
    Glyph: CostGlyph,
  },
  {
    label: "Volunteer",
    body: "Knock doors, make calls, walk parades, or help at events.",
    Glyph: PeopleGlyph,
  },
  {
    label: "Order a Yard Sign",
    body: "Put one in your yard, your storefront, or a corner lot.",
    Glyph: PinGlyph,
  },
  {
    label: "Host a Large Sign",
    body: "Got a high-traffic corner or driveway on a main road? Let's talk.",
    Glyph: CommunityShieldGlyph,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <InteriorHero
        eyebrow="Get Involved · Contact"
        title={
          <>
            I am here to <Underline>serve you</Underline>.
          </>
        }
        lede="Volunteer, order a yard sign, contribute, or just ask a question — there's a place for every neighbor in this campaign. Reach out and the team will get right back to you."
        media={{
          src: "/images/638311408_1330022062277477_3320982621272389921_n.jpg",
          alt: "Ryan at the Maryland State Board of Elections",
          aspect: "aspect-[4/5]",
          objectPosition: "center 38%",
        }}
      />

      {/* ── Ways to get involved ─────────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">Ways to Get Involved</p>
            <h2 className="h-section mt-4">Pick a way to pitch in.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ways.map((w, i) => (
              <Reveal key={w.label} delay={(i % 4) * 0.06} as="div">
                <article className="card-soft flex h-full flex-col p-6">
                  <div className="icon-chip icon-chip--soft">
                    <w.Glyph size={24} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold leading-snug text-brand-navy">
                    {w.label}
                  </h3>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-brand-slate">
                    {w.body}
                  </p>
                  {w.cta && (
                    <a
                      href={w.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow mt-5 text-[11px]"
                    >
                      {w.cta.label} <Arrow />
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ───────────────────────────────── */}
      <section id="message" className="scroll-mt-24 bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-16 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
          {/* Sidebar */}
          <Reveal as="aside" className="md:col-span-4 md:order-2">
            <div className="card-soft p-7">
              <div className="gold-tick" />
              <p className="eyebrow mt-5">Reach the Campaign</p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-slate/60">
                    Mailing
                  </p>
                  <p className="mt-1 text-[15px] text-brand-navy">
                    {site.mailing}
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="icon-chip icon-chip--soft icon-chip--mini flex-shrink-0">
                    <PhoneIcon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-slate/60">
                      Campaign
                    </p>
                    <a
                      href={`tel:${site.campaignPhone}`}
                      className="mt-1 block text-[15px] font-medium text-brand-navy hover:text-brand-maroon"
                    >
                      {site.campaignPhone}
                    </a>
                    <a
                      href={`mailto:${site.campaignEmail}`}
                      className="block text-[15px] text-brand-maroon hover:underline"
                    >
                      {site.campaignEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="md:col-span-8 md:order-1">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">Send a Message</p>
            <h2 className="h-section mt-4">How can we help?</h2>
            <div className="mt-10 max-w-[680px]">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────── */}
      <CtaBand
        eyebrow="Stay Connected"
        bgSrc="/images/658039015_1358413839438299_4369832418674886891_n.jpg"
        bgPosition="center 30%"
        title="Follow the campaign on social media."
      >
        {(
          [
            ["Facebook", site.social.facebook],
            ["X", site.social.x],
            ["Instagram", site.social.instagram],
            ["LinkedIn", site.social.linkedin],
            ["YouTube", site.social.youtube],
          ] as [string, string][]
        ).map(([label, href]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow link-arrow--light"
          >
            {label} <Arrow />
          </a>
        ))}
      </CtaBand>
    </>
  );
}
