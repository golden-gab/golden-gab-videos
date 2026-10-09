/**
 * Primitives partagées de la bibliothèque Motion Golden Gab.
 *
 * Elles ne sont pas des composants de contenu : elles centralisent les tokens,
 * le rythme (stagger), les traits animés, la coloration du code et le rendu des
 * extraits. Les composants de `src/components/motion/*` s'appuient dessus.
 */

export {
  accentBarWidth,
  defaultMotionAccent,
  getMotionCardStyle,
  getMotionSurface,
  motionAccents,
  resolveMotionAccent,
  type MotionAccent,
  type MotionCardStyleOptions,
  type MotionSurface,
  type MotionTone,
} from "./tokens";
export {
  getItemRevealDelay,
  getConnectorDelay,
  getStaggerDelay,
  getStaggerDelays,
} from "./stagger";
export {
  codeTokenColors,
  tokenizeLine,
  type CodeLanguage,
  type CodeToken,
  type CodeTokenType,
} from "./highlight";
export { CodeBlock, type CodeBlockProps, type CodeBlockVariant } from "./CodeBlock";
export {
  Connector,
  type ConnectorDirection,
  type ConnectorProps,
} from "./Connector";
export {
  AssetTreatment,
  type AssetTreatmentProps,
} from "./assetTreatment";
