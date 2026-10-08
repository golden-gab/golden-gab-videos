/**
 * Couche Audio — contrats du pipeline `Audio → Transcript → Timestamps`.
 *
 * L'audio réel de la voix est la source de vérité temporelle du projet
 * (roadmap M03) : il pilote le montage, et le transcript en expose le
 * découpage. Cette couche ne décrit **que des données** : elle ne dépend
 * volontairement ni de Remotion, ni des captions, ni d'un composant visuel,
 * pour rester consommable par le Scene System puis par l'Episode Schema.
 *
 * Convention de temps : les timestamps de cette couche sont exprimés en
 * SECONDES, comme `Scene.start` / `Scene.end` (`src/scenes/types.ts`). Le
 * système de captions, lui, raisonne en millisecondes : la conversion se fait
 * à la frontière, dans `src/audio/captions.ts`, jamais au milieu du pipeline.
 */

/** Une piste audio de narration (le fichier réellement enregistré). */
export type AudioTrack = {
  /** Identifiant optionnel, pour référencer cette piste depuis un épisode. */
  readonly id?: string;
  /** Chemin (`staticFile`) ou URL du fichier audio. */
  readonly src: string;
  /** Durée réelle en secondes. Invariant : `>= 0`. */
  readonly duration: number;
  /** Format logique du fichier, si connu (ex. `"wav"`, `"mp3"`). */
  readonly format?: string;
  /** Fréquence d'échantillonnage en Hz, si connue (ex. 16000 pour Whisper). */
  readonly sampleRate?: number;
  /** Nombre de canaux, si connu (1 = mono). */
  readonly channels?: number;
};

/**
 * Un segment transcrit, borné dans le temps (secondes).
 *
 * Champs optionnels uniquement : le contrat reste assez large pour accueillir
 * plus de détail (confiance, locuteur, futur alignement mot-à-mot) sans casser
 * ses consommateurs.
 */
export type TranscriptSegment = {
  /** Début en secondes. Invariant : `>= 0`. */
  readonly start: number;
  /** Fin en secondes. Invariant : strictement supérieure à `start`. */
  readonly end: number;
  /** Texte prononcé sur cet intervalle. */
  readonly text: string;
  /** Confiance du moteur de transcription (0..1), si fournie. */
  readonly confidence?: number;
  /** Locuteur, lorsque le transcript distingue plusieurs voix. */
  readonly speaker?: string;
  /** Extension libre (mots alignés, ponctuation, …). */
  readonly metadata?: Record<string, unknown>;
};

/** Transcription complète d'une piste audio. */
export type Transcript = {
  /** Code langue (ex. `"fr"`, `"en"`). */
  readonly language?: string;
  /** Segments transcrits, ordonnés chronologiquement et sans chevauchement. */
  readonly segments: readonly TranscriptSegment[];
  /** Extension libre : provider, modèle, date de transcription, etc. */
  readonly metadata?: Record<string, unknown>;
};

/**
 * Contrat d'un provider de transcription (mock, Whisper, API…).
 *
 * M03 ne fournit **aucune** implémentation externe : ce type documente
 * uniquement la couture à respecter pour en ajouter une plus tard, sans
 * imposer de dépendance au reste du pipeline.
 */
export type TranscriptionProvider = {
  /** Nom lisible du provider (ex. `"mock"`, `"whisper"`). */
  readonly name: string;
  /** Produit un transcript pour l'audio fourni. */
  readonly transcribe: (audio: AudioTrack) => Promise<Transcript>;
};
