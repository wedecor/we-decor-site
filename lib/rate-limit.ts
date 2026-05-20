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

  return memoryRateLimit(key);
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}
