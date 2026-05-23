"use client";

type Shot = { src: string; alt: string; position?: string };

/**
 * Infinite, edge-faded photo ribbon — "on the ground across District 7A."
 * The track is rendered twice and translated -50% for a seamless loop;
 * hover/focus pauses it. CSS-driven (off the main thread) so it stays
 * smooth during page load. Stops entirely under prefers-reduced-motion.
 * Per-shot `position` sets object-position so faces aren't cropped.
 */
export function PhotoMarquee({
  shots,
  reverse = false,
}: {
  shots: Shot[];
  reverse?: boolean;
}) {
  const loop = [...shots, ...shots];
  return (
    <div className="photo-marquee" aria-hidden>
      <div
        className="photo-marquee__track"
        data-reverse={reverse ? "true" : undefined}
      >
        {loop.map((s, i) => (
          <figure className="photo-marquee__item" key={`${s.src}-${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              style={s.position ? { objectPosition: s.position } : undefined}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
