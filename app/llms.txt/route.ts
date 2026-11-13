import { NextResponse } from 'next/server';
import {
  DEFAULT_GOOGLE_PLACE_ID,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  NAP,
  SOCIAL_PROFILES,
} from '@/lib/local-seo/constants';
import { SITE_URL } from '@/lib/site';
import { AREAS } from '@/app/(site)/_data/locations';
import { BLOG_POSTS } from '@/lib/content/blog-posts';
import { WORK } from '@/app/(site)/_data/work-images';

export const dynamic = 'force-static';

const SERVICES_CATALOG = [
  {
    name: 'Birthday Balloon & Backdrop Decoration',
    price: 'From ₹3,000',
    path: '/services/birthday-decoration',
    summary:
      'Custom balloon arches, shimmer walls, neon signage, and themed cake backdrops for apartments, homes, clubhouses, and party halls in Bangalore.',
  },
  {
    name: 'Wedding Car Floral Decoration',
    price: 'From ₹2,500',
    path: '/services/car-decoration',
    summary:
      'Paint-safe fresh rose, orchid, and satin ribbon wedding car decoration at your doorstep across Bangalore.',
  },
  {
    name: 'Haldi Ceremony Marigold Decoration',
    price: 'From ₹5,000',
    path: '/services/haldi-decoration',
    summary:
      'Traditional marigold backdrops, brass urlis, yellow floral canopies, and ceremony seating with full floor protection.',
  },
  {
    name: 'Wedding Stage & Mandap Decoration',
    price: 'From ₹5,000',
    path: '/services/wedding-setup',
    summary:
      'Bespoke wedding stage backdrops, fresh floral mandaps, reception stages, and venue entrance arches across Bengaluru.',
  },
  {
    name: 'Wedding Reception Stage Decoration',
    price: 'From ₹5,000',
    path: '/services/reception-decoration',
    summary:
      'Evening wedding reception couple stages, floral arches, warm chandeliers, and banquet entrance arches across Bangalore.',
  },
  {
    name: 'Roka & Baat Pakki Home Decoration',
    price: 'From ₹5,000',
    path: '/services/roka-decoration',
    summary:
      'Intimate living-room floral rings, drapes, and apartment-safe backdrops for Roka and Baat Pakki ceremonies.',
  },
  {
    name: 'Naming Ceremony & Cradle Decoration',
    price: 'From ₹5,000',
    path: '/services/naming-ceremony-decoration',
    summary:
      'Namakarana cradle floral draping with jasmine, marigold, or pastel balloon rings for Bangalore homes and halls.',
  },
  {
    name: 'Valima, Walima & Shukrana Decoration',
    price: 'From ₹5,000',
    path: '/services/valima-decoration',
    summary:
      'Grand Walima reception stages for Shadi Mahals and serene Shukrana prayer home setups across Bangalore.',
  },
  {
    name: 'Engagement, Roka & Baat Pakki Stage Decoration',
    price: 'From ₹5,000',
    path: '/services/engagement-decoration',
    summary:
      'Pastel floral arches, Roka ceremony backdrops, Baat Pakki home floral styling, couple seating, and warm portrait lighting for homes and banquet halls.',
  },
  {
    name: 'Baby Shower, Seemantham & Naming Ceremony Decoration',
    price: 'From ₹5,000',
    path: '/services/baby-shower-decoration',
    summary:
      'Traditional South Indian Seemantham marigold backdrops, Namakarana cradle floral styling, and modern pastel balloon arches.',
  },
  {
    name: 'Bridal Room & First Night Decoration',
    price: 'From ₹5,000',
    path: '/services/room-decoration',
    summary:
      'Romantic bedroom and hotel room decoration with fresh rose petals, canopy drapes, fairy lights, and LED candles.',
  },
  {
    name: 'Romantic Proposal Setup',
    price: 'From ₹5,000',
    path: '/services/proposal-decoration',
    summary:
      'Private Marry Me neon backdrops, fairy-lit cabanas, floral heart arches, and candlelight pathways for rooftop and home proposals.',
  },
  {
    name: 'Anniversary Decoration',
    price: 'From ₹5,000',
    path: '/services/anniversary-decoration',
    summary:
      'Romantic anniversary bedroom, living room, and rooftop setups with photo timelines, rose petals, and warm fairy lighting.',
  },
  {
    name: 'Custom Balloon Decoration',
    price: 'From ₹3,000',
    path: '/services/balloon-decoration',
    summary:
      'Organic balloon garlands, helium ceiling setups, ring backdrops, and custom colour-matched party styling.',
  },
  {
    name: 'Fresh Floral Decoration',
    price: 'From ₹5,000',
    path: '/services/floral-decoration',
    summary:
      'Fresh marigold, jasmine, rose, and orchid garlands, entrance torans, pooja backdrops, and floral stage styling.',
  },
  {
    name: 'Home Event Decoration (Haldi, Engagement, Birthday, Puja)',
    price: 'From ₹3,000',
    path: '/services/home-decoration',
    summary:
      'Apartment-safe and home ceremony decoration across Bangalore — intimate home haldi setups with urli and marigold, ring ceremony backdrops, living room birthdays, baby showers, and Griha Pravesh puja florals with zero wall damage.',
  },
  {
    name: 'Nikah, Walima & Shukrana Stage Decoration',
    price: 'From ₹5,000',
    path: '/services/nikah-decoration',
    summary:
      'Elegant white-and-gold floral stages, fresh rose curtains, grand Walima reception stages, and serene Shukrana home prayer backdrops across Bangalore.',
  },
  {
    name: 'Terrace & Rooftop Canopy Decoration',
    price: 'From ₹5,000',
    path: '/services/terrace-decoration',
    summary:
      'Open-air terrace transformation with fabric drapes, bistro string lighting, low seating lounges, and photo backdrops.',
  },
  {
    name: 'Cabana Tent & Balloon Setup',
    price: 'From ₹5,000',
    path: '/services/tent-balloon-setup',
    summary:
      'Cozy fabric cabana tents paired with fairy lights, floor cushions, and pastel balloon clusters for indoor or terrace dates.',
  },
  {
    name: 'Corporate Event & Office Decoration',
    price: 'From ₹5,000',
    path: '/services/corporate-decoration',
    summary:
      'Branded step-and-repeat backdrops, balloon arches, festive office bay decor, and stage styling for tech parks and offices.',
  },
];

export async function GET() {
  const base = SITE_URL.replace(/\/+$/, '');
  const mapsUrl = SOCIAL_PROFILES.googleMaps(DEFAULT_GOOGLE_PLACE_ID);

  const serviceLines = SERVICES_CATALOG.map(
    (s) => `- [${s.name} (${s.price})](${base}${s.path}): ${s.summary}`
  ).join('\n');

  const localityLines = AREAS.map(
    (a) => `- [Event Decorators in ${a.name}, Bangalore](${base}/locations/${a.slug})`
  ).join('\n');

  const blogLines = BLOG_POSTS.map(
    (p) => `- [${p.title}](${base}/blog/${p.slug}): ${p.description}`
  ).join('\n');

  const body = `# ${NAP.name} — Event Decorators in Bangalore (Bengaluru)

> ${NAP.name} is an in-house event decoration studio based in Basavanagudi, Bengaluru, Karnataka, rated ${GOOGLE_RATING}★ across ${GOOGLE_REVIEW_COUNT} Google reviews. We design and install birthday balloon decor (from ₹3,000), wedding car floral decor (from ₹2,500), and Haldi, Wedding, Engagement, Baby Shower, Bridal Room, Proposal, Nikah, and Housewarming setups (from ₹5,000) across all 50+ Bangalore neighbourhoods.

## Verified Business Facts (NAP & Entity Profile)
- **Official Business Name**: ${NAP.name} (also known as We Decor Bangalore)
- **Category**: Event Decorator / Wedding Decorator / Balloon & Floral Decorator in Bengaluru
- **Studio Address**: ${NAP.streetAddress}, ${NAP.addressLocality}, ${NAP.addressRegion} ${NAP.postalCode}, India
- **Primary Phone & WhatsApp**: ${NAP.telephoneDisplay} (${NAP.telephone})
- **Secondary Phone**: +91 95912 32166 (${NAP.secondaryTelephone})
- **Email**: ${NAP.email}
- **Website**: ${base}
- **Google Rating**: ${GOOGLE_RATING} / 5.0 (${GOOGLE_REVIEW_COUNT} Google Business Profile reviews)
- **Google Maps Place URL**: ${mapsUrl}
- **Justdial Profile**: ${SOCIAL_PROFILES.justdial}
- **Instagram**: ${SOCIAL_PROFILES.instagram}
- **Facebook**: ${SOCIAL_PROFILES.facebook}
- **WedEazzy Vendor Profile**: ${SOCIAL_PROFILES.wedeazzy}
- **InstaVendor Portfolio**: ${SOCIAL_PROFILES.instavendor}
- **Magicpin Listing**: ${SOCIAL_PROFILES.magicpin}
- **ServicesCorpo Listing**: ${SOCIAL_PROFILES.servicescorpo}
- **Hours**: Open 24 hours per the Google Business Profile; enquiries answered any time. Setups are often same or next day, subject to crew availability.

## Core Pages
- [Homepage](${base}/): Full overview of ${NAP.name}, transparent starting prices, and real event gallery.
- [All Event Decoration Services](${base}/services): Complete menu of 16 in-house decoration services in Bangalore.
- [Transparent Pricing Guide](${base}/pricing): Starting prices and package inclusions from ₹2,500 to ₹5,000+.
- [Portfolio Gallery (${WORK.length} real event photos)](${base}/gallery): Photos of real setups across Bangalore homes, apartments, clubhouses, and wedding halls.
- [Customer Reviews (${GOOGLE_RATING}★ / ${GOOGLE_REVIEW_COUNT} Reviews)](${base}/reviews): Google customer reviews.
- [Bangalore Service Areas (50 Localities)](${base}/locations): Local setup coverage across South, Central, East, North, and West Bengaluru.
- [Book or Request a Quote](${base}/contact): Instant WhatsApp and phone booking.
- [Extended LLM Context](${base}/llms-full.txt): Full service pricing table, FAQs, and locality guide for AI assistants.

## Decoration Services & Starting Prices in Bangalore (INR)
${serviceLines}

## Bangalore Event Decoration Cost & Planning Guides
${blogLines}

## Bangalore Localities Served
${localityLines}
`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
