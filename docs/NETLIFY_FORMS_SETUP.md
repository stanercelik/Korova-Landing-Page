# Netlify Forms Kurulum Rehberi

## ✅ Yapılması Gerekenler

### 1. Netlify Dashboard'da Forms'u Etkinleştir

1. Netlify dashboard'ına git
2. **Site Settings** → **Forms**
3. **Enable form detection** butonuna tıkla

### 2. Deploy Et

Kodları deploy et. Netlify build sırasında formları otomatik algılayacak.

### 3. Email Bildirimleri Kurma

1. **Site Settings** → **Forms** → **Form notifications**
2. **Add notification** → **Email notification**
3. **Form**: `waitlist` (waitlist için) veya `contact` (iletişim için)
4. **Email to notify**: `tanercelik2001@gmail.com`

### 4. Slack Bildirimleri (Opsiyonel)

1. **Add notification** → **Slack notification**
2. Slack webhook URL'i ekle
3. Özelleştirilmiş mesajlar ayarla

## 📋 Form Yapısı

### Waitlist Form
- **Form name**: `waitlist`
- **Fields**: 
  - `email` (email validation ile)

### Contact Form  
- **Form name**: `contact`
- **Fields**:
  - `email` (gönderen email)
  - `subject` (konu)
  - `message` (mesaj içeriği)

## 🔍 Test Etme

### Localhost'ta Test (netlify dev)
```bash
npm run dev:netlify
# veya
netlify dev
```

### Production'da Test
1. Formu doldur ve gönder
2. Netlify dashboard → **Forms** → **Active forms**'a git
3. Submissions'ları kontrol et

## 📧 Form Submissions'ları Görüntüleme

1. Netlify dashboard → **Forms**
2. İlgili form'a tıkla (waitlist veya contact)  
3. Tüm submissions'ları görebilirsin:
   - Email adresi
   - Submit tarihi
   - Form verileri

## 🚨 Sorun Giderme

### Form gözükmüyor?
- Site'i yeniden deploy et
- **Forms** → **Enable form detection** aktif mi kontrol et

### Submissions gelmiyor?
- Browser console'da error var mı kontrol et
- Network tab'ında form submit'i görüyor musun?
- Form name doğru mu? (`waitlist` ve `contact`)

### Form spam'e gidiyor?
- **Forms** → **Spam filtering** ayarlarını kontrol et
- Honeypot field ekle (opsiyonel)

## 💡 Avantajlar

✅ **API yazmaya gerek yok**
✅ **Environment variables gerekmez**
✅ **Otomatik spam filtreleme**  
✅ **Netlify dashboard'da tüm submissions**
✅ **Email/Slack bildirimleri**
✅ **File upload desteği**
✅ **Export işlemleri**

## 📊 Limitation'lar

- Aylık 100 form submission (ücretsiz plan)
- 8 MB max file upload
- 30 saniye timeout

## 🔄 Migration Notları

- **Eski API functions'lar kaldırıldı**
- **Resend/Brevo entegrasyonu gereksiz** 
- **Environment variables temizlendi**
- **Netlify Forms'a geçiş tamamlandı**

## 📞 İletişim

Sorularınız için: `tanercelik2001@gmail.com`

---

**Not**: Bu kurulumdan sonra artık API functions'larına, Resend'e, Brevo'ya gerek yok. Netlify Forms her şeyi hallediyor! 🎉