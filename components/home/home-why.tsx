const pillars = [
  {
    title: 'Curated, not catalogue',
    text: 'Every setup begins with your venue, light, and story — never a one-size-fits-all package.',
  },
  {
    title: 'Bangalore-native team',
    text: 'We know apartments, clubhouses, and banquet timelines across the city.',
  },
  {
    title: 'Calm execution',
    text: 'Early installs, tidy teardown, and one coordinator from quote to celebration.',
  },
  {
    title: 'Photography-first',
    text: 'Layouts designed for how celebrations are remembered and shared today.',
  },
] as const;

export default function HomeWhy() {
  return (
    <section className="lux-section lux-section-alt border-y border-white/[0.08]">
      <div className="lux-container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lux-reveal">
            <p className="lux-eyebrow mb-4">Why We Decor</p>
            <h2 className="lux-heading">Trusted by families who care about the details</h2>
            <p className="lux-body mt-5 max-w-md">
              An atelier approach to atmosphere — composed, calm, and unmistakably premium.
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5 md:gap-6">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className={`lux-editorial-card p-7 md:p-8 h-full lux-reveal ${i > 0 ? 'lux-reveal-delay-1' : ''}`}
              >
                <h3 className="font-display text-xl text-lux-ivory mb-3">{p.title}</h3>
                <p className="text-sm text-lux-secondary leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
