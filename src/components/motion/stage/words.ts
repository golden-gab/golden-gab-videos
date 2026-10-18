/**
 * Recherche pure d'un mot dans le transcript (aucun React/Remotion : testable).
 * L'audio est la source de vérité : un mot absent de la scène lève une erreur.
 */

import type { Transcript } from "../../../audio/types";
import type { Scene } from "../../../scenes/types";

/** Compare sans casse, ponctuation ni élision (« web? » = « web », « l'application » = « application »). */
export const normalizeWord = (word: string): string =>
  word
    .toLowerCase()
    .replace(/^(?:qu|[ldscjmtnq])['’]/i, "")
    .replace(/[.,?!;:"'’]/g, "")
    .trim();

/**
 * Instant (secondes depuis le début de la scène) où `word` est prononcé.
 * `nth` choisit la n-ième occurrence quand le mot revient dans la scène.
 */
export const getWordOffset = (
  transcript: Transcript,
  scene: Pick<Scene, "id" | "start" | "end">,
  word: string,
  nth = 0,
): number => {
  const target = normalizeWord(word);
  const match = transcript.segments.filter(
    (segment) =>
      segment.start >= scene.start - 0.0001 &&
      segment.start < scene.end - 0.0001 &&
      normalizeWord(segment.text) === target,
  )[nth];

  if (!match) {
    throw new Error(
      `Transcript word "${word}" (#${nth}) is missing from scene "${scene.id}".`,
    );
  }

  return match.start - scene.start;
};
