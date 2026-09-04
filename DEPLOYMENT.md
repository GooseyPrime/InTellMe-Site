# Deployment

The site is a static Astro build. `npm run build` emits `dist/`.

## Vercel (primary)

`vercel.json` sets the framework preset, `cleanUrls`, security headers, and immutable
caching for fonts, logos, and imagery. The investor request endpoint in `api/` is
deployed as a Node function.

Before the first production deploy, set the project environment variables listed in the
README, otherwise the request form fails closed.

## Netlify (mirror)

`netlify.toml` sets the same build command, publish directory, and headers. The
`api/` function is Vercel-specific; on Netlify the form endpoint returns 404 and the
direct email address next to the submit button is the working path.

## GitHub Pages

**Not a deployment target.** `CNAME` has been removed from the repository. The apex and
`www` records point at Vercel; do not re-enable Pages for this repository.

## Content security policy

Both host configs ship the same policy. The only third-party origin allowed is Google
Tag Manager / Google Analytics, for the measurement tag:

- `script-src` — `https://www.googletagmanager.com`
- `connect-src` / `img-src` — `https://*.google-analytics.com`, `https://*.analytics.google.com`, `https://*.googletagmanager.com`

Everything else — styles, fonts, imagery — is same-origin. Adding any other external
embed requires editing the policy in **both** `vercel.json` and `netlify.toml`.

## Measurement

GA4 property `G-V8HDM5XF8J`, loaded by `public/analytics.js` with Consent Mode v2.
Analytics storage defaults to **denied** in the EEA, the UK and Switzerland and to
**granted** elsewhere; Google resolves the region server-side, so no geolocation call
is made. A visitor's explicit Allow/Decline overrides the default and is remembered in
their own browser.

**One setting must be confirmed in the GA4 console before launch:** Admin → Data
collection and modification → Data collection → **Google signals: off**, and
**Data sharing with Google products and services: off**. The site declares in its
privacy policy that these are off, so leaving them on would make that statement false.

## Verification before merge

Run these against a preview deployment:

1. Network tab shows **zero** requests to `res.cloudinary.com` or `fonts.googleapis.com`.
2. `/`, `/investors`, `/privacy`, `/terms`, `/refunds` render fully with JavaScript disabled.
3. Largest Contentful Paint is under 2.5 s on a throttled 4G profile.
4. `/.well-known/security.txt`, `/robots.txt`, and `/sitemap.xml` all resolve.
5. The investor form submits and redirects to `/investor-request-received`.
6. No retired product name appears in any page source, the sitemap, or any meta tag.
7. `/accessibility` resolves and the consent bar appears, then disappears once answered.
8. Google Signals and Google product data sharing are confirmed **off** in the GA4 console.
