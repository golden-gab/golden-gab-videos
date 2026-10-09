/**
 * `<LibraryIcon />` — icône du manifeste d'assets, rendue inline.
 *
 * Le SVG vient de `libraryIcon(id)` (`src/config/assetLibrary.ts`) : aucun
 * chemin, aucune copie locale. La couleur passe par `currentColor` et un token
 * (règle 47) ; `draw` anime `stroke-dashoffset` pour tracer l'icône.
 *
 * ```tsx
 * <LibraryIcon id="receipt" size={200} accent="accent" draw />
 * ```
 */

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { durations, easings, libraryIcon } from "../../config";
import type { AppearAnimation } from "../../utils/animation";
import { secondsToFrames } from "../../utils/time";
import { AnimatedAppear } from "../common/AnimatedAppear";
import { resolveMotionAccent, type MotionAccent } from "./shared/tokens";

/**
 * Longueur de trait générique pour l'animation `draw`. Les paths du SVG n'ont
 * pas de `pathLength` connu : une valeur large garantit que l'offset masque
 * l'icône au départ ; le tracé est donc approximatif mais uniforme à l'échelle.
 */
const iconDrawLength = 120;

export type LibraryIconProps = {
  readonly id: string;
  /** Côté du carré, en pixels. */
  readonly size?: number;
  readonly accent?: MotionAccent;
  /** Anime le tracé (`stroke-dashoffset`) à l'apparition. */
  readonly draw?: boolean;
  readonly animation?: AppearAnimation;
  readonly delaySeconds?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

export const LibraryIcon: React.FC<LibraryIconProps> = ({
  id,
  size = 160,
  accent = "accent",
  draw = false,
  animation = "pop",
  delaySeconds = 0,
  style,
  className,
}) => {
  const icon = libraryIcon(id);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const drawStart = secondsToFrames(delaySeconds, fps);
  const drawFrames = Math.max(1, secondsToFrames(durations.slow, fps));
  const drawProgress = draw
    ? interpolate(frame, [drawStart, drawStart + drawFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easings.entrance,
      })
    : 1;

  return (
    <AnimatedAppear
      animation={animation}
      delaySeconds={delaySeconds}
      style={style}
      className={className}
    >
      <svg
        aria-hidden={true}
        viewBox={`0 0 ${icon.width} ${icon.height}`}
        width={size}
        height={size}
        style={{ color: resolveMotionAccent(accent), display: "block" }}
        strokeDasharray={draw ? iconDrawLength : undefined}
        strokeDashoffset={
          draw ? iconDrawLength * (1 - drawProgress) : undefined
        }
      >
        <g dangerouslySetInnerHTML={{ __html: icon.body }} />
      </svg>
    </AnimatedAppear>
  );
};
