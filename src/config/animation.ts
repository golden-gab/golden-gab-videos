/**
 * Golden Gab — paramètres d'animation récurrents.
 *
 * Toutes les durées sont exprimées en **secondes** et converties en frames
 * avec le `fps` de la composition (`useVideoConfig()`), jamais en frames
 * codées en dur : une composition peut changer de framerate sans casser
 * les animations.
 */

import { Easing } from "remotion";

import type { AppearAnimation } from "../utils/animation";

/** Courbes d'accélération réutilisables. */
export const easings = {
  /** Sortie franche, rendu "premium". Courbe par défaut des entrées. */
  entrance: Easing.bezier(0.16, 1, 0.3, 1),
  /** Sortie douce, pour les disparitions. */
  exit: Easing.bezier(0.4, 0, 1, 1),
  /** Mouvement continu (défilements, rotations). */
  linear: Easing.linear,
  /** Rebond amorti, pour les pops. */
  spring: Easing.spring({ damping: 200 }),
} as const;

/** Durées standard, en secondes. */
export const durations = {
  /** Micro-feedback. */
  instant: 0.12,
  /** Entrée de caption / d'élément court. */
  fast: 0.25,
  /** Entrée d'un bloc de contenu. */
  base: 0.4,
  /** Entrée d'écran (intro / outro). */
  slow: 0.8,
} as const;

/** Animation d'apparition / disparition par défaut du projet. */
export const defaultAppearAnimation: AppearAnimation = "pop";

/** Distance (px) utilisée par les animations de type `slide-*`. */
export const defaultSlideDistance = 64;

/** Élasticité du pop (échelle de départ, 1 = taille finale). */
export const defaultPopScale = 0.82;

/**
 * Décalage par défaut entre deux éléments d'une même séquence (effet
 * d'escalier / stagger), en secondes. Utilisé par les composants de
 * `src/components/motion` : une seule valeur règle le rythme de la
 * bibliothèque.
 */
export const defaultStagger = 0.15;
