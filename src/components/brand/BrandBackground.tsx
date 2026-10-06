/**
 * Fond de marque Golden Gab.
 *
 * Surface de base des écrans plein cadre : une couleur de la palette,
 * optionnellement surmontée du motif et/ou d'un dégradé vers le bas
 * (utile pour garder les captions lisibles sur une vidéo).
 *
 * ```tsx
 * <BrandBackground variant="dark" motif />
 * ```
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { colors, opacity as opacityTokens, palette } from "../../config";
import { withAlpha } from "../../utils/color";
import { BrandMotif } from "./BrandMotif";

export type BrandBackgroundVariant = "light" | "dark" | "accent";

export type BrandBackgroundProps = {
  readonly variant?: BrandBackgroundVariant;
  /** Affiche le motif par-dessus la couleur de fond. */
  readonly motif?: boolean;
  /** Opacité du motif. */
  readonly motifOpacity?: number;
  /** Ajoute un dégradé sombre en bas (lisibilité des captions). */
  readonly bottomScrim?: boolean;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

const variantColors: Record<BrandBackgroundVariant, string> = {
  light: colors.surface,
  dark: colors.surfaceDark,
  accent: colors.accent,
};

export const BrandBackground: React.FC<BrandBackgroundProps> = ({
  variant = "light",
  motif = false,
  motifOpacity = opacityTokens.medium,
  bottomScrim = false,
  style,
  className,
}) => {
  return (
    <AbsoluteFill
      className={className}
      style={{ backgroundColor: variantColors[variant], ...style }}
    >
      {motif ? <BrandMotif opacity={motifOpacity} /> : null}
      {bottomScrim ? (
        <AbsoluteFill
          style={{
            background: `linear-gradient(to bottom, ${withAlpha(
              palette.charcoal,
              0,
            )} 55%, ${withAlpha(palette.charcoal, 0.75)} 100%)`,
            pointerEvents: "none",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
