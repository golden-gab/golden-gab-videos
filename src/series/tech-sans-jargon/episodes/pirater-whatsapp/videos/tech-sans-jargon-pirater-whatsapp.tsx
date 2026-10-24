/**
 * Vidéo « Comment pirater un compte WhatsApp en une minute ? » — Série La tech sans jargon, épisode 2
 *
 * 65 plans rythmés calés sur la narration de 78 secondes.
 * Assemble le fond de marque, l'audio, les scènes et les captions `highlight`.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { BrandBackground } from "../../../../../components/brand/BrandBackground";
import { EpisodeRenderer } from "../../../../../scenes";
import { piraterWhatsappEpisode } from "../data/episode";
import { PiraterWhatsappScene } from "./pirater-whatsapp-scene";

export const TechSansJargonPiraterWhatsappVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" motif motifOpacity={0.12} bottomScrim />
      <EpisodeRenderer
        episode={piraterWhatsappEpisode}
        captions={{ style: "highlight" }}
        sceneShell={false}
        renderScene={(scene) => <PiraterWhatsappScene scene={scene} />}
      />
    </AbsoluteFill>
  );
};
