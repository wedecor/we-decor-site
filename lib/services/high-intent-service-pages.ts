import { SERVICE_IMAGES } from '@/lib/images';
import type {
  DecorationServicePageConfig,
  HighIntentServiceSlug,
} from '@/lib/services/decoration-service-pages';
import { getImagesByCategory } from '@/utils/gallery';

function img(category: string, index: number, caption: string) {
  const src = getImagesByCategory(category)[index]?.src ?? SERVICE_IMAGES.engagement;
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
      title: 'Nikah Ceremony Decoration Bangalore | We Decor',
      description:
        'Nikah ceremony décor in Bangalore planned around seating, ritual flow and intimate venue access. Request a tailored We Decor quote.',
      serviceType: 'Nikah decoration',
      ogImage: SERVICE_IMAGES.engagement,
      eyebrow: 'Nikah ceremony · Bangalore',
      headline: 'A serene setting for the nikah itself',
      subheadline:
        'Ceremony seating, respectful floral framing and clear movement for family, imam and photographer—planned for homes, halls and clubhouses in Bangalore.',
      storyTitle: 'Start with the ritual, then frame the room',
      storyParagraphs: [
        'The nikah has a practical rhythm: family members need to reach their seats, the imam needs a clear place to conduct the ceremony, and photographers need one clean angle. We begin with that flow, then shape the couple seating and floral frame around it.',
        'For a simple home gathering, the focus may be one composed wall and low accents. A banquet setup can carry a wider frame, entrance details and richer flowers. Your invite, attire and venue photos guide the palette and scale.',
      ],
      highlights: [
        {
          title: 'Nikah stage & seating frame',
          description:
            'Proportioned backdrops and couple seating that leave walkway space for the ceremony and photographers.',
        },
        {
          title: 'Floral & fabric layers',
          description:
            'Fresh florals, drapes, and aisle markers that stay refined for mid-day rituals and evening guests.',
        },
        {
          title: 'Home and hall adaptable',
          description:
            'Layouts planned for lift access, power points, and society rules common through Bangalore apartments.',
        },
        {
          title: 'Silent setup window',
          description:
            'Early install and discreet teardown so your day stays focused on the nikah — not décor logistics.',
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
        'Hi We Decor! I need nikah ceremony décor in Bangalore. Date: _____. Venue type: _____. Ceremony time: _____. Guest count: _____.',
      whyChooseUsEyebrow: 'Why families book us for nikah',
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
          title: 'Ivory botanical',
          description: 'White florals, muted greens, and light drapes for a quiet, elegant room.',
        },
        {
          title: 'Rose & gold accent',
          description: 'Warm metallics with pink roses for evening banquet light.',
        },
        {
          title: 'Emerald garden',
          description: 'Deep greens and white blooms for lawns and outdoor marriage halls.',
        },
        {
          title: 'Minimal modern',
          description: 'Clean frames, fewer stems, stronger geometry — ideal for compact flats.',
        },
      ],
      idealOccasions: [
        'Home nikah',
        'Marriage hall ceremonies',
        'Clubhouse gatherings',
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
      ctaBody: 'Send the nikah date, venue photos and ceremony timing for a layout-led quote.',
      faqs: [
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
      title: 'Balloon Decoration Bangalore | Arches & Garlands',
      description:
        'Balloon decoration in Bangalore with colour-matched arches, garlands and apartment-friendly photo zones. Get a practical We Decor quote.',
      serviceType: 'Balloon decoration',
      ogImage: SERVICE_IMAGES.tentBalloon,
      eyebrow: 'Balloon styling · Bangalore',
      headline: 'Colour-matched balloons that fit the room',
      subheadline:
        'From cake corners to clubhouse entrances, we size arches and garlands for ceiling height, society rules and the people being celebrated.',
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
      title: 'Baby Shower Decoration Bangalore | Brunch & Home Setups',
      description:
        'Baby shower decoration in Bangalore designed for relaxed brunches, elder seating and thoughtful photo moments. Ask We Decor for theme options.',
      serviceType: 'Baby shower decoration',
      ogImage: SERVICE_IMAGES.birthday,
      eyebrow: 'Baby shower hosting · Bangalore',
      headline: 'A baby shower where every guest can settle in',
      subheadline:
        'Gentle themes, clear seating for elders and a comfortable photo corner for the mum-to-be—planned for brunches at home or in a clubhouse.',
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
          title: 'Soft photo backdrop',
          description: 'A fabric, balloon or floral-lite frame for group photographs.',
        },
        {
          title: 'Blessing chair nook',
          description: 'A comfortable, styled seat for the mum-to-be and family moments.',
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
      title: 'Anniversary Decoration Bangalore | Surprise Home Setups',
      description:
        'Anniversary decoration in Bangalore for discreet home reveals, balcony dinners and family milestones. Plan a practical surprise with We Decor.',
      serviceType: 'Anniversary decoration',
      ogImage: SERVICE_IMAGES.roomDecor,
      eyebrow: 'Anniversary surprise · Bangalore',
      headline: 'Set the surprise before they get home',
      subheadline:
        'Private dinner corners, floral reveals and milestone details installed around your partner’s schedule—without taking over the whole home.',
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
      title: 'Proposal Decoration Bangalore | Discreet Surprise Setups',
      description:
        'Proposal decoration in Bangalore with discreet timing, clear photographer angles and venue-aware floral setups. Plan the moment with We Decor.',
      serviceType: 'Proposal decoration',
      ogImage: SERVICE_IMAGES.engagement,
      eyebrow: 'Proposal planning · Bangalore',
      headline: 'Keep the plan secret. Keep the moment visible.',
      subheadline:
        'Proposal décor built around the arrival route, photographer pocket and a reliable backup—whether you choose home, a terrace or a private dining corner.',
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
      title: 'Home Decoration Bangalore | Apartment-Friendly Event Styling',
      description:
        'Home decoration in Bangalore for birthdays, pujas and private dinners, designed around society rules, lifts and usable living space.',
      serviceType: 'Home decoration',
      ogImage: SERVICE_IMAGES.roomDecor,
      eyebrow: 'Home celebrations · Bangalore',
      headline: 'Make your home party-ready without losing the home',
      subheadline:
        'Apartment-safe décor for living rooms, foyers and balconies—planned around lift bookings, seating, food service and your society’s rules.',
      storyTitle: 'A practical plan for the space you actually live in',
      storyParagraphs: [
        'A home event succeeds when guests can still sit, serve food and move through the room. We review photos before proposing a focal wall, dining treatment or entrance detail, instead of filling every available surface.',
        'For a modest birthday, one well-designed photo zone may be all you need. A larger festival or housewarming can extend through the foyer and living area, with materials selected to suit access and cleanup.',
      ],
      highlights: [
        {
          title: 'Lift-aware logistics',
          description: 'Materials packed for Bangalore apartment elevators and staircases.',
        },
        {
          title: 'Multi-room planning',
          description: 'Foyer welcome + living focal wall without blocking kitchen traffic.',
        },
        {
          title: 'Festival & party modes',
          description: 'Pooja accents, birthday zones, or dinner styling on request.',
        },
        {
          title: 'Clean teardown',
          description: 'We leave homes guest-ready — trash bagged, surfaces cleared.',
        },
      ],
      gallery: [
        img('room decor', 0, 'Living-room home decoration for a private Bengaluru celebration'),
        img('birthday', 3, 'Apartment birthday styling with clear seating lanes'),
        img('haldi', 0, 'Home ceremony accents adapted to compact rooms'),
      ],
      testimonial: {
        quote:
          'They worked around our toddler nap schedule and still finished a full living-room transform. Zero wall damage.',
        attribution: 'Home birthday · Bellandur',
      },
      trustSignals: ['Apartment-safe methods', 'Festival slots', 'Same-day teardown options'],
      waPrefill:
        'Hi We Decor! I need apartment-friendly home décor in Bangalore. Occasion: _____. Layout: _____. Date: _____. Society rules: _____.',
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
          title: 'Focal wall reset',
          description: 'One strong backdrop anchoring the celebration.',
        },
        {
          title: 'Foyer welcome',
          description: 'Entrance florals or balloons greeting guests first.',
        },
        {
          title: 'Dining overlay',
          description: 'Table and chair accents for sit-down meals.',
        },
        {
          title: 'Festival home trail',
          description: 'Soft corridor and mandir-adjacent styling for puja days.',
        },
      ],
      idealOccasions: [
        'Home birthdays',
        'Festival pooja décor',
        'Housewarming accents',
        'Private dinners',
        'Kids play-area parties',
      ],
      included: [
        'Home walkthrough or photo review',
        'Primary décor zone',
        'Protective measures as needed',
        'Install crew access planning',
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
            'Birthday, puja, housewarming and private dinner requirements determine the focal areas.',
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
          title: 'Living-room focal wall',
          description: 'A photo-ready backdrop that leaves the rest of the room usable.',
        },
        {
          title: 'Foyer welcome',
          description: 'A compact arrival detail for guests entering the home.',
        },
        {
          title: 'Dining treatment',
          description: 'Table and chair accents for a hosted meal without blocking service.',
        },
        {
          title: 'Festival corner',
          description: 'Puja-adjacent floral, fabric or light details suited to the home.',
        },
      ],
      suitableVenues: [
        'Apartments',
        'Villas',
        'Gated-community clubhouses',
        'Private balconies',
        'Home terraces',
      ],
      optionalAddOns: [
        'Cake-table styling',
        'Welcome-board styling',
        'Dining-table accents',
        'Fresh florals',
        'Same-day teardown',
      ],
      budgetConsiderations: {
        intro:
          'Home decoration is quoted as a bespoke scope, not one-size-fits-all bundles, based on the rooms, materials and access involved.',
        points: [
          {
            title: 'Number of areas',
            description:
              'A focal wall differs from styling the foyer, living room, dining area and balcony.',
          },
          {
            title: 'Materials and protection',
            description:
              'Floral density, fabrics, balloons and surface-safe installation methods affect the plan.',
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
          detail: 'Share the occasion, layout, date, society rules and the areas guests will use.',
        },
        {
          step: 'Review the home',
          detail: 'We identify a practical focal point and protect seating and movement routes.',
        },
        {
          step: 'Confirm your scope',
          detail: 'We recommend a tailored design, materials and quote.',
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
          name: 'Warm festive',
          description: 'Marigold, diya accents, and soft drapes for celebrations.',
        },
        {
          name: 'Modern pastel party',
          description: 'Clean balloons and fabrics for kids and adults.',
        },
        {
          name: 'Neutral dinner club',
          description: 'Beige, wood, and greenery for intimate meals.',
        },
        {
          name: 'Character corner',
          description: 'Kids themes contained to one wall so the rest of the home stays calm.',
        },
      ],
      areasIntro: 'Home access requirements differ by community; these are frequent service areas.',
      relatedHrefs: [
        '/services/room-decoration',
        '/services/birthday-decoration',
        '/services/terrace-decoration',
        '/services/balloon-decoration',
      ],
      ctaBody:
        'Send room photos, BHK/layout details, occasion and society setup rules for a home-safe quote.',
      faqs: [
        {
          question: 'Will you follow our apartment society rules?',
          answer:
            'Yes. Send vendor-entry, lift, noise and wall-fixture rules before confirmation. We build the plan around approved access instead of risking a delayed setup.',
        },
        {
          question: 'How do you decorate a small 1BHK without making it crowded?',
          answer:
            'We choose one focal zone and protect seating, food service and daily routes. A strong backdrop or dining detail is usually more effective than decorating every surface.',
        },
        {
          question: 'Can you plan for a child or pet at home?',
          answer:
            'Yes. Tell us where they will be during setup and we will avoid loose floor items and keep tools contained. Pets should be secured while the team is working.',
        },
        {
          question: 'What is the best budget option for a home celebration?',
          answer:
            'A single living-room focal wall or cake corner is the most efficient starting point. It delivers a clear photo area while leaving the home functional for guests.',
        },
        {
          question: 'What does a premium home transformation cover?',
          answer:
            'Premium plans can combine the foyer, living room, dining area and a themed photo zone. Scope depends on the room layout, access and which areas guests will use.',
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
      title: 'Fresh Floral Decoration Bangalore | Species-Led Event Décor',
      description:
        'Fresh floral decoration in Bangalore with clear species choices, hydration planning and transparent fresh or hybrid options. Request a We Decor quote.',
      serviceType: 'Floral decoration',
      ogImage: SERVICE_IMAGES.haldi,
      eyebrow: 'Fresh flowers · Bangalore',
      headline: 'Flowers chosen for the hours they must perform',
      subheadline:
        'Fresh floral styling for stages, homes and ceremonies with practical choices for heat, hydration, transport and the look you want on camera.',
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
      title: 'Terrace Decoration Bangalore | Wind & Rain-Aware Setups',
      description:
        'Terrace decoration in Bangalore for intimate dinners, birthdays and proposals with wind-aware fixtures, rain contingencies and safe layouts.',
      serviceType: 'Terrace decoration',
      ogImage: SERVICE_IMAGES.corporate,
      eyebrow: 'Rooftop hosting · Bangalore',
      headline: 'Turn the terrace into a setting that holds up',
      subheadline:
        'Rooftop décor for dinners and celebrations, designed around wind, rain backup, railing clearance and the power points you actually have.',
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
      title: 'Wedding Car Decoration Bangalore | Paint-Safe Floral Styling',
      description:
        'Wedding car decoration in Bangalore with paint-safe floral and ribbon styling planned around vehicle type and departure time. Get a We Decor quote.',
      serviceType: 'Car decoration',
      ogImage: SERVICE_IMAGES.engagement,
      eyebrow: 'Wedding car styling · Bangalore',
      headline: 'Dress the car without risking the finish',
      subheadline:
        'Paint-safe florals, ribbons and just-married details for vidai, baraat and reception departures—timed so the car is ready when the driver is.',
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
        img('wedding', 0, 'Wedding-day floral accents adaptable to car hood styling'),
        img('haldi', 2, 'Bright marigold palette often used for baraat vehicle décor'),
        img('engagement', 1, 'Soft romantic florals suitable for vidai car exits'),
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
  };
