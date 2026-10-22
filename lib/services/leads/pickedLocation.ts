/** Same rule as the app's `pickedLocationText`. */
export function pickedLocationText(
  mainText: string,
  area: string | null | undefined,
  isArea = false
): string {
  const name = mainText.trim();
  const a = area?.trim() ?? '';
  if (isArea) return name || a;
  if (!a || !name) return name;
  const compact = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (compact(name).includes(compact(a))) return name;
  return `${name}, ${a}`;
}

export type LeadPlace = {
  placeId: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  area: string | null;
  city: string | null;
};
