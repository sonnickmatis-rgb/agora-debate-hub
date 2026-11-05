#!/usr/bin/env python3
"""Génère la plateforme AI Act BA.

  dist/web/AI_Act_BA.html                    version web (un fichier, les 4 niveaux)
  dist/scorm/AI_Act_BA_Niveau{N}_SCORM12.zip  un paquet SCORM 1.2 par niveau

Usage : python3 build.py
Les vidéos éventuelles se déposent dans src/videos/ (niveau{N}-module{M}.mp4
et .vtt) : elles sont alors incluses automatiquement.
"""
import base64, json, os, re, shutil, zipfile
from xml.sax.saxutils import escape

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC, DIST = os.path.join(ROOT, 'src'), os.path.join(ROOT, 'dist')
TITLES = {1: "Où est l'IA ?", 2: 'Qui est responsable ?', 3: 'Les lignes rouges', 4: 'Nos réflexes'}
TITLES_EN = {1: 'Where is AI?', 2: 'Who is responsible?', 3: 'The red lines', 4: 'Our reflexes'}


def scorm_title(n, lang):
    if lang == 'en': return 'AI Act · Final assessment' if n == 'F' else f'AI Act · Level {n} · {TITLES_EN[n]}'
    return 'AI Act · Évaluation finale' if n == 'F' else f'AI Act · Niveau {n} · {TITLES[n]}'
FONTS = [('Poppins', 400), ('Poppins', 500), ('Poppins', 600), ('Poppins', 700),
         ('Titillium Web', 400), ('Titillium Web', 600), ('Titillium Web', 700)]
JS = ['illus.js', 'content.js', 'quiz.js', 'en_content.js', 'en.js', 'scorm.js', 'app.js']

read = lambda p: open(os.path.join(SRC, p), encoding='utf-8').read()
fontfile = lambda fam, w: f"{fam.lower().replace(' ', '')}-{w}.woff2"


def font_css(inline):
    out = []
    for fam, w in FONTS:
        f = fontfile(fam, w)
        if inline:
            data = base64.b64encode(open(os.path.join(SRC, 'fonts', f), 'rb').read()).decode()
            url = f'data:font/woff2;base64,{data}'
        else:
            url = f'../fonts/{f}'
        out.append(f"@font-face{{font-family:'{fam}';font-style:normal;font-weight:{w};font-display:swap;src:url({url}) format('woff2')}}")
    return '\n'.join(out)


def videos():
    d = os.path.join(SRC, 'videos')
    return sorted(f for f in os.listdir(d) if f.endswith(('.mp4', '.vtt'))) if os.path.isdir(d) else []


VIDEO_README = """VIDÉOS DE PRÉSENTATION · AI Act BA
==================================

Chaque module commence par une courte vidéo de présentation (1 min 30 à 2 min).
Déposez les fichiers dans ce dossier avec exactement ces noms :

  niveau{N}-module1.mp4   et   niveau{N}-module2.mp4

Sous-titres (recommandé pour l'accessibilité) : même nom en .vtt
  niveau{N}-module1.vtt   et   niveau{N}-module2.vtt

Format conseillé : MP4 (H.264 + AAC), 1280×720, environ 5 à 10 Mo par minute.
Tant qu'un fichier est absent, le module affiche un emplacement « bientôt disponible ».

Pour un paquet SCORM : ajoutez les fichiers dans le dossier videos/ du zip
(ou dans src/videos/ puis relancez « python3 build.py »).
"""


def page(mode, level, inline, final=False, lang='fr'):
    tpl = read('index.template.html')
    css = font_css(inline) + '\n' + read('css/style.css')
    if inline:
        logo = 'data:image/png;base64,' + base64.b64encode(open(os.path.join(SRC, 'assets/logo-ba.png'), 'rb').read()).decode()
        style = f'<style>\n{css}\n</style>'
        scripts = '\n'.join(f'<script>\n{read("js/" + f)}\n</script>' for f in JS if not (mode == 'web' and f == 'scorm.js'))
    else:
        logo = 'assets/logo-ba.png'
        style = '<link rel="stylesheet" href="css/style.css">'
        scripts = '\n'.join(f'<script src="js/{f}"></script>' for f in JS)
    title = scorm_title('F' if final else level, lang) if (final or level) else "AI Act · L'essentiel · Blockchain AkademIA"
    return (tpl.replace('{{TITLE}}', title).replace('{{STYLE}}', style).replace('{{SCRIPTS}}', scripts)
               .replace('{{LOGO}}', logo).replace('{{CONFIG}}', json.dumps({'mode': mode, 'level': level, 'final': final, **({'lang': 'en'} if lang == 'en' else {})}))), css


def manifest(n, files, lang='fr'):
    t = escape(scorm_title(n, lang))
    items = '\n'.join(f'      <file href="{escape(f)}"/>' for f in files)
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="BA_AIACT_N{n}" version="2.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG_BA_AIACT_N{n}">
    <organization identifier="ORG_BA_AIACT_N{n}">
      <title>{t}</title>
      <item identifier="ITEM_N{n}" identifierref="RES_N{n}" isvisible="true">
        <title>{t}</title>
        <adlcp:masteryscore>80</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES_N{n}" type="webcontent" adlcp:scormtype="sco" href="index.html">
{items}
    </resource>
  </resources>
</manifest>
'''


def build_web():
    out = os.path.join(DIST, 'web')
    shutil.rmtree(out, ignore_errors=True); os.makedirs(os.path.join(out, 'videos'))
    html, _ = page('web', None, True)
    open(os.path.join(out, 'AI_Act_BA.html'), 'w', encoding='utf-8').write(html)
    open(os.path.join(out, 'videos', 'LISEZMOI.txt'), 'w', encoding='utf-8').write(VIDEO_README)
    for v in videos(): shutil.copy(os.path.join(SRC, 'videos', v), os.path.join(out, 'videos', v))
    print('web  ->', os.path.relpath(os.path.join(out, 'AI_Act_BA.html'), ROOT), f'({len(html) // 1024} Ko)')


def build_scorm(n, lang='fr'):
    final = n == 'F'
    folder = 'scorm_en' if lang == 'en' else 'scorm'
    stage = os.path.join(DIST, folder, f'_niveau{n}')
    shutil.rmtree(stage, ignore_errors=True)
    for d in ['css', 'js', 'fonts', 'assets', 'videos']: os.makedirs(os.path.join(stage, d))
    html, css = page('scorm', None if final else n, False, final, lang)
    open(os.path.join(stage, 'index.html'), 'w', encoding='utf-8').write(html)
    open(os.path.join(stage, 'css', 'style.css'), 'w', encoding='utf-8').write(css)
    for f in JS: shutil.copy(os.path.join(SRC, 'js', f), os.path.join(stage, 'js', f))
    for fam, w in FONTS: shutil.copy(os.path.join(SRC, 'fonts', fontfile(fam, w)), os.path.join(stage, 'fonts'))
    shutil.copy(os.path.join(SRC, 'assets', 'logo-ba.png'), os.path.join(stage, 'assets'))
    open(os.path.join(stage, 'videos', 'LISEZMOI.txt'), 'w', encoding='utf-8').write(VIDEO_README)
    for v in videos():
        if v.startswith(f'niveau{n}-') and (('-en.' in v) == (lang == 'en')): shutil.copy(os.path.join(SRC, 'videos', v), os.path.join(stage, 'videos', v))
    files = sorted(os.path.relpath(os.path.join(dp, f), stage).replace(os.sep, '/')
                   for dp, _, fs in os.walk(stage) for f in fs)
    open(os.path.join(stage, 'imsmanifest.xml'), 'w', encoding='utf-8').write(manifest(n, files, lang))
    if lang == 'en': name = 'AI_Act_BA_Final_assessment_SCORM12_EN.zip' if final else f'AI_Act_BA_Level{n}_SCORM12_EN.zip'
    else: name = 'AI_Act_BA_Evaluation_finale_SCORM12.zip' if final else f'AI_Act_BA_Niveau{n}_SCORM12.zip'
    z = os.path.join(DIST, folder, name)
    if os.path.exists(z): os.remove(z)
    with zipfile.ZipFile(z, 'w', zipfile.ZIP_DEFLATED) as zf:
        zf.write(os.path.join(stage, 'imsmanifest.xml'), 'imsmanifest.xml')
        for f in files: zf.write(os.path.join(stage, f), f)
    shutil.rmtree(stage)
    print(f'scorm -> {os.path.relpath(z, ROOT)} ({os.path.getsize(z) // 1024} Ko, {len(files) + 1} fichiers)')


if __name__ == '__main__':
    os.makedirs(os.path.join(DIST, 'scorm'), exist_ok=True); os.makedirs(os.path.join(DIST, 'scorm_en'), exist_ok=True)
    build_web()
    for n in (1, 2, 3, 4, 'F'): build_scorm(n)
    for n in (1, 2, 3, 4, 'F'): build_scorm(n, 'en')
