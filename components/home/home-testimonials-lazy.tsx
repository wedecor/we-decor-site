'use client';

import dynamic from 'next/dynamic';
import HomeTestimonialsSkeleton from './home-testimonials-skeleton';

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <HomeTestimonialsSkeleton />,
  ssr: false,
});

export default function HomeTestimonialsLazy() {
  return <Testimonials />;
}
