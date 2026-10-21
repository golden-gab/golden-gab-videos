/**
 * Série `metiers-du-web` — « Les métiers du web ».
 *
 * Déclare les compositions Remotion de la série.
 * Ajoutée uniquement dans `src/series/index.ts` (règle 14).
 */

import React from "react";
import { Composition, Folder } from "remotion";

import { videoFormat } from "../../config/video";
import { getEpisodeDurationFrames } from "../../scenes";
import type { SeriesDefinition } from "../types";
import { aiEngineerEpisode } from "./episodes/c-est-quoi-un-ai-engineer/data/episode";
import { MetiersDuWebAiEngineerVideo } from "./episodes/c-est-quoi-un-ai-engineer/videos/metiers-du-web-ai-engineer";
import { softwareDeveloperEpisode } from "./episodes/software-developer/data/episode";
import { MetiersDuWebSoftwareDeveloperVideo } from "./episodes/software-developer/videos/metiers-du-web-software-developer";

export const METIERS_DU_WEB_ID = "metiers-du-web";

const aiEngineerDurationInFrames = getEpisodeDurationFrames(
  aiEngineerEpisode,
  videoFormat.fps,
);

const softwareDeveloperDurationInFrames = getEpisodeDurationFrames(
  softwareDeveloperEpisode,
  videoFormat.fps,
);

const MetiersDuWebFolder: React.FC = () => {
  return (
    <Folder name={METIERS_DU_WEB_ID}>
      <Composition
        id="metiers-du-web-ai-engineer"
        component={MetiersDuWebAiEngineerVideo}
        durationInFrames={aiEngineerDurationInFrames}
        fps={videoFormat.fps}
        width={videoFormat.width}
        height={videoFormat.height}
      />
      <Composition
        id="metiers-du-web-software-developer"
        component={MetiersDuWebSoftwareDeveloperVideo}
        durationInFrames={softwareDeveloperDurationInFrames}
        fps={videoFormat.fps}
        width={videoFormat.width}
        height={videoFormat.height}
      />
    </Folder>
  );
};

export const metiersDuWebSeries: SeriesDefinition = {
  id: METIERS_DU_WEB_ID,
  title: "Les métiers du web",
  description: "Les métiers du web et de la tech expliqués simplement, un épisode par métier.",
  Folder: MetiersDuWebFolder,
};
