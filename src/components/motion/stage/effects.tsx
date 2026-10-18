/**
 * Effets ponctuels : étincelles, rayons, loupe, onde de choc, confettis.
 * Promus depuis le montage mascotte Data Analyst (règle 46).
 */

import React from "react";
import { interpolate } from "remotion";

import { colors, easings, radius, strokeWidths } from "../../../config";
import { withAlpha } from "../../../utils/color";
import { abs, lerp, rand } from "./geometry";

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
