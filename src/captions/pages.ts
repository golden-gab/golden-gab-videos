/**
 * Regroupement des `CaptionSegment` en `CaptionPage`.
 *
 * Logique pure, sans React : elle peut être testée et réutilisée pour
 * prévisualiser le découpage.
 */

import { distributeDuration, normalizeWord, splitWords } from "../utils/text";
import type {
  CaptionPage,
  CaptionSegment,
  CaptionToken,
  CaptionWord,
} from "./types";

export type CaptionPagingOptions = {
  /** Écart maximum (ms) entre deux segments pour rester sur la même page. */
  readonly maxGapMs?: number;
  /** Nombre maximum de caractères affichés sur une page. */
  readonly maxCharactersPerPage?: number;
  /** Durée maximum (ms) d'une page. */
  readonly maxDurationMs?: number;
};

/** Valeurs par défaut, pensées pour des captions courtes type TikTok. */
export const defaultPagingOptions = {
  maxGapMs: 900,
  maxCharactersPerPage: 26,
  maxDurationMs: 2600,
} as const;

/**
 * Retourne les mots d'un segment avec leur timing.
 * Si le segment n'a pas de `words`, la durée est répartie proportionnellement
 * à la longueur des mots (repli déterministe).
 */
export const resolveSegmentWords = (
  segment: CaptionSegment,
): readonly CaptionWord[] => {
  if (segment.words && segment.words.length > 0) {
    return segment.words;
  }

  return distributeDuration(
    splitWords(segment.text),
    segment.startMs,
    segment.endMs,
  );
};

const isEmphasized = (
  word: string,
  emphasis: readonly string[] | undefined,
): boolean => {
  if (!emphasis || emphasis.length === 0) {
    return false;
  }

  const normalized = normalizeWord(word);

  return emphasis.some((entry) => normalizeWord(entry) === normalized);
};

const toTokens = (
  segments: readonly CaptionSegment[],
): readonly CaptionToken[] => {
  const tokens: CaptionToken[] = [];

  segments.forEach((segment) => {
    resolveSegmentWords(segment).forEach((word) => {
      tokens.push({
        text: word.text,
        startMs: word.startMs,
        endMs: word.endMs,
        leadingSpace: tokens.length > 0,
        alwaysEmphasis: isEmphasized(word.text, segment.emphasis),
      });
    });
  });

  return tokens;
};

/**
 * Regroupe les segments en pages affichables.
 *
 * Une nouvelle page démarre si :
 * - le segment porte `pageBreakBefore` ;
 * - l'écart avec la page en cours dépasse `maxGapMs` ;
 * - la page dépasserait `maxCharactersPerPage` ou `maxDurationMs`.
 */
export const buildCaptionPages = (
  segments: readonly CaptionSegment[],
  options: CaptionPagingOptions = {},
): readonly CaptionPage[] => {
  const maxGapMs = options.maxGapMs ?? defaultPagingOptions.maxGapMs;
  const maxCharactersPerPage =
    options.maxCharactersPerPage ?? defaultPagingOptions.maxCharactersPerPage;
  const maxDurationMs = options.maxDurationMs ?? defaultPagingOptions.maxDurationMs;

  const sorted = [...segments].sort((a, b) => a.startMs - b.startMs);
  const groups: CaptionSegment[][] = [];

  sorted.forEach((segment) => {
    const current = groups[groups.length - 1];
    const lastSegment = current ? current[current.length - 1] : null;

    const startsNewPage =
      !current ||
      !lastSegment ||
      segment.pageBreakBefore === true ||
      segment.startMs - lastSegment.endMs > maxGapMs ||
      current
        .map((item) => item.text.length)
        .reduce((acc, length) => acc + length, 0) +
        1 +
        segment.text.length >
        maxCharactersPerPage ||
      segment.endMs - current[0].startMs > maxDurationMs;

    if (startsNewPage) {
      groups.push([segment]);
    } else {
      current.push(segment);
    }
  });

  return groups.map((group) => {
    const tokens = toTokens(group);

    return {
      startMs: group[0].startMs,
      endMs: group[group.length - 1].endMs,
      text: tokens.map((token) => token.text).join(" "),
      tokens,
    };
  });
};
