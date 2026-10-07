/**
 * Système de mascotte Golden Gab.
 *
 * La mascotte est un **personnage global** (toutes séries), au même niveau
 * conceptuel que l'intro, l'outro, les captions et les éléments de marque :
 *
 *   <GoldenGabMascot pose="point" attitude="confident" position="right" />
 *
 * - `poses.ts`        registre pose → asset (+ poses prévues, sans asset)
 * - `positions.ts`    positions, tailles, ancrages (zone sûre / captions)
 * - `animations.ts`   attitudes + micro-mouvements (respirement)
 * - `types.ts`        types partagés (`MascotPose`, `MascotAttitude`, …)
 *
 * Ajouter une pose : asset → `src/config/assets.ts` → `poses.ts`.
 * Voir `docs/ARCHITECTURE.md` (section mascotte) et `docs/DESIGN-SYSTEM.md`.
 */

export { GoldenGabMascot, type GoldenGabMascotProps } from "./GoldenGabMascot";
export { mascotPlannedPoses, mascotPoses, type MascotPoseDefinition } from "./poses";
export {
  defaultMascotPosition,
  getMascotPlacement,
  mascotSizes,
  type MascotPlacementOptions,
  type MascotPosition,
} from "./positions";
export {
  getMascotBob,
  getMascotTransform,
  mascotAttitudes,
  type MascotAttitudeMotion,
  type MascotTransformOptions,
} from "./animations";
export {
  defaultMascotAttitude,
  defaultMascotFacing,
  defaultMascotPose,
  type MascotAttitude,
  type MascotFacing,
  type MascotOffset,
  type MascotPose,
  type MascotSize,
} from "./types";
