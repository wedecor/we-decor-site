import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GalleryStrip from "@/components/areas/GalleryStrip";
import Breadcrumbs from "@/components/areas/Breadcrumbs";
import NearbyChips from "@/components/areas/NearbyChips";
import FAQAccordion from "@/components/areas/FAQAccordion";
import CTAStickyBar from "@/components/areas/CTAStickyBar";
import ContactCard from "@/components/areas/ContactCard";
import ServicesGrid from "@/components/areas/ServicesGrid";
import AreaHero from "@/components/areas/AreaHero";
import AreaPageShell from "@/components/areas/AreaPageShell";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Event Decoration in Bannerghatta Road – We Decor Bangalore",
  description: "Professional birthday, wedding, haldi & balloon decoration in Bannerghatta Road. Décor for homes, apartments, banquet halls & rooftops. Book We Decor today.",
  alternates: { canonical: "https://www.wedecorevents.com/areas/bannerghatta-road" },
  openGraph: {
    title: "Event Decoration in Bannerghatta Road – We Decor Bangalore",
    description: "Professional birthday, wedding, haldi & balloon decoration in Bannerghatta Road. Décor for homes, apartments, banquet halls & rooftops. Book We Decor today.",
    url: "https://www.wedecorevents.com/areas/bannerghatta-road",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "Event Decoration in Bannerghatta Road – We Decor Bangalore",
    description: "Professional birthday, wedding, haldi & balloon decoration in Bannerghatta Road. Décor for homes, apartments, banquet halls & rooftops. Book We Decor today.",
  },
};

export default function Page() {
  const locality = "Bannerghatta Road";
  const intro = `Bannerghatta Road is one of the most vibrant localities in South Bangalore, known for its blend of traditional charm and modern living. Families, young professionals and couples in Bannerghatta Road often celebrate their milestones in apartments, independent houses, villas and banquet halls across the area. At We Decor, we have transformed countless celebrations in Bannerghatta Road, ranging from intimate home birthdays to lavish wedding stages. Our decorators understand the unique vibe of Bannerghatta Road and create décor that matches both the occasion and the locality’s spirit. Whether it’s a haldi at a family home, a proposal setup on a rooftop, or a corporate party in a clubhouse, we bring themes, balloons, florals and lighting together for unforgettable experiences. With our dedicated local team, same-day setup is available, and every décor element is customized to your theme and budget.`;
  
  const services: string[] = [
    "Naming Ceremony Décor in Bannerghatta Road — Balloon cradles, floral photo zones, custom themes. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element.",
    "Engagement Décor in Bannerghatta Road — Romantic floral arches, fairy lights, candle-lit backdrops. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element.",
    "Wedding Decoration in Bannerghatta Road — Mandaps, floral stages, bridal room décor, and couple seating. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element.",
    "Baby Shower Decoration in Bannerghatta Road — Pastel balloons, cradle backdrops, welcome signage. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element.",
    "Proposal Decoration in Bannerghatta Road — Rooftop dinners, candle décor, balloon & flower arches. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element.",
    "Festival Decoration in Bannerghatta Road — Diwali diyas, Eid setups, Christmas trees & Ganesh décor. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element.",
    "Corporate Event Decoration in Bannerghatta Road — Office parties, festive décor, team gatherings. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element.",
    "Theme Party Décor in Bannerghatta Road — Cartoon, Bollywood, retro or seasonal party themes. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element.",
    "Birthday Decoration in Bannerghatta Road — Balloon arches, LED backdrops, cartoon themes, milestone birthday parties. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element.",
    "Anniversary Decoration in Bannerghatta Road — Elegant balloon setups, dinner backdrops, couple celebrations. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element.",
    "Balloon Decoration in Bannerghatta Road — Custom balloon arches, backdrops for homes & halls. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element.",
    "Mehendi Décor in Bannerghatta Road — Colorful drapes, floral swings, vibrant themed backdrops. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element.",
    "Haldi Decoration in Bannerghatta Road — Marigold backdrops, traditional props, seating arrangements. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element.",
    "Housewarming Décor in Bannerghatta Road — Traditional rangoli, torans, temple-style floral décor. Our team in Bannerghatta Road has executed dozens of such setups, ensuring flawless finish and theme-matching props. We work in apartments, villas and banquet halls across Bannerghatta Road, customizing each décor element."
  ];
  
  const why = `✔ Local Bannerghatta Road decorators available for quick same-day setups.`;
  
  const nearby: {name: string; slug: string}[] = [
    { "name": "BTM Layout", "slug": "btm-layout" },
    { "name": "Arekere", "slug": "arekere" },
    { "name": "Gottigere", "slug": "gottigere" }
  ];
  
  const faqs: {q: string; a: string}[] = [
    {
      "q": "Do you provide home birthday decoration in Bannerghatta Road?",
      "a": "Yes, do you provide home birthday decoration in bannerghatta road? Our team specializes in tailoring decorations for homes, apartments and banquet halls in Bannerghatta Road. We ensure high-quality materials, unique themes, and timely setup. Prices start from ₹2,999 for birthdays and scale up depending on the size and theme."
    },
    {
      "q": "Can you handle wedding or engagement stage décor in Bannerghatta Road?",
      "a": "Yes, can you handle wedding or engagement stage décor in bannerghatta road? Our team specializes in tailoring decorations for homes, apartments and banquet halls in Bannerghatta Road. We ensure high-quality materials, unique themes, and timely setup. Prices start from ₹2,999 for birthdays and scale up depending on the size and theme."
    },
    {
      "q": "How much does event decoration cost in Bannerghatta Road?",
      "a": "Yes, how much does event decoration cost in bannerghatta road? Our team specializes in tailoring decorations for homes, apartments and banquet halls in Bannerghatta Road. We ensure high-quality materials, unique themes, and timely setup. Prices start from ₹2,999 for birthdays and scale up depending on the size and theme."
    },
    {
      "q": "Do you offer baby shower and naming ceremony décor in Bannerghatta Road?",
      "a": "Yes, do you offer baby shower and naming ceremony décor in bannerghatta road? Our team specializes in tailoring decorations for homes, apartments and banquet halls in Bannerghatta Road. We ensure high-quality materials, unique themes, and timely setup. Prices start from ₹2,999 for birthdays and scale up depending on the size and theme."
    },
    {
      "q": "Can you decorate apartments and clubhouses in Bannerghatta Road?",
      "a": "Yes, can you decorate apartments and clubhouses in bannerghatta road? Our team specializes in tailoring decorations for homes, apartments and banquet halls in Bannerghatta Road. We ensure high-quality materials, unique themes, and timely setup. Prices start from ₹2,999 for birthdays and scale up depending on the size and theme."
    },
    {
      "q": "How early should we book event decoration in Bannerghatta Road?",
      "a": "Yes, how early should we book event decoration in bannerghatta road? Our team specializes in tailoring decorations for homes, apartments and banquet halls in Bannerghatta Road. We ensure high-quality materials, unique themes, and timely setup. Prices start from ₹2,999 for birthdays and scale up depending on the size and theme."
    },
    {
      "q": "Do you provide festival and corporate décor services in Bannerghatta Road?",
      "a": "Yes, do you provide festival and corporate décor services in bannerghatta road? Our team specializes in tailoring decorations for homes, apartments and banquet halls in Bannerghatta Road. We ensure high-quality materials, unique themes, and timely setup. Prices start from ₹2,999 for birthdays and scale up depending on the size and theme."
    },
    {
      "q": "Can the décor be customized based on budget in Bannerghatta Road?",
      "a": "Yes, can the décor be customized based on budget in bannerghatta road? Our team specializes in tailoring decorations for homes, apartments and banquet halls in Bannerghatta Road. We ensure high-quality materials, unique themes, and timely setup. Prices start from ₹2,999 for birthdays and scale up depending on the size and theme."
    }
  ];

  return (
    <>
  <Navbar />
  <main id="top" className="pt-20 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
    <AreaPageShell>
      <Breadcrumbs locality={locality} />
      <AreaHero title={metadata?.title as string ?? "Event Decoration"} intro={intro} />
      <ServicesGrid locality={locality} services={services} />
      <GalleryStrip />
      <NearbyChips nearby={nearby} />
      <FAQAccordion faqs={faqs} />
      <ContactCard locality={locality} />
      <CTAStickyBar locality={locality} />
    </AreaPageShell>
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
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.87 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
    </svg>
    WhatsApp
  </a>
</>
  );
}