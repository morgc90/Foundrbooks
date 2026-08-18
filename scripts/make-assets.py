#!/usr/bin/env python3
"""
Generates the static brand assets referenced by public/index.html and the
Open Graph tags. These were referenced but missing from the repo, which meant
favicon/apple-touch-icon 404s and broken link previews on social platforms.

Run:  python3 scripts/make-assets.py
Outputs into public/: favicon.ico, logo192.png, logo512.png, og-image.png
"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(HERE, "..", "public")

NAVY = (4, 9, 26)
BLUE = (24, 95, 165)
LIGHT = (91, 163, 245)
WHITE = (255, 255, 255)

FONT_BOLD = "/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf"
FONT_MED = "/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf"
FONT_REG = "/usr/share/fonts/truetype/google-fonts/Poppins-Regular.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


def rounded_mask(size, radius):
    m = Image.new("L", (size, size), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    return m


def gradient(size, top, bottom):
    g = Image.new("RGB", (1, size))
    d = ImageDraw.Draw(g)
    for y in range(size):
        t = y / max(size - 1, 1)
        d.point((0, y), fill=tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)))
    return g.resize((size, size))


def make_icon(size):
    """Rounded-square app mark: blue gradient tile with white FB wordmark."""
    img = gradient(size, LIGHT, BLUE)
    img.putalpha(rounded_mask(size, int(size * 0.22)))

    d = ImageDraw.Draw(img)
    f = font(FONT_BOLD, int(size * 0.42))
    text = "FB"
    box = d.textbbox((0, 0), text, font=f)
    d.text(
        ((size - (box[2] - box[0])) / 2 - box[0], (size - (box[3] - box[1])) / 2 - box[1] - size * 0.03),
        text,
        font=f,
        fill=WHITE,
    )

    # Accent underline
    bar_w, bar_h = int(size * 0.26), max(int(size * 0.045), 2)
    bx = (size - bar_w) // 2
    by = int(size * 0.73)
    d.rounded_rectangle([bx, by, bx + bar_w, by + bar_h], radius=bar_h // 2, fill=NAVY)
    return img


def make_og():
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), NAVY)

    # Radial glow
    glow = Image.new("RGB", (W, H), NAVY)
    gd = ImageDraw.Draw(glow)
    gd.ellipse([W - 620, -300, W + 200, 380], fill=(20, 62, 120))
    gd.ellipse([-260, H - 340, 360, H + 220], fill=(12, 38, 78))
    img = Image.blend(img, glow.filter(ImageFilter.GaussianBlur(150)), 0.95)

    d = ImageDraw.Draw(img)

    # Faint grid
    for x in range(0, W, 52):
        d.line([(x, 0), (x, H)], fill=(14, 26, 52), width=1)
    for y in range(0, H, 52):
        d.line([(0, y), (W, y)], fill=(14, 26, 52), width=1)

    # Logo mark
    mark = make_icon(84)
    img.paste(mark, (80, 74), mark)

    d.text((184, 96), "FoundrBooks", font=font(FONT_BOLD, 34), fill=WHITE)

    # Headline
    f_h = font(FONT_BOLD, 66)
    d.text((80, 232), "Accounting built", font=f_h, fill=WHITE)
    d.text((80, 308), "for ", font=f_h, fill=WHITE)
    off = d.textlength("for ", font=f_h)
    d.text((80 + off, 308), "founders.", font=f_h, fill=LIGHT)

    # Subline
    d.text(
        (80, 412),
        "ACA-qualified accounting with a live AI tax assistant.",
        font=font(FONT_REG, 27),
        fill=(150, 168, 196),
    )

    # Chips
    x = 80
    for label in ["UK & Ireland", "Startups & SaaS", "Limited companies", "R&D tax credits"]:
        f = font(FONT_MED, 21)
        w = d.textlength(label, font=f)
        d.rounded_rectangle([x, 492, x + w + 40, 544], radius=26, outline=(46, 72, 118), width=2)
        d.text((x + 20, 503), label, font=f, fill=(178, 198, 226))
        x += w + 40 + 14

    # Accent rule
    d.rounded_rectangle([80, 596, 224, 602], radius=3, fill=LIGHT)
    return img


def main():
    os.makedirs(PUBLIC, exist_ok=True)

    for size in (192, 512):
        make_icon(size).save(os.path.join(PUBLIC, f"logo{size}.png"))

    master = make_icon(256)
    master.save(
        os.path.join(PUBLIC, "favicon.ico"),
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )

    make_og().save(os.path.join(PUBLIC, "og-image.png"), optimize=True)

    for name in ("favicon.ico", "logo192.png", "logo512.png", "og-image.png"):
        p = os.path.join(PUBLIC, name)
        print(f"  {name:<16} {os.path.getsize(p) / 1024:6.1f} kB")


if __name__ == "__main__":
    main()
