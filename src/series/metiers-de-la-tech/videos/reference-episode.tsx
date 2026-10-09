/**
 * Vidéo de l'épisode de référence `metiers-de-la-tech`.
 *
 * Elle ne contient aucune structure de scène : elle assemble le fond de marque
 * et l'`EpisodeRenderer`, qui valide l'épisode, joue la voix, place les scènes
 * sur la timeline et superpose les captions dérivées du transcript. Le contenu
 * vient entièrement de `../data/reference-episode`.
 *
 * Le fond bleu nuit et le shell de chaque scène gardent l'épisode dans la DA
 * Golden Gab ; les captions restent dérivées des mots du transcript.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { BrandBackground } from "../../../components/brand/BrandBackground";
import { EpisodeRenderer } from "../../../scenes";
import { referenceEpisode } from "../data/reference-episode";
import { ReferenceEpisodeScene } from "./reference-episode-scene";

export const ReferenceEpisodeVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" motif motifOpacity={0.12} bottomScrim />
      <EpisodeRenderer
        episode={referenceEpisode}
        captions={{ style: "highlight" }}
        sceneShell={{
          camera: "drift",
          intensity: 0.5,
          grain: true,
          vignette: true,
        }}
        renderScene={(scene) => <ReferenceEpisodeScene scene={scene} />}
      />
    </AbsoluteFill>
  );
};
