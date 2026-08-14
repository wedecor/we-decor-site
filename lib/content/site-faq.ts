import { PRICING_SUMMARY, PRICING_CUSTOMIZED_LINE } from '@/lib/content/pricing-tiers';

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
] as const;

/** The five questions rendered on the homepage FAQ section. */
export const HOME_PAGE_FAQS = SITE_FAQS.slice(0, 5);
