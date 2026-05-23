"use client";

import { useCallback, useEffect, useState } from "react";

/** Any donate link pointing here opens the on-site lightbox instead of
 *  navigating away. RSVP / other Anedot links are left alone. */
const DONATE_MATCH = "secure.anedot.com/nawrocki/donate";

/**
 * Mounted once in the layout. Intercepts plain left-clicks on donate links
 * (anywhere on the site) and opens the Anedot form in an embedded lightbox so
 * the visitor never leaves the page. Falls back to the normal link (new tab)
 * when JS is off or the click is modified (ctrl/cmd/middle-click).
 */
export function DonateModal() {
  const [url, setUrl] = useState<string | null>(null);
  const close = useCallback(() => setUrl(null), []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.includes(DONATE_MATCH)) {
        e.preventDefault();
        setUrl(href);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!url) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [url, close]);

  if (!url) return null;

  return (
    <div
      className="donate-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Contribute to Friends of Ryan Nawrocki"
      onClick={close}
    >
      <div className="donate-modal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="donate-modal__bar">
          <p>
            Contribute{" "}
            <span className="donate-modal__secure">· Secured by Anedot</span>
          </p>
          <button
            type="button"
            className="donate-modal__close"
            aria-label="Close"
            onClick={close}
            autoFocus
          >
            &times;
          </button>
        </div>
        <div className="donate-modal__frame">
          <iframe
            src={url}
            title="Contribute — Friends of Ryan Nawrocki"
            allow="payment"
          />
        </div>
      </div>
    </div>
  );
}
