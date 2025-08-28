import type { Metadata } from "next";
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
  title: "Event Decoration in Ashok Nagar – We Decor Bangalore",
  description: "Birthday, wedding, haldi & balloon decoration in Ashok Nagar. Premium home, banquet & corporate event décor. Call now for quick booking.",
  alternates: { canonical: "https://wedecor.in/areas/ashok-nagar" },
  openGraph: {
    title: "Event Decoration in Ashok Nagar – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Ashok Nagar. Premium home, banquet & corporate event décor. Call now for quick booking.",
    url: "https://wedecor.in/areas/ashok-nagar",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "Event Decoration in Ashok Nagar – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Ashok Nagar. Premium home, banquet & corporate event décor. Call now for quick booking.",
  },
};

export default function Page() {
  const locality = "Ashok Nagar";
  const intro = `Looking for birthday, wedding, haldi or anniversary decoration in Ashok Nagar? At We Decor, we bring stunning décor to homes, apartments, villas, clubhouses and banquet halls across Ashok Nagar. From balloon backdrops to floral wedding stages, our team designs and sets up everything so you can enjoy stress-free celebrations.`;
  const services: string[] = [
  "Birthday Decoration in Ashok Nagar — Theme balloons, LED backdrops, kids’ parties, milestone birthdays.",
  "Wedding & Engagement Décor in Ashok Nagar — Floral mandaps, stage setups, bridal room décor.",
  "Haldi & Mehendi Decoration in Ashok Nagar — Yellow floral stage, marigold backdrop, traditional props.",
  "Balloon Decoration in Ashok Nagar — At home, clubhouses & banquet halls.",
  "Corporate Event Decoration in Ashok Nagar — Office parties, team events, festive décor."
];
  const why = `Local team covering all of Ashok Nagar. Quick setup at homes, apartments & community halls. Custom themes & budget-friendly packages.`;
  const nearby: {name: string; slug: string}[] = [
  {
    "name": "FAQ:",
    "slug": "faq"
  }
];
  const faqs: {q: string; a: string}[] = [];

  return (
    <main className="pt-20 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
  <AreaPageShell>
    <Breadcrumbs locality={locality} />
    <AreaHero title={metadata?.title as string ?? "Event Decoration"} intro={intro} />
    <ServicesGrid locality={locality} services={services} />
    <GalleryStrip />
    
    <FAQAccordion faqs={faqs} />
    <ContactCard locality={locality} />
    <CTAStickyBar locality={locality} />
  </AreaPageShell>
</main>
  );
}
