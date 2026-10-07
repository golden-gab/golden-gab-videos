/**
 * `src/scenes/` est le point d'entrée du pipeline narratif :
 * - il décrit le timing des scènes (start/end) ;
 * - il mappe un type narratif vers un composant Motion ;
 * - il reste indépendant des composants visuels réutilisables.
 */

export * from "./types";
export * from "./registry";
export * from "./renderer";
