import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type CheckState = 'pending' | 'authorized' | 'denied';

/**
 * Wraps a gated route. On mount, calls /api/access/check (Vercel function)
 * which inspects the httpOnly `gated_access_token` cookie and returns
 * 200 (authorized) or 401 (denied). The SPA cannot read httpOnly cookies
 * directly, so the round-trip is required.
 *
 * While the check is in flight, render nothing — never flash protected
 * content before redirect.
 */
export default function AccessGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CheckState>('pending');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/access/check', {
          method: 'GET',
          credentials: 'include',
          headers: { Accept: 'application/json' },
        });
        if (cancelled) return;
        if (!res.ok) {
          setState('denied');
          return;
        }
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) {
          setState('denied');
          return;
        }
        const data = await res.json().catch(() => null);
        setState(data && data.authorized === true ? 'authorized' : 'denied');
      } catch {
        if (!cancelled) setState('denied');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state === 'pending') return null;
  if (state === 'denied') return <Navigate to="/access" replace />;
  return <>{children}</>;
}
