import type { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { placeId } = req.query;

  if (!placeId || typeof placeId !== 'string') {
    return res.status(400).json({ message: 'Place ID is required' });
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        message: 'Google Places API key not configured',
        error: 'API_KEY_MISSING'
      });
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=place_id,name,rating,user_ratings_total,reviews&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'OK') {
      // Cache the response for 1 hour
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
      return res.status(200).json(data.result);
    } else {
      console.error('Google Places API error:', data.status);
      return res.status(400).json({ 
        message: 'Failed to fetch reviews',
        error: data.status 
      });
    }
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: 'FETCH_ERROR'
    });
  }
} 