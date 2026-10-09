# Pose « neutral » — brief de génération

> Fichier généré par `scripts/generate-mascot-pose.mjs`. Workflow : `docs/MASCOT-POSES.md`.
> Date : 2026-10-09
> Statut : **candidats non générés (mode --dry-run)** — aucun asset n'est enregistré.

## Intention (brief saisi)

test

## Images de référence à joindre

Joins ces 5 fichiers comme images de référence (dans cet ordre) :

1. `public/assets/images/mascot/mascot-explaining.png`
2. `public/assets/images/mascot/mascot-happy.png`
3. `public/assets/images/mascot/mascot-point.png`
4. `public/assets/images/mascot/mascot-surprised.png`
5. `public/assets/images/mascot/mascot-thinking.png`

## Prompt (à coller tel quel)

```text
Use the attached reference images. Draw the SAME character, identical design, colors and proportions.

Fiche de cohérence (mesurée sur les 5 poses existantes — docs/MASCOT-POSES.md) :
- Personnage : jeune garçon noir, SANS traits du visage (ni yeux, ni bouche, ni nez).
- Casquette bleu nuit (#183058 / #1D385E), visière vers l'avant.
- T-shirt bleu nuit, logo « gg » + wordmark « golden gab » en blanc sur la poitrine.
- Short cargo beige / crème (#E0D8C0).
- Chaussettes blanches hautes, chaussures bleu nuit (#132642) à semelles et bandes blanches.
- Contour : trait NOIR plein (#000000), épais, sur toute la silhouette (pas de contour blanc).
- Rendu : illustration vectorielle plate, aplats simples, ombrage minimal — pas de dégradé, pas de texture photo, pas de 3D.
- Cadre : carré 1:1, fond 100 % TRANSPARENT, personnage debout de face, pieds en bas,
  occupant ~95 % de la hauteur, centré horizontalement.
- À NE PAS ajouter : décor, texte, ombre portée, éléments de marque autres que le logo du t-shirt.

New pose "neutral": test

Full body, standing, facing the camera, feet at the bottom, centered,
filling about 95% of the height, on a fully transparent background,
square 1:1, no text, no background scenery, no props, no drop shadow, no 3D.
```

## Marche à suivre — Google AI Studio (recommandé)

1. ouvrir <https://aistudio.google.com/> et créer un prompt (mode **Image** / Nano Banana) ;
2. joindre **toutes** les images de référence listées ci-dessus ;
3. coller le prompt ci-dessus ;
4. générer, puis **télécharger les 3 meilleurs candidats** en PNG ;
5. les déposer dans `public/assets/images/mascot/_pending/neutral-1.png`, `-2`, `-3` ;
6. **relire et valider** (fond transparent ? couleurs ? logo ? posture ?) ;
7. promouvoir le candidat retenu :

```bash
node scripts/promote-mascot-pose.mjs public/assets/images/mascot/_pending/neutral-1.png neutral --validated
```

Alternative : app Gemini (mobile/web) avec les mêmes images + prompt.

## Pourquoi pas via l'API en direct ?

Les modèles image de Gemini (Nano Banana) **ne sont pas inclus dans le palier
gratuit** de l'API (cf. <https://ai.google.dev/gemini-api/docs/pricing>) : sans
facturation active, l'API renvoie 403/429. Le script ne contourne pas cette
limite — il produit ce brief à ta place.

Pour générer par script (projet avec facturation) :

```bash
# .env
GEMINI_API_KEY=...
GEMINI_IMAGE_MODEL=gemini-nano-banana-2.1   # optionnel, c'est le défaut
```

puis relancer `node scripts/generate-mascot-pose.mjs neutral --brief "..."`.

## Rappel

- ne jamais enregistrer une pose sans l'avoir vue et validée ;
- ne jamais brancher un candidat de `_pending/` dans une vidéo ;
- ne pas retoucher une pose avec un miroir / une rotation d'une autre (règle 39).
