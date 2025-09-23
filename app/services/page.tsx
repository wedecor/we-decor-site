'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { playfair, inter } from '@/app/fonts';

const services = [
  {
    name: 'Decoration',
    description:
      'Creative event and party decor for all occasions. Weddings, birthdays, haldi, and more.',
    href: '/services/decoration',
    icon: '🎉',
    gradient: 'from-pink-400 via-pink-300 to-yellow-200',
  },
  {
    name: 'Catering',
    description: 'All types of food services—veg, non-veg, desserts, regional cuisines, and more.',
    href: '/services/catering',
    icon: '🍽️',
    gradient: 'from-yellow-400 via-yellow-300 to-green-200',
  },
  {
    name: 'Make-up Artists',
    description: 'Professional make-up for weddings, parties, and corporate events.',
    href: '/services/makeup-artists',
    icon: '💄',
    gradient: 'from-red-400 via-pink-400 to-purple-200',
  },
  {
    name: 'Hair Stylists',
    description: 'Expert hair styling for your special day or event.',
    href: '/services/hair-stylists',
    icon: '💇‍♀️',
    gradient: 'from-purple-400 via-indigo-400 to-blue-200',
  },
  {
    name: 'Mehndi Artists',
    description: 'Intricate mehndi designs for all events and festivals.',
    href: '/services/mehndi-artists',
    icon: '🪔',
    gradient: 'from-green-400 via-green-300 to-yellow-100',
  },
  {
    name: 'Photographers',
    description: 'Capture your most important moments with our professional photographers.',
    href: '/services/photographers',
    icon: '📸',
    gradient: 'from-blue-400 via-blue-300 to-cyan-200',
  },
  {
    name: 'Videographers',
    description: 'Dynamic, impactful event videos for weddings, parties, and more.',
    href: '/services/videographers',
    icon: '🎥',
    gradient: 'from-indigo-400 via-purple-300 to-pink-200',
  },
];

// Note: Metadata is handled in app/layout.tsx for client components

export default function ServicesPage() {
  return (
    <section className="max-w-screen-lg mx-auto py-14 md:py-16 px-6">
      <h1
        className={`${playfair.className} text-4xl md:text-5xl font-bold text-center mb-12 text-[#0f3d3e] dark:text-[#faf7f2]`}
      >
        Our Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <Link
            key={service.name}
            href={service.href}
            className="group block rounded-2xl shadow-[0_10px_30px_rgba(15,61,62,0.08)] hover:shadow-[0_20px_50px_rgba(15,61,62,0.12)] transition-transform duration-300 overflow-hidden border border-[#0f3d3e14] focus:outline-none focus:ring-4 focus:ring-[#ffd700]/40 hover:-translate-y-1"
            aria-label={`Learn more about ${service.name}`}
          >
            <motion.div
              className={`flex items-center justify-center h-40 w-full bg-gradient-to-br ${service.gradient}`}
              whileHover={{ scale: 1.08, rotate: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.span
                className="text-6xl select-none drop-shadow-lg"
                aria-label={service.name}
                whileHover={{ scale: 1.2, rotate: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {service.icon}
              </motion.span>
            </motion.div>
            <div className="p-6 flex flex-col h-full">
              <h2
                className={`${playfair.className} text-xl font-bold mb-2 text-[#0f3d3e] dark:text-[#faf7f2]`}
              >
                {service.name}
              </h2>
              <p
                className={`${inter.className} text-[#0f3d3e]/80 dark:text-[#faf7f2]/80 text-base mb-4`}
              >
                {service.description}
              </p>
              <div className="mt-auto flex items-center justify-end">
                <span className="text-[#0f3d3e] dark:text-[#ffd700] font-semibold mr-2">
                  Learn More
                </span>
                <FaArrowRight
                  className="text-[#0f3d3e] dark:text-[#ffd700] group-hover:translate-x-1 transition-transform duration-200"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
