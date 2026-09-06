# Brand asset generation

The InTellMe mark and every icon derived from it are generated, not hand-drawn,
so the geometry is reproducible and auditable.

## The mark

Two circles of equal radius, drawn independently, overlapping. Only the region
where they agree carries colour. That is the company's subject matter — two
independent readings of the same claim, and the part you can rely on is the
part where they corroborate.

Geometry (user units): `r = 27`, centres at `x = 35` and `x = 65`, `cy = 37`,
stroke `5`, ivory `#F2EBE0`; the lens is champagne `#C6A36A`. Drawn bounds are
`89 x 59`.

## The stacked lockup

`build_lockup.py` extracts true glyph outlines for "InTellMe" from IBM Plex
Sans Medium — the same face the site sets its wordmark in — and solves for the
per-character tracking that makes the wordmark's advance width land exactly on
the mark's 89-unit width. At cap height 15.2 the required tracking is
`+0.003 em`, i.e. the wordmark justifies to the mark at essentially its natural
letterfit. The wordmark is emitted as paths, so the lockup carries no font
dependency.

## Scripts

| Script | Output |
| --- | --- |
| `build_lockup.py` | `public/assets/logos/intellme-lockup.svg` |
| `build_icons.py` | `public/assets/logos/intellme.svg`, `public/favicon.svg`, `public/favicon.ico`, `public/favicon-32.png`, `public/apple-touch-icon.png`, `public/icon-512.png` |
| `build_og.py` | `public/assets/imagery/og.jpg` |

They expect `fontTools`, `cairosvg` and `Pillow`, and resolve all inputs and
outputs relative to the repository root. Font sources are read from
`public/assets/fonts/` (WOFF2 or TTF). Outputs are committed; re-run only when
the mark or the wordmark changes.
