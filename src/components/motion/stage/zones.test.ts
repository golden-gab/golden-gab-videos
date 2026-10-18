import assert from "node:assert/strict";
import test from "node:test";

import {
  getZones,
  rectsOverlap,
  type ZoneLayout,
} from "./zones.ts";

const lanes = ["top", "center", "bottom", "low"] as const;
const layouts: readonly ZoneLayout[] = [
  "art",
  "side-left",
  "side-right",
  "stack-left",
  "stack-right",
  "mascot",
];

test("zones : mascotte, illustration et captions ne se recouvrent jamais", () => {
  for (const lane of lanes) {
    for (const layout of layouts) {
      const { caption, free, art, mascot } = getZones(lane, layout);

      assert.equal(rectsOverlap(free, caption), false, `${lane}/${layout} : zone libre sur les captions`);

      if (art) {
        assert.equal(rectsOverlap(art, caption), false, `${lane}/${layout} : illustration sur les captions`);
      }

      if (mascot) {
        assert.equal(rectsOverlap(mascot, caption), false, `${lane}/${layout} : mascotte sur les captions`);
      }

      if (art && mascot) {
        assert.equal(rectsOverlap(art, mascot), false, `${lane}/${layout} : illustration sur la mascotte`);
      }
    }
  }
});

test("zones : chaque zone reste dans la zone libre", () => {
  for (const lane of lanes) {
    for (const layout of layouts) {
      const { free, art, mascot } = getZones(lane, layout);

      for (const rect of [art, mascot]) {
        if (!rect) {
          continue;
        }

        assert.ok(rect.x >= free.x - 1 && rect.x + rect.w <= free.x + free.w + 1, `${lane}/${layout} : débordement horizontal`);
        assert.ok(rect.y >= free.y - 1 && rect.y + rect.h <= free.y + free.h + 1, `${lane}/${layout} : débordement vertical`);
      }
    }
  }
});

test("zones : le gabarit laisse une illustration lisible", () => {
  for (const lane of lanes) {
    const { art } = getZones(lane, "side-left");

    assert.ok(art && art.w >= 480, `${lane} : illustration trop étroite`);
    assert.ok(art && art.h >= 360, `${lane} : illustration trop basse`);
  }
});
