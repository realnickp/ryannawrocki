import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { RevealImage } from "@/components/home/RevealImage";
import { InteriorHero } from "@/components/interior/InteriorHero";
import { CtaBand } from "@/components/interior/CtaBand";

export const metadata: Metadata = {
  title: "Legislative Scholarships",
  description:
    "Each year, Delegate Nawrocki awards Maryland Legislative Scholarships to students from District 7A.",
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

const steps = [
  {
    numeral: "01",
    label: "Eligibility",
    body: "Open to District 7A residents accepted at an eligible Maryland college, university, or career school. Two-year and four-year institutions both qualify.",
  },
  {
    numeral: "02",
    label: "Process",
    body: "Apply through the Maryland Higher Education Commission (MHEC). Submit materials directly to the District 7A scholarship committee for review.",
  },
  {
    numeral: "03",
    label: "Timeline",
    body: "The scholarship committee reviews applications each spring. Awards are announced ahead of the fall academic term.",
  },
];

export default function ScholarshipsPage() {
  return (
    <>
      {/* ── Page Hero ─────────────────────────────────── */}
      <InteriorHero
        eyebrow="Legislative Scholarships"
        title={
          <>
            Investing in District&nbsp;7A&rsquo;s{" "}
            <Underline>next generation</Underline>.
          </>
        }
        lede="Each year, Delegate Nawrocki awards Maryland Legislative Scholarships to students from District 7A pursuing higher education."
        media={{
          src: "/images/priorities/strong-schools-opportunity.png",
          alt: "A bright Maryland classroom",
        }}
      />

      {/* ── How It Works ──────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">How It Works</p>
            <h2 className="h-section mt-4">
              A path to higher education for Maryland students.
            </h2>
            <p className="lede mt-5">
              Maryland Legislative Scholarships are administered through the
              Maryland Higher Education Commission. Here&rsquo;s what you need to
              know.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.numeral} delay={(i % 3) * 0.07} as="div">
                <div className="card-soft flex h-full flex-col p-7 md:p-8">
                  <span className="font-display text-2xl font-extrabold text-brand-gold">
                    {step.numeral}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold leading-snug text-brand-navy">
                    {step.label}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-slate">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MHEC + Contact ────────────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-8 md:grid-cols-2">

            {/* MHEC callout */}
            <Reveal as="div">
              <div className="card-soft flex h-full flex-col p-8 md:p-10">
                <p className="eyebrow">MHEC</p>
                <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-brand-navy">
                  Apply through the Maryland Higher Education Commission.
                </h3>
                <p className="mt-5 flex-1 text-[15px] leading-relaxed text-brand-slate">
                  The State Senatorial &amp; Delegate Scholarship application is
                  available through MHEC. Complete the application there and
                  submit materials to the District 7A committee.
                </p>
                <a
                  href={site.mhecUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow mt-8"
                >
                  Open MHEC <Arrow />
                </a>
              </div>
            </Reveal>

            {/* Contact */}
            <Reveal as="div" delay={0.1}>
              <div className="card-soft flex h-full flex-col p-8 md:p-10">
                <p className="eyebrow">Contact</p>
                <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-brand-navy">
                  Request the application link.
                </h3>
                <p className="mt-5 text-[15px] leading-relaxed text-brand-slate">
                  Send completed scholarship materials directly to the District 7A
                  scholarship committee, or contact the Annapolis office for
                  guidance.
                </p>
                <ul className="mt-8 flex-1 space-y-4">
                  <li>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-slate/70">
                      Scholarship Committee
                    </p>
                    <a
                      href={`mailto:${site.scholarshipEmail}`}
                      className="mt-1 block break-all text-[15px] font-medium text-brand-maroon hover:underline"
                    >
                      {site.scholarshipEmail}
                    </a>
                  </li>
                  <li>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-slate/70">
                      Annapolis Office
                    </p>
                    <a
                      href={`tel:${site.officePhone}`}
                      className="mt-1 block text-[15px] font-medium text-brand-navy hover:text-brand-maroon"
                    >
                      {site.officePhone}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Eligibility details ───────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <div className="gold-tick" />
              <p className="eyebrow mt-5">Who Can Apply</p>
              <h2 className="h-section mt-4">
                Scholarships for District 7A residents.
              </h2>
              <div className="mt-6">
                <GoldRule />
              </div>
              <ul className="mt-7 space-y-4">
                {[
                  "Must be a resident of Maryland House District 7A.",
                  "Must be accepted at or enrolled in an eligible Maryland institution.",
                  "Two-year and four-year colleges, universities, and career schools qualify.",
                  "Renewable awards — recipients may reapply in subsequent years.",
                  "Applications reviewed each spring for fall academic term awards.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-brand-slate">
                    <span className="mt-2.5 h-0.5 w-4 flex-shrink-0 bg-brand-gold" />
                    <span className="text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <RevealImage
                src="/images/priorities/strong-schools-opportunity.png"
                alt="A District 7A classroom — the kind of Maryland education these scholarships support"
                from="right"
                frameClassName="photo-frame aspect-[4/3] w-full"
                imgClassName="h-full w-full object-cover"
                objectPosition="center"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ───────────────────────────────── */}
      <CtaBand
        eyebrow="Eastern Baltimore County’s Next Class"
        title="Ready to apply for a Legislative Scholarship?"
        blurb="Contact the District 7A scholarship committee to request application materials and learn more about the process."
      >
        <a href={`mailto:${site.scholarshipEmail}`} className="btn-maroon">
          Request the Application <Arrow />
        </a>
        <Link href="/contact" className="btn-outline-light">
          Contact the Office <Arrow />
        </Link>
      </CtaBand>
    </>
  );
}
