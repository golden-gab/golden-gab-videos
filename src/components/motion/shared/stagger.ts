/**
 * Stagger — rythme commun des entrées séquentielles.
 *
 * Tous les composants qui font apparaître plusieurs éléments (nodes, étapes,
 * lignes de code, items de liste…) partagent ce calcul. Le décalage vient de
 * `defaultStagger` (`src/config/animation.ts`) : régler le rythme de la
 * bibliothèque = changer une seule valeur.
 *
 * ```ts
 * items.map((item, i) => (
 *   <AnimatedAppear delaySeconds={getStaggerDelay(i)}>{item}</AnimatedAppear>
 * ));
 * ```
 */

import { defaultStagger } from "../../../config";

/** Retard (secondes) du `index`-ième élément d'une séquence. */
export const getStaggerDelay = (
  index: number,
  step: number = defaultStagger,
): number => Math.max(0, index) * step;

/** Résout l'offset explicite d'un élément ou son stagger par défaut. */
export const getItemRevealDelay = (
  index: number,
  step: number,
  revealOffsets?: readonly number[],
): number => revealOffsets?.[index] ?? getStaggerDelay(index, step);

/** Retards (secondes) des `count` premiers éléments d'une séquence. */
export const getStaggerDelays = (
  count: number,
  step: number = defaultStagger,
): number[] => {
  const delays: number[] = [];

  for (let index = 0; index < count; index += 1) {
    delays.push(getStaggerDelay(index, step));
  }

  return delays;
};

/**
 * Retard partagé d'une connection entre deux éléments : la moitié du pas, pour
 * que le trait se dessine pendant que le nœud suivant arrive.
 */
export const getConnectorDelay = (
  index: number,
  step: number = defaultStagger,
): number => getStaggerDelay(index, step) + step * 0.5;
