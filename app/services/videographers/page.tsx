import type { Metadata } from 'next';
import SchemaScript from '@/components/seo/SchemaScript';
import PartnerServicePage from '@/components/services/PartnerServicePage';
import { pageMetadata } from '@/lib/metadata';
import { buildServiceDetailGraph } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/services/videographers',
  title: 'Professional Videographers in Bangalore',
  description:
    'Cinematic event videography for weddings, parties, and corporate events in Bengaluru.',
  ogImage: '/services/corporate.webp',
});

export default function VideographersPage() {
  return (
    <PartnerServicePage
      path="/services/videographers"
      schema={
        <SchemaScript
          data={buildServiceDetailGraph({
            name: 'Professional Videographers',
            description: 'Wedding and event videography in Bengaluru.',
            path: '/services/videographers',
            serviceType: 'Videography',
            serviceId: 'videographers',
          })}
        />
      }
      config={{
        title: 'Professional Videographers',
        description:
          'Dynamic, cinematic event films for weddings, parties, and corporate milestones.',
        listTitle: 'Our videography services',
        items: [
          'Wedding videography',
          'Event video coverage',
          'Corporate videos',
          'Pre-wedding films',
          'Highlight reels',
          'Live event streaming',
        ],
        highlightTitle: 'Professional videography',
        highlightBody:
          'Cinematic storytelling with advanced equipment and refined editing — memories in motion.',
        highlightNote:
          'Book your session and receive films that match the tone of your celebration.',
        ctaTitle: 'Ready to create your film?',
        ctaBody:
          'Share your date and vision — we will coordinate videography with your event flow.',
      }}
    />
  );
}
