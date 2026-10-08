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

test("épisode de référence : les captions viennent du transcript", () => {
  const captions = getEpisodeCaptions(referenceEpisode);
  assert.equal(captions.length, referenceEpisode.transcript.segments.length);
  assert.equal(captions[0].startMs, 40);
  assert.equal(captions[0].endMs, 480);
  assert.equal(captions[captions.length - 1].endMs, 24680);
});

test("épisode de référence : les révélations du diagramme suivent les verbes narrés", () => {
  const analysisScene = referenceEpisode.scenes.find(
    (scene) => scene.id === "analyse",
  );
  assert.ok(analysisScene);
  assert.deepEqual(analysisScene.visual.revealOffsets, [0, 1.88, 3.75]);

  const narratedActions = ["identifier", "comprendre", "aider"];
  analysisScene.visual.revealOffsets?.forEach((offset, index) => {
    const revealTime = analysisScene.start + offset;
    const transcriptSegment = referenceEpisode.transcript.segments.find(
      (segment) => Math.abs(segment.start - revealTime) < 0.001,
    );

    assert.match(
      transcriptSegment?.text.toLowerCase() ?? "",
      new RegExp(narratedActions[index]),
    );
  });
});
