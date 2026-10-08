import React from "react";

import {
  Callout,
  CodeShowcase,
  Comparison,
  AnimatedList,
  FlowDiagram,
  HeroTitle,
  InfoCard,
  type AnimatedListProps,
  type CalloutProps,
  type CodeShowcaseProps,
  type ComparisonProps,
  type FlowDiagramProps,
  type HeroTitleProps,
  type InfoCardProps,
} from "../components/motion";
import type { MotionTone } from "../components/motion/shared";
import type { Scene, SceneType } from "./types";

export type SceneRendererProps = {
  readonly scene: Scene;
  readonly tone?: MotionTone;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

export type SceneComponent = React.FC<SceneRendererProps>;

const getVisualProps = <T extends Record<string, unknown>>(scene: Scene): T =>
  (scene.visual.props ?? {}) as T;

const renderAnimatedList: SceneComponent = ({
  scene,
  tone,
  style,
  className,
}) => {
  const visualProps = getVisualProps<Partial<AnimatedListProps>>(scene);
  const props: AnimatedListProps = {
    items: visualProps.items ?? [],
    title: visualProps.title,
    marker: visualProps.marker,
    startNumber: visualProps.startNumber,
    tone: tone ?? visualProps.tone ?? "light",
    animation: visualProps.animation ?? "slide-up",
    delaySeconds: visualProps.delaySeconds ?? 0,
    staggerSeconds: visualProps.staggerSeconds,
    itemRevealOffsets: scene.visual.revealOffsets,
    style,
    className,
  };

  return <AnimatedList {...props} />;
};

export const sceneRegistry: Record<SceneType, SceneComponent> = {
  hero: ({ scene, tone, style, className }) => {
    const visualProps = getVisualProps<Partial<HeroTitleProps>>(scene);
    const props: HeroTitleProps = {
      title: visualProps.title ?? scene.transcript ?? "Nouveau chapitre",
      eyebrow: visualProps.eyebrow,
      emphasis: visualProps.emphasis,
      subtitle: visualProps.subtitle ?? "",
      align: visualProps.align,
      variant: visualProps.variant ?? "centered",
      tone: tone ?? visualProps.tone ?? "light",
      animation: visualProps.animation ?? "pop",
      delaySeconds: visualProps.delaySeconds ?? 0,
      staggerSeconds: visualProps.staggerSeconds,
      maxWidth: visualProps.maxWidth,
      style,
      className,
    };

    return <HeroTitle {...props} />;
  },
  explanation: ({ scene, tone, style, className }) => {
    const visualProps = getVisualProps<Partial<InfoCardProps>>(scene);
    const props: InfoCardProps = {
      title: visualProps.title ?? scene.transcript ?? "Concept clé",
      description: visualProps.description ?? "",
      icon: visualProps.icon,
      badge: visualProps.badge,
      accent: visualProps.accent ?? "accent",
      tone: tone ?? visualProps.tone ?? "light",
      animation: visualProps.animation ?? "slide-up",
      delaySeconds: visualProps.delaySeconds ?? 0,
      style,
      className,
    };

    return <InfoCard {...props} />;
  },
  diagram: ({ scene, tone, style, className }) => {
    const visualProps = getVisualProps<Partial<FlowDiagramProps>>(scene);
    const nodes = visualProps.nodes && visualProps.nodes.length > 0
      ? visualProps.nodes
      : [{ title: scene.transcript ?? "Étape" }];
    const props: FlowDiagramProps = {
      nodes,
      direction: visualProps.direction ?? "vertical",
      tone: tone ?? visualProps.tone ?? "light",
      animation: visualProps.animation ?? "slide-up",
      delaySeconds: visualProps.delaySeconds ?? 0,
      staggerSeconds: visualProps.staggerSeconds,
      itemRevealOffsets: scene.visual.revealOffsets,
      showNumbers: visualProps.showNumbers ?? false,
      nodeVariant: visualProps.nodeVariant ?? "card",
      style,
      className,
    };

    return <FlowDiagram {...props} />;
  },
  code: ({ scene, style, className }) => {
    const visualProps = getVisualProps<Partial<CodeShowcaseProps>>(scene);
    const props: CodeShowcaseProps = {
      code: visualProps.code ?? scene.transcript ?? "// code à afficher",
      language: visualProps.language ?? "typescript",
      variant: visualProps.variant ?? "default",
      title: visualProps.title ?? "snippet.ts",
      showLineNumbers: visualProps.showLineNumbers ?? false,
      highlightLines: visualProps.highlightLines,
      reveal: visualProps.reveal ?? "line",
      typeSpeed: visualProps.typeSpeed,
      maxLines: visualProps.maxLines,
      fontSize: visualProps.fontSize,
      animation: visualProps.animation ?? "pop",
      delaySeconds: visualProps.delaySeconds ?? 0,
      staggerSeconds: visualProps.staggerSeconds,
      style,
      className,
    };

    return <CodeShowcase {...props} />;
  },
  comparison: ({ scene, tone, style, className }) => {
    const visualProps = getVisualProps<Partial<ComparisonProps>>(scene);
    const props: ComparisonProps = {
      left: visualProps.left ?? { title: "Avant" },
      right: visualProps.right ?? { title: "Après" },
      leftBadge: visualProps.leftBadge,
      rightBadge: visualProps.rightBadge,
      orientation: visualProps.orientation ?? "columns",
      tone: tone ?? visualProps.tone ?? "light",
      animation: visualProps.animation ?? "slide-up",
      delaySeconds: visualProps.delaySeconds ?? 0,
      staggerSeconds: visualProps.staggerSeconds,
      style,
      className,
    };

    return <Comparison {...props} />;
  },
  callout: ({ scene, tone, style, className }) => {
    const visualProps = getVisualProps<Partial<CalloutProps>>(scene);
    const props: CalloutProps = {
      text: visualProps.text ?? scene.transcript ?? "À retenir",
      variant: visualProps.variant ?? "info",
      title: visualProps.title ?? "Point clé",
      icon: visualProps.icon,
      tone: tone ?? visualProps.tone ?? "light",
      animation: visualProps.animation ?? "pop",
      delaySeconds: visualProps.delaySeconds ?? 0,
      style,
      className,
    };

    return <Callout {...props} />;
  },
  conclusion: ({ scene, tone, style, className }) => {
    const visualProps = getVisualProps<Partial<CalloutProps>>(scene);
    const props: CalloutProps = {
      text: visualProps.text ?? scene.transcript ?? "Conclusion",
      variant: visualProps.variant ?? "important",
      title: visualProps.title ?? "Conclusion",
      icon: visualProps.icon,
      tone: tone ?? visualProps.tone ?? "light",
      animation: visualProps.animation ?? "pop",
      delaySeconds: visualProps.delaySeconds ?? 0,
      style,
      className,
    };

    return <Callout {...props} />;
  },
};

export const visualComponentRegistry: Record<string, SceneComponent> = {
  ...sceneRegistry,
  HeroTitle: sceneRegistry.hero,
  InfoCard: sceneRegistry.explanation,
  FlowDiagram: sceneRegistry.diagram,
  AnimatedList: renderAnimatedList,
  CodeShowcase: sceneRegistry.code,
  Comparison: sceneRegistry.comparison,
  Callout: ({ scene, ...props }) => {
    const SceneComponent =
      scene.type === "conclusion"
        ? sceneRegistry.conclusion
        : sceneRegistry.callout;

    return <SceneComponent scene={scene} {...props} />;
  },
};

export const resolveSceneComponent = (
  scene: Pick<Scene, "type" | "visual">,
): SceneComponent => {
  const componentName = scene.visual.component;
  const registeredNames = Object.keys(visualComponentRegistry);
  const componentIndex = registeredNames.indexOf(componentName);
  if (componentIndex === -1) {
    throw new Error(
      `Scene "${scene.type}" references unknown visual component "${componentName}".`,
    );
  }

  return visualComponentRegistry[componentName];
};

export const getSceneVisualComponent = (scene: Pick<Scene, "visual">): string =>
  scene.visual.component;
