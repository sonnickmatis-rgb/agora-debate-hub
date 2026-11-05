# Habillage des 16 vidéos NSI · procédure pour Noa

Date : 5 novembre 2026
Objet : ajouter les sous-titres et les cartes animées aux 16 nouvelles vidéos d'avatar (8 FR, 8 EN) enregistrées à partir des scripts NSI.

---

## 1. En bref

- Les **voix et les vidéos d'avatar** sont produites à partir des scripts NSI que tu as mis à jour (`Scripts_Videos_Modules.md`, `Scripts_Videos_EN_Niveau1.md`, `Scripts_Videos_EN_Niveaux2-4.md`).
- Chaque vidéo reçoit ensuite deux habillages :
  1. des **sous-titres** en bas, calés sur la voix, avec les mots clés en rouge ;
  2. **6 cartes animées** à droite, une par paragraphe du script.
- **Aucun logo n'est ajouté** : le logo « NSI TV » est déjà présent dans la vidéo d'avatar.
- Tout ce qu'il faut est dans le dossier **`kit_habillage_NSI`** joint à ce document. L'outil est déjà aux couleurs NSI, et une maquette complète du **niveau 1, module 1** sert de modèle.

## 2. Contenu du kit

| Fichier | Contenu |
|---|---|
| `PROCEDURE_VIDEOS_NSI.md` | Ce document |
| `habillage.py` | L'outil d'habillage, réglé sur la charte NSI |
| `fonts/` | Les polices Titillium Web et Poppins (lues automatiquement par l'outil) |
| `configs/niveau1-module1.py` | **Le modèle** : configuration complète du niveau 1, module 1 (FR) |
| `configs/anciennes_BA/` | Anciennes configurations anglaises des niveaux 2 à 4. Leur contenu est celui de la version Blockchain AkademIA, **à ne pas reprendre** : elles servent seulement d'exemples de mise en page |
| `apercu_niveau1-module1.png` | Aperçu des 6 cartes du modèle |

Le texte de référence de chaque vidéo est celui des scripts NSI.

## 3. Charte appliquée (déjà réglée dans l'outil)

| Élément | Choix |
|---|---|
| Titres des cartes | Titillium Web, bleu pétrole `#093746` |
| Texte des cartes | Poppins, `#002832` |
| Mots clés | Rouge NSI `#EE465B` |
| Éléments secondaires | Cyan `#31B8E8` |
| Bandeau des sous-titres | `#002832`, contour cyan léger, texte blanc |
| Cartes | Blanches, semi-transparentes, à droite, sous le logo « NSI TV » |
| Logo | **Aucun** (déjà dans la vidéo) |

## 4. Pré-requis sur l'ordinateur

- Python 3 avec Pillow : `pip install pillow`
- ffmpeg
- Whisper, pour caler les sous-titres : `pip install openai-whisper`

## 5. Procédure, vidéo par vidéo

Toutes les commandes se lancent depuis le dossier `kit_habillage_NSI`. Mettre les vidéos brutes dans un sous-dossier `BRUT/`.

### Étape 1 · Nommer la vidéo brute

Garder exactement les noms déjà utilisés par la plateforme :

| Vidéo | FR | EN |
|---|---|---|
| Niveau 1 · Module 1 | `niveau1-module1.mp4` | `niveau1-module1-en.mp4` |
| Niveau 1 · Module 2 | `niveau1-module2.mp4` | `niveau1-module2-en.mp4` |
| Niveau 2 · Module 1 | `niveau2-module1.mp4` | `niveau2-module1-en.mp4` |
| Niveau 2 · Module 2 | `niveau2-module2.mp4` | `niveau2-module2-en.mp4` |
| Niveau 3 · Module 1 | `niveau3-module1.mp4` | `niveau3-module1-en.mp4` |
| Niveau 3 · Module 2 | `niveau3-module2.mp4` | `niveau3-module2-en.mp4` |
| Niveau 4 · Module 1 | `niveau4-module1.mp4` | `niveau4-module1-en.mp4` |
| Niveau 4 · Module 2 | `niveau4-module2.mp4` | `niveau4-module2-en.mp4` |

### Étape 2 · Relever le temps de chaque mot

```bash
whisper BRUT/niveau1-module1.mp4 --model small --language fr --output_format json --word_timestamps True --output_dir whisper/
```
(`--language en` pour les vidéos anglaises.)

### Étape 3 · Écrire ou compléter la configuration

Une config par vidéo dans `configs/`, même nom que la vidéo avec `.py` (ex. `niveau2-module1-en.py`).

- **Sous-titres** (`SUBS`) : une liste de `(début, fin, "texte")`, en secondes. Couper en lignes courtes ; mettre les mots clés entre `**…**` pour les afficher en rouge. L'outil signale toute ligne trop large (plus de 1700 px) : la couper en deux.
- Dans le modèle `niveau1-module1.py`, les temps sont **provisoires** (calculés sur la longueur du texte). Les remplacer par les vrais temps donnés par Whisper.
- **Cartes** (`CARDS`) : 6 cartes, une par paragraphe du script. Chaque carte commence au début de la phrase qui ouvre son paragraphe.
  - Carte 1 : niveau, module, titre (le « texte à l'écran » du script).
  - Cartes 2 à 5 : les idées clés du paragraphe (dates, règles, réflexes), en quelques mots.
  - Carte 6 : « Dans ce module » avec 3 points numérotés, puis la phrase de fin.
- **Ne rien inventer** : chaque mot des cartes doit venir du script correspondant.

### Étape 4 · Vérifier sur une image fixe (rapide, sans calcul vidéo)

```bash
ffmpeg -ss 20 -i BRUT/niveau1-module1.mp4 -frames:v 1 image.png
python3 habillage.py configs/niveau1-module1.py --apercu image.png 20 apercu.png
```
Ouvrir `apercu.png` : vérifier qu'aucun texte ne déborde de sa carte et que les cartes ne touchent pas le logo. Tester un instant par carte.

### Étape 5 · Produire la vidéo finale

```bash
mkdir -p HD 720p
python3 habillage.py configs/niveau1-module1.py BRUT/niveau1-module1.mp4 HD/niveau1-module1.mp4 720p/niveau1-module1.mp4
```
- `HD/` : version haute définition (archive).
- `720p/` : version utilisée par la plateforme.

### Étape 6 · Mettre en ligne

- Version web NSI (`site/`) : remplacer chaque vidéo par la version `720p/` du même nom.
- Paquets SCORM, s'ils doivent être reconstruits : déposer les fichiers `720p/` dans `src/videos/` du projet, puis lancer `python3 build.py`.

## 6. Ordre de travail conseillé

1. **Vidéo pilote** : niveau 1, module 1 (FR), avec le modèle déjà prêt. La faire valider avant de continuer.
2. Les 7 autres vidéos FR.
3. Les 8 vidéos EN : reprendre les cartes FR validées et les traduire. Pour les niveaux 2 à 4, les scripts EN n'ont pas de « texte à l'écran » : traduire celui des scripts FR.

## 7. Points de vigilance

- Les textes des cartes et des sous-titres sont juridiques : les reprendre **mot pour mot** du script, sans ajouter de fait, de date ou d'article.
- La vidéo du niveau 4, module 2 parle des autorités belges et luxembourgeoises : vérifier qu'elles sont toujours à jour avant la diffusion (consigne des scripts).
- Respecter exactement les noms de fichiers du tableau de l'étape 1.

## 8. Avec un assistant de code (Claude Code, Codex…)

Ouvrir le dossier `kit_habillage_NSI` (avec les vidéos dans `BRUT/` et les scripts NSI à côté) et donner cette consigne :

> Lis PROCEDURE_VIDEOS_NSI.md. En prenant `configs/niveau1-module1.py` comme modèle validé, crée les configurations d'habillage des 15 autres vidéos à partir des scripts NSI, en reprenant le texte mot pour mot. Lance Whisper sur chaque vidéo de `BRUT/` et cale les sous-titres sur ses temps. Vérifie chaque carte avec `--apercu` et montre-moi les aperçus avant de produire les vidéos finales.
