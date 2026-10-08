/**
 * `src/scenes/` est le point d'entrée du pipeline narratif :
 * - il décrit le timing des scènes (start/end) ;
 * - il décrit l'épisode audio-driven (audio + transcript + scènes) ;
 * - il mappe un type narratif vers un composant Motion ;
 * - il reste indépendant des composants visuels réutilisables.
 */

export * from "./types";
export * from "./episode";
export * from "./registry";
export * from "./renderer";
