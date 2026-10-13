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
import { CaptionStage, getSceneLane } from "./data-analyst-mascot-kit";
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
  /** Plan plein cadre : il gère lui-même sa place par rapport aux captions. */
  readonly fullBleed?: boolean;
};

const shots: Record<string, ShotPlan> = {
  hook: { Component: HookScene, camera: "push", fullBleed: true },
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

  const { Component, camera, fullBleed } = shot;

  return (
    <SceneShell camera={camera} intensity={0.6} grain vignette>
      <AbsoluteFill>
        {fullBleed ? (
          <Component scene={scene} />
        ) : (
          <CaptionStage lane={getSceneLane(scene)}>
            <Component scene={scene} />
          </CaptionStage>
        )}
      </AbsoluteFill>
    </SceneShell>
  );
};
