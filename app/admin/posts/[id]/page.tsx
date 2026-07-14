"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch } from "@/lib/admin/client";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { slugify, type PostInput, type PostRow } from "@/lib/cms/types";

const BLANK: PostInput = {
  title: "", slug: "", topic: "Updates", status: "draft", featured: false,
  date: new Date().toISOString().slice(0, 10),
  author: "Delegate Ryan Nawrocki", excerpt: "", dek: "", bodyHtml: "",
  coverImage: null, coverAlt: "", coverPosition: "center 30%", readTime: "",
  keyPoints: [], pullQuote: "", links: [], sources: [],
};

function rowToInput(r: PostRow): PostInput {
  return {
    title: r.title, slug: r.slug, topic: r.topic, status: r.status,
    featured: r.featured, date: r.date, author: r.author,
    excerpt: r.excerpt ?? "", dek: r.dek ?? "", bodyHtml: r.body_html,
    coverImage: r.cover_image, coverAlt: r.cover_alt ?? "",
    coverPosition: r.cover_position ?? "center 30%", readTime: r.read_time ?? "",
    keyPoints: r.key_points ?? [], pullQuote: r.pull_quote ?? "",
    links: r.links ?? [], sources: r.sources ?? [],
  };
}

/** ~200 wpm on the text content of the html body. */
function estimateReadTime(html: string): string {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export default function PostEditorPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const router = useRouter();
  const [form, setForm] = useState<PostInput>(BLANK);
  const [postId, setPostId] = useState<string | null>(isNew ? null : params.id);
  const [loaded, setLoaded] = useState(isNew);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const draftKey = `draft-post-${params.id}`;
  const formRef = useRef(form);
  formRef.current = form;

  const set = useCallback(<K extends keyof PostInput>(k: K, v: PostInput[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
  }, []);

  // Load existing post.
  useEffect(() => {
    if (isNew) return;
    adminFetch<{ post: PostRow }>(`/api/admin/posts/${params.id}`)
      .then(({ post }) => { setForm(rowToInput(post)); setLoaded(true); })
      .catch((e) => setMsg({ ok: false, text: e.message }));
  }, [isNew, params.id]);

  // Autosave to localStorage every 10s; offer restore on mount (new posts only).
  useEffect(() => {
    if (!loaded) return;
    const saved = localStorage.getItem(draftKey);
    if (saved && isNew && window.confirm("Restore your unsaved draft from last time?")) {
      try { setForm(JSON.parse(saved) as PostInput); } catch { /* ignore */ }
    }
    const t = setInterval(() => {
      localStorage.setItem(draftKey, JSON.stringify(formRef.current));
    }, 10_000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  async function save(status: "draft" | "published") {
    setBusy(true);
    setMsg(null);
    const payload: PostInput = {
      ...form,
      status,
      slug: form.slug || slugify(form.title),
      readTime: form.readTime || estimateReadTime(form.bodyHtml),
    };
    payload.keyPoints = (payload.keyPoints ?? []).filter(Boolean);
    payload.links = (payload.links ?? []).filter((l) => l.label && l.href);
    payload.sources = (payload.sources ?? []).filter((s) => s.label && s.href);
    try {
      if (postId) {
        await adminFetch(`/api/admin/posts/${postId}`, { method: "PUT", body: payload });
      } else {
        const { id } = await adminFetch<{ id: string }>("/api/admin/posts", {
          method: "POST", body: payload,
        });
        setPostId(id);
        window.history.replaceState(null, "", `/admin/posts/${id}`);
      }
      setForm(payload);
      localStorage.removeItem(draftKey);
      setMsg({ ok: true, text: status === "published" ? "Published ✓" : "Draft saved ✓" });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!postId || !window.confirm("Delete this post permanently?")) return;
    setBusy(true);
    try {
      await adminFetch(`/api/admin/posts/${postId}`, { method: "DELETE" });
      localStorage.removeItem(draftKey);
      router.push("/admin");
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Delete failed" });
      setBusy(false);
    }
  }

  async function uploadCover(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST", headers: { "x-admin-csrf": "1" }, body: fd,
    });
    const json = (await res.json()) as { url?: string; error?: string };
    if (!res.ok || !json.url) {
      setMsg({ ok: false, text: json.error ?? "Upload failed" });
      return;
    }
    set("coverImage", json.url);
  }

  if (!loaded) return <p className="text-brand-slate">Loading…</p>;

  return (
    <div className="mx-auto max-w-[820px] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-extrabold text-brand-navy">
          {isNew && !postId ? "New Post" : "Edit Post"}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {postId && (
            <a href={`/admin/preview/${postId}`} target="_blank" rel="noreferrer" className="btn-outline-navy">
              Preview
            </a>
          )}
          <button type="button" disabled={busy} onClick={() => save("draft")} className="btn-outline-navy">
            Save Draft
          </button>
          <button type="button" disabled={busy} onClick={() => save("published")} className="btn-maroon">
            {form.status === "published" ? "Update (Published)" : "Publish"}
          </button>
          {form.status === "published" && postId && (
            <button
              type="button" disabled={busy} onClick={() => save("draft")}
              className="text-xs font-semibold uppercase tracking-wider text-brand-slate hover:text-brand-maroon"
            >
              Unpublish
            </button>
          )}
        </div>
      </div>
      {msg && (
        <p className={msg.ok ? "text-sm font-semibold text-emerald-700" : "form-error"}>{msg.text}</p>
      )}

      <div className="card-soft space-y-5 p-7">
        <label className="block">
          <span className="form-label">Title</span>
          <input className="form-input" value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!slugTouched) set("slug", slugify(e.target.value));
            }} />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="form-label">Slug (URL)</span>
            <input className="form-input" value={form.slug}
              onChange={(e) => { setSlugTouched(true); set("slug", e.target.value); }} />
          </label>
          <label className="block">
            <span className="form-label">Category</span>
            <input className="form-input" list="topics" value={form.topic}
              onChange={(e) => set("topic", e.target.value)} />
            <datalist id="topics">
              {["Government Accountability", "Public Safety", "Energy", "Education",
                "Housing & Property Rights", "Transportation", "Local Issues", "Updates"].map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </label>
          <label className="block">
            <span className="form-label">Date</span>
            <input type="date" className="form-input" value={form.date}
              onChange={(e) => set("date", e.target.value)} />
          </label>
          <label className="mt-7 flex items-center gap-2.5">
            <input type="checkbox" className="h-4 w-4 accent-brand-maroon" checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)} />
            <span className="text-sm font-semibold text-brand-navy">Featured story</span>
          </label>
        </div>
        <label className="block">
          <span className="form-label">Excerpt (card text)</span>
          <textarea rows={2} className="form-textarea" value={form.excerpt ?? ""}
            onChange={(e) => set("excerpt", e.target.value)} />
        </label>
        <label className="block">
          <span className="form-label">Dek (subtitle under the headline — optional)</span>
          <textarea rows={2} className="form-textarea" value={form.dek ?? ""}
            onChange={(e) => set("dek", e.target.value)} />
        </label>

        <div>
          <span className="form-label">Cover image</span>
          {form.coverImage ? (
            <div className="mt-2 flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.coverImage} alt="" className="h-28 w-44 rounded-lg object-cover"
                style={{ objectPosition: form.coverPosition ?? "center 30%" }} />
              <div className="space-y-2">
                <input className="form-input" placeholder="Describe the photo (alt text)"
                  value={form.coverAlt ?? ""} onChange={(e) => set("coverAlt", e.target.value)} />
                <select className="form-select" value={form.coverPosition ?? "center 30%"}
                  onChange={(e) => set("coverPosition", e.target.value)}>
                  {["center 10%", "center 20%", "center 30%", "center 40%", "center 50%",
                    "center 60%", "center 70%"].map((p) => (
                    <option key={p} value={p}>Focus: {p.replace("center ", "")} from top</option>
                  ))}
                </select>
                <button type="button" className="text-xs font-semibold text-brand-maroon"
                  onClick={() => set("coverImage", null)}>
                  Remove image
                </button>
              </div>
            </div>
          ) : (
            <input type="file" accept="image/jpeg,image/png,image/webp" className="mt-2 block text-sm"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadCover(f); }} />
          )}
        </div>
      </div>

      <div className="card-soft p-7">
        <span className="form-label">Body</span>
        <div className="mt-2">
          <RichTextEditor value={form.bodyHtml} onChange={(html) => set("bodyHtml", html)} />
        </div>
      </div>

      <details className="card-soft p-7">
        <summary className="cursor-pointer font-display font-bold text-brand-navy">
          Advanced (key points, pull quote, links, sources)
        </summary>
        <div className="mt-5 space-y-5">
          <StringListField label="Key points (“Where Ryan Stands”)"
            values={form.keyPoints ?? []} onChange={(v) => set("keyPoints", v)} />
          <label className="block">
            <span className="form-label">Pull quote</span>
            <textarea rows={2} className="form-textarea" value={form.pullQuote ?? ""}
              onChange={(e) => set("pullQuote", e.target.value)} />
          </label>
          <PairListField label="Action links" aLabel="Label" bLabel="URL"
            values={(form.links ?? []).map((l) => [l.label, l.href] as [string, string])}
            onChange={(rows) => set("links", rows.map(([label, href]) => ({ label, href })))} />
          <PairListField label="Sources" aLabel="Headline / label" bLabel="URL"
            values={(form.sources ?? []).map((s) => [s.label, s.href] as [string, string])}
            onChange={(rows) => set("sources", rows.map(([label, href]) => ({ label, href })))} />
        </div>
      </details>

      {postId && (
        <button type="button" disabled={busy} onClick={remove}
          className="text-sm font-semibold text-red-700 hover:underline">
          Delete this post
        </button>
      )}
    </div>
  );
}

function StringListField({ label, values, onChange }: {
  label: string; values: string[]; onChange: (v: string[]) => void;
}) {
  return (
    <div>
      <span className="form-label">{label}</span>
      <div className="mt-2 space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input className="form-input flex-1" value={v}
              onChange={(e) => onChange(values.map((x, j) => (j === i ? e.target.value : x)))} />
            <button type="button" className="text-xs font-bold text-red-700"
              onClick={() => onChange(values.filter((_, j) => j !== i))}>✕</button>
          </div>
        ))}
        <button type="button" className="text-xs font-semibold text-brand-maroon"
          onClick={() => onChange([...values, ""])}>+ Add</button>
      </div>
    </div>
  );
}

function PairListField({ label, aLabel, bLabel, values, onChange }: {
  label: string; aLabel: string; bLabel: string;
  values: [string, string][]; onChange: (v: [string, string][]) => void;
}) {
  return (
    <div>
      <span className="form-label">{label}</span>
      <div className="mt-2 space-y-2">
        {values.map(([a, b], i) => (
          <div key={i} className="flex gap-2">
            <input className="form-input flex-1" placeholder={aLabel} value={a}
              onChange={(e) => onChange(values.map((x, j) => (j === i ? [e.target.value, x[1]] as [string, string] : x)))} />
            <input className="form-input flex-1" placeholder={bLabel} value={b}
              onChange={(e) => onChange(values.map((x, j) => (j === i ? [x[0], e.target.value] as [string, string] : x)))} />
            <button type="button" className="text-xs font-bold text-red-700"
              onClick={() => onChange(values.filter((_, j) => j !== i))}>✕</button>
          </div>
        ))}
        <button type="button" className="text-xs font-semibold text-brand-maroon"
          onClick={() => onChange([...values, ["", ""]])}>+ Add</button>
      </div>
    </div>
  );
}
