import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { videoInputSchema } from "@/lib/cms/types";
import { revalidateContent } from "@/lib/cms/revalidate";

export const runtime = "nodejs";

function extractYoutubeId(url: string): string | null {
  const m = /(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/.exec(url);
  return m?.[1] ?? null;
}

export async function GET() {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin()
    .from("videos")
    .select("*")
    .order("date", { ascending: false, nullsFirst: false });
  if (error) return NextResponse.json({ error: "Database error" }, { status: 500 });
  return NextResponse.json({ videos: data });
}

export async function POST(req: Request) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = videoInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { error: `${issue?.path.join(".")}: ${issue?.message}` },
      { status: 400 },
    );
  }
  const v = parsed.data;
  let row: Record<string, unknown>;

  if (v.kind === "clip") {
    const ytId = extractYoutubeId(v.url);
    if (!ytId) {
      return NextResponse.json(
        { error: "Could not find a YouTube video ID in that URL" },
        { status: 400 },
      );
    }
    let title = v.title;
    let channel = v.channel ?? null;
    if (!title) {
      // Convenience: fetch title/author from YouTube oEmbed. Non-fatal.
      try {
        const r = await fetch(
          `https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${ytId}`,
          { cache: "no-store" },
        );
        if (r.ok) {
          const j = (await r.json()) as { title?: string; author_name?: string };
          title = j.title ?? "";
          channel = channel ?? j.author_name ?? null;
        }
      } catch {
        /* leave blank; admin can edit */
      }
    }
    if (!title) title = "Untitled clip";
    row = {
      kind: "clip", youtube_id: ytId, channel, title,
      date: v.date ?? null, no_embed: v.noEmbed,
      start_seconds: v.startSeconds ?? null, status: "published",
    };
  } else {
    row = {
      kind: "link", channel: v.channel, title: v.title, href: v.href,
      date: v.date ?? null, status: "published",
    };
  }

  const { data, error } = await supabaseAdmin()
    .from("videos")
    .insert(row)
    .select("id")
    .single();
  if (error) {
    console.error("[videos:create]", error.message);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
  revalidateContent("videos");
  return NextResponse.json({ id: data.id });
}
