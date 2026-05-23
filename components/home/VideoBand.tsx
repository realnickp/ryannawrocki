"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  kicker: string;
  quote: string;
  cite: string;
};

/**
 * Cinematic full-bleed video band — muted, looping footage behind a navy
 * gradient + grain, fronted by a large editorial pull-quote. The video only
 * plays once it scrolls near the viewport (saves bandwidth) and is paused
 * for prefers-reduced-motion users, who still see the poster frame.
 */
export function VideoBand({ src, poster, kicker, quote, cite }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="video-band grain-overlay">
      <video
        ref={ref}
        className="video-band__media"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="video-band__veil" />
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-36">
        <div className="max-w-3xl">
          <p className="eyebrow eyebrow--light flex items-center gap-2.5">
            <span className="video-band__live" />
            {kicker}
          </p>
          <svg
            className="video-band__quote-mark"
            viewBox="0 0 48 36"
            fill="currentColor"
            aria-hidden
          >
            <path d="M0 36V20C0 9 6 1.5 18 0l2 6c-6 1.5-9 5-9 10h7v20H0zm28 0V20C28 9 34 1.5 46 0l2 6c-6 1.5-9 5-9 10h7v20H28z" />
          </svg>
          <blockquote className="video-band__quote">{quote}</blockquote>
          <cite className="video-band__cite">{cite}</cite>
        </div>
      </div>
    </section>
  );
}
