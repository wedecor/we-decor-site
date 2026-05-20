import { randomUUID } from 'crypto';
import { sanitizeLeadField } from '@/lib/security/sanitize';
import type { CreateLeadInput, CreateLeadResult, LeadRecord } from './types';
import {
  buildWhatsAppUrl,
  deliverLeadWebhook,
  logLeadCreated,
  sendLeadEmail,
} from './notifications';

export function normalizeLeadInput(input: CreateLeadInput): Omit<LeadRecord, 'id' | 'createdAt'> {
  return {
    source: input.source ?? 'contact_form',
    name: sanitizeLeadField(input.name, 120),
    phone: sanitizeLeadField(input.phone.replace(/\s/g, ''), 20),
    email: sanitizeLeadField(input.email.toLowerCase(), 254),
    eventType: sanitizeLeadField(input.eventType, 80),
    eventDate: input.eventDate ? sanitizeLeadField(input.eventDate, 32) : null,
    budget: input.budget ? sanitizeLeadField(input.budget, 64) : null,
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

  logLeadCreated(lead.id, lead.source);

  return {
    lead,
    whatsappUrl: buildWhatsAppUrl(lead),
    notifications: { emailSent, webhookDelivered },
  };
}
