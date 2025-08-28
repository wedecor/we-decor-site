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
  title: "Event Decoration in Marathahalli – We Decor Bangalore",
  description: "Professional birthday, wedding, haldi & balloon decoration in Marathahalli. Décor for apartments, gated communities, villas & corporate venues. Book We Decor today.",
  alternates: { canonical: "https://wedecor.in/areas/marathahalli" },
  openGraph: {
    title: "Event Decoration in Marathahalli – We Decor Bangalore",
    description: "Professional birthday, wedding, haldi & balloon decoration in Marathahalli. Décor for apartments, gated communities, villas & corporate venues. Book We Decor today.",
    url: "https://wedecor.in/areas/marathahalli",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "Event Decoration in Marathahalli – We Decor Bangalore",
    description: "Professional birthday, wedding, haldi & balloon decoration in Marathahalli. Décor for apartments, gated communities, villas & corporate venues. Book We Decor today.",
  },
};

export default function Page() {
  const locality = "Marathahalli";
  const intro = `Marathahalli is among the most happening hubs of East Bangalore, with a mix of luxury villas, tech parks, gated communities and banquet halls. Families and professionals in Marathahalli frequently celebrate birthdays, anniversaries, proposals, haldi and baby showers in both intimate and large-scale venues. At We Decor, we have executed hundreds of décor projects across Marathahalli, bringing customized balloon setups, floral mandaps, and creative party themes to life. Our decorators understand the modern style of Marathahalli, often combining elegant floral work with contemporary lighting and balloon artistry. From rooftop cafes to gated community clubhouses and corporate halls, we ensure every décor project is personalized, stunning and memorable. We also offer same-day decoration service in Marathahalli, making last-minute celebrations stress-free and delightful.`;
  
  const services: string[] = [
    "Housewarming Décor in Marathahalli — Torans, rangoli and temple-style floral setups. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type.",
    "Festival Decoration in Marathahalli — Diwali diyas, Eid lanterns, Christmas trees and Ganesh décor. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type.",
    "Haldi Decoration in Marathahalli — Marigold backdrops, yellow props and seating arrangements. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type.",
    "Baby Shower Decoration in Marathahalli — Pastel balloons, cradle themes and welcome signage. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type.",
    "Engagement Décor in Marathahalli — Romantic setups with arches, candles and fairy lights. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type.",
    "Theme Party Décor in Marathahalli — Cartoon themes, Bollywood nights and seasonal parties. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type.",
    "Wedding Decoration in Marathahalli — Floral mandaps, couple stages, bridal room décor and lighting. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type.",
    "Naming Ceremony Décor in Marathahalli — Balloon cradles, floral stage and themed photo corners. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type.",
    "Balloon Decoration in Marathahalli — Custom balloon arches and backdrops for homes and halls. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type.",
    "Proposal Decoration in Marathahalli — Rooftop setups, flower props and candle pathways. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type.",
    "Mehendi Décor in Marathahalli — Colorful drapes, floral swings and vibrant backdrops. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type.",
    "Anniversary Decoration in Marathahalli — Elegant balloon backdrops, dinner décor and couple themes. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type.",
    "Corporate Event Decoration in Marathahalli — Office parties, team décor and festive themes. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type.",
    "Birthday Decoration in Marathahalli — Balloon arches, LED backdrops, theme setups and milestone birthday parties. In Marathahalli, we design these setups for villas, apartments, gated communities and banquet halls. Each décor project is tailored to your theme, budget and venue type."
  ];
  
  const why = `✔ Local decorators in Marathahalli familiar with popular venues and apartments.`;
  
  const nearby: {name: string; slug: string}[] = [
    { "name": "HAL", "slug": "hal" },
    { "name": "Brookefield", "slug": "brookefield" },
    { "name": "Kadubeesanahalli", "slug": "kadubeesanahalli" }
  ];
  
  const faqs: {q: string; a: string}[] = [
    {
      "q": "Do you provide balloon decoration for birthdays in Marathahalli?",
      "a": "Yes, do you provide balloon decoration for birthdays in marathahalli? Our team brings creative balloon designs, floral arrangements and lighting options to suit every type of celebration in Marathahalli. Birthday décor starts at ₹2,999, while weddings and large events are priced based on theme and scale."
    },
    {
      "q": "Can you set up wedding or engagement stages in Marathahalli?",
      "a": "Yes, can you set up wedding or engagement stages in marathahalli? Our team brings creative balloon designs, floral arrangements and lighting options to suit every type of celebration in Marathahalli. Birthday décor starts at ₹2,999, while weddings and large events are priced based on theme and scale."
    },
    {
      "q": "What are the starting prices for event decoration in Marathahalli?",
      "a": "Yes, what are the starting prices for event decoration in marathahalli? Our team brings creative balloon designs, floral arrangements and lighting options to suit every type of celebration in Marathahalli. Birthday décor starts at ₹2,999, while weddings and large events are priced based on theme and scale."
    },
    {
      "q": "Do you offer baby shower and naming ceremony décor in Marathahalli?",
      "a": "Yes, do you offer baby shower and naming ceremony décor in marathahalli? Our team brings creative balloon designs, floral arrangements and lighting options to suit every type of celebration in Marathahalli. Birthday décor starts at ₹2,999, while weddings and large events are priced based on theme and scale."
    },
    {
      "q": "Can you decorate villas and gated communities in Marathahalli?",
      "a": "Yes, can you decorate villas and gated communities in marathahalli? Our team brings creative balloon designs, floral arrangements and lighting options to suit every type of celebration in Marathahalli. Birthday décor starts at ₹2,999, while weddings and large events are priced based on theme and scale."
    },
    {
      "q": "How much time is required for setup in Marathahalli?",
      "a": "Yes, how much time is required for setup in marathahalli? Our team brings creative balloon designs, floral arrangements and lighting options to suit every type of celebration in Marathahalli. Birthday décor starts at ₹2,999, while weddings and large events are priced based on theme and scale."
    },
    {
      "q": "Do you also handle festival and corporate events in Marathahalli?",
      "a": "Yes, do you also handle festival and corporate events in marathahalli? Our team brings creative balloon designs, floral arrangements and lighting options to suit every type of celebration in Marathahalli. Birthday décor starts at ₹2,999, while weddings and large events are priced based on theme and scale."
    },
    {
      "q": "Can the décor be customized to match our budget in Marathahalli?",
      "a": "Yes, can the décor be customized to match our budget in marathahalli? Our team brings creative balloon designs, floral arrangements and lighting options to suit every type of celebration in Marathahalli. Birthday décor starts at ₹2,999, while weddings and large events are priced based on theme and scale."
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