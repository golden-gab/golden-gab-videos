/**
 * Presets de transition de scène — nommés par **intention**, pas par effet.
 *
 * Ils s'appuient sur `@remotion/transitions` : chaque preset expose une
 * `presentation` (le rendu) et une `durationSeconds` (la fenêtre d'entrée /
 * sortie prise sur la scène), alignée sur `src/config/animation.ts`.
 *
 * Le rendu (`src/scenes/renderer.tsx`) applique la présentation en entrée et en
 * sortie d'une scène ; sans preset sur la scène, le rendu reste inchangé.
 * Présentations utilisées : celles purement CSS (`fade`, `slide`, `wipe`,
 * `none`) qui se pilotent par `presentationProgress`, sans runtime de canevas.
 */

import type { TransitionPresentation } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { none } from "@remotion/transitions/none";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

import { durations } from "../../config";

/** Nom d'un preset de transition de scène. */
export type SceneTransitionName =
  | "cut-doux"
  | "glisse"
  | "balayage"
  | "coupe-franche";

export type SceneTransitionPreset = {
  readonly presentation: TransitionPresentation<Record<string, unknown>>;
  /** Durée de la fenêtre de transition, en secondes. */
  readonly durationSeconds: number;
};

/**
 * Unification de types : les présentations concrètes portent des props
 * spécifiques ; on les stocke sous une forme commune pour un rendu uniforme.
 */
const asPreset = <Props extends Record<string, unknown>>(
  presentation: TransitionPresentation<Props>,
  durationSeconds: number,
): SceneTransitionPreset => ({
  presentation: presentation as TransitionPresentation<Record<string, unknown>>,
  durationSeconds,
});

export const sceneTransitionPresets: Record<
  SceneTransitionName,
  SceneTransitionPreset
> = {
  // Fondu doux : le changement se perçoit sans coupure nette.
  "cut-doux": asPreset(fade({ shouldFadeOutExitingScene: true }), durations.base),
  // Glissement vertical depuis le bas : adapté au format 9:16.
  glisse: asPreset(slide({ direction: "from-bottom" }), durations.base),
  // Balayage : la scène suivante révèle l'écran de haut en bas.
  balayage: asPreset(wipe({ direction: "from-top" }), durations.base),
  // Coupe franche explicite : aucune transition douce, changement sec.
  "coupe-franche": asPreset(none(), durations.fast),
};

/** Récupère un preset par son nom. */
export const getSceneTransitionPreset = (
  name: SceneTransitionName,
): SceneTransitionPreset => sceneTransitionPresets[name];

/** Tous les noms de presets, pour la documentation et les démos. */
export const sceneTransitionNames = Object.keys(
  sceneTransitionPresets,
) as SceneTransitionName[];
