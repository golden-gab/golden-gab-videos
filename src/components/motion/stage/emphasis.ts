/**
 * Emphase calée sur un mot : un élément reste visible en permanence et
 * « réagit » quand le mot est prononcé (jamais invisible avant le mot).
 */

import type { Beat } from "./wordClock";

const linear = (input: number): number => input;

/** Échelle ≈ 1 qui gonfle puis revient à 1 quand le mot est prononcé. */
export const punch = (
  clock: Beat,
  startSeconds: number,
  amplitude = 0.16,
  durationSeconds = 0.45,
): number =>
  1 +
  amplitude *
    Math.sin(Math.PI * clock.p(startSeconds, durationSeconds, linear));

/** 0 avant le mot, 1 après : pour allumer / dé-griser un élément. */
export const lit = (
  clock: Beat,
  startSeconds: number,
  durationSeconds = 0.25,
): number => clock.p(startSeconds, durationSeconds, linear);

/** Petite secousse horizontale (px) qui s'éteint, déclenchée par un mot. */
export const shake = (
  clock: Beat,
  startSeconds: number,
  amplitude = 14,
  durationSeconds = 0.5,
): number => {
  const t = clock.p(startSeconds, durationSeconds, linear);

  return Math.sin(t * Math.PI * 7) * amplitude * (1 - t) * (t > 0 ? 1 : 0);
};
