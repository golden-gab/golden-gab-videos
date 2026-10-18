/**
 * Test de l'épisode « C'est quoi un site web » :
 * - épisode audio-driven valide ;
 * - scènes contiguës de 0 à la fin de l'audio ;
 * - chaque frontière de scène tombe sur un début de mot ;
 * - la mascotte n'utilise que des poses réellement enregistrées ;
 * - SFX parcimonieux calés sur des mots ou la 1re frame.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  getEpisodeCaptions,
  getEpisodeDurationFrames,
  validateEpisode,
} from "../../../../../scenes/episode.ts";
import { siteWebEpisode as episode } from "./episode.ts";

const registeredPoses = [
  "thinking",
  "surprised",
  "happy",
  "explaining",
  "point",
];

test("web-story episode : valide comme épisode audio-driven", () => {
  assert.doesNotThrow(() => validateEpisode(episode, 30));
  assert.equal(getEpisodeDurationFrames(episode, 30), Math.round(112.01 * 30));
});

test("web-story episode : transcript complet et captions dérivées", () => {
  assert.equal(episode.transcript.segments.length, 335);
  const captions = getEpisodeCaptions(episode);
  assert.equal(captions.length, 335);
});

test("web-story episode : scènes contiguës de 0 à la fin de l'audio", () => {
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
  assert.equal(episode.scenes.length, 48);
});

test("web-story episode : chaque frontière de scène tombe sur un début de mot", () => {
  episode.scenes.slice(1).forEach((scene) => {
    assert.ok(
      episode.transcript.segments.some(
        (segment) => Math.abs(segment.start - scene.start) < 0.011,
      ),
      `frontière hors mot : ${scene.id} (${scene.start}s)`,
    );
  });
});

test("web-story episode : la mascotte n'utilise que des poses enregistrées", () => {
  episode.scenes.forEach((scene) => {
    if (scene.mascot?.enabled) {
      assert.ok(
        registeredPoses.indexOf(String(scene.mascot.pose)) !== -1,
        `pose inconnue : ${scene.id} -> ${scene.mascot.pose}`,
      );
    }
    assert.equal(typeof scene.metadata?.objective, "string", scene.id);
  });
});

test("web-story episode : SFX calés sur des mots ou frame 0", () => {
  const sfx = episode.scenes.flatMap((scene) => scene.sfx ?? []);
  assert.ok(sfx.length >= 5 && sfx.length <= 15, `nombre de SFX inattendu : ${sfx.length}`);
  sfx.forEach((entry) => {
    assert.ok("wordIndex" in entry.at || entry.at.frame === 0);
  });
});
