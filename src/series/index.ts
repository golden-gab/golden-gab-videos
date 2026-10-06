/**
 * Registre des séries Golden Gab.
 *
 * Pour ajouter une série :
 *  1. créer `src/series/<id>/index.tsx` exportant un `SeriesDefinition`
 *  2. l'ajouter au tableau ci-dessous
 *
 * Rien d'autre à modifier : les compositions de toutes les séries sont
 * montées automatiquement par `src/compositions`.
 */

import { metiersDeLaTechSeries } from "./metiers-de-la-tech";
import type { SeriesDefinition } from "./types";

export const seriesRegistry: readonly SeriesDefinition[] = [
  metiersDeLaTechSeries,
];

export type { SeriesDefinition };
