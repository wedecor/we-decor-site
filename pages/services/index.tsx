import Layout from '../../components/Layout'
import Link from 'next/link'

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Decoration</h2>
            <p className="mb-2 text-gray-800 dark:text-white">Event planning and party decor for all occasions. <Link href="/services/decoration" className="text-blue-600 hover:underline">Learn more</Link></p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Catering</h2>
            <p className="mb-2 text-gray-800 dark:text-white">Tempting, diverse dishes for every event. <Link href="/services/catering" className="text-blue-600 hover:underline">Learn more</Link></p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Make-up Artists</h2>
            <p className="mb-2 text-gray-800 dark:text-white">Professional make-up for every occasion. <Link href="/services/makeup-artists" className="text-blue-600 hover:underline">Learn more</Link></p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Hair Stylists</h2>
            <p className="mb-2 text-gray-800 dark:text-white">Expert hair styling for your special day. <Link href="/services/hair-stylists" className="text-blue-600 hover:underline">Learn more</Link></p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Mehndi Artists</h2>
            <p className="mb-2 text-gray-800 dark:text-white">Intricate mehndi designs for all events. <Link href="/services/mehndi-artists" className="text-blue-600 hover:underline">Learn more</Link></p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Photographers</h2>
            <p className="mb-2 text-gray-800 dark:text-white">Capture your memories with our professionals. <Link href="/services/photographers" className="text-blue-600 hover:underline">Learn more</Link></p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Videographers</h2>
            <p className="mb-2 text-gray-800 dark:text-white">Dynamic, impactful event videos. <Link href="/services/videographers" className="text-blue-600 hover:underline">Learn more</Link></p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Other Popular Services</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-800 dark:text-white mb-8">
          <li><Link href="/services/birthday-decoration" className="text-blue-600 hover:underline">Birthday Decoration</Link></li>
          <li><Link href="/services/haldi-decoration" className="text-blue-600 hover:underline">Haldi Decoration</Link></li>
          <li><Link href="/services/wedding-setup" className="text-blue-600 hover:underline">Wedding Setup</Link></li>
          <li><Link href="/services/tent-balloon-setup" className="text-blue-600 hover:underline">Tent & Balloon Setup</Link></li>
          <li><Link href="/services/birthday-home-decoration" className="text-blue-600 hover:underline">Birthday Home Decoration</Link></li>
          <li><Link href="/services/haldi-backdrop-decor" className="text-blue-600 hover:underline">Haldi Backdrop Decor</Link></li>
          <li><Link href="/services/wedding-stage-decor" className="text-blue-600 hover:underline">Wedding Stage Decor</Link></li>
        </ul>
      </section>
    </Layout>
  )
} 