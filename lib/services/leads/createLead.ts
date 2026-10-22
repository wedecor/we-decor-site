import { randomUUID } from 'crypto';
import { sanitizeLeadField } from '@/lib/security/sanitize';
import type { CreateLeadInput, CreateLeadResult, LeadRecord } from './types';
import {
  buildWhatsAppUrl,
  deliverLeadWebhook,
  logLeadCreated,
  sendLeadEmail,
} from './notifications';

/** "corporate_event" → "Corporate event" (only when no label is known). */
export function humanizeValue(value: string): string {
  const words = value.replace(/[_-]+/g, ' ').trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : value;
}

export function normalizeLeadInput(input: CreateLeadInput): Omit<LeadRecord, 'id' | 'createdAt'> {
  return {
    source: input.source ?? 'contact_form',
    name: sanitizeLeadField(input.name, 120),
    phone: sanitizeLeadField(input.phone.replace(/\s/g, ''), 20),
    email: input.email ? sanitizeLeadField(input.email.toLowerCase(), 254) || null : null,
    eventType: sanitizeLeadField(input.eventType, 80),
    eventTypeLabel: sanitizeLeadField(input.eventTypeLabel || humanizeValue(input.eventType), 80),
    eventDate: input.eventDate ? sanitizeLeadField(input.eventDate, 32) : null,
    budget: input.budget ? sanitizeLeadField(input.budget, 64) : null,
    area: input.area ? sanitizeLeadField(input.area, 120) || null : null,
    message: sanitizeLeadField(input.message, 4000),
    metadata: {
      userAgent: input.metadata?.userAgent ?? null,
      ipHash: input.metadata?.ipHash ?? null,
      locale: input.metadata?.locale ?? null,
      pageUrl: input.metadata?.pageUrl ?? null,
    },
  };
}

/**
 * Persists lead logic — today: notify + CRM webhook.
 * Future: insert into DB/CRM from this single entry point.
 */
export async function createLead(input: CreateLeadInput): Promise<CreateLeadResult> {
  const normalized = normalizeLeadInput(input);
  const lead: LeadRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...normalized,
  };

  const [emailSent, webhookDelivered] = await Promise.all([
    sendLeadEmail(lead),
    deliverLeadWebhook(lead),
  ]);

  if (process.env.LEAD_WEBHOOK_URL?.trim() && !webhookDelivered) {
    // The customer still reaches us on WhatsApp/email; this flags that the app missed it.
    console.error(JSON.stringify({ event: 'lead_webhook_failed', leadId: lead.id }));
  }

  logLeadCreated(lead.id, lead.source);

  return {
    lead,
    whatsappUrl: buildWhatsAppUrl(lead),
    notifications: { emailSent, webhookDelivered },
  };
}
