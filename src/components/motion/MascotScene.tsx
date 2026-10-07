/**
 * `<MascotScene />` — composer du contenu **et** la mascotte.
 *
 * Ne remplace pas `<GoldenGabMascot />` (le personnage) : il orchestre la
 * disposition. Le contenu et la mascotte sont placés **dans le flux** d'une
 * `SafeArea`, donc jamais superposés, et automatiquement au-dessus de la zone
 * captions (`avoidCaptions`, actif par défaut).
 *
 * ```tsx
 * <MascotScene
 *   mascot={{ pose: "point", attitude: "confident", position: "right" }}
 *   content={<Callout variant="info" text="Une API expose des ressources." />}
 * />
 * ```
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { captionZone, spacing } from "../../config";
import type { AppearAnimation } from "../../utils/animation";
import { SafeArea } from "../common/SafeArea";
import { GoldenGabMascot } from "../mascot/GoldenGabMascot";
import type {
  MascotAttitude,
  MascotFacing,
  MascotOffset,
  MascotPose,
  MascotSize,
} from "../mascot/types";
import type { MascotPosition } from "../mascot/positions";

/** Configuration de la mascotte dans la scène. */
export type MascotSceneMascot = {
  readonly pose?: MascotPose;
  readonly attitude?: MascotAttitude;
  readonly size?: MascotSize | number;
  readonly facing?: MascotFacing;
  readonly entrance?: AppearAnimation;
  readonly delaySeconds?: number;
  /** Ancrage : sert à déduire le côté occupé par la mascotte. */
  readonly position?: MascotPosition;
  readonly offset?: MascotOffset;
};

export type MascotSceneProps = {
  readonly content?: React.ReactNode;
  readonly mascot?: MascotSceneMascot;
  /** Force le côté de la mascotte (sinon déduit de `mascot.position`). */
  readonly side?: "left" | "right";
  /** Réserve la zone captions : le contenu reste plus haut. */
  readonly avoidCaptions?: boolean;
  readonly gap?: number;
  readonly justify?: React.CSSProperties["justifyContent"];
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

export const MascotScene: React.FC<MascotSceneProps> = ({
  content,
  mascot,
  side,
  avoidCaptions = true,
  gap = spacing.lg,
  justify = "center",
  style,
  className,
}) => {
  const config = mascot ?? {};
  const resolvedSide =
    side ??
    (config.position !== undefined && config.position.indexOf("left") !== -1
      ? "left"
      : "right");

  const bottomInset = captionZone.bottom + captionZone.height;

  return (
    <AbsoluteFill className={className} style={style}>
      <SafeArea
        inset={avoidCaptions ? { bottom: bottomInset } : undefined}
        justify={justify}
      >
        <div
          style={{
            display: "flex",
            flexDirection: resolvedSide === "right" ? "row" : "row-reverse",
            alignItems: "center",
            justifyContent: "center",
            gap,
            width: "100%",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>{content}</div>
          <GoldenGabMascot
            position="flow"
            pose={config.pose}
            attitude={config.attitude}
            size={config.size ?? "medium"}
            facing={config.facing}
            entrance={config.entrance}
            delaySeconds={config.delaySeconds}
            offset={config.offset}
            style={{ flexShrink: 0 }}
          />
        </div>
      </SafeArea>
    </AbsoluteFill>
  );
};
