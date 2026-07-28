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
  // Locality-specific content to reduce duplication
  heroTagline?: string;
  uniqueFAQ?: Array<{ q: string; a: string }>;
  waPrefill?: string;
};

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.wedecorevents.com';
export const BUSINESS_NAME = 'We Decor';
export const CITY = 'Bengaluru';
export const PHONE_DISPLAY = '+91 8880544452';

export const SERVICES: ServiceKey[] = [
  'Birthday',
  'Haldi',
  'Wedding',
  'Engagement',
  'Anniversary',
  'Proposal',
  'Baby Shower',
  'Corporate',
];

type Ctx = { name: string; city: string; landmarks: string[]; venueTypes: string[]; vibe?: string };

const pick = (arr: string[] | undefined, n = 2): string[] => (arr ?? []).slice(0, n);
const joinList = (items: string[]): string =>
  items.length === 0 ? '' : items.length === 1 ? items[0] : `${items[0]} and ${items[1]}`;

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
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Bright, traditional haldi decor in ${name}, ${city} with marigolds, haldi-friendly seating and easy cleanup. ` +
      `We build compact, photo-rich stages for ${vt}${vt ? ' ' : ''}${lm ? `around ${lm} ` : ''}` +
      `and coordinate entry, water points and floor protection so families can focus on the rituals.`
    );
  },
  Wedding: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Elegant wedding decor in ${name}, ${city}, blending florals, drapes and warm lighting for timeless photos. ` +
      `We adapt mandap and stage designs to ${vt}${vt ? ' ' : ''}${lm ? `near ${lm} ` : ''}` +
      `and manage logistics—vendor timings, load-in and power—so ceremonies run beautifully on schedule.`
    );
  },
  Engagement: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Chic engagement setups in ${name}, ${city} with floral arches, pastel palettes and modern signage. ` +
      `Perfect for ${vt}${vt ? ' ' : ''}${lm ? `around ${lm} ` : ''}` +
      `our layouts emphasise couple portraits, ring exchange flow and guest movement for effortless celebrations.`
    );
  },
  Anniversary: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Romantic anniversary decor in ${name}, ${city}: candles, subtle florals and cosy lighting for memorable dinners. ` +
      `We style intimate corners across ${vt}${vt ? ' ' : ''}${lm ? `near ${lm} ` : ''}` +
      `and include compact backdrop ideas that photograph beautifully without crowding smaller spaces.`
    );
  },
  Proposal: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Dreamy proposal setups in ${name}, ${city} with fairy-lit tents, flowers and custom signage. ` +
      `Designed for discreet arrival and quick reveal, our layouts suit ${vt}${vt ? ' ' : ''}${lm ? `around ${lm} ` : ''}` +
      `so the moment feels private, elegant and perfectly photographed.`
    );
  },
  'Baby Shower': ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Soft, pastel baby-shower decor in ${name}, ${city} with balloon clouds, welcome boards and photo corners. ` +
      `We plan stroller-friendly layouts for ${vt}${vt ? ' ' : ''}${lm ? `near ${lm} ` : ''}` +
      `and ensure seating, cake table and gifts area are easy to access for guests and family.`
    );
  },
  Corporate: ({ name, city, landmarks, venueTypes }) => {
    const lm = joinList(pick(landmarks, 2));
    const vt = joinList(pick(venueTypes, 2));
    return (
      `Crisp corporate decor in ${name}, ${city} for launches, townhalls and team parties. ` +
      `We deliver brand-aligned backdrops and photo walls tailored to ${vt}${vt ? ' ' : ''}${lm ? `around ${lm} ` : ''}` +
      `with clean cabling, quick turnaround and minimal disruption to workspaces.`
    );
  },
};

const buildServiceDescriptions = (a: Area) => {
  const ctx = {
    name: a.name,
    city: CITY,
    landmarks: a.landmarks ?? [],
    venueTypes: a.venueTypes ?? ['apartments', 'rooftops'],
    vibe: a.vibe,
  };
  const out: Record<ServiceKey, string> = {} as Record<ServiceKey, string>;
  for (const s of SERVICES) out[s] = TEMPLATES[s](ctx);
  return out;
};

export const AREAS: Area[] = [
  {
    slug: 'ashok-nagar',
    name: 'Ashok Nagar',
    vibe: 'heritage residential',
    landmarks: ['Ashok Nagar Main Road', 'Richmond Circle', "St Joseph's"],
    venueTypes: ['apartments', 'community halls', 'churches'],
  },
  {
    slug: 'banashankari',
    name: 'Banashankari',
    vibe: 'large residential blocks',
    landmarks: ['BSK 2nd Stage', 'Banashankari Temple', 'BSK 3rd Stage'],
    venueTypes: ['community halls', 'apartments', 'temples'],
  },
  {
    slug: 'bangalore',
    name: 'Bangalore',
    vibe: 'city-wide',
    landmarks: ['MG Road', 'Cubbon Park', 'UB City'],
    venueTypes: ['apartments', 'banquet halls', 'rooftops', 'villas'],
  },
  {
    slug: 'bannerghatta-road',
    name: 'Bannerghatta Road',
    vibe: 'green & educational',
    landmarks: ['Bannerghatta National Park', 'JP Nagar', 'IIM Bangalore'],
    venueTypes: ['apartments', 'villas', 'educational institutions'],
  },
  {
    slug: 'basavanagudi',
    name: 'Basavanagudi',
    vibe: 'classic Bengaluru',
    landmarks: ['Bugle Rock', 'Gandhi Bazaar', 'Bull Temple'],
    venueTypes: ['community halls', 'apartments', 'temples'],
  },
  {
    slug: 'bellandur',
    name: 'Bellandur',
    vibe: 'IT lake belt and high-rise community living',
    landmarks: ['Bellandur Lake', 'EcoSpace', 'Embassy TechVillage'],
    venueTypes: ['condo clubhouses', 'apartments', 'rooftops', 'office event spaces'],
    heroTagline: 'Celebrations Styled for Bellandur’s Fast Lane',
    uniqueFAQ: [
      {
        q: 'Can you coordinate access with a Bellandur condo clubhouse?',
        a: 'Yes. Share the clubhouse rules and contact person in advance, and we will plan vendor entry, lift use, loading and setup timing accordingly.',
      },
      {
        q: 'Do you decorate office celebrations near Embassy TechVillage?',
        a: 'Yes. We can create corporate backdrops, team-party décor and branded photo areas while working around your office access and setup window.',
      },
      {
        q: 'How do you plan around Outer Ring Road traffic for a Bellandur event?',
        a: 'We schedule arrival with a buffer, confirm the venue entry route beforehand and recommend a setup slot that avoids peak traffic where possible.',
      },
      {
        q: 'Can a Bellandur apartment birthday setup fit in a compact living room?',
        a: 'Yes. We use wall-led backdrops, compact balloon work and a scaled cake-table layout that keeps circulation comfortable.',
      },
      {
        q: 'What Bellandur venues work for a rooftop proposal?',
        a: 'Private residential rooftops and venue-approved terraces can work well after we confirm weather cover, power access and safety restrictions.',
      },
      {
        q: 'Can you match a corporate event to our brand colours?',
        a: 'Yes. Send your colour references or logo guidance and we will propose coordinated backdrops, balloons, signage and photo elements.',
      },
      {
        q: 'How early should I book a Bellandur clubhouse celebration?',
        a: 'Booking two to three weeks ahead is helpful for popular weekend dates, though we will check availability for nearer dates as well.',
      },
      {
        q: 'Do you provide fresh-flower décor in Bellandur?',
        a: 'Yes. Floral arrangements can be added for engagements, anniversaries, haldi functions and other celebrations, subject to the design and venue conditions.',
      },
    ],
    waPrefill: 'Hi! Bellandur clubhouse/condo celebration — can we discuss a custom setup?',
  },
  {
    slug: 'btm-layout',
    name: 'BTM Layout',
    vibe: 'student & family mix',
    landmarks: ['Silk Board', 'Mico Layout', 'BTM Lake'],
    venueTypes: ['apartments', 'rooftops', 'community halls'],
  },
  {
    slug: 'domlur',
    name: 'Domlur',
    vibe: 'mixed commercial',
    landmarks: ['Domlur Bridge', 'Indiranagar Metro', 'Old Airport Road'],
    venueTypes: ['apartments', 'offices', 'restaurants'],
  },
  {
    slug: 'electronic-city',
    name: 'Electronic City',
    vibe: 'campus-calendar hub with residential villa pockets',
    landmarks: [
      'Electronic City Phase 1',
      'Infosys Campus area',
      'Electronic City Elevated Expressway',
    ],
    venueTypes: ['apartments', 'villas', 'banquet halls', 'corporate event spaces'],
    heroTagline: 'Event Décor Timed to Electronic City',
    uniqueFAQ: [
      {
        q: 'Can you set up before an Electronic City office event starts?',
        a: 'Yes. Once the office approves vendor access, we plan the installation around the available early-entry or low-disruption time window.',
      },
      {
        q: 'Why do you ask for a travel buffer in Electronic City?',
        a: 'Campus access and elevated-expressway traffic can affect arrival, so a buffer helps protect the planned setup and handover time.',
      },
      {
        q: 'Do you decorate both Phase 1 and Phase 2 locations?',
        a: 'Yes. Share the exact building or venue and its access instructions, and we will plan the setup for that location.',
      },
      {
        q: 'Can you style a villa wedding function in Electronic City?',
        a: 'Yes. We can tailor floral, drape and mandap details to the lawn or indoor area after reviewing the space and ceremony needs.',
      },
      {
        q: 'What can you provide for an Infosys Campus-area team celebration?',
        a: 'We can create brand-conscious backdrops, festive photo corners, stage accents and employee celebration décor subject to venue approval.',
      },
      {
        q: 'Are last-minute birthday decorations possible in Electronic City?',
        a: 'They may be possible depending on the date, design complexity, material availability and the venue’s access window.',
      },
      {
        q: 'Can you decorate a banquet hall for a haldi ceremony?',
        a: 'Yes. We can design a haldi-friendly stage, floral or marigold features, seating and a photo area suited to the hall.',
      },
      {
        q: 'Do you need parking information for Electronic City venues?',
        a: 'Yes. Loading and parking details help us bring materials in efficiently and avoid delays at apartment, campus or hall entrances.',
      },
    ],
    waPrefill: 'Hi! Electronic City Phase 1/2 event — need decor planned around campus access.',
  },
  {
    slug: 'hebbal',
    name: 'Hebbal',
    vibe: 'lakeside views',
    landmarks: ['Hebbal Lake', 'Manyata Flyover', 'Manyata Tech Park'],
    venueTypes: ['apartments', 'clubhouses', 'lakeside venues'],
  },
  {
    slug: 'hsr-layout',
    name: 'HSR Layout',
    vibe: 'young-family apartment sectors and clubhouse birthdays',
    landmarks: ['27th Main', 'Agara Lake', 'HSR BDA Complex area'],
    venueTypes: [
      'apartments',
      'clubhouses',
      'community halls',
      'houses',
      'banquet halls',
      'event spaces',
    ],
    heroTagline: 'Thoughtful HSR Layout Decor for Family Moments',
    uniqueFAQ: [
      {
        q: 'Can you design a birthday corner for an HSR Layout apartment without moving furniture?',
        a: 'Usually, yes. Share photos of the room and we can propose a compact wall, window, or dining-area layout.',
      },
      {
        q: 'What information do you need for a clubhouse birthday near 27th Main?',
        a: 'We need the date, setup time, clubhouse size, access rules, theme, guest count, and any restrictions on hanging or adhesives.',
      },
      {
        q: 'Do you provide baby shower decor for homes in HSR sectors?',
        a: 'Yes. We can create a home-friendly baby shower setup with balloons, florals, signage, seating details, and photo props.',
      },
      {
        q: 'Can a society common area be decorated for an engagement?',
        a: 'Yes, provided the society grants approval. We shape the backdrop, seating, and entrance decor around the available common-area space.',
      },
      {
        q: 'Will you match decor to my child’s invitation card?',
        a: 'Yes. Send the invitation or reference image and we can align colors, names, and selected motifs with it.',
      },
      {
        q: 'Can I request a small floral anniversary table in HSR Layout?',
        a: 'Yes. We can arrange a tailored tabletop or dining-area treatment based on the table size and the atmosphere you want.',
      },
      {
        q: 'How do you plan around a community hall’s short access window?',
        a: 'We pre-plan the material list and team tasks, then use the confirmed entry time to install the most visible elements efficiently.',
      },
      {
        q: 'Do you decorate corporate family-day events near Agara Lake?',
        a: 'Yes. We can create branded or family-friendly decor for team gatherings, subject to venue access and event requirements.',
      },
    ],
    waPrefill:
      'Hi! Looking for HSR Layout apartment/clubhouse birthday decor. Sharing details next.',
  },
  {
    slug: 'indiranagar',
    name: 'Indiranagar',
    vibe: 'dining-led evenings and polished residential celebrations',
    landmarks: ['CMH Road', '100 Feet Road', 'Defence Colony side'],
    venueTypes: [
      'restaurants',
      'apartments',
      'residential societies',
      'banquet halls',
      'rooftops',
      'event spaces',
    ],
    heroTagline: 'Indiranagar Evenings, Beautifully Marked',
    uniqueFAQ: [
      {
        q: 'Can you decorate a reserved dinner table on Indiranagar 100 Feet Road?',
        a: 'Yes. We can coordinate a compact table and backdrop treatment with the restaurant, subject to its approval and setup timing.',
      },
      {
        q: 'What suits an evening ring ceremony in Indiranagar?',
        a: 'A refined backdrop, florals, welcome signage, seating accents, and warm lighting details can work well, tailored to the hall or home.',
      },
      {
        q: 'Do you style celebrations in Defence Colony residential societies?',
        a: 'Yes. Share the society venue, access rules, and function timing, and we will plan decor appropriate to the common area or home.',
      },
      {
        q: 'Can you create subtle anniversary decor instead of a large balloon display?',
        a: 'Yes. Floral table styling, candles, a personalized message, and restrained backdrop elements can create a quieter celebration.',
      },
      {
        q: 'How do you work with a restaurant’s existing interior aesthetic?',
        a: 'We review the venue photos and use colors, scale, and materials that complement the setting rather than compete with it.',
      },
      {
        q: 'Can a baby shower setup fit in an Indiranagar apartment?',
        a: 'Yes. We design around the usable wall or living area and can include a backdrop, florals, signage, and small display elements.',
      },
      {
        q: 'Do you offer welcome-board customization for a CMH Road event?',
        a: 'Yes. We can personalize a welcome board with names, occasion details, colors, and selected messaging.',
      },
      {
        q: 'When should I finalize decor for a Saturday evening celebration?',
        a: 'Please enquire as early as practical, particularly if the venue has a narrow access window or you want customized materials.',
      },
    ],
    waPrefill:
      'Hi! Planning an Indiranagar dinner/ring-ceremony setup — need a tailored decor plan.',
  },
  {
    slug: 'jayanagar',
    name: 'Jayanagar',
    vibe: 'traditional neighbourhood celebrations and family rituals',
    landmarks: ['Jayanagar 4th Block', 'South End Circle', 'Jayanagar Shopping Complex'],
    venueTypes: ['community halls', 'family homes', 'banquet halls', 'temple-adjacent venues'],
    heroTagline: 'Thoughtful Décor for Jayanagar Traditions',
    uniqueFAQ: [
      {
        q: 'Can you design décor that suits a traditional Jayanagar family ceremony?',
        a: 'Yes. We can incorporate floral, marigold, drape and stage details that support your rituals, colour preferences and family customs.',
      },
      {
        q: 'Do you decorate community halls around Jayanagar 4th Block?',
        a: 'Yes. Share the hall details and permitted setup hours so we can plan the décor around its entrance, stage and guest areas.',
      },
      {
        q: 'Can you work near temple-adjacent venues in Jayanagar?',
        a: 'Yes, provided the venue permits the décor. We will keep the layout appropriate to the ceremony, access and venue guidelines.',
      },
      {
        q: 'What décor works well for a Jayanagar baby shower?',
        a: 'Pastel balloon clouds, florals, a welcome board, comfortable seating and a gift or cake area can be tailored to the home or hall.',
      },
      {
        q: 'Can you create a floral entry for a South End Circle-area engagement?',
        a: 'Yes. We can design a floral welcome, couple backdrop and coordinated stage elements after reviewing the venue dimensions.',
      },
      {
        q: 'Do you provide a mandap setup for intimate weddings in Jayanagar?',
        a: 'Yes. We can tailor a mandap and surrounding décor to the ritual requirements, guest count, venue footprint and available setup time.',
      },
      {
        q: 'Can family members choose the colours and flowers together?',
        a: 'Absolutely. We use your shared references and preferences to refine the palette, floral choices, backdrop and decorative details.',
      },
      {
        q: 'When should I book décor for a Jayanagar weekend ritual?',
        a: 'Please contact us once the date and venue are known. Early booking gives more time for customization and hall coordination.',
      },
    ],
    waPrefill: 'Hi! Jayanagar traditional/family function — can you help with customized decor?',
  },
  {
    slug: 'jp-nagar',
    name: 'JP Nagar',
    vibe: 'family residential neighbourhood with green gathering spaces',
    landmarks: ['JP Nagar Mini Forest', 'JP Nagar Metro Station', 'Sarakki Signal'],
    venueTypes: ['family homes', 'community halls', 'banquet halls', 'apartments'],
    heroTagline: 'Warm Family Celebrations in JP Nagar',
    uniqueFAQ: [
      {
        q: 'Can you decorate a JP Nagar community hall for an engagement?',
        a: 'Yes. We can plan the entry, couple backdrop, ring-exchange focal point and guest-facing décor around the hall layout.',
      },
      {
        q: 'Do you create traditional haldi décor for JP Nagar families?',
        a: 'Yes. We can use marigold-led styling, comfortable seating, photo elements and practical floor protection for the ritual area.',
      },
      {
        q: 'Can a Mini Forest-area home event have a subtle floral look?',
        a: 'Yes. We can create a light, elegant floral setup that complements an intimate home gathering without making the room feel crowded.',
      },
      {
        q: 'What should I share before you design a JP Nagar birthday backdrop?',
        a: 'Please share the child’s theme or colour preference, a photo of the wall or event area, guest count and your preferred event time.',
      },
      {
        q: 'Do you work with banquet halls near Sarakki Signal?',
        a: 'Yes. Send the hall name and venue contact details so we can confirm access, setup time and the available décor areas.',
      },
      {
        q: 'Can you decorate for a small anniversary dinner at home?',
        a: 'Yes. We can create a compact romantic setup with florals, candles or lights, personalised details and a photo-worthy focal point.',
      },
      {
        q: 'How much setup time is needed for a JP Nagar function hall?',
        a: 'It depends on the design and hall access. We confirm a realistic setup window after reviewing the event scale and venue rules.',
      },
      {
        q: 'Can you add a return-gift display to a baby shower?',
        a: 'Yes. A coordinated return-gift table can be added alongside the backdrop, cake area and welcome signage.',
      },
    ],
    waPrefill: 'Hi! JP Nagar family celebration — need warm custom decor for home/hall.',
  },
  {
    slug: 'kanakapura-road',
    name: 'Kanakapura Road',
    vibe: 'developing residential',
    landmarks: ['Bannerghatta Road', 'JP Nagar', 'Kanakapura Junction'],
    venueTypes: ['apartments', 'villas', 'community halls'],
  },
  {
    slug: 'koramangala',
    name: 'Koramangala',
    vibe: 'rooftop, café, and compact Instagram-ready celebrations',
    landmarks: ['Forum Mall', '80 Feet Road', 'Koramangala Club'],
    venueTypes: ['rooftops', 'cafes', 'apartments', 'banquet halls', 'clubhouses', 'event spaces'],
    heroTagline: 'Koramangala Decor That Owns the Frame',
    uniqueFAQ: [
      {
        q: 'Can you set up a Koramangala café table without disturbing regular service?',
        a: 'Yes. We coordinate the available corner, installation window, and decor footprint with the venue so the setup stays unobtrusive.',
      },
      {
        q: 'How do you handle wind on a rooftop near 80 Feet Road?',
        a: 'We select and secure materials suited to the terrace conditions, then avoid fragile arrangements when the venue is exposed.',
      },
      {
        q: 'Can you create an Instagram-ready backdrop in a compact space?',
        a: 'Yes. Layered backdrops, signage, balloons, florals, and intentional lighting can create a strong photo moment in a small footprint.',
      },
      {
        q: 'Do you decorate late-evening proposal setups in Koramangala?',
        a: 'Yes, when the venue permits access. Share the timing and privacy requirements so we can plan installation and finishing details.',
      },
      {
        q: 'Can a restaurant’s existing furniture be incorporated into the decor?',
        a: 'Yes. We can style around existing tables, chairs, walls, and menus instead of treating the venue as an empty hall.',
      },
      {
        q: 'What can be customized for a Koramangala brand launch?',
        a: 'We can tailor colors, logo placement, backdrops, welcome signage, photo points, and selected props to your launch brief.',
      },
      {
        q: 'Are fresh flowers suitable for a long café evening?',
        a: 'They can be, depending on placement and conditions. We will recommend the right floral treatment for the duration and venue.',
      },
      {
        q: 'Can you plan a small ring ceremony at Koramangala Club?',
        a: 'Yes. We can work from the confirmed room or outdoor area, access rules, guest count, and your preferred engagement style.',
      },
    ],
    waPrefill: 'Hi! Need Koramangala café/rooftop decor for an evening celebration.',
  },
  {
    slug: 'malleshwaram',
    name: 'Malleshwaram',
    vibe: 'heritage pockets',
    landmarks: ['8th Cross', 'Sankey Tank', 'Malleshwaram Metro'],
    venueTypes: ['community halls', 'apartments', 'temples'],
  },
  {
    slug: 'marathahalli',
    name: 'Marathahalli',
    vibe: 'tower-apartment celebrations and ORR team events',
    landmarks: ['Marathahalli Bridge', 'Outer Ring Road', 'Innovative Multiplex area'],
    venueTypes: [
      'apartments',
      'tower apartments',
      'clubhouses',
      'offices',
      'banquet halls',
      'event spaces',
    ],
    heroTagline: 'Marathahalli Decor Planned Around Real Setup Windows',
    uniqueFAQ: [
      {
        q: 'How do you plan setup timing around Outer Ring Road traffic?',
        a: 'We confirm the access window and route in advance, then schedule the team with enough buffer for the venue’s handover time.',
      },
      {
        q: 'Can your team use service lifts in Marathahalli tower apartments?',
        a: 'Yes, where the society permits it. Please share lift rules, material restrictions, and the approved vendor-entry process.',
      },
      {
        q: 'Do you decorate office team events near Marathahalli Bridge?',
        a: 'Yes. We can plan branded backdrops, welcome signage, balloons, and photo points around the office access and event schedule.',
      },
      {
        q: 'What is practical for a clubhouse birthday with a short setup window?',
        a: 'A pre-planned backdrop, balloon installation, cake table, and signage can create a complete look while using the available time well.',
      },
      {
        q: 'Can you make a baby shower setup work in a compact tower apartment?',
        a: 'Yes. We focus on a photo-ready wall or living-room corner and select decor that keeps pathways usable.',
      },
      {
        q: 'Do you need the exact venue address before quoting?',
        a: 'It helps. The address and venue type let us assess access, travel, setup time, and the scale of decor accurately.',
      },
      {
        q: 'Can you add corporate branding to a Marathahalli event backdrop?',
        a: 'Yes. Send the logo and brand direction early so we can plan appropriate printed or styled branding elements.',
      },
      {
        q: 'What happens if my society changes the vendor entry time?',
        a: 'Tell us as soon as possible. We will assess the revised window and adjust the preparation or installation plan where feasible.',
      },
    ],
    waPrefill: 'Hi! Marathahalli event coming up near ORR — need decor timed to our access window.',
  },
  {
    slug: 'mathikere',
    name: 'Mathikere',
    vibe: 'student area',
    landmarks: ['Yeshwanthpur', 'Rajajinagar', 'Mathikere Lake'],
    venueTypes: ['apartments', 'community halls', 'educational institutions'],
  },
  {
    slug: 'peenya',
    name: 'Peenya',
    vibe: 'industrial belt',
    landmarks: ['Peenya Industrial Area', 'Jalahalli', 'Yeshwanthpur'],
    venueTypes: ['community halls', 'offices', 'industrial venues'],
  },
  {
    slug: 'rajajinagar',
    name: 'Rajajinagar',
    vibe: 'old & new mix',
    landmarks: ['Orion Mall', 'World Trade Center', 'Rajajinagar Metro'],
    venueTypes: ['banquet halls', 'apartments', 'malls'],
  },
  {
    slug: 'richmond-town',
    name: 'Richmond Town',
    vibe: 'colonial charm',
    landmarks: ['Richmond Road', 'Langford Road', "St Mark's Road"],
    venueTypes: ['banquet halls', 'restaurants', 'heritage venues'],
  },
  {
    slug: 'rt-nagar',
    name: 'RT Nagar',
    vibe: 'residential sprawl',
    landmarks: ['RT Nagar Main Road', 'Ganganagar', 'Hebbal'],
    venueTypes: ['apartments', 'community halls', 'temples'],
  },
  {
    slug: 'sahakarnagar',
    name: 'Sahakarnagar',
    vibe: 'quiet residential',
    landmarks: ['Hebbal', 'RT Nagar', 'Yelahanka'],
    venueTypes: ['apartments', 'community halls', 'temples'],
  },
  {
    slug: 'sarjapur-road',
    name: 'Sarjapur Road',
    vibe: 'villa-township and gated-society corridor',
    landmarks: ['Wipro SEZ', 'Decathlon Sarjapur', 'Carmelaram'],
    venueTypes: ['villas', 'gated societies', 'clubhouses', 'banquet halls'],
    heroTagline: 'Personalised Décor Along Sarjapur Road',
    uniqueFAQ: [
      {
        q: 'Do you work inside gated societies on Sarjapur Road?',
        a: 'Yes. We can coordinate with the host on gate passes, vendor timing, parking guidance and clubhouse or common-area rules.',
      },
      {
        q: 'Can you decorate a villa lawn near Carmelaram?',
        a: 'Yes. We can design a lawn setup after checking the available surface, power point, weather plan and the event’s guest flow.',
      },
      {
        q: 'What décor suits a Sarjapur Road society clubhouse?',
        a: 'Birthday backdrops, baby-shower themes, engagement stages and festive anniversary styling work well when scaled to the clubhouse layout.',
      },
      {
        q: 'Can you set up a small corporate celebration for a Wipro SEZ-area team?',
        a: 'Yes. We can create professional photo backdrops, branded décor and celebration corners based on the office’s access requirements.',
      },
      {
        q: 'Do you offer custom themes for children’s birthdays in Sarjapur Road villas?',
        a: 'Yes. We tailor colours, character-inspired elements, signage and cake-table décor to the child’s theme and your available space.',
      },
      {
        q: 'How does a society approval affect decoration setup?',
        a: 'It may determine entry timing, drilling restrictions, sound limits and the permitted event area, so sharing it early helps us plan correctly.',
      },
      {
        q: 'Can you include a floral entrance for an engagement banquet?',
        a: 'Yes. We can propose a floral welcome treatment, couple backdrop and coordinated stage décor suited to the hall and ceremony sequence.',
      },
      {
        q: 'When should I confirm a Sarjapur Road weekend event?',
        a: 'Please contact us as soon as the venue is reserved; two to three weeks is useful for fuller customization and weekend coordination.',
      },
    ],
    waPrefill: 'Hi! Sarjapur Road villa/society event — looking for personalized decoration.',
  },
  {
    slug: 'ulsoor',
    name: 'Ulsoor',
    vibe: 'lakeside & cantonment',
    landmarks: ['Ulsoor Lake', 'Halasuru', 'MG Road Metro'],
    venueTypes: ['apartments', 'banquet halls', 'lakeside venues'],
  },
  {
    slug: 'vijayanagar',
    name: 'Vijayanagar',
    vibe: 'traditional residential',
    landmarks: ['Vijayanagar Metro', 'Rajajinagar', 'Malleshwaram'],
    venueTypes: ['apartments', 'community halls', 'temples'],
  },
  {
    slug: 'whitefield',
    name: 'Whitefield',
    vibe: 'villa weekends and tech-park evenings',
    landmarks: ['VR Bengaluru', 'Phoenix Marketcity', 'ITPL'],
    venueTypes: [
      'villas',
      'apartments',
      'gated communities',
      'clubhouses',
      'banquet halls',
      'event spaces',
    ],
    heroTagline: 'Whitefield Celebrations, Styled Around Your Weekend',
    uniqueFAQ: [
      {
        q: 'Can you coordinate a Whitefield clubhouse setup with its security desk?',
        a: 'Yes. Share the clubhouse rules and entry window, and we will plan the team, materials, and arrival timing around them.',
      },
      {
        q: 'Do you decorate villas for weekend celebrations in Whitefield?',
        a: 'Yes. We can style villa lawns, living rooms, poolside corners, and dining areas after understanding the usable space and weather cover.',
      },
      {
        q: 'Can an ITPL team event be set up after office hours?',
        a: 'Yes, subject to office access approval and the available setup window. We tailor the installation plan to the handover time.',
      },
      {
        q: 'What works well for a tower-apartment birthday near Whitefield?',
        a: 'A compact backdrop, balloon styling, cake table, and personalized signage usually create impact without blocking movement in the home.',
      },
      {
        q: 'Can you make a haldi setup look different from a standard yellow backdrop?',
        a: 'Yes. We can use marigolds, fabrics, foliage, seating, and your preferred palette to create a haldi setting suited to the venue.',
      },
      {
        q: 'Do you need a site visit for a gated-community event?',
        a: 'Not always. Venue photos, a walkthrough video, and clubhouse measurements are often enough; we will advise if an in-person check is useful.',
      },
      {
        q: 'How early should I enquire for a Whitefield villa event?',
        a: 'Earlier is helpful for weekend villas and larger functions because access, materials, and team scheduling need coordination.',
      },
      {
        q: 'Can I add a proposal sign and candles to a Whitefield setup?',
        a: 'Yes. Share the venue rules and desired mood, and we can include signage, faux candles, florals, and a photo-ready focal point.',
      },
    ],
    waPrefill:
      'Hi We Decor! Planning a Whitefield villa/clubhouse celebration — can you help with a customized quote?',
  },
  {
    slug: 'yelahanka',
    name: 'Yelahanka',
    vibe: 'airy layouts',
    landmarks: ['Allalasandra Lake', 'Yelahanka New Town', 'Airport Road'],
    venueTypes: ['villas', 'apartments', 'lakeside venues'],
  },
  {
    slug: 'yeshwanthpur',
    name: 'Yeshwanthpur',
    vibe: 'industrial residential',
    landmarks: ['Peenya', 'Rajajinagar', 'Yeshwanthpur Metro'],
    venueTypes: ['apartments', 'community halls', 'industrial areas'],
  },
];

export const AREAS_WITH_DESCRIPTIONS: Area[] = AREAS.map((a) => ({
  ...a,
  serviceDescriptions: buildServiceDescriptions(a),
}));

// Helper functions
// NOTE: looks up from AREAS_WITH_DESCRIPTIONS (not the raw AREAS array) so that
// `serviceDescriptions` — the landmark/venue-injected per-service copy — is
// actually populated. It was previously read from AREAS, which never carries
// that field, so this content silently never rendered anywhere on the site.
export const getAreaBySlug = (slug: string): Area | undefined => {
  return AREAS_WITH_DESCRIPTIONS.find((area) => area.slug === slug);
};

export const getAllAreaSlugs = (): string[] => {
  return AREAS.map((area) => area.slug);
};
