import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";

import { Captions, type CaptionPosition, type CaptionStyleName } from "../captions";
import { SafeArea } from "../components/common/SafeArea";
import type { MotionTone } from "../components/motion/shared";
import {
  getEpisodeCaptions,
  validateEpisode,
} from "./episode";
import {
  getSceneDurationFrames,
  getSceneStartFrame,
  validateSceneTiming,
  type Episode,
  type Scene,
} from "./types";
import {
  resolveSceneComponent,
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
      {/* Les composants Motion ne dessinent ni fond ni plein-cadre : la scène
          les centre dans la zone sûre (le fond vient de la composition). */}
      <SafeArea>
        <SceneComponent
          scene={scene}
          tone={tone}
          style={style}
          className={className}
        />
      </SafeArea>
    </Sequence>
  );
};

/** Réglages des captions construites depuis le transcript de l'épisode. */
export type EpisodeCaptionsOptions = {
  readonly style?: CaptionStyleName;
  readonly position?: CaptionPosition;
  readonly offsetY?: number;
};

export type EpisodeRendererProps = {
  readonly episode: Episode;
  readonly tone?: MotionTone;
  readonly style?: React.CSSProperties;
  /**
   * Affiche les captions du transcript au-dessus des scènes.
   * `true` pour les réglages par défaut, ou un objet pour les paramétrer.
   */
  readonly captions?: boolean | EpisodeCaptionsOptions;
};

/**
 * Point d'entrée du rendu d'un épisode : valide l'épisode (audio + transcript +
 * scènes), place chaque scène sur la timeline, puis superpose les captions
 * dérivées du transcript. C'est ici que se fait le branchement
 * `Transcript → Captions`, sans que les scènes aient à s'en occuper.
 */
export const EpisodeRenderer: React.FC<EpisodeRendererProps> = ({
  episode,
  tone,
  style,
  captions,
}) => {
  const { fps } = useVideoConfig();
  const audioSrc = /^https?:\/\//i.test(episode.audio.src)
    ? episode.audio.src
    : staticFile(episode.audio.src);
  validateEpisode(episode, fps);
  // Le registry visuel dépend de React : sa vérification reste au niveau rendu.
  episode.scenes.forEach((scene: Scene) => {
    resolveSceneComponent(scene);
  });

  const captionsEnabled =
    captions === true || (typeof captions === "object" && captions !== null);
  const captionsOptions: EpisodeCaptionsOptions =
    typeof captions === "object" && captions !== null ? captions : {};

  return (
    <AbsoluteFill style={style}>
      <Audio
        name={episode.audio.id ?? "Episode narration"}
        src={audioSrc}
        premountFor={fps}
      />
      {episode.scenes.map((scene) => (
        <SceneRenderer key={scene.id} scene={scene} tone={tone} />
      ))}
      {captionsEnabled ? (
        <Captions
          segments={getEpisodeCaptions(episode)}
          style={captionsOptions.style}
          position={captionsOptions.position}
          offsetY={captionsOptions.offsetY}
        />
      ) : null}
    </AbsoluteFill>
  );
};
