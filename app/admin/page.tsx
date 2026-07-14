import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { PostRow, EventRow } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

function StatusChip({ status }: { status: string }) {
  const published = status === "published";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
        published ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
      }`}
    >
      {status}
    </span>
  );
}

export default async function AdminDashboard() {
  const db = supabaseAdmin();
  const [{ data: posts }, { data: events }] = await Promise.all([
    db.from("posts").select("id, slug, title, topic, status, featured, date, updated_at").order("date", { ascending: false }),
    db.from("events").select("id, slug, title, type, status, featured, date, updated_at").order("date", { ascending: false }),
  ]);

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-extrabold text-brand-navy">
            News &amp; Updates
          </h2>
          <Link href="/admin/posts/new" className="btn-maroon">New Post</Link>
        </div>
        <div className="mt-4 divide-y divide-brand-hairline rounded-xl border border-brand-hairline bg-white">
          {(posts as PostRow[] | null)?.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <Link href={`/admin/posts/${p.id}`} className="font-semibold text-brand-navy hover:text-brand-maroon">
                  {p.title}
                </Link>
                <p className="mt-0.5 text-xs text-brand-slate">
                  {p.topic} · {p.date}{p.featured ? " · ★ featured" : ""}
                </p>
              </div>
              <StatusChip status={p.status} />
            </div>
          ))}
          {!posts?.length && <p className="px-5 py-6 text-sm text-brand-slate">No posts yet.</p>}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-extrabold text-brand-navy">Events</h2>
          <Link href="/admin/events/new" className="btn-maroon">New Event</Link>
        </div>
        <div className="mt-4 divide-y divide-brand-hairline rounded-xl border border-brand-hairline bg-white">
          {(events as EventRow[] | null)?.map((e) => (
            <div key={e.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <Link href={`/admin/events/${e.id}`} className="font-semibold text-brand-navy hover:text-brand-maroon">
                  {e.title}
                </Link>
                <p className="mt-0.5 text-xs text-brand-slate">
                  {e.type} · {e.date}{e.featured ? " · ★ featured" : ""}
                </p>
              </div>
              <StatusChip status={e.status} />
            </div>
          ))}
          {!events?.length && <p className="px-5 py-6 text-sm text-brand-slate">No events yet.</p>}
        </div>
      </section>
    </div>
  );
}
