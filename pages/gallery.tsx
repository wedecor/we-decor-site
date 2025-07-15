import Layout from "../components/Layout";
import Gallery from "../components/Gallery";

// GalleryPage renders the gallery grid with SEO meta
export default function GalleryPage() {
  return (
    // Layout provides SEO, nav, footer, and sticky CTAs
    <Layout
      seo={{
        title: "Gallery",
        description: "See our event decor gallery - We Decor Bangalore.",
        image: "/logo.png",
      }}
    >
      {/* Main gallery section with heading */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Gallery</h1>
        {/* Gallery component renders image grid and lightbox */}
        <Gallery />
      </div>
    </Layout>
  );
}
