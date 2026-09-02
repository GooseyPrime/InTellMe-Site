/**
 * Investor materials request.
 *
 * Runs as a Vercel Node function at POST /api/investor-request.
 * The form on /investors is a plain HTML POST, so this path works with
 * JavaScript disabled: on success the browser is redirected (303) to
 * /investor-request-received.
 *
 * Configuration (Vercel project environment variables):
 *   RESEND_API_KEY    required — API key for the transactional sender
 *   INVESTOR_INBOX    optional — defaults to brandon@intellmeai.com
 *   INVESTOR_FROM     optional — defaults to no-reply@intellmeai.com
 *
 * If RESEND_API_KEY is absent the endpoint fails closed with a 503 and
 * tells the sender to email directly. It never silently drops a request.
 */

const INBOX = process.env.INVESTOR_INBOX || 'brandon@intellmeai.com';
const FROM = process.env.INVESTOR_FROM || 'InTellMe <no-reply@intellmeai.com>';
const MIN_FILL_MS = 2500;
const MAX_FIELD = 4000;

function clean(value) {
  return String(value == null ? '' : value).slice(0, MAX_FIELD).trim();
}

function escapeHtml(value) {
  return clean(value).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const raw = await new Promise((resolve, reject) => {
    let buf = '';
    req.on('data', (c) => {
      buf += c;
      if (buf.length > 64 * 1024) reject(new Error('payload too large'));
    });
    req.on('end', () => resolve(buf));
    req.on('error', reject);
  });
  const type = String(req.headers['content-type'] || '');
  if (type.includes('application/json')) return JSON.parse(raw || '{}');
  return Object.fromEntries(new URLSearchParams(raw));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return res.status(400).json({ error: 'Malformed request.' });
  }

  // Honeypot: a real person never fills a field they cannot see.
  if (clean(body.company_website)) return res.status(204).end();

  // Time trap: a form completed faster than a person can read it is a bot.
  const started = Number(body._started);
  if (Number.isFinite(started) && started > 0 && Date.now() - started < MIN_FILL_MS) {
    return res.status(204).end();
  }

  const name = clean(body.name);
  const email = clean(body.email);
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'A name and a valid email address are required.' });
  }

  const fields = [
    ['Name', name],
    ['Email', email],
    ['Organization', clean(body.organization)],
    ['Role', clean(body.role)],
    ['Wants', clean(body.want)],
    ['Found via', clean(body.found)],
    ['Message', clean(body.message)]
  ].filter(([, v]) => v);

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({
      error: 'The request form is not configured to send yet. Please email ' + INBOX + ' directly.'
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM,
        to: [INBOX],
        reply_to: email,
        subject: `Investor request — ${name}`,
        text: fields.map(([k, v]) => `${k}: ${v}`).join('\n'),
        html: fields
          .map(([k, v]) => `<p><strong>${escapeHtml(k)}</strong><br>${escapeHtml(v).replace(/\n/g, '<br>')}</p>`)
          .join('')
      })
    });
    if (!response.ok) throw new Error(`sender returned ${response.status}`);
  } catch (err) {
    console.error('investor-request delivery failed:', err && err.message);
    return res.status(502).json({
      error: 'The request could not be delivered. Please email ' + INBOX + ' directly.'
    });
  }

  res.statusCode = 303;
  res.setHeader('Location', '/investor-request-received');
  return res.end();
}
