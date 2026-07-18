import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engagement Decoration Services in Bangalore | We Decor',
  description:
    'Romantic and elegant engagement party decorations in Bangalore. Create the perfect atmosphere for your special moment.',
  openGraph: {
    title: 'Engagement Decoration Services in Bangalore | We Decor',
    description: 'Romantic and elegant engagement party decorations in Bangalore.',
    images: ['/services/engagement.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engagement Decoration Services in Bangalore | We Decor',
    description: 'Romantic and elegant engagement party decorations in Bangalore.',
    images: ['/services/engagement.jpg'],
  },
  alternates: {
    canonical: '/services/engagement-decoration',
  },
};

export default function EngagementDecorationPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Engagement Decoration',
    name: 'Engagement Decoration Services',
    description: 'Romantic and elegant engagement party decorations in Bangalore.',
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Engagement Decoration Services</h1>
            <p className="text-xl md:text-2xl mb-8 text-white/95">
              Romantic and elegant setups for your engagement celebration
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-[#1e3a5f] dark:text-[#faf7f2]">
                  Why Choose Our Engagement Decorations?
                </h2>
                <ul className="space-y-4 text-lg text-[#1e3a5f]/90 dark:text-[#faf7f2]/90">
                  <li className="flex items-start">
                    <span className="text-[#b76e7a] mr-3">💍</span>
                    Fairy lights and flower arrangements
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#b76e7a] mr-3">✨</span>
                    Ring ceremony backdrops and mandaps
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#b76e7a] mr-3">🎀</span>
                    Romantic themes tailored to your vision
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#b76e7a] mr-3">📸</span>
                    Stunning photo backdrops for the big day
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-[#162544] rounded-2xl shadow-[0_8px_32px_rgba(26,77,62,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-6 border border-[#1e3a5f]/10 dark:border-white/10">
                <h3 className="text-2xl font-bold mb-4 text-[#1e3a5f] dark:text-[#faf7f2]">Get Your Quote</h3>
                <p className="text-[#1e3a5f]/80 dark:text-[#faf7f2]/80 mb-6">
                  Contact us for a personalized engagement decoration quote
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
