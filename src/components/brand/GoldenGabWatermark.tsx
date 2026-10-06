/**
 * Filigrane Golden Gab.
 *
 * Logo discret posé dans un coin, à afficher sur les vidéos qui n'ont pas
 * d'outro. Position et taille sont paramétrables ; les valeurs par défaut
 * respectent la zone sûre.
 */

import React from "react";

import { opacity as opacityTokens, safeArea } from "../../config";
import { GoldenGabLogo } from "./GoldenGabLogo";

export type WatermarkPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type GoldenGabWatermarkProps = {
  readonly position?: WatermarkPosition;
  readonly width?: number;
  readonly opacity?: number;
  readonly style?: React.CSSProperties;
};

const DEFAULT_WIDTH = 200;

const positionStyles: Record<WatermarkPosition, React.CSSProperties> = {
  "top-left": { top: safeArea.top, left: safeArea.left },
  "top-right": { top: safeArea.top, right: safeArea.right },
  "bottom-left": { bottom: safeArea.bottom, left: safeArea.left },
  "bottom-right": { bottom: safeArea.bottom, right: safeArea.right },
};

export const GoldenGabWatermark: React.FC<GoldenGabWatermarkProps> = ({
  position = "top-right",
  width = DEFAULT_WIDTH,
  opacity = opacityTokens.strong,
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        ...positionStyles[position],
        opacity,
        pointerEvents: "none",
        ...style,
      }}
    >
      <GoldenGabLogo name="Watermark" width={width} />
    </div>
  );
};
