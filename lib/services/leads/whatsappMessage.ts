import { CONTACT } from '@/lib/contact';

/**
 * Plain-field shape for the WhatsApp enquiry message.
 *
 * Kept free of server-only imports so the contact form can build the same
 * message client-side when the API is unreachable (network error) and the
 * visitor needs a WhatsApp fallback that does not depend on the server.
 */
export type WhatsAppEnquiryFields = {
  name: string;
  eventTypeLabel: string;
  eventDate?: string | null;
  area?: string | null;
  budget?: string | null;
  phone?: string | null;
  email?: string | null;
  message?: string | null;
};

export function buildWhatsAppEnquiryText(fields: WhatsAppEnquiryFields): string {
  const lines = [
    `Hi We Decor! I'm ${fields.name}.`,
    `Event: ${fields.eventTypeLabel}`,
    fields.eventDate ? `Date: ${fields.eventDate}` : null,
    fields.area ? `Location: ${fields.area}` : null,
    fields.budget ? `Budget: ${fields.budget}` : null,
    fields.phone ? `Phone: ${fields.phone}` : null,
    fields.email ? `Email: ${fields.email}` : null,
    '',
    fields.message ?? '',
  ].filter(Boolean);
  return lines.join('\n');
}

export function buildWhatsAppEnquiryUrl(fields: WhatsAppEnquiryFields): string {
  return CONTACT.waUrl(buildWhatsAppEnquiryText(fields));
}
