import { runNewsletter } from '../../../lib/newsletter';

// Triggered by the Vercel cron defined in vercel.json. Vercel automatically sends
// `Authorization: Bearer <CRON_SECRET>` when CRON_SECRET is set in the project env.
// We also accept the same header for manual/local triggering.
export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error('newsletter/run: CRON_SECRET is not set');
    return res.status(500).json({ error: 'Not configured.' });
  }
  if (req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await runNewsletter();
    console.log('newsletter/run:', JSON.stringify(result));
    return res.status(200).json(result);
  } catch (err) {
    console.error('newsletter/run: failed', err);
    return res.status(500).json({ error: err.message });
  }
}
