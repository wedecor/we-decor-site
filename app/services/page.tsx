import Image from 'next/image';
import Link from 'next/link';
import { SERVICE_IMAGES } from '@/lib/images';
import PageHero from '@/components/lux/PageHero';

const services = [
  {
    name: 'Decoration',
    description:
      'Weddings, birthdays, haldi, engagements, and corporate celebrations — composed for light, emotion, and photography.',
    href: '/services/decoration',
    image: SERVICE_IMAGES.engagement,
    tag: 'Signature craft',
    featured: true,
  },
  {
    name: 'Catering',
    description: 'Curated menus for intimate dinners and grand receptions.',
    href: '/services/catering',
    image: SERVICE_IMAGES.corporate,
    tag: 'Events & weddings',
  },
  {
    name: 'Make-up Artists',
    description: 'Bridal and party artistry for stage light and long wear.',
    href: '/services/makeup-artists',
    image: SERVICE_IMAGES.haldi,
    tag: 'Bridal & party',
  },
  {
    name: 'Hair Stylists',
    description: 'Refined styling for weddings and milestone evenings.',
    href: '/services/hair-stylists',
    image: SERVICE_IMAGES.engagement,
    tag: 'Styling',
  },
  {
    name: 'Mehndi Artists',
    description: 'Traditional and contemporary mehndi for wedding rituals.',
    href: '/services/mehndi-artists',
    image: SERVICE_IMAGES.haldi,
    tag: 'Wedding rituals',
  },
  {
    name: 'Photographers',
    description: 'Story-led coverage that preserves the feeling of your day.',
    href: '/services/photographers',
    image: SERVICE_IMAGES.birthday,
    tag: 'Coverage',
  },
  {
    name: 'Videographers',
    description: 'Cinematic films — calm, emotional, beautifully edited.',
    href: '/services/videographers',
    image: SERVICE_IMAGES.tentBalloon,
    tag: 'Films',
  },
] as const;

/** Partner services without dedicated photography — gradient card instead of a mismatched stock image */
const GRADIENT_PLACEHOLDER_SERVICES = new Set([
  'Make-up Artists',
  'Hair Stylists',
  'Mehndi Artists',
  'Photographers',
]);

export default function ServicesPage() {
  return (
    <div className="lux-page">
      <PageHero
        eyebrow="Full-service events"
        title="Our services"
        description="Decoration is our signature — supported by trusted partners for catering, beauty, and coverage across Bengaluru."
      />
      <section className="lux-section pt-0 pb-28 md:pb-36 bg-lux-bg">
        <div className="lux-container">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9 list-none p-0 m-0">
            {services.map((service, index) => {
              const featured = 'featured' in service && service.featured;
              const useGradientPlaceholder = GRADIENT_PLACEHOLDER_SERVICES.has(service.name);
              return (
                <li
                  key={service.name}
                  className={featured ? 'sm:col-span-2 lg:col-span-2' : undefined}
                >
                  <Link href={service.href} className="lux-card-image block h-full group">
                    <div
                      className={`relative w-full overflow-hidden ${featured ? 'aspect-[21/10] sm:aspect-[2/1]' : 'aspect-[4/5]'}`}
                    >
                      {useGradientPlaceholder ? (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] p-6"
                          aria-hidden
                        >
                          <span className="font-display text-xl md:text-2xl text-lux-ivory/90 text-center leading-snug">
                            {service.name}
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={service.image}
                          alt={`${service.name} — We Decor Bangalore`}
                          fill
                          className="object-cover lux-image-cinematic transition-transform duration-[900ms] ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                          sizes={featured ? '66vw' : '33vw'}
                          quality={72}
                          priority={index < 1}
                          loading={index < 1 ? undefined : 'lazy'}
                        />
                      )}
                      <div className="absolute inset-0 lux-overlay-cinematic" />
                      <div
                        className={`absolute bottom-0 inset-x-0 ${featured ? 'p-8 md:p-10' : 'p-7'}`}
                      >
                        <p className="text-[10px] tracking-tagline uppercase text-lux-gold/85 mb-2">
                          {service.tag}
                        </p>
                        <h2
                          className={`font-display text-lux-ivory leading-tight ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}
                        >
                          {service.name}
                        </h2>
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
          <p className="text-center mt-16 md:mt-24">
            <Link href="/contact" className="lux-btn-primary">
              Plan your celebration
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
