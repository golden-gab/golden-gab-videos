/**
 * Le système de scènes vit dans `src/scenes/` pour distinguer le timing et la
 * narration (pipeline de production) des composants Motion purs, qui restent
 * réutilisables et agnostiques des séries.
 */

import { secondsToFrames } from "../utils/time";

export type SceneType =
  | "hero"
  | "explanation"
  | "diagram"
  | "code"
  | "comparison"
  | "callout"
  | "conclusion";

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

export type Episode = {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly scenes: readonly Scene[];
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

export const getEpisodeDurationSeconds = (
  episode: Pick<Episode, "scenes">,
): number =>
  episode.scenes.reduce((duration, scene) => Math.max(duration, scene.end), 0);

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
