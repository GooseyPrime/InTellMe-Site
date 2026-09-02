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
- One CSS system: `src/styles/tokens.css`, `site.css`, `rooms.css`.

## Commands

```
npm install
npm run dev      # local dev server
npm run build    # static build into dist/
npm run preview  # serve the build
npm run check    # Astro + TypeScript diagnostics
```

## Routes

| Route | File |
|-------|------|
| `/` | `src/pages/index.astro` |
| `/investors` | `src/pages/investors.astro` |
| `/investor-request-received` | `src/pages/investor-request-received.astro` |
| `/privacy` `/terms` `/refunds` | `src/pages/*.astro` via `src/layouts/Legal.astro` |
| `/404` | `src/pages/404.astro` |
| `POST /api/investor-request` | `api/investor-request.js` (Vercel function) |

## Investor request form

A plain HTML POST, so it works without JavaScript. Configure in the Vercel project:

| Variable | Required | Default |
|----------|----------|---------|
| `RESEND_API_KEY` | yes | — |
| `INVESTOR_INBOX` | no | `brandon@intellmeai.com` |
| `INVESTOR_FROM` | no | `InTellMe <no-reply@intellmeai.com>` |

Without `RESEND_API_KEY` the endpoint returns 503 and points the sender at the direct
email address. It never accepts a request it cannot deliver.

## House rules

These are enforced by the design specification and should stay true:

- Dark only. No light-mode toggle.
- Champagne is jewelry, not paint — under about 2% of any viewport.
- Status badges use the exact language in the specification. No traffic-light colours.
- Validation is called validation. Pilots are called pilots. Nothing is described as
  production-proven, fraud-predictive, or commercially validated.
- The public portfolio is: InTellMe → TruVector, ResearchOne → SAVR, Golden Goose
  Tools, Golden Goose Studio → wAether. Nothing else appears in nav, footer, sitemap,
  or meta.
- Never use the nav label "Our Apps."

Open items are tracked in [HOLDS.md](./HOLDS.md).
