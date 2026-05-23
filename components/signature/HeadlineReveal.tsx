"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  accent?: string;
  accentClassName?: string;
  /** Stagger between words in ms */
  stagger?: number;
};

/**
 * HeadlineReveal — splits text into words and mask-reveals each on intersection.
 * If accent is provided and appears in `text`, that word renders with accentClassName.
 *
 * Honors prefers-reduced-motion by skipping the reveal entirely.
 */
export function HeadlineReveal({
  text,
  className,
  as = "h1",
  accent,
  accentClassName = "text-md-gold",
  stagger = 60,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.querySelectorAll<HTMLElement>(".reveal-word-mask").forEach((w) =>
        w.classList.add("is-in"),
      );
      return;
    }

    const words = Array.from(
      el.querySelectorAll<HTMLElement>(".reveal-word-mask"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            words.forEach((w, i) => {
              const inner = w.querySelector<HTMLElement>(
                ".reveal-word-mask__inner",
              );
              if (inner) inner.style.transitionDelay = `${i * stagger}ms`;
              w.classList.add("is-in");
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, stagger]);

  const words = text.split(/(\s+)/); // keep spaces as separate tokens

  const Component = (as as unknown) as React.ElementType;

  return (
    <Component ref={ref} className={cn(className)}>
      {words.map((token, i) => {
        if (/^\s+$/.test(token)) {
          return <span key={i}>{token}</span>;
        }
        const isAccent = accent && token === accent;
        return (
          <span key={i} className="reveal-word-mask">
            <span
              className={cn(
                "reveal-word-mask__inner",
                isAccent && accentClassName,
              )}
            >
              {token}
            </span>
          </span>
        );
      })}
    </Component>
  );
}
