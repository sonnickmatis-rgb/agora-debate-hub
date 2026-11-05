# Plateforme AI Act · Blockchain AkademIA

Contenu à jour au 12 octobre 2026 (v2.0), source unique : *Dossier AI Act BA*.

## Les livrables (`dist/`)

| Fichier | Usage |
|---|---|
| `web/AI_Act_BA.html` | Version web complète (4 niveaux), un seul fichier. Progression enregistrée dans le navigateur. Pour les présentations : ajouter `?apercu=1` à l'adresse pour déverrouiller tous les niveaux. |
| `scorm/AI_Act_BA_Niveau1_SCORM12.zip` … `Niveau4` | Un paquet **SCORM 1.2** par niveau, à importer dans Moodle. |
| `scorm/AI_Act_BA_Evaluation_finale_SCORM12.zip` | L'**évaluation finale** (20 questions sur les 4 niveaux), à placer après le niveau 4. |

## Importer dans Moodle

1. Dans le cours : **Ajouter une activité** › **Paquetage SCORM**, puis déposer le zip du niveau.
2. Réglages recommandés :
   - **Note** : méthode « Note la plus haute ».
   - **Tentatives** : illimitées. Le module permet aussi de retenter les questions ratées.
   - **Achèvement d'activité** : « Doit obtenir le statut Réussi ». Le seuil est de 80 %, défini dans le paquet.
   - **Affichage** : « Fenêtre courante », largeur 100 %.
3. Répéter l'opération pour les 4 niveaux. Le passage d'un niveau à l'autre se règle dans Moodle : **Restreindre l'accès** › **Achèvement d'activité** du niveau précédent.

Ce que le module envoie à Moodle :
- le statut `passed` ou `failed` et le score sur 100 ;
- chaque réponse (rapport « Interactions » de Moodle) ;
- la page en cours, pour la reprise ;
- la progression complète (`suspend_data`) ;
- le temps de session.

Le nom de l'apprenant est repris de Moodle.

Avant la diffusion, faire un test sur SCORM Cloud (gratuit) ou directement sur votre Moodle.

## Ajouter les vidéos de présentation

Chaque module commence par un emplacement vidéo de 1 min 30 à 2 min, soit 8 vidéos en tout.

1. Déposer les fichiers dans `src/videos/` avec ces noms : `niveau1-module1.mp4`, `niveau1-module2.mp4`, … jusqu'à `niveau4-module2.mp4`.
2. Format conseillé : MP4 (H.264 + AAC), en 720p.
3. Sous-titres recommandés : même nom en `.vtt`.
4. Relancer `python3 build.py`. Chaque zip n'embarque que les vidéos de son niveau.

Tant qu'une vidéo manque, le module affiche « bientôt disponible » avec les objectifs du module.

## Modifier le contenu

- Textes pédagogiques, questions et scénarios : `src/js/content.js`
- Illustrations : `src/js/illus.js`
- Pages et comportements : `src/js/app.js`
- Connecteur SCORM : `src/js/scorm.js`

Après chaque modification, relancer :

```bash
python3 build.py
```

Pensez à changer `CONTENT_VERSION` et `CONTENT_DATE` dans `content.js` à chaque mise à jour du contenu. Révisions prévues : début 2027, puis avant décembre 2027.

## Avant la mise en production

Les points marqués **À vérifier** ou **Projet** dans le cours doivent être validés par le relecteur juridique. Exemples : codécision L.414-9, statut PME d'une filiale, article 86, projet de loi 8476.

## Options d'affichage et temps régulé

- **Masquer le menu de gauche** : bouton en haut à gauche de chaque page (et interrupteur dans « Mon profil »). Le choix est mémorisé. Sur tablette et mobile, le menu reste affiché.
- **Temps régulé** (option de démonstration, désactivée par défaut) : encadré Oui / Non dans « Mon profil ». Si Oui, chaque page de cours reste bloquée au moins un tiers du temps indiqué (compte à rebours sur le bouton ; aucun minimum sur les questions et les mises en situation), et chaque vidéo doit être vue en entier, sans avancer dans la barre de lecture. Une page déjà validée ne se rebloque pas.
- Pour retirer l'option : dans `src/js/app.js`, supprimer le bloc « Temps régulé », ses appels (`regulate`, `isLocked`, `canReach`, `trVideo`) et l'encadré du profil, puis relancer `python3 build.py`.

## Quiz de validation et évaluation finale

- **Validation d'un niveau** (cumulée) : au moins 80 % sur la séance et les scénarios **et** un quiz de validation réussi.
- **Quiz de validation** : 6 questions tirées au hasard parmi 12, ordre des réponses mélangé. Réussite à 5 / 6. Tentatives illimitées, nouveau tirage à chaque fois. Il s'ouvre quand la séance et les scénarios sont terminés.
- **Évaluation finale** : 20 questions (5 par niveau), seuil 80 %. Version web : ouverte quand les 4 niveaux sont validés. Moodle : 5e paquet, à rendre accessible après le niveau 4 avec **Restreindre l'accès**.
- **Note envoyée à Moodle** pour un niveau : la plus basse entre la séance / les scénarios et le meilleur quiz.
- Questions et réglages (taille du quiz, seuils) : `src/js/quiz.js`. Toute nouvelle question doit passer par la relecture juridique.

## Version anglaise

- Bouton **FR / EN** en haut de la page (version web uniquement). FR reste le réglage par défaut et ne change rien.
- En **EN**, toute la plateforme est en anglais : les 4 niveaux, fiches et PDF, scénarios, quiz, évaluation finale, Connaissances, Ressources, profil et attestation. Le glossaire garde sa colonne de termes français.
- Textes anglais : `src/js/en.js` (niveau 1 et dictionnaire de l'interface) et `src/js/en_content.js` (niveaux 2 à 4, quiz, fiches, notions, rappels, ressources).
- Vidéos anglaises : déposer `niveau{N}-module{M}-en.mp4` dans `src/videos/`. Tant qu'une vidéo anglaise manque, la vidéo française s'affiche. Scripts : `Scripts_Videos_EN_Niveau1.md` et `Scripts_Videos_EN_Niveaux2-4.md`.
- **Paquets SCORM anglais** : `dist/scorm_en/` (`AI_Act_BA_Level1_SCORM12_EN.zip` … `Level4`, et `AI_Act_BA_Final_assessment_SCORM12_EN.zip`). Entièrement en anglais, avec les vidéos anglaises, sans bouton de langue. Ils s'installent dans Moodle exactement comme les paquets français (`dist/scorm/`). Ne pas mélanger les deux séries dans un même cours.

## Habiller une nouvelle vidéo (sous-titres et cartes)

Outil : `outils_video/habillage.py`, une configuration par vidéo dans `outils_video/configs/` (texte des sous-titres calé sur la voix, et cartes).

```bash
cd outils_video
python3 habillage.py configs/niveau2-module1-en.py source.mp4 ../src/videos_HD_soustitrees/niveau2-module1-en.mp4 ../src/videos/niveau2-module1-en.mp4
```
