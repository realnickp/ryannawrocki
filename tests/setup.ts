// Test-only env values. Real values live in .env.local / Vercel and are
// NOT needed for unit tests (nothing here talks to the network).
process.env.SESSION_SECRET =
  process.env.SESSION_SECRET ?? "test-secret-test-secret-test-secret!!";
process.env.NEXT_PUBLIC_SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://mqvxwhdiptxwwnhueqda.supabase.co";
