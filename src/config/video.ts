/**
 * Golden Gab — constantes de format vidéo.
 *
 * Le projet produit des vidéos verticales TikTok (9:16).
 * Toute dimension réutilisée (format, zone sûre, zone captions) doit venir
 * d'ici, jamais d'un nombre magique dans un composant.
 */

import type { CaptionPosition } from "../captions/types";

/** Format standard des compositions Golden Gab (identique au template Remotion). */
export const videoFormat = {
  width: 1080,
  height: 1920,
  fps: 30,
} as const;

/** Ratio largeur / hauteur (9:16). */
export const aspectRatio = videoFormat.width / videoFormat.height;

/** Marges de la zone sûre, en pixels (base 1080x1920). */
export type SafeAreaInsets = {
  readonly top: number;
  readonly bottom: number;
  readonly left: number;
  readonly right: number;
};

/**
 * Zone sûre : marge à respecter pour tout contenu important (titres, textes).
 * L'UI de TikTok recouvre le bas de l'écran, d'où une marge basse plus large.
 * Valeurs pensées pour une base 1080x1920 ; pour d'autres largeurs,
 * utiliser `scaleSafeArea()`.
 */
export const safeArea: SafeAreaInsets = {
  top: 260,
  bottom: 420,
  left: 72,
  right: 72,
};

/**
 * Zone dédiée aux captions : au-dessus de l'UI basse de TikTok,
 * centrée horizontalement.
 */
export const captionZone = {
  /** Distance depuis le bas de la composition pour la variante "bottom". */
  bottom: 520,
  /** Hauteur maximale de la zone. */
  height: 420,
  /** Largeur maximale des captions, en ratio de la largeur de composition. */
  maxWidthRatio: 0.9,
} as const;

/** Positions verticales supportées par le système de captions. */
export const captionPositions: Record<CaptionPosition, number> = {
  bottom: captionZone.bottom,
  center: (videoFormat.height - captionZone.height) / 2,
  top: safeArea.top,
};

/** Échelle la zone sûre pour une largeur de composition donnée. */
export const scaleSafeArea = (compositionWidth: number) => {
  const ratio = compositionWidth / videoFormat.width;

  return {
    top: safeArea.top * ratio,
    bottom: safeArea.bottom * ratio,
    left: safeArea.left * ratio,
    right: safeArea.right * ratio,
    ratio,
  };
};
