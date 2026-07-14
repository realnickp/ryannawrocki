"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const heroNav = [
  { href: "/", label: "Home" },
  { href: "/meet-ryan", label: "About" },
  { href: "/priorities", label: "Priorities" },
  { href: "/issues", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Every interior page now opens with a navy photographic hero band, so the
  // transparent header content flips to white until you scroll past (then the
  // bar turns light again). The homepage keeps its light hero (dark content).
  const darkHeroRoutes = [
    "/meet-ryan",
    "/priorities",
    "/issues",
    "/events",
    "/contact",
    "/press",
    "/hb202",
    "/session-summary",
    "/donate",
  ];
  const onDarkHero = darkHeroRoutes.some(
    (r) => pathname === r || pathname?.startsWith(r + "/"),
  );
  const lightContent = onDarkHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Let the browser / device Back button close the menu instead of navigating
  // away. Opening pushes a throwaway history entry; Back pops it and closes the
  // menu. Closing via the ✕ or a link removes that entry so history stays clean.
  useEffect(() => {
    if (!open) return;
    window.history.pushState({ navMenu: true }, "");
    const onPop = () => setOpen(false);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      if (window.history.state?.navMenu) {
        window.history.back();
      }
    };
  }, [open]);

  return (
    <>
      <header
        className="hdr-light"
        data-scrolled={scrolled}
        data-light-content={lightContent}
      >
        <div className="hdr-light__inner">
          <Link
            href="/"
            aria-label="Ryan Nawrocki — home"
            className="hdr-light__logo"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightContent ? "/hero/logo-white.png" : "/hero/logo.png"}
              alt="Ryan Nawrocki — State Delegate"
            />
          </Link>

          <nav className="hdr-light__nav" aria-label="Primary">
            {heroNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-light"
                  data-active={active}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hdr-light__actions">
            <a
              href={site.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-donate"
            >
              Donate
            </a>
            <button
              type="button"
              className="hdr-light__burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn("hdr-light__overlay", open && "is-open")}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="hdr-light__overlay-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        <nav aria-label="Primary mobile">
          {heroNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a
            href={site.donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-donate"
          >
            Donate
          </a>
        </nav>
      </div>
    </>
  );
}
