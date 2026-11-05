#!/usr/bin/env python3
"""Habillage des vidéos de présentation (charte BA) : sous-titres + cartes animées.

Usage :
  python3 habillage.py config.py video_source.mp4 sortie_HD.mp4 [sortie_720p.mp4]

Le fichier de configuration définit :
  SUBS  = [(debut, fin, "texte avec **mots clés** en rose"), ...]
  CARDS = [(hauteur_px, debut, fin, fonction_dessin), ...]   # fonction(d, im, x, y)
Il peut utiliser les outils exportés ici : f(), VIO, DK, PK, WH, chk(), crs(), arr(), pill(), logo().
"""
import os, re, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1920, 1080
VIO, DK, PK, WH = (68, 49, 141), (32, 3, 90), (217, 63, 135), (255, 255, 255)
FONT = "/System/Library/Fonts/Avenir Next.ttc"
HERE = os.path.dirname(os.path.abspath(__file__))
LOGO = os.path.join(HERE, '..', 'src', 'assets', 'logo-ba.png')

_idx = {}
for i in range(16):
    try: _idx[ImageFont.truetype(FONT, 10, index=i).getname()[1]] = i
    except Exception: break

def f(size, style="Bold"):
    return ImageFont.truetype(FONT, size, index=_idx.get(style, 0))

# --- Petits éléments de dessin -------------------------------------------------
def chk(d, x, y, c=PK): d.line([(x + 2, y + 26), (x + 14, y + 38), (x + 34, y + 12)], fill=c, width=7)
def crs(d, x, y, c=PK): d.line([(x + 6, y + 8), (x + 30, y + 32)], fill=c, width=7); d.line([(x + 30, y + 8), (x + 6, y + 32)], fill=c, width=7)
def arr(d, x, y, c=DK): d.line([(x, y), (x + 26, y)], fill=c, width=5); d.polygon([(x + 24, y - 10), (x + 24, y + 10), (x + 40, y)], fill=c)
def pill(d, x, y, t, c, s=32):
    w = f(s).getlength(t); d.rounded_rectangle((x, y, x + w + 40, y + s + 24), 16, fill=c); d.text((x + 20, y + 6), t, font=f(s), fill=WH); return w + 40
def logo(im, x, y):
    lg = Image.open(LOGO).convert("RGBA"); lg.thumbnail((260, 90)); im.alpha_composite(lg, (x, y))

# --- Sous-titres -----------------------------------------------------------------
FS = None
def subtitle(text):
    global FS
    FS = FS or f(44, "Demi Bold")
    parts = re.split(r"(\*\*.*?\*\*)", text); segs = [(p.strip("*"), p.startswith("**")) for p in parts if p]
    tw = sum(FS.getlength(s) for s, _ in segs)
    if tw > 1700: print(f"  ⚠ sous-titre trop long ({int(tw)} px) : {text}")
    im = Image.new("RGBA", (W, H)); d = ImageDraw.Draw(im)
    x0 = (W - tw) / 2; y = 950
    d.rounded_rectangle((x0 - 36, y - 22, x0 + tw + 36, y + 70), radius=46, fill=DK + (225,))
    d.rounded_rectangle((x0 - 36, y - 22, x0 + tw + 36, y + 70), radius=46, outline=VIO + (255,), width=2)
    x = x0
    for s, hl in segs: d.text((x, y), s, font=FS, fill=PK if hl else WH); x += FS.getlength(s)
    return im

# --- Cartes ---------------------------------------------------------------------
def card(draw_fn, h):
    im = Image.new("RGBA", (W, H)); x0, y0, x1 = 1120, (1080 - h) // 2 - 70, 1800; y1 = y0 + h
    sh = Image.new("RGBA", (W, H)); ImageDraw.Draw(sh).rounded_rectangle((x0, y0 + 16, x1, y1 + 16), 40, fill=(32, 3, 90, 90))
    im.alpha_composite(sh.filter(ImageFilter.GaussianBlur(24))); d = ImageDraw.Draw(im)
    d.rounded_rectangle((x0, y0, x1, y1), 40, fill=(255, 255, 255, 215), outline=(68, 49, 141, 90), width=2)
    d.rounded_rectangle((x0 + 48, y0 + 48, x0 + 128, y0 + 56), 4, fill=PK)
    draw_fn(d, im, x0 + 48, y0 + 80)
    return im

# --- Rendu ----------------------------------------------------------------------
def render(cfg, src, out_hd, out_720=None):
    tmp = tempfile.mkdtemp(prefix="habillage_")
    layers = []
    for k, (a, b, t) in enumerate(cfg["SUBS"]):
        p = os.path.join(tmp, f"s{k:02d}.png"); subtitle(t).save(p); layers.append((a, b, p, 0.12))
    for k, (h, a, b, fn) in enumerate(cfg["CARDS"]):
        p = os.path.join(tmp, f"c{k}.png"); card(fn, h).save(p); layers.append((a, b, p, 0.35))
    ins, fc, prev = [], [], "0:v"
    for i, (a, b, p, fd) in enumerate(layers, 1):
        ins += ["-loop", "1", "-t", f"{b:.2f}", "-i", p]
        fc.append(f"[{i}:v]format=rgba,fade=in:st={a:.2f}:d={fd}:alpha=1,fade=out:st={b - fd:.2f}:d={fd}:alpha=1[o{i}]")
        fc.append(f"[{prev}][o{i}]overlay=enable='between(t,{a:.2f},{b:.2f})'[v{i}]"); prev = f"v{i}"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src] + ins + ["-filter_complex", ";".join(fc), "-map", f"[{prev}]", "-map", "0:a",
                    "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p", "-c:a", "copy", "-shortest", out_hd], check=True)
    if out_720:
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", out_hd, "-vf", "scale=1280:720", "-c:v", "libx264", "-crf", "23", "-preset", "slow",
                        "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", out_720], check=True)
    return tmp

if __name__ == "__main__":
    cfg_path, src, out_hd = sys.argv[1:4]; out_720 = sys.argv[4] if len(sys.argv) > 4 else None
    cfg = dict(f=f, VIO=VIO, DK=DK, PK=PK, WH=WH, chk=chk, crs=crs, arr=arr, pill=pill, logo=logo, Image=Image)
    exec(open(cfg_path, encoding="utf-8").read(), cfg)
    tmp = render(cfg, src, out_hd, out_720)
    print("ok ·", tmp)
