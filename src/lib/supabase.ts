import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Lazily-created Supabase client for public, read-only portfolio data.
 *
 * Uses the public anon key — safe to expose to the browser. Keep write access
 * locked down with Row Level Security (RLS): the `projects` table should allow
 * `SELECT` for the `anon` role only.
 *
 * Returns `null` when env vars are missing so callers can fall back gracefully
 * (e.g. during local setup before `.env.local` is filled in).
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!rawUrl || !anonKey) return null;

  // Normalize: supabase-js appends `/rest/v1/` itself, so strip any REST path
  // or trailing slash a user may have pasted from the dashboard.
  const url = rawUrl.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

  client ??= createClient(url, anonKey, {
    auth: { persistSession: false },
  });

  return client;
}
