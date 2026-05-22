'use client';

type Props = { locality: string; services: string[] };

export default function ServicesGrid({ locality, services }: Props) {
  if (!services?.length) return null;
  return (
    <section className="mb-14">
      <h2 className="lux-heading-sm mb-8">Event decoration in {locality}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
        {services.map((s) => (
          <li
            key={s}
            className="lux-panel lux-panel-hover p-5 text-lux-muted font-light text-sm md:text-base"
          >
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
