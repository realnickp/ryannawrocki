"use client";

import { useCallback, useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin/client";
import type { VideoRow } from "@/lib/cms/types";

export default function VideosAdminPage() {
  const [videos, setVideos] = useState<VideoRow[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [clipUrl, setClipUrl] = useState("");
  const [clipChannel, setClipChannel] = useState("FOX45");
  const [clipDate, setClipDate] = useState("");
  const [linkHref, setLinkHref] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkChannel, setLinkChannel] = useState("FOX45");

  const load = useCallback(() => {
    adminFetch<{ videos: VideoRow[] }>("/api/admin/videos")
      .then(({ videos }) => setVideos(videos))
      .catch((e) => setMsg(e.message));
  }, []);
  useEffect(load, [load]);

  async function addClip(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    try {
      await adminFetch("/api/admin/videos", {
        method: "POST",
        body: {
          kind: "clip", url: clipUrl, title: "", channel: clipChannel,
          date: clipDate || null, noEmbed: false,
        },
      });
      setClipUrl(""); setClipDate("");
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Failed");
    }
  }

  async function addLink(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    try {
      await adminFetch("/api/admin/videos", {
        method: "POST",
        body: { kind: "link", href: linkHref, title: linkTitle, channel: linkChannel },
      });
      setLinkHref(""); setLinkTitle("");
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Failed");
    }
  }

  async function saveRow(v: VideoRow) {
    try {
      await adminFetch(`/api/admin/videos/${v.id}`, {
        method: "PUT",
        body: { title: v.title, channel: v.channel, date: v.date, noEmbed: v.no_embed },
      });
      setMsg("Saved ✓");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Failed");
    }
  }

  async function removeRow(id: string) {
    if (!window.confirm("Remove this item?")) return;
    try {
      await adminFetch(`/api/admin/videos/${id}`, { method: "DELETE" });
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Failed");
    }
  }

  const clips = videos.filter((v) => v.kind === "clip");
  const links = videos.filter((v) => v.kind === "link");

  return (
    <div className="space-y-10">
      <h1 className="font-display text-2xl font-extrabold text-brand-navy">
        News Page — Videos &amp; Coverage
      </h1>
      {msg && <p className="text-sm font-semibold text-brand-maroon">{msg}</p>}

      <section className="card-soft p-7">
        <p className="eyebrow">Add “On the Air” clip</p>
        <form onSubmit={addClip} className="mt-4 grid gap-3 sm:grid-cols-[2fr_1fr_1fr_auto]">
          <input className="form-input" placeholder="YouTube URL" required
            value={clipUrl} onChange={(e) => setClipUrl(e.target.value)} />
          <input className="form-input" placeholder="Channel (FOX45…)"
            value={clipChannel} onChange={(e) => setClipChannel(e.target.value)} />
          <input type="date" className="form-input"
            value={clipDate} onChange={(e) => setClipDate(e.target.value)} />
          <button type="submit" className="btn-maroon">Add</button>
        </form>
        <p className="mt-2 text-xs text-brand-slate">
          The title fills in automatically from YouTube — edit it below afterward if needed.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-brand-navy">
          On the Air ({clips.length})
        </h2>
        <div className="mt-3 space-y-2">
          {clips.map((v) => (
            <Row key={v.id} v={v} onSave={saveRow} onDelete={removeRow}
              onChange={(nv) => setVideos((all) => all.map((x) => (x.id === nv.id ? nv : x)))} />
          ))}
        </div>
      </section>

      <section className="card-soft p-7">
        <p className="eyebrow">Add “More Coverage” link (article / station page)</p>
        <form onSubmit={addLink} className="mt-4 grid gap-3 sm:grid-cols-[2fr_2fr_1fr_auto]">
          <input className="form-input" placeholder="URL" required
            value={linkHref} onChange={(e) => setLinkHref(e.target.value)} />
          <input className="form-input" placeholder="Headline / label" required
            value={linkTitle} onChange={(e) => setLinkTitle(e.target.value)} />
          <input className="form-input" placeholder="Station" required
            value={linkChannel} onChange={(e) => setLinkChannel(e.target.value)} />
          <button type="submit" className="btn-maroon">Add</button>
        </form>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-brand-navy">
          More Coverage ({links.length})
        </h2>
        <div className="mt-3 space-y-2">
          {links.map((v) => (
            <Row key={v.id} v={v} onSave={saveRow} onDelete={removeRow}
              onChange={(nv) => setVideos((all) => all.map((x) => (x.id === nv.id ? nv : x)))} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Row({ v, onChange, onSave, onDelete }: {
  v: VideoRow;
  onChange: (v: VideoRow) => void;
  onSave: (v: VideoRow) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-brand-hairline bg-white px-4 py-3">
      <span className="inline-flex rounded-md bg-brand-navy px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
        {v.channel ?? "—"}
      </span>
      <input className="form-input min-w-[220px] flex-1" value={v.title}
        onChange={(e) => onChange({ ...v, title: e.target.value })} />
      <input type="date" className="form-input w-40" value={v.date ?? ""}
        onChange={(e) => onChange({ ...v, date: e.target.value || null })} />
      {v.kind === "clip" && (
        <label className="flex items-center gap-1.5 text-xs text-brand-slate">
          <input type="checkbox" checked={v.no_embed}
            onChange={(e) => onChange({ ...v, no_embed: e.target.checked })} />
          link-only
        </label>
      )}
      <button type="button" className="btn-outline-navy !px-3 !py-1.5 text-xs" onClick={() => onSave(v)}>
        Save
      </button>
      <button type="button" className="text-xs font-bold text-red-700" onClick={() => onDelete(v.id)}>
        ✕
      </button>
    </div>
  );
}
