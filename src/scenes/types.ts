/**
 * Le système de scènes vit dans `src/scenes/` pour distinguer le timing et la
 * narration (pipeline de production) des composants Motion purs, qui restent
 * réutilisables et agnostiques des séries.
 *
 * L'épisode est **audio-driven** : il porte son `AudioTrack` et son
 * `Transcript` (couche `src/audio`), qui sont la source de vérité temporelle.
 * La logique d'épisode pure vit dans `./episode` (testable sans React) ; le
 * rendu Remotion vit dans `./renderer.tsx`.
 *
 * Note imports : les imports de *valeurs* entre modules testés par le runner
 * natif de Node portent l'extension `.ts` explicite (voir `docs/ARCHITECTURE.md`).
 */

import type { AudioTrack, Transcript } from "../audio/types";
import { secondsToFrames } from "../utils/time.ts";

/**
 * Types narratifs d'une scène. La liste est la **source de vérité** :
 * `SceneType` en est dérivé et la validation pure la réutilise, sans dépendre
 * du registry visuel (qui vit dans un composant React, `registry.tsx`).
 */
export const sceneTypes = [
  "hero",
  "explanation",
  "diagram",
  "code",
  "comparison",
  "callout",
  "conclusion",
] as const;

export type SceneType = (typeof sceneTypes)[number];

export type SceneTransition = {
  readonly enter?: string;
  readonly exit?: string;
};

export type SceneMascot = {
  readonly enabled: boolean;
  readonly pose?: string;
  readonly attitude?: string;
  readonly position?: string;
};

export type SceneCaptionConfig = {
  readonly enabled?: boolean;
};

export type SceneVisual = {
  readonly component: string;
  readonly props?: Record<string, unknown>;
  /** Seconds after the scene starts when each sequential visual item appears. */
  readonly revealOffsets?: readonly number[];
};

export type Scene = {
  readonly id: string;
  readonly type: SceneType;
  readonly start: number;
  readonly end: number;
  readonly transcript?: string;
  readonly visual: SceneVisual;
  readonly transition?: SceneTransition;
  readonly captions?: SceneCaptionConfig;
  readonly mascot?: SceneMascot;
  readonly metadata?: Record<string, unknown>;
};

/** Métadonnées éditoriales d'un épisode (recherche, angle, script…). */
export type EpisodeMetadata = {
  readonly series?: string;
  readonly subject?: string;
  readonly angle?: string;
  readonly tags?: readonly string[];
  readonly script?: string;
};

export type Episode = {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  /** Audio de narration : source de vérité temporelle de l'épisode. */
  readonly audio: AudioTrack;
  /** Transcription horodatée de `audio`. */
  readonly transcript: Transcript;
  readonly scenes: readonly Scene[];
  /** Métadonnées éditoriales, non consommées par le rendu. */
  readonly metadata?: EpisodeMetadata;
};

export const isValidSceneTiming = (scene: Pick<Scene, "start" | "end">): boolean =>
  Number.isFinite(scene.start) &&
  Number.isFinite(scene.end) &&
  scene.start >= 0 &&
  scene.end > scene.start;

export const validateSceneTiming = (
  scene: Pick<Scene, "start" | "end">,
  context?: string,
): void => {
  if (!isValidSceneTiming(scene)) {
    throw new Error(
      `${context ?? "Scene"} must have a nonnegative start and an end greater than start.`,
    );
  }
};

export const getSceneDurationSeconds = (
  scene: Pick<Scene, "start" | "end">,
): number => scene.end - scene.start;

/** Durée de l'épisode : celle de l'audio réel, source de vérité temporelle. */
export const getEpisodeDurationSeconds = (
  episode: Pick<Episode, "audio">,
): number => episode.audio.duration;

const validateFps = (fps: number): void => {
  if (!Number.isFinite(fps) || fps <= 0) {
    throw new Error(`Scene timing requires a positive fps; received ${fps}.`);
  }
};

export const getSceneStartFrame = (
  scene: Pick<Scene, "start">,
  fps: number,
): number => {
  validateFps(fps);
  return secondsToFrames(scene.start, fps);
};

export const getSceneEndFrame = (
  scene: Pick<Scene, "end">,
  fps: number,
): number => {
  validateFps(fps);
  return secondsToFrames(scene.end, fps);
};

export const getSceneDurationFrames = (
  scene: Pick<Scene, "start" | "end">,
  fps: number,
): number => getSceneEndFrame(scene, fps) - getSceneStartFrame(scene, fps);

export const createScene = <TType extends SceneType>(
  scene: Omit<Scene, "type" | "visual"> & {
    readonly type: TType;
    readonly visual?: Partial<SceneVisual>;
  },
): Scene => {
  const validatedScene: Scene = {
    ...scene,
    visual: {
      component: scene.visual?.component ?? scene.type,
      props: scene.visual?.props ?? {},
    },
  };

  validateSceneTiming(validatedScene, validatedScene.id);

  return validatedScene;
};
