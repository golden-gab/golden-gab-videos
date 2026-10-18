/**
 * Plateau : les illustrations suivent la position des captions. Promu depuis
 * le montage mascotte Data Analyst (règle 46).
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import type { CaptionPosition } from "../../../captions/types";
import {
  captionZone,
  getCaptionBoxTop,
  safeArea,
} from "../../../config";
import type { Scene } from "../../../scenes/types";
import { band, H, W } from "./geometry";

/**
 * Les plans sont dessinés dans la bande `band` (de `band.top` à `band.bottom`).
 * Quand les captions descendent ou montent, la place libre change : le plateau
 * déplace (et, si la place manque, réduit) toute la scène pour la centrer dans
 * la plus grande zone libre — la mascotte et les illustrations bougent d'un
 * bloc, rien n'est redessiné.
 */

/** Demi-hauteur d'un bloc de captions sur deux lignes, en pixels. */
const CAPTION_TEXT_HALF_HEIGHT = 110;
/** Air laissé entre le texte des captions et les illustrations. */
const CAPTION_CLEARANCE = 60;
const designHeight = band.bottom - band.top;
const designCenterY = (band.top + band.bottom) / 2;

export type Stage = {
  readonly dy: number;
  readonly scale: number;
};

/** Translation et échelle qui placent la scène dans la zone libre d'une position. */
export const getStage = (lane: CaptionPosition): Stage => {
  const textCenter = getCaptionBoxTop(lane) + captionZone.height / 2;
  const above = [
    band.top,
    textCenter - CAPTION_TEXT_HALF_HEIGHT - CAPTION_CLEARANCE,
  ] as const;
  const below = [
    textCenter + CAPTION_TEXT_HALF_HEIGHT + CAPTION_CLEARANCE,
    H - safeArea.bottom,
  ] as const;
  const region =
    above[1] - above[0] >= below[1] - below[0] ? above : below;

  return {
    dy: (region[0] + region[1]) / 2 - designCenterY,
    scale: Math.min(1, (region[1] - region[0]) / designHeight),
  };
};


/**
 * Position des captions d'une scène ; `fallback` est celle de l'épisode quand
 * la scène n'en choisit pas (`low` par défaut dans un épisode audio-driven).
 */
export const getSceneLane = (
  scene: Scene,
  fallback: CaptionPosition = "low",
): CaptionPosition => scene.captions?.position ?? fallback;

export const CaptionStage: React.FC<{
  readonly lane: CaptionPosition;
  readonly children: React.ReactNode;
}> = ({ lane, children }) => {
  const stage = getStage(lane);

  return (
    <AbsoluteFill
      style={{
        transform: `translateY(${stage.dy}px) scale(${stage.scale})`,
        transformOrigin: `${W / 2}px ${designCenterY}px`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
