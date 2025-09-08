// Dosya: netlify/functions/contact.ts

import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

// API anahtarımızı ortam değişkeninden alıyoruz
const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { email, subject, message, to } = body;

    await resend.emails.send({
      // 'from' adresi Resend'in test için verdiği adrestir. 
      // Kendi domaininizi (korova.app) Resend'de doğruladıktan sonra 
      // 'iletisim@korova.app' gibi bir adres kullanabilirsiniz.
      from: 'Korova App <onboarding@resend.dev>',
      to: to, // Frontend'den gelen sizin e-posta adresiniz
      replyTo: email, // E-postayı yanıtlarsanız direkt kullanıcıya gider
      subject: `Korova Contact Form: ${subject}`,
      html: `
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message.' }),
    };
  }
};