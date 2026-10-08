/**
 * Adaptateur `TranscriptSegment` → `CaptionSegment` (système de captions
 * existant, `src/captions`).
 *
 * Deux raisons de garder ce fichier isolé :
 *  1. **Unité** — le transcript est en SECONDES, les captions en MILLISECONDES :
 *     la conversion se fait ici, une seule fois, sans laisser fuiter l'unité
 *     dans le reste du pipeline.
 *  2. **Découplage** — on n'importe que le *modèle* de données des captions
 *     (`src/captions/types`), jamais le composant React. Le transcript ne doit
 *     pas dépendre du rendu.
 *
 * Le composant `<Captions />` n'est pas recréé : l'adaptateur produit juste les
 * données qu'il consomme déjà.
 */

import type { CaptionSegment } from "../captions/types";
import type { Transcript, TranscriptSegment } from "./types";

/** Secondes → millisecondes (arrondi, comme attendu par `@remotion/captions`). */
export const secondsToMilliseconds = (seconds: number): number =>
  Math.round(seconds * 1000);

/** Convertit un segment de transcript en segment de caption, sans perte. */
export const transcriptSegmentToCaption = (
  segment: TranscriptSegment,
): CaptionSegment => ({
  text: segment.text,
  startMs: secondsToMilliseconds(segment.start),
  endMs: secondsToMilliseconds(segment.end),
});

/** Convertit un transcript complet en `CaptionSegment[]` prêts pour `<Captions />`. */
export const transcriptToCaptions = (transcript: Transcript): CaptionSegment[] =>
  transcript.segments.map(transcriptSegmentToCaption);
