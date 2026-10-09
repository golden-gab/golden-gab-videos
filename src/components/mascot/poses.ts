/**
 * Registre des poses de la mascotte.
 *
 * Une « pose » = une posture du corps, correspondant à **un asset PNG réel**.
 * Une image plate ne se déforme pas : on ne peut changer de posture qu'en
 * changeant d'asset. C'est pour ça que les poses vivent dans un registre.
 *
 * Ajouter une pose — workflow en 5 étapes (brief → génération → `_pending/` →
 * validation humaine → promotion) décrit dans `docs/MASCOT-POSES.md` :
 *   1. déposer `public/assets/images/mascot/mascot-<pose>.png` ;
 *   2. référencer l'asset dans `mascotAssets` (`src/config/assets.ts`) ;
 *   3. ajouter l'entrée ici.
 * Les étapes 2 et 3 sont faites automatiquement par
 * `node scripts/promote-mascot-pose.mjs <candidat.png> <pose> --validated`
 * (qui refuse de s'exécuter sans `--validated`).
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
  thinking: {
    src: mascotAssets.thinking,
    label: "Réflexion",
    aspectRatio: 1254 / 1254,
    description: "Une main au menton — posture de réflexion ou de questionnement.",
  },
  surprised: {
    src: mascotAssets.surprised,
    label: "Surprise",
    aspectRatio: 1254 / 1254,
    description: "Les mains sur les joues — posture de surprise.",
  },
  happy: {
    src: mascotAssets.happy,
    label: "Joie",
    aspectRatio: 1254 / 1254,
    description: "Bras levés et poings serrés — posture de joie et de célébration.",
  },
  explaining: {
    src: mascotAssets.explaining,
    label: "Explication",
    aspectRatio: 1254 / 1254,
    description: "Mains ouvertes — posture d'explication ou de présentation.",
  },
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
 * Leur ajout suit le workflow de `docs/MASCOT-POSES.md` (asset → `mascotAssets`
 * → ici) ; `scripts/promote-mascot-pose.mjs` les retire automatiquement.
 */
export const mascotPlannedPoses = [
  "neutral",
  "confused",
] as const;
