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

/** Normalised review shape used across the site. */
export type LiveReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  /** ISO date, derived from the Places `time` epoch. */
  datePublished: string;
  profilePhoto?: string;
  authorUrl?: string;
};

export type LiveReviewData = {
  rating: number;
  total: number;
  reviews: LiveReview[];
};

export async function fetchGoogleReviews(placeId: string): Promise<GooglePlaceDetails | null> {
  try {
    // Server-only — never use NEXT_PUBLIC_ for API keys (exposed in client bundles)
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      console.warn('Google Places API key not found. Using fallback data.');
      return null;
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=place_id,name,rating,user_ratings_total,reviews&reviews_sort=newest&key=${apiKey}`,
      // Google Places allows caching for up to 30 days; refresh daily.
      { next: { revalidate: 86400 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'OK') {
      return data.result;
    } else {
      console.error('Google Places API error:', data.status, data.error_message ?? '');
      return null;
    }
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return null;
  }
}

/**
 * Live Google reviews for the We Decor Business Profile.
 *
 * Returns `null` whenever the API key, Place ID, or response is unavailable —
 * callers must degrade gracefully rather than render placeholder ratings.
 *
 * Note: the Places Details endpoint returns at most 5 reviews and the set is
 * chosen by Google; there is no way to request more or pick specific ones.
 */
export async function getGoogleReviews(options?: {
  /** Only return reviews at or above this rating. Defaults to 4. */
  minRating?: number;
  /** Drop reviews with no written text (star-only ratings). Defaults to true. */
  requireText?: boolean;
}): Promise<LiveReviewData | null> {
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim();
  if (!placeId) return null;

  const details = await fetchGoogleReviews(placeId);
  if (!details) return null;

  const minRating = options?.minRating ?? 4;
  const requireText = options?.requireText ?? true;

  const reviews: LiveReview[] = (details.reviews ?? [])
    .filter((r) => r.rating >= minRating)
    .filter((r) => (requireText ? Boolean(r.text?.trim()) : true))
    .map((r) => ({
      author: r.author_name,
      rating: r.rating,
      text: r.text.trim(),
      relativeTime: r.relative_time_description,
      datePublished: new Date(r.time * 1000).toISOString().slice(0, 10),
      profilePhoto: r.profile_photo_url,
      authorUrl: r.author_url,
    }));

  const rating = Number(details.rating);
  const total = Number(details.user_ratings_total);

  if (!Number.isFinite(rating) || !Number.isFinite(total) || total <= 0) return null;

  return { rating, total, reviews };
}

/** Link to We Decor Google Business Profile reviews */
export function getGoogleReviewsUrl(): string {
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim();
  if (placeId) {
    return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  }
  return 'https://www.google.com/maps/search/?api=1&query=We+Decor+Bangalore';
}
