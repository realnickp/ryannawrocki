import Link from "next/link";

function Arrow() {
  return (
    <svg
      className="arrow"
      width="18"
      height="14"
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

export function HeroLanding() {
  return (
    <section className="hero-landing">
      <div className="hero-landing__frame">
        <div className="hero-landing__stage">
          {/* Maryland cross-bottony emblem — faint watermark on the mobile
              navy panel (hidden on desktop via CSS). */}
          <svg className="hero-emblem-m" viewBox="0 0 120 120" aria-hidden>
            <g fill="currentColor">
              <rect x="51.5" y="10" width="17" height="100" rx="2.5" />
              <rect x="10" y="51.5" width="100" height="17" rx="2.5" />
              <circle cx="60" cy="9" r="8.5" />
              <circle cx="50" cy="17" r="8.5" />
              <circle cx="70" cy="17" r="8.5" />
              <circle cx="60" cy="111" r="8.5" />
              <circle cx="50" cy="103" r="8.5" />
              <circle cx="70" cy="103" r="8.5" />
              <circle cx="9" cy="60" r="8.5" />
              <circle cx="17" cy="50" r="8.5" />
              <circle cx="17" cy="70" r="8.5" />
              <circle cx="111" cy="60" r="8.5" />
              <circle cx="103" cy="50" r="8.5" />
              <circle cx="103" cy="70" r="8.5" />
            </g>
          </svg>
          <img src="/hero/flag.png" alt="" className="hero-art hero-art--flag" />
          <img
            src="/hero/card-1.jpg"
            alt="A District 7A neighborhood street at sunset"
            className="hero-art hero-art--card1"
          />
          <video
            className="hero-art hero-art--card2"
            src="/hero/hero-clip.mp4"
            poster="/hero/card-2.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
          <img
            src="/hero/card-3.jpg"
            alt="The Middle River waterfront in Baltimore County"
            className="hero-art hero-art--card3"
          />
          <img
            src="/hero/ryan.png"
            alt="Delegate Ryan Nawrocki"
            className="hero-art hero-art--ryan"
          />
        </div>

        <div className="hero-landing__copy">
          <p className="hero-kicker-m">Maryland State Delegate · District 7A</p>
          <h1 className="hero-h1">
            Ryan
            <br />
            Nawrocki
          </h1>
          <p className="hero-sub">Committed to Maryland Communities.</p>
          <div className="hero-rule">
            <span className="line" />
            <img src="/hero/md-outline.png" alt="" aria-hidden />
            <span className="line" />
          </div>
          <p className="hero-lede">
            Working together for safer neighborhoods, stronger schools, and a
            better future for every Marylander.
          </p>
          <div className="hero-cta">
            <Link href="/meet-ryan" className="btn-maroon">
              Learn More <Arrow />
            </Link>
            <Link href="/get-involved" className="btn-outline-navy">
              Get Involved <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
