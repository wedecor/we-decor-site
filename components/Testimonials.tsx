'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { fallbackTestimonials } from '../utils/googleReviews';
import Image from 'next/image';

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
        const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || 'ChIJ...';
        const response = await fetch(`/api/google-reviews?placeId=${placeId}`);

        if (response.ok) {
          const data = await response.json();
          if (data.reviews?.length > 0) {
            const googleReviews: Testimonial[] = data.reviews
              .slice(0, 5)
              .map((review: GoogleReview) => ({
                name: review.author_name,
                feedback: review.text,
                rating: review.rating,
                date: review.relative_time_description,
                profile_photo_url: review.profile_photo_url,
                isGoogleReview: true,
              }));
            setTestimonials(googleReviews);
          }
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
      <div className="text-center py-12">
        <p className="lux-body">Loading reviews…</p>
        <div
          className="mx-auto mt-6 h-10 w-10 animate-spin rounded-full border-2 border-lux-gold/30 border-t-lux-gold"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div>
      {error ? (
        <p className="text-center text-sm text-lux-text-muted mb-8">
          {error} — showing sample testimonials
        </p>
      ) : null}

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={28}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="testimonials-swiper pb-12"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={`${testimonial.name}-${index}`}>
            <div className="lux-panel p-8 h-full flex flex-col">
              <div className="flex items-center mb-5">
                {testimonial.profile_photo_url ? (
                  <Image
                    src={testimonial.profile_photo_url}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                ) : (
                  <div className="text-3xl mr-3" aria-hidden>
                    {testimonial.avatar}
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-lux-ivory">{testimonial.name}</h3>
                  {testimonial.event ? (
                    <p className="text-xs text-lux-text-muted mt-0.5">{testimonial.event}</p>
                  ) : null}
                  {testimonial.date ? (
                    <p className="text-xs text-lux-text-muted mt-0.5">{testimonial.date}</p>
                  ) : null}
                </div>
              </div>

              <p className="font-display text-3xl text-lux-gold/30 leading-none mb-3" aria-hidden>
                &ldquo;
              </p>
              <p className="text-lux-muted leading-relaxed flex-1 text-sm md:text-base">
                {testimonial.feedback}
              </p>

              <div className="flex mt-5 gap-0.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-lux-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
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
          color: #d4b15a;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: #d4b15a;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
