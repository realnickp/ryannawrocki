import Link from "next/link";
import type { CSSProperties } from "react";
import { priorities } from "@/data/priorities";
import { PriorityGlyph, CheckGlyph } from "@/components/home/Glyphs";

function Arrow() {
  return (
    <svg
      className="arrow"
      width="15"
      height="11"
      viewBox="0 0 18 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M1 7h15M11 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The ten priorities as a sticky "stacking deck": each card pins beneath the
 * header and the next one scrolls up to settle on top of it. Pure CSS
 * (position: sticky) so it runs on the GPU and works on mobile + desktop.
 *
 * - `detailed` (priorities page): full card with Delivered / What's Next.
 *   On mobile the detail columns collapse so each card still fits one screen
 *   and the stack reads cleanly.
 * - default (homepage): compact card that links into the priorities page.
 */
export function PriorityStack({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className={`pstack${detailed ? " pstack--detailed" : ""}`}>
      {priorities.map((p, i) => {
        const style = { "--i": i, zIndex: i + 1 } as CSSProperties;
        const media = (
          <div
            className={`pstack__media${detailed ? " pstack__media--full" : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image ?? `/images/priorities/${p.slug}.png`}
              alt=""
              loading="lazy"
              style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
            />
            <span className="pstack__num">{p.numeral}</span>
          </div>
        );

        if (!detailed) {
          return (
            <li key={p.slug} className="pstack__item" style={style}>
              <Link
                href={`/priorities#${p.slug}`}
                className="pstack__card pstack__card--compact"
              >
                {media}
                <div className="pstack__body">
                  <div className="icon-chip icon-chip--soft pstack__chip">
                    <PriorityGlyph slug={p.slug} size={22} />
                  </div>
                  <h3 className="pstack__title">{p.title}</h3>
                  <p className="pstack__sum">{p.summary.split(". ")[0]}.</p>
                  <span className="link-arrow pstack__more">
                    Read more <Arrow />
                  </span>
                </div>
              </Link>
            </li>
          );
        }

        return (
          <li key={p.slug} className="pstack__item" style={style}>
            <article id={p.slug} className="pstack__card pstack__card--full">
              <div className="pstack__full-top">
                {media}
                <div className="pstack__intro">
                  <div className="pstack__intro-head">
                    <div className="icon-chip icon-chip--soft">
                      <PriorityGlyph slug={p.slug} size={24} />
                    </div>
                    <span className="pstack__num-lg">{p.numeral}</span>
                  </div>
                  <h2 className="pstack__title pstack__title--lg">{p.title}</h2>
                  <div className="gold-rule pstack__rule">
                    <span className="line" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/hero/md-outline.png" alt="" aria-hidden />
                    <span className="line" />
                  </div>
                  <p className="pstack__sum">{p.summary}</p>
                </div>
              </div>

              <div className="pstack__cols">
                <div>
                  <p className="pstack__label pstack__label--maroon">
                    Delivered
                  </p>
                  <ul className="pstack__list">
                    {p.delivered.map((d) => (
                      <li key={d} className="check-row">
                        <span className="check-badge">
                          <CheckGlyph size={13} />
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="pstack__label">What&rsquo;s Next</p>
                  <ul className="pstack__list pstack__list--next">
                    {p.next.map((n) => (
                      <li key={n}>
                        <span className="pstack__tick" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
