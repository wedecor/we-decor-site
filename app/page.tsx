import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'We Decor - Event Decoration Services in Bangalore',
  description:
    'Professional event decoration services in Bangalore. Birthday decor, wedding setup, haldi decoration, room decoration. Call +91 8880544452 for free quote!',
});

export default function HomePage() {
  return <HomePageClient />;
}
