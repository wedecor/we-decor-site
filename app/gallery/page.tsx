import Gallery from '@/components/Gallery';
import { BreadcrumbsJsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';
import { absoluteUrl, pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/lux/PageHero';

export const metadata: Metadata = pageMetadata({
  path: '/gallery',
  title: 'Event Decoration Gallery — Birthday, Wedding & More',
  description:
    'Explore our stunning event decoration gallery featuring birthday parties, weddings, haldi ceremonies, and corporate events across Bangalore. Professional decor services by We Decor.',
});

export const dynamic = 'force-static';

export default function GalleryPage() {
  return (
    <div className="lux-page">
      <BreadcrumbsJsonLd
        crumbs={[
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Gallery', url: absoluteUrl('/gallery') },
        ]}
      />
      <PageHero
        eyebrow="Portfolio"
        title="Celebration gallery"
        description="Editorial glimpses of weddings, haldi, birthdays, and corporate atmospheres — composed across Bengaluru."
      />
      <section className="lux-section pt-0 pb-24 md:pb-32 lux-section-alt border-t border-white/[0.06]">
        <div className="lux-container">
          <Gallery />
        </div>
      </section>
    </div>
  );
}
