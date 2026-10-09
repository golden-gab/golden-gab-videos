ok vas# Decision Log

Ce fichier est la mémoire de travail du projet pour les agents IA.

Il doit être lu avant chaque tâche et mis à jour après chaque tâche.
Les entrées doivent rester compactes, factuelles et exploitables sans relire tout le repository.

## Règles de lecture avant une tâche

- Lire d'abord `ROADMAP.md` pour retrouver l'état du projet et les priorités actuelles.
- Lire les dernières entrées du `DECISION_LOG.md` pour connaître les changements récents et les décisions déjà prises.
- Ne pas lire tout le projet systématiquement : ne lire que les fichiers strictement nécessaires à la tâche.
- Si un point de décision était déjà pris, l'appliquer sans le rediscuter sauf si la tâche le contredit.

## Règles d'écriture après une tâche

- Ajouter une entrée dans la section `## Entries` avec date, tâche, fichiers touchés, décision, impact, validation et prochaines actions.
- Rappeler explicitement si la `ROADMAP.md` a dû être mise à jour.
- Mentionner clairement les changements de statut (`done`, `in_progress`, `blocked`, `needs_decision`).
- Conserver un format compact : 5 à 10 lignes par entrée, sans prose inutile.

## Template de saisie

```md
### YYYY-MM-DD — <short task name>
- status: <done|in_progress|blocked|needs_decision>
- scope: <what changed>
- files: <paths>
- decision: <what was decided>
- impact: <project effect>
- validation: <lint/test/inspection>
- roadmap: <updated|not-needed|blocked>
- next: <next step>
```

## Entries

### 2026-10-07 — Project memory setup
- status: done
- scope: created compact decision log and preserved roadmap in project files
- files: `ROADMAP.md`, `DECISION_LOG.md`
- decision: maintain a lightweight AI operating memory outside docs to avoid reading the entire repository each time
- impact: future agents can read status + recent decisions without broad context churn
- validation: structure reviewed and aligned with project needs
- roadmap: updated
- next: continue to append each task with concise factual entries and update roadmap only when milestone context changes

### 2026-10-07 — Scene System initialization
- status: done
- scope: created scene model, registry, and rendering abstraction for audio-aware narrative scenes
- files: `src/scenes/*`
- decision: keep Motion components reusable and map narrative scene types to them through a scene registry
- impact: scene timing and narrative logic are now separated from visual implementation
- validation: TypeScript check passed (`npx tsc --noEmit`)
- roadmap: updated
- next: connect episode data to a real transcript-driven scene definition and extend the registry only when a real production need appears

### 2026-10-07 — M02 status review
- status: in_progress
- scope: audited Scene System against the M02 deliverables
- files: `src/scenes/types.ts`, `src/scenes/renderer.tsx`, `src/scenes/registry.tsx`, `docs/ROADMAP.md`
- decision: M02 is not complete until `SceneRenderer` schedules by `start`/`end` and render-time validation checks the episode; `visual.component` is currently unused
- impact: existing work is a usable visual registry/model, but does not yet synchronize scenes to narration
- validation: direct code inspection; no code changed
- roadmap: updated with implemented vs outstanding items
- next: finish M02 timeline sequencing and validation before starting M03

### 2026-10-07 — M02 completion
- status: done
- scope: scenes now render at absolute audio timestamps and episodes are validated before rendering
- files: `src/scenes/*`, `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`
- decision: require chronologically ordered non-overlapping scenes; allow timeline gaps; resolve explicit visual component names through a strict registry
- impact: `EpisodeRenderer` and `SceneRenderer` form the Remotion timeline entry point; durations use composition fps
- validation: `npm run lint` passed; `git diff --check` passed; composition listing bundled but could not finish because Google Fonts fetch failed while offline
- roadmap: M02 marked complete; M03 is next
- next: implement complete episode/transcript data model and validation as M03

### 2026-10-08 — M03 audio / transcript pipeline
- status: done
- scope: added the data + temporal layer for `Audio → Transcript → Timestamps`
- files: `src/audio/*` (types, validate, lookup, captions, mock, tests), `tsconfig.json`, `package.json`, `docs/ARCHITECTURE.md`, `docs/RULES.md`, `docs/ROADMAP.md`
- decision: transcript timestamps in seconds; validate invariants (duration >= 0, start >= 0, end > start, audio bound, ascending order, no overlap); lookup uses half-open `[start, end)`; adapter reuses the existing captions (no new component); no external transcription dependency, only a `TranscriptionProvider` seam
- impact: the future audio-aware scene system (M04) can resolve scene timing to transcript text; captions can consume the transcript; a real provider can be plugged in without touching visuals
- validation: `npm test` (27 tests, Node built-in runner) passed; `npm run lint` (eslint + tsc) passed; `npx remotion compositions` listed Styleguide + CaptionedVideo and a Styleguide still rendered (no regression)
- roadmap: updated (M03 done; episode schema moved to M04)
- next: build the audio-driven `Episode` schema (M04) linking audio + transcript + scenes

### 2026-10-08 — M04 episode schema (audio-driven)
- status: done
- scope: linked `Episode` to `AudioTrack` / `Transcript`, added episode-level captions wiring and audio-bound validation
- files: `src/scenes/{types,episode,renderer,index}.ts(x)`, `src/scenes/episode.test.ts`, `docs/ARCHITECTURE.md`, `docs/RULES.md`, `docs/ROADMAP.md`
- decision: `Episode` requires `audio` + `transcript`; duration comes from the audio (`getEpisodeDurationFrames`); `validateEpisode` rejects scenes/transcript beyond `audio.duration`; `sceneTypes` is the runtime source of truth for `SceneType`; pure episode logic lives in `episode.ts` (React-free) while `renderer.tsx` handles visuals and overlays transcript-derived captions
- impact: the audio/transcript layer is now reachable from the scene system; scenes can read their transcript text; captions are derived once at episode level
- validation: `npm test` (37 tests) passed; `npm run lint` (eslint + tsc) passed; `src/scenes` bundled with esbuild; `npx remotion compositions` still lists Styleguide + CaptionedVideo
- roadmap: updated (M04 done)
- next: build one reference episode end to end and render it (M05)

### 2026-10-08 — M05 reference episode in progress
- status: in_progress
- scope: registered the Data Analyst reference episode, connected episode audio playback to `EpisodeRenderer`, and later integrated its MP3 narration
- files: `src/series/metiers-de-la-tech/*`, `src/scenes/renderer.tsx`, `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, `package.json`
- decision: use the real recorded voice; transcribe French locally with Whisper.cpp (`base`), never provisional TTS or an external transcription service
- impact: actual audio duration (25.0776 s), transcript and scene timing now match `public/audio/mdt-data-analyst-voice.mp3`; final render and QA remain pending
- validation: local Whisper transcription completed; `npm test` (41 tests), `npm run lint`, `npx remotion compositions`, and Studio MP3 preview passed
- roadmap: updated (M05 in progress)
- next: verify transcript/scenes, render the episode, and complete quality review

### 2026-10-08 — Video direction and active-word captions
- status: in_progress
- scope: documented durable creative guidance, added the `highlight` caption preset, applied it to the reference episode, and split the remaining visual work into milestones
- files: `docs/VIDEO-DIRECTION.md`, `docs/{RULES,DESIGN-SYSTEM,ROADMAP,DECISION_LOG}.md`, `src/captions/{styles,CaptionPage}.tsx`, `src/compositions/Styleguide.tsx`, `src/series/metiers-de-la-tech/videos/reference-episode.tsx`
- decision: use a white outlined current word on a navy Golden Gab chip; every episode should translate key narration into progressive visuals, with mascot appearances used intentionally
- impact: visual direction is a permanent production constraint; progressive scene beats, concrete sales illustrations, mascot pose registration, and final M05 QA are sequenced in M07–M10
- validation: `npm test` (41 passed), `npm run lint` passed; Studio lists `mdt-data-analyst` and preview shows the active word on the navy chip at 4.08 s; no MP4 render launched
- roadmap: updated (M06 foundations implemented; M07–M10 planned; production scale moved to M11)
- next: validate the new caption treatment in Studio, then implement narrative-timed visual beats

### 2026-10-08 — M07 transcript-synchronized visual reveals
- status: done
- scope: added validated scene-relative reveal offsets to sequential diagram/list items and used them for the three analysis actions in the reference episode
- files: `src/scenes/{types,episode,registry}.tsx`, `src/scenes/episode.test.ts`, `src/components/motion/{FlowDiagram,AnimatedList}.tsx`, `src/components/motion/shared/*`, `src/compositions/Styleguide.tsx`, `src/series/metiers-de-la-tech/data/reference-episode{,.test}.ts`, `docs/{ARCHITECTURE,RULES,VIDEO-DIRECTION,ROADMAP,DECISION_LOG}.md`
- decision: reveal offsets are seconds after scene start, strictly increasing and bounded by scene duration; omitted offsets preserve the component stagger
- impact: FlowDiagram and AnimatedList can reveal narrative beats against transcript timings without changing scene boundaries or audio-derived captions
- validation: `npm test` (44 passed), `npm run lint` and TypeScript passed; Studio preview at the second analysis beat shows two items while the third remains hidden; no MP4 render
- roadmap: updated (M07 complete for sequential lists/diagrams)
- next: M08, concretely illustrating products and sales without inventing data

### 2026-10-09 — Reuse the engine, not the composition
- status: done
- scope: resolved the contradiction between §9 (reuse) and §13 (video direction) by rewriting rules 8/39/44/46/48, extending 69/73, adding rule 74 and a §9 precedence note, and adding a "Moyens visuels" section to `VIDEO-DIRECTION.md`
- files: `docs/RULES.md`, `docs/VIDEO-DIRECTION.md`, `docs/DECISION_LOG.md`
- decision: reuse always covers the motion engine (primitives, tokens, stagger, captions); high-level compositions are used only when they express the exact idea of the sentence; otherwise the visual is built locally and promoted only on a genuine second need; §13 decides what is shown, §9 how it animates
- impact: agents stop defaulting to the safe title+card; creating a local visual becomes the normal path for a new idea, and remaining §9/§13 conflicts now have an explicit arbiter
- validation: documentation-only change, no code touched; numbering and tone preserved (rule 22 unchanged; rule 74 appended in §13 to keep order)
- roadmap: not-needed
- next: apply the decision scale on the next storyboard and promote any genuinely generic visual to `src/components/motion`

### 2026-10-09 — Scene motion envelope and named transitions
- status: done
- scope: added a data-oriented scene envelope (slow camera, parallax, grain, vignette) and named transition presets, wired into the scene renderer so scenes move without hand-coded motion
- files: `src/components/motion/{SceneShell,transitions,index}.tsx`, `src/scenes/{types,renderer}.ts(x)`, `src/compositions/Styleguide.tsx`, `package.json`, `docs/{ARCHITECTURE,DESIGN-SYSTEM,DECISION_LOG}.md`
- decision: add `SceneShell` (default `camera: "drift"`) as the reusable motion engine for every scene; `scene.transition.scene` selects a transition preset and its absence preserves the exact previous rendering; install `@remotion/{lottie,shapes,paths,transitions,motion-blur,light-leaks,noise}` at 4.0.533
- impact: scenes gain slow camera/parallax/grain without per-scene code; transitions become opt-in per scene; the motion library gains one envelope plus a preset module naming transitions by intention
- validation: `npm run lint` (eslint + tsc) passed; `npm test` (46 passed); `npx remotion compositions` lists Styleguide (192 s), mdt-data-analyst (752 frames), CaptionedVideo; two `mdt-data-analyst` stills rendered and decoded (1080×1920, real content); a temporary `scene.transition.scene` flag confirmed the preset drives the render (frame 163 shifted), then reverted; Styleguide `Motion · SceneShell` scene renders the three cameras
- roadmap: not-needed
- next: apply the camera and transition presets to a real episode and review the 1–2 s visual rhythm

### 2026-10-09 — External asset library (fetch → manifest → components)
- status: done
- scope: built the external-asset pipeline around the existing fetch script — it writes `src/config/assets.manifest.json`, a reader resolves it, and four motion components consume it; initialized the library folder, `.env.example` and the `asset` npm script
- files: `scripts/fetch-asset.mjs` (read only, unchanged), `src/config/{assetLibrary.ts,assets.manifest.json,assets.ts,index.ts}`, `src/components/motion/{LibraryIcon,LibraryImage,LibraryVideo,LottieAsset}.tsx`, `src/components/motion/shared/assetTreatment.tsx`, `src/compositions/Styleguide.tsx`, `tsconfig.json`, `package.json`, `.env.example`, `public/assets/library/.gitkeep`, `docs/{ARCHITECTURE,DESIGN-SYSTEM,DECISION_LOG}.md`, `README.md`
- decision: register external assets in the manifest (source/license/author/tags) and read them only through `src/config/assetLibrary.ts` — the sole `staticFile` call site (rule 21); `libraryAsset`/`libraryIcon` throw on unknown id or missing license; `LibraryImage`/`LibraryVideo` accept a resolved `src` for demo/QA only, production uses an `id`
- impact: every fetched asset is usable without a hardcoded path; one real icon is registered (`receipt`, lucide, ISC) and rendered in the Styleguide; `resolveJsonModule` plus a JSON import attribute keep the manifest readable by tsc/esbuild and the node test runner alike
- validation: `npm run lint` passed; `npm test` (46 passed); `npx remotion compositions` lists Styleguide (204 s) + mdt-data-analyst + CaptionedVideo; the asset-library Styleguide stills (icon/image/video/lottie) rendered and decoded; `assetLibrary` imported in node (list, icon lookup, error paths)
- roadmap: not-needed
- next: add a real photo and a b-roll with a Pixabay/Pexels key, then swap the Styleguide demo `src` overrides for library `id`s

### 2026-10-09 — Data Analyst reference episode redesign
- status: done
- scope: storyboarded and rebuilt the existing 25.08 s Data Analyst episode in the navy DA, with transcript-synced local visuals and two strong-beat SFX
- files: `docs/series/data-analyst-test-storyboard.md`, `src/series/metiers-de-la-tech/data/reference-episode{,.test}.ts`, `src/series/metiers-de-la-tech/videos/reference-episode{,-scene}.tsx`
- decision: reuse the existing Whisper.cpp French transcript and narration; build the browser/results mock and analytic visuals locally; omit the mascot because no pose adds clarity, and omit the music bed because no file is deposited
- impact: six audio-driven scenes use `SceneShell`; SFX trigger on the browser reveal and final insight; no external visual assets or invented metrics
- validation: `npm run lint`, `npm test` (51 passed), composition list; four episode stills plus Styleguide and CaptionedVideo stills rendered; targeted `git diff --check`
- roadmap: not-needed
- next: add a music bed under `public/audio/music/` if desired; no code blocker remains
