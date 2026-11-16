import { getResend } from '../../lib/newsletter';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NOTE = 5000;
// Humans take longer than this to type an email and a note.
const MIN_FILL_MS = 2500;

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email: rawEmail, note: rawNote, website, elapsed } = req.body || {};

  // Bot checks: hidden honeypot field filled, or submitted implausibly fast.
  // Pretend it worked so bots don't learn anything.
  if (website || !(Number(elapsed) >= MIN_FILL_MS)) {
    return res.status(200).json({ ok: true });
  }

  const email = String(rawEmail || '').trim();
  const note = String(rawNote || '').trim();
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'That email doesn’t look right.' });
  }
  if (!note) {
    return res.status(400).json({ error: 'Add a note first.' });
  }
  if (note.length > MAX_NOTE) {
    return res.status(400).json({ error: `Keep it under ${MAX_NOTE} characters.` });
  }

  // Any address on a Resend-verified domain works; aayush.fyi is verified for the newsletter.
  const from = process.env.CONTACT_FROM || process.env.NEWSLETTER_FROM || 'Aayush <notes@aayush.fyi>';
  const to = process.env.CONTACT_TO || 'xoxo@aayush.fyi';
  if (!process.env.RESEND_API_KEY) {
    console.error('contact: RESEND_API_KEY is not set for this environment');
    return res.status(500).json({ error: 'Messages aren’t set up yet.' });
  }

  try {
    const { error } = await getResend().emails.send({
      from,
      to,
      replyTo: email,
      subject: `Note from ${email}`,
      text: `${note}\n\n— ${email}`,
      html: `<p style="white-space:pre-wrap">${escapeHtml(note)}</p><p>— ${escapeHtml(email)}</p>`,
    });
    if (error) {
      console.error('contact: resend error', error);
      return res.status(502).json({ error: 'Couldn’t send right now. Try again?' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact: unexpected error', err);
    return res.status(500).json({ error: 'Something went wrong. Try again?' });
  }
}
