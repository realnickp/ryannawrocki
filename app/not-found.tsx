import Link from "next/link";

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

export default function NotFound() {
  return (
    <section className="bg-brand-paper2">
      <div className="mx-auto flex min-h-screen max-w-[1180px] flex-col justify-center px-6 pt-32 pb-20 md:px-10">
        <p className="eyebrow">Page Not Found</p>
        <p
          className="mt-4 font-display font-extrabold leading-none tracking-tight text-brand-gold"
          style={{ fontSize: "clamp(6rem, 16vw, 12rem)" }}
        >
          404
        </p>
        <h1 className="h-section mt-6">Not on the floor.</h1>
        <div className="mt-4 gold-rule">
          <span className="line" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero/md-outline.png" alt="" aria-hidden />
          <span className="line" />
        </div>
        <p className="lede mt-6 max-w-[44ch]">
          The page you&rsquo;re looking for has either moved or was never here.
          Head back to the home page, or browse the latest from Annapolis.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className="btn-maroon">
            Back Home <Arrow />
          </Link>
          <Link href="/issues" className="btn-outline-navy">
            Read the Issues <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
