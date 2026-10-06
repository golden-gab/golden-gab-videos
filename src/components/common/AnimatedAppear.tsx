/**
 * `<AnimatedAppear />` — enveloppe qui anime l'apparition puis la disparition
 * de son contenu, en se calant automatiquement sur la durée de la séquence
 * parente (`useVideoConfig().durationInFrames`).
 *
 * Utilise `getEnterProgress` / `getExitProgress` / `getAnimationStyle` de
 * `src/utils/animation.ts` : mêmes courbes que les captions et l'intro/outro.
 *
 * ```tsx
 * <Sequence from={0} durationInFrames={60}>
 *   <AnimatedAppear animation="slide-up">
 *     <Text />
 *   </AnimatedAppear>
 * </Sequence>
 * ```
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

import { defaultAppearAnimation, durations } from "../../config/animation";
import {
  getAnimationStyle,
  getEnterProgress,
  getExitProgress,
  mergeAnimationStyles,
  type AppearAnimation,
} from "../../utils/animation";
import { secondsToFrames } from "../../utils/time";

export type AnimatedAppearProps = {
  /** Animation d'entrée. */
  readonly animation?: AppearAnimation;
  /** Animation de sortie. Par défaut, la même que l'entrée. */
  readonly exitAnimation?: AppearAnimation;
  /** Durée d'entrée, en secondes. */
  readonly appearDuration?: number;
  /** Durée de sortie, en secondes. */
  readonly exitDuration?: number;
  /** Retard avant le début de l'entrée, en secondes (effet d'escalier). */
  readonly delaySeconds?: number;
  /** Distance en pixels pour les animations `slide-*`. */
  readonly distance?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
  readonly children: React.ReactNode;
};

export const AnimatedAppear: React.FC<AnimatedAppearProps> = ({
  animation = defaultAppearAnimation,
  exitAnimation,
  appearDuration = durations.base,
  exitDuration = durations.base,
  delaySeconds = 0,
  distance,
  style,
  className,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enterStyle = getAnimationStyle(
    animation,
    getEnterProgress({
      frame: frame - secondsToFrames(delaySeconds, fps),
      enterFrames: secondsToFrames(appearDuration, fps),
    }),
    { distance },
  );

  const exitStyle = getAnimationStyle(
    exitAnimation ?? animation,
    getExitProgress({
      frame,
      durationInFrames,
      exitFrames: secondsToFrames(exitDuration, fps),
    }),
    { distance },
  );

  return (
    <div
      className={className}
      style={{ ...mergeAnimationStyles(enterStyle, exitStyle), ...style }}
    >
      {children}
    </div>
  );
};
