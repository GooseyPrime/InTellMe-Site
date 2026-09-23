# Archived — investor request endpoint

Archived 2026-09-23. Not part of the live parent site.

The public `/investors` page 301s to `/`. There is no form. The Vercel
function and its unit test were removed from `api/` and `test/` so they are
not deployed.

Retrieve the last live copies from git history:

- `api/investor-request.js`
- `test/investor-request.test.mjs`

Last commit that still had the live function on this branch: parent of the
"Remove live investor-request function" commit.

Do not put these files back under `api/` unless the investor page is rebuilt.
