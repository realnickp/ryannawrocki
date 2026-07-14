import { createClient } from "@supabase/supabase-js";

/**
 * Anon-key client for PUBLIC reads. RLS restricts it to published rows.
 *
 * Each REST fetch is tagged with its table name ("posts" / "events" /
 * "videos") and cached by Next's data cache (revalidate: 60). Admin writes
 * call revalidateTag(<table>) so published changes go live within seconds,
 * and the 60s window is the safety net. Tagged, cacheable fetches also keep
 * static prerendering working at build time (no-store would make every page
 * dynamic and fail `next build`).
 */
function tableFromUrl(url: string): string {
  return /rest\/v1\/([a-z_]+)/.exec(url)?.[1] ?? "supabase";
}

export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (url, init) =>
        fetch(url, {
          ...init,
          next: { revalidate: 60, tags: [tableFromUrl(String(url))] },
        }),
    },
  },
);
