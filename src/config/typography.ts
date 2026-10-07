/**
 * Golden Gab — typographie.
 *
 * Police des titres : **Darker Grotesque** (Google Fonts).
 * Police complémentaire : **Inter**, utilisée pour les textes longs /
 * fonctionnels (valeurs, labels, sous-titres d'UI) où Darker Grotesque,
 * très condensée, serait moins lisible. Voir docs/DESIGN-SYSTEM.md.
 *
 * Aucun composant ne doit déclarer une `fontFamily` en dur :
 * utiliser `fontFamilies`, `fontWeights`, `typeScale` ou `textRoles`.
 */

import { loadFont as loadDarkerGrotesque } from "@remotion/google-fonts/DarkerGrotesque";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import type React from "react";

/**
 * `loadFont()` bloque le rendu Remotion tant que la police n'est pas prête
 * (`delayRender` / `continueRender` gérés par le package).
 * Appelé au niveau module : une seule fois, au premier import.
 */
export const darkerGrotesque = loadDarkerGrotesque("normal", {
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

export const inter = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
});

/**
 * Police monospace utilisée uniquement pour l'affichage de code
 * (`CodeShowcase`). Décision d'ingénierie : aucune police monospace n'existe
 * dans les assets de la marque, et Inter (proportionnelle) rend un extrait de
 * code peu lisible. Comme `fontFamilies.body`, changer de police de code =
 * changer `fontFamilies.mono`.
 */
export const jetBrainsMono = loadJetBrainsMono("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin", "latin-ext"],
});

/**
 * Noms de familles CSS nus (sans fallback) : `fontFamily` est aussi utilisé
 * par `fitText()` de `@remotion/layout-utils`, qui doit mesurer la police
 * exacte. Ajouter un fallback casserait la mesure du texte.
 */
export const fontFamilies = {
  /** Titres, accroches, captions. */
  title: darkerGrotesque.fontFamily,
  /** Textes longs, labels, données. */
  body: inter.fontFamily,
  /** Code affiché dans une vidéo (blocs `CodeShowcase`, diffs…). */
  mono: jetBrainsMono.fontFamily,
} as const;

/** Charges supplémentaires, conservées pour usages futurs explicites. */
export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

/**
 * Échelle typographique, en pixels, pour une composition de 1080px de large.
 * Repères issus des bonnes pratiques vidéo : titre principal >= 84px,
 * texte secondaire >= 44px en base 1080.
 */
export const typeScale = {
  /** Accroche plein écran. */
  display: 180,
  /** Titre d'écran. */
  h1: 132,
  /** Sous-titre / titre de section. */
  h2: 96,
  /** Titre de carte. */
  h3: 72,
  /** Caption par défaut (taille maximale ; réduite si le texte est long). */
  caption: 96,
  /** Corps de texte. */
  body: 48,
  /** Code affiché (monospace). */
  code: 40,
  /** Labels, annotations, mentions. */
  label: 34,
} as const;

/** Rôles typographiques nommés. */
export type TextRole =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "caption"
  | "body"
  | "code"
  | "label";

/**
 * Styles prêts à l'emploi par rôle.
 * `React.CSSProperties` : utilisables directement dans un `style={...}`.
 */
export const textRoles = {
  display: {
    fontFamily: fontFamilies.title,
    fontWeight: fontWeights.black,
    fontSize: typeScale.display,
    lineHeight: 0.92,
    letterSpacing: "-0.02em",
    textTransform: "uppercase",
  },
  h1: {
    fontFamily: fontFamilies.title,
    fontWeight: fontWeights.extrabold,
    fontSize: typeScale.h1,
    lineHeight: 0.95,
    letterSpacing: "-0.015em",
  },
  h2: {
    fontFamily: fontFamilies.title,
    fontWeight: fontWeights.bold,
    fontSize: typeScale.h2,
    lineHeight: 1,
    letterSpacing: "-0.01em",
  },
  h3: {
    fontFamily: fontFamilies.title,
    fontWeight: fontWeights.semibold,
    fontSize: typeScale.h3,
    lineHeight: 1.05,
    letterSpacing: "0em",
  },
  caption: {
    fontFamily: fontFamilies.title,
    fontWeight: fontWeights.black,
    fontSize: typeScale.caption,
    lineHeight: 1,
    letterSpacing: "0em",
  },
  body: {
    fontFamily: fontFamilies.body,
    fontWeight: fontWeights.regular,
    fontSize: typeScale.body,
    lineHeight: 1.4,
    letterSpacing: "0em",
  },
  code: {
    fontFamily: fontFamilies.mono,
    fontWeight: fontWeights.regular,
    fontSize: typeScale.code,
    lineHeight: 1.5,
    letterSpacing: "0em",
  },
  label: {
    fontFamily: fontFamilies.body,
    fontWeight: fontWeights.semibold,
    fontSize: typeScale.label,
    lineHeight: 1.2,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
} as const satisfies Record<TextRole, React.CSSProperties>;

/** Récupère les styles d'un rôle, avec surcharges optionnelles. */
export const getTextStyle = (
  role: TextRole,
  overrides?: React.CSSProperties,
): React.CSSProperties => ({
  ...textRoles[role],
  ...overrides,
});
