// ============================================
// src/pages/api/contact.js
// ============================================
// App Router route handler for POST /api/contact
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

    // In production, integrate with email service (SendGrid, Mailgun, etc.)
    // For now we log the submission on the server.
    console.log('Contact form submission:', { name, email, subject, message });

    return new Response(JSON.stringify({ message: 'Message sent successfully', success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ message: 'Failed to send message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Also export default for compatibility with bundlers that import the default handler.
export default POST;

