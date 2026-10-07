/**
 * Types partagés du système de mascotte Golden Gab.
 *
 * La mascotte est un **personnage** : on sépare deux notions:  *  - la **pose** (`MascotPose`) : la posture du corps → un asset PNG réel ;
 *  - l'**attitude** (`MascotAttitude`) : le rôle narratif joué dans la scène →
 *    mouvement, échelle, timing (jamais la posture).
 *
 * `MascotPose` est **dérivée du registre** (`poses.ts`) : une pose n'existe
 * que si un asset lui est réellement associé.
 */

import { mascotPoses } from "./poses";

/** Pose réellement disponible aujourd'hui : `point` (doigt levé). */
export type MascotPose = keyof typeof mascotPoses;

/** Pose utilisée quand aucune n'est spécifiée. */
export const defaultMascotPose: MascotPose = "point";

/**
 * Attitude narrative : ce que la mascotte **joue** dans la scène, indépendant
 * de sa posture. Elle module l'entrée, l'échelle, l'inclinaison et le
 * respirement — jamais la forme du corps (asset non articulé).
 */
export type MascotAttitude =
  | "neutral"
  | "confident"
  | "curious"
  | "surprised"
  | "excited"
  | "serious"
  | "confused"
  | "friendly";

/** Attitude par défaut : neutre, discrète. */
export const defaultMascotAttitude: MascotAttitude = "neutral";

/**
 * Orientation de la mascotte (regard / sens du corps).
 * `left` = telle que l'asset source (non modifié) ; `right` = miroir horizontal.
 */
export type MascotFacing = "left" | "right";

/** Orientation par défaut : celle de l'asset source. */
export const defaultMascotFacing: MascotFacing = "left";

/**
 * Tailles préréglées (hauteur en pixels, base 1080 de large).
 * Un nombre passé à la prop `size` surcharge ces valeurs.
 */
export type MascotSize = "small" | "medium" | "large";

/**
 * Décalage manuel depuis l'ancrage de la position, en pixels.
 * `x > 0` = vers la droite de l'écran, `y > 0` = vers le bas.
 */
export type MascotOffset = {
  readonly x?: number;
  readonly y?: number;
};
