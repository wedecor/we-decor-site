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

type AddressComponentPart = {
  long_name?: string;
  longText?: string;
  types?: string[];
};

const AREA_TYPES = new Set(['sublocality', 'sublocality_level_1', 'neighborhood', 'locality']);

const AUTOCOMPLETE_V1_FIELD_MASK = [
  'suggestions.placePrediction.placeId',
  'suggestions.placePrediction.text.text',
  'suggestions.placePrediction.structuredFormat.mainText.text',
  'suggestions.placePrediction.structuredFormat.secondaryText.text',
].join(',');

const DETAILS_V1_FIELD_MASK = 'id,formattedAddress,location,addressComponents,types';

function placesKey(): string {
  return process.env.GOOGLE_PLACES_API_KEY?.trim() ?? '';
}

function component(parts: AddressComponentPart[] | undefined, type: string): string | null {
  const match = parts?.find((part) => part.types?.includes(type));
  const name = (match?.longText ?? match?.long_name)?.trim();
  return name || null;
}

function buildPlaceDetails(input: {
  placeId: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  parts: AddressComponentPart[] | undefined;
  types: string[] | undefined;
}): GooglePlaceDetails {
  const area =
    component(input.parts, 'sublocality_level_1') ??
    component(input.parts, 'sublocality') ??
    component(input.parts, 'neighborhood');
  return {
    placeId: input.placeId,
    address: input.address,
    lat: input.lat,
    lng: input.lng,
    area,
    city: component(input.parts, 'locality'),
    isArea: (input.types ?? []).some((type) => AREA_TYPES.has(type)),
  };
}

async function autocompleteV1(
  key: string,
  query: string,
  token: string
): Promise<PlaceSuggestion[] | null> {
  const payload: Record<string, unknown> = {
    input: query,
    includedRegionCodes: ['in'],
    languageCode: 'en',
    locationBias: {
      circle: {
        center: { latitude: BENGALURU.lat, longitude: BENGALURU.lng },
        radius: Number(RADIUS_M),
      },
    },
  };
  if (token) {
    payload.sessionToken = token;
  }

  try {
    const res = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': AUTOCOMPLETE_V1_FIELD_MASK,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return null;
    }
    const data = (await res.json().catch(() => ({}))) as {
      suggestions?: Array<{
        placePrediction?: {
          placeId?: string;
          text?: { text?: string };
          structuredFormat?: {
            mainText?: { text?: string };
            secondaryText?: { text?: string };
          };
        };
      }>;
    };
    return (data.suggestions ?? [])
      .map((row) => row.placePrediction)
      .filter((pred): pred is NonNullable<typeof pred> & { placeId: string } =>
        Boolean(pred?.placeId)
      )
      .map((pred) => ({
        placeId: pred.placeId,
        mainText: pred.structuredFormat?.mainText?.text?.trim() || pred.text?.text?.trim() || '',
        secondaryText: pred.structuredFormat?.secondaryText?.text?.trim() || '',
      }))
      .filter((row) => row.mainText);
  } catch {
    return null;
  }
}

async function autocompleteLegacy(
  key: string,
  query: string,
  token: string
): Promise<PlaceSuggestion[]> {
  const params = new URLSearchParams({
    input: query,
    key,
    components: 'country:in',
    location: `${BENGALURU.lat},${BENGALURU.lng}`,
    radius: RADIUS_M,
    language: 'en',
  });
  if (token) {
    params.set('sessiontoken', token);
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

export async function googlePlacesAutocomplete(
  input: unknown,
  sessionToken: unknown
): Promise<PlaceSuggestion[]> {
  const key = placesKey();
  const query = typeof input === 'string' ? input.trim() : '';
  if (!key || query.length < 2) return [];

  const token = typeof sessionToken === 'string' ? sessionToken.trim() : '';
  const v1 = await autocompleteV1(key, query, token);
  if (v1 !== null) {
    return v1;
  }
  return autocompleteLegacy(key, query, token);
}

async function placeDetailsV1(
  key: string,
  id: string,
  token: string
): Promise<GooglePlaceDetails | null> {
  const v1Params = new URLSearchParams({ languageCode: 'en' });
  if (token) {
    v1Params.set('sessionToken', token);
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(id)}?${v1Params}`,
      {
        headers: {
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': DETAILS_V1_FIELD_MASK,
        },
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!res.ok) {
      return null;
    }
    const data = (await res.json().catch(() => ({}))) as {
      id?: string;
      formattedAddress?: string;
      location?: { latitude?: number; longitude?: number };
      addressComponents?: AddressComponentPart[];
      types?: string[];
    };
    if (!data.id) {
      return null;
    }
    return buildPlaceDetails({
      placeId: data.id,
      address: data.formattedAddress?.trim() || null,
      lat: data.location?.latitude ?? null,
      lng: data.location?.longitude ?? null,
      parts: data.addressComponents,
      types: data.types,
    });
  } catch {
    return null;
  }
}

async function placeDetailsLegacy(
  key: string,
  id: string,
  token: string
): Promise<GooglePlaceDetails | null> {
  const params = new URLSearchParams({
    place_id: id,
    key,
    fields: 'place_id,name,formatted_address,geometry,address_component,types',
    language: 'en',
  });
  if (token) {
    params.set('sessiontoken', token);
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
        address_components?: AddressComponentPart[];
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
    return buildPlaceDetails({
      placeId,
      address: result.formatted_address?.trim() || null,
      lat: result.geometry?.location?.lat ?? null,
      lng: result.geometry?.location?.lng ?? null,
      parts: result.address_components,
      types: result.types,
    });
  } catch {
    return null;
  }
}

export async function googlePlaceDetails(
  placeId: unknown,
  sessionToken: unknown
): Promise<GooglePlaceDetails | null> {
  const key = placesKey();
  const id = typeof placeId === 'string' ? placeId.trim() : '';
  if (!key || id.length < 8) return null;

  const token = typeof sessionToken === 'string' ? sessionToken.trim() : '';
  const v1 = await placeDetailsV1(key, id, token);
  if (v1 !== null) {
    return v1;
  }
  return placeDetailsLegacy(key, id, token);
}
