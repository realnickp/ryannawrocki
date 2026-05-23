import { site } from "@/data/site";

const AMOUNTS = ["25", "50", "100", "250", "500", "1000"] as const;

function Arrow() {
  return (
    <svg
      className="arrow"
      width="16"
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
  );
}

/**
 * Campaign-style donation strip — six amount buttons and a primary DONATE.
 * Each amount links to Anedot with the amount appended as a query param.
 */
export function DonationStrip() {
  return (
    <div
      className="bg-brand-navy px-6 py-12 md:px-10 md:py-16"
      role="group"
      aria-label="Choose a contribution amount"
    >
      <div className="mx-auto max-w-[1180px]">
        <p className="eyebrow eyebrow--light">Contribute</p>
        <p className="mt-3 font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl">
          Stand with District&nbsp;7A.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {AMOUNTS.map((amt) => (
            <a
              key={amt}
              href={`${site.donateUrl}?amount=${amt}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded border border-white/30 px-5 font-display text-base font-extrabold tracking-tight text-white transition-colors hover:border-white hover:bg-white hover:text-brand-navy"
            >
              ${amt}
            </a>
          ))}
          <a
            href={site.donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-maroon"
          >
            Donate Now <Arrow />
          </a>
        </div>
        <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-white/40">
          {site.authorityLine}
        </p>
      </div>
    </div>
  );
}
