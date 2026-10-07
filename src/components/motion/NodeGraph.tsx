/**
 * `<NodeGraph />` — petit système sous forme de blocs connectés.
 *
 * ⚠️ Ce n'est **pas** un moteur de diagramme : pas de routage automatique, pas
 * de détection de collision. C'est une primitive de motion design qui range les
 * nodes par **niveau** (haut → bas) et calcule une position déterministe :
 *
 *  - chaque niveau est une rangée ; les nodes y sont répartis à parts égales ;
 *  - une connexion est un trait à angles droits, animé de la source vers la
 *    cible (`stroke-dashoffset`).
 *
 * Le niveau (`level`) vient des données, ou se déduit des connexions (les
 * nodes sans entrée sont au niveau 0). Utile pour : architecture backend, API,
 * systèmes distribués, flux de données.
 *
 * ```tsx
 * <NodeGraph
 *   nodes={[{ id: "client", title: "Client" }, { id: "api", title: "API" }]}
 *   edges={[{ from: "client", to: "api" }]}
 * />
 * ```
 */

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import {
  defaultStagger,
  durations,
  easings,
  fontFamilies,
  radius,
  safeArea,
  spacing,
  strokeWidths,
  typeScale,
} from "../../config";
import type { AppearAnimation } from "../../utils/animation";
import { withAlpha } from "../../utils/color";
import { secondsToFrames } from "../../utils/time";
import { AnimatedAppear } from "../common/AnimatedAppear";
import { BrandText } from "../common/BrandText";
import { getStaggerDelay } from "./shared/stagger";
import {
  getMotionCardStyle,
  getMotionSurface,
  resolveMotionAccent,
  type MotionAccent,
  type MotionTone,
} from "./shared/tokens";

/** Un bloc du schéma. */
export type GraphNode = {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly icon?: React.ReactNode;
  /** Niveau vertical (0 = haut). Sinon, déduit des connexions. */
  readonly level?: number;
  readonly accent?: MotionAccent;
};

/** Une connexion orientée entre deux nodes (par `id`). */
export type GraphEdge = {
  readonly from: string;
  readonly to: string;
  readonly label?: string;
};

export type NodeGraphProps = {
  readonly nodes: readonly GraphNode[];
  readonly edges?: readonly GraphEdge[];
  readonly tone?: MotionTone;
  readonly animation?: AppearAnimation;
  readonly delaySeconds?: number;
  readonly staggerSeconds?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

type PlacedNode = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
};

/** Trait animé d'une connexion (composant à part : il appelle des hooks). */
const EdgePath: React.FC<{
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly color: string;
  readonly label?: string;
  readonly delaySeconds: number;
}> = ({ x1, y1, x2, y2, color, label, delaySeconds }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const midY = (y1 + y2) / 2;
  const length =
    Math.abs(midY - y1) + Math.abs(x2 - x1) + Math.abs(y2 - midY);

  const progress = interpolate(
    frame - secondsToFrames(delaySeconds, fps),
    [0, Math.max(1, secondsToFrames(durations.slow, fps))],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easings.entrance,
    },
  );

  return (
    <>
      <path
        d={`M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidths.medium}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={length}
        strokeDashoffset={length * (1 - progress)}
      />
      {label ? (
        <text
          x={(x1 + x2) / 2}
          y={midY - spacing.sm}
          textAnchor="middle"
          fontFamily={fontFamilies.body}
          fontSize={typeScale.label * 0.8}
          fill={color}
        >
          {label}
        </text>
      ) : null}
    </>
  );
};

export const NodeGraph: React.FC<NodeGraphProps> = ({
  nodes,
  edges = [],
  tone = "light",
  animation = "pop",
  delaySeconds = 0,
  staggerSeconds = defaultStagger,
  style,
  className,
}) => {
  const { width } = useVideoConfig();
  const surface = getMotionSurface(tone);

  const contentWidth = width - safeArea.left - safeArea.right;
  const colGap = spacing.lg;
  const levelGap = spacing.xxxl;
  const hasDescription = nodes.some(
    (node) => node.description !== undefined,
  );
  const nodeHeight = hasDescription
    ? spacing.xxl + spacing.xl
    : spacing.xxl;

  // Niveaux : explicites si fournis, sinon déduits des connexions.
  const hasExplicitLevels = nodes.some((node) => node.level !== undefined);
  const levels: number[] = [];

  nodes.forEach((node) => {
    levels.push(hasExplicitLevels ? node.level ?? 0 : 0);
  });

  if (!hasExplicitLevels) {
    edges.forEach((edge) => {
      let fromIndex = -1;
      let toIndex = -1;

      nodes.forEach((node, index) => {
        if (node.id === edge.from) {
          fromIndex = index;
        }
        if (node.id === edge.to) {
          toIndex = index;
        }
      });

      if (fromIndex !== -1 && toIndex !== -1) {
        levels[toIndex] = Math.max(levels[toIndex], levels[fromIndex] + 1);
      }
    });
  }

  let maxLevel = 0;
  levels.forEach((level) => {
    maxLevel = Math.max(maxLevel, level);
  });
  const levelCount = maxLevel + 1;

  const counts: number[] = [];
  for (let level = 0; level < levelCount; level += 1) {
    counts.push(0);
  }
  levels.forEach((level) => {
    counts[level] += 1;
  });

  const placed: PlacedNode[] = [];
  nodes.forEach(() => {
    placed.push({ x: 0, y: 0, width: 0 });
  });

  // Largeur maximale d'un bloc : une rangée à un seul node ne doit pas
  // s'étirer sur toute la largeur (sinon le schéma paraît vide).
  const maxNodeWidth = contentWidth / 2;

  for (let level = 0; level < levelCount; level += 1) {
    const count = counts[level];
    const nodeWidth = Math.min(
      (contentWidth - (count - 1) * colGap) / count,
      maxNodeWidth,
    );
    const groupWidth = count * nodeWidth + (count - 1) * colGap;
    const offset = (contentWidth - groupWidth) / 2;
    let indexInLevel = 0;

    nodes.forEach((_node, index) => {
      if (levels[index] === level) {
        placed[index] = {
          x: offset + indexInLevel * (nodeWidth + colGap),
          y: level * (nodeHeight + levelGap),
          width: nodeWidth,
        };
        indexInLevel += 1;
      }
    });
  }

  const containerHeight =
    levelCount * nodeHeight + (levelCount - 1) * levelGap;

  const centerX = (index: number): number =>
    placed[index].x + placed[index].width / 2;

  const nodeIndexById = (id: string): number => {
    let found = -1;

    nodes.forEach((node, index) => {
      if (node.id === id) {
        found = index;
      }
    });

    return found;
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: contentWidth,
        height: containerHeight,
        ...style,
      }}
    >
      <svg
        width={contentWidth}
        height={containerHeight}
        viewBox={`0 0 ${contentWidth} ${containerHeight}`}
        style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
      >
        {edges.map((edge, index) => {
          const fromIndex = nodeIndexById(edge.from);
          const toIndex = nodeIndexById(edge.to);

          if (fromIndex === -1 || toIndex === -1) {
            return null;
          }

          const color = resolveMotionAccent(
            nodes[toIndex].accent ?? "accent",
          );

          return (
            <EdgePath
              key={index}
              x1={centerX(fromIndex)}
              y1={placed[fromIndex].y + nodeHeight}
              x2={centerX(toIndex)}
              y2={placed[toIndex].y}
              color={color}
              label={edge.label}
              delaySeconds={
                getStaggerDelay(toIndex, staggerSeconds) + delaySeconds
              }
            />
          );
        })}
      </svg>

      {nodes.map((node, index) => {
        const accent = node.accent ?? "accent";

        return (
          <AnimatedAppear
            key={node.id}
            animation={animation}
            delaySeconds={getStaggerDelay(index, staggerSeconds) + delaySeconds}
            style={{
              position: "absolute",
              left: placed[index].x,
              top: placed[index].y,
              width: placed[index].width,
              height: nodeHeight,
            }}
          >
            <div
              style={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: spacing.xs,
                textAlign: "center",
                ...getMotionCardStyle({
                  tone,
                  radiusValue: radius.md,
                  padding: spacing.md,
                }),
              }}
            >
              {node.icon !== undefined ? (
                <span style={{ lineHeight: 1 }}>{node.icon}</span>
              ) : null}
              <BrandText role="label" align="center" color={surface.text}>
                {node.title}
              </BrandText>
              {node.description ? (
                <BrandText
                  role="label"
                  align="center"
                  color={surface.textMuted}
                  style={{
                    textTransform: "none",
                    letterSpacing: "0em",
                    fontSize: typeScale.label * 0.85,
                  }}
                >
                  {node.description}
                </BrandText>
              ) : null}

              {/* Liseré d'accent : identifie le node sans surcharger. */}
              <div
                style={{
                  position: "absolute",
                  left: spacing.md,
                  right: spacing.md,
                  bottom: 0,
                  height: strokeWidths.thin,
                  borderRadius: radius.pill,
                  backgroundColor: withAlpha(resolveMotionAccent(accent), 0.6),
                }}
              />
            </div>
          </AnimatedAppear>
        );
      })}
    </div>
  );
};
