import { createClient } from "@supabase/supabase-js";

/**
 * Anon-key client for PUBLIC reads. RLS restricts it to published rows.
 * fetch is pinned to no-store: page/data caching is done explicitly with
 * unstable_cache in lib/cms/queries.ts, not by Next's fetch cache.
 */
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (url, init) => fetch(url, { ...init, cache: "no-store" }),
    },
  },
);
