import Gallery from '@/components/Gallery';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/lux/PageHero';
import SiteBreadcrumbs, { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildGalleryPageGraph, withBreadcrumb } from '@/lib/schema';
import { GALLERY_COLLECTION_ORDER, getImagesByCategory } from '@/utils/gallery';
import Link from 'next/link';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import { CONTACT } from '@/lib/contact';

export const metadata: Metadata = pageMetadata({
  path: '/gallery',
  title: 'Event Decoration Gallery — Birthday, Wedding & More',
  description:
    'Explore our stunning event decoration gallery featuring birthday parties, weddings, haldi ceremonies, and corporate events across Bangalore. Professional decor services by We Decor.',
});

export const dynamic = 'force-static';

const CRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery' },
];

export default function GalleryPage() {
  const collectionImages = GALLERY_COLLECTION_ORDER.map((category) => {
    const first = getImagesByCategory(category)[0];
    return {
      url: first?.src ?? '',
      caption: `${category} event decoration by We Decor Events`,
      name: category,
    };
  }).filter((img) => img.url);

  return (
    <div className="lux-page">
      <SchemaScript
        data={withBreadcrumb(
          buildGalleryPageGraph({
            name: 'Event Decorations Gallery',
            description:
              'Explore our stunning event decoration gallery featuring birthday parties, weddings, haldi ceremonies, and corporate events across Bangalore. Professional decor services by We Decor.',
            images: collectionImages,
          }),
          siteBreadcrumbsToSchemaItems(CRUMBS)
        )}
      />
      <div className="lux-container pt-[calc(var(--nav-height)+1.5rem)] pb-2">
        <SiteBreadcrumbs items={CRUMBS} />
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

      {/* CTA section — Gallery has high engagement (41.7s avg) but needs a conversion path */}
      <section className="lux-section bg-lux-bg border-t border-white/[0.06]">
        <div className="lux-container max-w-3xl text-center">
          <p className="lux-eyebrow mb-3">Get started</p>
          <h2 className="lux-heading-sm mb-4">Love what you see?</h2>
          <p className="text-lux-muted leading-relaxed mb-10">
            Share your event date, venue, and the style that caught your eye — we&apos;ll put
            together a personalised quote within hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedWhatsAppLink
              href={CONTACT.waUrl(
                "Hi We Decor! I saw your gallery and I'm interested in a similar setup. Date: _____. Venue: _____."
              )}
              source="gallery_cta"
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn-primary"
            >
              WhatsApp for a quote
            </TrackedWhatsAppLink>
            <Link href="/contact" className="lux-btn-secondary">
              Enquire online
            </Link>
          </div>
        </div>
      </section>

      <CoreExploreLinks context="hub" showLocalities pageKey="gallery" />
    </div>
  );
}
