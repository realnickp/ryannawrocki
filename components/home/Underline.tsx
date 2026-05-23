"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A hand-drawn gold brush underline that draws itself when the word
 * scrolls into view. Wrap a key word in a heading to make it pop.
 */
export function Underline({
  children,
  delay = 0.15,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="underline-mark">
      <span className="underline-mark__text">{children}</span>
      <svg
        className="underline-mark__svg"
        viewBox="0 0 220 16"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <motion.path
          d="M3 11 C 55 4, 120 4, 175 8 C 195 9.5, 210 10, 217 7"
          stroke="var(--gold-line)"
          strokeWidth="5"
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay }}
        />
      </svg>
    </span>
  );
}
