interface GoogleReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GooglePlaceDetails {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

export async function fetchGoogleReviews(placeId: string): Promise<GooglePlaceDetails | null> {
  try {
    // You'll need to set up a Google Cloud Project and enable Places API
    // Then get an API key from Google Cloud Console
    // Server-only — never use NEXT_PUBLIC_ for API keys (exposed in client bundles)
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      console.warn('Google Places API key not found. Using fallback data.');
      return null;
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=place_id,name,rating,user_ratings_total,reviews&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'OK') {
      return data.result;
    } else {
      console.error('Google Places API error:', data.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return null;
  }
}

/** Link to We Decor Google Business Profile reviews */
export function getGoogleReviewsUrl(): string {
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim();
  if (placeId) {
    return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  }
  return 'https://www.google.com/maps/search/?api=1&query=We+Decor+Bangalore';
}
