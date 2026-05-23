"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Priority } from "@/data/priorities";

type Props = {
  pillars: Priority[];
};

/**
 * PillarStack — one 100vh slide per priority. Sticky right-rail progress
 * indicator. Slides alternate --ink/--maroon. Roman/numeric watermark.
 *
 * Each slide renders headline + summary on the left, "What I've Done" /
 * "What's Next" stacked on the right.
 */
export function PillarStack({ pillars }: Props) {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((section, i) => {
      if (!section) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
              setActive(i);
            }
          });
        },
        { threshold: [0.4, 0.6] },
      );
      obs.observe(section);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [pillars.length]);

  return (
    <div className="relative">
      {/* Right rail indicator */}
      <nav
        aria-label="Priorities progress"
        className="fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      >
        {pillars.map((p, i) => (
          <a
            key={p.slug}
            href={`#${p.slug}`}
            aria-label={`Pillar ${p.numeral} — ${p.title}`}
            className={cn(
              "block h-3 w-3 rounded-full transition-all duration-300",
              i === active
                ? "bg-md-gold ring-2 ring-md-gold ring-offset-2 ring-offset-transparent"
                : "bg-rule-dark hover:bg-mute",
            )}
          />
        ))}
      </nav>

      {pillars.map((p, i) => (
        <section
          key={p.slug}
          id={p.slug}
          ref={(el) => {
            if (el) sectionRefs.current[i] = el;
          }}
          className={cn(
            "relative isolate flex items-center overflow-hidden py-24 md:min-h-screen md:py-32",
            i % 2 === 0 ? "panel-ink" : "panel-maroon",
            "grain",
          )}
        >
          {/* Number watermark */}
          <span
            aria-hidden
            className="roman-watermark pointer-events-none absolute right-[-4vw] bottom-[-8vw] z-0 select-none"
          >
            {p.numeral}
          </span>

          <div className="shell relative z-10 grid items-start gap-12 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="t-mono text-md-gold text-sm uppercase tracking-[0.22em]">
                Pillar {p.numeral} of {pillars.length}
              </p>
              <h2 className="t-h2 mt-6 text-white">{p.title}</h2>
              <p className="t-lede mt-6 max-w-[36rem]">{p.summary}</p>
            </div>

            <div className="md:col-span-6 grid gap-10 md:grid-cols-2">
              {p.delivered.length > 0 ? (
                <div>
                  <p className="t-mono text-xs uppercase tracking-[0.22em] text-md-gold">
                    What I&rsquo;ve Done
                  </p>
                  <span className="mt-3 block h-px w-12 bg-md-gold" />
                  <ul className="prose-dark mt-4">
                    {p.delivered.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {p.next.length > 0 ? (
                <div>
                  <p className="t-mono text-xs uppercase tracking-[0.22em] text-md-red-hot">
                    What&rsquo;s Next
                  </p>
                  <span className="mt-3 block h-px w-12 bg-md-red" />
                  <ul className="prose-dark mt-4">
                    {p.next.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
