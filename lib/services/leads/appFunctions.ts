/** Cloud Functions origin derived from LEAD_WEBHOOK_URL (…/websiteLead). */
export function leadFunctionsBase(): string {
  const webhook = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!webhook) return '';
  try {
    return new URL(webhook).origin;
  } catch {
    return '';
  }
}

export function leadPlacesAutocompleteUrl(): string {
  const base = leadFunctionsBase();
  return base ? `${base}/websitePlacesAutocomplete` : '';
}

export function leadPlacesDetailsUrl(): string {
  const base = leadFunctionsBase();
  return base ? `${base}/websitePlaceDetails` : '';
}
