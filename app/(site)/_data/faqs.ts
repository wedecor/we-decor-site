export type FAQ = { q: string; a: (areaName: string) => string };

export const SHARED_FAQS: FAQ[] = [
  {
    q: 'How much does birthday decoration cost in {{AREA}}?',
    a: (area) =>
      `Most home birthday setups in ${area} start from ₹3,999–₹9,999 depending on balloons, backdrops and lights.`,
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
        'Yes, we frequently decorate corporate events in ITPL, Manyata Tech Park, and surrounding tech companies in Whitefield.',
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
        'Absolutely! Koramangala rooftops are popular. We ensure proper anchoring and weather protection for outdoor setups.',
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
        'Yes, we decorate in all major Indiranagar residential societies. We coordinate with security and follow society rules.',
    },
  ],
  'hsr-layout': [
    {
      q: 'Can you decorate in HSR tech company offices?',
      a: () =>
        'Yes, we frequently decorate corporate events in HSR tech companies. We handle office parties, team events, and celebrations.',
    },
    {
      q: 'Do you work in HSR apartment complexes?',
      a: () =>
        'Absolutely! We work in all major HSR apartment complexes. We ensure minimal disruption and proper cleanup.',
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
