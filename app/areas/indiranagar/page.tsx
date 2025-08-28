import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Event Decoration in Indiranagar – We Decor Bangalore",
  description: "Birthday, wedding, haldi & balloon decoration in Indiranagar. Premium home, banquet & corporate event décor. Call now for quick booking.",
  alternates: { canonical: "https://wedecor.in/areas/indiranagar" },
  openGraph: {
    title: "Event Decoration in Indiranagar – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Indiranagar. Premium home, banquet & corporate event décor. Call now for quick booking.",
    url: "https://wedecor.in/areas/indiranagar",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "Event Decoration in Indiranagar – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Indiranagar. Premium home, banquet & corporate event décor. Call now for quick booking.",
  },
};

export default function Page() {
  const locality = "Indiranagar";
  const intro = `Looking for birthday, wedding, haldi or anniversary decoration in Indiranagar? At We Decor, we bring stunning décor to homes, apartments, villas, clubhouses and banquet halls across Indiranagar. From balloon backdrops to floral wedding stages, our team designs and sets up everything so you can enjoy stress-free celebrations.`;
  const services: string[] = [
  "Birthday Decoration in Indiranagar — Theme balloons, LED backdrops, kids’ parties, milestone birthdays.",
  "Wedding & Engagement Décor in Indiranagar — Floral mandaps, stage setups, bridal room décor.",
  "Haldi & Mehendi Decoration in Indiranagar — Yellow floral stage, marigold backdrop, traditional props.",
  "Balloon Decoration in Indiranagar — At home, clubhouses & banquet halls.",
  "Corporate Event Decoration in Indiranagar — Office parties, team events, festive décor."
];
  const why = `Local team covering all of Indiranagar. Quick setup at homes, apartments & community halls. Custom themes & budget-friendly packages. NEARBY: Ulsoor, Domlur, Koramangala`;
  const nearby: {name: string; slug: string}[] = [
  {
    "name": "Ulsoor",
    "slug": "ulsoor"
  },
  {
    "name": "Domlur",
    "slug": "domlur"
  },
  {
    "name": "Koramangala",
    "slug": "koramangala"
  }
];
  const faqs: {q: string; a: string}[] = [];

  return (
    <main className="prose prose-invert max-w-none">
      <h1>Event Decoration in Indiranagar – We Decor Bangalore</h1>

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
        <li><Link href={"/contact?area=indiranagar"}>Get a Quote</Link></li>
      </ul>
    </main>
  );
}
