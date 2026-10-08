/**
 * Logique d'épisode **pure** : validation de cohérence audio-driven, durée
 * issue de l'audio réel, branchement des captions et lecture du transcript par
 * scène. Aucun import React/Remotion ici, pour rester testable et consommable
 * hors rendu (le rendu vit dans `renderer.tsx`).
 *
 * Priorité temporelle rappelée : audio > timestamps > décisions éditoriales >
 * durées de template. C'est pourquoi la durée d'un épisode est celle de son
 * `audio`, et qu'aucune scène ne peut dépasser la fin de l'audio.
 */

import { transcriptToCaptions } from "../audio/captions.ts";
import { getTranscriptSegmentsInRange } from "../audio/lookup.ts";
import type { AudioTrack, TranscriptSegment } from "../audio/types";
import {
  TIMESTAMP_EPSILON,
  validateAudioTrack,
  validateTranscript,
} from "../audio/validate.ts";
import type { CaptionSegment } from "../captions/types";
import { secondsToFrames } from "../utils/time.ts";

import {
  getSceneDurationFrames,
  sceneTypes,
  validateSceneTiming,
  type Episode,
  type Scene,
} from "./types.ts";

/**
 * Durée de l'épisode en frames : celle de l'audio (source de vérité), convertie
 * avec le `fps` de la composition.
 */
export const getEpisodeDurationFrames = (
  episode: Pick<Episode, "audio">,
  fps: number,
): number => {
  if (!Number.isFinite(fps) || fps <= 0) {
    throw new Error(
      `Episode duration requires a positive fps; received ${fps}.`,
    );
  }

  const { duration } = episode.audio;
  if (!Number.isFinite(duration) || duration < 0) {
    throw new Error(
      `Episode duration requires a nonnegative audio duration; received ${duration}.`,
    );
  }

  return secondsToFrames(duration, fps);
};

/** Vrai si la scène tient entièrement dans la durée de l'audio. */
export const isSceneWithinAudio = (
  scene: Pick<Scene, "start" | "end">,
  audio: Pick<AudioTrack, "duration">,
): boolean =>
  Number.isFinite(audio.duration) &&
  Number.isFinite(scene.end) &&
  scene.end <= audio.duration + TIMESTAMP_EPSILON;

/** Segments de transcript couverts par l'intervalle d'une scène. */
export const getSceneTranscriptSegments = (
  episode: Pick<Episode, "transcript">,
  scene: Pick<Scene, "start" | "end">,
): readonly TranscriptSegment[] =>
  getTranscriptSegmentsInRange(episode.transcript, scene.start, scene.end);

/**
 * Texte du transcript couvert par une scène, recollé en une chaîne. Permet au
 * future Scene System de retrouver la narration d'une scène sans dupliquer la
 * logique temporelle.
 */
export const getSceneTranscriptText = (
  episode: Pick<Episode, "transcript">,
  scene: Pick<Scene, "start" | "end">,
): string =>
  getSceneTranscriptSegments(episode, scene)
    .map((segment) => segment.text)
    .join(" ");

/** Segments de captions (`CaptionSegment[]`) construits depuis le transcript. */
export const getEpisodeCaptions = (
  episode: Pick<Episode, "transcript">,
): CaptionSegment[] => transcriptToCaptions(episode.transcript);

const validateSceneProps = (scene: Scene): void => {
  const props = scene.visual.props;
  if (
    props !== undefined &&
    (typeof props !== "object" || props === null || Array.isArray(props))
  ) {
    throw new Error(
      `Scene "${scene.id}" visual props must be an object when provided.`,
    );
  }

  const revealOffsets = scene.visual.revealOffsets;
  if (revealOffsets === undefined) {
    return;
  }
  if (!Array.isArray(revealOffsets) || revealOffsets.length === 0) {
    throw new Error(
      `Scene "${scene.id}" visual revealOffsets must be a non-empty array when provided.`,
    );
  }

  const visualProps = props ?? {};
  let revealableItemCount: number;
  if (
    scene.visual.component === "FlowDiagram" ||
    scene.visual.component === "diagram"
  ) {
    const nodes = visualProps.nodes;
    revealableItemCount =
      Array.isArray(nodes) && nodes.length > 0 ? nodes.length : 1;
  } else if (scene.visual.component === "AnimatedList") {
    const items = visualProps.items;
    revealableItemCount = Array.isArray(items) ? items.length : 0;
  } else {
    throw new Error(
      `Scene "${scene.id}" visual component "${scene.visual.component}" does not support revealOffsets.`,
    );
  }
  if (revealOffsets.length !== revealableItemCount) {
    throw new Error(
      `Scene "${scene.id}" visual revealOffsets must contain one entry per visual item (${revealableItemCount}).`,
    );
  }

  let previousOffset = -1;
  const sceneDuration = scene.end - scene.start;
  revealOffsets.forEach((offset, index) => {
    if (
      !Number.isFinite(offset) ||
      offset < 0 ||
      offset >= sceneDuration ||
      offset <= previousOffset
    ) {
      throw new Error(
        `Scene "${scene.id}" visual revealOffsets[${index}] must be finite, strictly increasing, and within [0, ${sceneDuration}).`,
      );
    }
    previousOffset = offset;
  });
};

/**
 * Valide un épisode avant rendu : identité, audio, transcript, scènes.
 *
 * Les scènes doivent être ordonnées, sans chevauchement, et tenir dans la
 * durée de l'audio ; le transcript doit lui aussi rester dans les bornes de
 * l'audio. Le mapping visuel (registry) est vérifié à part, côté rendu, car il
 * dépend de composants React.
 */
export const validateEpisode = (episode: Episode, fps: number): void => {
  if (!episode || typeof episode !== "object") {
    throw new Error("Episode must be an object.");
  }
  if (!Number.isFinite(fps) || fps <= 0) {
    throw new Error(
      `Episode validation requires a positive fps; received ${fps}.`,
    );
  }
  if (typeof episode.id !== "string" || !episode.id.trim()) {
    throw new Error("Episode id must not be empty.");
  }
  if (typeof episode.title !== "string" || !episode.title.trim()) {
    throw new Error(`Episode "${episode.id}" must have a title.`);
  }

  const audioErrors = validateAudioTrack(
    episode.audio,
    `Episode "${episode.id}" audio`,
  );
  if (audioErrors.length > 0) {
    throw new Error(audioErrors.join("\n"));
  }

  const transcriptErrors = validateTranscript(episode.transcript, {
    audio: episode.audio,
    context: `Episode "${episode.id}" transcript`,
  });
  if (transcriptErrors.length > 0) {
    throw new Error(transcriptErrors.join("\n"));
  }

  if (!Array.isArray(episode.scenes) || episode.scenes.length === 0) {
    throw new Error(`Episode "${episode.id}" must contain at least one scene.`);
  }

  const sceneIds: string[] = [];
  let previousStart = -1;
  let previousEnd = 0;

  episode.scenes.forEach((scene) => {
    if (!scene || typeof scene !== "object") {
      throw new Error(`Episode "${episode.id}" contains an invalid scene.`);
    }
    if (typeof scene.id !== "string" || !scene.id.trim()) {
      throw new Error(
        `Episode "${episode.id}" contains a scene with an empty id.`,
      );
    }
    if (sceneIds.indexOf(scene.id) !== -1) {
      throw new Error(
        `Episode "${episode.id}" contains duplicate scene id "${scene.id}".`,
      );
    }
    sceneIds.push(scene.id);

    if (
      typeof scene.type !== "string" ||
      sceneTypes.indexOf(scene.type) === -1
    ) {
      throw new Error(
        `Episode "${episode.id}", scene "${scene.id}" has an unknown narrative type.`,
      );
    }

    validateSceneTiming(scene, `Episode "${episode.id}", scene "${scene.id}"`);
    if (scene.start < previousStart) {
      throw new Error(
        `Episode "${episode.id}" scenes must be ordered by ascending start time; "${scene.id}" is out of order.`,
      );
    }
    if (scene.start < previousEnd) {
      throw new Error(
        `Episode "${episode.id}" has overlapping scenes at "${scene.id}". Scene overlaps are unsupported until transitions are implemented.`,
      );
    }

    if (getSceneDurationFrames(scene, fps) < 1) {
      throw new Error(
        `Scene "${scene.id}" is shorter than one frame at ${fps} fps.`,
      );
    }

    if (
      !scene.visual ||
      typeof scene.visual !== "object" ||
      typeof scene.visual.component !== "string" ||
      !scene.visual.component.trim()
    ) {
      throw new Error(
        `Scene "${scene.id}" must define a visual component name.`,
      );
    }
    validateSceneProps(scene);

    if (!isSceneWithinAudio(scene, episode.audio)) {
      throw new Error(
        `Episode "${episode.id}", scene "${scene.id}" ends at ${scene.end}s, beyond the audio duration ${episode.audio.duration}s.`,
      );
    }

    previousStart = scene.start;
    previousEnd = scene.end;
  });
};
