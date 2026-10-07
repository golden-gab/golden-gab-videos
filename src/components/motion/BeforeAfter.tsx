/**
 * `<BeforeAfter />` — montrer une transformation.
 *
 * Optimisation, refactoring, évolution d'architecture, changement de process…
 * Volontairement **distinct de `Comparison`** : ici les deux états sont
 * successifs (empilés, reliés par une flèche), pas deux options parallèles.
 *
 * ```tsx
 * <BeforeAfter
 *   before={{ label: "Avant", value: "100 lignes de code" }}
 *   after={{ label: "Après", value: "20 lignes de code" }}
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
import { Connector } from "./shared/Connector";
import type { CodeLanguage } from "./shared/highlight";
import {
  getMotionCardStyle,
  getMotionSurface,
  resolveMotionAccent,
  type MotionAccent,
  type MotionTone,
} from "./shared/tokens";

/** Un état de la transformation. */
export type BeforeAfterState = {
  /** Libellé de l'état (ex. `"Avant"`, `"Après"`). */
  readonly label: string;
  /** Valeur principale (ex. `"20 lignes de code"`). */
  readonly value?: string;
  readonly description?: string;
  readonly items?: readonly string[];
  readonly code?: string;
  readonly codeLanguage?: CodeLanguage;
  readonly accent?: MotionAccent;
};

export type BeforeAfterProps = {
  readonly before: BeforeAfterState;
  readonly after: BeforeAfterState;
  readonly tone?: MotionTone;
  readonly animation?: AppearAnimation;
  readonly delaySeconds?: number;
  readonly staggerSeconds?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  before,
  after,
  tone = "light",
  animation = "slide-up",
  delaySeconds = 0,
  staggerSeconds = defaultStagger,
  style,
  className,
}) => {
  const surface = getMotionSurface(tone);

  const renderState = (
    state: BeforeAfterState,
    defaultAccent: MotionAccent,
    index: number,
  ) => {
    const color = resolveMotionAccent(state.accent ?? defaultAccent);

    return (
      <AnimatedAppear
        animation={animation}
        delaySeconds={delaySeconds + index * (staggerSeconds * 2)}
        style={{ width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.sm,
            width: "100%",
            borderLeft: `${strokeWidths.medium}px solid ${color}`,
            ...getMotionCardStyle({
              tone,
              radiusValue: radius.lg,
              padding: spacing.lg,
            }),
          }}
        >
          <div
            style={{
              alignSelf: "flex-start",
              paddingLeft: spacing.md,
              paddingRight: spacing.md,
              paddingTop: spacing.xs,
              paddingBottom: spacing.xs,
              borderRadius: radius.pill,
              backgroundColor: withAlpha(color, 0.16),
            }}
          >
            <BrandText role="label" color={color}>
              {state.label}
            </BrandText>
          </div>

          {state.value ? (
            <BrandText role="h3" as="h3" color={surface.text}>
              {state.value}
            </BrandText>
          ) : null}

          {state.description ? (
            <BrandText role="body" color={surface.textMuted}>
              {state.description}
            </BrandText>
          ) : null}

          {state.items && state.items.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.xs }}>
              {state.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  style={{ display: "flex", gap: spacing.sm, alignItems: "flex-start" }}
                >
                  <span style={getTextStyle("body", { color })}>•</span>
                  <BrandText role="body" color={surface.text}>
                    {item}
                  </BrandText>
                </div>
              ))}
            </div>
          ) : null}

          {state.code ? (
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
                code={state.code}
                language={state.codeLanguage ?? "plain"}
                fontSize={typeScale.label}
              />
            </div>
          ) : null}
        </div>
      </AnimatedAppear>
    );
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: spacing.xs,
        width: "100%",
        ...style,
      }}
    >
      {renderState(before, "secondary", 0)}
      <Connector
        direction="down"
        accent={after.accent ?? "accent"}
        delaySeconds={delaySeconds + staggerSeconds}
        length={spacing.xl}
      />
      {renderState(after, "accent", 1)}
    </div>
  );
};
