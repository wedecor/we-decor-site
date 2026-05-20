import Gallery from '@/components/Gallery';
import { BreadcrumbsJsonLd } from '@/components/seo/JsonLd';
import Image from 'next/image';
import type { Metadata } from 'next';
import { absoluteUrl, pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  path: '/gallery',
  title: 'Event Decoration Gallery | We Decor Bangalore - Birthday, Wedding & More',
  description:
    'Explore our stunning event decoration gallery featuring birthday parties, weddings, haldi ceremonies, and corporate events across Bangalore. Professional decor services by We Decor.',
});

export const dynamic = 'force-static';

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        crumbs={[
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Gallery', url: absoluteUrl('/gallery') },
        ]}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.webp"
            alt="We Decor logo"
            width={80}
            height={80}
            className="mb-4 rounded-full"
          />
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
            Gallery
          </h1>
        </div>
        <Gallery />
      </div>
    </>
  );
}
