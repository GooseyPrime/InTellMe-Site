# InTellMe — parent company site

The public site for InTellMe, a research and software company in Johnson City,
Tennessee. This page is the index: science, a checkpoint for AI that acts, and
the live products, each on its own site.

Live: https://www.intellmeai.com

## Stack

Astro, static output, no client framework. The only JavaScript shipped is
`public/atmosphere.js` — sticky-nav state, the mobile drawer's focus trap, a
scroll reveal, and an optional cursor trace. Every route renders complete
content with JavaScript disabled.

- Fonts are self-hosted and subset in `public/assets/fonts/`.
- All imagery is local.
- The only third-party request is the GA4 tag, loaded behind Consent Mode v2.
- One CSS system: `src/styles/tokens.css`, `site.css`, `rooms.css`.

## Commands

```
npm install
npm run dev
npm run build
npm run preview
npm run check
npm test
npm run verify
```

## Routes

| Route | File |
|-------|------|
| `/` | `src/pages/index.astro` |
| `/investors` | 301 to `/` |
| `/investor-request-received` | 301 to `/` |
| `/privacy` `/terms` `/refunds` `/accessibility` | `src/pages/*.astro` via `src/layouts/Legal.astro` |
| `/404` | `src/pages/404.astro` |

Nav and footer: Work, Company, Contact. No Investors link.

## Public portfolio on the homepage grid

Lane Vector, TruVector, ResearchOne, SAVR, wAether, Golden Goose Tools,
Golden Goose Tees Studio, NewJobBio, yoohoo.guru.

## House rules

- **Dark only.** No light-mode toggle.
- **Champagne is jewelry, not paint** — under about 2% of any viewport.
- **Describe the mechanism, never the stage.** No status badges, no roadmap, no
  phases, no launch dates, no "coming soon", no revenue or funding state, no
  headcount.
- **Nothing is described as production-proven, fraud-predictive, or commercially
  validated.**
- **InTellMe is a trade name, not an entity.** Never write "Inc.", "LLC",
  "Corp.", or anything implying incorporation.
