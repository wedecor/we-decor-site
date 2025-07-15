import Link from "next/link";

// Hero is the main entry section for the homepage, with headline and CTAs
export default function Hero() {
  return (
    // Section with gradient background and centered content
    <section className="bg-gradient-to-br from-pink-100 to-blue-100 py-16 text-center">
      {/* Main headline for brand positioning */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Bringing Dreams to Life
      </h1>
      {/* Tagline for trust and context */}
      <p className="text-lg md:text-xl mb-8">
        Bangalore’s trusted event decor experts for weddings, birthdays, haldi,
        and more.
      </p>
      {/* CTA buttons for conversion: Get a Quote and View Gallery */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Link
          href="/contact"
          className="bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-pink-700"
        >
          Get a Quote
        </Link>
        <Link
          href="/gallery"
          className="bg-white border border-pink-600 text-pink-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-pink-50"
        >
          View Gallery
        </Link>
      </div>
    </section>
  );
}
