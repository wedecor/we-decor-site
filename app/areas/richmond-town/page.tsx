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
  title: "Event Decoration in Richmond Town – We Decor Bangalore",
  description: "Premium birthday, wedding, haldi & balloon decoration in Richmond Town. Décor for rooftops, apartments, restaurants and banquet halls. Book today.",
  alternates: { canonical: "https://www.wedecorevents.com/areas/richmond-town" },
  openGraph: {
    title: "Event Decoration in Richmond Town – We Decor Bangalore",
    description: "Premium birthday, wedding, haldi & balloon decoration in Richmond Town. Décor for rooftops, apartments, restaurants and banquet halls. Book today.",
    url: "https://www.wedecorevents.com/areas/richmond-town",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "Event Decoration in Richmond Town – We Decor Bangalore",
    description: "Premium birthday, wedding, haldi & balloon decoration in Richmond Town. Décor for rooftops, apartments, restaurants and banquet halls. Book today.",
  },
};

export default function Page() {
  const locality = "Richmond Town";
  const intro = `Richmond Town is one of Central Bangalore’s most vibrant hubs, known for its mix of upscale apartments, chic restaurants, heritage lanes and trendy rooftops. Celebrations in Richmond Town often reflect the cosmopolitan lifestyle of the locality, with families, young professionals and couples choosing everything from intimate home décor to elaborate banquet setups. At We Decor, we specialize in delivering creative decoration services tailored for Richmond Town’s unique vibe — whether it’s a birthday in a high-rise apartment, a wedding at a heritage hall, or a proposal on a rooftop restaurant. Our team has executed dozens of décor projects across Richmond Town, blending floral artistry, balloon styling, and modern lighting to create unforgettable experiences. We also provide last-minute décor services in Richmond Town, making it convenient for clients with fast-moving schedules.`;
  
  const services: string[] = [
    "Anniversary Decoration in Richmond Town — Balloon arches, dinner backdrops and elegant couple décor. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town.",
    "Haldi Decoration in Richmond Town — Yellow marigold décor, traditional props and stage setups. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town.",
    "Corporate Event Decoration in Richmond Town — Office parties, festive décor, product launches and team gatherings. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town.",
    "Mehendi Décor in Richmond Town — Colorful drapes, floral swings and vibrant stage backdrops. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town.",
    "Balloon Decoration in Richmond Town — Custom balloon arches, LED backdrops and creative balloon props. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town.",
    "Theme Party Décor in Richmond Town — Cartoon themes, Bollywood nights, retro themes and seasonal parties. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town.",
    "Baby Shower Decoration in Richmond Town — Pastel balloons, cradle décor and welcome signage. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town.",
    "Naming Ceremony Décor in Richmond Town — Balloon cradles, floral setups and stage decoration. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town.",
    "Proposal Decoration in Richmond Town — Rooftop candle décor, flower arches and romantic pathways. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town.",
    "Engagement Décor in Richmond Town — Romantic arches, candles, fairy light setups and floral seating. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town.",
    "Birthday Decoration in Richmond Town — Balloon arches, LED backdrops, themed cakes and milestone birthdays. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town.",
    "Festival Decoration in Richmond Town — Diwali lamps, Eid lanterns, Christmas décor and Ganesh mandaps. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town.",
    "Housewarming Décor in Richmond Town — Torans, rangoli, diyas and temple-style floral setups. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town.",
    "Wedding Decoration in Richmond Town — Designer mandaps, floral stages, bridal room décor and lighting. In Richmond Town, we design décor for restaurants, rooftops, banquet halls and apartments. Every décor project is customized to reflect both the personality of the client and the central vibe of Richmond Town."
  ];
  
  const why = `✔ Local decorators in Richmond Town familiar with rooftop restaurants, banquet halls and heritage homes.`;
  
  const nearby: {name: string; slug: string}[] = [
    { "name": "Ashok Nagar", "slug": "ashok-nagar" },
    { "name": "Residency Road", "slug": "residency-road" },
    { "name": "Langford Town", "slug": "langford-town" }
  ];
  
  const faqs: {q: string; a: string}[] = [
    {
      "q": "Do you provide birthday decoration in apartments at Richmond Town?",
      "a": "Yes, do you provide birthday decoration in apartments at richmond town? In Richmond Town, our decorators specialize in balloon arches, floral mandaps and customized backdrops that suit both private and commercial venues. Birthday décor starts from ₹2,999, while larger setups like weddings and proposals are priced based on theme, scale and venue requirements."
    },
    {
      "q": "Can you set up wedding and engagement décor in banquet halls of Richmond Town?",
      "a": "Yes, can you set up wedding and engagement décor in banquet halls of richmond town? In Richmond Town, our decorators specialize in balloon arches, floral mandaps and customized backdrops that suit both private and commercial venues. Birthday décor starts from ₹2,999, while larger setups like weddings and proposals are priced based on theme, scale and venue requirements."
    },
    {
      "q": "What are the starting prices for event decoration in Richmond Town?",
      "a": "Yes, what are the starting prices for event decoration in richmond town? In Richmond Town, our decorators specialize in balloon arches, floral mandaps and customized backdrops that suit both private and commercial venues. Birthday décor starts from ₹2,999, while larger setups like weddings and proposals are priced based on theme, scale and venue requirements."
    },
    {
      "q": "Do you also arrange baby shower and naming ceremony décor in Richmond Town?",
      "a": "Yes, do you also arrange baby shower and naming ceremony décor in richmond town? In Richmond Town, our decorators specialize in balloon arches, floral mandaps and customized backdrops that suit both private and commercial venues. Birthday décor starts from ₹2,999, while larger setups like weddings and proposals are priced based on theme, scale and venue requirements."
    },
    {
      "q": "Can you decorate rooftop restaurants and villas in Richmond Town?",
      "a": "Yes, can you decorate rooftop restaurants and villas in richmond town? In Richmond Town, our decorators specialize in balloon arches, floral mandaps and customized backdrops that suit both private and commercial venues. Birthday décor starts from ₹2,999, while larger setups like weddings and proposals are priced based on theme, scale and venue requirements."
    },
    {
      "q": "How early should we book event decoration in Richmond Town?",
      "a": "Yes, how early should we book event decoration in richmond town? In Richmond Town, our decorators specialize in balloon arches, floral mandaps and customized backdrops that suit both private and commercial venues. Birthday décor starts from ₹2,999, while larger setups like weddings and proposals are priced based on theme, scale and venue requirements."
    },
    {
      "q": "Do you provide festival and corporate décor services in Richmond Town?",
      "a": "Yes, do you provide festival and corporate décor services in richmond town? In Richmond Town, our decorators specialize in balloon arches, floral mandaps and customized backdrops that suit both private and commercial venues. Birthday décor starts from ₹2,999, while larger setups like weddings and proposals are priced based on theme, scale and venue requirements."
    },
    {
      "q": "Is customization possible for décor packages in Richmond Town?",
      "a": "Yes, is customization possible for décor packages in richmond town? In Richmond Town, our decorators specialize in balloon arches, floral mandaps and customized backdrops that suit both private and commercial venues. Birthday décor starts from ₹2,999, while larger setups like weddings and proposals are priced based on theme, scale and venue requirements."
    }
  ];

  return (
    <>
  <Navbar />
  <main id="top" className="pt-20 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
    <AreaPageShell>
      <Breadcrumbs locality={locality} />
      <AreaHero title={metadata?.title as string ?? "Event Decoration"} intro={intro} locality={locality} />
      <ServicesGrid locality={locality} services={services} />
      <GalleryStrip />
      <NearbyChips nearby={nearby} />
      <FAQAccordion faqs={faqs} locality={locality} />
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