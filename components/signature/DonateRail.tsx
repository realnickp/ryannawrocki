import { site } from "@/data/site";

/**
 * Sticky right-edge "Contribute" pill. Desktop ≥1280px only.
 */
export function DonateRail() {
  return (
    <a
      href={site.donateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="donate-rail"
      aria-label="Contribute"
    >
      <span className="donate-rail__text">Contribute →</span>
    </a>
  );
}
