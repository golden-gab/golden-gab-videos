/**
 * Golden Gab — modèle de données du système de captions.
 *
 * Un `CaptionSegment` est l'unité que l'auteur d'une vidéo écrit (ou qui est
 * produite à partir d'une transcription Whisper). Le système regroupe ensuite
 * les segments en `CaptionPage` (ce qui est affiché à l'écran en même temps),
 * puis en `CaptionToken` (mots, pour la mise en évidence).
 */

/** Un mot avec son timing propre, en millisecondes. */
export type CaptionWord = {
  readonly text: string;
  readonly startMs: number;
  readonly endMs: number;
};

/**
 * Segment de caption : la plus petite unité de contenu.
 *
 * - `text` est obligatoire, il porte l'affichage.
 * - `words` est optionnel : s'il est fourni, il permet la mise en évidence
 *   mot-à-mot (karaoké). Sinon, la durée du segment est répartie
 *   proportionnellement à la longueur des mots.
 */
export type CaptionSegment = {
  readonly text: string;
  readonly startMs: number;
  readonly endMs: number;
  /** Timings mot-à-mot, pour le karaoké. */
  readonly words?: readonly CaptionWord[];
  /** Mots à mettre en évidence pendant toute la durée du segment. */
  readonly emphasis?: readonly string[];
  /** Force ce segment à démarrer une nouvelle page. */
  readonly pageBreakBefore?: boolean;
};

/** Position verticale des captions dans la composition. */
export type CaptionPosition = "top" | "center" | "bottom";

/** Mot prêt à être rendu. */
export type CaptionToken = {
  readonly text: string;
  readonly startMs: number;
  readonly endMs: number;
  /** Le token est précédé d'une espace (mots suivants du même segment). */
  readonly leadingSpace: boolean;
  /** Le mot doit être mis en évidence sur toute la durée du segment. */
  readonly alwaysEmphasis: boolean;
};

/** Bloc de texte affiché simultanément. */
export type CaptionPage = {
  readonly startMs: number;
  readonly endMs: number;
  /** Texte complet de la page, utilisé pour le dimensionnement automatique. */
  readonly text: string;
  readonly tokens: readonly CaptionToken[];
};
