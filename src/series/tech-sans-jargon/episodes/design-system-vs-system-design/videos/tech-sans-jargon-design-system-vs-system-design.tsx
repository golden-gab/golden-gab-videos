/**
 * Vidéo « Design System ou System Design ? » — Série La tech sans jargon, épisode 4
 *
 * 59 plans rythmés calés sur la narration de 71 secondes.
 * Assemble le fond de marque, l'audio, les scènes et les captions `highlight`.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { BrandBackground } from "../../../../../components/brand/BrandBackground";
import { EpisodeRenderer } from "../../../../../scenes";
import { designSystemEpisode } from "../data/episode";
import { DesignSystemScene } from "./design-system-scene";

export const TechSansJargonDesignSystemVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" motif motifOpacity={0.12} bottomScrim />
      <EpisodeRenderer
        episode={designSystemEpisode}
        captions={{ style: "highlight" }}
        sceneShell={false}
        renderScene={(scene) => <DesignSystemScene scene={scene} />}
      />
    </AbsoluteFill>
  );
};
