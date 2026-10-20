/**
 * Per-locality copy notes. `description` is used by locations/[slug]
 * generateMetadata; `pageAngle` is an unwired creative angle, not a SERP title.
 *
 * NOTE ON DESCRIPTIONS: these are search snippets, not page copy. The eight
 * localities that actually earn impressions (whitefield, rt-nagar, koramangala,
 * rajajinagar, indiranagar, btm-layout, jayanagar — plus the hub) were rewritten
 * to lead with "Event decorators in X", then carry proof (the live 4.9★ / review count),
 * a price floor and the free-visit offer. The originals were atmospheric prose
 * about load-in timing and waiter paths: accurate, but they gave a searcher at
 * position ~10 no reason to click, and those pages sat at 1.3-2.9% CTR.
 * Keep replacements under ~160 characters or Google truncates them.
 */

export type LocalityPageMeta = { pageAngle: string; description: string };

export const LOCALITY_PAGE_META: Record<string, LocalityPageMeta> = {
  'ashok-nagar': {
    pageAngle: 'Naming-Day Calm for Ashok Nagar Church & Hall Rooms',
    description:
      'Event decorators in Ashok Nagar for naming days, birthdays & receptions at church halls and homes. 4.9★ (81 reviews). From ₹3,000. Free site visit.',
  },
  banashankari: {
    pageAngle: 'One Palette from Banashankari Puja to Night Reception',
    description:
      'Event decorators in Banashankari for puja, engagement & reception décor at BSK halls and homes. 4.9★ from 81 reviews. From ₹3,000. Free site visit.',
  },
  bangalore: {
    pageAngle: 'Separate Installs for Every Bangalore Venue Pin Code',
    description:
      'Event decorators in Bangalore for birthdays, weddings, haldi & engagements — apartments, banquet halls, rooftops. 4.9★ (81 reviews). From ₹3,000. Free visit.',
  },
  'bannerghatta-road': {
    pageAngle: 'Modular Botanicals for Bannerghatta Road Villa Lawns',
    description:
      'Event decorators on Bannerghatta Road for birthdays, weddings & housewarmings at villa lawns and apartments. 4.9★ (81 reviews). From ₹3,000. Free visit.',
  },
  basavanagudi: {
    pageAngle: 'Elder Paths & Soft Golds in Basavanagudi Lunch Halls',
    description:
      'Event decorators in Basavanagudi for weddings, naming days & lunch receptions at temple-side halls. 4.9★ from 81 reviews. From ₹3,000. Free site visit.',
  },
  bellandur: {
    pageAngle: 'Handover-Slot Rooftops for Bellandur Condo Clubhouses',
    description:
      'Event decorators in Bellandur for birthdays, anniversaries & rooftop setups at condo clubhouses. 4.9★ (81 reviews). From ₹3,000, often next day. Free visit.',
  },
  'btm-layout': {
    pageAngle: 'Silk Board Buffers for BTM Layout Rooftop Farewells',
    description:
      'Event decorators in BTM Layout for birthdays, haldi & rooftop setups — flats and halls. 4.9★ from 81 reviews. From ₹3,000, often next day. Free site visit.',
  },
  domlur: {
    pageAngle: 'Corridor-Clear Weeknights for Domlur Office Floors',
    description:
      'Event decorators in Domlur for corporate evenings, birthdays & anniversaries at offices and flats. 4.9★ from 81 reviews. From ₹3,000. Free site visit.',
  },
  'electronic-city': {
    pageAngle: 'Phase Freight Windows for Electronic City Villa Days',
    description:
      'Event decorators in Electronic City for corporate events, birthdays & villa parties. 4.9★ (81 reviews). From ₹3,000, often next day. Free site visit.',
  },
  hebbal: {
    pageAngle: 'Dusk Lighting Plans for Hebbal Lakeside Clubhouses',
    description:
      'Event decorators in Hebbal for baby showers, birthdays & engagements at lakeside clubhouses. 4.9★ from 81 reviews. From ₹3,000. Free site visit.',
  },
  'hsr-layout': {
    pageAngle: 'Apartment-Rule Birthdays on HSR Layout 27th Main Road',
    description:
      'Event decorators in HSR Layout for surprise birthdays, baby showers & balloon décor at clubhouses and flats. 4.9★ (81 reviews). From ₹3,000. Free visit.',
  },
  indiranagar: {
    pageAngle: 'Waiter-Path Centrepieces for Indiranagar Rooftop Nights',
    description:
      'Event decorators in Indiranagar — proposals, anniversaries & engagement styling for rooftops, cafés and homes. 4.9★ (81 reviews). From ₹3,000. Free site visit.',
  },
  jayanagar: {
    pageAngle: 'Home Haldi Echoed into Jayanagar 4th Block Hall Nights',
    description:
      'Event decorators in Jayanagar for haldi, engagement, birthday & wedding décor at homes, halls and community spaces. 4.9★ (81 reviews). From ₹3,000. Free visit.',
  },
  'jp-nagar': {
    pageAngle: 'Shared-Floor Pathways for JP Nagar Family Weekends',
    description:
      'Event decorators in JP Nagar for birthdays, haldi & wedding décor at homes and community halls. 4.9★ from 81 reviews. From ₹3,000. Free site visit.',
  },
  'kanakapura-road': {
    pageAngle: 'Stair-Width Checks Before Kanakapura Road Arches Rise',
    description:
      'Event decorators on Kanakapura Road for housewarmings, birthdays & weddings at apartments and villas. 4.9★ (81 reviews). From ₹3,000. Free site visit.',
  },
  koramangala: {
    pageAngle: 'Café-Safe Anchors for Koramangala Rooftop Photo Sets',
    description:
      'Event decorators in Koramangala for birthdays, engagements & corporate décor — apartments, clubhouses, rooftops. 4.9★ (81 reviews). From ₹3,000. Free visit.',
  },
  malleshwaram: {
    pageAngle: 'Stair-Turning Fabrics for Malleshwaram Temple Weeks',
    description:
      'Event decorators in Malleshwaram for weddings, haldi & naming days at traditional homes and halls. 4.9★ (81 reviews). From ₹3,000. Free site visit.',
  },
  marathahalli: {
    pageAngle: 'Real Lift Minutes Before Marathahalli Balloon Height',
    description:
      'Event decorators in Marathahalli for birthdays, anniversaries & balloon décor at tower clubhouses. 4.9★ from 81 reviews. From ₹3,000. Free site visit.',
  },
  mathikere: {
    pageAngle: 'Student Bright vs Elder Soft Beside Mathikere Lake',
    description:
      'Event decorators in Mathikere for farewells, birthdays & family lunches near the lake and campuses. 4.9★ (81 reviews). From ₹3,000. Free site visit.',
  },
  peenya: {
    pageAngle: 'After-Shift Neutrals for Peenya Workplace Gatherings',
    description:
      'Event decorators in Peenya for workplace events, birthdays & family functions. 4.9★ from 81 reviews. From ₹3,000, often next day. Free site visit.',
  },
  rajajinagar: {
    pageAngle: 'Orion Banquet Tone vs Rajajinagar Apartment Rituals',
    description:
      'Event decorators in Rajajinagar for haldi, engagement, birthday & wedding décor at homes and community halls. 4.9★ from 81 reviews. From ₹3,000. Free visit.',
  },
  'richmond-town': {
    pageAngle: 'Cornice-Kind Florals for Richmond Town Formal Dinners',
    description:
      'Event decorators in Richmond Town for formal dinners, engagements & anniversaries at heritage venues. 4.9★ (81 reviews). From ₹3,000. Free site visit.',
  },
  'rt-nagar': {
    pageAngle: 'RSVP-Growth Seating Plans Across RT Nagar Weekends',
    description:
      'Event decorators in RT Nagar — birthday, engagement, haldi & wedding décor for homes and halls. 4.9★ from 81 reviews. From ₹3,000, often next day. Free visit.',
  },
  sahakarnagar: {
    pageAngle: 'Early-Lamp Pastels for Sahakarnagar Naming Evenings',
    description:
      'Event decorators in Sahakarnagar for naming days, birthdays & home parties in pastel palettes. 4.9★ from 81 reviews. From ₹3,000. Free site visit.',
  },
  'sarjapur-road': {
    pageAngle: 'Twin-Tower Lift Etiquette Along Sarjapur Road Lawns',
    description:
      'Event decorators on Sarjapur Road for birthdays, weddings & lawn parties at gated communities. 4.9★ (81 reviews). From ₹3,000, often next day. Free visit.',
  },
  ulsoor: {
    pageAngle: 'Lake-Breeze Ballast for Ulsoor Banquet Door Openings',
    description:
      'Event decorators in Ulsoor for engagements, receptions & birthdays at lakeside banquet halls. 4.9★ from 81 reviews. From ₹3,000. Free site visit.',
  },
  vijayanagar: {
    pageAngle: 'Garland-to-Stage Clarity Through Vijayanagar Festivals',
    description:
      'Event decorators in Vijayanagar for weddings, haldi & festival receptions at older halls. 4.9★ (81 reviews). From ₹3,000. Free site visit.',
  },
  whitefield: {
    pageAngle: 'Garden Florals or ITPL Lines — Pick the Whitefield Room',
    description:
      'Event decorators in Whitefield for birthdays, weddings & haldi — villas, gated communities, tech-park venues. 4.9★ (81 reviews). From ₹3,000. Free site visit.',
  },
  yelahanka: {
    pageAngle: 'Outdoor Swatches First for Yelahanka Villa Mornings',
    description:
      'Event decorators in Yelahanka for birthdays, baby showers & weddings at villa lawns and clubhouses. 4.9★ (81 reviews). From ₹3,000. Free site visit.',
  },
  yeshwanthpur: {
    pageAngle: 'Festive Hall Reds, Cooler Office Nights in Yeshwanthpur',
    description:
      'Event decorators in Yeshwanthpur for receptions, birthdays & office celebrations near the metro. 4.9★ from 81 reviews. From ₹3,000. Free site visit.',
  },
};

export function getLocalityPageMeta(slug: string): LocalityPageMeta | undefined {
  return LOCALITY_PAGE_META[slug];
}
