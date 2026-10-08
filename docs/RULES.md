# RULES — règles à respecter

> Règles **non négociables** pour toute modification de ce repository,
> par un humain comme par un agent IA.
> Si une tâche semble exiger d'en casser une, s'arrêter et le signaler.

## 1. Design system

1. **Ne jamais écrire une couleur en dur** dans un composant. Utiliser
   `colors` / `palette` (`src/config/colors.ts`) ; pour une transparence,
   `withAlpha()` (`src/utils/color.ts`).
2. **Ne jamais écrire une `fontFamily`, une taille ou une graisse en dur.**
   Utiliser `textRoles`, `typeScale`, `fontWeights` (`src/config/typography.ts`)
   ou le composant `<BrandText role="…" />`.
3. **Darker Grotesque est la police des titres.** Ne pas la remplacer, ne pas
   la charger ailleurs que dans `src/config/typography.ts`.
4. **Ne jamais écrire une dimension de vidéo en dur** : `videoFormat`
   (`src/config/video.ts`).
5. **Ne jamais écrire une durée d'animation en dur** : `durations`, `easings`
   (`src/config/animation.ts`).
6. **Respecter la zone sûre** : le contenu important passe par `<SafeArea>` ou
   `safeArea` (`src/config/video.ts`).

## 2. Composants

7. **Ne pas dupliquer un composant.** Chercher avant de créer
   (`src/components`, `src/captions`).
8. **Réutiliser plutôt que recréer** : une nouvelle vidéo doit d'abord essayer
   de composer l'existant.
9. **Ne pas créer une variante d'un composant quand une variante existante peut
   être paramétrée.** Ajouter une prop ou un preset, pas un nouveau composant.
10. **Privilégier la composition de composants** à l'ajout de logique dans un
    composant existant.
11. **Un composant générique ne connaît aucune série.** Un composant de
    `src/components` ou `src/captions` ne doit **jamais** importer depuis
    `src/series`.
12. **Pas d'abstraction inutile** : un composant utilisé une seule fois reste
    dans sa vidéo.

## 3. Architecture

13. **Ne pas modifier l'architecture globale pour une seule vidéo.** Une vidéo
    s'ajoute dans `src/series/<serie>/videos/` et se déclare dans le `index.tsx`
    de sa série.
14. **Ajouter une série ne touche qu'un seul fichier global** :
    `src/series/index.ts`.
15. **`src/Root.tsx` ne déclare aucune composition métier.**
16. **Une composition est déclarée à côté du composant qu'elle référence**, avec
    ses métadonnées en clair (`id`, `durationInFrames`, `fps`, `width`,
    `height`, `defaultProps` littéraux).
17. **Ne pas supprimer les fichiers du template** (`src/CaptionedVideo/`,
    `public/theboldfont.ttf`, `sub.mjs`, `whisper-config.mjs`) : ils servent de
    référence et alimentent le pipeline de transcription.
18. **Nommer les `id` de composition** `<prefixe-série>-<slug>` en kebab-case.

## 4. Assets

19. **Ne pas déplacer ni renommer les assets** de `public/assets/images/`.
20. **Ne pas modifier les fichiers sources** de la marque
    (`logo couleur1.png`, `couelur.png`, `motif.png`). Une déclinaison se crée
    dans `public/assets/images/derived/`.
21. **Ne jamais écrire un chemin d'asset en dur** : passer par
    `src/config/assets.ts` (`staticFile`).
22. **Ne pas redessiner un élément de marque** (logo, motif) qui existe déjà.

## 5. Code

23. **TypeScript strict** : tout ce qui est exporté est typé ; pas de `any`.
24. **Pas d'import mort** : `noUnusedLocals` est activé, le lint doit passer.
25. **API de `lib` limitée à `es2015`** : ne pas utiliser
    `Array.prototype.includes`, `Object.entries`, `String.padStart`,
    `Array.prototype.flat`… Utiliser `indexOf`, `Object.keys`, `.concat`.
26. **Animations pilotées par le temps Remotion** : `useCurrentFrame()` +
    `interpolate()` / `spring()`. Jamais de `transition` ou `animation` CSS.
27. **Pas d'image de fond CSS** (`background-image`) : Remotion déconseille cet
    usage et le lint le refuse. Utiliser `<CanvasImage>` / `<Img>`.
28. **Tout composant temporel reçoit `premountFor={fps}`** (via `useVideoConfig()`).
29. **Pas de dépendance sans raison.** Avant d'installer un paquet, vérifier si
    Remotion, React ou le projet ne résolvent pas déjà le besoin. Les paquets
    `@remotion/*` s'ajoutent avec `npx remotion add <pkg>` (versions alignées).
30. **Le code de production ne dépend pas d'une devDependency.** Un paquet
    importé depuis `src/` doit être en `dependencies`.

## 6. Documentation

31. **Toute décision structurante se documente** dans `docs/` :
    - nouvelle famille de composants → `ARCHITECTURE.md` ;
    - nouveau token / usage de la DA → `DESIGN-SYSTEM.md` ;
    - nouvelle règle → `RULES.md`.
32. **Ne pas inventer une valeur de la DA.** Si une information n'est pas
    identifiable dans les assets, la signaler comme incertaine plutôt que de la
    présenter comme une règle (`docs/DESIGN-SYSTEM.md`).

## 7. Vérification avant de terminer

33. `npm run lint` doit passer (`eslint src && tsc`).
34. `npx remotion compositions` doit lister les compositions attendues.
35. Le rendu du `Styleguide` (`npx remotion still Styleguide out/frame.png
   --frame=<n>`) doit rester correct après un changement de design system.
36. Ne pas casser la composition `CaptionedVideo` du template.

## 8. Mascotte Golden Gab

37. **Réutilisation** — Toujours passer par `<GoldenGabMascot />`
    (`src/components/mascot/`) plutôt que d'importer `mascotte.png`
    directement dans une vidéo. Le composant gère zone sûre, placement et
    animations.
38. **Assets** — Ne jamais modifier l'asset source
    `public/assets/images/mascotte.png` sans raison. Une variante se crée
    dans `public/assets/images/derived/` ou `public/assets/images/mascot/`.
39. **Poses** — Ne jamais utiliser une pose qui ne possède pas d'asset réel.
    Une pose n'existe que si elle est dans le registre `mascotPoses`
    (`src/components/mascot/poses.ts`) : `pose="…"` ne compile pas sinon.
    Ne pas générer de pose par IA pour simuler une posture.
40. **Narration** — La mascotte doit servir la narration et non simplement
    remplir l'espace : elle n'est pas présente « par défaut » dans chaque
    scène, seulement quand elle accompagne l'explication.
41. **Composition** — La mascotte ne doit pas masquer les informations
    importantes (titres, chiffres, captions) : choisir la position et la
    taille selon la scène, jamais systématiquement le même ancrage ni la
    même échelle.
42. **Cohérence** — Les animations de la mascotte doivent rester cohérentes
    avec la direction artistique Golden Gab : courtes, fluides, sans effet
    cartoonesque (entrées via `AnimatedAppear`, micro-mouvements via
    `src/components/mascot/animations.ts`).
43. **Séries** — La mascotte appartient au système global Golden Gab
    (`src/components/mascot/`) : ne pas la placer dans
    `src/series/metiers-de-la-tech/`, sauf pour des comportements ou
    composants strictement spécifiques à cette série.

## 9. Bibliothèque Motion (`src/components/motion`)

44. **Réutiliser avant de créer** — Avant d'écrire un composant, chercher dans
    la bibliothèque Motion (`src/components/motion`), `src/components/common`
    et `src/captions`. Si un composant existant peut être paramétré pour le
    besoin, **améliorer l'existant** plutôt que d'en créer un nouveau (une prop
    ou un preset plutôt qu'un composant).
45. **Ne pas dupliquer les animations** — Les entrées passent par
    `<AnimatedAppear />`, `src/utils/animation.ts` et `getStaggerDelay()`
    (`shared/stagger.ts`) ; les traits animés par `Connector` ; les courbes et
    durées viennent de `src/config/animation.ts`. Réécrire `interpolate()`
    avec les mêmes courbes dans un composant = signature motion à deux vitesses.
46. **Pas de composant pour une seule vidéo** — Un composant Motion doit servir
    au moins plusieurs scènes / plusieurs séries. Si une structure ne sert
    qu'une fois, elle vit dans la vidéo elle-même (règle 12).
47. **Ne jamais créer de palette par composant** — Les composants Motion ne
    choisissent que parmi `MotionTone` (`light`/`dark`) et `MotionAccent`
    (`accent`/`secondary`/`neutral`/`ink`), via `shared/tokens.ts`. Aucune
    autre hexadécimale n'est autorisée (règle 1 renforcée).
48. **2 à 4 variantes maximum** — Une variante doit répondre à un besoin visuel
    réel et différent. Ni `variant1…variant17`, ni une variante « au cas où ».
    Un composant sans variante est tout à fait acceptable.
49. **API orientée données** — Préférer `<FlowDiagram nodes={…} />` à un API
    par `children` JSX, pour qu'un agent IA puisse générer une scène depuis un
    script. Le JSX libre n'est réservé qu'à `content` de `MascotScene` et aux
    composants réellement composites.
50. **Toujours dans `src/components/motion/`** — Un composant Motion ne va
    jamais dans `src/series/<serie>/components/` (règle 11). L'inverse est
    autorisé : une série peut importer la bibliothèque Motion.
51. **Attention aux valeurs sans unité** — React interprète `lineHeight: 48`
    comme un **ratio** (48 × la taille de police) et non comme 48 px. Toute
    valeur de ce type doit être un ratio (`1.4`) ou une chaîne (`"48px"`), ou
    venir de `getTextStyle()`.
52. **Styleguide à jour** — Toute modification d'un composant Motion est
    vérifiée dans `src/compositions/Styleguide.tsx` (scènes `Motion · …`), en
    incluant au minimum un rendu long, un rendu court et une variante.

## 10. Gestion mémoire projet / context budget

53. **Mémoire de projet obligatoire** — Le repository garde une mémoire de
    travail compacte dans `docs/ROADMAP.md` et `docs/DECISION_LOG.md`. Ces
    fichiers sont la source de vérité pour le contexte de production, les
    priorités, les changements récents et les décisions structurantes.
54. **Lecture ciblée avant toute tâche** — Avant de commencer une tâche, un
    agent lit d'abord `docs/ROADMAP.md` puis les entrées récentes de
    `docs/DECISION_LOG.md`. Il ne doit pas relire l'ensemble du repository pour
    comprendre le contexte si les fichiers de mémoire suffisent.
55. **Sortir le contexte du code** — Les décisions, changements de direction,
    blocages, choix de conception et dépendances d'exécution doivent être
    consignés dans `docs/DECISION_LOG.md` au lieu d'être redistribués dans des
    conversations ou des fichiers multiples.
56. **Compact / précis** — Une entrée du `docs/DECISION_LOG.md` doit être courte,
    factuelle et directement exploitable pour la suite. Une entrée ne doit pas
    répéter la documentation technique déjà fiable ; elle doit résumer le
    changement, son impact et le prochain point de décision.
57. **Mise à jour de la roadmap** — Si une tâche change la priorité, valide
    une étape de la roadmap, révèle un blocage majeur ou produit une nouvelle
    décision structurante, l'agent met à jour `docs/ROADMAP.md` dans les 24h (ou
    au moment de la validation de la tâche). Les tâches non impactantes ne
    doivent pas provoquer de churn de documentation.
58. **Prioriser le signal sur la quantité** — L'agent doit lire le minimum
    nécessaire pour la tâche, puis aller directement sur les fichiers ciblés.
    Le but est d'économiser les tokens et le temps sans perdre la compréhension
    du projet.
59. **Format d'écriture attendu** — Les entrées de `docs/DECISION_LOG.md` suivent
    un format compact : `date`, `scope`, `files`, `decision`, `impact`,
    `validation`, `roadmap`, `next`.
60. **Règle d'or** — Un agent ne part jamais d'une tâche sans connaître le
    dernier état du projet et n'achève pas une tâche sans laisser une trace
    exploitable pour le prochain agent.

## 11. Couche Audio / Transcript (`src/audio`)

61. **Unité de temps** — Les types `AudioTrack`, `Transcript` et
    `TranscriptSegment` expriment le temps en **secondes**, comme `Scene.start`
    / `Scene.end`. La conversion vers les millisecondes des captions se fait
    uniquement dans `src/audio/captions.ts`.
62. **Pas de dépendance à un provider** — La couche audio/transcript ne dépend
    d'aucun provider de transcription (Whisper, API). Un provider s'ajoute en
    implémentant `TranscriptionProvider`, sans toucher aux composants visuels
    ni au modèle de données.
63. **Pas de composant pour les timestamps** — La logique temporelle de
    `src/audio` reste pure, sans React ni Remotion ; le lien avec les captions
    passe par `transcriptToCaptions`, jamais par un composant dédié.

## 12. Épisode audio-driven (`src/scenes`)

64. **Audio comme source de vérité** — Un `Episode` référence son `AudioTrack`
    et son `Transcript`. La durée d'un épisode est celle de l'audio
    (`getEpisodeDurationFrames`), jamais un maximum de durées de scène.
65. **Bornes alignées sur l'audio** — Aucune scène (ni segment de transcript) ne
    dépasse `audio.duration`. `validateEpisode()` rejette un épisode incohérent
    avant rendu : ordre croissant, pas de chevauchement, `type` connu
    (`sceneTypes`), composant visuel renseigné.
66. **Logique d'épisode pure** — La validation, la durée, le branchement des
    captions et la lecture du transcript par scène vivent dans
    `src/scenes/episode.ts` (sans React/Remotion) ; `renderer.tsx` ne fait que
    le rendu. Les captions d'un épisode se dérivent du transcript
    (`getEpisodeCaptions`), elles ne sont pas ressaisies à la main.
67. **Révélations internes audio-aware** — Pour séquencer les éléments d'un
    `FlowDiagram` ou d'une `AnimatedList`, renseigner `visual.revealOffsets`
    en secondes depuis le début de la scène, une valeur croissante par élément
    (une valeur par élément) ; `validateEpisode()` en vérifie les bornes. Sans
    timing éditorial explicite, conserver le stagger par défaut du composant.

## 13. Direction vidéo et intention éditoriale

68. **Source de vérité créative** — Avant de créer ou modifier une vidéo,
    consulter `docs/VIDEO-DIRECTION.md` ; ses principes s'appliquent à toutes
    les séries sans que l'utilisateur ait à les répéter.
69. **Traduire la narration en image** — Chaque idée importante doit avoir un
    visuel qui l'explique ou la matérialise (données, objets, schémas,
    métaphores visuelles), pas seulement un titre ou une carte statique.
70. **Mouvement pendant la phrase** — Le changement de scène ne suffit pas :
    les éléments d'une scène doivent apparaître, évoluer ou se transformer
    progressivement, synchronisés avec les mots et phrases de la narration.
    Utiliser les composants Motion existants avant d'en créer.
71. **Captions mot courant** — Pour une vidéo audio-driven, utiliser le preset
    `highlight` sauf indication éditoriale contraire : mot courant blanc sur
    cartouche bleu nuit, autres mots blancs détourés, selon la palette et la
    capture de référence documentée.
72. **Mascotte intentionnelle** — Faire intervenir la mascotte aux moments où
    elle sert le récit, avec une expression/pose disposant d'un asset réellement
    enregistré. Ne pas inventer ni simuler une pose manquante ; voir
    `docs/VIDEO-DIRECTION.md` pour le statut des assets.
