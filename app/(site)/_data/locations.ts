export type Area = {
  slug: string;   // kebab-case URL path, e.g. "koramangala"
  name: string;   // Human-friendly name, e.g. "Koramangala"
  nearbyVenues?: string[];
  popularServices?: string[];
};

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.wedecorevents.com';
export const BUSINESS_NAME = 'We Decor';
export const CITY = 'Bengaluru';
export const STATE = 'KA';
export const COUNTRY = 'IN';
export const PHONE = '+91 8880544452';
export const INSTAGRAM = 'https://www.instagram.com/wedecorbangalore/';

export const AREAS: Area[] = [
  { slug: 'bangalore', name: 'Bangalore' },
  { slug: 'koramangala', name: 'Koramangala' },
  { slug: 'whitefield', name: 'Whitefield' },
  { slug: 'indiranagar', name: 'Indiranagar' },
  { slug: 'jayanagar', name: 'Jayanagar' },
  { slug: 'hsr-layout', name: 'HSR Layout' },
  { slug: 'rt-nagar', name: 'RT Nagar' },
  { slug: 'hebbal', name: 'Hebbal' },
  { slug: 'electronic-city', name: 'Electronic City' },
  { slug: 'btm-layout', name: 'BTM Layout' },
  { slug: 'marathahalli', name: 'Marathahalli' },
  { slug: 'bellandur', name: 'Bellandur' },
  { slug: 'sarjapur-road', name: 'Sarjapur Road' },
  { slug: 'domlur', name: 'Domlur' },
  { slug: 'ulsoor', name: 'Ulsoor' },
  { slug: 'richmond-town', name: 'Richmond Town' },
  { slug: 'ashok-nagar', name: 'Ashok Nagar' },
  { slug: 'banashankari', name: 'Banashankari' },
  { slug: 'basavanagudi', name: 'Basavanagudi' },
  { slug: 'jp-nagar', name: 'J.P. Nagar' },
  { slug: 'bannerghatta-road', name: 'Bannerghatta Road' },
  { slug: 'kanakapura-road', name: 'Kanakapura Road' },
  { slug: 'malleshwaram', name: 'Malleshwaram' },
  { slug: 'rajajinagar', name: 'Rajajinagar' },
  { slug: 'vijayanagar', name: 'Vijayanagar' },
  { slug: 'yelahanka', name: 'Yelahanka' },
  { slug: 'sahakarnagar', name: 'Sahakarnagar' },
  { slug: 'mathikere', name: 'Mathikere' },
  { slug: 'yeshwanthpur', name: 'Yeshwanthpur' },
  { slug: 'peenya', name: 'Peenya' },
  { slug: 'nelamangala', name: 'Nelamangala' }
];

export const getAreaBySlug = (slug: string): Area | undefined => {
  return AREAS.find(area => area.slug === slug);
};

export const getAllAreaSlugs = (): string[] => {
  return AREAS.map(area => area.slug);
}; 