import type { Metadata } from 'next';
import SchemaScript from '@/components/seo/SchemaScript';
import PartnerServicePage, { partnerServiceCrumbs } from '@/components/services/PartnerServicePage';
import { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';
import { pageMetadata } from '@/lib/metadata';
import { buildServiceDetailGraph, withBreadcrumb } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/services/decoration',
  title: 'Event Decoration Services in Bangalore',
  description:
    'Creative event and party decor for all occasions. Weddings, birthdays, haldi, and more. Professional decoration services in Bengaluru.',
  ogImage: '/services/engagement.webp',
});

export default function DecorationPage() {
  return (
    <PartnerServicePage
      path="/services/decoration"
      schema={
        <SchemaScript
          data={withBreadcrumb(
            buildServiceDetailGraph({
              name: 'Event Decoration Services',
              description:
                'Creative event and party decor for all occasions. Weddings, birthdays, haldi, and more. Professional decoration services in Bengaluru.',
              path: '/services/decoration',
              serviceType: 'Event decoration',
              // Umbrella service in its own right — `theme-decoration` stays the
              // homepage catalog entry, and the narrower services hang off this
              // node's OfferCatalog rather than sharing its identifier.
              serviceId: 'decoration',
              useSiteScopedId: true,
              includesCoreServices: true,
              image: '/services/engagement.webp',
            }),
            siteBreadcrumbsToSchemaItems(
              partnerServiceCrumbs('Event Decoration Services', '/services/decoration')
            )
          )}
        />
      }
      config={{
        title: 'Event Decoration Services',
        description:
          'Creative event and party decor for all occasions — weddings, birthdays, haldi, and corporate milestones across Bengaluru.',
        listTitle: 'Decoration services include',
        items: [
          'Wedding & engagement decor',
          'Birthday & theme parties',
          'Haldi & traditional ceremonies',
          'Corporate & venue styling',
        ],
        highlightTitle: 'Custom themes & backdrops',
        highlightBody:
          'From balloon arches to floral mandaps, we design setups that match your vision and venue — homes, apartments, clubhouses, and banquet halls.',
        highlightNote:
          'Contact us for a complimentary decoration consultation tailored to your celebration.',
        ctaTitle: 'Ready to decorate your event?',
        ctaBody:
          'Tell us your date and venue — we will compose atmosphere, florals, and styling with editorial restraint.',
      }}
    />
  );
}
