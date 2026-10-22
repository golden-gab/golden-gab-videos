/**
 * Épisode Les métiers du web · 3 · « Data Engineer »
 *
 * 39 beats audio-driven de 0,6 à 2,8 secondes, un message par plan.
 * L'audio est la source de vérité temporelle (48,27 s) : chaque plan est défini
 * par l'indice de son premier mot dans le transcript ; ses bornes et son texte
 * en sont déduits (aucune frontière ne peut tomber hors d'un mot).
 * Données pures : aucun import React/Remotion.
 */

import type { CaptionPosition } from "../../../../../captions/types";
import type { MascotAttitude, MascotPose } from "../../../../../components/mascot/types";
import type { Scene, SceneSfx, SceneType, Episode } from "../../../../../scenes/types";
import { dataEngineerAudio, dataEngineerTranscript } from "./transcript.ts";

type BeatInput = {
  /** Indice, dans le transcript, du premier mot du plan. */
  readonly first: number;
  readonly type: SceneType;
  readonly lane: CaptionPosition;
  readonly objective: string;
  readonly mascot?: { readonly pose: MascotPose; readonly attitude: MascotAttitude };
  readonly sfx?: readonly SceneSfx[];
};

const beats: readonly BeatInput[] = [
  {
    first: 0,
    type: "hero",
    lane: "low",
    objective: "Un calendrier dont la case du lendemain s'allume sur « demain »",
  },
  {
    first: 3,
    type: "callout",
    lane: "top",
    objective: "Trois tuiles d'apps génériques (réseau, vidéo, écran) ; les deux premières s'allument sur « Facebook » puis « TikTok »",
  },
  {
    first: 6,
    type: "callout",
    lane: "low",
    objective: "La troisième tuile s'allume sur « Netflix » puis les trois tuiles tremblent sur « perdent »",
  },
  {
    first: 8,
    type: "explanation",
    lane: "top",
    objective: "Une base de données entourée de petites cartes d'infos qui s'allument ; la base claque sur « informations »",
  },
  {
    first: 11,
    type: "callout",
    lane: "low",
    objective: "La base de données au centre, trois personnes autour qui s'allument sur « utilisateurs »",
  },
  {
    first: 14,
    type: "callout",
    lane: "top",
    objective: "Une horloge et une liste de lignes ; la liste est barrée sur « historique »",
  },
  {
    first: 16,
    type: "callout",
    lane: "low",
    objective: "Un téléphone qui diffuse une vidéo ; l'écran est barré sur « regardées »",
  },
  {
    first: 20,
    type: "callout",
    lane: "top",
    objective: "Trois cartes recommandées avec un cœur ; elles sont barrées sur « recommandations »",
  },
  {
    first: 23,
    type: "diagram",
    lane: "low",
    objective: "Un bouclier dont la coche se trace sur « éviter »",
  },
  {
    first: 29,
    type: "explanation",
    lane: "top",
    objective: "Un immeuble de bureaux dont les fenêtres s'allument sur « entreprises » ; une pièce de puzzle s'allume sur « besoin »",
  },
  {
    first: 33,
    type: "hero",
    lane: "low",
    objective: "Carte-métier « DATA ENGINEER » avec une base de données ; la carte claque sur « engineer »",
    sfx: [{ at: { wordIndex: 35 }, name: "pop", volume: 0.5 }],
  },
  {
    first: 36,
    type: "explanation",
    lane: "top",
    objective: "Deux engrenages qui tournent ; mascotte qui explique, appelée par « travail »",
    mascot: { pose: "explaining", attitude: "confident" },
  },
  {
    first: 40,
    type: "diagram",
    lane: "low",
    objective: "Trois briques (base, engrenage, graphique) reliées par des flèches qui se tracent sur « construire » ; l'ensemble s'allume sur « systèmes »",
  },
  {
    first: 43,
    type: "diagram",
    lane: "top",
    objective: "Un entonnoir ; des points éparpillés y tombent sur « récupérer »",
  },
  {
    first: 47,
    type: "diagram",
    lane: "low",
    objective: "Des points éparpillés se rangent en grille, colonne par colonne, sur « organiser »",
  },
  {
    first: 49,
    type: "diagram",
    lane: "top",
    objective: "Un tuyau où des points voyagent d'une tuile source vers une base ; le tuyau claque sur « transporter »",
  },
  {
    first: 52,
    type: "callout",
    lane: "low",
    objective: "Trois bases de données qui grossissent ; elles claquent sur « données »",
  },
  {
    first: 55,
    type: "callout",
    lane: "top",
    objective: "Un graphique dans une fenêtre dont les barres montent sur « puissent » ; la fenêtre claque sur « utilisées »",
    sfx: [{ at: { wordIndex: 59 }, name: "ding", volume: 0.5 }],
  },
  {
    first: 60,
    type: "explanation",
    lane: "low",
    objective: "Étiquette « EXEMPLE » qui claque ; un téléphone avec une vidéo et une flèche circulaire qui tourne sur « chaque fois »",
  },
  {
    first: 64,
    type: "callout",
    lane: "top",
    objective: "Une personne, un œil qui se tourne vers une tuile vidéo sur « regardes » ; la tuile s'allume sur « vidéo »",
  },
  {
    first: 69,
    type: "callout",
    lane: "low",
    objective: "Un téléphone avec une vidéo et un cœur qui claque sur « TikTok »",
  },
  {
    first: 71,
    type: "diagram",
    lane: "top",
    objective: "Trois petites cartes d'infos sortent du téléphone vers une base sur « informations »",
  },
  {
    first: 73,
    type: "callout",
    lane: "low",
    objective: "Une carte tombe dans la base de données ; la coche se trace sur « enregistrées »",
  },
  {
    first: 76,
    type: "explanation",
    lane: "top",
    objective: "Une personne allumée sur « Engineer », un engrenage qui tourne, une base de données sur « aide »",
  },
  {
    first: 80,
    type: "diagram",
    lane: "low",
    objective: "Un itinéraire se trace d'un téléphone à une base de données à partir de « faire »",
  },
  {
    first: 85,
    type: "diagram",
    lane: "top",
    objective: "Des points parcourent l'itinéraire et la base s'allume sur « arrivent »",
  },
  {
    first: 88,
    type: "callout",
    lane: "low",
    objective: "Une épingle tombe sur la base de données sur « endroit »",
  },
  {
    first: 91,
    type: "callout",
    lane: "top",
    objective: "Trois cartes dont les coches se tracent à la suite ; la dernière sur « prêtes »",
  },
  {
    first: 94,
    type: "callout",
    lane: "low",
    objective: "Un tableau de bord (graphique, cœur, cartes) qui s'allume sur « utilisées »",
  },
  {
    first: 97,
    type: "explanation",
    lane: "top",
    objective: "Un rideau de scène : un engrenage tourne sur « construit », le rideau s'ouvre sur « coulisses »",
  },
  {
    first: 103,
    type: "diagram",
    lane: "low",
    objective: "Des points circulent en anneau autour d'une base ; ils accélèrent sur « circuler »",
  },
  {
    first: 109,
    type: "conclusion",
    lane: "top",
    objective: "Un grand disque coché qui claque sur « correctement » ; mascotte joyeuse",
    mascot: { pose: "happy", attitude: "excited" },
    sfx: [{ at: { wordIndex: 109 }, name: "ding", volume: 0.5 }],
  },
  {
    first: 110,
    type: "callout",
    lane: "low",
    objective: "Une personne grisée et barrée sur « lui »",
  },
  {
    first: 113,
    type: "callout",
    lane: "top",
    objective: "Un immeuble qui tremble avec une alerte « ! » sur « mal »",
  },
  {
    first: 117,
    type: "explanation",
    lane: "low",
    objective: "Un tas de cartes d'infos grisées ; une loupe les parcourt sur « exploiter »",
  },
  {
    first: 121,
    type: "diagram",
    lane: "top",
    objective: "Quatre icônes d'infos convergent vers la base de données sur « collectent »",
  },
  {
    first: 124,
    type: "conclusion",
    lane: "low",
    objective: "Trois cartes-métiers empilées, la dernière s'allume sur « métier » ; mascotte qui pointe le spectateur",
    mascot: { pose: "point", attitude: "friendly" },
  },
  {
    first: 128,
    type: "conclusion",
    lane: "top",
    objective: "Une loupe sur un grand « ? » corail qui claque sur « découvrir »",
  },
  {
    first: 132,
    type: "conclusion",
    lane: "low",
    objective: "Un « ? » et des flèches vers la suite ; mascotte pensive sur « suite »",
    mascot: { pose: "thinking", attitude: "curious" },
  },
];

const pad = (value: number): string => String(value).padStart(2, "0");

const words = dataEngineerTranscript.segments;

const scenes: readonly Scene[] = beats.map((beat, index) => {
  const next = beats[index + 1];
  const start = index === 0 ? 0 : words[beat.first].start;
  const end = next ? words[next.first].start : dataEngineerAudio.duration;
  const lastWord = next ? next.first : words.length;
  const transcript = words
    .slice(beat.first, lastWord)
    .map((word) => word.text)
    .join(" ");

  return {
    id: `beat-${pad(index + 1)}`,
    type: beat.type,
    start,
    end,
    transcript,
    visual: { component: "DataEngineerScene" },
    captions: { enabled: true, position: beat.lane },
    ...(beat.mascot
      ? {
          mascot: {
            enabled: true,
            pose: beat.mascot.pose,
            attitude: beat.mascot.attitude,
          },
        }
      : {}),
    ...(beat.sfx ? { sfx: beat.sfx } : {}),
    metadata: { beatNumber: index + 1, objective: beat.objective },
  };
});

export const dataEngineerEpisode: Episode = {
  id: "metiers-du-web-data-engineer",
  title: "C'est quoi un Data Engineer ?",
  description:
    "Épisode 3 de la série « Les métiers du web » : ce que fait un data engineer, expliqué avec l'exemple des vidéos regardées sur TikTok.",
  audio: dataEngineerAudio,
  transcript: dataEngineerTranscript,
  metadata: {
    series: "metiers-du-web",
    subject: "Data Engineer (ingénieur des données)",
    angle:
      "Faire comprendre qu'un data engineer construit les coulisses qui font circuler les données jusqu'au bon endroit, avec l'exemple des vidéos regardées sur TikTok.",
    tags: ["metier", "data", "data-engineer", "culture-tech"],
    script:
      "Imagine que demain Facebook, TikTok et Netflix perdent toutes les informations sur leurs utilisateurs. …",
  },
  scenes,
};
