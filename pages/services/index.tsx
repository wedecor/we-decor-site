import Layout from '../../components/Layout'
import Link from 'next/link'

const services = [
  {
    name: 'Decoration',
    description: 'Event planning and party decor for all occasions. From theme-based to floral and stage decorations.',
    subServices: [
      { name: 'Birthday Decoration', href: '/services/birthday-decoration' },
      { name: 'Wedding Decoration', href: '/services/wedding-setup' },
      { name: 'Haldi Decoration', href: '/services/haldi-decoration' },
      { name: 'Stage Decoration', href: '/services/wedding-stage-decor' },
      { name: 'Party Decoration', href: '/services/birthday-home-decoration' },
      { name: 'Devotional Decoration', href: '#' },
      { name: 'Floral Decoration', href: '#' },
      { name: 'Corporate Event Decoration', href: '/services/tent-balloon-setup' },
      { name: 'Room Decoration', href: '#' },
      { name: 'Tent & Balloon Setup', href: '/services/tent-balloon-setup' },
      { name: 'Baby Shower Decoration', href: '#' },
      { name: 'Inauguration Ceremonies', href: '#' },
    ],
  },
  {
    name: 'Catering',
    description: 'Diverse cuisines, menu planning, and food & beverage management for all events.',
    subServices: [
      { name: 'Veg Catering', href: '#' },
      { name: 'Non-Veg Catering', href: '#' },
      { name: 'Sweets & Desserts', href: '#' },
      { name: 'Regional/Custom Menus', href: '#' },
    ],
  },
  {
    name: 'Make-up Artists',
    description: 'Professional make-up for weddings, parties, and corporate events.',
    subServices: [
      { name: 'Wedding Make-up', href: '/services/makeup-artists' },
      { name: 'Classic/Party Make-up', href: '/services/makeup-artists' },
      { name: 'Celebrity/Corporate Looks', href: '/services/makeup-artists' },
    ],
  },
  {
    name: 'Hair Stylists',
    description: 'Expert hair styling for your special day or event.',
    subServices: [
      { name: 'Haircut & Styling', href: '/services/hair-stylists' },
      { name: 'Braids, Weaves, Bleach, Dye', href: '/services/hair-stylists' },
      { name: 'Event-specific Styling', href: '/services/hair-stylists' },
    ],
  },
  {
    name: 'Mehndi Artists',
    description: 'Intricate mehndi designs for all events and festivals.',
    subServices: [
      { name: 'Bridal Mehndi', href: '/services/mehndi-artists' },
      { name: 'Arabic Mehndi', href: '/services/mehndi-artists' },
      { name: 'Jewellery Mehndi', href: '/services/mehndi-artists' },
      { name: 'Simple/Traditional Designs', href: '/services/mehndi-artists' },
    ],
  },
  {
    name: 'Photographers',
    description: 'Capture your most important moments with our professional photographers.',
    subServices: [
      { name: 'Wedding Photography', href: '/services/photographers' },
      { name: 'Event Photography', href: '/services/photographers' },
      { name: 'Baby Shoots', href: '/services/photographers' },
      { name: 'Corporate Shoots', href: '/services/photographers' },
    ],
  },
  {
    name: 'Videographers',
    description: 'Dynamic, impactful event videos for weddings, parties, and more.',
    subServices: [
      { name: 'Wedding Videography', href: '/services/videographers' },
      { name: 'Event Videography', href: '/services/videographers' },
      { name: 'Corporate Videos', href: '/services/videographers' },
    ],
  },
];

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
        <div className="space-y-12">
          {services.map((service) => (
            <div key={service.name}>
              <h2 className="text-2xl font-bold mb-2 text-green-700 dark:text-green-200">{service.name}</h2>
              <p className="mb-2 text-gray-800 dark:text-gray-300">{service.description}</p>
              <ul className="list-disc pl-6 space-y-1 text-lg text-gray-700 dark:text-gray-200">
                {service.subServices.map((sub) => (
                  <li key={sub.name}>
                    {sub.href !== '#' ? (
                      <Link href={sub.href} className="text-blue-600 hover:underline">{sub.name}</Link>
                    ) : (
                      <span>{sub.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
} 