# Email & Waitlist Debug Guide

## Environment Variables Needed

### Resend (for Contact Form)
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
FROM_EMAIL=noreply@korova.app
```

### Brevo (for Waitlist)
```env
BREVO_API_KEY=xxxxxxxxxxxxxxxxxxx
BREVO_LIST_ID=3
```

## API Endpoints

### Local Development
- Contact: `http://localhost:3000/api/contact`
- Waitlist: `http://localhost:3000/api/subscribe`

### Production/Netlify
- Contact: `https://yoursite.netlify.app/.netlify/functions/contact`
- Waitlist: `https://yoursite.netlify.app/.netlify/functions/subscribe`

## Debugging Steps

### 1. Check Browser Console
Both forms now log detailed debug information:
- `[WAITLIST]` logs for waitlist functionality
- `[FOOTER-CONTACT]` logs for contact form
- `[CONTACT]` and `[SUBSCRIBE]` logs for API endpoints

### 2. Check Netlify Function Logs
Go to Netlify Dashboard > Functions > View logs

### 3. Verify Environment Variables
Check Netlify Dashboard > Site Settings > Environment Variables

### 4. Test API Endpoints Directly

#### Test Contact Form
```bash
curl -X POST https://yoursite.netlify.app/.netlify/functions/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","subject":"Test","message":"Test message","to":"your@email.com"}'
```

#### Test Waitlist
```bash
curl -X POST https://yoursite.netlify.app/.netlify/functions/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Common Issues & Solutions

### Issue: "Email service yapılandırma hatası"
- **Cause**: RESEND_API_KEY not set
- **Solution**: Add RESEND_API_KEY to Netlify env vars

### Issue: "Sunucu yapılandırma hatası" 
- **Cause**: BREVO_API_KEY not set
- **Solution**: Add BREVO_API_KEY to Netlify env vars

### Issue: Form works locally but not on Netlify
- **Cause**: Environment variables not set in Netlify
- **Solution**: Copy all env vars from .env to Netlify Dashboard

### Issue: Resend domain verification
- **Cause**: FROM_EMAIL domain not verified in Resend
- **Solution**: Use verified domain or verify your domain in Resend dashboard

### Issue: Brevo API errors
- **Cause**: Invalid API key or list ID
- **Solution**: Check Brevo dashboard for correct API key and list ID

## Monitoring

All API calls are extensively logged with emoji prefixes for easy identification:
- 🔍 Function started
- 📧 Email/data received  
- 🔑 Environment variables status
- 📡 Trying endpoint
- 📋 API response received
- 📄 Response data
- ✅ Success
- ❌ Error

## Fallback Strategy

Both forms try multiple endpoints:
1. First tries Next.js API route (`/api/*`)
2. If that fails, tries Netlify function (`/.netlify/functions/*`)
3. Shows detailed error message if both fail

This ensures maximum compatibility across different deployment scenarios.