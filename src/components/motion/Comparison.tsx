/**
 * `<Comparison />` — comparer deux approches côte à côte.
 *
 * Avant/après (décision), mauvaise/bonne pratique, option A / option B… Les
 * deux côtés sont des données ; la révélation est progressive (gauche puis
 * droite).
 *
 * ```tsx
 * <Comparison
 *   left={{ title: "Avant", items: ["100 lignes de code"] }}
 *   right={{ title: "Après", items: ["20 lignes de code"] }}
 *   leftBadge="❌"
 *   rightBadge="✅"
 * />
 * ```
 */

import React from "react";

import {
  colors,
  defaultStagger,
  getTextStyle,
  radius,
  spacing,
  strokeWidths,
  typeScale,
} from "../../config";
import type { AppearAnimation } from "../../utils/animation";
import { withAlpha } from "../../utils/color";
import { AnimatedAppear } from "../common/AnimatedAppear";
import { BrandText } from "../common/BrandText";
import { CodeBlock } from "./shared/CodeBlock";
import type { CodeLanguage } from "./shared/highlight";
import {
  getMotionCardStyle,
  getMotionSurface,
  resolveMotionAccent,
  type MotionAccent,
  type MotionTone,
} from "./shared/tokens";

/** Données d'un côté de la comparaison. */
export type ComparisonSideData = {
  readonly title: string;
  readonly description?: string;
  readonly items?: readonly string[];
  readonly code?: string;
  readonly codeLanguage?: CodeLanguage;
  readonly icon?: React.ReactNode;
  readonly accent?: MotionAccent;
};

export type ComparisonProps = {
  readonly left: ComparisonSideData;
  readonly right: ComparisonSideData;
  /** Pastille au-dessus du côté gauche (ex. `"❌"`). */
  readonly leftBadge?: string;
  /** Pastille au-dessus du côté droit (ex. `"✅"`). */
  readonly rightBadge?: string;
  /** `columns` = côte à côte ; `stack` = l'un sous l'autre. */
  readonly orientation?: "columns" | "stack";
  readonly tone?: MotionTone;
  readonly animation?: AppearAnimation;
  readonly delaySeconds?: number;
  readonly staggerSeconds?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

export const Comparison: React.FC<ComparisonProps> = ({
  left,
  right,
  leftBadge,
  rightBadge,
  orientation = "columns",
  tone = "light",
  animation = "slide-up",
  delaySeconds = 0,
  staggerSeconds = defaultStagger,
  style,
  className,
}) => {
  const surface = getMotionSurface(tone);
  const stacked = orientation === "stack";

  const renderCode = (code: string, language: CodeLanguage | undefined) => (
    <div
      style={{
        backgroundColor: colors.surfaceDark,
        borderRadius: radius.md,
        paddingTop: spacing.sm,
        paddingBottom: spacing.sm,
        paddingLeft: spacing.md,
        paddingRight: spacing.md,
      }}
    >
      <CodeBlock
        code={code}
        language={language ?? "plain"}
        fontSize={typeScale.label}
      />
    </div>
  );

  const renderSide = (
    side: ComparisonSideData,
    defaultAccent: MotionAccent,
    badge: string | undefined,
    index: number,
  ) => {
    const color = resolveMotionAccent(side.accent ?? defaultAccent);

    return (
      <AnimatedAppear
        key={index}
        animation={animation}
        delaySeconds={delaySeconds + index * staggerSeconds}
        style={{ flex: stacked ? undefined : 1, minWidth: 0 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.sm,
            width: "100%",
            borderTop: `${strokeWidths.medium}px solid ${color}`,
            ...getMotionCardStyle({
              tone,
              radiusValue: radius.lg,
              padding: spacing.lg,
            }),
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.md,
            }}
          >
            {badge ? (
              <div
                style={{
                  minWidth: spacing.xl,
                  height: spacing.xl,
                  flexShrink: 0,
                  paddingLeft: spacing.sm,
                  paddingRight: spacing.sm,
                  borderRadius: radius.pill,
                  backgroundColor: withAlpha(color, 0.16),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: typeScale.h3,
                  lineHeight: 1,
                }}
              >
                {badge}
              </div>
            ) : null}
            {side.icon !== undefined ? (
              <span style={{ fontSize: typeScale.h3, lineHeight: 1 }}>
                {side.icon}
              </span>
            ) : null}
            <BrandText role="h3" as="h3" color={surface.text}>
              {side.title}
            </BrandText>
          </div>

          {side.description ? (
            <BrandText role="body" color={surface.textMuted}>
              {side.description}
            </BrandText>
          ) : null}

          {side.items && side.items.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: spacing.xs,
              }}
            >
              {side.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  style={{
                    display: "flex",
                    gap: spacing.sm,
                    alignItems: "flex-start",
                  }}
                >
                  {/* Puce alignée sur la ligne de texte : même métriques. */}
                  <span style={getTextStyle("body", { color })}>•</span>
                  <BrandText role="body" color={surface.text}>
                    {item}
                  </BrandText>
                </div>
              ))}
            </div>
          ) : null}

          {side.code ? renderCode(side.code, side.codeLanguage) : null}
        </div>
      </AnimatedAppear>
    );
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: stacked ? "column" : "row",
        // En colonnes, `flex-start` empêche les cartes de s'étirer sur toute
        // la hauteur disponible : chaque carte reste à la taille de son contenu.
        alignItems: stacked ? "stretch" : "flex-start",
        gap: spacing.lg,
        width: "100%",
        ...style,
      }}
    >
      {renderSide(left, "secondary", leftBadge, 0)}
      {renderSide(right, "accent", rightBadge, 1)}
    </div>
  );
};
