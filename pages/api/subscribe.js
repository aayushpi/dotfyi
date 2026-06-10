import { getResend } from '../../lib/newsletter';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const email = (req.body?.email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const segmentId = process.env.RESEND_SEGMENT_ID;
  if (!segmentId) {
    console.error('subscribe: RESEND_SEGMENT_ID is not set');
    return res.status(500).json({ error: 'Subscriptions are not configured yet.' });
  }

  try {
    const resend = getResend();
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      segments: [{ id: segmentId }],
    });

    // Treat an already-subscribed email as success (don't reveal membership).
    if (error && !/already|exists/i.test(JSON.stringify(error))) {
      console.error('subscribe: resend error', error);
      return res.status(502).json({ error: 'Could not subscribe right now. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('subscribe: unexpected error', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
