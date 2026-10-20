import { getImagesByCategory } from '@/utils/gallery';

export interface GalleryItem {
  src: string;
  width: number;
  height: number;
  altBase: string;
  captionBase: string;
  serviceTag?: string;
  category: string;
}

type GalleryMeta = Omit<GalleryItem, 'src' | 'width' | 'height'> & {
  /** Key in utils/gallery.ts enhancedGallery collections */
  collectionKey: string;
};

const GALLERY_META: GalleryMeta[] = [
  {
    collectionKey: 'birthday',
    altBase: 'Birthday balloon arch decoration with fairy lights',
    captionBase: 'Colorful balloon arch with fairy lights — perfect for birthday celebrations',
    serviceTag: 'Birthday',
    category: 'birthday',
  },
  {
    collectionKey: 'haldi',
    altBase: 'Haldi ceremony stage decoration',
    captionBase:
      'Traditional marigold and yellow drapes setup — compact haldi stage with floor protection',
    serviceTag: 'Haldi',
    category: 'haldi',
  },
  {
    collectionKey: 'wedding',
    altBase: 'Wedding mandap decoration',
    captionBase: 'Elegant floral mandap with drapes — timeless wedding ceremony setup',
    serviceTag: 'Wedding',
    category: 'wedding',
  },
  {
    collectionKey: 'corporate event',
    altBase: 'Tent and balloon decoration setup',
    captionBase: 'Outdoor tent with balloon arrangements — weather-proof outdoor event decoration',
    serviceTag: 'Tent Setup',
    category: 'tent',
  },
  {
    collectionKey: 'baby shower',
    altBase: 'Baby shower decoration',
    captionBase: 'Soft pastel baby shower setup — gentle colors for precious moments',
    serviceTag: 'Baby Shower',
    category: 'baby-shower',
  },
  {
    collectionKey: 'engagement',
    altBase: 'Engagement ceremony decoration',
    captionBase: 'Romantic engagement setup with flowers — intimate celebration decoration',
    serviceTag: 'Engagement',
    category: 'engagement',
  },
  {
    collectionKey: 'corporate event',
    altBase: 'Corporate event decoration',
    captionBase: 'Professional corporate event setup — clean and elegant business celebration',
    serviceTag: 'Corporate',
    category: 'corporate',
  },
  {
    collectionKey: 'room decor',
    altBase: 'Home decoration setup',
    captionBase: 'Elegant home interior decoration — transform your living space',
    serviceTag: 'Home Decor',
    category: 'home-decor',
  },
  {
    collectionKey: 'engagement',
    altBase: 'Anniversary decoration with candles',
    captionBase: 'Romantic anniversary setup with candles and subtle florals',
    serviceTag: 'Anniversary',
    category: 'anniversary',
  },
  {
    collectionKey: 'engagement',
    altBase: 'Romantic proposal decoration setup',
    captionBase: 'Dreamy proposal setup with fairy lights and flowers',
    serviceTag: 'Proposal',
    category: 'proposal',
  },
  {
    collectionKey: 'birthday',
    altBase: 'Balloon backdrop decoration',
    captionBase: 'Stunning balloon backdrop for any celebration',
    serviceTag: 'Balloon Decoration',
    category: 'balloon',
  },
  {
    collectionKey: 'engagement',
    altBase: 'Floral arrangement and centerpiece',
    captionBase: 'Beautiful floral arrangements and table centerpieces',
    serviceTag: 'Floral Decoration',
    category: 'floral',
  },
];

function firstImageSrc(collectionKey: string): string {
  const images = getImagesByCategory(collectionKey);
  return images[0]?.src ?? '';
}

export const GALLERY_ITEMS: GalleryItem[] = GALLERY_META.map((meta) => {
  const { collectionKey, ...rest } = meta;
  return {
    src: firstImageSrc(collectionKey),
    width: 1600,
    height: 1066,
    ...rest,
  };
});

/**
 * Returns alt and caption for a gallery item on a locality page.
 *
 * It used to append the area name to both — "Birthday balloon arch … in
 * Koramangala, Bengaluru" — but GALLERY_ITEMS is one shared Cloudinary set
 * rendered on all 30 locality pages. That meant the same photograph claimed
 * to have been shot in thirty different neighbourhoods, and the heading above
 * it said "Recent setups in {area}". Thirty near-identical pages each
 * asserting local provenance for the same images is a doorway-page signal,
 * and these pages are already the ones Google is slowest to index.
 *
 * The copy is now location-neutral and honest: the work is ours, the
 * neighbourhood is not claimed. The locality relevance these pages need comes
 * from the body copy, FAQs and NAP, not from relabelling photographs.
 *
 * If you later have photos genuinely shot in a given area, attach them to
 * that area explicitly rather than reviving this rewrite.
 */
export function localize(media: GalleryItem, _area: { name: string }) {
  return {
    alt: `${media.altBase} by We Decor Events, Bengaluru`,
    caption: media.serviceTag ? `${media.captionBase} (${media.serviceTag})` : media.captionBase,
  };
}
