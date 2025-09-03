import Image from 'next/image';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SITE_URL } from '@/lib/site';
import { JsonLd } from '@/lib/seo';
import type { Metadata } from 'next';

// List of services to display on the homepage
const services = [
  {
    title: 'Birthday Decoration',
    description:
      'Creative and vibrant birthday decorations for all ages. From themed parties to elegant celebrations, we bring your birthday vision to life with stunning decor arrangements.',
    image: '/services/birthday.JPG',
    href: '/services',
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
];

// Structured data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'We Decor',
  description:
    "Bangalore's trusted decor experts for weddings, birthdays, haldi, and more. Professional event decoration services starting from ₹2999.",
  url: '/',
  logo: '/logo.png',
  image: '/og-banner.jpg',
  telephone: '+91-8880544452',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9716,
    longitude: 77.5946,
  },
  openingHours: 'Mo-Su 09:00-18:00',
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, UPI, Bank Transfer',
  areaServed: {
    '@type': 'City',
    name: 'Bangalore',
  },
  serviceArea: {
    '@type': 'City',
    name: 'Bangalore',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Event Decoration Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Wedding Decoration',
          description:
            'Complete wedding decoration services including stage, mandap, and venue setup',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Birthday Decoration',
          description: 'Creative birthday party decorations for all ages',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Haldi Decoration',
          description: 'Traditional haldi ceremony decorations with yellow theme',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corporate Event Decoration',
          description: 'Professional corporate event and conference decorations',
        },
      },
    ],
  },
  sameAs: ['https://www.facebook.com/wedecorevents', 'https://www.instagram.com/wedecorevents'],
};

export const metadata: Metadata = {
  title: "We Decor - Bringing Dreams to Life | Bangalore's Trusted Event Decorators",
  description:
    "Bangalore's trusted decor experts for weddings, birthdays, haldi, and more. Professional event decoration services starting from ₹2999. Call +91 8880544452.",
  openGraph: {
    title: "We Decor - Bringing Dreams to Life | Bangalore's Trusted Event Decorators",
    description:
      "Bangalore's trusted decor experts for weddings, birthdays, haldi, and more. Professional event decoration services starting from ₹2999. Call +91 8880544452.",
    images: ['/og-banner.jpg'],
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: "We Decor - Bringing Dreams to Life | Bangalore's Trusted Event Decorators",
    description:
      "Bangalore's trusted decor experts for weddings, birthdays, haldi, and more. Professional event decoration services starting from ₹2999. Call +91 8880544452.",
    images: ['/og-banner.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const dynamic = 'force-static';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <JsonLd data={structuredData} />
      {/* Organization (logo/sameAs) */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': `${SITE_URL}/#org`,
          name: 'We Decor',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`,
          },
          sameAs: [
            'https://www.instagram.com/wedecorevents',
            'https://www.facebook.com/wedecorevents',
          ],
        }}
      />
      {/* WebSite (SearchAction) */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'We Decor',
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_URL}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />

      {/* Hero Section (mount-based animation; no SSR opacity:0) */}
      <section
        className={
          `min-h-[60vh] py-8 md:py-16 bg-white dark:bg-gray-900 ` +
          `flex items-center justify-center relative overflow-hidden ` +
          `text-gray-900 dark:text-white ` +
          `motion-safe:transition-all motion-safe:duration-700 ` +
          `${mounted ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-6'}`
        }
      >
        {/* Animated background elements */}
        {/* Optional background overlay disabled to avoid contrast issues */}
        <div className="absolute inset-0" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1
            className={
              `text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ` +
              `text-gray-900 dark:text-white ` +
              `motion-safe:transition-all motion-safe:duration-700 ` +
              `${mounted ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-6'}`
            }
          >
            We Decor
          </h1>

          <h2
            className={
              `text-3xl md:text-4xl lg:text-5xl font-medium mb-6 tracking-wide ` +
              `text-gray-900 dark:text-white ` +
              `motion-safe:transition-all motion-safe:duration-700 ` +
              `${mounted ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-6'}`
            }
          >
            Bringing Dreams to Life
          </h2>

          <p
            className={
              `text-xl md:text-2xl mb-8 ` +
              `text-gray-700 dark:text-gray-200 ` +
              `motion-safe:transition-all motion-safe:duration-700 ` +
              `${mounted ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-6'}`
            }
          >
            Bangalore's trusted decor experts for weddings, birthdays, haldi, and more.
          </p>

          <div
            className={
              `flex flex-col sm:flex-row gap-4 justify-center ` +
              `motion-safe:transition-all motion-safe:duration-700 ` +
              `${mounted ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-6'}`
            }
          >
            <Link
              href="/contact"
              className="bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Get a Quote
            </Link>
            <Link
              href="/gallery"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-colors duration-200"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <motion.section
        className="py-16 px-6 bg-white dark:bg-gray-900"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Services
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              Professional decoration services for all your special occasions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href={service.href} className="block group">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3} // Priority for first 3 images
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 dark:text-white">{service.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Decorate Your Event?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let us transform your vision into reality with our professional decoration services.
          </p>
          <Link
            href="/contact"
            className="bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-800 transition-colors duration-200 shadow-lg hover:shadow-xl inline-block"
          >
            Get a Quote
          </Link>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />
    </>
  );
}