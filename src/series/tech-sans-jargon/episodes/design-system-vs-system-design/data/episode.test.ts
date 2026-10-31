/**
 * Test de l'épisode « Design System ou System Design ? » :
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
import { designSystemEpisode as episode } from "./episode.ts";

const registeredPoses = ["thinking", "surprised", "happy", "explaining", "point"];

test("design-system episode : valide comme épisode audio-driven", () => {
  assert.doesNotThrow(() => validateEpisode(episode, 30));
  assert.equal(getEpisodeDurationFrames(episode, 30), Math.round(71 * 30));
});

test("design-system episode : transcript complet et captions dérivées", () => {
  assert.equal(episode.transcript.segments.length, 195);
  assert.equal(getEpisodeCaptions(episode).length, 195);
});

test("design-system episode : scènes contiguës de 0 à la fin de l'audio", () => {
  assert.equal(episode.scenes[0].start, 0);
  episode.scenes.forEach((scene, index) => {
    if (index > 0) {
      assert.equal(scene.start, episode.scenes[index - 1].end, scene.id);
    }
  });
  assert.equal(episode.scenes[episode.scenes.length - 1].end, episode.audio.duration);
  assert.equal(episode.scenes.length, 59);
});

test("design-system episode : chaque frontière de scène tombe sur un début de mot", () => {
  episode.scenes.slice(1).forEach((scene) => {
    assert.ok(
      episode.transcript.segments.some(
        (segment) => Math.abs(segment.start - scene.start) < 0.011,
      ),
      `frontière hors mot : ${scene.id} (${scene.start}s)`,
    );
  });
});

test("design-system episode : aucun plan ne dure moins de 0,5 s", () => {
  episode.scenes.forEach((scene) => {
    assert.ok(scene.end - scene.start >= 0.5, `${scene.id} : ${(scene.end - scene.start).toFixed(2)} s`);
  });
});

test("design-system episode : le texte de chaque scène est celui des mots du transcript", () => {
  const normalise = (text: string): string =>
    text.replace(/\s+\?/g, "?").replace(/\s+/g, " ").trim();

  episode.scenes.forEach((scene) => {
    const words = episode.transcript.segments
      .filter((segment) => segment.start >= scene.start - 0.0001 && segment.start < scene.end - 0.0001)
      .map((segment) => segment.text)
      .join(" ");
    assert.equal(normalise(scene.transcript ?? ""), normalise(words), scene.id);
  });
});

test("design-system episode : la mascotte n'utilise que des poses enregistrées, rare", () => {
  const withMascot = episode.scenes.filter((scene) => scene.mascot?.enabled);
  assert.ok(withMascot.length >= 3 && withMascot.length <= 6, `mascotte : ${withMascot.length} plans`);
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

test("design-system episode : SFX calés sur des mots ou frame 0", () => {
  const sfx = episode.scenes.flatMap((scene) => scene.sfx ?? []);
  assert.ok(sfx.length >= 2 && sfx.length <= 15, `nombre de SFX inattendu : ${sfx.length}`);
  sfx.forEach((entry) => {
    assert.ok("wordIndex" in entry.at || entry.at.frame === 0);
  });
});
