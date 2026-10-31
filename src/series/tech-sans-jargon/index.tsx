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
import { cacheEpisode } from "./episodes/cache/data/episode";
import { designSystemEpisode } from "./episodes/design-system-vs-system-design/data/episode";
import { TechSansJargonDesignSystemVideo } from "./episodes/design-system-vs-system-design/videos/tech-sans-jargon-design-system-vs-system-design";
import { TechSansJargonCacheVideo } from "./episodes/cache/videos/tech-sans-jargon-cache";
import { navigationPriveeEpisode } from "./episodes/navigation-privee/data/episode";
import { TechSansJargonNavigationPriveeVideo } from "./episodes/navigation-privee/videos/tech-sans-jargon-navigation-privee";
import { piraterWhatsappEpisode } from "./episodes/pirater-whatsapp/data/episode";
import { TechSansJargonPiraterWhatsappVideo } from "./episodes/pirater-whatsapp/videos/tech-sans-jargon-pirater-whatsapp";

export const TECH_SANS_JARGON_ID = "tech-sans-jargon";

const navigationPriveeDurationInFrames = getEpisodeDurationFrames(
  navigationPriveeEpisode,
  videoFormat.fps,
);

const piraterWhatsappDurationInFrames = getEpisodeDurationFrames(
  piraterWhatsappEpisode,
  videoFormat.fps,
);

const cacheDurationInFrames = getEpisodeDurationFrames(cacheEpisode, videoFormat.fps);

const designSystemDurationInFrames = getEpisodeDurationFrames(designSystemEpisode, videoFormat.fps);

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
      <Composition
        id="tech-sans-jargon-pirater-whatsapp"
        component={TechSansJargonPiraterWhatsappVideo}
        durationInFrames={piraterWhatsappDurationInFrames}
        fps={videoFormat.fps}
        width={videoFormat.width}
        height={videoFormat.height}
      />
      <Composition
        id="tech-sans-jargon-cache"
        component={TechSansJargonCacheVideo}
        durationInFrames={cacheDurationInFrames}
        fps={videoFormat.fps}
        width={videoFormat.width}
        height={videoFormat.height}
      />
      <Composition
        id="tech-sans-jargon-design-system-vs-system-design"
        component={TechSansJargonDesignSystemVideo}
        durationInFrames={designSystemDurationInFrames}
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
