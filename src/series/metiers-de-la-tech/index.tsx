/**
 * Série `metiers-de-la-tech`.
 *
 * Ce fichier est le seul point d'entrée de la série : il déclare ses
 * compositions Remotion et son identité. Ajouter une vidéo =
 *  1. créer le composant dans `./videos/`
 *  2. ajouter un nœud `<Composition>` ci-dessous
 *
 * Les métadonnées restent écrites en clair sur chaque `<Composition>` pour
 * rester éditables dans le Studio (durée, dimensions, props par défaut).
 */

import React from "react";
import { Composition, Folder } from "remotion";

import { videoFormat } from "../../config/video";
import { getEpisodeDurationFrames } from "../../scenes";
import type { SeriesDefinition } from "../types";
import { referenceEpisode } from "./data/reference-episode";
import { ReferenceEpisodeVideo } from "./videos/reference-episode";

export const METIERS_DE_LA_TECH_ID = "metiers-de-la-tech";

/**
 * Durée de l'épisode de référence : celle de son audio (source de vérité),
 * convertie en frames. Volontairement dérivée de l'épisode plutôt qu'écrite en
 * dur, pour que le montage suive toujours la voix (voir RULES.md).
 */
const referenceEpisodeDurationInFrames = getEpisodeDurationFrames(
  referenceEpisode,
  videoFormat.fps,
);

/** Dossier Remotion de la série et ses compositions. */
const MetiersDeLaTechFolder: React.FC = () => {
  return (
    <Folder name={METIERS_DE_LA_TECH_ID}>
      <Composition
        id="mdt-data-analyst"
        component={ReferenceEpisodeVideo}
        durationInFrames={referenceEpisodeDurationInFrames}
        fps={videoFormat.fps}
        width={videoFormat.width}
        height={videoFormat.height}
      />
    </Folder>
  );
};

export const metiersDeLaTechSeries: SeriesDefinition = {
  id: METIERS_DE_LA_TECH_ID,
  title: "Métiers de la tech",
  description:
    "Vidéos courtes présentant un métier de la tech : missions, salaire, parcours.",
  Folder: MetiersDeLaTechFolder,
};
