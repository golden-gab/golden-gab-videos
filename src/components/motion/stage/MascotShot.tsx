/**
 * Une « prise » de la mascotte : une pose, une position, un halo. Promu depuis
 * le montage mascotte Data Analyst (règle 46).
 */

import React from "react";
import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";

import { colors, radius, strokeWidths } from "../../../config";
import type { Scene } from "../../../scenes/types";
import type { AppearAnimation } from "../../../utils/animation";
import { withAlpha } from "../../../utils/color";
import { secondsToFrames } from "../../../utils/time";
import { GoldenGabMascot } from "../../mascot/GoldenGabMascot";
import type { MascotAttitude, MascotPose } from "../../mascot/types";
import { Appear } from "./Appear";
import { abs, band } from "./geometry";

export type MascotShotProps = {
  /** Début de la prise, en secondes depuis le début de la scène. */
  readonly from?: number;
  /** Fin de la prise (par défaut, la fin de la scène). */
  readonly to?: number;
  readonly scene: Scene;
  readonly pose: MascotPose;
  readonly attitude?: MascotAttitude;
  readonly side?: "left" | "right";
  /** Hauteur de la mascotte, en pixels. */
  readonly size?: number;
  /** Décalage vertical vers le haut depuis le bas de la bande (px). */
  readonly lift?: number;
  /** Dépassement du bord latéral de la bande (px, > 0 = vers l'extérieur). */
  readonly bleed?: number;
  /** `true` : orientation miroir (la pose regarde vers la droite). */
  readonly mirrored?: boolean;
  readonly halo?: "accent" | "soft" | "none";
  readonly entrance?: AppearAnimation;
  /** Retard de l'entrée dans la prise, en secondes. */
  readonly delay?: number;
  /**
   * Carré imposé par les zones du plan (`ZoneStage`) : la mascotte s'y inscrit
   * et ignore `side`, `size`, `lift` et `bleed`.
   */
  readonly rect?: { readonly x: number; readonly y: number; readonly w: number; readonly h: number };
};

const MascotHalo: React.FC<{
  readonly size: number;
  readonly tone: "accent" | "soft";
}> = ({ size, tone }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = 1 + Math.sin((frame / fps) * Math.PI * 1.4) * 0.025;
  const diameter = size * 0.92;
  const fill =
    tone === "accent" ? colors.accent : withAlpha(colors.inkInverse, 0.1);
  const ring =
    tone === "accent"
      ? withAlpha(colors.inkInverse, 0.5)
      : withAlpha(colors.inkInverse, 0.22);

  return (
    <>
      <Appear
        animation="pop"
        style={{
          ...abs((size - diameter) / 2, size * 0.04, diameter, diameter),
          borderRadius: radius.pill,
          backgroundColor: fill,
        }}
      >
        <span />
      </Appear>
      <Appear
        animation="fade"
        delay={0.1}
        style={{
          ...abs(
            (size - diameter * 1.16) / 2,
            size * 0.04 - diameter * 0.08,
            diameter * 1.16,
            diameter * 1.16,
          ),
          borderRadius: radius.pill,
          border: `${strokeWidths.thin}px solid ${ring}`,
          scale: pulse,
        }}
      >
        <span />
      </Appear>
    </>
  );
};

/**
 * Une prise de la mascotte. Chaque prise est une `Sequence` : changer de pose
 * en cours de scène = enchaîner deux prises (la pose est un asset réel, jamais
 * simulée). La mascotte passe toujours par `<GoldenGabMascot />` (règle 37).
 */
export const MascotShot: React.FC<MascotShotProps> = ({
  from = 0,
  to,
  scene,
  pose,
  attitude = "neutral",
  side = "right",
  size: sizeProp = 480,
  lift = 0,
  bleed = 0,
  mirrored = false,
  halo = "soft",
  entrance,
  delay = 0,
  rect,
}) => {
  const { fps } = useVideoConfig();
  const sceneDuration = scene.end - scene.start;
  const startFrame = secondsToFrames(from, fps);
  const endFrame = secondsToFrames(to ?? sceneDuration, fps);
  const size = rect ? Math.min(rect.w, rect.h) : sizeProp;
  const left = rect
    ? rect.x + (rect.w - size) / 2
    : side === "right"
      ? band.right - size + bleed
      : band.left - bleed;
  const top = rect
    ? rect.y + (rect.h - size) / 2
    : band.bottom - size - lift;

  return (
    <Sequence
      from={startFrame}
      durationInFrames={Math.max(1, endFrame - startFrame)}
      premountFor={fps}
      name={`Mascotte · ${pose}`}
    >
      <div style={abs(left, top, size, size)}>
        {halo === "none" ? null : <MascotHalo size={size} tone={halo} />}
        <Appear
          animation="fade"
          style={{
            ...abs(size * 0.28, size * 0.935, size * 0.44, size * 0.05),
            borderRadius: radius.pill,
            backgroundColor: withAlpha(colors.ink, 0.35),
          }}
        >
          <span />
        </Appear>
        <GoldenGabMascot
          name={`Mascotte ${pose}`}
          pose={pose}
          attitude={attitude}
          position="flow"
          size={size}
          facing={mirrored ? "right" : "left"}
          entrance={entrance}
          exit="none"
          delaySeconds={delay}
        />
      </div>
    </Sequence>
  );
};
