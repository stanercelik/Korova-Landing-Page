exports.handler = async (event, context) => {
  console.log('🔍 [NETLIFY-SUBSCRIBE] Function başlatıldı');
  console.log('🌐 [NETLIFY-SUBSCRIBE] Event:', {
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
    const { email } = JSON.parse(event.body);
    console.log('📧 [NETLIFY-SUBSCRIBE] İstek verileri:', { email });
    
    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'E-posta adresi gerekli.' }),
      };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Geçerli bir e-posta adresi girin.' }),
      };
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID || '3'; // Default to list ID 3

    console.log('🔑 [NETLIFY-SUBSCRIBE] Env değişkenleri:', {
      hasBrevoKey: !!BREVO_API_KEY,
      brevoListId: BREVO_LIST_ID,
      brevoKeyPrefix: BREVO_API_KEY?.substring(0, 10) + '...',
      allEnvKeys: Object.keys(process.env).filter(key => key.includes('BREVO'))
    });

    if (!BREVO_API_KEY) {
      console.error('❌ [NETLIFY-SUBSCRIBE] BREVO_API_KEY environment variable is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Sunucu yapılandırma hatası.' }),
      };
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
    
    console.log('📤 [NETLIFY-SUBSCRIBE] Brevo contact ekleniyor:', contactData);
    
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(contactData),
    });
    
    console.log('📋 [NETLIFY-SUBSCRIBE] Brevo API yanıtı:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    // If successful, send welcome email
    if (response.ok) {
      console.log('✅ [NETLIFY-SUBSCRIBE] Contact başarıyla eklendi, welcome email gönderiliyor');
      
      try {
        const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
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
        
        console.log('📧 [NETLIFY-SUBSCRIBE] Welcome email yanıtı:', {
          status: emailResponse.status,
          statusText: emailResponse.statusText,
          ok: emailResponse.ok
        });
        
        if (!emailResponse.ok) {
          const emailErrorData = await emailResponse.json();
          console.error('❌ [NETLIFY-SUBSCRIBE] Welcome email hatası:', emailErrorData);
        } else {
          console.log('✅ [NETLIFY-SUBSCRIBE] Welcome email başarıyla gönderildi');
        }
        
      } catch (emailError) {
        console.error('❌ [NETLIFY-SUBSCRIBE] Welcome email could not be sent, but signup was successful:', emailError);
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ [NETLIFY-SUBSCRIBE] Brevo API Error:', errorData);
      console.error('❌ [NETLIFY-SUBSCRIBE] Full error response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
        errorData
      });
      
      // Handle duplicate email case
      if (response.status === 400 && errorData.code === 'duplicate_parameter') {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Bu e-posta adresi zaten listede mevcut.' }),
        };
      }
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Başarıyla bekleme listesine eklendiniz!' }),
    };

  } catch (error) {
    console.error('❌ [NETLIFY-SUBSCRIBE] Subscribe API Error:', error);
    console.error('❌ [NETLIFY-SUBSCRIBE] Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Sunucu hatası oluştu. Lütfen tekrar deneyin.' }),
    };
  }
};