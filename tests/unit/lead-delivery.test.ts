import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/contact/route';
import { createLead, isLeadDelivered } from '@/lib/services/leads/createLead';

const WEBHOOK = 'https://example-functions.test/websiteLead';

const payload = {
  name: 'Rahul Kumar',
  phone: '9876543210',
  eventType: 'Haldi',
  eventDate: new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(
    new Date(Date.now() + 30 * 86_400_000)
  ),
  location: 'Jayanagar',
  message: 'Traditional haldi setup for 50 guests.',
  website: '',
};

function request(body: Record<string, unknown>) {
  return new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      origin: 'http://localhost:3000',
      'x-forwarded-for': `10.1.0.${Math.floor(Math.random() * 200) + 1}`,
    },
    body: JSON.stringify(body),
  });
}

/** Stub only the outbound delivery calls; everything else is real. */
function stubDelivery({ webhook, email }: { webhook: number | 'throw'; email?: number | 'throw' }) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    const outcome = url.startsWith('https://api.resend.com') ? email : webhook;
    if (outcome === undefined) throw new Error(`unexpected fetch ${url}`);
    if (outcome === 'throw') throw new Error('network down');
    return new Response('{}', { status: outcome });
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('lead delivery', () => {
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('LEAD_OPTIONS_URL', '');
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('LEAD_NOTIFY_EMAIL', '');
    vi.stubEnv('LEAD_WEBHOOK_URL', '');
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('refuses with LEAD_DELIVERY_FAILED and a WhatsApp link when the webhook fails and email is off', async () => {
    vi.stubEnv('LEAD_WEBHOOK_URL', WEBHOOK);
    stubDelivery({ webhook: 500 });

    const res = await POST(request(payload));
    expect(res.status).toBe(502);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('LEAD_DELIVERY_FAILED');
    expect(json.error.whatsappUrl).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(decodeURIComponent(json.error.whatsappUrl)).toContain('Rahul Kumar');
    expect(json.leadId).toBeUndefined();
  });

  it('refuses when both email and the webhook fail', async () => {
    vi.stubEnv('LEAD_WEBHOOK_URL', WEBHOOK);
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('LEAD_NOTIFY_EMAIL', 'owner@example.com');
    stubDelivery({ webhook: 'throw', email: 503 });

    const res = await POST(request(payload));
    expect(res.status).toBe(502);
    expect((await res.json()).error.code).toBe('LEAD_DELIVERY_FAILED');
  });

  it('succeeds when only the webhook delivers', async () => {
    vi.stubEnv('LEAD_WEBHOOK_URL', WEBHOOK);
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('LEAD_NOTIFY_EMAIL', 'owner@example.com');
    stubDelivery({ webhook: 200, email: 500 });

    const res = await POST(request(payload));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.whatsappUrl).toContain('wa.me');
  });

  it('succeeds when only email delivers', async () => {
    vi.stubEnv('LEAD_WEBHOOK_URL', WEBHOOK);
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('LEAD_NOTIFY_EMAIL', 'owner@example.com');
    stubDelivery({ webhook: 'throw', email: 200 });

    const res = await POST(request(payload));
    expect(res.status).toBe(200);
  });

  it('keeps the websiteLead webhook contract (POST JSON, secret header, externalId)', async () => {
    vi.stubEnv('LEAD_WEBHOOK_URL', WEBHOOK);
    vi.stubEnv('LEAD_WEBHOOK_SECRET', 'shh');
    const fetchMock = stubDelivery({ webhook: 200 });

    const result = await createLead({ name: 'Test', phone: '9876543210', eventType: 'Birthday' });
    expect(result.delivered).toBe(true);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(WEBHOOK);
    expect(init.method).toBe('POST');
    expect((init.headers as Record<string, string>)['X-Lead-Secret']).toBe('shh');
    expect(JSON.parse(String(init.body)).externalId).toBe(result.lead.id);
  });
});

describe('isLeadDelivered', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('is false in production when no channel is configured at all', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('LEAD_NOTIFY_EMAIL', '');
    vi.stubEnv('LEAD_WEBHOOK_URL', '');
    expect(isLeadDelivered(false, false)).toBe(false);
  });

  it('lets local dev and tests through when nothing is configured', () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('LEAD_WEBHOOK_URL', '');
    expect(isLeadDelivered(false, false)).toBe(true);
  });

  it('is false outside production once a channel is configured and fails', () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('LEAD_WEBHOOK_URL', WEBHOOK);
    expect(isLeadDelivered(false, false)).toBe(false);
  });

  it('is true when either channel delivered', () => {
    vi.stubEnv('NODE_ENV', 'production');
    expect(isLeadDelivered(true, false)).toBe(true);
    expect(isLeadDelivered(false, true)).toBe(true);
  });
});
