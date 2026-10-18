/**
 * Géométrie des plans : la bande sûre au-dessus des captions, et petits
 * utilitaires déterministes (jamais `Math.random` : rendu reproductible).
 * Promu depuis le montage mascotte Data Analyst (règle 46).
 */

import type React from "react";

import { captionZone, safeArea, videoFormat } from "../../../config";

export const W: number = videoFormat.width;
export const H: number = videoFormat.height;

/** Bande utile : sous la zone haute de TikTok, au-dessus des captions. */
export const band = {
  top: safeArea.top,
  bottom: H - (captionZone.bottom + captionZone.height),
  left: safeArea.left,
  right: W - safeArea.right,
} as const;

/** Style d'un élément positionné en absolu dans le repère de la composition. */
export const abs = (
  x: number,
  y: number,
  width?: number,
  height?: number,
): React.CSSProperties => ({
  position: "absolute",
  left: x,
  top: y,
  width,
  height,
});

/** Pseudo-hasard déterministe (jamais `Math.random` : rendu reproductible). */
export const rand = (seed: number): number => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;

  return value - Math.floor(value);
};

export const lerp = (from: number, to: number, t: number): number =>
  from + (to - from) * t;
