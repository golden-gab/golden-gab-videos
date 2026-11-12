/**
 * Vidéo « Le faux message “tu as gagné un iPhone” » — Série La tech sans jargon, épisode 6
 *
 * 53 plans rythmés calés sur la narration de 65 secondes.
 * Assemble le fond de marque, l'audio, les scènes et les captions `highlight`.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { BrandBackground } from "../../../../../components/brand/BrandBackground";
import { EpisodeRenderer } from "../../../../../scenes";
import { phishingEpisode } from "../data/episode";
import { PhishingScene } from "./phishing-scene";

export const TechSansJargonPhishingVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" motif motifOpacity={0.12} bottomScrim />
      <EpisodeRenderer
        episode={phishingEpisode}
        captions={{ style: "highlight" }}
        sceneShell={false}
        renderScene={(scene) => <PhishingScene scene={scene} />}
      />
    </AbsoluteFill>
  );
};
