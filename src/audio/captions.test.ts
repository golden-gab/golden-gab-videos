/**
 * Tests de l'adaptateur `transcriptToCaptions` : les segments doivent être
 * convertis sans perte (start, end, text) vers le modèle de captions.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  secondsToMilliseconds,
  transcriptSegmentToCaption,
  transcriptToCaptions,
} from "./captions.ts";
import type { Transcript } from "./types.ts";

const transcript: Transcript = {
  language: "fr",
  segments: [
    { start: 0, end: 3.2, text: "Bonjour." },
    {
      start: 3.2,
      end: 8.7,
      text: "Voici pourquoi cette architecture fonctionne.",
    },
  ],
};

test("captions : convertit les secondes en millisecondes sans perte", () => {
  const captions = transcriptToCaptions(transcript);
  assert.equal(captions.length, transcript.segments.length);
  assert.deepEqual(captions, [
    { text: "Bonjour.", startMs: 0, endMs: 3200 },
    {
      text: "Voici pourquoi cette architecture fonctionne.",
      startMs: 3200,
      endMs: 8700,
    },
  ]);
});

test("captions : conserve l'ordre et le texte exactement", () => {
  const captions = transcriptToCaptions(transcript);
  transcript.segments.forEach((segment, index) => {
    assert.equal(captions[index].text, segment.text);
    assert.equal(captions[index].startMs, Math.round(segment.start * 1000));
    assert.equal(captions[index].endMs, Math.round(segment.end * 1000));
  });
});

test("captions : un transcript vide produit une liste vide", () => {
  assert.deepEqual(transcriptToCaptions({ segments: [] }), []);
});

test("captions : conversion unitaire secondes -> millisecondes", () => {
  assert.equal(secondsToMilliseconds(1.5), 1500);
  assert.deepEqual(transcriptSegmentToCaption({ start: 1.5, end: 2.25, text: "x" }), {
    text: "x",
    startMs: 1500,
    endMs: 2250,
  });
});
