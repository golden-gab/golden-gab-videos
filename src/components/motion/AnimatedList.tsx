/**
 * `<AnimatedList />` — liste d'éléments qui apparaissent successivement.
 *
 * Générique : check-list, énumération, prérequis, compétences… Le marqueur est
 * paramétrable (`check`, `number`, `bullet`, `icon`) et tout visible uniquement
 * via les données.
 *
 * ```tsx
 * <AnimatedList
 *   title="Un Data Engineer doit connaître"
 *   marker="check"
 *   items={[{ text: "SQL" }, { text: "Python" }, { text: "Data pipelines" }]}
 * />
 * ```
 */

import React from "react";

import { defaultStagger, radius, spacing, typeScale } from "../../config";
import type { AppearAnimation } from "../../utils/animation";
import { withAlpha } from "../../utils/color";
import { AnimatedAppear } from "../common/AnimatedAppear";
import { BrandText } from "../common/BrandText";
import { getStaggerDelay } from "./shared/stagger";
import {
  getMotionSurface,
  resolveMotionAccent,
  type MotionAccent,
  type MotionTone,
} from "./shared/tokens";

/** Un élément de la liste. */
export type AnimatedListItem = {
  readonly text: string;
  readonly description?: string;
  readonly icon?: React.ReactNode;
  readonly accent?: MotionAccent;
};

/** Style du marqueur affiché devant chaque élément. */
export type AnimatedListMarker = "check" | "number" | "bullet" | "icon";

export type AnimatedListProps = {
  readonly items: readonly AnimatedListItem[];
  readonly title?: string;
  readonly marker?: AnimatedListMarker;
  /** Numéro de départ du marqueur `number` (1 par défaut). */
  readonly startNumber?: number;
  readonly tone?: MotionTone;
  readonly animation?: AppearAnimation;
  readonly delaySeconds?: number;
  readonly staggerSeconds?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

export const AnimatedList: React.FC<AnimatedListProps> = ({
  items,
  title,
  marker = "check",
  startNumber = 1,
  tone = "light",
  animation = "slide-up",
  delaySeconds = 0,
  staggerSeconds = defaultStagger,
  style,
  className,
}) => {
  const surface = getMotionSurface(tone);
  const titleDelay = delaySeconds;
  const itemsDelay = delaySeconds + (title ? staggerSeconds : 0);

  const renderMarker = (item: AnimatedListItem, index: number) => {
    const color = resolveMotionAccent(item.accent ?? "accent");

    if (marker === "number") {
      return (
        <div
          style={{
            minWidth: spacing.lg,
            height: spacing.lg,
            flexShrink: 0,
            borderRadius: radius.pill,
            backgroundColor: withAlpha(color, 0.16),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BrandText role="label" color={color}>
            {startNumber + index}
          </BrandText>
        </div>
      );
    }

    if (marker === "icon" && item.icon !== undefined) {
      return (
        <div
          style={{
            width: spacing.lg,
            height: spacing.lg,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: typeScale.h3 * 0.8,
            color,
          }}
        >
          {item.icon}
        </div>
      );
    }

    return (
      <div
        style={{
          width: spacing.lg,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BrandText role="h3" color={color}>
          {marker === "bullet" ? "•" : "✓"}
        </BrandText>
      </div>
    );
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing.md,
        width: "100%",
        ...style,
      }}
    >
      {title ? (
        <AnimatedAppear animation="slide-up" delaySeconds={titleDelay}>
          <BrandText role="h3" as="h3" color={surface.text}>
            {title}
          </BrandText>
        </AnimatedAppear>
      ) : null}

      <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
        {items.map((item, index) => (
          <AnimatedAppear
            key={index}
            animation={animation}
            delaySeconds={getStaggerDelay(index, staggerSeconds) + itemsDelay}
          >
            <div
              style={{
                display: "flex",
                gap: spacing.md,
                alignItems: "center",
                minWidth: 0,
              }}
            >
              {renderMarker(item, index)}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                }}
              >
                <BrandText role="body" color={surface.text}>
                  {item.text}
                </BrandText>
                {item.description ? (
                  <BrandText role="label" color={surface.textMuted}>
                    {item.description}
                  </BrandText>
                ) : null}
              </div>
            </div>
          </AnimatedAppear>
        ))}
      </div>
    </div>
  );
};
