import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/contact/route';

const basePayload = {
  name: 'Rahul Kumar',
  phone: '9876543210',
  email: 'rahul@example.com',
  eventType: 'Haldi',
  eventDate: null,
  budget: null,
  message: 'Traditional haldi setup for 50 guests.',
  website: '',
  turnstileToken: 'dev-bypass-token',
};

function makeRequest(
  body: Record<string, unknown>,
  origin = 'http://localhost:3000',
  ip = `10.0.0.${Math.floor(Math.random() * 200) + 1}`,
) {
  return new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      origin,
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  const prevEnv = { ...process.env };

  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('CONTACT_SKIP_CAPTCHA', '1');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://www.wedecorevents.com');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    Object.assign(process.env, prevEnv);
  });

  it('returns 200 and success payload for valid submission', async () => {
    const res = await POST(makeRequest(basePayload));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.leadId).toBeTruthy();
    expect(json.whatsappUrl).toContain('wa.me');
  });

  it('returns 400 for validation errors', async () => {
    const res = await POST(makeRequest({ ...basePayload, email: 'not-an-email' }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('VALIDATION_ERROR');
  });

  it('returns 400 for honeypot spam', async () => {
    const res = await POST(makeRequest({ ...basePayload, website: 'filled' }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error.code).toBe('SPAM_DETECTED');
  });

  it('returns 403 for disallowed origin in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    const res = await POST(makeRequest(basePayload, 'https://evil.example'));
    expect(res.status).toBe(403);
  });
});
