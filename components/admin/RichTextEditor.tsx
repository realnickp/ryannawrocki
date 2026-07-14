"use client";

import { useCallback, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Node, mergeAttributes } from "@tiptap/core";

/** Block-level iframe node for video embeds (YouTube/Vimeo/Rumble). */
const EmbedIframe = Node.create({
  name: "embedIframe",
  group: "block",
  atom: true,
  addAttributes() {
    return { src: { default: null } };
  },
  parseHTML() {
    return [{ tag: "iframe" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "iframe",
      mergeAttributes(HTMLAttributes, {
        width: "100%",
        height: "400",
        frameborder: "0",
        allowfullscreen: "true",
        allow: "accelerometer; encrypted-media; picture-in-picture",
      }),
    ];
  },
});

/** Normalize a pasted video URL to an allowed embed src, or null if unsupported. */
export function normalizeEmbedUrl(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  const yt = /(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/.exec(raw);
  if (
    yt &&
    /(^|\.)youtube\.com$|(^|\.)youtu\.be$|youtube-nocookie\.com$/.test(url.hostname)
  ) {
    return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  }
  if (url.hostname === "vimeo.com") {
    const m = /^\/(\d+)/.exec(url.pathname);
    if (m) return `https://player.vimeo.com/video/${m[1]}`;
  }
  if (url.hostname === "player.vimeo.com") return url.href;
  if (url.hostname === "rumble.com" && url.pathname.startsWith("/embed/")) {
    return url.href;
  }
  return null;
}

const BTN =
  "rounded-md border border-brand-hairline bg-white px-2.5 py-1.5 text-xs font-semibold text-brand-navy hover:border-brand-navy/40 disabled:opacity-40";
const BTN_ON = "!bg-brand-navy !text-white";

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
      Placeholder.configure({ placeholder: "Write the update…" }),
      EmbedIframe,
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const uploadImage = useCallback(
    async (file: File) => {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "x-admin-csrf": "1" },
        body: fd,
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        alert(json.error ?? "Upload failed");
        return;
      }
      editor?.chain().focus().setImage({ src: json.url }).run();
    },
    [editor],
  );

  if (!editor) return null;

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL (https://…)", prev ?? "https://");
    if (url === null) return;
    if (url === "" || url === "https://") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  };

  const addEmbed = () => {
    const url = window.prompt("Paste a YouTube, Vimeo, or Rumble embed URL");
    if (!url) return;
    const src = normalizeEmbedUrl(url);
    if (!src) {
      alert(
        "That doesn't look like a supported video URL (YouTube, Vimeo, or rumble.com/embed/…).",
      );
      return;
    }
    editor.chain().focus().insertContent({ type: "embedIframe", attrs: { src } }).run();
  };

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1.5">
        <button type="button" className={`${BTN} ${editor.isActive("paragraph") ? BTN_ON : ""}`} onClick={() => editor.chain().focus().setParagraph().run()}>¶</button>
        <button type="button" className={`${BTN} ${editor.isActive("heading", { level: 2 }) ? BTN_ON : ""}`} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button type="button" className={`${BTN} ${editor.isActive("heading", { level: 3 }) ? BTN_ON : ""}`} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
        <button type="button" className={`${BTN} ${editor.isActive("bold") ? BTN_ON : ""}`} onClick={() => editor.chain().focus().toggleBold().run()}><strong>B</strong></button>
        <button type="button" className={`${BTN} ${editor.isActive("italic") ? BTN_ON : ""}`} onClick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></button>
        <button type="button" className={`${BTN} ${editor.isActive("underline") ? BTN_ON : ""}`} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></button>
        <button type="button" className={`${BTN} ${editor.isActive("strike") ? BTN_ON : ""}`} onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></button>
        <button type="button" className={`${BTN} ${editor.isActive("bulletList") ? BTN_ON : ""}`} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button type="button" className={`${BTN} ${editor.isActive("orderedList") ? BTN_ON : ""}`} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
        <button type="button" className={`${BTN} ${editor.isActive("blockquote") ? BTN_ON : ""}`} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝</button>
        <button type="button" className={`${BTN} ${editor.isActive("link") ? BTN_ON : ""}`} onClick={setLink}>Link</button>
        <button type="button" className={BTN} onClick={() => fileRef.current?.click()}>Image</button>
        <button type="button" className={BTN} onClick={addEmbed}>Video</button>
        <button type="button" className={BTN} onClick={() => editor.chain().focus().undo().run()}>↺</button>
        <button type="button" className={BTN} onClick={() => editor.chain().focus().redo().run()}>↻</button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void uploadImage(f);
          e.target.value = "";
        }}
      />
      <EditorContent editor={editor} className="admin-editor prose-light article-body" />
    </div>
  );
}
