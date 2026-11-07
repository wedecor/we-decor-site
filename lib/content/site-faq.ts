import {
  BALLOON_START_INR,
  FLORAL_START_INR,
  PRICING_SUMMARY,
  PRICING_CUSTOMIZED_LINE,
} from '@/lib/content/pricing-tiers';

/** Shared FAQ content — UI and FAQPage JSON-LD must import from here (no duplication). */
export const SITE_FAQS = [
  {
    question: 'How much does decoration cost?',
    answer: PRICING_SUMMARY,
  },
  {
    question: 'How long does setup and decoration take?',
    answer:
      'Home and birthday setups typically require 2–3 hours. Weddings and large venues may require 4–8 hours. We arrive with buffer time so your space is ready before guests.',
  },
  {
    question: 'Which areas in Bangalore do you serve?',
    answer:
      'We serve Bengaluru across Koramangala, Whitefield, Indiranagar, Jayanagar, Hebbal, Malleshwaram, and surrounding localities within approximately 50 km.',
  },
  {
    question: 'Can you customize decorations for specific themes?',
    answer:
      'Yes. Share references, palettes, or a mood — we translate it into florals, backdrops, and accents designed for your light and photography.',
  },
  {
    question: "What's the booking process?",
    answer:
      'Reach us on WhatsApp or through our enquiry form, receive a tailored proposal, and confirm with an advance to reserve your date.',
  },
  {
    question: 'Do you sell fixed decoration bundles?',
    answer: `No. ${PRICING_CUSTOMIZED_LINE}`,
  },
  // The questions below are the high-intent ones people actually type into
  // search. They used to be repeated, locality name swapped in, on all fifty
  // /locations pages — a doorway-page pattern. They belong here once; the
  // locality pages keep only questions specific to that area.
  {
    question: 'How much does haldi decoration cost in Bangalore?',
    answer: `Haldi setups are floral, so they start from ₹${FLORAL_START_INR.toLocaleString('en-IN')} for a compact marigold backdrop with urli and seating. Larger stages, fuller floral volume and lighting raise the price. We quote after a free site visit or a venue photo.`,
  },
  {
    question: 'How much does birthday decoration at home cost?',
    answer: `Balloon decoration starts from ₹${BALLOON_START_INR.toLocaleString('en-IN')} for a backdrop, garland and cake-table arrangement in a living room or clubhouse. Themes, neon signs and larger arches are quoted on top.`,
  },
  {
    question: 'Can you decorate a haldi ceremony at home or in an apartment?',
    answer:
      'Yes. Most of our haldi work is in homes and apartment clubhouses. We use freestanding frames rather than nails, put floor protection under the urli and seating because turmeric travels, and keep the ritual area compact so cleanup is quick. Tell us about lift access and society timing when you enquire.',
  },
  {
    question: 'How early should wedding or engagement decoration be booked?',
    answer:
      'Two to four weeks ahead is comfortable for home celebrations. Banquet-hall weddings, mandaps and peak wedding or festival weekends need more notice, because fresh flowers are ordered against the date.',
  },
  {
    question: 'Do you use fresh flowers?',
    answer:
      'Yes. Marigold, jasmine, rose and orchid are the usual stems, chosen for how long they need to hold on the day. Fabric and balloon designs are available where fresh flowers are not practical, for example at very short notice.',
  },
  {
    question: 'Can you do same-day or next-day decoration?',
    answer:
      'Often, for balloon and fabric setups, depending on crew availability that day. Fresh floral stages are limited by what the flower market has that morning, so we will say so rather than promise a design we cannot source.',
  },
  {
    question: 'What happens if an outdoor event is affected by rain?',
    answer:
      'For terraces and lawns we discuss shade, wind, rain cover and a covered fallback area during the site visit, and agree the plan before confirmation. Installations in open spaces are weighted and secured.',
  },
  {
    question: 'Is an advance payment required?',
    answer:
      'Yes. Your date is reserved once the advance stated on the written quote is paid. The quote sets out the scope, the amount and the balance due.',
  },
] as const;

/** The five questions rendered on the homepage FAQ section. */
export const HOME_PAGE_FAQS = SITE_FAQS.slice(0, 5);
