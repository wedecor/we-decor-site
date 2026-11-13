import { SERVICE_IMAGES } from '@/lib/images';
import type {
  DecorationServicePageConfig,
  HighIntentServiceSlug,
} from '@/lib/services/decoration-service-pages';
import { workForService, workUrl } from '@/app/(site)/_data/work-images';

const CATEGORY_TO_SERVICE: Record<string, string> = {
  engagement: 'engagement-decoration',
  wedding: 'wedding-decoration',
  haldi: 'haldi-decoration',
  birthday: 'birthday-decoration',
  'corporate event': 'corporate-decoration',
  corporate: 'corporate-decoration',
  'baby shower': 'baby-shower-decoration',
  'room decor': 'room-decoration',
  proposal: 'proposal-decoration',
  car: 'car-decoration',
  'naming-ceremony': 'naming-ceremony-decoration',
  reception: 'reception-decoration',
  roka: 'roka-decoration',
  valima: 'valima-decoration',
  mehndi: 'mehndi-decoration',
  'bridal-shower': 'bridal-shower-decoration',
  housewarming: 'housewarming-decoration',
  'baat-pakki': 'baat-pakki-decoration',
  shukrana: 'shukrana-decoration',
};

function img(category: string, index: number, caption: string) {
  const photos = workForService(CATEGORY_TO_SERVICE[category] ?? '');
  const src = photos[index] ? workUrl(photos[index]) : SERVICE_IMAGES.engagement;
  return { src, caption };
}

/**
 * Phase 3 high-intent landing pages — each config is unique (intro, FAQs, themes, pricing).
 * Routed via `/services/[slug]` through DECORATION_SERVICE_PAGES merge.
 */
export const HIGH_INTENT_SERVICE_PAGES: Record<HighIntentServiceSlug, DecorationServicePageConfig> =
  {
    'nikah-decoration': {
      slug: 'nikah-decoration',
      title: 'Nikah, Walima & Shukrana Decoration in Bangalore — From ₹5,000',
      description:
        'Nikah ceremony, grand Walima reception & home Shukrana decor in Bangalore from ₹5,000 — elegant floral stages, parda partitions & couple seating. 4.9★ rated.',
      serviceType: 'Nikah decoration',
      ogImage: SERVICE_IMAGES.engagement,
      eyebrow: 'Nikah · Walima · Shukrana · Bangalore',
      headline: 'Nikah, Walima & Shukrana Stage Decoration in Bangalore',
      subheadline:
        'Dignified ceremony seating, grand Walima reception stages, and serene Shukrana home prayer backdrops—respectful flow and fresh floral framing for homes, halls, and clubhouses in Bangalore.',
      storyTitle: 'Start with the ritual, then frame the room',
      storyParagraphs: [
        'Whether it is an intimate home Nikah, a family Shukrana prayer gathering, or a grand Walima reception, we respect the natural flow of the occasion: family members need clear seating, the ceremony needs unobstructed dignity, and photographers need clean, flattering sightlines.',
        'For a home Nikah or Shukrana, the focus may be a serene floral backdrop, soft low accents, and respectful parda/partition aesthetics. For a Walima banquet, we craft statement couple stages with grand floral arches, ambient chandeliers, and entrance pathways. Your attire, venue layout, and vision guide the palette and scale.',
      ],
      highlights: [
        {
          title: 'Nikah & Walima stage framing',
          description:
            'Proportioned backdrops, statement couple stages, and seating that leave walkway space for family, imam, and photographers.',
        },
        {
          title: 'Shukrana home prayer setups',
          description:
            'Serene prayer focal walls, low brass urli floral centerpieces, and ambient lighting for thanksgiving family meals.',
        },
        {
          title: 'Floral & parda layers',
          description:
            'Fresh roses, jasmine garlands, elegant fabric drapes, and tasteful partition frames tailored to ceremony traditions.',
        },
        {
          title: 'Home, hall & Shadi Mahal adaptable',
          description:
            'Layouts planned for apartment lift access, hall stage dimensions, and society timing rules across all Bangalore localities.',
        },
      ],
      gallery: [
        img('engagement', 0, 'Soft floral nikah-ready stage frame, Bengaluru banquet wing'),
        img('wedding', 0, 'Ivory and rose ceremony backdrop for an intimate Muslim wedding'),
        img('haldi', 1, 'Daytime floral accents adapted for home ceremony light'),
      ],
      testimonial: {
        quote:
          'The stage looked serene and never crowded our living room. Guests thought we had booked a much larger venue team.',
        attribution: 'Nikah · HSR Layout apartment',
      },
      trustSignals: ['Bengaluru-wide installs', 'Mid-week nikah slots', 'Clear material lists'],
      waPrefill:
        'Hi We Decor! I need Nikah / Walima / Shukrana ceremony décor in Bangalore. Event type: _____. Date: _____. Venue type: _____. Guest count: _____.',
      whyChooseUsEyebrow: 'Why families book us for nikah, walima & shukrana',
      whyChoose: [
        {
          title: 'Ritual-first layouts',
          text: 'We leave clear paths for the nikah seating, photographers, and elders — decoration never blocks the ceremony.',
        },
        {
          title: 'Apartment-aware planning',
          text: 'Bengaluru lifts, society noise windows, and parking limits are factored into every install plan.',
        },
        {
          title: 'Palette matched to attire',
          text: 'Whites, soft pastels, or jewel tones — we align florals with sherwanis, lehengas, and jewellery metals.',
        },
      ],
      styles: [
        {
          title: 'Ivory botanical Nikah frame',
          description:
            'White florals, muted greens, and light drapes for a quiet, elegant ceremony.',
        },
        {
          title: 'Grand Walima / Valima reception stage',
          description:
            'Warm ambient lighting, gold metallic accents, and rich floral arches for evening banquet halls.',
        },
        {
          title: 'Shukrana prayer & blessing decor',
          description:
            'Intimate focal backdrop with fresh jasmine strings, brass urlis, and ambient fairy lights.',
        },
        {
          title: 'Minimal modern home styling',
          description:
            'Clean frames, fewer stems, stronger geometry — ideal for compact flats and living rooms.',
        },
      ],
      idealOccasions: [
        'Home nikah ceremony',
        'Islamic wedding & parda setup',
        'Aqd signing table & Rehal setup',
        'Grand Walima & Valima reception stages',
        'Shukrana thanksgiving prayer & dinner',
        'Marriage hall & Shadi Mahal ceremonies',
        'Intimate walima prelude styling',
        'Family-only afternoon nikah',
      ],
      included: [
        'Consultation on palette and stage size',
        'Backdrop / couple seating frame',
        'Fresh floral accents (as quoted)',
        'Lighting support for the focal zone',
        'On-site install and teardown',
        'One named coordinator on the day',
      ],
      howWeCustomize: [
        {
          title: 'Ritual flow first',
          description:
            'We map couple seating, imam access, elder seating and photographer sightlines before designing the focal area.',
        },
        {
          title: 'Venue-led layout',
          description:
            'Home living rooms, clubhouses and marriage halls need different stage widths, access plans and walkway clearances.',
        },
        {
          title: 'Palette from your references',
          description:
            'Attire, invitation colours and family preferences guide the floral, fabric and metallic choices.',
        },
        {
          title: 'Guest-scale planning',
          description:
            'We keep intimate gatherings focused while allowing larger ceremonies to include an entrance or aisle where space permits.',
        },
        {
          title: 'Material choices',
          description:
            'Fresh flowers, greenery, drapes and lighting are selected around the look, event hours and agreed budget.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Couple seating frame',
          description:
            'A proportioned floral or fabric backdrop that keeps the ceremony zone clear.',
        },
        {
          title: 'Entrance welcome',
          description:
            'Restrained floral or draped details that signal the occasion without crowding access.',
        },
        {
          title: 'Aisle and seating accents',
          description: 'Low markers and selected details for a larger hall or lawn ceremony.',
        },
      ],
      suitableVenues: [
        'Apartment living rooms',
        'Community clubhouses',
        'Marriage halls',
        'Private lawns',
        'Hotel banquet rooms',
      ],
      optionalAddOns: [
        'Aqd signing table & Rehal setup',
        'Shadi Mahal stage decoration',
        'Islamic wedding & parda setup',
        'Entrance styling',
        'Aisle markers',
        'Family seating accents',
        'Calligraphy placement for supplied items',
        'Photography lighting support',
      ],
      budgetConsiderations: {
        intro:
          'Every nikah quote is custom, not a one-size-fits-all bundle; we scope the ceremony zones and materials after reviewing the venue and brief.',
        points: [
          {
            title: 'Scale and zones',
            description:
              'A seating-only frame needs a different scope from a hall layout with entrance and aisle details.',
          },
          {
            title: 'Floral and fabric selection',
            description:
              'Fresh-flower density, varieties, drapes and lighting choices materially affect the quote.',
          },
          {
            title: 'Access and setup time',
            description:
              'Lift access, early installation, parking and venue rules shape crew time and logistics.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Share the brief',
          detail:
            'Send the date, venue photos, ceremony time, guest count and areas you want styled.',
        },
        {
          step: 'Review the layout',
          detail: 'We check ritual flow, access, measurements and family preferences.',
        },
        {
          step: 'Confirm the scope',
          detail: 'You receive a tailored design direction, material plan and quote.',
        },
        {
          step: 'Coordinate the day',
          detail: 'We confirm venue entry, setup timing and the named on-day contact.',
        },
      ],
      setupTimeline: [
        {
          step: 'Before the event',
          detail: 'Venue access, layout and material selections are confirmed in advance.',
        },
        {
          step: 'Setup window',
          detail: 'The team installs around the venue’s permitted timing and ceremony schedule.',
        },
        {
          step: 'After the ceremony',
          detail: 'Teardown is completed as agreed with the host and venue.',
        },
      ],
      themes: [
        {
          name: 'Pearl & jasmine',
          description: 'Soft whites with fragrant accents suited to daytime home ceremonies.',
        },
        {
          name: 'Midnight rose',
          description: 'Deeper tones for evening halls with warm uplighting.',
        },
        {
          name: 'Garden courtyard',
          description: 'Greenery-forward looks for outdoor or semi-open Bengaluru venues.',
        },
        {
          name: 'Heritage drape',
          description:
            'Fabric-led frames with restrained florals for traditional family preferences.',
        },
      ],
      areasIntro:
        'Nikah venue access varies by neighbourhood; these are areas where we can review setup requirements.',
      relatedHrefs: [
        '/services/wedding-setup',
        '/services/floral-decoration',
        '/services/engagement-decoration',
        '/services/home-decoration',
      ],
      ctaBody:
        'Send your Nikah, Walima or Shukrana date, venue photos and ceremony timing for a layout-led quote.',
      faqs: [
        {
          question: 'Do you provide decoration for Walima / Valima receptions in Bangalore?',
          answer:
            'Yes. We design and style complete Walima reception stages, grand couple backdrops with fresh roses and orchids, banquet hall entrance arches, head-table florals, and ambient stage lighting across Bangalore marriage halls, Shadi Mahals, and hotel banquets starting from ₹5,000.',
        },
        {
          question: 'Can you decorate our home or apartment for a Shukrana prayer & gathering?',
          answer:
            'Yes. For family Shukrana gatherings, we set up elegant prayer and thanksgiving focal backdrops, brass urli floral centerpieces, dining table floral runners, and warm fairy lights. All home installations use apartment-safe, damage-free mounting without wall drilling.',
        },
        {
          question: 'How do you plan a nikah stage without interrupting the ceremony?',
          answer:
            'We map the couple seating, imam access, elder seating and photographer sightline before choosing the backdrop width. The finished layout keeps the ritual zone clear rather than turning it into a photo set.',
        },
        {
          question: 'Can a nikah setup work in a compact apartment?',
          answer:
            'Yes. A focal wall, low floral details and a narrow seating arrangement can work well in a living room when we review photos, lift access and the available walkway first.',
        },
        {
          question: 'Can you include calligraphy or family-provided religious elements?',
          answer:
            'Yes, provided items can be placed respectfully and away from foot traffic. Send a photo and preferred placement so the styling supports the ceremony without treating sacred items as props.',
        },
        {
          question: 'What is the difference between a value-led and premium nikah décor plan?',
          answer:
            'A value-led plan concentrates materials on the seating frame and a photo-facing floral pocket. Premium plans can add fuller fresh florals, a wider stage treatment, entrance details and lighting coordination after venue review.',
        },
        {
          question: 'Will the colours work with our outfits and invitation?',
          answer:
            'Share attire or invitation references. We suggest palettes that complement white, ivory, jewel-tone or gold looks and explain any flower substitutions before confirmation.',
        },
        {
          question: 'What should we send for an accurate quote?',
          answer:
            'Send the date, venue photos, approximate guest count, ceremony timing and whether you need only the seating area or an entrance and aisle too. That lets us price the right zones instead of guessing.',
        },
      ],
    },

    'balloon-decoration': {
      slug: 'balloon-decoration',
      title: 'Balloon Decoration in Bangalore — Arches & Setups from ₹3,000',
      description:
        'Balloon decoration in Bangalore from ₹3,000 — organic arches, ring backdrops & home or clubhouse party setups. 4.9★ (82 Google reviews). Free quote.',
      serviceType: 'Balloon decoration',
      ogImage: SERVICE_IMAGES.tentBalloon,
      eyebrow: 'Balloon styling · Bangalore',
      headline: 'Balloon Decoration in Bangalore — Arches, Garlands & Backdrops',
      subheadline:
        'Organic balloon arches, double-stuffed pastel garlands, and custom backdrop setups with sturdy freestanding frames and zero drill work.',
      storyTitle: 'Measure the wall before choosing the colours',
      storyParagraphs: [
        'A balloon setup looks best when its proportions suit the room. We check the usable wall, ceiling height, lift access and whether the venue permits fixtures before recommending an arch, garland or freestanding photo zone.',
        'A child’s party can be bright and character-led; an adult milestone may call for muted mattes or chrome accents. Send the cake, outfit or invitation reference and we will build the palette around it.',
      ],
      highlights: [
        {
          title: 'Organic garlands & arches',
          description: 'Mixed balloon sizes with intentional negative space for modern photos.',
        },
        {
          title: 'Chrome & matte mixes',
          description:
            'Fashion-led palettes — champagne, sage, blush — beyond primary colours only.',
        },
        {
          title: 'Kids & adult themes',
          description: 'Cartoon characters when requested, or refined adult styles for milestones.',
        },
        {
          title: 'Tent-friendly builds',
          description: 'Compatible with outdoor tents and lawns when weather windows allow.',
        },
      ],
      gallery: [
        img('birthday', 1, 'Organic balloon garland for a home birthday, Bengaluru'),
        img('birthday', 2, 'Entrance balloon arch styled for apartment lobby height'),
        img('corporate event', 0, 'Brand-colour balloon accents for a city corporate gathering'),
      ],
      testimonial: {
        quote:
          'The arch stayed perfect for four hours under clubhouse AC. Colour match to our cake board was exact.',
        attribution: '7th birthday · Indiranagar',
      },
      trustSignals: ['Same-week balloon installs', 'Helium optional', 'Theme colour matching'],
      waPrefill:
        'Hi We Decor! I need balloon styling in Bangalore. Occasion: _____. Date: _____. Venue and ceiling height: _____. Colour reference: _____.',
      whyChooseUsEyebrow: 'Why hosts pick our balloon styling',
      whyChoose: [
        {
          title: 'Structure over volume',
          text: 'We focus on shape and colour rhythm so the install photographs cleanly from phone cameras.',
        },
        {
          title: 'Venue-safe methods',
          text: 'No damage-prone tape on society walls — we prefer freestanding frames and approved hanging points.',
        },
        {
          title: 'Heat-aware timing',
          text: 'Outdoor Bengaluru installs are sequenced so balloons are finished close to guest arrival.',
        },
      ],
      styles: [
        {
          title: 'Organic cloud garland',
          description: 'Asymmetric clusters along walls or dessert tables.',
        },
        {
          title: 'Classic ring arch',
          description: 'Circular or half-moon frames for cake and couple photos.',
        },
        {
          title: 'Column & pathway',
          description: 'Entry columns guiding guests into the main party zone.',
        },
        {
          title: 'Chrome luxe mix',
          description: 'Metallic accents for anniversaries and adult milestones.',
        },
      ],
      idealOccasions: [
        'Kids birthdays',
        'Teen & adult birthdays',
        'Gender reveals',
        'Naming ceremonies',
        'Corporate pop-ups',
        'Bridal shower accents',
      ],
      included: [
        'Theme and colour consultation',
        'Balloon arch or garland (as quoted)',
        'Base frames / weights',
        'On-site install',
        'Teardown or handover instructions',
        'Optional foil / character accents',
      ],
      howWeCustomize: [
        {
          title: 'Room measurements',
          description:
            'Usable wall width, ceiling height and cake-table position determine the shape and scale.',
        },
        {
          title: 'Colour direction',
          description:
            'We build the palette around an invitation, cake, outfit or brand reference.',
        },
        {
          title: 'Occasion and age',
          description:
            'A child’s party, milestone birthday and corporate gathering call for different finishes and focal points.',
        },
        {
          title: 'Venue-safe construction',
          description:
            'Society rules and fixture restrictions guide whether we use freestanding frames, weights or approved hanging points.',
        },
        {
          title: 'Finish selection',
          description:
            'Matte, chrome, foil, character and helium elements are chosen for the desired look and event conditions.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Organic balloon garland',
          description: 'An asymmetric arrangement around a cake table or focal wall.',
        },
        {
          title: 'Freestanding arch',
          description: 'A venue-safe photo frame for homes, clubhouses and entrances.',
        },
        {
          title: 'Columns and entry markers',
          description: 'Balloon structures that guide guests into the celebration.',
        },
        {
          title: 'Tabletop accents',
          description: 'Smaller clusters for dessert, gift or welcome tables.',
        },
      ],
      suitableVenues: [
        'Apartment living rooms',
        'Community clubhouses',
        'Private party halls',
        'Cafés with vendor approval',
        'Covered lawns',
      ],
      optionalAddOns: [
        'Same-day balloon decoration Bangalore',
        'Chrome & pastel organic balloon garlands',
        'Cake pedestal plinths',
        'Foil number or letter accents',
        'Character cut-outs',
        'Cake-table styling',
        'Helium balloons',
        'Welcome-board styling',
      ],
      budgetConsiderations: {
        intro:
          'Balloon styling is quoted as a custom scope, not one-size-fits-all bundles, based on the venue, design and materials you choose.',
        points: [
          {
            title: 'Span and coverage',
            description:
              'A single photo zone uses fewer balloons and structures than multiple areas or a long entrance.',
          },
          {
            title: 'Balloon finishes and accents',
            description:
              'Chrome, foil, helium, custom elements and layered colours affect material requirements.',
          },
          {
            title: 'Build and access time',
            description:
              'Ceiling height, outdoor weighting, lift access and venue setup windows affect installation labour.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Send venue details',
          detail:
            'Share the date, occasion, room photos, ceiling height and any colour references.',
        },
        {
          step: 'Choose a direction',
          detail: 'We suggest a proportionate balloon treatment for the space and guest flow.',
        },
        {
          step: 'Approve the quote',
          detail: 'The final scope lists the selected structures, colours and optional accents.',
        },
        {
          step: 'Confirm access',
          detail: 'We align vendor entry and setup timing with the venue or society.',
        },
      ],
      setupTimeline: [
        {
          step: 'Pre-event check',
          detail: 'Measurements, fixture rules and materials are confirmed before the event day.',
        },
        {
          step: 'On-site build',
          detail: 'The arrangement is assembled and secured within the agreed venue window.',
        },
        {
          step: 'Handover or teardown',
          detail:
            'We provide care guidance or remove the installation according to the agreed plan.',
        },
      ],
      themes: [
        {
          name: 'Pastel dream',
          description: 'Blush, mint, and cream for first birthdays and baby showers.',
        },
        {
          name: 'Primary play',
          description: 'Bold reds, blues, and yellows for energetic kids parties.',
        },
        {
          name: 'Black-gold chrome',
          description: 'Adult birthday and anniversary drama under warm lights.',
        },
        {
          name: 'Brand colours',
          description: 'Matched pantones for launches and office celebrations.',
        },
      ],
      areasIntro:
        'Setup access and ceiling heights differ by venue; these are common service areas.',
      relatedHrefs: [
        '/services/birthday-decoration',
        '/services/tent-balloon-setup',
        '/services/baby-shower-decoration',
        '/services/home-decoration',
      ],
      ctaBody:
        'Send your occasion, venue photos, ceiling height if known and colour reference for a suitable balloon plan.',
      faqs: [
        {
          question: 'Will a balloon arch fit our apartment or clubhouse ceiling?',
          answer:
            'We size the arch to the usable height in your photos and use lower, fuller shapes where ceilings or lifts are restrictive. A freestanding frame is often safer than attaching balloons to walls.',
        },
        {
          question: 'Can you match balloon colours to a cake or invitation?',
          answer:
            'Yes. Send a reference image and we will propose the closest available balloon shades, including matte and chrome options. Exact screen colours can vary, so we confirm the palette before setup.',
        },
        {
          question: 'Which balloon setup is best on a tight budget?',
          answer:
            'A compact cake-table garland or one photo-zone cluster puts the visual focus where guests take pictures. It uses fewer materials than decorating every wall or entrance.',
        },
        {
          question: 'What makes a premium balloon installation different?',
          answer:
            'Premium looks usually use a larger frame, layered balloon sizes, specialty finishes and coordinated accents. We can reserve that density for the photo zone while keeping the rest of the venue simple.',
        },
        {
          question: 'Can balloons be installed outdoors?',
          answer:
            'Only after reviewing sun, wind and shade. Outdoor builds are weighted and completed close to the event; in exposed spaces we may recommend a smaller, more stable arrangement.',
        },
        {
          question: 'Do you need our society rules before coming?',
          answer:
            'Please share rules on vendor entry, wall fixtures and setup timing. We plan around them and favour removable, freestanding construction where policies are strict.',
        },
      ],
    },

    'baby-shower-decoration': {
      slug: 'baby-shower-decoration',
      title: 'Baby Shower & Naming Ceremony Decoration Bangalore — From ₹5,000',
      description:
        'Baby shower, Seemantham & naming ceremony (Namakarana) decor in Bangalore from ₹5,000 — cradle florals, pastel balloon arches & home backdrops. 4.9★ rated.',
      serviceType: 'Baby shower decoration',
      ogImage: SERVICE_IMAGES.birthday,
      eyebrow: 'Baby shower & naming ceremony · Bangalore',
      headline: 'Baby Shower & Naming Ceremony Decoration in Bangalore',
      subheadline:
        'Pastel balloon clouds, traditional Namakarana cradle floral styling, welcome boards, and photo corners for homes and banquet halls across Bangalore.',
      storyTitle: 'Design the hosting flow, not just the backdrop',
      storyParagraphs: [
        'For a shower with grandparents, friends and small children, the room needs more than a pretty wall. We set aside a calm chair for blessings, keep food and gifts accessible, and leave enough open space for relatives to gather without crowding the mum-to-be.',
        'Choose a botanical, cloud-soft or subtly playful theme depending on the guest of honour. We can keep a living-room plan budget-conscious with one strong photo area or extend a premium layout to the entrance and dessert table.',
      ],
      highlights: [
        {
          title: 'Soft backdrop walls',
          description: 'Fabric, balloon, or floral-lite frames scaled for seated brunch photos.',
        },
        {
          title: 'Dessert & gift styling',
          description: 'Table landscapes that leave room for cake cutting and gift placement.',
        },
        {
          title: 'Mum-to-be focal chair',
          description: 'A composed seating nook for blessings and portraits.',
        },
        {
          title: 'Quiet colour stories',
          description: 'Palettes that photograph kindly and suit daylight brunch events.',
        },
      ],
      gallery: [
        img('baby shower', 0, 'Soft pastel baby shower backdrop in a Bengaluru home'),
        img('birthday', 0, 'Dessert-table styling adaptable for shower brunches'),
        img('room decor', 0, 'Intimate living-room seating accents for family blessings'),
      ],
      testimonial: {
        quote:
          'Elders had space to sit, and the backdrop looked elegant in every group photo. Setup finished before the first guest.',
        attribution: 'Baby shower · JP Nagar',
      },
      trustSignals: ['Brunch-friendly installs', 'Soft theme library', 'Apartment specialists'],
      waPrefill:
        'Hi We Decor! I need baby shower décor in Bangalore. Date: _____. Home or clubhouse: _____. Guest count: _____. Theme preference: _____.',
      whyChooseUsEyebrow: 'Why parents choose We Decor',
      whyChoose: [
        {
          title: 'Guest-flow thinking',
          text: 'We plan backdrops and tables so elders, photographers, and the mum-to-be are never competing for the same two metres.',
        },
        {
          title: 'Soft, adult-friendly themes',
          text: 'Beautiful without being childish — unless you specifically want a playful cartoon moment.',
        },
        {
          title: 'Reliable brunch timing',
          text: 'Morning installs are sequenced so décor is ready when catering arrives.',
        },
      ],
      styles: [
        {
          title: 'Botanical brunch',
          description: 'Greens, creams, and linen textures for daytime homes.',
        },
        {
          title: 'Blush cloud',
          description: 'Soft pinks with light balloon accents.',
        },
        {
          title: 'Sky & sage',
          description: 'Calm blues and greens popular for gender-neutral showers.',
        },
        {
          title: 'Boho macramé frame',
          description: 'Textural backdrops for terrace and balcony brunches.',
        },
      ],
      idealOccasions: [
        'Home baby showers',
        'Clubhouse brunches',
        'Godh bharai styling',
        'Gender-neutral celebrations',
        'Intimate family blessings',
      ],
      included: [
        'Palette consultation',
        'Main photo backdrop',
        'Mum-to-be seating accents',
        'Dessert or gift table styling (as quoted)',
        'Install and teardown',
        'Coordinator contact on the day',
      ],
      howWeCustomize: [
        {
          title: 'Hosting flow',
          description:
            'We reserve room for elder seating, blessings, food service and a comfortable mum-to-be focal chair.',
        },
        {
          title: 'Venue fit',
          description:
            'A living room, clubhouse or terrace brunch each needs a different backdrop size and access plan.',
        },
        {
          title: 'Theme and palette',
          description:
            'Botanical, cloud-soft or playful themes are tailored to the guest of honour and daylight conditions.',
        },
        {
          title: 'Guest count and zones',
          description:
            'We focus on one calm photo area or extend styling to the entrance and dessert table when appropriate.',
        },
        {
          title: 'Material balance',
          description:
            'Balloon, fabric, floral and table details are selected to suit the desired finish and budget.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Soft photo backdrop & Oh Baby neon',
          description:
            'A fabric, balloon or floral-lite frame with an Oh Baby neon backdrop for group photographs.',
        },
        {
          title: 'Godh Bharai & blessing chair nook',
          description:
            'A comfortable, styled seat for traditional Godh Bharai decoration in Bangalore and family moments.',
        },
        {
          title: 'Dessert and gift table',
          description: 'Light styling that preserves usable serving space.',
        },
        {
          title: 'Welcome detail',
          description: 'A small entrance treatment for a clubhouse or private venue.',
        },
      ],
      suitableVenues: [
        'Apartment living rooms',
        'Community clubhouses',
        'Private dining rooms',
        'Covered terraces',
        'Small banquet rooms',
      ],
      optionalAddOns: [
        'Oh Baby neon backdrop',
        'Godh Bharai traditional floral accents',
        'Mum-to-be chair accents',
        'Dessert-table styling',
        'Welcome sign',
        'Gift-table details',
        'Fresh floral touches',
      ],
      budgetConsiderations: {
        intro:
          'Baby shower décor is quoted as a custom plan, not one-size-fits-all bundles, after we understand the venue, hosting flow and preferred materials.',
        points: [
          {
            title: 'Areas being styled',
            description:
              'A single photo area has a different scope from a backdrop, seating nook, entrance and dessert table.',
          },
          {
            title: 'Materials and finish',
            description:
              'Fresh flowers, fabrics, balloon density and personalised elements change material needs.',
          },
          {
            title: 'Timing and access',
            description:
              'Morning setup windows, lift access and coordination with catering affect crew planning.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Tell us the plan',
          detail: 'Share the date, venue photos, guest mix, event timing and theme preference.',
        },
        {
          step: 'Review the space',
          detail: 'We map seating, food routes, the photo area and venue access.',
        },
        {
          step: 'Receive a custom scope',
          detail: 'We recommend materials and zones with a tailored quote.',
        },
        {
          step: 'Lock the schedule',
          detail: 'The setup window is confirmed around host arrival and catering.',
        },
      ],
      setupTimeline: [
        {
          step: 'Advance planning',
          detail: 'We confirm venue rules, layout and chosen details before the event.',
        },
        {
          step: 'Morning setup',
          detail: 'The team completes the styling in the agreed access window.',
        },
        {
          step: 'Event close',
          detail: 'Teardown or handover is arranged around the host’s schedule.',
        },
      ],
      themes: [
        {
          name: 'Little garden',
          description: 'Leafy greens and white blooms for natural light spaces.',
        },
        {
          name: 'Cloud nine',
          description: 'Airy whites and soft blues with gentle balloon texture.',
        },
        {
          name: 'Ruby flamingo',
          description: 'Playful yet refined pinks for lively friend groups.',
        },
        {
          name: 'Teddy bear theme baby shower',
          description:
            'Warm neutral balloons, teddy bear props, and soft pastel plinths for cosy indoor photos.',
        },
        {
          name: 'Boho baby shower setup',
          description: 'Pampas grass accents, macramé drapes, and earthy peach-and-ivory blooms.',
        },
        {
          name: 'Storybook nursery',
          description: 'Subtle motif accents without overwhelming the room.',
        },
      ],
      areasIntro: 'These areas commonly host home and clubhouse baby showers.',
      relatedHrefs: [
        '/services/home-decoration',
        '/services/balloon-decoration',
        '/services/birthday-decoration',
        '/services/floral-decoration',
      ],
      ctaBody:
        'Share the date, home or clubhouse photos, guest mix and palette preference for a brunch-ready plan.',
      faqs: [
        {
          question:
            'Do you provide decoration for naming ceremonies (Namakarana / Cradle ceremony)?',
          answer:
            'Yes. We style traditional and modern naming ceremonies with fresh floral cradle decor, marigold backdrops, customized baby name signage, and balloon arches across Bangalore homes and halls from ₹5,000.',
        },
        {
          question: 'How do you arrange seating for elders at a baby shower?',
          answer:
            'We keep the main chair, blessing area and food route separate from the backdrop. Photos of the room help us avoid placing décor where older guests need to sit or move.',
        },
        {
          question: 'Can the décor suit a brunch rather than an evening party?',
          answer:
            'Yes. Daytime plans use softer palettes, lower reflective elements and a clear dessert-table layout that works in natural light. We also coordinate the setup window with caterers.',
        },
        {
          question: 'Can you make the theme gender-neutral?',
          answer:
            'Yes. Sage, cream, yellow, terracotta and botanical themes are popular alternatives to a blue-or-pink reveal. You can choose a playful or a more grown-up finish.',
        },
        {
          question: 'What is a sensible budget option for a home shower?',
          answer:
            'A single backdrop with a mum-to-be chair accent gives the gathering a clear photo moment without taking over the living room. Gift and dessert tables can be styled lightly as add-ons.',
        },
        {
          question: 'What does a premium baby shower setup include?',
          answer:
            'Premium plans can extend the styling to the entrance, seating, dessert display and fresh-floral details. The exact mix is confirmed after we see the venue and your hosting plan.',
        },
        {
          question: 'Can you set up before the guest of honour arrives?',
          answer:
            'Yes. If it is a surprise, share the arrival window and building process. We coordinate with the host so the room is ready before the mum-to-be comes in.',
        },
      ],
    },

    'anniversary-decoration': {
      slug: 'anniversary-decoration',
      title: 'Anniversary Decoration in Bangalore — Surprise Setups from ₹5,000',
      description:
        'Anniversary decoration in Bangalore from ₹5,000 — romantic room surprises, cabana setups, floral backdrops & milestone party decor. 4.9★ rated.',
      serviceType: 'Anniversary decoration',
      ogImage: SERVICE_IMAGES.roomDecor,
      eyebrow: 'Anniversary celebrations · Bangalore',
      headline: 'Anniversary Decoration in Bangalore — Romantic Home & Venue Setups',
      subheadline:
        'Fairy lights, subtle florals, custom message signage, and candlelit ambiance for intimate dinner corners, bedrooms, and terraces in Bangalore.',
      storyTitle: 'The logistics behind a quiet reveal',
      storyParagraphs: [
        'An anniversary surprise works when the timing is invisible. We confirm when your partner will be out, how the team can enter, and where the first reveal should happen before we choose flowers, lights or a memory display.',
        'For two people, a focused room or balcony can feel more special than a crowded build. For family milestones, we can scale to a guest-facing backdrop and seating zone while keeping the couple at the centre.',
      ],
      highlights: [
        {
          title: 'Private dining stages',
          description:
            'Table canopies, chair backs, and runner florals for two or a small family table.',
        },
        {
          title: 'Bedroom & living reveals',
          description: 'Surprise setups timed to when your partner walks through the door.',
        },
        {
          title: 'Photo letter walls',
          description: 'Year numerals and memory-photo frames without clutter.',
        },
        {
          title: 'Evening lighting',
          description: 'Warm LEDs and candles (safe holders) for after-dusk Bengaluru dinners.',
        },
      ],
      gallery: [
        img('room decor', 1, 'Romantic room styling for an anniversary evening at home'),
        img('engagement', 1, 'Floral frame suited to couple anniversary portraits'),
        img('wedding', 1, 'Soft reception-inspired accents for vow renewals'),
      ],
      testimonial: {
        quote:
          'They transformed our balcony into a private restaurant. My husband was speechless — and teardown was done before neighbours noticed overnight décor.',
        attribution: '10th anniversary · Koramangala',
      },
      trustSignals: ['Surprise logistics OK', 'Evening installs', 'Couple-first layouts'],
      waPrefill:
        'Hi We Decor! I need an anniversary surprise in Bangalore. Year: _____. Date: _____. Return time: _____. Venue: _____.',
      whyChooseUsEyebrow: 'Why couples choose us',
      whyChoose: [
        {
          title: 'Surprise-capable teams',
          text: 'We coordinate alternate parking and quiet installs when one partner must stay unaware.',
        },
        {
          title: 'Scaled to the milestone',
          text: 'First-year sweetness and 25th-year grandeur use different density and formality — we do not copy-paste.',
        },
        {
          title: 'Neighbour-aware timing',
          text: 'Bengaluru apartment rules and noise sensitivity guide when hammers and ladders appear.',
        },
      ],
      styles: [
        {
          title: 'Candlelit canopy',
          description: 'Over-table fabric and soft florals for private dinners.',
        },
        {
          title: 'Rose pathway',
          description: 'Petal accents and low markers leading to a reveal room.',
        },
        {
          title: 'Memory gallery',
          description: 'Photo clips and year numbers framed with fairy lights.',
        },
        {
          title: 'Clubhouse vow renewal',
          description: 'Wider stage looks for family gatherings.',
        },
      ],
      idealOccasions: [
        'Home anniversary dinners',
        'Bedroom surprise décor',
        'Balcony private dining',
        'Silver / golden jubilees',
        'Vow renewal parties',
      ],
      included: [
        'Milestone consultation',
        'Focal décor zone (table / backdrop / room)',
        'Lighting accents as quoted',
        'Fresh or premium silk florals (specified)',
        'Timed install for surprises',
        'Teardown plan',
      ],
      howWeCustomize: [
        {
          title: 'Surprise timing',
          description:
            'We plan entry, parking and installation around the return time and the discretion you need.',
        },
        {
          title: 'Room and venue fit',
          description:
            'Bedroom, balcony, living room and clubhouse layouts each need a different focal treatment.',
        },
        {
          title: 'Milestone personality',
          description:
            'Your anniversary year, memories and preferred level of formality guide the styling direction.',
        },
        {
          title: 'Guest-scale design',
          description:
            'A dinner for two stays focused, while family milestones can include a guest-facing photo area.',
        },
        {
          title: 'Materials for the moment',
          description:
            'Flowers, warm lighting, photographs and table details are selected around the desired atmosphere.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Private dining corner',
          description:
            'A styled table with lighting and restrained florals for two or a small family.',
        },
        {
          title: 'Balcony reveal',
          description: 'Low, space-aware lighting and floral details that preserve safe movement.',
        },
        {
          title: 'Memory display',
          description: 'Photos and milestone numerals arranged as a clean focal point.',
        },
        {
          title: 'Family backdrop',
          description: 'A larger photo-facing area for a clubhouse or home gathering.',
        },
      ],
      suitableVenues: [
        'Apartment homes',
        'Private balconies',
        'Community clubhouses',
        'Private dining rooms',
        'Hotel banquet rooms',
      ],
      optionalAddOns: [
        'Photo display styling',
        'Milestone numerals',
        'Table setting accents',
        'Fresh florals',
        'LED candlelight',
      ],
      budgetConsiderations: {
        intro:
          'Anniversary décor is planned and quoted to your exact surprise or celebration scope, never sold as one-size-fits-all bundles.',
        points: [
          {
            title: 'Coverage and guest count',
            description:
              'One reveal zone has a different scope from styling a dining table, entrance and family photo area.',
          },
          {
            title: 'Selected materials',
            description:
              'Fresh flowers, lighting, custom photo details and furniture treatments influence the material plan.',
          },
          {
            title: 'Discreet installation',
            description:
              'Timed access, parking constraints and late-evening setup can affect crew time.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Share the surprise plan',
          detail: 'Send the date, return time, venue photos and whether guests will join.',
        },
        {
          step: 'Plan the reveal',
          detail: 'We identify the first-view point, entry route and areas to keep clear.',
        },
        {
          step: 'Confirm the design scope',
          detail: 'You receive a tailored material list and quote for the agreed zones.',
        },
        {
          step: 'Coordinate access',
          detail: 'We confirm a discreet installation window and day-of contact.',
        },
      ],
      setupTimeline: [
        {
          step: 'Before the date',
          detail: 'Access, design and surprise logistics are confirmed privately.',
        },
        {
          step: 'Timed installation',
          detail: 'The team sets up within the agreed window before the reveal.',
        },
        {
          step: 'After the celebration',
          detail: 'Teardown is handled at the agreed time, with minimal disruption.',
        },
      ],
      themes: [
        {
          name: 'Classic red rose',
          description: 'Timeless romance for evenings and photograph-heavy reveals.',
        },
        {
          name: 'Champagne dusk',
          description: 'Gold, ivory, and soft brown tones for mature milestones.',
        },
        {
          name: 'Garden terrace',
          description: 'Greenery and white blooms for outdoor dining.',
        },
        {
          name: 'Neon year mark',
          description: 'Modern numeral accents for younger couples.',
        },
      ],
      areasIntro: 'We plan home and venue anniversary surprises in these service areas.',
      relatedHrefs: [
        '/services/room-decoration',
        '/services/proposal-decoration',
        '/services/home-decoration',
        '/services/floral-decoration',
      ],
      ctaBody:
        'Send the anniversary year, the surprise window and photos of the intended room for a discreet setup plan.',
      faqs: [
        {
          question: 'Can you install while my partner is out?',
          answer:
            'Yes. Share a reliable return window, entry instructions and a cover plan if needed. We schedule the install so the reveal is ready without drawing attention in the building.',
        },
        {
          question: 'What anniversary décor works for a small balcony?',
          answer:
            'A compact dining table treatment, low lights and a focused floral detail usually work better than a large arch. We keep the door path and railing clearance usable.',
        },
        {
          question: 'Can the décor include wedding photos or a milestone number?',
          answer:
            'Yes. Provide the prints or digital files early and we will plan a clean memory display or numeral accent that does not compete with the couple photographs.',
        },
        {
          question: 'What is the most budget-conscious anniversary setup?',
          answer:
            'One room or balcony focal zone with lighting and selected floral accents gives a strong reveal for two. It is more practical than spreading small elements through the entire home.',
        },
        {
          question: 'How does a premium family anniversary differ?',
          answer:
            'For a larger milestone, we can create a guest-facing backdrop, couple seating, entrance touch and table details. Materials and timing are scoped after venue access is confirmed.',
        },
        {
          question: 'Are real candles included?',
          answer:
            'We normally use LED candles in homes and apartment venues. Real flame is considered only where the venue permits it and the host approves a safe placement.',
        },
      ],
    },

    'proposal-decoration': {
      slug: 'proposal-decoration',
      title: 'Proposal Decoration in Bangalore — Romantic Setups from ₹5,000',
      description:
        'Romantic proposal decoration in Bangalore from ₹5,000 — Marry Me neon backdrops, fairy-lit cabanas, rose pathways & terrace surprises. 4.9★ rated.',
      serviceType: 'Proposal decoration',
      ogImage: SERVICE_IMAGES.engagement,
      eyebrow: 'Proposal planning · Bangalore',
      headline: 'Romantic Proposal Decoration in Bangalore — Marry Me Setups',
      subheadline:
        'Fairy-lit cabana tents, red carpet petals, marquee light letters, and secret reveals on private rooftops, terraces, and living rooms.',
      storyTitle: 'Plan the reveal before the petals',
      storyParagraphs: [
        'A proposal setup has one job: make room for the question and the reaction. We confirm the entrance route, the exact moment you want to reveal the décor, and a clear camera position before placing the focal frame.',
        'A small indoor corner can be more private and budget-aware than a large install. For a premium terrace or venue plan, we coordinate permission, weather backup and space for friends or family to appear after the yes.',
      ],
      highlights: [
        {
          title: 'Minute-level timing',
          description: 'Install windows synced to arrivals, restaurant slots, and photo teams.',
        },
        {
          title: 'Hidden-guest ready',
          description: 'Layouts that conceal friends/family until after the yes.',
        },
        {
          title: 'Compact statement pieces',
          description: 'Arches and petal work that photograph large without huge footprints.',
        },
        {
          title: 'Venue liaison support',
          description: 'We follow café/hotel rules so proposals are not shut down mid-setup.',
        },
      ],
      gallery: [
        img('engagement', 2, 'Proposal-ready floral frame for a Bengaluru terrace'),
        img('room decor', 2, 'Intimate indoor proposal corner with soft lighting'),
        img('engagement', 0, 'Romantic backdrop suitable for ring photographs'),
      ],
      testimonial: {
        quote:
          'They finished 20 minutes before we arrived, photographer was already in place, and my parents walked out after she said yes. Flawless.',
        attribution: 'Rooftop proposal · Indiranagar',
      },
      trustSignals: ['NDA-friendly planning', 'Photographer coordination', 'Venue-rule respect'],
      waPrefill:
        'Hi We Decor! I am planning a discreet proposal in Bangalore. Date: _____. Venue type: _____. Arrival time: _____. Photographer: _____.',
      whyChooseUsEyebrow: 'Why proposers trust us',
      whyChoose: [
        {
          title: 'Operational secrecy',
          text: 'Alternate chats, cover stories with building staff, and quiet installs are part of the job.',
        },
        {
          title: 'Photo angles first',
          text: 'We block a clear shot for photographers and leave the ring hand unobstructed.',
        },
        {
          title: 'Backup plans',
          text: 'Rain and late arrivals happen — we keep a compacted indoor alternative when risk is high.',
        },
      ],
      styles: [
        {
          title: 'Marry me petal aisle',
          description: 'Floor pathway leading to a small focal wall.',
        },
        {
          title: 'Terrace arch',
          description: 'Lightweight arch with fairylights for skyline views.',
        },
        {
          title: 'Indoor canopy',
          description: 'Ceiling drapes for living rooms after sunset.',
        },
        {
          title: 'Restaurant takeover',
          description: 'Table florals and a discreet backdrop for private dining.',
        },
      ],
      idealOccasions: [
        'Rooftop proposals',
        'Home living-room surprises',
        'Restaurant private corners',
        'Garden / lawn proposals',
        'Post-proposal family reveals',
      ],
      included: [
        'Confidential planning call',
        'Focal décor install',
        'Lighting accents',
        'Petals / floral accents as quoted',
        'On-site standby until moment (as agreed)',
        'Rapid teardown option',
      ],
      howWeCustomize: [
        {
          title: 'Reveal choreography',
          description:
            'We plan the arrival route, exact reveal moment and photographer position before choosing décor.',
        },
        {
          title: 'Venue permissions',
          description:
            'Home, terrace, restaurant and hotel plans are shaped around approved access and décor limits.',
        },
        {
          title: 'Privacy and guests',
          description:
            'The layout can keep the moment private or reserve room for friends and family after the yes.',
        },
        {
          title: 'Style and materials',
          description:
            'Petals, florals, lighting and signage are selected around your story and the setting.',
        },
        {
          title: 'Weather-aware choices',
          description:
            'Outdoor concepts include practical consideration of wind, rain and an indoor fallback.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Intimate focal corner',
          description: 'A compact floral and lighting moment for a home or private dining setting.',
        },
        {
          title: 'Petal pathway',
          description: 'A clear route to the proposal spot with a camera-friendly ending.',
        },
        {
          title: 'Terrace frame',
          description: 'A lightweight, view-aware structure with safe weighted details.',
        },
        {
          title: 'Family reveal area',
          description: 'A separate styled zone for guests to join after the proposal.',
        },
      ],
      suitableVenues: [
        'Apartment homes',
        'Private terraces',
        'Restaurant private rooms',
        'Hotel dining areas',
        'Gardens with permission',
      ],
      optionalAddOns: [
        'Photographer coordination',
        'Custom message sign',
        'Petal pathway',
        'Family reveal styling',
        'LED candlelight',
      ],
      budgetConsiderations: {
        intro:
          'Proposal décor is quoted as a custom, timing-led scope—not a one-size-fits-all bundle—after we review the venue and your reveal plan.',
        points: [
          {
            title: 'Design footprint',
            description:
              'A focused proposal corner differs from a terrace treatment with a pathway and guest area.',
          },
          {
            title: 'Floral and lighting choices',
            description:
              'Fresh-flower coverage, custom signage and lighting layers determine material requirements.',
          },
          {
            title: 'Timing and venue logistics',
            description:
              'Standby time, permissions, weather contingency and discreet access shape crew planning.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Share the secret brief',
          detail:
            'Send the date, venue type, arrival time, photographer plan and privacy preferences.',
        },
        {
          step: 'Check feasibility',
          detail: 'We review access, venue rules, weather exposure and the best camera angle.',
        },
        {
          step: 'Approve the tailored plan',
          detail: 'You receive the recommended scope, materials and quote.',
        },
        {
          step: 'Coordinate the reveal',
          detail: 'We confirm entry, setup timing, standby details and a discreet contact method.',
        },
      ],
      setupTimeline: [
        {
          step: 'Advance coordination',
          detail: 'Venue approval, design and arrival choreography are confirmed beforehand.',
        },
        {
          step: 'Pre-arrival setup',
          detail: 'The team completes and checks the focal area before the agreed arrival window.',
        },
        {
          step: 'Moment support',
          detail: 'Any agreed standby or rapid teardown follows the proposal schedule.',
        },
      ],
      themes: [
        {
          name: 'Classic red & candle',
          description: 'Timeless romance with controlled lighting.',
        },
        {
          name: 'White garden',
          description: 'Airy florals for daytime terraces.',
        },
        {
          name: 'Fairy-light night',
          description: 'Warm LEDs for after-dark rooftops.',
        },
        {
          name: 'Minimal modern',
          description: 'Few stems, strong typography board, clean lines.',
        },
      ],
      areasIntro:
        'Venue approvals and access vary; these are areas where we arrange proposal setups.',
      relatedHrefs: [
        '/services/engagement-decoration',
        '/services/anniversary-decoration',
        '/services/terrace-decoration',
        '/services/floral-decoration',
      ],
      ctaBody:
        'Share the proposal window, venue type, photographer plan and secrecy preferences for a timed response.',
      faqs: [
        {
          question: 'How do you keep a proposal setup secret?',
          answer:
            'We use the contact method and arrival plan you choose, keep communication discreet, and can coordinate with a trusted friend or venue manager. Do not rely on secrecy from venue staff without their approval.',
        },
        {
          question: 'Where does the photographer stand during the proposal?',
          answer:
            'We reserve an unobstructed viewing pocket before selecting the backdrop. Share the photographer’s requirements so they can capture the arrival, question and reaction without stepping into the scene.',
        },
        {
          question: 'Can you decorate a restaurant or café?',
          answer:
            'Yes, only after the venue confirms vendor access, décor limits and timing. A compact table or corner treatment is usually more likely to be approved than a large install.',
        },
        {
          question: 'What happens if our arrival is delayed?',
          answer:
            'We agree a standby window in advance and choose materials that can hold safely. Beyond that window, venue and weather conditions may limit how long the setup can remain untouched.',
        },
        {
          question: 'What can be done on a practical proposal budget?',
          answer:
            'A small focal corner with lighting and selected petals can create a private moment. We prioritise the proposal and photo angle instead of adding décor that guests will barely see.',
        },
        {
          question: 'Can family join after the proposal?',
          answer:
            'Yes. Tell us how many people are arriving and where they can wait. We can keep a separate reveal area clear so the couple still has a private first moment.',
        },
      ],
    },

    'home-decoration': {
      slug: 'home-decoration',
      title: 'Home Decoration in Bangalore — Haldi, Engagement, Birthday from ₹3,000',
      description:
        'Home decoration in Bangalore from ₹3,000 — home haldi setups, intimate engagement backdrops, birthdays, baby showers & housewarming pujas. 4.9★ rated.',
      serviceType: 'Home decoration',
      ogImage: SERVICE_IMAGES.roomDecor,
      eyebrow: 'Home celebrations & rituals · Bangalore',
      headline: 'Home Event Decoration in Bangalore — Haldi, Engagement, Birthday & Pujas',
      subheadline:
        'Apartment-friendly and house-safe décor for living rooms, terraces, foyers & balconies — designed around guest seating, lift timings, society guidelines, and zero wall damage.',
      storyTitle: 'Custom ceremony & party setups for Bangalore homes and apartments',
      storyParagraphs: [
        'Whether hosting a home Haldi with vibrant marigold backdrops and urli seating, an intimate ring ceremony with family, a colorful birthday balloon garland, or a sacred Griha Pravesh pooja, your home deserves thoughtful decoration that doesn’t compromise everyday space.',
        'We tailor every setup to your specific floorplan — whether a 2BHK/3BHK apartment in Whitefield, Bellandur, or HSR Layout, or an independent house in Jayanagar or JP Nagar. We protect your walls with non-damaging adhesive fixtures, coordinate vendor entry and lift permissions with society security, and leave floor space open for dining and guest movement.',
        'From compact backdrop focal walls to multi-zone home transformations (entrance torans, balcony photo corners, dining overlays), quotes are transparent and itemized with setup and prompt teardown included.',
      ],
      highlights: [
        {
          title: 'Home Haldi & Mehndi',
          description:
            'Yellow drapes, fresh marigold backdrops, brass urli seating, and floor-protection sheets to prevent turmeric stains.',
        },
        {
          title: 'Home Engagement & Rings',
          description:
            'Circular floral frames, pastel fabric backdrops, sofa styling, and warm fairy lights tailored to living room dimensions.',
        },
        {
          title: 'Home Birthday Balloons',
          description:
            'Organic balloon garlands, themed arch backdrops, cake table styling, and customized neon signs for kids and adults.',
        },
        {
          title: 'Baby Shower & Naming',
          description:
            'Gentle pastel arches, traditional cradle floral styling, and family portrait corners.',
        },
        {
          title: 'Griha Pravesh & Pujas',
          description:
            'Fresh mango-leaf entrance torans, marigold door frames, and mandapa floral accents for housewarmings.',
        },
        {
          title: 'Zero Wall Damage',
          description:
            'Freestanding structures and non-marking adhesive hooks designed for Bangalore apartment society rules.',
        },
      ],
      gallery: [
        img('haldi', 0, 'Home haldi backdrop and urli seating in a Bangalore residence'),
        img('engagement', 0, 'Intimate home engagement floral circle and sofa backdrop'),
        img('birthday', 3, 'Apartment birthday balloon styling with clear seating lanes'),
        img('room decor', 0, 'Romantic room decoration for a private Bengaluru celebration'),
      ],
      testimonial: {
        quote:
          'They worked around our toddler nap schedule and still finished a full living-room transform. Zero wall damage.',
        attribution: 'Home birthday · Bellandur',
      },
      trustSignals: ['Apartment-safe methods', 'Festival slots', 'Same-day teardown options'],
      waPrefill:
        'Hi We Decor! I need home decoration in Bangalore (Haldi / Engagement / Birthday / Puja). Layout: _____. Date: _____. Locality: _____.',
      whyChooseUsEyebrow: 'Why homeowners hire us',
      whyChoose: [
        {
          title: 'Society-rule fluency',
          text: 'We ask for timing windows and decoration policies up front — fewer surprises from security.',
        },
        {
          title: 'Function over flash',
          text: 'Guests still need to sit and move. We decorate without turning the home into an obstacle course.',
        },
        {
          title: 'Honest scaling',
          text: 'We tell you when a theme is too large for your room and offer a better-fitting alternative.',
        },
      ],
      styles: [
        {
          title: 'Home Haldi ritual zone',
          description:
            'Marigold backdrop with urli seating, cushion styling, and splash protection.',
        },
        {
          title: 'Home engagement focal wall',
          description: 'Floral circle arch behind the couple sofa with warm fairy lights.',
        },
        {
          title: 'Living-room birthday arch',
          description:
            'Balloon garland and themed cake table backdrop without blocking TV or doorways.',
        },
        {
          title: 'Traditional cradle & puja',
          description: 'Fresh jasmine and marigold strings for baby shower or Griha Pravesh.',
        },
        {
          title: 'Foyer & entrance welcome',
          description: 'Door torans, floral rangoli, and welcome easel for arriving guests.',
        },
      ],
      idealOccasions: [
        'Home Haldi & Mehndi ceremonies',
        'Home Engagement & Ring exchanges',
        'Living room & bedroom birthdays',
        'Home Baby Shower (Seemantham) & Naming',
        'Intimate Home Wedding & Nikah rituals',
        'Housewarming (Griha Pravesh) & Pujas',
        'Home Anniversary & Romantic surprises',
      ],
      included: [
        'Home walkthrough or photo review',
        'Primary décor zone (backdrop, florals, or balloons)',
        'Protective floor sheets for Haldi/rituals',
        'Install crew access & lift planning',
        'Teardown and basic cleanup',
        'WhatsApp coordination day-of',
      ],
      howWeCustomize: [
        {
          title: 'Home walkthrough',
          description:
            'Room photos help us preserve seating, food service, daily routes and the areas you use most.',
        },
        {
          title: 'Society-aware access',
          description:
            'Lift bookings, vendor-entry windows, parking and wall-fixture rules shape the installation plan.',
        },
        {
          title: 'Occasion-led styling',
          description:
            'Haldi, engagement, birthday, puja, and housewarming requirements determine the focal areas.',
        },
        {
          title: 'Room-by-room scale',
          description:
            'We can focus on one wall or thoughtfully connect the foyer, living area and dining space.',
        },
        {
          title: 'Practical materials',
          description:
            'We choose wall-safe, easy-clean and child- or pet-aware elements where needed.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Apartment Haldi ceremony setup',
          description:
            'Compact marigold frame, floor carpets, brass urli, and turmeric splash protection.',
        },
        {
          title: 'Intimate living-room engagement',
          description:
            'Couple sofa backdrop with floral arch ring, warm fairy lights, and custom name board.',
        },
        {
          title: 'Kids or adult home birthday',
          description: 'Pastel balloon garland, neon Happy Birthday sign, and cake plinth setup.',
        },
        {
          title: 'Housewarming door & pooja décor',
          description:
            'Mango leaf toran, marigold door drape, and brass lamp styling for Griha Pravesh.',
        },
      ],
      suitableVenues: [
        'Apartments (1BHK, 2BHK, 3BHK, 4BHK)',
        'Independent houses & villas',
        'Gated-community clubhouses',
        'Private balconies & terraces',
        'Living rooms & courtyards',
      ],
      optionalAddOns: [
        'Haldi floor protection sheeting',
        'Cake-table styling & plinths',
        'Welcome-board styling',
        'Brass urli with flower petals & floating candles',
        'Same-day teardown',
      ],
      budgetConsiderations: {
        intro:
          'Home decoration is quoted as a bespoke scope, not one-size-fits-all bundles, based on the rooms, materials and access involved.',
        points: [
          {
            title: 'Occasion & materials',
            description:
              'Fresh marigolds and brass urlis for Haldi, floral arches for engagement, or balloon garlands for birthdays.',
          },
          {
            title: 'Number of areas',
            description:
              'A single focal wall differs from styling the foyer, living room, dining area, and balcony together.',
          },
          {
            title: 'Building logistics',
            description:
              'Lift access, setup windows, parking and teardown requirements determine crew time.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Send room photos',
          detail:
            'Share the occasion (Haldi, Engagement, Birthday, Puja), layout, date, and society rules.',
        },
        {
          step: 'Review the home',
          detail: 'We identify a practical focal point and protect seating and movement routes.',
        },
        {
          step: 'Confirm your scope',
          detail: 'We recommend a tailored design, materials and transparent quote.',
        },
        {
          step: 'Schedule access',
          detail: 'Vendor entry, lift use and setup or teardown timing are confirmed.',
        },
      ],
      setupTimeline: [
        {
          step: 'Planning stage',
          detail: 'We confirm layout, building rules and selected styling before the event.',
        },
        {
          step: 'Event-day install',
          detail: 'The team works within the approved access window and protects the home.',
        },
        { step: 'Closeout', detail: 'Teardown and basic cleanup follow the agreed schedule.' },
      ],
      themes: [
        {
          name: 'Warm festive & marigold',
          description: 'Marigold, diya accents, and yellow drapes for Haldi, Mehndi, and Pujas.',
        },
        {
          name: 'Blush & pastel romance',
          description:
            'Soft circular floral arches and fairy lights for home engagements and baby showers.',
        },
        {
          name: 'Modern pastel party',
          description: 'Clean organic balloon garlands and customized neon signs for birthdays.',
        },
        {
          name: 'Traditional South Indian ritual',
          description:
            'Fresh jasmine, mango leaf toran, and brass lamps for Griha Pravesh and ceremonies.',
        },
      ],
      areasIntro: 'Home access requirements differ by community; these are frequent service areas.',
      relatedHrefs: [
        '/services/haldi-decoration',
        '/services/engagement-decoration',
        '/services/birthday-decoration',
        '/services/baby-shower-decoration',
        '/services/room-decoration',
        '/services/wedding-setup',
      ],
      ctaBody:
        'Send room photos, BHK/layout details, occasion (Haldi, Engagement, Birthday, Puja) and society setup rules for a home-safe quote.',
      faqs: [
        {
          question:
            'Can you do Haldi decoration inside an apartment living room without turmeric stains?',
          answer:
            'Yes. We use heavy-duty floor drop cloths and waterproof mats beneath the urli and seating area to protect marble, vitrified tiles, and wooden flooring from turmeric stains. All backdrops are mounted on freestanding metal frames or non-marking hooks with zero nails.',
        },
        {
          question: 'Can you fit an engagement decoration inside a normal apartment living room?',
          answer:
            'Yes. Most Bangalore apartment living rooms have 10–12 feet of usable width. We design compact 6ft to 8ft floral ring backdrops or fabric arches positioned behind your sofa, leaving ample space for family seating and photographer sightlines.',
        },
        {
          question: 'What is the price of home decoration in Bangalore?',
          answer:
            'Home birthday balloon setups start from ₹3,000. Intimate home Haldi, engagement, baby shower, and Griha Pravesh floral backdrops typically start from ₹5,000 depending on fresh flower density and backdrop size. Quotes are fully customized with no hidden fees.',
        },
        {
          question: 'Will you follow our apartment society rules?',
          answer:
            'Yes. Send vendor-entry, lift, noise and wall-fixture rules before confirmation. We build the plan around approved access instead of risking a delayed setup.',
        },
        {
          question: 'Do you do home wedding or Nikah setups?',
          answer:
            'Yes, we regularly style courtyards, terraces, and spacious living rooms for intimate wedding rituals, small mandap setups, and Nikah backdrops with traditional florals and elegant draping.',
        },
        {
          question: 'Do you use wall-safe hooks that will not damage paint?',
          answer:
            'Yes. We prioritize freestanding self-supported frames. Where wall attachment is necessary, we use high-grade removable painter-safe adhesive tapes or non-marking hooks so walls remain spotless.',
        },
        {
          question: 'Can you set up and remove décor the same day?',
          answer:
            'Yes for most home events. Confirm party end time and building rules early so teardown does not disturb neighbours or clash with quiet hours.',
        },
      ],
    },

    'floral-decoration': {
      slug: 'floral-decoration',
      title: 'Flower Decoration in Bangalore — Fresh Floral Backdrops from ₹5,000',
      description:
        'Fresh flower decoration in Bangalore from ₹5,000 — marigold, jasmine & rose backdrops for weddings, haldi, poojas & stages. 4.9★ (82 reviews).',
      serviceType: 'Floral decoration',
      ogImage: SERVICE_IMAGES.haldi,
      eyebrow: 'Fresh flowers · Bangalore',
      headline: 'Fresh Floral Decoration in Bangalore — Temple, Stage & Home Florals',
      subheadline:
        'Fresh marigold strings, tuberoses, jasmine torans, and premium Dutch roses sourced fresh on event morning for weddings, pujas, and stages.',
      storyTitle: 'Choose flowers with the venue and weather in mind',
      storyParagraphs: [
        'Flowers behave differently in sun, traffic and air-conditioned halls. We start with the event time and venue conditions, then recommend varieties and placement that make sense for the duration rather than promising a one-size-fits-all design.',
        'For a controlled budget, concentrate fresh density where guests and cameras will look. For a premium floral statement, we document the species, coverage and support materials so you know what the quote is delivering.',
      ],
      highlights: [
        {
          title: 'Ceremony & stage florals',
          description: 'Mandap, nikah, and reception floral architecture with structural security.',
        },
        {
          title: 'Home uruli & foyer',
          description: 'Welcoming arrangements scaled for apartments and villas.',
        },
        {
          title: 'Garland craft',
          description: 'Entrance and sacred-space garlands for traditional functions.',
        },
        {
          title: 'Hybrid silk + fresh',
          description: 'Budget-smart mixes that still photograph as premium.',
        },
      ],
      gallery: [
        img('haldi', 0, 'Marigold-forward floral backdrop for a Bengaluru morning ceremony'),
        img('wedding', 0, 'Stage florals for wedding reception photography'),
        img('engagement', 1, 'Boutique floral frame for engagement portraits'),
      ],
      testimonial: {
        quote:
          'Florals stayed fresh through a 4pm outdoor bless — they had clearly planned hydration and shade. Guests kept asking for the florist.',
        attribution: 'Engagement · Sarjapur Road',
      },
      trustSignals: ['Fresh flower sourcing', 'Heat-aware designs', 'Species listed in quotes'],
      waPrefill:
        'Hi We Decor! I need fresh floral décor in Bangalore. Event: _____. Date: _____. Venue type: _____. Fresh-only or hybrid: _____.',
      whyChooseUsEyebrow: 'Why hosts book our florals',
      whyChoose: [
        {
          title: 'Transparent flower grades',
          text: 'Quotes explain what is premium fresh vs supportive silk so there are no day-of surprises.',
        },
        {
          title: 'Photography density',
          text: 'We thicken floral pockets where cameras point — not equally everywhere.',
        },
        {
          title: 'City logistics',
          text: 'Sourcing and transport plan for Bengaluru traffic so stems are not dying in vans.',
        },
      ],
      styles: [
        {
          title: 'Traditional marigold',
          description: 'Temple-to-home warmth for haldi and puja mornings.',
        },
        {
          title: 'Romantic rose wall',
          description: 'High-impact stages for evenings and proposals.',
        },
        {
          title: 'Tropical greens',
          description: 'Monstera-led modern looks for corporate and chic homes.',
        },
        {
          title: 'Minimal bud vases',
          description: 'Dining tables with breathing room between blooms.',
        },
      ],
      idealOccasions: [
        'Wedding & reception stages',
        'Haldi and mehndi florals',
        'Nikah botanical looks',
        'Home puja décor',
        'Corporate welcome desks',
      ],
      included: [
        'Floral concept board',
        'Species & colour plan',
        'Install with water sources where needed',
        'On-day refresh for long events (as quoted)',
        'Teardown of floral structures',
        'Allergen notes on request',
      ],
      howWeCustomize: [
        {
          title: 'Event conditions',
          description:
            'We assess event hours, heat, shade, air-conditioning and transport before recommending varieties.',
        },
        {
          title: 'Venue and structure',
          description:
            'Home foyers, stages, mandaps and dining tables each need different mechanics and floral coverage.',
        },
        {
          title: 'Style and palette',
          description:
            'Traditional marigold, romantic roses, tropical greens or minimal arrangements follow your visual references.',
        },
        {
          title: 'Camera and guest zones',
          description:
            'We place fuller floral moments where guests gather and photographs are made.',
        },
        {
          title: 'Fresh or hybrid approach',
          description:
            'Species, greenery and supportive silk are chosen transparently for the look and event duration.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Floral stage frame',
          description: 'A structured, photo-facing arrangement for ceremonies and receptions.',
        },
        {
          title: 'Home foyer and uruli',
          description: 'Welcoming floral details scaled for apartments and villas.',
        },
        {
          title: 'Garlands and sacred-space styling',
          description: 'Traditional arrangements for rituals and entrances.',
        },
        {
          title: 'Dining-table florals',
          description: 'Low arrangements or bud vases that retain conversation space.',
        },
      ],
      suitableVenues: [
        'Marriage halls',
        'Hotel banquet rooms',
        'Apartment homes',
        'Villas',
        'Covered outdoor venues',
      ],
      optionalAddOns: [
        'Entrance garlands',
        'Table florals',
        'Stage lighting coordination',
        'On-day floral refresh',
        'Allergen-aware selections',
      ],
      budgetConsiderations: {
        intro:
          'Floral decoration is quoted as a custom design, not one-size-fits-all bundles, with species and coverage matched to your venue and event conditions.',
        points: [
          {
            title: 'Coverage and scale',
            description:
              'A concentrated photo-facing floral area requires a different scope from full stage or multi-zone coverage.',
          },
          {
            title: 'Species and freshness',
            description:
              'Flower varieties, seasonal availability, fresh density and hybrid choices drive the material plan.',
          },
          {
            title: 'Handling and installation',
            description:
              'Hydration, transport, structural mechanics and refresh requirements affect labour and timing.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Share event details',
          detail:
            'Send the date, venue photos, event hours, preferred palette and fresh-only or hybrid preference.',
        },
        {
          step: 'Review conditions',
          detail:
            'We assess venue access, weather exposure, photography needs and floral suitability.',
        },
        {
          step: 'Confirm species and scope',
          detail: 'The tailored quote documents selected flowers, coverage and support materials.',
        },
        {
          step: 'Lock logistics',
          detail: 'We align sourcing, delivery and setup with venue access.',
        },
      ],
      setupTimeline: [
        {
          step: 'Before the event',
          detail:
            'Species, substitutions and venue logistics are confirmed after the design review.',
        },
        {
          step: 'Fresh delivery and install',
          detail: 'Florals are transported, hydrated and installed within the event-day window.',
        },
        {
          step: 'Event close',
          detail: 'Any agreed refresh or teardown is completed around the event schedule.',
        },
      ],
      themes: [
        {
          name: 'Sunshine marigold',
          description: 'Yellow-orange traditional energy for morning rituals.',
        },
        {
          name: 'Blush orchard',
          description: 'Pink roses and soft fillers for romantic evenings.',
        },
        {
          name: 'White sacred',
          description: 'Jasmine-tuberose notes for intimate spiritual settings.',
        },
        {
          name: 'Forest luxe',
          description: 'Deep greens with selective white blooms.',
        },
      ],
      areasIntro: 'Flower delivery timing is coordinated for venues in these service areas.',
      relatedHrefs: [
        '/services/haldi-decoration',
        '/services/wedding-setup',
        '/services/nikah-decoration',
        '/services/car-decoration',
      ],
      ctaBody:
        'Share the event type, venue photos, event hours and whether you prefer fresh-only flowers for a species-led quote.',
      faqs: [
        {
          question: 'Which flowers hold up best for an outdoor Bangalore event?',
          answer:
            'The right choice depends on heat, shade and duration. We recommend hardy stems and hydration methods after reviewing the event timing, rather than promising every flower will perform the same way.',
        },
        {
          question: 'Can I request fresh-only flowers?',
          answer:
            'Yes. The quote will identify fresh materials and any supporting mechanics. If a hybrid option is more practical for a specific area, we explain it before you decide.',
        },
        {
          question: 'Why do floral quotes change by season?',
          answer:
            'Flower availability and market rates vary, especially around festivals and wedding dates. We confirm the species plan and discuss substitutions if the preferred bloom is unavailable.',
        },
        {
          question: 'How can we get a floral look on a controlled budget?',
          answer:
            'Concentrate fresh flowers on the stage, entry or dining focal point and use greenery or simpler arrangements elsewhere. This keeps the photograph-facing areas full without pretending every zone needs the same density.',
        },
        {
          question: 'What makes a premium floral installation?',
          answer:
            'Premium plans use larger floral coverage, more specialised stems and more on-site finishing. The exact species and density are documented so the final look is transparent.',
        },
        {
          question: 'Can you reduce fragrance near guests?',
          answer:
            'Yes. Tell us about sensitivities and we can avoid strongly scented varieties around seating, food and enclosed rooms.',
        },
      ],
    },

    'terrace-decoration': {
      slug: 'terrace-decoration',
      title: 'Terrace & Rooftop Decoration in Bangalore — From ₹5,000',
      description:
        'Terrace and rooftop decoration in Bangalore from ₹5,000 — fairy-lit canopies, haldi setups, birthday parties & romantic proposals. 4.9★ rated.',
      serviceType: 'Terrace decoration',
      ogImage: SERVICE_IMAGES.corporate,
      eyebrow: 'Rooftop hosting · Bangalore',
      headline: 'Terrace & Rooftop Party Decoration in Bangalore',
      subheadline:
        'Wind-anchored backdrop frames, festoon fairy light canopies, and cozy low seating for sunset parties and rooftop celebrations.',
      storyTitle: 'Outdoor atmosphere begins with safety checks',
      storyParagraphs: [
        'Before selecting lights or drapes, we review railings, open edges, wind exposure, socket locations and the available indoor fallback. Those details decide whether a canopy, low tables or a compact focal zone is appropriate.',
        'A value-led terrace dinner can focus on one dressed table and lighting. Premium plans can add a lounge, photo zone and layered seating—but only where the space and weather plan support them.',
      ],
      highlights: [
        {
          title: 'Weighted & wind-aware builds',
          description: 'Bases and ties designed so décor does not migrate mid-dinner.',
        },
        {
          title: 'String-light canopies',
          description: 'Warm overhead light that photographs well against the skyline.',
        },
        {
          title: 'Lounge seating zones',
          description: 'Floor seating or sofa clusters with clear rail safety margins.',
        },
        {
          title: 'Rain contingency',
          description: 'Quick-shift plans for drapes and tables when drizzle starts.',
        },
      ],
      gallery: [
        img('corporate event', 1, 'Evening terrace ambience with structured lighting'),
        img('engagement', 2, 'Rooftop-ready romantic frame for proposals or dinners'),
        img('birthday', 4, 'Terrace party accents with secured balloon elements'),
      ],
      testimonial: {
        quote:
          'Wind was strong that night but nothing tipped. The canopy lights made our terrace feel like a boutique restaurant.',
        attribution: 'Birthday dinner · Marathahalli terrace',
      },
      trustSignals: ['Wind-safe methods', 'Rain plan included', 'Society liaison friendly'],
      waPrefill:
        'Hi We Decor! I need terrace décor in Bangalore. Date: _____. Occasion: _____. Terrace photos: _____. Indoor backup available: _____.',
      whyChooseUsEyebrow: 'Why terrace hosts call us',
      whyChoose: [
        {
          title: 'Safety margins',
          text: 'We respect railings, load limits, and walkways — décor never traps guests against edges.',
        },
        {
          title: 'Power realism',
          text: 'We check available sockets and avoid overloading terrace points popular in apartments.',
        },
        {
          title: 'Weather honesty',
          text: 'If the forecast is poor, we say so and propose the smarter indoor hybrid.',
        },
      ],
      styles: [
        {
          title: 'Boutique dining canopy',
          description: 'Overhead lights with a compact dining set for 8–12.',
        },
        {
          title: 'Lounge mehndi terrace',
          description: 'Floor seating, low florals, and soft drapes.',
        },
        {
          title: 'Proposal skyline',
          description: 'Minimal arch facing the view with hidden photographer pocket.',
        },
        {
          title: 'Festival open-air',
          description: 'Rangoli edges and diya-safe LED clusters.',
        },
      ],
      idealOccasions: [
        'Terrace birthdays',
        'Proposal evenings',
        'Intimate dinners',
        'Mehndi / sangeet previews',
        'Small festive gatherings',
      ],
      included: [
        'Terrace photo/measurement review',
        'Weighted décor plan',
        'Lighting install',
        'Seating zone guidance',
        'Weather contingency note',
        'Teardown same night',
      ],
      howWeCustomize: [
        {
          title: 'Safety and site checks',
          description:
            'Railings, open edges, wind exposure, sockets and drainage are reviewed before selecting any structure.',
        },
        {
          title: 'Weather contingency',
          description:
            'We plan an indoor fallback or a simpler weather-resilient layout when conditions call for it.',
        },
        {
          title: 'Hosting format',
          description:
            'A dinner for a few, proposal, birthday or festive gathering each needs different guest movement and seating.',
        },
        {
          title: 'Terrace measurements',
          description:
            'The usable footprint determines whether to focus on dining, a photo area, a lounge or a combination.',
        },
        {
          title: 'Outdoor materials',
          description:
            'Weighted bases, low-profile décor, lighting and textiles are chosen for conditions and setup time.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Styled dining zone',
          description: 'A dressed table with safe lighting for an intimate meal.',
        },
        {
          title: 'Skyline photo frame',
          description: 'A compact, weighted focal area that preserves views and walkways.',
        },
        {
          title: 'Low lounge corner',
          description: 'Floor or sofa seating with clear railing margins.',
        },
        {
          title: 'Festive light trail',
          description: 'LED and floral details suited to an open-air gathering.',
        },
      ],
      suitableVenues: [
        'Apartment terraces',
        'Villa rooftops',
        'Clubhouse terraces',
        'Hotel rooftops with approval',
        'Covered patios',
      ],
      optionalAddOns: [
        'Weather-backup styling',
        'Lounge seating coordination',
        'Dining-table accents',
        'Photo-frame styling',
        'LED lighting',
      ],
      budgetConsiderations: {
        intro:
          'Terrace décor is custom-quoted, not sold as one-size-fits-all bundles, because the layout, safety requirements and weather plan vary by site.',
        points: [
          {
            title: 'Usable terrace zones',
            description:
              'A single dining area has a different scope from combining lounge, photo and entrance moments.',
          },
          {
            title: 'Outdoor-ready materials',
            description:
              'Weighted bases, weather-suitable lighting, textiles and florals shape material requirements.',
          },
          {
            title: 'Access and crew time',
            description:
              'Stair or lift transport, rooftop setup windows and safe teardown affect labour planning.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Share terrace views',
          detail:
            'Send wide photos, the occasion, guest plan, date, railing details and available power points.',
        },
        {
          step: 'Assess the site',
          detail: 'We review safety, wind, weather backup, access and the usable guest footprint.',
        },
        {
          step: 'Choose the scope',
          detail: 'We recommend a tailored layout and material plan with a custom quote.',
        },
        {
          step: 'Confirm permissions',
          detail: 'Society or venue entry, sound limits, setup and teardown windows are locked.',
        },
      ],
      setupTimeline: [
        {
          step: 'Pre-event review',
          detail: 'The weather plan, venue permissions and design are reconfirmed before setup.',
        },
        {
          step: 'Safe installation',
          detail:
            'The team secures the décor and tests lighting within the approved access window.',
        },
        {
          step: 'Post-event teardown',
          detail: 'Materials are removed at the agreed time while respecting building rules.',
        },
      ],
      themes: [
        {
          name: 'Skyline warm',
          description: 'Amber lights and neutral textiles for urban views.',
        },
        {
          name: 'Garden night',
          description: 'Greenery corners with soft whites.',
        },
        {
          name: 'Festive terrace',
          description: 'Marigold accents with LED diyas.',
        },
        {
          name: 'Monochrome modern',
          description: 'Black-white-gold for adult parties.',
        },
      ],
      areasIntro: 'Terrace layouts are reviewed individually in these common service areas.',
      relatedHrefs: [
        '/services/proposal-decoration',
        '/services/home-decoration',
        '/services/engagement-decoration',
        '/services/birthday-decoration',
      ],
      ctaBody:
        'Send wide terrace photos, railing and power-point views, date and guest plan for a weather-aware proposal.',
      faqs: [
        {
          question: 'Is our terrace safe for decoration?',
          answer:
            'We assess photos for railing clearance, walkways, power access and exposed edges. We will recommend a smaller layout or decline elements that cannot be secured responsibly.',
        },
        {
          question: 'What happens if rain is forecast?',
          answer:
            'We plan a protected backup zone or an indoor shift for the key photo and dining elements. Outdoor décor is not a guarantee against heavy rain, so the contingency is agreed before setup.',
        },
        {
          question: 'How do you handle wind on high-rise terraces?',
          answer:
            'We use weighted, low-profile pieces and avoid tall balloon towers or loose drapes in exposed conditions. Wind can change quickly, so a simpler design is often the safer premium choice.',
        },
        {
          question: 'Can we have a terrace dinner on a limited budget?',
          answer:
            'Lights and one styled table create a useful dining atmosphere without building a full canopy. We focus spending on the zone guests will actually occupy.',
        },
        {
          question: 'What is included in a premium terrace plan?',
          answer:
            'Premium plans can include a defined dining area, lounge corner, photo frame and coordinated lighting. Final scope depends on measurements, building permissions and weather backup.',
        },
        {
          question: 'Do you need society approval or power details?',
          answer:
            'Usually yes. Please confirm vendor entry, sound limits, socket access and the allowed teardown time before we lock the design.',
        },
      ],
    },

    'car-decoration': {
      slug: 'car-decoration',
      title: 'Wedding Car Decoration in Bangalore — From ₹2,500',
      description:
        'Wedding car decoration in Bangalore from ₹2,500 — paint-safe fresh floral & ribbon styling for sedans & SUVs across Bengaluru. 4.9★ rated.',
      serviceType: 'Car decoration',
      ogImage: '/work/car/wedding-car-floral-decoration-bangalore.webp',
      eyebrow: 'Wedding car styling · Bangalore',
      headline: 'Wedding Car Decoration in Bangalore — Paint-Safe Floral Styling',
      subheadline:
        'Silicone suction cups, scratch-free satin ribbons, and highway-speed floral cascades styled at your doorstep anywhere in Bangalore.',
      storyTitle: 'Secure the details before the drive begins',
      storyParagraphs: [
        'A wedding car has to travel, not just pose for a photo. We consider hood shape, sensors, lights, number plates and the route before selecting secure, paint-safe placement for flowers and ribbons.',
        'A simple ribbon-and-board set is a practical value option. Premium fresh florals or a coordinated multi-car look need more time and vehicle-specific planning, especially when a rental company has restrictions.',
      ],
      highlights: [
        {
          title: 'Paint-safe techniques',
          description: 'No harsh adhesives — clips, ribbons, and floral foams placed thoughtfully.',
        },
        {
          title: 'Just-married kits',
          description: 'Classic boards, ribbon tails, and floral hood accents.',
        },
        {
          title: 'Multi-car coordination',
          description: 'Bride, groom, and family cars styled as a set when needed.',
        },
        {
          title: 'Venue-gate timing',
          description: 'We finish close to departure so heat does not cook the blooms.',
        },
      ],
      gallery: [
        {
          src: '/work/car/wedding-car-floral-decoration-bangalore.webp',
          caption: 'Fresh red rose bouquet and satin ribbon bridal car hood styling, Bangalore',
        },
        img('wedding', 0, 'Fresh floral arrangements styled for wedding vehicle departures'),
        img('engagement', 1, 'Soft pastel and rose floral accents for vidai car styling'),
      ],
      testimonial: {
        quote:
          'Ribbons stayed put on Outer Ring Road. The car looked pristine when we reached the hall — no scratched hood.',
        attribution: 'Vidai car · Whitefield to KR Puram venue',
      },
      trustSignals: ['Paint-safe promise', 'Driver coordination', 'On-time departure focus'],
      waPrefill:
        'Hi We Decor! I need wedding car styling in Bangalore. Car model: _____. Date: _____. Pickup: _____. Departure time: _____.',
      whyChooseUsEyebrow: 'Why wedding families book us',
      whyChoose: [
        {
          title: 'Vehicle respect',
          text: 'Rental and family cars alike — we protect paint, sensors, and number plates.',
        },
        {
          title: 'Traffic-proof securing',
          text: 'Urban speeds and potholes are assumed; décor is fixed accordingly.',
        },
        {
          title: 'Synced with the baraat',
          text: 'We take cue times from your planner or family so the car is never the delay.',
        },
      ],
      styles: [
        {
          title: 'Classic just-married',
          description: 'Ribbon, board, and mirrored florals for sedans.',
        },
        {
          title: 'Marigold baraat',
          description: 'Traditional yellow-orange fullness for morning processions.',
        },
        {
          title: 'White rose exit',
          description: 'Soft whites for elegant vidai photographs.',
        },
        {
          title: 'SUV / Innova polish',
          description: 'Proportions adjusted for taller vehicles popular in Bangalore.',
        },
      ],
      idealOccasions: [
        'Wedding vidai cars',
        'Reception arrivals',
        'Baraat vehicles',
        'Engagement day cars',
        'Anniversary surprise cars',
      ],
      included: [
        'Car type assessment',
        'Floral / ribbon scope as quoted',
        'On-location install at pickup point',
        'Paint-safe fixing methods',
        'Last-look check before departure',
        'Optional matching for second car',
      ],
      howWeCustomize: [
        {
          title: 'Vehicle assessment',
          description:
            'The car model, hood shape, sensors, lights, grille and number plate guide safe placement.',
        },
        {
          title: 'Journey and timing',
          description:
            'Pickup point, departure time, route and fresh-flower exposure inform the installation plan.',
        },
        {
          title: 'Wedding style match',
          description:
            'Florals and ribbons can complement your stage palette, invitation or ceremony colours.',
        },
        {
          title: 'Single or multiple cars',
          description:
            'We tailor the scope for the lead vehicle alone or coordinated family and wedding cars.',
        },
        {
          title: 'Paint-safe materials',
          description:
            'Ribbons, clips and floral mechanics are chosen to respect the vehicle finish and rental restrictions.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Ribbon and just-married detail',
          description: 'A restrained celebratory finish that keeps driving visibility clear.',
        },
        {
          title: 'Floral hood accents',
          description: 'Paint-safe fresh or hybrid florals placed around the vehicle’s features.',
        },
        {
          title: 'Vidai exit styling',
          description: 'Soft florals and ribbons designed for departure photographs.',
        },
        {
          title: 'Coordinated vehicle styling',
          description: 'Related details for the couple’s and family vehicles.',
        },
      ],
      suitableVenues: [
        'Home pickup points',
        'Marriage halls',
        'Hotel driveways',
        'Wedding venues',
        'Rental-car handover locations',
      ],
      optionalAddOns: [
        'Just-married board',
        'Matching second-car styling',
        'Fresh floral upgrades',
        'Ribbon colour matching',
        'Stage-palette coordination',
      ],
      budgetConsiderations: {
        intro:
          'Car decoration is quoted as a custom, vehicle-specific scope—not a one-size-fits-all bundle—after we review the car, route and timing.',
        points: [
          {
            title: 'Vehicle count and coverage',
            description:
              'A single-car detail differs from coordinated treatment for several wedding vehicles.',
          },
          {
            title: 'Floral and ribbon choices',
            description:
              'Fresh-flower density, selected varieties, ribbons and signs determine the material plan.',
          },
          {
            title: 'On-location timing',
            description:
              'Pickup access, departure deadlines, vehicle checks and secure fitting affect crew time.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Share car details',
          detail: 'Send the model, pickup address, date, departure time and rental restrictions.',
        },
        {
          step: 'Review safe placement',
          detail: 'We check the vehicle shape, sensors, visibility and wedding colour references.',
        },
        {
          step: 'Confirm the custom scope',
          detail:
            'You receive a tailored quote for the agreed styling and optional second-car details.',
        },
        {
          step: 'Coordinate departure',
          detail: 'We confirm driver contact, access and the final installation window.',
        },
      ],
      setupTimeline: [
        {
          step: 'Before the wedding day',
          detail:
            'Vehicle details, rental approval and styling direction are confirmed in advance.',
        },
        {
          step: 'Near-departure install',
          detail: 'The team fits and safety-checks the décor close to the planned departure.',
        },
        {
          step: 'Final handover',
          detail:
            'We confirm lights, plates, sensors and driving visibility remain clear before the car leaves.',
        },
      ],
      themes: [
        {
          name: 'Red-rose romance',
          description: 'Bold florals for evening exits.',
        },
        {
          name: 'Marigold traditional',
          description: 'Daytime baraat energy.',
        },
        {
          name: 'Ivory minimal',
          description: 'Quiet elegance for luxury cars.',
        },
        {
          name: 'Pastel engagement',
          description: 'Soft tones for daytime ring ceremonies.',
        },
      ],
      areasIntro: 'We coordinate pickup-point car styling in these service areas.',
      relatedHrefs: [
        '/services/wedding-setup',
        '/services/floral-decoration',
        '/services/wedding-setup',
        '/services/engagement-decoration',
      ],
      ctaBody:
        'Send the car model, pickup address, departure time and any rental restrictions for a paint-safe plan.',
      faqs: [
        {
          question: 'Will the car decoration damage paint or sensors?',
          answer:
            'We use paint-safe fixing methods and keep decorations clear of lights, sensors and number plates. Tell us if the vehicle is rented or has any restrictions before we begin.',
        },
        {
          question: 'How close to departure should the car be decorated?',
          answer:
            'We aim to finish near the planned departure so fresh flowers and ribbons look their best for the drive. Share the driver’s arrival time and allow a practical buffer.',
        },
        {
          question: 'Can you decorate an SUV or luxury rental car?',
          answer:
            'Yes, after confirming the model and rental-company rules. Larger hoods and grilles need a different proportion and some fleets prohibit particular fixtures.',
        },
        {
          question: 'What is a budget-friendly wedding car option?',
          answer:
            'A ribbon and board set with a restrained floral detail gives the car a celebratory finish while keeping the vehicle easy to drive and photograph.',
        },
        {
          question: 'What does a premium car décor setup usually add?',
          answer:
            'Premium options can include fuller fresh-floral coverage and coordinated styling for multiple vehicles. We confirm safe placement and materials for each vehicle separately.',
        },
        {
          question: 'Can you match the car to our wedding stage colours?',
          answer:
            'Yes. Send the stage palette or invitation reference and we will propose flowers and ribbons that connect the arrival look to the celebration.',
        },
      ],
    },

    'naming-ceremony-decoration': {
      slug: 'naming-ceremony-decoration',
      title: 'Naming Ceremony Decoration Bangalore — Cradle Decor ₹5,000',
      description:
        'Naming ceremony (Namakarana) & cradle decoration in Bangalore from ₹5,000 — fresh jasmine, marigold, pastel balloon rings & apartment-safe home setups.',
      serviceType: 'Naming ceremony decoration',
      ogImage: SERVICE_IMAGES.engagement,
      eyebrow: 'Namakarana · Cradle decor · Bangalore',
      headline: 'Naming Ceremony & Cradle Decoration in Bangalore — From ₹5,000',
      subheadline:
        'Fresh jasmine and marigold cradle draping, pastel Oh Baby balloon rings, and traditional home puja backdrops styled across Bangalore apartments and party halls.',
      storyTitle: 'Gentle styling around the cradle and morning ritual',
      storyParagraphs: [
        'A naming ceremony (Namakarana) brings elders, newborns, and close family into one compact space—usually a living room or clubhouse hall. Our setups frame the cradle without blocking puja mats, natural light, or photography sightlines.',
        'Choose between traditional mango-leaf, marigold, and jasmine cradle accents or modern pastel balloon arcs with soft welcome signage, always installed with baby-safe, zero-drill fixtures.',
      ],
      highlights: [
        {
          title: 'Traditional & modern cradle florals',
          description:
            'Fresh jasmine strings, rose petals, and soft pastel drapes styled safely around wooden or brass cradles.',
        },
        {
          title: 'Baby-safe & zero-drill mounting',
          description:
            'Hypoallergenic fresh flowers or low-odour setups with zero wall nails, heavy staples, or messy confetti.',
        },
        {
          title: 'Apartment & morning-muhurat timing',
          description:
            'Early morning setups timed before the priest arrives, plus tidy post-lunch teardown.',
        },
        {
          title: 'Matched backdrop + welcome board',
          description:
            'Coordinated name-reveal easel, photo backdrop, and brass urli accents in one seamless booking.',
        },
      ],
      gallery: [
        img(
          'naming-ceremony',
          0,
          'Traditional Naming Ceremony cradle and backdrop in HSR Layout, Bangalore'
        ),
        img(
          'naming-ceremony',
          1,
          'Namakarana floral stage and seating setup in Jayanagar, Bangalore'
        ),
        img(
          'baby shower',
          0,
          'Pastel balloon ring and floral accents adaptable for naming ceremonies'
        ),
      ],
      testimonial: {
        quote:
          'They finished our cradle florals by 7:30 AM before the priest arrived and left the living room spotless after lunch.',
        attribution: 'Namakarana · Jayanagar home',
      },
      trustSignals: ['Early morning slots', 'Apartment-safe installs', '4.9★ Bangalore rated'],
      waPrefill:
        'Hi We Decor! I need Naming Ceremony / Cradle decoration in Bangalore. Date: _____. Area: _____. Home or Hall: _____. Style (Traditional / Pastel): _____.',
      whyChooseUsEyebrow: 'Why Bangalore parents trust us',
      whyChoose: [
        {
          title: 'Morning muhurat punctuality',
          text: 'Our crew arrives early enough to finish quietly before guests and priests gather.',
        },
        {
          title: 'Cradle-safe attachments',
          text: 'Soft ribbons and weighted bases keep florals secure around the baby without crowding the cradle.',
        },
        {
          title: 'Compact apartment layouts',
          text: 'Designed for standard 2BHK/3BHK living rooms so elders have comfortable seating around the ritual.',
        },
      ],
      styles: [
        {
          title: 'Jasmine & marigold Namakarana',
          description:
            'Traditional South Indian floral strings, brass urlis, and mango-leaf accents.',
        },
        {
          title: 'Pastel cloud & balloon arch',
          description:
            'Soft sage, dusty blue, blush, or cream organic balloons with a wooden name easel.',
        },
        {
          title: 'Ivory & rose floral ring',
          description: 'Minimalist circular frame behind the cradle for clean family portraits.',
        },
        {
          title: 'Clubhouse celebration wall',
          description: 'Wider backdrop with cake table styling and entrance welcome stand.',
        },
      ],
      idealOccasions: [
        'Traditional Namakarana at home',
        'Aqiqah & baby welcome gatherings',
        'Cradle ceremony (Thottil) setups',
        'Apartment clubhouse baby luncheons',
      ],
      included: [
        'Cradle floral & ribbon styling',
        'Main backdrop frame (floral or balloon)',
        'Warm fairy lighting & drapes',
        'On-time setup & post-event teardown',
      ],
      howWeCustomize: [
        {
          title: 'Cradle & room check',
          description:
            'Share a photo of your cradle and living room wall so we size the backdrop cleanly.',
        },
        {
          title: 'Theme & name reveal',
          description: 'Traditional florals, pastel balloons, or a custom baby-name welcome sign.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Home cradle + backdrop',
          description:
            'Complete living-room focal backdrop plus fresh floral cradle garlands from ₹5,000.',
        },
        {
          title: 'Clubhouse naming stage',
          description:
            'Full photo wall, cradle corner, cake table accents, and entry welcome board.',
        },
      ],
      suitableVenues: [
        '2BHK / 3BHK apartments',
        'Independent homes',
        'Society clubhouses',
        'Banquet halls',
      ],
      optionalAddOns: [
        'Custom baby name board',
        'Brass urli flower bowls',
        'Entrance welcome arch',
      ],
      budgetConsiderations: {
        intro: 'Naming ceremony packages start from ₹5,000 for home cradle and backdrop setups.',
        points: [
          {
            title: 'Fresh florals vs. balloon backdrop',
            description:
              'Dense jasmine and orchid cradle work costs more than seasonal marigold or pastel balloons.',
          },
          {
            title: 'Home vs. hall footprint',
            description:
              'Compact living-room walls stay in the ₹5,000–₹10,000 tier; full hall stages scale up.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Send cradle & room photo',
          detail: 'WhatsApp your date, area, and living room or hall photo.',
        },
        {
          step: 'Pick a style',
          detail: 'Choose traditional floral, pastel balloon, or mixed cradle styling.',
        },
        {
          step: 'Confirm slot',
          detail: 'Lock your morning muhurat or afternoon celebration timing.',
        },
      ],
      setupTimeline: [
        { step: 'Morning setup', detail: '60–90 minutes before the ceremony begins.' },
        { step: 'Teardown', detail: 'Scheduled after lunch or evening departure.' },
      ],
      themes: [
        {
          name: 'South Indian jasmine & marigold',
          description: 'Fragrant white jasmine, yellow marigold, and brass accents.',
        },
        {
          name: 'Pastel Sage & Cream',
          description: 'Neutral organic balloons and soft baby-breath florals.',
        },
      ],
      areasIntro: 'We style naming ceremonies across all Bangalore neighbourhoods.',
      relatedHrefs: [
        '/services/baby-shower-decoration',
        '/services/birthday-decoration',
        '/services/home-decoration',
        '/services/floral-decoration',
      ],
      ctaBody:
        'Send your Naming Ceremony date, area, and cradle photo for a fast Bangalore quote starting from ₹5,000.',
      faqs: [
        {
          question: 'How much does naming ceremony decoration cost in Bangalore?',
          answer:
            'Naming ceremony (Namakarana) and cradle decoration in Bangalore starts from ₹5,000 for an apartment-friendly backdrop and fresh floral cradle styling, scaling with stage width and flower density.',
        },
        {
          question: 'Can you finish the decoration early in the morning for a Namakarana muhurat?',
          answer:
            'Yes. We regularly complete home naming ceremony installations by 7:00–8:30 AM across Bangalore so everything is ready before the priest and elders arrive.',
        },
        {
          question: 'Do you decorate both wooden cradles and modern baby bassinets?',
          answer:
            'Yes. We use soft satin ribbons and non-marking clips tailored to traditional wooden cradles, brass cradles, or modern bassinets without scratching finishes.',
        },
      ],
    },

    'reception-decoration': {
      slug: 'reception-decoration',
      title: 'Wedding Reception Stage Decoration Bangalore — From ₹5,000',
      description:
        'Wedding reception stage decoration in Bangalore from ₹5,000 — grand couple backdrops, fresh floral arches, LED lighting & banquet entrance decor. 4.9★ rated.',
      serviceType: 'Wedding reception decoration',
      ogImage: SERVICE_IMAGES.engagement,
      eyebrow: 'Wedding Reception · Stage & Hall · Bangalore',
      headline: 'Wedding Reception Stage Decoration in Bangalore — From ₹5,000',
      subheadline:
        'Statement couple stages, cascading floral frames, warm ambient chandeliers, and welcoming banquet entrances engineered for evening wedding photography.',
      storyTitle: 'Built for evening lighting and couple portraits',
      storyParagraphs: [
        'A reception stage is photographed for hours under hall lights and camera flashes. We balance backdrop width, sofa placement, and warm LED uplighting so the couple stands out cleanly without harsh shadows.',
        'Whether it is a 200-guest hotel banquet, a traditional choultry, or an intimate terrace dinner reception, we tailor the floral density and stage geometry to your exact hall dimensions.',
      ],
      highlights: [
        {
          title: 'Wide-frame couple stages',
          description:
            'Proportioned 12ft to 24ft backdrops with lush rose, hydrangea, and orchid focal pockets.',
        },
        {
          title: 'Evening lighting & chandeliers',
          description:
            'Warm fairy curtains, crystal drops, and stage uplights balanced for DSLR & flash photography.',
        },
        {
          title: 'Entrance arch & photo walkway',
          description:
            'Coordinated hall entry arches, welcome signage, and candlelit aisle stands.',
        },
        {
          title: 'Banquet & choultry experience',
          description:
            'Smooth coordination with Bangalore convention halls, hotels, and clubhouses on load-in slots.',
        },
      ],
      gallery: [
        img('reception', 0, 'Evening wedding reception floral stage setup in Bangalore'),
        img(
          'reception',
          1,
          'Grand couple seating backdrop with warm lighting in Malleshwaram, Bangalore'
        ),
        img('reception', 2, 'Banquet reception stage and floral arch in Nagarbhavi, Bangalore'),
      ],
      testimonial: {
        quote:
          'Every single guest commented on the reception stage lighting and fresh flowers. Setup finished two hours before our entry.',
        attribution: 'Reception · Malleshwaram banquet hall',
      },
      trustSignals: ['Free hall site visit', 'Photogenic evening lighting', '4.9★ (82 reviews)'],
      waPrefill:
        'Hi We Decor! I need Wedding Reception stage decoration in Bangalore. Date: _____. Venue/Hall: _____. Guest count: _____.',
      whyChooseUsEyebrow: 'Why Bangalore couples book us for receptions',
      whyChoose: [
        {
          title: 'Zero glare, rich depth',
          text: 'We place florals and matte drapes around warm lighting so photographs never wash out.',
        },
        {
          title: 'Reliable venue load-in',
          text: 'Our crew coordinates directly with choultry and hotel managers so the stage is ready ahead of arrival.',
        },
        {
          title: 'Custom couple seating',
          text: 'Sofas, loveseats, and side floral pedestals matched to your reception outfits.',
        },
      ],
      styles: [
        {
          title: 'Ivory & gold chandelier stage',
          description: 'Classic warm cream drapes, white roses, and suspended crystal accents.',
        },
        {
          title: 'Crimson & champagne floral wall',
          description: 'Rich evening palette suited for grand Indian wedding receptions.',
        },
        {
          title: 'Botanical glasshouse frame',
          description:
            'Architectural arches with eucalyptus, white orchids, and warm Edison bulbs.',
        },
        {
          title: 'Intimate terrace reception',
          description: 'Fairy-lit canopy with floral couple backdrop for 50–120 guests.',
        },
      ],
      idealOccasions: [
        'Evening wedding reception stages',
        'Walima & Valima banquet receptions',
        'Post-wedding family dinner parties',
        'Intimate terrace & lawn receptions',
      ],
      included: [
        'Main reception stage frame & draping',
        'Fresh or premium mixed floral arrangements',
        'Warm stage lighting & uplighters',
        'On-site install & late-night teardown',
      ],
      howWeCustomize: [
        {
          title: 'Stage width measurement',
          description:
            'We match stage span (10ft–24ft+) to your banquet hall and guest greeting queue.',
        },
        {
          title: 'Outfit & theme sync',
          description: 'Share your reception lehenga/sherwani or gown shade for tailored florals.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Intimate reception frame',
          description: 'Compact floral couple backdrop and lighting for 50–100 guests from ₹5,000.',
        },
        {
          title: 'Grand banquet stage + entry',
          description: 'Full hall stage, couple seating, entrance arch, and welcome aisle.',
        },
      ],
      suitableVenues: [
        'Marriage halls & choultries',
        'Hotel banquets',
        'Resort lawns',
        'Society clubhouses',
      ],
      optionalAddOns: [
        'Couple sofa / loveseat',
        'Entrance floral tunnel',
        'Photo booth corner',
        'Welcome LED board',
      ],
      budgetConsiderations: {
        intro:
          'Reception stage decoration starts from ₹5,000 for intimate backdrops and scales with hall stage width.',
        points: [
          {
            title: 'Stage span & floral coverage',
            description:
              'Full 20ft+ fresh floral walls require significantly more stems and rigging than 10ft focal frames.',
          },
          {
            title: 'Entrance & seating add-ons',
            description:
              'Adding banquet entrance arches, aisle stands, and sofa rentals adjusts the final package.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Share venue & date',
          detail: 'Send the banquet hall name, date, and reference photos you like.',
        },
        {
          step: 'Stage layout & quote',
          detail: 'We propose stage dimensions, floral options, and clear pricing.',
        },
        {
          step: 'Event-day execution',
          detail: 'Completed ahead of guest arrival with post-event teardown.',
        },
      ],
      setupTimeline: [
        { step: 'Hall setup', detail: '3–5 hours prior to reception start.' },
        { step: 'Teardown', detail: 'Same night after dinner concludes.' },
      ],
      themes: [
        {
          name: 'Royal Ivory & Gold',
          description: 'Timeless cream drapes with warm chandeliers and white florals.',
        },
        {
          name: 'Pastel Blush & Sage',
          description: 'Soft garden-inspired romantic reception backdrop.',
        },
      ],
      areasIntro: 'We style wedding reception stages at halls and hotels across Bengaluru.',
      relatedHrefs: [
        '/services/wedding-setup',
        '/services/valima-decoration',
        '/services/engagement-decoration',
        '/services/car-decoration',
      ],
      ctaBody:
        'Share your reception date and banquet hall name in Bangalore for a tailored stage quote.',
      faqs: [
        {
          question:
            'What is the starting price for wedding reception stage decoration in Bangalore?',
          answer:
            'Intimate reception backdrop setups start from ₹5,000, while full-width banquet hall stages with fresh floral arches, couple sofas, lighting, and entrance decor are custom quoted based on stage span and flower density.',
        },
        {
          question: 'Do you provide couple sofas and hall entrance decoration together?',
          answer:
            'Yes. We can bundle couple seating, stage backdrop, entrance floral arch, and welcome standees into one coordinated reception package.',
        },
        {
          question: 'How early does your team set up before an evening reception?',
          answer:
            'We typically begin setup 3–5 hours before the reception start time and finish ahead of couple photography.',
        },
      ],
    },

    'roka-decoration': {
      slug: 'roka-decoration',
      title: 'Roka & Baat Pakki Decoration in Bangalore — From ₹5,000',
      description:
        'Roka ceremony & Baat Pakki home decoration in Bangalore from ₹5,000 — intimate floral rings, living-room backdrops, sofa styling & apartment-safe installs.',
      serviceType: 'Roka ceremony decoration',
      ogImage: SERVICE_IMAGES.engagement,
      eyebrow: 'Roka · Baat Pakki · Home Ceremony · Bangalore',
      headline: 'Roka & Baat Pakki Decoration in Bangalore — Intimate Home Setups',
      subheadline:
        'Tasteful living-room floral arches, brass urlis, and warm fairy lighting designed for apartment Roka and Baat Pakki ceremonies without crowding your home.',
      storyTitle: 'Tailored for close-family living room ceremonies',
      storyParagraphs: [
        'Roka and Baat Pakki ceremonies usually happen right at home or in an apartment clubhouse with 15 to 40 close relatives. Oversized wedding stages overwhelm a flat—our compact floral frames elevate your sofa wall while keeping seating comfortable.',
        'We match fresh marigolds, pastel roses, or ivory drapes to your outfits and ensure zero wall marks or drill holes.',
      ],
      highlights: [
        {
          title: 'Living-room scaled frames',
          description:
            'Compact 6ft–10ft floral rings, hexagons, and drape backdrops built for 2BHK/3BHK flats.',
        },
        {
          title: 'Zero-damage apartment installs',
          description:
            'Freestanding weighted frames with zero wall nails, tape residue, or floor scratches.',
        },
        {
          title: 'Gift & shagun corner styling',
          description:
            'Coordinated floral accents around your shagun thal table and family seating.',
        },
        {
          title: 'Same-day install & clean teardown',
          description:
            'Quick 90-minute morning or afternoon setup with tidy removal after guests leave.',
        },
      ],
      gallery: [
        img('engagement', 0, 'Intimate pastel floral frame for home Roka ceremony in Bangalore'),
        img(
          'engagement',
          1,
          'Apartment-friendly floral ring backdrop for Baat Pakki family photos'
        ),
        img('haldi', 0, 'Traditional marigold and urli styling adaptable for morning Roka rituals'),
      ],
      testimonial: {
        quote:
          'We wanted something classy for our daughter’s Roka in our Koramangala flat without blocking the sofa—they nailed the proportions.',
        attribution: 'Roka ceremony · Koramangala apartment',
      },
      trustSignals: ['Apartment-safe frames', 'From ₹5,000 packages', '4.9★ Bangalore rated'],
      waPrefill:
        'Hi We Decor! I need Roka / Baat Pakki decoration at home in Bangalore. Date: _____. Area: _____. Living room or Clubhouse: _____.',
      whyChooseUsEyebrow: 'Why families choose us for Roka & Baat Pakki',
      whyChoose: [
        {
          title: 'Proportioned for real homes',
          text: 'We measure your sofa wall and ceiling height first so the decor photographs effortlessly.',
        },
        {
          title: 'Fresh, fragrant blooms',
          text: 'Roses, carnations, orchids, and jasmine styled fresh on the morning of your Roka.',
        },
        {
          title: 'Society-friendly crew',
          text: 'Quiet lift transport and punctual setup respecting apartment society rules.',
        },
      ],
      styles: [
        {
          title: 'Pastel floral ring + fairy lights',
          description: 'Soft blush and white roses around a gold metallic ring behind your sofa.',
        },
        {
          title: 'Ivory drape & marigold elegance',
          description: 'Warm traditional touch with brass urlis and marigold garlands.',
        },
        {
          title: 'Minimal botanical arch',
          description: 'Eucalyptus greenery and cream florals for modern apartment aesthetics.',
        },
        {
          title: 'Clubhouse Roka backdrop',
          description: 'Wider 12ft frame with welcome board for 40–80 guests.',
        },
      ],
      idealOccasions: [
        'Home Roka ceremonies',
        'Baat Pakki family meetings',
        'Intimate Chunni Chadana setups',
        'Small engagement & tilak functions',
      ],
      included: [
        'Backdrop stand (ring, arch, or frame)',
        'Fresh floral pockets & drapes',
        'Warm fairy or LED accent lighting',
        'Same-day setup and teardown',
      ],
      howWeCustomize: [
        {
          title: 'Wall & sofa photo check',
          description:
            'Send a quick living-room photo on WhatsApp so we fit the frame around your seating.',
        },
        {
          title: 'Palette matching',
          description: 'Coordinate florals with the bride and groom’s Roka outfits.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Compact home Roka backdrop',
          description: 'Living-room floral ring or drape setup starting from ₹5,000.',
        },
        {
          title: 'Home Roka + entrance & table accents',
          description: 'Backdrop plus main-door toran, shagun table florals, and brass urlis.',
        },
      ],
      suitableVenues: [
        'Apartments & flats',
        'Independent houses',
        'Society clubhouses',
        'Boutique restaurant rooms',
      ],
      optionalAddOns: ['Main-door floral toran', 'Brass urli centerpieces', 'Custom welcome easel'],
      budgetConsiderations: {
        intro: 'Home Roka and Baat Pakki backdrops start from ₹5,000 across Bangalore.',
        points: [
          {
            title: 'Fresh flower density',
            description:
              'Focal floral pockets keep budgets near ₹5,000; full-ring rose coverage scales up.',
          },
          {
            title: 'Additional zones',
            description: 'Adding doorway florals or shagun table styling adjusts the final quote.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Send room photo',
          detail: 'Share your date, Bangalore locality, and wall/sofa photo.',
        },
        {
          step: 'Select design',
          detail: 'Pick from floral ring, arch, or traditional drape concepts.',
        },
        {
          step: 'Relax on Roka day',
          detail: 'We set up cleanly in 60–90 minutes before relatives arrive.',
        },
      ],
      setupTimeline: [
        { step: 'Setup', detail: '60–90 minutes prior to family arrival.' },
        { step: 'Teardown', detail: 'Same evening or next morning per your preference.' },
      ],
      themes: [
        {
          name: 'Blush & Gold Ring',
          description: 'Soft pink roses, cream drapes, and warm fairy lights.',
        },
        {
          name: 'Saffron & Jasmine',
          description: 'Classic Indian auspicious tones with brass urlis.',
        },
      ],
      areasIntro: 'Available for home Roka & Baat Pakki setups across all Bangalore localities.',
      relatedHrefs: [
        '/services/engagement-decoration',
        '/services/haldi-decoration',
        '/services/home-decoration',
        '/services/wedding-setup',
      ],
      ctaBody:
        'Share your Roka or Baat Pakki date and living-room photo on WhatsApp for a quick ₹5,000+ quote.',
      faqs: [
        {
          question: 'How much does Roka or Baat Pakki decoration cost at home in Bangalore?',
          answer:
            'Intimate home Roka and Baat Pakki setups in Bangalore start from ₹5,000, including backdrop frame, drapes, fresh floral accents, lighting, and teardown.',
        },
        {
          question: 'Will the decoration fit behind our living-room sofa without moving furniture?',
          answer:
            'Yes. We use slim freestanding frames that tuck cleanly behind most 3-seater sofas without damaging walls or requiring heavy furniture shifting.',
        },
        {
          question: 'Can you include matching decor for the shagun/gift table and main entrance?',
          answer:
            'Yes, we can add brass urlis, small floral runners for the gift table, and a fresh floral doorway toran.',
        },
      ],
    },

    'valima-decoration': {
      slug: 'valima-decoration',
      title: 'Valima, Walima & Shukrana Stage Decoration Bangalore — ₹5,000',
      description:
        'Valima (Walima) reception & Shukrana decoration in Bangalore from ₹5,000 — grand floral couple stages, banquet lighting & serene home setups. 4.9★ rated.',
      serviceType: 'Valima decoration',
      ogImage: SERVICE_IMAGES.engagement,
      eyebrow: 'Valima · Walima · Shukrana · Bangalore',
      headline: 'Valima, Walima & Shukrana Stage Decoration in Bangalore',
      subheadline:
        'Grand Walima banquet reception stages and serene home Shukrana prayer setups—crafted with fresh floral arches, warm chandeliers, and respectful family seating.',
      storyTitle: 'Honouring both grand receptions and quiet family prayers',
      storyParagraphs: [
        'A Valima (Walima) reception celebrates the newlyweds in style—calling for a statement couple stage, lush florals, and flattering evening lighting across Shadi Mahals and hotel banquets.',
        'For a home Shukrana gathering, the mood shifts to warmth and gratitude: serene focal backdrops, fragrant jasmine and rose urlis, and unobstructed elder seating.',
      ],
      highlights: [
        {
          title: 'Grand Walima couple stages',
          description:
            'Wide floral arches, plush couple seating frames, chandeliers, and banquet entry decor.',
        },
        {
          title: 'Serene Shukrana home setups',
          description:
            'Graceful living-room backdrops, brass urli centerpieces, and warm fairy lighting.',
        },
        {
          title: 'Shadi Mahal & hotel coordination',
          description:
            'Experienced across Bangalore marriage halls, community centres, and hotel ballrooms.',
        },
        {
          title: 'Custom colour palettes',
          description:
            'Ivory & gold, emerald & champagne, or soft pastel florals tailored to your Valima attire.',
        },
      ],
      gallery: [
        img('reception', 0, 'Grand Walima / Valima floral stage setup in Bangalore'),
        img('wedding', 0, 'Ivory and rose reception backdrop for Valima celebration'),
        img('engagement', 0, 'Intimate floral frame suited for home Shukrana gatherings'),
      ],
      testimonial: {
        quote:
          'Our Walima stage looked grand yet graceful, and the entrance florals welcomed over 400 guests seamlessly.',
        attribution: 'Walima reception · Shivajinagar / Benson Town hall',
      },
      trustSignals: ['Shadi Mahal ready', 'From ₹5,000 setups', '4.9★ Bangalore rated'],
      waPrefill:
        'Hi We Decor! I need Valima / Walima or Shukrana decoration in Bangalore. Date: _____. Venue/Area: _____. Guest count: _____.',
      whyChooseUsEyebrow: 'Why Bangalore families book us for Valima & Shukrana',
      whyChoose: [
        {
          title: 'Respectful & photogenic',
          text: 'Dignified layouts that keep family elders comfortable while giving couples a standout photo stage.',
        },
        {
          title: 'Fresh, dense florals',
          text: 'Roses, jasmine, orchids, and greenery installed fresh for evening receptions or daytime lunches.',
        },
        {
          title: 'End-to-end execution',
          text: 'From stage frame and lighting to hall entrance arches and prompt post-event clearance.',
        },
      ],
      styles: [
        {
          title: 'Emerald & gold Walima stage',
          description: 'Rich evening drapes, warm chandeliers, and ivory-gold floral clusters.',
        },
        {
          title: 'Ivory rose & crystal backdrop',
          description: 'Luminous white floral frame suited for hotel and Shadi Mahal receptions.',
        },
        {
          title: 'Shukrana jasmine & urli home corner',
          description: 'Intimate prayer and family dining backdrop with fresh fragrant blooms.',
        },
        {
          title: 'Garden pastel reception arch',
          description: 'Soft blush and greenery styling for daytime or lawn Walima events.',
        },
      ],
      idealOccasions: [
        'Grand Walima / Valima banquet receptions',
        'Home Shukrana prayer & dinner gatherings',
        'Shadi Mahal & community hall receptions',
        'Intimate family Walima luncheons',
      ],
      included: [
        'Stage backdrop frame & fabric draping',
        'Fresh floral arrangements per selected plan',
        'Ambient stage & chandelier lighting',
        'Full setup and teardown',
      ],
      howWeCustomize: [
        {
          title: 'Hall or home sizing',
          description: 'We size the backdrop to Shadi Mahal stages or compact home living rooms.',
        },
        {
          title: 'Attire & menu flow',
          description: 'Layouts ensure clear paths for stage greetings and dining areas.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Home Shukrana setup',
          description: 'Intimate focal backdrop, urlis, and warm lighting from ₹5,000.',
        },
        {
          title: 'Full Walima reception stage',
          description: 'Wide couple stage, entrance floral arch, and banquet lighting.',
        },
      ],
      suitableVenues: ['Shadi Mahals', 'Marriage halls', 'Hotel banquets', 'Homes & apartments'],
      optionalAddOns: [
        'Couple sofa seating',
        'Banquet entrance arch',
        'Aisle floral stands',
        'Table centerpieces',
      ],
      budgetConsiderations: {
        intro:
          'Home Shukrana setups start from ₹5,000; full Walima banquet stages are custom-scoped by hall width.',
        points: [
          {
            title: 'Stage width & hall height',
            description:
              'Larger Shadi Mahal stages require wider rigging and higher floral volume.',
          },
          {
            title: 'Fresh floral varieties',
            description:
              'Orchids and imported roses scale above classic rose, carnation, and jasmine mixes.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Share venue details',
          detail: 'WhatsApp the hall name or home photo with your Valima date.',
        },
        { step: 'Design & quote', detail: 'Receive stage layout options tailored to your budget.' },
        { step: 'On-time setup', detail: 'Installed ahead of guest arrival with clean teardown.' },
      ],
      setupTimeline: [
        { step: 'Setup window', detail: '2–5 hours before event start depending on hall scale.' },
        { step: 'Teardown', detail: 'Completed promptly after event conclusion.' },
      ],
      themes: [
        {
          name: 'Royal Emerald & Ivory',
          description: 'Deep green richness balanced with crisp white florals and gold.',
        },
        {
          name: 'Warm Pearl Shukrana',
          description: 'Soft cream drapes, jasmine, and brass urli warmth.',
        },
      ],
      areasIntro: 'Serving Shadi Mahals, banquet halls, and homes across Bangalore.',
      relatedHrefs: [
        '/services/nikah-decoration',
        '/services/reception-decoration',
        '/services/wedding-setup',
        '/services/car-decoration',
      ],
      ctaBody:
        'Send your Valima, Walima, or Shukrana date and venue in Bangalore for a tailored quote.',
      faqs: [
        {
          question: 'What is the starting cost for Valima or Shukrana decoration in Bangalore?',
          answer:
            'Intimate home Shukrana and small Walima backdrops start from ₹5,000, while grand Shadi Mahal and banquet reception stages are custom quoted based on stage size and floral coverage.',
        },
        {
          question: 'Can you decorate both our Nikah and Valima stages as a package?',
          answer:
            'Yes. Many Bangalore families book both Nikah and Walima stages together with distinct colour palettes for each day.',
        },
        {
          question: 'Do you set up inside Bangalore Shadi Mahals and community halls?',
          answer:
            'Yes, we regularly coordinate with Shadi Mahal and marriage hall managers across Bengaluru for timely setup and teardown.',
        },
      ],
    },

    'mehndi-decoration': {
      slug: 'mehndi-decoration',
      title: 'Mehndi Decoration in Bangalore — Colorful Home & Hall Setups ₹5,000',
      description:
        'Mehndi ceremony decoration in Bangalore from ₹5,000 — marigold backdrops, colorful drapes, cushion seating & terrace setups across Bengaluru. 4.9★ rated.',
      serviceType: 'Mehndi decoration',
      ogImage: SERVICE_IMAGES.haldi,
      eyebrow: 'Mehndi · Sangeet · Home & Terrace · Bangalore',
      headline: 'Mehndi Ceremony Decoration in Bangalore — Vibrant Setups from ₹5,000',
      subheadline:
        'Colorful drape canopies, marigold & floral swings, comfortable low cushion seating, and terrace fairy lighting styled for relaxed afternoon and evening Mehndi functions.',
      storyTitle: 'Built for relaxed seating, music, and hours of henna',
      storyParagraphs: [
        'A Mehndi function runs for hours while guests chat, apply henna, and dance. Instead of stiff formal stages, we style vibrant floral backdrops with comfortable bridal seating, bolsters, and clear space for mehndi artists.',
        'From compact apartment living rooms to breezy villa terraces and banquet lawns, our setups stay bright in afternoon sunlight and warm under evening fairy lights.',
      ],
      highlights: [
        {
          title: 'Vibrant drapes & floral pops',
          description:
            'Lime green, fuchsia, mustard, and marigold palettes with jasmine and rose garlands.',
        },
        {
          title: 'Mehndi seating & bolsters',
          description:
            'Proportioned bridal seating zones with clear side space for mehndi artists and photographers.',
        },
        {
          title: 'Terrace & courtyard ready',
          description:
            'Weighted canopies, pom-poms, kaleere hangings, and fairy lights built for open-air breezes.',
        },
        {
          title: 'Home-to-venue flexibility',
          description:
            'Apartment-safe freestanding frames or full banquet lawn setups across Bangalore.',
        },
      ],
      gallery: [
        img('mehndi', 0, 'Vibrant Mehndi ceremony floral backdrop in Bangalore'),
        img('mehndi', 1, 'Colorful home Mehndi drape and seating styling in Bengaluru'),
        img('haldi', 0, 'Marigold and brass urli accents adaptable for daytime Mehndi rituals'),
      ],
      testimonial: {
        quote:
          'The terrace Mehndi looked festive from afternoon straight into the evening sangeet without a single drape coming loose.',
        attribution: 'Mehndi ceremony · Indiranagar terrace',
      },
      trustSignals: ['From ₹5,000 packages', 'Apartment & terrace ready', '4.9★ Bangalore rated'],
      waPrefill:
        'Hi We Decor! I need Mehndi decoration in Bangalore. Date: _____. Area: _____. Home, Terrace, or Hall: _____.',
      whyChooseUsEyebrow: 'Why Bangalore brides book us for Mehndi',
      whyChoose: [
        {
          title: 'Artist-friendly spacing',
          text: 'We keep good light and comfortable reach around the bride’s chair or diwan.',
        },
        {
          title: 'Day-to-night lighting',
          text: 'Warm fairy lights keep the backdrop glowing once sunset hits.',
        },
        {
          title: 'Combine with Haldi',
          text: 'Bundle your Mehndi and Haldi decor with coordinated yet distinct colour themes.',
        },
      ],
      styles: [
        {
          title: 'Rajasthani / Boho drape & marigold',
          description: 'Bright jewel-toned drapes, marigold strings, and brass urli bowls.',
        },
        {
          title: 'Garden pastel & jasmine',
          description: 'Mint, blush, and fresh jasmine garlands for breezy afternoon terraces.',
        },
        {
          title: 'Gota patti & bangle backdrop',
          description: 'Traditional festive hangings with mirror and floral highlights.',
        },
        {
          title: 'Mehndi + Sangeet evening stage',
          description: 'Wider backdrop with dance-floor clearances and warm uplighting.',
        },
      ],
      idealOccasions: [
        'Bridal Mehndi at home',
        'Terrace & rooftop Mehndi parties',
        'Combined Mehndi & Sangeet evenings',
        'Apartment clubhouse Mehndi functions',
      ],
      included: [
        'Backdrop frame & colourful fabric drapes',
        'Fresh marigold / floral accents',
        'Warm fairy lighting',
        'On-time setup & post-event teardown',
      ],
      howWeCustomize: [
        {
          title: 'Outfit & seating check',
          description: 'Match drapes and flowers to your green/yellow/pink Mehndi lehenga.',
        },
        {
          title: 'Indoor vs. outdoor rigging',
          description: 'Weighted outdoor stands for terraces; slim zero-drill frames for flats.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Home Mehndi focal corner',
          description: 'Compact floral & drape backdrop starting from ₹5,000.',
        },
        {
          title: 'Terrace / Lawn Mehndi canopy',
          description: 'Full overhead canopy, bolsters, cushions, and entrance hangings.',
        },
      ],
      suitableVenues: ['Apartments & flats', 'Villa terraces', 'Clubhouses', 'Banquet lawns'],
      optionalAddOns: [
        'Diwan & cushion seating',
        'Floral jhoola accents',
        'Entrance toran & umbrellas',
      ],
      budgetConsiderations: {
        intro:
          'Mehndi setups start from ₹5,000 for home backdrops and scale with canopy and seating coverage.',
        points: [
          {
            title: 'Backdrop vs. full canopy',
            description:
              'A wall backdrop starts at ₹5,000; overhead terrace canopies and lounge seating scale up.',
          },
          {
            title: 'Fresh vs. mixed florals',
            description: 'Marigold and jasmine mixes keep costs efficient while looking lush.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Share venue & date',
          detail: 'Send your date, locality, and space photo on WhatsApp.',
        },
        {
          step: 'Pick your palette',
          detail: 'Choose boho jewel tones, marigold yellow, or pastel garden.',
        },
        { step: 'Setup & enjoy', detail: 'Installed ahead of your mehndi artist’s arrival.' },
      ],
      setupTimeline: [
        { step: 'Setup', detail: '90–150 minutes prior to event start.' },
        { step: 'Teardown', detail: 'Scheduled after the event concludes.' },
      ],
      themes: [
        {
          name: 'Emerald & Marigold',
          description: 'Lush green drapes with bright marigold and jasmine.',
        },
        {
          name: 'Fuchsia & Tangerine Boho',
          description: 'Festive jewel tones with pom-poms and fairy lights.',
        },
      ],
      areasIntro: 'Serving homes, terraces, and party halls across all Bangalore localities.',
      relatedHrefs: [
        '/services/haldi-decoration',
        '/services/bridal-shower-decoration',
        '/services/wedding-setup',
        '/services/terrace-decoration',
      ],
      ctaBody:
        'Send your Mehndi date, area, and venue photo for a tailored Bangalore quote starting from ₹5,000.',
      faqs: [
        {
          question: 'How much does Mehndi decoration cost in Bangalore?',
          answer:
            'Home Mehndi decoration in Bangalore starts from ₹5,000 for a colourful floral and drape backdrop, scaling up for terrace canopies, bolster seating, and larger hall stages.',
        },
        {
          question: 'Can you do both Mehndi and Haldi decorations on consecutive days?',
          answer:
            'Yes. Many Bangalore families book both functions together with distinct palettes and coordinated teardown/re-setup scheduling.',
        },
        {
          question: 'Do you provide cushion seating or jhoola styling for Mehndi?',
          answer:
            'Yes, we can add bolsters, floor cushions, rugs, or floral swing styling depending on your terrace or hall space.',
        },
      ],
    },

    'bridal-shower-decoration': {
      slug: 'bridal-shower-decoration',
      title: 'Bridal Shower & Bride-to-Be Decoration Bangalore — From ₹5,000',
      description:
        'Bridal shower, Bride-to-Be & bachelorette decoration in Bangalore from ₹5,000 — pastel balloon arches, neon signage, room & terrace setups. 4.9★ rated.',
      serviceType: 'Bridal shower decoration',
      ogImage: SERVICE_IMAGES.roomDecor,
      eyebrow: 'Bridal Shower · Bride-to-Be · Bachelorette · Bangalore',
      headline: 'Bridal Shower & Bride-to-Be Decoration in Bangalore — From ₹5,000',
      subheadline:
        'Pinterest-worthy pastel balloon arches, Bride-to-Be neon backdrops, hotel suite surprises, and terrace brunch setups styled across Bangalore.',
      storyTitle: 'Designed for effortless group photos and surprise reveals',
      storyParagraphs: [
        'Whether bridesmaids are planning a secret hotel-room reveal, a living-room high tea, or a rooftop bachelorette dinner, the backdrop needs to pop in phone portraits and Reels.',
        'We match chrome, pastel, or rose-gold balloons with fresh baby’s breath, shimmer curtains, and clean Bride-to-Be signage—installed fast before the bride walks in.',
      ],
      highlights: [
        {
          title: 'Bride-to-Be neon & ring arches',
          description:
            'Custom pastel, blush, pearl, and rose-gold organic balloon garlands with warm neon signs.',
        },
        {
          title: 'Hotel, café & home ready',
          description:
            'Damage-free freestanding frames ideal for Bangalore hotels, private dining rooms, and flats.',
        },
        {
          title: 'Dessert & mimosa table accents',
          description:
            'Coordinated cake plinths, table florals, and fairy lights around your celebration table.',
        },
        {
          title: 'Quiet surprise execution',
          description:
            'Our team completes setup in 60–90 minutes so the reveal stays a true surprise.',
        },
      ],
      gallery: [
        img('bridal-shower', 0, 'Pastel Bride-to-Be balloon backdrop in Ulsoor, Bangalore'),
        img('bridal-shower', 1, 'Bridal shower room and floral arch setup in Bengaluru'),
        img('room decor', 0, 'Surprise bridal bedroom decoration with balloons and lights'),
      ],
      testimonial: {
        quote:
          'We surprised our best friend in her Indiranagar apartment—the pastel balloon arch and neon sign looked straight off Pinterest.',
        attribution: 'Bridal shower · Indiranagar',
      },
      trustSignals: ['Hotel & home safe', '60–90 min surprise setup', '4.9★ Bangalore rated'],
      waPrefill:
        'Hi We Decor! I need Bridal Shower / Bride-to-Be decoration in Bangalore. Date: _____. Area/Hotel: _____. Theme/Colours: _____.',
      whyChooseUsEyebrow: 'Why bridesmaids book We Decor',
      whyChoose: [
        {
          title: 'Zero wall marks',
          text: 'Hotels and rented apartments stay damage-free with weighted stands and gentle clips.',
        },
        {
          title: 'Custom colour palettes',
          text: 'Sage & cream, blush & rose gold, lavender, or classic champagne white.',
        },
        {
          title: 'Picture-ready lighting',
          text: 'Warm fairy lights and ring backdrops balanced for evening indoor photos.',
        },
      ],
      styles: [
        {
          title: 'Blush & Rose-Gold Glam',
          description:
            'Organic pearl-pink and rose-gold balloons with shimmer backdrop and neon sign.',
        },
        {
          title: 'Champagne & Baby’s Breath',
          description: 'Soft ivory balloons paired with fresh floral clusters for classy brunches.',
        },
        {
          title: 'Hotel Suite Surprise',
          description: 'Bed-frame florals, ceiling balloons, fairy lights, and welcome easel.',
        },
        {
          title: 'Rooftop Bachelorette Cabana',
          description: 'Canopy tent with cushions, candles, and fairy lights for evening toasts.',
        },
      ],
      idealOccasions: [
        'Bride-to-Be surprise parties',
        'Bridal shower brunches & high teas',
        'Bachelorette hotel suite reveals',
        'Mehendi-eve bridesmaids gatherings',
      ],
      included: [
        'Backdrop frame or shimmer wall',
        'Organic pastel / chrome balloon arch',
        'Bride-to-Be signage & fairy lights',
        'On-site installation & teardown',
      ],
      howWeCustomize: [
        {
          title: 'Dress-code matching',
          description: 'Match balloon shades to the bridesmaids’ outfits or bride’s sash.',
        },
        {
          title: 'Space-smart sizing',
          description: 'Sized cleanly for hotel bedrooms, café corners, or 2BHK living rooms.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Home / Hotel Bride-to-Be backdrop',
          description: 'Balloon ring or arch with neon sign and lights starting from ₹5,000.',
        },
        {
          title: 'Full room + dessert table setup',
          description: 'Backdrop, cake plinth, room balloons, and floral table accents.',
        },
      ],
      suitableVenues: [
        'Hotels & suites',
        'Apartments',
        'Cafés & private dining',
        'Terraces & cabanas',
      ],
      optionalAddOns: ['Cake pedestal plinths', 'Fresh floral clusters', 'Custom bride name board'],
      budgetConsiderations: {
        intro: 'Bridal shower setups start from ₹5,000 across Bangalore.',
        points: [
          {
            title: 'Fresh florals & shimmer walls',
            description:
              'Adding sequin shimmer panels or fresh roses scales above standard balloon rings.',
          },
          {
            title: 'Cabana & furniture add-ons',
            description: 'Rooftop canopy tents and low lounge seating adjust the final scope.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Send space photo',
          detail: 'WhatsApp the room, hotel, or café photo with your date.',
        },
        { step: 'Pick colours', detail: 'Choose your palette and neon sign text.' },
        { step: 'Surprise reveal', detail: 'We set up before the bride arrives.' },
      ],
      setupTimeline: [
        { step: 'Setup', detail: '60–90 minutes before the bride’s arrival.' },
        { step: 'Teardown', detail: 'Same night or next morning per hotel/home timing.' },
      ],
      themes: [
        {
          name: 'Pearl & Rose Gold',
          description: 'Warm metallic chrome with blush pastel balloons.',
        },
        { name: 'Sage & Ivory', description: 'Clean botanical tones with soft white florals.' },
      ],
      areasIntro: 'Serving hotels, cafés, and apartments across all Bangalore neighbourhoods.',
      relatedHrefs: [
        '/services/room-decoration',
        '/services/balloon-decoration',
        '/services/proposal-decoration',
        '/services/mehndi-decoration',
      ],
      ctaBody:
        'Share your Bridal Shower date, Bangalore area, and colour palette for a quick quote.',
      faqs: [
        {
          question:
            'What is the starting price for Bride-to-Be / Bridal Shower decoration in Bangalore?',
          answer:
            'Bridal shower and Bride-to-Be setups start from ₹5,000 for a complete balloon arch, backdrop, lighting, and signage setup across Bangalore.',
        },
        {
          question: 'Do Bangalore hotels allow your balloon & backdrop setups?',
          answer:
            'Yes. We use freestanding frames and hotel-safe non-marking adhesives so suites and private dining rooms stay 100% undamaged.',
        },
        {
          question: 'Can you set up while we take the bride out for lunch?',
          answer:
            'Yes, just coordinate access with a friend or hotel concierge and we will complete the reveal setup within 60–90 minutes.',
        },
      ],
    },

    'housewarming-decoration': {
      slug: 'housewarming-decoration',
      title: 'Housewarming & Griha Pravesh Decoration Bangalore — From ₹5,000',
      description:
        'Griha Pravesh & housewarming flower decoration in Bangalore from ₹5,000 — fresh mango leaves, marigold doorways, staircase florals & puja backdrops. 4.9★.',
      serviceType: 'Housewarming decoration',
      ogImage: SERVICE_IMAGES.haldi,
      eyebrow: 'Griha Pravesh · Housewarming · Fresh Florals · Bangalore',
      headline: 'Housewarming & Griha Pravesh Flower Decoration in Bangalore',
      subheadline:
        'Auspicious fresh marigold, jasmine, and mango-leaf doorway torans, staircase garlands, and serene puja room floral framing installed early morning before your muhurat.',
      storyTitle: 'Fresh blooms ready before your dawn Griha Pravesh muhurat',
      storyParagraphs: [
        'Griha Pravesh ceremonies in Bangalore often begin between 5:30 AM and 8:00 AM. Our floral team sources fresh marigold, jasmine, roses, and mango leaves and completes main-door, balcony, and puja room styling before your guests arrive.',
        'Every garland is tied using gentle ribbons and soft hooks so newly painted walls, teakwood doors, and marble doorways remain spotless.',
      ],
      highlights: [
        {
          title: 'Main door & foyer torans',
          description:
            'Lush mango-leaf, marigold, and jasmine garlands framing your new entrance cleanly.',
        },
        {
          title: 'Staircase & balcony garlands',
          description:
            'Coordinated floral drapes for duplex villas, independent homes, and apartment foyers.',
        },
        {
          title: 'Puja room & homa backdrops',
          description:
            'Fragrant jasmine, rose, and banana-leaf accents framed around your altar without blocking smoke or space.',
        },
        {
          title: 'Zero-mark fresh paint protection',
          description:
            'No nails, heavy tape, or dripping water—safe for brand-new paint and polished wood.',
        },
      ],
      gallery: [
        img('haldi', 0, 'Fresh marigold and traditional floral doorway setup in Bangalore'),
        img('wedding', 0, 'Fresh jasmine and rose floral garlands for home ceremony entrances'),
        img('haldi', 1, 'Traditional brass urli and fresh flower styling for housewarming pujas'),
      ],
      testimonial: {
        quote:
          'They arrived at 5:30 AM for our new flat’s Griha Pravesh in Whitefield and didn’t leave a single scratch on the fresh paint.',
        attribution: 'Griha Pravesh · Whitefield villa',
      },
      trustSignals: ['Dawn muhurat slots', 'Fresh-paint safe', '4.9★ Bangalore rated'],
      waPrefill:
        'Hi We Decor! I need Housewarming / Griha Pravesh flower decoration in Bangalore. Date: _____. Area: _____. Flat or Villa: _____.',
      whyChooseUsEyebrow: 'Why new homeowners trust We Decor',
      whyChoose: [
        {
          title: 'Fresh-paint safe mounting',
          text: 'We use soft satin ties and zero-residue methods to protect newly finished walls and doors.',
        },
        {
          title: 'Pre-dawn punctuality',
          text: 'Available for early-morning Griha Pravesh muhurats across all Bangalore zones.',
        },
        {
          title: 'Complete home coverage',
          text: 'Main gate, foyer door, staircase railings, balcony, and puja area styled together.',
        },
      ],
      styles: [
        {
          title: 'Classic Marigold & Mango Leaf',
          description: 'Bright orange/yellow marigold with fragrant mango leaves and jasmine tips.',
        },
        {
          title: 'Jasmine & White Rose Elegance',
          description: 'Serene South Indian floral framing for apartments and modern villas.',
        },
        {
          title: 'Lotus, Banana Leaf & Urli',
          description: 'Traditional ceremonial foyer and puja altar styling with brass urlis.',
        },
        {
          title: 'Full Villa Gate-to-Staircase',
          description:
            'Compound gate arch, main door toran, staircase railing florals, and puja corner.',
        },
      ],
      idealOccasions: [
        'New apartment Griha Pravesh',
        'Independent villa housewarming',
        'Office / showroom opening pujas',
        'Satyanarayana Puja & family blessings',
      ],
      included: [
        'Fresh marigold, jasmine & mango-leaf garlands',
        'Main-door toran & puja backdrop framing',
        'Brass urli floral accents (as quoted)',
        'Early-morning installation',
      ],
      howWeCustomize: [
        {
          title: 'Doorway & staircase photos',
          description:
            'Send photos of your main door, foyer, and staircase so we measure exact garland lengths.',
        },
        {
          title: 'Muhurat timing',
          description: 'We schedule finish time 30–45 minutes before your priest’s arrival.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Apartment Griha Pravesh package',
          description: 'Main door, balcony, and puja room fresh florals starting from ₹5,000.',
        },
        {
          title: 'Full Villa & Staircase florals',
          description: 'Gate arch, main entrance, staircase railings, and living-room urlis.',
        },
      ],
      suitableVenues: [
        'New apartments',
        'Gated community villas',
        'Independent houses',
        'New offices',
      ],
      optionalAddOns: [
        'Gate floral arch',
        'Staircase railing drapes',
        'Extra brass urlis & floating petals',
      ],
      budgetConsiderations: {
        intro: 'Housewarming flower decoration starts from ₹5,000 for apartment setups.',
        points: [
          {
            title: 'Apartment vs. multi-floor villa',
            description:
              'Covering 2-floor staircases and compound gates requires extra garland footage.',
          },
          {
            title: 'Flower mix',
            description:
              'Adding lotus, orchids, or dense jasmine strings scales above marigold base packages.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Send home photos',
          detail: 'Share photos of your main door, puja area, and muhurat time.',
        },
        {
          step: 'Confirm floral plan',
          detail: 'Pick marigold-jasmine or rose-lotus combinations.',
        },
        { step: 'Dawn setup', detail: 'Installed fresh and spotless before your ceremony starts.' },
      ],
      setupTimeline: [
        { step: 'Early morning setup', detail: '60–90 minutes before your Griha Pravesh muhurat.' },
      ],
      themes: [
        {
          name: 'Auspicious Marigold & Mango',
          description: 'Classic orange, yellow, and fresh green leaves.',
        },
        {
          name: 'Ivory Jasmine & Lotus',
          description: 'Fragrant white jasmine with pink lotus highlights.',
        },
      ],
      areasIntro: 'Serving new homes and gated communities across all Bangalore areas.',
      relatedHrefs: [
        '/services/floral-decoration',
        '/services/home-decoration',
        '/services/haldi-decoration',
        '/services/naming-ceremony-decoration',
      ],
      ctaBody:
        'Send your Griha Pravesh date, area, and doorway photos for a fresh-paint-safe Bangalore quote.',
      faqs: [
        {
          question:
            'How much does Griha Pravesh / housewarming flower decoration cost in Bangalore?',
          answer:
            'Apartment housewarming decoration in Bangalore starts from ₹5,000 for main-doorway torans, puja room florals, and foyer accents, scaling for multi-floor villa staircases and gate arches.',
        },
        {
          question: 'Can your team arrive at 5:30 AM or 6:00 AM for an early muhurat?',
          answer:
            'Yes. Dawn Griha Pravesh setups are routine for our Bangalore floral crew—we finish before your priest and family arrive.',
        },
        {
          question: 'Will garlands stain or scratch newly painted walls?',
          answer:
            'No. We use soft satin ribbons and paint-safe fixing points with zero nails or harsh tape.',
        },
      ],
    },

    'baat-pakki-decoration': {
      slug: 'baat-pakki-decoration',
      title: 'Baat Pakki Decoration in Bangalore — Home Ceremony Setups ₹5,000',
      description:
        'Baat Pakki decoration at home in Bangalore from ₹5,000 — intimate living-room floral frames, sofa backdrops & zero-drill apartment setups. 4.9★ rated.',
      serviceType: 'Baat Pakki decoration',
      ogImage: SERVICE_IMAGES.engagement,
      eyebrow: 'Baat Pakki · Home Ceremony · Bangalore',
      headline: 'Baat Pakki Decoration in Bangalore — Elegant Home Setups',
      subheadline:
        'Compact, tasteful floral backdrops and shagun-corner styling tailored for living rooms and society clubhouses when both families come together.',
      storyTitle: 'Warm, uncluttered backdrops for family milestones',
      storyParagraphs: [
        'Baat Pakki marks the formal union of two families, usually hosted inside a home living room or intimate dining space. Our designs frame the couple and elders gracefully without turning your home into a crowded banquet stage.',
        'With freestanding weighted stands, fresh roses or marigolds, and warm fairy lighting, setup completes cleanly in 60–90 minutes.',
      ],
      highlights: [
        {
          title: 'Living-room proportions',
          description: 'Slim frames sized cleanly behind 3-seater sofas without blocking walkways.',
        },
        {
          title: 'Fresh roses & soft drapes',
          description: 'Pastel floral rings, ivory drapes, or traditional marigold accents.',
        },
        {
          title: 'Shagun & gift table styling',
          description: 'Brass urlis, candle holders, and floral runners for family exchanges.',
        },
        {
          title: 'Zero apartment damage',
          description: 'No wall drilling, tape marks, or heavy rigging in your home.',
        },
      ],
      gallery: [
        img('engagement', 0, 'Intimate living-room floral backdrop for Baat Pakki in Bangalore'),
        img('engagement', 1, 'Pastel floral ring setup behind home sofa seating'),
        img('haldi', 0, 'Traditional brass urli and floral accents for morning family rituals'),
      ],
      testimonial: {
        quote: 'Simple, classy, and fit our 3BHK living room perfectly for the Baat Pakki lunch.',
        attribution: 'Baat Pakki · HSR Layout',
      },
      trustSignals: ['From ₹5,000 home setups', 'Zero wall damage', '4.9★ Bangalore rated'],
      waPrefill:
        'Hi We Decor! I need Baat Pakki decoration at home in Bangalore. Date: _____. Area: _____. Living room photo attached.',
      whyChooseUsEyebrow: 'Why families choose us for Baat Pakki',
      whyChoose: [
        {
          title: 'Measured for apartments',
          text: 'We fit your wall width and sofa height first so family portraits look balanced.',
        },
        {
          title: 'Quick 60–90 min install',
          text: 'Quiet, clean setup before the guests arrive and tidy teardown afterward.',
        },
        {
          title: 'Upgradeable to Roka / Engagement',
          text: 'Seamless experience if you book us for your Roka, Haldi, and Wedding too.',
        },
      ],
      styles: [
        {
          title: 'Pastel Ring & Fairy Lights',
          description: 'Gold circular frame with blush roses and ivory drapes.',
        },
        {
          title: 'Traditional Marigold & Urli',
          description: 'Warm saffron and yellow florals for morning auspicious ceremonies.',
        },
        {
          title: 'Botanical Arch Backdrop',
          description: 'Eucalyptus greenery and cream roses for contemporary homes.',
        },
        {
          title: 'Clubhouse Family Stage',
          description: 'Wider 10ft–12ft frame for 30–60 guests in society halls.',
        },
      ],
      idealOccasions: [
        'Intimate home Baat Pakki',
        'Roka & Tilak ceremonies',
        'Family shagun exchange lunches',
        'Small engagement announcements',
      ],
      included: [
        'Freestanding backdrop frame & drapes',
        'Fresh floral accents',
        'Warm fairy lighting',
        'Setup & teardown across Bangalore',
      ],
      howWeCustomize: [
        {
          title: 'Room photo sizing',
          description: 'Send a quick photo of your sofa wall to lock clean proportions.',
        },
        {
          title: 'Colour coordination',
          description: 'Match flowers with family outfits and home interiors.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Home sofa backdrop',
          description: 'Complete living-room focal frame and lights from ₹5,000.',
        },
        {
          title: 'Backdrop + entrance & table florals',
          description: 'Includes main-door toran and shagun table floral bowls.',
        },
      ],
      suitableVenues: [
        '2BHK / 3BHK flats',
        'Villas',
        'Apartment clubhouses',
        'Private dining rooms',
      ],
      optionalAddOns: ['Main-door toran', 'Brass urlis', 'Welcome board'],
      budgetConsiderations: {
        intro: 'Home Baat Pakki setups start from ₹5,000 across Bangalore.',
        points: [
          {
            title: 'Floral coverage',
            description:
              'Corner floral pockets keep costs near ₹5,000; full-frame floral walls scale up.',
          },
        ],
      },
      bookingProcess: [
        { step: 'Send wall photo', detail: 'Share your date, locality, and sofa wall photo.' },
        { step: 'Pick a backdrop', detail: 'Select ring, arch, or drape style.' },
        { step: 'Same-day setup', detail: 'Completed 60–90 minutes before guests arrive.' },
      ],
      setupTimeline: [
        { step: 'Setup', detail: '60–90 minutes before the ceremony.' },
        { step: 'Teardown', detail: 'Same evening or next day as convenient.' },
      ],
      themes: [
        { name: 'Cream & Blush', description: 'Subtle pastel roses with warm fairy lights.' },
        { name: 'Saffron & Brass', description: 'Traditional auspicious accents.' },
      ],
      areasIntro: 'Available across all Bangalore apartments and villas.',
      relatedHrefs: [
        '/services/roka-decoration',
        '/services/engagement-decoration',
        '/services/home-decoration',
        '/services/wedding-setup',
      ],
      ctaBody:
        'Send your Baat Pakki date and living-room photo on WhatsApp for a fast ₹5,000+ quote.',
      faqs: [
        {
          question: 'How much does Baat Pakki decoration cost in Bangalore?',
          answer:
            'Intimate home Baat Pakki backdrops start from ₹5,000 across Bangalore, including freestanding backdrop frame, fresh floral pockets, lighting, and teardown.',
        },
        {
          question: 'How much space is needed behind our living room sofa?',
          answer:
            'Only about 1.5–2 feet of depth behind your sofa is needed for our slim weighted backdrop stands.',
        },
      ],
    },

    'shukrana-decoration': {
      slug: 'shukrana-decoration',
      title: 'Shukrana Decoration in Bangalore — Home Prayer Setups ₹5,000',
      description:
        'Shukrana ceremony decoration in Bangalore from ₹5,000 — serene ivory & jasmine backdrops, brass urlis & family dining florals. 4.9★ rated.',
      serviceType: 'Shukrana decoration',
      ogImage: SERVICE_IMAGES.engagement,
      eyebrow: 'Shukrana · Home Prayer & Gathering · Bangalore',
      headline: 'Shukrana Decoration in Bangalore — Serene Home Setups',
      subheadline:
        'Graceful floral focal walls, fragrant white jasmine & rose urlis, and warm fairy lighting designed respectfully for family Shukrana prayers and celebratory dinners.',
      storyTitle: 'Calm, dignified beauty for thanksgiving gatherings',
      storyParagraphs: [
        'A Shukrana gathering centres around gratitude, dua, and warm family hospitality. Rather than loud party props, we create serene ivory, cream, and botanical backdrops that elevate your living room while keeping prayer and elder seating unobstructed.',
        'Every setup uses apartment-safe, zero-drill frames and fresh blooms styled on time across Bangalore.',
      ],
      highlights: [
        {
          title: 'Serene prayer focal backdrops',
          description:
            'Soft ivory drapes, white roses, and greenery that frame family gatherings gracefully.',
        },
        {
          title: 'Fragrant jasmine & brass urlis',
          description:
            'Low floral centerpieces and rose-petal bowls placed cleanly away from walkways.',
        },
        {
          title: 'Dining & dessert table accents',
          description: 'Subtle floral runners and warm candlelight for post-dua family meals.',
        },
        {
          title: 'Apartment-safe installation',
          description: 'Freestanding frames with zero wall marks and quiet, punctual execution.',
        },
      ],
      gallery: [
        img('engagement', 0, 'Serene ivory and floral backdrop for home Shukrana in Bangalore'),
        img('wedding', 0, 'Fresh white floral framing suited for Shukrana family gatherings'),
        img('haldi', 1, 'Traditional brass urli floral bowls for welcoming entrances'),
      ],
      testimonial: {
        quote:
          'So peaceful and elegant. Our entire family loved the jasmine fragrance and subtle ivory backdrop.',
        attribution: 'Shukrana gathering · Frazer Town / Benson Town',
      },
      trustSignals: ['From ₹5,000 setups', 'Respectful & serene', '4.9★ Bangalore rated'],
      waPrefill:
        'Hi We Decor! I need Shukrana decoration at home in Bangalore. Date: _____. Area: _____.',
      whyChooseUsEyebrow: 'Why families trust us for Shukrana',
      whyChoose: [
        {
          title: 'Dignified aesthetics',
          text: 'Subtle ivory, sage, and pearl florals that honour the spiritual mood of a Shukrana.',
        },
        {
          title: 'Clear floor seating',
          text: 'Slim backdrop footprints preserve generous floor and sofa space for elders and guests.',
        },
        {
          title: 'Punctual & tidy',
          text: 'Installed cleanly ahead of prayer timing and removed quietly afterward.',
        },
      ],
      styles: [
        {
          title: 'Ivory & Jasmine Serenity',
          description: 'Cream drapes, fresh jasmine strings, and white rose accents.',
        },
        {
          title: 'Emerald & Gold Subtle Frame',
          description: 'Rich green foliage with warm fairy lights and brass urli bowls.',
        },
        {
          title: 'Pastel Floral & Dining Runner',
          description: 'Coordinated living-room backdrop plus dining table florals.',
        },
        {
          title: 'Parda & Partition Styling',
          description: 'Tasteful draped partitions with floral tie-backs when requested.',
        },
      ],
      idealOccasions: [
        'Home Shukrana dua & dinner',
        'Post-Nikah / post-Umrah family welcome',
        'Intimate Milad & blessing gatherings',
        'New-home thanksgiving dinners',
      ],
      included: [
        'Focal backdrop frame & drapes',
        'Fresh white rose & jasmine florals',
        'Warm fairy lighting',
        'On-time install & teardown',
      ],
      howWeCustomize: [
        {
          title: 'Room & seating plan',
          description: 'Share your living room layout so we keep dua and dining flow seamless.',
        },
        {
          title: 'Parda / partition needs',
          description: 'Optional matching fabric partitions if hosting separate seating.',
        },
      ],
      popularDecorationOptions: [
        {
          title: 'Living-room Shukrana focal frame',
          description: 'Complete serene backdrop, lighting, and entrance urli from ₹5,000.',
        },
        {
          title: 'Full home + dining floral styling',
          description: 'Includes backdrop, doorway florals, and dining table runners.',
        },
      ],
      suitableVenues: [
        'Apartments & flats',
        'Independent homes',
        'Community halls',
        'Private dining spaces',
      ],
      optionalAddOns: [
        'Parda partition drapes',
        'Dining table floral runners',
        'Extra brass urlis',
      ],
      budgetConsiderations: {
        intro: 'Home Shukrana setups start from ₹5,000 across Bangalore.',
        points: [
          {
            title: 'Fresh jasmine & rose density',
            description: 'Full-width floral walls scale above focused backdrop accents.',
          },
        ],
      },
      bookingProcess: [
        {
          step: 'Share room photo',
          detail: 'Send your date, Bangalore area, and living-room photo.',
        },
        {
          step: 'Pick ivory or pastel look',
          detail: 'Confirm layout and any partition or dining accents.',
        },
        { step: 'Clean setup', detail: 'Finished 60–90 minutes prior to guests arriving.' },
      ],
      setupTimeline: [
        { step: 'Setup', detail: '60–90 minutes before gathering start.' },
        { step: 'Teardown', detail: 'Same night or next morning per family preference.' },
      ],
      themes: [
        {
          name: 'Pearl & Jasmine',
          description: 'Crisp ivory drapes with fragrant jasmine garlands.',
        },
        { name: 'Sage & Cream', description: 'Botanical greenery with soft cream roses.' },
      ],
      areasIntro:
        'Serving homes across Frazer Town, Benson Town, RT Nagar, Jayanagar, HSR & all Bangalore.',
      relatedHrefs: [
        '/services/nikah-decoration',
        '/services/valima-decoration',
        '/services/home-decoration',
        '/services/floral-decoration',
      ],
      ctaBody:
        'Send your Shukrana date and living-room photo on WhatsApp for a calm, custom ₹5,000+ plan.',
      faqs: [
        {
          question: 'How much does home Shukrana decoration cost in Bangalore?',
          answer:
            'Home Shukrana decoration starts from ₹5,000 across Bangalore for a serene ivory/floral focal backdrop, warm lighting, and teardown.',
        },
        {
          question: 'Can you provide matching parda partitions and dining florals?',
          answer:
            'Yes. We can add coordinated fabric partitions and fresh floral dining table runners tailored to your home layout.',
        },
      ],
    },
  };
