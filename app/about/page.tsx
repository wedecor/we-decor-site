import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { CONTACT } from '@/lib/contact';
import { HOME_PREVIEW_IMAGES } from '@/lib/images';
import SiteBreadcrumbs, { siteBreadcrumbsToSchemaItems } from '@/components/seo/SiteBreadcrumbs';
import CoreExploreLinks from '@/components/seo/CoreExploreLinks';
import SchemaScript from '@/components/seo/SchemaScript';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import { buildAboutPageGraph, withBreadcrumb } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/about',
  title: 'About We Decor — Event Decorators in Bangalore',
  description:
    'We Decor was started in 2022 by Ilyas and Zakir after a friend’s engagement went wrong. The story behind our event decoration studio in Bangalore.',
});

/**
 * Single vertical axis for the whole page.
 * Hero copy, body, pull quotes, stats and CTA all hang off these same edges.
 */
const GUTTER = 'px-6 md:px-10';
const COLUMN = 'mx-auto w-full max-w-[40rem]';

/** Shared type styles for the story body */
const BODY = 'text-[1.1875rem] md:text-[1.3125rem] text-lux-secondary font-light leading-[1.95]';

const CRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-lux-bg">
      <SchemaScript
        data={withBreadcrumb(
          buildAboutPageGraph({
            name: 'About We Decor Events',
            description:
              'We Decor was started in 2022 by Ilyas and Zakir after a friend’s engagement went wrong. The story behind our event decoration studio in Bangalore.',
          }),
          siteBreadcrumbsToSchemaItems(CRUMBS)
        )}
      />

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden min-h-[58vh] md:min-h-[66vh] flex items-end pt-[var(--nav-height)]">
        <div className="absolute inset-0 z-0">
          <Image
            src={HOME_PREVIEW_IMAGES.reception}
            alt="A We Decor event setup in Bangalore"
            fill
            priority
            className="object-cover object-center lux-image-cinematic"
            sizes="100vw"
            quality={75}
          />
        </div>
        <div
          className="absolute inset-0 z-[1] lux-overlay-gradient pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1] lux-hero-cinematic-side opacity-80 pointer-events-none"
          aria-hidden
        />

        <div className={`relative z-10 w-full ${GUTTER} pb-12 md:pb-14`}>
          <div className={COLUMN}>
            <p className="lux-eyebrow mb-5">Our story</p>
            <h1 className="font-display text-[2rem] md:text-[2.6rem] lg:text-[2.9rem] font-light text-lux-ivory leading-[1.18] tracking-tight">
              The best part of this work lasts about four seconds.
            </h1>
            <p className="mt-6 text-[1.0625rem] md:text-lg text-lux-secondary font-light leading-relaxed">
              It&apos;s the moment someone walks into the room and sees it for the first time. We
              Decor is an event decoration studio in Bangalore, started in 2022 by Ilyas and Zakir.
            </p>
          </div>
        </div>
      </section>

      {/* ── Breadcrumbs ── */}
      <div className={`${GUTTER} pt-5`}>
        <div className={COLUMN}>
          <SiteBreadcrumbs items={CRUMBS} />
        </div>
      </div>

      <article className={`${GUTTER} pt-8 md:pt-10`}>
        <div className={COLUMN}>
          {/* ── The moment ── */}
          <div className={`space-y-8 ${BODY}`}>
            <p>
              They stop. Not for long. They look around, take it in, and something happens on their
              face. Some people laugh, some go completely quiet, and a few have cried. Then the
              guests arrive, the evening starts moving, and the moment passes.
            </p>

            <p>
              Everything that comes before it leads to those few seconds. Months of planning.
              Conversations with family, choosing colours, worrying about whether the venue will
              look the way you imagined.
            </p>
          </div>

          {/* ── How it started ── */}
          <h2 className="sr-only">How We Decor started</h2>
          <div className={`mt-14 md:mt-16 space-y-8 ${BODY}`}>
            <p>
              We didn&apos;t start out thinking about any of this. In 2022 we went to a
              friend&apos;s engagement in Bangalore. The decorators showed up late. What had been
              set up wasn&apos;t what the family had booked. So instead of enjoying an evening they
              had been looking forward to for months, that family spent it making phone calls,
              apologising to guests, and trying to fix things that should never have needed fixing.
              We left that evening with one thought: this shouldn&apos;t be how it works.
            </p>

            <p>
              We didn&apos;t decide to start a company that night. It just became something the two
              of us kept coming back to.
            </p>

            <p>
              What we understood early on is that good decoration isn&apos;t enough on its own. A
              beautiful setup means very little if a family spends the week before wondering whether
              the decorators will turn up on time, or whether what arrives will look anything like
              what was promised. Most of what goes wrong in this business isn&apos;t a design
              problem at all.
            </p>
          </div>

          {/* ── The three failures ── */}
          <p className="my-12 md:my-14 font-display text-[1.6rem] md:text-[2rem] font-light text-lux-ivory leading-[1.4]">
            Somebody forgot to write something down. One measurement wasn&apos;t checked. One phone
            call didn&apos;t get made.
          </p>

          <div className={`space-y-8 ${BODY}`}>
            <p>
              So we&apos;ve spent as much time on the systems behind an event as we have on the
              decoration itself: the planning, the communication, and the technology that helps keep
              everything on track.
            </p>
          </div>

          {/* ── Scale ── */}
          <h2 className="sr-only">Why the size of an event stopped mattering to us</h2>
          <div className={`mt-14 md:mt-16 space-y-8 ${BODY}`}>
            <p>
              What we didn&apos;t expect was how quickly we&apos;d stop caring about the size of an
              event. We had assumed, early on, that the big weddings would be the ones that mattered
              most. They&apos;re the ones with the budgets and the photographs and the guest lists.
              But some of the events that have stayed with us the longest were small enough that
              another company might not have bothered turning up.
            </p>
          </div>

          {/* ── The three stories — each given its own room ── */}
          <h2 className="sr-only">Three celebrations we remember</h2>
          <div className="mt-12 md:mt-14 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            <p className={`py-12 md:py-14 ${BODY}`}>
              There was a{' '}
              <Link href="/services/proposal-decoration" className="text-lux-gold hover:underline">
                proposal
              </Link>{' '}
              we did on a terrace in Bangalore. It wasn&apos;t a large space and there wasn&apos;t
              much of a budget. Lights, flowers, a few things placed carefully. He had asked us to
              keep it simple because she doesn&apos;t like fuss. She said yes, and the two of them
              stood up there for a long time afterwards, well past when we&apos;d packed up and
              left.
            </p>

            <p className={`py-12 md:py-14 ${BODY}`}>
              A woman once asked us to{' '}
              <Link href="/services/room-decoration" className="text-lux-gold hover:underline">
                decorate a bedroom
              </Link>{' '}
              for her husband&apos;s birthday. Their own bedroom — a room he walks into every single
              day of his life. We spent the afternoon on it while he was at work. When he came home
              that evening and opened the door he stopped in the doorway and just stood there,
              because for a second he didn&apos;t recognise where he was.
            </p>

            <p className={`py-12 md:py-14 ${BODY}`}>
              And there was a Roka ceremony we did in a family&apos;s living room, because
              that&apos;s where they wanted it and that&apos;s where it was going to be. By the time
              we finished, several of the guests who arrived that evening genuinely thought they had
              come to a banquet hall. The family told us about it afterwards and they were
              delighted, though we suspect they were also a little proud, which is fair enough.
            </p>
          </div>

          <div className={`mt-12 md:mt-14 space-y-8 ${BODY}`}>
            <p>
              None of those were big jobs. All of them mattered enormously to the people involved.
              Once you&apos;ve seen that a few times it gets hard to think of a bedroom as a smaller
              version of a ballroom.
            </p>

            <p>
              So we stopped sorting the work into important and unimportant. A{' '}
              <Link href="/services/wedding-setup" className="text-lux-gold hover:underline">
                wedding
              </Link>
              , a{' '}
              <Link href="/services/birthday-decoration" className="text-lux-gold hover:underline">
                birthday at home
              </Link>
              , a{' '}
              <Link href="/services/haldi-decoration" className="text-lux-gold hover:underline">
                haldi
              </Link>
              , an{' '}
              <Link
                href="/services/engagement-decoration"
                className="text-lux-gold hover:underline"
              >
                engagement
              </Link>
              , a{' '}
              <Link href="/services/corporate-decoration" className="text-lux-gold hover:underline">
                company launch
              </Link>{' '}
              — we&apos;re asking ourselves the same question every time: how should this room feel
              when the family walks in?
            </p>
          </div>

          {/* ── Stat break ── */}
          <h2 className="sr-only">We Decor in numbers</h2>
          <div className="mt-14 md:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 border-y border-white/[0.08] py-10">
            {[
              { value: '2022', label: 'Since' },
              { value: '500+', label: 'Celebrations' },
              { value: '25+', label: 'Areas' },
              { value: 'One', label: 'Goal' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-[1.65rem] md:text-[1.9rem] text-lux-gold-soft leading-none">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] tracking-lux uppercase text-lux-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* ── How we work ── */}
          <h2 className="sr-only">How we work</h2>
          <div className={`mt-14 md:mt-16 space-y-8 ${BODY}`}>
            <p>
              Most of the people who come to us are already tired by the time they arrive.
              They&apos;re managing family opinions, a venue, a budget that&apos;s probably already
              stretched, and a hundred small decisions nobody warned them about. Our job, as we see
              it, is to add some colour to all of that and then take one thing off their list
              entirely. If we&apos;ve done it properly, the decoration is the part of the day they
              never had to worry about.
            </p>

            <p>
              Once we understand what you&apos;re planning, we keep things simple. We listen before
              we suggest anything, because the same brief means different things to different
              families. We don&apos;t push packages, since the venue and the light and what people
              actually want vary too much for that to make sense. We say what something will cost
              and we say what it will look like, and then we turn up when we said we would and build
              the thing we described.
            </p>
          </div>

          {/* ── Honesty ── */}
          <p className="mt-14 md:mt-16 font-display text-[1.6rem] md:text-[2rem] font-light text-lux-ivory leading-[1.4]">
            Things still go wrong sometimes.
          </p>

          <div className={`mt-7 space-y-8 ${BODY} pb-16 md:pb-20`}>
            <p>
              A flower order comes in wrong. Traffic does what Bangalore traffic does. A supplier
              delivers later than he promised he would. When that happens, we tell you. We
              don&apos;t wait and hope you won&apos;t notice. We&apos;d rather have an uncomfortable
              conversation a day early than leave you standing there surprised on the day of your
              celebration.
            </p>

            <p>
              Today we decorate celebrations across{' '}
              <Link href="/locations" className="text-lux-gold hover:underline">
                Bangalore
              </Link>
              , from intimate home events to large wedding venues. We&apos;ve been doing this for
              three years now and those few seconds haven&apos;t got old. That&apos;s the honest
              reason we keep going.
            </p>
          </div>
        </div>
      </article>

      {/* ── CTA ── */}
      <section
        className={`${GUTTER} py-16 md:py-20 border-y border-white/[0.08] lux-section-alt`}
        aria-labelledby="about-cta"
      >
        <div className={COLUMN}>
          <h2
            id="about-cta"
            className="font-display text-[1.85rem] md:text-[2.4rem] font-light text-lux-ivory leading-[1.25]"
          >
            Planning something?
          </h2>
          <p className="mt-5 text-[1.1875rem] md:text-[1.3125rem] text-lux-secondary font-light leading-relaxed">
            Tell us about it. We&apos;d love to hear what you&apos;re planning.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <TrackedWhatsAppLink
              href={CONTACT.waUrlForHome()}
              source="about_cta"
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn-primary"
            >
              WhatsApp us
            </TrackedWhatsAppLink>
            <Link href="/contact" className="lux-btn-secondary">
              Get a quote
            </Link>
          </div>
        </div>
      </section>

      <CoreExploreLinks context="content" showLocalities pageKey="about" />
    </div>
  );
}
