import React, { useMemo } from "react";
import { Audio } from "@remotion/media";
import { useCurrentFrame, useVideoConfig } from "remotion";

import { getDuckedMusicVolume, getSpeechIntervals } from "../../audio/music";
import type { Transcript } from "../../audio/types";
import { useAudioAsset } from "./use-audio-asset";

export type MusicBedProps = {
  /** Relative path inside public/, for example "audio/music/ambient.mp3". */
  readonly src: string;
  readonly transcript: Transcript;
  readonly volume?: number;
  readonly duckTo?: number;
};

export const MusicBed: React.FC<MusicBedProps> = ({
  src: file,
  transcript,
  volume = 0.14,
  duckTo = 0.045,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const source = useAudioAsset(
    [file],
    "music bed",
    `Music bed is missing. Add public/${file}; skipping it.`,
  );
  const intervals = useMemo(() => getSpeechIntervals(transcript), [transcript]);

  if (
    !Number.isFinite(volume) ||
    volume < 0 ||
    volume > 1 ||
    !Number.isFinite(duckTo) ||
    duckTo < 0 ||
    duckTo > volume
  ) {
    throw new Error(
      `MusicBed volume must be between 0 and 1, and duckTo between 0 and volume (received volume ${volume}, duckTo ${duckTo}).`,
    );
  }
  if (!source) {
    return null;
  }

  return (
    <Audio
      name="Music bed"
      src={source}
      loop
      volume={getDuckedMusicVolume(frame / fps, intervals, volume, duckTo)}
      premountFor={fps}
    />
  );
};
