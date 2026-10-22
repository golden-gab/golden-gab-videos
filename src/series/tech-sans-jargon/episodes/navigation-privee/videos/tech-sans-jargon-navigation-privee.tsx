/**
 * Vidéo « Vrai ou faux : la navigation privée » — Série La tech sans jargon, épisode 1
 *
 * 41 plans rythmés calés sur la narration de 60 secondes.
 * Assemble le fond de marque, l'audio, les scènes et les captions `highlight`.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { BrandBackground } from "../../../../../components/brand/BrandBackground";
import { EpisodeRenderer } from "../../../../../scenes";
import { navigationPriveeEpisode } from "../data/episode";
import { NavigationPriveeScene } from "./navigation-privee-scene";

export const TechSansJargonNavigationPriveeVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" motif motifOpacity={0.12} bottomScrim />
      <EpisodeRenderer
        episode={navigationPriveeEpisode}
        captions={{ style: "highlight" }}
        sceneShell={false}
        renderScene={(scene) => <NavigationPriveeScene scene={scene} />}
      />
    </AbsoluteFill>
  );
};
