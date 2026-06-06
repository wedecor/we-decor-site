import { NextRequest, NextResponse } from 'next/server';

const EMPTY = { reviews: [] as never[], place: null };

// GET /api/google-reviews?placeId=PLACE_ID
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let placeId = searchParams.get('placeId');
    const mapUrl = searchParams.get('mapUrl');

    if (!placeId && mapUrl) {
      try {
        const res = await fetch(mapUrl, { redirect: 'follow' as RequestRedirect });
        const finalUrl = res.url || mapUrl;
        const match = finalUrl.match(/place_id[:=]([^&]+)/);
        if (match?.[1]) {
          placeId = decodeURIComponent(match[1]);
        }
      } catch {
        // ignore and fall through
      }
    }

    if (!placeId) {
      return NextResponse.json(EMPTY);
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return NextResponse.json(EMPTY);
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&fields=place_id,name,rating,user_ratings_total,reviews&key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) {
      return NextResponse.json(EMPTY);
    }

    const data = await res.json();

    if (data.status !== 'OK' || !data.result) {
      return NextResponse.json({ reviews: [], place: null, status: data.status });
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
  } catch {
    return NextResponse.json(EMPTY);
  }
}
