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

/**
 * Public read queries. Caching happens at the fetch layer (see
 * lib/supabase/public.ts): each request is tagged with its table name and
 * revalidated by the admin API on writes (revalidateTag) or after 60s.
 */

export async function getPublishedPosts(): Promise<PublishedPost[]> {
  const { data, error } = await supabasePublic
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false });
  if (error) throw new Error(`posts query failed: ${error.message}`);
  return (data as PostRow[]).map(rowToPublishedPost);
}

export async function getPostBySlug(slug: string): Promise<PublishedPost | null> {
  const posts = await getPublishedPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPublishedEvents(): Promise<PublicEvent[]> {
  const { data, error } = await supabasePublic
    .from("events")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false });
  if (error) throw new Error(`events query failed: ${error.message}`);
  return (data as EventRow[]).map(rowToEventItem);
}

export async function getPublishedVideos(): Promise<{
  clips: VideoRow[];
  coverage: VideoRow[];
}> {
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
}
