export default function GalleryStrip({ locality }: { locality?: string }) {
  return (
    <section className="mb-14">
      <h2 className="lux-heading-sm mb-3">{locality ? `Gallery — ${locality}` : 'Gallery'}</h2>
      <p className="lux-body text-sm">
        Recent setups and celebration atmospheres from across Bengaluru.
      </p>
    </section>
  );
}
