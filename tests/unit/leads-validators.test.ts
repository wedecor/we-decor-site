import { describe, expect, it } from 'vitest';
import { contactLeadSchema } from '@/lib/services/leads/validators';

const validPayload = {
  name: 'Priya Sharma',
  phone: '8880544452',
  email: 'priya@example.com',
  eventType: 'Wedding',
  eventDate: '2026-06-15',
  budget: '₹25000',
  message: 'Need decor for rooftop venue in Indiranagar.',
  website: '',
  turnstileToken: 'test-token',
};

describe('contactLeadSchema', () => {
  it('accepts valid lead payload', () => {
    const result = contactLeadSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('rejects invalid phone', () => {
    const result = contactLeadSchema.safeParse({ ...validPayload, phone: '12345' });
    expect(result.success).toBe(false);
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
});
