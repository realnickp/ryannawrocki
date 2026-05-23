"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  /** Frame styling (border/aspect/shadow) on the element that gets clipped. */
  frameClassName?: string;
  /** Image styling inside the frame. */
  imgClassName?: string;
  /** Direction the wipe travels from. Default "up". */
  from?: "up" | "left" | "right";
  /** object-position to protect faces/focal points when cropping. */
  objectPosition?: string;
};

/**
 * A framed photo that wipes into view with a clip-path reveal on scroll while
 * the image behind settles from a slight over-scale — an emil-style reveal.
 *
 * The IntersectionObserver watches an OUTER, un-clipped wrapper: observing the
 * clipped element itself never fires (a self-clip to 0 area reads as
 * ratio 0 in Chromium, so the reveal would stay stuck hidden forever).
 * Plain <img> on purpose (next/image returns blank frames for these assets).
 */
export function RevealImage({
  src,
  alt,
  frameClassName,
  imgClassName,
  from = "up",
  objectPosition,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const style = objectPosition ? { objectPosition } : undefined;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal-img-wrap">
      <div
        className={cn("reveal-img", frameClassName)}
        data-from={from}
        data-shown={shown || undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={imgClassName} style={style} />
      </div>
    </div>
  );
}
