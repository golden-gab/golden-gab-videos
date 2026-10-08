/**
 * Tests de la validation temporelle (couche Audio).
 *
 * Exécutés par le runner natif de Node (`npm test`), sans dépendance externe :
 * les modules de `src/audio` sont importés avec l'extension `.ts` explicite
 * (type stripping de Node), comme le reste des tests du projet.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import type { AudioTrack, Transcript } from "./types.ts";
import {
  assertValidTranscript,
  validateAudioTrack,
  validateTranscript,
} from "./validate.ts";

const validAudio: AudioTrack = {
  id: "voice-1",
  src: "audio/voice.wav",
  duration: 40,
  format: "wav",
  sampleRate: 16000,
  channels: 1,
};

const validTranscript: Transcript = {
  language: "fr",
  segments: [
    { start: 0, end: 3.2, text: "Bonjour." },
    { start: 3.2, end: 8.7, text: "Voici pourquoi." },
  ],
};

test("audio : une piste valide ne produit aucune erreur", () => {
  assert.deepEqual(validateAudioTrack(validAudio), []);
});

test("audio : une durée négative est rejetée", () => {
  const errors = validateAudioTrack({ ...validAudio, duration: -1 });
  assert.equal(errors.length, 1);
  assert.match(errors[0], /duration/);
});

test("audio : une durée non finie est rejetée", () => {
  const errors = validateAudioTrack({ ...validAudio, duration: Number.NaN });
  assert.equal(errors.length, 1);
  assert.match(errors[0], /duration/);
});

test("audio : une source manquante est rejetée", () => {
  const errors = validateAudioTrack({ ...validAudio, src: "   " });
  assert.equal(errors.length, 1);
  assert.match(errors[0], /src/);
});

test("transcript : un transcript valide ne produit aucune erreur", () => {
  assert.deepEqual(validateTranscript(validTranscript, { audio: validAudio }), []);
  assert.doesNotThrow(() =>
    assertValidTranscript(validTranscript, { audio: validAudio }),
  );
});

test("transcript : un segment end <= start est rejeté", () => {
  const errors = validateTranscript({
    segments: [{ start: 10, end: 7, text: "…" }],
  });
  assert.ok(errors.length >= 1);
  assert.match(errors[0], /end/);
});

test("transcript : un timestamp négatif est rejeté", () => {
  const errors = validateTranscript({
    segments: [{ start: -2, end: 1, text: "…" }],
  });
  assert.ok(errors.length >= 1);
  assert.match(errors[0], /start/);
});

test("transcript : un segment dépassant la durée audio est rejeté", () => {
  const errors = validateTranscript(
    { segments: [{ start: 45, end: 50, text: "…" }] },
    { audio: { duration: 40 } },
  );
  assert.ok(errors.length >= 1);
  assert.ok(errors.some((error) => /dépasse la durée/.test(error)));
});

test("transcript : des segments mal ordonnés sont rejetés", () => {
  const errors = validateTranscript({
    segments: [
      { start: 5, end: 8, text: "deux" },
      { start: 1, end: 3, text: "un" },
    ],
  });
  assert.ok(errors.some((error) => /ordonnés/.test(error)));
});

test("transcript : des segments qui se chevauchent sont rejetés", () => {
  const errors = validateTranscript({
    segments: [
      { start: 0, end: 5, text: "un" },
      { start: 3, end: 8, text: "deux" },
    ],
  });
  assert.ok(errors.some((error) => /chevaucher/.test(error)));
});

test("transcript : un transcript sans segment reste valide", () => {
  assert.deepEqual(validateTranscript({ segments: [] }), []);
});

test("transcript : la variante assert lève une erreur lisible", () => {
  assert.throws(
    () =>
      assertValidTranscript({
        segments: [{ start: 10, end: 7, text: "x" }],
      }),
    /end/,
  );
});
