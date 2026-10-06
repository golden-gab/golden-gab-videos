/**
 * `<BrandText />` — texte typé par rôle.
 *
 * Garantit qu'aucune police, taille ou graisse n'est écrite en dur dans les
 * composants : tout vient de `src/config/typography.ts`.
 *
 * ```tsx
 * <BrandText role="h1">Les métiers de la tech</BrandText>
 * <BrandText role="label" color={colors.accent}>Série 01</BrandText>
 * ```
 */

import React from "react";

import { getTextStyle, type TextRole } from "../../config/typography";

export type BrandTextTag = "div" | "span" | "p" | "h1" | "h2" | "h3";

export type BrandTextProps = {
  /** Rôle typographique (voir `textRoles`). */
  readonly role?: TextRole;
  /** Balise rendue. Par défaut `div`. */
  readonly as?: BrandTextTag;
  /** Couleur du texte ; par défaut héritée du parent. */
  readonly color?: string;
  readonly align?: "left" | "center" | "right";
  readonly style?: React.CSSProperties;
  readonly className?: string;
  readonly children: React.ReactNode;
};

export const BrandText: React.FC<BrandTextProps> = ({
  role = "body",
  as = "div",
  color,
  align,
  style,
  className,
  children,
}) => {
  const Tag = as;

  return (
    <Tag
      className={className}
      style={getTextStyle(role, { color, textAlign: align, ...style })}
    >
      {children}
    </Tag>
  );
};
