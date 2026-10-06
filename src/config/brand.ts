/**
 * Golden Gab — informations de marque.
 *
 * Métadonnées textuelles de la marque, réutilisées par les composants
 * d'intro / outro / watermark. Les valeurs non confirmées par un asset
 * sont centralisées ici pour être ajustées en un seul endroit.
 */

export const brand = {
  /** Nom affiché. */
  name: "Golden Gab",
  /** Nom en capitales, pour les wordmarks textuels. */
  nameUppercase: "GOLDEN GAB",
  /**
   * Handle social affiché sur l'outro.
   * ⚠️ Valeur provisoire, à confirmer avec la marque.
   */
  handle: "@goldengab",
  /** Baseline / accroche par défaut de l'outro. */
  tagline: "Les métiers de la tech, sans filtre.",
  /** CTA par défaut de l'outro. */
  defaultCta: "Abonne-toi",
  /**
   * Ratio largeur / hauteur du logo prêt à l'emploi
   * (`assets/images/derived/logo.png`, 1600x1024).
   */
  logoAspectRatio: 1600 / 1024,
} as const;
