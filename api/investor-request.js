/**
 * Investor materials request.
 *
 * Runs as a Vercel Node function at POST /api/investor-request.
 * The form on /investors is a plain HTML POST, so this path works with
 * JavaScript disabled: on success the browser is redirected (303) to
 * /investor-request-received.
 *
 * Delivery is Mailjet Send API v3.1, which is already in use for
 * goldengoosetees.com.
 *
 * Configuration (Vercel project environment variables):
 *   MJ_APIKEY_PUBLIC    required — Mailjet API key
 *   MJ_APIKEY_PRIVATE   required — Mailjet secret key
 *   INVESTOR_INBOX      optional — defaults to brandon@intellmeai.com
 *   INVESTOR_FROM       optional — defaults to no-reply@intellmeai.com
 *
 * The sending domain must be validated in Mailjet with SPF and DKIM before
 * this will deliver. intellmeai.com is not yet validated there.
 *
 * If the credentials are absent the endpoint fails closed with a 503 and
 * tells the sender to email directly. It never silently drops a request from
 * a person: the only submission discarded without delivery is one that filled
 * the hidden honeypot field, which a person cannot see. An unusually fast
 * submission is delivered and flagged rather than dropped, because browser
 * autofill legitimately produces one.
 *
 * Failures are answered in the format the client asked for. A browser posting
 * the form without JavaScript gets a readable HTML page with a way back, not
 * a JSON blob on a dead URL.
 */

const INBOX = process.env.INVESTOR_INBOX || 'brandon@intellmeai.com';
const FROM = process.env.INVESTOR_FROM || 'no-reply@intellmeai.com';
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

function wantsHtml(req) {
  return String(req.headers.accept || '').includes('text/html');
}

/**
 * A failure page that matches the site: same ground, same type stack, no
 * dependency on the built CSS, and always a way back to the form.
 */
function errorPage(message) {
  const safe = escapeHtml(message);
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Request not sent — InTellMe</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; min-height:100vh; display:grid; place-items:center; padding:32px;
         background:#0d0c0b; color:#f2ede4;
         font:16px/1.6 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif; }
  main { max-width:52ch; }
  h1 { font:400 30px/1.25 ui-serif,Georgia,"Times New Roman",serif; margin:0 0 20px; }
  p { margin:0 0 18px; color:#c8c0b3; }
  a { color:#e8c97a; }
  .back { display:inline-block; margin-top:14px; padding:12px 20px; border:1px solid #4a3f2c;
          border-radius:1px; color:#f2ede4; text-decoration:none; }
  .back:hover { border-color:#e8c97a; }
</style>
</head><body><main>
<h1>The request was not sent.</h1>
<p>${safe}</p>
<p>Nothing was lost — the details are still in the form if you go back, and email always works:
<a href="mailto:${INBOX}?subject=Investor%20materials">${INBOX}</a>.</p>
<a class="back" href="/investors#request">Back to the form</a>
</main></body></html>`;
}

function fail(req, res, status, message) {
  res.setHeader('Cache-Control', 'no-store');
  if (wantsHtml(req)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(status).send(errorPage(message));
  }
  return res.status(status).json({ error: message });
}

function done(res) {
  res.statusCode = 303;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Location', '/investor-request-received');
  return res.end();
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
    return fail(req, res, 405, 'This address only accepts the request form itself.');
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return fail(req, res, 400, 'The submission could not be read.');
  }

  // Honeypot: a person never fills a field they cannot see. Answer exactly as
  // a success looks, so a bot learns nothing about being caught.
  if (clean(body.company_website)) return done(res);

  // Speed is a signal, not a verdict. Browser autofill fills a form faster
  // than any person could type it, so a fast submission is delivered and
  // flagged for the reader rather than discarded.
  const started = Number(body._started);
  const fast = Number.isFinite(started) && started > 0 && Date.now() - started < MIN_FILL_MS;

  const name = clean(body.name);
  const email = clean(body.email);
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return fail(req, res, 400, 'A name and a valid email address are required.');
  }

  const fields = [
    ['Name', name],
    ['Email', email],
    ['Organization', clean(body.organization)],
    ['Role', clean(body.role)],
    ['Wants', clean(body.want)],
    ['Found via', clean(body.found)],
    ['Message', clean(body.message)],
    ['Note', fast ? 'Submitted unusually fast — autofill, or automated. Read with that in mind.' : '']
  ].filter(([, v]) => v);

  const key = process.env.MJ_APIKEY_PUBLIC;
  const secret = process.env.MJ_APIKEY_PRIVATE;
  if (!key || !secret) {
    return fail(req, res, 503,
      'The request form is not connected to email yet, so this would have gone nowhere.');
  }

  try {
    const response = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Messages: [{
          From: { Email: FROM, Name: 'InTellMe' },
          To: [{ Email: INBOX }],
          ReplyTo: { Email: email, Name: name },
          Subject: `Investor request — ${name}${fast ? ' [fast submission]' : ''}`,
          TextPart: fields.map(([k, v]) => `${k}: ${v}`).join('\n'),
          HTMLPart: fields
            .map(([k, v]) => `<p><strong>${escapeHtml(k)}</strong><br>${escapeHtml(v).replace(/\n/g, '<br>')}</p>`)
            .join(''),
          CustomID: 'investor-request'
        }]
      })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      throw new Error(`Mailjet returned ${response.status} ${detail.slice(0, 300)}`);
    }
    const body = await response.json().catch(() => null);
    const status = body && body.Messages && body.Messages[0] && body.Messages[0].Status;
    if (status && status !== 'success') throw new Error(`Mailjet status ${status}`);
  } catch (err) {
    console.error('investor-request delivery failed:', err && err.message);
    return fail(req, res, 502,
      'The message could not be delivered to the inbox, so it has not reached anyone.');
  }

  return done(res);
}
