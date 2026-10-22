/**
 * Série `tech-sans-jargon` — « La tech sans jargon ».
 *
 * Déclare les compositions Remotion de la série : la tech et les outils du
 * quotidien vulgarisés pour tout le monde (vrai ou faux, arnaques, mots
 * expliqués avec une image). Ajoutée uniquement dans `src/series/index.ts`
 * (règle 14).
 */

import React from "react";
import { Composition, Folder } from "remotion";

import { videoFormat } from "../../config/video";
import { getEpisodeDurationFrames } from "../../scenes";
import type { SeriesDefinition } from "../types";
import { navigationPriveeEpisode } from "./episodes/navigation-privee/data/episode";
import { TechSansJargonNavigationPriveeVideo } from "./episodes/navigation-privee/videos/tech-sans-jargon-navigation-privee";

export const TECH_SANS_JARGON_ID = "tech-sans-jargon";

const navigationPriveeDurationInFrames = getEpisodeDurationFrames(
  navigationPriveeEpisode,
  videoFormat.fps,
);

const TechSansJargonFolder: React.FC = () => {
  return (
    <Folder name={TECH_SANS_JARGON_ID}>
      <Composition
        id="tech-sans-jargon-navigation-privee"
        component={TechSansJargonNavigationPriveeVideo}
        durationInFrames={navigationPriveeDurationInFrames}
        fps={videoFormat.fps}
        width={videoFormat.width}
        height={videoFormat.height}
      />
    </Folder>
  );
};

export const techSansJargonSeries: SeriesDefinition = {
  id: TECH_SANS_JARGON_ID,
  title: "La tech sans jargon",
  description: "La tech et les outils du quotidien expliqués simplement, sans jargon, pour tout le monde.",
  Folder: TechSansJargonFolder,
};
