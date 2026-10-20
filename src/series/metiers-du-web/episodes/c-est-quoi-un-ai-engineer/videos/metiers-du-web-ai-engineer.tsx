/**
 * Vidéo « C'est quoi un AI engineer » — Série Les métiers du web, épisode 1
 *
 * 27 plans rythmés calés sur la narration de 46 secondes.
 * Assemble le fond de marque, l'audio, les scènes et les captions `highlight`.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { BrandBackground } from "../../../../../components/brand/BrandBackground";
import { EpisodeRenderer } from "../../../../../scenes";
import { aiEngineerEpisode } from "../data/episode";
import { AiEngineerScene } from "./ai-engineer-scene";

export const MetiersDuWebAiEngineerVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" motif motifOpacity={0.12} bottomScrim />
      <EpisodeRenderer
        episode={aiEngineerEpisode}
        captions={{ style: "highlight" }}
        sceneShell={false}
        renderScene={(scene) => <AiEngineerScene scene={scene} />}
      />
    </AbsoluteFill>
  );
};
