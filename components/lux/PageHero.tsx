type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  /**
   * Centres the whole block. Off by default since Oct 2026.
   *
   * Every page hero used to centre its eyebrow, headline and body while the
   * breadcrumb above and the cards below stayed left-aligned, so alignment
   * flipped three times inside one screen and there was no left edge for the
   * eye to track. Centred body copy also rags on both sides, which at 390px
   * is where it hurts most — two lines, two uneven edges.
   *
   * One left edge, shared by the breadcrumb, the hero and the content under
   * it. Only pass `centered` when a block genuinely has no column to align to.
   */
  centered?: boolean;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  centered = false,
}: PageHeroProps) {
  return (
    <header className={`lux-page-hero ${centered ? 'text-center' : ''}`}>
      {/*
        Two boxes, not one. `.lux-container` carries `mx-auto` in its own
        @apply, so putting `max-w-3xl` on the same element just shrank the
        centred box — the hero kept sitting ~250px to the right of the
        breadcrumb above it, which uses a plain `.lux-container`. The outer
        div now matches that container exactly; the inner one caps the measure
        for reading without moving the left edge.
      */}
      <div className="lux-container">
        <div className={`max-w-3xl ${centered ? 'mx-auto' : ''}`}>
          {eyebrow ? <p className="lux-eyebrow mb-5 md:mb-6">{eyebrow}</p> : null}
          <h1 className="lux-heading">{title}</h1>
          {description ? (
            <p className={`lux-body mt-6 md:mt-8 max-w-2xl ${centered ? 'mx-auto' : ''}`}>
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </header>
  );
}
