#!/usr/bin/env python3
"""Emit mark-only SVG, favicon SVG (padded square) and the raster icon set."""
from pathlib import Path
import io

import cairosvg
from PIL import Image

IVORY, CHAMPAGNE, OBSIDIAN = "#F2EBE0", "#C6A36A", "#0C0B0A"
R, SW, CX1, CX2, CY = 27.0, 5.0, 35.0, 65.0, 37.0
X0, Y0, W, H = 5.5, 7.5, 89.0, 59.0
S, IW = 128.0, 108.0
ROOT = Path(__file__).resolve().parents[2]


def mark(uid, x=0.0, y=0.0, stroke=SW):
    return "\n  ".join([
        f'<g transform="translate({x - X0},{y - Y0})">',
        f'<defs><clipPath id="{uid}"><circle cx="{CX1}" cy="{CY}" r="{R}"/></clipPath></defs>',
        f'<circle cx="{CX2}" cy="{CY}" r="{R}" fill="{CHAMPAGNE}" clip-path="url(#{uid})"/>',
        f'<circle cx="{CX1}" cy="{CY}" r="{R}" fill="none" stroke="{IVORY}" stroke-width="{stroke}"/>',
        f'<circle cx="{CX2}" cy="{CY}" r="{R}" fill="none" stroke="{IVORY}" stroke-width="{stroke}"/>',
        '</g>'])


def mark_svg():
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
        f'width="{W}" height="{H}" role="img" aria-label="InTellMe">\n  '
        + mark("im-lens") + "\n</svg>\n"
    )


def icon_svg(stroke=SW):
    k = IW / W
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {S:g} {S:g}" '
        f'width="{S:g}" height="{S:g}" role="img" aria-label="InTellMe">\n'
        f'  <rect width="{S:g}" height="{S:g}" rx="26" fill="{OBSIDIAN}"/>\n'
        f'  <g transform="translate({(S-IW)/2:g},{(S-H*k)/2:.4g}) scale({k:.6g})">\n  '
        + mark("ic-lens", stroke=stroke) + "\n  </g>\n</svg>\n"
    )


def png_from_svg(svg_text, size):
    png = cairosvg.svg2png(bytestring=svg_text.encode("utf-8"), output_width=size, output_height=size)
    return Image.open(io.BytesIO(png)).convert("RGBA")


def main():
    mark_out = ROOT / "public/assets/logos/intellme.svg"
    fav_svg_out = ROOT / "public/favicon.svg"
    fav_ico_out = ROOT / "public/favicon.ico"
    fav_32_out = ROOT / "public/favicon-32.png"
    touch_out = ROOT / "public/apple-touch-icon.png"
    app_out = ROOT / "public/icon-512.png"

    mark_out.parent.mkdir(parents=True, exist_ok=True)
    mark_out.write_text(mark_svg(), encoding="utf-8")
    fav_svg_out.write_text(icon_svg(), encoding="utf-8")

    icon32 = png_from_svg(icon_svg(), 32)
    icon180 = png_from_svg(icon_svg(), 180)
    icon512 = png_from_svg(icon_svg(), 512)
    icon16 = png_from_svg(icon_svg(stroke=7.0), 16)

    icon32.save(fav_32_out)
    icon180.save(touch_out)
    icon512.save(app_out)
    icon16.save(fav_ico_out, format="ICO", sizes=[(16, 16)], append_images=[icon32])

    print("wrote", mark_out, fav_svg_out, fav_ico_out, fav_32_out, touch_out, app_out)


if __name__ == "__main__":
    main()
