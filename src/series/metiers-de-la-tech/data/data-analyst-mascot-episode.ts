/**
 * Épisode « Data Analyst » — montage dynamique avec la mascotte.
 *
 * Même voix, même transcript Whisper.cpp que l'épisode de référence
 * (`reference-episode.ts`) : l'audio reste la source de vérité temporelle. Seul
 * le découpage en scènes et la mise en scène changent — huit plans courts, la
 * mascotte comme fil conducteur, un changement visible toutes les 1 à 2 s.
 *
 * Les bornes des scènes tombent sur les débuts de mots du transcript ; les
 * révélations internes se calent sur les mots eux-mêmes (voir
 * `../videos/data-analyst-mascot-kit.tsx`).
 *
 * Données pures : aucun import React/Remotion, ce fichier reste testable.
 */

import type { Episode, SceneSfx } from "../../../scenes/types";
import {
  referenceEpisodeAudio,
  referenceEpisodeTranscript,
} from "./reference-episode.ts";

/** Voix et transcript partagés avec l'épisode de référence. */
export const dataAnalystMascotAudio = referenceEpisodeAudio;
export const dataAnalystMascotTranscript = referenceEpisodeTranscript;

/**
 * Index du premier segment du transcript qui porte `word` à partir de
 * `afterSeconds`. Les SFX se calent sur un index de mot, jamais sur une durée
 * estimée.
 */
const getWordIndex = (word: string, afterSeconds: number): number => {
  const index = dataAnalystMascotTranscript.segments.findIndex(
    (segment) =>
      segment.start >= afterSeconds &&
      segment.text.toLowerCase() === word.toLowerCase(),
  );

  if (index < 0) {
    throw new Error(
      `Transcript word "${word}" is missing after ${afterSeconds}s.`,
    );
  }

  return index;
};

const sfxOnWord = (
  name: SceneSfx["name"],
  word: string,
  afterSeconds: number,
  volume?: number,
): SceneSfx => ({
  at: { wordIndex: getWordIndex(word, afterSeconds) },
  name,
  volume,
});

/**
 * Storyboard : une ligne = un plan.
 *
 * - `hook`        0,00–5,44  : l'abondance de produits, puis la question.
 * - `role`        5,44–7,88  : l'arrivée du data analyst (titre cinétique).
 * - `transform`   7,88–12,48 : des données brutes aux informations utiles.
 * - `trend`       12,48–14,36 : identifier les tendances.
 * - `behavior`    14,36–16,12 : comprendre les comportements.
 * - `decision`    16,12–19,28 : aider l'entreprise à décider.
 * - `numbers`     19,28–22,68 : regarder des chiffres… ou y chercher un motif.
 * - `conclusion`  22,68–fin   : ce que les données racontent.
 */
export const dataAnalystMascotEpisode: Episode = {
  id: "mdt-data-analyst-mascotte",
  title: "C'est quoi un Data Analyst ? (montage mascotte)",
  description:
    "Le Data Analyst expliqué avec la mascotte Golden Gab : huit plans calés sur la voix.",
  audio: dataAnalystMascotAudio,
  transcript: dataAnalystMascotTranscript,
  metadata: {
    series: "metiers-de-la-tech",
    subject: "Data Analyst",
    angle:
      "La mascotte accompagne le spectateur du chaos des produits au sens que révèlent les données.",
    tags: ["data", "ventes", "analyse", "mascotte"],
    script:
      "Une entreprise vend des milliers de produits ; le Data Analyst transforme les données brutes en informations utiles pour décider.",
  },
  // Les presets sont consommés par un wrapper piloté par frame, pas par du CSS.
  /* eslint-disable @remotion/non-pure-animation */
  scenes: [
    {
      id: "hook",
      type: "hero",
      start: 0,
      end: 5.44,
      transcript:
        "Imaginez une entreprise qui vend des milliers de produits chaque mois, mais lesquels se vendent vraiment.",
      visual: { component: "DataAnalystMascotScene" },
      transition: { scene: "cut-doux" },
      captions: { enabled: true, position: "low" },
      mascot: {
        enabled: true,
        pose: "thinking",
        attitude: "curious",
        position: "right",
      },
      sfx: [
        sfxOnWord("swipe", "milliers", 0),
        sfxOnWord("pop", "lesquels", 0),
      ],
      metadata: {
        objective:
          "Faire sentir l'abondance (mur de produits) puis la question : lesquels comptent vraiment ?",
        additionalAsset:
          "Aucun : icônes de produits dessinées localement, loupe et bulle de pensée.",
      },
    },
    {
      id: "role",
      type: "explanation",
      start: 5.44,
      end: 7.88,
      transcript: "C'est là qu'intervient le data analyst.",
      visual: { component: "DataAnalystMascotScene" },
      transition: { scene: "glisse" },
      captions: { enabled: true, position: "low" },
      mascot: {
        enabled: true,
        pose: "point",
        attitude: "confident",
        position: "right",
      },
      sfx: [{ at: { frame: 0 }, name: "whoosh" }],
      metadata: {
        objective:
          "Annoncer le métier : la mascotte désigne un tableau de bord et le titre DATA ANALYST s'impose.",
        additionalAsset: "Aucun : tableau de bord dessiné localement.",
      },
    },
    {
      id: "transform",
      type: "callout",
      start: 7.88,
      end: 12.48,
      transcript:
        "Son rôle est de transformer des données brutes en informations utiles.",
      visual: { component: "DataAnalystMascotScene" },
      transition: { scene: "balayage" },
      captions: { enabled: true, position: "low" },
      mascot: {
        enabled: true,
        pose: "explaining",
        attitude: "friendly",
        position: "right",
      },
      sfx: [sfxOnWord("click", "informations", 0)],
      metadata: {
        objective:
          "Rendre le verbe « transformer » concret : des cellules en désordre s'alignent en graphique.",
        additionalAsset: "Aucun : cellules et engrenage dessinés localement.",
      },
    },
    {
      id: "trend",
      type: "diagram",
      start: 12.48,
      end: 14.36,
      transcript: "Identifier les tendances,",
      visual: { component: "DataAnalystMascotScene" },
      transition: { scene: "coupe-franche" },
      captions: { enabled: true, position: "top" },
      mascot: {
        enabled: true,
        pose: "point",
        attitude: "confident",
        position: "left",
        facing: "right",
      },
      metadata: {
        objective:
          "Une courbe se dessine dans un nuage de points : la tendance émerge.",
        additionalAsset: "Aucun : graphique dessiné localement.",
      },
    },
    {
      id: "behavior",
      type: "diagram",
      start: 14.36,
      end: 16.12,
      transcript: "comprendre les comportements",
      visual: { component: "DataAnalystMascotScene" },
      transition: { scene: "coupe-franche" },
      captions: { enabled: true, position: "low" },
      mascot: {
        enabled: true,
        pose: "thinking",
        attitude: "curious",
        position: "right",
      },
      metadata: {
        objective:
          "Des personnes apparaissent, se relient en groupes : on comprend comment elles se comportent.",
        additionalAsset: "Aucun : silhouettes et liens dessinés localement.",
      },
    },
    {
      id: "decision",
      type: "diagram",
      start: 16.12,
      end: 19.28,
      transcript:
        "et aider l'entreprise à prendre de meilleures décisions.",
      visual: { component: "DataAnalystMascotScene" },
      transition: { scene: "coupe-franche" },
      captions: { enabled: true, position: "bottom" },
      mascot: {
        enabled: true,
        pose: "explaining",
        attitude: "friendly",
        position: "right",
      },
      sfx: [sfxOnWord("ding", "décisions.", 16.12, 0.22)],
      metadata: {
        objective:
          "Une entreprise face à un embranchement : les données éclairent la meilleure voie, la mascotte célèbre.",
        additionalAsset: "Aucun : embranchement dessiné localement.",
      },
    },
    {
      id: "numbers",
      type: "callout",
      start: 19.28,
      end: 22.68,
      transcript: "En clair, il ne se contente pas de regarder des chiffres.",
      visual: { component: "DataAnalystMascotScene" },
      transition: { scene: "cut-doux" },
      captions: { enabled: true, position: "top" },
      mascot: {
        enabled: true,
        pose: "explaining",
        attitude: "serious",
        position: "right",
      },
      sfx: [sfxOnWord("click", "chiffres.", 19.28)],
      metadata: {
        objective:
          "Un mur de chiffres défile (la mascotte est dépassée) puis se fige : un motif apparaît.",
        additionalAsset:
          "Aucun : chiffres décoratifs, non interprétables — aucune donnée inventée.",
      },
    },
    {
      id: "conclusion",
      type: "conclusion",
      start: 22.68,
      end: referenceEpisodeAudio.duration,
      transcript: "Il cherche ce qu'il raconte.",
      visual: { component: "DataAnalystMascotScene" },
      transition: { scene: "glisse" },
      captions: { enabled: true, position: "low" },
      mascot: {
        enabled: true,
        pose: "happy",
        attitude: "excited",
        position: "right",
      },
      sfx: [sfxOnWord("ding", "raconte.", 22.68)],
      metadata: {
        objective:
          "Terminer sur la promesse du métier : la loupe trouve la tendance, qui devient une idée.",
        additionalAsset: "Aucun : courbe, loupe et bulle dessinées localement.",
      },
    },
  ],
  /* eslint-enable @remotion/non-pure-animation */
};
