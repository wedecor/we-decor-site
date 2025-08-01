import Layout from '../../components/Layout'

export default function Page() {
  return (
    <Layout
      seo={{
        title: "Wedding Setup",
        description: "Elegant wedding decor and stage setups in Bangalore.",
        image: "/gallery/wedding1.webp",
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
          Wedding Setup
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          From stage decor to entrance arches, our wedding setups create a magical atmosphere for your big day.
        </p>
      </section>
    </Layout>
  )
} 