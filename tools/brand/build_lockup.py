#!/usr/bin/env python3
"""Build the InTellMe stacked lockup: corroboration mark above, wordmark below,
wordmark optically justified to the exact drawn width of the mark."""
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

IVORY = "#F2EBE0"
CHAMPAGNE = "#C6A36A"

# ---- mark geometry (user units) -------------------------------------------
R, SW = 27.0, 5.0
CX1, CX2, CY = 35.0, 65.0, 37.0
MARK_X0 = CX1 - R - SW / 2      # 5.5
MARK_X1 = CX2 + R + SW / 2      # 94.5
MARK_Y0 = CY - R - SW / 2       # 7.5
MARK_Y1 = CY + R + SW / 2       # 66.5
MARK_W = MARK_X1 - MARK_X0      # 89.0
MARK_H = MARK_Y1 - MARK_Y0      # 59.0

FONT = "/tmp/plexsans500.ttf"
TEXT = "InTellMe"


def wordmark_paths(cap_target):
    font = TTFont(FONT)
    upm = font["head"].unitsPerEm
    cap = font["OS/2"].sCapHeight
    gs = font.getGlyphSet()
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]

    names = [cmap[ord(c)] for c in TEXT]
    advances = [hmtx[n][0] for n in names]
    natural = sum(advances)

    scale = cap_target / cap                       # font units -> user units
    natural_w = natural * scale
    gaps = len(TEXT) - 1
    track = (MARK_W - natural_w) / gaps            # user units per gap
    track_em = track / scale / upm

    paths, pen_x = [], 0.0
    for n, adv in zip(names, advances):
        t = Transform(scale, 0, 0, -scale, pen_x, 0.0)   # flip y for SVG
        spen = SVGPathPen(gs)
        gs[n].draw(TransformPen(spen, t))
        d = spen.getCommands()
        if d:
            paths.append(d)
        pen_x += adv * scale + track
    pen_x -= track                                  # no trailing gap
    return paths, pen_x, track_em, cap_target


def build(cap_target, path):
    paths, width, track_em, cap = wordmark_paths(cap_target)
    gap = 15.0                                      # mark baseline -> cap top
    base_y = MARK_H + gap + cap                     # wordmark baseline
    total_h = base_y                                # descenders unused in "InTellMe"

    body = []
    body.append(f'<g transform="translate({-MARK_X0},{-MARK_Y0})">')
    body.append(f'<defs><clipPath id="lens">'
                f'<circle cx="{CX1}" cy="{CY}" r="{R}"/></clipPath></defs>')
    body.append(f'<circle cx="{CX2}" cy="{CY}" r="{R}" fill="{CHAMPAGNE}" '
                f'clip-path="url(#lens)"/>')
    for cx in (CX1, CX2):
        body.append(f'<circle cx="{cx}" cy="{CY}" r="{R}" fill="none" '
                    f'stroke="{IVORY}" stroke-width="{SW}"/>')
    body.append('</g>')
    body.append(f'<g transform="translate(0,{base_y})" fill="{IVORY}">')
    for d in paths:
        body.append(f'<path d="{d}"/>')
    body.append('</g>')

    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" '
           f'viewBox="0 0 {MARK_W:.4g} {total_h:.4g}" '
           f'width="{MARK_W:.4g}" height="{total_h:.4g}" '
           f'role="img" aria-label="InTellMe">\n  '
           + "\n  ".join(body) + "\n</svg>\n")
    open(path, "w").write(svg)
    print(f"{path}: cap {cap}  track {track_em:+.4f} em  "
          f"wordmark width {width:.2f} (target {MARK_W})  canvas {MARK_W}x{total_h:.2f}")


if __name__ == "__main__":
    import sys
    for cap in (15.2,):
        build(cap, '/home/claude/lockup/intellme-lockup.svg')
