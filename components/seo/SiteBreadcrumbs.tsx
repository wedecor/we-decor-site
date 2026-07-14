import Link from 'next/link';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildBreadcrumbSchema } from '@/lib/local-seo';

/**
 * Breadcrumb item with a stable path for UI + future/JSON-LD BreadcrumbList.
 * Pass `href` for every crumb (including the current page).
 */
export type SiteBreadcrumbItem = {
  name: string;
  href: string;
};

type Props = {
  items: SiteBreadcrumbItem[];
  /** Emit BreadcrumbList JSON-LD alongside the visible trail. */
  withSchema?: boolean;
  className?: string;
};

/** Map UI crumbs into `buildBreadcrumbSchema` input. */
export function siteBreadcrumbsToSchemaItems(
  items: SiteBreadcrumbItem[]
): { name: string; path: string }[] {
  return items.map((item) => ({ name: item.name, path: item.href }));
}

export default function SiteBreadcrumbs({ items, withSchema = false, className = '' }: Props) {
  if (items.length === 0) return null;

  return (
    <>
      {withSchema ? (
        <SchemaScript data={buildBreadcrumbSchema(siteBreadcrumbsToSchemaItems(items))} />
      ) : null}
      <nav
        className={`flex text-sm font-light text-lux-muted ${className}`.trim()}
        aria-label="Breadcrumb"
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 list-none p-0 m-0">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.href}-${item.name}`} className="flex items-center gap-x-2">
                {index > 0 ? (
                  <span className="opacity-50" aria-hidden>
                    /
                  </span>
                ) : null}
                {isLast ? (
                  <span className="text-lux-ivory" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-lux-gold transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
