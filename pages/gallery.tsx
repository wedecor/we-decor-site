import Layout from "../components/Layout";
import Gallery from "../components/Gallery";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import Image from 'next/image';

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
      <BreadcrumbsJsonLd
        crumbs={[
          { name: "Home", url: "/" },
          { name: "Gallery", url: "/gallery" },
        ]}
      />
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo.png" alt="We Decor Logo" width={48} height={48} className="mb-2 rounded-full shadow" />
          <h1 className="text-3xl font-bold text-green-700">Gallery</h1>
        </div>
        {/* Gallery component renders image grid and lightbox */}
        <Gallery />
      </div>
    </Layout>
  );
}
