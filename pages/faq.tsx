import Layout from "../components/Layout";
import FAQ from "../components/FAQ";

export default function FAQPage() {
  return (
    <Layout seo={{ title: "FAQ - Frequently Asked Questions", description: "Find answers to common questions about our decoration services." }}>
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        <FAQ />
      </div>
    </Layout>
  );
} 