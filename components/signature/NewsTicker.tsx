"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Item = {
  date: string;
  topic: string;
  title: string;
  href: string;
};

type Props = {
  items: Item[];
  className?: string;
};

/**
 * Vertical news ticker — three rotating headlines.
 * Switches every 5s with a clip-mask transition. Pauses on hover/focus.
 */
export function NewsTicker({ items, className }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden border-y border-rule-dark bg-ink",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-live="polite"
    >
      <div className="shell flex items-center gap-6 py-5 md:py-7">
        <span className="t-mono shrink-0 text-md-gold text-xs uppercase tracking-[0.22em]">
          Latest
        </span>
        <span aria-hidden className="hidden h-4 w-px bg-rule-dark md:block" />
        <div className="relative flex-1 overflow-hidden" style={{ height: 28 }}>
          {items.map((it, i) => (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "absolute inset-0 flex items-center gap-4 transition-all duration-500 ease-stage",
                i === active
                  ? "translate-y-0 opacity-100"
                  : i < active
                    ? "-translate-y-full opacity-0"
                    : "translate-y-full opacity-0",
              )}
              tabIndex={i === active ? 0 : -1}
            >
              <span className="t-mono shrink-0 text-xs uppercase tracking-[0.18em] text-mute">
                {it.date}
              </span>
              <span className="t-mono hidden shrink-0 text-xs uppercase tracking-[0.18em] text-md-gold md:inline">
                {it.topic}
              </span>
              <span className="truncate text-sm font-medium text-white md:text-base">
                {it.title}
              </span>
            </Link>
          ))}
        </div>

        {/* Indicators */}
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show headline ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 w-6 transition-colors duration-200",
                i === active ? "bg-md-gold" : "bg-rule-dark",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
