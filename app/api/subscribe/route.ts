import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🔍 [SUBSCRIBE] API route başlatıldı');
  
  try {
    const { email } = await request.json();
    console.log('📧 [SUBSCRIBE] İstek verileri:', { email });
    
    if (!email) {
      return NextResponse.json(
        { error: 'E-posta adresi gerekli.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi girin.' },
        { status: 400 }
      );
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID || '3';

    console.log('🔑 [SUBSCRIBE] Env değişkenleri:', {
      hasBrevoKey: !!BREVO_API_KEY,
      brevoListId: BREVO_LIST_ID,
      brevoKeyPrefix: BREVO_API_KEY?.substring(0, 10) + '...'
    });

    if (!BREVO_API_KEY) {
      console.error('❌ [SUBSCRIBE] BREVO_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'Sunucu yapılandırma hatası.' },
        { status: 500 }
      );
    }

    // Add contact to Brevo
    const contactData = {
      email: email,
      listIds: [parseInt(BREVO_LIST_ID)],
      updateEnabled: true,
      attributes: {
        SIGNUP_DATE: new Date().toISOString().split('T')[0],
        SOURCE: 'LANDING_PAGE'
      }
    };
    
    console.log('📤 [SUBSCRIBE] Brevo contact ekleniyor:', contactData);
    
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(contactData),
    });
    
    console.log('📋 [SUBSCRIBE] Brevo API yanıtı:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ [SUBSCRIBE] Brevo API Error:', errorData);
      
      // Handle duplicate email case
      if (response.status === 400 && errorData.code === 'duplicate_parameter') {
        return NextResponse.json(
          { error: 'Bu e-posta adresi zaten listede mevcut.' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.' },
        { status: 500 }
      );
    }

    console.log('✅ [SUBSCRIBE] Contact başarıyla eklendi');

    return NextResponse.json(
      { success: true, message: 'Başarıyla bekleme listesine eklendiniz!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ [SUBSCRIBE] Subscribe API Error:', error);
    console.error('❌ [SUBSCRIBE] Error details:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      name: (error as Error).name
    });
    
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu. Lütfen tekrar deneyin.' },
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