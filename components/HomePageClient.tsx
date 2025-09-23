'use client';

import Image from 'next/image';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { playfair, inter } from '@/app/fonts';

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

export default function HomePageClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <section
        className={
          `relative min-h-[60vh] md:min-h-[70vh] py-12 md:py-16 overflow-hidden ` +
          `bg-[radial-gradient(1200px_600px_at_20%_-10%,#faf7f2,transparent),radial-gradient(800px_400px_at_120%_10%,#ffd70022,transparent)] ` +
          `dark:bg-gradient-to-b dark:from-[#0b2d2e] dark:to-[#0f3d3e] ` +
          `text-[#0f3d3e] dark:text-cream ` +
          `motion-safe:transition-all motion-safe:duration-700 ` +
          `${mounted ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-6'}`
        }
      >
        <div className="pointer-events-none absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-20 bg-[#ffd700]" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-10 bg-[#0f3d3e]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_200px_at_50%_95%,#0f3d3e0d,transparent)]" />

        <div className="relative z-10 px-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl text-center mx-auto">
              <h1
                className={
                  `${playfair.className} text-5xl md:text-6xl lg:text-7xl font-bold mb-4 ` +
                  `tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[#0f3d3e] to-[#174a4b] ` +
                  `dark:from-[#faf7f2] dark:to-[#ffd700]`
                }
              >
                We Decor
              </h1>
              <h2
                className={
                  `${playfair.className} text-3xl md:text-4xl lg:text-5xl mb-6 ` +
                  `text-[#0f3d3e]/90 dark:text-[#faf7f2]`
                }
              >
                Bringing Dreams to Life
              </h2>
              <p
                className={
                  `${inter.className} max-w-2xl mx-auto text-center text-lg md:text-xl mb-10 leading-relaxed ` +
                  `text-[#0f3d3e]/80 dark:text-[#faf7f2]/80`
                }
              >
                Bangalore's trusted decor experts for weddings, birthdays, haldi, and more.
              </p>
              <div className="mx-auto mb-8 max-w-4xl">
                <Image
                  src="/og/home.jpg"
                  alt="We Decor Bangalore wedding stage decor"
                  width={1600}
                  height={900}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="rounded-2xl shadow-lg object-cover"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center md:justify-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold `
                  + `text-[#0f3d3e] bg-[#ffd700] hover:bg-[#ffdf33] transition-all duration-300 `
                  + `shadow-[0_8px_30px_rgba(255,215,0,0.35)] hover:shadow-[0_12px_40px_rgba(255,215,0,0.45)] `
                  + `focus:outline-none focus:ring-2 focus:ring-[#ffd700]/60"
                >
                  Get a Quote
                  <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/gallery"
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold `
                  + `border border-[#0f3d3e] text-[#0f3d3e] hover:text-[#0f3d3e] bg-transparent `
                  + `hover:bg-[#0f3d3e]/10 transition-all duration-300 dark:border-[#faf7f2] dark:text-[#faf7f2] dark:hover:bg-white/10"
                >
                  View Gallery
                  <span className="ml-3 transition-transform group-hover:translate-x-1">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <motion.section
        className="py-16 md:py-20 px-6 bg-[#faf7f2] dark:bg-[#0f3d3e] relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-x-0 -top-20 h-20 bg-[radial-gradient(60%_100%_at_50%_100%,#0f3d3e0f,transparent)]" />
        <div className="absolute inset-x-0 -bottom-16 h-16 bg-[radial-gradient(60%_100%_at_50%_0%,#ffd7001a,transparent)]" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className={`${playfair.className} text-4xl md:text-5xl font-bold mb-4 text-[#0f3d3e] dark:text-[#faf7f2]`}
            >
              Our Services
            </h2>
            <p className={`${inter.className} text-lg text-[#0f3d3e]/80 dark:text-[#faf7f2]/80`}>
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
                  <div className="bg-white dark:bg-[#0e3334] rounded-2xl shadow-[0_10px_30px_rgba(15,61,62,0.08)] hover:shadow-[0_20px_50px_rgba(15,61,62,0.12)] transition-all duration-300 overflow-hidden group-hover:-translate-y-1 border border-[#0f3d3e0f]">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={`${service.title} decoration services in Bangalore - We Decor`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                      />
                    </div>
                    <div className="p-6">
                      <h3
                        className={`${playfair.className} text-2xl font-bold mb-2 text-[#0f3d3e] dark:text-[#faf7f2]`}
                      >
                        {service.title}
                      </h3>
                      <p className={`${inter.className} text-[#0f3d3e]/80 dark:text-[#faf7f2]/80`}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 md:py-20 px-6 relative overflow-hidden text-[#0f3d3e]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_0%,#ffd70022,transparent)]" />
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-4`}>
            Ready to Decorate Your Event?
          </h2>
          <p className={`${inter.className} text-xl mb-8 text-[#0f3d3e]/80`}>
            Let us transform your vision into reality with our professional decoration services.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-[#0f3d3e] bg-[#ffd700] hover:bg-[#ffdf33] transition-all duration-300 shadow-[0_8px_30px_rgba(255,215,0,0.35)] hover:shadow-[0_12px_40px_rgba(255,215,0,0.45)]"
          >
            Get a Quote
            <span className="ml-3">→</span>
          </Link>
        </div>
      </motion.section>

      <Testimonials />

      <motion.section
        className="py-16 md:py-20 px-6 bg-[#faf7f2] dark:bg-[#0e3334]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`${playfair.className} text-3xl md:text-4xl font-bold mb-8 text-[#0f3d3e] dark:text-[#faf7f2]`}
          >
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-[#0f3d3e] p-6 rounded-xl shadow-[0_10px_30px_rgba(15,61,62,0.1)] border border-[#0f3d3e14]">
              <h3
                className={`${playfair.className} text-xl font-semibold mb-4 text-[#0f3d3e] dark:text-[#faf7f2]`}
              >
                Primary Contact
              </h3>
              <p
                className={`${inter.className} text-lg text-[#0f3d3e]/80 dark:text-[#faf7f2]/80 mb-2`}
              >
                +91 88805 44452
              </p>
              <a
                href="https://wa.me/919880544452"
                className="text-[#0f3d3e] hover:text-[#0b2d2e] font-medium underline decoration-[#ffd700]/60 underline-offset-4 hover:decoration-[#ffd700] transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <div className="bg-white dark:bg-[#0f3d3e] p-6 rounded-xl shadow-[0_10px_30px_rgba(15,61,62,0.1)] border border-[#0f3d3e14]">
              <h3
                className={`${playfair.className} text-xl font-semibold mb-4 text-[#0f3d3e] dark:text-[#faf7f2]`}
              >
                Secondary Contact
              </h3>
              <p
                className={`${inter.className} text-lg text-[#0f3d3e]/80 dark:text-[#faf7f2]/80 mb-2`}
              >
                +91 95912 32166
              </p>
              <a
                href="tel:+919591232166"
                className="text-[#0f3d3e] hover:text-[#0b2d2e] font-medium underline decoration-[#ffd700]/60 underline-offset-4 hover:decoration-[#ffd700] transition"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      <FAQ />
    </>
  );
}

