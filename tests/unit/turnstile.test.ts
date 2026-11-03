import { afterEach, describe, expect, it, vi } from 'vitest';
import { verifyTurnstileToken } from '@/lib/security/turnstile';

describe('verifyTurnstileToken', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('does not reject submissions when Turnstile is not configured in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    const result = await verifyTurnstileToken('', '1.1.1.1');
    expect(result.ok).toBe(true);
    expect(result.reason).toBe('captcha_not_configured');
  });

  it('rejects a missing token once both Turnstile keys are configured', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'test-secret');
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', 'test-site-key');
    const result = await verifyTurnstileToken('', '1.1.1.1');
    expect(result.ok).toBe(false);
    expect(result.reason).toBe('missing_token');
  });

  it('logs at error level (not silently) when production skips Turnstile', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', '');
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    await verifyTurnstileToken('', '1.1.1.1');
    expect(error).toHaveBeenCalledWith(expect.stringContaining('captcha_not_configured'));
    error.mockRestore();
  });

  it('reports a half-configured key pair separately', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', 'test-site-key');
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = await verifyTurnstileToken('some-token', '1.1.1.1');
    expect(result.reason).toBe('captcha_partially_configured');
    expect(error).toHaveBeenCalledWith(expect.stringContaining('captcha_partially_configured'));
    error.mockRestore();
  });
});
