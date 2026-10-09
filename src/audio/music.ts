import type { Transcript } from "./types";

export type SpeechInterval = {
  readonly start: number;
  readonly end: number;
};

const DEFAULT_MERGE_GAP_SECONDS = 0.12;
const DEFAULT_FADE_SECONDS = 0.12;

/** Coalesce word segments separated only by short inter-word gaps. */
export const getSpeechIntervals = (
  transcript: Transcript,
  mergeGapSeconds = DEFAULT_MERGE_GAP_SECONDS,
): SpeechInterval[] => {
  const intervals: SpeechInterval[] = [];

  transcript.segments.forEach(({ start, end }) => {
    const previous = intervals[intervals.length - 1];
    if (previous && start - previous.end <= mergeGapSeconds) {
      intervals[intervals.length - 1] = {
        start: previous.start,
        end: Math.max(previous.end, end),
      };
      return;
    }
    intervals.push({ start, end });
  });

  return intervals;
};

/** Music is ducked while a speech interval is active, with short boundary fades. */
export const getDuckedMusicVolume = (
  time: number,
  intervals: readonly SpeechInterval[],
  volume: number,
  duckTo: number,
  fadeSeconds = DEFAULT_FADE_SECONDS,
): number => {
  for (const interval of intervals) {
    if (time < interval.start - fadeSeconds) {
      return volume;
    }
    if (time < interval.start) {
      const progress = (time - (interval.start - fadeSeconds)) / fadeSeconds;
      return volume + (duckTo - volume) * progress;
    }
    if (time <= interval.end) {
      return duckTo;
    }
    if (time < interval.end + fadeSeconds) {
      const progress = (time - interval.end) / fadeSeconds;
      return duckTo + (volume - duckTo) * progress;
    }
  }

  return volume;
};
