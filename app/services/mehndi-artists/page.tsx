import type { Metadata } from 'next';
import SchemaScript from '@/components/seo/SchemaScript';
import PartnerServicePage from '@/components/services/PartnerServicePage';
import { pageMetadata } from '@/lib/metadata';
import { buildServiceDetailGraph } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/services/mehndi-artists',
  title: 'Mehndi Artists in Bangalore',
  description: 'Intricate mehndi designs for weddings, festivals, and celebrations in Bengaluru.',
  ogImage: '/services/haldi.webp',
});

export default function MehndiArtistsPage() {
  return (
    <PartnerServicePage
      path="/services/mehndi-artists"
      schema={
        <SchemaScript
          data={buildServiceDetailGraph({
            name: 'Mehndi Artists',
            description: 'Mehndi artistry for weddings and events in Bengaluru.',
            path: '/services/mehndi-artists',
            serviceType: 'Mehndi',
            serviceId: 'mehndi-artists',
          })}
        />
      }
      config={{
        title: 'Mehndi Artists',
        description: 'Intricate mehndi designs for weddings, festivals, and intimate celebrations.',
        listTitle: 'Our mehndi services',
        items: [
          'Wedding mehndi designs',
          'Festival mehndi art',
          'Party & event mehndi',
          'Bridal mehndi sessions',
          'Group mehndi services',
          'Custom design consultations',
        ],
        highlightTitle: 'Intricate mehndi art',
        highlightBody:
          'Traditional and contemporary patterns using quality henna for rich, long-lasting colour.',
        highlightNote:
          'Book your session and let our artists create designs worthy of your photographs.',
        ctaTitle: 'Ready for beautiful mehndi?',
        ctaBody:
          'Share your date and style references — we will match artists to your celebration.',
      }}
    />
  );
}
