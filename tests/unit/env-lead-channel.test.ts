import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { validateServerEnv } from '@/env/validation';

const codes = () => validateServerEnv().map((i) => i.code);
const issue = (code: string) => validateServerEnv().find((i) => i.code === code);

describe('lead channel env warnings (production)', () => {
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('LEAD_NOTIFY_EMAIL', '');
    vi.stubEnv('LEAD_WEBHOOK_URL', '');
  });
  afterEach(() => vi.unstubAllEnvs());

  it('Resend key without recipient and no webhook: partial + unconfigured', () => {
    vi.stubEnv('RESEND_API_KEY', 're_test');
    expect(codes()).toEqual(
      expect.arrayContaining(['LEAD_EMAIL_PARTIAL', 'LEAD_DELIVERY_UNCONFIGURED'])
    );
  });

  it('recipient without Resend key and no webhook: partial + unconfigured', () => {
    vi.stubEnv('LEAD_NOTIFY_EMAIL', 'owner@example.com');
    expect(codes()).toEqual(
      expect.arrayContaining(['LEAD_EMAIL_PARTIAL', 'LEAD_DELIVERY_UNCONFIGURED'])
    );
  });

  it('nothing set: unconfigured, not partial', () => {
    expect(codes()).toContain('LEAD_DELIVERY_UNCONFIGURED');
    expect(codes()).not.toContain('LEAD_EMAIL_PARTIAL');
  });

  it('complete email pair alone is a working channel', () => {
    vi.stubEnv('RESEND_API_KEY', 're_test');
    vi.stubEnv('LEAD_NOTIFY_EMAIL', 'owner@example.com');
    expect(codes()).not.toContain('LEAD_EMAIL_PARTIAL');
    expect(codes()).not.toContain('LEAD_DELIVERY_UNCONFIGURED');
  });

  it('webhook alone is a working channel; a half email pair still warns partial', () => {
    vi.stubEnv('LEAD_WEBHOOK_URL', 'https://example-functions.test/websiteLead');
    expect(codes()).not.toContain('LEAD_DELIVERY_UNCONFIGURED');
    vi.stubEnv('RESEND_API_KEY', 're_test');
    expect(codes()).toContain('LEAD_EMAIL_PARTIAL');
    expect(codes()).not.toContain('LEAD_DELIVERY_UNCONFIGURED');
  });

  it('stays at warn level so the layout env guard never takes the site down', () => {
    vi.stubEnv('RESEND_API_KEY', 're_test');
    expect(issue('LEAD_EMAIL_PARTIAL')?.level).toBe('warn');
    expect(issue('LEAD_DELIVERY_UNCONFIGURED')?.level).toBe('warn');
  });
});
