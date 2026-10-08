/**
 * Mock de transcription — développement local, sans service externe.
 *
 * Objectif M03 : pouvoir brancher `Audio → Transcript → Captions` **avant**
 * toute intégration Whisper/API. Le mock est calibré comme une vraie voix off
 * Golden Gab : segments multiples, timings irréguliers, silences entre les
 * phrases — il passe `assertValidTranscript`.
 *
 * Remplacer ce mock par un vrai provider ne doit toucher aucun composant
 * visuel : seule la source des données change, la forme (`Transcript`) reste
 * identique.
 */

import type { AudioTrack, Transcript } from "./types";

/** Piste audio de référence du mock (le fichier n'existe pas encore). */
export const mockAudioTrack: AudioTrack = {
  id: "mock-narration",
  // Chemin illustratif : aucun fichier réel n'est requis pour tester le pipeline.
  src: "audio/mock-narration.wav",
  duration: 42.5,
  format: "wav",
  sampleRate: 16000,
  channels: 1,
};

/**
 * Transcript de développement. Dernier segment à 41,2 s : bien à l'intérieur
 * des 42,5 s de `mockAudioTrack`, donc valide avec ou sans contrôle de durée.
 */
export const mockTranscript: Transcript = {
  language: "fr",
  metadata: { source: "mock" },
  segments: [
    {
      start: 0,
      end: 3.2,
      text: "Imaginez que votre application doive gérer des milliers de requêtes par seconde.",
    },
    {
      start: 3.2,
      end: 8.7,
      text: "Voici pourquoi cette architecture fonctionne, et pourquoi elle tient dans le temps.",
    },
    {
      start: 9.4,
      end: 14.1,
      text: "Chaque service reste indépendant : il peut évoluer sans casser le reste du système.",
    },
    {
      start: 14.1,
      end: 19.8,
      text: "Le message passe par une file d'attente, qui absorbe les pics de trafic.",
    },
    {
      start: 20.6,
      end: 26.3,
      text: "Résultat : une panne locale ne devient jamais une panne globale.",
    },
    {
      start: 27.1,
      end: 33.9,
      text: "C'est l'idée centrale à retenir quand on conçoit une plateforme distribuée.",
    },
    {
      start: 34.6,
      end: 41.2,
      text: "Et c'est exactement le genre de choix qui se joue bien avant la première ligne de code.",
    },
  ],
};
