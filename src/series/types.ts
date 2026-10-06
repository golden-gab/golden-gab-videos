/**
 * Contrat d'une série Golden Gab.
 *
 * Une série est un groupe de vidéos partageant un thème, ses données et
 * éventuellement ses composants propres. Elle se déclare dans
 * `src/series/index.ts` et expose un composant `Folder` qui enregistre ses
 * compositions Remotion.
 *
 * Ajouter une série = créer `src/series/<id>/` puis ajouter une entrée dans
 * `seriesRegistry`. Aucun autre fichier global n'a besoin d'être modifié.
 */

import type React from "react";

export type SeriesDefinition = {
  /** Identifiant technique, en kebab-case. Sert aussi de nom de dossier. */
  readonly id: string;
  /** Nom lisible affiché dans le Studio. */
  readonly title: string;
  /** Une phrase décrivant la série (utilisée par la documentation/tooling). */
  readonly description: string;
  /**
   * Composant qui rend le `<Folder>` Remotion de la série et ses
   * `<Composition>`. Chaque composition reste un nœud JSX explicite afin de
   * rester éditable dans le Studio.
   */
  readonly Folder: React.FC;
};
