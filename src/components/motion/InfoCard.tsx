/**
 * `<InfoCard />` — carte générique d'information structurée.
 *
 * Sert à présenter un métier, une techno, un concept, un outil ou une
 * caractéristique. Une **carte = une idée**. Pour comparer deux cartes,
 * utiliser `Comparison` ; pour un message fort, `Callout`.
 *
 * ```tsx
 * <InfoCard
 *   icon="🛡️"
 *   title="Cybersecurity"
 *   description="Protège les systèmes contre les attaques."
 *   badge="Métier"
 * />
 * ```
 */

import React from "react";

import { radius, spacing, strokeWidths, typeScale } from "../../config";
import type { AppearAnimation } from "../../utils/animation";
import { withAlpha } from "../../utils/color";
import { AnimatedAppear } from "../common/AnimatedAppear";
import { BrandText } from "../common/BrandText";
import {
  getMotionCardStyle,
  getMotionSurface,
  resolveMotionAccent,
  type MotionAccent,
  type MotionTone,
} from "./shared";

export type InfoCardProps = {
  readonly title: string;
  readonly description?: string;
  /** Icône optionnelle (emoji, petit SVG…). */
  readonly icon?: React.ReactNode;
  /** Pastille optionnelle (catégorie, niveau…). */
  readonly badge?: string;
  readonly accent?: MotionAccent;
  readonly tone?: MotionTone;
  readonly animation?: AppearAnimation;
  readonly delaySeconds?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  icon,
  badge,
  accent = "accent",
  tone = "light",
  animation = "slide-up",
  delaySeconds = 0,
  style,
  className,
}) => {
  const surface = getMotionSurface(tone);
  const color = resolveMotionAccent(accent);

  return (
    <AnimatedAppear
      animation={animation}
      delaySeconds={delaySeconds}
      className={className}
      style={style}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.sm,
          width: "100%",
          borderLeft: `${strokeWidths.medium}px solid ${color}`,
          ...getMotionCardStyle({ tone, radiusValue: radius.lg, padding: spacing.lg }),
        }}
      >
        {icon !== undefined || badge !== undefined ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: spacing.md,
            }}
          >
            {icon !== undefined ? (
              <div
                style={{
                  width: spacing.xl,
                  height: spacing.xl,
                  flexShrink: 0,
                  borderRadius: radius.md,
                  backgroundColor: withAlpha(color, 0.16),
                  color,
                  fontSize: typeScale.h3,
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {icon}
              </div>
            ) : (
              <span />
            )}
            {badge ? (
              <div
                style={{
                  paddingLeft: spacing.md,
                  paddingRight: spacing.md,
                  paddingTop: spacing.xs,
                  paddingBottom: spacing.xs,
                  borderRadius: radius.pill,
                  backgroundColor: withAlpha(color, 0.14),
                }}
              >
                <BrandText role="label" color={color}>
                  {badge}
                </BrandText>
              </div>
            ) : null}
          </div>
        ) : null}

        <BrandText role="h3" as="h3" color={surface.text}>
          {title}
        </BrandText>

        {description ? (
          <BrandText role="body" color={surface.textMuted}>
            {description}
          </BrandText>
        ) : null}
      </div>
    </AnimatedAppear>
  );
};
