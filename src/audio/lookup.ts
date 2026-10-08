/**
 * Recherche temporelle dans un transcript — logique pure, sans Remotion.
 *
 * Ces helpers appartiennent à la couche de données : ils ne doivent jamais
 * dépendre d'un composant visuel. Le Scene System (M02/M04) les utilisera pour
 * résoudre, depuis un `start`/`end` en secondes, le texte et le segment de
 * transcript correspondants.
 */

import type { Transcript, TranscriptSegment } from "./types";

/**
 * Segment actif à un instant donné (en secondes), ou `null`.
 *
 * Un segment couvre l'intervalle semi-ouvert `[start, end)` : à la limite
 * exacte entre deux segments, c'est donc le segment suivant qui est actif, ce
 * qui garantit un résultat unique et déterministe. Hors de tout segment
 * (silence, avant le premier mot, après le dernier), la fonction renvoie
 * `null` plutôt que de forcer un segment.
 */
export const getTranscriptSegmentAt = (
  transcript: Transcript,
  time: number,
): TranscriptSegment | null => {
  if (!Number.isFinite(time)) {
    return null;
  }

  const { segments } = transcript;

  for (let index = 0; index < segments.length; index++) {
    const segment = segments[index];
    if (time >= segment.start && time < segment.end) {
      return segment;
    }
  }

  return null;
};

/**
 * Segments qui recouvrent l'intervalle `[start, end)` (secondes).
 *
 * Un segment est conservé s'il intersecte l'intervalle. Sert aux futures
 * scènes : « quelles phrases couvrent 8,2 s → 14,7 s ? ».
 */
export const getTranscriptSegmentsInRange = (
  transcript: Transcript,
  start: number,
  end: number,
): TranscriptSegment[] => {
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    return [];
  }

  return transcript.segments.filter(
    (segment) => segment.end > start && segment.start < end,
  );
};
