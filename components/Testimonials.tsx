'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Priya & Rahul",
    event: "Wedding Reception",
    feedback: "We Decor transformed our wedding reception into a magical evening! The stage decoration was absolutely stunning and all our guests couldn't stop complimenting. Highly recommended!",
    avatar: "👰‍♀️🤵‍♂️"
  },
  {
    name: "Anjali Sharma",
    event: "Daughter's Birthday",
    feedback: "The birthday decoration was beyond our expectations! My daughter was so happy seeing her favorite Disney theme come to life. The team was professional and punctual.",
    avatar: "🎂"
  },
  {
    name: "Rajesh & Meera",
    event: "Haldi Ceremony",
    feedback: "Beautiful traditional haldi setup with modern touches. The colors were vibrant and the backdrop was perfect for our photos. Thank you We Decor team!",
    avatar: "🌻"
  },
  {
    name: "Suresh Kumar",
    event: "Corporate Event",
    feedback: "We hired We Decor for our company's annual party and they delivered excellence. The tent setup and balloon decorations created the perfect festive atmosphere.",
    avatar: "🏢"
  },
  {
    name: "Divya & Arjun",
    event: "Engagement Party",
    feedback: "Amazing work! The romantic setup with fairy lights and flower arrangements was exactly what we wanted. The team understood our vision perfectly.",
    avatar: "💍"
  }
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Real feedback from happy customers across Bangalore
        </p>
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
                <div className="text-3xl mr-3">{testimonial.avatar}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.event}
                  </p>
                </div>
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
                {[...Array(5)].map((_, i) => (
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