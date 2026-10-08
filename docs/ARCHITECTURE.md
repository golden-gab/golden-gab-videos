# ARCHITECTURE — Golden Gab

> Comment le repository est organisé, et **où placer un nouveau fichier**.

## Arborescence

```text
public/
├── assets/
│   └── images/
│       ├── couelur.png            planche de couleurs de la marque (source)
│       ├── logo couleur1.png      logo source, non détouré (8334×8334)
│       ├── mascotte.png           asset source de la mascotte (pose « point »)
│       ├── motif.png              motif / texture bleu nuit
│       ├── mascot/                (à venir) poses supplémentaires de la mascotte
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
│   ├── mascot/                    MASCOTTE — personnage récurrent
│   │   ├── GoldenGabMascot.tsx    composant réutilisable
│   │   ├── poses.ts               registre pose → asset (+ poses prévues)
│   │   ├── positions.ts           positions, tailles, ancrages (zone sûre)
│   │   ├── animations.ts          attitudes + micro-mouvements
│   │   ├── types.ts               MascotPose, MascotAttitude, MascotFacing…
│   │   └── index.ts               barrel
│   ├── motion/                    BIBLIOTHÈQUE MOTION (structures visuelles)
│   │   ├── index.ts               barrel public — importer depuis ici
│   │   ├── HeroTitle.tsx          titre principal / accroche
│   │   ├── SectionTitle.tsx       titre secondaire de section
│   │   ├── FlowDiagram.tsx        circulation A → B → C
│   │   ├── ProcessSteps.tsx       séquence d'actions numérotées
│   │   ├── CodeShowcase.tsx       extrait de code animé
│   │   ├── Comparison.tsx         deux approches côte à côte
│   │   ├── Callout.tsx            message fort (info/success/warning/important)
│   │   ├── InfoCard.tsx           carte d'information
│   │   ├── AnimatedList.tsx       liste à apparition séquentielle
│   │   ├── Stat.tsx               chiffre clé (option compteur)
│   │   ├── BeforeAfter.tsx        transformation avant → après
│   │   ├── NodeGraph.tsx          petit schéma de blocs connectés
│   │   ├── MascotScene.tsx        contenu + mascotte
│   │   └── shared/                primitives internes (tokens, stagger, …)
│   └── outro/                     GoldenGabOutro
│
├── compositions/                  ASSEMBLAGE DES COMPOSITIONS REMOTION
│   ├── index.tsx                  styleguide + dossiers de toutes les séries
│   └── Styleguide.tsx             composition de QA du design system
│
├── scenes/                        SYSTÈME DE SCÈNES NARRATIVES AUDIO-AWARE
│   ├── types.ts                   Episode / Scene + helpers de timing
│   ├── registry.tsx               type narratif et visuel → composant Motion
│   ├── renderer.tsx               validation + placement sur la timeline
│   └── index.ts                   API publique
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
| une structure visuelle réutilisable (titres, flux, code…) | `src/components/motion/` |
| un composant propre à une série | `src/series/<serie>/components/` |
| une nouvelle vidéo | `src/series/<serie>/videos/` + enregistrement dans `src/series/<serie>/index.tsx` |
| une nouvelle série | `src/series/<serie>/` + une ligne dans `src/series/index.ts` |
| les types et le rendu des scènes d'épisode | `src/scenes/` |
| un helper réutilisable | `src/utils/` |
| une donnée de contenu d'une série | `src/series/<serie>/data/` |
| un asset de marque | `public/assets/` (puis `src/config/assets.ts` si réutilisé) |
| une pose de la mascotte | `public/assets/images/mascot/` + `src/config/assets.ts` + `src/components/mascot/poses.ts` |
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
| `GoldenGabMascot` | mascotte (personnage récurrent) | `pose`, `attitude`, `position`, `size`, `entrance` | image animée |
| `GoldenGabLogo` | logo de marque | `width`, `style` | image |
| `GoldenGabWatermark` | filigrane | `position`, `width`, `opacity` | image en coin |
| `BrandBackground` | fond de marque | `variant`, `motif`, `bottomScrim` | fond plein cadre |
| `BrandMotif` | texture de motif | `scale`, `opacity` | texture |
| `BrandText` | texte typé | `role`, `as`, `color`, `align` | texte |
| `SafeArea` | respect des marges TikTok | `inset`, `justify` | conteneur |
| `AnimatedAppear` | apparition/disparition | `animation`, durées, `delaySeconds` | conteneur animé |

Ces composants sont **agnostiques de la série** : tout ce qui est spécifique
passe par des props.

## Bibliothèque Motion — `src/components/motion`

Un socle de **structures visuelles récurrentes** des vidéos éducatives /
techniques. Un composant Motion représente une *structure* (`FlowDiagram`),
jamais une scène d'une vidéo donnée (`DataEngineerExplanation`).

### Deux niveaux : primitives et composants

| Niveau | Emplacement | Rôle | Exemple |
| --- | --- | --- | --- |
| **Primitives partagées** | `src/components/motion/shared/` | tokens, rythme, rendu (pas de contenu) | `Connector`, `CodeBlock`, `getStaggerDelay()` |
| **Composants Motion** | `src/components/motion/*.tsx` | une structure visuelle complète, animée | `FlowDiagram`, `CodeShowcase` |
| **Systèmes transverses** | `src/captions/`, `src/components/mascot/`, `intro/`, `outro/`, `brand/` | déjà existants | `<Captions>`, `<GoldenGabMascot>` |

Les primitives **ne s'affichent jamais seules** : elles ne donnent ni fond ni
contenu. Les composants Motion s'appuient dessus (sinon, un doublon reviendrait
à dupliquer une animation — règle 45).

### Contenu de `shared/`

| Fichier | Rôle |
| --- | --- |
| `tokens.ts` | `MotionTone` (light/dark), `MotionAccent` (alias de la palette uniquement), `getMotionSurface()`, `getMotionCardStyle()` — la seule source de couleurs de la bibliothèque |
| `stagger.ts` | `getStaggerDelay()` / `getStaggerDelays()` / `getConnectorDelay()` : le rythme d'escalier, calé sur `defaultStagger` |
| `highlight.ts` | tokeniseur de code minimal (TS/JS/JSON/bash/python) + `codeTokenColors` (palette seule) |
| `CodeBlock.tsx` | rendu d'un extrait : coloration, numéros, lignes mises en évidence, diff, révélation ligne par ligne ou machine à écrire |
| `Connector.tsx` | trait animé avec flèche (option `head`), utilisé par `FlowDiagram`, `ProcessSteps`, `BeforeAfter` |
| `index.ts` | barrel : `import { … } from "../shared"` |

### Responsabilité de chaque composant

| Composant | Répond à | Entrées principales | Variantes |
| --- | --- | --- | --- |
| `HeroTitle` | « quel est le sujet ? » | `title`, `eyebrow?`, `emphasis?`, `subtitle?` | `default` · `centered` · `compact` |
| `SectionTitle` | « on change de partie » | `title`, `number?`, `eyebrow?` | `default` · `accent` · `numbered` |
| `FlowDiagram` | « par où ça passe ? » | `nodes[]`, `direction` | `horizontal` · `vertical` |
| `ProcessSteps` | « dans quel ordre ? » | `steps[]`, `activeStep?`, `orientation` | `vertical` · `horizontal` |
| `CodeShowcase` | « montre le code » | `code`, `language?`, `highlightLines?` | `default` · `highlight` · `diff` |
| `Comparison` | « quelles sont les deux options ? » | `left{}`, `right{}` | `columns` · `stack` |
| `Callout` | « retiens ça » | `text`, `title?`, `icon?` | `info` · `success` · `warning` · `important` |
| `InfoCard` | « c'est quoi, en une carte ? » | `title`, `description?`, `icon?`, `badge?` | — |
| `AnimatedList` | « liste à faire apparaître » | `items[]`, `marker?`, `title?` | `check` · `number` · `bullet` · `icon` |
| `Stat` | « un chiffre qui compte » | `value`, `suffix?`, `label?`, `count?` | `compact` · `default` · `hero` |
| `BeforeAfter` | « qu'est-ce qui a changé ? » | `before{}`, `after{}` | — |
| `NodeGraph` | « comment le système est-il branché ? » | `nodes[]`, `edges[]` | — |
| `MascotScene` | « explique à côté » | `content?`, `mascot{}` | — |

**`FlowDiagram` ≠ `ProcessSteps`** : le premier montre une *relation*
(circulation, fan-out), le second une *séquence d'actions* (étapes numérotées,
étape active). **`Comparison` ≠ `BeforeAfter`** : options parallèles vs états
successifs reliés par une flèche.

### Règles d'import

```ts
// ✅ depuis le barrel de la famille
import { HeroTitle, FlowDiagram, CodeShowcase } from "../../components/motion";

// ✅ une extension précise, quand on a besoin d'un type
import type { FlowNode } from "../../components/motion";

// ⚠️ jamais depuis une série
import { FlowDiagram } from "../series/metiers-de-la-tech/…"; // INTERDIT
```

- `src/components/motion` est **global** : il ne doit jamais importer depuis
  `src/series` (règle 11) ni connaître un contenu de série.
- Les primitives `shared/` sont internes : les importer via le barrel de la
  famille, pas chemin par chemin depuis un composant d'une autre famille.

### Styleguide = galerie

`src/compositions/Styleguide.tsx` contient une scène par composant Motion
(`Motion · HeroTitle`, `Motion · FlowDiagram`…). Chaque scène montre le rendu
principal, au moins une variante et du contenu réaliste générique. C'est la
**galerie visuelle** à consulter avant de modifier un composant.

### Ajouter un composant Motion

1. **Vérifier qu'il n'existe pas déjà** (`src/components/motion`,
   `src/components/common`, `src/captions`) — si un doublon paraît possible,
   améliorer l'existant plutôt que d'ajouter (règle 44).
2. Créer `src/components/motion/MonComposant.tsx` : un fichier = un composant,
   en `React.FC<Props>` avec un type `Props` en propriétés `readonly`.
3. Seules des **données** entrent : pas de JSX d'usage en `children` quand une
   structure (`nodes[]`, `steps[]`, `items[]`) suffit.
4. S'appuyer sur `shared/` : `MotionTone`/`MotionAccent` pour les couleurs,
   `getMotionCardStyle()` pour la surface, `getStaggerDelay()` +
   `<AnimatedAppear />` pour l'entrée, `Connector` pour les traits.
5. **2 à 4 variantes maximum**, et seulement si le besoin est réel.
6. Exporter depuis `src/components/motion/index.ts` (+ types).
7. Ajouter une scène dans `src/compositions/Styleguide.tsx` et ajouter sa
   durée à `STYLEGUIDE_DURATION_IN_SECONDS`.
8. Documenter : `docs/ARCHITECTURE.md` (ce fichier), `docs/RULES.md` et
   `docs/DESIGN-SYSTEM.md` (API + principes visuels/motion).
9. `npm run lint` puis `npx remotion compositions` et un rendu du styleguide.

## Système de mascotte

La mascotte est un **personnage global** (toutes séries), au même niveau
conceptuel que l'intro, l'outro et les captions — pas un décor propre à une
vidéo. Voir aussi `docs/DESIGN-SYSTEM.md` (section « Mascotte Golden Gab »).

```text
src/components/mascot/
├── GoldenGabMascot.tsx   le composant : <GoldenGabMascot />
├── poses.ts              registre pose → asset (+ poses prévues, sans asset)
├── positions.ts          positions, tailles, ancrages (zone sûre / captions)
├── animations.ts         attitudes + micro-mouvements (respirement)
├── types.ts              MascotPose, MascotAttitude, MascotFacing, MascotSize…
└── index.ts              barrel (API publique)
```

**Assets**

- Source unique : `public/assets/images/mascotte.png` (pose `point`,
  1254×1254, fond transparent) — jamais modifiée.
- Futures poses : `public/assets/images/mascot/<pose>.png` (dossier réservé).
- Chemins déclarés dans `mascotAssets` (`src/config/assets.ts`) ; le registre
  `mascotPoses` (`src/components/mascot/poses.ts`) associe chaque pose à son
  asset. Les composants ne connaissent aucun chemin en dur (règle 21).

**Ajouter une pose**

1. déposer l'asset dans `public/assets/images/mascot/` ;
2. l'ajouter dans `mascotAssets` (`src/config/assets.ts`) ;
3. l'enregistrer dans `mascotPoses` (`src/components/mascot/poses.ts`)
   (`src`, `label`, `aspectRatio`, `description`) ;
4. éventuellement ajouter une attitude dans `mascotAttitudes`
   (`src/components/mascot/animations.ts`).

Le type `MascotPose` est **dérivé du registre** : la nouvelle pose devient
utilisable immédiatement, sans toucher aux vidéos existantes. Tant qu'une
pose n'est pas dans le registre, `pose="…"` ne compile pas.

**Utiliser la mascotte dans une vidéo**

```tsx
import { GoldenGabMascot } from "../../components";

// Dans une <Sequence>, à côté des captions et des titres :
<GoldenGabMascot
  pose="point"
  attitude="confident"
  position="right"
  entrance="slide-up"
/>
```

`position` est calculé depuis `safeArea` / `captionZone` : la mascotte reste
dans la zone sûre et hors de la zone captions. La prop `position="flow"`
l'insère à la place dans le flux du layout parent.

**Pourquoi global et non spécifique à `metiers-de-la-tech` ?**

Le personnage porte l'identité **Golden Gab**, pas le thème d'une série : il
peut introduire, expliquer ou conclure n'importe quelle vidéo de n'importe
quelle série, comme `GoldenGabIntro` ou `Captions`. Un composant de
`src/components` ne doit jamais importer depuis `src/series` (règle 11) :
seuls des comportements réellement spécifiques à une série pourraient vivre
dans `src/series/<serie>/components/`.

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

## Système de scènes audio-aware

`src/scenes` sépare le timing et le rôle narratif des composants visuels Motion.
Les scènes stockent `start` / `end` en secondes ; `SceneRenderer` convertit ces
bornes avec le `fps` Remotion courant et les place dans une `<Sequence>`.
`EpisodeRenderer` valide l'épisode avant de rendre ses scènes.

```tsx
import { EpisodeRenderer, getEpisodeDurationFrames } from "../scenes";

const durationInFrames = getEpisodeDurationFrames(episode, fps);
<EpisodeRenderer episode={episode} />;
```

Une scène doit avoir un identifiant unique dans l'épisode, un début non négatif,
une fin strictement supérieure au début et un composant visuel connu. Les scènes
doivent être listées chronologiquement ; les trous sont permis, les chevauchements
ne le sont pas tant que les transitions ne sont pas implémentées. Les conversions
secondes → frames passent par `src/utils/time.ts`.

Le `type` décrit le rôle narratif (`hero`, `diagram`, `conclusion`, etc.) ;
`visual.component` sélectionne le composant visuel dans le registry (ex. `FlowDiagram`).
Les props visuelles sont des données pour ce composant. Les champs de transition,
caption et mascotte font partie du modèle, mais leur orchestration automatique
n'est pas fournie par M02 : les transitions et le branchement complet audio/captions
restent des étapes ultérieures de la roadmap.

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
