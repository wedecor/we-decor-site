import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/analytics/config', () => ({ isAnalyticsEnabled: () => true }));

type Pushed = Record<string, unknown>;

describe('lead conversion events', () => {
  let dataLayer: Pushed[];

  beforeEach(() => {
    dataLayer = [];
    vi.stubGlobal('window', { dataLayer });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('no longer exports an attempt helper that fired generate_lead', async () => {
    const mod = (await import('@/lib/analytics/conversion-events')) as Record<string, unknown>;
    expect(mod.trackLeadSubmitAttempt).toBeUndefined();
  });

  it('an attempt is form_submit only — never generate_lead', async () => {
    const { trackFormSubmit } = await import('@/lib/analytics/events');
    trackFormSubmit('contact_form', 'attempt');
    expect(dataLayer.map((e) => e.event)).toEqual(['form_submit']);
    expect(dataLayer[0].form_status).toBe('attempt');
  });

  it('generate_lead fires once, on confirmed success', async () => {
    const { trackLeadSubmitSuccess } = await import('@/lib/analytics/conversion-events');
    trackLeadSubmitSuccess({ leadId: 'abc', eventType: 'Haldi' });
    const leads = dataLayer.filter((e) => e.event === 'generate_lead');
    expect(leads).toHaveLength(1);
    expect(leads[0]).toMatchObject({ event_label: 'submit_success', lead_id: 'abc' });
  });

  it('a failure is form_error with the reason, distinguishable from success', async () => {
    const { trackLeadSubmitFailure } = await import('@/lib/analytics/conversion-events');
    trackLeadSubmitFailure('LEAD_DELIVERY_FAILED');
    expect(dataLayer).toEqual([
      expect.objectContaining({ event: 'form_error', error_code: 'LEAD_DELIVERY_FAILED' }),
    ]);
    expect(dataLayer.some((e) => e.event === 'generate_lead')).toBe(false);
  });

  it('the contact form never calls generate_lead before the API answers', async () => {
    const { readFileSync } = await import('fs');
    const src = readFileSync('components/ContactForm.tsx', 'utf8');
    expect(src).not.toMatch(/trackEvent\(\s*['"]generate_lead/);
    expect(src).not.toMatch(/trackLeadSubmitAttempt/);
    // The only generate_lead path is called after the success check.
    const successAt = src.indexOf('trackLeadSubmitSuccess(');
    expect(successAt).toBeGreaterThan(src.indexOf('if (!res.ok || !data.success)'));
    // Popup-after-await was blocked on mobile; WhatsApp is a tapped link now.
    expect(src).not.toMatch(/window\.open\(/);
  });
});
