# HOLDS — status against the site design specification v1.0

This file tracks every item the design specification marked HOLD-FOR-BRANDON,
plus the decisions taken during the build that need sign-off before deployment.
Nothing in the site invents a fact. Where a fact was not confirmed on a live
public page, in a public repository, or in this file, it was left out.

---

## Resolved from public evidence

| ID | Hold | Resolution | Evidence |
|----|------|-----------|----------|
| H6 | ResearchOne early-access destination | `https://www.researchone.io/`. The live site has Sign In, Start Research, and public pricing, so the default destination in the spec is correct. | researchone.io, researchone.io/pricing |
| H7 | Raise amount and numeric use of funds | Not published. Use-of-funds is shown as four categories with no dollar target, exactly as the spec directs. | — |
| H8 | Milestone calendar dates | Not published. The timeline reads as sequence, with a caption saying dates are published when they are committed. | — |
| H9 | Studio mark vs Tools lockup | Tools uses its own official crest; Studio is typeset. They no longer share a lockup. | — |
| H11 | Whether SAVR's parent badge upgrades | Kept as "Launching — web beta and Android testing" per the spec's badge table. savr.cam is a live marketing site with no app-store link published. | savr.cam |
| H12 | Licensed display face | Shipped Fraunces (SIL OFL), self-hosted and subset. PP Editorial New / Canela remain an optional upgrade and are not blocking. | — |

Also confirmed while auditing, and reflected in the build:

- **goldengoosestudio.com is a parked GoDaddy placeholder.** Studio therefore ships
  with no Visit button, which is what the spec requires until a URL exists.
- **Golden Goose Tools pricing** is free audit + $29 once for the complete list with
  fixes, confirmed on the live page.
- **wAether pricing** is $4.99/month or $49.99/year, and the named sources are
  NOAA SWPC, USGS, NASA DONKI, and NOAA OVATION, confirmed on the live page.

---

## Still open — needed from Brandon

### H1 — Legal entity name, formation state, registered address
Not found on any live public page, in the repository, or in the current legal pages.
The footer therefore reads `© 2026 InTellMe` with no "Inc." and no state of
incorporation, and the legal pages name no entity.

**Needed:** the registered legal name and state, if one exists, so the footer and the
legal pages can name it. If there is no registered entity yet, say so and the site
stays exactly as it is — that is a defensible position for a pre-revenue company.

### H2 — Degrees, prior employers, awards, advisors, customers, revenue, user counts
Deliberately omitted. The founder section stops at name, city, GitHub handle, and
email. The funding section states plainly that development to date has been
self-funded and that the company is pre-revenue.

**Needed:** nothing, unless you want any of it added. Anything added here has to be
verifiable.

### H3 — Official marks
| Mark | Status | Source |
|------|--------|--------|
| InTellMe | **Shipped** | `assets/intellmeoptionnobr (Custom).png` (512², drawn for dark) |
| InTellMe wordmark | **Typeset** in Fraunces 500 | no file found |
| TruVector | **Typeset** | only a generic green shield placeholder exists (`GooseyPrime/truvector/public/truvector-logo.svg`); not shipped |
| ResearchOne | **Shipped** as clean SVG | the "Contradiction Ring" from `researchone.io/og-image.svg`, redrawn as a standalone currentColor mark |
| SAVR | **Shipped** as clean SVG | the official mark from the live `savr.cam` favicon (256²), redrawn for dark |
| Golden Goose Tools | **Shipped** | the 8000² official PNG, converted to a monochrome ivory crest; the lockup's own wordmark was cropped because the heading already names the product |
| Golden Goose Studio | **Typeset** | no mark exists; the domain is parked |
| wAether | **Typeset** | the only lockup found says "The wAether App" and is drawn for light; using it would contradict the naming rule |

**Needed:** high-resolution originals — SVG preferred — for **InTellMe wordmark,
TruVector, Golden Goose Studio, and wAether**. Production must not ship a generated
logo, so those four stay typeset until you supply them.

**One decision:** the repository's "primary" InTellMe logo is the full-colour rainbow
mark used on the current site. It is drawn for a light ground and fights the
obsidian-and-champagne palette. The gold triangle (`intellmeoptionnobr`) is drawn for
dark and is what is shipped in the nav, favicon, and OG image. Confirm or overrule.

### H4 — TruVector capability statuses
Unresolved. The public TruVector documents describe the architecture but never label
Quorum, contradiction and divergence, independence-aware evidence, AHE/HRA, or
kinematic validation as Implemented / Under validation / Planned / Hypothesis.

Per the specification, **the capability list is not published**. The Technology room
ships the lede, the three decision states, and the body paragraph only.

**Needed:** the four-way label for each capability before that list can go live.

### H5 — Public URL for TruVector
Partially resolved. `truvector.science` resolves, and `GooseyPrime/truvector` declares
it as `og:url`. That repository is a login-gated multi-page React app containing
InTellMe, TruVector Overview, Technical Architecture, Emma Placement, and For
Investors pages. The host did not return a response during this audit.

TruVector is **not linked out** from the new site. Its call to action points at the
gated technical brief request on `/investors#request`, which is what the specification
asks for.

**Needed:** confirm whether `truvector.science` is the intended public destination, and
whether it should be linked from the Technology room.

### H10 — Commissioned hero photography
The hero currently uses an abstract material study generated for this build:
a layered warm gradient field, one champagne edge, and fine grain, 2400×1350 WebP at
56 KB. It is not stock, not a generated image of a subject, and not a logo — it is a
material texture, which the specification's imagery direction permits.

**Needed:** commissioned photography or a material still, if you want one. The current
still is production-safe as-is.

---

## Build decisions that need sign-off

1. **Legal pages were rewritten to cover "InTellMe and its products and services"
   generically.** The old pages enumerated eleven products, most of which are on the
   specification's ban list, and the definition of done requires no banned product
   names anywhere in the HTML. Every substantive clause was preserved — data
   collection, sharing, retention, rights, CCPA, GDPR, acceptable use, IP, payment,
   termination, disclaimers, limitation of liability, indemnity, arbitration, class
   action waiver, export controls, the 14-day defect window, EU withdrawal, California
   1723 and 1789.3 — only the product enumeration is gone. A general clause is also
   more robust than a list that can omit a product. **Have counsel confirm before
   merge.**

2. **Governing law now names Tennessee.** The old Terms said "the State in which
   InTellMe is headquartered," which is not a usable choice-of-law clause. Johnson
   City, Tennessee is confirmed by the specification and the footer. Confirm.

3. **The investor request form needs one environment variable.** The form is a plain
   HTML POST to `/api/investor-request`, so it works with JavaScript disabled. Set
   `RESEND_API_KEY` in the Vercel project (optionally `INVESTOR_INBOX` and
   `INVESTOR_FROM`). Until it is set the endpoint fails closed with a message pointing
   at `brandon@intellmeai.com`, which is also shown next to the submit button. It never
   silently drops a request. The honeypot and a 2.5-second time trap are active.

4. **Analytics is not installed.** `G-V8HDM5XF8J` was a hold, and the content security
   policy currently allows scripts from this origin only. Adding a measurement tag
   means adding that host to `script-src` and `connect-src` in both `vercel.json` and
   `netlify.toml`.

5. **`CNAME` is duplicated into `public/`** so it survives the build on any host. If
   GitHub Pages is still a deployment target it now needs a build workflow, because the
   site is no longer a single hand-written `index.html`.

6. **Removed from the repository:** the old `index.html`, `styles.css`, `script.js`,
   the three legal pages, the particle canvas component, the Yoohoo assets, the 13 MB
   Golden Goose Tools raster, `BRAND_PACK.md` (its tokens are all superseded),
   `CONSOLE_ERRORS_CLARIFICATION.md`, `_headers`, and `.htaccess`.
