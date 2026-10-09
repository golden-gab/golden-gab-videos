/**
 * `<SceneShell />` — enveloppe de scène : **caméra lente**, **profondeur**,
 * **grain** et **vignette**, entièrement pilotés par les données.
 *
 * Objectif : qu'une scène « bouge » sans recoder un zoom ou un parallaxe à la
 * main. C'est un composant de la bibliothèque Motion (règle 50) : couleurs et
 * espacements viennent des tokens (`shared/tokens.ts`), les courbes de
 * `src/config/animation.ts` (aucune nouvelle courbe), et les dimensions de la
 * composition de `useVideoConfig()` (jamais de nombre en dur).
 *
 * ```tsx
 * <SceneShell camera="push" grain vignette>
 *   <ParallaxLayer depth={-0.4}>
 *     <BrandText role="label">arrière-plan</BrandText>
 *   </ParallaxLayer>
 *   <ParallaxLayer depth={0.5}>{contenu}</ParallaxLayer>
 * </SceneShell>
 * ```
 */

import React, { createContext, useContext, useMemo } from "react";
import { noise2D } from "@remotion/noise";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { easings, radius, spacing } from "../../config";
import { withAlpha } from "../../utils/color";
import { resolveMotionAccent } from "./shared/tokens";

/** Mouvement de caméra d'une scène. `none` ne déplace rien. */
export type SceneCamera = "push" | "pull" | "drift" | "none";

/**
 * Amplitude du zoom, en fraction d'échelle, à `intensity = 1`. Lent par
 * construction : la caméra ne parcourt toute son amplitude qu'en une scène.
 */
const cameraZoom = 0.08;

/** Amplitude du panoramique `drift`, en pixels, à `intensity = 1`. */
const cameraDrift = spacing.xl;

/** Amplitude de base d'un `ParallaxLayer` de `depth = 1`, à `intensity = 1`. */
const parallaxBase = spacing.xxl;

/** Nombre de grains dessinés par la couche de grain. */
const grainSpecks = 150;

/** Vitesse d'apparition/disparition des grains (facteur de bruit, pas une durée). */
const grainFlickerRate = 0.4;

export type SceneShellProps = {
  readonly camera?: SceneCamera;
  /** Facteur d'amplitude (1 = amplitude par défaut). 0 = aucune caméra. */
  readonly intensity?: number;
  readonly grain?: boolean;
  readonly vignette?: boolean;
  readonly style?: React.CSSProperties;
  readonly className?: string;
  readonly children: React.ReactNode;
};

/** Réglages de `SceneShell`, sans son contenu (pour le rendu d'épisode). */
export type SceneShellOptions = Omit<SceneShellProps, "children">;

type SceneShellCamera = {
  readonly progress: number;
  readonly intensity: number;
  readonly camera: SceneCamera;
};

/** Hors `SceneShell`, le parallaxe est neutre (progression 0, amplitude 0). */
const defaultSceneShellCamera: SceneShellCamera = {
  progress: 0.5,
  intensity: 0,
  camera: "none",
};

const SceneShellContext = createContext<SceneShellCamera>(
  defaultSceneShellCamera,
);

/** Transform de la caméra, calculé sur la progression de la scène. */
const getCameraTransform = (
  camera: SceneCamera,
  progress: number,
  intensity: number,
): string => {
  const amount = intensity > 0 ? intensity : 0;

  switch (camera) {
    case "push":
      return `scale(${1 + cameraZoom * amount * progress})`;
    case "pull":
      return `scale(${1 + cameraZoom * amount * (1 - progress)})`;
    case "drift":
      return `translate3d(${(progress - 0.5) * cameraDrift * amount}px, 0px, 0px) scale(${
        1 + cameraZoom * 0.5 * amount * progress
      })`;
    case "none":
      return "none";
  }
};

/** Couche de grain : des points fixes dont l'intensité scintille avec le temps. */
const SceneGrain: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  // Le neutre chaud reste perceptible sur fond clair comme sur fond sombre.
  const color = resolveMotionAccent("neutral");

  const specks = useMemo(() => {
    const items: { readonly key: number; readonly x: number; readonly y: number }[] =
      [];
    for (let index = 0; index < grainSpecks; index += 1) {
      items.push({
        key: index,
        x: ((noise2D("gg-grain-x", index, 0.5) + 1) / 2) * width,
        y: ((noise2D("gg-grain-y", index, 0.5) + 1) / 2) * height,
      });
    }
    return items;
  }, [width, height]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay" }}>
      {specks.map((speck) => {
        const flicker =
          (noise2D("gg-grain-f", speck.key, frame * grainFlickerRate) + 1) / 2;
        return (
          <span
            key={speck.key}
            style={{
              position: "absolute",
              left: speck.x,
              top: speck.y,
              width: spacing.xs * 0.5,
              height: spacing.xs * 0.5,
              borderRadius: radius.pill,
              backgroundColor: color,
              opacity: 0.04 + flicker * 0.06,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Vignette discrète : ombrage interne des bords (pas de `background-image`). */
const SceneVignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      boxShadow: `inset 0 0 ${spacing.xxxl * 2}px ${withAlpha(
        resolveMotionAccent("ink"),
        0.28,
      )}`,
    }}
  />
);

export const SceneShell: React.FC<SceneShellProps> = ({
  camera = "drift",
  intensity = 1,
  grain = false,
  vignette = false,
  style,
  className,
  children,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Progression linéaire sur toute la durée de la scène : la caméra avance
  // doucement du premier au dernier frame (pas de `durations` : c'est la
  // scène entière qui pilote le zoom).
  const progress = interpolate(
    frame,
    [0, Math.max(1, durationInFrames - 1)],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easings.linear,
    },
  );

  const value = useMemo<SceneShellCamera>(
    () => ({ progress, intensity, camera }),
    [progress, intensity, camera],
  );

  return (
    <SceneShellContext.Provider value={value}>
      <AbsoluteFill className={className} style={{ overflow: "hidden", ...style }}>
        <AbsoluteFill
          style={{ transform: getCameraTransform(camera, progress, intensity) }}
        >
          {children}
        </AbsoluteFill>
        {grain ? <SceneGrain /> : null}
        {vignette ? <SceneVignette /> : null}
      </AbsoluteFill>
    </SceneShellContext.Provider>
  );
};

export type ParallaxLayerProps = {
  /**
   * Profondeur du calque. Positif = plus rapide (proche), négatif = plus lent
   * (lointain), 0 = immobile. Valeur type : -1 à 1.
   */
  readonly depth?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
  readonly children: React.ReactNode;
};

/**
 * `<ParallaxLayer />` — calque qui se déplace à une vitesse propre, en fonction
 * de la progression de la `SceneShell` parente. Sans parent, il reste immobile.
 */
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  depth = 0.5,
  style,
  className,
  children,
}) => {
  const { progress, intensity, camera } = useContext(SceneShellContext);
  const offset =
    camera === "none" ? 0 : (progress - 0.5) * depth * parallaxBase * intensity;

  return (
    <div
      className={className}
      style={{ transform: `translate3d(${offset}px, 0px, 0px)`, ...style }}
    >
      {children}
    </div>
  );
};
