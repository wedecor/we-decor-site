import { NextRequest, NextResponse } from 'next/server';

// GET /api/google-reviews?placeId=PLACE_ID
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let placeId = searchParams.get('placeId');
    const mapUrl = searchParams.get('mapUrl');

    // If mapUrl is provided, resolve redirects and extract place_id
    if (!placeId && mapUrl) {
      try {
        const res = await fetch(mapUrl, { redirect: 'follow' as any });
        const finalUrl = res.url || mapUrl;
        // Try to extract place_id from the final URL
        const match = finalUrl.match(/place_id[:=]([^&]+)/);
        if (match && match[1]) {
          placeId = decodeURIComponent(match[1]);
        }
      } catch {
        // ignore and fall through
      }
    }
    if (!placeId) {
      return NextResponse.json({ error: 'Missing placeId or mapUrl' }, { status: 400 });
    }

    const apiKey =
      process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Google Places API key not configured' }, { status: 500 });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&fields=place_id,name,rating,user_ratings_total,reviews&key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return NextResponse.json({ error: 'Upstream error' }, { status: res.status });
    }
    const data = await res.json();

    if (data.status !== 'OK' || !data.result) {
      return NextResponse.json({ reviews: [], place: null, status: data.status }, { status: 200 });
    }

    const {
      name,
      rating,
      user_ratings_total,
      reviews = [],
    } = data.result as {
      name: string;
      rating: number;
      user_ratings_total: number;
      reviews: Array<{
        author_name: string;
        text: string;
        rating: number;
        relative_time_description: string;
        profile_photo_url?: string;
      }>;
    };

    return NextResponse.json({
      place: { name, rating, user_ratings_total },
      reviews,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
