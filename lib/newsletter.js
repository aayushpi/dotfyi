import { Resend } from 'resend';
import { getNotesAfter, getOldestNoteDate } from './content';

const CADENCE_DAYS = Number(process.env.NEWSLETTER_CADENCE_DAYS || 14);
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aayush.fyi').replace(/\/$/, '');

// --- Email typography -------------------------------------------------------
// Web fonts only render in Apple Mail; everything else uses the fallbacks, so
// the stacks are ordered best -> web-safe and stay serif->serif / sans->sans.
const FONT_DISPLAY = "'Playfair Display', Georgia, 'Times New Roman', serif"; // note titles
const FONT_READING = "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, 'Times New Roman', serif"; // note bodies
const FONT_UI = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"; // labels/meta
const INK = '#22201d'; // strong but not pure black
const MUTED = '#6b6862';
const RULE = '#e7e4df';
const ACCENT = '#F98585';
const MAX_WIDTH = 600;

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export function getResend() {
  return new Resend(requireEnv('RESEND_API_KEY'));
}

// Path to a note, mirroring components/NoteRow.jsx noteUrl().
function noteUrl(note) {
  const d = new Date(note.date);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${SITE_URL}/notes/${year}/${month}/${note.slug}`;
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function formatMonthYear(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

function daysBetween(a, b) {
  return Math.abs(new Date(a).getTime() - new Date(b).getTime()) / 86400000;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Inspects existing broadcasts to decide whether to act.
// - pending: there is an unsent draft/queued broadcast (don't pile up another).
// - watermark: timestamp of the last *sent* broadcast, or the genesis date for the
//   very first run. We never fall back to "the beginning of time" — without a
//   genesis date we refuse to run, so the entire back catalogue can't be emailed.
export async function getNewsletterState() {
  const resend = getResend();
  const { data, error } = await resend.broadcasts.list();
  if (error) throw new Error(`Resend broadcasts.list failed: ${JSON.stringify(error)}`);

  // Scope to this newsletter's segment so other broadcasts can't pollute the
  // watermark / pending checks.
  const segmentId = process.env.RESEND_SEGMENT_ID;
  let broadcasts = data?.data || [];
  if (segmentId) broadcasts = broadcasts.filter((b) => b.segment_id === segmentId);

  const pending = broadcasts.some((b) => b.status === 'draft' || b.status === 'queued');

  const sent = broadcasts
    .filter((b) => b.status === 'sent' && b.sent_at)
    .sort((a, b) => (a.sent_at < b.sent_at ? 1 : -1));
  const lastSentAt = sent[0]?.sent_at || null;

  let watermark = lastSentAt;
  if (!watermark) {
    const genesis = process.env.NEWSLETTER_GENESIS_DATE;
    if (!genesis) {
      throw new Error(
        'No newsletter has been sent yet and NEWSLETTER_GENESIS_DATE is not set. ' +
          'Set it to your launch date (e.g. 2026-06-09) so the back catalogue is not emailed.'
      );
    }
    watermark = new Date(genesis).toISOString();
  }

  return { pending, lastSentAt, watermark };
}

function renderNote(note) {
  const meta = [note.creator, note.year].filter(Boolean).map(escapeHtml).join(', ');
  const url = noteUrl(note);

  return `
    <tr>
      <td class="rule" style="padding:40px 0;border-top:1px solid ${RULE};">
        <div class="meta" style="font-family:${FONT_UI};font-size:13px;letter-spacing:0.01em;color:${MUTED};margin-bottom:10px;">${formatDate(note.date)}${meta ? ` &middot; ${meta}` : ''}</div>
        <a class="title" href="${url}" style="font-family:${FONT_DISPLAY};font-size:28px;font-weight:800;line-height:1.18;letter-spacing:-0.015em;color:${INK};text-decoration:none;">${escapeHtml(note.title)}</a>
        <a class="permalink" href="${url}" aria-label="Read on aayush.fyi" style="font-family:${FONT_UI};font-size:14px;color:${INK};text-decoration:underline;text-underline-offset:2px;white-space:nowrap;">&nbsp;&nbsp;Read&nbsp;&#8599;</a>
        <div class="note-content" style="font-family:${FONT_UI};font-size:17px;line-height:1.7;color:${INK};margin-top:20px;">${note.contentHtml || ''}</div>
      </td>
    </tr>`;
}

// Builds the digest HTML. Notes render newest-first. The intro and footnote blocks
// are placeholders you edit in the Resend draft before sending.
// {{{RESEND_UNSUBSCRIBE_URL}}} is replaced by Resend per-recipient.
export function buildDigestHtml(notes, { sinceDate } = {}) {
  const rows = [...notes].reverse().map(renderNote).join(''); // latest -> oldest
  const since = sinceDate ? ` since ${formatMonthYear(sinceDate)}` : '';
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
    <style>
      /* Long-form reading body — only rendered by clients that honour <style>. */
      .note-content p { margin: 0 0 20px; }
      .note-content p:last-child { margin-bottom: 0; }
      .note-content a { color: ${INK}; text-decoration: underline; text-underline-offset: 2px; }
      .note-content em { font-style: italic; }
      .note-content strong { font-weight: 700; }
      .note-content blockquote {
        margin: 0 0 20px; padding: 2px 0 2px 18px; font-family: ${FONT_READING};
        border-left: 3px solid ${ACCENT}; color: ${MUTED}; font-style: italic;
      }
      .note-content h2, .note-content h3 {
        font-family: ${FONT_DISPLAY}; font-weight: 700; line-height: 1.3;
        color: ${INK}; margin: 28px 0 12px;
      }
      .note-content h2 { font-size: 22px; }
      .note-content h3 { font-size: 19px; }
      .note-content ul, .note-content ol { margin: 0 0 20px; padding-left: 24px; }
      .note-content li { margin: 0 0 8px; }
      .note-content hr { border: none; border-top: 1px solid ${RULE}; margin: 28px 0; }

      /* Dark mode — honoured mainly by Apple Mail (iOS/macOS). !important is needed
         to override the inline light-mode styles. */
      @media (prefers-color-scheme: dark) {
        .email-bg { background: #1b1916 !important; }
        .masthead, .title, .permalink, .note-content,
        .note-content h2, .note-content h3 { color: #ece8e1 !important; }
        .note-content a, .note-content strong { color: #ece8e1 !important; }
        .meta, .muted, .muted a, .footer, .footer a, .blurb { color: #a39d92 !important; }
        .note-content blockquote { color: #b8b2a8 !important; }
        .masthead a { color: #ece8e1 !important; }
        .rule { border-color: #3a3631 !important; }
        .panel { color: #ece8e1 !important; }
      }
    </style>
  </head>
  <body class="email-bg" style="margin:0;padding:0;background:#ffffff;-webkit-font-smoothing:antialiased;">
    <table class="email-bg" role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
      <tr>
        <td align="center" style="padding:48px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:${MAX_WIDTH}px;margin:0 auto;">
            <tr>
              <td>
                <div class="masthead" style="font-family:${FONT_UI};font-size:15px;color:${INK};">Aayush's <a href="${SITE_URL}/notes" style="color:${INK};text-decoration:underline;text-underline-offset:2px;">Notes &amp; Thoughts</a><span class="blurb" style="color:${MUTED};">${since}</span></div>
                <!-- INTRO: edit this block in the Resend draft before sending, or delete it. -->
                <div class="panel" style="font-family:${FONT_UI};font-size:17px;line-height:1.7;color:${INK};border-radius:8px;padding:16px 18px 16px 0px;margin-top:24px;">
                  ✏️ Write your intro here, or delete this block to send the digest on its own.
                </div>
              </td>
            </tr>
            ${rows}
            <tr>
              <td class="rule" style="padding:36px 0 0;border-top:1px solid ${RULE};">
                <!-- FOOTNOTE: edit this block in the Resend draft before sending, or delete it. -->
                <div class="panel" style="font-family:${FONT_UI};font-size:17px;line-height:1.7;color:${INK};border-radius:8px;padding:16px 18px 16px 0px;margin-top:24px;">
                  ✍️ Add a footnote here, or delete this block.
                </div>
              </td>
            </tr>
            <tr>
              <td class="footer" style="padding:28px 0 0;font-family:${FONT_UI};font-size:12px;color:${MUTED};line-height:1.7;">
                You're receiving this because you subscribed at <a href="${SITE_URL}/notes" style="color:${MUTED};">aayush.fyi/notes</a>.<br />
                <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:${MUTED};">Unsubscribe</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// Sends the author a heads-up that a draft is waiting for review.
async function notifyAuthor({ count, broadcastName }) {
  const to = process.env.NEWSLETTER_NOTIFY_TO;
  if (!to) return; // optional
  const resend = getResend();
  const subject = `Newsletter draft ready — ${count} note${count === 1 ? '' : 's'}`;
  await resend.emails.send({
    from: requireEnv('NEWSLETTER_FROM'),
    to,
    subject,
    html: `<p>A newsletter draft with <strong>${count}</strong> new note${count === 1 ? '' : 's'} is ready for review.</p>
           <p>Open <a href="https://resend.com/broadcasts">Broadcasts in Resend</a> — the draft <strong>"${escapeHtml(broadcastName)}"</strong> is at the top. Edit the intro/footnote, then send.</p>`,
  });
}

// Orchestrates one biweekly cycle. Returns a result describing what happened so the
// API route can log/return it. Creates a DRAFT broadcast (never auto-sends).
export async function runNewsletter() {
  const { pending, watermark, lastSentAt } = await getNewsletterState();

  if (pending) {
    return { action: 'skipped', reason: 'draft_pending' };
  }

  const daysSince = lastSentAt ? daysBetween(lastSentAt, Date.now()) : daysBetween(watermark, Date.now());
  if (daysSince < CADENCE_DAYS) {
    return { action: 'skipped', reason: 'too_soon', daysSince: Math.floor(daysSince), cadenceDays: CADENCE_DAYS };
  }

  const notes = await getNotesAfter(watermark);
  if (notes.length === 0) {
    return { action: 'skipped', reason: 'no_new_notes', since: watermark };
  }

  const resend = getResend();
  const segmentId = requireEnv('RESEND_SEGMENT_ID');
  const from = requireEnv('NEWSLETTER_FROM');
  const subject = `New notes from aayush.fyi — ${formatDate(Date.now())}`;

  const broadcastName = `Notes digest — ${new Date().toISOString().slice(0, 10)}`;
  const { data, error } = await resend.broadcasts.create({
    segmentId,
    from,
    subject,
    name: broadcastName,
    html: buildDigestHtml(notes, { sinceDate: getOldestNoteDate() }),
    // send omitted => created as a draft.
  });
  if (error) throw new Error(`Resend broadcasts.create failed: ${JSON.stringify(error)}`);

  await notifyAuthor({ count: notes.length, broadcastName });

  return { action: 'draft_created', broadcastId: data.id, noteCount: notes.length, since: watermark };
}
