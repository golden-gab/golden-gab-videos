/**
 * Logo Golden Gab.
 *
 * Utilise l'asset détouré `assets/images/derived/logo.png`
 * (monogramme GG + wordmark "GOLDEN GAB", corail + bleu nuit).
 *
 * Pour un logo plus grand/petit, passer `width` : la hauteur est déduite du
 * ratio de la marque. Ne jamais repositionner/coller une version dupliquée
 * du logo dans un composant.
 */

import React from "react";
import { CanvasImage, useVideoConfig } from "remotion";

import { brandAssets, brand } from "../../config";

export type GoldenGabLogoProps = {
  /** Largeur affichée en pixels ; la hauteur suit le ratio du logo. */
  readonly width?: number;
  /** Styles additionnels (opacité, filtres, position…). */
  readonly style?: React.CSSProperties;
  /** Nom affiché dans la timeline Remotion. */
  readonly name?: string;
  readonly className?: string;
};

const DEFAULT_WIDTH = 520;

export const GoldenGabLogo: React.FC<GoldenGabLogoProps> = ({
  width = DEFAULT_WIDTH,
  style,
  name = "Logo Golden Gab",
  className,
}) => {
  const { fps } = useVideoConfig();

  return (
    <CanvasImage
      name={name}
      className={className}
      src={brandAssets.logo}
      fit="contain"
      premountFor={fps}
      style={{
        width,
        height: width / brand.logoAspectRatio,
        ...style,
      }}
    />
  );
};
