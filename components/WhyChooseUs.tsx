const features = [
  {
    title: 'Editorial styling',
    desc: 'Every setup is composed for atmosphere, photography, and effortless hosting.',
  },
  {
    title: 'Bangalore expertise',
    desc: 'Apartments, clubhouses, and banquet timelines across the city — sized correctly.',
  },
  {
    title: 'Calm execution',
    desc: 'Early installs, tidy teardown, and one coordinator from quote to celebration.',
  },
] as const;

export default function WhyChooseUs() {
  return (
    <section className="lux-section lux-section-alt">
      <div className="lux-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="lux-eyebrow mb-3">Why choose us</p>
          <h2 className="lux-heading-sm">Trusted for the details that matter</h2>
        </div>
        <ul className="grid md:grid-cols-3 gap-6 list-none p-0 m-0">
          {features.map((f) => (
            <li key={f.title} className="lux-panel lux-panel-hover p-9 text-center">
              <h3 className="font-display text-xl text-lux-ivory mb-3">{f.title}</h3>
              <p className="text-sm text-lux-secondary leading-relaxed">{f.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
