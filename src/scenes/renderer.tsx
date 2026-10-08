import React from "react";
import { Sequence, useVideoConfig } from "remotion";

import type { MotionTone } from "../components/motion/shared";
import {
  getSceneDurationFrames,
  getSceneEndFrame,
  getSceneStartFrame,
  validateSceneTiming,
  type Episode,
  type Scene,
} from "./types";
import {
  resolveSceneComponent,
  sceneRegistry,
  type SceneRendererProps,
} from "./registry";

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  scene,
  tone,
  style,
  className,
}) => {
  const { fps } = useVideoConfig();
  validateSceneTiming(scene, scene.id);

  const durationInFrames = getSceneDurationFrames(scene, fps);
  if (durationInFrames < 1) {
    throw new Error(`Scene "${scene.id}" is shorter than one frame at ${fps} fps.`);
  }

  const SceneComponent = resolveSceneComponent(scene);

  return (
    <Sequence
      from={getSceneStartFrame(scene, fps)}
      durationInFrames={durationInFrames}
      premountFor={fps}
      name={scene.id}
    >
      <SceneComponent
        scene={scene}
        tone={tone}
        style={style}
        className={className}
      />
    </Sequence>
  );
};

export type EpisodeRendererProps = {
  readonly episode: Episode;
  readonly tone?: MotionTone;
  readonly style?: React.CSSProperties;
};

export const getEpisodeDurationFrames = (
  episode: Pick<Episode, "scenes">,
  fps: number,
): number => {
  if (!Number.isFinite(fps) || fps <= 0) {
    throw new Error(
      `Episode duration requires a positive fps; received ${fps}.`,
    );
  }

  return episode.scenes.reduce((duration, scene) => {
    validateSceneTiming(scene, scene.id);
    const endFrame = getSceneEndFrame(scene, fps);
    if (endFrame <= getSceneStartFrame(scene, fps)) {
      throw new Error(`Scene "${scene.id}" is shorter than one frame at ${fps} fps.`);
    }
    return Math.max(duration, endFrame);
  }, 0);
};

export const validateEpisode = (episode: Episode, fps: number): void => {
  if (!episode || typeof episode !== "object") {
    throw new Error("Episode must be an object.");
  }
  if (!Number.isFinite(fps) || fps <= 0) {
    throw new Error(
      `Episode validation requires a positive fps; received ${fps}.`,
    );
  }
  if (typeof episode.id !== "string" || !episode.id.trim()) {
    throw new Error("Episode id must not be empty.");
  }
  if (typeof episode.title !== "string" || !episode.title.trim()) {
    throw new Error(`Episode "${episode.id}" must have a title.`);
  }
  if (!Array.isArray(episode.scenes) || episode.scenes.length === 0) {
    throw new Error(`Episode "${episode.id}" must contain at least one scene.`);
  }

  const sceneIds: string[] = [];
  let previousStart = -1;
  let previousEnd = 0;

  episode.scenes.forEach((scene) => {
    if (!scene || typeof scene !== "object") {
      throw new Error(`Episode "${episode.id}" contains an invalid scene.`);
    }
    if (typeof scene.id !== "string" || !scene.id.trim()) {
      throw new Error(
        `Episode "${episode.id}" contains a scene with an empty id.`,
      );
    }
    if (sceneIds.indexOf(scene.id) !== -1) {
      throw new Error(
        `Episode "${episode.id}" contains duplicate scene id "${scene.id}".`,
      );
    }
    sceneIds.push(scene.id);

    if (
      typeof scene.type !== "string" ||
      Object.keys(sceneRegistry).indexOf(scene.type) === -1
    ) {
      throw new Error(
        `Episode "${episode.id}", scene "${scene.id}" has an unknown narrative type.`,
      );
    }

    validateSceneTiming(scene, `Episode "${episode.id}", scene "${scene.id}"`);
    if (scene.start < previousStart) {
      throw new Error(
        `Episode "${episode.id}" scenes must be ordered by ascending start time; "${scene.id}" is out of order.`,
      );
    }
    if (scene.start < previousEnd) {
      throw new Error(
        `Episode "${episode.id}" has overlapping scenes at "${scene.id}". Scene overlaps are unsupported until transitions are implemented.`,
      );
    }

    if (getSceneDurationFrames(scene, fps) < 1) {
      throw new Error(
        `Scene "${scene.id}" is shorter than one frame at ${fps} fps.`,
      );
    }

    if (
      !scene.visual ||
      typeof scene.visual !== "object" ||
      typeof scene.visual.component !== "string" ||
      !scene.visual.component.trim()
    ) {
      throw new Error(
        `Scene "${scene.id}" must define a visual component name.`,
      );
    }
    validateSceneProps(scene);
    resolveSceneComponent(scene);
    previousStart = scene.start;
    previousEnd = scene.end;
  });
};

const validateSceneProps = (scene: Scene): void => {
  const props = scene.visual.props;
  if (
    props !== undefined &&
    (typeof props !== "object" || props === null || Array.isArray(props))
  ) {
    throw new Error(
      `Scene "${scene.id}" visual props must be an object when provided.`,
    );
  }
};

export const EpisodeRenderer: React.FC<EpisodeRendererProps> = ({
  episode,
  tone,
  style,
}) => {
  const { fps } = useVideoConfig();
  validateEpisode(episode, fps);

  return (
    <div style={style}>
      {episode.scenes.map((scene) => (
        <SceneRenderer key={scene.id} scene={scene} tone={tone} />
      ))}
    </div>
  );
};
