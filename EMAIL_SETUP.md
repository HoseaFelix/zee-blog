# Contact Form & Newsletter Setup Guide

## Current Status
✅ Dev server running at **http://localhost:3000**

## Quick Test (Local Storage - No Setup Needed)

The contact form and newsletter are now **fully functional** even without email providers configured:

### Test Contact Form
1. Go to `http://localhost:3000/contact`
2. Fill out the form and click "Send Message"
3. You'll see a success message
4. Check `data/contacts.json` — your submission is saved there

### Test Newsletter Subscribe
1. Scroll to any page footer or look for the newsletter section
2. Enter your email and click "Subscribe"
3. You'll see a success message
4. Check `data/subscribers.json` — your email is saved there

---

## Enable Email Sending (Optional)

### Option A: Gmail (Easiest for Testing)

1. **Generate an App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Google will generate a 16-character password

2. **Update `.env.local`:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password-from-above
   CONTACT_RECIPIENT=felixhosea61@gmail.com
   ```

3. **Restart dev server:**
   - Stop the current server (Ctrl+C)
   - Run `pnpm dev` again
   - Test the contact form — email should arrive in `felixhosea61@gmail.com`

### Option B: SendGrid (Recommended for Production)

1. **Create a SendGrid account** at https://sendgrid.com

2. **Get your API key:**
   - Dashboard > Settings > API Keys
   - Create a new API key (copy the full key)

3. **Update `.env.local`:**
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=SG.your-full-api-key-here
   CONTACT_RECIPIENT=felixhosea61@gmail.com
   ```

4. **Restart and test** as above

### Option C: Mailgun (Also Good)

1. **Create account** at https://mailgun.com

2. **Get SMTP credentials:**
   - Domain Settings > SMTP
   - Copy SMTP Host, Port (587), and credentials

3. **Update `.env.local`:**
   ```
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_USER=postmaster@your-domain.mailgun.org
   SMTP_PASS=your-mailgun-password
   CONTACT_RECIPIENT=felixhosea61@gmail.com
   ```

---

## Enable Mailchimp Newsletter Subscription (Optional)

1. **Create a Mailchimp account** at https://mailchimp.com

2. **Get API key:**
   - Account > Extras > API keys
   - Create or copy your API key (format: `xxxxx-us1`)

3. **Get Audience ID:**
   - Click "Audience" on the left sidebar
   - Select your mailing list
   - Settings > Audience name and defaults
   - Copy the "Audience ID"

4. **Update `.env.local`:**
   ```
   MAILCHIMP_API_KEY=your-api-key-here
   MAILCHIMP_LIST_ID=your-audience-id-here
   ```

5. **Restart and test** — newsletter subscribers should now be added to your Mailchimp audience

---

## File Storage (No Setup Needed)

### Contact Submissions
- **File:** `data/contacts.json`
- **Fallback:** Used if SMTP not configured or SMTP fails
- **Format:** Array of contact submissions with timestamp

### Newsletter Subscribers
- **File:** `data/subscribers.json`
- **Fallback:** Used if Mailchimp not configured or Mailchimp API fails
- **Format:** Array of emails with subscription timestamp

---

## Troubleshooting

### Contact form shows "Message received and saved (no SMTP configured)"
- This means SMTP env vars are missing or invalid
- Your message IS saved to `data/contacts.json`
- Either leave as-is (for development) or fill in SMTP config in `.env.local`

### Newsletter shows "Something went wrong"
- Check browser console (F12 → Console tab) for error message
- If Mailchimp is not configured, submission should still be saved to `data/subscribers.json`

### "Failed to send message" error
- SMTP credentials are wrong or the SMTP server rejected the request
- Check email/password in `.env.local`
- For Gmail, make sure you used an App Password, not your regular password
- Verify firewall/network isn't blocking SMTP port

---

## Next Steps

1. **Test locally first** (contact form and newsletter work without any setup)
2. **Choose an email provider** (Gmail for quick testing, SendGrid/Mailgun for production)
3. **Fill in credentials** in `.env.local`
4. **Restart the dev server** and test again
5. **Deploy to production** — same env vars work on Vercel, Netlify, or self-hosted

---

## Files Modified

- `app/api/contact.js` — Contact form API with SMTP sending
- `app/api/subscribe.js` — Newsletter subscription API with Mailchimp support
- `components/Newsletter.jsx` — Wired to call `/api/subscribe`
- `package.json` — Added nodemailer dependency
- `.env.local` — Added email configuration variables
- `data/contacts.json` — Local storage for contact submissions
- `data/subscribers.json` — Local storage for newsletter subscriptions
