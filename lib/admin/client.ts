"use client";

/** Fetch helper for admin UI — sets the CSRF header and unwraps JSON errors. */
export async function adminFetch<T = unknown>(
  path: string,
  opts: { method?: string; body?: unknown } = {},
): Promise<T> {
  const res = await fetch(path, {
    method: opts.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      "x-admin-csrf": "1",
    },
    body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (json as { error?: string }).error ?? `Request failed (${res.status})`,
    );
  }
  return json as T;
}
