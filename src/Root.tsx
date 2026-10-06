import "./index.css";
import React from "react";
import { Composition, Folder, staticFile } from "remotion";

import {
  CaptionedVideo,
  calculateCaptionedVideoMetadata,
  captionedVideoSchema,
} from "./CaptionedVideo";
import { GoldenGabCompositions } from "./compositions";
import { videoFormat } from "./config";

/**
 * Racine Remotion.
 *
 * Convention : les compositions Golden Gab sont déclarées dans leur propre
 * dossier/série, jamais ici. `Root` ne monte que `GoldenGabCompositions`
 * (styleguide + toutes les séries) et le template d'origine conservé
 * comme référence.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <GoldenGabCompositions />

      <Folder name="Templates">
        <Composition
          id="CaptionedVideo"
          component={CaptionedVideo}
          calculateMetadata={calculateCaptionedVideoMetadata}
          schema={captionedVideoSchema}
          width={videoFormat.width}
          height={videoFormat.height}
          defaultProps={{
            src: staticFile("sample-video.mp4"),
          }}
        />
      </Folder>
    </>
  );
};
