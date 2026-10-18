/**
 * `<ConceptCard />` — grande carte qui nomme un concept (titre + icône +
 * sous-titre). Une version `accent` est mise en avant (fond corail).
 *
 * Donnée en entrée ; l'apparition et le placement sont gérés par l'appelant
 * (`Appear`, `abs`). Pensée pour opposer deux notions (ex. SITE / APPLICATION).
 */

import React from "react";

import { colors, radius, spacing, strokeWidths } from "../../config";
import { withAlpha } from "../../utils/color";
import { BrandText } from "../common/BrandText";
import { LibIcon } from "./stage/LibIcon";

export type ConceptCardProps = {
  readonly title: string;
  readonly subtitle?: string;
  /** Id d'une icône du manifeste d'assets. */
  readonly icon: string;
  readonly width: number;
  readonly height: number;
  /** Carte mise en avant : fond corail, texte crème. */
  readonly accent?: boolean;
  readonly style?: React.CSSProperties;
};

export const ConceptCard: React.FC<ConceptCardProps> = ({
  title,
  subtitle,
  icon,
  width,
  height,
  accent = false,
  style,
}) => {
  const foreground = accent ? colors.inkInverse : colors.secondary;

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        gap: spacing.md,
        padding: `0 ${spacing.lg}px`,
        borderRadius: radius.lg,
        backgroundColor: accent ? colors.accent : colors.surfaceLight,
        border: `${strokeWidths.medium}px solid ${accent ? colors.inkInverse : withAlpha(colors.secondary, 0.14)}`,
        boxShadow: `0 ${spacing.sm}px ${spacing.xl}px ${withAlpha(colors.ink, 0.32)}`,
        ...style,
      }}
    >
      <LibIcon
        id={icon}
        size={height * 0.52}
        color={accent ? colors.inkInverse : colors.accent}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <BrandText role="h3" color={foreground}>
          {title}
        </BrandText>
        {subtitle ? (
          <BrandText
            role="label"
            color={accent ? colors.inkInverse : withAlpha(colors.secondary, 0.75)}
          >
            {subtitle}
          </BrandText>
        ) : null}
      </div>
    </div>
  );
};
