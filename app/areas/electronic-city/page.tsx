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
  title: "Event Decoration in Electronic City – We Decor Bangalore",
  description: "Birthday, wedding, haldi & balloon decoration in Electronic City. Premium home, banquet & corporate event décor. Call now for quick booking.",
  alternates: { canonical: "https://wedecor.in/areas/electronic-city" },
  openGraph: {
    title: "Event Decoration in Electronic City – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Electronic City. Premium home, banquet & corporate event décor. Call now for quick booking.",
    url: "https://wedecor.in/areas/electronic-city",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "Event Decoration in Electronic City – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Electronic City. Premium home, banquet & corporate event décor. Call now for quick booking.",
  },
};

export default function Page() {
  const locality = "Electronic City";
  const intro = `Looking for birthday, wedding, haldi or anniversary decoration in Electronic City? At We Decor, we bring stunning décor to homes, apartments, villas, clubhouses and banquet halls across Electronic City. From balloon backdrops to floral wedding stages, our team designs and sets up everything so you can enjoy stress-free celebrations.`;
  const services: string[] = [
  "Birthday Decoration in Electronic City — Theme balloons, LED backdrops, kids’ parties, milestone birthdays.",
  "Wedding & Engagement Décor in Electronic City — Floral mandaps, stage setups, bridal room décor.",
  "Haldi & Mehendi Decoration in Electronic City — Yellow floral stage, marigold backdrop, traditional props.",
  "Balloon Decoration in Electronic City — At home, clubhouses & banquet halls.",
  "Corporate Event Decoration in Electronic City — Office parties, team events, festive décor."
];
  const why = `Local team covering all of Electronic City. Quick setup at homes, apartments & community halls. Custom themes & budget-friendly packages.`;
  const nearby: {name: string; slug: string}[] = [
  {
    "name": "FAQ:",
    "slug": "faq"
  }
];
  const faqs: {q: string; a: string}[] = [];

  return (
    <main className="prose prose-invert max-w-none">
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
