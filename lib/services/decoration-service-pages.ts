import { SERVICE_IMAGES } from '@/lib/images';
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

export type DecorationServiceSlug =
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

export type ServiceHighlight = {
  title: string;
  description: string;
};

export type GalleryImage = {
  src: string;
  caption: string;
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
};

export const DECORATION_SERVICE_PAGES: Record<DecorationServiceSlug, DecorationServicePageConfig> =
  {
    'haldi-decoration': {
      slug: 'haldi-decoration',
      title: 'Haldi Decoration in Bangalore',
      description:
        'Marigold haldi decor, yellow-themed backdrops & pre-wedding setups across Bengaluru. We Decor Events — trusted celebration stylists.',
      serviceType: 'Haldi decoration',
      ogImage: SERVICE_IMAGES.haldi,
      coreServiceId: 'haldi-decoration',
      eyebrow: 'Pre-wedding · Bengaluru',
      headline: 'Golden mornings that feel like a celebration',
      subheadline:
        'Marigold, sunshine palettes, and effortless haldi styling for homes, terraces, and venues across Bangalore.',
      storyTitle: 'The haldi should feel intimate — and unforgettable',
      storyParagraphs: [
        'Your haldi is the first chapter guests photograph. We design marigold backdrops, seating accents, and yellow-themed details that photograph beautifully in morning light — without feeling overdone.',
        'From Indiranagar apartments to Whitefield clubhouses, our team arrives early, sets up quietly, and leaves you a space that feels warm, traditional, and distinctly yours.',
      ],
      highlights: [
        {
          title: 'Marigold & floral backdrops',
          description:
            'Layered garlands, frames, and photo-ready walls tailored to your venue size.',
        },
        {
          title: 'Morning-ceremony ready',
          description: 'Fast, tidy setup so rituals begin on time — we handle teardown after.',
        },
        {
          title: 'Home & venue friendly',
          description:
            'Terraces, living rooms, banquet lawns — we adapt to your space and power access.',
        },
        {
          title: 'Custom colour stories',
          description: 'Classic yellow-gold or contemporary fusion palettes to match your outfits.',
        },
      ],
      gallery: [GALLERY.haldi, GALLERY.wedding, GALLERY.birthday],
      testimonial: {
        quote:
          'The marigold backdrop looked stunning in every photo. Setup was calm and finished before our families arrived.',
        attribution: 'Haldi ceremony · South Bangalore',
      },
      trustSignals: ['Bengaluru-wide service', 'Same-week enquiries welcome', 'Transparent quotes'],
      waPrefill:
        "Hi We Decor! I'd like haldi decoration in Bangalore. Date: _____. Venue: _____. Please share themes & pricing.",
    },
    'engagement-decoration': {
      slug: 'engagement-decoration',
      title: 'Engagement Decoration in Bangalore',
      description:
        'Romantic engagement & ring-ceremony decor in Bengaluru — florals, fairy lights, and custom stages. Premium event styling by We Decor Events.',
      serviceType: 'Engagement decoration',
      ogImage: SERVICE_IMAGES.engagement,
      eyebrow: 'Engagement · Ring ceremony',
      headline: 'A first “yes” deserves a beautiful room',
      subheadline:
        'Soft lighting, florals, and refined backdrops for intimate engagements across Bangalore.',
      storyTitle: 'Romance, without the clutter',
      storyParagraphs: [
        'Engagements are personal. We build elegant stages, floral arches, and candlelit corners that feel premium — not like a generic party rental.',
        'Whether it is a rooftop in Koramangala or a banquet in Jayanagar, we coordinate colours, entry decor, and photo spots so your moment looks as good as it feels.',
      ],
      highlights: [
        {
          title: 'Floral arches & stages',
          description: 'Proportionate designs for small gatherings or larger family functions.',
        },
        {
          title: 'Lighting that flatters',
          description: 'Warm fairy lights and accent spots for evening engagements.',
        },
        {
          title: 'Coordinated palette',
          description: 'Drapes, florals, and props aligned with your outfits and invites.',
        },
        {
          title: 'Photo-first layouts',
          description: 'Dedicated zones for couple portraits and family pictures.',
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
      trustSignals: ['Custom mood boards', 'Venue walk-throughs', 'On-time installation'],
      waPrefill:
        "Hi We Decor! I'm planning an engagement in Bangalore. Date: _____. Venue: _____. Theme ideas: _____.",
    },
    'corporate-decoration': {
      slug: 'corporate-decoration',
      title: 'Corporate Event Decoration Bangalore',
      description:
        'Polished corporate event & office celebration decor in Bengaluru — launches, milestones, and team events with brand-aligned styling.',
      serviceType: 'Corporate event decoration',
      ogImage: SERVICE_IMAGES.corporate,
      eyebrow: 'Corporate · Brand events',
      headline: 'Professional celebrations with personality',
      subheadline:
        'Brand-aligned backdrops, stage decor, and office party styling for Bengaluru teams.',
      storyTitle: 'Impress clients and teams — effortlessly',
      storyParagraphs: [
        'Annual days, product launches, and milestone parties deserve more than standard balloon clusters. We translate your brand colours into refined stage decor, entry branding, and photo backdrops.',
        'Tight timelines are normal in corporate calendars. We plan installs around your agenda and leave venues clean for the next workday.',
      ],
      highlights: [
        {
          title: 'Brand-aligned styling',
          description: 'Logos, colours, and messaging integrated tastefully into decor.',
        },
        {
          title: 'Office & hotel venues',
          description: 'Experience with tech parks, hotels, and co-working event spaces.',
        },
        {
          title: 'Rapid turnaround',
          description: 'Structured installs for half-day or evening corporate slots.',
        },
        {
          title: 'Scalable packages',
          description: 'From team lunches to all-hands celebrations — clear pricing upfront.',
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
      trustSignals: ['GST-friendly quotes', 'Dedicated coordinator', 'Bengaluru corporate venues'],
      waPrefill:
        'Hi We Decor! We need corporate event decor in Bangalore. Date: _____. Company/venue: _____.',
      whyChooseUsEyebrow: 'Why businesses choose us',
    },
    'tent-balloon-setup': {
      slug: 'tent-balloon-setup',
      title: 'Tent & Balloon Decoration Bangalore',
      description:
        'Balloon arches, tent styling & outdoor celebration setups in Bengaluru. Premium party decor by We Decor Events.',
      serviceType: 'Balloon decoration',
      ogImage: SERVICE_IMAGES.tentBalloon,
      coreServiceId: 'balloon-decoration',
      eyebrow: 'Outdoor · Balloon decor',
      headline: 'Grand entrances, joyful details',
      subheadline:
        'Balloon arches, tent accents, and outdoor party styling for birthdays and weddings in Bangalore.',
      storyTitle: 'Celebrate outdoors — with structure and style',
      storyParagraphs: [
        'Outdoor events need decor that survives Bengaluru evenings and still photographs beautifully. We design balloon arches, tent dressing, and entrance features that frame your celebration.',
        'From clubhouse lawns to home driveways, we balance colour, scale, and wind-friendly installations so your party feels festive — not chaotic.',
      ],
      highlights: [
        {
          title: 'Statement balloon arches',
          description: 'Organic garlands, classic arches, and themed colourways.',
        },
        {
          title: 'Tent & canopy dressing',
          description: 'Drapes, bunting, and focal points that define the space.',
        },
        {
          title: 'Kid & adult parties',
          description: 'Playful themes or elegant palettes — scaled to your guest list.',
        },
        {
          title: 'Weather-aware installs',
          description: 'Weighted bases and practical layouts for open venues.',
        },
      ],
      gallery: [GALLERY.tent, GALLERY.birthday, GALLERY.wedding],
      testimonial: {
        quote:
          'The balloon arch was the highlight of our lawn party. Team was quick and the colours were perfect.',
        attribution: 'Birthday · HSR Layout',
      },
      trustSignals: ['Outdoor specialists', 'Theme consultations', 'Full setup & teardown'],
      waPrefill:
        'Hi We Decor! I need tent/balloon decor in Bangalore. Date: _____. Outdoor venue: _____.',
    },
    'room-decoration': {
      slug: 'room-decoration',
      title: 'Room Decoration Services Bangalore',
      description:
        'Bridal room, birthday surprise & celebration room decor in Bengaluru — florals, drapes, and ambient lighting.',
      serviceType: 'Room decoration',
      ogImage: SERVICE_IMAGES.roomDecor,
      coreServiceId: 'bridal-room-decoration',
      eyebrow: 'Intimate spaces',
      headline: 'A room transformed before the surprise',
      subheadline:
        'Bridal rooms, birthday surprises, and celebration spaces styled with florals, drapes, and soft light.',
      storyTitle: 'Small spaces, big emotion',
      storyParagraphs: [
        'Some of the most shared moments happen in a bedroom or living room — not on a stage. We style bridal rooms and surprise setups with layered textiles, florals, and lighting that feel cinematic on camera.',
        'Apartment-friendly installs are our specialty. We work with your furniture layout and leave the room feeling luxurious, not cluttered.',
      ],
      highlights: [
        {
          title: 'Bridal room styling',
          description: 'Fresh florals, drapes, and coordinated accents for pre-wedding mornings.',
        },
        {
          title: 'Surprise birthdays',
          description: 'Balloons, cake table focus, and “wow” moments when the door opens.',
        },
        {
          title: 'Ambient lighting',
          description: 'Fairy lights and warm tones that flatter photos and video.',
        },
        {
          title: 'Compact luxury',
          description: 'Designed for Bangalore apartments and villas alike.',
        },
      ],
      gallery: [GALLERY.birthday, GALLERY.wedding, GALLERY.haldi],
      testimonial: {
        quote: 'The bridal room looked like a boutique hotel suite. Every detail felt thoughtful.',
        attribution: 'Bridal room · Jayanagar',
      },
      trustSignals: [
        'Quiet early-morning setup',
        'Pet-friendly materials on request',
        'Custom themes',
      ],
      waPrefill: 'Hi We Decor! I need room decoration in Bangalore. Occasion: _____. Date: _____.',
    },
    'wedding-setup': {
      slug: 'wedding-setup',
      title: 'Wedding Decoration Bangalore',
      description:
        'Complete wedding & reception decor in Bengaluru — mandap, stage, florals & venue styling. We Decor Events.',
      serviceType: 'Wedding decoration',
      ogImage: SERVICE_IMAGES.engagement,
      coreServiceId: 'wedding-decoration',
      eyebrow: 'Wedding · Reception',
      headline: 'Your wedding day, composed beautifully',
      subheadline:
        'Mandap, stage, and reception styling across Bangalore — traditional depth with modern finish.',
      storyTitle: 'Every ritual, one cohesive vision',
      storyParagraphs: [
        'Weddings move fast. We partner with your planner or family coordinator to align mandap, aisle, and reception decor so transitions feel seamless — and photographs stay consistent.',
        'From floral density to draping texture, we help you choose a palette that honours tradition and still feels fresh for Bengaluru celebrations today.',
      ],
      highlights: [
        {
          title: 'Mandap & stage design',
          description: 'Structural decor with florals, fabrics, and lighting coordination.',
        },
        {
          title: 'Reception styling',
          description: 'Entrance, couple stage, and guest-area focal points.',
        },
        {
          title: 'Multi-day weddings',
          description: 'Haldi, sangeet, and reception looks that relate but evolve.',
        },
        {
          title: 'Vendor coordination',
          description: 'We align with photographers and venues on timing and layout.',
        },
      ],
      gallery: [GALLERY.wedding, GALLERY.haldi, GALLERY.tent],
      testimonial: {
        quote:
          'Our mandap and reception felt cohesive and luxurious. The team understood our vision immediately.',
        attribution: 'Wedding · Whitefield',
      },
      trustSignals: [
        'Full wedding packages',
        'Site visits included',
        'Bengaluru banquet experience',
      ],
      waPrefill: "Hi We Decor! We're planning a wedding in Bangalore. Dates: _____. Venues: _____.",
    },
    'birthday-home-decoration': {
      slug: 'birthday-home-decoration',
      title: 'Birthday Home Decoration Bangalore',
      description:
        'At-home birthday party decor in Bengaluru — themed setups, balloons & cake-table styling.',
      serviceType: 'Birthday decoration',
      ogImage: SERVICE_IMAGES.birthday,
      coreServiceId: 'birthday-decoration',
      eyebrow: 'At-home celebrations',
      headline: 'Birthdays that feel personal — at home',
      subheadline:
        'Themed balloon decor, cake tables, and photo corners for apartments and villas in Bangalore.',
      storyTitle: 'Host at home, celebrate in style',
      storyParagraphs: [
        'Home parties should feel curated, not chaotic. We bring themed backdrops, balloon features, and cake-table styling that match your guest list — kids, teens, or adults.',
        'We respect your space: protective layouts, tidy teardown, and installs timed around your surprise plan.',
      ],
      highlights: [
        {
          title: 'Theme-led styling',
          description: 'Character, minimal, or luxe palettes — mood board before install.',
        },
        {
          title: 'Cake table focus',
          description: 'Pedestals, florals, and lighting that centre the celebration moment.',
        },
        {
          title: 'Balloon artistry',
          description: 'Garlands, arches, and ceiling features scaled to room height.',
        },
        {
          title: 'Photo-ready corners',
          description: 'Dedicated spots for portraits and reels.',
        },
      ],
      gallery: [GALLERY.birthday, GALLERY.tent, GALLERY.wedding],
      testimonial: {
        quote:
          'Our living room transformation made my daughter’s day. Setup was quick and spotless after.',
        attribution: 'Kids birthday · Bellandur',
      },
      trustSignals: [
        'Apartment-friendly',
        'Surprise timing coordinated',
        'Theme previews on WhatsApp',
      ],
      waPrefill:
        'Hi We Decor! I need birthday decor at home in Bangalore. Date: _____. Age/theme: _____.',
    },
    'birthday-decoration': {
      slug: 'birthday-decoration',
      title: 'Birthday Decoration Services Bangalore',
      description:
        'Creative birthday party decoration in Bengaluru — themes, balloons, backdrops & venue styling.',
      serviceType: 'Birthday decoration',
      ogImage: BIRTHDAY_HERO_IMAGE,
      coreServiceId: 'birthday-decoration',
      eyebrow: 'Birthdays · All ages',
      headline: 'Another year — celebrated beautifully',
      subheadline:
        'From intimate home parties to clubhouse events, birthday decor that guests remember and share.',
      storyTitle: 'More than balloons — a complete mood',
      storyParagraphs: [
        'Birthdays are about joy and detail. We design cohesive setups: entrance decor, cake table, seating accents, and photo zones that tie together in colour and texture.',
        'Across Bangalore we have styled terrace parties, apartment surprises, and larger clubhouse celebrations — always with a clear plan and calm execution.',
      ],
      highlights: [
        {
          title: 'Curated themes',
          description:
            'Elegant, playful, or minimal — we build around your vision, not a catalogue.',
        },
        {
          title: 'Venue or home',
          description: 'Clubhouses, cafes, terraces, and living rooms.',
        },
        {
          title: 'Cake & gift styling',
          description: 'Tables and backdrops designed for the candle moment.',
        },
        {
          title: 'Stress-free hosting',
          description: 'We install, style, and clear — you greet guests.',
        },
      ],
      gallery: [GALLERY.birthday, GALLERY.tent, GALLERY.haldi],
      testimonial: {
        quote:
          'The theme was cohesive from entrance to cake table. Worth every rupee for how the photos turned out.',
        attribution: 'Adult birthday · Koramangala',
      },
      trustSignals: ['Packages from ₹2,999', 'WhatsApp mood boards', 'Bengaluru-wide'],
      waPrefill:
        'Hi We Decor! I need birthday decoration in Bangalore. Date: _____. Venue: _____. Theme: _____.',
    },
    'haldi-backdrop-decor': {
      slug: 'haldi-backdrop-decor',
      title: 'Haldi Backdrop Decoration Bangalore',
      description:
        'Dedicated haldi backdrop & photo-zone decor in Bengaluru — marigolds, yellow themes, premium finishes.',
      serviceType: 'Haldi decoration',
      ogImage: SERVICE_IMAGES.haldi,
      coreServiceId: 'haldi-decoration',
      eyebrow: 'Photo zones · Haldi',
      headline: 'A backdrop worthy of your first portraits',
      subheadline:
        'Marigold walls, floral frames, and morning-ready haldi photo zones across Bangalore.',
      storyTitle: 'Designed for golden-hour photographs',
      storyParagraphs: [
        'Most haldi memories live in photos. We engineer backdrops with depth, texture, and seating placement so families and photographers capture clean, glowing frames.',
        'Fast installs for early ceremonies — we know Bengaluru traffic and morning timelines, and plan accordingly.',
      ],
      highlights: [
        {
          title: 'Layered marigold walls',
          description: 'Rich florals with clean edges for portrait framing.',
        },
        {
          title: 'Seating integration',
          description: 'Benches, cushions, and rugs that complement the backdrop.',
        },
        {
          title: 'Compact or grand',
          description: 'Scaled for apartments or open lawns.',
        },
        {
          title: 'Photographer-friendly',
          description: 'Heights and widths discussed with your photo team if needed.',
        },
      ],
      gallery: [GALLERY.haldi, GALLERY.wedding, GALLERY.birthday],
      testimonial: {
        quote: 'Our photographer said it was the best haldi backdrop they had shot this season.',
        attribution: 'Haldi · North Bangalore',
      },
      trustSignals: ['Early-morning team', 'Florals refreshed on event day', 'Teardown included'],
      waPrefill:
        'Hi We Decor! I need a haldi backdrop in Bangalore. Date: _____. Venue size: _____.',
    },
    'wedding-stage-decor': {
      slug: 'wedding-stage-decor',
      title: 'Wedding Stage Decoration Bangalore',
      description:
        'Premium wedding stage, mandap & reception backdrop decor in Bengaluru. Luxury floral styling.',
      serviceType: 'Wedding decoration',
      ogImage: SERVICE_IMAGES.engagement,
      coreServiceId: 'wedding-decoration',
      eyebrow: 'Stage · Mandap',
      headline: 'A stage that holds the whole room',
      subheadline:
        'Grand mandaps and reception backdrops with florals, drapes, and lighting harmony.',
      storyTitle: 'Where every guest’s eyes rest',
      storyParagraphs: [
        'The stage anchors your wedding visuals — in person and online. We sculpt mandaps and reception backdrops with proportion, texture, and lighting in mind so the couple remains the focus.',
        'Multi-event weddings benefit from related design languages across haldi, sangeet, and reception stages — we plan the thread across days.',
      ],
      highlights: [
        {
          title: 'Mandap architecture',
          description: 'Traditional pillars, florals, and fabrics with structural stability.',
        },
        {
          title: 'Reception backdrops',
          description: 'Couple stage, parent seating, and floral density to taste.',
        },
        {
          title: 'Lighting collaboration',
          description: 'We coordinate with venue electricians and DJs where required.',
        },
        {
          title: 'Luxury finishes',
          description: 'Premium drapes, fresh florals, and refined colour stories.',
        },
      ],
      gallery: [GALLERY.wedding, GALLERY.haldi, GALLERY.tent],
      testimonial: {
        quote:
          'The stage looked regal without feeling heavy. Florals were fresh through the reception.',
        attribution: 'Reception · Malleshwaram',
      },
      trustSignals: ['Banquet hall experience', '3D layout discussion', 'Premium floral sourcing'],
      waPrefill:
        'Hi We Decor! I need wedding stage decor in Bangalore. Event date: _____. Venue: _____.',
    },
  };

export const DECORATION_SERVICE_SLUGS = Object.keys(DECORATION_SERVICE_PAGES).filter(
  (s) => s !== 'birthday-decoration'
) as DecorationServiceSlug[];

export function getDecorationServicePage(slug: string) {
  return DECORATION_SERVICE_PAGES[slug as DecorationServiceSlug] ?? null;
}
