import type { Metadata } from 'next';
import SchemaScript from '@/components/seo/SchemaScript';
import PartnerServicePage from '@/components/services/PartnerServicePage';
import { pageMetadata } from '@/lib/metadata';
import { buildServicePageSchema } from '@/lib/local-seo';

export const metadata: Metadata = pageMetadata({
  path: '/services/catering',
  title: 'Catering Services in Bangalore',
  description:
    'We Decor Events provides catering coordination for celebrations in Bengaluru. Delicious menus and seamless service for your event.',
  ogImage: '/services/catering.jpg',
});

const structuredData = buildServicePageSchema({
  name: 'Catering Services',
  serviceType: 'Catering',
  description: 'Catering services for weddings, birthdays, and corporate events in Bengaluru.',
  path: '/services/catering',
});

export default function CateringPage() {
  return (
    <PartnerServicePage
      path="/services/catering"
      schema={<SchemaScript data={structuredData} />}
      config={{
        title: 'Catering Services',
        description:
          'A full spectrum of catering for weddings, birthdays, and corporate events — delicious menus and seamless service so you can focus on your celebration.',
        listTitle: 'Our catering options',
        items: [
          'Vegetarian catering',
          'Non-vegetarian catering',
          'Sweets & desserts',
          'Regional and custom menus',
        ],
        highlightTitle: 'Customized dining experience',
        highlightBody:
          'From traditional Indian feasts to contemporary world cuisines, we tailor menus to your preferences and dietary needs.',
        highlightNote:
          'Contact us for a personalized catering quote composed around your guest count and event style.',
        ctaTitle: 'Ready to plan your menu?',
        ctaBody:
          'Share your date and venue — we will coordinate catering that matches the atmosphere of your celebration.',
      }}
    />
  );
}
