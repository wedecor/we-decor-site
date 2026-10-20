import { describe, expect, it } from 'vitest';
import { getClientIp } from '@/lib/rate-limit';
import { hashIp } from '@/lib/security/sanitize';

function req(headers: Record<string, string>): Request {
  return new Request('https://www.wedecorevents.com/api/contact', { headers });
}

describe('getClientIp', () => {
  it('prefers the Vercel platform header over spoofed XFF', () => {
    expect(
      getClientIp(
        req({
          'x-forwarded-for': '1.2.3.4, 10.0.0.1',
          'x-vercel-forwarded-for': '203.0.113.9',
        })
      )
    ).toBe('203.0.113.9');
  });

  it('uses the rightmost XFF hop when platform headers are absent', () => {
    expect(getClientIp(req({ 'x-forwarded-for': '1.2.3.4, 10.0.0.1' }))).toBe('10.0.0.1');
  });
});

describe('hashIp', () => {
  it('returns a stable hmac prefix, not a 32-bit string hash', () => {
    const a = hashIp('203.0.113.9', 'test-salt');
    const b = hashIp('203.0.113.9', 'test-salt');
    expect(a).toBe(b);
    expect(a.startsWith('ip_')).toBe(true);
    expect(a.length).toBeGreaterThan(10);
    expect(hashIp('203.0.113.9', 'other-salt')).not.toBe(a);
  });
});
