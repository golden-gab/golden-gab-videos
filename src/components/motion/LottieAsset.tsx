/**
 * `<LottieAsset />` — joue une animation Lottie du manifeste (`kind: "lottie"`).
 *
 * Le fichier est lu via `libraryFile(id, "lottie")` (jamais de chemin en dur),
 * chargé une fois avec `delayRender`/`continueRender` pour que le rendu attende
 * les données, puis confié à `<Lottie>` de `@remotion/lottie`.
 *
 * ```tsx
 * <LottieAsset id="loading-dots" />
 * ```
 */

import React, { useEffect, useState } from "react";
import { Lottie, type LottieAnimationData } from "@remotion/lottie";
import { cancelRender, continueRender, delayRender } from "remotion";

import { libraryFile } from "../../config";

export type LottieAssetProps = {
  readonly id: string;
  readonly loop?: boolean;
  readonly playbackRate?: number;
  readonly style?: React.CSSProperties;
  readonly className?: string;
};

export const LottieAsset: React.FC<LottieAssetProps> = ({
  id,
  loop = true,
  playbackRate,
  style,
  className,
}) => {
  const url = libraryFile(id, "lottie");
  const [animationData, setAnimationData] = useState<LottieAnimationData | null>(
    null,
  );
  const [handle] = useState(() => delayRender(`Loading lottie "${id}"`));

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (cancelled) {
          return;
        }
        setAnimationData(data as LottieAnimationData);
        continueRender(handle);
      })
      .catch((error: unknown) => {
        cancelRender(
          error instanceof Error ? error : new Error(String(error)),
        );
      });

    return () => {
      cancelled = true;
    };
  }, [url, handle, id]);

  if (!animationData) {
    return null;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      playbackRate={playbackRate}
      style={style}
      className={className}
    />
  );
};
