/**
 * Boîte à outils locale du montage « Data Analyst × mascotte ».
 *
 * Tout ce qui est propre à cette vidéo vit ici (règles 12 et 46) : horloge de
 * beats calée sur le transcript, enveloppe d'apparition, pose de la mascotte
 * avec son halo, icônes, étincelles. Les primitives du moteur Golden Gab
 * (`AnimatedAppear`, `GoldenGabMascot`, tokens, courbes) restent celles du
 * projet — aucune couleur, police ni durée n'est écrite en dur.
 */

import React from "react";
import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { AnimatedAppear } from "../../../components/common/AnimatedAppear";
import { BrandText } from "../../../components/common/BrandText";
import { GoldenGabMascot } from "../../../components/mascot/GoldenGabMascot";
import type {
  MascotAttitude,
  MascotPose,
} from "../../../components/mascot/types";
import {
  captionZone,
  colors,
  durations,
  easings,
  radius,
  safeArea,
  strokeWidths,
  videoFormat,
} from "../../../config";
import type { Scene } from "../../../scenes/types";
import type { AppearAnimation } from "../../../utils/animation";
import { withAlpha } from "../../../utils/color";
import { secondsToFrames } from "../../../utils/time";
import { dataAnalystMascotTranscript } from "../data/data-analyst-mascot-episode";

/* -------------------------------------------------------------------------- */
/*  Géométrie : la bande sûre au-dessus des captions                           */
/* -------------------------------------------------------------------------- */

export const W: number = videoFormat.width;
export const H: number = videoFormat.height;

/** Bande utile : sous la zone haute de TikTok, au-dessus des captions. */
export const band = {
  top: safeArea.top,
  bottom: H - (captionZone.bottom + captionZone.height),
  left: safeArea.left,
  right: W - safeArea.right,
} as const;

/** Style d'un élément positionné en absolu dans le repère de la composition. */
export const abs = (
  x: number,
  y: number,
  width?: number,
  height?: number,
): React.CSSProperties => ({
  position: "absolute",
  left: x,
  top: y,
  width,
  height,
});

/** Pseudo-hasard déterministe (jamais `Math.random` : rendu reproductible). */
export const rand = (seed: number): number => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;

  return value - Math.floor(value);
};

export const lerp = (from: number, to: number, t: number): number =>
  from + (to - from) * t;

/* -------------------------------------------------------------------------- */
/*  Horloge de beats                                                           */
/* -------------------------------------------------------------------------- */

const normalizeWord = (word: string): string =>
  word.replace(/[.,]/g, "").toLowerCase();

export type Beat = {
  readonly frame: number;
  readonly fps: number;
  /** Durée de la scène, en secondes. */
  readonly duration: number;
  /**
   * Instant (secondes depuis le début de la scène) où le mot est prononcé.
   * `nth` choisit la n-ième occurrence quand un mot revient dans la scène.
   */
  readonly at: (word: string, nth?: number) => number;
  /** Progression 0 → 1 d'une animation démarrant à `startSeconds`. */
  readonly p: (
    startSeconds: number,
    durationSeconds?: number,
    easing?: (input: number) => number,
  ) => number;
};

/**
 * Horloge d'une scène : retrouve les mots dans le transcript (audio = source
 * de vérité) et convertit les instants en progressions. Un mot absent de la
 * scène lève une erreur — le montage ne peut pas dériver de la voix.
 */
export const useBeat = (scene: Scene): Beat => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const at = (word: string, nth = 0): number => {
    const target = normalizeWord(word);
    const matches = dataAnalystMascotTranscript.segments.filter(
      (segment) =>
        segment.start >= scene.start &&
        segment.start < scene.end &&
        normalizeWord(segment.text) === target,
    );
    const match = matches[nth];

    if (!match) {
      throw new Error(
        `Transcript word "${word}" (#${nth}) is missing from scene "${scene.id}".`,
      );
    }

    return match.start - scene.start;
  };

  const p = (
    startSeconds: number,
    durationSeconds: number = durations.base,
    easing: (input: number) => number = easings.entrance,
  ): number => {
    const start = secondsToFrames(startSeconds, fps);
    const length = Math.max(1, secondsToFrames(durationSeconds, fps));

    return interpolate(frame, [start, start + length], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing,
    });
  };

  return { frame, fps, duration: scene.end - scene.start, at, p };
};

/* -------------------------------------------------------------------------- */
/*  Apparition                                                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Icônes (tracé simple, héritent de la couleur passée)                       */
/* -------------------------------------------------------------------------- */

export type IconKind =
  | "box"
  | "bag"
  | "cup"
  | "shirt"
  | "headphones"
  | "tag"
  | "cart"
  | "shop"
  | "calendar"
  | "check"
  | "bulb"
  | "user";

const iconShapes: Record<IconKind, React.ReactNode> = {
  box: (
    <path d="M24 6 L40 14 V34 L24 42 L8 34 V14 Z M8 14 L24 22 L40 14 M24 22 V42" />
  ),
  bag: (
    <>
      <path d="M10 16 H38 L40 41 H8 Z" />
      <path d="M17 16 V13 a7 7 0 0 1 14 0 V16" />
    </>
  ),
  cup: (
    <>
      <path d="M10 16 H34 V30 a8 8 0 0 1 -8 8 H18 a8 8 0 0 1 -8 -8 Z" />
      <path d="M34 20 h3 a4.5 4.5 0 0 1 0 9 h-3" />
    </>
  ),
  shirt: (
    <path d="M17 8 L7 14 L11 23 L16 21 V40 H32 V21 L37 23 L41 14 L31 8 a7 5 0 0 1 -14 0 Z" />
  ),
  headphones: (
    <>
      <path d="M10 29 V24 a14 14 0 0 1 28 0 V29" />
      <path d="M8 29 h6 v11 h-6 Z M34 29 h6 v11 h-6 Z" />
    </>
  ),
  tag: (
    <>
      <path d="M8 8 H24 L41 25 L25 41 L8 24 Z" />
      <circle cx="16" cy="16" r="2.5" />
    </>
  ),
  cart: (
    <>
      <path d="M5 9 H11 L15 30 H37 L41 15 H12" />
      <circle cx="19" cy="38" r="3" />
      <circle cx="33" cy="38" r="3" />
    </>
  ),
  shop: (
    <>
      <path d="M8 21 L12 8 H36 L40 21 Z" />
      <path d="M10 21 V41 H38 V21 M20 41 V29 H28 V41" />
    </>
  ),
  calendar: (
    <>
      <path d="M8 12 H40 V41 H8 Z M8 21 H40" />
      <path d="M16 7 V15 M32 7 V15" />
    </>
  ),
  check: <path d="M9 25 L20 36 L39 13" />,
  bulb: (
    <>
      <path d="M24 5 a13 13 0 0 1 8 23 v6 H16 v-6 A13 13 0 0 1 24 5 Z" />
      <path d="M18 41 H30" />
    </>
  ),
  user: (
    <>
      <circle cx="24" cy="15" r="8" />
      <path d="M8 41 a16 14 0 0 1 32 0" />
    </>
  ),
};

export const Icon: React.FC<{
  readonly kind: IconKind;
  readonly size: number;
  readonly color: string;
  readonly strokeWidth?: number;
  readonly fill?: string;
  readonly style?: React.CSSProperties;
}> = ({ kind, size, color, strokeWidth = 3, fill = "none", style }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    fill={fill}
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={style}
  >
    {iconShapes[kind]}
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Pastille d'étiquette                                                       */
/* -------------------------------------------------------------------------- */

export const TagPill: React.FC<{
  readonly children: React.ReactNode;
  readonly tone?: "accent" | "light" | "ghost";
  readonly icon?: IconKind;
  readonly style?: React.CSSProperties;
}> = ({ children, tone = "light", icon, style }) => {
  const background =
    tone === "accent"
      ? colors.accent
      : tone === "light"
        ? colors.inkInverse
        : withAlpha(colors.inkInverse, 0.1);
  const foreground =
    tone === "accent"
      ? colors.inkInverse
      : tone === "light"
        ? colors.secondary
        : colors.inkInverse;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 30px",
        borderRadius: radius.pill,
        backgroundColor: background,
        border:
          tone === "ghost"
            ? `${strokeWidths.thin}px solid ${withAlpha(colors.inkInverse, 0.35)}`
            : undefined,
        boxShadow:
          tone === "ghost"
            ? undefined
            : `0 10px 30px ${withAlpha(colors.ink, 0.28)}`,
        ...style,
      }}
    >
      {icon ? <Icon kind={icon} size={40} color={foreground} /> : null}
      <BrandText role="label" color={foreground} style={{ fontSize: 40 }}>
        {children}
      </BrandText>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Étincelles, rayons, loupe                                                  */
/* -------------------------------------------------------------------------- */

/** Étoile à quatre branches, centrée sur (x, y). */
export const Sparkle: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly progress: number;
  readonly color?: string;
}> = ({ x, y, size, progress, color = colors.inkInverse }) => {
  const scale = Math.sin(Math.min(1, Math.max(0, progress)) * Math.PI);

  return (
    <svg
      viewBox="-1 -1 2 2"
      width={size}
      height={size}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        opacity: scale,
        transform: `scale(${scale}) rotate(${progress * 90}deg)`,
      }}
    >
      <path
        d="M0 -1 L0.22 -0.22 L1 0 L0.22 0.22 L0 1 L-0.22 0.22 L-1 0 L-0.22 -0.22 Z"
        fill={color}
      />
    </svg>
  );
};

/** Rayons d'exclamation (surprise) autour d'un point. */
export const Burst: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly radius: number;
  readonly progress: number;
  readonly rays?: number;
  readonly color?: string;
  readonly spread?: [number, number];
}> = ({
  x,
  y,
  radius: burstRadius,
  progress,
  rays = 7,
  color = colors.accent,
  spread = [0, 360],
}) => {
  const grow = interpolate(progress, [0, 1], [0.55, 1.15], {
    easing: easings.entrance,
  });
  const fade = interpolate(progress, [0, 0.15, 0.8, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lines: React.ReactNode[] = [];

  for (let index = 0; index < rays; index += 1) {
    const angle =
      ((spread[0] + ((spread[1] - spread[0]) * index) / Math.max(1, rays - 1)) *
        Math.PI) /
      180;
    const inner = burstRadius * 0.62 * grow;
    const outer = burstRadius * grow;
    lines.push(
      <line
        key={index}
        x1={Math.cos(angle) * inner}
        y1={Math.sin(angle) * inner}
        x2={Math.cos(angle) * outer}
        y2={Math.sin(angle) * outer}
        stroke={color}
        strokeWidth={strokeWidths.medium}
        strokeLinecap="round"
      />,
    );
  }

  return (
    <svg
      viewBox={`${-burstRadius * 1.3} ${-burstRadius * 1.3} ${burstRadius * 2.6} ${burstRadius * 2.6}`}
      width={burstRadius * 2.6}
      height={burstRadius * 2.6}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: x - burstRadius * 1.3,
        top: y - burstRadius * 1.3,
        opacity: fade,
      }}
    >
      {lines}
    </svg>
  );
};

/** Loupe centrée sur (x, y). `size` = diamètre approximatif de la lentille. */
export const Magnifier: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly opacity?: number;
  readonly lens?: string;
}> = ({ x, y, size, opacity = 1, lens }) => {
  const box = size * 1.9;

  return (
    <svg
      viewBox="0 0 100 100"
      width={box}
      height={box}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: x - box * 0.42,
        top: y - box * 0.42,
        opacity,
        filter: `drop-shadow(0 12px 18px ${withAlpha(colors.ink, 0.35)})`,
      }}
    >
      <circle
        cx="42"
        cy="42"
        r="30"
        fill={lens ?? withAlpha(colors.inkInverse, 0.12)}
        stroke={colors.inkInverse}
        strokeWidth="8"
      />
      <path
        d="M64 64 L90 90"
        stroke={colors.accent}
        strokeWidth="13"
        strokeLinecap="round"
      />
    </svg>
  );
};

/** Onde de choc : un anneau qui s'élargit depuis (x, y) — arrivée, impact. */
export const Shockwave: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly progress: number;
  readonly color?: string;
}> = ({ x, y, size, progress, color = colors.accent }) => (
  <div
    style={{
      ...abs(x - size / 2, y - size / 2, size, size),
      borderRadius: radius.pill,
      border: `${strokeWidths.thick}px solid ${color}`,
      opacity: interpolate(progress, [0, 0.15, 1], [0, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      transform: `scale(${lerp(0.25, 2.1, progress)})`,
    }}
  />
);

/**
 * Confettis : de petites pièces qui tombent et ondulent. `seconds` est le
 * temps écoulé depuis le déclenchement ; avant 0, rien n'est affiché.
 */
export const Confetti: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly fall: number;
  readonly seconds: number;
  readonly count?: number;
}> = ({ x, y, width, fall, seconds, count = 18 }) => {
  if (seconds <= 0) {
    return null;
  }

  const pieces: React.ReactNode[] = [];
  for (let index = 0; index < count; index += 1) {
    const seed = index + 1;
    const delay = rand(seed * 1.7) * 0.35;
    const t = Math.max(0, seconds - delay);
    const life = Math.min(1, t / 1.4);
    const px = x + rand(seed * 3.3) * width + Math.sin(t * 5 + seed) * 18;
    const py = y + life * fall * (0.6 + rand(seed * 5.1) * 0.6);
    const warm = index % 3 === 0;
    pieces.push(
      <span
        key={index}
        style={{
          position: "absolute",
          left: px,
          top: py,
          width: 14 + rand(seed * 7.9) * 10,
          height: 22 + rand(seed * 2.9) * 10,
          borderRadius: radius.sm / 3,
          backgroundColor: warm ? colors.accent : colors.inkInverse,
          opacity: interpolate(life, [0, 0.1, 0.8, 1], [0, 1, 1, 0]),
          transform: `rotate(${t * 220 * (rand(seed) - 0.5) + seed * 40}deg)`,
        }}
      />,
    );
  }

  return <>{pieces}</>;
};

/* -------------------------------------------------------------------------- */
/*  Mascotte : une « prise » = une pose, une position, un halo                 */
/* -------------------------------------------------------------------------- */

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
  size = 480,
  lift = 0,
  bleed = 0,
  mirrored = false,
  halo = "soft",
  entrance,
  delay = 0,
}) => {
  const { fps } = useVideoConfig();
  const sceneDuration = scene.end - scene.start;
  const startFrame = secondsToFrames(from, fps);
  const endFrame = secondsToFrames(to ?? sceneDuration, fps);
  const left =
    side === "right" ? band.right - size + bleed : band.left - bleed;
  const top = band.bottom - size - lift;

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
