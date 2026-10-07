/**
 * Placement de la mascotte : positions nommées, tailles, ancrages.
 *
 * Modèle mental : chaque position croise un ancrage vertical
 * (`top` / `center` / `bottom`) et un ancrage horizontal
 * (`left` / `center` / `right`), **à l'intérieur de la bande sûre**.
 *
 * La bande s'arrête au-dessus de la zone captions : la mascotte ne peut pas
 * masquer les sous-titres par construction. Toutes les marges viennent de
 * `src/config/video.ts` (`safeArea`, `captionZone`) — aucune valeur n'est
 * recréée à la main.
 *
 * La position `"flow"` désactive l'ancrage absolu : la mascotte rejoint le
 * flux du layout parent (colonne `SafeArea`, grille du styleguide…).
 */

import type React from "react";

import { captionZone, scaleSafeArea } from "../../config";
import type { MascotSize } from "./types";

/** Positions supportées. `flow` = dans le flux du parent, pas d'ancrage. */
export type MascotPosition =
  | "top-left"
  | "left"
  | "bottom-left"
  | "center"
  | "top-right"
  | "right"
  | "bottom-right"
  | "flow";

/** Position par défaut : à droite, centrée verticalement dans la bande sûre. */
export const defaultMascotPosition: MascotPosition = "right";

/**
 * Hauteurs (px, base 1080) des tailles préréglées.
 * Choix d'ingénierie (lisibilité + composition 9:16), pas une valeur de charte :
 * `large` occupe environ la moitié de la bande utile.
 */
export const mascotSizes: Record<MascotSize, number> = {
  small: 280,
  medium: 440,
  large: 640,
};

type VerticalAnchor = "top" | "center" | "bottom";
type HorizontalAnchor = "left" | "center" | "right";

const positionAnchors: Record<
  Exclude<MascotPosition, "flow">,
  { readonly vertical: VerticalAnchor; readonly horizontal: HorizontalAnchor }
> = {
  "top-left": { vertical: "top", horizontal: "left" },
  left: { vertical: "center", horizontal: "left" },
  "bottom-left": { vertical: "bottom", horizontal: "left" },
  center: { vertical: "center", horizontal: "center" },
  "top-right": { vertical: "top", horizontal: "right" },
  right: { vertical: "center", horizontal: "right" },
  "bottom-right": { vertical: "bottom", horizontal: "right" },
};

export type MascotPlacementOptions = {
  /** Ancrage demandé. */
  readonly position: MascotPosition;
  /** Largeur de la boîte de la mascotte, en pixels. */
  readonly width: number;
  /** Hauteur de la boîte de la mascotte, en pixels. */
  readonly height: number;
  /** Largeur de la composition (`useVideoConfig().width`). */
  readonly compositionWidth: number;
  /** Hauteur de la composition (`useVideoConfig().height`). */
  readonly compositionHeight: number;
};

/**
 * Calcule le style d'ancrage de la mascotte pour une composition donnée.
 * Le résultat est à spread dans la couche externe du composant.
 */
export const getMascotPlacement = ({
  position,
  width,
  height,
  compositionWidth,
  compositionHeight,
}: MascotPlacementOptions): React.CSSProperties => {
  if (position === "flow") {
    return { position: "relative", width, height };
  }

  // Zone sûre échelonnée à la largeur réelle de la composition.
  const insets = scaleSafeArea(compositionWidth);
  // Fin de la bande utile : au-dessus de la zone captions (les sous-titres
  // restent lisibles sous la mascotte).
  const captionClearance = (captionZone.bottom + captionZone.height) * insets.ratio;
  const bandTop = insets.top;
  const bandHeight = compositionHeight - captionClearance - bandTop;

  const anchors = positionAnchors[position];
  const style: React.CSSProperties = { position: "absolute", width, height };

  if (anchors.vertical === "top") {
    style.top = bandTop;
  } else if (anchors.vertical === "bottom") {
    style.bottom = captionClearance;
  } else {
    // Centre de la bande ; clamped pour rester dans la zone sûre si la
    // mascotte est plus haute que la bande elle-même.
    style.top = bandTop + Math.max(0, (bandHeight - height) / 2);
  }

  if (anchors.horizontal === "left") {
    style.left = insets.left;
  } else if (anchors.horizontal === "right") {
    style.right = insets.right;
  } else {
    style.left = Math.max(0, (compositionWidth - width) / 2);
  }

  return style;
};
