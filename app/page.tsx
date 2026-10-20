import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '@/lib/local-seo/constants';
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

/**
 * Written for the SERP, not for the page.
 *
 * 3-month Search Console data: 13.2k impressions, 1.9% CTR, average position
 * 9.9. At the bottom of page one the title has to earn the click against nine
 * results above it, so it leads with the phrase people actually search
 * ("event decorators in Bangalore") rather than the brand name — only ~11% of
 * impressions are brand queries.
 *
 * The description carries the proof and the offer: rating, price floor,
 * turnaround, free visit. The old one spent its characters on a phone number,
 * which nobody dials out of a search result.
 */
export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'Event Decorators in Bangalore — Free Site Visit',
  description: `Birthday, wedding, haldi & engagement décor across Bengaluru. ${GOOGLE_RATING}★ from ${GOOGLE_REVIEW_COUNT} Google reviews. Setups from ₹3,000, often same or next day. Free site visit.`,
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
