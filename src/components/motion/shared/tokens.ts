/**
 * Tokens partagés de la bibliothèque Motion Golden Gab.
 *
 * Les composants de `src/components/motion` ne doivent **jamais** écrire une
 * couleur ou un rayon en dur (règles 1 et 2 de `docs/RULES.md`). Deux notions
 * suffisent à couvrir tous les besoins :
 *
 *  - le **ton** (`MotionTone`) : la surface sur laquelle le composant est posé
 *    (`light` = crème/blanc, `dark` = bleu nuit). Il règle fond, texte et
 *    contours ;
 *  - l'**accent** (`MotionAccent`) : la teinte de mise en avant. Il ne peut
 *    valoir que l'une des couleurs de la palette — c'est ce qui empêche
 *    chaque composant de réinventer sa propre palette.
 */

import type React from "react";

import { colors, opacity as opacityTokens, radius, spacing, strokeWidths } from "../../../config";
import { withAlpha } from "../../../utils/color";

/** Ton d'une surface de contenu. */
export type MotionTone = "light" | "dark";

/** Accent autorisé : un alias sémantique de la palette Golden Gab. */
export type MotionAccent = "accent" | "secondary" | "neutral" | "ink";

/** Accent par défaut de la bibliothèque. */
export const defaultMotionAccent: MotionAccent = "accent";

/** Couleurs concrètes des accents (source de vérité : `src/config/colors.ts`). */
export const motionAccents: Record<MotionAccent, string> = {
  accent: colors.accent,
  secondary: colors.secondary,
  neutral: colors.neutral,
  ink: colors.ink,
};

/** Résout la couleur d'un accent, avec valeur de repli. */
export const resolveMotionAccent = (
  accent: MotionAccent = defaultMotionAccent,
): string => motionAccents[accent];

/** Palette de surface d'un ton : fond, contour, texte et texte secondaire. */
export type MotionSurface = {
  readonly background: string;
  readonly border: string;
  readonly text: string;
  readonly textMuted: string;
  /** Aplat translucide interne (entêtes, champs, pastilles). */
  readonly inset: string;
};

/** Récupère les couleurs d'une surface pour un ton donné. */
export const getMotionSurface = (tone: MotionTone): MotionSurface => {
  if (tone === "dark") {
    return {
      background: colors.surfaceDark,
      border: withAlpha(colors.inkInverse, opacityTokens.soft),
      text: colors.inkInverse,
      textMuted: withAlpha(colors.inkInverse, 0.7),
      inset: withAlpha(colors.surfaceLight, opacityTokens.subtle),
    };
  }

  return {
    background: colors.surfaceLight,
    border: withAlpha(colors.ink, 0.12),
    text: colors.ink,
    textMuted: withAlpha(colors.ink, 0.66),
    inset: colors.surface,
  };
};

/** Largeur de la barre d'accent récurrente (motif DA des cards). */
export const accentBarWidth = strokeWidths.medium;

export type MotionCardStyleOptions = {
  readonly tone?: MotionTone;
  /** Rayon ; par défaut `radius.lg`. */
  readonly radiusValue?: number;
  /** Padding interne ; par défaut `spacing.lg`. */
  readonly padding?: number;
  /** Contour ; par défaut celui du ton. */
  readonly border?: string;
};

/**
 * Style de base d'une « card » de la bibliothèque : surface, contour arrondi,
 * padding. Utilisé par `InfoCard`, `Callout`, `Comparison`, `BeforeAfter`… pour
 * garantir un rendu identique partout.
 */
export const getMotionCardStyle = (
  options: MotionCardStyleOptions = {},
): React.CSSProperties => {
  const surface = getMotionSurface(options.tone ?? "light");

  return {
    backgroundColor: surface.background,
    border: `2px solid ${options.border ?? surface.border}`,
    borderRadius: options.radiusValue ?? radius.lg,
    padding: options.padding ?? spacing.lg,
  };
};
