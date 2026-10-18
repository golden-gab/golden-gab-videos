/**
 * Vidéo « C'est quoi un site web » (Tu dors déjà) — Série Web Story
 *
 * 30 plans rythmés calés sur la narration de 74,5 secondes.
 * Assemble le fond de marque, l'audio, les scènes et les captions `highlight`.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { BrandBackground } from "../../../components/brand/BrandBackground";
import { EpisodeRenderer } from "../../../scenes";
import { webStoryEpisode } from "../data/episode";
import { WebStoryScene } from "./web-story-scene";

export const WebStorySiteWebVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" motif motifOpacity={0.12} bottomScrim />
      <EpisodeRenderer
        episode={webStoryEpisode}
        captions={{ style: "highlight" }}
        sceneShell={false}
        renderScene={(scene) => <WebStoryScene scene={scene} />}
      />
    </AbsoluteFill>
  );
};
