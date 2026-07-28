import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { absoluteUrl, pageMetadata } from '@/lib/metadata';
import { CONTACT } from '@/lib/contact';
import SiteBreadcrumbs from '@/components/seo/SiteBreadcrumbs';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';
import SchemaScript from '@/components/seo/SchemaScript';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import { buildBlogPostingGraph } from '@/lib/schema';
import { getAllBlogSlugs, getBlogPost, getRelatedPosts } from '@/lib/content/blog-posts';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Article Not Found' };

  return pageMetadata({
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    ogImage: post.featuredImage,
  });
}

function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug);
  const url = absoluteUrl(`/blog/${slug}`);

  return (
    <div className="lux-page">
      <SchemaScript
        data={buildBlogPostingGraph({
          title: post.title,
          description: post.description,
          url,
          image: post.featuredImage,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          authorName: post.authorName,
        })}
      />
      <div className="lux-container pt-[calc(var(--nav-height)+1.5rem)] pb-2">
        <SiteBreadcrumbs
          withSchema
          items={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: '/blog' },
            { name: post.title, href: `/blog/${slug}` },
          ]}
        />
      </div>

      <article>
        <header className="lux-section-tight pt-0 pb-10 md:pb-14 lux-section-glow border-b border-white/[0.08]">
          <div className="lux-container max-w-4xl">
            <p className="lux-eyebrow mb-5">Planning guide</p>
            <h1 className="lux-heading">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-lux-muted">
              <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTimeMinutes} min read</span>
              <span aria-hidden>·</span>
              <span>{post.authorName}</span>
            </div>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-sm">
              <Image
                src={post.featuredImage}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </div>
        </header>

        <section
          className="lux-section-tight pt-12 md:pt-16 pb-12 md:pb-16 lux-section-alt border-b border-white/[0.08]"
          aria-label="Article body"
        >
          <div className="lux-container max-w-4xl">
            <div className="space-y-7 text-[1.0625rem] md:text-lg text-lux-secondary font-light leading-[1.88]">
              {post.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            {post.tags.length > 0 ? (
              <ul className="mt-12 flex flex-wrap gap-2 list-none p-0 m-0" aria-label="Tags">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-xs uppercase tracking-wide text-lux-muted border border-white/[0.12] px-3 py-1.5 rounded-sm"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      </article>

      <section className="lux-section bg-lux-bg border-b border-white/[0.06]">
        <div className="lux-container max-w-3xl text-center">
          <p className="lux-eyebrow mb-3">Plan your event</p>
          <h2 className="lux-heading-sm mb-4">Ready to bring these ideas to life?</h2>
          <p className="text-lux-muted leading-relaxed mb-10">
            Share your date, venue, and vision — we&apos;ll put together a personalised proposal for
            your celebration in Bengaluru.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedWhatsAppLink
              href={CONTACT.waUrl(
                `Hi We Decor! I read your article "${post.title}" and would like help with my event. Date: _____. Venue: _____.`
              )}
              source={`blog:${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn-primary"
            >
              WhatsApp for a quote
            </TrackedWhatsAppLink>
            <Link href={post.relatedServiceHref} className="lux-btn-secondary">
              {post.relatedServiceLabel}
            </Link>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section
          className="lux-section-tight pt-12 md:pt-16 pb-12 md:pb-16 border-b border-white/[0.06]"
          aria-labelledby="related-posts-heading"
        >
          <div className="lux-container">
            <h2 id="related-posts-heading" className="lux-heading-sm mb-10 md:ml-[6%]">
              Related articles
            </h2>
            <ul className="grid gap-6 md:grid-cols-3 list-none p-0 m-0 max-w-5xl md:ml-[6%]">
              {relatedPosts.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="group lux-editorial-card block p-6 h-full"
                  >
                    <time
                      dateTime={related.datePublished}
                      className="text-xs uppercase tracking-wide text-lux-muted"
                    >
                      {formatDate(related.datePublished)}
                    </time>
                    <h3 className="font-display text-lg text-lux-ivory mt-3 group-hover:text-lux-gold-soft transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-lux-secondary mt-2 line-clamp-2">
                      {related.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CoreExploreLinks
        context="content"
        showLocalities
        pageKey={`blog-${slug}`}
        heading="Explore more"
      />
    </div>
  );
}
