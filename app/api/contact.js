// ============================================
// src/pages/api/contact.js
// ============================================
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // In production, integrate with email service (SendGrid, Mailgun, etc.)
    console.log('Contact form submission:', { name, email, subject, message });
    
    // Simulate successful submission
    return res.status(200).json({ 
      message: 'Message sent successfully',
      success: true
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ message: 'Failed to send message' });
  }
}

