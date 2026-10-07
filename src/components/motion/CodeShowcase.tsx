/**
 * `<CodeShowcase />` — affichage de code pensé pour le motion design.
 *
 * Ce n'est **pas** un éditeur : pas de curseur interactif, pas de moteur de
 * coloration complet. Il gère ce dont une vidéo a besoin :
 *
 *  - un panneau sombre lisible sur n'importe quel fond ;
 *  - une révélation animée (`block`, `line`, `typewriter`) ;
 *  - la mise en évidence de lignes (`highlight`) et un rendu de diff (`diff`) ;
 *  - des numéros de ligne optionnels et un titre (nom de fichier, concept).
 *
 * ```tsx
 * <CodeShowcase
 *   language="typescript"
 *   title="client.ts"
 *   variant="highlight"
 *   highlightLines={[2]}
 *   code={`const user = await getUser();\n// ...`}
 * />
 * ```
 */

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import {
  colors,
  defaultStagger,
  durations,
  easings,
  radius,
  spacing,
  typeScale,
} from "../../config";
import type { AppearAnimation } from "../../utils/animation";
import { withAlpha } from "../../utils/color";
import { secondsToFrames } from "../../utils/time";
import { AnimatedAppear } from "../common/AnimatedAppear";
import { BrandText } from "../common/BrandText";
import { CodeBlock, type CodeBlockVariant } from "./shared/CodeBlock";
import type { CodeLanguage } from "./shared/highlight";
import { getStaggerDelay } from "./shared/stagger";

/** Mode de révélation du contenu. */
export type CodeShowcaseReveal = "block" | "line" | "typewriter";

export type CodeShowcaseProps = {
  readonly code: string;
  readonly language?: CodeLanguage;
  readonly variant?: CodeBlockVariant;
  /** Titre affiché dans la barre (nom de fichier, sujet). */
  readonly title?: string;
  readonly showLineNumbers?: boolean;
  /** Lignes (1-based) mises en évidence. */
  readonly highlightLines?: readonly number[];
  /** Par défaut `line` : apparition ligne par ligne. */
  readonly reveal?: CodeShowcaseReveal;
  /** Vitesse de la machine à écrire, en caractères par seconde. */
  readonly typeSpeed?: number;
  /** Coupe au-delà de N lignes (anti-débordement). */
  readonly maxLines?: number;
  readonly fontSize?: number;
  readonly animation?: AppearAnimation;
  readonly delaySeconds?: number;
  /** Décalage entre deux lignes en mode `line`, en secondes. */
  readonly staggerSeconds?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

const DEFAULT_TYPE_SPEED = 22;

export const CodeShowcase: React.FC<CodeShowcaseProps> = ({
  code,
  language = "typescript",
  variant = "default",
  title,
  showLineNumbers = false,
  highlightLines,
  reveal = "line",
  typeSpeed = DEFAULT_TYPE_SPEED,
  maxLines,
  fontSize = typeScale.code,
  animation = "pop",
  delaySeconds = 0,
  staggerSeconds = defaultStagger,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const allLines = code.split("\n");
  const lines =
    maxLines !== undefined && allLines.length > maxLines
      ? allLines.slice(0, maxLines)
      : allLines;
  const delayFrames = secondsToFrames(delaySeconds, fps);

  const lineReveal =
    reveal === "line"
      ? (index: number) =>
          interpolate(
            frame -
              delayFrames -
              secondsToFrames(getStaggerDelay(index, staggerSeconds), fps),
            [0, Math.max(1, secondsToFrames(durations.fast, fps))],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: easings.entrance,
            },
          )
      : undefined;

  let totalChars = 0;
  lines.forEach((line) => {
    totalChars += line.length + 1;
  });

  const visibleChars =
    reveal === "typewriter"
      ? Math.max(
          0,
          Math.min(totalChars, Math.floor(((frame - delayFrames) / fps) * typeSpeed)),
        )
      : undefined;

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
          backgroundColor: colors.surfaceDark,
          border: `2px solid ${withAlpha(colors.inkInverse, 0.2)}`,
          borderRadius: radius.lg,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: spacing.md,
            paddingLeft: spacing.lg,
            paddingRight: spacing.lg,
            paddingTop: spacing.sm,
            paddingBottom: spacing.sm,
            backgroundColor: withAlpha(colors.inkInverse, 0.08),
          }}
        >
          <BrandText role="label" color={withAlpha(colors.inkInverse, 0.85)}>
            {title ?? language}
          </BrandText>
          {title ? (
            <BrandText role="label" color={withAlpha(colors.inkInverse, 0.5)}>
              {language}
            </BrandText>
          ) : null}
        </div>

        <CodeBlock
          code={code}
          language={language}
          variant={variant}
          showLineNumbers={showLineNumbers}
          highlightLines={highlightLines}
          visibleChars={visibleChars}
          lineReveal={lineReveal}
          fontSize={fontSize}
          maxLines={maxLines}
          style={{
            paddingLeft: spacing.md,
            paddingRight: spacing.md,
            paddingTop: spacing.md,
            paddingBottom: spacing.md,
          }}
        />
      </div>
    </AnimatedAppear>
  );
};
