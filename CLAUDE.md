# CLAUDE.md · Plateforme e-learning « AI Act · L'essentiel » (Blockchain AkademIA)

Formation en ligne à la maîtrise de l'IA (article 4 de l'AI Act), 4 niveaux + évaluation finale, en français avec une version anglaise.
Une seule base de code produit trois livrables : une page web autonome, 5 paquets SCORM 1.2 en français, 5 paquets SCORM 1.2 en anglais.

Réponds à l'utilisateur en français. Le contenu est juridique : ne jamais inventer un fait, une date ou un article ; reprendre ce qui existe déjà dans `src/js/content.js` ou dans le dossier de recherche (`06_Documents/Dossier_recherche_AI_Act_BA_source_du_contenu.pdf` dans le dossier de passation).

## Commandes

```bash
python3 build.py          # régénère dist/web, dist/scorm (FR) et dist/scorm_en (EN) — à relancer après CHAQUE modification
node --check src/js/app.js src/js/content.js src/js/quiz.js src/js/en.js src/js/en_content.js   # vérifier la syntaxe avant de builder
```

Aperçu : ouvrir `dist/web/AI_Act_BA.html?apercu=1` dans Chrome (`?apercu=1` débloque tous les niveaux). Bouton FR | EN en haut de page.
La progression web est dans le `localStorage` (clé `ba-aiact-web-v3`) : tester en navigation privée pour repartir de zéro.

## Arborescence

| Chemin | Rôle |
|---|---|
| `src/index.template.html` | Squelette HTML (barre du haut, menu, sections de pages, icônes SVG) |
| `src/css/style.css` | Tous les styles, y compris l'impression PDF (`@media print`) |
| `src/js/content.js` | **Contenu FR** : `LV` (4 niveaux : `steps`, `scn`, `recap`), `FICHES`, `KNOW`, `OFFICIAL`, `FURTHER`, `GLOSSARY`, `MODULE_GOALS`, `PROFILES`, `SPACED`, `CONTENT_DATE`, `CONTENT_VERSION` |
| `src/js/quiz.js` | `SETTINGS` (taille du quiz, seuils, temps régulé SCORM) et `QUIZ` (12 questions par niveau). Dans `o`, **la 1re option est la bonne** (l'ordre est mélangé à l'affichage) |
| `src/js/en.js` | Version anglaise : contenu EN du niveau 1, activation (`EN_ON`), dictionnaire d'interface `UI_EN` + règles `UI_RE`, traduction automatique du DOM |
| `src/js/en_content.js` | Contenu EN des niveaux 2 à 4, quiz 2-4, fiches 3-8, notions, rappels, ressources |
| `src/js/app.js` | Toute la logique : rendu des pages, scores, quiz, évaluation finale, temps régulé, impression, recherche, SCORM |
| `src/js/scorm.js` | Connecteur SCORM 1.2 (API LMS) |
| `src/js/illus.js` | Illustrations SVG (`ILLUS.nom()`) |
| `src/videos/` | Vidéos **720p utilisées par le build** : `niveauN-moduleM.mp4` (FR) et `niveauN-moduleM-en.mp4` (EN) |
| `src/videos_HD_soustitrees/` | Masters HD sous-titrés (FR et EN), non inclus dans les livrables |
| `build.py` | Génère `dist/` (web inline + zips SCORM avec manifeste) |
| `outils_video/habillage.py` + `configs/` | Ajoute sous-titres et cartes animées aux vidéos d'avatars (voir plus bas) |
| `Guide utilisateur/guide.html` | Guide client (HTML → PDF) |
| `Vue d'ensemble/generer_vue_ensemble.js` | Génère la vue d'ensemble de tout le contenu (HTML → PDF) |
| `LISEZMOI.md` | Mode d'emploi détaillé (Moodle, vidéos, options) |

## Règles à respecter

1. **FR et EN vont ensemble.** Toute modification d'un texte FR dans `content.js` ou `quiz.js` doit être reportée dans `en.js` (niveau 1, objet `EN_CONTENT`) ou `en_content.js` (niveaux 2 à 4), **au même index** : les tableaux EN sont alignés sur les tableaux FR (même ordre des étapes, des options, des scénarios, de `KNOW`, de `OFFICIAL`). Ajouter ou supprimer une étape FR impose la même opération côté EN.
2. **Nouveau texte d'interface en dur dans `app.js`** → ajouter sa traduction dans `UI_EN` (texte exact) ou une règle dans `UI_RE` (texte avec chiffres ou dates). Sinon il reste en français en mode EN.
3. **Nouvelle question de séance ou nouveau scénario** → lui donner une position de bonne réponse (A, B ou C) dans la table `POS` de `app.js` (bloc « POSITION DES BONNES RÉPONSES »). Garder les réponses de longueur proche et varier vrai / faux / ça dépend.
4. **Validation d'un niveau** (cumulée) : séance + scénarios ≥ 80 % **et** quiz de validation réussi (5/6). Note SCORM envoyée = la plus basse entre l'entraînement et le meilleur quiz. Ne pas changer sans accord.
5. **Mettre à jour `CONTENT_VERSION` et `CONTENT_DATE`** (`content.js`) à chaque changement de fond du contenu.
6. Toujours **relancer `python3 build.py`** puis vérifier dans le navigateur, en FR **et** en EN.
7. Ne pas toucher aux fichiers de `dist/` à la main : ils sont écrasés à chaque build.

## Version anglaise

- Web : bouton FR | EN (préférence `state.prefs.lang`, la page se recharge). FR par défaut.
- SCORM : `build.py` produit `dist/scorm_en/` avec `BA_CONFIG.lang = 'en'` (pas de bouton de langue).
- `en.js` remplace le contenu FR par le contenu EN au chargement, puis un `MutationObserver` traduit les textes d'interface affichés (dictionnaire `UI_EN`, puis règles `UI_RE`). Les textes des illustrations sont traduits à la source.
- Le glossaire (page Ressources) garde volontairement sa colonne française.
- Vérification conseillée après un changement : parcourir le site en EN et chercher tout mot français restant.

## Vidéos

- Chaque module commence par une vidéo d'avatar (≈ 1 min 15). En EN, la plateforme lit `-en.mp4`, sinon la vidéo FR.
- Habillage (sous-titres charte BA + cartes) : `outils_video/habillage.py` avec une configuration par vidéo (`configs/niveauN-moduleM-en.py`). Les 8 configurations anglaises existent ; **les configurations des vidéos françaises n'ont pas été conservées** (pour refaire une vidéo FR, partir de la config EN correspondante et traduire).
  ```bash
  cd outils_video
  python3 habillage.py configs/niveau2-module1-en.py SOURCE.mp4 ../src/videos_HD_soustitrees/niveau2-module1-en.mp4 ../src/videos/niveau2-module1-en.mp4
  ```
  Caler les sous-titres sur la voix : `whisper SOURCE.mp4 --model small --language en --output_format json --word_timestamps True` (installé). Police des vidéos : Avenir Next (macOS). L'outil signale les sous-titres trop larges (> 1700 px) : les couper en deux.
- **Préférence de la propriétaire du projet** : avant de retoucher une vidéo, proposer d'abord le texte (écran et voix) et attendre son accord.

## Documents à régénérer après un changement de contenu

```bash
# Vue d'ensemble (tout le contenu, questions et réponses)
cd "Vue d'ensemble" && node generer_vue_ensemble.js
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --allow-file-access-from-files --virtual-time-budget=5000 --no-pdf-header-footer --print-to-pdf=Vue_ensemble_contenu_AI_Act_BA.pdf "file://$PWD/vue_ensemble.html"
# Guide utilisateur : modifier guide.html puis imprimer de la même façon vers Guide_utilisateur_AI_Act_BA.pdf
```

## Tester sans Moodle

Chrome sans interface peut exécuter un script injecté dans une copie de `dist/web/AI_Act_BA.html` (`--headless=new --allow-file-access-from-files --virtual-time-budget=… --dump-dom`). Pour SCORM : dézipper un paquet, fournir un faux objet `window.API` (LMSInitialize, LMSSetValue…) dans une page parente qui charge `index.html` en iframe, puis lire les valeurs envoyées (`cmi.core.lesson_status`, `cmi.core.score.raw`). Avant une vraie diffusion : SCORM Cloud ou le Moodle du client.

## Points en suspens (au 23 octobre 2026)

- **Panneau admin** (`?admin=1` : aller à un niveau, simuler une validation, réinitialiser, afficher les bonnes réponses, temps régulé) : conçu mais **mis en attente** à la demande de la propriétaire, qui avait des réserves. Ne pas le développer sans son accord.
- **Relecture juridique** à faire : les 48 questions des quiz, les vrai/faux reformulés, les distracteurs des scénarios, toute la traduction anglaise (la citation anglaise de l'article 4 modifié est une traduction non officielle).
- **Test sur un vrai Moodle** (ou SCORM Cloud) pas encore fait ; testé seulement avec un LMS simulé.
- Le temps régulé ne bloque que la séance (le menu permet d'aller aux scénarios).
