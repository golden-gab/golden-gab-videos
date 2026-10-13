/**
 * Test du montage « Data Analyst × mascotte » : épisode audio-driven valide,
 * scènes contiguës alignées sur des débuts de mots, mascotte limitée aux poses
 * réellement enregistrées, SFX rares et calés sur des mots.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  getEpisodeCaptions,
  getEpisodeDurationFrames,
  validateEpisode,
} from "../../../scenes/episode.ts";
import { dataAnalystMascotEpisode as episode } from "./data-analyst-mascot-episode.ts";
import { referenceEpisode } from "./reference-episode.ts";

const registeredPoses = ["thinking", "surprised", "happy", "explaining", "point"];

test("montage mascotte : valide comme épisode audio-driven", () => {
  assert.doesNotThrow(() => validateEpisode(episode, 30));
  assert.equal(
    getEpisodeDurationFrames(episode, 30),
    getEpisodeDurationFrames(referenceEpisode, 30),
  );
});

test("montage mascotte : même voix et même transcript que la référence", () => {
  assert.equal(episode.audio.src, referenceEpisode.audio.src);
  assert.equal(getEpisodeCaptions(episode).length, getEpisodeCaptions(referenceEpisode).length);
});

test("montage mascotte : scènes contiguës, de 0 à la fin de l'audio", () => {
  assert.equal(episode.scenes[0].start, 0);
  episode.scenes.forEach((scene, index) => {
    if (index > 0) {
      assert.equal(scene.start, episode.scenes[index - 1].end, scene.id);
    }
  });
  assert.equal(
    episode.scenes[episode.scenes.length - 1].end,
    episode.audio.duration,
  );
});

test("montage mascotte : chaque frontière de scène tombe sur un début de mot", () => {
  episode.scenes.slice(1).forEach((scene) => {
    assert.ok(
      episode.transcript.segments.some(
        (segment) => Math.abs(segment.start - scene.start) < 0.011,
      ),
      `frontière hors mot : ${scene.id}`,
    );
  });
});

test("montage mascotte : la mascotte n'utilise que des poses enregistrées", () => {
  episode.scenes.forEach((scene) => {
    assert.equal(scene.mascot?.enabled, true, scene.id);
    assert.ok(
      registeredPoses.indexOf(String(scene.mascot?.pose)) !== -1,
      `pose inconnue : ${scene.id}`,
    );
    assert.equal(typeof scene.metadata?.objective, "string", scene.id);
  });
});

test("montage mascotte : SFX parcimonieux, calés sur des mots ou la 1re frame", () => {
  const sfx = episode.scenes.flatMap((scene) => scene.sfx ?? []);
  assert.ok(sfx.length <= 8, `trop de SFX : ${sfx.length}`);
  sfx.forEach((entry) => {
    assert.ok("wordIndex" in entry.at || entry.at.frame === 0);
  });
});
