import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Run middleware only when explicitly enabled OR in dev. In prod, rely on next.config.js headers() (faster, simpler).
const SHOULD_APPLY =
  process.env.FORCE_LOCAL_HEADERS === '1' || process.env.NODE_ENV !== 'production';

export const config = {
  // Exclude Next internals & common static assets
  matcher: [
    '/((?!_next/|favicon\\.ico$|robots\\.txt$|sitemap\\.xml$|.*\\.(?:png|jpe?g|webp|avif|gif|svg|ico|txt|xml)$).*)',
  ],
};

export default function middleware(req: NextRequest) {
  if (!SHOULD_APPLY) return NextResponse.next();

  const res = NextResponse.next();

  // Helper: only set if not already provided by Next headers()
  const setIfEmpty = (k: string, v: string) => {
    if (!res.headers.has(k)) res.headers.set(k, v);
  };

  // Hardened defaults; keep CSP Report-Only in local/dev.
  const csp =
    "default-src 'self'; " +
    "img-src 'self' https: data:; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
    "style-src 'self' 'unsafe-inline' https:; " +
    "connect-src 'self' https:; " +
    "font-src 'self' https: data:; " +
    "frame-ancestors 'none'";

  setIfEmpty('Referrer-Policy', 'strict-origin-when-cross-origin');
  setIfEmpty('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
  setIfEmpty('X-Frame-Options', 'DENY');
  setIfEmpty('X-Content-Type-Options', 'nosniff');
  // Important: don’t send both CSP and CSP-Report-Only together.
  setIfEmpty('Content-Security-Policy-Report-Only', csp);

  return res;
}
