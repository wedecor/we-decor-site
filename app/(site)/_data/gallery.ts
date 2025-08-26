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
    src: '/gallery/birthday1.webp',
    width: 1600,
    height: 1066,
    altBase: 'Birthday balloon arch decoration',
    captionBase: 'Colorful balloon arch with fairy lights',
    serviceTag: 'Birthday',
    category: 'birthday'
  },
  {
    src: '/gallery/haldi1.webp',
    width: 1600,
    height: 1066,
    altBase: 'Haldi ceremony stage decoration',
    captionBase: 'Traditional marigold and yellow drapes setup',
    serviceTag: 'Haldi',
    category: 'haldi'
  },
  {
    src: '/gallery/wedding1.webp',
    width: 1600,
    height: 1066,
    altBase: 'Wedding mandap decoration',
    captionBase: 'Elegant floral mandap with drapes',
    serviceTag: 'Wedding',
    category: 'wedding'
  },
  {
    src: '/gallery/tent1.webp',
    width: 1600,
    height: 1066,
    altBase: 'Tent and balloon decoration setup',
    captionBase: 'Outdoor tent with balloon arrangements',
    serviceTag: 'Tent Setup',
    category: 'tent'
  },
  {
    src: '/gallery/baby shower/IMG_20220731_105025.jpg',
    width: 1600,
    height: 1066,
    altBase: 'Baby shower decoration',
    captionBase: 'Soft pastel baby shower setup',
    serviceTag: 'Baby Shower',
    category: 'baby-shower'
  },
  {
    src: '/gallery/engagement/IMG_20220804_111702.jpg',
    width: 1600,
    height: 1066,
    altBase: 'Engagement ceremony decoration',
    captionBase: 'Romantic engagement setup with flowers',
    serviceTag: 'Engagement',
    category: 'engagement'
  },
  {
    src: '/gallery/corporate event/8D3A9822.jpg',
    width: 1600,
    height: 1066,
    altBase: 'Corporate event decoration',
    captionBase: 'Professional corporate event setup',
    serviceTag: 'Corporate',
    category: 'corporate'
  },
  {
    src: '/gallery/home decor/IMG_20220726_180134.jpg',
    width: 1600,
    height: 1066,
    altBase: 'Home decoration setup',
    captionBase: 'Elegant home interior decoration',
    serviceTag: 'Home Decor',
    category: 'home-decor'
  }
];

export function localize(media: GalleryItem, area: { name: string }) {
  return {
    alt: `${media.altBase} in ${area.name}, Bengaluru`,
    caption: `${media.captionBase} — ${area.name} ${media.serviceTag ? '(' + media.serviceTag + ')' : ''}`
  };
} 