import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import { motion } from "framer-motion";

// List of services to display on the homepage
const services = [
  {
    title: "Birthday Decoration",
    description: "Creative and vibrant birthday decorations for all ages. From themed parties to elegant celebrations, we bring your birthday vision to life with stunning decor arrangements.",
    image: "/services/birthday.JPG",
    href: "/services/birthday-decoration",
  },
  {
    title: "Haldi Decoration",
    description: "Traditional and modern haldi ceremony decorations. Beautiful yellow-themed setups with traditional elements and contemporary touches for your special pre-wedding celebration.",
    image: "/services/haldi.jpg",
    href: "/services/haldi-decoration",
  },
  {
    title: "Engagement Decoration",
    description: "Romantic and elegant engagement party decorations. Create the perfect atmosphere for your special moment with our professional decor services and stunning arrangements.",
    image: "/services/engagement.jpg",
    href: "/services/engagement-decoration",
  },
  {
    title: "Corporate Event Decoration",
    description: "Professional corporate event decorations for meetings, conferences, and celebrations. Impress your clients and team with our sophisticated corporate decor solutions.",
    image: "/services/corporate.JPG",
    href: "/services/corporate-decoration",
  },
  {
    title: "Tent & Balloon Setup",
    description: "Professional tent and balloon arrangements for outdoor events. From elegant balloon arches to complete tent setups, we handle all your outdoor decoration needs.",
    image: "/services/tent and baloon.jpg",
    href: "/services/tent-balloon-setup",
  },
  {
    title: "Room Decoration",
    description: "Transform any space with our room decoration services. From intimate gatherings to large celebrations, we create beautiful and personalized room decor arrangements.",
    image: "/services/room decor.jpg",
    href: "/services/room-decoration",
  },
];

export default function HomePage() {
  return (
    <Layout
      seo={{
        title: "Bringing Dreams to Life",
        description: "Bangalore's trusted decor experts for weddings, birthdays, haldi, and more. Professional event decoration services.",
        image: "/gallery/hero1.webp",
      }}
    >
      {/* Hero Section */}
      <motion.section 
        className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-300 mb-2 drop-shadow-lg tracking-wider"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              WE DECOR
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-yellow-300 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fadeIn text-white drop-shadow-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Bringing Dreams to Life
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 opacity-90 animate-fadeInUp animation-delay-200"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Bangalore's trusted decor experts for weddings, birthdays, haldi, and more.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link
              href="/contact"
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Get a Quote
            </Link>
            <Link
              href="/gallery"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-colors duration-200"
            >
              View Gallery
            </Link>
          </motion.div>
        </div>
      </motion.section>

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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
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
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
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

      {/* CTA Section */}
      <motion.section 
        className="py-16 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Decorate Your Event?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let us transform your vision into reality with our professional decoration services.
          </p>
          <Link
            href="/contact"
            className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl inline-block"
          >
            Get a Quote
          </Link>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />
    </Layout>
  );
}
