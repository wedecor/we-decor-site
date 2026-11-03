import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Upstash client that always fails, as when Redis is unreachable.
vi.mock('@upstash/ratelimit', () => {
  class Ratelimit {
    static slidingWindow() {
      return {};
    }
    async limit() {
      throw new Error('ECONNRESET');
    }
  }
  return { Ratelimit };
});
vi.mock('@upstash/redis', () => ({ Redis: class {} }));

describe('rateLimitContact when Upstash errors', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://example.upstash.io');
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'token');
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('falls back to the in-memory limit instead of throwing (no lost lead)', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { rateLimitContact } = await import('@/lib/rate-limit');

    const first = await rateLimitContact('203.0.113.9');
    expect(first.success).toBe(true);
    expect(error).toHaveBeenCalledWith(expect.stringContaining('rate_limit_upstash_error'));

    // The memory fallback still enforces the 5 / 15 min contact limit.
    for (let i = 0; i < 4; i++) await rateLimitContact('203.0.113.9');
    expect((await rateLimitContact('203.0.113.9')).success).toBe(false);
  });

  it('logs at error level in production when Upstash is not configured', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '');
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '');
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { rateLimitContact } = await import('@/lib/rate-limit');
    expect((await rateLimitContact('203.0.113.10')).success).toBe(true);
    expect(error).toHaveBeenCalledWith(
      expect.stringContaining('rate_limit_upstash_not_configured')
    );
  });
});
