import Layout from "../components/Layout";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";

// List of services to display on the homepage
const services = [
  {
    title: "Birthday Decoration",
    description: "Creative birthday decor for all ages.",
    image: "/gallery/birthday1.webp",
    href: "/services/birthday-decoration",
  },
  {
    title: "Haldi Decoration",
    description: "Traditional and modern haldi event setups.",
    image: "/gallery/haldi1.webp",
    href: "/services/haldi-decoration",
  },
  {
    title: "Wedding Setup",
    description: "Elegant wedding and stage decor.",
    image: "/gallery/wedding1.webp",
    href: "/services/wedding-setup",
  },
  {
    title: "Tent & Balloon Setup",
    description: "Colorful tent and balloon decorations.",
    image: "/gallery/tent1.webp",
    href: "/services/tent-balloon-setup",
  },
];

// Homepage component with hero, service highlights, and CTA
export default function Home() {
  return (
    // Layout provides SEO, nav, footer, and sticky CTAs
    <Layout
      seo={{
        title: "Bringing Dreams to Life",
        description:
          "We Decor - Bangalore's best event decor for weddings, birthdays, haldi, and more. Starting at ₹2999.",
        image: "/logo.png",
      }}
    >
      {/* Hero section with headline and main CTAs */}
      <Hero />
      {/* Service highlights grid */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Render a ServiceCard for each service */}
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>
      {/* CTA section for lead conversion */}
      <section className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h2 className="text-xl font-bold mb-4">
          Ready to Decorate Your Event?
        </h2>
        <a
          href="/contact"
          className="bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-pink-700"
        >
          Get a Quote
        </a>
      </section>
    </Layout>
  );
}
