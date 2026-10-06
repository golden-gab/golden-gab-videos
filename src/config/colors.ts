/**
 * Golden Gab — palette de couleurs.
 *
 * Source de vérité : `public/assets/images/couelur.png`, qui contient
 * 6 échantillons exactement. Les valeurs ci-dessous ont été relevées
 * pixel par pixel sur cet asset (voir docs/DESIGN-SYSTEM.md).
 *
 * Ne jamais hardcoder une couleur dans un composant : importer `colors`
 * (alias sémantiques) ou `palette` (teintes brutes) depuis ce fichier.
 */

/** Teintes brutes, telles qu'extraites des assets de la marque. */
export const palette = {
  /** Corail / orange — couleur d'accent principale. */
  coral: "#D45D3A",
  /** Bleu nuit — couleur secondaire / fonds sombres. */
  navy: "#2D4057",
  /** Charbon — quasi-noir, texte sur fond clair. */
  charcoal: "#2B2C2C",
  /** Crème — fond clair principal. */
  cream: "#F7F4F2",
  /** Rose gris — neutre chaud secondaire. */
  rose: "#DBD0D0",
  /** Blanc pur. */
  white: "#FFFFFF",
} as const;

/**
 * Alias sémantiques à utiliser dans les composants.
 * Changer de DA = changer cette table (et `palette`), pas les composants.
 */
export const colors = {
  /** Couleur d'accent de la marque (mot mis en avant, CTA, soulignés). */
  accent: palette.coral,
  /** Couleur secondaire de la marque. */
  secondary: palette.navy,
  /** Couleur du texte principal sur fond clair. */
  ink: palette.charcoal,
  /** Texte sur fond sombre. */
  inkInverse: palette.cream,
  /** Fond clair principal (surface par défaut des vidéos). */
  surface: palette.cream,
  /** Fond sombre. */
  surfaceDark: palette.navy,
  /** Neutre chaud (séparateurs, fonds secondaires). */
  neutral: palette.rose,
  /** Fond blanc pur (cards, panneaux). */
  surfaceLight: palette.white,
  /** Contour par défaut des textes posés sur de la vidéo. */
  outline: palette.navy,
  /** Mise en évidence dans les captions. */
  captionHighlight: palette.coral,
  /** Texte des captions sur vidéo. */
  captionText: palette.white,
} as const;

export type PaletteColor = keyof typeof palette;
export type SemanticColor = keyof typeof colors;
