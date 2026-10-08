/**
 * Rendu d'une `CaptionPage` : un bloc de texte affiché pendant une fenêtre
 * de temps, avec dimensionnement automatique et mise en évidence du mot actif.
 *
 * Ce composant est interne au système de captions : les vidéos utilisent
 * `<Captions />` depuis `src/captions`.
 */

import { fitText } from "@remotion/layout-utils";
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

import { captionZone, captionPositions, safeArea } from "../config/video";
import {
  getAnimationStyle,
  getEnterProgress,
  getExitProgress,
  mergeAnimationStyles,
} from "../utils/animation";
import { secondsToFrames } from "../utils/time";
import type { CaptionStylePreset } from "./styles";
import type { CaptionPage as CaptionPageModel, CaptionPosition } from "./types";

/**
 * Marge de sécurité du dimensionnement automatique.
 *
 * `fitText()` renvoie la taille EXACTE qui tient dans la largeur mesurée :
 * le texte est donc collé au bord, et la moindre différence d'arrondi entre
 * la mesure et le rendu suffit à faire passer le dernier mot à la ligne.
 * On vise volontairement ~4% de moins que la place disponible.
 */
const FIT_SAFETY_RATIO = 0.96;

export type CaptionPageProps = {
  readonly page: CaptionPageModel;
  readonly preset: CaptionStylePreset;
  readonly position: CaptionPosition;
  /** Décalage vertical en pixels, positif = vers le haut. */
  readonly offsetY: number;
};

export const CaptionPage: React.FC<CaptionPageProps> = ({
  page,
  preset,
  position,
  offsetY,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, durationInFrames } = useVideoConfig();

  const enterStyle = getAnimationStyle(
    preset.appearAnimation,
    getEnterProgress({
      frame,
      enterFrames: secondsToFrames(preset.appearDuration, fps),
    }),
  );

  const exitStyle = getAnimationStyle(
    preset.exitAnimation,
    getExitProgress({
      frame,
      durationInFrames,
      exitFrames: secondsToFrames(preset.exitDuration, fps),
    }),
  );

  const animationStyle = mergeAnimationStyles(enterStyle, exitStyle);

  // Place réellement disponible : on retire la zone sûre, le padding interne
  // du bloc (styles à fond) et le contour (peint pour moitié à l'extérieur
  // du glyphe). Mesurer plus large ferait déborder puis passer à la ligne.
  const innerPadding =
    preset.backgroundColor === null ? 0 : preset.paddingX * 2;
  const availableWidth =
    width - safeArea.left - safeArea.right - innerPadding - preset.strokeWidth;
  const withinWidth =
    Math.min(availableWidth, width * preset.maxWidthRatio) * FIT_SAFETY_RATIO;

  const fitted = fitText({
    fontFamily: preset.fontFamily,
    text: page.text,
    withinWidth,
    fontWeight: preset.fontWeight,
    letterSpacing: preset.letterSpacing,
    textTransform: preset.uppercase ? "uppercase" : "none",
  });

  const fontSize = Math.min(preset.maxFontSize, fitted.fontSize);

  // Temps absolu, la page étant rendue dans une <Sequence> démarrant à startMs.
  const timeInMs = page.startMs + (frame / fps) * 1000;

  const alignment =
    preset.textAlign === "left"
      ? "flex-start"
      : preset.textAlign === "right"
        ? "flex-end"
        : "center";

  const verticalStyle: React.CSSProperties =
    position === "bottom"
      ? { bottom: captionPositions.bottom + offsetY, top: undefined }
      : {
          top: captionPositions[position] + offsetY,
          bottom: undefined,
        };

  return (
    <AbsoluteFill
      style={{
        ...verticalStyle,
        height: captionZone.height,
        justifyContent: "center",
        alignItems: alignment,
        paddingLeft: safeArea.left,
        paddingRight: safeArea.right,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          ...animationStyle,
          fontFamily: preset.fontFamily,
          fontWeight: preset.fontWeight,
          fontSize,
          lineHeight: preset.lineHeight,
          letterSpacing: preset.letterSpacing,
          color: preset.color,
          WebkitTextStroke:
            preset.strokeWidth > 0
              ? `${preset.strokeWidth}px ${preset.strokeColor}`
              : undefined,
          paintOrder: preset.strokeWidth > 0 ? "stroke" : undefined,
          textTransform: preset.uppercase ? "uppercase" : "none",
          textAlign: preset.textAlign,
          backgroundColor: preset.backgroundColor ?? undefined,
          padding:
            preset.backgroundColor === null
              ? undefined
              : `${preset.paddingY}px ${preset.paddingX}px`,
          borderRadius:
            preset.backgroundColor === null ? undefined : preset.borderRadius,
          whiteSpace: "pre-wrap",
        }}
      >
        {page.tokens.map((token, index) => {
          const isActive =
            token.startMs <= timeInMs && token.endMs > timeInMs;

          const emphasized =
            preset.emphasisMode === "none"
              ? false
              : preset.emphasisMode === "segment"
                ? token.alwaysEmphasis
                : token.alwaysEmphasis || isActive;

          return (
            <span
              key={`${token.startMs}-${index}`}
              style={{
                color: emphasized ? preset.emphasisColor : undefined,
                backgroundColor: emphasized
                  ? (preset.wordHighlightBackground ?? undefined)
                  : undefined,
                padding:
                  preset.wordHighlightBackground === null
                    ? undefined
                    : "0 0.1em",
                borderRadius:
                  preset.wordHighlightBackground === null
                    ? undefined
                    : preset.borderRadius,
              }}
            >
              {token.leadingSpace ? " " : ""}
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
