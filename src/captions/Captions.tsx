/**
 * `<Captions />` — composant réutilisable de sous-titres animés Golden Gab.
 *
 * Il ne connaît ni la vidéo ni la série : on lui passe des segments et un nom
 * de style, il gère le découpage en pages, le timing, le dimensionnement,
 * les animations d'apparition/disparition et la mise en évidence du mot actif.
 *
 * ```tsx
 * <Captions segments={segments} style="default" />
 * <Captions segments={segments} style="card" position="center" />
 * ```
 */

import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";

import { durationInFrames, msToFrames } from "../utils/time";
import { buildCaptionPages, type CaptionPagingOptions } from "./pages";
import {
  resolveCaptionStyle,
  type CaptionStyleName,
  type CaptionStyleOverrides,
} from "./styles";
import { CaptionPage } from "./CaptionPage";
import type { CaptionPosition, CaptionSegment } from "./types";

export type CaptionsProps = {
  /** Contenu et timings (millisecondes, relatives à la composition parente). */
  readonly segments: readonly CaptionSegment[];
  /** Nom du style à appliquer (voir `captionStyles`). */
  readonly style?: CaptionStyleName;
  /** Position verticale du bloc. */
  readonly position?: CaptionPosition;
  /** Décalage vertical, en pixels (positif = vers le haut). */
  readonly offsetY?: number;
  /** Réglages du découpage en pages. */
  readonly paging?: CaptionPagingOptions;
  /** Surcharges ponctuelles du style, sans créer une nouvelle variante. */
  readonly overrides?: CaptionStyleOverrides;
};

export const Captions: React.FC<CaptionsProps> = ({
  segments,
  style = "default",
  position = "bottom",
  offsetY = 0,
  paging,
  overrides,
}) => {
  const { fps } = useVideoConfig();

  const maxGapMs = paging?.maxGapMs;
  const maxCharactersPerPage = paging?.maxCharactersPerPage;
  const maxDurationMs = paging?.maxDurationMs;

  const pages = useMemo(
    () =>
      buildCaptionPages(segments, {
        maxGapMs,
        maxCharactersPerPage,
        maxDurationMs,
      }),
    [segments, maxGapMs, maxCharactersPerPage, maxDurationMs],
  );

  const preset = resolveCaptionStyle(style, overrides);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {pages.map((page, index) => (
        <Sequence
          key={`${page.startMs}-${index}`}
          name={`Caption ${index + 1}`}
          from={msToFrames(page.startMs, fps)}
          durationInFrames={durationInFrames(page.startMs, page.endMs, fps)}
          premountFor={fps}
        >
          <CaptionPage
            page={page}
            preset={preset}
            position={position}
            offsetY={offsetY}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
