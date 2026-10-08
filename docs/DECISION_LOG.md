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
