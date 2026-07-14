import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { EventRow } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

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

const TYPE_LABELS: Record<EventRow["type"], string> = {
  fundraiser: "Fundraiser",
  "town-hall": "Town Hall",
  community: "Community",
  volunteer: "Volunteer",
};

/** Admin-only event preview — shows the event the way the Events page does. */
export default async function PreviewEvent({ params }: { params: { id: string } }) {
  const { data } = await supabaseAdmin()
    .from("events")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();
  if (!data) notFound();
  const event = data as EventRow;
  const p = parseISO(event.date);

  return (
    <div className="min-h-screen bg-white">
      <p className="bg-amber-100 px-6 py-2 text-center text-xs font-bold uppercase tracking-wider text-amber-900">
        Preview — {event.status === "draft" ? "this event is a DRAFT (not public)" : "published"}
      </p>
      <div className="mx-auto max-w-[860px] px-6 py-14">
        <div className="card-soft flex gap-5 p-6">
          <div className="min-w-[78px] flex-shrink-0 self-start overflow-hidden rounded-xl border border-brand-hairline bg-white text-center shadow-sm">
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
                {event.date}
              </p>
            )}
            {event.time && (
              <p className="px-2 pb-2 text-[10px] leading-tight text-brand-slate">{event.time}</p>
            )}
          </div>
          <div className="flex flex-1 flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-maroon">
              {TYPE_LABELS[event.type]}
            </span>
            <h1 className="mt-2 font-display text-2xl font-bold leading-snug text-brand-navy">
              {event.title}
            </h1>
            <p className="mt-1 text-sm text-brand-slate">
              {event.venue} &mdash; {event.address}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-brand-slate">
              {event.summary}
            </p>

            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-maroon">When</dt>
                <dd className="mt-1 font-display text-base font-semibold text-brand-navy">
                  {formatLong(event.date)}
                  {event.time ? ` · ${event.time}` : null}
                </dd>
              </div>
              {event.contributions && event.contributions.length > 0 && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-maroon">Admission</dt>
                  <dd className="mt-1 font-display text-base font-semibold text-brand-gold">
                    {event.contributions.join(" · ")}
                  </dd>
                </div>
              )}
              {event.sponsor_levels && event.sponsor_levels.length > 0 && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-maroon">Sponsorships</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-brand-slate">
                    {event.sponsor_levels.join("  ·  ")}
                  </dd>
                </div>
              )}
              {event.contact && (event.contact.name || event.contact.email || event.contact.phone) && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-maroon">Event Inquiries</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-brand-slate">
                    {event.contact.name}
                    {event.contact.phone ? ` · ${event.contact.phone}` : ""}
                    {event.contact.email ? (
                      <>
                        <br />
                        {event.contact.email}
                      </>
                    ) : null}
                  </dd>
                </div>
              )}
              {event.rsvp_by && (
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-slate/70">
                  Kindly RSVP by {event.rsvp_by}
                </p>
              )}
            </dl>

            {event.rsvp_url && (
              <div className="mt-6">
                <span className="btn-maroon pointer-events-none">RSVP</span>
                <p className="mt-2 text-xs text-brand-slate/70">RSVP button links to: {event.rsvp_url}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
