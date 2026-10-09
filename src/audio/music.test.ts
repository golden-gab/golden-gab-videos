import { test } from "node:test";
import assert from "node:assert/strict";

import { getDuckedMusicVolume, getSpeechIntervals } from "./music.ts";

test("music: les segments parlés proches sont regroupés", () => {
  const intervals = getSpeechIntervals({
    segments: [
      { start: 0, end: 0.3, text: "mot" },
      { start: 0.36, end: 0.6, text: "suivant" },
      { start: 1, end: 1.2, text: "pause" },
    ],
  });

  assert.deepEqual(intervals, [
    { start: 0, end: 0.6 },
    { start: 1, end: 1.2 },
  ]);
});

test("music: le volume baisse pendant la voix et remonte dans les silences", () => {
  const intervals = [{ start: 1, end: 2 }];
  const volume = 0.14;
  const duckTo = 0.04;

  assert.equal(getDuckedMusicVolume(0.5, intervals, volume, duckTo), volume);
  assert.equal(getDuckedMusicVolume(1, intervals, volume, duckTo), duckTo);
  assert.equal(getDuckedMusicVolume(1.5, intervals, volume, duckTo), duckTo);
  assert.equal(getDuckedMusicVolume(2.12, intervals, volume, duckTo), volume);
  assert.ok(getDuckedMusicVolume(0.94, intervals, volume, duckTo) > duckTo);
});
