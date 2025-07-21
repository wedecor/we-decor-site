import Layout from '../../components/Layout'
import Link from 'next/link'

export default function PhotographersServicePage() {
  return (
    <Layout
      seo={{
        title: "Photographers in Bangalore | We Decor",
        description: "We Decor provides professional photographers for events in Bangalore: weddings, parties, corporate events, and more. Capture your memories.",
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">Photographers</h1>
        <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">Capture your most important moments with our exceptional photographers. We focus on aesthetics, storytelling, and customer service, ensuring you have beautiful memories to cherish for a lifetime.</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-white mb-8">
          <li>Weddings, corporate events, birthdays, and more</li>
          <li>Professional editing and selection</li>
          <li>Creative, story-driven photography</li>
        </ul>
        <div className="text-center">
          <Link href="/services" className="text-blue-600 hover:underline">Back to Services</Link>
        </div>
      </section>
    </Layout>
  )
} 