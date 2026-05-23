"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  /** Final value to display, e.g. "85,000+", "$100K", "6" */
  value: string;
  label: string;
  /**
   * Optional numeric target for count-up animation. When provided, the
   * component counts from 0 → countTo over 1200ms, then snaps to `value`.
   */
  countTo?: number;
  /** Optional prefix to keep visible during count-up (e.g. "$") */
  prefix?: string;
  /** Optional suffix to keep visible during count-up (e.g. "K+", "+") */
  suffix?: string;
  className?: string;
};

export function BigNumber({
  value,
  label,
  countTo,
  prefix = "",
  suffix = "",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(
    countTo !== undefined ? `${prefix}0${suffix}` : value,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || countTo === undefined) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const start = performance.now();
            const duration = 1200;
            const tick = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(1, elapsed / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              const current = Math.round(countTo * eased);
              setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [countTo, value, prefix, suffix]);

  return (
    <div ref={ref} className={cn("big-number", className)}>
      <div className="big-number__value tabular">{display}</div>
      <div className="big-number__rule" />
      <div className="big-number__label">{label}</div>
    </div>
  );
}

/** Horizontal grid of BigNumber stats with vertical rules between */
export function BigNumberGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 [&>*+*]:md:border-l [&>*+*]:md:border-rule [&>*+*]:border-t md:[&>*+*]:border-t-0">
      {children}
    </div>
  );
}
