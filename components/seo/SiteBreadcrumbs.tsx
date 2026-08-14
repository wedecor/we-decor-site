import Link from 'next/link';

/**
 * Breadcrumb item with a stable path for UI + JSON-LD BreadcrumbList.
 * Pass `href` for every crumb (including the current page).
 */
export type SiteBreadcrumbItem = {
  name: string;
  href: string;
};

/**
 * Visible trail only. The BreadcrumbList node belongs in the page's own
 * @graph — pass the same items through `withBreadcrumb()` where the page
 * builds its graph, so the WebPage node's `breadcrumb` @id resolves.
 */
type Props = {
  items: SiteBreadcrumbItem[];
  className?: string;
};

/** Map UI crumbs into `buildBreadcrumbSchema` input. */
export function siteBreadcrumbsToSchemaItems(
  items: SiteBreadcrumbItem[]
): { name: string; path: string }[] {
  return items.map((item) => ({ name: item.name, path: item.href }));
}

export default function SiteBreadcrumbs({ items, className = '' }: Props) {
  if (items.length === 0) return null;

  return (
    <>
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
