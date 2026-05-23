"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Final numeric target, e.g. 85, 100, 250, 6 */
  value: number;
  prefix?: string;
  suffix?: string;
  /** Animation length in ms */
  duration?: number;
  className?: string;
};

/* Strong ease-out so the number lands decisively (emil: ease-out for entrances). */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts from 0 → value the first time it scrolls into view.
 * Honors prefers-reduced-motion by snapping straight to the final value.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1500,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setDisplay(Math.round(easeOutExpo(p) * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
