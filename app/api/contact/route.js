// ============================================
// src/pages/api/contact.js
// ============================================
// App Router route handler for POST /api/contact
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
    if (!fs.existsSync(CONTACTS_FILE)) fs.writeFileSync(CONTACTS_FILE, '[]');
  } catch (e) {
    console.warn('Failed creating data dir or files', e);
  }
}

async function sendEmailViaSmtp({ name, email, subject, message }) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const recipient = process.env.CONTACT_RECIPIENT || 'felixhosea61@gmail.com';

  if (!host || !port || !user || !pass) {
    return { ok: false, reason: 'SMTP not configured' };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465, // true for 465, false for other ports
    auth: { user, pass },
  });

  // For Resend, send from a Resend-issued address (or your verified domain)
  // Format: anything@resend.dev or your-domain@yourdomain.com
  const fromAddress = host.includes('resend') 
    ? `onboarding@resend.dev`  // Resend's default test address
    : `${name.replace(/[^a-z0-9]/gi, '').toLowerCase()}@${new URL(`http://${host}`).hostname || 'noreply.local'}`;

  const mail = {
    from: fromAddress,
    to: recipient,
    replyTo: email, // User's email in reply-to so you can respond to them
    subject: `[Contact] ${subject}`,
    text: `You received a contact message from ${name} (${email}):\n\n${message}`,
    html: `<p>You received a contact message from <strong>${name}</strong> &lt;<a href="mailto:${email}">${email}</a>&gt;:</p><blockquote><p>${message.replace(/\n/g, '<br/>')}</p></blockquote>`,
  };

  await transporter.sendMail(mail);
  return { ok: true };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body || {};

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ message: 'Invalid email format' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Try to send via SMTP if configured
    let sent = { ok: false };
    try {
      if (process.env.SMTP_HOST) {
        sent = await sendEmailViaSmtp({ name, email, subject, message });
      }
    } catch (e) {
      console.error('SMTP send error:', e);
      sent = { ok: false, reason: e.message };
    }

    // Always persist submission locally as a fallback for review
    try {
      ensureDataDir();
      const existing = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8') || '[]');
      existing.push({ name, email, subject, message, date: new Date().toISOString(), sent: sent.ok });
      fs.writeFileSync(CONTACTS_FILE, JSON.stringify(existing, null, 2));
    } catch (e) {
      console.warn('Failed saving contact locally', e);
    }

    if (sent.ok) {
      return new Response(JSON.stringify({ message: 'Message sent successfully', success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // If SMTP not configured, return success but inform caller it's only stored locally
    if (!sent.ok && sent.reason === 'SMTP not configured') {
      return new Response(JSON.stringify({ message: 'Message received and saved (no SMTP configured).', success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // If we attempted to send and failed, still return 200 because message was saved locally
    // Log the error for debugging
    console.warn('SMTP send failed but message saved locally:', sent.reason);
    return new Response(JSON.stringify({ message: 'Message received and saved for review.', success: true, note: 'Email send failed but submission saved' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ message: 'Failed to send message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

