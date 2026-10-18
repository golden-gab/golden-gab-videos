/**
 * Outils de montage promus depuis la vidéo « Data Analyst × mascotte » :
 * horloge calée sur les mots, prises de mascotte, plateau de captions,
 * icônes et effets. Importés par les séries ; ne connaissent aucune série.
 */

export { abs, band, H, lerp, rand, W } from "./geometry";
export {
  CaptionStage,
  getSceneLane,
  getStage,
  type Stage,
} from "./CaptionStage";
export { getWordOffset, normalizeWord } from "./words";
export { useWordClock, type Beat } from "./wordClock";
export { Appear } from "./Appear";
export { Icon, type IconKind } from "./icons";
export { TagPill } from "./TagPill";
export { Burst, Confetti, Magnifier, Shockwave, Sparkle } from "./effects";
export { MascotShot, type MascotShotProps } from "./MascotShot";
export { LibIcon, type LibIconProps } from "./LibIcon";
