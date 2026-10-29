/**
 * Vidéo « C'est quoi le cache ? » — Série La tech sans jargon, épisode 3
 *
 * 54 plans rythmés calés sur la narration de 63,8 secondes.
 * Assemble le fond de marque, l'audio, les scènes et les captions `highlight`.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { BrandBackground } from "../../../../../components/brand/BrandBackground";
import { EpisodeRenderer } from "../../../../../scenes";
import { cacheEpisode } from "../data/episode";
import { CacheScene } from "./cache-scene";

export const TechSansJargonCacheVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" motif motifOpacity={0.12} bottomScrim />
      <EpisodeRenderer
        episode={cacheEpisode}
        captions={{ style: "highlight" }}
        sceneShell={false}
        renderScene={(scene) => <CacheScene scene={scene} />}
      />
    </AbsoluteFill>
  );
};
