import type { EventTypeOption } from './eventTypeOptions';

/**
 * Same ranking as the app's event-type search: prefix matches first, then
 * other contains-matches. Empty query returns the full list.
 */
export function filterEventTypes(
  options: readonly EventTypeOption[],
  rawQuery: string
): EventTypeOption[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [...options];

  const prefix: EventTypeOption[] = [];
  const contains: EventTypeOption[] = [];
  const collapsed = query.replace(/\s+/g, '_');
  for (const option of options) {
    const label = option.label.toLowerCase();
    const value = option.value.toLowerCase();
    if (label.startsWith(query) || value.startsWith(query) || value.startsWith(collapsed)) {
      prefix.push(option);
    } else if (
      label.includes(query) ||
      value.includes(collapsed) ||
      value.replace(/_/g, ' ').includes(query)
    ) {
      contains.push(option);
    }
  }
  return [...prefix, ...contains];
}
