import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAdminClient } from '../_lib/supabase';
import { buildAccessTokenCookie } from '../_lib/cookie';

/**
 * GET /api/access/verify?token=<access_token>
 *
 * Magic-link target — clicked from the email Resend sent. On success, this
 * marks the row's verified_at, sets the httpOnly `gated_access_token`
 * cookie, and 302-redirects to /portal. On failure, redirects to /access.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const tokenParam = req.query.token;
  const token = typeof tokenParam === 'string' ? tokenParam : Array.isArray(tokenParam) ? tokenParam[0] : '';
  if (!token || !/^[a-f0-9]{64}$/.test(token)) {
    return redirect(res, '/access?error=invalid_link');
  }

  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from('gated_access_requests')
    .select('id, expires_at')
    .eq('access_token', token)
    .maybeSingle();

  if (error) {
    console.error('Verify DB error:', error);
    return redirect(res, '/access?error=server');
  }
  if (!data) return redirect(res, '/access?error=invalid_link');
  if (new Date(data.expires_at).getTime() < Date.now()) {
    return redirect(res, '/access?error=expired');
  }

  const { error: updateError } = await supabase
    .from('gated_access_requests')
    .update({ verified_at: new Date().toISOString() })
    .eq('id', data.id);

  if (updateError) {
    console.error('Verify update error:', updateError);
    return redirect(res, '/access?error=server');
  }

  res.setHeader('Set-Cookie', buildAccessTokenCookie(token));
  return redirect(res, '/portal');
}

function redirect(res: VercelResponse, location: string) {
  res.setHeader('Location', location);
  return res.status(302).end();
}
