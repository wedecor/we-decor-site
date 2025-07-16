import React, { useState, FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending...");
    const target = e.target as HTMLFormElement;
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: (target.elements.namedItem('name') as HTMLInputElement)?.value,
        phone: (target.elements.namedItem('phone') as HTMLInputElement)?.value,
        message: (target.elements.namedItem('message') as HTMLInputElement)?.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    setStatus(res.ok ? "Sent!" : "Error");
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        required
        placeholder="Name"
        className="w-full border p-2 rounded"
      />
      <input
        name="phone"
        required
        placeholder="Phone"
        className="w-full border p-2 rounded"
      />
      <textarea
        name="message"
        required
        placeholder="Message"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-pink-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
      <a
        href="https://wa.me/919999999999"
        className="block mt-2 text-green-600 font-bold"
      >
        WhatsApp Us
      </a>
      {status && <div>{status}</div>}
    </form>
  );
}
