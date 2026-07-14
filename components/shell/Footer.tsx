import Link from "next/link";
import { site } from "@/data/site";

const footerNav = [
  { href: "/meet-ryan", label: "About" },
  { href: "/priorities", label: "Priorities" },
  { href: "/issues", label: "Updates" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

const socials: [string, string][] = [
  ["Facebook", site.social.facebook],
  ["X", site.social.x],
  ["Instagram", site.social.instagram],
  ["LinkedIn", site.social.linkedin],
  ["YouTube", site.social.youtube],
];

export function Footer() {
  return (
    <footer className="border-t border-brand-hairline bg-brand-paper2">
      <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/logo.png"
              alt="Ryan Nawrocki — State Delegate"
              className="h-16 w-auto"
            />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-brand-slate">
              Help us keep fighting for Baltimore County.
            </p>
            <a
              href={site.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-maroon mt-7"
            >
              Contribute
            </a>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-maroon">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {footerNav.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="text-[15px] font-medium text-brand-navy transition-colors hover:text-brand-maroon"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-maroon">
              Stay in Touch
            </p>
            <div className="mt-5 space-y-4 text-[15px]">
              <div>
                <p className="text-xs uppercase tracking-wider text-brand-slate/70">
                  Campaign
                </p>
                <a
                  href={`tel:${site.campaignPhone}`}
                  className="block text-brand-navy hover:text-brand-maroon"
                >
                  {site.campaignPhone}
                </a>
                <a
                  href={`mailto:${site.campaignEmail}`}
                  className="block text-brand-maroon hover:underline"
                >
                  {site.campaignEmail}
                </a>
              </div>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold uppercase tracking-wider text-brand-navy hover:text-brand-maroon"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-brand-hairline pt-6 text-xs text-brand-slate/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.campaignName}
          </p>
          <p>{site.authorityLine}</p>
        </div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-xs text-brand-slate/60">{site.mailing}</p>
          {/* Barely-visible campaign-admin entrance */}
          <Link
            href="/admin"
            className="text-[10px] text-brand-slate/25 transition-colors hover:text-brand-slate/60"
            aria-label="Campaign admin sign in"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
