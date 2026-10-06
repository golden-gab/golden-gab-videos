/**
 * Helpers texte (purs).
 */

/** Découpe un texte en mots, en supprimant les espaces vides. */
export const splitWords = (text: string): string[] =>
  text.split(/\s+/).filter((word) => word.length > 0);

/** Normalise un mot pour comparaison (casse + ponctuation). */
export const normalizeWord = (word: string): string =>
  word
    .toLowerCase()
    .replace(/[«»"'`.,!?;:()\]…—–-]/g, "")
    .trim();

/**
 * Répartit une durée sur des mots proportionnellement à leur longueur.
 * Utilisé comme repli quand un segment n'a pas de timing mot-à-mot.
 */
export const distributeDuration = (
  words: readonly string[],
  startMs: number,
  endMs: number,
): { text: string; startMs: number; endMs: number }[] => {
  const total = Math.max(1, endMs - startMs);
  const weights = words.map((word) => word.length || 1);
  const sum = weights.reduce((acc, weight) => acc + weight, 0);

  let cursor = startMs;

  return words.map((text, index) => {
    const duration = (weights[index] / sum) * total;
    const wordStartMs = Math.round(cursor);
    const wordEndMs = Math.round(cursor + duration);
    cursor += duration;

    return { text, startMs: wordStartMs, endMs: wordEndMs };
  });
};
