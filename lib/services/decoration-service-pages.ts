import { SERVICE_IMAGES } from '@/lib/images';
import { HIGH_INTENT_SERVICE_PAGES } from '@/lib/services/high-intent-service-pages';
import { getRelatedServiceHrefsFor } from '@/lib/seo/internal-links';
import { getImagesByCategory } from '@/utils/gallery';

const WEDDING_PLACEHOLDER =
  'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045457/we-decor/engagement/IMG_20220804_111702.jpg';

const BIRTHDAY_HERO_IMAGE =
  'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045447/we-decor/birthday/IMG_20230130_175936.jpg';

function collectionSrc(key: string, index = 0): string {
  return getImagesByCategory(key)[index]?.src ?? '';
}

const GALLERY = {
  wedding: {
    src: collectionSrc('wedding') || WEDDING_PLACEHOLDER,
    caption: 'Reception styling, Bengaluru',
  },
  haldi: { src: collectionSrc('haldi'), caption: 'Haldi ceremony, marigold & gold' },
  birthday: { src: collectionSrc('birthday'), caption: 'Birthday at home, Koramangala' },
  tent: { src: collectionSrc('birthday', 1), caption: 'Outdoor tent & balloon arch' },
} as const;

export type LegacyDecorationServiceSlug =
  | 'haldi-decoration'
  | 'engagement-decoration'
  | 'corporate-decoration'
  | 'tent-balloon-setup'
  | 'room-decoration'
  | 'wedding-setup'
  | 'birthday-home-decoration'
  | 'birthday-decoration'
  | 'haldi-backdrop-decor'
  | 'wedding-stage-decor';

export type HighIntentServiceSlug =
  | 'nikah-decoration'
  | 'balloon-decoration'
  | 'baby-shower-decoration'
  | 'anniversary-decoration'
  | 'proposal-decoration'
  | 'home-decoration'
  | 'floral-decoration'
  | 'terrace-decoration'
  | 'car-decoration';

export type DecorationServiceSlug = LegacyDecorationServiceSlug | HighIntentServiceSlug;

export type ServiceHighlight = {
  title: string;
  description: string;
};

export type GalleryImage = {
  src: string;
  caption: string;
};

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type PricingTierExample = {
  name: string;
  priceLabel: string;
  note: string;
};

export type ThemeItem = {
  name: string;
  description: string;
};

export type StyleItem = {
  title: string;
  description: string;
};

export type WhyChooseItem = {
  title: string;
  text: string;
};

/** Named content block used for bespoke service guidance (not product scopes). */
export type ServiceGuidanceItem = {
  title: string;
  description: string;
};

export type ServiceProcessStep = {
  step: string;
  detail: string;
};

export type DecorationServicePageConfig = {
  slug: DecorationServiceSlug;
  /** SEO title segment (metadata unchanged in structure) */
  title: string;
  /** SEO meta description */
  description: string;
  serviceType: string;
  ogImage: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  storyTitle: string;
  storyParagraphs: string[];
  highlights: ServiceHighlight[];
  gallery: GalleryImage[];
  testimonial: { quote: string; attribution: string };
  trustSignals: string[];
  waPrefill: string;
  coreServiceId?: string;
  /** Optional override for the "Why ___ choose us" eyebrow above the trust section */
  whyChooseUsEyebrow?: string;
  /** Phase 3+ long-form fields (unique per page when set). */
  whyChoose?: WhyChooseItem[];
  styles?: StyleItem[];
  idealOccasions?: string[];
  included?: string[];
  /**
   * @deprecated Prefer `budgetConsiderations`. Kept for older content; UI labels it as budget guidance, not scopes.
   */
  pricingOverview?: { intro: string; tiers: PricingTierExample[] };
  themes?: ThemeItem[];
  areasIntro?: string;
  faqs?: ServiceFaqItem[];
  /** Override related-service paths (e.g. `/services/haldi-decoration`). */
  relatedHrefs?: string[];
  ctaBody?: string;
  /** Bespoke service guidance — customised per event, not one-size-fits-all bundles. */
  howWeCustomize?: ServiceGuidanceItem[];
  popularDecorationOptions?: ServiceGuidanceItem[];
  suitableVenues?: string[];
  optionalAddOns?: string[];
  budgetConsiderations?: { intro: string; points: ServiceGuidanceItem[] };
  bookingProcess?: ServiceProcessStep[];
  setupTimeline?: ServiceProcessStep[];
};

const LEGACY_DECORATION_SERVICE_PAGES: Record<
  LegacyDecorationServiceSlug,
  DecorationServicePageConfig
> = {
  'haldi-decoration': {
    slug: 'haldi-decoration',
    title: 'Haldi Ceremony Decoration Services in Bangalore',
    description:
      'Haldi ceremony decoration in Bangalore from ₹3,000 — marigold backdrops, photo zones, morning setup, and post-ceremony removal.',
    serviceType: 'Haldi decoration',
    ogImage: SERVICE_IMAGES.haldi,
    coreServiceId: 'haldi-decoration',
    relatedHrefs: [
      '/services/floral-decoration',
      '/services/wedding-setup',
      '/services/engagement-decoration',
    ],
    eyebrow: 'Haldi planning · Bangalore',
    headline: 'Set up for the haldi, not the mess after it',
    subheadline:
      'Marigold and yellow décor planned around turmeric, early rituals, outdoor conditions, and a clear cleanup plan.',
    storyTitle: 'A practical haldi checklist',
    storyParagraphs: [
      'Share a venue photo, ceremony time, guest count, and the areas likely to get turmeric on them. We can then suggest a backdrop, seating, floor coverage, and a layout that keeps the ritual zone separate from the photo area.',
      'For a simple home haldi, the focus can stay on a compact marigold frame and floor seating. Larger lawns and banquet spaces can accommodate an entry, ritual seating, and a separate portrait corner. Both budget-conscious and more detailed floral options are quoted after the brief is clear.',
      'Morning events need a confirmed access time. For terraces and lawns, we also discuss shade, wind, rain cover, and where décor can be removed after the ceremony.',
    ],
    highlights: [
      {
        title: 'Turmeric-aware layout',
        description: 'Separate ritual seating and photo areas where the venue allows.',
      },
      {
        title: 'Early access planning',
        description: 'Setup timing is agreed around morning rituals and venue access.',
      },
      {
        title: 'Outdoor considerations',
        description: 'Wind, sun, rain cover, and weighted décor are reviewed for open spaces.',
      },
      {
        title: 'Removal after rituals',
        description: 'Teardown requirements are confirmed in the event scope.',
      },
    ],
    gallery: [GALLERY.haldi, GALLERY.wedding, GALLERY.birthday],
    testimonial: {
      quote:
        'The marigold backdrop looked stunning in every photo. Setup was calm and finished before our families arrived.',
      attribution: 'Haldi ceremony · South Bangalore',
    },
    trustSignals: [
      'Quotes with itemized scope',
      'Venue photos reviewed before quoting',
      'Setup and removal timing confirmed',
    ],
    howWeCustomize: [
      {
        title: 'Ritual requirements',
        description:
          'We plan the haldi seating, splash zone, and photo area around your family’s ceremony flow.',
      },
      {
        title: 'Venue conditions',
        description:
          'Home, lawn, terrace, and hall layouts are reviewed for access, shade, and practical support points.',
      },
      {
        title: 'Colour and material direction',
        description:
          'Marigolds, drapes, rugs, and accents can follow a traditional, minimal, or floral-led look.',
      },
      {
        title: 'Guest scale and budget',
        description:
          'The décor density and number of areas are shaped around the guest count and your priorities.',
      },
    ],
    popularDecorationOptions: [
      {
        title: 'Marigold courtyard',
        description: 'Warm yellow and orange florals with low seating for an intimate ceremony.',
      },
      {
        title: 'Pastel haldi corner',
        description: 'A softer floral-and-fabric direction for portraits and family photographs.',
      },
      {
        title: 'Outdoor ritual setting',
        description:
          'Weather-aware seating, shade, and a separate photo zone for lawns or terraces.',
      },
    ],
    suitableVenues: [
      'Apartments and villas',
      'Banquet halls',
      'Lawns and gardens',
      'Rooftop terraces',
    ],
    optionalAddOns: [
      'Floor protection for the ritual area',
      'Family portrait seating',
      'Welcome signage',
      'Post-ceremony removal',
    ],
    budgetConsiderations: {
      intro:
        'We do not use one-size-fits-all bundles; your quote follows the ceremony brief and site review.',
      points: [
        {
          title: 'Floral density',
          description:
            'Fresh-flower quantity, colour mix, and coverage affect the materials required.',
        },
        {
          title: 'Site conditions',
          description:
            'Outdoor anchoring, shade, weather backup, and early access can change the installation needs.',
        },
        {
          title: 'Event zones',
          description:
            'A ritual area, seating, entry, and portrait backdrop each add separate work and materials.',
        },
      ],
    },
    bookingProcess: [
      {
        step: 'Share the brief',
        detail: 'Send the date, venue photos, ceremony time, guest count, and preferred style.',
      },
      {
        step: 'Review the layout',
        detail: 'We discuss ritual placement, photo space, access, and outdoor conditions.',
      },
      {
        step: 'Confirm the scope',
        detail: 'You receive a custom quote with the agreed décor areas and removal needs.',
      },
      {
        step: 'Coordinate setup',
        detail: 'We confirm venue entry and installation timing before the ceremony day.',
      },
    ],
    setupTimeline: [
      {
        step: 'Before arrival',
        detail: 'Venue access, ritual timing, and weather backup are reconfirmed.',
      },
      {
        step: 'Installation',
        detail: 'The team prepares the backdrop, seating, and floor coverage in the agreed window.',
      },
      {
        step: 'After rituals',
        detail: 'Removal is completed when included in the confirmed scope.',
      },
    ],
    themes: [
      {
        name: 'Traditional marigold',
        description:
          'Classic yellow and orange marigold garlands with brass accents for a ritual-first home or lawn ceremony.',
      },
      {
        name: 'Bohemian',
        description:
          'Layered florals, macramé, and soft drapes for a relaxed outdoor or terrace haldi.',
      },
      {
        name: 'Minimalist white & yellow',
        description:
          'Clean white florals with restrained yellow accents for intimate apartment setups.',
      },
      {
        name: 'Rustic outdoor',
        description:
          'Wooden crates, marigold pots, and fairy lights suited to farmhouses and open lawns.',
      },
      {
        name: 'Pastel fusion',
        description:
          'Soft peach, ivory, and pale yellow tones for a contemporary family photo zone.',
      },
      {
        name: 'Temple-inspired',
        description:
          'Structured floral frames and traditional motifs that photograph well for morning rituals.',
      },
    ],
    waPrefill:
      "Hi We Decor! I'd like haldi decoration in Bangalore. Date: _____. Venue: _____. Ceremony time: _____.",
    faqs: [
      {
        question: 'Can you protect the area from turmeric stains?',
        answer:
          'We discuss the ritual area and available floor protection with you before quoting. Please share venue photos and any venue restrictions.',
      },
      {
        question: 'Do you decorate outdoor haldi venues?',
        answer:
          'Yes, subject to the venue conditions. We review shade, wind, rain backup, access, and where installations can be safely secured.',
      },
      {
        question: 'What time do you set up for a morning haldi?',
        answer:
          'Setup depends on venue access and the ceremony start time. Confirm both early so the team can plan the installation window.',
      },
      {
        question: 'Can the backdrop be separate from the haldi ritual area?',
        answer:
          'Yes. A separate portrait backdrop helps keep photos and seating usable while the ritual is underway, where space permits.',
      },
      {
        question: 'Do you remove the décor after the event?',
        answer:
          'Removal can be included in the agreed scope. Let us know the venue checkout time when you enquire.',
      },
      {
        question: 'Can I choose a simple haldi setup on a budget?',
        answer:
          'Yes. We can suggest a focused backdrop and seating arrangement after reviewing your space and priorities.',
      },
      {
        question: 'What if the weather turns during an outdoor morning ceremony?',
        answer:
          'We discuss covered backup areas and which décor items can move indoors. Final decisions depend on the venue layout and access on the day.',
      },
      {
        question: 'Can seating be placed away from the turmeric application area?',
        answer:
          'Where space allows, guest seating and portrait areas can be separated from the ritual zone so guests and cameras stay clearer of splash.',
      },
    ],
  },
  'engagement-decoration': {
    slug: 'engagement-decoration',
    title: 'Engagement and Ring Ceremony Decoration Bangalore',
    description:
      'Engagement decoration in Bangalore from ₹3,000 — ring-ceremony stages, floral backdrops, and venue styling quoted after a photo review.',
    serviceType: 'Engagement decoration',
    ogImage: SERVICE_IMAGES.engagement,
    eyebrow: 'Ring ceremony décor',
    headline: 'Start with the moment guests will gather around',
    subheadline:
      'Choose a focused ring-exchange backdrop, then add entry, family seating, and portrait details only where they serve the event.',
    storyTitle: 'Plan the ceremony area first',
    storyParagraphs: [
      'An engagement setup works best when the ring exchange, family seating, and photographer positions are considered together. Send the venue dimensions or photos and we will suggest a backdrop scale that does not crowd the room.',
      'For a home event, a compact floral or fabric frame may be enough. For a banquet or rooftop, you may want a stage, entry treatment, and a defined photo area. Colour choices can follow outfits, invitations, or a simple neutral palette.',
      'The scope is quoted after the venue and event flow are reviewed, so you can decide between a restrained setup and a fuller event design.',
    ],
    highlights: [
      {
        title: 'Ring-exchange backdrop',
        description: 'Sized after reviewing the couple seating and room width.',
      },
      {
        title: 'Evening lighting plan',
        description: 'Lighting needs are discussed with the venue for after-dark events.',
      },
      {
        title: 'Family-photo space',
        description: 'A clear area can be reserved for group portraits.',
      },
      {
        title: 'Palette coordination',
        description: 'Florals, drapes, and balloons can follow attire or invitation colours.',
      },
    ],
    gallery: [
      { src: SERVICE_IMAGES.engagement, caption: 'Engagement stage & florals' },
      GALLERY.wedding,
      GALLERY.haldi,
    ],
    testimonial: {
      quote:
        'Our engagement setup felt elegant and intimate. Guests kept asking who designed the florals.',
      attribution: 'Engagement · Indiranagar',
    },
    trustSignals: [
      'Venue photos reviewed before quoting',
      'Itemized décor scope',
      'Installation timing agreed in advance',
    ],
    howWeCustomize: [
      {
        title: 'Couple and family requirements',
        description:
          'The ring-exchange moment, family seating, and photography needs guide the layout.',
      },
      {
        title: 'Venue proportions',
        description:
          'We size the focal backdrop around the room width, ceiling height, and guest movement.',
      },
      {
        title: 'Visual style',
        description:
          'Florals, fabric, lighting, and colour can complement attire, invitations, or a chosen mood.',
      },
      {
        title: 'Celebration scale',
        description:
          'A home gathering and a banquet function receive different zone planning and material quantities.',
      },
    ],
    popularDecorationOptions: [
      {
        title: 'Modern floral frame',
        description: 'A clean, flower-led focal point for the ring exchange and portraits.',
      },
      {
        title: 'Soft drape setting',
        description:
          'Layered fabric, gentle lighting, and coordinated seating for an intimate ceremony.',
      },
      {
        title: 'Contemporary neutral stage',
        description: 'A restrained palette with texture and light for a larger venue.',
      },
    ],
    suitableVenues: ['Private homes', 'Banquet halls', 'Hotels', 'Rooftop venues', 'Clubhouses'],
    optionalAddOns: [
      'Couple seating',
      'Family-photo corner',
      'Welcome signage',
      'Ambient lighting',
      'Entry styling',
    ],
    budgetConsiderations: {
      intro: 'Costs are guided by your venue, visual direction, and the areas you choose to style.',
      points: [
        {
          title: 'Backdrop scale',
          description:
            'Dimensions, support structure, and floral or fabric coverage shape material needs.',
        },
        {
          title: 'Lighting and florals',
          description:
            'The selected flower varieties, lighting treatment, and finish level affect the quote.',
        },
        {
          title: 'Additional zones',
          description:
            'Separate entry, seating, and portrait areas are scoped only when they serve the event.',
        },
      ],
    },
    bookingProcess: [
      {
        step: 'Send references',
        detail: 'Share the date, venue images, couple preferences, and ceremony plan.',
      },
      {
        step: 'Plan the focal area',
        detail: 'We review the ring-exchange layout, sightlines, and photography requirements.',
      },
      {
        step: 'Approve your quote',
        detail: 'A custom scope records the selected materials, areas, and access needs.',
      },
      {
        step: 'Confirm venue access',
        detail: 'Installation timing is aligned with the venue and event schedule.',
      },
    ],
    setupTimeline: [
      {
        step: 'Venue coordination',
        detail: 'Access, loading, and power availability are checked before the event.',
      },
      {
        step: 'Build the setting',
        detail: 'The backdrop, seating, and any lighting are installed in the approved window.',
      },
      { step: 'Final styling check', detail: 'We complete finish details before guests arrive.' },
    ],
    themes: [
      {
        name: 'Classic red & gold',
        description: 'Rich red florals with gold drapes for a traditional ring-ceremony stage.',
      },
      {
        name: 'Pastel garden',
        description: 'Soft pinks, greens, and garden blooms for lawn or clubhouse engagements.',
      },
      {
        name: 'Royal purple & silver',
        description: 'Deep purple accents with metallic silver for an evening banquet look.',
      },
      {
        name: 'Rustic vintage',
        description: 'Wooden textures, fairy lights, and muted florals for intimate venues.',
      },
      {
        name: 'Modern minimalist',
        description: 'Clean lines, monochrome palette, and a focused couple seating backdrop.',
      },
      {
        name: 'Tropical',
        description: 'Palm leaves, orchids, and warm lighting for outdoor terrace engagements.',
      },
    ],
    waPrefill:
      "Hi We Decor! I'm planning an engagement in Bangalore. Date: _____. Venue: _____. Theme ideas: _____.",
    faqs: [
      {
        question: 'Can you decorate a small engagement at home?',
        answer:
          'Yes. Share photos, room dimensions, and the ceremony plan so we can recommend a backdrop that fits the available space.',
      },
      {
        question: 'Do you handle ring ceremony stages?',
        answer:
          'We can scope a couple backdrop or stage along with seating and photo requirements after reviewing the venue.',
      },
      {
        question: 'Can décor match our outfits or invitation colours?',
        answer:
          'Yes. Send references or colour swatches and we will discuss practical material and floral options.',
      },
      {
        question: 'Is lighting included for an evening engagement?',
        answer:
          'Lighting is planned based on the venue’s existing setup and the areas you want highlighted. It is listed clearly in the quote.',
      },
      {
        question: 'Can you create a photo area separate from the stage?',
        answer:
          'Where the venue has room, we can include a separate portrait corner so the ceremony backdrop is not continuously occupied.',
      },
      {
        question: 'How early should I book engagement décor?',
        answer:
          'Enquire once your date and venue access window are known. Lead time helps with planning materials and installation.',
      },
    ],
  },
  'corporate-decoration': {
    slug: 'corporate-decoration',
    title: 'Corporate Event Decoration and Branding Bangalore',
    description:
      'Corporate event decoration in Bangalore from ₹3,000 — brand-aware stages, entry arches, and GST-ready quotes for offices and venues.',
    serviceType: 'Corporate event decoration',
    ogImage: SERVICE_IMAGES.corporate,
    eyebrow: 'Corporate events · Bangalore',
    headline: 'Decor that fits the run sheet and procurement process',
    subheadline:
      'From an office milestone to a branded launch, we scope installations around approval steps, venue access, logo files, and event scale.',
    storyTitle: 'Send the operational brief, not just the theme',
    storyParagraphs: [
      'A useful corporate enquiry includes the event date, venue, guest count, floor plan, brand assets, setup window, and billing requirements. That lets us prepare an itemized scope for review rather than a generic offering.',
      'Office celebrations may need a compact branded backdrop and balloon treatment. Larger launches, annual days, and conferences can include stage, entry, registration, and photo-zone requirements. The final plan follows venue permissions and event operations.',
      'For companies using purchase orders or vendor onboarding, share the process early. GST invoices are available for corporate bookings.',
    ],
    highlights: [
      {
        title: 'Brand-asset checklist',
        description: 'Logo files, colours, copy, and placement are confirmed before production.',
      },
      {
        title: 'Itemized scope',
        description:
          'Quotes can separate backdrop, stage, branding, and installation requirements.',
      },
      {
        title: 'Venue coordination',
        description: 'Loading, access, and teardown timing are planned with the event contact.',
      },
      {
        title: 'Invoice support',
        description: 'GST invoices are available for corporate bookings.',
      },
    ],
    gallery: [
      { src: collectionSrc('corporate event'), caption: 'Corporate event styling' },
      { src: '/services/corporate.webp', caption: 'Brand-aligned stage decoration' },
      { src: collectionSrc('corporate event', 1), caption: 'Office celebration, Bengaluru' },
    ],
    testimonial: {
      quote:
        'Our launch backdrop looked sharp on stage and in press photos. Setup was punctual and professional.',
      attribution: 'Corporate milestone · Electronic City',
    },
    trustSignals: [
      'GST invoices available for corporate bookings',
      'Itemized quotes for approval',
      'PO process discussed before confirmation',
    ],
    howWeCustomize: [
      {
        title: 'Brand requirements',
        description:
          'Logo files, brand colours, messaging, and approval rules shape the visual treatment.',
      },
      {
        title: 'Event format',
        description:
          'An office milestone, launch, conference, or awards event needs different functional zones.',
      },
      {
        title: 'Venue operations',
        description:
          'Floor plans, loading rules, security, and setup windows are considered before production.',
      },
      {
        title: 'Audience scale and budget',
        description:
          'We match décor coverage and materials to the guest count and approved event brief.',
      },
    ],
    popularDecorationOptions: [
      {
        title: 'Brand-led photo wall',
        description: 'A logo-conscious setting for guest, team, and press photographs.',
      },
      {
        title: 'Polished office celebration',
        description: 'A focused backdrop and balloon or floral accents for a workplace gathering.',
      },
      {
        title: 'Launch-stage environment',
        description:
          'Coordinated stage, entry, and registration styling for a public-facing event.',
      },
    ],
    suitableVenues: [
      'Office campuses',
      'Hotels',
      'Conference centres',
      'Banquet halls',
      'Co-working event spaces',
    ],
    optionalAddOns: [
      'Branded signage',
      'Registration-area styling',
      'Stage accents',
      'Photo wall',
      'After-hours removal',
    ],
    budgetConsiderations: {
      intro:
        'The approved quote reflects the operational brief, brand applications, and required event areas.',
      points: [
        {
          title: 'Brand production',
          description:
            'Custom graphics, logo treatments, and approved materials determine production requirements.',
        },
        {
          title: 'Venue logistics',
          description:
            'Loading restrictions, overnight access, and safety requirements can affect labour and timing.',
        },
        {
          title: 'Functional zones',
          description:
            'Stages, entries, registration, and photo walls are costed according to the event run sheet.',
        },
      ],
    },
    bookingProcess: [
      {
        step: 'Share the event brief',
        detail:
          'Provide date, venue, run sheet, guest count, brand files, and billing requirements.',
      },
      {
        step: 'Align on operations',
        detail: 'We review approvals, venue access, safety rules, and required event zones.',
      },
      {
        step: 'Approve the scope',
        detail: 'An itemized custom quote is shared for your team or procurement process.',
      },
      {
        step: 'Schedule installation',
        detail: 'Production and setup are coordinated with the authorised event contact.',
      },
    ],
    setupTimeline: [
      {
        step: 'Pre-event approvals',
        detail: 'Brand artwork, venue rules, and access windows are signed off.',
      },
      {
        step: 'Venue installation',
        detail:
          'The team installs branded and functional elements within the allowed setup period.',
      },
      {
        step: 'Handover and removal',
        detail: 'The space is checked with the event contact, with teardown handled as scoped.',
      },
    ],
    themes: [
      {
        name: 'Executive minimalist',
        description: 'Neutral tones and clean logo placement for boardrooms and leadership meets.',
      },
      {
        name: 'Brand-colour integration',
        description: 'Balloon or floral accents matched to brand guidelines for product launches.',
      },
      {
        name: 'Awards night glam',
        description: 'Metallic stages, spotlight-friendly backdrops, and photo-ready entry arches.',
      },
      {
        name: 'Conference modern',
        description: 'Modular stage décor with clear sightlines for speakers and screens.',
      },
      {
        name: 'Garden networking',
        description: 'Outdoor lounge styling with soft lighting for evening client events.',
      },
      {
        name: 'Tech-forward',
        description:
          'Geometric forms and cool-toned accents suited to startup and IT celebrations.',
      },
    ],
    waPrefill:
      'Hi We Decor! We need corporate event decor in Bangalore. Date: _____. Company/venue: _____.',
    whyChooseUsEyebrow: 'Why businesses choose us',
    faqs: [
      {
        question: 'Do you provide GST invoices for corporate decoration?',
        answer:
          'Yes, GST invoices are available for corporate bookings. Share your billing details during the enquiry.',
      },
      {
        question: 'Can you work with a PO or procurement process?',
        answer:
          'Yes. Tell us the required approval, onboarding, and PO steps early so they can be considered in the booking timeline.',
      },
      {
        question: 'Can brand colours and logos be included?',
        answer:
          'Yes, subject to the supplied assets and approved application. Send editable logo files and brand guidelines where available.',
      },
      {
        question: 'What details do you need for a corporate quote?',
        answer:
          'Date, venue, guest count, event format, setup window, brand assets, required zones, and billing process are useful.',
      },
      {
        question: 'Can you decorate both small office events and larger launches?',
        answer:
          'We scope the installation to the event format, venue, and required areas rather than using one fixed offering.',
      },
      {
        question: 'How much lead time is needed for a branded event?',
        answer:
          'Lead time depends on the scale and approval process. Contact us when the date and venue are being finalized.',
      },
      {
        question: 'Can décor scale for a team lunch versus an all-hands celebration?',
        answer:
          'Yes. Share guest count, room size, and required zones (stage, entry, photo wall) so the scope matches the event scale.',
      },
      {
        question: 'Do you install after office hours or overnight?',
        answer:
          'Installation windows depend on building access and security rules. Share the allowed entry hours when you enquire so we can plan around them.',
      },
    ],
  },
  'tent-balloon-setup': {
    slug: 'tent-balloon-setup',
    title: 'Outdoor Tent and Balloon Setup in Bangalore',
    description:
      'Tent and balloon decoration in Bangalore from ₹3,000 — outdoor arches, canopies, and weather-aware setups for parties and gatherings.',
    serviceType: 'Balloon decoration',
    ogImage: SERVICE_IMAGES.tentBalloon,
    coreServiceId: 'balloon-decoration',
    relatedHrefs: [
      '/services/balloon-decoration',
      '/services/birthday-decoration',
      '/services/corporate-decoration',
    ],
    eyebrow: 'Outdoor parties · Bangalore',
    headline: 'Make the open space usable for the party',
    subheadline:
      'Tents, balloon features, and entry décor are planned around weather, anchoring, guest movement, and venue rules.',
    storyTitle: 'Outdoor setup begins with the site',
    storyParagraphs: [
      'A lawn, driveway, or clubhouse terrace has different access and anchoring limits. Photos of the site, a rough layout, and the event timing help determine whether a tent, balloon arch, canopy dressing, or a compact focal point is appropriate.',
      'For children’s parties, themed balloons and a cake backdrop may be the priority. For adult gatherings, a tented dining area or neutral balloon palette may suit the plan better. We can quote a simple focal setup or a fuller outdoor layout after reviewing the site.',
      'Weather remains a venue risk. We discuss rain backup, wind exposure, power, and weighted installation points before confirmation.',
    ],
    highlights: [
      {
        title: 'Site review first',
        description: 'Photos help assess access, anchoring points, and usable event area.',
      },
      {
        title: 'Weather discussion',
        description: 'Wind and rain contingencies are considered for exposed venues.',
      },
      {
        title: 'Theme or neutral palettes',
        description: 'Balloon colours can be planned for children’s or adult celebrations.',
      },
      {
        title: 'Entry and cake zones',
        description: 'Features are positioned around arrival routes and guest flow.',
      },
    ],
    gallery: [GALLERY.tent, GALLERY.birthday, GALLERY.wedding],
    testimonial: {
      quote:
        'The balloon arch was the highlight of our lawn party. Team was quick and the colours were perfect.',
      attribution: 'Birthday · HSR Layout',
    },
    trustSignals: [
      'Site photos reviewed before quoting',
      'Weather considerations discussed',
      'Setup and removal scope confirmed',
    ],
    howWeCustomize: [
      {
        title: 'Site assessment',
        description:
          'Surface, dimensions, access, anchoring points, and weather exposure determine what is practical.',
      },
      {
        title: 'Party purpose',
        description:
          'Children’s celebrations, casual gatherings, and dining events need different focal areas.',
      },
      {
        title: 'Colour direction',
        description:
          'Balloon palettes, canopy dressing, and accents can follow a theme or a restrained outdoor look.',
      },
      {
        title: 'Guest and budget priorities',
        description:
          'We balance cover, seating, entry impact, and photo moments around your event plan.',
      },
    ],
    popularDecorationOptions: [
      {
        title: 'Balloon-led arrival',
        description: 'An arch or organic balloon feature designed around the entry route.',
      },
      {
        title: 'Tented party area',
        description: 'Practical cover with coordinated accents for dining or guest gathering.',
      },
      {
        title: 'Outdoor cake moment',
        description: 'A weather-aware focal zone for cake cutting and photographs.',
      },
    ],
    suitableVenues: [
      'Lawns',
      'Villa gardens',
      'Driveways',
      'Apartment clubhouses',
      'Rooftop terraces',
    ],
    optionalAddOns: [
      'Cake-table styling',
      'Welcome signage',
      'Outdoor lighting',
      'Guest seating accents',
      'Teardown after the party',
    ],
    budgetConsiderations: {
      intro:
        'Outdoor quotes are based on the site, weather precautions, and the event areas you need.',
      points: [
        {
          title: 'Cover and anchoring',
          description:
            'Tent size, ballast, surface type, and wind exposure influence equipment and labour.',
        },
        {
          title: 'Balloon treatment',
          description:
            'Feature scale, colours, and whether it needs reinforced outdoor installation affect materials.',
        },
        {
          title: 'Access and timing',
          description:
            'Distance from unloading, setup windows, and post-event removal shape the working plan.',
        },
      ],
    },
    bookingProcess: [
      {
        step: 'Send site details',
        detail:
          'Share venue photos, dimensions, event time, guest count, and weather backup information.',
      },
      {
        step: 'Review feasibility',
        detail: 'We assess access, anchoring, wind exposure, and the areas guests will use.',
      },
      {
        step: 'Confirm the design',
        detail: 'Your custom quote identifies the selected tent, balloon, and styling elements.',
      },
      {
        step: 'Coordinate access',
        detail: 'Setup and removal windows are confirmed with the venue or association.',
      },
    ],
    setupTimeline: [
      {
        step: 'Weather and access check',
        detail:
          'The team reconfirms site entry, forecast considerations, and approved installation points.',
      },
      {
        step: 'Secure the structure',
        detail: 'Tent and outdoor features are installed and weighted before decorative finishing.',
      },
      {
        step: 'Finish and hand over',
        detail: 'Balloon features and focal areas are completed before guests arrive.',
      },
    ],
    themes: [
      {
        name: 'Carnival arch',
        description:
          'Bold multi-colour balloon arches that frame entrances for kids and family events.',
      },
      {
        name: 'Organic garland',
        description: 'Soft organic balloon clusters for modern outdoor parties and clubhouses.',
      },
      {
        name: 'Marquee elegance',
        description: 'Tent drapes with restrained balloon accents for dinners and receptions.',
      },
      {
        name: 'Festival canopy',
        description:
          'Festive canopy styling with colour-blocked balloons for community celebrations.',
      },
      {
        name: 'Balloon ceiling',
        description: 'Ceiling cloud installations that transform covered outdoor spaces.',
      },
      {
        name: 'Garden pergola',
        description: 'Balloon and floral accents woven around pergolas and garden structures.',
      },
    ],
    waPrefill:
      'Hi We Decor! I need tent/balloon decor in Bangalore. Date: _____. Outdoor venue: _____.',
    faqs: [
      {
        question: 'Can you set up balloons and a tent on a lawn?',
        answer:
          'Yes, after reviewing the lawn access, surface, wind exposure, and venue rules for anchoring or weights.',
      },
      {
        question: 'What happens if it rains during an outdoor event?',
        answer:
          'We discuss the venue’s covered backup option and practical décor adjustments before the event. Weather cannot be guaranteed.',
      },
      {
        question: 'Can you decorate a driveway or apartment clubhouse?',
        answer:
          'Yes, if the resident association or venue permits it. Share dimensions, entry access, and any installation rules.',
      },
      {
        question: 'Are balloon arches safe in windy areas?',
        answer:
          'Wind conditions affect what is practical. We review the location and use an appropriate layout and securing method where possible.',
      },
      {
        question: 'Can the tent and balloons match a birthday theme?',
        answer:
          'Yes. Send the theme, age group, and reference colours so we can suggest suitable materials and focal areas.',
      },
      {
        question: 'Do you take down the setup after the party?',
        answer:
          'Removal can be included in the confirmed scope. Tell us the venue’s closing time when you enquire.',
      },
    ],
  },
  'room-decoration': {
    slug: 'room-decoration',
    title: 'Surprise Room Decoration Services in Bangalore',
    description:
      'Room decoration in Bangalore from ₹3,000 — surprise styling for birthdays, anniversaries, and bridal rooms with access timing planned.',
    serviceType: 'Room decoration',
    ogImage: SERVICE_IMAGES.roomDecor,
    coreServiceId: 'bridal-room-decoration',
    relatedHrefs: [
      '/services/anniversary-decoration',
      '/services/proposal-decoration',
      '/services/birthday-decoration',
    ],
    eyebrow: 'Private surprise setups',
    headline: 'Open the door to a planned surprise',
    subheadline:
      'Room décor for a partner, spouse, bride, or birthday recipient, with access timing and furniture layout agreed before the installation.',
    storyTitle: 'The recipient and the room both matter',
    storyParagraphs: [
      'For a surprise, start with who it is for and when they will be out of the room. A husband or wife birthday, an anniversary, and a bridal room each call for a different focal point and amount of décor.',
      'Photos and measurements let us work around a bed, wardrobe, balcony door, and existing furniture. We can suggest balloons, a message area, florals, or soft lighting without blocking daily use of the room.',
      'Building rules, lift access, and cleanup expectations are confirmed before arrival. The quote follows the selected materials and room constraints.',
    ],
    highlights: [
      {
        title: 'Recipient-led décor',
        description: 'The setup can be planned for a spouse, bride, birthday recipient, or couple.',
      },
      {
        title: 'Furniture-aware placement',
        description: 'Existing layout and door clearance are considered before installation.',
      },
      {
        title: 'Surprise timing',
        description: 'Access windows are planned with the person arranging the reveal.',
      },
      {
        title: 'Cleanup scope',
        description: 'Removal expectations are agreed before the booking is confirmed.',
      },
    ],
    gallery: [GALLERY.birthday, GALLERY.wedding, GALLERY.haldi],
    testimonial: {
      quote: 'The bridal room looked like a boutique hotel suite. Every detail felt thoughtful.',
      attribution: 'Bridal room · Jayanagar',
    },
    trustSignals: [
      'Room photos reviewed before quoting',
      'Access timing confirmed with organiser',
      'Removal requirements discussed',
    ],
    howWeCustomize: [
      {
        title: 'Recipient preferences',
        description:
          'The occasion, favourite colours, message, and desired mood guide the surprise.',
      },
      {
        title: 'Room layout',
        description:
          'Bed placement, furniture, doors, windows, and clear walkways determine the arrangement.',
      },
      {
        title: 'Material direction',
        description:
          'Balloons, florals, lights, and fabric details are selected for the requested style.',
      },
      {
        title: 'Access and budget',
        description:
          'The scope follows the available setup window, apartment rules, and chosen focal points.',
      },
    ],
    popularDecorationOptions: [
      {
        title: 'Romantic soft-light setting',
        description:
          'Warm lighting, florals, and gentle colour for an anniversary or spouse surprise.',
      },
      {
        title: 'Birthday message wall',
        description: 'A celebratory focal point with balloons and a personalised message area.',
      },
      {
        title: 'Bridal room styling',
        description:
          'Elegant texture and floral touches planned around the existing room furniture.',
      },
    ],
    suitableVenues: [
      'Apartment bedrooms',
      'Hotel rooms',
      'Bridal suites',
      'Private villas',
      'Serviced apartments',
    ],
    optionalAddOns: [
      'Personalised message',
      'Fairy lighting',
      'Bed or table styling',
      'Fresh-flower accents',
      'Scheduled removal',
    ],
    budgetConsiderations: {
      intro:
        'A room-decoration quote is shaped by the room constraints, materials, and access plan.',
      points: [
        {
          title: 'Room dimensions',
          description:
            'Available wall, ceiling, and furniture clearance determine the scale that can be installed safely.',
        },
        {
          title: 'Selected finishes',
          description:
            'Fresh florals, lighting, custom messages, and balloon density affect material choices.',
        },
        {
          title: 'Surprise logistics',
          description:
            'Building access, lift use, discreet timing, and same-day removal can affect the service scope.',
        },
      ],
    },
    bookingProcess: [
      {
        step: 'Describe the occasion',
        detail: 'Share the recipient, date, room photos, preferences, and surprise timing.',
      },
      {
        step: 'Check the room',
        detail: 'We review dimensions, furniture, access, and building requirements.',
      },
      {
        step: 'Choose your details',
        detail: 'A custom quote records the agreed focal points, materials, and removal request.',
      },
      {
        step: 'Confirm access',
        detail: 'The organiser coordinates entry while the recipient is away.',
      },
    ],
    setupTimeline: [
      {
        step: 'Discreet arrival',
        detail: 'Access and the reveal time are reconfirmed with the organiser.',
      },
      {
        step: 'Style the room',
        detail: 'Décor is placed around furniture and clear exit routes in the agreed window.',
      },
      {
        step: 'Prepare the reveal',
        detail: 'Final finishing is completed before the recipient returns.',
      },
    ],
    themes: [
      {
        name: 'Romantic rose petals',
        description:
          'Petal pathways, soft lighting, and a focal wall for anniversary or proposal reveals.',
      },
      {
        name: 'Anniversary surprise',
        description:
          'Balloon numbers, photo corners, and candle accents planned around furniture layout.',
      },
      {
        name: 'Candlelit dinner',
        description: 'Intimate table styling with fairy lights for in-room celebrations.',
      },
      {
        name: 'First night',
        description:
          'Elegant bridal-room décor with florals and soft drapes for hotel or home suites.',
      },
      {
        name: 'Welcome baby',
        description: 'Pastel balloon and soft-prop setups for newborn welcome surprises.',
      },
      {
        name: 'Minimalist cozy',
        description:
          'A restrained balloon-and-light treatment for small apartments and quiet reveals.',
      },
    ],
    waPrefill: 'Hi We Decor! I need room decoration in Bangalore. Occasion: _____. Date: _____.',
    faqs: [
      {
        question: 'Can you decorate a room as a surprise for my husband or wife?',
        answer:
          'Yes. Share the occasion, the recipient’s preferences, photos of the room, and the time available before the reveal.',
      },
      {
        question: 'Do you decorate bridal rooms?',
        answer:
          'Yes. We plan around room access, furniture, the event schedule, and the type of décor you want included.',
      },
      {
        question: 'Will room décor fit in a small apartment bedroom?',
        answer:
          'It can, provided we review room photos and measurements first. We keep doorways, beds, and furniture access in mind.',
      },
      {
        question: 'How do you coordinate a surprise setup?',
        answer:
          'The organiser confirms an access window and who will receive the team. Please check building entry requirements in advance.',
      },
      {
        question: 'Can you remove the decorations after the surprise?',
        answer:
          'Removal can be arranged as part of the scope. Tell us whether the room needs to be cleared the same day.',
      },
      {
        question: 'Can I choose a birthday or anniversary theme?',
        answer:
          'Yes. Send a reference, colour preference, and the recipient’s interests so we can discuss suitable options.',
      },
    ],
  },
  'wedding-setup': {
    slug: 'wedding-setup',
    title: 'Wedding and Reception Decoration in Bangalore',
    description:
      'Wedding decoration in Bangalore from ₹5,000 — mandap, stage, and venue styling scoped after ceremony needs and venue access.',
    serviceType: 'Wedding decoration',
    ogImage: SERVICE_IMAGES.engagement,
    coreServiceId: 'wedding-decoration',
    relatedHrefs: [
      '/services/haldi-decoration',
      '/services/engagement-decoration',
      '/services/floral-decoration',
    ],
    eyebrow: 'Wedding planning · Bangalore',
    headline: 'Match the décor plan to the venue and budget',
    subheadline:
      'Local halls, hotels, and destination events need different coordination. We review venue access, rituals, and fixed-budget priorities before proposing the scope.',
    storyTitle: 'Choose the event areas in order',
    storyParagraphs: [
      'Begin with the ceremony: mandap, ritual seating, and guest sightlines. Then decide whether the reception requires a separate couple stage, entry, aisle, dining details, or photo backdrop. This prevents a fixed budget being spread across too many areas.',
      'For Bangalore weddings, we coordinate with the hall, hotel, or local venue contact on loading, power, installation windows, and removal. We can discuss destination weddings, but the primary service focus is Bangalore and feasibility depends on the location and logistics.',
      'A simple mandap-led plan and a more detailed multi-area plan are both possible. Quotes are prepared after reviewing venue photos, event dates, and the priority list.',
    ],
    highlights: [
      {
        title: 'Mandap-first planning',
        description: 'Ceremony requirements are considered before optional décor zones.',
      },
      {
        title: 'Fixed-budget priorities',
        description: 'The scope can focus on the areas that matter most to your event.',
      },
      {
        title: 'Venue operations',
        description: 'Access, loading, power, and removal are checked with the venue contact.',
      },
      {
        title: 'Reception coordination',
        description: 'A separate stage or backdrop can be planned when the schedule requires it.',
      },
    ],
    gallery: [GALLERY.wedding, GALLERY.haldi, GALLERY.tent],
    testimonial: {
      quote:
        'Our mandap and reception felt cohesive and luxurious. The team understood our vision immediately.',
      attribution: 'Wedding · Whitefield',
    },
    trustSignals: [
      'Venue photos reviewed before quoting',
      'Itemized wedding scope',
      'Installation and removal timing confirmed',
    ],
    howWeCustomize: [
      {
        title: 'Function priorities',
        description:
          'Mandap rituals, reception, entry, and portrait areas are ranked around your wedding schedule.',
      },
      {
        title: 'Venue planning',
        description:
          'Hall, hotel, and outdoor-site access, power, loading, and sightlines are reviewed early.',
      },
      {
        title: 'Design language',
        description:
          'Florals, drapes, lighting, and structural details can follow your cultural and visual references.',
      },
      {
        title: 'Guest scale and budget',
        description: 'We focus investment on the ceremony and event areas that matter most to you.',
      },
    ],
    popularDecorationOptions: [
      {
        title: 'Floral mandap focus',
        description: 'A ceremony-led design with considered ritual seating and guest sightlines.',
      },
      {
        title: 'Classic reception stage',
        description:
          'A refined couple backdrop with balanced floral, fabric, and lighting details.',
      },
      {
        title: 'Contemporary multi-zone wedding',
        description: 'A coordinated visual direction across ceremony, entry, and portrait areas.',
      },
    ],
    suitableVenues: [
      'Wedding halls',
      'Hotels',
      'Banquet halls',
      'Resorts',
      'Lawns and gardens',
      'Private villas',
    ],
    optionalAddOns: [
      'Welcome entry styling',
      'Aisle details',
      'Couple seating',
      'Family photo area',
      'Dining-table accents',
      'Teardown coordination',
    ],
    budgetConsiderations: {
      intro:
        'Wedding costs depend on the venue, function plan, materials, and the areas you prioritise.',
      points: [
        {
          title: 'Ceremony structure',
          description:
            'Mandap dimensions, floral coverage, and ritual-specific layout influence materials and build time.',
        },
        {
          title: 'Venue logistics',
          description:
            'Loading, power, installation windows, and any outdoor protections affect on-site work.',
        },
        {
          title: 'Number of functions',
          description:
            'Separate ceremony, reception, entry, and photo areas are scoped according to your schedule.',
        },
      ],
    },
    bookingProcess: [
      {
        step: 'Share your wedding brief',
        detail:
          'Send dates, venues, function schedule, guest count, references, and priority areas.',
      },
      {
        step: 'Review venue operations',
        detail: 'We discuss layout, access, power, venue restrictions, and ceremony requirements.',
      },
      {
        step: 'Confirm the custom scope',
        detail: 'Your quote details the selected décor areas, materials, and installation plan.',
      },
      {
        step: 'Coordinate event day',
        detail: 'We align setup and removal timing with the venue and wedding coordinator.',
      },
    ],
    setupTimeline: [
      {
        step: 'Pre-event venue check',
        detail: 'Access, loading, power, and the function sequence are reconfirmed.',
      },
      {
        step: 'Install key areas',
        detail: 'The mandap, stage, and agreed supporting zones are built in the approved window.',
      },
      {
        step: 'Final ceremony readiness',
        detail: 'Finishing details are completed before guests and rituals begin.',
      },
      {
        step: 'Post-event removal',
        detail: 'Teardown is coordinated according to the venue handover requirement.',
      },
    ],
    themes: [
      {
        name: 'Royal Rajasthani',
        description:
          'Rich textiles, marigold, and ornate stage detailing for grand mandap moments.',
      },
      {
        name: 'South Indian temple',
        description: 'Traditional floral towers and ritual-focused ceremony styling.',
      },
      {
        name: 'Indo-western fusion',
        description:
          'Blended florals and modern drapes for couples who want both tradition and polish.',
      },
      {
        name: 'Garden enchanted',
        description: 'Lush greenery and soft lighting for lawn and outdoor ceremonies.',
      },
      {
        name: 'Palace baroque',
        description: 'Dramatic drapes and statement florals suited to banquet halls.',
      },
      {
        name: 'Minimalist contemporary',
        description: 'Clean architectural florals with a calm colour story for modern venues.',
      },
      {
        name: 'Fairy-tale',
        description: 'Romantic pastel stages and photo-ready arches for reception evenings.',
      },
      {
        name: 'Mughal-inspired',
        description:
          'Structured symmetry, rich colour, and statement floral frames for heritage looks.',
      },
    ],
    waPrefill: "Hi We Decor! We're planning a wedding in Bangalore. Dates: _____. Venues: _____.",
    faqs: [
      {
        question: 'Do you decorate destination weddings?',
        answer:
          'We primarily focus on Bangalore weddings. Share the destination, dates, venue, and logistics so we can confirm whether it is feasible.',
      },
      {
        question: 'Can you work within a fixed wedding décor budget?',
        answer:
          'Yes. Tell us the budget and rank the ceremony, stage, entry, and reception areas by importance so we can propose a focused scope.',
      },
      {
        question: 'Do you coordinate with wedding halls and hotels?',
        answer:
          'We coordinate installation details with the relevant venue contact once the booking scope and access window are confirmed.',
      },
      {
        question: 'What is the difference between mandap and reception décor?',
        answer:
          'The mandap supports the ceremony and rituals; reception décor usually centres on couple seating, guest photos, and arrival areas. They can be scoped separately.',
      },
      {
        question: 'Can you handle multiple wedding functions?',
        answer:
          'We can discuss haldi, sangeet, ceremony, and reception requirements together once the dates, venues, and priorities are shared.',
      },
      {
        question: 'What do you need to quote for a wedding?',
        answer:
          'Venue photos, dates, guest count, function schedule, access timings, and your priority areas help us prepare the right scope.',
      },
      {
        question: 'Can you decorate only the mandap if the reception budget is limited?',
        answer:
          'Yes. Many couples prioritise the ceremony area first. Share your fixed budget and we will propose a focused scope rather than a full-venue plan.',
      },
      {
        question: 'Do you visit banquet halls before quoting?',
        answer:
          'When helpful and available, a site discussion can clarify stage size, power, and load-in. Clear photos and venue contact details also help when a visit is not possible.',
      },
    ],
  },
  'birthday-home-decoration': {
    slug: 'birthday-home-decoration',
    title: 'Birthday Decoration at Home in Bangalore',
    description:
      'Birthday decoration at home in Bangalore from ₹3,000 — surprise timing, apartment-friendly setups, themes, and cleanup options.',
    serviceType: 'Birthday decoration',
    ogImage: SERVICE_IMAGES.birthday,
    coreServiceId: 'birthday-decoration',
    eyebrow: 'Home birthday surprises',
    headline: 'Plan the reveal before the birthday guest arrives',
    subheadline:
      'Apartment and villa birthday décor for kids, partners, and family members, with timing, lift access, and removal considered from the start.',
    storyTitle: 'A home-party plan in three decisions',
    storyParagraphs: [
      'First, choose the recipient: a child may want a favourite character or colour theme, while a husband, wife, or parent may prefer a simple balloon-and-cake setting. Second, choose one focal area such as the living-room wall, dining table, or balcony.',
      'Third, confirm the surprise window. Building entry, lift availability, parking, and when the recipient will be away all affect the setup plan. Photos of the room help us avoid blocking furniture or doorways.',
      'A compact birthday corner and a fuller themed setup can both be quoted after the space and cleanup requirement are known.',
    ],
    highlights: [
      {
        title: 'Kids and adult themes',
        description:
          'Themes are selected around the recipient, age group, and available wall space.',
      },
      {
        title: 'Surprise access plan',
        description: 'Entry and reveal timing are agreed with the organiser.',
      },
      {
        title: 'Apartment constraints',
        description: 'Lift, parking, room size, and association rules are considered.',
      },
      {
        title: 'Post-party removal',
        description: 'Cleanup and teardown needs can be included in the scope.',
      },
    ],
    gallery: [GALLERY.birthday, GALLERY.tent, GALLERY.wedding],
    testimonial: {
      quote:
        'Our living room transformation made my daughter’s day. Setup was quick and spotless after.',
      attribution: 'Kids birthday · Bellandur',
    },
    trustSignals: [
      'Room photos reviewed before quoting',
      'Surprise timing confirmed with organiser',
      'Cleanup requirements agreed in advance',
    ],
    howWeCustomize: [
      {
        title: 'Birthday person first',
        description:
          'Age, interests, favourite colours, and whether the celebration is a surprise shape the direction.',
      },
      {
        title: 'Home layout',
        description:
          'Living-room, balcony, dining, and wall space are reviewed around furniture and movement.',
      },
      {
        title: 'Theme and materials',
        description:
          'Balloons, signage, table styling, and accents are tailored to the chosen mood.',
      },
      {
        title: 'Access and budget',
        description:
          'We create the scope around building rules, setup time, and the focal areas you value.',
      },
    ],
    popularDecorationOptions: [
      {
        title: 'Kids’ character-inspired corner',
        description: 'Colourful balloons and a cake backdrop built around a child’s interests.',
      },
      {
        title: 'Elegant adult surprise',
        description:
          'A restrained balloon and light treatment for a partner or milestone birthday.',
      },
      {
        title: 'Balcony celebration',
        description: 'A compact styled area that makes use of an apartment’s outdoor space.',
      },
    ],
    suitableVenues: [
      'Apartment living rooms',
      'Private villas',
      'Balconies',
      'Terraces',
      'Apartment party rooms',
    ],
    optionalAddOns: [
      'Cake-table styling',
      'Personalised name signage',
      'Return-gift table accents',
      'Fairy lights',
      'Post-party cleanup',
    ],
    budgetConsiderations: {
      intro:
        'Home birthday quotes follow the room, the chosen theme, and your surprise or cleanup needs.',
      points: [
        {
          title: 'Focal area size',
          description:
            'A single cake wall and a living-room transformation use different material quantities and time.',
        },
        {
          title: 'Theme detail',
          description:
            'Custom signage, themed props, balloon density, and selected finishes influence the cost.',
        },
        {
          title: 'Apartment logistics',
          description:
            'Lift access, parking, setup timing, and removal requirements shape the installation plan.',
        },
      ],
    },
    bookingProcess: [
      {
        step: 'Tell us about the birthday',
        detail: 'Share the date, recipient age, home photos, theme ideas, and surprise timing.',
      },
      {
        step: 'Review the space',
        detail: 'We check the focal wall, furniture clearance, building access, and guest plan.',
      },
      {
        step: 'Approve the custom plan',
        detail: 'Your quote specifies the selected styling, materials, and cleanup request.',
      },
      {
        step: 'Arrange entry',
        detail: 'The organiser confirms access while the birthday person is away.',
      },
    ],
    setupTimeline: [
      {
        step: 'Access confirmation',
        detail: 'Building entry, lift use, and the reveal time are checked with the organiser.',
      },
      {
        step: 'Transform the focal area',
        detail: 'The team installs the agreed birthday styling around the room layout.',
      },
      {
        step: 'Ready for the reveal',
        detail: 'Final details are completed before the birthday person arrives.',
      },
    ],
    waPrefill:
      'Hi We Decor! I need birthday decor at home in Bangalore. Date: _____. Age/theme: _____.',
    faqs: [
      {
        question: 'Can you set up a birthday surprise before my husband or wife gets home?',
        answer:
          'Yes, if an organiser can provide access and confirm the time window. Please also check apartment entry rules.',
      },
      {
        question: 'Do you offer kids birthday themes at home?',
        answer:
          'Yes. Share the child’s age, preferred theme or colours, and photos of the room or party area.',
      },
      {
        question: 'Can you decorate a small apartment living room?',
        answer:
          'Yes. We review photos, ceiling height, furniture, and door clearance to suggest a suitable focal setup.',
      },
      {
        question: 'How long does a home birthday setup take?',
        answer:
          'Timing depends on the selected scope, access, and venue constraints. We confirm the setup window before the event.',
      },
      {
        question: 'Do you clean up after the birthday party?',
        answer:
          'Teardown and cleanup can be arranged in the booking scope. Let us know when the space needs to be cleared.',
      },
      {
        question: 'Can the décor be centred around the cake table?',
        answer:
          'Yes. A cake-table backdrop is a practical option when you want one main photo and celebration area.',
      },
      {
        question: 'Can you decorate while the birthday person is at work or school?',
        answer:
          'Yes, if someone can give building access and confirm when they will return. We plan the install around that window.',
      },
      {
        question: 'What is a practical budget option for a home birthday?',
        answer:
          'A single wall backdrop with balloons or a cake-table focus is often the most controlled option. Share your budget and room photos for a scoped quote.',
      },
    ],
  },
  'birthday-decoration': {
    slug: 'birthday-decoration',
    title: 'Birthday Party Decoration Services in Bangalore',
    description:
      'Birthday party decoration in Bangalore from ₹3,000 — homes, clubhouses, and venues with kids themes, adult surprises, balloon setups, and same-day installation.',
    serviceType: 'Birthday decoration',
    ogImage: BIRTHDAY_HERO_IMAGE,
    coreServiceId: 'birthday-decoration',
    relatedHrefs: [
      '/services/balloon-decoration',
      '/services/room-decoration',
      '/services/baby-shower-decoration',
    ],
    eyebrow: 'Birthday parties · Bangalore',
    headline: 'Give the birthday person a setup made for them',
    subheadline:
      'From a child’s themed party to a surprise for a spouse, décor is planned around the recipient, venue flow, cake moment, and clear finishing time.',
    storyTitle: 'Start with the occasion, then the venue',
    storyParagraphs: [
      'A birthday at a cafe, clubhouse, terrace, or home needs a different approach. We review venue photos and event timing before recommending a backdrop, balloon feature, cake table, entry, or photo area.',
      'For children, popular directions include character-inspired colours, jungle, space, princess, or sports themes. For adults, a partner’s birthday or milestone may suit a simpler palette and a focused cake backdrop. You choose how much of the venue to style.',
      'We can plan a budget-conscious focal point or a broader venue setup. The quote follows the confirmed materials, access window, and cleanup requirements.',
    ],
    highlights: [
      {
        title: 'Recipient-based planning',
        description: 'Décor can reflect a child, spouse, parent, teen, or adult milestone.',
      },
      {
        title: 'Theme shortlist',
        description: 'Colours and references help narrow kids’ and adult birthday options.',
      },
      {
        title: 'Venue-specific scope',
        description: 'Home, clubhouse, cafe, and terrace access are reviewed before quoting.',
      },
      {
        title: 'Timing and removal',
        description: 'Setup and teardown are planned around the party schedule.',
      },
    ],
    gallery: [GALLERY.birthday, GALLERY.tent, GALLERY.haldi],
    testimonial: {
      quote:
        'The theme was cohesive from entrance to cake table. Worth every rupee for how the photos turned out.',
      attribution: 'Adult birthday · Koramangala',
    },
    trustSignals: [
      'Custom quotes after venue review',
      'Venue photos reviewed before quoting',
      'Setup and removal scope confirmed',
    ],
    howWeCustomize: [
      {
        title: 'Celebrant and occasion',
        description:
          'A child’s party, adult milestone, or partner surprise starts with the person being celebrated.',
      },
      {
        title: 'Venue flow',
        description:
          'Home, cafe, clubhouse, and terrace layouts are planned around arrivals, cake cutting, and photographs.',
      },
      {
        title: 'Style direction',
        description:
          'Themes, colour palettes, balloons, florals, and signage are matched to your references.',
      },
      {
        title: 'Guest count and budget',
        description:
          'We help choose the right focal areas and finish level for the gathering you are hosting.',
      },
    ],
    popularDecorationOptions: [
      {
        title: 'Themed children’s party',
        description:
          'A playful colour and character-inspired direction for the cake and photo moment.',
      },
      {
        title: 'Adult milestone styling',
        description: 'A sophisticated palette with a focused backdrop for friends and family.',
      },
      {
        title: 'Surprise birthday reveal',
        description: 'A personalised visual moment designed around discreet access and timing.',
      },
    ],
    suitableVenues: [
      'Private homes',
      'Apartment clubhouses',
      'Cafes',
      'Rooftop venues',
      'Hotels',
      'Private terraces',
    ],
    optionalAddOns: [
      'Cake-table styling',
      'Welcome signage',
      'Personalised name board',
      'Photo corner',
      'Ambient lighting',
      'Post-event removal',
    ],
    budgetConsiderations: {
      intro:
        'Your quote is built from the event brief, venue review, and the styling details you select.',
      points: [
        {
          title: 'Venue and layout',
          description:
            'Access, dimensions, existing décor, and the number of areas being styled shape the scope.',
        },
        {
          title: 'Theme execution',
          description:
            'Custom signs, props, flowers, balloon volume, and lighting affect the required materials.',
        },
        {
          title: 'Setup requirements',
          description:
            'Event timing, venue rules, and cleanup or removal needs influence labour and coordination.',
        },
      ],
    },
    bookingProcess: [
      {
        step: 'Share your celebration brief',
        detail: 'Send the date, venue, age or occasion, guest count, and style references.',
      },
      {
        step: 'Review the venue',
        detail: 'We consider the cake moment, photo area, access window, and venue requirements.',
      },
      {
        step: 'Select the styling',
        detail: 'A custom quote captures your chosen direction, materials, and optional details.',
      },
      {
        step: 'Confirm event timing',
        detail: 'Setup and removal are aligned with the host and venue before the party.',
      },
    ],
    setupTimeline: [
      {
        step: 'Confirm access',
        detail: 'Venue entry, parking, and the allowed installation period are reconfirmed.',
      },
      {
        step: 'Install the celebration areas',
        detail: 'The team prepares the backdrop, cake zone, and agreed styling elements.',
      },
      {
        step: 'Final pre-party check',
        detail: 'We finish the visual details before guests arrive.',
      },
      {
        step: 'Removal if arranged',
        detail: 'Teardown follows the event or venue handover schedule.',
      },
    ],
    themes: [
      {
        name: 'Balloon Garland & Pastel',
        description:
          'Organic balloon garlands in soft pastels — ideal for first birthdays, baby showers, and milestone celebrations at home or clubhouse.',
      },
      {
        name: 'Jungle Safari',
        description:
          'Tropical greens, animal cutouts, and earthy tones that work for kids and adults alike in both indoor and outdoor venues.',
      },
      {
        name: 'Princess & Fairy-tale',
        description:
          "Pink and gold palette with tulle drapes, tiara accents, and a photo-ready backdrop for children's parties.",
      },
      {
        name: 'Superhero & Character',
        description:
          'Bold primary colours with character-inspired props and themed backdrops — Spider-Man, Avengers, Barbie, and more.',
      },
      {
        name: 'Elegant Gold & Black',
        description:
          'Sophisticated colour scheme with metallic accents, sequin runners, and candlelit centrepieces for adult milestone birthdays.',
      },
      {
        name: 'Neon Glow Party',
        description:
          'UV-reactive décor, neon signage, and blacklight-friendly balloons for teen and young-adult celebrations.',
      },
      {
        name: 'Rustic Garden',
        description:
          'Wooden crates, fairy lights, wildflower arrangements, and burlap accents — perfect for terrace or lawn birthday setups.',
      },
      {
        name: 'Minimalist Modern',
        description:
          'Clean lines, monochrome palette with a single accent colour, and curated focal points for understated elegance.',
      },
    ],
    waPrefill:
      'Hi We Decor! I need birthday decoration in Bangalore. Date: _____. Venue: _____. Theme: _____.',
    faqs: [
      {
        question: 'Can you plan a surprise birthday decoration for my husband or wife?',
        answer:
          'Yes. Share the recipient’s preferences, venue photos, and the access window available before the reveal.',
      },
      {
        question: 'Which kids birthday themes can you decorate?',
        answer:
          'We can discuss character-inspired colours, jungle, space, princess, sports, and other references you share. Final options depend on the venue and materials.',
      },
      {
        question: 'Do you decorate clubhouses and cafes?',
        answer:
          'Yes, subject to venue permission and access. Send the location, photos, and setup rules when you enquire.',
      },
      {
        question: 'How early should birthday décor be set up?',
        answer:
          'This depends on the venue access window and selected installation. We agree the timing before confirmation.',
      },
      {
        question: 'Can I book a simple birthday backdrop on a budget?',
        answer:
          'Yes. Tell us your preferred focal area and budget so we can suggest a practical scope.',
      },
      {
        question: 'Is cleanup included after the event?',
        answer:
          'Removal can be included in the booking scope. Please share the venue’s closing or handover time.',
      },
      {
        question: 'Do you decorate husband or wife birthday surprises at venues?',
        answer:
          'Yes. Share the recipient, preferred colours or theme, and when the surprise should be revealed so we can plan access and timing.',
      },
      {
        question: 'Can kids and adult birthday setups share the same venue?',
        answer:
          'They can, but themes and zones should be planned carefully. Tell us both age groups and which area each needs so the layout stays clear.',
      },
    ],
  },
  'haldi-backdrop-decor': {
    slug: 'haldi-backdrop-decor',
    title: 'Haldi Backdrop and Photo Zone Decoration Bangalore',
    description:
      'Haldi backdrop decoration in Bangalore from ₹3,000 — marigold photo zones, morning installation planning, and post-ceremony removal.',
    serviceType: 'Haldi decoration',
    ogImage: SERVICE_IMAGES.haldi,
    coreServiceId: 'haldi-decoration',
    eyebrow: 'Haldi photo backdrop',
    headline: 'Keep the portraits clear of the ritual splash zone',
    subheadline:
      'A dedicated marigold or yellow backdrop gives families a photo area while turmeric rituals continue nearby.',
    storyTitle: 'Backdrop planning is about placement',
    storyParagraphs: [
      'Before selecting flowers or fabric, decide where guests will enter, where the haldi will happen, and where the photographer needs a clear view. The backdrop can be positioned away from the most active ritual area when the venue has space.',
      'A compact frame suits an apartment or small function room. A lawn or larger venue can support seating, rugs, and a wider family-photo area. We review photos to determine scale, support points, and an appropriate budget.',
      'For morning outdoor ceremonies, access time, shade, weather, and the collection time after the event are part of the planning conversation.',
    ],
    highlights: [
      {
        title: 'Dedicated portrait area',
        description: 'The backdrop can be placed apart from the main ritual zone where possible.',
      },
      {
        title: 'Venue-scaled dimensions',
        description: 'Photos and measurements guide backdrop width and height.',
      },
      {
        title: 'Morning access check',
        description: 'Installation is planned around early ceremony timing and venue entry.',
      },
      {
        title: 'Outdoor suitability',
        description: 'Shade, wind, rain backup, and removal are reviewed for open venues.',
      },
    ],
    gallery: [GALLERY.haldi, GALLERY.wedding, GALLERY.birthday],
    testimonial: {
      quote: 'Our photographer said it was the best haldi backdrop they had shot this season.',
      attribution: 'Haldi · North Bangalore',
    },
    trustSignals: [
      'Venue photos reviewed before quoting',
      'Backdrop placement agreed before setup',
      'Removal timing confirmed',
    ],
    howWeCustomize: [
      {
        title: 'Photo and ritual placement',
        description:
          'We position the backdrop around photographer sightlines and distance from the active haldi zone.',
      },
      {
        title: 'Available wall or open space',
        description:
          'Dimensions, support points, shade, and guest movement determine the backdrop scale.',
      },
      {
        title: 'Haldi visual style',
        description:
          'Marigolds, yellow fabric, pastel florals, and seating details can follow your preferred look.',
      },
      {
        title: 'Family size and budget',
        description:
          'We tailor the width, floral density, and companion seating to the portrait plan and priorities.',
      },
    ],
    popularDecorationOptions: [
      {
        title: 'Traditional marigold frame',
        description: 'A warm, festive photo setting with yellow and orange floral texture.',
      },
      {
        title: 'Pastel portrait wall',
        description: 'A softer floral-and-fabric background for family and couple photographs.',
      },
      {
        title: 'Garden haldi photo zone',
        description: 'A weather-aware outdoor focal point with optional low seating.',
      },
    ],
    suitableVenues: [
      'Apartment function rooms',
      'Private homes',
      'Banquet halls',
      'Lawns and gardens',
      'Rooftop terraces',
    ],
    optionalAddOns: [
      'Portrait seating',
      'Floor rugs',
      'Welcome sign',
      'Flower baskets',
      'Post-ceremony removal',
    ],
    budgetConsiderations: {
      intro:
        'The backdrop quote follows the placement, scale, materials, and site conditions of your haldi.',
      points: [
        {
          title: 'Backdrop dimensions',
          description:
            'Width, height, supporting structure, and the available installation surface affect the build.',
        },
        {
          title: 'Floral treatment',
          description:
            'Fresh marigolds, mixed florals, fabric layers, and density determine material requirements.',
        },
        {
          title: 'Outdoor planning',
          description:
            'Weather protection, anchoring, shade, and early-morning access can affect the installation scope.',
        },
      ],
    },
    bookingProcess: [
      {
        step: 'Send your venue photos',
        detail: 'Share the date, ceremony time, available wall or lawn area, and style references.',
      },
      {
        step: 'Choose the placement',
        detail:
          'We review the ritual zone, photographer position, guest flow, and practical support points.',
      },
      {
        step: 'Confirm the design',
        detail:
          'Your custom quote records the agreed backdrop style, dimensions, and optional seating.',
      },
      {
        step: 'Schedule the install',
        detail: 'Setup and removal timing are aligned with the venue and morning ceremony.',
      },
    ],
    setupTimeline: [
      {
        step: 'Check the site',
        detail: 'Access, weather conditions, and the agreed portrait location are reconfirmed.',
      },
      {
        step: 'Build the backdrop',
        detail:
          'The support, flowers, fabric, and any seating are installed in the planned window.',
      },
      {
        step: 'Prepare for portraits',
        detail: 'The photo area is finished before family arrivals and rituals begin.',
      },
    ],
    waPrefill: 'Hi We Decor! I need a haldi backdrop in Bangalore. Date: _____. Venue size: _____.',
    faqs: [
      {
        question: 'Can the haldi backdrop be away from turmeric stains?',
        answer:
          'Where the venue has space, we can plan a separate photo area away from the main ritual seating. Share a venue layout or photos.',
      },
      {
        question: 'Do you set up haldi backdrops early in the morning?',
        answer:
          'Morning installation depends on venue access and ceremony timing. Confirm both when you enquire.',
      },
      {
        question: 'Can you make a compact backdrop for an apartment?',
        answer:
          'Yes. Send the wall width, room photos, and preferred photo area so we can suggest an appropriate scale.',
      },
      {
        question: 'Do you decorate outdoor haldi photo zones?',
        answer:
          'Yes, subject to weather and site conditions. We discuss shade, wind, securing points, and rain backup beforehand.',
      },
      {
        question: 'Can seating be included with the backdrop?',
        answer:
          'Seating can be scoped alongside the backdrop after reviewing the available area and event flow.',
      },
      {
        question: 'Will the backdrop be removed after the ceremony?',
        answer:
          'Removal can be included in the booking scope. Please tell us when the venue needs the area cleared.',
      },
      {
        question: 'How do you handle turmeric near floral backdrops?',
        answer:
          'We prefer placing portrait backdrops away from the main application area when space allows, and we discuss floor protection options with you beforehand.',
      },
      {
        question: 'What should we send for a weather-aware outdoor backdrop quote?',
        answer:
          'Share open-lawn photos, shade coverage, ceremony start time, and any covered backup area. That helps us propose a practical outdoor or hybrid plan.',
      },
    ],
  },
  'wedding-stage-decor': {
    slug: 'wedding-stage-decor',
    title: 'Wedding Stage and Mandap Decoration Bangalore',
    description:
      'Wedding stage decoration in Bangalore from ₹5,000 — ceremony and reception stages planned around venue sightlines and schedule.',
    serviceType: 'Wedding decoration',
    ogImage: SERVICE_IMAGES.engagement,
    coreServiceId: 'wedding-decoration',
    eyebrow: 'Wedding stage planning',
    headline: 'Give the ceremony and reception their own jobs',
    subheadline:
      'A mandap supports rituals; a reception stage supports greetings and photos. We help you decide whether one setup can do both at your Bangalore venue.',
    storyTitle: 'Mandap or reception stage: decide first',
    storyParagraphs: [
      'For a ceremony, the key questions are ritual seating, priest access, sightlines, and venue rules. For a reception, the focus shifts to couple seating, family photographs, and guest movement. A combined stage may suit some schedules; separate areas may suit others.',
      'Share the hall layout, stage dimensions, dates, and budget. We can focus the spend on a well-defined mandap or reception backdrop, then add entry or aisle details only if they fit the priorities.',
      'We coordinate installation timing with the venue contact. For destination requests, please share the location and logistics; the main service focus remains Bangalore.',
    ],
    highlights: [
      {
        title: 'Ceremony sightlines',
        description: 'Mandap layout considers rituals, seating, and guest viewing angles.',
      },
      {
        title: 'Reception photo needs',
        description: 'Stage dimensions are planned around couple and family photographs.',
      },
      {
        title: 'Budget-led scope',
        description: 'Choose a focused mandap or backdrop before adding supporting décor.',
      },
      {
        title: 'Venue coordination',
        description:
          'Power, loading, installation, and removal timing are confirmed with the venue.',
      },
    ],
    gallery: [GALLERY.wedding, GALLERY.haldi, GALLERY.tent],
    testimonial: {
      quote:
        'The stage looked regal without feeling heavy. Florals were fresh through the reception.',
      attribution: 'Reception · Malleshwaram',
    },
    trustSignals: [
      'Venue dimensions reviewed before quoting',
      'Itemized stage scope',
      'Installation timing coordinated with venue',
    ],
    howWeCustomize: [
      {
        title: 'Ceremony or reception purpose',
        description:
          'We tailor the structure around rituals, couple seating, greetings, and photography requirements.',
      },
      {
        title: 'Stage and hall dimensions',
        description:
          'Existing platforms, ceiling height, sightlines, power, and access guide the build.',
      },
      {
        title: 'Wedding style',
        description:
          'Florals, drapes, lighting, and textures can reflect traditional, contemporary, or understated references.',
      },
      {
        title: 'Guest scale and priorities',
        description: 'The quote focuses on the areas that matter most within your wedding budget.',
      },
    ],
    popularDecorationOptions: [
      {
        title: 'Ritual-forward mandap',
        description:
          'A ceremony setting with thoughtful priest access, seating, and family sightlines.',
      },
      {
        title: 'Floral reception backdrop',
        description: 'A polished couple stage designed for greetings and photographs.',
      },
      {
        title: 'Drape and light stage',
        description: 'Layered textiles and controlled lighting for a warm, elegant hall setting.',
      },
    ],
    suitableVenues: [
      'Wedding halls',
      'Banquet halls',
      'Hotels',
      'Resorts',
      'Community function halls',
      'Private lawns',
    ],
    optionalAddOns: [
      'Couple seating',
      'Aisle styling',
      'Welcome entry',
      'Family portrait area',
      'Stage lighting',
      'Post-event removal',
    ],
    budgetConsiderations: {
      intro:
        'Stage and mandap costs are shaped by the venue, event purpose, materials, and installation requirements.',
      points: [
        {
          title: 'Structure and scale',
          description:
            'Stage dimensions, mandap construction, and floral coverage affect the materials and labour involved.',
        },
        {
          title: 'Visual finish',
          description:
            'Flower varieties, fabric layering, lighting, and custom details determine the finish level.',
        },
        {
          title: 'Venue operations',
          description:
            'Loading, power, timing, and whether ceremony and reception need separate areas affect the scope.',
        },
      ],
    },
    bookingProcess: [
      {
        step: 'Share the event plan',
        detail:
          'Send the date, venue dimensions, ceremony or reception schedule, and style references.',
      },
      {
        step: 'Review the stage',
        detail: 'We assess existing platforms, sightlines, access, power, and guest movement.',
      },
      {
        step: 'Approve your design',
        detail:
          'A custom quote details the selected materials, stage treatment, and supporting areas.',
      },
      {
        step: 'Align with the venue',
        detail:
          'Installation and removal are coordinated with the venue contact and event timeline.',
      },
    ],
    setupTimeline: [
      {
        step: 'Confirm venue readiness',
        detail:
          'Stage access, power, loading, and the function sequence are checked before arrival.',
      },
      {
        step: 'Build the focal setting',
        detail: 'The team installs the mandap or reception stage and agreed supporting décor.',
      },
      {
        step: 'Complete finishing details',
        detail: 'Florals, lighting, and seating are readied before the ceremony or reception.',
      },
      {
        step: 'Coordinate teardown',
        detail: 'Removal follows the event schedule and venue handover requirements.',
      },
    ],
    waPrefill:
      'Hi We Decor! I need wedding stage decor in Bangalore. Event date: _____. Venue: _____.',
    faqs: [
      {
        question: 'What is the difference between wedding stage décor and a mandap?',
        answer:
          'A mandap is planned for the ceremony and rituals, while a reception stage is planned for couple seating, greetings, and photos. They can be separate or combined.',
      },
      {
        question: 'Can you work with a fixed budget for the wedding stage?',
        answer:
          'Yes. Share your budget and whether the ceremony or reception is the priority so we can prepare a focused scope.',
      },
      {
        question: 'Do you coordinate with Bangalore banquet halls?',
        answer:
          'We coordinate practical installation details with the venue contact after the stage design and access window are confirmed.',
      },
      {
        question: 'Can one backdrop serve both ceremony and reception?',
        answer:
          'Sometimes, depending on the schedule, layout, and venue. We review the event flow before recommending this approach.',
      },
      {
        question: 'Do you handle destination wedding stage décor?',
        answer:
          'Our primary focus is Bangalore. Share the destination venue and logistics so we can confirm whether the request is feasible.',
      },
      {
        question: 'What details are needed for a stage décor quote?',
        answer:
          'Please share the date, venue photos or dimensions, ceremony and reception schedule, budget, and preferred materials or references.',
      },
      {
        question: 'Can stage décor stay within a fixed materials budget?',
        answer:
          'Yes. Tell us the ceiling amount and whether florals, drapes, or lighting are the priority so we can adjust density and material choices.',
      },
      {
        question: 'Do you work with the venue’s in-house stage or only a freestanding setup?',
        answer:
          'Either approach can work. Share whether the hall provides a stage platform, backdrop wall, or power points so we plan around what already exists.',
      },
    ],
  },
};

export const DECORATION_SERVICE_PAGES: Record<DecorationServiceSlug, DecorationServicePageConfig> =
  {
    ...LEGACY_DECORATION_SERVICE_PAGES,
    ...HIGH_INTENT_SERVICE_PAGES,
  };

/** Slugs excluded from static generation (birthday has a dedicated route; others are 301-redirected). */
const EXCLUDED_SLUGS = new Set([
  'birthday-decoration',
  'birthday-home-decoration',
  'haldi-backdrop-decor',
  'wedding-stage-decor',
]);

export const DECORATION_SERVICE_SLUGS = Object.keys(DECORATION_SERVICE_PAGES).filter(
  (s) => !EXCLUDED_SLUGS.has(s)
) as DecorationServiceSlug[];

export function getDecorationServicePage(slug: string) {
  const page = DECORATION_SERVICE_PAGES[slug as DecorationServiceSlug] ?? null;
  if (!page) return null;

  // Registry is the source of truth for related-service links (not first-N array order).
  const relatedHrefs = getRelatedServiceHrefsFor(`/services/${slug}`);
  if (!relatedHrefs.length) return page;
  return { ...page, relatedHrefs };
}
