import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, phone, message } = req.body;
    
    // Create WhatsApp message with form data
    const whatsappMessage = `*New Enquiry from We Decor Website*
    
*Name:* ${name}
*Phone:* ${phone}
*Message:* ${message}

Please respond to this enquiry.`;

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/917019169442?text=${encodedMessage}`;
    
    // Return the WhatsApp URL for the frontend to redirect
    return res.status(200).json({ 
      success: true, 
      whatsappUrl,
      message: "Redirecting to WhatsApp..." 
    });
  }
  res.status(405).end();
}
