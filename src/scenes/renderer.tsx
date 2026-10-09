import React from "react";
import { Audio } from "@remotion/media";
import type { TransitionPresentationComponentProps } from "@remotion/transitions";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { Captions, type CaptionPosition, type CaptionStyleName } from "../captions";
import { MusicBed, Sfx } from "../components/audio";
import { SafeArea } from "../components/common/SafeArea";
import {
  SceneShell,
  sceneTransitionPresets,
  type SceneShellOptions,
} from "../components/motion";
import type { MotionTone } from "../components/motion/shared";
import { easings } from "../config/animation";
import { secondsToFrames } from "../utils/time";
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

type TransitionPresentationComponent = React.FC<
  TransitionPresentationComponentProps<Record<string, unknown>>
>;

// Les présentations purement CSS n'utilisent pas le pipeline de canevas.
const noopElementImage = () => undefined;
const noopUnmount = () => undefined;

/**
 * Applique la transition nommée d'une scène (`scene.transition.scene`) en entrée
 * **et** en sortie, en réutilisant les présentations de `@remotion/transitions`.
 * Sans preset, le rendu de la scène est strictement inchangé.
 */
const SceneTransitionFrame: React.FC<{
  readonly scene: Scene;
  readonly children: React.ReactNode;
}> = ({ scene, children }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const name = scene.transition?.scene;
  if (!name) {
    return <>{children}</>;
  }

  const preset = sceneTransitionPresets[name];
  const windowFrames = Math.max(1, secondsToFrames(preset.durationSeconds, fps));
  const enterProgress = interpolate(frame, [0, windowFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easings.entrance,
  });
  const exitStart = Math.max(0, durationInFrames - windowFrames);
  const exitProgress = interpolate(frame, [exitStart, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easings.exit,
  });

  const Presentation = preset.presentation.component as TransitionPresentationComponent;
  const sharedProps = {
    passedProps: preset.presentation.props,
    presentationDurationInFrames: windowFrames,
    onElementImage: noopElementImage,
    onUnmount: noopUnmount,
    bothEnteringAndExiting: false,
  };

  return (
    <Presentation
      presentationDirection="entering"
      presentationProgress={enterProgress}
      {...sharedProps}
    >
      <Presentation
        presentationDirection="exiting"
        presentationProgress={exitProgress}
        {...sharedProps}
      >
        {children}
      </Presentation>
    </Presentation>
  );
};

type SceneRendererComponentProps = SceneRendererProps & {
  readonly renderScene?: (scene: Scene) => React.ReactNode;
  /** Caméra/décor de scène ; `false` désactive `SceneShell`. */
  readonly sceneShell?: boolean | SceneShellOptions;
};

export const SceneRenderer: React.FC<SceneRendererComponentProps> = ({
  scene,
  tone,
  style,
  className,
  renderScene,
  sceneShell,
}) => {
  const { fps } = useVideoConfig();
  validateSceneTiming(scene, scene.id);

  const durationInFrames = getSceneDurationFrames(scene, fps);
  if (durationInFrames < 1) {
    throw new Error(`Scene "${scene.id}" is shorter than one frame at ${fps} fps.`);
  }

  const SceneComponent = renderScene ? undefined : resolveSceneComponent(scene);
  const shellOptions: SceneShellOptions | null =
    sceneShell === false
      ? null
      : sceneShell === true || sceneShell === undefined
        ? {}
        : sceneShell;

  const content = renderScene ? (
    renderScene(scene)
  ) : (
    <SafeArea>
      {SceneComponent ? (
        <SceneComponent
          scene={scene}
          tone={tone}
          style={style}
          className={className}
        />
      ) : null}
    </SafeArea>
  );

  return (
    <Sequence
      from={getSceneStartFrame(scene, fps)}
      durationInFrames={durationInFrames}
      premountFor={fps}
      name={scene.id}
    >
      <SceneTransitionFrame scene={scene}>
        {shellOptions ? (
          <SceneShell {...shellOptions}>{content}</SceneShell>
        ) : (
          content
        )}
      </SceneTransitionFrame>
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
  /** Optional per-video scene renderer; custom renderers own their safe-area layout. */
  readonly renderScene?: (scene: Scene) => React.ReactNode;
  readonly tone?: MotionTone;
  readonly style?: React.CSSProperties;
  /**
   * Caméra/décor appliqué à chaque scène (défaut : `SceneShell` en `drift`).
   * `false` désactive l'enveloppe ; un objet règle caméra, grain, vignette.
   */
  readonly sceneShell?: boolean | SceneShellOptions;
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
  renderScene,
  tone,
  style,
  sceneShell,
  captions,
}) => {
  const { fps } = useVideoConfig();
  const audioSrc = /^https?:\/\//i.test(episode.audio.src)
    ? episode.audio.src
    : staticFile(episode.audio.src);
  validateEpisode(episode, fps);
  // Le registry visuel dépend de React : sa vérification reste au niveau rendu.
  if (!renderScene) {
    episode.scenes.forEach((scene: Scene) => {
      resolveSceneComponent(scene);
    });
  }

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
      {episode.music ? (
        <MusicBed
          src={episode.music.src}
          transcript={episode.transcript}
          volume={episode.music.volume}
          duckTo={episode.music.duckTo}
        />
      ) : null}
      {episode.scenes.flatMap((scene) =>
        (scene.sfx ?? []).map((sfx, index) => {
          const at =
            "frame" in sfx.at
              ? getSceneStartFrame(scene, fps) + sfx.at.frame
              : secondsToFrames(
                  episode.transcript.segments[sfx.at.wordIndex].start,
                  fps,
                );

          return (
            <Sfx
              key={`${scene.id}-sfx-${index}`}
              name={sfx.name}
              at={at}
              volume={sfx.volume}
            />
          );
        }),
      )}
      {episode.scenes.map((scene) => (
        <SceneRenderer
          key={scene.id}
          scene={scene}
          tone={tone}
          renderScene={renderScene}
          sceneShell={sceneShell}
        />
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
