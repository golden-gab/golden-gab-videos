/**
 * `AnimatedAppear` sans fondu de sortie. Promu depuis le montage mascotte.
 */

import React from "react";

import { durations } from "../../../config";
import type { AppearAnimation } from "../../../utils/animation";
import { AnimatedAppear } from "../../common/AnimatedAppear";

type AppearProps = {
  readonly delay?: number;
  readonly animation?: AppearAnimation;
  readonly duration?: number;
  readonly distance?: number;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
};

/**
 * `AnimatedAppear` sans fondu de sortie : les plans sont des coupes franches,
 * un élément ne doit pas s'éteindre juste avant le plan suivant.
 */
export const Appear: React.FC<AppearProps> = ({
  delay = 0,
  animation = "pop",
  duration = durations.base,
  distance,
  style,
  children,
}) => (
  <AnimatedAppear
    animation={animation}
    exitAnimation="none"
    delaySeconds={delay}
    appearDuration={duration}
    distance={distance}
    style={style}
  >
    {children}
  </AnimatedAppear>
);
