import Gallery from '@/components/Gallery';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/lux/PageHero';
import SiteBreadcrumbs from '@/components/seo/SiteBreadcrumbs';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';

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
      <div className="lux-container pt-[calc(var(--nav-height)+1.5rem)] pb-2">
        <SiteBreadcrumbs
          withSchema
          items={[
            { name: 'Home', href: '/' },
            { name: 'Gallery', href: '/gallery' },
          ]}
        />
      </div>
      <PageHero
        eyebrow="Portfolio"
        title="Celebration gallery"
        description="Editorial glimpses of weddings, haldi, birthdays, and corporate atmospheres — composed across Bengaluru."
      />
      <section className="lux-section pt-0 pb-16 md:pb-20 lux-section-alt border-t border-white/[0.06]">
        <div className="lux-container">
          <Gallery />
        </div>
      </section>
      <CoreExploreLinks context="hub" showLocalities />
    </div>
  );
}
