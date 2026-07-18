import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Event Decoration in Bangalore | We Decor',
  description:
    'Professional corporate event decorations for meetings, conferences, and celebrations in Bangalore. Sophisticated decor solutions.',
  openGraph: {
    title: 'Corporate Event Decoration in Bangalore | We Decor',
    description: 'Professional corporate event decorations in Bangalore.',
    images: ['/services/corporate.JPG'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Event Decoration in Bangalore | We Decor',
    description: 'Professional corporate event decorations in Bangalore.',
    images: ['/services/corporate.JPG'],
  },
  alternates: {
    canonical: '/services/corporate-decoration',
  },
};

export default function CorporateDecorationPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Corporate Event Decoration',
    name: 'Corporate Event Decoration Services',
    description: 'Professional corporate event decorations in Bangalore.',
    provider: {
      '@type': 'Organization',
      name: 'We Decor',
      areaServed: 'Bangalore, India',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bangalore',
        addressCountry: 'IN',
      },
      telephone: '+917019169442',
    },
    areaServed: {
      '@type': 'City',
      name: 'Bangalore',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-[#faf7f2] dark:bg-[#1e3a5f]">
        <section className="bg-[#1e3a5f] text-white py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Corporate Event Decoration</h1>
            <p className="text-xl md:text-2xl mb-8 text-white/95">
              Professional decor for meetings, conferences, and company celebrations
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-[#1e3a5f] dark:text-[#faf7f2]">
                  Why Choose Our Corporate Decorations?
                </h2>
                <ul className="space-y-4 text-lg text-[#1e3a5f]/90 dark:text-[#faf7f2]/90">
                  <li className="flex items-start">
                    <span className="text-[#b76e7a] mr-3">🏢</span>
                    Branded backdrops and stage setups
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#b76e7a] mr-3">✨</span>
                    Balloon and tent arrangements
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#b76e7a] mr-3">🎯</span>
                    Sophisticated, professional aesthetics
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#b76e7a] mr-3">⏱</span>
                    Punctual setup for corporate timelines
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-[#162544] rounded-2xl shadow-[0_8px_32px_rgba(26,77,62,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-6 border border-[#1e3a5f]/10 dark:border-white/10">
                <h3 className="text-2xl font-bold mb-4 text-[#1e3a5f] dark:text-[#faf7f2]">Get Your Quote</h3>
                <p className="text-[#1e3a5f]/80 dark:text-[#faf7f2]/80 mb-6">
                  Contact us for a personalized corporate decoration quote
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-[#b76e7a] text-[#1e3a5f] hover:bg-[#c98a94] transition-all shadow-[0_8px_30px_rgba(183,110,122,0.35)] hover:shadow-[0_12px_40px_rgba(183,110,122,0.45)]"
                >
                  Get Free Quote
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
