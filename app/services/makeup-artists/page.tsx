import type { Metadata } from 'next';
import SchemaScript from '@/components/seo/SchemaScript';
import PartnerServicePage from '@/components/services/PartnerServicePage';
import { pageMetadata } from '@/lib/metadata';
import { buildServiceDetailGraph } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/services/makeup-artists',
  title: 'Professional Make-up Artists in Bangalore',
  description:
    'Professional make-up for weddings, parties, and corporate events. Expert beauty services in Bangalore.',
  ogImage: '/og-banner.webp',
});

export default function MakeupArtistsPage() {
  return (
    <PartnerServicePage
      path="/services/makeup-artists"
      schema={
        <SchemaScript
          data={buildServiceDetailGraph({
            name: 'Professional Make-up Artists',
            description: 'Wedding and event make-up services in Bengaluru.',
            path: '/services/makeup-artists',
            serviceType: 'Make-up',
            serviceId: 'makeup-artists',
          })}
        />
      }
      config={{
        title: 'Professional Make-up Artists',
        description:
          'Expert make-up for weddings, parties, and corporate events — looks composed for photography and long celebrations.',
        listTitle: 'Our make-up services',
        items: [
          'Wedding make-up',
          'Party & event make-up',
          'Corporate event styling',
          'Special occasion make-up',
          'Bridal trial sessions',
          'Group make-up services',
        ],
        highlightTitle: 'Expert beauty services',
        highlightBody:
          'Our artists work with premium products and current techniques to enhance natural beauty for every occasion.',
        highlightNote: 'Book your session and arrive camera-ready for your celebration.',
        ctaTitle: 'Ready to look your best?',
        ctaBody:
          'Contact us to book make-up artists coordinated with your event decor and timeline.',
      }}
    />
  );
}
