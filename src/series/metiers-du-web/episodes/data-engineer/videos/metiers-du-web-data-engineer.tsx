/**
 * Vidéo « Data Engineer » — Série Les métiers du web, épisode 3
 *
 * 39 plans rythmés calés sur la narration de 48 secondes.
 * Assemble le fond de marque, l'audio, les scènes et les captions `highlight`.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { BrandBackground } from "../../../../../components/brand/BrandBackground";
import { EpisodeRenderer } from "../../../../../scenes";
import { dataEngineerEpisode } from "../data/episode";
import { DataEngineerScene } from "./data-engineer-scene";

export const MetiersDuWebDataEngineerVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" motif motifOpacity={0.12} bottomScrim />
      <EpisodeRenderer
        episode={dataEngineerEpisode}
        captions={{ style: "highlight" }}
        sceneShell={false}
        renderScene={(scene) => <DataEngineerScene scene={scene} />}
      />
    </AbsoluteFill>
  );
};
