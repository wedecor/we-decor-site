import Gallery from '@/components/Gallery';
import { BreadcrumbsJsonLd } from '@/components/seo/JsonLd';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Decoration Gallery | We Decor Bangalore - Birthday, Wedding & More',
  description: 'Explore our stunning event decoration gallery featuring birthday parties, weddings, haldi ceremonies, and corporate events across Bangalore. Professional decor services by We Decor.',
  openGraph: {
    title: 'Event Decoration Gallery | We Decor Bangalore',
    description: 'Explore our stunning event decoration gallery featuring birthday parties, weddings, haldi ceremonies, and corporate events across Bangalore.',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Decoration Gallery | We Decor Bangalore',
    description: 'Explore our stunning event decoration gallery featuring birthday parties, weddings, haldi ceremonies, and corporate events across Bangalore.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: '/gallery',
  },
};

export const dynamic = 'force-static';

// GalleryPage renders the gallery grid with SEO meta
export default function GalleryPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        crumbs={[
          { name: 'Home', url: '/' },
          { name: 'Gallery', url: '/gallery' },
        ]}
      />
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt="We Decor Logo - Professional Event Decoration Services in Bangalore"
            width={48}
            height={48}
            className="mb-2 rounded-full shadow"
            priority
          />
          <h1 className="text-3xl font-bold text-green-900 dark:text-green-100">Gallery</h1>
        </div>
        {/* Gallery component renders image grid and lightbox */}
        <Gallery />
      </div>
    </>
  );
}