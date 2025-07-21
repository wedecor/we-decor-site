import Layout from '../../components/Layout'
import Link from 'next/link'

const services = [
  {
    name: 'Decoration',
    description: 'Creative event and party decor for all occasions. Weddings, birthdays, haldi, and more.',
    href: '/services/decoration',
    icon: '🎉',
    color: 'bg-pink-400',
  },
  {
    name: 'Catering',
    description: 'All types of food services—veg, non-veg, desserts, regional cuisines, and more.',
    href: '/services/catering',
    icon: '🍽️',
    color: 'bg-yellow-400',
  },
  {
    name: 'Make-up Artists',
    description: 'Professional make-up for weddings, parties, and corporate events.',
    href: '/services/makeup-artists',
    icon: '💄',
    color: 'bg-red-400',
  },
  {
    name: 'Hair Stylists',
    description: 'Expert hair styling for your special day or event.',
    href: '/services/hair-stylists',
    icon: '💇‍♀️',
    color: 'bg-purple-400',
  },
  {
    name: 'Mehndi Artists',
    description: 'Intricate mehndi designs for all events and festivals.',
    href: '/services/mehndi-artists',
    icon: '🪔',
    color: 'bg-green-400',
  },
  {
    name: 'Photographers',
    description: 'Capture your most important moments with our professional photographers.',
    href: '/services/photographers',
    icon: '📸',
    color: 'bg-blue-400',
  },
  {
    name: 'Videographers',
    description: 'Dynamic, impactful event videos for weddings, parties, and more.',
    href: '/services/videographers',
    icon: '🎥',
    color: 'bg-indigo-400',
  },
];

import { motion } from 'framer-motion';

export default function ServicesPage() {
  return (
    <Layout
      seo={{
        title: "Our Services | We Decor Event Management Bangalore",
        description: "Discover We Decor's full range of event services in Bangalore: Decoration, Catering, Make-up Artists, Hair Stylists, Mehndi Artists, Photographers, Videographers, and more.",
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Our Services
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.name}
              href={service.href}
              className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 overflow-hidden group border border-gray-200 dark:border-gray-700"
            >
              <motion.div
                className={`flex items-center justify-center h-40 w-full ${service.color}`}
                whileHover={{ scale: 1.1, rotate: 6 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="text-6xl select-none" aria-label={service.name}>{service.icon}</span>
              </motion.div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-green-700 dark:text-green-200">{service.name}</h2>
                <p className="text-gray-700 dark:text-gray-300 text-base">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
} 