/**
 * Boîte à outils du montage « Data Analyst × mascotte ».
 *
 * L'outillage générique (horloge calée sur les mots, prises de mascotte,
 * plateau de captions, icônes, effets) a été promu dans
 * `src/components/motion/stage` (règle 46) : ce fichier le réexporte et ne
 * garde que ce qui est propre à cette vidéo — l'horloge branchée sur son
 * transcript.
 */

import { useWordClock, type Beat } from "../../../components/motion/stage";
import type { Scene } from "../../../scenes/types";
import { dataAnalystMascotTranscript } from "../data/data-analyst-mascot-episode";

export * from "../../../components/motion/stage";

/** Horloge d'une scène de ce montage (transcript de la voix Data Analyst). */
export const useBeat = (scene: Scene): Beat =>
  useWordClock(scene, dataAnalystMascotTranscript);
