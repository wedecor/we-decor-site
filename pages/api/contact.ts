import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Integrate with Formspree, EmailJS, or just log for demo
    // e.g., send email or push to Google Sheets
    return res.status(200).json({ ok: true });
  }
  res.status(405).end();
}
