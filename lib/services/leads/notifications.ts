import { CONTACT } from '@/lib/contact';
import type { LeadRecord } from './types';

function buildWhatsAppMessage(lead: LeadRecord): string {
  const lines = [
    `Hi We Decor! I'm ${lead.name}.`,
    `Event: ${lead.eventType}`,
    lead.eventDate ? `Date: ${lead.eventDate}` : null,
    lead.budget ? `Budget: ${lead.budget}` : null,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    '',
    lead.message,
  ].filter(Boolean);
  return lines.join('\n');
}

export function buildWhatsAppUrl(lead: LeadRecord): string {
  return CONTACT.waUrl(buildWhatsAppMessage(lead));
}

export function buildCrmPayload(lead: LeadRecord): Record<string, unknown> {
  return {
    externalId: lead.id,
    source: lead.source,
    createdAt: lead.createdAt,
    contact: {
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
    },
    event: {
      type: lead.eventType,
      date: lead.eventDate,
      budget: lead.budget,
      notes: lead.message,
    },
    metadata: lead.metadata,
  };
}

export async function sendLeadEmail(lead: LeadRecord): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.LEAD_NOTIFY_EMAIL?.trim();
  const from = process.env.LEAD_NOTIFY_FROM?.trim() || 'We Decor <leads@wedecorevents.com>';

  if (!apiKey || !to) return false;

  const subject = `New lead: ${lead.name} — ${lead.eventType}`;
  const text = [
    `Lead ID: ${lead.id}`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Event: ${lead.eventType}`,
    lead.eventDate ? `Date: ${lead.eventDate}` : '',
    lead.budget ? `Budget: ${lead.budget}` : '',
    '',
    lead.message,
    '',
    `WhatsApp: ${buildWhatsAppUrl(lead)}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function deliverLeadWebhook(lead: LeadRecord): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!url) return false;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { 'X-Lead-Secret': process.env.LEAD_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(buildCrmPayload(lead)),
      signal: AbortSignal.timeout(10000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Production-safe structured log — no PII in message prefix */
export function logLeadCreated(leadId: string, source: string): void {
  if (process.env.NODE_ENV === 'production') {
    console.info(JSON.stringify({ event: 'lead_created', leadId, source, ts: new Date().toISOString() }));
  } else {
    console.info(`[lead] created ${leadId} (${source})`);
  }
}
