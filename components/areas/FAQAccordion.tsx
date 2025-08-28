"use client";
type FAQ = { q: string; a: string };
export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  if (!faqs?.length) return null;
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">FAQs</h2>
      <div className="mt-4 space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow-sm">
            <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{f.q}</summary>
            <p className="mt-2 opacity-90 text-gray-700 dark:text-gray-300">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
} 