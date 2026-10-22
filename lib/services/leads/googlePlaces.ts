export type PlaceSuggestion = {
  placeId: string;
  mainText: string;
  secondaryText: string;
};

export type GooglePlaceDetails = {
  placeId: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  area: string | null;
  city: string | null;
  isArea: boolean;
};

const BENGALURU = { lat: 12.9716, lng: 77.5946 };
const RADIUS_M = '45000';

function placesKey(): string {
  return process.env.GOOGLE_PLACES_API_KEY?.trim() ?? '';
}

function component(
  parts: Array<{ long_name?: string; types?: string[] }> | undefined,
  type: string
): string | null {
  const match = parts?.find((part) => part.types?.includes(type));
  const name = match?.long_name?.trim();
  return name || null;
}

export async function googlePlacesAutocomplete(
  input: unknown,
  sessionToken: unknown
): Promise<PlaceSuggestion[]> {
  const key = placesKey();
  const query = typeof input === 'string' ? input.trim() : '';
  if (!key || query.length < 2) return [];

  const params = new URLSearchParams({
    input: query,
    key,
    components: 'country:in',
    location: `${BENGALURU.lat},${BENGALURU.lng}`,
    radius: RADIUS_M,
    language: 'en',
  });
  if (typeof sessionToken === 'string' && sessionToken.trim()) {
    params.set('sessiontoken', sessionToken.trim());
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`,
      { signal: AbortSignal.timeout(8000) }
    );
    const data = (await res.json().catch(() => ({}))) as {
      status?: string;
      predictions?: Array<{
        place_id?: string;
        description?: string;
        structured_formatting?: { main_text?: string; secondary_text?: string };
      }>;
    };
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.warn(JSON.stringify({ event: 'places_autocomplete_failed', status: data.status }));
      return [];
    }
    return (data.predictions ?? [])
      .filter((row) => row.place_id)
      .map((row) => ({
        placeId: row.place_id as string,
        mainText: row.structured_formatting?.main_text?.trim() || row.description?.trim() || '',
        secondaryText: row.structured_formatting?.secondary_text?.trim() || '',
      }))
      .filter((row) => row.mainText);
  } catch {
    return [];
  }
}

export async function googlePlaceDetails(
  placeId: unknown,
  sessionToken: unknown
): Promise<GooglePlaceDetails | null> {
  const key = placesKey();
  const id = typeof placeId === 'string' ? placeId.trim() : '';
  if (!key || id.length < 8) return null;

  const params = new URLSearchParams({
    place_id: id,
    key,
    fields: 'place_id,name,formatted_address,geometry,address_component,types',
    language: 'en',
  });
  if (typeof sessionToken === 'string' && sessionToken.trim()) {
    params.set('sessiontoken', sessionToken.trim());
  }

  try {
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`, {
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json().catch(() => ({}))) as {
      status?: string;
      result?: {
        place_id?: string;
        formatted_address?: string;
        geometry?: { location?: { lat?: number; lng?: number } };
        address_components?: Array<{ long_name?: string; types?: string[] }>;
        types?: string[];
      };
    };
    if (data.status !== 'OK' || !data.result?.place_id) {
      if (data.status && data.status !== 'OK') {
        console.warn(JSON.stringify({ event: 'places_details_failed', status: data.status }));
      }
      return null;
    }
    const result = data.result;
    const placeId = result.place_id;
    if (!placeId) return null;
    const types = result.types ?? [];
    const parts = result.address_components;
    const area =
      component(parts, 'sublocality_level_1') ??
      component(parts, 'sublocality') ??
      component(parts, 'neighborhood');
    return {
      placeId,
      address: result.formatted_address?.trim() || null,
      lat: result.geometry?.location?.lat ?? null,
      lng: result.geometry?.location?.lng ?? null,
      area,
      city: component(parts, 'locality'),
      isArea: types.some(
        (type) =>
          type === 'sublocality' ||
          type === 'sublocality_level_1' ||
          type === 'neighborhood' ||
          type === 'locality'
      ),
    };
  } catch {
    return null;
  }
}
