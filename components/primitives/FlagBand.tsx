import { cn } from "@/lib/cn";

type Props = {
  variant?: "top" | "bottom";
  className?: string;
};

/**
 * Maryland flag motif as a quiet structural accent — three thin
 * stripes (yellow / black / red). Use sparingly: one per page max.
 */
export function FlagBand({ variant = "top", className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "flag-band",
        variant === "top" ? "border-b border-border-soft" : "",
        className,
      )}
    >
      <span style={{ background: "var(--md-gold)" }} />
      <span style={{ background: "var(--md-black)" }} />
      <span style={{ background: "var(--md-red)" }} />
    </div>
  );
}
