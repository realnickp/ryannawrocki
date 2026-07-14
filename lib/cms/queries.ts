import { unstable_cache } from "next/cache";
import { supabasePublic } from "@/lib/supabase/public";
import {
  rowToPublishedPost,
  rowToEventItem,
  type PostRow,
  type EventRow,
  type VideoRow,
  type PublishedPost,
  type PublicEvent,
} from "./types";

export const getPublishedPosts = unstable_cache(
  async (): Promise<PublishedPost[]> => {
    const { data, error } = await supabasePublic
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("date", { ascending: false });
    if (error) throw new Error(`posts query failed: ${error.message}`);
    return (data as PostRow[]).map(rowToPublishedPost);
  },
  ["published-posts"],
  { tags: ["posts"], revalidate: 60 },
);

export async function getPostBySlug(slug: string): Promise<PublishedPost | null> {
  const posts = await getPublishedPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export const getPublishedEvents = unstable_cache(
  async (): Promise<PublicEvent[]> => {
    const { data, error } = await supabasePublic
      .from("events")
      .select("*")
      .eq("status", "published")
      .order("date", { ascending: false });
    if (error) throw new Error(`events query failed: ${error.message}`);
    return (data as EventRow[]).map(rowToEventItem);
  },
  ["published-events"],
  { tags: ["events"], revalidate: 60 },
);

export const getPublishedVideos = unstable_cache(
  async (): Promise<{ clips: VideoRow[]; coverage: VideoRow[] }> => {
    const { data, error } = await supabasePublic
      .from("videos")
      .select("*")
      .eq("status", "published")
      .order("date", { ascending: false, nullsFirst: false });
    if (error) throw new Error(`videos query failed: ${error.message}`);
    const rows = data as VideoRow[];
    return {
      clips: rows.filter((v) => v.kind === "clip"),
      coverage: rows.filter((v) => v.kind === "link"),
    };
  },
  ["published-videos"],
  { tags: ["videos"], revalidate: 60 },
);
