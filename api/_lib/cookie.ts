import type { VercelRequest } from '@vercel/node';

const COOKIE_NAME = 'gated_access_token';
const MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days

/**
 * Build a Set-Cookie header value for the access token. Production-only
 * `Secure`; same-site Lax so the cookie rides along on the magic-link
 * top-level navigation from the email.
 */
export function buildAccessTokenCookie(token: string): string {
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
  const flags = [
    `${COOKIE_NAME}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${MAX_AGE_SECONDS}`,
  ];
  if (isProd) flags.push('Secure');
  return flags.join('; ');
}

/**
 * Read the `gated_access_token` value from the inbound request cookies.
 * Returns null if the cookie is absent, malformed, or empty.
 */
export function readAccessTokenCookie(req: VercelRequest): string | null {
  const header = req.headers.cookie;
  if (!header) return null;
  const parts = header.split(';');
  for (const part of parts) {
    const [rawName, ...rest] = part.split('=');
    if (rawName?.trim() === COOKIE_NAME) {
      const value = rest.join('=').trim();
      if (!value) return null;
      // Defensive: only allow 64 hex chars (matches access_token shape)
      return /^[a-f0-9]{64}$/.test(value) ? value : null;
    }
  }
  return null;
}
