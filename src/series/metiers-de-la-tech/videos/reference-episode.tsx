/**
 * Vidéo de l'épisode de référence `metiers-de-la-tech`.
 *
 * Elle ne contient aucune structure de scène : elle assemble le fond de marque
 * et l'`EpisodeRenderer`, qui valide l'épisode, joue la voix, place les scènes
 * sur la timeline et superpose les captions dérivées du transcript. Le contenu
 * vient entièrement de `../data/reference-episode`.
 *
 * Le fond est clair (comme l'intro/outro) et porte un `bottomScrim` : les
 * captions blanches restent lisibles en bas de l'écran.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { BrandBackground } from "../../../components/brand/BrandBackground";
import { EpisodeRenderer } from "../../../scenes";
import { referenceEpisode } from "../data/reference-episode";
import { ReferenceEpisodeScene } from "./reference-episode-scene";

export const ReferenceEpisodeVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <BrandBackground variant="light" motif motifOpacity={0.35} bottomScrim />
      <EpisodeRenderer
        episode={referenceEpisode}
        captions={{ style: "highlight" }}
        renderScene={(scene) => <ReferenceEpisodeScene scene={scene} />}
      />
    </AbsoluteFill>
  );
};
