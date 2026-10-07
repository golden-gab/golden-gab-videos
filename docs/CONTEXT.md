# CONTEXT — Golden Gab

> Source de vérité du projet. À lire en premier, avant toute modification.

## En une phrase

Ce repository est la **chaîne de production vidéo courte de la marque Golden Gab** :
il fournit l'architecture, le design system, le système de captions et les
composants réutilisables nécessaires pour produire, puis décliner rapidement
plusieurs séries de vidéos verticales.

## Rôle de Golden Gab

Golden Gab est une marque de contenus courts (format TikTok / vertical) :
découverte de sujets tech, avec un ton direct, pédagogique et accessible.

Le repository ne produit pas un seul type de vidéo : il est conçu pour héberger
plusieurs **séries** (une série = un thème, un ton, un ensemble de vidéos), et
pour que chaque nouvelle vidéo soit un assemblage de composants déjà validés.

## Objectif des vidéos

- Format vertical 1080×1920 (9:16), 30 fps.
- Durée courte, montage dense, captions animées omniprésentes.
- Chaque vidéo : une ouverture de marque, un corps, une conclusion de marque.
- Qualité visuelle homogène entre toutes les vidéos, quelle que soit la série.

## Type de contenu

| Élément | Statut |
| --- | --- |
| Vidéos verticales TikTok | format cible |
| Captions / sous-titres animés | fonctionnalité centrale (réutilisée partout) |
| Mascotte (personnage visuel récurrent) | système global `<GoldenGabMascot />` (`src/components/mascot/`) |
| Voix off / transcription | pipeline Whisper.cpp fourni par le template |
| Contenu parlé, article, chiffres clés | à décliner par série |

## Mascotte Golden Gab

Golden Gab possède une **mascotte officielle** : un jeune garçon noir sans
traits du visage, casquette et t-shirt bleu nuit au logo Golden Gab, short
cargo beige, chaussettes blanches et chaussures bleu nuit. Elle est utilisée
comme **personnage visuel récurrent** dans les vidéos.

> La mascotte Golden Gab est le personnage visuel qui accompagne et explique
> les concepts dans les vidéos. Elle peut changer de pose, de position et
> d'attitude selon la narration, **mais uniquement lorsqu'un asset
> correspondant existe**.

- Composant global : `<GoldenGabMascot />` (`src/components/mascot/`), au même
  niveau conceptuel que l'intro, l'outro et les captions.
- Une seule pose existe aujourd'hui (`point`, l'asset source
  `public/assets/images/mascotte.png`) ; d'autres sont prévues mais sans asset
  et restent inutilisables tant qu'elles ne sont pas dans le registre.
- Elle sert la narration : à n'utiliser que lorsqu'elle apporte quelque chose
  (introduction, explication, question, surprise, conclusion).
- Détails : `docs/DESIGN-SYSTEM.md` (section « Mascotte Golden Gab ») et
  `docs/ARCHITECTURE.md` (section « Système de mascotte »).

## Organisation par séries

Une **série** est un groupe de vidéos partageant un thème et un ensemble de
données. Elle vit dans son propre dossier `src/series/<serie>/` et regroupe :

- ses **compositions** (`index.tsx`) ;
- ses **vidéos** (`videos/`) ;
- ses **composants spécifiques** (`components/`) ;
- ses **données** (`data/`).

Ajouter une série ne doit modifier aucun autre fichier global que
`src/series/index.ts` (une ligne).

### Première série : `metiers-de-la-tech`

- Présente un métier de la tech par vidéo (missions, salaire, parcours).
- Dossier : `src/series/metiers-de-la-tech/`.
- **Aucun contenu n'est encore rédigé** : le socle a été construit en premier,
  volontairement.

## Technologie

| Sujet | Choix |
| --- | --- |
| Moteur vidéo | Remotion 4 (`remotion`, `@remotion/cli`) |
| UI | React 19 + TypeScript |
| Coûture CSS | Tailwind v4 disponible (activé dans `remotion.config.ts`) |
| DA / tokens | TypeScript dans `src/config` (pas de CSS-in-JS externe) |
| Captions | `@remotion/captions` + composant maison `src/captions` |
| Layout texte | `@remotion/layout-utils` (`fitText`) |
| Polices | `@remotion/google-fonts` (Darker Grotesque + Inter) |
| Transcription | pipeline Whisper.cpp du template (`sub.mjs`) |

## Philosophie générale

1. **Le template d'origine n'est pas jeté** : il est conservé (`src/CaptionedVideo`,
   `public/theboldfont.ttf`, `sub.mjs`) et sert de référence technique.
2. **Un composant = un usage partagé.** Dès qu'un élément sert plusieurs vidéos,
   il vit dans `src/components` (ou `src/captions`), jamais dans une vidéo.
3. **La DA est du code centralisé.** Aucune couleur, taille ou police en dur
   dans un composant : tout vient de `src/config`.
4. **Les vidéos sont de la composition, pas de la création.** Une vidéo assemble
   des composants existants et ne crée un composant local que si celui-ci est
   réellement spécifique à sa série.
5. **Le repository est lu par des agents IA.** Structure prévisible, noms
   explicites, documentation à jour (ce dossier `docs/`).

## Carte de la documentation

| Fichier | Contenu |
| --- | --- |
| `docs/CONTEXT.md` | ce document : le projet, sa mission, sa philosophie |
| `docs/ARCHITECTURE.md` | structure des dossiers, où placer quoi, systèmes internes |
| `docs/RULES.md` | règles à respecter par tout intervenant (humain ou IA) |
| `docs/DESIGN-SYSTEM.md` | direction artistique, tokens, usages, incertitudes |
