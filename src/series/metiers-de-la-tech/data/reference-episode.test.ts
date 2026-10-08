/**
 * Test de l'épisode de référence : il doit traverser toute la couche M03/M04
 * (validation audio-driven, bornes des scènes, captions) sans erreur.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  getEpisodeCaptions,
  getEpisodeDurationFrames,
  validateEpisode,
} from "../../../scenes/episode.ts";
import { referenceEpisode } from "./reference-episode.ts";

test("épisode de référence : valide comme épisode audio-driven", () => {
  assert.doesNotThrow(() => validateEpisode(referenceEpisode, 30));
});

test("épisode de référence : la durée vient de l'audio", () => {
  assert.equal(
    getEpisodeDurationFrames(referenceEpisode, 30),
    Math.round(referenceEpisode.audio.duration * 30),
  );
});

test("épisode de référence : chaque scène reste dans l'audio et est ordonnée", () => {
  let previousEnd = 0;
  referenceEpisode.scenes.forEach((scene) => {
    assert.ok(scene.start >= previousEnd, `scène "${scene.id}" en chevauchement`);
    assert.ok(
      scene.end <= referenceEpisode.audio.duration,
      `scène "${scene.id}" au-delà de l'audio`,
    );
    previousEnd = scene.end;
  });
});

test("storyboard : chaque beat précise son objectif, ses captions et sa transition", () => {
  referenceEpisode.scenes.forEach((scene) => {
    assert.equal(typeof scene.metadata?.objective, "string", scene.id);
    assert.ok(scene.transition?.enter, `transition d'entrée manquante : ${scene.id}`);
    assert.ok(scene.transition?.exit, `transition de sortie manquante : ${scene.id}`);
    assert.equal(scene.captions?.enabled, true, `captions désactivées : ${scene.id}`);
  });

  assert.deepEqual(
    referenceEpisode.scenes
      .filter((scene) => scene.mascot?.enabled)
      .map((scene) => scene.id),
    ["role", "insight", "conclusion"],
  );
});

test("épisode de référence : les captions viennent du transcript", () => {
  const captions = getEpisodeCaptions(referenceEpisode);
  assert.equal(captions.length, referenceEpisode.transcript.segments.length);
  assert.equal(captions[0].startMs, 40);
  assert.equal(captions[0].endMs, 480);
  assert.equal(captions[captions.length - 1].endMs, 24680);
});

test("storyboard : les révélations de la transformation correspondent au transcript", () => {
  const transformationScene = referenceEpisode.scenes.find(
    (scene) => scene.id === "transformation",
  );
  assert.ok(transformationScene);

  const beats = transformationScene.visual.props;
  assert.ok(beats);
  ["transformRevealWord", "informationRevealWord"].forEach((beatKey) => {
    const word = beats[beatKey];
    assert.equal(typeof word, "string");
    const segment = referenceEpisode.transcript.segments.find(
      (candidate) => candidate.text === word,
    );
    assert.ok(segment, `mot d'animation absent du transcript : ${String(word)}`);
    assert.ok(
      segment.start >= transformationScene.start &&
        segment.start < transformationScene.end,
      `mot d'animation hors de la scène : ${String(word)}`,
    );
  });
});

test("épisode de référence : les révélations du diagramme suivent les verbes narrés", () => {
  const analysisScene = referenceEpisode.scenes.find(
    (scene) => scene.id === "analyse",
  );
  assert.ok(analysisScene);

  const beatKeys = [
    "trendRevealWord",
    "behaviorRevealWord",
    "decisionRevealWord",
  ];
  const narratedActions = ["identifier", "comprendre", "aider"];
  const expectedRevealOffsets = [0, 1.88, 3.75];
  beatKeys.forEach((beatKey, index) => {
    const word = analysisScene.visual.props?.[beatKey];
    assert.equal(word, narratedActions[index]);
    const transcriptSegment = referenceEpisode.transcript.segments.find(
      (segment) => segment.text.toLowerCase() === String(word),
    );
    assert.ok(transcriptSegment);
    assert.equal(
      transcriptSegment.start,
      analysisScene.start + expectedRevealOffsets[index],
    );
  });
});
