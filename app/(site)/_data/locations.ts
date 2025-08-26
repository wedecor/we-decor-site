/* AUTO-GENERATED: DO NOT EDIT. Edit content/locations/locations.csv and run `npm run locations:sync`. */

export type ServiceKey =
  | 'Birthday'
  | 'Haldi'
  | 'Wedding'
  | 'Engagement'
  | 'Anniversary'
  | 'Proposal'
  | 'Baby Shower'
  | 'Corporate';

export type Area = {
  slug: string;
  name: string;
  vibe?: string;
  landmarks?: string[];
  venueTypes?: string[];
  serviceDescriptions?: Record<ServiceKey, string>;
};

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.wedecorevents.com';
export const BUSINESS_NAME = 'We Decor';
export const CITY = 'Bengaluru';
export const PHONE_DISPLAY = '+91 8880544452';

export const SERVICES: ServiceKey[] = ['Birthday','Haldi','Wedding','Engagement','Anniversary','Proposal','Baby Shower','Corporate'];

type Ctx = { name: string; city: string; landmarks: string[]; venueTypes: string[]; vibe?: string };

const pick = (arr: string[] | undefined, n = 2): string[] => (arr ?? []).slice(0, n);
const joinList = (items: string[]): string => items.length === 0 ? '' : items.length === 1 ? items[0] : `${items[0]} and ${items[1]}`;

const TEMPLATES: Record<ServiceKey, (c: Ctx) => string> = {
  Birthday: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Celebrate birthdays in ${name}, ${city} with stylish balloon arches, fairy lights and photo-ready backdrops. ` +
      `We tailor setups for ${vt}${vt ? ' ' : ''}${lm ? `near ${lm} ` : ''}` +
      `and keep access, power and space in mind. From intimate home parties to chic cafés, We Decor makes it effortless to host and enjoy.`
    );
  },
  Haldi: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      `Bright, traditional haldi decor in ${name}, ${city} with marigolds, haldi-friendly seating and easy cleanup. ` +
      `We build compact, photo-rich stages for ${vt}${vt ? ' ' : ''}${lm ? `around ${lm} ` : ''}` +
      `and coordinate entry, water points and floor protection so families can focus on the rituals.`
    );
  },
  Wedding: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      `Elegant wedding decor in ${name}, ${city}, blending florals, drapes and warm lighting for timeless photos. ` +
      `We adapt mandap and stage designs to ${vt}${vt ? ' ' : ''}${lm ? `near ${lm} ` : ''}` +
      `and manage logistics—vendor timings, load-in and power—so ceremonies run beautifully on schedule.`
    );
  },
  Engagement: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      `Chic engagement setups in ${name}, ${city} with floral arches, pastel palettes and modern signage. ` +
      `Perfect for ${vt}${vt ? ' ' : ''}${lm ? `around ${lm} ` : ''}` +
      `our layouts emphasise couple portraits, ring exchange flow and guest movement for effortless celebrations.`
    );
  },
  Anniversary: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      `Romantic anniversary decor in ${name}, ${city}: candles, subtle florals and cosy lighting for memorable dinners. ` +
      `We style intimate corners across ${vt}${vt ? ' ' : ''}${lm ? `near ${lm} ` : ''}` +
      `and include compact backdrop ideas that photograph beautifully without crowding smaller spaces.`
    );
  },
  Proposal: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      `Dreamy proposal setups in ${name}, ${city} with fairy-lit tents, flowers and custom signage. ` +
      `Designed for discreet arrival and quick reveal, our layouts suit ${vt}${vt ? ' ' : ''}${lm ? `around ${lm} ` : ''}` +
      `so the moment feels private, elegant and perfectly photographed.`
    );
  },
  'Baby Shower': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      `Soft, pastel baby-shower decor in ${name}, ${city} with balloon clouds, welcome boards and photo corners. ` +
      `We plan stroller-friendly layouts for ${vt}${vt ? ' ' : ''}${lm ? `near ${lm} ` : ''}` +
      `and ensure seating, cake table and gifts area are easy to access for guests and family.`
    );
  },
  Corporate: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2)); const vt = joinList(pick(venueTypes, 2));
    return (
      `Crisp corporate decor in ${name}, ${city} for launches, townhalls and team parties. ` +
      `We deliver brand-aligned backdrops and photo walls tailored to ${vt}${vt ? ' ' : ''}${lm ? `around ${lm} ` : ''}` +
      `with clean cabling, quick turnaround and minimal disruption to workspaces.`
    );
  },
};

const buildServiceDescriptions = (a: Area) => {
  const ctx = { name: a.name, city: CITY, landmarks: a.landmarks ?? [], venueTypes: a.venueTypes ?? ['apartments','rooftops'], vibe: a.vibe };
  const out: Record<ServiceKey, string> = {} as Record<ServiceKey, string>;
  for (const s of SERVICES) out[s] = TEMPLATES[s](ctx);
  return out;
};

export const AREAS: Area[] = [
  {
    "slug": "ashok-nagar",
    "name": "Ashok Nagar",
    "vibe": "heritage residential",
    "landmarks": [
      "Ashok Nagar Main Road",
      "Richmond Circle",
      "St Joseph's"
    ],
    "venueTypes": [
      "apartments",
      "community halls",
      "churches"
    ]
  },
  {
    "slug": "banashankari",
    "name": "Banashankari",
    "vibe": "large residential blocks",
    "landmarks": [
      "BSK 2nd Stage",
      "Banashankari Temple",
      "BSK 3rd Stage"
    ],
    "venueTypes": [
      "community halls",
      "apartments",
      "temples"
    ]
  },
  {
    "slug": "bangalore",
    "name": "Bangalore",
    "vibe": "city-wide",
    "landmarks": [
      "MG Road",
      "Cubbon Park",
      "UB City"
    ],
    "venueTypes": [
      "apartments",
      "banquet halls",
      "rooftops",
      "villas"
    ]
  },
  {
    "slug": "bannerghatta-road",
    "name": "Bannerghatta Road",
    "vibe": "green & educational",
    "landmarks": [
      "Bannerghatta National Park",
      "JP Nagar",
      "IIM Bangalore"
    ],
    "venueTypes": [
      "apartments",
      "villas",
      "educational institutions"
    ]
  },
  {
    "slug": "basavanagudi",
    "name": "Basavanagudi",
    "vibe": "classic Bengaluru",
    "landmarks": [
      "Bugle Rock",
      "Gandhi Bazaar",
      "Bull Temple"
    ],
    "venueTypes": [
      "community halls",
      "apartments",
      "temples"
    ]
  },
  {
    "slug": "bellandur",
    "name": "Bellandur",
    "vibe": "lake & IT belt",
    "landmarks": [
      "Bellandur Lake",
      "Ecospace",
      "Bellandur Tech Park"
    ],
    "venueTypes": [
      "apartments",
      "clubhouses",
      "offices",
      "tech parks"
    ]
  },
  {
    "slug": "btm-layout",
    "name": "BTM Layout",
    "vibe": "student & family mix",
    "landmarks": [
      "Silk Board",
      "Mico Layout",
      "BTM Lake"
    ],
    "venueTypes": [
      "apartments",
      "rooftops",
      "community halls"
    ]
  },
  {
    "slug": "domlur",
    "name": "Domlur",
    "vibe": "mixed commercial",
    "landmarks": [
      "Domlur Bridge",
      "Indiranagar Metro",
      "Old Airport Road"
    ],
    "venueTypes": [
      "apartments",
      "offices",
      "restaurants"
    ]
  },
  {
    "slug": "electronic-city",
    "name": "Electronic City",
    "vibe": "tech parks & villas",
    "landmarks": [
      "Infosys Campus",
      "Wipro Gate",
      "Electronic City Metro"
    ],
    "venueTypes": [
      "villas",
      "clubhouses",
      "offices",
      "tech parks"
    ]
  },
  {
    "slug": "hebbal",
    "name": "Hebbal",
    "vibe": "lakeside views",
    "landmarks": [
      "Hebbal Lake",
      "Manyata Flyover",
      "Manyata Tech Park"
    ],
    "venueTypes": [
      "apartments",
      "clubhouses",
      "lakeside venues"
    ]
  },
  {
    "slug": "hsr-layout",
    "name": "HSR Layout",
    "vibe": "new-age homes",
    "landmarks": [
      "27th Main",
      "Agara Lake",
      "HSR Lake"
    ],
    "venueTypes": [
      "apartments",
      "villas",
      "clubhouses"
    ]
  },
  {
    "slug": "indiranagar",
    "name": "Indiranagar",
    "vibe": "trendy restaurants",
    "landmarks": [
      "100 Feet Road",
      "Toit area",
      "CMH Road"
    ],
    "venueTypes": [
      "lounges",
      "rooftops",
      "apartments",
      "restaurants"
    ]
  },
  {
    "slug": "jayanagar",
    "name": "Jayanagar",
    "vibe": "residential hubs",
    "landmarks": [
      "4th Block",
      "JP Nagar junction",
      "Banashankari"
    ],
    "venueTypes": [
      "apartments",
      "community halls",
      "temples"
    ]
  },
  {
    "slug": "jp-nagar",
    "name": "JP Nagar",
    "vibe": "green neighborhoods",
    "landmarks": [
      "Mini Forest",
      "Saraki Signal",
      "JP Nagar Metro"
    ],
    "venueTypes": [
      "apartments",
      "banquet halls",
      "community centers"
    ]
  },
  {
    "slug": "kanakapura-road",
    "name": "Kanakapura Road",
    "vibe": "developing residential",
    "landmarks": [
      "Bannerghatta Road",
      "JP Nagar",
      "Kanakapura Junction"
    ],
    "venueTypes": [
      "apartments",
      "villas",
      "community halls"
    ]
  },
  {
    "slug": "koramangala",
    "name": "Koramangala",
    "vibe": "cafés & rooftops",
    "landmarks": [
      "Forum Mall",
      "NGV Club",
      "Koramangala Club"
    ],
    "venueTypes": [
      "rooftops",
      "apartments",
      "lounges",
      "cafes"
    ]
  },
  {
    "slug": "malleshwaram",
    "name": "Malleshwaram",
    "vibe": "heritage pockets",
    "landmarks": [
      "8th Cross",
      "Sankey Tank",
      "Malleshwaram Metro"
    ],
    "venueTypes": [
      "community halls",
      "apartments",
      "temples"
    ]
  },
  {
    "slug": "marathahalli",
    "name": "Marathahalli",
    "vibe": "IT corridors",
    "landmarks": [
      "Marathahalli Bridge",
      "Innovative Multiplex",
      "Outer Ring Road"
    ],
    "venueTypes": [
      "apartments",
      "clubhouses",
      "tech parks"
    ]
  },
  {
    "slug": "mathikere",
    "name": "Mathikere",
    "vibe": "student area",
    "landmarks": [
      "Yeshwanthpur",
      "Rajajinagar",
      "Mathikere Lake"
    ],
    "venueTypes": [
      "apartments",
      "community halls",
      "educational institutions"
    ]
  },
  {
    "slug": "peenya",
    "name": "Peenya",
    "vibe": "industrial belt",
    "landmarks": [
      "Peenya Industrial Area",
      "Jalahalli",
      "Yeshwanthpur"
    ],
    "venueTypes": [
      "community halls",
      "offices",
      "industrial venues"
    ]
  },
  {
    "slug": "rajajinagar",
    "name": "Rajajinagar",
    "vibe": "old & new mix",
    "landmarks": [
      "Orion Mall",
      "World Trade Center",
      "Rajajinagar Metro"
    ],
    "venueTypes": [
      "banquet halls",
      "apartments",
      "malls"
    ]
  },
  {
    "slug": "richmond-town",
    "name": "Richmond Town",
    "vibe": "colonial charm",
    "landmarks": [
      "Richmond Road",
      "Langford Road",
      "St Mark's Road"
    ],
    "venueTypes": [
      "banquet halls",
      "restaurants",
      "heritage venues"
    ]
  },
  {
    "slug": "rt-nagar",
    "name": "RT Nagar",
    "vibe": "residential sprawl",
    "landmarks": [
      "RT Nagar Main Road",
      "Ganganagar",
      "Hebbal"
    ],
    "venueTypes": [
      "apartments",
      "community halls",
      "temples"
    ]
  },
  {
    "slug": "sahakarnagar",
    "name": "Sahakarnagar",
    "vibe": "quiet residential",
    "landmarks": [
      "Hebbal",
      "RT Nagar",
      "Yelahanka"
    ],
    "venueTypes": [
      "apartments",
      "community halls",
      "temples"
    ]
  },
  {
    "slug": "sarjapur-road",
    "name": "Sarjapur Road",
    "vibe": "new townships",
    "landmarks": [
      "Wipro SEZ",
      "Decathlon",
      "Sarjapur Junction"
    ],
    "venueTypes": [
      "villas",
      "clubhouses",
      "tech parks"
    ]
  },
  {
    "slug": "ulsoor",
    "name": "Ulsoor",
    "vibe": "lakeside & cantonment",
    "landmarks": [
      "Ulsoor Lake",
      "Halasuru",
      "MG Road Metro"
    ],
    "venueTypes": [
      "apartments",
      "banquet halls",
      "lakeside venues"
    ]
  },
  {
    "slug": "vijayanagar",
    "name": "Vijayanagar",
    "vibe": "traditional residential",
    "landmarks": [
      "Vijayanagar Metro",
      "Rajajinagar",
      "Malleshwaram"
    ],
    "venueTypes": [
      "apartments",
      "community halls",
      "temples"
    ]
  },
  {
    "slug": "whitefield",
    "name": "Whitefield",
    "vibe": "villas & tech parks",
    "landmarks": [
      "VR Bengaluru",
      "Phoenix Marketcity",
      "ITPL"
    ],
    "venueTypes": [
      "villas",
      "clubhouses",
      "apartments",
      "tech parks"
    ]
  },
  {
    "slug": "yelahanka",
    "name": "Yelahanka",
    "vibe": "airy layouts",
    "landmarks": [
      "Allalasandra Lake",
      "Yelahanka New Town",
      "Airport Road"
    ],
    "venueTypes": [
      "villas",
      "apartments",
      "lakeside venues"
    ]
  },
  {
    "slug": "yeshwanthpur",
    "name": "Yeshwanthpur",
    "vibe": "industrial residential",
    "landmarks": [
      "Peenya",
      "Rajajinagar",
      "Yeshwanthpur Metro"
    ],
    "venueTypes": [
      "apartments",
      "community halls",
      "industrial areas"
    ]
  }
];

export const AREAS_WITH_DESCRIPTIONS: Area[] = AREAS.map(a => ({ ...a, serviceDescriptions: buildServiceDescriptions(a) }));

// Helper functions
export const getAreaBySlug = (slug: string): Area | undefined => {
  return AREAS.find(area => area.slug === slug);
};

export const getAllAreaSlugs = (): string[] => {
  return AREAS.map(area => area.slug);
};
