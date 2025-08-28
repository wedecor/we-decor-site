"use client";
type FAQ = { q: string; a: string };
export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  if (!faqs?.length) return null;
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-semibold">FAQs</h2>
      <div className="mt-4 space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="rounded-2xl border border-white/10 p-4">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-2 opacity-90">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
} 