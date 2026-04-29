import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAdminClient } from '../_lib/supabase';
import { readAccessTokenCookie } from '../_lib/cookie';

/**
 * GET /api/access/check
 *
 * Called by the <AccessGate> component on mount. Reads the httpOnly
 * `gated_access_token` cookie, looks up the row, and returns whether
 * the visitor has a verified, unexpired session.
 *
 * 200 { authorized: true }   → render gated content
 * 401 { authorized: false }  → redirect to /access
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = readAccessTokenCookie(req);
  if (!token) return res.status(401).json({ authorized: false });

  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from('gated_access_requests')
    .select('verified_at, expires_at')
    .eq('access_token', token)
    .maybeSingle();

  if (error) {
    console.error('Access check DB error:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
  if (!data) return res.status(401).json({ authorized: false });
  if (!data.verified_at) return res.status(401).json({ authorized: false });
  if (new Date(data.expires_at).getTime() < Date.now()) {
    return res.status(401).json({ authorized: false });
  }

  return res.status(200).json({ authorized: true });
}
