/**
 * Zones d'un plan : calcul pur (aucun React/Remotion), donc testable.
 *
 * Un plan contient trois choses qui ne doivent JAMAIS se recouvrir : les
 * captions, la mascotte et l'illustration. Au lieu de placer chaque élément à
 * la main, on découpe l'écran en rectangles :
 *
 *   1. les captions occupent une bande fixe (selon leur position) ;
 *   2. la plus grande zone libre (au-dessus ou au-dessous) devient la `free` ;
 *   3. la `free` est partagée entre la mascotte et l'illustration selon le
 *      gabarit (`ZoneLayout`) choisi par le plan.
 */

import {
  captionZone,
  getCaptionBoxTop,
  safeArea,
  videoFormat,
} from "../../../config/video.ts";
import type { CaptionPosition } from "../../../captions/types.ts";

export type Rect = {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
};

/**
 * Gabarit du plan :
 * - `art`         : l'illustration occupe toute la zone libre ;
 * - `side-left`   : mascotte à gauche, illustration à droite ;
 * - `side-right`  : mascotte à droite, illustration à gauche ;
 * - `stack-left`  : illustration en haut, mascotte en bas à gauche ;
 * - `stack-right` : illustration en haut, mascotte en bas à droite ;
 * - `mascot`      : la mascotte seule occupe toute la zone libre.
 */
export type ZoneLayout =
  | "art"
  | "side-left"
  | "side-right"
  | "stack-left"
  | "stack-right"
  | "mascot";

export type Zones = {
  /** Bloc de texte des captions (réservé, jamais utilisé par un visuel). */
  readonly caption: Rect;
  /** Zone libre totale (mascotte + illustration). */
  readonly free: Rect;
  /** Zone de l'illustration (vide si le gabarit est `mascot`). */
  readonly art: Rect | null;
  /** Carré de la mascotte (absent si le gabarit est `art`). */
  readonly mascot: Rect | null;
};

/** Demi-hauteur d'un bloc de captions sur deux lignes, en pixels. */
export const CAPTION_TEXT_HALF_HEIGHT = 110;
/** Air laissé entre les captions et les visuels. */
export const CAPTION_CLEARANCE = 50;
/** Air entre la mascotte et l'illustration. */
export const ZONE_GAP = 24;
/** Côté maximal du carré de la mascotte dans un gabarit partagé. */
export const MASCOT_SIDE_MAX = 400;
export const MASCOT_STACK_MAX = 360;
export const MASCOT_SOLO_MAX = 800;

const W = videoFormat.width;
const H = videoFormat.height;

/** Zone libre (la plus grande, au-dessus ou au-dessous des captions). */
export const getFreeRegion = (lane: CaptionPosition): Rect => {
  const top = getCaptionBoxTop(lane);
  const textCenter = top + captionZone.height / 2;
  const textTop = textCenter - CAPTION_TEXT_HALF_HEIGHT;
  const textBottom = textCenter + CAPTION_TEXT_HALF_HEIGHT;
  const aboveY = safeArea.top;
  const aboveH = textTop - CAPTION_CLEARANCE - aboveY;
  const belowY = textBottom + CAPTION_CLEARANCE;
  const belowH = H - safeArea.bottom - belowY;
  const x = safeArea.left;
  const w = W - safeArea.left - safeArea.right;

  return aboveH >= belowH
    ? { x, y: aboveY, w, h: aboveH }
    : { x, y: belowY, w, h: belowH };
};

/** Bloc de texte des captions (pour les tests de non-chevauchement). */
export const getCaptionRect = (lane: CaptionPosition): Rect => {
  const textCenter = getCaptionBoxTop(lane) + captionZone.height / 2;

  return {
    x: safeArea.left,
    y: textCenter - CAPTION_TEXT_HALF_HEIGHT,
    w: W - safeArea.left - safeArea.right,
    h: CAPTION_TEXT_HALF_HEIGHT * 2,
  };
};

/** Découpe la zone libre selon le gabarit. */
export const getZones = (
  lane: CaptionPosition,
  layout: ZoneLayout,
): Zones => {
  const free = getFreeRegion(lane);
  const caption = getCaptionRect(lane);

  if (layout === "art") {
    return { caption, free, art: free, mascot: null };
  }

  if (layout === "mascot") {
    const side = Math.min(free.w, free.h, MASCOT_SOLO_MAX);

    return {
      caption,
      free,
      art: null,
      mascot: {
        x: free.x + (free.w - side) / 2,
        y: free.y + (free.h - side) / 2,
        w: side,
        h: side,
      },
    };
  }

  if (layout === "side-left" || layout === "side-right") {
    const side = Math.min(MASCOT_SIDE_MAX, free.h);
    const artW = free.w - side - ZONE_GAP;
    const mascotX =
      layout === "side-left" ? free.x : free.x + free.w - side;
    const artX = layout === "side-left" ? free.x + side + ZONE_GAP : free.x;

    return {
      caption,
      free,
      art: { x: artX, y: free.y, w: artW, h: free.h },
      mascot: { x: mascotX, y: free.y + free.h - side, w: side, h: side },
    };
  }

  const side = Math.min(MASCOT_STACK_MAX, free.h * 0.4);
  const artH = free.h - side - ZONE_GAP;

  return {
    caption,
    free,
    art: { x: free.x, y: free.y, w: free.w, h: artH },
    mascot: {
      x: layout === "stack-left" ? free.x : free.x + free.w - side,
      y: free.y + free.h - side,
      w: side,
      h: side,
    },
  };
};

/** Deux rectangles se recouvrent-ils ? (marge de 1 px pour l'arrondi). */
export const rectsOverlap = (a: Rect, b: Rect): boolean =>
  a.x < b.x + b.w - 1 &&
  b.x < a.x + a.w - 1 &&
  a.y < b.y + b.h - 1 &&
  b.y < a.y + a.h - 1;

/** Échelle qui fait tenir un contenu de `w × h` dans `rect` (jamais au-delà de `max`). */
export const fitScale = (
  rect: Rect,
  w: number,
  h: number,
  max = 1.25,
): number => Math.min(max, rect.w / w, rect.h / h);
