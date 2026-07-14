import Image from 'next/image';
import Link from 'next/link';

const previews = [
  {
    src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045451/we-decor/haldi/1676444453828.jpg',
    label: 'Haldi ceremony',
    caption: 'Marigold mornings',
  },
  {
    src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045451/we-decor/birthday/IMG_20230213_181247.jpg',
    label: 'Birthday',
    caption: 'Themed home parties',
  },
  { src: '/services/engagement.webp', label: 'Wedding', caption: 'Stage & reception' },
  {
    src: 'https://res.cloudinary.com/dux3m2saz/image/upload/v1753045448/we-decor/birthday/IMG_20230208_191510.jpg',
    label: 'Outdoor',
    caption: 'Tent & balloon',
  },
] as const;

export default function HomeGalleryPreview() {
  return (
    <section className="lux-section bg-lux-elevated border-y border-white/[0.06]">
      <div className="lux-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="lux-eyebrow mb-3">Portfolio</p>
            <h2 className="lux-heading-sm">Recent atmospheres</h2>
          </div>
          <Link href="/gallery" className="lux-btn-secondary text-sm shrink-0">
            Full gallery
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {previews.map((img, i) => (
            <figure
              key={img.src}
              className={`group relative overflow-hidden rounded-[20px] border border-lux-gold/10 ${
                i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-[4/5]'
              }`}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover lux-image-cinematic transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                sizes={i === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                loading="lazy"
              />
              <figcaption className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-lux-bg to-transparent">
                <span className="text-xs text-lux-muted">{img.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
