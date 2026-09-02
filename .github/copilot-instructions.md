# Repository instructions

This is the InTellMe parent company site: an Astro static build, dark only, no client
framework. Read `README.md` and `HOLDS.md` before changing anything.

Hard rules:

- No runtime requests to any third-party origin. Fonts, imagery, and scripts are local.
  The content security policy in `vercel.json` and `netlify.toml` enforces this.
- Every route must render complete content with JavaScript disabled. `public/atmosphere.js`
  is progressive enhancement only.
- Dark only. Use the tokens in `src/styles/tokens.css`; do not introduce new colours.
- Status badges use the exact wording already in the pages. Never colour-code them.
- The public portfolio is TruVector, ResearchOne, SAVR, Golden Goose Tools, Golden Goose
  Studio, and wAether. Do not add other product names to any page, the sitemap, or meta.
- Do not describe TruVector as production-proven, fraud-predictive, or commercially
  validated. Do not publish its capability list until `HOLDS.md` H4 is answered.
- Do not generate or substitute a logo. Missing marks stay typeset in Fraunces.
