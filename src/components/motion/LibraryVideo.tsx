/**
 * `<LibraryVideo />` — b-roll de la bibliothèque d'assets, muet et traité à la
 * DA Golden Gab (même duotone que `LibraryImage`).
 *
 * Composant vidéo recommandé par Remotion 4.0.533 : `<Video>` de
 * `@remotion/media`. L'URL vient de `libraryFile(id, "video")` : jamais de
 * chemin en dur (règle 21). `src` n'existe que pour les démos/QA.
 *
 * ```tsx
 * <LibraryVideo id="typing-laptop" zoom={0.12} />
 * ```
 */

import React from "react";
import { Video } from "@remotion/media";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { aspectRatio, easings, libraryFile, radius } from "../../config";
import { AssetTreatment } from "./shared/assetTreatment";
import type { MotionAccent } from "./shared/tokens";

export type LibraryVideoProps = {
  /** Id du manifeste. Requis sauf si `src` est fourni (démo/QA). */
  readonly id?: string;
  /** URL déjà résolue (démo/QA). En production, préférer `id`. */
  readonly src?: string;
  readonly zoom?: number;
  readonly overlay?: number;
  readonly accent?: MotionAccent;
  /** Démarrer la lecture à cette frame de la source. */
  readonly trimBefore?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

const resolveVideoSrc = (id?: string, src?: string): string => {
  if (src) {
    return src;
  }
  if (id) {
    return libraryFile(id, "video");
  }
  throw new Error(
    "LibraryVideo requires either `id` (library asset) or `src` (resolved URL).",
  );
};

export const LibraryVideo: React.FC<LibraryVideoProps> = ({
  id,
  src,
  zoom = 0.08,
  overlay = 0.5,
  accent,
  trimBefore,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const resolvedSrc = resolveVideoSrc(id, src);

  const scale = interpolate(
    frame,
    [0, Math.max(1, durationInFrames - 1)],
    [1, 1 + zoom],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easings.linear,
    },
  );

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        overflow: "hidden",
        borderRadius: radius.lg,
        ...style,
      }}
    >
      <Video
        src={resolvedSrc}
        muted
        loop
        trimBefore={trimBefore}
        objectFit="cover"
        style={{ filter: "grayscale(1)", transform: `scale(${scale})` }}
      />
      <AssetTreatment accent={accent} overlay={overlay} />
    </div>
  );
};
