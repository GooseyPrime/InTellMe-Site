# HOLDS — status against the site design specification v1.0

Second pass, after Brandon's answers of 3 September 2026. Everything resolved in this
round is marked **CLOSED** with what was done. What remains is short and specific.

---

## Closed this round

### H0 — Golden Goose Tees Studio vs Golden Goose Tees Studio — **CLOSED**
`goldengoosestudio.com` does not exist. The live storefront is `goldengoosetees.com`,
whose own page title reads *"Golden Goose Tees Studio — AI Custom Apparel Studio,"* and the
repository is `goldengoosetees-studio`. All three now reconcile on the site the same
way the product already describes itself:

> **Golden Goose Tees Studio** is the platform — AI design, Printful-integrated placement,
> mockup, checkout, fulfillment. **Golden Goose Tees Studio** is the first storefront built on it.

The badge moved from *Coming soon* to **Live**, and the room now carries a real button
to `goldengoosetees.com`. **Confirm:** is checkout actually taking live orders today? The
storefront says "order in minutes"; the environment file still has
`VITE_STRIPE_TEST_MODE=true`. If it is still in test mode the badge must go back to
*Launching* until it is not.

### H1 — Legal entity — **CLOSED**
Sole proprietor, no registered assumed name. Researched and resolved. Tennessee has
**no statewide assumed-name registration available to sole proprietors** — the
Secretary of State filing is only open to registered entities. Sole proprietors
register a trade name incidentally, through the county clerk's Business Tax License
Application. So there is nothing he has failed to file.

Using "InTellMe" publicly is lawful. A trade name is not a claim of entity status. What
is unlawful is implying a corporate form he does not have, so the site never writes
"Inc.", "LLC", "Corp.", or "Company" in that sense.

**The one story, used everywhere:**

> InTellMe is the trade name under which Michael Brandon Lane, a sole proprietor in
> Johnson City, Tennessee, develops and operates its products. Development to date has
> been self-funded. There is no outside capital, no debt, and no cap table.

That line, or a compression of it, now appears in the footer, in the Privacy Policy
(as controller identity), in the Terms (as the definition of "we"), and on the investor
page under Funding status. Contracts should be signed
**"Michael Brandon Lane d/b/a InTellMe."**

### H2 — Founder bio — **CLOSED**, subject to his edit
Written and live on `/investors`. It states only what is verifiable: chemical
engineering training, sole engineer, five products built and shipped self-funded in
public, GitHub handle, city. It names the gap — bandwidth, and no commercial
function — rather than hiding it. **Nothing invented: no employers, no degrees, no
years, no awards.**

### H3 — InTellMe mark — **decision put to Brandon**
Three candidates rendered at real sizes on the site ground; see the comparison sheet.
Recommendation is the gold triangle. The other four marks (InTellMe wordmark,
TruVector, Golden Goose Tees Studio, wAether) stay typeset in Fraunces until he supplies
originals, which he has said he will.

### Build decision 4 — Analytics — **CLOSED**
The InTellMe measurement ID was already in the old site's source and is confirmed real:
**`G-V8HDM5XF8J`**. It is installed in `public/analytics.js` with Consent Mode v2:
storage denied by default in the EEA/UK/Switzerland, granted elsewhere, with a quiet
consent bar that overrides either way and is remembered per browser. CSP updated in
both host configs to allow exactly the Google measurement origins and nothing else.

Other tags found while searching, for the record: ResearchOne `G-C9CW32EES7`,
SAVR `G-WXDLLPJ8T2`, yoohoo.guru `G-VVX0RHWEL0`.

**One console setting must be turned off before launch** — Google Signals, and data
sharing with Google products. The privacy policy states they are off.

### Build decision 5 — GitHub Pages — **CLOSED**
`CNAME` deleted from the repository root and from `public/`. `DEPLOYMENT.md` now says
Pages is not a deployment target.

### Build decision 1 — Legal pages — **CLOSED**
Researched against current law rather than guessed. Changes made:

- **A Do Not Track statement was missing and is legally required.** CalOPPA
  (Cal. B&P § 22575), Delaware DOPPA, and Nevada NRS 603A.340 apply with **no revenue,
  traffic, or entity threshold**, and all three require the site to state how it
  responds to DNT signals. Added, answered honestly.
- **Google Analytics is now disclosed by name**, with what it collects and links to
  Google's own policies. Required by the same statutes.
- **The CCPA and GDPR sections were rewritten.** The old ones promised formal rights
  machinery he is far below the thresholds to owe and does not operate — and under
  FTC Act § 5, a published promise you do not keep is itself a deceptive practice. The
  new sections say plainly that the thresholds are not met, that nothing is sold, and
  that anyone may email and get an answer within 45 days. That is a promise he can keep.
- **The arbitration clause and class-action waiver were removed.** For a sole
  proprietor with unlimited personal liability, mass arbitration is the larger threat:
  under AAA consumer rules the business pays nearly all the fees, and a coordinated
  campaign runs into seven figures before anyone reaches the merits. Replaced with
  Tennessee venue and a small-claims carve-out.
- **Subscription terms rewritten to ROSCA and California's amended ARL** (in force since
  1 July 2025, and it reaches any business with a California subscriber wherever it sits):
  cancellation online in no more steps than sign-up, advance notice of price changes,
  trial-conversion and annual-renewal reminders. *(The FTC "click to cancel" rule was
  vacated in full by the Eighth Circuit in July 2025 and never took effect; ROSCA and
  state law still bind, so the site is built to the standard anyway.)*
- **Shipping timeframes added** for physical goods, per the FTC Mail, Internet, or
  Telephone Order Merchandise Rule (16 C.F.R. 435) — the 30-day rule, the delay notice,
  and automatic cancellation and refund.
- **A new `/accessibility` page.** Not required, and the highest-value defensive page he
  can publish: web accessibility filings ran 3,117 in federal court in 2025, up 27%, and
  e-commerce is the single most-targeted category. A live statement with a named contact
  and a response commitment is what makes demand letters go away. Overlay widgets are
  explicitly not used — they are a litigation magnet and the FTC fined a vendor $1M for
  selling one as compliance.

**What is deliberately NOT on the site:** a "Do Not Sell My Personal Information" link,
a Notice at Collection, GPC signal handling, an EU Article 27 representative, a DPO, or
a Data Processing Addendum. He is below every threshold, and volunteering that machinery
creates enforceable promises with no legal benefit.

---

## Closed in the third pass

### H4 — TruVector capability statuses — **CLOSED and published**
Six capabilities, each with its own state, now live in the Technology section, with a
key explaining what each state obligates. One Implemented, two Under validation, one
Planned, two Hypothesis. A companion block, *Where this sits against published work*,
states the distinction from policy-gating approaches directly rather than waiting for a
reviewer to find the overlap themselves.

### Golden Goose Tees Studio badge — **corrected**
Stripe has always been in live mode, but the storefront has never been marketed, has no
testers, still has known failures, and has never taken an order. The badge is now
**Storefront in beta**, and both the homepage and the investor page say plainly that it
is open on live payments, unmarketed, and has not taken a first order. The investor
page's funding status no longer says anything is "charging" — it says pre-revenue
across every application, with two products able to take payment.

### Investor form delivery — **CLOSED**
Rewired to Mailjet Send API v3.1, the sender already used for the storefront. Needs
`MJ_APIKEY_PUBLIC` and `MJ_APIKEY_PRIVATE` in Vercel. **`intellmeai.com` is not yet a
validated sending domain in Mailjet** — only `goldengoosetees.com` is — so the domain
must be added with SPF and DKIM before this delivers. Add DMARC at the same time;
`goldengoosetees.com` still has no DMARC record either.

---

## Closed in the fourth pass — verification before the pull request

### The request form could strand a person — **CLOSED**
The form is a plain HTML POST so it works without JavaScript, but every failure
path answered with raw JSON. A visitor who mistyped an email landed on a blank
page showing `{"error":...}` at a dead URL, with no way back and their typing
gone. On the one page whose entire purpose is to be contacted, that was the worst
defect in the branch. Failures now answer in the format the client asked for: a
browser gets a readable page in the site's own type and colour, saying what
happened, linking back to the form, and giving the direct email address.

### The form could silently discard a real request — **CLOSED**
Any submission completed in under 2.5 seconds was dropped with a `204`, which a
browser renders as nothing happening at all. Browser autofill routinely fills a
name-and-email form faster than that, so a legitimate investor using autofill
could be discarded without either party knowing — while the file's own header
claimed it never silently drops a request. Speed is now treated as a signal
rather than a verdict: the message is delivered and flagged `[fast submission]`
so the reader can weigh it. The hidden honeypot field still discards, because a
person cannot fill a field they cannot see, and it now answers exactly as success
does so a bot learns nothing.

### The accessibility page promised contrast the site did not meet — **CLOSED**
`/accessibility` states a 4.5:1 minimum. Measured against the three page grounds,
three tokens missed it. The error colour was the serious one at **2.68:1** — used
as the border of an invalid form field, it failed even the 3:1 floor that applies
to a control's boundary, and it was the only cue that a field was wrong. A
published accessibility promise the site does not keep is the same FTC Act § 5
exposure as an unkept privacy promise, on the page most likely to be read by
someone looking for a claim. The error colour is now `#E5484D` — 4.5:1 on the
input ground, 5.0:1 on obsidian — the invalid state carries an inset edge as well
as a hue so it does not depend on colour vision, and legal list markers moved to a
token that clears AA. The decorative bullet is unchanged; it carries no meaning.

Everything else the page claims was checked rather than assumed: the skip link
exists, focus is visible, reduced motion is honoured, every image has an alt
attribute, no heading level is skipped on any page, and all content renders with
JavaScript disabled.

### Nothing verified the site before this — **CLOSED**
The repository had no tests and no CI. The request endpoint, the one piece of
running code in the project, had never been exercised. There are now 13 tests
covering method handling, the honeypot, autofill tolerance, validation, escaping
of submitted text into the outgoing email, failing closed without credentials,
and reporting an upstream mail failure honestly instead of as success. CI runs
type check, tests, and build on every pull request, confirms all eight pages
rendered, and scans the tree for committed credentials.

### Smaller corrections
The footer copyright year was hardcoded to 2026 and would have quietly gone stale;
it is computed at build time. The footer's GitHub handle was the only item in a row
of links that was not one; it is now a link. Every internal link and anchor was
resolved against the build, and each external product link was confirmed to answer.

---

## Still open

### H3 — the InTellMe mark — **closed: no symbol**
Two symbol directions were rejected, and the display serif was rejected for the
wordmark. The identity is now the name alone, set in the sans already used for body
text: clean, no ornament, no glyph. There is no logo file to maintain and nothing to
misread at small sizes.

The favicon and app icon are the wordmark's opening letters on the site ground, in the
same face. The social card carries the wordmark, not a mark.

Fraunces is unchanged for headings. It is only the wordmark that moved to the sans.

Brandon supplied the official lockups for **SAVR, Golden Goose Tools, and Golden Goose
Tees**. Each was keyed off its background to transparency, trimmed, and sized at three
densities. Because each lockup contains its own name, it now replaces the typeset
heading in that product room; the heading survives for screen readers and document
structure. Still outstanding: **TruVector** and **wAether**, which stay typeset.

### H5 — truvector.science
Confirmed. Investor and research oriented, with member access through to the Emma
backend, and no mention of any funding body. Page-by-page plan in the accompanying
message; build starts next, in the separate repository.

### H10 — Hero imagery — **CLOSED**
Brandon supplied the image: gold particle streaks curling from laminar into a
vortex on near-black — flow made visible, which is what the site argues for.

It was graded before shipping rather than dropped in as-is. Measured against the
hero veil, the raw frame put the headline at **2.85:1** where a bright streak
crossed it, and on small screens, where the copy spans nearly the full width, the
background was brighter than the text — **0.86:1**, unreadable. Three changes:
highlights roll toward candle instead of clipping to white (the palette has no
white), the left third is pulled down so the headline sits on near-black, and the
blown edge no longer bleeds off-frame. Small screens get an additional flat scrim
in CSS rather than a crushed image, so the picture survives at phone size.

Result: **6.45:1** on desktop and **6.03:1** on mobile at the worst pixel under any
line of copy, against a 4.5:1 requirement. The social card is cut from the same
frame.

---

## Two things that are not site work but should not wait

1. **Rotate the keys in `GoldenGooseTees Secrets.txt` on Google Drive.** It holds a
   **live Stripe secret key**, a Supabase service-role key, the Printful key, three
   model-provider keys, and a Google OAuth client secret, in plaintext, in a
   Drive-synced folder. The Stripe key is the urgent one — it can move money.
   Rotate all of them, then keep secrets in the Vercel and Supabase environment
   settings rather than in a file.

2. **Form the Tennessee LLC.** Around $300 to form and $300 a year to maintain. It
   converts unlimited personal liability into bounded business risk, it is what a
   business bank account and an SBA Company Registry entry both assume, and no
   investor will wire into a sole proprietorship. It costs less than one hour of the
   lawyer he does not have.
