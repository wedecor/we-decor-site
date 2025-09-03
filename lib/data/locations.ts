export interface Location {
  slug: string;
  displayName: string;
  nearby: string[];
}

export const locations: Location[] = [
  {
    slug: 'whitefield',
    displayName: 'Whitefield',
    nearby: ['hsr-layout', 'marathahalli', 'bellandur', 'sarjapur-road'],
  },
  {
    slug: 'hsr-layout',
    displayName: 'HSR Layout',
    nearby: ['whitefield', 'koramangala', 'btm-layout', 'bellandur'],
  },
  {
    slug: 'indiranagar',
    displayName: 'Indiranagar',
    nearby: ['koramangala', 'domlur', 'ulsoor', 'richmond-town'],
  },
  {
    slug: 'koramangala',
    displayName: 'Koramangala',
    nearby: ['hsr-layout', 'indiranagar', 'btm-layout', 'domlur'],
  },
  {
    slug: 'jayanagar',
    displayName: 'Jayanagar',
    nearby: ['banashankari', 'basavanagudi', 'jp-nagar', 'btm-layout'],
  },
  {
    slug: 'marathahalli',
    displayName: 'Marathahalli',
    nearby: ['whitefield', 'electronic-city', 'bellandur', 'sarjapur-road'],
  },
  {
    slug: 'electronic-city',
    displayName: 'Electronic City',
    nearby: ['marathahalli', 'btm-layout', 'kanakapura-road', 'bannerghatta-road'],
  },
  {
    slug: 'rt-nagar',
    displayName: 'RT Nagar',
    nearby: ['hebbal', 'malleshwaram', 'yeshwanthpur', 'mathikere'],
  },
  {
    slug: 'hebbal',
    displayName: 'Hebbal',
    nearby: ['rt-nagar', 'yelahanka', 'yeshwanthpur', 'peenya'],
  },
  {
    slug: 'btm-layout',
    displayName: 'BTM Layout',
    nearby: ['hsr-layout', 'koramangala', 'jayanagar', 'electronic-city'],
  },
  {
    slug: 'bellandur',
    displayName: 'Bellandur',
    nearby: ['whitefield', 'hsr-layout', 'marathahalli', 'sarjapur-road'],
  },
  {
    slug: 'sarjapur-road',
    displayName: 'Sarjapur Road',
    nearby: ['whitefield', 'bellandur', 'kanakapura-road', 'bannerghatta-road'],
  },
  {
    slug: 'domlur',
    displayName: 'Domlur',
    nearby: ['indiranagar', 'koramangala', 'ulsoor', 'richmond-town'],
  },
  {
    slug: 'ulsoor',
    displayName: 'Ulsoor',
    nearby: ['indiranagar', 'domlur', 'richmond-town', 'ashok-nagar'],
  },
  {
    slug: 'richmond-town',
    displayName: 'Richmond Town',
    nearby: ['indiranagar', 'domlur', 'ulsoor', 'ashok-nagar'],
  },
  {
    slug: 'ashok-nagar',
    displayName: 'Ashok Nagar',
    nearby: ['ulsoor', 'richmond-town', 'banashankari', 'basavanagudi'],
  },
  {
    slug: 'banashankari',
    displayName: 'Banashankari',
    nearby: ['jayanagar', 'basavanagudi', 'jp-nagar', 'ashok-nagar'],
  },
  {
    slug: 'basavanagudi',
    displayName: 'Basavanagudi',
    nearby: ['jayanagar', 'banashankari', 'jp-nagar', 'ashok-nagar'],
  },
  {
    slug: 'jp-nagar',
    displayName: 'JP Nagar',
    nearby: ['jayanagar', 'banashankari', 'basavanagudi', 'bannerghatta-road'],
  },
  {
    slug: 'bannerghatta-road',
    displayName: 'Bannerghatta Road',
    nearby: ['jp-nagar', 'electronic-city', 'kanakapura-road', 'sarjapur-road'],
  },
  {
    slug: 'kanakapura-road',
    displayName: 'Kanakapura Road',
    nearby: ['electronic-city', 'bannerghatta-road', 'sarjapur-road', 'jp-nagar'],
  },
  {
    slug: 'malleshwaram',
    displayName: 'Malleshwaram',
    nearby: ['rt-nagar', 'rajajinagar', 'yeshwanthpur', 'mathikere'],
  },
  {
    slug: 'rajajinagar',
    displayName: 'Rajajinagar',
    nearby: ['malleshwaram', 'vijayanagar', 'yeshwanthpur', 'rt-nagar'],
  },
  {
    slug: 'vijayanagar',
    displayName: 'Vijayanagar',
    nearby: ['rajajinagar', 'yeshwanthpur', 'peenya', 'nelamangala'],
  },
  {
    slug: 'yelahanka',
    displayName: 'Yelahanka',
    nearby: ['hebbal', 'yeshwanthpur', 'peenya', 'nelamangala'],
  },
  {
    slug: 'sahakarnagar',
    displayName: 'Sahakarnagar',
    nearby: ['mathikere', 'yeshwanthpur', 'peenya', 'nelamangala'],
  },
  {
    slug: 'mathikere',
    displayName: 'Mathikere',
    nearby: ['rt-nagar', 'hebbal', 'sahakarnagar', 'yeshwanthpur'],
  },
  {
    slug: 'yeshwanthpur',
    displayName: 'Yeshwanthpur',
    nearby: [
      'rt-nagar',
      'hebbal',
      'malleshwaram',
      'rajajinagar',
      'vijayanagar',
      'yelahanka',
      'sahakarnagar',
      'mathikere',
      'peenya',
      'nelamangala',
    ],
  },
  {
    slug: 'peenya',
    displayName: 'Peenya',
    nearby: ['hebbal', 'vijayanagar', 'yelahanka', 'sahakarnagar', 'yeshwanthpur', 'nelamangala'],
  },
  {
    slug: 'nelamangala',
    displayName: 'Nelamangala',
    nearby: ['vijayanagar', 'yelahanka', 'sahakarnagar', 'yeshwanthpur', 'peenya'],
  },
];

// Helper function to get location by slug
export const getLocationBySlug = (slug: string): Location | undefined => {
  return locations.find((location) => location.slug === slug);
};

// Helper function to get all location slugs
export const getAllLocationSlugs = (): string[] => {
  return locations.map((location) => location.slug);
};

// Helper function to get random nearby locations
export const getRandomNearbyLocations = (currentLocation: string, count: number = 4): string[] => {
  const location = getLocationBySlug(currentLocation.toLowerCase().replace(/\s+/g, '-'));
  if (!location) return [];

  const nearby = [...location.nearby];
  const randomNearby: string[] = [];

  while (randomNearby.length < count && nearby.length > 0) {
    const randomIndex = Math.floor(Math.random() * nearby.length);
    const randomLocation = nearby.splice(randomIndex, 1)[0];
    randomNearby.push(randomLocation);
  }

  return randomNearby;
};

// Helper function to get display name by slug
export const getDisplayNameBySlug = (slug: string): string => {
  const location = getLocationBySlug(slug);
  return location ? location.displayName : slug;
};
