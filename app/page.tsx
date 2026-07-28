import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import HomeJsonLd from '@/components/home/home-json-ld';
import HomeHero from '@/components/home/home-hero';
import HomeTrustStrip from '@/components/home/home-trust-strip';
import HomeServices from '@/components/home/home-services';
import HomeWhy from '@/components/home/home-why';
import HomeGalleryPreview from '@/components/home/home-gallery-preview';
import HomeTestimonials from '@/components/home/home-testimonials';
import HomeCta from '@/components/home/home-cta';
import HomeContact from '@/components/home/home-contact';
import HomeFaq from '@/components/home/home-faq';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'We Decor - Event Decorations Services in Bangalore',
  description:
    'Professional event decoration services in Bangalore. Birthday decor, wedding setup, haldi decoration, room decoration. Call +91 8880544452 for free quote!',
  ogImage: '/og-banner.jpg',
});

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <HomeHero />
      <HomeTrustStrip />
      <HomeServices />
      <HomeWhy />
      <HomeGalleryPreview />
      <HomeTestimonials />
      <HomeCta />
      <HomeContact />
      <HomeFaq />
      <CoreExploreLinks context="hub" showLocalities pageKey="home" heading="Areas we decorate" />
    </>
  );
}
