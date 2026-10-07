/**
 * Animations de la mascotte.
 *
 * Deux niveaux, tous deux pilotés par le temps Remotion (jamais de CSS) :
 *
 *  1. l'**entrée / sortie** : réutilise `<AnimatedAppear />` et les
 *     `AppearAnimation` du projet — mêmes courbes que les captions et
 *     l'intro/outro ;
 *  2. l'**énergie** (idle) : un « respirement » vertical sinusoïdal et une
 *     légère inclinaison fixe, continus pendant toute la séquence.
 *
 * L'attitude règle les deux. Elle **ne peut pas** modifier la posture :
 * l'asset est un PNG aplati, seules l'échelle, l'inclinaison, la fréquence du
 * respirement et l'animation d'entrée peuvent varier. Les amplitudes restent
 * volontairement faibles : la mascotte vit, elle ne fait pas un dessin animé.
 */

import type { AppearAnimation } from "../../utils/animation";
import type { MascotAttitude } from "./types";

export type MascotAttitudeMotion = {
  /** Animation d'entrée par défaut de cette attitude (surchargée par la prop `entrance`). */
  readonly entrance: AppearAnimation;
  /** Échelle d'attitude (1 = inchangée), appliquée depuis les pieds. */
  readonly scale: number;
  /** Inclinaison fixe, en degrés (sens retourné quand la mascotte est en miroir). */
  readonly tilt: number;
  /** Amplitude du respirement vertical, en pixels. */
  readonly bobAmplitude: number;
  /** Période du respirement, en secondes. */
  readonly bobPeriod: number;
};

/**
 * Table des attitudes : c'est ici qu'on règle le « caractère » de la
 * mascotte, sans toucher au composant ni aux vidéos.
 */
export const mascotAttitudes: Record<MascotAttitude, MascotAttitudeMotion> = {
  neutral: { entrance: "pop", scale: 1, tilt: 0, bobAmplitude: 6, bobPeriod: 3 },
  confident: { entrance: "slide-up", scale: 1.02, tilt: -2, bobAmplitude: 5, bobPeriod: 3.2 },
  curious: { entrance: "fade", scale: 1, tilt: 3, bobAmplitude: 7, bobPeriod: 2.6 },
  surprised: { entrance: "pop", scale: 1.05, tilt: 0, bobAmplitude: 10, bobPeriod: 1.4 },
  excited: { entrance: "slide-up", scale: 1.03, tilt: -3, bobAmplitude: 12, bobPeriod: 1.2 },
  serious: { entrance: "fade", scale: 0.98, tilt: 0, bobAmplitude: 2, bobPeriod: 4 },
  confused: { entrance: "pop", scale: 1, tilt: 4, bobAmplitude: 6, bobPeriod: 1.8 },
  friendly: { entrance: "slide-up", scale: 1.01, tilt: 2, bobAmplitude: 8, bobPeriod: 2.4 },
};

/**
 * Respirement vertical (px) à la frame donnée : sinusoïde continue,
 * déterministe (rendu reproductible frame par frame).
 */
export const getMascotBob = (
  frame: number,
  fps: number,
  motion: MascotAttitudeMotion,
): number => {
  if (motion.bobAmplitude <= 0 || motion.bobPeriod <= 0 || fps <= 0) {
    return 0;
  }

  const seconds = frame / fps;

  return Math.sin((seconds * Math.PI * 2) / motion.bobPeriod) * motion.bobAmplitude;
};

export type MascotTransformOptions = {
  /** Décalage manuel X (px, > 0 = vers la droite). */
  readonly offsetX: number;
  /** Décalage manuel Y (px, > 0 = vers le bas). */
  readonly offsetY: number;
  /** Respirement courant (px). */
  readonly bob: number;
  /** Inclinaison courante (degrés), déjà orientée selon `facing`. */
  readonly tilt: number;
};

/**
 * Construit le `transform` de la couche externe : décalage manuel +
 * respirement + inclinaison. La translation est appliquée avant la rotation
 * pour que le décalage reste indépendant de l'inclinaison.
 */
export const getMascotTransform = ({
  offsetX,
  offsetY,
  bob,
  tilt,
}: MascotTransformOptions): string =>
  `translate(${offsetX}px, ${offsetY + bob}px) rotate(${tilt}deg)`;
