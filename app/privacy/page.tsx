import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { SITE_EMAIL } from '@/lib/site';
import { CONTACT } from '@/lib/contact';
import PageHero from '@/components/lux/PageHero';
import SiteBreadcrumbs, { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';
import SchemaScript from '@/components/seo/SchemaScript';
import { buildStaticPageGraph, withBreadcrumb } from '@/lib/schema';

/**
 * The site runs GA4 through GTM and collects names, phone numbers and email
 * addresses through the enquiry form, so this page is a legal necessity rather
 * than a formality. Written in plain language on purpose — a policy nobody can
 * read protects nobody.
 *
 * Keep it accurate: if the analytics stack, the form fields or the retention
 * practice change, change this page in the same commit.
 */
export const metadata: Metadata = pageMetadata({
  path: '/privacy',
  title: 'Privacy Policy',
  description:
    'What We Decor collects when you enquire or browse this site, why we collect it, how long we keep it, and how to have it removed.',
});

const CRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Privacy Policy', href: '/privacy' },
];

const LAST_UPDATED = '17 September 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="font-display text-xl md:text-2xl text-lux-ivory font-light mb-4">{title}</h2>
      <div className="space-y-4 text-lux-secondary font-light leading-relaxed">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="lux-page">
      <SchemaScript
        data={withBreadcrumb(
          buildStaticPageGraph({
            name: 'Privacy Policy',
            description:
              'What We Decor collects, why, how long it is kept, and how to have it removed.',
            path: '/privacy',
          }),
          siteBreadcrumbsToSchemaItems(CRUMBS)
        )}
      />

      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="What we collect, why we collect it, and how to have it removed."
      />

      <div className="lux-section-tight">
        <div className="mx-auto w-full max-w-[42rem]">
          <SiteBreadcrumbs className="mb-10" items={CRUMBS} />

          <p className="text-sm text-lux-text-muted font-light mb-10">
            Last updated {LAST_UPDATED}
          </p>

          <Section title="Who we are">
            <p>
              We Decor Events is an event decoration business based in Bengaluru, India, run by
              Mohammed Ilyas and Mohammed Zakir. This policy covers this website,{' '}
              <span className="text-lux-ivory">wedecorevents.com</span>.
            </p>
          </Section>

          <Section title="What we collect when you enquire">
            <p>
              Our enquiry form asks for your name, phone number, email address, event type, event
              date, budget and any message you write. You choose what to put in it. We ask for these
              because we cannot quote for a setup without knowing what it is, when it is and where
              it is.
            </p>
            <p>
              If you message us on WhatsApp instead, we receive your phone number and whatever you
              send, under WhatsApp&apos;s own terms rather than ours.
            </p>
          </Section>

          <Section title="What we collect when you just browse">
            <p>
              We use Google Analytics 4, loaded through Google Tag Manager, to understand which
              pages people find useful. It records things like the pages you view, roughly where in
              the world you are, the type of device you use, and how you arrived — for example from
              a Google search or an Instagram link.
            </p>
            <p>
              This is measurement, not identification. We cannot tell who you are from it, and we do
              not try to. Google sets cookies to do this; you can block them in your browser
              settings or use Google&apos;s own opt-out tools, and the site will work normally.
            </p>
            <p>
              We also use Cloudflare Turnstile on the enquiry form to tell humans from bots, and
              Sentry to record technical errors so we can fix broken pages.
            </p>
          </Section>

          <Section title="What we do with it">
            <p>
              Enquiry details are used to reply to you, prepare a quote and plan your event. That is
              all. We do not sell your information, we do not rent it, and we do not add you to a
              marketing list because you asked for a quote.
            </p>
            <p>
              If your event needs a photographer, caterer or make-up artist, we may pass on your
              name, number and event details to a partner — but only after telling you and only if
              you want us to.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              Enquiries are kept for up to two years. Events repeat — people come back for the next
              birthday or the next wedding in the family — and it helps to remember what we did last
              time. After that we delete them.
            </p>
            <p>Analytics data follows Google&apos;s retention settings, currently 14 months.</p>
          </Section>

          <Section title="Who else sees it">
            <p>
              The services that process data on our behalf are Google (Analytics and Tag Manager),
              Vercel (which hosts this site), Cloudflare (spam protection) and Sentry (error
              reporting). Some of them store data outside India. We do not give your details to
              anyone else unless the law requires it.
            </p>
          </Section>

          <Section title="Your choices">
            <p>
              You can ask us what we hold about you, ask us to correct it, or ask us to delete it.
              Email{' '}
              <a href={`mailto:${SITE_EMAIL}`} className="lux-footer-link">
                {SITE_EMAIL}
              </a>{' '}
              or message {CONTACT.primary.display} on WhatsApp and we will action it. You do not
              need to give a reason.
            </p>
          </Section>

          <Section title="Children">
            <p>
              We decorate a great many children&apos;s birthdays, but this site is meant for the
              adults booking them. We do not knowingly collect information from anyone under 18.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              If we change how any of this works, we will update this page and the date at the top.
              Any questions, just{' '}
              <Link href="/contact" className="lux-footer-link">
                get in touch
              </Link>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
