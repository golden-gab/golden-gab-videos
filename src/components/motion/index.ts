/**
 * BIBLIOTHÈQUE MOTION GOLDEN GAB.
 *
 * Structures visuelles **récurrentes** des vidéos éducatives / techniques :
 * titres, flux, étapes, code, comparaisons, callouts, chiffres, listes,
 * transformation, schémas, mascotte + contenu.
 *
 * Principe : un composant = une structure, pilotée par les données. Le contenu
 * vient toujours des props ; les animations, la typographie, les couleurs et
 * les espacements sont gérés par le composant (via `shared/`).
 *
 * ```tsx
 * import { HeroTitle, FlowDiagram, CodeShowcase } from "../../components/motion";
 * ```
 *
 * Voir `docs/ARCHITECTURE.md` (section « Bibliothèque Motion ») et
 * `docs/DESIGN-SYSTEM.md` (section « Motion »).
 */

export * from "./shared";

export { HeroTitle, type HeroTitleProps, type HeroTitleVariant } from "./HeroTitle";
export {
  SectionTitle,
  type SectionTitleProps,
  type SectionTitleVariant,
} from "./SectionTitle";
export {
  FlowDiagram,
  type FlowDiagramDirection,
  type FlowDiagramProps,
  type FlowNode,
} from "./FlowDiagram";
export {
  ProcessSteps,
  type ProcessStep,
  type ProcessStepsProps,
} from "./ProcessSteps";
export {
  CodeShowcase,
  type CodeShowcaseProps,
  type CodeShowcaseReveal,
} from "./CodeShowcase";
export {
  Comparison,
  type ComparisonProps,
  type ComparisonSideData,
} from "./Comparison";
export { Callout, type CalloutProps, type CalloutVariant } from "./Callout";
export { InfoCard, type InfoCardProps } from "./InfoCard";
export {
  AnimatedList,
  type AnimatedListItem,
  type AnimatedListMarker,
  type AnimatedListProps,
} from "./AnimatedList";
export { Stat, type StatProps, type StatSize } from "./Stat";
export {
  BeforeAfter,
  type BeforeAfterProps,
  type BeforeAfterState,
} from "./BeforeAfter";
export {
  NodeGraph,
  type GraphEdge,
  type GraphNode,
  type NodeGraphProps,
} from "./NodeGraph";
export { MascotScene, type MascotSceneMascot, type MascotSceneProps } from "./MascotScene";
