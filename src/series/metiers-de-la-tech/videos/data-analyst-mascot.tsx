/**
 * Vidéo « Data Analyst × mascotte » : même voix que l'épisode de référence,
 * huit plans courts où la mascotte accompagne chaque idée.
 *
 * Elle assemble le fond de marque et l'`EpisodeRenderer` (validation, voix,
 * scènes, SFX, captions `highlight` dérivées du transcript). Chaque plan est
 * habillé par `DataAnalystMascotScene`, qui choisit son mouvement de caméra.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { BrandBackground } from "../../../components/brand/BrandBackground";
import { EpisodeRenderer } from "../../../scenes";
import { dataAnalystMascotEpisode } from "../data/data-analyst-mascot-episode";
import { DataAnalystMascotScene } from "./data-analyst-mascot-scene";

export const DataAnalystMascotVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" motif motifOpacity={0.12} bottomScrim />
      <EpisodeRenderer
        episode={dataAnalystMascotEpisode}
        captions={{ style: "highlight" }}
        sceneShell={false}
        renderScene={(scene) => <DataAnalystMascotScene scene={scene} />}
      />
    </AbsoluteFill>
  );
};
