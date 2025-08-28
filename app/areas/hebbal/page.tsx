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
  title: "Event Decoration in Hebbal – We Decor Bangalore",
  description: "Birthday, wedding, haldi & balloon decoration in Hebbal. Premium home, banquet & corporate event décor. Call now for quick booking.",
  alternates: { canonical: "https://wedecor.in/areas/hebbal" },
  openGraph: {
    title: "Event Decoration in Hebbal – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Hebbal. Premium home, banquet & corporate event décor. Call now for quick booking.",
    url: "https://wedecor.in/areas/hebbal",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "Event Decoration in Hebbal – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Hebbal. Premium home, banquet & corporate event décor. Call now for quick booking.",
  },
};

export default function Page() {
  const locality = "Hebbal";
  const intro = `Looking for birthday, wedding, haldi or anniversary decoration in Hebbal? At We Decor, we bring stunning décor to homes, apartments, villas, clubhouses and banquet halls across Hebbal. From balloon backdrops to floral wedding stages, our team designs and sets up everything so you can enjoy stress-free celebrations.`;
  const services: string[] = [
  "Birthday Decoration in Hebbal — Theme balloons, LED backdrops, kids’ parties, milestone birthdays.",
  "Wedding & Engagement Décor in Hebbal — Floral mandaps, stage setups, bridal room décor.",
  "Haldi & Mehendi Decoration in Hebbal — Yellow floral stage, marigold backdrop, traditional props.",
  "Balloon Decoration in Hebbal — At home, clubhouses & banquet halls.",
  "Corporate Event Decoration in Hebbal — Office parties, team events, festive décor."
];
  const why = `Local team covering all of Hebbal. Quick setup at homes, apartments & community halls. Custom themes & budget-friendly packages. NEARBY: Yelahanka, RT Nagar, Sahakarnagar`;
  const nearby: {name: string; slug: string}[] = [
  {
    "name": "Yelahanka",
    "slug": "yelahanka"
  },
  {
    "name": "RT Nagar",
    "slug": "rt-nagar"
  },
  {
    "name": "Sahakarnagar",
    "slug": "sahakarnagar"
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
    <NearbyChips nearby={nearby} />
    <FAQAccordion faqs={faqs} />
    <ContactCard locality={locality} />
    <CTAStickyBar locality={locality} />
  </AreaPageShell>
</main>
  );
}
