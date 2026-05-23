"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  external?: boolean;
};

/**
 * CTA that subtly tracks the cursor within an 80px radius.
 * Max 6px translate, 200ms ease-out. Disabled under prefers-reduced-motion.
 */
export function CTAMagnetic({
  href,
  children,
  className,
  variant = "primary",
  external = false,
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist > 80) {
      el.style.transform = "translate(0,0)";
      return;
    }
    const k = 0.075;
    el.style.transform = `translate(${dx * k}px, ${dy * k}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(variant === "primary" ? "btn-primary" : "btn-secondary", className)}
      style={{ transition: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)" }}
    >
      {children}
    </a>
  );
}
