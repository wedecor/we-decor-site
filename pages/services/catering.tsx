import Layout from '../../components/Layout'
import Link from 'next/link'

export default function CateringServicePage() {
  return (
    <Layout
      seo={{
        title: "Catering Services in Bangalore | We Decor",
        description: "We Decor offers catering services for events in Bangalore: diverse cuisines, food and beverage management, and guest satisfaction.",
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">Catering Services</h1>
        <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">The provision of food and drink at a social event provided by We Decor includes a diverse list of tempting, lip-smacking dishes. From sweets to healthy snacks, let us take care of all your guests’ tastes and preferences.</p>
        <p className="text-gray-800 dark:text-white mb-4">Our catering management covers planning, organization, and hygiene for various types of events. We focus on meeting customer expectations, maintaining food and hygiene standards, and ensuring every guest enjoys a bountiful supply of fresh food and beverages.</p>
        <p className="text-gray-800 dark:text-white mb-8">Let us delight your guests and leave them with tantalizing taste-buds! We offer:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-white mb-8">
          <li>Diverse cuisines and regional specialties</li>
          <li>Menu planning and customization</li>
          <li>Food and beverage management</li>
          <li>Professional service staff</li>
        </ul>
        <div className="text-center">
          <Link href="/services" className="text-blue-600 hover:underline">Back to Services</Link>
        </div>
      </section>
    </Layout>
  )
} 