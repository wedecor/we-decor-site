'use client';
import { AREAS } from '@/app/(site)/_data/locations';

type Props = {
  title: string;
  intro: string;
  locality: string;
};

export default function AreaHero({ title, intro, locality }: Props) {
  const areaData = AREAS.find((area) => area.name.toLowerCase() === locality.toLowerCase());
  const heroTagline = areaData?.heroTagline;

  return (
    <header className="lux-page-hero mb-4">
      <div className="lux-container max-w-3xl">
        <p className="lux-eyebrow mb-4">Bengaluru · {locality}</p>
        <h1 className="lux-heading">{heroTagline || title}</h1>
        <p className="lux-body mt-6">{intro}</p>
      </div>
    </header>
  );
}
