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
  title: "Event Decoration in Malleshwaram – We Decor Bangalore",
  description: "Traditional and modern birthday, wedding, haldi & balloon decoration in Malleshwaram. Décor for community halls, homes and banquet venues. Book today.",
  alternates: { canonical: "https://wedecor.in/areas/malleshwaram" },
  openGraph: {
    title: "Event Decoration in Malleshwaram – We Decor Bangalore",
    description: "Traditional and modern birthday, wedding, haldi & balloon decoration in Malleshwaram. Décor for community halls, homes and banquet venues. Book today.",
    url: "https://wedecor.in/areas/malleshwaram",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "Event Decoration in Malleshwaram – We Decor Bangalore",
    description: "Traditional and modern birthday, wedding, haldi & balloon decoration in Malleshwaram. Décor for community halls, homes and banquet venues. Book today.",
  },
};

export default function Page() {
  const locality = "Malleshwaram";
  const intro = `Malleshwaram in West Bangalore is known for its blend of heritage charm and bustling community halls. Families in Malleshwaram often celebrate birthdays, weddings, haldi and baby showers in traditional venues such as temples, large banquet halls and neighborhood rooftops. We Decor has handled numerous décor projects in Malleshwaram, ranging from intimate family functions to large-scale corporate events. Our decorators bring expertise in combining traditional floral artistry with modern balloon styling, ensuring that every celebration feels unique. In Malleshwaram, we are trusted for both traditional ceremonies and contemporary events, making us the go-to choice for event decoration across the area.`;
  
  const services: string[] = [
    "Naming Ceremony Décor in Malleshwaram — Balloon cradles, floral photo corners and themed stages. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event.",
    "Proposal Decoration in Malleshwaram — Rooftop dinners, flower arches and candle pathways. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event.",
    "Housewarming Décor in Malleshwaram — Torans, rangoli, diyas and temple-style floral setups. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event.",
    "Wedding Decoration in Malleshwaram — Floral mandaps, grand stages, bridal room décor and lighting. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event.",
    "Baby Shower Decoration in Malleshwaram — Pastel balloons, cradle décor and welcome signage. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event.",
    "Theme Party Décor in Malleshwaram — Cartoon themes, Bollywood nights, retro parties and seasonal décor. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event.",
    "Balloon Decoration in Malleshwaram — Custom balloon arches, LED backdrops and creative props. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event.",
    "Anniversary Decoration in Malleshwaram — Elegant balloon arches, dinner setups and themed décor. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event.",
    "Corporate Event Decoration in Malleshwaram — Office parties, festive décor, annual meets and launches. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event.",
    "Haldi Decoration in Malleshwaram — Marigold décor, traditional props and vibrant yellow setups. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event.",
    "Mehendi Décor in Malleshwaram — Colorful drapes, floral swings and vibrant backdrops. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event.",
    "Festival Decoration in Malleshwaram — Diwali lamps, Eid lanterns, Christmas décor and Ganesh mandaps. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event.",
    "Birthday Decoration in Malleshwaram — Balloon arches, LED backdrops, cartoon themes and milestone celebrations. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event.",
    "Engagement Décor in Malleshwaram — Romantic arches, fairy lights and floral seating. In Malleshwaram, our decorators design setups for temples, community halls, banquet halls and modern apartments, tailoring themes to suit the event."
  ];
  
  const why = `✔ Local decorators in Malleshwaram with experience in temples, halls and modern venues.`;
  
  const nearby: {name: string; slug: string}[] = [
    { "name": "Rajajinagar", "slug": "rajajinagar" },
    { "name": "Yeshwanthpur", "slug": "yeshwanthpur" },
    { "name": "Mathikere", "slug": "mathikere" }
  ];
  
  const faqs: {q: string; a: string}[] = [
    {
      "q": "Do you provide traditional wedding and haldi decoration in Malleshwaram?",
      "a": "Yes, do you provide traditional wedding and haldi decoration in malleshwaram? We Decor in Malleshwaram offers full-service décor with themes ranging from traditional floral mandaps to modern balloon arches. Packages begin at ₹2,999 for birthdays and scale up depending on event size and requirements."
    },
    {
      "q": "Can you arrange birthday décor for homes and apartments in Malleshwaram?",
      "a": "Yes, can you arrange birthday décor for homes and apartments in malleshwaram? We Decor in Malleshwaram offers full-service décor with themes ranging from traditional floral mandaps to modern balloon arches. Packages begin at ₹2,999 for birthdays and scale up depending on event size and requirements."
    },
    {
      "q": "What are the prices for decoration packages in Malleshwaram?",
      "a": "Yes, what are the prices for decoration packages in malleshwaram? We Decor in Malleshwaram offers full-service décor with themes ranging from traditional floral mandaps to modern balloon arches. Packages begin at ₹2,999 for birthdays and scale up depending on event size and requirements."
    },
    {
      "q": "Do you also offer baby shower and naming ceremony décor in Malleshwaram?",
      "a": "Yes, do you also offer baby shower and naming ceremony décor in malleshwaram? We Decor in Malleshwaram offers full-service décor with themes ranging from traditional floral mandaps to modern balloon arches. Packages begin at ₹2,999 for birthdays and scale up depending on event size and requirements."
    },
    {
      "q": "Can you decorate community halls and banquet halls in Malleshwaram?",
      "a": "Yes, can you decorate community halls and banquet halls in malleshwaram? We Decor in Malleshwaram offers full-service décor with themes ranging from traditional floral mandaps to modern balloon arches. Packages begin at ₹2,999 for birthdays and scale up depending on event size and requirements."
    },
    {
      "q": "Do you handle festival décor services in Malleshwaram?",
      "a": "Yes, do you handle festival décor services in malleshwaram? We Decor in Malleshwaram offers full-service décor with themes ranging from traditional floral mandaps to modern balloon arches. Packages begin at ₹2,999 for birthdays and scale up depending on event size and requirements."
    },
    {
      "q": "Is corporate event decoration available in Malleshwaram?",
      "a": "Yes, is corporate event decoration available in malleshwaram? We Decor in Malleshwaram offers full-service décor with themes ranging from traditional floral mandaps to modern balloon arches. Packages begin at ₹2,999 for birthdays and scale up depending on event size and requirements."
    },
    {
      "q": "Can the décor themes be customized for budgets in Malleshwaram?",
      "a": "Yes, can the décor themes be customized for budgets in malleshwaram? We Decor in Malleshwaram offers full-service décor with themes ranging from traditional floral mandaps to modern balloon arches. Packages begin at ₹2,999 for birthdays and scale up depending on event size and requirements."
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