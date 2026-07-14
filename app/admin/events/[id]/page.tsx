"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch } from "@/lib/admin/client";
import { slugify, type EventInput, type EventRow } from "@/lib/cms/types";

const BLANK: EventInput = {
  title: "", slug: "", type: "community", status: "draft", featured: false,
  date: new Date().toISOString().slice(0, 10), time: "", venue: "", address: "",
  summary: "", contributions: [], sponsorLevels: [], rsvpUrl: "", rsvpBy: "",
  contact: { name: "", email: "", phone: "" },
};

function rowToInput(r: EventRow): EventInput {
  return {
    title: r.title, slug: r.slug, type: r.type, status: r.status,
    featured: r.featured, date: r.date, time: r.time ?? "", venue: r.venue,
    address: r.address, summary: r.summary,
    contributions: r.contributions ?? [], sponsorLevels: r.sponsor_levels ?? [],
    rsvpUrl: r.rsvp_url ?? "", rsvpBy: r.rsvp_by ?? "",
    contact: {
      name: r.contact?.name ?? "", email: r.contact?.email ?? "",
      phone: r.contact?.phone ?? "",
    },
  };
}

const linesToArr = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

export default function EventEditorPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const router = useRouter();
  const [form, setForm] = useState<EventInput>(BLANK);
  const [eventId, setEventId] = useState<string | null>(isNew ? null : params.id);
  const [loaded, setLoaded] = useState(isNew);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [contribText, setContribText] = useState("");
  const [sponsorText, setSponsorText] = useState("");

  const set = <K extends keyof EventInput>(k: K, v: EventInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (isNew) return;
    adminFetch<{ event: EventRow }>(`/api/admin/events/${params.id}`)
      .then(({ event }) => {
        const input = rowToInput(event);
        setForm(input);
        setContribText((input.contributions ?? []).join("\n"));
        setSponsorText((input.sponsorLevels ?? []).join("\n"));
        setLoaded(true);
      })
      .catch((e) => setMsg({ ok: false, text: e.message }));
  }, [isNew, params.id]);

  async function save(status: "draft" | "published") {
    setBusy(true);
    setMsg(null);
    const contact = form.contact ?? {};
    const payload: EventInput = {
      ...form, status,
      slug: form.slug || slugify(form.title),
      contributions: linesToArr(contribText),
      sponsorLevels: linesToArr(sponsorText),
      contact:
        contact.name || contact.email || contact.phone ? contact : null,
    };
    try {
      if (eventId) {
        await adminFetch(`/api/admin/events/${eventId}`, { method: "PUT", body: payload });
      } else {
        const { id } = await adminFetch<{ id: string }>("/api/admin/events", {
          method: "POST", body: payload,
        });
        setEventId(id);
        window.history.replaceState(null, "", `/admin/events/${id}`);
      }
      setForm(payload);
      setMsg({ ok: true, text: status === "published" ? "Published ✓" : "Draft saved ✓" });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!eventId || !window.confirm("Delete this event permanently?")) return;
    setBusy(true);
    try {
      await adminFetch(`/api/admin/events/${eventId}`, { method: "DELETE" });
      router.push("/admin");
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Delete failed" });
      setBusy(false);
    }
  }

  if (!loaded) return <p className="text-brand-slate">Loading…</p>;

  return (
    <div className="mx-auto max-w-[720px] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-extrabold text-brand-navy">
          {eventId ? "Edit Event" : "New Event"}
        </h1>
        <div className="flex gap-2">
          <button type="button" disabled={busy} onClick={() => save("draft")} className="btn-outline-navy">
            Save Draft
          </button>
          <button type="button" disabled={busy} onClick={() => save("published")} className="btn-maroon">
            {form.status === "published" ? "Update (Published)" : "Publish"}
          </button>
        </div>
      </div>
      {msg && (
        <p className={msg.ok ? "text-sm font-semibold text-emerald-700" : "form-error"}>{msg.text}</p>
      )}

      <div className="card-soft space-y-5 p-7">
        <label className="block">
          <span className="form-label">Event title</span>
          <input className="form-input" value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!slugTouched) set("slug", slugify(e.target.value));
            }} />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="form-label">Slug</span>
            <input className="form-input" value={form.slug}
              onChange={(e) => { setSlugTouched(true); set("slug", e.target.value); }} />
          </label>
          <label className="block">
            <span className="form-label">Type</span>
            <select className="form-select" value={form.type}
              onChange={(e) => set("type", e.target.value as EventInput["type"])}>
              <option value="fundraiser">Fundraiser</option>
              <option value="town-hall">Town Hall</option>
              <option value="community">Community</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </label>
          <label className="block">
            <span className="form-label">Date</span>
            <input type="date" className="form-input" value={form.date}
              onChange={(e) => set("date", e.target.value)} />
          </label>
          <label className="block">
            <span className="form-label">Time (e.g. 5:00 – 7:00 PM)</span>
            <input className="form-input" value={form.time ?? ""}
              onChange={(e) => set("time", e.target.value)} />
          </label>
        </div>
        <label className="block">
          <span className="form-label">Venue</span>
          <input className="form-input" value={form.venue}
            onChange={(e) => set("venue", e.target.value)} />
        </label>
        <label className="block">
          <span className="form-label">Address</span>
          <input className="form-input" value={form.address}
            onChange={(e) => set("address", e.target.value)} />
        </label>
        <label className="block">
          <span className="form-label">Summary</span>
          <textarea rows={4} className="form-textarea" value={form.summary}
            onChange={(e) => set("summary", e.target.value)} />
        </label>
        <label className="flex items-center gap-2.5">
          <input type="checkbox" className="h-4 w-4 accent-brand-maroon" checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)} />
          <span className="text-sm font-semibold text-brand-navy">Featured event</span>
        </label>
      </div>

      <details className="card-soft p-7" open={Boolean(form.rsvpUrl || contribText)}>
        <summary className="cursor-pointer font-display font-bold text-brand-navy">
          RSVP, admission &amp; sponsorships
        </summary>
        <div className="mt-5 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="form-label">RSVP link (URL)</span>
              <input className="form-input" value={form.rsvpUrl ?? ""}
                onChange={(e) => set("rsvpUrl", e.target.value)} />
            </label>
            <label className="block">
              <span className="form-label">RSVP by (e.g. May 25)</span>
              <input className="form-input" value={form.rsvpBy ?? ""}
                onChange={(e) => set("rsvpBy", e.target.value)} />
            </label>
          </div>
          <label className="block">
            <span className="form-label">Admission levels — one per line</span>
            <textarea rows={3} className="form-textarea" value={contribText}
              onChange={(e) => setContribText(e.target.value)}
              placeholder={"$50 per person\n$75 per couple"} />
          </label>
          <label className="block">
            <span className="form-label">Sponsor levels — one per line</span>
            <textarea rows={3} className="form-textarea" value={sponsorText}
              onChange={(e) => setSponsorText(e.target.value)}
              placeholder={"Red — $250\nBlue — $500"} />
          </label>
          <div className="grid gap-5 sm:grid-cols-3">
            <label className="block">
              <span className="form-label">Contact name</span>
              <input className="form-input" value={form.contact?.name ?? ""}
                onChange={(e) => set("contact", { ...form.contact, name: e.target.value })} />
            </label>
            <label className="block">
              <span className="form-label">Contact email</span>
              <input className="form-input" value={form.contact?.email ?? ""}
                onChange={(e) => set("contact", { ...form.contact, email: e.target.value })} />
            </label>
            <label className="block">
              <span className="form-label">Contact phone</span>
              <input className="form-input" value={form.contact?.phone ?? ""}
                onChange={(e) => set("contact", { ...form.contact, phone: e.target.value })} />
            </label>
          </div>
        </div>
      </details>

      {eventId && (
        <button type="button" disabled={busy} onClick={remove}
          className="text-sm font-semibold text-red-700 hover:underline">
          Delete this event
        </button>
      )}
    </div>
  );
}
