/** Display order for gallery collection cards (strongest portfolios first). */
export const GALLERY_COLLECTION_ORDER = [
  'birthday',
  'corporate event',
  'engagement',
  'baby shower',
  'haldi',
  'room decor',
  'wedding',
] as const;

// Enhanced gallery interface with location tags
export interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
  tags?: string[];
  locationTags?: string[];
}

// Convert the existing gallery structure to include location tags
const enhancedGallery: Record<string, GalleryImage[]> = {
  'corporate event': [
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045457/we-decor/corporate%20event/8D3A9822.jpg',
      alt: 'Corporate stage backdrop with brand-ready lighting in Bengaluru',
      category: 'corporate event',
      tags: ['corporate', 'event', 'professional'],
      locationTags: ['whitefield', 'electronic-city', 'koramangala', 'indiranagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045455/we-decor/corporate%20event/IMG_20220813_195350.jpg',
      alt: 'Office celebration photo wall with balloons and welcome board',
      category: 'corporate event',
      tags: ['corporate', 'event', 'professional'],
      locationTags: ['whitefield', 'electronic-city', 'koramangala', 'indiranagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045455/we-decor/corporate%20event/IMG_20220813_182017.jpg',
      alt: 'Team milestone décor with clean branded colour palette',
      category: 'corporate event',
      tags: ['corporate', 'event', 'professional'],
      locationTags: ['whitefield', 'electronic-city', 'koramangala', 'indiranagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045453/we-decor/corporate%20event/8D3A9832.jpg',
      alt: 'Conference foyer floral and balloon welcome styling',
      category: 'corporate event',
      tags: ['corporate', 'event', 'professional'],
      locationTags: ['whitefield', 'electronic-city', 'koramangala', 'indiranagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045422/we-decor/corporate%20event/IMG_20230310_125952.jpg',
      alt: 'Corporate evening reception seating and accent décor',
      category: 'corporate event',
      tags: ['corporate', 'event', 'professional'],
      locationTags: ['whitefield', 'electronic-city', 'koramangala', 'indiranagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045421/we-decor/corporate%20event/IMG_20220706_015407.jpg',
      alt: 'Product launch photo corner with custom signage',
      category: 'corporate event',
      tags: ['corporate', 'event', 'professional'],
      locationTags: ['whitefield', 'electronic-city', 'koramangala', 'indiranagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045420/we-decor/corporate%20event/IMG_20221208_165717.jpg',
      alt: 'Office festive celebration arch and stage accents',
      category: 'corporate event',
      tags: ['corporate', 'event', 'professional'],
      locationTags: ['whitefield', 'electronic-city', 'koramangala', 'indiranagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045418/we-decor/corporate%20event/IMG_20230310_125852.jpg',
      alt: 'Corporate town-hall backdrop with soft lighting',
      category: 'corporate event',
      tags: ['corporate', 'event', 'professional'],
      locationTags: ['whitefield', 'electronic-city', 'koramangala', 'indiranagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045404/we-decor/corporate%20event/IMG20230311183341.jpg',
      alt: 'Brand event entrance styling with balloons and florals',
      category: 'corporate event',
      tags: ['corporate', 'event', 'professional'],
      locationTags: ['whitefield', 'electronic-city', 'koramangala', 'indiranagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045395/we-decor/corporate%20event/IMG20220630214506.jpg',
      alt: 'Workplace anniversary celebration décor setup',
      category: 'corporate event',
      tags: ['corporate', 'event', 'professional'],
      locationTags: ['whitefield', 'electronic-city', 'koramangala', 'indiranagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045391/we-decor/corporate%20event/IMG20220623015558.jpg',
      alt: 'Corporate dinner table centrepieces and ambient accents',
      category: 'corporate event',
      tags: ['corporate', 'event', 'professional'],
      locationTags: ['whitefield', 'electronic-city', 'koramangala', 'indiranagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045384/we-decor/corporate%20event/IMG20220623015811.jpg',
      alt: 'Team awards night stage and photo-zone styling',
      category: 'corporate event',
      tags: ['corporate', 'event', 'professional'],
      locationTags: ['whitefield', 'electronic-city', 'koramangala', 'indiranagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045372/we-decor/corporate%20event/IMG20220630210013.jpg',
      alt: 'Office festive celebration décor with warm tones',
      category: 'corporate event',
      tags: ['corporate', 'event', 'professional'],
      locationTags: ['whitefield', 'electronic-city', 'koramangala', 'indiranagar'],
    },
  ],
  engagement: [
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045457/we-decor/engagement/IMG_20220804_111702.jpg',
      alt: 'Engagement stage backdrop with soft florals in Bengaluru',
      category: 'engagement',
      tags: ['engagement', 'romantic', 'celebration'],
      locationTags: ['jayanagar', 'indiranagar', 'koramangala', 'hebbal'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045456/we-decor/engagement/1664888637300.jpg',
      alt: 'Ring ceremony photo corner with fairy lights',
      category: 'engagement',
      tags: ['engagement', 'romantic', 'celebration'],
      locationTags: ['jayanagar', 'indiranagar', 'koramangala', 'hebbal'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045455/we-decor/engagement/IMG_20220804_111849.jpg',
      alt: 'Couple seating décor for an engagement hall',
      category: 'engagement',
      tags: ['engagement', 'romantic', 'celebration'],
      locationTags: ['jayanagar', 'indiranagar', 'koramangala', 'hebbal'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045450/we-decor/engagement/IMG_20220804_111707.jpg',
      alt: 'Floral engagement entrance with marigold accents',
      category: 'engagement',
      tags: ['engagement', 'romantic', 'celebration'],
      locationTags: ['jayanagar', 'indiranagar', 'koramangala', 'hebbal'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045446/we-decor/engagement/1672323160504.jpg',
      alt: 'Intimate engagement backdrop for a home celebration',
      category: 'engagement',
      tags: ['engagement', 'romantic', 'celebration'],
      locationTags: ['jayanagar', 'indiranagar', 'koramangala', 'hebbal'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045440/we-decor/engagement/IMG_20220901_173447.jpg',
      alt: 'Evening engagement décor with warm candle-style lighting',
      category: 'engagement',
      tags: ['engagement', 'romantic', 'celebration'],
      locationTags: ['jayanagar', 'indiranagar', 'koramangala', 'hebbal'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045433/we-decor/engagement/IMG20221225190848.jpg',
      alt: 'Engagement floral frame for couple photographs',
      category: 'engagement',
      tags: ['engagement', 'romantic', 'celebration'],
      locationTags: ['jayanagar', 'indiranagar', 'koramangala', 'hebbal'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045426/we-decor/engagement/IMG_20221208_052732.jpg',
      alt: 'Ring exchange table styling with fresh flowers',
      category: 'engagement',
      tags: ['engagement', 'romantic', 'celebration'],
      locationTags: ['jayanagar', 'indiranagar', 'koramangala', 'hebbal'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045425/we-decor/engagement/IMG_20230223_092722_1.jpg',
      alt: 'Engagement welcome board and balloon accents',
      category: 'engagement',
      tags: ['engagement', 'romantic', 'celebration'],
      locationTags: ['jayanagar', 'indiranagar', 'koramangala', 'hebbal'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045421/we-decor/engagement/IMG_20220821_094856.jpg',
      alt: 'Pastel engagement stage décor for a banquet hall',
      category: 'engagement',
      tags: ['engagement', 'romantic', 'celebration'],
      locationTags: ['jayanagar', 'indiranagar', 'koramangala', 'hebbal'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045405/we-decor/engagement/IMG_20221203_173403.jpg',
      alt: 'Outdoor engagement lawn décor with fabric drapes',
      category: 'engagement',
      tags: ['engagement', 'romantic', 'celebration'],
      locationTags: ['jayanagar', 'indiranagar', 'koramangala', 'hebbal'],
    },
  ],
  birthday: [
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045451/we-decor/birthday/IMG_20230213_181247.jpg',
      alt: 'Colourful birthday balloon backdrop for a Bengaluru home party',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045448/we-decor/birthday/IMG_20230208_191510.jpg',
      alt: 'Kids birthday cake table with themed balloon styling',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045447/we-decor/birthday/IMG_20230130_175936.jpg',
      alt: 'Adult birthday surprise décor with neon name board',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045445/we-decor/birthday/IMG_20221220_175545.jpg',
      alt: 'Clubhouse birthday photo wall with balloon garland',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045443/we-decor/birthday/IMG_20221210_172234.jpg',
      alt: 'Pastel birthday room décor for an apartment celebration',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045441/we-decor/birthday/IMG_20221122_172611.jpg',
      alt: 'Character-themed birthday backdrop and cake plinth',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045439/we-decor/birthday/IMG_20221119_123451.jpg',
      alt: 'Elegant adult birthday floral and balloon setup',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045437/we-decor/birthday/IMG_20221008_190648.jpg',
      alt: 'Terrace birthday décor with string lights and balloons',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045435/we-decor/birthday/IMG_20221001_104927_2.jpg',
      alt: 'First birthday décor with soft pastel balloon clouds',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045433/we-decor/birthday/IMG_20220903_190953.jpg',
      alt: 'Birthday entrance arch with custom welcome signage',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045431/we-decor/birthday/313A0339.JPG',
      alt: 'Living-room birthday photo corner for a compact flat',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045429/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Birthday stage backdrop with LED numbers',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045427/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Outdoor birthday lawn décor with balloon clusters',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045425/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Teen birthday décor with bold colour balloon styling',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045423/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Midnight surprise birthday décor with soft lighting',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045421/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Family birthday celebration backdrop in a community hall',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045419/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Balloon hoop photo frame for a birthday party',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045417/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Birthday dessert table styling with coordinated colours',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045415/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Gender-neutral birthday décor with modern balloon work',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045413/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Bright kids party backdrop with hanging accents',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045411/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Birthday seating area styling with balloon columns',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045409/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Surprise home birthday décor with name lettering',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045407/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Elegant gold-and-white birthday backdrop setup',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045405/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Garden birthday décor with balloons and florals',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045403/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Apartment clubhouse birthday stage and cake table',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045401/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Themed birthday wall décor with props and balloons',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045399/we-decor/birthday/IMG_20220827_202431.jpg',
      alt: 'Minimal modern birthday décor for a small gathering',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045397/we-decor/birthday/IMG20221120193712.jpg',
      alt: 'Festive birthday entrance with balloon clusters',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045397/we-decor/birthday/IMG_20221206_171916.jpg',
      alt: 'Birthday photo booth corner with custom backdrop',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045394/we-decor/birthday/IMG20230112224831.jpg',
      alt: 'Kids party floor seating décor with bright accents',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045389/we-decor/birthday/IMG_20221008_190648.jpg',
      alt: 'Milestone birthday décor with statement balloon piece',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045389/we-decor/birthday/IMG20221120105704.jpg',
      alt: 'Birthday celebration styling for a villa living room',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045384/we-decor/birthday/IMG20220623160109.jpg',
      alt: 'Soft pastel balloon canopy for a birthday brunch',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045378/we-decor/birthday/IMG_20221007201749.jpg',
      alt: 'Bold primary-colour birthday décor for children',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045376/we-decor/birthday/IMG_20221115011744.jpg',
      alt: 'Evening birthday décor with warm ambient lighting',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045376/we-decor/birthday/IMG_20221007170120.jpg',
      alt: 'Birthday gift display table with coordinated styling',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045352/we-decor/birthday/1666968820589.jpg',
      alt: 'Compact birthday wall décor for a 2BHK apartment',
      category: 'birthday',
      tags: ['birthday', 'celebration', 'party'],
      locationTags: ['whitefield', 'koramangala', 'hsr', 'jayanagar', 'rt-nagar'],
    },
  ],
  haldi: [
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045451/we-decor/haldi/1676444453828.jpg',
      alt: 'Traditional haldi ceremony décor with marigold florals',
      category: 'haldi',
      tags: ['haldi', 'traditional', 'wedding', 'ceremony'],
      locationTags: ['jayanagar', 'rt-nagar', 'hebbal', 'basavanagudi'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045436/we-decor/haldi/IMG_20230127_163004.jpg',
      alt: 'Haldi stage seating with yellow and white drapes',
      category: 'haldi',
      tags: ['haldi', 'traditional', 'wedding', 'ceremony'],
      locationTags: ['jayanagar', 'rt-nagar', 'hebbal', 'basavanagudi'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045431/we-decor/haldi/IMG_20221211_093435_1.jpg',
      alt: 'Outdoor morning haldi backdrop with fresh flowers',
      category: 'haldi',
      tags: ['haldi', 'traditional', 'wedding', 'ceremony'],
      locationTags: ['jayanagar', 'rt-nagar', 'hebbal', 'basavanagudi'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045402/we-decor/haldi/IMG20221117185438.jpg',
      alt: 'Haldi photo corner with marigold and foliage accents',
      category: 'haldi',
      tags: ['haldi', 'traditional', 'wedding', 'ceremony'],
      locationTags: ['jayanagar', 'rt-nagar', 'hebbal', 'basavanagudi'],
    },
  ],
  'baby shower': [
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045414/we-decor/baby%20shower/IMG_20220731_111803.jpg',
      alt: 'Soft pastel baby shower backdrop for a home celebration',
      category: 'baby shower',
      tags: ['baby shower', 'celebration', 'family'],
      locationTags: ['whitefield', 'hsr', 'koramangala', 'jayanagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045413/we-decor/baby%20shower/IMG20221030084105.jpg',
      alt: 'Baby shower cake table with balloon clouds',
      category: 'baby shower',
      tags: ['baby shower', 'celebration', 'family'],
      locationTags: ['whitefield', 'hsr', 'koramangala', 'jayanagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045402/we-decor/baby%20shower/IMG_20220731_105025.jpg',
      alt: 'Gender-reveal friendly baby shower photo wall',
      category: 'baby shower',
      tags: ['baby shower', 'celebration', 'family'],
      locationTags: ['whitefield', 'hsr', 'koramangala', 'jayanagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045393/we-decor/baby%20shower/IMG20221030085036.jpg',
      alt: 'Elegant baby shower floral and balloon styling',
      category: 'baby shower',
      tags: ['baby shower', 'celebration', 'family'],
      locationTags: ['whitefield', 'hsr', 'koramangala', 'jayanagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045383/we-decor/baby%20shower/IMG20221030095327_1.jpg',
      alt: 'Baby shower welcome board with pastel décor',
      category: 'baby shower',
      tags: ['baby shower', 'celebration', 'family'],
      locationTags: ['whitefield', 'hsr', 'koramangala', 'jayanagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045363/we-decor/baby%20shower/IMG20221016185451.jpg',
      alt: 'Intimate baby shower seating accents and backdrop',
      category: 'baby shower',
      tags: ['baby shower', 'celebration', 'family'],
      locationTags: ['whitefield', 'hsr', 'koramangala', 'rt-nagar'],
    },
  ],
  'room decor': [
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045381/we-decor/room%20decor/IMG_20250531_163833_1.jpg',
      alt: 'Styled living-room celebration décor with balloons and lights',
      category: 'room decor',
      tags: ['room decor', 'interior', 'decoration'],
      locationTags: ['whitefield', 'hsr', 'koramangala', 'indiranagar', 'jayanagar'],
    },
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045378/we-decor/room%20decor/IMG_20250531_163821_1.jpg',
      alt: 'Intimate indoor room décor with floral table accents',
      category: 'room decor',
      tags: ['room decor', 'interior', 'decoration'],
      locationTags: ['whitefield', 'hsr', 'koramangala', 'indiranagar', 'jayanagar'],
    },
  ],
  wedding: [
    {
      src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045457/we-decor/engagement/IMG_20220804_111702.jpg',
      alt: 'Wedding floral stage styling for a Bengaluru ceremony',
      category: 'wedding',
      tags: ['wedding', 'reception', 'mandap'],
      locationTags: ['whitefield', 'koramangala', 'jayanagar', 'indiranagar'],
    },
  ],
};

// Utility functions
export const getGalleryImages = (): GalleryImage[] => {
  const allImages: GalleryImage[] = [];

  Object.entries(enhancedGallery).forEach(([category, images]) => {
    images.forEach((image) => {
      allImages.push({
        ...image,
        category: category,
      });
    });
  });

  return allImages;
};

export const getImagesByCategory = (category: string): GalleryImage[] => {
  return enhancedGallery[category] || [];
};

export const getImagesByLocation = (locationSlug: string): GalleryImage[] => {
  const allImages = getGalleryImages();
  const locationImages = allImages.filter((image) =>
    image.locationTags?.some((tag) => tag === locationSlug)
  );

  // Fallback: if no images match location, return 3 generic images
  if (locationImages.length === 0) {
    return getGenericImages(3);
  }

  return locationImages;
};

export const getGenericImages = (count: number = 3): GalleryImage[] => {
  const allImages = getGalleryImages();
  const genericImages = allImages.filter(
    (image) =>
      image.tags?.includes('generic') ||
      image.category === 'birthday' ||
      image.category === 'corporate event'
  );

  // Shuffle and return requested count
  const shuffled = genericImages.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getImagesByTags = (tags: string[]): GalleryImage[] => {
  const allImages = getGalleryImages();
  return allImages.filter((image) =>
    tags.some(
      (tag) =>
        image.tags?.includes(tag) || image.category?.toLowerCase().includes(tag.toLowerCase())
    )
  );
};

export default enhancedGallery;
