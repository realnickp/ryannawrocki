import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { InteriorHero } from "@/components/interior/InteriorHero";
import { CtaBand } from "@/components/interior/CtaBand";
import { PhoneIcon, MailIcon } from "@/components/signature/Icons";
import { GovernmentGlyph } from "@/components/home/Glyphs";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Delegate Nawrocki's office for constituent service, state agency help, scholarship inquiries, and press.",
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

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <InteriorHero
        eyebrow="Constituent Services"
        title={
          <>
            My office is here to <Underline>serve you</Underline>.
          </>
        }
        lede="Question about state government? Trouble with a state agency? Idea, concern, complaint, or compliment? Reach out — we read everything and we respond."
        media={{
          src: "/images/700625466_1394039969209019_537555043998327653_n.jpg",
          alt: "Ryan meeting with constituents",
          objectPosition: "center 30%",
        }}
      />

      {/* ── Form + Sidebar ───────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-16 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
          {/* Sidebar */}
          <Reveal as="aside" className="md:col-span-4 md:order-2">
            {/* Contact info */}
            <div className="card-soft p-7">
              <div className="gold-tick" />
              <p className="eyebrow mt-5">Office Info</p>

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
                      Annapolis Office
                    </p>
                    <a
                      href={`tel:${site.officePhone}`}
                      className="mt-1 block text-[15px] font-medium text-brand-navy hover:text-brand-maroon"
                    >
                      {site.officePhone}
                    </a>
                    <a
                      href={`mailto:${site.officeEmail}`}
                      className="block break-all text-[15px] text-brand-maroon hover:underline"
                    >
                      {site.officeEmail}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="icon-chip icon-chip--soft icon-chip--mini flex-shrink-0">
                    <MailIcon size={18} />
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

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-slate/60">
                    Office Hours
                  </p>
                  <p className="mt-1 text-[15px] text-brand-slate">
                    Mon – Fri, 8 am – 5 pm
                  </p>
                </div>
              </div>
            </div>

            {/* Agencies */}
            <div className="mt-8 card-soft p-7">
              <div className="icon-chip icon-chip--soft">
                <GovernmentGlyph size={24} />
              </div>
              <p className="eyebrow mt-5">Agencies We Help With</p>
              <p className="mt-3 text-[14px] leading-relaxed text-brand-slate">
                Casework is free and confidential.
              </p>
              <ul className="mt-5 space-y-3">
                {site.agenciesWeHelpWith.map((a) => (
                  <li key={a} className="flex gap-3 text-[14px] text-brand-navy">
                    <span className="mt-2 h-0.5 w-3 flex-shrink-0 bg-brand-gold" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="md:col-span-8 md:order-1">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">Send a Message</p>
            <h2 className="h-section mt-4">How can the office help?</h2>
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
