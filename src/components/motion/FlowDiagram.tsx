/**
 * `<FlowDiagram />` — circulation / relation entre plusieurs éléments.
 *
 * Répond à la question « par où ça passe ? ». Pour une **suite d'actions**
 * numérotées, utiliser `ProcessSteps`.
 *
 * ```tsx
 * <FlowDiagram
 *   direction="vertical"
 *   nodes={[
 *     { title: "Utilisateur" },
 *     { title: "API" },
 *     { title: "Serveur" },
 *     { title: "Base de données" },
 *   ]}
 * />
 * ```
 *
 * Les nodes et les connexions apparaissent en cascade ; les connexions se
 * dessinent entre deux nodes (`Connector`). Le composant est piloté par les
 * données : aucune structure JSX à écrire dans une vidéo.
 */

import React from "react";

import { defaultStagger, radius, spacing, typeScale } from "../../config";
import type { AppearAnimation } from "../../utils/animation";
import { withAlpha } from "../../utils/color";
import { AnimatedAppear } from "../common/AnimatedAppear";
import { BrandText } from "../common/BrandText";
import { Connector } from "./shared/Connector";
import { getConnectorDelay, getItemRevealDelay } from "./shared/stagger";
import {
  getMotionCardStyle,
  getMotionSurface,
  resolveMotionAccent,
  type MotionAccent,
  type MotionTone,
} from "./shared/tokens";

/** Un élément du flux. */
export type FlowNode = {
  readonly title: string;
  /** Description courte (affichée sous le titre en vertical). */
  readonly description?: string;
  /** Icône optionnelle (emoji, petit SVG…). */
  readonly icon?: React.ReactNode;
  /** Numéro affiché dans une pastille (sinon `index + 1`). */
  readonly number?: string | number;
  /** Accent du node ; par défaut l'accent de la marque. */
  readonly accent?: MotionAccent;
};

export type FlowDiagramDirection = "horizontal" | "vertical";

export type FlowDiagramProps = {
  readonly nodes: readonly FlowNode[];
  /** Par défaut `vertical` : plus lisible en 9:16. */
  readonly direction?: FlowDiagramDirection;
  readonly tone?: MotionTone;
  /** Animation d'entrée des nodes. */
  readonly animation?: AppearAnimation;
  readonly delaySeconds?: number;
  readonly staggerSeconds?: number;
  /** Offset de révélation relatif à la scène pour chaque nœud, en secondes. */
  readonly itemRevealOffsets?: readonly number[];
  /** Affiche un numéro par node (dans une pastille). */
  readonly showNumbers?: boolean;
  /** `card` = surface encadrée ; `plain` = texte seul. */
  readonly nodeVariant?: "card" | "plain";
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  nodes,
  direction = "vertical",
  tone = "light",
  animation = "slide-up",
  delaySeconds = 0,
  staggerSeconds = defaultStagger,
  itemRevealOffsets,
  showNumbers = false,
  nodeVariant = "card",
  style,
  className,
}) => {
  const surface = getMotionSurface(tone);
  const horizontal = direction === "horizontal";
  const sequenceBaseDelay =
    itemRevealOffsets === undefined ? delaySeconds : 0;

  const renderNode = (node: FlowNode, index: number) => {
    const accent = resolveMotionAccent(node.accent);
    const number = node.number ?? index + 1;
    const chip =
      node.icon !== undefined ? (
        <div
          style={{
            width: spacing.xl,
            height: spacing.xl,
            flexShrink: 0,
            borderRadius: radius.md,
            backgroundColor: withAlpha(accent, 0.16),
            color: accent,
            fontSize: typeScale.h3,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {node.icon}
        </div>
      ) : showNumbers ? (
        <div
          style={{
            minWidth: spacing.xl,
            height: spacing.xl,
            flexShrink: 0,
            borderRadius: radius.pill,
            border: `2px solid ${accent}`,
            backgroundColor: withAlpha(accent, 0.12),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BrandText role="label" color={accent}>
            {number}
          </BrandText>
        </div>
      ) : null;

    return (
      <AnimatedAppear
        key={index}
        animation={animation}
        delaySeconds={
          getItemRevealDelay(index, staggerSeconds, itemRevealOffsets) +
          sequenceBaseDelay
        }
        style={{
          flex: horizontal ? 1 : undefined,
          minWidth: 0,
          display: horizontal ? "flex" : "block",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: horizontal ? "column" : "row",
            alignItems: horizontal ? "center" : "center",
            justifyContent: horizontal ? "center" : "flex-start",
            gap: spacing.sm,
            textAlign: horizontal ? "center" : "left",
            ...(nodeVariant === "card"
              ? getMotionCardStyle({
                  tone,
                  radiusValue: radius.md,
                  padding: spacing.md,
                })
              : {}),
          }}
        >
          {chip}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.xs,
              minWidth: 0,
            }}
          >
            <BrandText
              role={horizontal ? "label" : "h3"}
              align={horizontal ? "center" : "left"}
              color={surface.text}
            >
              {node.title}
            </BrandText>
            {node.description ? (
              <BrandText
                role="label"
                align={horizontal ? "center" : "left"}
                color={surface.textMuted}
                style={{
                  textTransform: "none",
                  letterSpacing: "0em",
                  fontSize: typeScale.label * 0.85,
                  lineHeight: 1.25,
                }}
              >
                {node.description}
              </BrandText>
            ) : null}
          </div>
        </div>
      </AnimatedAppear>
    );
  };

  const children: React.ReactNode[] = [];

  nodes.forEach((node, index) => {
    children.push(renderNode(node, index));

    if (index < nodes.length - 1) {
      children.push(
        <Connector
          key={`connector-${index}`}
          direction={horizontal ? "right" : "down"}
          accent={node.accent ?? "accent"}
          length={horizontal ? spacing.lg : spacing.md}
          delaySeconds={
            (itemRevealOffsets
              ? (getItemRevealDelay(index, staggerSeconds, itemRevealOffsets) +
                  getItemRevealDelay(
                    index + 1,
                    staggerSeconds,
                    itemRevealOffsets,
                  )) /
                2
              : getConnectorDelay(index, staggerSeconds)) +
            sequenceBaseDelay
          }
        />,
      );
    }
  });

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        alignItems: horizontal ? "stretch" : "center",
        justifyContent: horizontal ? "center" : "flex-start",
        width: "100%",
        gap: horizontal ? spacing.xs : spacing.xs,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
