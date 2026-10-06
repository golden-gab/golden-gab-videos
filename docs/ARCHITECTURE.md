# ARCHITECTURE — Golden Gab

> Comment le repository est organisé, et **où placer un nouveau fichier**.

## Arborescence

```text
public/
├── assets/
│   └── images/
│       ├── couelur.png            planche de couleurs de la marque (source)
│       ├── logo couleur1.png      logo source, non détouré (8334×8334)
│       ├── motif.png              motif / texture bleu nuit
│       └── derived/
│           └── logo.png           logo prêt à l'emploi (détouré, 1600×1024)
├── sample-video.mp4               (template d'origine, conservé)
├── theboldfont.ttf                (template d'origine, conservé)
└── theboldfont-license.rtf

src/
├── index.ts                       point d'entrée Remotion (registerRoot)
├── index.css                      Tailwind v4 + styles globaux
├── Root.tsx                       racine : monte les compositions
├── load-font.ts                   (template) charge TheBoldFont
├── CaptionedVideo/                (template) composition de référence, conservée
│
├── config/                        DESIGN SYSTEM — source de vérité
│   ├── index.ts                   barrel
│   ├── colors.ts                  palette + alias sémantiques
│   ├── typography.ts              polices, échelle, rôles de texte
│   ├── spacing.ts                 espacements, rayons, opacités
│   ├── animation.ts               easings, durées, animations par défaut
│   ├── video.ts                   format, zone sûre, zone captions
│   ├── assets.ts                  chemins des assets (staticFile)
│   └── brand.ts                   métadonnées de la marque
│
├── captions/                      SYSTÈME DE CAPTIONS
│   ├── index.ts                   API publique
│   ├── types.ts                   CaptionSegment / CaptionPage / CaptionToken
│   ├── pages.ts                   découpage en pages (logique pure)
│   ├── styles.ts                  presets de style
│   ├── Captions.tsx               composant réutilisable
│   ├── CaptionPage.tsx            rendu d'une page (dimensionnement + animations)
│   └── from-caption.ts            adaptateur depuis @remotion/captions
│
├── components/                    COMPOSANTS RÉUTILISABLES (toutes séries)
│   ├── index.ts
│   ├── brand/                     logo, filigrane, fond, motif
│   ├── common/                    AnimatedAppear, BrandText, SafeArea
│   ├── intro/                     GoldenGabIntro
│   └── outro/                     GoldenGabOutro
│
├── compositions/                  ASSEMBLAGE DES COMPOSITIONS REMOTION
│   ├── index.tsx                  styleguide + dossiers de toutes les séries
│   └── Styleguide.tsx             composition de QA du design system
│
├── series/                        CONTENU, PAR SÉRIE
│   ├── index.ts                   registre des séries
│   ├── types.ts                   contrat d'une série
│   └── metiers-de-la-tech/
│       ├── index.tsx              compositions de la série
│       ├── videos/                une vidéo = un fichier
│       ├── components/            composants spécifiques à la série
│       └── data/                  données de contenu partagées
│
├── styles/
│   └── global.css                 règles structurelles uniquement
│
└── utils/                         HELPERS PURS
    ├── animation.ts               progression entrée/sortie, styles d'animation
    ├── time.ts                    ms <-> frames
    ├── text.ts                    mots, normalisation, répartition de durée
    └── color.ts                   withAlpha()
```

## Séparation global / spécifique à une série

C'est la règle structurante du repository.

| Le composant… | Va dans… |
| --- | --- |
| peut servir plusieurs séries | `src/components/` |
| est un système transverse (captions) | `src/captions/` |
| ne sert qu'à une série | `src/series/<serie>/components/` |
| ne sert qu'à une vidéo | le fichier de la vidéo |

Un composant de série peut importer les composants globaux. **L'inverse est
interdit** : un composant de `src/components` ne doit jamais importer depuis
`src/series`.

## Où placer un nouveau fichier

| Je crée… | Emplacement |
| --- | --- |
| une couleur / un token | `src/config/` (jamais ailleurs) |
| une police ou une taille de texte | `src/config/typography.ts` |
| un preset de captions | `src/captions/styles.ts` |
| un composant utilisé par plusieurs vidéos | `src/components/<famille>/` |
| un composant propre à une série | `src/series/<serie>/components/` |
| une nouvelle vidéo | `src/series/<serie>/videos/` + enregistrement dans `src/series/<serie>/index.tsx` |
| une nouvelle série | `src/series/<serie>/` + une ligne dans `src/series/index.ts` |
| un helper réutilisable | `src/utils/` |
| une donnée de contenu d'une série | `src/series/<serie>/data/` |
| un asset de marque | `public/assets/` (puis `src/config/assets.ts` si réutilisé) |
| une composition de démo / QA | `src/compositions/` |

## Compositions Remotion

### Enregistrement

- `src/Root.tsx` ne déclare **aucune** composition métier : il monte
  `GoldenGabCompositions` (depuis `src/compositions`) et le template conservé.
- `src/compositions/index.tsx` crée le dossier `GoldenGab` (styleguide) et monte
  le `Folder` de chaque série listée dans `src/series/index.ts`.
- Chaque série déclare ses `<Composition>` dans son propre `index.tsx`.
- Une composition est déclarée **à côté du composant qu'elle référence**, avec
  `id`, `durationInFrames`, `fps`, `width`, `height` et ses `defaultProps`
  écrits en clair (valeurs littérales) pour rester éditables dans le Studio.

### Convention de nommage des `id`

`<prefixe-série>-<slug>` en kebab-case, par exemple `mdt-data-analyst`.
Le Studio affiche les compositions dans des dossiers : `GoldenGab`,
`metiers-de-la-tech`, `Templates`.

### Dimensions

Toujours `videoFormat` (`src/config/video.ts`) :
`width: 1080`, `height: 1920`, `fps: 30`. Jamais de nombre en dur.

## Organisation des vidéos

```text
src/series/metiers-de-la-tech/
├── index.tsx          déclare les <Composition> de la série
├── videos/            un fichier par vidéo (ex. data-analyst.tsx)
├── components/        composants propres à la série
└── data/              fiches métiers et données partagées
```

**Ajouter une vidéo :**

1. créer le composant dans `videos/mon-sujet.tsx` ;
2. assembler des composants existants
   (`GoldenGabIntro`, `Captions`, `GoldenGabOutro`, `BrandBackground`,
   `SafeArea`, …) ;
3. enregistrer la `<Composition>` dans `index.tsx` de la série ;
4. ne créer un composant local que si l'élément est réellement spécifique.

**Ajouter une série :**

1. dupliquer la structure de dossier d'une série existante ;
2. exporter un `SeriesDefinition` depuis `src/series/<serie>/index.tsx` ;
3. ajouter cette définition à `seriesRegistry` dans `src/series/index.ts`.

Aucun autre fichier global n'a besoin d'être modifié.

## Système de composants réutilisables

| Composant | Rôle | Entrée | Sortie |
| --- | --- | --- | --- |
| `GoldenGabIntro` | ouverture de marque | `title`, `eyebrow?`, `subtitle?`, `variant?` | écran animé |
| `GoldenGabOutro` | conclusion de marque | `cta?`, `tagline?`, `handle?` | écran animé |
| `GoldenGabLogo` | logo de marque | `width`, `style` | image |
| `GoldenGabWatermark` | filigrane | `position`, `width`, `opacity` | image en coin |
| `BrandBackground` | fond de marque | `variant`, `motif`, `bottomScrim` | fond plein cadre |
| `BrandMotif` | texture de motif | `scale`, `opacity` | texture |
| `BrandText` | texte typé | `role`, `as`, `color`, `align` | texte |
| `SafeArea` | respect des marges TikTok | `inset`, `justify` | conteneur |
| `AnimatedAppear` | apparition/disparition | `animation`, durées, `delaySeconds` | conteneur animé |

Ces composants sont **agnostiques de la série** : tout ce qui est spécifique
passe par des props.

## Système de captions

`src/captions` est un sous-système autonome, réutilisable par toutes les vidéos.

```text
types.ts     CaptionSegment -> CaptionPage -> CaptionToken
pages.ts     regroupement en pages (pure, testable)
styles.ts    presets (typographie + couleurs + gabarit + animations)
Captions.tsx orchestration temporelle (1 <Sequence> par page)
CaptionPage.tsx  rendu d'une page : fitText, animations, mot actif
from-caption.ts  adaptateur depuis le pipeline Whisper (@remotion/captions)
```

**Flux de données**

1. On fournit des `CaptionSegment[]` (texte + `startMs`/`endMs`, et
   éventuellement `words` pour le timing mot-à-mot et `emphasis` pour
   surligner des mots).
2. `buildCaptionPages()` regroupe les segments en pages selon l'écart
   temporel, la longueur et la durée maximales.
3. Chaque page est rendue dans une `<Sequence>` positionnée à `startMs`.
4. Dans la page, `CaptionPage` calcule la taille de police via `fitText()`,
   applique les animations d'entrée/sortie et met en évidence le mot actif.

Le composant est utilisé ainsi :

```tsx
<Captions segments={segments} style="default" />
<Captions segments={segments} style="card" position="center" />
```

Une transcription Whisper se branche en une ligne :

```ts
import { fromRemotionCaptions } from "../captions";

const segments = fromRemotionCaptions(captions);
```

Pour ajouter un style de captions : ajouter une entrée dans `captionStyles`
(`src/captions/styles.ts`) et la clé correspondante dans `CaptionStyleName`.
Aucun composant à modifier.

## Gestion des assets

- Tous les assets vivent dans `public/`.
- Les composants ne connaissent **aucun chemin de fichier** : ils lisent
  `brandAssets` depuis `src/config/assets.ts`, qui appelle `staticFile()`.
- `public/assets/images/` contient les fichiers **sources d'origine** de la
  marque. Ils ne doivent pas être modifiés.
- `public/assets/images/derived/` contient les déclinaisons prêtes à l'emploi
  (aujourd'hui : `logo.png`, détouré et dimensionné pour la vidéo).
- Pipeline de transcription : `node sub.mjs` produit un JSON au format
  `Caption[]` à côté de chaque vidéo de `public/`. Voir `README.md`.

## Conventions

- **TypeScript strict**, `noUnusedLocals` activé : pas d'import mort.
- `lib` est limité à `es2015` : ne pas utiliser `Array.prototype.includes`,
  `Object.entries`, `String.padStart`… (voir `RULES.md`).
- Un dossier = un `index.ts` barrel quand il expose une API.
- Composants en `React.FC<Props>` avec `type Props = { readonly … }`.
- Commentaires en français, orientés « pourquoi ».
- Animations uniquement pilotées par `useCurrentFrame()` + `interpolate()` /
  `spring()` : pas de transition CSS.
- Tout composant temporel reçoit `premountFor={fps}`.
