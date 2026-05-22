type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  centered?: boolean;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  centered = true,
}: PageHeroProps) {
  return (
    <header className={`lux-page-hero ${centered ? 'text-center' : ''}`}>
      <div className={`lux-container max-w-3xl ${centered ? 'mx-auto' : ''}`}>
        {eyebrow ? <p className="lux-eyebrow mb-5 md:mb-6">{eyebrow}</p> : null}
        <h1 className="lux-heading">{title}</h1>
        {description ? (
          <p className="lux-body mt-6 md:mt-8 max-w-2xl mx-auto">{description}</p>
        ) : null}
        {children}
      </div>
    </header>
  );
}
