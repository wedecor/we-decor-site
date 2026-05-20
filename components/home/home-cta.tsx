import Link from 'next/link';

export default function HomeCta() {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Decorate Your Event?</h2>
        <p className="text-xl mb-8 opacity-90">
          Let us transform your vision into reality with our professional decoration services.
        </p>
        <Link
          href="/contact"
          className="bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-800 transition-colors duration-200 shadow-lg inline-block"
        >
          Get a Quote
        </Link>
      </div>
    </section>
  );
}
