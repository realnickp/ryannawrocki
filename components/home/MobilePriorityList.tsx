"use client";

import { useState } from "react";
import Link from "next/link";
import { priorities } from "@/data/priorities";
import { PriorityGlyph } from "@/components/home/Glyphs";
import { Reveal } from "@/components/primitives/Reveal";

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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Mobile-only priorities list for the homepage. Each card taps open to reveal a
 * short summary inline (rather than navigating away); a single "See All
 * Priorities" button at the bottom links to the full page.
 */
export function MobilePriorityList() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <div className="min-[901px]:hidden">
      <ol className="space-y-3">
        {priorities.map((p, i) => {
          const isOpen = openSlug === p.slug;
          return (
            <Reveal
              key={p.slug}
              delay={Math.min(i, 4) * 0.04}
              as="li"
              className="card-soft overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenSlug(isOpen ? null : p.slug)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <div className="icon-chip icon-chip--soft icon-chip--mini flex-shrink-0">
                  <PriorityGlyph slug={p.slug} size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-maroon">
                    {p.numeral}
                  </p>
                  <h3 className="mt-0.5 font-display text-[15px] font-bold leading-snug text-brand-navy">
                    {p.title}
                  </h3>
                </div>
                <span className="flex-shrink-0 text-brand-maroon">
                  <Chevron open={isOpen} />
                </span>
              </button>
              {isOpen && (
                <div className="border-t border-brand-hairline px-4 py-4">
                  <p className="text-[14px] leading-relaxed text-brand-slate">
                    {p.summary}
                  </p>
                  <Link
                    href={`/priorities#${p.slug}`}
                    className="link-arrow mt-3 text-[11px]"
                  >
                    Read More <Arrow />
                  </Link>
                </div>
              )}
            </Reveal>
          );
        })}
      </ol>

      <Link
        href="/priorities"
        className="btn-maroon mt-6 flex w-full justify-center"
      >
        See All Priorities <Arrow />
      </Link>
    </div>
  );
}
