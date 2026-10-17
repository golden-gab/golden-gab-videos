/**
 * Tests du schéma d'épisode audio-driven (`src/scenes/episode.ts`).
 *
 * Exécutés par le runner natif de Node : les imports de valeurs portent
 * l'extension `.ts` explicite, comme les autres tests du projet.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import type { AudioTrack, Transcript } from "../audio/types.ts";
import type { CaptionSegment } from "../captions/types.ts";
import {
  breakCaptionsAtScenes,
  getEpisodeCaptionPlacements,
  getEpisodeCaptions,
  getEpisodeDurationFrames,
  getSceneTranscriptSegments,
  getSceneTranscriptText,
  isSceneWithinAudio,
  validateEpisode,
} from "./episode.ts";
import type { Episode } from "./types.ts";

const audio: AudioTrack = {
  id: "voice",
  src: "audio/voice.wav",
  duration: 42.5,
  format: "wav",
};

const transcript: Transcript = {
  language: "fr",
  segments: [
    { start: 0, end: 3.2, text: "Première phrase." },
    { start: 3.2, end: 8.7, text: "Deuxième phrase." },
  ],
};

const validEpisode: Episode = {
  id: "ep-demo",
  title: "Épisode de démonstration",
  audio,
  transcript,
  metadata: { series: "metiers-de-la-tech", angle: "architecture" },
  scenes: [
    {
      id: "s1",
      type: "hero",
      start: 0,
      end: 8.7,
      visual: { component: "HeroTitle", props: {} },
    },
    {
      id: "s2",
      type: "explanation",
      start: 8.7,
      end: 14.1,
      visual: { component: "InfoCard", props: {} },
    },
  ],
};

test("episode : un épisode audio-driven valide passe la validation", () => {
  assert.doesNotThrow(() => validateEpisode(validEpisode, 30));
});

test("episode : les SFX optionnels acceptent un frame ou un segment-mot", () => {
  const episode: Episode = {
    ...validEpisode,
    scenes: [
      {
        ...validEpisode.scenes[0],
        sfx: [
          { at: { frame: 30 }, name: "pop" },
          { at: { wordIndex: 1 }, name: "ding", volume: 0.2 },
        ],
      },
      validEpisode.scenes[1],
    ],
  };

  assert.doesNotThrow(() => validateEpisode(episode, 30));
});

test("episode : un SFX hors scène ou avec un index de transcript inconnu est rejeté", () => {
  for (const at of [{ frame: 8_700 }, { wordIndex: 99 }]) {
    const episode: Episode = {
      ...validEpisode,
      scenes: [
        {
          ...validEpisode.scenes[0],
          sfx: [{ at, name: "pop" }],
        },
        validEpisode.scenes[1],
      ],
    };

    assert.throws(() => validateEpisode(episode, 30), /sfx/);
  }
});

test("episode : la durée vient de l'audio réel", () => {
  assert.equal(
    getEpisodeDurationFrames(validEpisode, 30),
    Math.round(42.5 * 30),
  );
  assert.equal(validEpisode.audio.duration, 42.5);
});

test("episode : une scène au-delà de l'audio est rejetée", () => {
  const episode: Episode = {
    ...validEpisode,
    scenes: [
      {
        id: "s1",
        type: "hero",
        start: 0,
        end: 50,
        visual: { component: "HeroTitle" },
      },
    ],
  };
  assert.throws(
    () => validateEpisode(episode, 30),
    /beyond the audio duration/,
  );
});

test("episode : une durée audio invalide est rejetée", () => {
  const episode: Episode = {
    ...validEpisode,
    audio: { ...audio, duration: -1 },
  };
  assert.throws(() => validateEpisode(episode, 30), /duration/);
});

test("episode : un transcript qui dépasse l'audio est rejeté", () => {
  const episode: Episode = {
    ...validEpisode,
    transcript: {
      language: "fr",
      segments: [{ start: 0, end: 50, text: "hors bornes" }],
    },
  };
  assert.throws(() => validateEpisode(episode, 30), /dépasse la durée/);
});

test("episode : un type de scène inconnu est rejeté", () => {
  const episode = {
    ...validEpisode,
    scenes: [
      {
        id: "s1",
        type: "inconnu",
        start: 0,
        end: 5,
        visual: { component: "X" },
      },
    ],
  } as unknown as Episode;
  assert.throws(() => validateEpisode(episode, 30), /unknown narrative type/);
});

test("episode : un doublon d'id de scène est rejeté", () => {
  const episode: Episode = {
    ...validEpisode,
    scenes: [
      {
        id: "s1",
        type: "hero",
        start: 0,
        end: 5,
        visual: { component: "HeroTitle" },
      },
      {
        id: "s1",
        type: "hero",
        start: 5,
        end: 10,
        visual: { component: "HeroTitle" },
      },
    ],
  };
  assert.throws(() => validateEpisode(episode, 30), /duplicate scene id/);
});

test("episode : les captions viennent du transcript (secondes -> ms)", () => {
  assert.deepEqual(getEpisodeCaptions(validEpisode), [
    { text: "Première phrase.", startMs: 0, endMs: 3200 },
    { text: "Deuxième phrase.", startMs: 3200, endMs: 8700 },
  ]);
});

test("episode : les revealOffsets sont ordonnés et relatifs à la durée de scène", () => {
  const episode: Episode = {
    ...validEpisode,
    scenes: [
      {
        ...validEpisode.scenes[0],
        type: "diagram",
        visual: {
          component: "FlowDiagram",
          props: {
            nodes: [{ title: "A" }, { title: "B" }, { title: "C" }],
          },
          revealOffsets: [0, 2.5, 8.69],
        },
      },
    ],
  };

  assert.doesNotThrow(() => validateEpisode(episode, 30));
});

test("episode : les revealOffsets hors bornes ou non ordonnés sont rejetés", () => {
  for (const revealOffsets of [
    [],
    [-0.1, 1, 2],
    [8.7, 8.71, 8.72],
    [2, 1, 3],
    [1, 1, 2],
    [Number.NaN, 1, 2],
    [0, 2],
  ]) {
    const episode: Episode = {
      ...validEpisode,
      scenes: [
        {
          ...validEpisode.scenes[0],
          type: "diagram",
          visual: {
            component: "FlowDiagram",
            props: {
              nodes: [{ title: "A" }, { title: "B" }, { title: "C" }],
            },
            revealOffsets,
          },
        },
      ],
    };

    assert.throws(
      () => validateEpisode(episode, 30),
      /revealOffsets/,
      `Expected ${JSON.stringify(revealOffsets)} to be rejected`,
    );
  }
});

test("episode : le texte d'une scène est reconstruit depuis le transcript", () => {
  assert.equal(
    getSceneTranscriptText(validEpisode, { start: 0, end: 8.7 }),
    "Première phrase. Deuxième phrase.",
  );
  assert.equal(
    getSceneTranscriptSegments(validEpisode, { start: 9, end: 12 }).length,
    0,
  );
});

test("episode : isSceneWithinAudio borne la scène à la durée audio", () => {
  assert.equal(isSceneWithinAudio({ start: 0, end: 42.5 }, audio), true);
  assert.equal(isSceneWithinAudio({ start: 0, end: 42.6 }, audio), false);
});

test("captions : la position d'une scène devient un placement en millisecondes", () => {
  const episode: Episode = {
    ...validEpisode,
    scenes: [
      validEpisode.scenes[0],
      { ...validEpisode.scenes[1], captions: { position: "top" } },
    ],
  };

  assert.deepEqual(getEpisodeCaptionPlacements(episode), [
    { startMs: 8700, endMs: 14100, position: "top" },
  ]);
  assert.deepEqual(getEpisodeCaptionPlacements(validEpisode), []);
});

test("captions : une position inconnue est rejetée à la validation", () => {
  const episode: Episode = {
    ...validEpisode,
    scenes: [
      {
        ...validEpisode.scenes[0],
        captions: { position: "middle" as never },
      },
      validEpisode.scenes[1],
    ],
  };

  assert.throws(() => validateEpisode(episode, 30), /captions\.position/);
  assert.doesNotThrow(() =>
    validateEpisode(
      {
        ...validEpisode,
        scenes: [
          { ...validEpisode.scenes[0], captions: { position: "low" } },
          validEpisode.scenes[1],
        ],
      },
      30,
    ),
  );
});

test("captions : une nouvelle page démarre à chaque début de scène", () => {
  const captions: CaptionSegment[] = [
    { text: "Un", startMs: 0, endMs: 400 },
    { text: "deux", startMs: 8000, endMs: 8400 },
    { text: "trois", startMs: 8700, endMs: 9100 },
  ];
  const broken = breakCaptionsAtScenes(captions, validEpisode.scenes);

  assert.equal(broken.length, captions.length);
  // La scène 1 démarre à 0 : pas de coupure. La scène 2 démarre à 8,7 s,
  // début du segment « trois » : coupure.
  assert.equal(broken[0].pageBreakBefore, undefined);
  assert.equal(broken[1].pageBreakBefore, undefined);
  assert.equal(broken[2].pageBreakBefore, true);
  // Les segments d'origine ne sont pas modifiés.
  assert.equal(captions[2].pageBreakBefore, undefined);
});
