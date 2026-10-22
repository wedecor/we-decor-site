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
const PLACES_LIMIT = 40;
const PLACES_WINDOW_SEC = 60;

type MemoryEntry = { count: number; resetAt: number };
const memoryStore = new Map<string, MemoryEntry>();

function memoryRateLimitFor(
  store: Map<string, MemoryEntry>,
  key: string,
  limit: number,
  windowSec: number
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSec * 1000;
  let entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + windowMs };
    store.set(key, entry);
  }

  entry.count += 1;
  const success = entry.count <= limit;

  return {
    success,
    limit,
    remaining: Math.max(0, limit - entry.count),
    reset: entry.resetAt,
  };
}

function memoryRateLimit(key: string): RateLimitResult {
  return memoryRateLimitFor(memoryStore, key, CONTACT_LIMIT, CONTACT_WINDOW_SEC);
}

const placesMemoryStore = new Map<string, MemoryEntry>();

let upstashLimiter: Ratelimit | null = null;
let placesUpstashLimiter: Ratelimit | null = null;
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

function getPlacesUpstashLimiter(): Ratelimit | null {
  if (placesUpstashLimiter) return placesUpstashLimiter;
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;

  const redis = new Redis({ url, token });
  placesUpstashLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(PLACES_LIMIT, `${PLACES_WINDOW_SEC} s`),
    prefix: 'we-decor:places',
    analytics: false,
  });
  return placesUpstashLimiter;
}

export async function rateLimitPlaces(ip: string): Promise<RateLimitResult> {
  const key = ip || 'unknown';
  const limiter = getPlacesUpstashLimiter();

  if (limiter) {
    const result = await limiter.limit(key);
    return {
      success: result.success,
      limit: PLACES_LIMIT,
      remaining: result.remaining,
      reset: result.reset,
    };
  }

  return memoryRateLimitFor(placesMemoryStore, key, PLACES_LIMIT, PLACES_WINDOW_SEC);
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
