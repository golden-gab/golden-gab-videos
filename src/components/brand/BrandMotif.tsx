/**
 * Motif Golden Gab.
 *
 * Texture bleu nuit très discrète (alpha ≤ 30 dans l'asset source), utilisée
 * en fond ou en surimpression.
 *
 * Implémenté avec `<CanvasImage />` plutôt qu'en `background-image` :
 * Remotion déconseille les images de fond CSS (elles peuvent manquer au
 * moment du rendu et échouent au lint `@remotion/no-background-image`).
 *
 * ⚠️ L'asset n'est **pas** une tuile répétable : il est rendu d'un seul bloc
 * en `cover`. Pour densifier le motif, utiliser `scale` (le motif se répète
 * environ tous les 590px sur une composition de 1080px de large à `scale=1`).
 */

import React from "react";
import { AbsoluteFill, CanvasImage, useVideoConfig } from "remotion";

import { brandAssets, opacity as opacityTokens } from "../../config";

export type BrandMotifProps = {
  /** Zoom du motif. 1 = échelle de référence, > 1 = motif plus grand. */
  readonly scale?: number;
  /** Opacité globale de la texture. */
  readonly opacity?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

export const BrandMotif: React.FC<BrandMotifProps> = ({
  scale = 1,
  opacity = opacityTokens.medium,
  style,
  className,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      className={className}
      style={{
        opacity,
        overflow: "hidden",
        pointerEvents: "none",
        ...style,
      }}
    >
      <CanvasImage
        name="Motif Golden Gab"
        src={brandAssets.motif}
        fit="cover"
        premountFor={fps}
        style={{ width: "100%", height: "100%", scale }}
      />
    </AbsoluteFill>
  );
};
