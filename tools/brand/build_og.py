#!/usr/bin/env python3
"""Regenerate the Open Graph card with the InTellMe mark in the brand lockup."""
from PIL import Image, ImageDraw, ImageFont
import cairosvg, io

W, H = 1200, 630
OBSIDIAN, IVORY, PARCH, STONE = "#0C0B0A", "#F2EBE0", "#D6CFC3", "#A59C90"
BRONZE = "#2A241C"

card = Image.new("RGB", (W, H), OBSIDIAN)
# soft vertical lift, matching the site's wet-stone gradient
grad = Image.new("L", (1, H))
for y in range(H):
    grad.putpixel((0, y), int(16 * (1 - y / H)))
card = Image.composite(Image.new("RGB", (W, H), "#141210"), card, grad.resize((W, H)))
d = ImageDraw.Draw(card)

display = ImageFont.truetype("/tmp/fr144_500.ttf", 62)
body = ImageFont.truetype("/tmp/plexsans400.ttf", 21)
mono = ImageFont.truetype("/tmp/plexmono500.ttf", 15)
nav = ImageFont.truetype("/tmp/plexsans500.ttf", 25)

# brand lockup, top left: mark then wordmark on a shared optical baseline
MARK_H = 34
png = cairosvg.svg2png(url="intellme-mark.svg", output_height=MARK_H * 4)
mark = Image.open(io.BytesIO(png)).convert("RGBA")
mark = mark.resize((round(mark.width / 4), MARK_H), Image.LANCZOS)
x, y = 84, 74
card.paste(mark, (x, y), mark)
d.text((x + mark.width + 18, y + MARK_H / 2), "InTellMe", font=nav,
       fill=IVORY, anchor="lm")

# headline
d.text((84, 268), "AI decisions should be traceable", font=display, fill=IVORY, anchor="ls")
d.text((84, 348), "before they become consequential.", font=display, fill=IVORY, anchor="ls")

# rule + subline
d.line([(84, 400), (204, 400)], fill=BRONZE, width=2)
d.text((84, 440), "Evidence-governed research, verification, and decision infrastructure.",
       font=body, fill=PARCH, anchor="ls")

d.text((84, 552), "INTELLMEAI.COM", font=mono, fill=STONE, anchor="ls")

card.save("og.jpg", quality=92, subsampling=0, optimize=True)
card.resize((600, 315)).save("og_new_preview.png")
print("og.jpg", card.size)
