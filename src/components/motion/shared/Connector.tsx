/**
 * `<Connector />` — trait animé entre deux éléments.
 *
 * Le trait « pousse » depuis l'élément précédent vers le suivant, puis la
 * flèche apparaît. Utilisé par `FlowDiagram`, `ProcessSteps` et `BeforeAfter`.
 *
 * Il utilise les courbes du projet (`easings.entrance`) et `defaultStagger`
 * via les délais passés par les composants parents : une seule signature
 * motion pour toutes les connexions de la bibliothèque.
 */

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { easings, durations, radius, spacing, strokeWidths } from "../../../config";
import { secondsToFrames } from "../../../utils/time";
import {
  resolveMotionAccent,
  type MotionAccent,
} from "./tokens";

export type ConnectorDirection = "right" | "down" | "left" | "up";

export type ConnectorProps = {
  readonly direction?: ConnectorDirection;
  readonly accent?: MotionAccent;
  /** Retard avant le tracé, en secondes. */
  readonly delaySeconds?: number;
  /** Durée du tracé, en secondes. */
  readonly durationSeconds?: number;
  /** Longueur du trait (px). Par défaut : 64 (horizontal) ou 40 (vertical). */
  readonly length?: number;
  readonly thickness?: number;
  /** Affiche la flèche. `false` = simple trait (séquences sans direction). */
  readonly head?: boolean;
  readonly opacity?: number;
  readonly style?: React.CSSProperties;
};

export const Connector: React.FC<ConnectorProps> = ({
  direction = "right",
  accent = "accent",
  delaySeconds = 0,
  durationSeconds = durations.base,
  length,
  thickness = strokeWidths.medium,
  head = true,
  opacity = 1,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const horizontal = direction === "right" || direction === "left";
  const color = resolveMotionAccent(accent);
  const headSize = head ? thickness * 1.8 : thickness;
  const resolvedLength =
    length ?? (horizontal ? spacing.xl : spacing.lg);

  const progress = interpolate(
    frame - secondsToFrames(delaySeconds, fps),
    [0, Math.max(1, secondsToFrames(durationSeconds, fps))],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easings.entrance,
    },
  );

  const lineStyle: React.CSSProperties = horizontal
    ? {
        flex: 1,
        height: thickness,
        backgroundColor: color,
        borderRadius: radius.pill,
        transform: `scaleX(${progress})`,
        transformOrigin: direction === "right" ? "left center" : "right center",
      }
    : {
        flex: 1,
        width: thickness,
        backgroundColor: color,
        borderRadius: radius.pill,
        transform: `scaleY(${progress})`,
        transformOrigin: direction === "down" ? "center top" : "center bottom",
      };

  const headStyle: React.CSSProperties = horizontal
    ? {
        width: 0,
        height: 0,
        borderTop: `${headSize / 2}px solid transparent`,
        borderBottom: `${headSize / 2}px solid transparent`,
        [direction === "right" ? "borderLeft" : "borderRight"]: `${headSize}px solid ${color}`,
        marginLeft: direction === "right" ? -thickness / 2 : undefined,
        marginRight: direction === "left" ? -thickness / 2 : undefined,
        opacity: progress,
      }
    : {
        width: 0,
        height: 0,
        borderLeft: `${headSize / 2}px solid transparent`,
        borderRight: `${headSize / 2}px solid transparent`,
        [direction === "down" ? "borderTop" : "borderBottom"]: `${headSize}px solid ${color}`,
        marginTop: direction === "down" ? -thickness / 2 : undefined,
        marginBottom: direction === "up" ? -thickness / 2 : undefined,
        opacity: progress,
      };

  const line = <div style={lineStyle} />;
  const arrowHead = <div style={headStyle} />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        width: horizontal ? resolvedLength : headSize,
        height: horizontal ? headSize : resolvedLength,
        opacity,
        ...style,
      }}
    >
      {/* Le trait pousse toujours dans le sens de la flèche. */}
      {!head
        ? line
        : horizontal
          ? direction === "right"
            ? [line, arrowHead]
            : [arrowHead, line]
          : direction === "down"
            ? [line, arrowHead]
            : [arrowHead, line]}
    </div>
  );
};
