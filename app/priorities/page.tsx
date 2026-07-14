import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Underline } from "@/components/home/Underline";
import { PriorityStack } from "@/components/home/PriorityStack";
import { InteriorHero } from "@/components/interior/InteriorHero";
import { CtaBand } from "@/components/interior/CtaBand";

export const metadata: Metadata = {
  title: "Priorities",
  description:
    "Ten priorities for District 7A — lowering costs, public safety, accountable government, strong schools, and the communities Ryan calls home.",
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

export default function PrioritiesPage() {
  return (
    <>
      {/* ── Page Hero ─────────────────────────────────── */}
      <InteriorHero
        eyebrow="What I'm Fighting For"
        title={
          <>
            Ten priorities. One promise to{" "}
            <Underline>District 7A</Underline>.
          </>
        }
        lede="Every vote I take in Annapolis starts with one question: does it serve the people of Baltimore County? These are the priorities I've been fighting for — and the fights I'm taking into a second term."
        media={{
          src: "/images/670225829_1369014301711586_8348301270578710042_n.jpg",
          alt: "Ryan with colleagues on the floor of the Maryland House of Delegates",
          objectPosition: "center 40%",
        }}
      />

      {/* ── All 10 priorities (full width) ──── */}
      <section className="tex-grid">
        <div className="px-4 py-16 sm:px-6 md:px-10 md:py-24">
          <PriorityStack detailed />
        </div>
      </section>

      {/* ── CTA band ──────────────────────────────────── */}
      <CtaBand
        eyebrow="Stand With District 7A"
        bgSrc="/images/589965019_1267314725214878_3925349742753260125_n.jpg"
        bgPosition="center 28%"
        title="Every neighbor who steps up keeps Eastern Baltimore County at the table."
        blurb="Contribute, volunteer, or request a yard sign — it all makes a difference."
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
