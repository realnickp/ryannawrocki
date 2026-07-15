import { cn } from "@/lib/cn";

type Props = {
  /** Low-opacity photographic backdrop behind the navy. */
  bgSrc: string;
  /** 0–1 visibility of the photo. Default 0.18 */
  bgOpacity?: number;
  /** object-position, e.g. "center 28%" */
  bgPosition?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Navy section with a low-opacity photo backdrop, gradient veil, and grain.
 * The photo slowly drifts (CSS keyframes, off the main thread) for a sense
 * of living depth, and stops under prefers-reduced-motion. Plain <img> on
 * purpose — next/image's optimizer returns blank frames for these assets
 * (see project memory).
 */
export function FeatureBand({
  bgSrc,
  bgOpacity = 0.18,
  bgPosition = "center 30%",
  className,
  children,
}: Props) {
  return (
    <section className={cn("feature-band grain-overlay bg-brand-navy", className)}>
      <div className="feature-band__photo" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgSrc}
          alt=""
          loading="lazy"
          style={{ objectPosition: bgPosition, opacity: bgOpacity }}
        />
      </div>
      <div className="feature-band__veil" />
      {children}
    </section>
  );
}
