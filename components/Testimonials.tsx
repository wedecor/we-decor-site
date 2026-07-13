'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { fallbackTestimonials, getGoogleReviewsUrl } from '../utils/googleReviews';

export default function Testimonials() {
  const googleReviewsUrl = getGoogleReviewsUrl();

  return (
    <div>
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
        {fallbackTestimonials.map((testimonial, index) => (
          <SwiperSlide key={`${testimonial.name}-${index}`}>
            <div className="lux-panel p-8 h-full flex flex-col">
              <div className="flex items-center mb-5">
                <div className="text-3xl mr-3" aria-hidden>
                  {testimonial.avatar}
                </div>
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

      <p className="text-center mt-4">
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="lux-btn-primary inline-flex items-center text-sm"
        >
          View all reviews on Google →
        </a>
      </p>

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
