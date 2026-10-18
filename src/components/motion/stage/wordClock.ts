/**
 * Horloge d'une scène calée sur les mots du transcript. Promu depuis le
 * montage mascotte Data Analyst (règle 46) : le transcript est un paramètre.
 */

import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import type { Transcript } from "../../../audio/types";
import { durations, easings } from "../../../config";
import type { Scene } from "../../../scenes/types";
import { secondsToFrames } from "../../../utils/time";
import { getWordOffset } from "./words";

export type Beat = {
  readonly frame: number;
  readonly fps: number;
  /** Durée de la scène, en secondes. */
  readonly duration: number;
  /**
   * Instant (secondes depuis le début de la scène) où le mot est prononcé.
   * `nth` choisit la n-ième occurrence quand un mot revient dans la scène.
   */
  readonly at: (word: string, nth?: number) => number;
  /** Progression 0 → 1 d'une animation démarrant à `startSeconds`. */
  readonly p: (
    startSeconds: number,
    durationSeconds?: number,
    easing?: (input: number) => number,
  ) => number;
};

/**
 * Horloge d'une scène : retrouve les mots dans le transcript et convertit les
 * instants en progressions.
 */
export const useWordClock = (scene: Scene, transcript: Transcript): Beat => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const at = (word: string, nth = 0): number =>
    getWordOffset(transcript, scene, word, nth);

  const p = (
    startSeconds: number,
    durationSeconds: number = durations.base,
    easing: (input: number) => number = easings.entrance,
  ): number => {
    const start = secondsToFrames(startSeconds, fps);
    const length = Math.max(1, secondsToFrames(durationSeconds, fps));

    return interpolate(frame, [start, start + length], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing,
    });
  };

  return { frame, fps, duration: scene.end - scene.start, at, p };
};
