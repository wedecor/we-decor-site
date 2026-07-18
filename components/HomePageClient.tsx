'use client';

import Image from 'next/image';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { playfair, inter } from '@/app/fonts';
import { CONTACT } from '@/lib/contact';
import { HOMEPAGE_SERVICES } from '@/lib/services';

export default function HomePageClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <section
        className={
          `relative min-h-[60vh] md:min-h-[90vh] py-12 md:py-20 overflow-hidden flex flex-col justify-center ` +
          `motion-safe:transition-all motion-safe:duration-700 ` +
          `${mounted ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-6'}`
        }
      >
        <div className="absolute inset-0 md:min-h-[90vh]">
          <Image
            src="/banner.jpg"
            alt="We Decor Bangalore event decoration showcase"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85"
            aria-hidden
          />
        </div>

        <div className="relative z-10 px-6 max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl text-center mx-auto">
              <h1
                className={
                  `${playfair.className} text-5xl md:text-6xl lg:text-7xl font-bold mb-4 ` +
                  `tracking-[-0.02em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.95),0_0_32px_rgba(0,0,0,0.7)]`
                }
              >
                We Decor
              </h1>
              <h2
                className={
                  `${playfair.className} text-3xl md:text-4xl lg:text-5xl mb-5 text-white ` +
                  `[text-shadow:0_2px_12px_rgba(0,0,0,0.95),0_0_28px_rgba(0,0,0,0.7)]`
                }
              >
                Bringing Dreams to Life
              </h2>
              <p
                className={
                  `${inter.className} max-w-2xl mx-auto text-center text-lg md:text-xl lg:text-2xl mb-3 leading-relaxed text-white ` +
                  `[text-shadow:0_1px_6px_rgba(0,0,0,0.95),0_0_16px_rgba(0,0,0,0.7)]`
                }
              >
                Bangalore's trusted decor experts for weddings, birthdays, haldi, and more.
              </p>
              <p
                className={
                  `${inter.className} text-center text-white font-semibold text-base md:text-lg lg:text-xl mb-8 ` +
                  `[text-shadow:0_1px_6px_rgba(0,0,0,0.95),0_0_14px_rgba(0,0,0,0.65)]`
                }
              >
                Perfect 5★ on Google
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-bold `
                  + `text-white bg-[#b76e7a] hover:bg-[#c98a94] border-2 border-white/30 `
                  + `shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.5)] `
                  + `focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#b76e7a]"
                >
                  Get Free Quote
                  <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/gallery"
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold border-2 border-white text-white hover:bg-white/15 transition-all duration-300"
                >
                  View Gallery
                  <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <a
          href="#our-services"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/70 hover:text-white/95 transition-colors duration-300"
          aria-label="Scroll to services"
        >
          <span className={`${inter.className} text-xs tracking-widest text-white/80`}>Scroll</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </section>

      <motion.section
        id="our-services"
        className="py-20 md:py-24 px-6 bg-[#faf7f2] dark:bg-[#1e3a5f] relative overflow-hidden scroll-mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-x-0 -top-20 h-20 bg-[radial-gradient(60%_100%_at_50%_100%,#1e3a5f0f,transparent)]" />
        <div className="absolute inset-x-0 -bottom-16 h-16 bg-[radial-gradient(60%_100%_at_50%_0%,#b76e7a1a,transparent)]" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className={`${playfair.className} text-4xl md:text-5xl font-bold mb-4 text-[#1e3a5f] dark:text-[#faf7f2]`}
            >
              Our Services
            </h2>
            <p className={`${inter.className} text-lg text-[#1e3a5f]/80 dark:text-[#faf7f2]/80`}>
              Professional decoration services for all your special occasions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOMEPAGE_SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href={service.href} className="block group">
                  <div className="bg-white dark:bg-[#162544] rounded-2xl shadow-[0_8px_32px_rgba(26,77,62,0.06)] hover:shadow-[0_16px_48px_rgba(26,77,62,0.1)] transition-all duration-300 overflow-hidden group-hover:-translate-y-0.5 border border-[#1e3a5f08] dark:border-white/10">
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
                        className={`${playfair.className} text-2xl font-bold mb-2 text-[#1e3a5f] dark:text-[#faf7f2]`}
                      >
                        {service.title}
                      </h3>
                      <p className={`${inter.className} text-[#1e3a5f]/80 dark:text-[#faf7f2]/80 mb-3`}>
                        {service.description}
                      </p>
                      <span className={`${inter.className} text-[#1e3a5f] dark:text-[#b76e7a] font-medium text-sm group-hover:underline inline-flex items-center gap-1`}>
                        Learn more <span aria-hidden>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 md:py-24 px-6 relative overflow-hidden text-[#1e3a5f]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_0%,#b76e7a22,transparent)]" />
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-4`}>
            Ready to Decorate Your Event?
          </h2>
          <p className={`${inter.className} text-xl mb-8 text-[#1e3a5f]/80`}>
            Let us transform your vision into reality with our professional decoration services.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-[#1e3a5f] bg-[#b76e7a] hover:bg-[#c98a94] transition-all duration-300 shadow-[0_8px_30px_rgba(183,110,122,0.35)] hover:shadow-[0_12px_40px_rgba(183,110,122,0.45)]"
          >
            Get Free Quote
            <span className="ml-3">→</span>
          </Link>
        </div>
      </motion.section>

      <Testimonials />

      <motion.section
        className="py-20 md:py-24 px-6 bg-[#faf7f2] dark:bg-[#162544]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`${playfair.className} text-3xl md:text-4xl font-bold mb-8 text-[#1e3a5f] dark:text-[#faf7f2]`}
          >
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-[#1e3a5f] p-6 rounded-2xl shadow-[0_8px_32px_rgba(26,77,62,0.06)] hover:shadow-[0_12px_40px_rgba(26,77,62,0.09)] transition-shadow duration-300 border border-[#1e3a5f10] dark:border-white/10">
              <h3
                className={`${playfair.className} text-xl font-semibold mb-4 text-[#1e3a5f] dark:text-[#faf7f2]`}
              >
                Primary Contact
              </h3>
              <p
                className={`${inter.className} text-lg text-[#1e3a5f]/80 dark:text-[#faf7f2]/80 mb-2`}
              >
                {CONTACT.telLinks()[0].label}
              </p>
              <a
                href={CONTACT.waUrl()}
                className="text-[#1e3a5f] hover:text-[#162544] font-medium underline decoration-[#b76e7a]/60 underline-offset-4 hover:decoration-[#b76e7a] transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <div className="bg-white dark:bg-[#1e3a5f] p-6 rounded-2xl shadow-[0_8px_32px_rgba(26,77,62,0.06)] hover:shadow-[0_12px_40px_rgba(26,77,62,0.09)] transition-shadow duration-300 border border-[#1e3a5f10] dark:border-white/10">
              <h3
                className={`${playfair.className} text-xl font-semibold mb-4 text-[#1e3a5f] dark:text-[#faf7f2]`}
              >
                Secondary Contact
              </h3>
              <p
                className={`${inter.className} text-lg text-[#1e3a5f]/80 dark:text-[#faf7f2]/80 mb-2`}
              >
                {CONTACT.telLinks()[1].label}
              </p>
              <a
                href={`tel:${CONTACT.telLinks()[1].raw}`}
                className="text-[#1e3a5f] hover:text-[#162544] font-medium underline decoration-[#b76e7a]/60 underline-offset-4 hover:decoration-[#b76e7a] transition"
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

