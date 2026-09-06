#!/usr/bin/env python3
"""Regenerate the Open Graph card with the InTellMe mark in the brand lockup."""
from pathlib import Path
from tempfile import TemporaryDirectory
import io

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont
import cairosvg

W, H = 1200, 630
OBSIDIAN, IVORY, PARCH, STONE = "#0C0B0A", "#F2EBE0", "#D6CFC3", "#A59C90"
BRONZE = "#2A241C"
ROOT = Path(__file__).resolve().parents[2]
FONTS = ROOT / "public/assets/fonts"
MARK_SVG = ROOT / "public/assets/logos/intellme.svg"
OUT = ROOT / "public/assets/imagery/og.jpg"


def resolve_font(name, temp_dir):
    ttf = FONTS / f"{name}.ttf"
    if ttf.exists():
        return ttf
    woff2 = FONTS / f"{name}.woff2"
    if woff2.exists():
        converted = Path(temp_dir) / f"{name}.ttf"
        font = TTFont(woff2)
        font.flavor = None
        font.save(converted)
        return converted
    raise FileNotFoundError(f"Missing font asset for {name}")


with TemporaryDirectory() as temp_dir:
    display = ImageFont.truetype(resolve_font("fraunces-var", temp_dir), 62)
    body = ImageFont.truetype(resolve_font("plex-sans-400", temp_dir), 21)
    mono = ImageFont.truetype(resolve_font("plex-mono-500", temp_dir), 15)
    nav = ImageFont.truetype(resolve_font("plex-sans-500", temp_dir), 25)

    card = Image.new("RGB", (W, H), OBSIDIAN)
    grad = Image.new("L", (1, H))
    for y in range(H):
        grad.putpixel((0, y), int(16 * (1 - y / H)))
    card = Image.composite(Image.new("RGB", (W, H), "#141210"), card, grad.resize((W, H)))
    d = ImageDraw.Draw(card)

    MARK_H = 34
    png = cairosvg.svg2png(url=str(MARK_SVG), output_height=MARK_H * 4)
    mark = Image.open(io.BytesIO(png)).convert("RGBA")
    mark = mark.resize((round(mark.width / 4), MARK_H), Image.LANCZOS)
    x, y = 84, 74
    card.paste(mark, (x, y), mark)
    d.text((x + mark.width + 18, y + MARK_H / 2), "InTellMe", font=nav,
           fill=IVORY, anchor="lm")

    d.text((84, 268), "AI decisions should be traceable", font=display, fill=IVORY, anchor="ls")
    d.text((84, 348), "before they become consequential.", font=display, fill=IVORY, anchor="ls")

    d.line([(84, 400), (204, 400)], fill=BRONZE, width=2)
    d.text((84, 440), "Evidence-governed research, verification, and decision infrastructure.",
           font=body, fill=PARCH, anchor="ls")

    d.text((84, 552), "INTELLMEAI.COM", font=mono, fill=STONE, anchor="ls")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    card.save(OUT, quality=92, subsampling=0, optimize=True)
    card.resize((600, 315)).save(Path(__file__).with_name("og_new_preview.png"))
    print(OUT, card.size)
