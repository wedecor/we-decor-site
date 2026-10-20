import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

const CONTACT_LIMIT = 5;
const CONTACT_WINDOW_SEC = 15 * 60;

type MemoryEntry = { count: number; resetAt: number };
const memoryStore = new Map<string, MemoryEntry>();

function memoryRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const windowMs = CONTACT_WINDOW_SEC * 1000;
  let entry = memoryStore.get(key);

  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + windowMs };
    memoryStore.set(key, entry);
  }

  entry.count += 1;
  const success = entry.count <= CONTACT_LIMIT;

  return {
    success,
    limit: CONTACT_LIMIT,
    remaining: Math.max(0, CONTACT_LIMIT - entry.count),
    reset: entry.resetAt,
  };
}

let upstashLimiter: Ratelimit | null = null;
let memoryWarned = false;

function getUpstashLimiter(): Ratelimit | null {
  if (upstashLimiter) return upstashLimiter;
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;

  const redis = new Redis({ url, token });
  upstashLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(CONTACT_LIMIT, `${CONTACT_WINDOW_SEC} s`),
    prefix: 'we-decor:contact',
    analytics: false,
  });
  return upstashLimiter;
}

export async function rateLimitContact(ip: string): Promise<RateLimitResult> {
  const key = ip || 'unknown';
  const limiter = getUpstashLimiter();

  if (limiter) {
    const result = await limiter.limit(key);
    return {
      success: result.success,
      limit: CONTACT_LIMIT,
      remaining: result.remaining,
      reset: result.reset,
    };
  }

  if (process.env.NODE_ENV === 'production' && !memoryWarned) {
    memoryWarned = true;
    console.warn(
      '[rate-limit] UPSTASH_REDIS_REST_URL/TOKEN missing — using in-memory limit (not shared across isolates).'
    );
  }

  return memoryRateLimit(key);
}

/**
 * Client IP for rate limiting.
 *
 * Never use the leftmost X-Forwarded-For hop — that is attacker-controlled.
 * On Vercel, `x-real-ip` / `x-vercel-forwarded-for` are set by the platform.
 * Otherwise take the rightmost XFF hop (the proxy that actually connected).
 */
export function getClientIp(request: Request): string {
  const vercel = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim();
  if (vercel) return vercel;

  const real = request.headers.get('x-real-ip')?.trim();
  if (real) return real;

  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const hops = forwarded
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);
    return hops[hops.length - 1] || 'unknown';
  }

  return 'unknown';
}
