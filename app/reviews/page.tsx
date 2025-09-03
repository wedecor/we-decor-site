import Testimonials from '@/components/Testimonials';
import { SimpleGoogleReviewsEmbed } from '@/components/GoogleReviewsWidget';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Reviews - We Decor Bangalore',
  description: 'Read authentic customer reviews and testimonials for We Decor Bangalore. See what our clients say about our wedding decorations, birthday parties, and event services.',
  openGraph: {
    title: 'Customer Reviews - We Decor Bangalore',
    description: 'Read authentic customer reviews and testimonials for We Decor Bangalore.',
    images: ['/images/reviews-og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Reviews - We Decor Bangalore',
    description: 'Read authentic customer reviews and testimonials for We Decor Bangalore.',
    images: ['/images/reviews-og.jpg'],
  },
  alternates: {
    canonical: '/reviews',
  },
};

export default function ReviewsPage() {
  // Replace with your actual Google Place ID
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || 'ChIJ...';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Customer Reviews & Testimonials</h1>
          <p className="text-xl md:text-2xl mb-8">
            Real feedback from happy customers across Bangalore
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg font-semibold">5.0</span>
            </div>
            <span className="text-lg">•</span>
            <span className="text-lg">50+ Reviews</span>
            <span className="text-lg">•</span>
            <span className="text-lg">Trusted by 1000+ Customers</span>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <SimpleGoogleReviewsEmbed placeId={placeId} />
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <Testimonials />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              Why Customers Choose We Decor
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our commitment to excellence has earned us the trust of hundreds of customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Quality Assurance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every decoration is crafted with attention to detail and premium materials
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Punctual Service</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We arrive on time and complete setups efficiently without delays
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Round-the-clock customer support for all your decoration needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Your Perfect Event?
          </h2>
          <p className="text-xl mb-8">
            Join hundreds of satisfied customers who chose We Decor for their special moments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Quote
            </a>
            <a
              href="tel:+919876543210"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}