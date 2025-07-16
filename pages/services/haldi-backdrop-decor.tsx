import Layout from '../../components/Layout'
import WhyChooseUs from '../../components/WhyChooseUs'

export default function Page() {
  return (
    <Layout
      seo={{
        title: "Haldi Backdrop Decor in Bangalore",
        description: "Vibrant haldi event decoration with floral backdrops and budget-friendly packages.",
        image: "/gallery/haldi-backdrop.webp",
      }}
    >
      <section className="max-w-screen-lg mx-auto py-12 px-6 font-sans">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
          Haldi Backdrop Decor
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          We create colorful haldi decorations with marigolds, backdrops, and traditional vibes. Call us or WhatsApp today.
        </p>

        <div className="my-12">
          <WhyChooseUs />
        </div>
      </section>
    </Layout>
  )
} 