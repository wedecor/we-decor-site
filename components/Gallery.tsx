import Image from "next/image";
import gallery from "../utils/gallery";

function toTitleCase(str: string) {
  return str
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Gallery() {
  return (
    <div className="space-y-16">
      {Object.entries(gallery).map(([folder, images]) => (
        <section key={folder}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-200">
              {toTitleCase(folder)}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {(images as any[]).length} image{(images as any[]).length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {(images as any[]).map((img, i) => (
              <div
                key={img.src}
                className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group"
              >
                <Image
                  src={img.src}
                  alt={img.alt || img.src.split('/').pop()?.replace(/[-_]/g, ' ').split('.')[0] || 'Gallery Image'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  placeholder={img.blurDataURL ? "blur" : "empty"}
                  blurDataURL={img.blurDataURL}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
