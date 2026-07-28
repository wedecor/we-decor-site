import type { Metadata } from 'next';
import SchemaScript from '@/components/seo/SchemaScript';
import PartnerServicePage from '@/components/services/PartnerServicePage';
import { pageMetadata } from '@/lib/metadata';
import { buildServiceDetailGraph } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/services/hair-stylists',
  title: 'Expert Hair Stylists in Bangalore',
  description: 'Expert hair styling for weddings, parties, and special events in Bengaluru.',
  ogImage: '/og-banner.webp',
});

export default function HairStylistsPage() {
  return (
    <PartnerServicePage
      path="/services/hair-stylists"
      schema={
        <SchemaScript
          data={buildServiceDetailGraph({
            name: 'Expert Hair Stylists',
            description: 'Wedding and event hair styling in Bengaluru.',
            path: '/services/hair-stylists',
            serviceType: 'Hair Styling',
            serviceId: 'hair-stylists',
          })}
        />
      }
      config={{
        title: 'Expert Hair Stylists',
        description:
          'Refined hair styling for your wedding day, reception, or milestone celebration.',
        listTitle: 'Our hair services',
        items: [
          'Wedding hair styling',
          'Party & event hairstyles',
          'Corporate event styling',
          'Special occasion styling',
          'Bridal hair trials',
          'Group hair services',
        ],
        highlightTitle: 'Professional hair styling',
        highlightBody:
          'Beautiful, long-lasting hairstyles for all hair types — composed to complement your look and attire.',
        highlightNote: 'Book your appointment and arrive with hair ready for every photograph.',
        ctaTitle: 'Ready for perfect hair?',
        ctaBody: 'Contact us to book stylists aligned with your celebration schedule.',
      }}
    />
  );
}
