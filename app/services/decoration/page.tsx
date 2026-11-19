import type { Metadata } from 'next';
import SchemaScript from '@/components/seo/SchemaScript';
import PartnerServicePage, { partnerServiceCrumbs } from '@/components/services/PartnerServicePage';
import { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';
import { pageMetadata } from '@/lib/metadata';
import { buildServiceDetailGraph, withBreadcrumb } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/services/decoration',
  title: 'Stage, Backdrop & Party Decoration in Bangalore — From ₹3,000',
  description:
    'Custom stage decoration, floral & balloon backdrops in Bangalore — birthday setups from ₹3,000, haldi & wedding stages from ₹5,000. 4.9★ rated. Free quote.',
  ogImage: '/services/engagement.webp',
});

const DECORATION_FAQS = [
  {
    question: 'What is the starting cost of stage and backdrop decoration in Bangalore?',
    answer:
      'Custom home and clubhouse balloon backdrops start from ₹3,000, wedding car decoration starts from ₹2,500, and fresh floral or draped ceremony backdrops for Haldi, Engagement, Roka, Baby Shower, Nikah, and Wedding receptions start from ₹5,000 across Bengaluru.',
  },
  {
    question: 'Do you build freestanding backdrops without drilling into apartment walls?',
    answer:
      'Yes. Every home and apartment backdrop uses weighted, freestanding metal or wooden frames with floor-protection pads—requiring zero nails, screws, or paint-damaging tape.',
  },
  {
    question: 'Can you style both traditional Chappara entrances and modern banquet stages?',
    answer:
      'Yes. Our in-house florists and fabrication crew construct traditional coconut-leaf Chappara canopies, banana-stem mandaps, and mango-leaf torans as well as contemporary 16ft–24ft banquet reception stages with crystal chandeliers and 3200K warm lighting.',
  },
  {
    question: 'How early should we book stage and backdrop decoration in Bangalore?',
    answer:
      'For home and clubhouse setups, booking 7–14 days in advance is ideal (with same-day or next-day slots often available for balloon and fabric setups). For peak muhurtham wedding stages, we recommend booking 3–6 weeks ahead.',
  },
  {
    question: 'Is a free site visit included before finalizing our stage quote?',
    answer:
      'Yes. We offer complimentary venue inspections across Bangalore banquet halls, choultries, lawns, and apartments, or can provide an instant itemized quote from 2–3 room photos shared on WhatsApp.',
  },
] as const;

export default function DecorationPage() {
  return (
    <PartnerServicePage
      path="/services/decoration"
      eyebrow="Stage · Backdrop · Venue Styling · Bengaluru"
      schema={
        <SchemaScript
          data={withBreadcrumb(
            buildServiceDetailGraph({
              name: 'Event Decoration Services',
              description:
                'Custom stage decoration, floral & balloon backdrops, Chappara entrances, and venue styling in Bengaluru — birthday setups from ₹3,000, haldi & wedding stages from ₹5,000.',
              path: '/services/decoration',
              serviceType: 'Event decoration',
              // Umbrella service in its own right — `theme-decoration` stays the
              // homepage catalog entry, and the narrower services hang off this
              // node's OfferCatalog rather than sharing its identifier.
              serviceId: 'decoration',
              useSiteScopedId: true,
              includesCoreServices: true,
              image: '/services/engagement.webp',
              faqs: DECORATION_FAQS,
            }),
            siteBreadcrumbsToSchemaItems(
              partnerServiceCrumbs('Stage & Backdrop Decoration', '/services/decoration')
            )
          )}
        />
      }
      config={{
        title: 'Stage, Backdrop & Event Decoration in Bangalore',
        description:
          'Bespoke floral stages, freestanding apartment backdrops, traditional Chappara entrances, and organic balloon arches engineered for homes, clubhouses, choultries, and banquet halls across Bengaluru.',
        listTitle: 'Stage & backdrop capabilities',
        items: [
          'Wedding mandaps & 12ft–24ft+ reception couple stages (from ₹5,000)',
          'Home Haldi marigold backdrops, brass urlis & Chappara canopies (from ₹5,000)',
          'Engagement, Roka, Baat Pakki & Ring Ceremony focal frames (from ₹5,000)',
          'Nikah Aqd signing setups, parda partitions & Walima stages (from ₹5,000)',
          'Baby Shower (Seemantham / Godh Bharai) & Namakarana cradle decor (from ₹5,000)',
          'Birthday & organic pastel/chrome balloon garlands at home (from ₹3,000)',
          'Romantic room reveals, candlelight dinners & Marry Me proposals (from ₹5,000)',
          'Paint-safe doorstep wedding car floral & ribbon styling (from ₹2,500)',
        ],
        highlightTitle: 'Engineered for photography & venue rules',
        highlightBody:
          'Every backdrop is proportioned around your ceiling height, sofa or stage width, and ambient light. We pair matte fabrics and fresh KR Market blooms with warm 3200K portrait lighting so photographs never wash out under camera flash.',
        highlightNote:
          'Rated 4.9★ across 82 Google reviews · Free site visit across all 50+ Bangalore localities · Zero-drill apartment guarantee.',
        sections: [
          {
            heading: 'Mandap, Choultry & Banquet Stage Architecture',
            body: 'From classic ivory-and-gold reception facades to traditional South Indian banana-stem and marigold mandaps, we coordinate directly with Bangalore convention halls, hotels, and Shadi Mahals to complete load-in 2–3 hours ahead of guest entry.',
          },
          {
            heading: 'Zero-Damage Apartment & Living-Room Backdrops',
            body: 'Most Bangalore pre-wedding and family milestones happen inside 2BHK/3BHK flats or society clubhouses. Our slim weighted stands sit flush behind 3-seater sofas without blocking walkways, and our waterproof floor drop-cloths protect tiles during Haldi rituals.',
          },
          {
            heading: 'Fresh Floral Walls, Chappara & Botanical Arches',
            body: 'We source fresh roses, hydrangeas, orchids, jasmine (mogra), lotus, marigolds, and tender coconut leaves on the morning of your event—combining dense focal floral pockets with clean drapery so you get maximum visual impact for your budget.',
          },
          {
            heading: '3200K Portrait Lighting & Same-Night Teardown',
            body: 'Harsh white hall tubes flatten floral depth. We position warm 3200K LED par lights, fairy curtains, and chandelier drops around the couple seating area, and return for punctual teardown as soon as your celebration concludes.',
          },
        ],
        faqs: DECORATION_FAQS,
        ctaTitle: 'Ready to plan your stage or home backdrop?',
        ctaBody:
          'Share your event date, Bangalore locality, and a quick photo of your room or hall for an itemized quote and complimentary consultation.',
      }}
    />
  );
}
