/**
 * Épisode de référence de la série `metiers-de-la-tech`.
 *
 * Un épisode est **audio-driven** : il porte son `AudioTrack` (source de vérité
 * temporelle) et le `Transcript` horodaté de la voix. Les bornes des scènes
 * reprennent celles des segments de transcript — pas des durées inventées — et
 * la durée totale de l'épisode est celle de l'audio.
 *
 * La transcription a été produite localement avec Whisper.cpp (`base`, fr) ;
 * ses segments et les bornes des scènes suivent la voix enregistrée.
 *
 * Données pures : aucun import React/Remotion, ce fichier reste testable.
 */

import type { AudioTrack, Transcript } from "../../../audio/types";
import type { Episode } from "../../../scenes/types";

/** Piste audio de narration de l'épisode. */
export const referenceEpisodeAudio: AudioTrack = {
  id: "mdt-data-analyst-voice",
  // Chemin relatif à `public/`, résolu par EpisodeRenderer via staticFile().
  src: "audio/mdt-data-analyst-voice.mp3",
  duration: 25.077551020408162,
  format: "mp3",
  sampleRate: 44100,
  channels: 1,
};

/** Mots français horodatés par Whisper.cpp (timestamps convertis en secondes). */
export const referenceEpisodeTranscript: Transcript = {
  language: "fr",
  metadata: { source: "whisper.cpp", model: "base" },
  segments: [
    { start: 0.04, end: 0.48, text: "Imaginez" },
    { start: 0.48, end: 0.66, text: "une" },
    { start: 0.66, end: 1.28, text: "entreprise" },
    { start: 1.28, end: 1.44, text: "qui" },
    { start: 1.44, end: 1.68, text: "vend" },
    { start: 1.68, end: 1.86, text: "des" },
    { start: 1.86, end: 2.34, text: "milliers" },
    { start: 2.34, end: 2.46, text: "de" },
    { start: 2.46, end: 2.94, text: "produits" },
    { start: 2.94, end: 3.3, text: "chaque" },
    { start: 3.3, end: 3.68, text: "mois," },
    { start: 3.68, end: 3.9, text: "mais" },
    { start: 3.9, end: 4.32, text: "lesquels" },
    { start: 4.32, end: 4.43, text: "se" },
    { start: 4.43, end: 4.81, text: "vendent" },
    { start: 4.81, end: 5.44, text: "vraiment." },
    { start: 5.44, end: 5.79, text: "C'est" },
    { start: 5.79, end: 6.02, text: "là" },
    { start: 6.02, end: 6.92, text: "qu'intervient" },
    { start: 6.92, end: 7.05, text: "le" },
    { start: 7.05, end: 7.33, text: "data" },
    { start: 7.33, end: 7.88, text: "analyst." },
    { start: 7.88, end: 8.13, text: "Son" },
    { start: 8.13, end: 8.44, text: "rôle" },
    { start: 8.44, end: 8.79, text: "est" },
    { start: 8.79, end: 8.87, text: "de" },
    { start: 8.87, end: 9.57, text: "transformer" },
    { start: 9.57, end: 9.78, text: "des" },
    { start: 9.78, end: 10.34, text: "données" },
    { start: 10.34, end: 10.92, text: "brutes" },
    { start: 10.92, end: 10.95, text: "en" },
    { start: 10.95, end: 11.91, text: "informations" },
    { start: 11.91, end: 12.48, text: "utiles," },
    { start: 12.48, end: 13.22, text: "identifier" },
    { start: 13.22, end: 13.48, text: "les" },
    { start: 13.48, end: 14.36, text: "tendances," },
    { start: 14.36, end: 14.98, text: "comprendre" },
    { start: 14.98, end: 15.22, text: "les" },
    { start: 15.22, end: 16.12, text: "comportements" },
    { start: 16.12, end: 16.23, text: "et" },
    { start: 16.23, end: 16.52, text: "aider" },
    { start: 16.52, end: 17.21, text: "l'entreprise" },
    { start: 17.21, end: 17.35, text: "à" },
    { start: 17.35, end: 17.73, text: "prendre" },
    { start: 17.73, end: 17.84, text: "de" },
    { start: 17.84, end: 18.42, text: "meilleures" },
    { start: 18.42, end: 19.28, text: "décisions." },
    { start: 19.28, end: 19.52, text: "En" },
    { start: 19.52, end: 20.28, text: "clair," },
    { start: 20.28, end: 20.32, text: "il" },
    { start: 20.32, end: 20.44, text: "ne" },
    { start: 20.44, end: 20.55, text: "se" },
    { start: 20.55, end: 21.12, text: "contente" },
    { start: 21.12, end: 21.22, text: "pas" },
    { start: 21.22, end: 21.34, text: "de" },
    { start: 21.34, end: 21.82, text: "regarder" },
    { start: 21.82, end: 22, text: "des" },
    { start: 22, end: 22.68, text: "chiffres." },
    { start: 22.68, end: 22.83, text: "Il" },
    { start: 22.83, end: 23.36, text: "cherche" },
    { start: 23.36, end: 23.52, text: "ce" },
    { start: 23.52, end: 23.88, text: "qu'il" },
    { start: 23.88, end: 24.68, text: "raconte." },
  ],
};

/** Storyboard illustré, calé sur les temps réels de la narration. */
export const referenceEpisode: Episode = {
  id: "mdt-data-analyst",
  title: "C'est quoi un Data Analyst ?",
  description:
    "Comment un Data Analyst transforme des données de vente en décisions utiles.",
  audio: referenceEpisodeAudio,
  transcript: referenceEpisodeTranscript,
  metadata: {
    series: "metiers-de-la-tech",
    subject: "Data Analyst",
    angle: "Expliquer le rôle du Data Analyst à travers l'analyse des ventes.",
    tags: ["data", "ventes", "analyse"],
    script:
      "Une entreprise vend beaucoup de produits ; le Data Analyst révèle ce que les données racontent pour éclairer ses décisions.",
  },
  // These presets are consumed by the frame-based scene wrapper, not CSS transitions.
  /* eslint-disable @remotion/non-pure-animation */
  scenes: [
    {
      id: "hook",
      type: "hero",
      start: 0,
      end: 5.44,
      transcript:
        "Imaginez une entreprise qui vend des milliers de produits chaque mois, mais lesquels se vendent vraiment.",
      visual: {
        component: "ReferenceEpisodeScene",
        props: { questionRevealWord: "lesquels" },
      },
      transition: { enter: "fade", exit: "fade" },
      captions: { enabled: true },
      mascot: { enabled: false },
      metadata: {
        objective: "Installer l'abondance de commandes et faire naître la question du tri.",
        additionalAsset: "Aucun : illustration de produits et reçus en motion design.",
      },
    },
    {
      id: "role",
      type: "explanation",
      start: 5.44,
      end: 7.88,
      transcript: "C'est là qu'intervient le data analyst.",
      visual: {
        component: "ReferenceEpisodeScene",
      },
      transition: { enter: "slide-up", exit: "fade" },
      captions: { enabled: true },
      mascot: {
        enabled: true,
        pose: "explaining",
        attitude: "curious",
        position: "right",
        size: 280,
      },
      metadata: {
        objective: "Présenter le métier comme le guide qui va répondre à la question.",
        additionalAsset: "Mascotte Golden Gab, pose explaining.",
      },
    },
    {
      id: "transformation",
      type: "callout",
      start: 7.88,
      end: 12.48,
      transcript:
        "Son rôle est de transformer des données brutes en informations utiles.",
      visual: {
        component: "ReferenceEpisodeScene",
        props: {
          transformRevealWord: "transformer",
          informationRevealWord: "informations",
        },
      },
      transition: { enter: "fade", exit: "fade" },
      captions: { enabled: true },
      mascot: { enabled: false },
      metadata: {
        objective: "Montrer une transformation visuelle des traces brutes en information lisible.",
        additionalAsset: "Aucun : illustration abstraite de données et tableau de bord.",
      },
    },
    {
      id: "analyse",
      type: "diagram",
      start: 12.48,
      end: 19.28,
      transcript:
        "Identifier les tendances, comprendre les comportements et aider l'entreprise à prendre de meilleures décisions.",
      visual: {
        component: "ReferenceEpisodeScene",
        props: {
          trendRevealWord: "identifier",
          behaviorRevealWord: "comprendre",
          decisionRevealWord: "aider",
        },
      },
      transition: { enter: "slide-up", exit: "fade" },
      captions: { enabled: true },
      mascot: { enabled: false },
      metadata: {
        objective: "Faire progresser trois gestes d'analyse au moment où ils sont prononcés.",
        additionalAsset: "Aucun : mini-graphique, comportements et décision en motion design.",
      },
    },
    {
      id: "insight",
      type: "callout",
      start: 19.28,
      end: 22.68,
      transcript: "En clair, il ne se contente pas de regarder des chiffres.",
      visual: {
        component: "ReferenceEpisodeScene",
      },
      transition: { enter: "fade", exit: "fade" },
      captions: { enabled: true },
      mascot: {
        enabled: true,
        pose: "thinking",
        attitude: "curious",
        position: "right",
        size: 280,
      },
      metadata: {
        objective: "Opposer la lecture passive d'un tableau à la recherche d'une explication.",
        additionalAsset: "Mascotte Golden Gab, pose thinking.",
      },
    },
    {
      id: "conclusion",
      type: "conclusion",
      start: 22.68,
      end: referenceEpisodeAudio.duration,
      transcript: "Il cherche ce que racontent les chiffres.",
      visual: {
        component: "ReferenceEpisodeScene",
      },
      transition: { enter: "slide-up", exit: "fade" },
      captions: { enabled: true },
      mascot: {
        enabled: true,
        pose: "point",
        attitude: "confident",
        facing: "right",
        position: "left",
        size: 320,
      },
      metadata: {
        objective: "Terminer sur la promesse du métier : révéler le sens, pas réciter les nombres.",
        additionalAsset: "Mascotte Golden Gab et logo officiel.",
      },
    },
  ],
  /* eslint-enable @remotion/non-pure-animation */
};
