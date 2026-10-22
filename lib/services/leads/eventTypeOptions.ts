/** One event type the enquiry form offers. `value` is the app's stored value. */
export type EventTypeOption = { value: string; label: string };

/**
 * Used when the app can't be reached (or LEAD_OPTIONS_URL isn't set).
 * Mirrors DropdownDefaults.eventTypes in the We Decor Enquiries app, so the
 * app still recognises every value the form sends.
 */
export const FALLBACK_EVENT_TYPES: readonly EventTypeOption[] = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'corporate_event', label: 'Corporate Event' },
  { value: 'haldi', label: 'Haldi' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'others', label: 'Others' },
];

const MAX_OPTIONS = 60;

/** Keeps only well-formed options; null when nothing usable came back. */
export function sanitizeEventTypeOptions(raw: unknown): EventTypeOption[] | null {
  if (!Array.isArray(raw)) return null;
  const seen = new Set<string>();
  const out: EventTypeOption[] = [];
  for (const item of raw.slice(0, MAX_OPTIONS)) {
    if (!item || typeof item !== 'object') continue;
    const { value, label } = item as Record<string, unknown>;
    if (typeof value !== 'string' || typeof label !== 'string') continue;
    const v = value.trim().slice(0, 80);
    const l = label.trim().slice(0, 80);
    if (!v || !l || seen.has(v)) continue;
    seen.add(v);
    out.push({ value: v, label: l });
  }
  return out.length > 0 ? out : null;
}

/**
 * Event types from the app (`websiteFormOptions` Cloud Function), cached for an
 * hour, so an event type an admin adds in the app shows on the form within the hour.
 */
export async function getEventTypeOptions(): Promise<EventTypeOption[]> {
  const url = process.env.LEAD_OPTIONS_URL?.trim();
  const secret = process.env.LEAD_WEBHOOK_SECRET?.trim();
  if (!url || !secret) return [...FALLBACK_EVENT_TYPES];

  try {
    const res = await fetch(url, {
      headers: { 'X-Lead-Secret': secret },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [...FALLBACK_EVENT_TYPES];
    const data = (await res.json()) as { eventTypes?: unknown };
    return sanitizeEventTypeOptions(data?.eventTypes) ?? [...FALLBACK_EVENT_TYPES];
  } catch {
    return [...FALLBACK_EVENT_TYPES];
  }
}
