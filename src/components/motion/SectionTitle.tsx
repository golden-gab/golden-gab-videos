/**
 * `<SectionTitle />` — titre secondaire, marque un changement de partie.
 *
 * Volontairement plus discret que `HeroTitle` : même hiérarchie de couleurs,
 * mais une taille `h2`, un marqueur d'accent et aucune mise en évidence de mot.
 *
 * ```tsx
 * <SectionTitle title="Mais concrètement, il fait quoi ?" />
 * <SectionTitle variant="numbered" number="02" title="Les missions" />
 * ```
 */

import React from "react";

import { colors, radius, spacing, strokeWidths, typeScale } from "../../config";
import type { AppearAnimation } from "../../utils/animation";
import { withAlpha } from "../../utils/color";
import { AnimatedAppear } from "../common/AnimatedAppear";
import { BrandText } from "../common/BrandText";
import { getMotionSurface, type MotionTone } from "./shared";

/** Variante visuelle du titre de section. */
export type SectionTitleVariant = "default" | "accent" | "numbered";

export type SectionTitleProps = {
  readonly title: string;
  readonly variant?: SectionTitleVariant;
  /** Numéro affiché par la variante `numbered` (ex. `"02"`). */
  readonly number?: string | number;
  /** Sur-titre optionnel au-dessus du titre. */
  readonly eyebrow?: string;
  readonly align?: "left" | "center" | "right";
  readonly tone?: MotionTone;
  readonly animation?: AppearAnimation;
  readonly delaySeconds?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  variant = "default",
  number,
  eyebrow,
  align = "left",
  tone = "light",
  animation = "slide-up",
  delaySeconds = 0,
  style,
  className,
}) => {
  const surface = getMotionSurface(tone);
  const centered = align === "center";
  const barHeight = typeScale.h2 * 0.9;

  const badge =
    variant === "numbered" ? (
      <div
        style={{
          minWidth: barHeight,
          height: barHeight,
          paddingLeft: spacing.sm,
          paddingRight: spacing.sm,
          borderRadius: radius.md,
          backgroundColor: colors.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BrandText role="h3" color={colors.surfaceLight}>
          {number ?? "01"}
        </BrandText>
      </div>
    ) : null;

  const accentBar =
    variant === "accent" ? null : (
      <div
        style={{
          width: strokeWidths.medium,
          height: barHeight,
          borderRadius: radius.pill,
          backgroundColor: colors.accent,
          flexShrink: 0,
        }}
      />
    );

  const titleColor = variant === "accent" ? colors.accent : surface.text;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: centered ? "column" : "row",
        alignItems: centered ? "center" : "center",
        justifyContent: centered ? "center" : "flex-start",
        gap: spacing.md,
        width: "100%",
        ...style,
      }}
    >
      {!centered && (badge ?? accentBar)}
      <AnimatedAppear animation={animation} delaySeconds={delaySeconds}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.xs,
            textAlign: align,
          }}
        >
          {eyebrow ? (
            <BrandText role="label" align={align} color={colors.accent}>
              {eyebrow}
            </BrandText>
          ) : null}
          <BrandText
            role="h2"
            as="h2"
            align={align}
            color={titleColor}
            style={
              variant === "accent"
                ? {
                    backgroundColor: withAlpha(colors.accent, 0.12),
                    borderRadius: radius.md,
                    paddingLeft: spacing.md,
                    paddingRight: spacing.md,
                  }
                : undefined
            }
          >
            {title}
          </BrandText>
        </div>
      </AnimatedAppear>
      {centered && variant === "numbered" ? badge : null}
    </div>
  );
};
