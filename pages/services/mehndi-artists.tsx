import Layout from '../../components/Layout'
import Link from 'next/link'

export default function MehndiArtistsServicePage() {
  return (
    <Layout
      seo={{
        title: "Mehndi Artists in Bangalore | We Decor",
        description: "We Decor offers skilled mehndi artists for weddings, festivals, and events in Bangalore. Intricate designs and creative styles.",
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">Mehndi Artists</h1>
        <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">Let our skilled Mehndi artists bring your favorite designs to life for any event or festival. We offer a variety of intricate designs, from traditional to modern, ensuring your hands and feet are adorned beautifully for your big day.</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-white mb-8">
          <li>Indian, Arabic, and Royal Bridal Mehndi</li>
          <li>Jewellery and simple designs</li>
          <li>Custom requests for all occasions</li>
        </ul>
        <div className="text-center">
          <Link href="/services" className="text-blue-600 hover:underline">Back to Services</Link>
        </div>
      </section>
    </Layout>
  )
} 