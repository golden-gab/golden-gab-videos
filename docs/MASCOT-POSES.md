# Poses de la mascotte Golden Gab

Une **pose** = une posture du corps associée à **un PNG réel**. Une image plate
ne se déforme pas : changer de posture, c'est changer d'asset. Ce document décrit
le personnage, puis le workflow pour ajouter une pose **sans jamais enregistrer
une image non validée**.

> **Règle 39** (`docs/RULES.md` §8) : une pose ne peut être générée par IA que via
> ce workflow — sortie dans `public/assets/images/mascot/_pending/`, enregistrement
> dans `poses.ts` **uniquement après validation humaine explicite**. Interdit :
> simuler une pose par rotation, miroir ou recadrage d'une autre.

---

## 0. Méthode de cette fiche

La fiche est établie par **mesure programmatique** des 5 PNG réellement présents
dans `public/assets/images/mascot/` : dimensions, canal alpha, zone opaque
(boîte englobante), palette quantifiée, couleur des pixels de silhouette, profil
de couleur par bande verticale. Les mesures sont reproductibles (décodage PNG
sans dépendance) et ne sont **pas** des impressions visuelles.

⚠️ **Limite de cette session** : l'aperçu visuel n'a pas pu être capturé
(le panneau navigateur ne composait aucune image). La fiche ne décrit donc que
ce que la mesure démontre ; les éléments de **forme** (coiffure, accessoires,
monogramme) sont repris des documents déjà présents dans le repo
(`docs/DESIGN-SYSTEM.md` §8, descriptions de `poses.ts`) et signalés comme tels.
Aucun détail n'est inventé.

### Correction à connaître : le contour est **noir**, pas blanc

Le brief de départ mentionnait un « contour blanc ». **La mesure dit le
contraire** : parmi les pixels de bord de silhouette, **100 % sont sombres** et
**72 à 83 % sont du noir pur `#000000`**. Il n'existe aucun contour blanc
(0 % de pixels quasi blancs sur la silhouette).

| Pose | Pixels de bord analysés | `#000000` | Sombre | Quasi blanc |
| --- | --- | --- | --- | --- |
| `thinking` | 3 778 | 80 % | 100 % | 0 % |
| `surprised` | 4 505 | 83 % | 100 % | 0 % |
| `happy` | 4 816 | 79 % | 100 % | 0 % |
| `explaining` | 4 440 | 65 % | 100 % | 0 % |
| `point` | 4 914 | 72 % | 100 % | 0 % |

Le blanc de la planche (≈ 3 % des pixels opaques, `#F8F8F8`) est ailleurs :
**chaussettes, semelles / bandes des chaussures, logo du t-shirt**.

---

## 1. Fiche de cohérence du personnage

Relevé sur les 5 poses. Les valeurs entre parenthèses sont celles déjà
documentées dans `docs/DESIGN-SYSTEM.md` §8 (elles concordent).

| Élément | Valeur mesurée | Détail |
| --- | --- | --- |
| Personnage | jeune garçon noir, **sans traits du visage** | aucun œil, aucune bouche (repris de la doc existante, cohérent avec l'absence de tons de visage dans les bandes de couleur) |
| Casquette | `#183058` / `#183868` | bleu nuit, en haut du personnage dans les 5 poses (bande 1) |
| Peau | `#985028` (doc : `#985229`) | bras, mains, visage — apparaît en bande 2/3 |
| T-shirt | `#183058` | bleu nuit, plus foncé que `palette.navy` |
| Logo t-shirt | blanc `#F8F8F8` | monogramme « gg » + wordmark « golden gab » (doc §8) |
| Short cargo | `#E0D8C0` / `#B1ADA7` | beige / crème (bande 6-7) |
| Chaussettes | blanc `#F8F8F8` | hautes (bande 7-8) |
| Chaussures | `#183058` / `#102040` (doc : `#132642`) | bleu nuit, semelles et bandes blanches (bande 9-10) |
| **Contour** | **noir `#000000`**, plein, épais | sur toute la silhouette (voir §0) |
| Rendu | illustration vectorielle plate | aplats simples, ombrage minimal, pas de dégradé ni de texture photo |
| Fond | **100 % transparent** | aucun décor, aucune ombre portée |

Le **profil de couleur vertical est identique dans les 5 poses** — c'est ce qui
garantit qu'une pose neuve « lit » comme la même personne :

```
casquette (bleu nuit) → visage / peau (brun) → t-shirt (bleu nuit)
  → short (beige) → chaussettes (blanc) → chaussures (bleu nuit)
```

> Ces valeurs sont un **relevé pixel**, pas une charte de tokens. Les bleus de la
> mascotte ne sont **pas** identiques à `palette.navy`. Ne pas en déduire un
> token (règle 32 de `RULES.md`).

---

## 2. Cadrage et fond (contrainte de cohérence)

Les 5 poses partagent le même cadrage — une pose neuve doit le respecter, sinon
la mascotte change de taille d'une scène à l'autre.

| Pose | Fichier | Taille | Contenu utile | Part du cadre | Opaque | Marges T / B | L / R |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `thinking` | `mascot-thinking.png` | 1254² | 463 × 1209 | 96,4 % de la hauteur | 23,4 % | 2,6 % / 1,0 % | 33,7 % / 29,3 % |
| `surprised` | `mascot-surprised.png` | 1254² | 514 × 1158 | 92,3 % | 23,0 % | 5,9 % / 1,8 % | 31,3 % / 27,8 % |
| `happy` | `mascot-happy.png` | 1254² | 590 × 1198 | 95,5 % | 24,7 % | 2,6 % / 1,8 % | 27,6 % / 25,4 % |
| `explaining` | `mascot-explaining.png` | 1254² | 685 × 1193 | 95,1 % | 25,0 % | 2,7 % / 2,2 % | 17,1 % / 28,2 % |
| `point` | `mascot-point.png` | 1254² | 701 × 1206 | 96,2 % | 28,1 % | 2,4 % / 1,4 % | 19,4 % / 24,7 % |

Toutes : **PNG 1254 × 1254, RGBA 8 bits, non entrelacé**, ≈ 75 à 77 % du cadre
entièrement transparent, personnage debout de face, pieds en bas.

Invariants à respecter :

- **cadre carré 1:1**, fond **transparent** ;
- contenu utile ≈ **95 % de la hauteur** (moyenne mesurée 95,1 %), **pieds vers le
  bas**, marge basse ≈ **1,6 %** (moyenne mesurée) ;
- les marges latérales varient selon la posture (elles dépendent de l'écartement
  des bras) : **ne pas chercher à les égaliser** ;
- plus la posture ouvre les bras, plus le contenu est large : `thinking` est la
  plus étroite (463 px), `point` la plus large (701 px).

> **Fait notable** : `mascot-point.png` est **octet pour octet identique** à
> `public/assets/images/mascotte.png` (mêmes empreintes SHA-256 :
> `3f9e93e3…bdab`). L'asset source est donc la pose `point` elle-même, recopiée.
> Les 4 autres poses sont des dessins distincts.

---

## 3. Workflow en 5 étapes

### 1. Brief

Écrire l'intention, la posture et l'expression. Le script génère automatiquement
`docs/mascot-pose-briefs/<pose>.md` (prompt prêt à coller + images de référence).
Les briefs des poses visées sont en §5.

### 2. Génération

```bash
node scripts/generate-mascot-pose.mjs neutral --brief "posture d'écoute, bras le long du corps"
```

- utilise les poses existantes comme **images de référence** (dédupliquées par
  empreinte SHA-256 — `point` et `mascotte.png` ne comptent qu'une fois) ;
- modèle configurable par `GEMINI_IMAGE_MODEL` (défaut `gemini-nano-banana-2.1`),
  clé `GEMINI_API_KEY` lue dans `.env` ;
- **palier gratuit** : les modèles image de Gemini ne sont **pas** dans le palier
  gratuit (<https://ai.google.dev/gemini-api/docs/pricing>). Sans facturation,
  l'API renvoie 403/429 : le script **ne contourne pas**, il s'arrête, garde le
  brief et affiche la marche à suivre (Google AI Studio). C'est le chemin normal
  aujourd'hui.

### 3. Candidats

Les candidats vont **uniquement** dans :

```
public/assets/images/mascot/_pending/<pose>-1.png
public/assets/images/mascot/_pending/<pose>-2.png
public/assets/images/mascot/_pending/<pose>-3.png
```

Rien de ce dossier n'est lu par une vidéo : `_pending/` est une salle d'attente.

### 4. Validation humaine

**Toi seul**, en regardant les candidats :

- [ ] fond réellement transparent (pas de damier incrusté, pas de fond gris) ;
- [ ] mêmes bleus / beige / blanc que les poses existantes ;
- [ ] logo « gg » + « golden gab » présent et correct ;
- [ ] pas de traits du visage apparus (yeux, bouche) ;
- [ ] posture lisible et **différente** des 5 poses existantes ;
- [ ] contour noir, pas de contour blanc ;
- [ ] pas de décor, pas d'ombre portée, pas de 3D.

### 5. Promotion

```bash
node scripts/promote-mascot-pose.mjs public/assets/images/mascot/_pending/neutral-1.png neutral --validated
```

- **refuse de s'exécuter sans `--validated`** ;
- recadre les marges transparentes puis **normalise le cadrage** sur un canevas
  carré cohérent (hauteur du contenu ≈ 95 %, pieds en bas, centré) — sans
  rééchantillonnage, donc sans perte ;
- écrit `public/assets/images/mascot/mascot-<pose>.png` ;
- ajoute la pose à `mascotAssets` (`src/config/assets.ts`) et à `mascotPoses`
  (`src/components/mascot/poses.ts`) ;
- retire la pose de `mascotPlannedPoses` ;
- ne supprime jamais le candidat d'origine.

Options utiles : `--label`, `--description`, `--height-fraction`,
`--bottom-margin`, `--dry-run` (n'écrit rien), `--force`.

Ensuite : `npm run lint`, puis ajouter la pose au Styleguide.

---

## 4. Poses disponibles aujourd'hui

| Pose | Asset | Libellé | Description (registre) |
| --- | --- | --- | --- |
| `thinking` | `mascot-thinking.png` | Réflexion | une main au menton — réflexion / questionnement |
| `surprised` | `mascot-surprised.png` | Surprise | les mains sur les joues |
| `happy` | `mascot-happy.png` | Joie | bras levés, poings serrés — célébration |
| `explaining` | `mascot-explaining.png` | Explication | mains ouvertes — explication / présentation |
| `point` | `mascot-point.png` | Doigt levé | bras droit levé, index en l'air — annonce (pose par défaut) |

Ces descriptions proviennent du registre `poses.ts` (elles ne viennent pas d'un
aperçu visuel — voir §0).

---

## 5. Poses visées

Reprises de `mascotPlannedPoses` (`src/components/mascot/poses.ts`). Sans asset,
elles ne compilent pas : `pose="neutral"` est refusé par le type `MascotPose`.

### `neutral`

- **Intention** : présence calme quand la mascotte écoute ou attend, sans rien
  annoncer. C'est la pose « de fond », utilisable dans beaucoup de scènes.
- **Posture** : debout, de face, bras le long du corps (ou mains dans les poches
  du short), épaules relâchées, appui léger sur une jambe.
- **Expression** : aucune (le personnage n'a pas de traits du visage).
- **Se démarque de** : `point` (bras levé) et `explaining` (mains ouvertes
  devant). Signature : silhouette la plus **étroite** du jeu — c'est cohérent
  avec la mesure (`thinking` est aujourd'hui la plus étroite à 463 px).

### `confused`

- **Intention** : signaler une notion obscure, une question, un « on ne sait pas
  encore ».
- **Posture** : une main gratte l'arrière de la casquette, tête légèrement
  inclinée sur le côté, épaules remontées.
- **Expression** : aucune (pas de traits du visage).
- **Se démarque de** : `thinking` (main au menton) et `surprised` (mains sur les
  joues). La main doit être **derrière / au-dessus** de la tête, pas au menton.

---

## 6. Ce qui est interdit

- **Simuler une pose** par rotation, miroir (`flip`), mise à l'échelle ou
  recadrage d'une autre pose (règle 39).
- **Enregistrer une pose non validée** : ni toi par script sans `--validated`, ni
  un agent. La validation est humaine.
- **Brancher un candidat `_pending/`** dans une vidéo ou le Styleguide.
- **Modifier un asset existant** : `mascotte.png`, `mascot-*.png` et les fichiers
  de marque sont en lecture seule (règles 19, 20, 38).
- **Déclarer une pose sans asset réel** (règle 39).

---

## 7. Références

- `src/components/mascot/poses.ts` — registre des poses (+ poses prévues).
- `src/config/assets.ts` — `mascotAssets`.
- `scripts/generate-mascot-pose.mjs` — candidats + brief.
- `scripts/promote-mascot-pose.mjs` — promotion **sur validation**.
- `scripts/lib/png.mjs` — décodage/encodage PNG sans dépendance (recadrage,
  mesure du fond transparent), partagé par les deux scripts ci-dessus.
- `docs/mascot-pose-briefs/<pose>.md` — briefs générés.
- `docs/DESIGN-SYSTEM.md` §8 — apparence, attitudes, placement.
- `docs/ARCHITECTURE.md` — section mascotte.
- `docs/VIDEO-DIRECTION.md` — usage narratif.
- API : <https://ai.google.dev/gemini-api/docs/image-generation>,
  <https://ai.google.dev/gemini-api/docs/pricing>.
