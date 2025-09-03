import Layout from '../components/Layout';
import Link from 'next/link';

export default function Page() {
  return (
    <Layout
      seo={{
        title: 'About We Decor | Event Management in Bangalore',
        description:
          "Learn about We Decor, Bangalore's trusted event decor and event management company. Discover our story, philosophy, and what sets us apart.",
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          About We Decor
        </h1>
        <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">
          Trying to keep calm while planning for a big event is hard—and we know how that feels.
          Allow us to take charge! Why take risks when We Decor is here at your service for a
          hassle-free experience? We assure you a full-fledged event management experience with the
          support of our efficient team, always ready to make your event seamless and memorable.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Together in Celebration
        </h2>
        <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">
          Let your event be celebrated in the most auspicious way as you sit back and enjoy. We
          Decor helps you save time, reduce costs, book organizers, and plan parties—all tailored to
          give you a seamless, fun, and innovative event experience.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Our Services</h2>
        <p className="text-lg text-gray-800 dark:text-white leading-relaxed mb-8">
          We Decor is a robust and flexible platform providing a curated list of services:
          Decoration, Catering, Photographers, Videographers, Florists, Make-up Artists, Hair
          Stylists, Mehendi Bookings, and more. We facilitate a variety of events, from weddings and
          corporate events to social gatherings. Our goal is to give you and your guests the joy of
          festivity through a memorable event.
        </p>
        <div className="text-center">
          <Link
            href="/services"
            className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full px-6 py-3 shadow-lg hover:scale-105 transition font-bold mt-4"
          >
            Explore Our Services
          </Link>
        </div>
      </section>
    </Layout>
  );
}
