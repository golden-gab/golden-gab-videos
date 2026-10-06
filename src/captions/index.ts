/**
 * Système de captions Golden Gab.
 *
 * Point d'entrée public :
 *   - `<Captions />`      le composant réutilisable
 *   - `captionStyles`     les presets de style disponibles
 *   - `fromRemotionCaptions` adaptateur depuis le pipeline Whisper
 *   - les types du modèle de données
 */

export { Captions, type CaptionsProps } from "./Captions";
export { CaptionPage, type CaptionPageProps } from "./CaptionPage";
export {
  buildCaptionPages,
  defaultPagingOptions,
  resolveSegmentWords,
  type CaptionPagingOptions,
} from "./pages";
export {
  captionStyles,
  resolveCaptionStyle,
  type CaptionEmphasisMode,
  type CaptionStyleName,
  type CaptionStyleOverrides,
  type CaptionStylePreset,
} from "./styles";
export {
  defaultFromRemotionCaptionsOptions,
  fromRemotionCaptions,
  type FromRemotionCaptionsOptions,
} from "./from-caption";
export type {
  CaptionPage as CaptionPageModel,
  CaptionPosition,
  CaptionSegment,
  CaptionToken,
  CaptionWord,
} from "./types";
