import type { Metadata } from 'next';
import SchemaScript from '@/components/seo/SchemaScript';
import PartnerServicePage from '@/components/services/PartnerServicePage';
import { pageMetadata } from '@/lib/metadata';
import { buildServicePageSchema } from '@/lib/local-seo';

export const metadata: Metadata = pageMetadata({
  path: '/services/photographers',
  title: 'Professional Photographers in Bangalore',
  description:
    'Professional photography for weddings, events, and corporate celebrations in Bengaluru.',
  ogImage: '/services/engagement.webp',
});

const structuredData = buildServicePageSchema({
  name: 'Professional Photographers',
  serviceType: 'Photography',
  description: 'Event and wedding photography in Bengaluru.',
  path: '/services/photographers',
});

export default function PhotographersPage() {
  return (
    <PartnerServicePage
      path="/services/photographers"
      schema={<SchemaScript data={structuredData} />}
      config={{
        title: 'Professional Photographers',
        description:
          'Capture your most important moments with photographers who understand celebration light and emotion.',
        listTitle: 'Our photography services',
        items: [
          'Wedding photography',
          'Event photography',
          'Portrait sessions',
          'Corporate events',
          'Pre-wedding shoots',
          'Family & group photos',
        ],
        highlightTitle: 'Professional photography',
        highlightBody:
          'State-of-the-art equipment and editorial sensibility — images you will treasure for years.',
        highlightNote: 'Book your session and align photography with your decor timeline.',
        ctaTitle: 'Ready to capture memories?',
        ctaBody: 'Contact us to coordinate photographers for your Bengaluru celebration.',
      }}
    />
  );
}
