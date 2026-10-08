/**
 * Tests du mock de développement : il doit représenter un vrai audio +
 * transcript et traverser tout le pipeline M03 (validation → lookup → captions).
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import { transcriptToCaptions } from "./captions.ts";
import { getTranscriptSegmentAt } from "./lookup.ts";
import { mockAudioTrack, mockTranscript } from "./mock.ts";
import { validateAudioTrack, validateTranscript } from "./validate.ts";

test("mock : la piste audio est valide", () => {
  assert.deepEqual(validateAudioTrack(mockAudioTrack), []);
});

test("mock : le transcript est valide face à l'audio", () => {
  assert.deepEqual(
    validateTranscript(mockTranscript, { audio: mockAudioTrack }),
    [],
  );
});

test("mock : le pipeline audio -> transcript -> captions fonctionne", () => {
  assert.ok(mockTranscript.segments.length >= 3);
  assert.ok(getTranscriptSegmentAt(mockTranscript, 4.5));
  assert.equal(
    transcriptToCaptions(mockTranscript).length,
    mockTranscript.segments.length,
  );
});
