import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Event Decoration in Sarjapur Road – We Decor Bangalore",
  description: "Birthday, wedding, haldi & balloon decoration in Sarjapur Road. Premium home, banquet & corporate event décor. Call now for quick booking.",
  alternates: { canonical: "https://wedecor.in/areas/sarjapur-road" },
  openGraph: {
    title: "Event Decoration in Sarjapur Road – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Sarjapur Road. Premium home, banquet & corporate event décor. Call now for quick booking.",
    url: "https://wedecor.in/areas/sarjapur-road",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "Event Decoration in Sarjapur Road – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Sarjapur Road. Premium home, banquet & corporate event décor. Call now for quick booking.",
  },
};

export default function Page() {
  const locality = "Sarjapur Road";
  const intro = `Looking for birthday, wedding, haldi or anniversary decoration in Sarjapur Road? At We Decor, we bring stunning décor to homes, apartments, villas, clubhouses and banquet halls across Sarjapur Road. From balloon backdrops to floral wedding stages, our team designs and sets up everything so you can enjoy stress-free celebrations.`;
  const services: string[] = [
  "Birthday Decoration in Sarjapur Road — Theme balloons, LED backdrops, kids’ parties, milestone birthdays.",
  "Wedding & Engagement Décor in Sarjapur Road — Floral mandaps, stage setups, bridal room décor.",
  "Haldi & Mehendi Decoration in Sarjapur Road — Yellow floral stage, marigold backdrop, traditional props.",
  "Balloon Decoration in Sarjapur Road — At home, clubhouses & banquet halls.",
  "Corporate Event Decoration in Sarjapur Road — Office parties, team events, festive décor."
];
  const why = `Local team covering all of Sarjapur Road. Quick setup at homes, apartments & community halls. Custom themes & budget-friendly packages.`;
  const nearby: {name: string; slug: string}[] = [
  {
    "name": "FAQ:",
    "slug": "faq"
  }
];
  const faqs: {q: string; a: string}[] = [];

  return (
    <main className="prose prose-invert max-w-none">
      <h1>Event Decoration in Sarjapur Road – We Decor Bangalore</h1>

      <p>{intro}</p>

      <h2>Our Event Decoration Services in {locality}</h2>
      <ul>
        {services.map((s, i) => <li key={i}>{s}</li>)}
      </ul>

      <h2>Why Choose We Decor in {locality}?</h2>
      <p>{why}</p>

      {nearby.length ? (
        <>
          <h2>Nearby Areas We Also Serve</h2>
          <ul>
            {nearby.map((nb) => (
              <li key={nb.slug}>
                <Link href={"/areas/" + nb.slug}>{nb.name}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2>FAQs – {locality}</h2>
      {faqs.map((f, i) => (
        <section key={i}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </section>
      ))}

      <hr className="my-8" />

      <h3>Ready to book decoration in {locality}?</h3>
      <ul>
        <li><a href="tel:+919591232166">Call Now</a></li>
        <li><a href="https://wa.me/919591232166?text=">WhatsApp</a></li>
        <li><Link href={"/contact?area=sarjapur-road"}>Get a Quote</Link></li>
      </ul>
    </main>
  );
}
