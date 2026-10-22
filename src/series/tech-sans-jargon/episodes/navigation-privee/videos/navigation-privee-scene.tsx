/**
 * Aiguillage des 41 plans de l'épisode « Navigation privée ».
 *
 * Chaque plan est habillé de son propre mouvement de caméra (`SceneShell`)
 * en alternant push, pull et drift pour que deux plans successifs bougent
 * différemment.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { SceneShell, type SceneCamera } from "../../../../../components/motion";
import type { Scene } from "../../../../../scenes/types";
import {
  Beat01,
  Beat02,
  Beat03,
  Beat04,
  Beat05,
  Beat06,
  Beat07,
  Beat08,
  Beat09,
  Beat10,
  Beat11,
  Beat12,
  Beat13,
  Beat14,
} from "./scenes-part1";
import {
  Beat15,
  Beat16,
  Beat17,
  Beat18,
  Beat19,
  Beat20,
  Beat21,
  Beat22,
  Beat23,
  Beat24,
  Beat25,
  Beat26,
  Beat27,
} from "./scenes-part2";
import {
  Beat28,
  Beat29,
  Beat30,
  Beat31,
  Beat32,
  Beat33,
  Beat34,
  Beat35,
  Beat36,
  Beat37,
  Beat38,
  Beat39,
  Beat40,
  Beat41,
} from "./scenes-part3";

const beatComponents: Record<string, React.FC<{ readonly scene: Scene }>> = {
  "beat-01": Beat01,
  "beat-02": Beat02,
  "beat-03": Beat03,
  "beat-04": Beat04,
  "beat-05": Beat05,
  "beat-06": Beat06,
  "beat-07": Beat07,
  "beat-08": Beat08,
  "beat-09": Beat09,
  "beat-10": Beat10,
  "beat-11": Beat11,
  "beat-12": Beat12,
  "beat-13": Beat13,
  "beat-14": Beat14,
  "beat-15": Beat15,
  "beat-16": Beat16,
  "beat-17": Beat17,
  "beat-18": Beat18,
  "beat-19": Beat19,
  "beat-20": Beat20,
  "beat-21": Beat21,
  "beat-22": Beat22,
  "beat-23": Beat23,
  "beat-24": Beat24,
  "beat-25": Beat25,
  "beat-26": Beat26,
  "beat-27": Beat27,
  "beat-28": Beat28,
  "beat-29": Beat29,
  "beat-30": Beat30,
  "beat-31": Beat31,
  "beat-32": Beat32,
  "beat-33": Beat33,
  "beat-34": Beat34,
  "beat-35": Beat35,
  "beat-36": Beat36,
  "beat-37": Beat37,
  "beat-38": Beat38,
  "beat-39": Beat39,
  "beat-40": Beat40,
  "beat-41": Beat41,
};

const cameras: readonly SceneCamera[] = ["push", "drift", "pull"];

export const NavigationPriveeScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const Component = beatComponents[scene.id];
  if (!Component) {
    throw new Error(`Unknown navigation privée scene "${scene.id}".`);
  }

  const beatNum = typeof scene.metadata?.beatNumber === "number" ? scene.metadata.beatNumber : 1;
  const camera = cameras[beatNum % cameras.length];

  return (
    <SceneShell camera={camera} intensity={0.5} grain vignette>
      <AbsoluteFill>
        <Component scene={scene} />
      </AbsoluteFill>
    </SceneShell>
  );
};
