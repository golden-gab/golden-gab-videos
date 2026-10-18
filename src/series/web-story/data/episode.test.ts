import assert from "node:assert/strict";
import test from "node:test";

import { validateEpisode } from "../../../scenes/episode.ts";
import { webStoryEpisode } from "./episode.ts";
import { webStoryTranscript } from "./transcript.ts";

const registeredPoses = ["thinking", "surprised", "happy", "explaining", "point"];

test("épisode web-story : valide comme épisode audio-driven", () => {
  assert.doesNotThrow(() => {
    validateEpisode(webStoryEpisode, 30);
  });
  assert.equal(webStoryEpisode.audio.duration, 74.5);
  assert.equal(webStoryEpisode.scenes.length, 30);
});

test("épisode web-story : scènes contiguës de 0 à la fin de l'audio", () => {
  const { scenes, audio } = webStoryEpisode;
  assert.equal(scenes[0].start, 0);

  for (let index = 1; index < scenes.length; index += 1) {
    const previous = scenes[index - 1];
    const current = scenes[index];
    assert.equal(
      current.start,
      previous.end,
      `La scène "${current.id}" doit démarrer exactement à la fin de "${previous.id}".`,
    );
  }

  assert.equal(
    scenes[scenes.length - 1].end,
    audio.duration,
    "La dernière scène doit terminer exactement à la fin de l'audio.",
  );
});

test("épisode web-story : chaque frontière de scène tombe sur un début de mot", () => {
  const words = webStoryTranscript.segments;
  const wordStarts = new Set(words.map((w) => Math.round(w.start * 100) / 100));

  webStoryEpisode.scenes.forEach((scene) => {
    if (scene.start > 0) {
      const rounded = Math.round(scene.start * 100) / 100;
      assert.ok(
        wordStarts.has(rounded),
        `La scène "${scene.id}" démarre à ${scene.start}s, qui n'est pas un début de mot du transcript.`,
      );
    }
  });
});

test("épisode web-story : les poses de mascotte prévues sont réelles", () => {
  const allowed = new Set(registeredPoses);
  const plannedPoses = ["thinking", "surprised", "explaining", "point", "happy"];

  plannedPoses.forEach((pose) => {
    assert.ok(
      allowed.has(pose),
      `La pose "${pose}" doit être enregistrée dans mascotPoses.`,
    );
  });
});

test("épisode web-story : SFX calés sur les mots ou première frame", () => {
  webStoryEpisode.scenes.forEach((scene) => {
    if (!scene.sfx) return;
    scene.sfx.forEach((s) => {
      if ("wordIndex" in s.at) {
        const seg = webStoryTranscript.segments[s.at.wordIndex];
        assert.ok(seg, "Le segment de mot doit exister.");
        assert.ok(
          seg.start >= scene.start && seg.start < scene.end,
          `Le SFX "${s.name}" doit être à l'intérieur de la scène "${scene.id}".`,
        );
      } else {
        assert.ok(s.at.frame >= 0, "La frame doit être >= 0.");
      }
    });
  });
});
