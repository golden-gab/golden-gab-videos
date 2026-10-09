/**
 * `<LibraryImage />` — photo de la bibliothèque d'assets, traitée à la DA
 * Golden Gab (duotone issu des tokens) et recadrée en portrait.
 *
 * L'URL vient de `libraryAsset(id)` (`src/config/assetLibrary.ts`) : jamais de
 * chemin en dur (règle 21). `src` n'existe que pour les démos/QA où l'asset est
 * déjà résolu (par exemple un asset de marque).
 *
 * ```tsx
 * <LibraryImage id="kitchen-pass" zoom={0.1} overlay={0.55} />
 * ```
 */

import React from "react";
import { Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { aspectRatio, easings, libraryAsset, radius } from "../../config";
import { AssetTreatment } from "./shared/assetTreatment";
import type { MotionAccent } from "./shared/tokens";

export type LibraryImageProps = {
  /** Id du manifeste. Requis sauf si `src` est fourni (démo/QA). */
  readonly id?: string;
  /** URL déjà résolue (démo/QA). En production, préférer `id`. */
  readonly src?: string;
  /** Amplitude du zoom lent sur la durée de la scène. */
  readonly zoom?: number;
  /** Opacité du voile bleu nuit, 0 à 1. */
  readonly overlay?: number;
  readonly accent?: MotionAccent;
  readonly objectPosition?: string;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

const resolveImageSrc = (id?: string, src?: string): string => {
  if (src) {
    return src;
  }
  if (id) {
    return libraryAsset(id);
  }
  throw new Error(
    "LibraryImage requires either `id` (library asset) or `src` (resolved URL).",
  );
};

export const LibraryImage: React.FC<LibraryImageProps> = ({
  id,
  src,
  zoom = 0.08,
  overlay = 0.5,
  accent,
  objectPosition,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const resolvedSrc = resolveImageSrc(id, src);

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
      <Img
        src={resolvedSrc}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
          filter: "grayscale(1)",
          transform: `scale(${scale})`,
        }}
      />
      <AssetTreatment accent={accent} overlay={overlay} />
    </div>
  );
};
