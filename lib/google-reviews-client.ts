import { headers } from 'next/headers';

export type GoogleReviewItem = {
  author_name: string;
  text: string;
  rating: number;
  relative_time_description?: string;
  profile_photo_url?: string;
};

export type GoogleReviewsResponse = {
  reviews: GoogleReviewItem[];
  place?: {
    name: string;
    rating: number;
    user_ratings_total: number;
  } | null;
};

async function reviewsApiBase(): Promise<string> {
  const h = await headers();
  const host = h.get('host') ?? 'localhost:3000';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}

export async function fetchGoogleReviewsApi(
  placeId: string
): Promise<GoogleReviewsResponse | null> {
  try {
    const base = await reviewsApiBase();
    const res = await fetch(
      `${base}/api/google-reviews?placeId=${encodeURIComponent(placeId)}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    return (await res.json()) as GoogleReviewsResponse;
  } catch {
    return null;
  }
}
