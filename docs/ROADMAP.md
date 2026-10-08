# Golden Gab Video — Pipeline & Roadmap

## Vision

Construire un système de production vidéo Remotion réutilisable pour Golden Gab : une architecture capable de transformer un sujet ou un script en vidéo verticale cohérente avec la direction artistique, sans reconstruire les mêmes animations et composants à chaque épisode.

Le projet doit privilégier :

- réutilisation avant duplication ;
- données et configuration avant JSX spécifique à une vidéo ;
- cohérence visuelle avant variété inutile ;
- évolution progressive plutôt qu'une bibliothèque surdimensionnée ;
- documentation comme source de vérité pour les futurs agents IA.

## État actuel

- [x] Projet Remotion initialisé avec template TikTok
- [x] Assets Golden Gab présents dans `public/assets/images`
- [x] Architecture globale du repository définie
- [x] Design System Golden Gab documenté
- [x] Police de titre Darker Grotesque intégrée au système
- [x] Captions réutilisables
- [x] Intro / Outro réutilisables
- [x] Mascotte Golden Gab intégrée comme composant global
- [x] Bibliothèque initiale de composants Motion finalisée
- [x] Système de scènes audio-aware (modèle, registry, validation et timeline ; voir M02)
- [x] Couche Audio → Transcript → Timestamps (données M03 ; provider réel à venir)
- [x] Schéma de données d'un épisode (M04)
- [ ] Template éditorial d'un épisode
- [ ] Premier épisode de référence
- [ ] Validation du workflow complet
- [ ] Industrialisation de la production des épisodes

## Mise à jour — Architecture audio-driven (2026-10-07)

La production vidéo est désormais conçue autour d'une voix enregistrée comme source de vérité temporelle.

### Nouveau pipeline cible

`Sujet → Recherche → Angle → Script → Audio voix → Transcription/timestamps → Analyse narrative → Storyboard → Données d'épisode → Remotion → Review → Render`

Le script reste la source de contenu et d'intention, mais l'audio réel pilote le timing du montage.

### Conséquences pour le repository

- Le Scene System doit être audio-aware.
- Une scène doit pouvoir être définie par `start` / `end`, et non uniquement par une durée arbitraire.
- Les captions doivent pouvoir exploiter les timestamps de transcription.
- Le système doit distinguer trois couches :
  1. Audio layer — fichier audio, durée, transcription, timestamps, silences.
  2. Narrative layer — Hook, Explication, Exemple, Diagramme, Insight, Conclusion, etc.
  3. Visual layer — composants Motion, props, assets et mascotte.
- L'IA doit produire des données structurées que Remotion consomme ; elle ne doit pas générer directement un énorme composant JSX monolithique.

### Exemple de scène

```ts
{
  type: "diagram",
  start: 8.2,
  end: 14.7,
  transcript: "...",
  visual: {
    component: "FlowDiagram",
    props: {}
  }
}
```

### Ordre de priorité temporelle

1. Audio réel de la voix
2. Timestamps de transcription
3. Décisions éditoriales / storyboard
4. Durées par défaut des templates

### Workflow de production révisé

1. Recherche
2. Angle éditorial
3. Script
4. Enregistrement de la voix
5. Transcription + timestamps
6. Analyse narrative
7. Storyboard basé sur l'audio
8. Génération / assemblage des scènes
9. Preview et synchronisation audio/visuel
10. Render
11. Publication / archivage

**Décision initiale :** le modèle temporel audio/transcript et le contrat de
données d'un épisode doivent être conçus avant d'étendre le système aux épisodes
de production. Le socle M02 est désormais implémenté ; le contrat complet de
l'épisode et les données de transcription restent M03.

---

# 1. Pipeline de production

## Phase A — Recherche

Objectif : comprendre le sujet avant d'écrire.

Entrées :

- sujet ;
- question ;
- métier ;
- concept ;
- anecdote ;
- source(s) si nécessaire.

Sorties :

- faits vérifiés ;
- angle ;
- informations essentielles ;
- exemples ;
- éléments visuels potentiels.

Règle : la vidéo ne doit pas être écrite à partir d'une simple intuition lorsque le sujet nécessite des faits vérifiables.

↓

## Phase B — Angle éditorial

Déterminer :

- ce que le spectateur doit comprendre ;
- pourquoi il devrait regarder jusqu'à la fin ;
- l'accroche ;
- le niveau technique ;
- le ton ;
- le message final.

Sortie : un angle clair en une phrase.

↓

## Phase C — Script

Pistes possibles, à adapter au sujet et à la narration — ce n'est ni une
structure requise ni une séquence à recopier :

1. Hook — capter l'attention immédiatement
2. Promesse / contexte — annoncer ce que le spectateur va comprendre
3. Explication — développer l'idée principale
4. Illustration — exemple, schéma, code ou analogie
5. Insight — l'information importante à retenir
6. Conclusion / punchline
7. CTA si nécessaire

Le script doit être pensé pour l'oral et le rythme vidéo, pas comme un article.

↓

## Phase D — Audio voix & temporalité

L'audio de narration devient la source de vérité du timing.

Pipeline : `Audio voix → Transcription → Timestamps → Analyse narrative → Storyboard`

La transcription fournit des segments exploitables par Remotion, par exemple :

```ts
{ start: 3.2, end: 8.7, text: "..." }
```

Ces timestamps servent à synchroniser scènes, captions et animations.

Principe : on construit le visuel autour du timing réel de la voix, plutôt que de forcer la voix dans des durées arbitraires.

↓

## Phase E — Storyboard

Transformer la narration et l'audio en une proposition visuelle propre à cette
vidéo. Le storyboard ne suit pas de flow prédéfini : son ordre, son nombre de
scènes, son rythme et ses types de visuels découlent du contenu et de l'intention
éditoriale. Les exemples ci-dessous sont des pistes, pas un modèle à reproduire.

Pour chaque scène, documenter selon les besoins de conception :

- l'idée ou l'effet recherché et le lien avec la narration ;
- le timing, déterminé à partir de l'audio et des timestamps ;
- le visuel, l'action ou la métaphore qui rend le propos compréhensible ;
- si utile, la présence de la mascotte, les captions et la transition ;
- les assets complémentaires nécessaires.

Exemple possible — à ne pas considérer comme le flow par défaut :

Scène | Rôle | Visuel
--- | --- | ---
01 | Hook | HeroTitle + Mascotte
02 | Question | SectionTitle
03 | Explication | FlowDiagram
04 | Exemple | CodeShowcase
05 | Insight | Callout
06 | Conclusion | MascotScene + Outro

Une autre vidéo peut commencer par sa conclusion, rester longtemps sur une
métaphore animée, alterner des scènes très courtes, ne pas utiliser de
diagramme, ou choisir toute autre structure si elle sert mieux l'audio.

↓

## Phase F — Composition Remotion

Le storyboard devient une définition d'épisode.

Principe :

`Episode data → Audio/Transcript → Scenes → Motion components → Remotion composition`

La vidéo ne doit pas être codée comme un énorme composant monolithique.

Remotion consomme des données structurées ; l'analyse audio et narrative reste découplée du rendu.

↓

## Phase G — Preview / Review

Vérifier :

- rythme ;
- lisibilité mobile ;
- captions ;
- hiérarchie visuelle ;
- position de la mascotte ;
- cohérence des animations ;
- absence de débordement ;
- cohérence de la DA ;
- exactitude du contenu.

↓

## Phase H — Render

Exporter la vidéo finale en format vertical TikTok.

Vérifier :

- résolution ;
- durée ;
- framerate ;
- audio si présent ;
- qualités visuelles finalisées.

---

# 2. Roadmap de développement

## M01 — Foundation & system design

- [x] Architecture globale
- [x] Design system
- [x] Composants Morion / motion
- [x] Captions et intro/outro
- [x] Mascotte

## M02 — Audio-aware Scene System

Objectif : créer un système de scenes piloté par les timestamps audio/transcript.

À livrer :

- [x] modèle de scène ;
- [x] types narratifs ;
- [x] helpers de durée en secondes et conversion centralisée secondes → frames ;
- [x] validation `end > start` dans le constructeur de scène ;
- [x] registry narratif → composants Motion ;
- [x] rendu visuel d'une scène ;
- [x] intégration initiale aux composants Motion existants ;
- [x] placer chaque scène sur la timeline avec `Sequence` à partir de `start`/`end` ;
- [x] valider le timing et la cohérence de l'épisode au point d'entrée du rendu ;
- [x] rendre effectif le mapping `visual.component` à travers le registry.

**État : terminé.** `EpisodeRenderer` valide l'épisode et délègue le rendu à
`SceneRenderer`, qui place chaque scène sur la timeline en utilisant le `fps`
de la composition. Les scènes doivent être ordonnées et ne peuvent pas se
chevaucher ; les espaces sans scène sont permis. Les transitions et le
branchement complet des couches audio/captions restent hors du périmètre M02.

## M03 — Audio / Transcript pipeline

- [x] contrats `AudioTrack` / `Transcript` / `TranscriptSegment` ;
- [x] invariants temporels (durée, bornes, ordre, chevauchement) ;
- [x] lookup du segment actif (`getTranscriptSegmentAt`) ;
- [x] adaptateur vers les captions (`transcriptToCaptions`) ;
- [x] mock audio + transcript de développement ;
- [x] tests unitaires (runner natif de Node).

**État : terminé.** La couche `src/audio/` représente `Audio → Transcript →
Timestamps` en secondes, indépendamment de Remotion et de tout provider de
transcription. Aucun composant visuel n'a été modifié. Un provider réel
(Whisper, API) reste à brancher en implémentant `TranscriptionProvider`.

## M04 — Episode schema (audio-driven)

- [x] schéma `Episode` / `Scene` (metadata éditoriale, `sceneTypes`) ;
- [x] liaison `Episode` ↔ `AudioTrack` / `Transcript` ;
- [x] validation de cohérence avant rendu (bornes alignées sur l'audio) ;
- [x] branchement des captions depuis le transcript au niveau épisode ;
- [x] logique d'épisode pure (`src/scenes/episode.ts`) + tests.

**État : terminé.** `Episode` porte désormais son audio et son transcript ;
`getEpisodeDurationFrames` renvoie la durée de l'audio, `validateEpisode`
rejette les scènes hors bornes, et `EpisodeRenderer` superpose les captions du
transcript. Le rendu complet d'un épisode de référence reste M05.

## M05 — Produce a reference episode

- [ ] 1 épisode de référence complet ;
- [x] storyboard audio-driven ;
- [ ] rendu final ;
- [ ] revue qualité.

**État : en cours.** L'épisode Data Analyst et sa composition Remotion sont
enregistrés ; la voix réelle (`public/audio/mdt-data-analyst-voice.mp3`, 25,08 s)
est intégrée et transcrite localement en français avec Whisper.cpp. Transcript
et scènes sont réalignés sur la narration. Le rendu final et la revue qualité
restent à faire avant de terminer M05. La revue a aussi mis en évidence le
besoin d'illustrations concrètes et d'animations synchronisées à l'intérieur
des scènes ; le rendu final de référence attend les fondations visuelles M06 à
M09.

## M06 — Direction visuelle et captions

- [x] consignes créatives permanentes dans `docs/VIDEO-DIRECTION.md` ;
- [x] imposer leur lecture dans `docs/RULES.md` pour chaque nouvelle vidéo ;
- [x] preset de caption mot courant (`highlight`) conforme à la palette ;
- [x] appliquer le preset à l'épisode Data Analyst et l'ajouter au Styleguide ;
- [ ] valider lisibilité, contour et cartouche dans Studio sur plusieurs fonds.

**État : fondations implémentées.** Le preset reprend la capture fournie avec
les couleurs approuvées Golden Gab (blanc détouré, mot actif sur fond bleu nuit).
La validation visuelle dans Studio reste à faire.

## M07 — Révélations synchronisées à la narration

- [x] définir une granularité de beats visuels à l'intérieur des scènes via
  `visual.revealOffsets` (secondes relatives au début de scène) ;
- [x] relier les étapes d'un visuel aux timestamps du transcript ;
- [x] faire apparaître progressivement les éléments de `FlowDiagram` et
  `AnimatedList` selon leurs offsets ;
- [x] valider les offsets (valeurs finies, ordre strict, bornes de scène) et
  ajouter des tests au contrat de données/timing ;
- [x] appliquer ce séquençage aux trois actions d'analyse de l'épisode Data
  Analyst.

**Objectif :** éviter les scènes figées où tout le contenu apparaît au début ;
chaque composant doit évoluer pendant que la narration développe son idée.
**État : M07 terminé pour les listes et diagrammes séquentiels.** Les valeurs
absentes conservent le stagger standard. Le compteur, les illustrations et
métaphores visuelles plus concrètes restent planifiés en M08.

## M08 — Illustrations concrètes et métaphores réutilisables

- [ ] composer pour M05 l'exemple entreprise/produits/ventes qui s'accumulent ;
- [ ] matérialiser la croissance avec un indicateur progressif calé sur la voix,
  sans inventer de données chiffrées ;
- [ ] mettre visuellement en avant le rôle « Data Analyst » et ses actions ;
- [ ] extraire/tester les motifs réutilisables utiles (compteur, liste, graphique,
  entreprise) sans créer une bibliothèque générique prématurément.

## M09 — Poses et émotions de la mascotte

- [ ] vérifier les fichiers d'émotions présents dans
  `public/assets/images/mascot/` ;
- [ ] enregistrer les assets validés dans `src/config/assets.ts` et
  `src/components/mascot/poses.ts` ;
- [ ] faire intervenir la mascotte ponctuellement selon le sens de la narration ;
- [ ] valider que pose, attitude et timing sont cohérents et ne masquent pas le
  contenu.

## M10 — Terminer et valider l'épisode de référence

- [ ] intégrer les fondations M07 à M09 au storyboard Data Analyst ;
- [ ] vérifier l'ensemble de la vidéo dans Studio ;
- [ ] rendre le MP4 final ;
- [ ] revue qualité (synchronisation, rythme, captions, lisibilité mobile,
  exactitude et erreurs visuelles).

## M11 — Production scale

- [ ] pipeline répétable ;
- [ ] assistant IA stable ;
- [ ] logs et review loop ;
- [ ] documentation de la production.

**Dépendances :** construire un workflow répétable seulement après validation
de la direction, du rythme visuel, des motifs réutilisables, de la mascotte et
de l'épisode de référence.
---

# 3. Règles de priorité

1. L'audio et la transcription sont la source de vérité temporelle.
2. Le design system est prioritaire sur les écarts de style ou l'inventivité visuelle.
3. Les composants Motion doivent rester réutilisables et indépendants des séries.
4. Les scènes doivent être structurées et données ; elles ne doivent pas être un monolithe JSX.
5. L'automatisation IA doit suivre les règles de documentation et de compactness pour préserver la qualité sans surconsommer le contexte.

---

# 4. Décision de direction

Les prochains épisodes doivent suivre `docs/VIDEO-DIRECTION.md`. M06 fixe la
direction et le style des captions ; M07 à M09 implémentent les mouvements,
illustrations et interventions de mascotte par étapes. M05 ne sera déclaré
terminé qu'après intégration des améliorations retenues, export et revue
qualité.
