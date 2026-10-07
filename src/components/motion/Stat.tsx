/**
 * `<Stat />` — chiffre clé (big number).
 *
 * Le compteur est **optionnel** (`count`) : il n'a de sens que pour un chiffre
 * qui gagne à être vu « monter ». Pour un pourcentage figé ou un label, le
 * laisser à `false`.
 *
 * ```tsx
 * <Stat value={1.3} decimals={1} suffix="M" label="nouveaux emplois liés à l'IA" count />
 * <Stat value={99.9} decimals={1} suffix="%" label="de disponibilité" />
 * ```
 */

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { durations, easings, radius, spacing } from "../../config";
import type { AppearAnimation } from "../../utils/animation";
import { secondsToFrames } from "../../utils/time";
import { AnimatedAppear } from "../common/AnimatedAppear";
import { BrandText } from "../common/BrandText";
import {
  getMotionSurface,
  resolveMotionAccent,
  type MotionAccent,
  type MotionTone,
} from "./shared";

export type StatSize = "compact" | "default" | "hero";

export type StatProps = {
  readonly value: number;
  readonly prefix?: string;
  readonly suffix?: string;
  /** Nombre de décimales (0 par défaut). */
  readonly decimals?: number;
  readonly label?: string;
  /** Anime le chiffre de 0 à `value`. Désactivé par défaut. */
  readonly count?: boolean;
  /** Durée du compteur, en secondes. */
  readonly countDuration?: number;
  readonly size?: StatSize;
  readonly accent?: MotionAccent;
  readonly tone?: MotionTone;
  readonly animation?: AppearAnimation;
  readonly delaySeconds?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

const sizeRoles: Record<StatSize, "h2" | "h1" | "display"> = {
  compact: "h2",
  default: "h1",
  hero: "display",
};

export const Stat: React.FC<StatProps> = ({
  value,
  prefix,
  suffix,
  decimals = 0,
  label,
  count = false,
  countDuration = durations.slow,
  size = "default",
  accent = "accent",
  tone = "light",
  animation = "pop",
  delaySeconds = 0,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const surface = getMotionSurface(tone);
  const color = resolveMotionAccent(accent);

  const progress = count
    ? interpolate(
        frame - secondsToFrames(delaySeconds, fps),
        [0, Math.max(1, secondsToFrames(countDuration, fps))],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easings.entrance,
        },
      )
    : 1;
  const current = value * progress;
  const rendered = current.toFixed(decimals);

  return (
    <AnimatedAppear
      animation={animation}
      delaySeconds={delaySeconds}
      className={className}
      style={style}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: spacing.sm,
          textAlign: "center",
        }}
      >
        <BrandText role={sizeRoles[size]} align="center" color={surface.text}>
          {prefix}
          {rendered}
          {suffix}
        </BrandText>
        <div
          style={{
            width: spacing.xxl,
            height: 8,
            borderRadius: radius.pill,
            backgroundColor: color,
          }}
        />
        {label ? (
          <BrandText role="body" align="center" color={surface.textMuted}>
            {label}
          </BrandText>
        ) : null}
      </div>
    </AnimatedAppear>
  );
};
