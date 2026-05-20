import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import HomeJsonLd from '@/components/home/home-json-ld';
import HomeHero from '@/components/home/home-hero';
import HomeServices from '@/components/home/home-services';
import HomeCta from '@/components/home/home-cta';
import HomeContact from '@/components/home/home-contact';
import HomeFaq from '@/components/home/home-faq';
import HomeTestimonialsLazy from '@/components/home/home-testimonials-lazy';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'We Decor - Event Decoration Services in Bangalore',
  description:
    'Professional event decoration services in Bangalore. Birthday decor, wedding setup, haldi decoration, room decoration. Call +91 8880544452 for free quote!',
  ogImage: '/og-banner.webp',
});

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <HomeHero />
      <HomeServices />
      <HomeCta />
      <HomeTestimonialsLazy />
      <HomeContact />
      <HomeFaq />
    </>
  );
}
