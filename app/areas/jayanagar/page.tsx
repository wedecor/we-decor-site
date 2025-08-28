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
  title: "Event Decoration in Jayanagar – We Decor Bangalore",
  description: "Birthday, wedding, haldi & balloon decoration in Jayanagar. Premium home, banquet & corporate event décor. Call now for quick booking.",
  alternates: { canonical: "https://wedecor.in/areas/jayanagar" },
  openGraph: {
    title: "Event Decoration in Jayanagar – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Jayanagar. Premium home, banquet & corporate event décor. Call now for quick booking.",
    url: "https://wedecor.in/areas/jayanagar",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "Event Decoration in Jayanagar – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Jayanagar. Premium home, banquet & corporate event décor. Call now for quick booking.",
  },
};

export default function Page() {
  const locality = "Jayanagar";
  const intro = `Looking for birthday, wedding, haldi or anniversary decoration in Jayanagar? At We Decor, we bring stunning décor to homes, apartments, villas, clubhouses and banquet halls across Jayanagar. From balloon backdrops to floral wedding stages, our team designs and sets up everything so you can enjoy stress-free celebrations.`;
  const services: string[] = [
  "Birthday Decoration in Jayanagar — Theme balloons, LED backdrops, kids’ parties, milestone birthdays.",
  "Wedding & Engagement Décor in Jayanagar — Floral mandaps, stage setups, bridal room décor.",
  "Haldi & Mehendi Decoration in Jayanagar — Yellow floral stage, marigold backdrop, traditional props.",
  "Balloon Decoration in Jayanagar — At home, clubhouses & banquet halls.",
  "Corporate Event Decoration in Jayanagar — Office parties, team events, festive décor."
];
  const why = `Local team covering all of Jayanagar. Quick setup at homes, apartments & community halls. Custom themes & budget-friendly packages. NEARBY: Basavanagudi, JP Nagar, Banashankari`;
  const nearby: {name: string; slug: string}[] = [
  {
    "name": "Basavanagudi",
    "slug": "basavanagudi"
  },
  {
    "name": "JP Nagar",
    "slug": "jp-nagar"
  },
  {
    "name": "Banashankari",
    "slug": "banashankari"
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
    <NearbyChips nearby={nearby} />
    <FAQAccordion faqs={faqs} />
    <ContactCard locality={locality} />
    <CTAStickyBar locality={locality} />
  </AreaPageShell>
</main>
  );
}
