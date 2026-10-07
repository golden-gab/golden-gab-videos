/**
 * `<GoldenGabMascot />` — mascotte officielle Golden Gab.
 *
 * Personnage visuel **récurrent** : elle accompagne et explique les concepts,
 * comme un narrateur. Elle n'est pas automatique dans chaque scène : à n'utiliser
 * que quand elle sert la narration (introduction, explication, question,
 * surprise, conclusion / CTA…).
 *
 * ```tsx
 * <GoldenGabMascot
 *   pose="point"
 *   attitude="confident"
 *   position="right"
 *   entrance="slide-up"
 * />
 * ```
 *
 * Points clés :
 *  - `pose` n'accepte que des poses **réelles** (registre `poses.ts`) : une
 *    pose sans asset ne compile pas ;
 *  - le placement est calculé depuis `src/config/video.ts` (zone sûre +
 *    zone captions) : la mascotte ne masque jamais les sous-titres ;
 *  - l'entrée/sortie passent par `<AnimatedAppear />` (courbes du projet) ;
 *  - `attitude` module échelle, inclinaison, respirement et entrée — jamais
 *    la posture (l'asset est un PNG non articulé) ;
 *  - à poser dans un conteneur positionné (`<AbsoluteFill>`, `<Sequence>`),
 *    au même niveau que les captions, les titres et les éléments de marque.
 */

import React from "react";
import { CanvasImage, useCurrentFrame, useVideoConfig } from "remotion";

import { AnimatedAppear } from "../common/AnimatedAppear";
import { type AppearAnimation } from "../../utils/animation";
import {
  getMascotBob,
  getMascotTransform,
  mascotAttitudes,
} from "./animations";
import {
  defaultMascotPosition,
  getMascotPlacement,
  mascotSizes,
  type MascotPosition,
} from "./positions";
import { mascotPoses } from "./poses";
import {
  defaultMascotAttitude,
  defaultMascotFacing,
  defaultMascotPose,
  type MascotAttitude,
  type MascotFacing,
  type MascotOffset,
  type MascotPose,
  type MascotSize,
} from "./types";

export type GoldenGabMascotProps = {
  /** Posture du corps — uniquement une pose disposant d'un asset réel. */
  readonly pose?: MascotPose;
  /** Rôle narratif joué dans la scène (mouvement, échelle, entrée). */
  readonly attitude?: MascotAttitude;
  /** Ancrage dans la composition (zone sûre respectée). */
  readonly position?: MascotPosition;
  /** Taille : preset ou hauteur explicite en pixels. */
  readonly size?: MascotSize | number;
  /** Orientation : `left` = asset source, `right` = miroir horizontal. */
  readonly facing?: MascotFacing;
  /** Animation d'entrée (par défaut, celle de l'attitude). */
  readonly entrance?: AppearAnimation;
  /** Animation de sortie (par défaut, identique à l'entrée). */
  readonly exit?: AppearAnimation;
  /** Retard avant l'entrée, en secondes (effet d'escalier). */
  readonly delaySeconds?: number;
  /** Durée de l'entrée, en secondes. */
  readonly appearDuration?: number;
  /** Durée de la sortie, en secondes. */
  readonly exitDuration?: number;
  /** Active le respirement continu (micro-mouvement). */
  readonly idle?: boolean;
  /** Décalage manuel depuis l'ancrage, en pixels. */
  readonly offset?: MascotOffset;
  /** Opacité globale. */
  readonly opacity?: number;
  /** Nom affiché dans la timeline Remotion. */
  readonly name?: string;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

export const GoldenGabMascot: React.FC<GoldenGabMascotProps> = ({
  pose = defaultMascotPose,
  attitude = defaultMascotAttitude,
  position = defaultMascotPosition,
  size = "medium",
  facing = defaultMascotFacing,
  entrance,
  exit,
  delaySeconds = 0,
  appearDuration,
  exitDuration,
  idle = true,
  offset,
  opacity,
  name = "Mascotte Golden Gab",
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps, width: compositionWidth, height: compositionHeight } =
    useVideoConfig();

  const definition = mascotPoses[pose];
  const motion = mascotAttitudes[attitude];
  const height = typeof size === "number" ? size : mascotSizes[size];
  const width = height * definition.aspectRatio;
  const mirrored = facing === "right";

  const placement = getMascotPlacement({
    position,
    width,
    height,
    compositionWidth,
    compositionHeight,
  });

  // En miroir, l'inclinaison est retournée pour rester cohérente avec le
  // corps de la mascotte (qui, lui, est inversé).
  const bob = idle ? getMascotBob(frame, fps, motion) : 0;
  const tilt = mirrored ? -motion.tilt : motion.tilt;
  const enterAnimation = entrance ?? motion.entrance;

  return (
    <div
      className={className}
      style={{
        ...placement,
        transform: getMascotTransform({
          offsetX: offset?.x ?? 0,
          offsetY: offset?.y ?? 0,
          bob,
          tilt,
        }),
        transformOrigin: "bottom center",
        // Échelle d'attitude : ancrée aux pieds, elle suit le respirement.
        scale: motion.scale,
        opacity,
        pointerEvents: "none",
        ...style,
      }}
    >
      <AnimatedAppear
        animation={enterAnimation}
        exitAnimation={exit}
        delaySeconds={delaySeconds}
        appearDuration={appearDuration}
        exitDuration={exitDuration}
        style={{ width, height }}
      >
        <CanvasImage
          name={name}
          src={definition.src}
          fit="contain"
          premountFor={fps}
          style={{
            width: "100%",
            height: "100%",
            transform: mirrored ? "scaleX(-1)" : undefined,
          }}
        />
      </AnimatedAppear>
    </div>
  );
};
