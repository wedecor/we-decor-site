import Layout from "../components/Layout";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <Layout
      seo={{
        title: "Contact",
        description:
          "Contact We Decor for event decor in Bangalore. WhatsApp: +91-9999999999",
        image: "/logo.png",
      }}
    >
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>
        <ContactForm />
        <div className="mt-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.0!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sBangalore!5e0!3m2!1sen!2sin!4v0000000000000"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
}
