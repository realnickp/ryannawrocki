"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

// The inline "Sign up for Ryan's newsletter!" form configured in the
// campaign's Constant Contact account (list: "Webpage signups").
const ACCOUNT_ID = "80687d81322e7e11f303d8e8d3ce8b5c";
const FORM_ID = "30633ea9-beb9-479e-b485-a39e086c11ce";

declare global {
  interface Window {
    _ctct_m?: string;
    SignUpFormWidget?: { main: () => void };
  }
}

// The widget reads window._ctct_m when its script executes, so the ID must be
// in place before that — module scope runs at hydration, well ahead of the
// network fetch below.
if (typeof window !== "undefined") {
  window._ctct_m = ACCOUNT_ID;
}

/**
 * Renders the Constant Contact inline signup form, loading the widget script
 * on demand — only pages using this component pay for the third-party JS
 * (jQuery, reCAPTCHA, etc.). The account's pop-up form, which we don't want
 * anywhere, is suppressed globally in globals.css (.ctct-popup-form).
 */
export function NewsletterSignup() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The widget scans for .ctct-inline-form divs only once, when its script
    // first runs. After a client-side navigation this div mounts too late for
    // that scan, so ask the widget to re-scan — but only while the div is
    // still empty, or the form would render twice.
    if (ref.current?.childElementCount === 0) {
      window.SignUpFormWidget?.main();
    }
  }, []);

  return (
    <>
      <div ref={ref} className="ctct-inline-form" data-form-id={FORM_ID} />
      <Script
        id="signupScript"
        src="https://static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
