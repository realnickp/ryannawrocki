import { cn } from "@/lib/cn";

type Props = { className?: string };

/**
 * Hand-drawn gold arc — positioned absolute, decorative, never decoration
 * that distracts. Sits at 20% opacity at the edge of editorial sections.
 */
export function SwooshAccent({ className }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 80"
      className={cn("pointer-events-none absolute", className)}
      style={{ opacity: 0.2 }}
    >
      <path
        d="M2 62 C 60 12, 180 4, 318 36"
        stroke="var(--md-gold-deep)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
