"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HeadlineReveal } from "@/components/signature/HeadlineReveal";
import { RuleMark } from "@/components/signature/RuleMark";

type Props = {
  eyebrow: string;
  headline: string;
  accent: string;
  lede: string;
  /** Poster image (also shown when reduced-motion is on, or while video loads) */
  portrait: { src: string; alt: string };
  /** Path to the looping hero video, e.g. "/videos/hero.mp4" */
  video?: string;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string };
};

/**
 * HeroFilm — cinematic full-bleed hero.
 *
 * The video is the hero: it covers the entire viewport, color-graded,
 * with a heavy ink-to-transparent gradient anchored to the bottom-left
 * so typography sits in a confident, readable corner. The Maryland flag
 * red rule + gold eyebrow + display headline + lede + two CTAs stack
 * over the video.
 *
 * - Autoplay muted looped video on the desktop and mobile background.
 * - prefers-reduced-motion: skip autoplay; show poster portrait instead.
 * - Headline mask-reveals word-by-word on mount.
 * - Bottom-right scroll cue invites the next section.
 */
export function HeroFilm({
  eyebrow,
  headline,
  accent,
  lede,
  portrait,
  video,
  primaryCta,
  secondaryCta,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Some browsers gate autoplay even when muted — re-attempt after hydration.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduceMotion) {
      v.pause();
      return;
    }
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        /* autoplay blocked — poster remains visible */
      }
    };
    tryPlay();
  }, [reduceMotion]);

  // Color grade applied to both the video and the poster fallback so the
  // section visually reads the same whichever is active.
  const filter =
    "contrast(1.08) saturate(1.05) brightness(0.92) sepia(0.04) hue-rotate(-4deg)";

  return (
    <section
      className="panel-ink grain relative isolate overflow-hidden"
      style={{ minHeight: "88svh" }}
    >
      {/* Full-bleed media — video, with poster as static fallback */}
      <div className="absolute inset-0 z-0">
        {video && !reduceMotion ? (
          <video
            ref={videoRef}
            src={video}
            poster={portrait.src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label={portrait.alt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter }}
          />
        ) : (
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter }}
          />
        )}
      </div>

      {/* Cinematic gradient stack — anchor type to the lower-left */}
      <span
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(105deg, rgba(11,11,15,0.95) 0%, rgba(11,11,15,0.75) 32%, rgba(11,11,15,0.35) 55%, rgba(11,11,15,0) 78%)",
        }}
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-2/5"
        style={{
          background:
            "linear-gradient(to top, rgba(11,11,15,0.92) 0%, rgba(11,11,15,0) 100%)",
        }}
      />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,11,15,0.7) 0%, rgba(11,11,15,0) 100%)",
        }}
      />
      {/* Maroon edge bloom from the bottom-right for warmth */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 95% 100%, var(--maroon) 0%, transparent 70%)",
          opacity: 0.35,
          mixBlendMode: "multiply",
        }}
      />

      {/* Top-left district stamp */}
      <div className="absolute left-4 top-28 z-20 md:left-8 md:top-32">
        <div className="flex items-center gap-3">
          <RuleMark />
          <span className="t-eyebrow text-md-gold">{eyebrow}</span>
        </div>
      </div>

      {/* Lower-left content block */}
      <div
        className="shell relative z-20 flex flex-col justify-end pb-16 pt-40 md:pb-20"
        style={{ minHeight: "88svh" }}
      >
        <div className="max-w-[820px]">
          <HeadlineReveal
            text={headline}
            as="h1"
            className="t-h1 text-white"
            accent={accent}
            accentClassName="text-md-gold"
            stagger={75}
          />

          <p className="t-lede mt-6 max-w-[44ch] text-white/85">{lede}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={primaryCta.href}
              target={primaryCta.external ? "_blank" : undefined}
              rel={primaryCta.external ? "noopener noreferrer" : undefined}
              className="btn-primary"
            >
              {primaryCta.label}
            </a>
            {secondaryCta ? (
              <a href={secondaryCta.href} className="btn-secondary">
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* Bottom-right scroll cue */}
      <div className="pointer-events-none absolute bottom-8 right-6 z-20 hidden md:flex md:items-center md:gap-3">
        <span className="t-mono text-[10px] uppercase tracking-[0.28em] text-white/55">
          Scroll
        </span>
        <span className="scroll-cue" aria-hidden />
      </div>

      {/* Bottom-left mono date strip — adds film-still gravitas */}
      <div className="absolute bottom-8 left-4 z-20 hidden md:block md:left-8">
        <span className="t-mono text-[10px] uppercase tracking-[0.24em] text-white/55">
          District 7A · Re-elect 2026
        </span>
      </div>
    </section>
  );
}
