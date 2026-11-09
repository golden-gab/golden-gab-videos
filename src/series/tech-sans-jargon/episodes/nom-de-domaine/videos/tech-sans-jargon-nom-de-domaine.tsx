/**
 * Vidéo « C'est quoi un nom de domaine ? » — Série La tech sans jargon, épisode 5
 *
 * 66 plans rythmés calés sur la narration de 78 secondes.
 * Assemble le fond de marque, l'audio, les scènes et les captions `highlight`.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { BrandBackground } from "../../../../../components/brand/BrandBackground";
import { EpisodeRenderer } from "../../../../../scenes";
import { nomDeDomaineEpisode } from "../data/episode";
import { NomDeDomaineScene } from "./nom-de-domaine-scene";

export const TechSansJargonNomDeDomaineVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" motif motifOpacity={0.12} bottomScrim />
      <EpisodeRenderer
        episode={nomDeDomaineEpisode}
        captions={{ style: "highlight" }}
        sceneShell={false}
        renderScene={(scene) => <NomDeDomaineScene scene={scene} />}
      />
    </AbsoluteFill>
  );
};
