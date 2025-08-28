import type { Metadata } from "next";
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
    <main className="prose prose-invert max-w-none">
      <h1>Event Decoration in Ashok Nagar – We Decor Bangalore</h1>

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
        <li><Link href={"/contact?area=ashok-nagar"}>Get a Quote</Link></li>
      </ul>
    </main>
  );
}
