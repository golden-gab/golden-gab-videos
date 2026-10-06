/**
 * Conversions temps <-> frames.
 *
 * Les données de contenu (captions, timings) sont exprimées en millisecondes
 * car elles viennent des outils de transcription. Remotion raisonne en frames :
 * toute conversion doit passer par ces helpers, avec le `fps` de la
 * composition (`useVideoConfig()`).
 */

/** Millisecondes -> frames (arrondi, utilisable par `<Sequence from>`). */
export const msToFrames = (ms: number, fps: number): number =>
  Math.round((ms / 1000) * fps);

/** Secondes -> frames (arrondi). */
export const secondsToFrames = (seconds: number, fps: number): number =>
  Math.round(seconds * fps);

/** Frames -> millisecondes. */
export const framesToMs = (frames: number, fps: number): number =>
  (frames / fps) * 1000;

/** Frames -> secondes. */
export const framesToSeconds = (frames: number, fps: number): number =>
  frames / fps;

/** Contraint une valeur dans un intervalle. */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/** Durée en frames d'un intervalle en millisecondes (au moins 1 frame). */
export const durationInFrames = (
  startMs: number,
  endMs: number,
  fps: number,
): number => Math.max(1, msToFrames(Math.max(0, endMs - startMs), fps));
