import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/lux/PageHero';
import SiteBreadcrumbs, { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildBlogHubGraph, withBreadcrumb } from '@/lib/schema';
import { BLOG_POSTS } from '@/lib/content/blog-posts';

const BLOG_HUB_DESCRIPTION =
  'Practical event decoration guides for Bangalore — birthday ideas, haldi checklists, wedding budgets, balloon trends, and venue planning from We Decor Events.';

export const metadata: Metadata = pageMetadata({
  path: '/blog',
  title: 'Event Planning Guides & Decoration Ideas',
  description: BLOG_HUB_DESCRIPTION,
});

export const dynamic = 'force-static';

function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const CRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
];

export default function BlogIndexPage() {
  const sortedPosts = [...BLOG_POSTS].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished)
  );

  return (
    <div className="lux-page">
      <SchemaScript
        data={withBreadcrumb(
          buildBlogHubGraph({
            name: 'Celebration Insights — We Decor Blog',
            description: BLOG_HUB_DESCRIPTION,
            posts: sortedPosts.map((post) => ({
              title: post.title,
              path: `/blog/${post.slug}`,
              description: post.description,
              image: post.featuredImage,
            })),
          }),
          siteBreadcrumbsToSchemaItems(CRUMBS)
        )}
      />
      <div className="lux-container pt-[calc(var(--nav-height)+1.5rem)] pb-2">
        <SiteBreadcrumbs items={CRUMBS} />
      </div>
      <PageHero
        eyebrow="Planning guides"
        title="Celebration insights"
        description="Bangalore-focused decoration guides, checklists, and trends — written for hosts planning birthdays, weddings, and milestone events."
      />
      <section
        className="lux-section pt-0 pb-16 md:pb-20 lux-section-alt border-t border-white/[0.06]"
        aria-labelledby="blog-grid-heading"
      >
        <div className="lux-container">
          <h2 id="blog-grid-heading" className="sr-only">
            Latest articles
          </h2>
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
            {sortedPosts.map((post, i) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={`group lux-editorial-card block overflow-hidden h-full lux-reveal ${i === 1 ? 'lux-reveal-delay-1' : i === 2 ? 'lux-reveal-delay-2' : ''}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:p-7">
                    <time
                      dateTime={post.datePublished}
                      className="text-xs uppercase tracking-wide text-lux-muted"
                    >
                      {formatDate(post.datePublished)}
                    </time>
                    <h3 className="font-display text-xl text-lux-ivory mt-3 mb-3 group-hover:text-lux-gold-soft transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-lux-secondary leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                    <span className="inline-block mt-5 text-sm text-lux-gold-soft group-hover:underline">
                      Read article
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CoreExploreLinks context="hub" showLocalities pageKey="blog-hub" />
    </div>
  );
}
