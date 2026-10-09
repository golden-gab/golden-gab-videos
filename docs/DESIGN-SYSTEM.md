# DESIGN-SYSTEM — Golden Gab

> Direction artistique, tokens et usages.
> **Méthode :** tout ce qui suit provient d'une inspection pixel des assets de
> `public/assets/images/`. Les valeurs mesurées sont données ; les choix
> d'ingénierie (qui ne viennent pas des assets) sont signalés comme tels.
> **Rien n'a été inventé comme "valeur de marque"** : voir la section
> « Incertitudes » à la fin.

## 1. Couleurs

### Source

`public/assets/images/couelur.png` (13762×5507) est la **planche de couleurs de
la marque** : elle contient exactement 6 échantillons, dans cet ordre
(de gauche à droite) :

| # | Valeur relevée | Nom Golden Gab | Alias sémantique |
| --- | --- | --- | --- |
| 1 | `#FFFFFF` | White | `colors.surfaceLight` |
| 2 | `#DBD0D0` | Rose gris | `colors.neutral` |
| 3 | `#D45D3A` | Corail | `colors.accent` |
| 4 | `#2D4057` | Bleu nuit | `colors.secondary` |
| 5 | `#2B2C2C` | Charbon | `colors.ink` |
| 6 | `#F7F4F2` | Crème | `colors.surface` |

Ces 6 valeurs sont encodées dans `src/config/colors.ts` (`palette`, puis
`colors` pour les alias). **C'est la source de vérité.**

> Les noms (« Corail », « Bleu nuit »…) sont une convention interne : la planche
> n'est pas légendée. Les alias sont là pour éviter de raisonner en teintes
> quand on code.

### Règles d'usage

| Usage | Couleur |
| --- | --- |
| Accent, mot mis en avant, CTA | `colors.accent` (corail) |
| Fond clair, surface par défaut | `colors.surface` (crème) |
| Fond sombre | `colors.surfaceDark` (bleu nuit) |
| Texte sur fond clair | `colors.ink` (charbon) |
| Texte sur fond sombre | `colors.inkInverse` (crème) |
| Contour de texte sur vidéo | `colors.outline` (bleu nuit) |
| Neutre chaud (séparateurs, cartes) | `colors.neutral` (rose gris) |
| Mise en évidence des captions | `colors.captionHighlight` (corail) |

**Contrainte importante :** le logo est **bicolore** (corail + bleu nuit). Sur
un fond bleu nuit, sa partie navy disparaît. Les écrans à logo
(`GoldenGabIntro`, `GoldenGabOutro`, scène « Marque » du styleguide) utilisent
donc la variante de fond **claire**. Voir « Incertitudes ».

## 2. Typographies

### Titres — Darker Grotesque

Police des **titres**, donnée par le brief de marque. Elle n'est pas présente
dans les assets : aucun fichier de police n'a été trouvé dans le repository
(seul `public/theboldfont.ttf`, la police du template, existe — elle n'est pas
utilisée par le design system Golden Gab).

Implémentation :

- chargée via `@remotion/google-fonts/DarkerGrotesque` dans
  `src/config/typography.ts` (graisses 300 → 900, sous-ensembles `latin` +
  `latin-ext`) ;
- jamais déclarée dans un composant : utiliser `fontFamilies.title`,
  `textRoles` ou `<BrandText />`.

**Contour des captions :** Darker Grotesque a des fûts fins pour une police
d'affichage. Un contour épais (`-webkit-text-stroke`) **recouvre le
remplissage** du glyphe et rend le texte illisible. La valeur retenue est
`8px` (style `default`) ; au-delà, le blanc du texte se réduit fortement.
C'est un choix mesuré au rendu, pas une valeur de charte.

### Textes complémentaires — Inter

**Décision** (pas une donnée de marque) : Darker Grotesque est une police
d'affichage très condensée ; elle est excellente en grand mais peu lisible en
petit pour des libellés, des chiffres ou des mentions. **Inter** est utilisée
comme police complémentaire pour ces cas (rôles `body` et `label`), chargée via
`@remotion/google-fonts/Inter` (400/500/600/700).Si la marque fournit plus tard une police de texte, il suffit de changer `fontFamilies.body` dans `src/config/typography.ts`.

### Code affiché — JetBrains Mono

**Décision** (pas une donnée de marque) : les extraits de code
(`CodeShowcase`, `Comparison.diff`, `BeforeAfter`) nécessitent une police à
chasse fixe, sinon les lignes ondulent et l'alignement disparaît. **JetBrains
Mono** est chargée via `@remotion/google-fonts/JetBrainsMono` (400/500/700) et
exposée par `fontFamilies.mono` ; c'est la seule police utilisée par le rôle
`code` (rôle `textRoles.code`, taille `typeScale.code` = 40 px).

Elle n'est jamais déclarée dans un composant : tout passe par `textRoles.code`
ou `getTextStyle("code")`. Changer de police de code = changer
`fontFamilies.mono` dans `src/config/typography.ts`.

### Hiérarchie typographique

Échelle en pixels, pour une composition de **1080 px de large**
(`typeScale` dans `src/config/typography.ts`) :

| Rôle | Taille | Police | Graisse | Usage |
| --- | --- | --- | --- | --- |
| `display` | 180 | Darker Grotesque | 900 | accroche plein écran |
| `h1` | 132 | Darker Grotesque | 800 | titre d'écran |
| `h2` | 96 | Darker Grotesque | 700 | sous-titre |
| `h3` | 72 | Darker Grotesque | 600 | titre de carte |
| `caption` | 96 | Darker Grotesque | 900 | caption (taille max, réduite automatiquement) |
| `body` | 48 | Inter | 400 | texte courant |
| `code` | 40 | JetBrains Mono | 400 | code affiché (`CodeShowcase`, diffs) |
| `label` | 34 | Inter | 600 | libellés, mentions (capitales, lettrage espacé) |

Repères de lisibilité retenus : titre principal ≥ 84 px et texte secondaire
≥ 44 px pour une largeur de 1080 px.

## 3. Logo

### Composition observée

`public/assets/images/logo couleur1.png` (8334×8334, contenu utile
1606,1948 → 7329,5611) :

- **monogramme** : deux « G » côte à côte, le gauche en **corail**, le droit en
  **bleu nuit** ;
- **wordmark** en dessous : « GOLDEN » en **corail**, « GAB » en **bleu nuit**.

Le logo n'utilise que ces deux couleurs. Aucune autre déclinaison (monochrome,
fond clair/fond sombre, version texte seule) n'est fournie.

### Déclinaison prête à l'emploi

Le fichier source a de très larges marges transparentes (contenu utile ≈ 43 %
de la surface du canvas). Utiliser tel quel dans une vidéo donnerait un logo
minuscule au milieu d'un carré vide.

Une déclinaison **détourée et dimensionnée** a donc été générée :

```text
public/assets/images/derived/logo.png   1600 × 1024   ratio 1.5624
```

- Le fichier source n'a **pas** été modifié (règle 20 de `RULES.md`).
- C'est `brandAssets.logo` (donc la version utilisée par `GoldenGabLogo`).
- Le ratio est exposé via `brand.logoAspectRatio` : `GoldenGabLogo` en déduit la
  hauteur à partir de la largeur demandée.

### Usage

- Toujours passer par `<GoldenGabLogo width={…} />` : ne jamais réinsérer une
  copie du logo dans un composant.
- Filigrane : `<GoldenGabWatermark position="top-right" />`.
- Sur fond sombre : le logo bicolore n'est pas lisible (voir §1). Utiliser un
  fond clair, ou demander une déclinaison claire avant de l'utiliser sur navy.

## 4. Motif

`public/assets/images/motif.png` (8334×8334) : motif bleu nuit **très
discret** (alpha mesuré entre 1 et 29 / 255) sur fond transparent.

Deux constats mesurés :

1. **Ce n'est pas une tuile répétable.** Les bords gauche/droit et haut/bas ne
   se raccordent pas (écart moyen d'alpha ≈ 15/30), et la période du motif
   (≈ 2557 px) ne divise pas la taille du canvas. Le motif est donc rendu
   **d'un seul bloc** (`<CanvasImage fit="cover" />`), pas en répétition.
2. L'alpha étant très faible, il faut une **opacité supplémentaire** pour qu'il
   soit perceptible : `BrandMotif` / `BrandBackground` reçoivent une prop
   `opacity` / `motifOpacity` (ex. `0.2` pour un fond, `0.35` en démonstration).

Usage : `<BrandBackground variant="light" motif motifOpacity={0.2} />`, ou
`<BrandMotif scale={…} opacity={…} />` directement. Le motif ne doit **jamais**
être utilisé derrière un texte petit : il est décoratif, pas porteur
d'information.

## 5. Captions

Le style de captions est un preset (`src/captions/styles.ts`) couvrant
typographie, couleurs, gabarit et animations.

| Style | Rendu | Cible |
| --- | --- | --- |
| `default` | Darker Grotesque 900, capitales, texte blanc, contour bleu nuit 8 px, mot actif en corail | usage courant sur vidéo |
| `card` | bloc bleu nuit arrondi, texte crème, mot actif en corail | fonds vidéo clairs ou chargés |
| `subtle` | Darker Grotesque 600, casse normale, texte crème sur fond charbon translucide | passages posés / narratifs |
| `highlight` | Darker Grotesque 900, casse normale, texte blanc détouré, mot actif sur cartouche bleu nuit | narration creator, lecture mot à mot |

Principes :

- une page = **1 à 3 mots**, très courte (≤ 26 caractères, ≤ 2,6 s par défaut) ;
- la taille de police **s'adapte automatiquement** à la largeur disponible
  (`fitText`, avec 4 % de marge de sécurité), plafonnée par `maxFontSize` ;
- le mot prononcé est mis en évidence en corail (`emphasisMode: "word"`), ou
  tous les mots marqués `emphasis` restent en corail (`"segment"`) ;
- le preset `highlight` place le mot courant sur un cartouche `colors.secondary`
  et garde les autres mots en blanc détouré ; ce choix reprend la composition
  de la référence fournie tout en restant dans la palette de marque ;
- position par défaut : `bottom`, dans la zone captions (au-dessus de l'UI basse
  de TikTok).

## 6. Animations

| Paramètre | Valeur | Emplacement |
| --- | --- | --- |
| Entrée standard | `Easing.bezier(0.16, 1, 0.3, 1)` | `easings.entrance` |
| Sortie standard | `Easing.bezier(0.4, 0, 1, 1)` | `easings.exit` |
| Durées | `0.12 / 0.25 / 0.4 / 0.8 s` | `durations` |
| Animation par défaut | `pop` (échelle 0,82 → 1 + fondu) | `defaultAppearAnimation` |
| Décalage distant (escalier) | 0,15–0,2 s entre deux blocs | `delaySeconds` |
| Stagger par défaut de la bibliothèque Motion | `0,15 s` | `defaultStagger` |

Principes :

- animations **courtes** : une vidéo verticale doit rester lisible, pas
  spectaculaire ;
- entrées en `pop` ou `slide-up`, sorties en `fade` ;
- tout est réutilisable via `AnimatedAppear` ou les helpers de
  `src/utils/animation.ts` ; aucune transition CSS (Règle 26).

## 7. Composition et marges

| Constante | Valeur (base 1080×1920) | Emplacement |
| --- | --- | --- |
| Format | 1080 × 1920, 30 fps | `videoFormat` |
| Zone sûre (haut / bas / côtés) | 260 / 420 / 72 px | `safeArea` |
| Zone captions | bas 520 px, hauteur 420 px, 90 % de large | `captionZone` |
| Espacements | 8 / 16 / 24 / 40 / 64 / 96 / 140 px | `spacing` |
| Rayons | 12 / 24 / 40 / 64 px + `pill` | `radius` |
| Opacités | 0,08 / 0,16 / 0,4 / 0,72 / 1 | `opacity` |

Ces valeurs sont des **choix d'ingénierie** (lisibilité + UI de TikTok), pas des
valeurs extraites des assets. Elles sont centralisées pour être ajustées à un
seul endroit.

Principes visuels :

- un écran = une idée : le logo, un titre, ou une caption, pas les trois ;
- fond clair pour tout ce qui porte le logo ; fond sombre + motif pour les
  écrans de contenu, avec un dégradé sombre (`bottomScrim`) sous les captions ;
- le corail est un **accent** : il ne doit pas devenir une couleur de fond.

## 8. Mascotte Golden Gab

### Rôle narratif

La mascotte est le **personnage visuel récurrent** de Golden Gab : elle
accompagne et explique les concepts, comme un narrateur visuel. Elle intervient
quand elle sert la narration — introduction, explication à côté d'un élément,
question / réflexion, surprise, conclusion ou CTA — et **jamais
automatiquement** dans chaque scène.

Composant : `<GoldenGabMascot />` (`src/components/mascot/`), au même niveau
conceptuel que `GoldenGabIntro`, `GoldenGabOutro`, `Captions` et les éléments
de marque. Il est **global** : il appartient à toutes les séries.

```tsx
<GoldenGabMascot
  pose="point"
  attitude="confident"
  position="right"
  entrance="slide-up"
/>
```

### Apparence (relevé sur l'asset)

Source : `public/assets/images/mascotte.png` (1254×1254, **fond transparent** ;
contenu utile ≈ x 19 % → 75 %, y 2 % → 98 % : marges transparentes latérales).
Jeune garçon noir **sans traits du visage** (aucun œil, aucune bouche) :

| Élément | Valeur relevée | Observations |
| --- | --- | --- |
| Peau | `#985229` | brun, aplats simples |
| Casquette | `#1D385E` / `#264267` | bleu nuit |
| T-shirt | `#1A3457` | bleu nuit, plus foncé que `palette.navy` (`#2D4057`) |
| Logo sur le t-shirt | blanc | monogramme « gg » + wordmark « golden gab » |
| Short cargo | `#E4DAC5` | beige / crème |
| Chaussettes | blanc pur | hautes, au-dessus des chaussures |
| Chaussures | `#132642` + blanc | bleu nuit, semelles et bandes blanches |
| Contour | `#000000` (noir plein) | trait épais sur toute la silhouette — **pas** de contour blanc (mesure : 72–83 % des pixels de bord en noir pur, 100 % sombres) |

> Ces valeurs sont un **relevé pixel**, pas une charte : les bleus de la
> mascotte ne sont **pas identiques** à `palette.navy`. Ne pas en déduire un
> token de couleur (règle 32 de `RULES.md`).

Posture de l'asset : **bras droit levé, index en l'air** — c'est la pose
`point`. Ce n'est **pas** une posture par défaut obligatoire : la mascotte est
un personnage censé changer de posture selon le contenu.

### Poses — postures du corps

Une **pose** = une posture associée à **un asset PNG réel**. Une image plate
ne se déforme pas : changer de posture = changer d'asset.

| Pose | Asset | Statut |
| --- | --- | --- |
| `thinking` | `assets/images/mascot/mascot-thinking.png` | ✅ disponible |
| `surprised` | `assets/images/mascot/mascot-surprised.png` | ✅ disponible |
| `happy` | `assets/images/mascot/mascot-happy.png` | ✅ disponible |
| `explaining` | `assets/images/mascot/mascot-explaining.png` | ✅ disponible |
| `point` | `assets/images/mascot/mascot-point.png` | ✅ disponible |

Poses **prévues**, sans asset → **impossible** à passer au composant (le type
`MascotPose` les refuse à la compilation) :
`neutral`, `confused`.

Ajouter une pose : suivre le workflow en 5 étapes de **`docs/MASCOT-POSES.md`**
(brief → génération → candidats dans `_pending/` → **validation humaine** →
promotion).

```bash
node scripts/generate-mascot-pose.mjs <pose> --brief "…"   # 3 candidats dans _pending/
node scripts/promote-mascot-pose.mjs public/assets/images/mascot/_pending/<pose>-1.png <pose> --validated
```

La promotion met à jour `mascotAssets` (`src/config/assets.ts`) **et**
`mascotPoses` (`src/components/mascot/poses.ts`), normalise le cadrage sur
celui des poses existantes, et retire la pose de `mascotPlannedPoses`. Le type
`MascotPose` suit automatiquement : aucune vidéo existante à modifier.
**Aucune pose n'est enregistrée sans validation humaine explicite** (règle 39).

### Attitudes — rôle narratif

L'**attitude** décrit ce que la mascotte *joue* dans la scène ; elle ne change
pas sa posture. Elle module l'entrée, l'échelle, l'inclinaison et le
respirement (`mascotAttitudes`, `src/components/mascot/animations.ts`) :

| Attitude | Entrée | Échelle | Inclinaison | Respirement |
| --- | --- | --- | --- | --- |
| `neutral` | `pop` | 1 | 0° | 6 px / 3 s |
| `confident` | `slide-up` | 1,02 | −2° | 5 px / 3,2 s |
| `curious` | `fade` | 1 | +3° | 7 px / 2,6 s |
| `surprised` | `pop` | 1,05 | 0° | 10 px / 1,4 s |
| `excited` | `slide-up` | 1,03 | −3° | 12 px / 1,2 s |
| `serious` | `fade` | 0,98 | 0° | 2 px / 4 s |
| `confused` | `pop` | 1 | +4° | 6 px / 1,8 s |
| `friendly` | `slide-up` | 1,01 | +2° | 8 px / 2,4 s |

Aucune de ces valeurs ne modifie le dessin : elles sont volontairement
faibles — la mascotte *vit*, elle ne « cartoonise » pas.

### Placement

- Positions : `top-left`, `left`, `bottom-left`, `center`, `top-right`,
  `right`, `bottom-right` (ancrages dans la bande sûre) + `flow`
  (dans le flux du layout parent, ex. colonne `SafeArea`).
- Tout est calculé depuis `safeArea` et `captionZone`
  (`src/config/video.ts`) : la bande utile **s'arrête au-dessus de la zone
  captions**, la mascotte ne masque donc jamais les sous-titres.
- Tailles : `small` 280 px, `medium` 440 px, `large` 640 px de haut
  (choix d'ingénierie, base 1080 ; `large` ≈ la moitié de la bande utile).
- Décalages fins : `offset={{ x, y }}`, en pixels depuis l'ancrage.

Principes :

- ne jamais la placer devant un titre ou une donnée clé ;
- ne pas la mettre systématiquement au même endroit ni à la même taille ;
- choisir la position selon la composition de la scène (texte, schéma,
  captions) ; ancrage par défaut : `right`.

### Animation

- Entrée / sortie : `<AnimatedAppear />`, mêmes courbes que les captions et
  l'intro/outro (`easings.entrance` / `easings.exit`).
- `AppearAnimation` (projet) a été étendu avec `slide-left` et `slide-right`,
  glissements horizontaux utiles pour entrer depuis un côté (disponibles
  partout, pas seulement pour la mascotte).
- Micro-mouvement continu (« respirement ») : sinus piloté par
  `useCurrentFrame()` — jamais de CSS.
- Courts, fluides, lisibles, légèrement expressifs : pas de rebond
  cartoonesque ni d'effet générique.

### Règles pour les futurs assets

- L'asset source `mascotte.png` ne se modifie pas (règle 20 de `RULES.md`).
- Toute pose nouvelle vit dans `public/assets/images/mascot/` ; une
  déclinaison technique (recadrage, optimisation) dans `derived/`.
- Ne jamais déclarer une pose sans asset réel (règle 39).
- Ne pas générer une pose par IA « pour faire joli » : la posture doit être
  dessinée dans la DA de la marque (mêmes couleurs, même style, même logo).
- Une pose générée suit la fiche de cohérence et le workflow de
  `docs/MASCOT-POSES.md` : contour **noir**, fond transparent, cadrage ≈ 95 % de
  la hauteur, candidats dans `_pending/`, enregistrement **après validation
  humaine** uniquement.
- Le styleguide ne rend que les poses réelles : aucun faux aperçu.

## 9. Bibliothèque Motion — composants réutilisables

Les composants de `src/components/motion` (titre, flux, étapes, code,
comparaison, callout, carte, liste, chiffre, avant/après, schéma, mascotte, plus
l'enveloppe `SceneShell`) reprennent les tokens ci-dessus **sans en créer
aucun**. Trois notions suffisent à faire cohabiter toutes les scènes.

### 9.1 Tons et accents

| Concept | Valeurs autorisées | Correspondance |
| --- | --- | --- |
| `MotionTone` | `light` · `dark` | surface par défaut : crème/blanc, ou bleu nuit |
| `MotionAccent` | `accent` · `secondary` · `neutral` · `ink` | corail, bleu nuit, rose gris, charbon |

- **Rien d'autre n'est autorisé.** Les composants ne peuvent pas recevoir de
  couleur arbitraire : la palette reste celle de `src/config/colors.ts` (§1).
- `tone` règle **tout à la fois** : fond, contour, texte et texte secondaire
  (`getMotionSurface()`). Un composant sur `tone="dark"` s'auto-contraste — il
  reste lisible posé sur n'importe quelle scène.
- `accent` ne sert qu'aux éléments de mise en avant : pastille, puce, barre,
  trait.

### 9.2 Surfaces et motifs communs

| Motif | Réalisation | Utilisé par |
| --- | --- | --- |
| Carte encadrée | `getMotionCardStyle()` : fond du ton, contour 2 px, `radius.lg` (40), padding `spacing.lg` | `InfoCard`, `Callout`, `Comparison`, `BeforeAfter`, `FlowDiagram`, `NodeGraph` |
| Barre / liseré d'accent | couleur `accent`, `strokeWidths.medium` (8 px) | `InfoCard`, `NodeGraph`, `SectionTitle` |
| Pastille (badge, numéro) | `radius.pill` ou `radius.md`, fond `withAlpha(accent, 0.16)` | `InfoCard`, `FlowDiagram`, `ProcessSteps`, `AnimatedList` |
| Trait animé | `<Connector />`, `easings.entrance`, flèche en triangle (option `head: false` pour une simple liaison) | `FlowDiagram`, `ProcessSteps`, `BeforeAfter` |
| Panneau de code | fond `colors.surfaceDark` + contour crème 20 % + entête `withAlpha(cream, 8 %)` | `CodeShowcase`, `Comparison.diff`, `BeforeAfter` |

Le panneau de code est **toujours sombre**, quelle que soit la scène : c'est un
choix de lisibilité, la coloration (`codeTokenColors`) étant calibrée sur ce
fond. Elle n'utilise que des teintes de la palette : corail (mots-clés,
nombres), rose gris (chaînes, types), crème (texte, ponctuation), crème à
50 % (commentaires).

### 9.3 Rythme — la signature Motion

- **Escalier** : tout élément d'une série (node, étape, ligne de code, item)
  apparaît avec `getStaggerDelay(index)`, calé sur `defaultStagger` = **0,15 s**
  (`src/config/animation.ts`). Les connexions suivent à mi-parcours
  (`getConnectorDelay()`).
- **Entrées** : uniquement via `<AnimatedAppear />` — `pop` par défaut,
  `slide-up` pour les blocs de contenu, `fade` pour les traits. Mêmes courbes
  que les captions et l'intro/outro.
- **Durées** : `0,12 / 0,25 / 0,4 / 0,8 s` (§6). Rien ne dépasse : une vidéo
  verticale doit rester lisible, pas spectaculaire.
- **Tout est piloté par le temps** (`useCurrentFrame()`), jamais par du CSS
  (règle 26).

### 9.4 Variantes retenues

Une variante = un besoin visuel réel, jamais un numéro de version :

```text
HeroTitle      default · centered · compact
SectionTitle   default · accent · numbered
FlowDiagram    horizontal · vertical
ProcessSteps   vertical · horizontal
CodeShowcase   default · highlight · diff     (révélation : block · line · typewriter)
Comparison     columns · stack
Callout        info · success · warning · important
AnimatedList   check · number · bullet · icon
Stat           compact · default · hero
```

`InfoCard`, `BeforeAfter`, `NodeGraph` et `MascotScene` n'ont **aucune**
variante : leurs props suffisent.

### 9.5 Principes de composition

- Les composants s'insèrent dans une `<SafeArea>` : ils ne créent **pas** leur
  propre plein-cadre (sauf `MascotScene`, qui est une scène).
- Aucun composant ne définit sa position à l'écran : c'est le layout de la
  scène qui décide (colonne centrée, demi-largeur à côté de la mascotte…).
- Aucun composant ne s'auto-place au-dessus des captions ; `MascotScene` réserve
  la zone captions par défaut (`avoidCaptions`).
- Longueurs : les textes doivent pouvoir se casser sans déborder (les blocs
  passent par `width: 100%` + `minWidth: 0`), et `CodeShowcase` expose
  `maxLines` pour les extraits longs.

### 9.6 Mouvement de scène — `SceneShell`

Le mouvement « de cadre » (caméra, profondeur, grain, vignette) est isolé dans
`SceneShell` : une seule enveloppe, réglée par des données (`camera`,
`intensity`, `grain`, `vignette`), jamais recodée scène par scène. Elle
n'introduit **aucun token** : caméra lente sur `easings.linear`, grain en
neutre chaud (`neutral`), vignette en `colors.ink`, tout passant par les tokens.
Les transitions entre scènes sont des presets nommés par intention (`cut-doux`,
`glisse`, `balayage`, `coupe-franche`) appliqués via `scene.transition.scene`.
Voir `docs/ARCHITECTURE.md` (section Motion).

### 9.7 Assets externes — traitement DA

Une photo ou un b-roll brut ne respecte pas la DA : on le désature puis on
superpose `AssetTreatment` (`shared/assetTreatment.tsx`) — un voile **bleu nuit**
(`secondary`, `mixBlendMode: multiply`) pour les ombres et un voile **corail**
(`accent`, `mixBlendMode: screen`) pour les hautes lumières. Les icônes du
manifeste se colorent avec un token via `currentColor` (`LibraryIcon.accent`).
Aucune couleur libre : le traitement ne consomme que `MotionAccent`.

## 10. Incertitudes à trancher

Ces points **ne sont pas documentés par les assets**. Ils sont centralisés dans
le code pour être modifiés en un seul endroit, mais restent à valider avec la
marque :

1. **Noms des couleurs** — la planche `couelur.png` n'est pas légendée ; les
   noms et les alias sémantiques sont une convention interne.
2. **Police de texte** — Inter est un choix d'ingénierie, aucune police de texte
   n'est fournie.
3. **Déclinaison du logo sur fond sombre** — inexistante. Aujourd'hui les écrans
   à logo se limitent aux fonds clairs.
4. **Handle social** — `brand.handle` vaut `@goldengab` à titre provisoire.
5. **Baseline** — `brand.tagline` (« Les métiers de la tech, sans filtre. ») est
   provisoire.
6. **Motif** — l'asset n'est pas une tuile répétable et son échelle d'affichage
   n'est pas spécifiée ; la prop `scale` de `BrandMotif` est un réglage
   d'ingénierie.
7. **poids du contour des captions** — 8 px est un optimum mesuré au rendu, pas
   une valeur de charte.
8. **Poids des assets** — `motif.png` (8334×8334) et `couelur.png`
   (13762×5507) sont lourds pour un rendu vidéo. Ils fonctionnent, mais une
   version optimisée du motif accélérerait les rendus.
