export default async function handler(req, res) {
  if (req.method === "POST") {
    // Integrate with Formspree, EmailJS, or just log for demo
    // e.g., send email or push to Google Sheets
    return res.status(200).json({ ok: true });
  }
  res.status(405).end();
}
