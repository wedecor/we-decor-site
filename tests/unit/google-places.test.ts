import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { googlePlaceDetails, googlePlacesAutocomplete } from '@/lib/services/leads/googlePlaces';

describe('googlePlaces service (Places API New + Legacy fallback)', () => {
  const originalKey = process.env.GOOGLE_PLACES_API_KEY;

  beforeEach(() => {
    process.env.GOOGLE_PLACES_API_KEY = 'test-places-key';
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (originalKey === undefined) {
      delete process.env.GOOGLE_PLACES_API_KEY;
    } else {
      process.env.GOOGLE_PLACES_API_KEY = originalKey;
    }
  });

  it('uses Places API (New) for autocomplete with X-Goog-Api-Key and X-Goog-FieldMask when v1 succeeds', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          suggestions: [
            {
              placePrediction: {
                placeId: 'ChIJ1234567890',
                text: { text: 'Whitefield, Bengaluru, Karnataka, India' },
                structuredFormat: {
                  mainText: { text: 'Whitefield' },
                  secondaryText: { text: 'Bengaluru, Karnataka, India' },
                },
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    );
    vi.stubGlobal('fetch', fetchMock);

    const results = await googlePlacesAutocomplete('Whitefield', 'tok-123');

    expect(results).toEqual([
      {
        placeId: 'ChIJ1234567890',
        mainText: 'Whitefield',
        secondaryText: 'Bengaluru, Karnataka, India',
      },
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://places.googleapis.com/v1/places:autocomplete');
    expect(init.method).toBe('POST');
    expect(init.headers).toMatchObject({
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': 'test-places-key',
      'X-Goog-FieldMask': expect.stringContaining('suggestions.placePrediction.placeId'),
    });
    const parsedBody = JSON.parse(String(init.body));
    expect(parsedBody).toMatchObject({
      input: 'Whitefield',
      includedRegionCodes: ['in'],
      languageCode: 'en',
      sessionToken: 'tok-123',
    });
  });

  it('falls back to legacy autocomplete endpoint when Places API (New) returns HTTP 403', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ error: 'disabled' }), { status: 403 }))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            status: 'OK',
            predictions: [
              {
                place_id: 'ChIJ_legacy_1234',
                description: 'Indiranagar, Bengaluru',
                structured_formatting: {
                  main_text: 'Indiranagar',
                  secondary_text: 'Bengaluru, Karnataka',
                },
              },
            ],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      );
    vi.stubGlobal('fetch', fetchMock);

    const results = await googlePlacesAutocomplete('Indiranagar', 'tok-legacy');

    expect(results).toEqual([
      {
        placeId: 'ChIJ_legacy_1234',
        mainText: 'Indiranagar',
        secondaryText: 'Bengaluru, Karnataka',
      },
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(String(fetchMock.mock.calls[1][0])).toContain(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json?'
    );
  });

  it('uses Places API (New) for place details with X-Goog-Api-Key and X-Goog-FieldMask when v1 succeeds', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          id: 'ChIJ1234567890',
          formattedAddress: 'Whitefield, Bengaluru, Karnataka 560066, India',
          location: { latitude: 12.9698, longitude: 77.75 },
          addressComponents: [
            { longText: 'Whitefield', types: ['sublocality_level_1', 'sublocality'] },
            { longText: 'Bengaluru', types: ['locality'] },
          ],
          types: ['sublocality_level_1', 'sublocality'],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    );
    vi.stubGlobal('fetch', fetchMock);

    const details = await googlePlaceDetails('ChIJ1234567890', 'tok-details');

    expect(details).toEqual({
      placeId: 'ChIJ1234567890',
      address: 'Whitefield, Bengaluru, Karnataka 560066, India',
      lat: 12.9698,
      lng: 77.75,
      area: 'Whitefield',
      city: 'Bengaluru',
      isArea: true,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('https://places.googleapis.com/v1/places/ChIJ1234567890?');
    expect(url).toContain('sessionToken=tok-details');
    expect(init.headers).toMatchObject({
      'X-Goog-Api-Key': 'test-places-key',
      'X-Goog-FieldMask': 'id,formattedAddress,location,addressComponents,types',
    });
  });

  it('falls back to legacy place details endpoint when Places API (New) returns HTTP 403', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ error: 'disabled' }), { status: 403 }))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            status: 'OK',
            result: {
              place_id: 'ChIJ_legacy_det',
              formatted_address: 'Koramangala, Bengaluru, Karnataka 560034, India',
              geometry: { location: { lat: 12.9352, lng: 77.6245 } },
              address_components: [
                { long_name: 'Koramangala', types: ['sublocality_level_1'] },
                { long_name: 'Bengaluru', types: ['locality'] },
              ],
              types: ['sublocality_level_1'],
            },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      );
    vi.stubGlobal('fetch', fetchMock);

    const details = await googlePlaceDetails('ChIJ_legacy_det', 'tok-legacy-2');

    expect(details).toEqual({
      placeId: 'ChIJ_legacy_det',
      address: 'Koramangala, Bengaluru, Karnataka 560034, India',
      lat: 12.9352,
      lng: 77.6245,
      area: 'Koramangala',
      city: 'Bengaluru',
      isArea: true,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(String(fetchMock.mock.calls[1][0])).toContain(
      'https://maps.googleapis.com/maps/api/place/details/json?'
    );
  });
});
