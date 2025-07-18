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
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    
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

// Fallback testimonials data (your current data)
export const fallbackTestimonials = [
  {
    name: "Priya & Rahul",
    event: "Wedding Reception",
    feedback: "We Decor transformed our wedding reception into a magical evening! The stage decoration was absolutely stunning and all our guests couldn't stop complimenting. Highly recommended!",
    avatar: "👰‍♀️🤵‍♂️",
    rating: 5,
    date: "2 weeks ago"
  },
  {
    name: "Anjali Sharma",
    event: "Daughter's Birthday",
    feedback: "The birthday decoration was beyond our expectations! My daughter was so happy seeing her favorite Disney theme come to life. The team was professional and punctual.",
    avatar: "🎂",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Rajesh & Meera",
    event: "Haldi Ceremony",
    feedback: "Beautiful traditional haldi setup with modern touches. The colors were vibrant and the backdrop was perfect for our photos. Thank you We Decor team!",
    avatar: "🌻",
    rating: 5,
    date: "3 weeks ago"
  },
  {
    name: "Suresh Kumar",
    event: "Corporate Event",
    feedback: "We hired We Decor for our company's annual party and they delivered excellence. The tent setup and balloon decorations created the perfect festive atmosphere.",
    avatar: "🏢",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Divya & Arjun",
    event: "Engagement Party",
    feedback: "Amazing work! The romantic setup with fairy lights and flower arrangements was exactly what we wanted. The team understood our vision perfectly.",
    avatar: "💍",
    rating: 5,
    date: "2 months ago"
  }
]; 