/**
 * Golden Gab — espacements et rayons.
 * Échelle en pixels, pensées pour une composition de 1080px de large.
 */

export const spacing = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 40,
  xl: 64,
  xxl: 96,
  xxxl: 140,
} as const;

export const radius = {
  sm: 12,
  md: 24,
  lg: 40,
  xl: 64,
  pill: 999,
} as const;

/** Épaisseurs de trait utilisables (bordures, contours de texte). */
export const strokeWidths = {
  hairline: 2,
  thin: 4,
  medium: 8,
  thick: 14,
  heavy: 20,
} as const;

/** Opacités nommées, pour éviter les valeurs flottantes dispersées. */
export const opacity = {
  subtle: 0.08,
  soft: 0.16,
  medium: 0.4,
  strong: 0.72,
  solid: 1,
} as const;
