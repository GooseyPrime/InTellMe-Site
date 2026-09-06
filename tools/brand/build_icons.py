#!/usr/bin/env python3
"""Emit mark-only SVG, favicon SVG (padded square) and the raster icon set."""
IVORY, CHAMPAGNE, OBSIDIAN = "#F2EBE0", "#C6A36A", "#0C0B0A"
R, SW, CX1, CX2, CY = 27.0, 5.0, 35.0, 65.0, 37.0
X0, Y0, W, H = 5.5, 7.5, 89.0, 59.0


def mark(uid, x=0.0, y=0.0):
    return "\n  ".join([
        f'<g transform="translate({x - X0},{y - Y0})">',
        f'<defs><clipPath id="{uid}"><circle cx="{CX1}" cy="{CY}" r="{R}"/></clipPath></defs>',
        f'<circle cx="{CX2}" cy="{CY}" r="{R}" fill="{CHAMPAGNE}" clip-path="url(#{uid})"/>',
        f'<circle cx="{CX1}" cy="{CY}" r="{R}" fill="none" stroke="{IVORY}" stroke-width="{SW}"/>',
        f'<circle cx="{CX2}" cy="{CY}" r="{R}" fill="none" stroke="{IVORY}" stroke-width="{SW}"/>',
        '</g>'])


# mark only, transparent — for the nav
open("intellme-mark.svg", "w").write(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
    f'width="{W}" height="{H}" role="img" aria-label="InTellMe">\n  '
    + mark("im-lens") + "\n</svg>\n")

# padded square on obsidian — for favicons and app icons
S, IW = 128.0, 108.0
k = IW / W
open("intellme-icon.svg", "w").write(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {S:g} {S:g}" '
    f'width="{S:g}" height="{S:g}" role="img" aria-label="InTellMe">\n'
    f'  <rect width="{S:g}" height="{S:g}" rx="26" fill="{OBSIDIAN}"/>\n'
    f'  <g transform="translate({(S-IW)/2:g},{(S-H*k)/2:.4g}) scale({k:.6g})">\n  '
    + mark("ic-lens") + "\n  </g>\n</svg>\n")
print("wrote intellme-mark.svg, intellme-icon.svg")
