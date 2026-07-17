export type FAQ = { q: string; a: (areaName: string) => string };

export const SHARED_FAQS: FAQ[] = [
  {
    q: 'How much does birthday decoration cost in {{AREA}}?',
    a: (area) =>
      `Balloon Decorations starts from ₹3,000. Floral Decorations starts from ₹5,000. For birthday setups in ${area}, pricing is customized based on venue, decoration style, event size, materials, and customer requirements.`,
  },
  {
    q: 'Do you decorate apartment clubhouses in {{AREA}}?',
    a: (area) =>
      `Yes, we work across ${area} apartment clubhouses and rooftops. We handle permissions, floor protection and quick teardown.`,
  },
  {
    q: 'How early should I book for a weekend in {{AREA}}?',
    a: (area) =>
      `For popular weekends in ${area}, book 5–7 days ahead. Same-day express slots may be available—call us to check.`,
  },
  {
    q: 'What types of venues do you decorate in {{AREA}}?',
    a: (area) =>
      `We decorate homes, apartments, clubhouses, banquet halls, and outdoor spaces across ${area}. We handle both indoor and outdoor setups.`,
  },
  {
    q: 'Do you provide same-day decoration in {{AREA}}?',
    a: (area) =>
      `Yes, we offer express same-day decoration in ${area} for urgent bookings. Call us early morning to check availability.`,
  },
  {
    q: 'Can you customize themes for {{AREA}} events?',
    a: (area) =>
      `Absolutely! We create custom themes based on your preferences, venue, and ${area} location. We'll suggest local flowers and materials.`,
  },
];

export const AREA_FAQ_OVERRIDES: Record<string, FAQ[]> = {
  whitefield: [
    {
      q: 'Can you decorate near VR Bengaluru?',
      a: () =>
        'Yes—Whitefield mall vicinity is fine. We coordinate load-in and timing with security.',
    },
    {
      q: 'Do you work in ITPL and surrounding tech parks?',
      a: () =>
        'Yes, we decorate corporate and team celebrations around ITPL and nearby Whitefield tech parks, subject to venue access rules.',
    },
  ],
  koramangala: [
    {
      q: 'Can you decorate in Koramangala pubs and restaurants?',
      a: () =>
        'Yes, we work with many Koramangala venues. We coordinate with venue managers for setup and teardown.',
    },
    {
      q: 'Do you handle rooftop events in Koramangala?',
      a: () =>
        'Yes. Koramangala rooftops are popular. We plan anchoring, weather cover, and timing around the venue’s access window.',
    },
  ],
  indiranagar: [
    {
      q: 'Can you decorate in Indiranagar clubs and lounges?',
      a: () =>
        'Yes, we work with Indiranagar nightlife venues. We handle late-night setups and early morning teardowns.',
    },
    {
      q: 'Do you work in Indiranagar residential societies?',
      a: () =>
        'Yes, we decorate in Indiranagar residential societies. We coordinate with security and follow society rules.',
    },
  ],
  'hsr-layout': [
    {
      q: 'Can you decorate in HSR tech company offices?',
      a: () =>
        'Yes, we decorate corporate events in HSR tech companies for office parties, team events, and celebrations when access is approved.',
    },
    {
      q: 'Do you work in HSR apartment complexes?',
      a: () =>
        'Yes. We work across HSR apartment complexes with minimal disruption and proper cleanup.',
    },
  ],
  marathahalli: [
    {
      q: 'Can you plan around Outer Ring Road traffic for Marathahalli setups?',
      a: () =>
        'Yes. We confirm the access window and route in advance, then schedule arrival with enough buffer for the venue handover.',
    },
  ],
  bellandur: [
    {
      q: 'Do you decorate condo clubhouses near EcoSpace and Bellandur Lake?',
      a: () =>
        'Yes. Share the clubhouse rules and entry window, and we will plan vendor access, loading, and setup timing accordingly.',
    },
  ],
  'sarjapur-road': [
    {
      q: 'Can you work inside gated societies on Sarjapur Road?',
      a: () =>
        'Yes. We coordinate gate passes, vendor timing, parking guidance, and clubhouse or common-area rules with the host.',
    },
  ],
  'electronic-city': [
    {
      q: 'Do you decorate both Electronic City Phase 1 and Phase 2 venues?',
      a: () =>
        'Yes. Share the exact building or venue and its access instructions, and we will plan the setup for that location.',
    },
  ],
  'jp-nagar': [
    {
      q: 'Can you decorate JP Nagar community halls and banquet venues?',
      a: () =>
        'Yes. Send the hall details, access hours, and ceremony plan so we can shape entry, backdrop, and guest-facing decor.',
    },
  ],
  jayanagar: [
    {
      q: 'Can you style traditional family ceremonies around Jayanagar 4th Block?',
      a: () =>
        'Yes. We can incorporate floral, marigold, drape, and stage details that support your rituals and venue guidelines.',
    },
  ],
};

export type FAQItem = { q: string; a: string };

export const faqsForArea = (slug: string, name: string): FAQItem[] => [
  ...SHARED_FAQS.map((f) => ({
    q: f.q.replace('{{AREA}}', name),
    a: f.a(name),
  })),
  ...(AREA_FAQ_OVERRIDES[slug] ?? []).map((f) => ({
    q: f.q,
    a: f.a(name),
  })),
];
