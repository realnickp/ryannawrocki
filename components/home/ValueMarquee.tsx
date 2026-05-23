type Props = {
  items: string[];
};

/**
 * Kinetic two-row value ticker — oversized display type on a maroon band,
 * the two rows scrolling in opposite directions. CSS-driven (off the main
 * thread); stops under prefers-reduced-motion. Decorative, so aria-hidden.
 */
export function ValueMarquee({ items }: Props) {
  const row = [...items, ...items];
  return (
    <div className="value-marquee grain-overlay" aria-hidden>
      <div className="value-marquee__row">
        <div className="value-marquee__track">
          {row.map((t, i) => (
            <span className="value-marquee__group" key={`a-${t}-${i}`}>
              <span className="value-marquee__word">{t}</span>
              <span className="value-marquee__star">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className="value-marquee__row">
        <div className="value-marquee__track" data-reverse="true">
          {row.map((t, i) => (
            <span className="value-marquee__group" key={`b-${t}-${i}`}>
              <span className="value-marquee__word value-marquee__word--ghost">
                {t}
              </span>
              <span className="value-marquee__star">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
