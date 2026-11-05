# Niveau 1 · Module 1 · Reconnaître une IA · version française NSI
# Texte : Scripts_Videos_Modules.md (version NSI du 5 novembre 2026).
# TIMINGS PROVISOIRES : calculés au nombre de mots (2,5 mots/s). À recaler sur la voix avec Whisper
# dès que la vidéo existe (remplacer LIGNES par des tuples (début, fin, texte)).

LIGNES = [
    "Bonjour et bienvenue dans cette formation sur l'**AI Act**,",
    "le règlement européen sur l'**intelligence artificielle**.",
    "Commençons par une question simple :",
    "**où est l'IA** dans votre travail ?",
    "Vous pensez sans doute à **Copilot** ou à **Claude**.",
    "Mais l'IA se cache **aussi ailleurs** :",
    "dans un logiciel de gestion de projet qui se met à **résumer vos réunions**,",
    "dans un outil qui **trie des documents**,",
    "dans une fonction apparue après une **simple mise à jour**.",
    "Bien souvent, on l'utilise **sans même s'en rendre compte**.",
    "Or l'AI Act est **en vigueur** depuis le **1er août 2024**.",
    "C'est un règlement européen **d'application directe** :",
    "il s'applique à votre entreprise **sans attendre de loi nationale**.",
    "Et peu importe que l'outil vienne des États-Unis ou d'ailleurs :",
    "dès qu'il est **utilisé dans l'Union européenne**, le règlement s'applique.",
    "Alors, comment **reconnaître** un système d'IA ?",
    "Retenez un mot : **l'inférence**.",
    "Un système d'IA **tire lui-même un résultat** des données qu'il reçoit :",
    "un **résumé**, une **prédiction**, une **recommandation**.",
    "À l'inverse, un outil qui applique seulement",
    "des **règles écrites par un humain** n'en est pas un.",
    "Dans ce module, vous allez suivre **Léa**, cheffe de projet",
    "qui vient d'arriver chez **NSI**,",
    "un partenaire digital présent en **Belgique** et au **Luxembourg**.",
    "Avec elle, vous apprendrez à **repérer l'IA**, à savoir **qui est concerné**,",
    "et à connaître les quelques cas qui **échappent au règlement**.",
    "**Prêt ? C'est parti.**",
]

_t, SUBS, _starts = 0.3, [], []
for _l in LIGNES:
    _d = max(1.6, len(_l.replace("**", "").split()) / 2.5)
    _starts.append(_t); SUBS.append((_t, _t + _d - 0.1, _l)); _t += _d
FIN = _t
def T(i): return _starts[i]  # début de la ligne n° i (0 = première)


def c1(d, im, x, y):
    pill(d, x, y, "NIVEAU 1 · MODULE 1", VIO, 26)
    d.text((x, y + 70), "Où est l'IA ?", font=f(84), fill=VIO)
    d.text((x, y + 190), "Formation AI Act", font=f(36, "Medium"), fill=DK)
    d.text((x, y + 240), "Le règlement européen sur l'IA", font=f(32, "Medium"), fill=PK)

def c2(d, im, x, y):
    d.text((x, y - 10), "Où est l'IA ?", font=f(64), fill=VIO)
    d.text((x, y + 80), "Les outils connus", font=f(28, "Medium"), fill=CY)
    pill(d, x, y + 124, "Copilot", VIO, 32); pill(d, x + 190, y + 124, "Claude", VIO, 32)
    d.text((x, y + 214), "Mais aussi, souvent sans le savoir", font=f(28, "Medium"), fill=CY)
    for i, t in enumerate(["Résumé automatique de réunions", "Tri de documents", "Une mise à jour qui ajoute l'IA"]):
        yy = y + 262 + i * 56; chk(d, x, yy); d.text((x + 50, yy - 2), t, font=f(32, "Medium"), fill=DK)

def c3(d, im, x, y):
    pill(d, x, y, "DÉJÀ EN VIGUEUR", PK, 30)
    d.text((x, y + 80), "Depuis le", font=f(34, "Medium"), fill=DK)
    d.text((x, y + 120), "1er août 2024", font=f(76), fill=VIO)
    for i, t in enumerate(["Application directe", "Sans attendre de loi nationale", "Tout outil utilisé dans l'UE"]):
        yy = y + 240 + i * 56; chk(d, x, yy); d.text((x + 50, yy - 2), t, font=f(32, "Medium"), fill=DK)

def c4(d, im, x, y):
    d.text((x, y - 10), "Un critère :", font=f(44, "Semi"), fill=DK)
    d.text((x, y + 44), "l'inférence", font=f(80), fill=PK)
    d.text((x, y + 150), "L'outil tire lui-même un résultat :", font=f(30, "Medium"), fill=DK)
    for i, t in enumerate(["Résumé", "Prédiction", "Recommandation"]):
        pill(d, x + [0, 160, 352][i], y + 196, t, CY, 26)
    crs(d, x, y + 290); d.text((x + 50, y + 284), "Règles écrites par un humain", font=f(32, "Medium"), fill=DK)
    d.text((x + 50, y + 326), "= pas un système d'IA", font=f(30, "Medium"), fill=PK)

def c5(d, im, x, y):
    d.text((x, y - 10), "Votre guide : Léa", font=f(64), fill=VIO)
    d.text((x, y + 82), "Cheffe de projet chez NSI", font=f(34, "Medium"), fill=DK)
    pill(d, x, y + 150, "Belgique", VIO, 30); pill(d, x + 210, y + 150, "Luxembourg", CY, 30)
    d.text((x, y + 236), "Partenaire digital présent", font=f(30, "Medium"), fill=DK)
    d.text((x, y + 276), "dans les deux pays", font=f(30, "Medium"), fill=DK)

def c6(d, im, x, y):
    d.text((x, y - 10), "Dans ce module", font=f(60), fill=VIO)
    for i, t in enumerate(["Repérer l'IA", "Qui est concerné", "Les cas hors règlement"]):
        yy = y + 90 + i * 76; d.rounded_rectangle((x, yy, x + 52, yy + 52), 14, fill=PK)
        d.text((x + 17, yy + 2), str(i + 1), font=f(38), fill=WH); d.text((x + 76, yy + 4), t, font=f(36, "Medium"), fill=DK)
    d.text((x, y + 330), "Prêt ? C'est parti !", font=f(38), fill=PK)

# (hauteur de la carte, début, fin, dessin) : une carte par paragraphe du script
CARDS = [(400, 0.3, T(2) - 0.1, c1), (540, T(2), T(10) - 0.1, c2), (520, T(10), T(15) - 0.1, c3),
         (500, T(15), T(21) - 0.1, c4), (420, T(21), T(24) - 0.1, c5), (500, T(24), FIN, c6)]
