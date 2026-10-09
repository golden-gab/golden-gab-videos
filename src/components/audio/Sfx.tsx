import React from "react";
import { Audio } from "@remotion/media";
import { useVideoConfig } from "remotion";

import { sfxManifest, type SfxName } from "../../audio/sfx.manifest";
import { useAudioAsset } from "./use-audio-asset";

export type SfxProps = {
  readonly name: SfxName;
  /** Absolute frame in the current composition timeline. */
  readonly at: number;
  readonly volume?: number;
};

export const Sfx: React.FC<SfxProps> = ({ name, at, volume }) => {
  const { fps } = useVideoConfig();
  const { file, alternateFile, volume: defaultVolume } = sfxManifest[name];
  const files = [file, alternateFile];
  const src = useAudioAsset(
    files,
    `SFX "${name}"`,
    `SFX "${name}" is missing. Add public/${file} or public/${alternateFile}; skipping it.`,
  );

  if (!src) {
    return null;
  }
  const resolvedVolume = volume ?? defaultVolume;
  if (!Number.isFinite(resolvedVolume) || resolvedVolume < 0 || resolvedVolume > 1) {
    throw new Error(`SFX "${name}" volume must be between 0 and 1.`);
  }

  return (
    <Audio
      name={`SFX · ${name}`}
      src={src}
      from={at}
      volume={resolvedVolume}
      premountFor={fps}
    />
  );
};
