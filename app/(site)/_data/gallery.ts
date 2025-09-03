export interface GalleryItem {
  src: string;
  width: number;
  height: number;
  altBase: string;
  captionBase: string;
  serviceTag?: string;
  category: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: '/gallery/birthday-balloon-arch-fairylights.webp',
    width: 1600,
    height: 1066,
    altBase: 'Birthday balloon arch decoration with fairy lights',
    captionBase: 'Colorful balloon arch with fairy lights — perfect for birthday celebrations',
    serviceTag: 'Birthday',
    category: 'birthday',
  },
  {
    src: '/gallery/haldi-marigold-stage.webp',
    width: 1600,
    height: 1066,
    altBase: 'Haldi ceremony stage decoration',
    captionBase:
      'Traditional marigold and yellow drapes setup — compact haldi stage with floor protection',
    serviceTag: 'Haldi',
    category: 'haldi',
  },
  {
    src: '/gallery/wedding-mandap-floral.webp',
    width: 1600,
    height: 1066,
    altBase: 'Wedding mandap decoration',
    captionBase: 'Elegant floral mandap with drapes — timeless wedding ceremony setup',
    serviceTag: 'Wedding',
    category: 'wedding',
  },
  {
    src: '/gallery/tent-balloon-outdoor.webp',
    width: 1600,
    height: 1066,
    altBase: 'Tent and balloon decoration setup',
    captionBase: 'Outdoor tent with balloon arrangements — weather-proof outdoor event decoration',
    serviceTag: 'Tent Setup',
    category: 'tent',
  },
  {
    src: '/gallery/baby-shower-pastel-setup.webp',
    width: 1600,
    height: 1066,
    altBase: 'Baby shower decoration',
    captionBase: 'Soft pastel baby shower setup — gentle colors for precious moments',
    serviceTag: 'Baby Shower',
    category: 'baby-shower',
  },
  {
    src: '/gallery/engagement-floral-romantic.webp',
    width: 1600,
    height: 1066,
    altBase: 'Engagement ceremony decoration',
    captionBase: 'Romantic engagement setup with flowers — intimate celebration decoration',
    serviceTag: 'Engagement',
    category: 'engagement',
  },
  {
    src: '/gallery/corporate-event-professional.webp',
    width: 1600,
    height: 1066,
    altBase: 'Corporate event decoration',
    captionBase: 'Professional corporate event setup — clean and elegant business celebration',
    serviceTag: 'Corporate',
    category: 'corporate',
  },
  {
    src: '/gallery/home-decor-interior.webp',
    width: 1600,
    height: 1066,
    altBase: 'Home decoration setup',
    captionBase: 'Elegant home interior decoration — transform your living space',
    serviceTag: 'Home Decor',
    category: 'home-decor',
  },
  {
    src: '/gallery/anniversary-candle-romantic.webp',
    width: 1600,
    height: 1066,
    altBase: 'Anniversary decoration with candles',
    captionBase: 'Romantic anniversary setup with candles and subtle florals',
    serviceTag: 'Anniversary',
    category: 'anniversary',
  },
  {
    src: '/gallery/proposal-fairy-lights.webp',
    width: 1600,
    height: 1066,
    altBase: 'Romantic proposal decoration setup',
    captionBase: 'Dreamy proposal setup with fairy lights and flowers',
    serviceTag: 'Proposal',
    category: 'proposal',
  },
  {
    src: '/gallery/balloon-backdrop-celebration.webp',
    width: 1600,
    height: 1066,
    altBase: 'Balloon backdrop decoration',
    captionBase: 'Stunning balloon backdrop for any celebration',
    serviceTag: 'Balloon Decoration',
    category: 'balloon',
  },
  {
    src: '/gallery/floral-arrangement-centerpiece.webp',
    width: 1600,
    height: 1066,
    altBase: 'Floral arrangement and centerpiece',
    captionBase: 'Beautiful floral arrangements and table centerpieces',
    serviceTag: 'Floral Decoration',
    category: 'floral',
  },
];

export function localize(media: GalleryItem, area: { name: string }) {
  return {
    alt: `${media.altBase} in ${area.name}, Bengaluru`,
    caption: `${media.captionBase} — ${area.name} ${media.serviceTag ? '(' + media.serviceTag + ')' : ''}`,
  };
}
