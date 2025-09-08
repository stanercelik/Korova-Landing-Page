import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  console.log('🔍 [CONTACT] API route başlatıldı');
  
  try {
    const { email, subject, message, to } = await request.json();
    console.log('📧 [CONTACT] İstek verileri:', { email, subject, to, messageLength: message?.length });

    // Environment variables kontrolü
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || 'noreply@korova.app';
    
    console.log('🔑 [CONTACT] Env değişkenleri:', { 
      hasResendKey: !!resendApiKey, 
      fromEmail,
      resendKeyPrefix: resendApiKey?.substring(0, 8) + '...' 
    });

    if (!resendApiKey) {
      console.error('❌ [CONTACT] RESEND_API_KEY bulunamadı');
      return NextResponse.json(
        { success: false, error: 'Email service yapılandırma hatası' },
        { status: 500 }
      );
    }

    // Resend client oluştur
    const resend = new Resend(resendApiKey);
    console.log('✅ [CONTACT] Resend client oluşturuldu');

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

    console.log('📤 [CONTACT] Email gönderiliyor:', { from: emailData.from, to: emailData.to });
    
    const result = await resend.emails.send(emailData);
    
    console.log('✅ [CONTACT] Email başarıyla gönderildi:', result);
    
    return NextResponse.json({ success: true, emailId: result.data?.id }, { status: 200 });
    
  } catch (error) {
    console.error('❌ [CONTACT] Hata oluştu:', error);
    console.error('❌ [CONTACT] Hata detayları:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}