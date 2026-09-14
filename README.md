# InTellMe — parent company site

The public site for InTellMe. The company builds systems that check whether
something is true before acting on it, and the products that come out of that.
Dark, static, and written to be read by someone deciding whether to take the
work seriously.

Live: https://www.intellmeai.com

## Stack

Astro, static output, no client framework. The only JavaScript shipped is
`public/atmosphere.js` — sticky-nav state, the mobile drawer's focus trap, a
scroll reveal, and an optional cursor trace. Every route renders complete
content with JavaScript disabled.

- Fonts are self-hosted and subset in `public/assets/fonts/`. No
  `fonts.googleapis.com`.
- All imagery is local. **No runtime requests to Cloudinary or any other
  origin.**
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

A plain HTML POST, so it works without JavaScript. Delivery is Mailjet Send API
v3.1. Configure in the Vercel project:

| Variable | Required | Default |
|----------|----------|---------|
| `MJ_APIKEY_PUBLIC` | yes | — |
| `MJ_APIKEY_PRIVATE` | yes | — |
| `INVESTOR_INBOX` | no | `info@intellmeai.com` |
| `INVESTOR_FROM` | no | `no-reply@intellmeai.com` |

The sending domain must be added and validated in Mailjet, with SPF, DKIM and
DMARC published, before this will deliver. Check the Mailjet dashboard for the
current state of each domain — which domains are or are not yet configured is
not recorded here, because this repository is public and that list would say
which of them can be spoofed.

Without the two keys the endpoint returns 503 and points the sender at the
direct email address. It never accepts a request it cannot deliver.

## House rules

- **Dark only.** No light-mode toggle.
- **Champagne is jewelry, not paint** — under about 2% of any viewport.
- **Describe the mechanism, never the stage.** No status badges, no roadmap, no
  phases, no launch dates, no "coming soon", no revenue or funding state, no
  headcount. Projects are listed as active projects and nothing further. Status
  belongs only in a document sent directly to a funding body or an investor —
  never on a public page and never in this repository.
- **Nothing is described as production-proven, fraud-predictive, or commercially
  validated.** Do not write that a pilot, a customer, a team, a certification or
  a benchmark exists unless it does, and publish no benchmark number without the
  protocol beside it.
- **Science first.** The research is the subject; applications are consequences
  of it and come after it. It is never presented as having originated in
  marketing or search work.
- **No internal business detail.** Nothing about what has or has not shipped,
  sold, been filed, been declined, or been staffed.
- **Vocabulary.** "Statement" for a single assertion, "story" for something
  spreading, "retrieved material" for what a system looked up. The words *claim*,
  *evidence*, *evidentiary*, *assertion*, *witness*, *arbitration* and *lineage*
  are not used — they come from a courtroom, and the reader spends their
  attention decoding the metaphor instead of understanding the product.
- **The public portfolio** is: InTellMe → TruVector, ResearchOne → SAVR, Golden
  Goose Tools, Golden Goose Tees Studio → wAether. Nothing else appears in nav,
  footer, sitemap or meta.
- Never use the nav label "Our Apps."
- **InTellMe is a trade name, not an entity.** Never write "Inc.", "LLC",
  "Corp.", or anything implying incorporation.

## A note on what does not go in this repository

This repository is public. Working status, open items, funding or revenue state,
legal-entity particulars, consolidated analytics IDs, and anything describing
where credentials are kept or which protections are missing all belong in a
private document, not here — and not in a file that is later deleted, because a
public repository keeps its history.
