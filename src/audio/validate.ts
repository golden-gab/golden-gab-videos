/**
 * Invariants temporels de la couche Audio.
 *
 * Le pipeline doit pouvoir **refuser** des données incohérentes avant qu'elles
 * n'atteignent le Scene System : c'est ici que la source de vérité temporelle
 * est vérifiée. Les fonctions renvoient une liste d'erreurs explicites (vide =
 * valide) — utilisables en test et en prévisualisation — tandis que les
 * variantes `assert…` lèvent une erreur aux points d'entrée (rendu, import).
 */

import type { AudioTrack, Transcript, TranscriptSegment } from "./types";

/**
 * Tolérance flottante pour comparer des timestamps en SECONDES.
 * Évite de rejeter un segment à cause d'un arrondi IEEE 754.
 */
export const TIMESTAMP_EPSILON = 1e-6;

/** Vérifie les invariants d'une piste audio. Renvoie les erreurs (vide = valide). */
export const validateAudioTrack = (
  audio: AudioTrack,
  context = "AudioTrack",
): string[] => {
  if (!audio || typeof audio !== "object") {
    return [`${context} : l'audio doit être un objet.`];
  }

  const errors: string[] = [];

  if (typeof audio.src !== "string" || !audio.src.trim()) {
    errors.push(
      `${context} : "src" est requis (chemin ou URL du fichier audio).`,
    );
  }

  if (!Number.isFinite(audio.duration)) {
    errors.push(
      `${context} : "duration" doit être un nombre fini (reçu ${audio.duration}).`,
    );
  } else if (audio.duration < 0) {
    errors.push(
      `${context} : "duration" doit être >= 0 (reçu ${audio.duration}).`,
    );
  }

  if (
    audio.sampleRate !== undefined &&
    (!Number.isFinite(audio.sampleRate) || audio.sampleRate <= 0)
  ) {
    errors.push(
      `${context} : "sampleRate" doit être un nombre positif lorsqu'il est fourni.`,
    );
  }

  if (
    audio.channels !== undefined &&
    (!Number.isFinite(audio.channels) || audio.channels <= 0)
  ) {
    errors.push(
      `${context} : "channels" doit être un nombre positif lorsqu'il est fourni.`,
    );
  }

  return errors;
};

/**
 * Vérifie les invariants d'un segment. Renvoie les erreurs (vide = valide).
 *
 * `audioDuration` (secondes) est optionnel : quand il est fourni, un segment
 * qui dépasse la durée de l'audio est signalé.
 */
export const validateTranscriptSegment = (
  segment: TranscriptSegment,
  context: string,
  audioDuration?: number,
): string[] => {
  if (!segment || typeof segment !== "object") {
    return [`${context} : le segment doit être un objet.`];
  }

  const errors: string[] = [];

  if (!Number.isFinite(segment.start)) {
    errors.push(
      `${context} : "start" doit être un nombre fini (reçu ${segment.start}).`,
    );
  } else if (segment.start < 0) {
    errors.push(
      `${context} : "start" doit être >= 0 (reçu ${segment.start}).`,
    );
  }

  if (!Number.isFinite(segment.end)) {
    errors.push(
      `${context} : "end" doit être un nombre fini (reçu ${segment.end}).`,
    );
  } else if (
    Number.isFinite(segment.start) &&
    segment.end <= segment.start + TIMESTAMP_EPSILON
  ) {
    errors.push(
      `${context} : "end" doit être strictement supérieur à "start" (reçu start ${segment.start}, end ${segment.end}).`,
    );
  }

  if (typeof segment.text !== "string") {
    errors.push(`${context} : "text" doit être une chaîne.`);
  }

  if (
    audioDuration !== undefined &&
    Number.isFinite(audioDuration) &&
    Number.isFinite(segment.end) &&
    segment.end > audioDuration + TIMESTAMP_EPSILON
  ) {
    errors.push(
      `${context} : le segment dépasse la durée de l'audio (end ${segment.end} > durée ${audioDuration}).`,
    );
  }

  if (
    segment.confidence !== undefined &&
    (!Number.isFinite(segment.confidence) ||
      segment.confidence < 0 ||
      segment.confidence > 1)
  ) {
    errors.push(
      `${context} : "confidence" doit être comprise entre 0 et 1 lorsqu'elle est fournie.`,
    );
  }

  return errors;
};

export type ValidateTranscriptOptions = {
  /** Piste audio de référence : borne supérieure des timestamps. */
  readonly audio?: Pick<AudioTrack, "duration">;
  /** Préfixe des messages d'erreur. */
  readonly context?: string;
};

/**
 * Vérifie un transcript complet : segments valides, ordonnés par `start`
 * croissant et sans chevauchement. Renvoie les erreurs (vide = valide).
 */
export const validateTranscript = (
  transcript: Transcript,
  options: ValidateTranscriptOptions = {},
): string[] => {
  const context = options.context ?? "Transcript";

  if (!transcript || typeof transcript !== "object") {
    return [`${context} : le transcript doit être un objet.`];
  }

  if (!Array.isArray(transcript.segments)) {
    return [`${context} : "segments" doit être un tableau.`];
  }

  const errors: string[] = [];

  if (
    transcript.language !== undefined &&
    (typeof transcript.language !== "string" || !transcript.language.trim())
  ) {
    errors.push(
      `${context} : "language" doit être une chaîne non vide lorsqu'il est fourni.`,
    );
  }

  const audioDuration = options.audio?.duration;
  let previous: TranscriptSegment | null = null;

  transcript.segments.forEach((segment, index) => {
    const segmentContext = `${context}, segment ${index}`;
    errors.push(
      ...validateTranscriptSegment(segment, segmentContext, audioDuration),
    );

    if (!segment || typeof segment !== "object") {
      return;
    }

    if (previous && Number.isFinite(segment.start)) {
      if (segment.start < previous.start - TIMESTAMP_EPSILON) {
        errors.push(
          `${segmentContext} : les segments doivent être ordonnés par "start" croissant (start ${segment.start} placé après ${previous.start}).`,
        );
      }
      if (segment.start < previous.end - TIMESTAMP_EPSILON) {
        errors.push(
          `${segmentContext} : les segments ne doivent pas se chevaucher (start ${segment.start} < fin précédente ${previous.end}).`,
        );
      }
    }

    previous = segment;
  });

  return errors;
};

/** Lève une erreur si la piste audio est invalide. */
export const assertValidAudioTrack = (
  audio: AudioTrack,
  context = "AudioTrack",
): void => {
  const errors = validateAudioTrack(audio, context);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
};

/** Lève une erreur si le transcript est invalide. */
export const assertValidTranscript = (
  transcript: Transcript,
  options: ValidateTranscriptOptions = {},
): void => {
  const errors = validateTranscript(transcript, options);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
};
