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

`CNAME` is present at the repository root and in `public/` so it survives the build.
Publishing from the branch root no longer works, because the site is compiled rather
than hand-written. A Pages deployment needs a workflow that runs `npm ci && npm run
build` and publishes `dist/`.

## Content security policy

Both host configs ship the same policy: `default-src 'self'`, no third-party script,
style, font, image, or connect origins. Adding an analytics tag or any external
embed requires editing the policy in **both** `vercel.json` and `netlify.toml`.

## Verification before merge

Run these against a preview deployment:

1. Network tab shows **zero** requests to `res.cloudinary.com` or `fonts.googleapis.com`.
2. `/`, `/investors`, `/privacy`, `/terms`, `/refunds` render fully with JavaScript disabled.
3. Largest Contentful Paint is under 2.5 s on a throttled 4G profile.
4. `/.well-known/security.txt`, `/robots.txt`, and `/sitemap.xml` all resolve.
5. The investor form submits and redirects to `/investor-request-received`.
6. No banned product name appears in any page source, the sitemap, or any meta tag.
