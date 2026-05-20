import Image from 'next/image';
import Link from 'next/link';
import { SERVICE_IMAGES } from '@/lib/images';

const services = [
  {
    title: 'Birthday Decoration',
    description:
      'Creative and vibrant birthday decorations for all ages. From themed parties to elegant celebrations, we bring your birthday vision to life.',
    image: SERVICE_IMAGES.birthday,
    href: '/services',
  },
  {
    title: 'Haldi Decoration',
    description:
      'Traditional and modern haldi ceremony decorations with beautiful yellow-themed setups for your pre-wedding celebration.',
    image: SERVICE_IMAGES.haldi,
    href: '/services/haldi-decoration',
  },
  {
    title: 'Engagement Decoration',
    description:
      'Romantic and elegant engagement party decorations. Create the perfect atmosphere for your special moment.',
    image: SERVICE_IMAGES.engagement,
    href: '/services/engagement-decoration',
  },
  {
    title: 'Corporate Event Decoration',
    description:
      'Professional corporate event decorations for meetings, conferences, and celebrations.',
    image: SERVICE_IMAGES.corporate,
    href: '/services/corporate-decoration',
  },
  {
    title: 'Tent & Balloon Setup',
    description:
      'Professional tent and balloon arrangements for outdoor events, from arches to complete tent setups.',
    image: SERVICE_IMAGES.tentBalloon,
    href: '/services/tent-balloon-setup',
  },
  {
    title: 'Room Decoration',
    description:
      'Transform any space with personalized room decor for intimate gatherings and large celebrations.',
    image: SERVICE_IMAGES.roomDecor,
    href: '/services/room-decoration',
  },
] as const;

export default function HomeServices() {
  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Services
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200">
            Professional decoration services for all your special occasions
          </p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0 m-0">
          {services.map((service, index) => (
            <li key={service.title}>
              <Link href={service.href} className="block group h-full">
                <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={`${service.title} decoration services in Bangalore - We Decor`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 motion-reduce:transition-none"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={65}
                      priority={index === 0}
                      loading={index === 0 ? undefined : 'lazy'}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
