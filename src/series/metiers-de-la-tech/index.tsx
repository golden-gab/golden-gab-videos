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
import { Folder } from "remotion";

import type { SeriesDefinition } from "../types";

export const METIERS_DE_LA_TECH_ID = "metiers-de-la-tech";

/**
 * Dossier Remotion de la série.
 * Vide pour l'instant : cette tâche construit le socle, pas le contenu.
 * Exemple d'ajout :
 *
 * ```tsx
 * <Composition
 *   id="mdt-data-analyst"
 *   component={DataAnalyst}
 *   durationInFrames={1230}
 *   fps={videoFormat.fps}
 *   width={videoFormat.width}
 *   height={videoFormat.height}
 * />
 * ```
 */
const MetiersDeLaTechFolder: React.FC = () => {
  return <Folder name={METIERS_DE_LA_TECH_ID} />;
};

export const metiersDeLaTechSeries: SeriesDefinition = {
  id: METIERS_DE_LA_TECH_ID,
  title: "Métiers de la tech",
  description:
    "Vidéos courtes présentant un métier de la tech : missions, salaire, parcours.",
  Folder: MetiersDeLaTechFolder,
};
