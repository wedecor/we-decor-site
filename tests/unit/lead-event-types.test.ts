import { describe, expect, it } from 'vitest';
import { createLead } from '@/lib/services/leads/createLead';
import { buildCrmPayload } from '@/lib/services/leads/notifications';
import {
  FALLBACK_EVENT_TYPES,
  sanitizeEventTypeOptions,
} from '@/lib/services/leads/eventTypeOptions';

describe('sanitizeEventTypeOptions', () => {
  it('keeps well-formed options and drops junk and duplicates', () => {
    expect(
      sanitizeEventTypeOptions([
        { value: 'wedding', label: 'Wedding' },
        { value: 'wedding', label: 'Wedding again' },
        { value: '', label: 'Empty' },
        { value: 'baby_shower' },
        'haldi',
        { value: ' corporate_event ', label: ' Corporate Event ' },
      ])
    ).toEqual([
      { value: 'wedding', label: 'Wedding' },
      { value: 'corporate_event', label: 'Corporate Event' },
    ]);
  });

  it('returns null when nothing usable came back', () => {
    expect(sanitizeEventTypeOptions(undefined)).toBeNull();
    expect(sanitizeEventTypeOptions([])).toBeNull();
    expect(sanitizeEventTypeOptions([{ nope: true }])).toBeNull();
  });

  it('fallback list uses app values', () => {
    expect(FALLBACK_EVENT_TYPES.map((t) => t.value)).toContain('corporate_event');
  });
});

describe('lead text shows labels, not stored values', () => {
  it('uses the label in WhatsApp and sends value + label + area to the app', async () => {
    const { lead, whatsappUrl } = await createLead({
      name: 'Priya Sharma',
      phone: '9876543210',
      email: null,
      eventType: 'corporate_event',
      eventTypeLabel: 'Corporate Event',
      eventDate: '2030-01-15',
      area: 'Jayanagar',
      message: 'Stage backdrop for an offsite',
    });
    const text = decodeURIComponent(whatsappUrl);
    expect(text).toContain('Event: Corporate Event');
    expect(text).not.toContain('corporate_event');
    expect(text).toContain('Area: Jayanagar');
    expect(text).not.toContain('Email:');

    const payload = buildCrmPayload(lead) as { event: Record<string, unknown> };
    expect(payload.event.type).toBe('corporate_event');
    expect(payload.event.typeLabel).toBe('Corporate Event');
    expect(payload.event.area).toBe('Jayanagar');
  });

  it('humanises a value when no label is known', async () => {
    const { lead } = await createLead({
      name: 'Asha',
      phone: '9876543210',
      eventType: 'baby_shower',
      message: 'Pastel theme',
    });
    expect(lead.eventTypeLabel).toBe('Baby shower');
  });
});
