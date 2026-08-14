/**
 * Per-locality copy notes. `description` is used by locations/[slug]
 * generateMetadata; `pageAngle` is an unwired creative angle, not a SERP title.
 */

export type LocalityPageMeta = { pageAngle: string; description: string };

export const LOCALITY_PAGE_META: Record<string, LocalityPageMeta> = {
  'ashok-nagar': {
    pageAngle: 'Naming-Day Calm for Ashok Nagar Church & Hall Rooms',
    description:
      'Ashok Nagar halls and church aisles favour calm florals over spectacle. Time load-in before Richmond Circle jams for naming days and quiet evening.',
  },
  banashankari: {
    pageAngle: 'One Palette from Banashankari Puja to Night Reception',
    description:
      'Near Banashankari Temple, décor often covers morning puja and evening reception together. Balanced colour across BSK halls keeps both halves of the day.',
  },
  bangalore: {
    pageAngle: 'Separate Installs for Every Bangalore Venue Pin Code',
    description:
      'Bangalore weekends jump from apartments to banquet halls and rooftops. Treat every pin as a separate install and keep one colour bridge guests can.',
  },
  'bannerghatta-road': {
    pageAngle: 'Modular Botanicals for Bannerghatta Road Villa Lawns',
    description:
      'Bannerghatta Road mixes villa lawns with apartment podia by campus edges. Botanical florals and modular frames adapt when guest lists expand overnight.',
  },
  basavanagudi: {
    pageAngle: 'Elder Paths & Soft Golds in Basavanagudi Lunch Halls',
    description:
      'Basavanagudi still favours temple-adjacent halls and classic colour for lunches. Soft gold freestanding pieces suit Bugle Rock rooms without crowding.',
  },
  bellandur: {
    pageAngle: 'Handover-Slot Rooftops for Bellandur Condo Clubhouses',
    description:
      'Bellandur clubhouses and EcoSpace offices run on short lift windows. Size rooftop and living-room setups to the real handover slot, not the moodboard.',
  },
  'btm-layout': {
    pageAngle: 'Silk Board Buffers for BTM Layout Rooftop Farewells',
    description:
      'BTM Layout shifts between student rooftops and family halls by Silk Board. Flexible kits survive junction delays better than arches timed to hopeful maps.',
  },
  domlur: {
    pageAngle: 'Corridor-Clear Weeknights for Domlur Office Floors',
    description:
      'Domlur weeknights pair office floors with apartments off Old Airport Road. Keep décor service-aware so corridors stay open for catering and late guests.',
  },
  'electronic-city': {
    pageAngle: 'Phase Freight Windows for Electronic City Villa Days',
    description:
      'Electronic City days split campus events and villa weekends. Lock freight access early so corporate neutrals and garden florals arrive in the same window.',
  },
  hebbal: {
    pageAngle: 'Dusk Lighting Plans for Hebbal Lakeside Clubhouses',
    description:
      'Hebbal clubhouses catch lake breeze that needs weighted bases. Baby showers and birthdays read softer when lighting follows Manyata-side dusk, not noon.',
  },
  'hsr-layout': {
    pageAngle: 'Apartment-Rule Birthdays on HSR Layout 27th Main Road',
    description:
      'HSR Layout clubhouses on 27th Main book out for surprise birthdays. Freestanding balloon frames and clear aisles suit young-family apartment house rules.',
  },
  indiranagar: {
    pageAngle: 'Waiter-Path Centrepieces for Indiranagar Rooftop Nights',
    description:
      'Indiranagar nights lean on rooftop proposals and CMH Road tables. Centrepieces should leave waiter paths clear while still photographing cleanly after.',
  },
  jayanagar: {
    pageAngle: 'Home Haldi Echoed into Jayanagar 4th Block Hall Nights',
    description:
      'Jayanagar families often leave home haldi for a 4th Block hall reception. Echo colour lightly across both rooms so the day feels continuous, not copied.',
  },
  'jp-nagar': {
    pageAngle: 'Shared-Floor Pathways for JP Nagar Family Weekends',
    description:
      'JP Nagar stays warm in Sarakki-side homes and quiet community halls. Pathways matter as much as florals when elders and children share one floor plan.',
  },
  'kanakapura-road': {
    pageAngle: 'Stair-Width Checks Before Kanakapura Road Arches Rise',
    description:
      'Kanakapura Road apartments and villas still settle into weekend rhythm. Measure stair and gate access before housewarming arches or birthday frames arrive.',
  },
  koramangala: {
    pageAngle: 'Café-Safe Anchors for Koramangala Rooftop Photo Sets',
    description:
      'Koramangala rooftops and compact flats need décor that frames photos without blocking café service. Anchored installs fit tight 80 Feet Road teardown.',
  },
  malleshwaram: {
    pageAngle: 'Stair-Turning Fabrics for Malleshwaram Temple Weeks',
    description:
      'Malleshwaram rituals near 8th Cross still open with traditional welcomes. Folded fabric kits turn older stair landings that rigid backdrop boards cannot.',
  },
  marathahalli: {
    pageAngle: 'Real Lift Minutes Before Marathahalli Balloon Height',
    description:
      'Marathahalli towers live by Outer Ring Road freight minutes. Confirm real lift windows before locking balloon height or floral volume for clubhouse nights.',
  },
  mathikere: {
    pageAngle: 'Student Bright vs Elder Soft Beside Mathikere Lake',
    description:
      'Mathikere weekends mix campus farewells with lake-edge family lunches. Bright student accents and softer elder golds share a block when zones stay.',
  },
  peenya: {
    pageAngle: 'After-Shift Neutrals for Peenya Workplace Gatherings',
    description:
      'Peenya workplace gatherings need quick strikes after shift hours. Cooler neutrals suit industrial floors; keep festive reds for family hall segments only.',
  },
  rajajinagar: {
    pageAngle: 'Orion Banquet Tone vs Rajajinagar Apartment Rituals',
    description:
      'Rajajinagar hosts move between Orion-side banquets and older flat rituals. Match mall-contemporary or home-traditional rooms instead of one area.',
  },
  'richmond-town': {
    pageAngle: 'Cornice-Kind Florals for Richmond Town Formal Dinners',
    description:
      'Richmond Town heritage dining rooms reward restraint over loud themes. Florals that complement cornices and formal attire photograph cleaner in compact.',
  },
  'rt-nagar': {
    pageAngle: 'RSVP-Growth Seating Plans Across RT Nagar Weekends',
    description:
      'RT Nagar weekends draw multi-generational lists that grow after first RSVPs. Map elder and kids’ seating before floral stands claim the only clear aisle.',
  },
  sahakarnagar: {
    pageAngle: 'Early-Lamp Pastels for Sahakarnagar Naming Evenings',
    description:
      'Sahakarnagar prefers gentle palettes and early lamps for quiet home parties. Pastel rooms with tidy balloon frames suit naming days without visual clutter.',
  },
  'sarjapur-road': {
    pageAngle: 'Twin-Tower Lift Etiquette Along Sarjapur Road Lawns',
    description:
      'Sarjapur Road gated lawns follow written HOA rules on sound and parking. Check twin tower bookings so shared lifts do not stall two hosts at once.',
  },
  ulsoor: {
    pageAngle: 'Lake-Breeze Ballast for Ulsoor Banquet Door Openings',
    description:
      'Ulsoor evenings pull fabric edges when banquet doors open to lake air. Weighted freestanding pieces and water-inspired blues hold through the breeze.',
  },
  vijayanagar: {
    pageAngle: 'Garland-to-Stage Clarity Through Vijayanagar Festivals',
    description:
      'Vijayanagar festival weeks fill older halls with ritual-first clocks. Soft gold and ivory stay readable from garland to stage without drowning temple cues.',
  },
  whitefield: {
    pageAngle: 'Garden Florals or ITPL Lines — Pick the Whitefield Room',
    description:
      'Whitefield weekends split villa gardens and ITPL rooms with different tones. Choose garden florals or cleaner corporate lines to match the actual venue.',
  },
  yelahanka: {
    pageAngle: 'Outdoor Swatches First for Yelahanka Villa Mornings',
    description:
      'Yelahanka villa lawns pick colour under daylight better than indoor chips. Soft greens hold outdoors while clubhouse kids’ parties still need freestanding.',
  },
  yeshwanthpur: {
    pageAngle: 'Festive Hall Reds, Cooler Office Nights in Yeshwanthpur',
    description:
      'Yeshwanthpur halls and metro-side workplaces share tight evening slots. Festive reds for receptions and cooler neutrals for office nights keep briefs.',
  },
};

export function getLocalityPageMeta(slug: string): LocalityPageMeta | undefined {
  return LOCALITY_PAGE_META[slug];
}
