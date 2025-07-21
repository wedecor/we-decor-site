import Layout from '../../components/Layout'
import Link from 'next/link'

export default function MakeupArtistsServicePage() {
  return (
    <Layout
      seo={{
        title: "Make-up Artists in Bangalore | We Decor",
        description: "We Decor provides professional make-up artists for weddings, parties, and events in Bangalore. Latest trends, top brands, and creative looks.",
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">Make-up Artists</h1>
        <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">Get ready for your grand event with our highly skilled make-up artists, up to date with the latest trends. Our artists work with top brands to create expressive, magical looks for weddings, parties, and more.</p>
        <p className="text-gray-800 dark:text-white mb-4">We offer a range of styles and ensure you look your best for every occasion. Our make-up artists are passionate about beauty and creativity, helping you exude confidence and elegance for your event.</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-white mb-8">
          <li>Wedding, classic, and celebrity looks</li>
          <li>Dreamy, casual, and corporate styles</li>
          <li>Top-quality products and tools</li>
        </ul>
        <div className="text-center">
          <Link href="/services" className="text-blue-600 hover:underline">Back to Services</Link>
        </div>
      </section>
    </Layout>
  )
} 