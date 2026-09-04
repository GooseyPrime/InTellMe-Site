# InTellMe — parent company site

The public site for InTellMe: evidence-governed research, verification, and decision
infrastructure. Dark, static, and built to be read by investors and program officers.

Live: https://www.intellmeai.com

## Stack

Astro, static output, no client framework. The only JavaScript shipped is
`public/atmosphere.js` — sticky-nav state, the mobile drawer's focus trap, a scroll
reveal, and an optional cursor trace. Every route renders complete content with
JavaScript disabled.

- Fonts are self-hosted and subset in `public/assets/fonts/`. No `fonts.googleapis.com`.
- All imagery is local. **No runtime requests to Cloudinary or any other origin.**
- The only third-party request is the GA4 tag, loaded behind Consent Mode v2.
- One CSS system: `src/styles/tokens.css`, `site.css`, `rooms.css`.

## Commands

```
npm install
npm run dev      # local dev server
npm run build    # static build into dist/
npm run preview  # serve the build
npm run check    # Astro + TypeScript diagnostics
npm test         # investor request endpoint, against a fake req/res
npm run verify   # check + test + build, the same gate CI runs
```

CI runs `verify` on every pull request, confirms all eight pages rendered, and
scans the tree for committed credentials.

## Routes

| Route | File |
|-------|------|
| `/` | `src/pages/index.astro` |
| `/investors` | `src/pages/investors.astro` |
| `/investor-request-received` | `src/pages/investor-request-received.astro` |
| `/privacy` `/terms` `/refunds` `/accessibility` | `src/pages/*.astro` via `src/layouts/Legal.astro` |
| `/404` | `src/pages/404.astro` |
| `POST /api/investor-request` | `api/investor-request.js` (Vercel function) |

## Investor request form

A plain HTML POST, so it works without JavaScript. Configure in the Vercel project:

Delivery is Mailjet Send API v3.1, the sender already in use for the storefront.

| Variable | Required | Default |
|----------|----------|---------|
| `MJ_APIKEY_PUBLIC` | yes | — |
| `MJ_APIKEY_PRIVATE` | yes | — |
| `INVESTOR_INBOX` | no | `info@intellmeai.com` |
| `INVESTOR_FROM` | no | `no-reply@intellmeai.com` |

**`intellmeai.com` must be added and validated as a sending domain in Mailjet**, with
SPF and DKIM published, before this will deliver. Only `goldengoosetees.com` is
validated today. Add a DMARC record for `intellmeai.com` at the same time.

Without the two keys the endpoint returns 503 and points the sender at the direct
email address. It never accepts a request it cannot deliver.

## House rules

These are enforced by the design specification and should stay true:

- Dark only. No light-mode toggle.
- Champagne is jewelry, not paint — under about 2% of any viewport.
- Status badges use the exact language in the specification. No traffic-light colours.
- Validation is called validation. Pilots are called pilots. Nothing is described as
  production-proven, fraud-predictive, or commercially validated.
- The public portfolio is: InTellMe → TruVector, ResearchOne → SAVR, Golden Goose
  Tools, Golden Goose Tees Studio → wAether. Nothing else appears in nav, footer, sitemap,
  or meta.
- Never use the nav label "Our Apps."
- InTellMe is a trade name, not an entity. Never write "Inc.", "LLC", "Corp.", or
  anything implying incorporation, and never claim a team, customers, certifications,
  or benchmark numbers that do not exist.

Open items are tracked in [HOLDS.md](./HOLDS.md).
