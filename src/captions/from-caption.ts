/**
 * Adaptateur `@remotion/captions` -> `CaptionSegment`.
 *
 * Le pipeline de transcription du repo (`node sub.mjs`, Whisper.cpp) produit
 * des fichiers JSON au format `Caption[]` (un objet par mot). Cet adaptateur
 * les convertit en segments Golden Gab prêts pour `<Captions />`, en
 * conservant le timing mot-à-mot pour la mise en évidence.
 */

import { createTikTokStyleCaptions, type Caption } from "@remotion/captions";

import type { CaptionSegment } from "./types";

export type FromRemotionCaptionsOptions = {
  /** Regroupe les mots prononcés à moins de X ms d'écart sur une même page. */
  readonly combineTokensWithinMilliseconds?: number;
  /** Coupe la page après un silence de X ms. */
  readonly breakOnSilenceAfterMilliseconds?: number;
};

export const defaultFromRemotionCaptionsOptions = {
  combineTokensWithinMilliseconds: 1200,
} as const;

/**
 * Convertit des captions Remotion (mot-à-mot) en segments Golden Gab.
 * Une page TikTok devient un segment portant ses propres timings de mots,
 * déjà découpé (`pageBreakBefore: true`).
 */
export const fromRemotionCaptions = (
  captions: readonly Caption[],
  options: FromRemotionCaptionsOptions = {},
): CaptionSegment[] => {
  const { pages } = createTikTokStyleCaptions({
    captions: [...captions],
    combineTokensWithinMilliseconds:
      options.combineTokensWithinMilliseconds ??
      defaultFromRemotionCaptionsOptions.combineTokensWithinMilliseconds,
    breakOnSilenceAfterMilliseconds: options.breakOnSilenceAfterMilliseconds,
  });

  return pages.map((page) => ({
    text: page.text,
    startMs: page.startMs,
    endMs: page.startMs + Math.max(1, page.durationMs),
    words: page.tokens.map((token) => ({
      text: token.text.trim(),
      startMs: token.fromMs,
      endMs: token.toMs,
    })),
    pageBreakBefore: true,
  }));
};
