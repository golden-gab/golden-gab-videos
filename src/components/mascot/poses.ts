/**
 * Registre des poses de la mascotte.
 *
 * Une « pose » = une posture du corps, correspondant à **un asset PNG réel**.
 * Une image plate ne se déforme pas : on ne peut changer de posture qu'en
 * changeant d'asset. C'est pour ça que les poses vivent dans un registre.
 *
 * Ajouter une pose :
 *   1. déposer `public/assets/images/mascot/<pose>.png` ;
 *   2. référencer l'asset dans `mascotAssets` (`src/config/assets.ts`) ;
 *   3. ajouter l'entrée ici.
 * Le type `MascotPose` (dans `types.ts`, dérivé de ce registre) se met alors
 * à jour automatiquement : aucune vidéo existante à modifier.
 *
 * ⚠️ Tant qu'une pose n'est pas dans ce registre, elle est **impossible** à
 * passer au composant (`pose="…"` ne compile pas). Les poses sans asset sont
 * listées dans `mascotPlannedPoses`, à titre documentaire uniquement.
 */

import { mascotAssets } from "../../config";

export type MascotPoseDefinition = {
  /** Asset à afficher (clé de `mascotAssets`). */
  readonly src: string;
  /** Libellé lisible (styleguide, docs, Studio). */
  readonly label: string;
  /** Ratio largeur / hauteur du PNG ; le composant en déduit la largeur. */
  readonly aspectRatio: number;
  /** Description de la posture, pour les documents. */
  readonly description: string;
};

/**
 * Poses réellement disponibles (assets présents dans le repository).
 * Pose par défaut du système : `point` (voir `defaultMascotPose`).
 */
export const mascotPoses = {
  point: {
    src: mascotAssets.point,
    label: "Doigt levé",
    aspectRatio: 1254 / 1254,
    description:
      "Bras droit levé, index en l'air — posture d'annonce / d'introduction.",
  },
} satisfies Record<string, MascotPoseDefinition>;

/**
 * Poses **prévues mais sans asset** : elles ne font pas partie du type
 * `MascotPose` et ne peuvent donc pas être utilisées dans une vidéo.
 * Leur ajout suit la procédure de ce fichier (asset → `mascotAssets` → ici).
 */
export const mascotPlannedPoses = [
  "neutral",
  "thinking",
  "explaining",
  "surprised",
  "happy",
  "confused",
] as const;
