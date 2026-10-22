import { describe, expect, it } from 'vitest';
import { contactLeadSchema, todayInIndia } from '@/lib/services/leads/validators';

/** A date safely in the future, so the fixture never goes stale. */
function daysFromToday(days: number): string {
  const d = new Date(`${todayInIndia()}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const validPayload = {
  name: 'Priya Sharma',
  eventType: 'Wedding',
  eventDate: daysFromToday(60),
  location: 'Indiranagar',
  message: 'Need decor for rooftop venue in Indiranagar.',
  website: '',
  turnstileToken: 'test-token',
};

describe('contactLeadSchema', () => {
  it('accepts valid lead payload', () => {
    const result = contactLeadSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('rejects invalid phone when one is sent', () => {
    const result = contactLeadSchema.safeParse({ ...validPayload, phone: '12345' });
    expect(result.success).toBe(false);
  });

  it('accepts a lead without phone, email, budget or remark', () => {
    const result = contactLeadSchema.safeParse({
      name: 'Priya Sharma',
      eventType: 'wedding',
      eventDate: daysFromToday(60),
      location: 'Jayanagar',
      website: '',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBe('');
      expect(result.data.message).toBe('');
    }
  });

  it('rejects honeypot', () => {
    const result = contactLeadSchema.safeParse({ ...validPayload, website: 'https://spam.com' });
    expect(result.success).toBe(false);
  });

  it('rejects script in message', () => {
    const result = contactLeadSchema.safeParse({
      ...validPayload,
      message: '<script>alert(1)</script>',
    });
    expect(result.success).toBe(false);
  });

  it('rejects oversized message', () => {
    const result = contactLeadSchema.safeParse({
      ...validPayload,
      message: 'x'.repeat(5000),
    });
    expect(result.success).toBe(false);
  });

  it('accepts same-origin pageUrl', () => {
    const result = contactLeadSchema.safeParse({
      ...validPayload,
      pageUrl: 'https://www.wedecorevents.com/contact',
    });
    expect(result.success).toBe(true);
  });

  it('rejects off-site pageUrl', () => {
    const result = contactLeadSchema.safeParse({
      ...validPayload,
      pageUrl: 'https://evil.example/phish',
    });
    expect(result.success).toBe(false);
  });

  it('accepts a lead without email', () => {
    const result = contactLeadSchema.safeParse({ ...validPayload, email: '' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBeNull();
  });

  it('still rejects a malformed email', () => {
    const result = contactLeadSchema.safeParse({ ...validPayload, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('requires an event date', () => {
    expect(contactLeadSchema.safeParse({ ...validPayload, eventDate: null }).success).toBe(false);
    expect(contactLeadSchema.safeParse({ ...validPayload, eventDate: '' }).success).toBe(false);
  });

  it('accepts today and rejects past or impossible dates', () => {
    expect(
      contactLeadSchema.safeParse({ ...validPayload, eventDate: todayInIndia() }).success
    ).toBe(true);
    expect(
      contactLeadSchema.safeParse({ ...validPayload, eventDate: daysFromToday(-1) }).success
    ).toBe(false);
    expect(contactLeadSchema.safeParse({ ...validPayload, eventDate: '2030-02-30' }).success).toBe(
      false
    );
  });

  it('requires a location', () => {
    expect(contactLeadSchema.safeParse({ ...validPayload, location: '' }).success).toBe(false);
  });
});
