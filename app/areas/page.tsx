import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AreasIndex() {
  const areas = [{"name":"Ashok Nagar","slug":"ashok-nagar"},{"name":"Banashankari","slug":"banashankari"},{"name":"Bannerghatta Road","slug":"bannerghatta-road"},{"name":"Basavanagudi","slug":"basavanagudi"},{"name":"Bellandur","slug":"bellandur"},{"name":"BTM Layout","slug":"btm-layout"},{"name":"Domlur","slug":"domlur"},{"name":"Electronic City","slug":"electronic-city"},{"name":"Hebbal","slug":"hebbal"},{"name":"HSR Layout","slug":"hsr-layout"},{"name":"Indiranagar","slug":"indiranagar"},{"name":"Jayanagar","slug":"jayanagar"},{"name":"JP Nagar","slug":"jp-nagar"},{"name":"Kanakapura Road","slug":"kanakapura-road"},{"name":"Koramangala","slug":"koramangala"},{"name":"Malleshwaram","slug":"malleshwaram"},{"name":"Marathahalli","slug":"marathahalli"},{"name":"Mathikere","slug":"mathikere"},{"name":"Peenya","slug":"peenya"},{"name":"Rajajinagar","slug":"rajajinagar"},{"name":"Richmond Town","slug":"richmond-town"},{"name":"RT Nagar","slug":"rt-nagar"},{"name":"Sahakarnagar","slug":"sahakarnagar"},{"name":"Sarjapur Road","slug":"sarjapur-road"},{"name":"Ulsoor","slug":"ulsoor"},{"name":"Vijayanagar","slug":"vijayanagar"},{"name":"Whitefield","slug":"whitefield"},{"name":"Yelahanka","slug":"yelahanka"},{"name":"Yeshwanthpur","slug":"yeshwanthpur"}];
  
  return (
    <>
      <Navbar />
      <main id="top" className="pt-20 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          {/* Hero */}
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Event Decoration Across Bangalore — Areas We Serve</h1>
            <p className="mt-2 text-lg opacity-90 text-gray-700 dark:text-gray-300">
              Explore our coverage across South, East, North, Central and West Bengaluru.
              Each area page includes local service details, photos and quick booking options.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="tel:+918880544452" className="rounded-xl border border-green-200 dark:border-green-700 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">Call</a>
              <a href="https://wa.me/918880544452?text=Hi! I need decoration services in Bangalore" target="_blank" className="rounded-xl border border-green-200 dark:border-green-700 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">WhatsApp</a>
              <Link href="/services" className="rounded-xl border border-green-200 dark:border-green-700 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">See Services</Link>
            </div>
          </header>

          {/* Areas Grid */}
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900 dark:text-white">All Areas We Serve</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {areas.map(a => (
                <Link 
                  key={a.slug} 
                  href={`/areas/${a.slug}`}
                  className="group block p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 hover:border-green-300 dark:hover:border-green-600"
                >
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                      {a.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      View Services
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="mt-12 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Ready to book Bangalore decor?</h2>
            <p className="mb-4 opacity-90 text-gray-700 dark:text-gray-300">
              Tell us your area and event date — we'll share themes and pricing right away.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+918880544452" className="rounded-xl border border-green-200 dark:border-green-700 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">Call</a>
              <a href="https://wa.me/918880544452?text=Hi! I need decoration services in Bangalore" target="_blank" className="rounded-xl border border-green-200 dark:border-green-700 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">WhatsApp</a>
              <Link href="/contact" className="rounded-xl border border-green-200 dark:border-green-700 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">Get a Quote</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      
      {/* Sticky WhatsApp CTA */}
      <a
        href="https://wa.me/918880544452"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-400 to-pink-400 text-white px-6 py-3 rounded-full shadow-xl z-50 flex items-center gap-3 hover:from-green-500 hover:to-pink-500 hover:scale-105 transition transform duration-200 animate-pulse hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
        target="_blank"
        rel="noopener"
        id="whatsapp-cta"
        data-gtm="click-whatsapp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
        WhatsApp
      </a>
    </>
  );
}
