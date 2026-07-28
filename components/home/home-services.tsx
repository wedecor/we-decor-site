import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/lux/FadeIn';
import { SERVICE_IMAGES } from '@/lib/images';

const services = [
  {
    title: 'Birthday',
    tag: 'At home & venues',
    image: SERVICE_IMAGES.birthday,
    href: '/services/birthday-decoration',
  },
  {
    title: 'Haldi',
    tag: 'Marigold & gold',
    image: SERVICE_IMAGES.haldi,
    href: '/services/haldi-decoration',
  },
  {
    title: 'Engagement',
    tag: 'Romantic stages',
    image: SERVICE_IMAGES.engagement,
    href: '/services/engagement-decoration',
  },
  {
    title: 'Wedding',
    tag: 'Mandap & reception',
    image: SERVICE_IMAGES.corporate,
    href: '/services/wedding-setup',
  },
  {
    title: 'Corporate',
    tag: 'Brand celebrations',
    image: SERVICE_IMAGES.corporate,
    href: '/services/corporate-decoration',
  },
  {
    title: 'Room decor',
    tag: 'Surprise setups',
    image: SERVICE_IMAGES.roomDecor,
    href: '/services/room-decoration',
  },
] as const;

export default function HomeServices() {
  return (
    <section className="lux-section bg-lux-bg">
      <div className="lux-container">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <p className="lux-eyebrow mb-3">Our craft</p>
            <h2 className="lux-heading">Signature celebrations</h2>
            <p className="lux-body mt-5">
              Image-led experiences across Bengaluru — each setup designed for atmosphere,
              photography, and effortless hosting.
            </p>
          </div>
        </FadeIn>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 list-none p-0 m-0">
          {services.map((service, index) => (
            <li key={service.title}>
              <FadeIn delay={index * 0.05}>
                <Link href={service.href} className="lux-card-image block h-full group">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={service.image}
                      alt={`${service.title} decoration in Bangalore`}
                      fill
                      className="object-cover lux-image-cinematic transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      quality={70}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 lux-overlay-cinematic opacity-95 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <p className="text-xs tracking-lux uppercase text-lux-gold/90 mb-1">
                        {service.tag}
                      </p>
                      <h3 className="font-display text-2xl text-lux-ivory">{service.title}</h3>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>
        <p className="text-center mt-10">
          <Link href="/services" className="lux-btn-secondary text-sm">
            All services
          </Link>
        </p>
      </div>
    </section>
  );
}
