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
  title: "Event Decoration in Yeshwanthpur – We Decor Bangalore",
  description: "Birthday, wedding, haldi & balloon decoration in Yeshwanthpur. Décor for homes, lakeside layouts, banquet halls and corporate venues. Book with We Decor today.",
  alternates: { canonical: "https://www.wedecorevents.com/areas/yeshwanthpur" },
  openGraph: {
    title: "Event Decoration in Yeshwanthpur – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Yeshwanthpur. Décor for homes, lakeside layouts, banquet halls and corporate venues. Book with We Decor today.",
    url: "https://www.wedecorevents.com/areas/yeshwanthpur",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "Event Decoration in Yeshwanthpur – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Yeshwanthpur. Décor for homes, lakeside layouts, banquet halls and corporate venues. Book with We Decor today.",
  },
};

export default function Page() {
  const locality = "Yeshwanthpur";
  const intro = `Yeshwanthpur in North Bangalore is known for its mix of serene lakeside views, large gated communities and upcoming tech hubs. Celebrations in Yeshwanthpur often range from family birthdays in apartments, to grand weddings in banquet halls, to corporate events at business parks. At We Decor, we bring tailored decoration services to Yeshwanthpur, ensuring that every balloon arch, floral mandap and themed backdrop fits both the venue and the occasion. Our decorators understand the layouts, apartments and community halls in Yeshwanthpur, giving us the ability to offer same-day services and custom setups. From haldi ceremonies in family homes to corporate events in office spaces, our team has executed hundreds of décor projects in Yeshwanthpur, winning trust and delighting customers.`;
  
  const services: string[] = [
    "Balloon Decoration in Yeshwanthpur — Custom balloon arches and backdrops for homes and halls. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible.",
    "Mehendi Décor in Yeshwanthpur — Colorful drapes, floral swings and vibrant setups. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible.",
    "Engagement Décor in Yeshwanthpur — Romantic arches, floral setups and fairy light backdrops. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible.",
    "Wedding Decoration in Yeshwanthpur — Floral mandaps, couple stages, bridal room décor and themed lighting. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible.",
    "Anniversary Decoration in Yeshwanthpur — Balloon arches, dinner backdrops and elegant themes. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible.",
    "Haldi Decoration in Yeshwanthpur — Marigold décor, traditional props and yellow backdrops. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible.",
    "Housewarming Décor in Yeshwanthpur — Torans, rangoli and temple-style floral setups. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible.",
    "Theme Party Décor in Yeshwanthpur — Kids’ cartoon themes, Bollywood nights and seasonal parties. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible.",
    "Corporate Event Decoration in Yeshwanthpur — Office parties, festive décor and team gatherings. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible.",
    "Naming Ceremony Décor in Yeshwanthpur — Balloon cradles, floral themes and stage décor. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible.",
    "Baby Shower Decoration in Yeshwanthpur — Pastel balloons, cradle backdrops and welcome signage. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible.",
    "Festival Decoration in Yeshwanthpur — Diwali diyas, Eid lanterns, Christmas trees and Ganesh décor. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible.",
    "Proposal Decoration in Yeshwanthpur — Rooftop setups, flower décor and candle pathways. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible.",
    "Birthday Decoration in Yeshwanthpur — Balloon arches, LED backdrops, cartoon themes and milestone birthdays. Our decorators in Yeshwanthpur customize each element to match your venue type — apartments, villas, lakeside layouts or banquet halls — while keeping budgets flexible."
  ];
  
  const why = `✔ Local decorators in Yeshwanthpur familiar with major banquet halls and gated communities.`;
  
  const nearby: {name: string; slug: string}[] = [
    { "name": "Malleshwaram", "slug": "malleshwaram" },
    { "name": "Peenya", "slug": "peenya" },
    { "name": "Mathikere", "slug": "mathikere" }
  ];
  
  const faqs: {q: string; a: string}[] = [
    {
      "q": "Do you provide birthday decoration at homes in Yeshwanthpur?",
      "a": "Yes, do you provide birthday decoration at homes in yeshwanthpur? In Yeshwanthpur, we bring balloon decorations, floral backdrops and themed setups tailored to the occasion. Birthday packages begin at ₹2,999, while weddings and larger events are priced based on scale and design complexity."
    },
    {
      "q": "Can you set up wedding and engagement décor in Yeshwanthpur?",
      "a": "Yes, can you set up wedding and engagement décor in yeshwanthpur? In Yeshwanthpur, we bring balloon decorations, floral backdrops and themed setups tailored to the occasion. Birthday packages begin at ₹2,999, while weddings and larger events are priced based on scale and design complexity."
    },
    {
      "q": "What are the starting prices for event decoration in Yeshwanthpur?",
      "a": "Yes, what are the starting prices for event decoration in yeshwanthpur? In Yeshwanthpur, we bring balloon decorations, floral backdrops and themed setups tailored to the occasion. Birthday packages begin at ₹2,999, while weddings and larger events are priced based on scale and design complexity."
    },
    {
      "q": "Do you offer baby shower and naming ceremony décor in Yeshwanthpur?",
      "a": "Yes, do you offer baby shower and naming ceremony décor in yeshwanthpur? In Yeshwanthpur, we bring balloon decorations, floral backdrops and themed setups tailored to the occasion. Birthday packages begin at ₹2,999, while weddings and larger events are priced based on scale and design complexity."
    },
    {
      "q": "Can you decorate villas, lakeside layouts and apartments in Yeshwanthpur?",
      "a": "Yes, can you decorate villas, lakeside layouts and apartments in yeshwanthpur? In Yeshwanthpur, we bring balloon decorations, floral backdrops and themed setups tailored to the occasion. Birthday packages begin at ₹2,999, while weddings and larger events are priced based on scale and design complexity."
    },
    {
      "q": "How much time is required for decoration setup in Yeshwanthpur?",
      "a": "Yes, how much time is required for decoration setup in yeshwanthpur? In Yeshwanthpur, we bring balloon decorations, floral backdrops and themed setups tailored to the occasion. Birthday packages begin at ₹2,999, while weddings and larger events are priced based on scale and design complexity."
    },
    {
      "q": "Do you also handle festival and corporate event décor in Yeshwanthpur?",
      "a": "Yes, do you also handle festival and corporate event décor in yeshwanthpur? In Yeshwanthpur, we bring balloon decorations, floral backdrops and themed setups tailored to the occasion. Birthday packages begin at ₹2,999, while weddings and larger events are priced based on scale and design complexity."
    },
    {
      "q": "Can we customize décor themes based on budget in Yeshwanthpur?",
      "a": "Yes, can we customize décor themes based on budget in yeshwanthpur? In Yeshwanthpur, we bring balloon decorations, floral backdrops and themed setups tailored to the occasion. Birthday packages begin at ₹2,999, while weddings and larger events are priced based on scale and design complexity."
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