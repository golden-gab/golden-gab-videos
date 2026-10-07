/**
 * Helpers d'animation réutilisables (purs, sans état React).
 *
 * Une "progression" est un nombre entre 0 (invisible) et 1 (pleinement
 * visible). `getEnterProgress()` va de 0 à 1 en début de séquence,
 * `getExitProgress()` de 1 à 0 en fin de séquence.
 * `getAnimationStyle()` transforme une progression en styles CSS.
 */

import type React from "react";
import { interpolate } from "remotion";

import {
  defaultPopScale,
  defaultSlideDistance,
  easings,
} from "../config/animation";

export type AppearAnimation =
  | "none"
  | "fade"
  | "pop"
  | "slide-up"
  | "slide-down"
  /** Glisse horizontalement depuis la droite vers la gauche. */
  | "slide-left"
  /** Glisse horizontalement depuis la gauche vers la droite. */
  | "slide-right";

export type EnterProgressOptions = {
  /** Frame courante, relative au début de la séquence. */
  readonly frame: number;
  /** Durée de l'entrée, en frames. */
  readonly enterFrames: number;
};

export type ExitProgressOptions = {
  readonly frame: number;
  /** Durée totale de la séquence, en frames. */
  readonly durationInFrames: number;
  /** Durée de la sortie, en frames. */
  readonly exitFrames: number;
};

/** Progression d'apparition : 0 au début de la séquence, 1 à la fin de l'entrée. */
export const getEnterProgress = ({
  frame,
  enterFrames,
}: EnterProgressOptions): number =>
  interpolate(frame, [0, Math.max(1, enterFrames)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easings.entrance,
  });

/** Progression de disparition : 1 jusqu'à la fin moins `exitFrames`, puis 0. */
export const getExitProgress = ({
  frame,
  durationInFrames,
  exitFrames,
}: ExitProgressOptions): number => {
  if (exitFrames <= 0) {
    return 1;
  }

  const exitStart = Math.max(0, durationInFrames - exitFrames);

  return interpolate(frame, [exitStart, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easings.exit,
  });
};

/**
 * Visibilité combinée (entrée + sortie). Utilisée quand on souhaite une
 * seule valeur d'opacité, sans différencier les animations d'entrée/sortie.
 */
export const getVisibility = (
  options: EnterProgressOptions & ExitProgressOptions,
): number =>
  Math.min(getEnterProgress(options), getExitProgress(options));

export type AnimationStyleOptions = {
  /** Distance en pixels pour les animations `slide-*`. */
  readonly distance?: number;
  /** Échelle de départ pour l'animation `pop`. */
  readonly fromScale?: number;
};

const asNumber = (value: unknown): number | null =>
  typeof value === "number" ? value : null;

/**
 * Transforme une progression (0→1) en styles CSS.
 * Les clés non pertinentes sont omises : le résultat peut être spread
 * directement dans un `style`.
 */
export const getAnimationStyle = (
  animation: AppearAnimation,
  progress: number,
  options: AnimationStyleOptions = {},
): React.CSSProperties => {
  const distance = options.distance ?? defaultSlideDistance;
  const fromScale = options.fromScale ?? defaultPopScale;
  const value = Math.max(0, Math.min(1, progress));

  switch (animation) {
    case "none":
      return {};
    case "fade":
      return { opacity: value };
    case "pop":
      return {
        opacity: value,
        scale: interpolate(value, [0, 1], [fromScale, 1]),
      };
    case "slide-up":
      return {
        opacity: value,
        translate: `0px ${interpolate(value, [0, 1], [distance, 0])}px`,
      };
    case "slide-down":
      return {
        opacity: value,
        translate: `0px ${interpolate(value, [0, 1], [-distance, 0])}px`,
      };
    case "slide-left":
      // Comme `slide-up` : le nom décrit le sens du mouvement. La valeur de
      // départ est donc du côté droit (x = +distance) et glisse vers la gauche.
      return {
        opacity: value,
        translate: `${interpolate(value, [0, 1], [distance, 0])}px 0px`,
      };
    case "slide-right":
      return {
        opacity: value,
        translate: `${interpolate(value, [0, 1], [-distance, 0])}px 0px`,
      };
  }
};

/**
 * Combine un style d'entrée et un style de sortie.
 * Les opacités et les échelles se multiplient ; la translation de sortie
 * prend le pas si elle existe, sinon celle d'entrée est conservée.
 */
export const mergeAnimationStyles = (
  enterStyle: React.CSSProperties,
  exitStyle: React.CSSProperties,
): React.CSSProperties => {
  const enterOpacity = asNumber(enterStyle.opacity) ?? 1;
  const exitOpacity = asNumber(exitStyle.opacity) ?? 1;
  const enterScale = asNumber(enterStyle.scale) ?? 1;
  const exitScale = asNumber(exitStyle.scale) ?? 1;

  const translate =
    typeof exitStyle.translate === "string"
      ? exitStyle.translate
      : enterStyle.translate;

  const merged: React.CSSProperties = { opacity: enterOpacity * exitOpacity };
  const scale = enterScale * exitScale;

  if (scale !== 1) {
    merged.scale = scale;
  }

  if (typeof translate === "string") {
    merged.translate = translate;
  }

  return merged;
};
