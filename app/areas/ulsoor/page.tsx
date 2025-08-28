import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Event Decoration in Ulsoor – We Decor Bangalore",
  description: "Birthday, wedding, haldi & balloon decoration in Ulsoor. Premium home,",
  alternates: { canonical: "https://wedecor.in/areas/ulsoor" },
  openGraph: {
    title: "Event Decoration in Ulsoor – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Ulsoor. Premium home,",
    url: "https://wedecor.in/areas/ulsoor",
    type: "article",
    siteName: "We Decor",
  },
  twitter: {
    card: "summary",
    title: "Event Decoration in Ulsoor – We Decor Bangalore",
    description: "Birthday, wedding, haldi & balloon decoration in Ulsoor. Premium home,",
  },
};

export default function Page() {
  const locality = "Ulsoor";
  const intro = `banquet & corporate event décor. Call now for quick booking.
Looking for birthday, wedding, haldi or anniversary decoration in Ulsoor? At We Decor, we bring
stunning décor to homes, apartments, villas, clubhouses and banquet halls across Ulsoor. From
balloon backdrops to floral wedding stages, our team designs and sets up everything so you can
enjoy stress-free celebrations.`;
  const services: string[] = [
  "n Birthday Decoration in Ulsoor — Theme balloons, LED backdrops, kids’ parties, milestone",
  "birthdays.",
  "n Wedding & Engagement Décor in Ulsoor — Floral mandaps, stage setups, bridal room décor.",
  "n Haldi & Mehendi Decoration in Ulsoor — Yellow floral stage, marigold backdrop, traditional props.",
  "n Balloon Decoration in Ulsoor — At home, clubhouses & banquet halls.",
  "n Corporate Event Decoration in Ulsoor — Office parties, team events, festive décor."
];
  const why = `4 Local team covering all of Ulsoor and nearby areas. 4 Quick setup at homes, apartments & community halls. 4 Custom themes & budget-friendly packages. 4 500+ events decorated in Bangalore.`;
  const nearby: {name: string; slug: string}[] = [];
  const faqs: {q: string; a: string}[] = [
  {
    "q": "Do you provide home birthday decoration?",
    "a": "Yes, we specialize in home and apartment decoration in Ulsoor — perfect for intimate family"
  },
  {
    "q": "Can you set up décor in banquet halls or clubhouses?",
    "a": "Absolutely! We’ve worked in several Ulsoor venues, apartments and community halls."
  },
  {
    "q": "How much does decoration cost?",
    "a": "Birthday décor starts at n2,999. Wedding and engagement packages are customized based on"
  }
];

  return (
    <main className="prose prose-invert max-w-none">
      <h1>Event Decoration in Ulsoor – We Decor Bangalore</h1>

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
        <li><a href="https://wa.me/919591232166">WhatsApp</a></li>
        <li><Link href={"/contact?area=ulsoor"}>Get a Quote</Link></li>
      </ul>

      <p className="mt-6 text-sm opacity-70">
        We Decor – Bringing Dreams to Life across Bangalore.{" "}
        <a href="https://instagram.com/wedecorbangalore" target="_blank" rel="noopener noreferrer">
          @wedecorbangalore
        </a>
      </p>

      <p className="mt-6 text-sm opacity-70">
        <Link href="/areas" className="underline">Areas</Link> / {locality}
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f: any) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
          })
        }}
      />
    </main>
  );
}
