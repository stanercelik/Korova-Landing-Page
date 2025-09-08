import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
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
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID || '3'; // Default to list ID 3

    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'Sunucu yapılandırma hatası.' },
        { status: 500 }
      );
    }

    // Add contact to Brevo
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        listIds: [parseInt(BREVO_LIST_ID)],
        updateEnabled: true,
        attributes: {
          SIGNUP_DATE: new Date().toISOString().split('T')[0],
          SOURCE: 'LANDING_PAGE'
        }
      }),
    });

    // If successful, send welcome email
    if (response.ok) {
      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: {
              name: 'Korova Team',
              email: 'noreply@korova.app'
            },
            to: [{ email: email }],
            subject: '🎬 Korova Bekleme Listesine Hoş Geldin!',
            htmlContent: `
              <html>
                <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #FFC107; margin-bottom: 10px;">🎬 Korova</h1>
                    <h2 style="color: #333; font-weight: normal;">Bekleme Listesine Hoş Geldin!</h2>
                  </div>
                  
                  <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0;">
                      Merhaba! 👋
                    </p>
                    <p style="color: #333; font-size: 16px; line-height: 1.6;">
                      Korova ailesine katıldığın için çok heyecanlıyız! Artık film zevkin üzerinden anlamlı bağlantılar kuracağın platformumuzun bekleme listesinde yer alıyorsun.
                    </p>
                  </div>
                  
                  <div style="margin-bottom: 25px;">
                    <h3 style="color: #FFC107; margin-bottom: 15px;">✨ Seni Neler Bekliyor?</h3>
                    <ul style="color: #333; line-height: 1.8; padding-left: 20px;">
                      <li>Film zevkinle uyumlu insanlarla tanışma</li>
                      <li>Sinema üzerinden anlamlı arkadaşlıklar kurma</li>
                      <li>Özel bekleme listesi üyesi avantajları</li>
                      <li>Platform lansmanından ilk haberdar olanlar arasında olma</li>
                    </ul>
                  </div>
                  
                  <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                    <p style="color: #2d5a2d; font-weight: bold; margin: 0 0 10px 0;">📅 Önemli Tarih</p>
                    <p style="color: #2d5a2d; margin: 0;">Korova'nın lansmanı için Q1 2025'i takip et!</p>
                  </div>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <p style="color: #666; font-style: italic;">
                      "Birinin güvenilir olup olmadığını anlamanın en iyi yolu ona güvenmektir."<br>
                      <small>— Ernest Hemingway</small>
                    </p>
                  </div>
                  
                  <div style="text-align: center; border-top: 2px solid #FFC107; padding-top: 20px;">
                    <p style="color: #333; margin: 0;">
                      Sorularınız mı var? Bize yazın: <a href="mailto:hello@korova.app" style="color: #FFC107;">hello@korova.app</a>
                    </p>
                    <p style="color: #999; font-size: 14px; margin: 10px 0 0 0;">
                      Korova Team ile ❤️
                    </p>
                  </div>
                </body>
              </html>
            `
          }),
        });
      } catch (emailError) {
        console.log('Welcome email could not be sent, but signup was successful:', emailError);
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API Error:', errorData);
      
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

    return NextResponse.json(
      { success: true, message: 'Başarıyla bekleme listesine eklendiniz!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Subscribe API Error:', error);
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