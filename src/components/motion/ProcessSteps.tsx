/**
 * `<ProcessSteps />` — déroulé d'une procédure étape par étape.
 *
 * Répond à la question « dans quel ordre ? ». Contrairement à `FlowDiagram`
 * (relation / circulation), c'est une **séquence d'actions** : les étapes sont
 * numérotées et reliées par un rail continu.
 *
 * ```tsx
 * <ProcessSteps
 *   steps={[
 *     { title: "Collecter", description: "Récupérer les données brutes." },
 *     { title: "Transformer", description: "Nettoyer et normaliser." },
 *   ]}
 * />
 * ```
 */

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import {
  defaultStagger,
  durations,
  easings,
  radius,
  spacing,
  strokeWidths,
} from "../../config";
import type { AppearAnimation } from "../../utils/animation";
import { withAlpha } from "../../utils/color";
import { secondsToFrames } from "../../utils/time";
import { AnimatedAppear } from "../common/AnimatedAppear";
import { BrandText } from "../common/BrandText";
import { Connector } from "./shared/Connector";
import { getConnectorDelay, getStaggerDelay } from "./shared/stagger";
import {
  getMotionSurface,
  resolveMotionAccent,
  type MotionAccent,
  type MotionTone,
} from "./shared/tokens";

/** Une étape de la procédure. */
export type ProcessStep = {
  readonly title: string;
  readonly description?: string;
  readonly icon?: React.ReactNode;
  readonly accent?: MotionAccent;
};

export type ProcessStepsProps = {
  readonly steps: readonly ProcessStep[];
  /** Par défaut `vertical` : plus lisible en 9:16. */
  readonly orientation?: "vertical" | "horizontal";
  /** Index (0-based) de l'étape mise en avant. */
  readonly activeStep?: number;
  /** Numéro de la première étape (1 par défaut). */
  readonly startNumber?: number;
  readonly tone?: MotionTone;
  readonly animation?: AppearAnimation;
  readonly delaySeconds?: number;
  readonly staggerSeconds?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

const DISC_SIZE = spacing.xl;

/** Rail vertical qui « pousse » entre deux pastilles. */
const Rail: React.FC<{
  readonly delaySeconds: number;
  readonly accent: MotionAccent;
}> = ({ delaySeconds, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(
    frame - secondsToFrames(delaySeconds, fps),
    [0, Math.max(1, secondsToFrames(durations.base, fps))],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easings.entrance,
    },
  );

  return (
    <div
      style={{
        flex: 1,
        width: strokeWidths.hairline * 2,
        minHeight: spacing.md,
        marginTop: spacing.xs,
        marginBottom: spacing.xs,
        borderRadius: radius.pill,
        backgroundColor: withAlpha(resolveMotionAccent(accent), 0.4),
        transform: `scaleY(${progress})`,
        transformOrigin: "center top",
      }}
    />
  );
};

export const ProcessSteps: React.FC<ProcessStepsProps> = ({
  steps,
  orientation = "vertical",
  activeStep,
  startNumber = 1,
  tone = "light",
  animation = "slide-up",
  delaySeconds = 0,
  staggerSeconds = defaultStagger,
  style,
  className,
}) => {
  const surface = getMotionSurface(tone);
  const horizontal = orientation === "horizontal";

  const renderDisc = (index: number, accent: MotionAccent) => {
    const active = activeStep === index;
    const color = resolveMotionAccent(accent);

    return (
      <div
        style={{
          width: DISC_SIZE,
          height: DISC_SIZE,
          flexShrink: 0,
          borderRadius: radius.pill,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: active ? color : withAlpha(color, 0.12),
          border: `2px solid ${color}`,
          // Anneau discret sur l'étape active.
          boxShadow: active ? `0 0 0 ${strokeWidths.thin}px ${withAlpha(color, 0.28)}` : undefined,
        }}
      >
        <BrandText
          role="label"
          color={active ? getMotionSurface("dark").text : color}
        >
          {startNumber + index}
        </BrandText>
      </div>
    );
  };

  const renderContent = (step: ProcessStep, index: number, accent: MotionAccent) => {
    const active = activeStep === index;

    return (
      <AnimatedAppear
        animation={animation}
        delaySeconds={getStaggerDelay(index, staggerSeconds) + delaySeconds}
        style={{ flex: 1, minWidth: 0 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.xs,
            textAlign: horizontal ? "center" : "left",
          }}
        >
          <BrandText
            role="h3"
            align={horizontal ? "center" : "left"}
            color={active ? resolveMotionAccent(accent) : surface.text}
          >
            {step.title}
          </BrandText>
          {step.description ? (
            <BrandText
              role="body"
              align={horizontal ? "center" : "left"}
              color={surface.textMuted}
            >
              {step.description}
            </BrandText>
          ) : null}
        </div>
      </AnimatedAppear>
    );
  };

  if (horizontal) {
    const arrowOffset = (DISC_SIZE - strokeWidths.medium) / 2;
    const children: React.ReactNode[] = [];

    steps.forEach((step, index) => {
      const accent = step.accent ?? "accent";
      children.push(
        <div
          key={index}
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.sm,
          }}
        >
          {renderDisc(index, accent)}
          {renderContent(step, index, accent)}
        </div>,
      );

      if (index < steps.length - 1) {
        children.push(
          <Connector
            key={`rail-${index}`}
            direction="right"
            head={false}
            accent={step.accent ?? "accent"}
            length={spacing.lg}
            delaySeconds={getConnectorDelay(index, staggerSeconds) + delaySeconds}
            style={{ marginTop: arrowOffset }}
          />,
        );
      }
    });

    return (
      <div
        className={className}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
          gap: spacing.xs,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 0,
        ...style,
      }}
    >
      {steps.map((step, index) => {
        const accent = step.accent ?? "accent";
        const last = index === steps.length - 1;

        return (
          <div
            key={index}
            style={{ display: "flex", gap: spacing.lg, alignItems: "stretch" }}
          >
            <div
              style={{
                width: DISC_SIZE,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {renderDisc(index, accent)}
              {last ? null : (
                <Rail
                  accent={accent}
                  delaySeconds={
                    getConnectorDelay(index, staggerSeconds) + delaySeconds
                  }
                />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0, paddingBottom: last ? 0 : spacing.lg }}>
              {renderContent(step, index, accent)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
