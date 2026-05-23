import { cn } from "@/lib/cn";

type Props = {
  items: string[];
  variant?: "ink" | "maroon";
  className?: string;
};

/**
 * Full-bleed marquee — uppercase items separated by gold diamonds,
 * pauses on hover/focus, edge-fades on left/right.
 *
 * Items list is duplicated so the loop reads as continuous.
 */
export function MarqueeTicker({ items, variant = "ink", className }: Props) {
  return (
    <div
      className={cn(
        "marquee",
        variant === "maroon" && "marquee--maroon",
        className,
      )}
      role="marquee"
      tabIndex={0}
      aria-label="Campaign messages"
    >
      <div className="marquee__track">
        {[0, 1].flatMap((dup) =>
          items.map((item, i) => (
            <span
              key={`${dup}-${i}`}
              className="marquee__item"
              aria-hidden={dup === 1}
            >
              {item}
              <span aria-hidden className="marquee__diamond" />
            </span>
          )),
        )}
      </div>
    </div>
  );
}
