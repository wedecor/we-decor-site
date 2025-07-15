import Link from "next/link";

// Hero is the main entry section for the homepage, with headline and CTAs
export default function Hero() {
  return (
    // Section with gradient background and centered content
    <section className="bg-gradient-to-br from-green-500 to-blue-500 py-20 text-center text-white animate-fadeIn transition-opacity font-sans">
      {/* Main headline for brand positioning */}
      <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">Bringing Dreams to Life</h1>
      {/* Tagline for trust and context */}
      <p className="text-xl md:text-2xl mb-10 font-medium opacity-90">Bangalore’s trusted event decor experts for weddings, birthdays, haldi, and more.</p>
      {/* CTA buttons for conversion: Get a Quote and View Gallery */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <Link
          href="/contact"
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold shadow-md hover:scale-105 transition transform duration-200 hover:shadow-xl"
        >
          Get a Quote
        </Link>
        <Link
          href="/gallery"
          className="bg-white border-2 border-blue-500 text-blue-600 px-8 py-4 rounded-full font-bold shadow-md hover:bg-blue-50 hover:scale-105 transition transform duration-200"
        >
          View Gallery
        </Link>
      </div>
    </section>
  );
}
