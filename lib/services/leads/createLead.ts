import { randomUUID } from 'crypto';
import { sanitizeLeadField } from '@/lib/security/sanitize';
import type { CreateLeadInput, CreateLeadResult, LeadRecord } from './types';
import {
  buildWhatsAppUrl,
  deliverLeadWebhook,
  isLeadEmailConfigured,
  isLeadWebhookConfigured,
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
    phone: sanitizeLeadField((input.phone ?? '').replace(/\s/g, ''), 20),
    email: input.email ? sanitizeLeadField(input.email.toLowerCase(), 254) || null : null,
    eventType: sanitizeLeadField(input.eventType, 80),
    eventTypeLabel: sanitizeLeadField(input.eventTypeLabel || humanizeValue(input.eventType), 80),
    eventDate: input.eventDate ? sanitizeLeadField(input.eventDate, 32) : null,
    budget: input.budget ? sanitizeLeadField(input.budget, 64) : null,
    area: input.area ? sanitizeLeadField(input.area, 200) || null : null,
    place: input.place ?? null,
    message: sanitizeLeadField(input.message ?? '', 4000),
    metadata: {
      userAgent: input.metadata?.userAgent ?? null,
      ipHash: input.metadata?.ipHash ?? null,
      locale: input.metadata?.locale ?? null,
      pageUrl: input.metadata?.pageUrl ?? null,
    },
  };
}

/**
 * Did anyone at We Decor actually receive this lead?
 *
 * True when email or the CRM webhook accepted it. With neither channel
 * configured, local dev and tests still succeed so the form can be exercised —
 * but never in production, where an unconfigured site would otherwise thank
 * every visitor while silently dropping their enquiry.
 */
export function isLeadDelivered(emailSent: boolean, webhookDelivered: boolean): boolean {
  if (emailSent || webhookDelivered) return true;
  const anyConfigured = isLeadEmailConfigured() || isLeadWebhookConfigured();
  return !anyConfigured && process.env.NODE_ENV !== 'production';
}

/**
 * Single entry point for a new lead: email notification + CRM webhook
 * (We Decor Firebase `websiteLead`). There is deliberately no second intake path.
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

  if (isLeadWebhookConfigured() && !webhookDelivered) {
    // The app missed it; email may still have it.
    console.error(JSON.stringify({ event: 'lead_webhook_failed', leadId: lead.id }));
  }

  const delivered = isLeadDelivered(emailSent, webhookDelivered);
  if (delivered) {
    logLeadCreated(lead.id, lead.source);
  } else {
    // No PII — the lead id plus which channels were even configured.
    console.error(
      JSON.stringify({
        event: 'lead_delivery_failed',
        leadId: lead.id,
        emailConfigured: isLeadEmailConfigured(),
        webhookConfigured: isLeadWebhookConfigured(),
      })
    );
  }

  return {
    lead,
    whatsappUrl: buildWhatsAppUrl(lead),
    notifications: { emailSent, webhookDelivered },
    delivered,
  };
}
