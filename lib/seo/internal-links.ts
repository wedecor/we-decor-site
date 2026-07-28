/**
 * Internal-link registries — curated service↔service and service→locality maps.
 * Prefer these over “first N of a fixed array”.
 *
 * RELATED_DECORATION_SERVICES / RELATED_SERVICES_BY_PATH only include routes that
 * exist in the committed decoration service catalog (avoid hub 404s).
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

/**
 * Indexable decoration services present in the committed catalog.
 * Includes high-intent landings used for related-service labels.
 */
export const RELATED_DECORATION_SERVICES = [
  { href: '/services/birthday-decoration', label: 'Birthday Decorations' },
  { href: '/services/wedding-setup', label: 'Wedding Decorations' },
  { href: '/services/haldi-decoration', label: 'Haldi Decorations' },
  { href: '/services/engagement-decoration', label: 'Engagement Decorations' },
  { href: '/services/corporate-decoration', label: 'Corporate Decorations' },
  { href: '/services/room-decoration', label: 'Room Decorations' },
  { href: '/services/tent-balloon-setup', label: 'Tent & Balloon Decorations' },
  { href: '/services/balloon-decoration', label: 'Balloon Decorations' },
  { href: '/services/baby-shower-decoration', label: 'Baby Shower Decorations' },
  { href: '/services/floral-decoration', label: 'Floral Decorations' },
  { href: '/services/anniversary-decoration', label: 'Anniversary Decorations' },
  { href: '/services/proposal-decoration', label: 'Proposal Decorations' },
  { href: '/services/catering', label: 'Catering' },
] as const;

const LABEL_BY_HREF = Object.fromEntries(
  RELATED_DECORATION_SERVICES.map((s) => [s.href, s.label])
) as Record<string, string>;

/**
 * Curated related services (3–5 each) among live routes only.
 * Cannibalized URLs (birthday-home, haldi-backdrop, wedding-stage) removed.
 */
export const RELATED_SERVICES_BY_PATH: Record<string, readonly string[]> = {
  '/services/birthday-decoration': [
    '/services/balloon-decoration',
    '/services/room-decoration',
    '/services/baby-shower-decoration',
  ],
  '/services/wedding-setup': [
    '/services/haldi-decoration',
    '/services/engagement-decoration',
    '/services/floral-decoration',
  ],
  '/services/haldi-decoration': [
    '/services/floral-decoration',
    '/services/wedding-setup',
    '/services/engagement-decoration',
  ],
  '/services/engagement-decoration': [
    '/services/wedding-setup',
    '/services/floral-decoration',
    '/services/room-decoration',
  ],
  '/services/corporate-decoration': [
    '/services/tent-balloon-setup',
    '/services/balloon-decoration',
    '/services/catering',
  ],
  '/services/room-decoration': [
    '/services/anniversary-decoration',
    '/services/proposal-decoration',
    '/services/birthday-decoration',
  ],
  '/services/tent-balloon-setup': [
    '/services/balloon-decoration',
    '/services/birthday-decoration',
    '/services/corporate-decoration',
  ],
  '/services/balloon-decoration': [
    '/services/birthday-decoration',
    '/services/tent-balloon-setup',
    '/services/baby-shower-decoration',
  ],
  '/services/floral-decoration': [
    '/services/haldi-decoration',
    '/services/wedding-setup',
    '/services/engagement-decoration',
  ],
  '/services/baby-shower-decoration': [
    '/services/birthday-decoration',
    '/services/balloon-decoration',
    '/services/room-decoration',
  ],
  '/services/anniversary-decoration': [
    '/services/room-decoration',
    '/services/floral-decoration',
    '/services/proposal-decoration',
  ],
  '/services/proposal-decoration': [
    '/services/room-decoration',
    '/services/anniversary-decoration',
    '/services/engagement-decoration',
  ],
};

/**
 * Per-service locality links (3–5). Not rendered by frozen templates yet —
 * FEATURED_LOCALITIES is what the UI shows today.
 */
export const SERVICE_LOCALITIES_BY_PATH: Record<string, readonly InternalLink[]> = {
  '/services/birthday-decoration': [
    { href: '/locations/hsr-layout', name: 'HSR Layout' },
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/jp-nagar', name: 'JP Nagar' },
    { href: '/locations/marathahalli', name: 'Marathahalli' },
  ],
  '/services/wedding-setup': [
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/jayanagar', name: 'Jayanagar' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road' },
    { href: '/locations/electronic-city', name: 'Electronic City' },
  ],
  '/services/haldi-decoration': [
    { href: '/locations/jayanagar', name: 'Jayanagar' },
    { href: '/locations/jp-nagar', name: 'JP Nagar' },
    { href: '/locations/whitefield', name: 'Whitefield' },
    { href: '/locations/sarjapur-road', name: 'Sarjapur Road' },
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
