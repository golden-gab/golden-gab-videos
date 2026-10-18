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
import { WebStorySiteWebVideo } from "./videos/web-story-c-est-quoi-site-web";

export const WEB_STORY_ID = "web-story";

const durationInFrames = getEpisodeDurationFrames(
  webStoryEpisode,
  videoFormat.fps,
);

const WebStoryFolder: React.FC = () => {
  return (
    <Folder name={WEB_STORY_ID}>
      <Composition
        id="web-story-c-est-quoi-site-web"
        component={WebStorySiteWebVideo}
        durationInFrames={durationInFrames}
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
