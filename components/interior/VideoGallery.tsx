"use client";

import { useEffect, useState } from "react";

export type Video = {
  id: string;
  title: string;
  channel: string;
  /** YouTube publish date (ISO YYYY-MM-DD) — used to sort newest first. */
  date?: string;
  /** Optional start time in seconds. */
  start?: number;
  /** Embedding disabled by the publisher — link out to YouTube instead of opening the lightbox. */
  noEmbed?: boolean;
};

function PlayMark() {
  return (
    <span className="video-card__play" aria-hidden>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M8 5.5v13l11-6.5z" />
      </svg>
    </span>
  );
}

/**
 * Stylish YouTube gallery. Clicking a card opens the clip in a large centered
 * lightbox (close with ✕, click-outside, or Esc); the iframe only mounts while
 * open. Videos flagged `noEmbed` (embedding disabled by the station) link out
 * to YouTube in a new tab instead.
 */
export function VideoGallery({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState<Video | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => {
          const ytUrl = `https://www.youtube.com/watch?v=${v.id}${
            v.start ? `&t=${v.start}s` : ""
          }`;
          const thumbInner = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
              />
              <span className="video-card__chan">{v.channel}</span>
              <PlayMark />
            </>
          );

          return (
            <article key={v.id} className="video-card">
              {v.noEmbed ? (
                <a
                  className="video-card__thumb"
                  href={ytUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch on YouTube: ${v.title}`}
                >
                  {thumbInner}
                </a>
              ) : (
                <button
                  type="button"
                  className="video-card__thumb"
                  onClick={() => setActive(v)}
                  aria-label={`Play video: ${v.title}`}
                >
                  {thumbInner}
                </button>
              )}

              <div className="video-card__body">
                <h3 className="video-card__title">{v.title}</h3>
                {v.noEmbed ? (
                  <a
                    className="link-arrow mt-4 text-[11px]"
                    href={ytUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch on YouTube
                    <svg
                      className="arrow"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M7 17 17 7M9 7h8v8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ) : (
                  <button
                    type="button"
                    className="link-arrow mt-4 text-[11px]"
                    onClick={() => setActive(v)}
                  >
                    Watch clip
                    <svg
                      className="arrow"
                      width="14"
                      height="12"
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
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {active && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="video-modal__close"
            aria-label="Close video"
            onClick={() => setActive(null)}
            autoFocus
          >
            &times;
          </button>
          <div
            className="video-modal__inner"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="video-modal__frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0${
                  active.start ? `&start=${active.start}` : ""
                }`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="video-modal__meta">
              <span className="video-modal__chan">{active.channel}</span>
              <p className="video-modal__title">{active.title}</p>
              <a
                className="video-modal__yt"
                href={`https://www.youtube.com/watch?v=${active.id}${
                  active.start ? `&t=${active.start}s` : ""
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
