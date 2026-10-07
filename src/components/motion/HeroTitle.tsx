/**
 * `<HeroTitle />` — titre principal / accroche forte.
 *
 * Composant de **structure**, pas de contenu : il gère la hiérarchie
 * (sur-titre → titre → sous-titre), la mise en évidence d'un mot et l'entrée
 * animée. Le texte vient toujours des données.
 *
 * ```tsx
 * <HeroTitle
 *   eyebrow="Métiers de la tech"
 *   title="C'est quoi un AI Engineer ?"
 *   emphasis="AI Engineer"
 * />
 * ```
 *
 * À poser dans une `<SafeArea>` (ou une scène) : il n'impose pas sa propre
 * plein-cadre, seulement un bloc de titre alignable.
 */

import React from "react";

import { colors, defaultStagger, radius, spacing } from "../../config";
import type { AppearAnimation } from "../../utils/animation";
import { withAlpha } from "../../utils/color";
import { AnimatedAppear } from "../common/AnimatedAppear";
import { BrandText } from "../common/BrandText";
import { getMotionSurface, type MotionTone } from "./shared";

/** Variante de cadrage du titre. */
export type HeroTitleVariant = "default" | "centered" | "compact";

export type HeroTitleProps = {
  readonly title: string;
  /** Petit label au-dessus du titre (série, catégorie, numéro). */
  readonly eyebrow?: string;
  /**
   * Sous-chaîne du titre à mettre en évidence (couleur d'accent + marqueur).
   * La recherche ignore la casse ; le texte affiché conserve la casse d'origine.
   */
  readonly emphasis?: string;
  readonly subtitle?: string;
  /** Alignement ; la variante `centered` force `center`. */
  readonly align?: "left" | "center" | "right";
  readonly variant?: HeroTitleVariant;
  readonly tone?: MotionTone;
  /** Animation d'entrée des trois blocs (sur-titre, titre, sous-titre). */
  readonly animation?: AppearAnimation;
  readonly delaySeconds?: number;
  /** Décalage entre sur-titre, titre et sous-titre, en secondes. */
  readonly staggerSeconds?: number;
  /** Largeur maximale du bloc titre, en pixels. */
  readonly maxWidth?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

const alignments: Record<
  "left" | "center" | "right",
  React.CSSProperties["alignItems"]
> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

export const HeroTitle: React.FC<HeroTitleProps> = ({
  title,
  eyebrow,
  emphasis,
  subtitle,
  align,
  variant = "default",
  tone = "light",
  animation = "pop",
  delaySeconds = 0,
  staggerSeconds = defaultStagger,
  maxWidth,
  style,
  className,
}) => {
  const surface = getMotionSurface(tone);
  const resolvedAlign: "left" | "center" | "right" =
    variant === "centered" ? "center" : align ?? (variant === "compact" ? "left" : "center");
  const titleRole = variant === "compact" ? "h2" : "h1";

  // Découpage autour du mot mis en évidence (recherche insensible à la casse).
  const emphasisIndex =
    emphasis !== undefined && emphasis.length > 0
      ? title.toLowerCase().indexOf(emphasis.toLowerCase())
      : -1;
  const hasEmphasis = emphasisIndex !== -1 && emphasis !== undefined;
  const before = hasEmphasis ? title.slice(0, emphasisIndex) : title;
  const highlighted = hasEmphasis
    ? title.slice(emphasisIndex, emphasisIndex + (emphasis as string).length)
    : "";
  const after = hasEmphasis
    ? title.slice(emphasisIndex + (emphasis as string).length)
    : "";

  const eyebrowDelay = delaySeconds;
  const titleDelay = delaySeconds + staggerSeconds;
  const ruleDelay = delaySeconds + staggerSeconds * 1.5;
  const subtitleDelay = delaySeconds + staggerSeconds * 2;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: alignments[resolvedAlign],
        gap: spacing.md,
        width: "100%",
        textAlign: resolvedAlign,
        ...style,
      }}
    >
      {eyebrow ? (
        <AnimatedAppear animation="slide-up" delaySeconds={eyebrowDelay}>
          <BrandText role="label" align={resolvedAlign} color={colors.accent}>
            {eyebrow}
          </BrandText>
        </AnimatedAppear>
      ) : null}

      <AnimatedAppear animation={animation} delaySeconds={titleDelay}>
        <BrandText
          role={titleRole}
          align={resolvedAlign}
          color={surface.text}
          style={{ maxWidth }}
        >
          {before}
          {hasEmphasis ? (
            <span
              style={{
                color: colors.accent,
                backgroundColor: withAlpha(colors.accent, 0.14),
                borderRadius: radius.sm,
                paddingLeft: spacing.xs,
                paddingRight: spacing.xs,
              }}
            >
              {highlighted}
            </span>
          ) : null}
          {after}
        </BrandText>
      </AnimatedAppear>

      {variant === "centered" ? (
        <AnimatedAppear animation="fade" delaySeconds={ruleDelay}>
          <div
            style={{
              width: spacing.xxxl,
              height: 8,
              backgroundColor: colors.accent,
              borderRadius: radius.pill,
            }}
          />
        </AnimatedAppear>
      ) : null}

      {subtitle ? (
        <AnimatedAppear animation="slide-up" delaySeconds={subtitleDelay}>
          <BrandText
            role="body"
            align={resolvedAlign}
            color={surface.textMuted}
            style={{ maxWidth }}
          >
            {subtitle}
          </BrandText>
        </AnimatedAppear>
      ) : null}
    </div>
  );
};
