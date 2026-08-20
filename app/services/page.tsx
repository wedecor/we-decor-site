import Image from 'next/image';
import Link from 'next/link';
import { SERVICE_IMAGES } from '@/lib/images';
import PageHero from '@/components/lux/PageHero';
import { RELATED_DECORATION_SERVICES } from '@/lib/seo/internal-links';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';
import SiteBreadcrumbs, { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildServicesHubGraph, withBreadcrumb } from '@/lib/schema';

/** Core decoration services — displayed as photo cards */
const decorationCards = [
  {
    name: 'Birthday Decoration',
    description:
      "Children's themes, surprise setups, and adult milestone parties — designed around the recipient, venue, and cake moment.",
    href: '/services/birthday-decoration',
    image: SERVICE_IMAGES.birthday,
    tag: 'Most popular',
    featured: true,
  },
  {
    name: 'Wedding Setup',
    description:
      'Mandap, stage, and floral arrangements composed for emotion, light, and photography.',
    href: '/services/wedding-setup',
    image: '/home-preview/reception.webp',
    tag: 'Weddings',
  },
  {
    name: 'Haldi Decoration',
    description: 'Marigold-rich stages and easy-cleanup setups built for ritual and colour.',
    href: '/services/haldi-decoration',
    image: SERVICE_IMAGES.haldi,
    tag: 'Ceremonies',
  },
  {
    name: 'Engagement Decoration',
    description:
      'Floral arches, pastel palettes, and modern backdrops for the ring exchange moment.',
    href: '/services/engagement-decoration',
    image: SERVICE_IMAGES.engagement,
    tag: 'Celebrations',
  },
  {
    name: 'Corporate Decoration',
    description:
      'Brand-aligned backdrops, clean cabling, and quick turnaround for launches and team events.',
    href: '/services/corporate-decoration',
    image: SERVICE_IMAGES.corporate,
    tag: 'Corporate',
  },
  {
    name: 'Room Decoration',
    description:
      'Intimate room setups for anniversaries, proposals, and surprise moments at home or in a hotel.',
    href: '/services/room-decoration',
    image: SERVICE_IMAGES.roomDecor,
    tag: 'Intimate',
  },
] as const;

/** Additional decoration service types — listed as text links */
const moreDecorations = [
  { href: '/services/tent-balloon-setup', label: 'Tent & Balloon Setup' },
  { href: '/services/balloon-decoration', label: 'Balloon Decorations' },
  { href: '/services/baby-shower-decoration', label: 'Baby Shower Decorations' },
  { href: '/services/floral-decoration', label: 'Floral Decorations' },
  { href: '/services/anniversary-decoration', label: 'Anniversary Decorations' },
  { href: '/services/proposal-decoration', label: 'Proposal Decorations' },
] as const;

/** Services we coordinate through trusted Bangalore partners */
const partnerServices = [
  {
    name: 'Photographers',
    description: 'Story-led coverage that preserves the feeling of your day.',
    icon: '📷',
  },
  {
    name: 'Videographers',
    description: 'Cinematic films — calm, emotional, beautifully edited.',
    icon: '🎥',
  },
  {
    name: 'Catering',
    description: 'Curated menus for intimate dinners and grand receptions.',
    icon: '🍽',
  },
  {
    name: 'Make-up Artists',
    description: 'Bridal and party artistry for stage light and long wear.',
    icon: '💄',
  },
  {
    name: 'Hair Stylists',
    description: 'Refined styling for weddings and milestone evenings.',
    icon: '✂️',
  },
  {
    name: 'Mehndi Artists',
    description: 'Traditional and contemporary mehndi for wedding rituals.',
    icon: '🌿',
  },
] as const;

const CRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
];

export default function ServicesPage() {
  const listForSchema = [
    ...RELATED_DECORATION_SERVICES.map((s) => ({
      name: s.label,
      path: s.href,
      description: s.label,
    })),
    ...decorationCards.map((s) => ({
      name: s.name,
      path: s.href,
      description: s.description,
    })),
  ];

  return (
    <div className="lux-page">
      <SchemaScript
        data={withBreadcrumb(
          buildServicesHubGraph({
            name: 'Event Decoration Services — We Decor Bangalore',
            description:
              'Decoration is our signature craft — birthdays, weddings, haldi, engagements, corporate events, and more across Bengaluru.',
            services: listForSchema,
          }),
          siteBreadcrumbsToSchemaItems(CRUMBS)
        )}
      />
      <div className="lux-container pt-[calc(var(--nav-height)+1.5rem)] pb-2">
        <SiteBreadcrumbs items={CRUMBS} />
      </div>
      <PageHero
        eyebrow="What we do"
        title="Decoration services"
        description="Every celebration deserves a thoughtfully composed atmosphere. Here's what we create across Bengaluru."
      />

      {/* ── Core decoration cards ── */}
      <section
        className="lux-section pt-0 pb-16 md:pb-20 bg-lux-bg"
        aria-labelledby="decoration-services-heading"
      >
        <div className="lux-container">
          <h2 id="decoration-services-heading" className="sr-only">
            Decoration services
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9 list-none p-0 m-0">
            {decorationCards.map((service, index) => {
              const featured = 'featured' in service && service.featured;
              return (
                <li
                  key={service.name}
                  className={featured ? 'sm:col-span-2 lg:col-span-2' : undefined}
                >
                  <Link href={service.href} className="lux-card-image block h-full group">
                    <div
                      className={`relative w-full overflow-hidden ${featured ? 'aspect-[21/10] sm:aspect-[2/1]' : 'aspect-[4/5]'}`}
                    >
                      <Image
                        src={service.image}
                        alt={`${service.name} decoration by We Decor in Bangalore`}
                        fill
                        className="object-cover lux-image-cinematic transition-transform duration-[900ms] ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                        sizes={
                          featured
                            ? '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px'
                            : '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px'
                        }
                        quality={72}
                        priority={index < 1}
                        loading={index < 1 ? undefined : 'lazy'}
                      />
                      <div className="absolute inset-0 lux-overlay-cinematic" />
                      <div
                        className={`absolute bottom-0 inset-x-0 ${featured ? 'p-8 md:p-10' : 'p-7'}`}
                      >
                        <p className="text-[10px] tracking-tagline uppercase text-lux-gold/85 mb-2">
                          {service.tag}
                        </p>
                        <h3
                          className={`font-display text-lux-ivory leading-tight ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}
                        >
                          {service.name}
                        </h3>
                        <p
                          className={`text-lux-secondary mt-3 leading-relaxed ${featured ? 'text-base max-w-lg' : 'text-sm line-clamp-2'}`}
                        >
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── More decoration types ── */}
          <div className="mt-14 md:mt-16 max-w-3xl mx-auto text-center">
            <p className="lux-eyebrow mb-3">More decoration services</p>
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-3 list-none p-0 m-0">
              {moreDecorations.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-lux-gold hover:underline text-sm font-medium">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Partner services ── */}
          <div className="mt-16 md:mt-20 lux-panel rounded-2xl p-8 md:p-10">
            <p className="lux-eyebrow mb-3">We also coordinate</p>
            <h2 className="lux-heading-sm mb-2">Planning a full event?</h2>
            <p className="text-lux-secondary text-sm md:text-base mb-8 max-w-xl">
              We connect you with trusted Bangalore partners for photography, videography, catering,
              and beauty — so you&apos;re not chasing five vendors separately.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0 m-0">
              {partnerServices.map((s) => (
                <li key={s.name} className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5" aria-hidden="true">
                    {s.icon}
                  </span>
                  <div>
                    <p className="font-medium text-lux-ivory">{s.name}</p>
                    <p className="text-lux-secondary text-sm mt-0.5">{s.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link href="/contact" className="lux-btn-secondary text-sm">
                Ask about partner services
              </Link>
            </p>
          </div>

          <p className="text-center mt-16 md:mt-24">
            <Link href="/contact" className="lux-btn-primary">
              Plan your celebration
            </Link>
          </p>
        </div>
      </section>
      <CoreExploreLinks context="hub" showLocalities pageKey="services-hub" />
    </div>
  );
}
