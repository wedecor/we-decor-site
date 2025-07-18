'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { fallbackTestimonials } from '../utils/googleReviews';

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

interface Testimonial {
  name: string;
  event?: string;
  feedback: string;
  avatar?: string;
  rating: number;
  date?: string;
  profile_photo_url?: string;
  isGoogleReview?: boolean;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGoogleReviews() {
      try {
        // Replace with your actual Google Place ID
        // You can find this by searching your business on Google Maps
        const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || 'ChIJ...'; // Add your Place ID here
        
        const response = await fetch(`/api/google-reviews?placeId=${placeId}`);
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.reviews && data.reviews.length > 0) {
            // Transform Google reviews to match our format
            const googleReviews: Testimonial[] = data.reviews.slice(0, 5).map((review: GoogleReview) => ({
              name: review.author_name,
              feedback: review.text,
              rating: review.rating,
              date: review.relative_time_description,
              profile_photo_url: review.profile_photo_url,
              isGoogleReview: true
            }));
            
            setTestimonials(googleReviews);
          }
        } else {
          console.warn('Failed to fetch Google reviews, using fallback data');
        }
      } catch (err) {
        console.error('Error fetching Google reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    }

    fetchGoogleReviews();
  }, []);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Loading reviews...
          </p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Real feedback from happy customers across Bangalore
        </p>
        {error && (
          <p className="text-sm text-red-500 mt-2">
            {error} - Showing sample testimonials
          </p>
        )}
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="testimonials-swiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                {testimonial.profile_photo_url ? (
                  <img 
                    src={testimonial.profile_photo_url} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                ) : (
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  {testimonial.event && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.event}
                    </p>
                  )}
                  {testimonial.date && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.date}
                    </p>
                  )}
                </div>
                {testimonial.isGoogleReview && (
                  <div className="ml-auto">
                    <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <svg className="w-8 h-8 text-green-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                "{testimonial.feedback}"
              </p>
              
              <div className="flex mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .testimonials-swiper .swiper-button-next,
        .testimonials-swiper .swiper-button-prev {
          color: #10b981;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: #10b981;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          background: #d1d5db;
        }
      `}</style>
    </section>
  );
} 