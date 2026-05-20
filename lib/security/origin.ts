import { env } from '@/lib/env';

/**
 * Validates same-site POST for contact API (CSRF mitigation for JSON endpoints).
 */
export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const site = env.SITE_URL.replace(/\/+$/, '');

  const allowed = new Set<string>([
    site,
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
  ]);

  if (origin) {
    try {
      const o = new URL(origin);
      return allowed.has(`${o.protocol}//${o.host}`);
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const r = new URL(referer);
      return allowed.has(`${r.protocol}//${r.host}`);
    } catch {
      return false;
    }
  }

  // Non-browser clients (curl) — block in production
  return process.env.NODE_ENV !== 'production';
}
