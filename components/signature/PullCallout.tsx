import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  attribution?: string;
  /** Surface variant — used for vignette behavior */
  variant?: "maroon" | "ink";
  className?: string;
};

/**
 * PullCallout — full-width quote moment on maroon (default) or ink.
 * Outline-only oversized opening quotation mark in deep gold, positioned
 * top-left. Quote in display weight. Attribution in MD gold eyebrow.
 */
export function PullCallout({
  children,
  attribution,
  variant = "maroon",
  className,
}: Props) {
  return (
    <section
      className={cn(
        "panel-" + variant,
        "grain relative isolate overflow-hidden",
        className,
      )}
    >
      <div className="shell">
        <figure className="pull-callout">
          <svg
            aria-hidden
            className="pull-callout__quote-mark"
            viewBox="0 0 80 80"
            fill="none"
          >
            <path
              d="M28 8c-12 4-20 14-20 28v36h28V44H22c0-12 6-18 14-20l-8-16zm44 0c-12 4-20 14-20 28v36h28V44H66c0-12 6-18 14-20l-8-16z"
              stroke="var(--gold-deep)"
              strokeWidth={2}
              fill="none"
            />
          </svg>
          <blockquote className="pull-callout__quote">{children}</blockquote>
          {attribution ? (
            <cite className="pull-callout__cite">— {attribution}</cite>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
