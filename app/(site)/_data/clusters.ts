export type ClusterKey = 'north' | 'south' | 'east' | 'central' | 'west';

export type Cluster = {
  key: ClusterKey;
  title: string;
  blurb: string;
  /** slugs must exist in AREAS from app/(site)/_data/locations.ts */
  areaSlugs: string[];
  /** smaller localities we serve (no pages), shown as plain text mentions */
  mentions: string[];
};

export const CLUSTERS: Cluster[] = [
  {
    key: 'south',
    title: 'South Bangalore',
    blurb:
      'Family neighbourhoods and banquet halls across South Bengaluru — ideal for birthdays, haldi, weddings and intimate engagements.',
    areaSlugs: [
      'jayanagar',
      'jp-nagar',
      'banashankari',
      'basavanagudi',
      'btm-layout',
      'hsr-layout',
      'sarjapur-road',
      'electronic-city',
      'bannerghatta-road',
      'ashok-nagar'
    ],
    mentions: ['Arekere', 'Gottigere', 'Hulimavu', 'HSR Sector 2–7', 'Kudlu Gate', 'Kasavanahalli']
  },
  {
    key: 'east',
    title: 'East & South-East Bangalore',
    blurb:
      'Villas, gated communities and tech hubs — popular for home events, proposals and corporate decor.',
    areaSlugs: [
      'whitefield',
      'marathahalli',
      'bellandur'
    ],
    mentions: ['KR Puram', 'Varthur', 'Hoodi', 'Seegehalli', 'Kadugodi', 'Panathur', 'Haralur', 'Hosa Road']
  },
  {
    key: 'north',
    title: 'North Bangalore',
    blurb:
      'Lakeside layouts and major business parks — great for baby showers, birthdays and office events.',
    areaSlugs: [
      'hebbal',
      'yelahanka',
      'rt-nagar',
      'sahakarnagar',
      'yeshwanthpur'
    ],
    mentions: ['Jakkur', 'Thanisandra', 'Hennur', 'Babusaheb Palya', 'Kothanur']
  },
  {
    key: 'central',
    title: 'Central & Inner-City Bangalore',
    blurb:
      'Chic restaurants, rooftops and heritage streets — perfect for engagements, proposals and anniversaries.',
    areaSlugs: [
      'indiranagar',
      'ulsoor',
      'richmond-town',
      'koramangala',
      'bangalore', // catch-all city page
      'domlur'
    ],
    mentions: ['Brigade Road', 'Residency Road', 'Shivajinagar', 'HAL 2nd & 3rd Stage']
  },
  {
    key: 'west',
    title: 'West Bangalore',
    blurb:
      'Heritage pockets and large community halls — ideal for traditional functions and corporate townhalls.',
    areaSlugs: ['malleshwaram', 'rajajinagar', 'peenya', 'vijayanagar', 'mathikere', 'kanakapura-road'],
    mentions: ['Basaveshwaranagar', 'Nandini Layout', 'Magadi Road']
  }
]; 