import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedEvents } from "@/lib/cms/queries";
import type { PublicEvent } from "@/lib/cms/types";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Underline } from "@/components/home/Underline";
import { RevealImage } from "@/components/home/RevealImage";
import { InteriorHero } from "@/components/interior/InteriorHero";
import { CtaBand } from "@/components/interior/CtaBand";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming fundraisers, town halls, and community events with Delegate Ryan Nawrocki across District 7A.",
};

export const revalidate = 60;

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

function GoldRule() {
  return (
    <div className="gold-rule">
      <span className="line" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hero/md-outline.png" alt="" aria-hidden />
      <span className="line" />
    </div>
  );
}

function labelForType(t: PublicEvent["type"]): string {
  switch (t) {
    case "fundraiser":
      return "Fundraiser";
    case "town-hall":
      return "Town Hall";
    case "community":
      return "Community";
    case "volunteer":
      return "Volunteer";
  }
}

const MONTHS_SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function parseISO(d: string): { y: string; mIdx: number; day: string } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
  if (!m) return null;
  return { y: m[1]!, mIdx: parseInt(m[2]!, 10) - 1, day: String(parseInt(m[3]!, 10)) };
}

function formatLong(d: string): string {
  const p = parseISO(d);
  if (!p || !MONTHS_LONG[p.mIdx]) return d;
  return `${MONTHS_LONG[p.mIdx]} ${p.day}, ${p.y}`;
}

function DateBadge({ date, time }: { date: string; time?: string }) {
  const p = parseISO(date);
  return (
    <div className="min-w-[78px] flex-shrink-0 overflow-hidden rounded-xl border border-brand-hairline bg-white text-center shadow-sm">
      {p ? (
        <>
          <p className="bg-brand-maroon py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white">
            {MONTHS_SHORT[p.mIdx]}
          </p>
          <p className="px-3 pt-2 font-display text-3xl font-extrabold leading-none text-brand-navy">
            {p.day}
          </p>
          <p className="px-3 pb-2 pt-1 text-[10px] font-semibold tracking-wider text-brand-slate/60">
            {p.y}
          </p>
        </>
      ) : (
        <p className="p-4 font-display text-xs font-bold uppercase tracking-widest text-brand-maroon">
          {date}
        </p>
      )}
      {time && (
        <p className="px-2 pb-2 text-[10px] leading-tight text-brand-slate">{time}</p>
      )}
    </div>
  );
}

function EventCard({ event, muted }: { event: PublicEvent; muted?: boolean }) {
  return (
    <div
      className={`card-soft flex gap-5 p-6 ${muted ? "opacity-60" : ""}`}
    >
      <DateBadge date={event.date} time={event.time} />
      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-maroon">
            {labelForType(event.type)}
          </span>
        </div>
        <h3
          className={`mt-2 font-display text-lg font-bold leading-snug ${
            muted ? "text-brand-slate" : "text-brand-navy"
          }`}
        >
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-brand-slate">
          {event.venue} &mdash; {event.address}
        </p>
        {!muted && (
          <p className="mt-3 text-[15px] leading-relaxed text-brand-slate">
            {event.summary}
          </p>
        )}
        {event.contributions && !muted && (
          <p className="mt-3 text-xs text-brand-slate/70">
            Suggested:{" "}
            <span className="font-semibold text-brand-gold">
              {event.contributions.join(" · ")}
            </span>
          </p>
        )}
        {event.rsvpUrl && !muted && (
          <div className="mt-5">
            <a
              href={event.rsvpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-maroon"
            >
              RSVP <Arrow />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function EventsPage() {
  const events = await getPublishedEvents();
  const today = new Date().toISOString().slice(0, 10);
  const featured = events.find((e) => e.featured) ?? null;
  const upcoming = events
    .filter((e) => e.date >= today && e.slug !== featured?.slug)
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = events
    .filter((e) => e.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {/* ── Hero band ─────────────────────────────────── */}
      <InteriorHero
        eyebrow="Out In The District"
        title={
          <>
            Where to find <Underline>Ryan next</Underline>.
          </>
        }
        lede="Fundraisers, town halls, neighborhood meetings — wherever District 7A is, that's where the work happens."
        media={{
          src: "/images/678846962_1379904260622590_904275417940980376_n.jpg",
          alt: "Ryan with families and officials at a District 7A campaign booth",
          objectPosition: "center 30%",
        }}
      />

      {/* ── Featured event ────────────────────────────── */}
      {featured && (
        <section className="bg-white">
          <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
            <Reveal className="max-w-2xl">
              <div className="gold-tick" />
              <p className="eyebrow mt-5">Featured Event</p>
              <h2 className="h-section mt-4">
                {featured.title}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-maroon">
                  {labelForType(featured.type)}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-brand-slate">
                  {featured.summary}
                </p>

                <dl className="mt-8 space-y-5">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-maroon">
                      When
                    </dt>
                    <dd className="mt-1 font-display text-base font-semibold text-brand-navy">
                      {formatLong(featured.date)}
                      {featured.time ? ` · ${featured.time}` : null}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-maroon">
                      Where
                    </dt>
                    <dd className="mt-1 font-display text-base font-semibold text-brand-navy">
                      {featured.venue}
                    </dd>
                    <dd className="text-sm text-brand-slate">{featured.address}</dd>
                  </div>
                  {featured.contributions && (
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-maroon">
                        Admission
                      </dt>
                      <dd className="mt-1 font-display text-base font-semibold text-brand-gold">
                        {featured.contributions.join(" · ")}
                      </dd>
                    </div>
                  )}
                  {featured.sponsorLevels && (
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-maroon">
                        Sponsorships
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-brand-slate">
                        {featured.sponsorLevels.join("  ·  ")}
                      </dd>
                    </div>
                  )}
                  {featured.contact && (
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-maroon">
                        Event Inquiries
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-brand-slate">
                        {featured.contact.name}
                        {featured.contact.phone && (
                          <>
                            {" · "}
                            <a
                              href={`tel:${featured.contact.phone.replace(/[^\d+]/g, "")}`}
                              className="text-brand-maroon hover:underline"
                            >
                              {featured.contact.phone}
                            </a>
                          </>
                        )}
                        {featured.contact.email && (
                          <>
                            <br />
                            <a
                              href={`mailto:${featured.contact.email}`}
                              className="text-brand-maroon hover:underline"
                            >
                              {featured.contact.email}
                            </a>
                          </>
                        )}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-8 flex flex-wrap gap-4">
                  {featured.rsvpUrl && (
                    <a
                      href={featured.rsvpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-maroon"
                    >
                      RSVP <Arrow />
                    </a>
                  )}
                  <a
                    href={site.donateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-navy"
                  >
                    Contribute <Arrow />
                  </a>
                </div>
                {featured.rsvpBy && (
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand-slate/70">
                    Kindly RSVP by {featured.rsvpBy}
                  </p>
                )}
              </Reveal>

              <Reveal delay={0.1}>
                <div className="card-soft p-7">
                  <p className="eyebrow">Why You Should Come</p>
                  <ul className="mt-5 space-y-4">
                    {[
                      "Meet Ryan and the team in person.",
                      "Hear what's coming next in Annapolis.",
                      "Bring a question — every guest gets answered.",
                      "Help build the campaign with your support.",
                    ].map((b) => (
                      <li key={b} className="flex gap-3 text-brand-slate">
                        <span className="mt-2.5 h-0.5 w-4 flex-shrink-0 bg-brand-gold" />
                        <span className="text-[15px] leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <RevealImage
                    src="/images/679497582_1379904263955923_7986191815350396787_n.jpg"
                    alt="Ryan with members of the Chesapeake Gateway Chamber of Commerce at a community booth"
                    from="up"
                    frameClassName="photo-frame aspect-[16/9] w-full"
                    imgClassName="h-full w-full object-cover"
                    objectPosition="center 32%"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Upcoming events ───────────────────────────── */}
      <section className="tex-grid">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
          <Reveal className="max-w-2xl">
            <div className="gold-tick" />
            <p className="eyebrow mt-5">Upcoming</p>
            <h2 className="h-section mt-4">The calendar ahead.</h2>
          </Reveal>
          {upcoming.length === 0 ? (
            <Reveal delay={0.1}>
              <div className="mt-10 rounded-xl border border-brand-hairline bg-white p-10 text-center">
                <p className="text-[15px] leading-relaxed text-brand-slate">
                  Nothing else on the books yet — check back soon, or join the
                  campaign list to be the first to hear about town halls and
                  community events.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <Link href="/contact#message" className="btn-maroon">
                    Join the List <Arrow />
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="mt-10 space-y-4">
              {upcoming.map((e, i) => (
                <Reveal key={e.slug} delay={i * 0.07} as="div">
                  <EventCard event={e} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Past events ───────────────────────────────── */}
      {past.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
            <Reveal className="max-w-2xl">
              <div className="gold-tick" />
              <p className="eyebrow mt-5">Recently</p>
              <h2 className="h-section mt-4">Where we&rsquo;ve been.</h2>
            </Reveal>
            <div className="mt-10 space-y-4">
              {past.map((e, i) => (
                <Reveal key={e.slug} delay={i * 0.07} as="div">
                  <EventCard event={e} muted />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Appearance request CTA ────────────────────── */}
      <CtaBand
        eyebrow="Bring Ryan To Your Community"
        title={
          <>
            Want Ryan at your event or meeting?{" "}
            <span className="text-brand-gold">Just ask.</span>
          </>
        }
        blurb="Civic association meetings, business roundtables, parish events — the campaign is happy to send Ryan or a team member."
      >
        <Link href="/contact" className="btn-maroon">
          Request an Appearance <Arrow />
        </Link>
        <a
          href={site.donateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-light"
        >
          Contribute <Arrow />
        </a>
      </CtaBand>
    </>
  );
}
