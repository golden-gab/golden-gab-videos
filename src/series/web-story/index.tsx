/**
 * Série `web-story`.
 *
 * Déclare les compositions Remotion de la série.
 * Ajoutée uniquement dans `src/series/index.ts` (règle 14).
 */

import React from "react";
import { Composition, Folder } from "remotion";

import { videoFormat } from "../../config/video";
import { getEpisodeDurationFrames } from "../../scenes";
import type { SeriesDefinition } from "../types";
import { webStoryEpisode } from "./data/episode";
import { WebStoryTuDorsDejaVideo } from "./videos/web-story-tu-dors-deja";

import { siteWebEpisode } from "./episodes/c-est-quoi-site-web/data/episode";
import { WebStorySiteWebVideo } from "./episodes/c-est-quoi-site-web/videos/web-story-c-est-quoi-site-web";

export const WEB_STORY_ID = "web-story";

const tuDorsDejaDurationInFrames = getEpisodeDurationFrames(
  webStoryEpisode,
  videoFormat.fps,
);

const siteWebDurationInFrames = getEpisodeDurationFrames(
  siteWebEpisode,
  videoFormat.fps,
);

const WebStoryFolder: React.FC = () => {
  return (
    <Folder name={WEB_STORY_ID}>
      <Composition
        id="web-story-tu-dors-deja"
        component={WebStoryTuDorsDejaVideo}
        durationInFrames={tuDorsDejaDurationInFrames}
        fps={videoFormat.fps}
        width={videoFormat.width}
        height={videoFormat.height}
      />
      <Composition
        id="web-story-c-est-quoi-site-web"
        component={WebStorySiteWebVideo}
        durationInFrames={siteWebDurationInFrames}
        fps={videoFormat.fps}
        width={videoFormat.width}
        height={videoFormat.height}
      />
    </Folder>
  );
};

export const webStorySeries: SeriesDefinition = {
  id: WEB_STORY_ID,
  title: "Web Story",
  description: "Histoires, concepts et fonctionnement du web expliqués simplement.",
  Folder: WebStoryFolder,
};
