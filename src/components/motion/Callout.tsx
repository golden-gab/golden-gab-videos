/**
 * `<Callout />` — mise en évidence forte d'une information.
 *
 * Conseils, définitions, avertissements, punchlines ou conclusions. Les
 * variantes ne changent **pas** la palette : elles choisissent un accent et un
 * marqueur parmi les couleurs de la marque (voir `docs/DESIGN-SYSTEM.md`).
 *
 * ```tsx
 * <Callout variant="important" text="Une API n'est pas seulement une URL." />
 * <Callout variant="info" title="Définition" text="Une API expose des fonctions." />
 * ```
 */

import React from "react";

import { radius, spacing, strokeWidths } from "../../config";
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

export type CalloutVariant = "info" | "success" | "warning" | "important";

export type CalloutProps = {
  readonly text: string;
  readonly variant?: CalloutVariant;
  /** Titre du callout ; un libellé par défaut est fourni par variante. */
  readonly title?: string;
  /** Icône ; par défaut un marqueur textuel propre à la variante. */
  readonly icon?: React.ReactNode;
  readonly tone?: MotionTone;
  readonly animation?: AppearAnimation;
  readonly delaySeconds?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

/**
 * Une variante = un accent (dans la palette) + un titre et un marqueur par
 * défaut. Aucune couleur hors design system.
 */
const calloutVariants: Record<
  CalloutVariant,
  { readonly accent: MotionAccent; readonly title: string; readonly icon: string }
> = {
  info: { accent: "secondary", title: "Info", icon: "i" },
  success: { accent: "accent", title: "À retenir", icon: "✓" },
  warning: { accent: "accent", title: "Attention", icon: "!" },
  important: { accent: "ink", title: "Important", icon: "!" },
};

export const Callout: React.FC<CalloutProps> = ({
  text,
  variant = "info",
  title,
  icon,
  tone = "light",
  animation = "pop",
  delaySeconds = 0,
  style,
  className,
}) => {
  const preset = calloutVariants[variant];
  const surface = getMotionSurface(tone);
  const color = resolveMotionAccent(preset.accent);

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
          gap: spacing.md,
          alignItems: "flex-start",
          width: "100%",
          ...getMotionCardStyle({ tone, radiusValue: radius.lg, padding: spacing.lg }),
        }}
      >
        <div
          style={{
            width: spacing.xl,
            height: spacing.xl,
            flexShrink: 0,
            borderRadius: radius.pill,
            backgroundColor: withAlpha(color, 0.18),
            border: `2px solid ${color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BrandText role="label" color={color}>
            {icon ?? preset.icon}
          </BrandText>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.xs,
            flex: 1,
            minWidth: 0,
          }}
        >
          <BrandText role="label" color={color}>
            {title ?? preset.title}
          </BrandText>
          <BrandText role="body" color={surface.text}>
            {text}
          </BrandText>
        </div>

        {/* Barre d'accent verticale : rappel discret de la variante. */}
        <div
          style={{
            width: strokeWidths.thin,
            alignSelf: "stretch",
            minHeight: spacing.xl,
            borderRadius: radius.pill,
            backgroundColor: withAlpha(color, 0.6),
            marginTop: spacing.xs,
            marginBottom: spacing.xs,
          }}
        />
      </div>
    </AnimatedAppear>
  );
};
