import { useEffect, useMemo, useRef, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";

type AudioAssetResult = {
  readonly key: string;
  readonly src: string | null;
};

const warnedAssets = new Set<string>();

const warnOnce = (key: string, message: string): void => {
  if (warnedAssets.has(key)) {
    return;
  }
  warnedAssets.add(key);
  console.warn(message);
};

export const useAudioAsset = (
  files: readonly string[],
  label: string,
  missingMessage: string,
): string | null => {
  const key = files.join("\n");
  const handle = useMemo(
    () => delayRender(`Checking audio asset: ${label}`),
    [label],
  );
  const [result, setResult] = useState<AudioAssetResult | null>(null);
  const checkedKey = useRef<string | null>(null);

  useEffect(() => {
    if (checkedKey.current === key) {
      return;
    }
    checkedKey.current = key;

    const resolveAsset = async (): Promise<void> => {
      let requestError: unknown;

      for (const file of key.split("\n")) {
        const src = staticFile(file);
        try {
          const response = await fetch(src, { method: "HEAD" });
          if (response.ok) {
            setResult({ key, src });
            continueRender(handle);
            return;
          }
          if (response.status !== 404) {
            requestError = new Error(`HTTP ${response.status} for ${file}`);
          }
        } catch (error) {
          requestError = error;
        }
      }

      warnOnce(
        key,
        requestError
          ? `${missingMessage} Audio file check failed: ${String(requestError)}`
          : missingMessage,
      );
      setResult({ key, src: null });
      continueRender(handle);
    };

    void resolveAsset();
  }, [handle, key, missingMessage]);

  return result?.key === key ? result.src : null;
};
