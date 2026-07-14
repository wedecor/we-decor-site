/** Featured localities for service → location internal linking. */
export const FEATURED_LOCALITIES = [
  { href: '/locations/koramangala', name: 'Koramangala' },
  { href: '/locations/whitefield', name: 'Whitefield' },
  { href: '/locations/indiranagar', name: 'Indiranagar' },
  { href: '/locations/hsr-layout', name: 'HSR Layout' },
  { href: '/locations/jayanagar', name: 'Jayanagar' },
] as const;

/** All indexable decoration service pages for hub + related-service cross-links. */
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
] as const;

export function relatedServicesExcluding(currentPath: string) {
  return RELATED_DECORATION_SERVICES.filter((s) => s.href !== currentPath).slice(0, 5);
}
