"use client";

import { useEffect } from "react";

/**
 * Lazy-loaded Lenis smooth scroll wrapper.
 * Guards on prefers-reduced-motion so it never initializes
 * for users who have opted out of motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let lenis: { destroy: () => void; raf: (t: number) => void } | null = null;
    let raf = 0;

    (async () => {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      const tick = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    })();

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
