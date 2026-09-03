// Exercises api/investor-request.js against a fake Vercel req/res.
import handler from '../api/investor-request.js';

function mkRes() {
  const r = {
    statusCode: 200, headers: {}, body: '', ended: false,
    setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
    status(c) { this.statusCode = c; return this; },
    json(o) { this.body = JSON.stringify(o); this.ended = true; return this; },
    send(s) { this.body = s; this.ended = true; return this; },
    end() { this.ended = true; return this; }
  };
  return r;
}
function mkReq(method, body, accept) {
  return { method, body, headers: { accept: accept || '*/*', 'content-type': 'application/json' } };
}

const results = [];
function check(name, cond, detail) {
  results.push({ name, ok: !!cond, detail: detail || '' });
}

// 1. GET from a browser -> HTML 405, not JSON
let res = mkRes();
await handler(mkReq('GET', {}, 'text/html,application/xhtml+xml'), res);
check('GET from browser returns readable HTML 405',
  res.statusCode === 405 && res.body.startsWith('<!doctype html') &&
  (res.headers['content-type'] || '').includes('text/html'),
  `status=${res.statusCode} ct=${res.headers['content-type']}`);

// 2. GET from an API client -> JSON
res = mkRes();
await handler(mkReq('GET', {}, 'application/json'), res);
check('GET from API client returns JSON 405',
  res.statusCode === 405 && res.body.startsWith('{'), `body=${res.body.slice(0, 60)}`);

// 3. Honeypot filled -> looks exactly like success
res = mkRes();
await handler(mkReq('POST', { company_website: 'x', name: 'Bot', email: 'b@b.co' }, 'text/html'), res);
check('honeypot answered as a normal success redirect',
  res.statusCode === 303 && res.headers.location === '/investor-request-received',
  `status=${res.statusCode} loc=${res.headers.location}`);

// 4. Missing email -> HTML 400 with a way back
res = mkRes();
await handler(mkReq('POST', { name: 'Ann' }, 'text/html'), res);
check('missing email returns HTML 400 linking back to the form',
  res.statusCode === 400 && res.body.includes('/investors#request'), `status=${res.statusCode}`);

// 5. Bad email shape rejected
res = mkRes();
await handler(mkReq('POST', { name: 'Ann', email: 'not-an-email' }, 'text/html'), res);
check('malformed email rejected', res.statusCode === 400, `status=${res.statusCode}`);

// 6. No credentials -> 503 that says so, never a silent success
delete process.env.MJ_APIKEY_PUBLIC;
delete process.env.MJ_APIKEY_PRIVATE;
res = mkRes();
await handler(mkReq('POST', { name: 'Ann', email: 'a@b.co' }, 'text/html'), res);
check('unconfigured mail fails closed with 503, not a fake success',
  res.statusCode === 503 && res.body.includes('not connected to email'), `status=${res.statusCode}`);

// 7. Fast submission is NOT dropped — it reaches the delivery stage
res = mkRes();
await handler(mkReq('POST',
  { name: 'Ann', email: 'a@b.co', _started: String(Date.now()) }, 'text/html'), res);
check('fast (autofill) submission is not silently dropped',
  res.statusCode === 503, `status=${res.statusCode} (503 = reached delivery, mail unconfigured)`);

// 8. Successful delivery redirects
process.env.MJ_APIKEY_PUBLIC = 'k';
process.env.MJ_APIKEY_PRIVATE = 's';
let sent = null;
globalThis.fetch = async (_u, opts) => {
  sent = JSON.parse(opts.body);
  return { ok: true, status: 200, json: async () => ({ Messages: [{ Status: 'success' }] }) };
};
res = mkRes();
await handler(mkReq('POST', { name: 'Ann', email: 'a@b.co', message: 'Hello' }, 'text/html'), res);
check('successful send redirects to the confirmation page',
  res.statusCode === 303 && res.headers.location === '/investor-request-received',
  `status=${res.statusCode}`);
check('reply-to is set to the requester so a reply reaches them',
  sent && sent.Messages[0].ReplyTo.Email === 'a@b.co');

// 9. Fast submission is flagged in the subject
res = mkRes();
await handler(mkReq('POST',
  { name: 'Ann', email: 'a@b.co', _started: String(Date.now()) }, 'text/html'), res);
check('fast submission delivered but flagged for the reader',
  res.statusCode === 303 && sent.Messages[0].Subject.includes('[fast submission]'),
  sent && sent.Messages[0].Subject);

// 10. HTML injection in a field cannot escape into the email body
res = mkRes();
await handler(mkReq('POST',
  { name: '<img src=x onerror=alert(1)>', email: 'a@b.co' }, 'text/html'), res);
check('field content is escaped in the HTML email part',
  !sent.Messages[0].HTMLPart.includes('<img'), sent.Messages[0].HTMLPart.slice(0, 80));

// 11. Upstream mail failure surfaces as an honest error, not a success
globalThis.fetch = async () => ({ ok: false, status: 500, text: async () => 'boom' });
res = mkRes();
await handler(mkReq('POST', { name: 'Ann', email: 'a@b.co' }, 'text/html'), res);
check('upstream mail failure reported honestly, not as success',
  res.statusCode === 502 && res.body.includes('has not reached anyone'), `status=${res.statusCode}`);

// 12. No response is cacheable
check('responses are marked no-store', res.headers['cache-control'] === 'no-store');

let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? '  — ' + r.detail : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
