/**
 * Aiguillage des plans du montage « Data Analyst × mascotte ».
 *
 * Chaque scène de l'épisode (`../data/data-analyst-mascot-episode`) est
 * habillée ici de son propre mouvement de caméra (`SceneShell`) : le montage
 * alterne poussées, reculs et dérives pour que deux plans voisins ne bougent
 * jamais de la même façon.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { SceneShell, type SceneCamera } from "../../../components/motion";
import type { Scene } from "../../../scenes/types";
import {
  BehaviorScene,
  ConclusionScene,
  DecisionScene,
  NumbersScene,
  TrendScene,
} from "./data-analyst-mascot-analysis";
import {
  HookScene,
  RoleScene,
  TransformScene,
} from "./data-analyst-mascot-intro";

type ShotPlan = {
  readonly Component: React.FC<{ readonly scene: Scene }>;
  readonly camera: SceneCamera;
};

const shots: Record<string, ShotPlan> = {
  hook: { Component: HookScene, camera: "push" },
  role: { Component: RoleScene, camera: "pull" },
  transform: { Component: TransformScene, camera: "drift" },
  trend: { Component: TrendScene, camera: "push" },
  behavior: { Component: BehaviorScene, camera: "pull" },
  decision: { Component: DecisionScene, camera: "drift" },
  numbers: { Component: NumbersScene, camera: "push" },
  conclusion: { Component: ConclusionScene, camera: "pull" },
};

export const DataAnalystMascotScene: React.FC<{ readonly scene: Scene }> = ({
  scene,
}) => {
  const shot = shots[scene.id];

  if (!shot) {
    throw new Error(`Unknown Data Analyst mascot scene "${scene.id}".`);
  }

  const { Component, camera } = shot;

  return (
    <SceneShell camera={camera} intensity={0.6} grain vignette>
      <AbsoluteFill>
        <Component scene={scene} />
      </AbsoluteFill>
    </SceneShell>
  );
};
