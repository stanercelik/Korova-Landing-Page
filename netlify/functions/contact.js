const { Resend } = require('resend');

exports.handler = async (event, context) => {
  console.log('🔍 [NETLIFY-CONTACT] Function başlatıldı');
  console.log('🌐 [NETLIFY-CONTACT] Event:', {
    httpMethod: event.httpMethod,
    headers: event.headers,
    body: event.body ? 'Present' : 'Not present'
  });

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, subject, message, to } = JSON.parse(event.body);
    console.log('📧 [NETLIFY-CONTACT] İstek verileri:', { email, subject, to, messageLength: message?.length });

    // Environment variables kontrolü
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || 'noreply@korova.app';
    
    console.log('🔑 [NETLIFY-CONTACT] Env değişkenleri:', { 
      hasResendKey: !!resendApiKey, 
      fromEmail,
      resendKeyPrefix: resendApiKey?.substring(0, 8) + '...',
      allEnvKeys: Object.keys(process.env).filter(key => key.includes('RESEND') || key.includes('FROM'))
    });

    if (!resendApiKey) {
      console.error('❌ [NETLIFY-CONTACT] RESEND_API_KEY bulunamadı');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, error: 'Email service yapılandırma hatası' }),
      };
    }

    // Resend client oluştur
    const resend = new Resend(resendApiKey);
    console.log('✅ [NETLIFY-CONTACT] Resend client oluşturuldu');

    const emailData = {
      from: fromEmail,
      to: to,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr>
          <p style="color: #666; font-size: 12px;">This message was sent from the Korova contact form.</p>
        </div>
      `,
    };

    console.log('📤 [NETLIFY-CONTACT] Email gönderiliyor:', { from: emailData.from, to: emailData.to });
    
    const result = await resend.emails.send(emailData);
    
    console.log('✅ [NETLIFY-CONTACT] Email başarıyla gönderildi:', result);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, emailId: result.data?.id }),
    };
    
  } catch (error) {
    console.error('❌ [NETLIFY-CONTACT] Hata oluştu:', error);
    console.error('❌ [NETLIFY-CONTACT] Hata detayları:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'Failed to send message' }),
    };
  }
};