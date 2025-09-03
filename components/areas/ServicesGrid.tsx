'use client';
type Props = { locality: string; services: string[] };
export default function ServicesGrid({ locality, services }: Props) {
  if (!services?.length) return null;
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
        Our Event Decoration Services in {locality}
      </h2>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((s, i) => (
          <li
            key={i}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
