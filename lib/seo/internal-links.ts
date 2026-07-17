/**
 * Internal-link registries — curated service↔service and service→locality maps.
 * Prefer these over “first N of a fixed array”.
 */

export type InternalLink = { href: string; name: string };

/**
 * Default locality chips rendered by frozen service UI (DecorationServicePage /
 * CoreExploreLinks). Limited to 5 diverse areas so equity is not locked to the
 * old eight-name list. Per-service sets live in SERVICE_LOCALITIES_BY_PATH for
 * when the template freeze lifts.
 */
export const FEATURED_LOCALITIES: readonly InternalLink[] = [
  { href: '/locations/whitefield', name: 'Whitefield' },
  { href: '/locations/koramangala', name: 'Koramangala' },
  { href: '/locations/hsr-layout', name: 'HSR Layout' },
  { href: '/locations/bellandur', name: 'Bellandur' },
  { href: '/locations/jayanagar', name: 'Jayanagar' },
] as const;

/** Partner verticals — cross-linked so none rely on the hub alone. */
export const PARTNER_SERVICE_LINKS = [
  { href: '/services/decoration', label: 'Event decoration' },
  { href: '/services/catering', label: 'Catering' },
  { href: '/services/makeup-artists', label: 'Make-up artists' },
  { href: '/services/hair-stylists', label: 'Hair stylists' },
  { href: '/services/mehndi-artists', label: 'Mehndi artists' },
  { href: '/services/photographers', label: 'Photographers' },
  { href: '/services/videographers', label: 'Videographers' },
] as const;

/** All indexable decoration service pages for hub listings. */
export const RELATED_DECORATION_SERVICES = [
  { href: '/services/birthday-decoration', label: 'Birthday Decorations' },
  { href: '/services/birthday-home-decoration', label: 'Birthday Home Decorations' },
  { href: '/services/wedding-setup', label: 'Wedding Decorations' },
  { href: '/services/wedding-stage-decor', label: 'Wedding Stage Decorations' },
  { href: '/services/haldi-decoration', label: 'Haldi Decorations' },
  { href: '/services/haldi-backdrop-decor', label: 'Haldi Backdrop Decorations' },
  { href: '/services/engagement-decoration', label: 'Engagement Decorations' },
  { href: '/services/corporate-decoration', label: 'Corporate Decorations' },
  { href: '/services/room-decoration', label: 'Room Decorations' },
  { href: '/services/tent-balloon-setup', label: 'Tent & Balloon Decorations' },
  { href: '/services/nikah-decoration', label: 'Nikah Decorations' },
  { href: '/services/balloon-decoration', label: 'Balloon Decorations' },
  { href: '/services/baby-shower-decoration', label: 'Baby Shower Decorations' },
  { href: '/services/anniversary-decoration', label: 'Anniversary Decorations' },
  { href: '/services/proposal-decoration', label: 'Proposal Decorations' },
  { href: '/services/home-decoration', label: 'Home Decorations' },
  { href: '/services/floral-decoration', label: 'Floral Decorations' },
  { href: '/services/terrace-decoration', label: 'Terrace Decorations' },
  { href: '/services/car-decoration', label: 'Car Decorations' },
] as const;

const LABEL_BY_HREF = Object.fromEntries(
  RELATED_DECORATION_SERVICES.map((s) => [s.href, s.label])
) as Record<string, string>;

/**
 * Curated related services (4–5 each). Topical relevance + reciprocal coverage
 * for late/high-intent pages (car, terrace, tent, room, etc.).
 */
export const RELATED_SERVICES_BY_PATH: Record<string, readonly string[]> = {
  '/services/birthday-decoration': [
    '/services/balloon-decoration',
    '/services/birthday-home-decoration',
    '/services/tent-balloon-setup',
    '/services/room-decoration',
    '/services/home-decoration',
  ],
  '/services/birthday-home-decoration': [
    '/services/birthday-decoration',
    '/services/home-decoration',
    '/services/balloon-decoration',
    '/services/room-decoration',
    '/services/baby-shower-decoration',
  ],
  '/services/wedding-setup': [
    '/services/wedding-stage-decor',
    '/services/haldi-decoration',
    '/services/floral-decoration',
    '/services/engagement-decoration',
    '/services/car-decoration',
  ],
  '/services/wedding-stage-decor': [
    '/services/wedding-setup',
    '/services/floral-decoration',
    '/services/engagement-decoration',
    '/services/haldi-backdrop-decor',
    '/services/car-decoration',
  ],
  '/services/haldi-decoration': [
    '/services/haldi-backdrop-decor',
    '/services/wedding-setup',
    '/services/floral-decoration',
    '/services/engagement-decoration',
    '/services/nikah-decoration',
  ],
  '/services/haldi-backdrop-decor': [
    '/services/haldi-decoration',
    '/services/wedding-setup',
    '/services/floral-decoration',
    '/services/engagement-decoration',
    '/services/wedding-stage-decor',
  ],
  '/services/engagement-decoration': [
    '/services/proposal-decoration',
    '/services/wedding-setup',
    '/services/floral-decoration',
    '/services/anniversary-decoration',
    '/services/terrace-decoration',
  ],
  '/services/corporate-decoration': [
    '/services/balloon-decoration',
    '/services/floral-decoration',
    '/services/room-decoration',
    '/services/tent-balloon-setup',
    '/services/home-decoration',
  ],
  '/services/room-decoration': [
    '/services/home-decoration',
    '/services/birthday-home-decoration',
    '/services/anniversary-decoration',
    '/services/proposal-decoration',
    '/services/balloon-decoration',
  ],
  '/services/tent-balloon-setup': [
    '/services/balloon-decoration',
    '/services/birthday-decoration',
    '/services/corporate-decoration',
    '/services/terrace-decoration',
    '/services/home-decoration',
  ],
  '/services/nikah-decoration': [
    '/services/wedding-setup',
    '/services/floral-decoration',
    '/services/engagement-decoration',
    '/services/home-decoration',
    '/services/car-decoration',
  ],
  '/services/balloon-decoration': [
    '/services/birthday-decoration',
    '/services/tent-balloon-setup',
    '/services/baby-shower-decoration',
    '/services/home-decoration',
    '/services/corporate-decoration',
  ],
  '/services/baby-shower-decoration': [
    '/services/home-decoration',
    '/services/balloon-decoration',
    '/services/birthday-home-decoration',
    '/services/floral-decoration',
    '/services/room-decoration',
  ],
  '/services/anniversary-decoration': [
    '/services/room-decoration',
    '/services/proposal-decoration',
    '/services/home-decoration',
    '/services/floral-decoration',
    '/services/terrace-decoration',
  ],
  '/services/proposal-decoration': [
    '/services/engagement-decoration',
    '/services/terrace-decoration',
    '/services/anniversary-decoration',
    '/services/floral-decoration',
    '/services/home-decoration',
  ],
  '/services/home-decoration': [
    '/services/room-decoration',
    '/services/birthday-home-decoration',
    '/services/balloon-decoration',
    '/services/terrace-decoration',
    '/services/baby-shower-decoration',
  ],
  '/services/floral-decoration': [
    '/services/wedding-setup',
    '/services/haldi-decoration',
    '/services/nikah-decoration',
    '/services/engagement-decoration',
    '/services/car-decoration',
  ],
  '/services/terrace-decoration': [
    '/services/proposal-decoration',
    '/services/home-decoration',
    '/services/engagement-decoration',
    '/services/birthday-decoration',
    '/services/anniversary-decoration',
  ],
  '/services/car-decoration': [
    '/services/wedding-setup',
    '/services/floral-decoration',
    '/services/wedding-stage-decor',
    '/services/engagement-decoration',
    '/services/nikah-decoration',
  ],
};

/**
 * Per-service locality links (3–5). Not rendered by frozen templates yet —
 * FEATURED_LOCALITIES is what the UI shows today. This map is the source of
 * truth for Phase 3 template wiring and for crawl/report analysis.
 */
export const SERVICE_LOCALITIES_BY_PATH: Record<string, readonly InternalLink[]> = {
  '/services/birthday-decoration': [
    { href: '/locations/hsr-layout', name: 'HSR Layout' },
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/jp-nagar', name: 'JP Nagar' },
    { href: '/locations/marathahalli', name: 'Marathahalli' },
  ],
  '/services/birthday-home-decoration': [
    { href: '/locations/jayanagar', name: 'Jayanagar' },
    { href: '/locations/hsr-layout', name: 'HSR Layout' },
    { href: '/locations/indiranagar', name: 'Indiranagar' },
    { href: '/locations/btm-layout', name: 'BTM Layout' },
  ],
  '/services/wedding-setup': [
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/jayanagar', name: 'Jayanagar' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road' },
    { href: '/locations/electronic-city', name: 'Electronic City' },
  ],
  '/services/wedding-stage-decor': [
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/koramangala', name: 'Koramangala' },
    { href: '/locations/jayanagar', name: 'Jayanagar' },
    { href: '/locations/bellandur', name: 'Bellandur' },
  ],
  '/services/haldi-decoration': [
    { href: '/locations/jayanagar', name: 'Jayanagar' },
    { href: '/locations/jp-nagar', name: 'JP Nagar' },
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road' },
  ],
  '/services/haldi-backdrop-decor': [
    { href: '/locations/jayanagar', name: 'Jayanagar' },
    { href: '/locations/hsr-layout', name: 'HSR Layout' },
    { href: '/locations/indiranagar', name: 'Indiranagar' },
    { href: '/locations/jp-nagar', name: 'JP Nagar' },
  ],
  '/services/engagement-decoration': [
    { href: '/locations/indiranagar', name: 'Indiranagar' },
    { href: '/locations/koramangala', name: 'Koramangala' },
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/hsr-layout', name: 'HSR Layout' },
  ],
  '/services/corporate-decoration': [
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/electronic-city', name: 'Electronic City' },
    { href: '/locations/bellandur', name: 'Bellandur' },
    { href: '/locations/marathahalli', name: 'Marathahalli' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road' },
  ],
  '/services/room-decoration': [
    { href: '/locations/koramangala', name: 'Koramangala' },
    { href: '/locations/indiranagar', name: 'Indiranagar' },
    { href: '/locations/hsr-layout', name: 'HSR Layout' },
    { href: '/locations/jayanagar', name: 'Jayanagar' },
  ],
  '/services/tent-balloon-setup': [
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road' },
    { href: '/locations/electronic-city', name: 'Electronic City' },
    { href: '/locations/yelahanka', name: 'Yelahanka' },
  ],
  '/services/nikah-decoration': [
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/jayanagar', name: 'Jayanagar' },
    { href: '/locations/electronic-city', name: 'Electronic City' },
    { href: '/locations/jp-nagar', name: 'JP Nagar' },
  ],
  '/services/balloon-decoration': [
    { href: '/locations/hsr-layout', name: 'HSR Layout' },
    { href: '/locations/marathahalli', name: 'Marathahalli' },
    { href: '/locations/btm-layout', name: 'BTM Layout' },
    { href: '/locations/whitefield', name: 'Whitefield' },
  ],
  '/services/baby-shower-decoration': [
    { href: '/locations/hsr-layout', name: 'HSR Layout' },
    { href: '/locations/jp-nagar', name: 'JP Nagar' },
    { href: '/locations/jayanagar', name: 'Jayanagar' },
    { href: '/locations/whitefield', name: 'Whitefield' },
  ],
  '/services/anniversary-decoration': [
    { href: '/locations/indiranagar', name: 'Indiranagar' },
    { href: '/locations/koramangala', name: 'Koramangala' },
    { href: '/locations/jayanagar', name: 'Jayanagar' },
    { href: '/locations/whitefield', name: 'Whitefield' },
  ],
  '/services/proposal-decoration': [
    { href: '/locations/koramangala', name: 'Koramangala' },
    { href: '/locations/indiranagar', name: 'Indiranagar' },
    { href: '/locations/bellandur', name: 'Bellandur' },
    { href: '/locations/whitefield', name: 'Whitefield' },
  ],
  '/services/home-decoration': [
    { href: '/locations/hsr-layout', name: 'HSR Layout' },
    { href: '/locations/jp-nagar', name: 'JP Nagar' },
    { href: '/locations/jayanagar', name: 'Jayanagar' },
    { href: '/locations/marathahalli', name: 'Marathahalli' },
  ],
  '/services/floral-decoration': [
    { href: '/locations/jayanagar', name: 'Jayanagar' },
    { href: '/locations/indiranagar', name: 'Indiranagar' },
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road' },
  ],
  '/services/terrace-decoration': [
    { href: '/locations/koramangala', name: 'Koramangala' },
    { href: '/locations/indiranagar', name: 'Indiranagar' },
    { href: '/locations/hsr-layout', name: 'HSR Layout' },
    { href: '/locations/bellandur', name: 'Bellandur' },
  ],
  '/services/car-decoration': [
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/jayanagar', name: 'Jayanagar' },
    { href: '/locations/electronic-city', name: 'Electronic City' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road' },
  ],
};

export function getRelatedServiceHrefsFor(servicePath: string): string[] {
  const hrefs = RELATED_SERVICES_BY_PATH[servicePath];
  if (!hrefs?.length) {
    return RELATED_DECORATION_SERVICES.filter((s) => s.href !== servicePath)
      .slice(0, 5)
      .map((s) => s.href);
  }
  return hrefs.filter((href) => href !== servicePath && Boolean(LABEL_BY_HREF[href]));
}

export function getRelatedServiceLinksFor(servicePath: string): { href: string; label: string }[] {
  return getRelatedServiceHrefsFor(servicePath).map((href) => ({
    href,
    label: LABEL_BY_HREF[href] ?? href,
  }));
}

export function getServiceLocalitiesFor(servicePath: string): InternalLink[] {
  const list = SERVICE_LOCALITIES_BY_PATH[servicePath];
  if (list?.length) return [...list];
  return [...FEATURED_LOCALITIES];
}

/** @deprecated Prefer getRelatedServiceLinksFor. */
export function relatedServicesExcluding(currentPath: string) {
  return getRelatedServiceLinksFor(currentPath);
}
