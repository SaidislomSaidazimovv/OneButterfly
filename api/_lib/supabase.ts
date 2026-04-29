import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase admin client. Uses the service-role key, which
 * bypasses RLS — this client must NEVER be exposed to the browser.
 * Vercel functions are server-only, so this file is safe.
 *
 * Env vars (set in Vercel dashboard, NOT prefixed with VITE_):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */
let cached: SupabaseClient | null = null;

export function getAdminClient(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) throw new Error('SUPABASE_URL is not set');
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
