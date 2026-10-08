/**
 * Tests de la recherche temporelle (`getTranscriptSegmentAt`).
 *
 * Cas couverts : segment trouvé, aucun segment, limite exacte entre deux
 * segments, silence entre deux segments, temps non fini.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  getTranscriptSegmentAt,
  getTranscriptSegmentsInRange,
} from "./lookup.ts";
import { mockTranscript } from "./mock.ts";

test("lookup : renvoie le premier segment à t = 0", () => {
  const segment = getTranscriptSegmentAt(mockTranscript, 0);
  assert.ok(segment);
  assert.equal(segment.start, 0);
  assert.equal(segment.text, mockTranscript.segments[0].text);
});

test("lookup : renvoie le segment actif à t = 4.5", () => {
  const segment = getTranscriptSegmentAt(mockTranscript, 4.5);
  assert.ok(segment);
  assert.equal(segment.start, 3.2);
  assert.equal(segment.end, 8.7);
});

test("lookup : renvoie null après le dernier segment", () => {
  assert.equal(getTranscriptSegmentAt(mockTranscript, 20 * 60), null);
});

test("lookup : la limite exacte appartient au segment suivant", () => {
  const segment = getTranscriptSegmentAt(mockTranscript, 3.2);
  assert.ok(segment);
  assert.equal(segment.start, 3.2);
});

test("lookup : un silence entre deux segments renvoie null", () => {
  // Le mock laisse un silence entre 8,7 s et 9,4 s.
  assert.equal(getTranscriptSegmentAt(mockTranscript, 9.0), null);
});

test("lookup : un temps non fini renvoie null", () => {
  assert.equal(getTranscriptSegmentAt(mockTranscript, Number.NaN), null);
});

test("lookup : un intervalle renvoie les segments qui l'intersectent", () => {
  const segments = getTranscriptSegmentsInRange(mockTranscript, 8, 15);
  assert.deepEqual(
    segments.map((segment) => segment.start),
    [3.2, 9.4, 14.1],
  );
});

test("lookup : un intervalle vide ou inversé renvoie une liste vide", () => {
  assert.deepEqual(getTranscriptSegmentsInRange(mockTranscript, 5, 5), []);
  assert.deepEqual(getTranscriptSegmentsInRange(mockTranscript, 15, 8), []);
});
