import Link from "next/link";
import { cn } from "@/lib/cn";
import { FlagBar } from "@/components/primitives/FlagBar";

type Props = {
  href?: string;
  className?: string;
  /** "compact" for header, "hero" for the homepage poster lockup */
  size?: "compact" | "hero";
  /** Inverts text color for dark surfaces */
  onDark?: boolean;
};

/**
 * The official lockup, matching the printed logo exactly:
 *
 *   Ryan
 *   NAWROCKI
 *   [────── Maryland flag bar ──────]
 *   STATE DELEGATE
 *
 * Vertical stack, left-aligned, with the heavy Archivo Black wordmark
 * and the gold STATE DELEGATE caption beneath the flag band.
 */
export function Brandmark({
  href = "/",
  className,
  size = "compact",
  onDark = false,
}: Props) {
  const inner = (
    <span
      className={cn(
        "brandmark",
        size === "hero" && "brandmark--hero",
        onDark && "brandmark--on-dark",
        className,
      )}
    >
      <span className="brandmark__first">Ryan</span>
      <span className="brandmark__last">Nawrocki</span>
      <FlagBar className="brandmark__bar" />
      <span className="brandmark__title">State Delegate</span>
    </span>
  );

  if (!href) return inner;
  return (
    <Link
      href={href}
      aria-label="Ryan Nawrocki — Maryland State Delegate, District 7A"
      className="inline-block"
    >
      {inner}
    </Link>
  );
}
