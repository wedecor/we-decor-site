import Layout from '../../components/Layout'

export default function Page() {
  return (
    <Layout
      seo={{
        title: "Tent & Balloon Setup",
        description: "Colorful tent and balloon decorations for all events in Bangalore.",
        image: "/gallery/tent1.webp",
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
          Tent & Balloon Setup
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Add fun and color to your event with our tent and balloon decorations, perfect for outdoor and indoor celebrations.
        </p>
      </section>
    </Layout>
  )
} 