/**
 * Single source of truth for homepage and SEO service list.
 * Used by HomePageClient and app/page.tsx (structured data).
 */
export const HOMEPAGE_SERVICES = [
  {
    title: 'Birthday Decoration',
    description:
      'Creative and vibrant birthday decorations for all ages. From themed parties to elegant celebrations, we bring your birthday vision to life with stunning decor arrangements.',
    image: '/services/birthday.JPG',
    href: '/services/birthday-decoration',
  },
  {
    title: 'Haldi Decoration',
    description:
      'Traditional and modern haldi ceremony decorations. Beautiful yellow-themed setups with traditional elements and contemporary touches for your special pre-wedding celebration.',
    image: '/services/haldi.jpg',
    href: '/services/haldi-decoration',
  },
  {
    title: 'Engagement Decoration',
    description:
      'Romantic and elegant engagement party decorations. Create the perfect atmosphere for your special moment with our professional decor services and stunning arrangements.',
    image: '/services/engagement.jpg',
    href: '/services/engagement-decoration',
  },
  {
    title: 'Corporate Event Decoration',
    description:
      'Professional corporate event decorations for meetings, conferences, and celebrations. Impress your clients and team with our sophisticated corporate decor solutions.',
    image: '/services/corporate.JPG',
    href: '/services/corporate-decoration',
  },
  {
    title: 'Tent & Balloon Setup',
    description:
      'Professional tent and balloon arrangements for outdoor events. From elegant balloon arches to complete tent setups, we handle all your outdoor decoration needs.',
    image: '/services/tent and baloon.jpg',
    href: '/services/tent-balloon-setup',
  },
  {
    title: 'Room Decoration',
    description:
      'Transform any space with our room decoration services. From intimate gatherings to large celebrations, we create beautiful and personalized room decor arrangements.',
    image: '/services/room decor.jpg',
    href: '/services/room-decoration',
  },
] as const;
