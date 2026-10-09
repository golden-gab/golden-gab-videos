/**
 * `src/audio/` — couche Audio du pipeline `Audio → Transcript → Timestamps`.
 *
 * Point d'entrée public :
 *   - les contrats (`AudioTrack`, `Transcript`, `TranscriptSegment`) ;
 *   - la validation temporelle (`validateTranscript`, `assertValidTranscript`, …) ;
 *   - la recherche du segment actif (`getTranscriptSegmentAt`) ;
 *   - l'adaptateur vers les captions (`transcriptToCaptions`) ;
 *   - le mock de développement (`mockTranscript`, `mockAudioTrack`).
 *
 * La couche reste indépendante de Remotion et d'un provider de transcription
 * particulier : elle ne décrit que des données et de la logique temporelle.
 */

export * from "./types";
export * from "./validate";
export * from "./lookup";
export * from "./captions";
export * from "./mock";
export * from "./music";
export * from "./sfx.manifest";
