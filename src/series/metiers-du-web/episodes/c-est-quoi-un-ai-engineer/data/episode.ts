/**
 * Épisode Les métiers du web · 1 · « C'est quoi un AI engineer »
 *
 * 27 beats audio-driven de 0,6 à 2,4 secondes, un message par plan.
 * L'audio est la source de vérité temporelle (46,37 s).
 * Données pures : aucun import React/Remotion.
 */

import type { CaptionPosition } from "../../../../../captions/types";
import type { MascotAttitude, MascotPose } from "../../../../../components/mascot/types";
import type { Scene, SceneSfx, SceneType, Episode } from "../../../../../scenes/types";
import { aiEngineerAudio, aiEngineerTranscript } from "./transcript.ts";

type BeatInput = {
  readonly type: SceneType;
  readonly start: number;
  readonly end: number;
  readonly transcript: string;
  readonly lane: CaptionPosition;
  readonly objective: string;
  readonly mascot?: { readonly pose: MascotPose; readonly attitude: MascotAttitude };
  readonly sfx?: readonly SceneSfx[];
};

const beats: readonly BeatInput[] = [
  {
    type: "hero",
    start: 0,
    end: 2.13,
    transcript: "C'est l'un des métiers les plus recherchés",
    lane: "low",
    objective: "Pile de fiches de poste ; la première s'allume en corail et une loupe la cible sur « recherchés »",
  },
  {
    type: "callout",
    start: 2.13,
    end: 3.25,
    transcript: "dans la tech",
    lane: "top",
    objective: "Puce électronique dessinée, pastille « TECH » qui claque sur « tech »",
  },
  {
    type: "callout",
    start: 3.25,
    end: 4.64,
    transcript: "Mais au fait, c'est quoi un",
    lane: "low",
    objective: "Grand « ? » corail ; mascotte pensive qui apparaît sur « quoi »",
    mascot: { pose: "thinking", attitude: "curious" },
  },
  {
    type: "hero",
    start: 4.64,
    end: 5.98,
    transcript: "AI engineer ?",
    lane: "top",
    objective: "Carte-métier « AI ENGINEER » : écran de code + cerveau-circuit, la carte claque sur « engineer »",
    sfx: [{ at: { wordIndex: 17 }, name: "pop" }],
  },
  {
    type: "explanation",
    start: 5.98,
    end: 7.77,
    transcript: "Imagine une machine capable de",
    lane: "low",
    objective: "Une machine-robot dessinée dont l'œil s'allume sur « machine » ; engrenages qui tournent sur « capable »",
  },
  {
    type: "explanation",
    start: 7.77,
    end: 9.16,
    transcript: "reconnaître un visage, de",
    lane: "top",
    objective: "Un visage dessiné ; le cadre de détection se referme dessus sur « visage »",
  },
  {
    type: "explanation",
    start: 9.16,
    end: 10.59,
    transcript: "comprendre une question ou de te",
    lane: "low",
    objective: "Bulle-question à gauche, bulle-réponse à droite qui s'allume sur « comprendre »",
  },
  {
    type: "explanation",
    start: 10.59,
    end: 12.91,
    transcript: "proposer une vidéo que tu pourrais aimer.",
    lane: "top",
    objective: "Téléphone avec flux vidéo ; la carte vidéo proposée glisse et le cœur claque sur « aimer »",
  },
  {
    type: "explanation",
    start: 12.91,
    end: 14.59,
    transcript: "Eh bien, l'AI engineer est l'une des",
    lane: "low",
    objective: "Retour sur la carte-métier ; mascotte qui explique à côté",
    mascot: { pose: "explaining", attitude: "confident" },
  },
  {
    type: "diagram",
    start: 14.59,
    end: 16.3,
    transcript: "personnes qui travaillent à rendre",
    lane: "top",
    objective: "Un groupe de personnes autour d'un engrenage qui tourne ; la pastille de chaque personne s'allume",
  },
  {
    type: "callout",
    start: 16.3,
    end: 17.57,
    transcript: "tout ça possible.",
    lane: "low",
    objective: "Trois tuiles (visage, chat, vidéo) s'allument une à une, coche corail sur « possible »",
    sfx: [{ at: { wordIndex: 54 }, name: "ding" }],
  },
  {
    type: "diagram",
    start: 17.57,
    end: 19.47,
    transcript: "Son travail, c'est de créer des systèmes",
    lane: "top",
    objective: "Trois blocs reliés par des flèches qui se tracent ; le système complet s'allume sur « systèmes »",
  },
  {
    type: "explanation",
    start: 19.47,
    end: 21.58,
    transcript: "capables d'apprendre à partir d'exemples",
    lane: "low",
    objective: "Des cartes-exemples entrent dans un modèle ; la barre d'apprentissage se remplit sur « apprendre »",
  },
  {
    type: "diagram",
    start: 21.58,
    end: 23.55,
    transcript: "pour réaliser certaines tâches.",
    lane: "top",
    objective: "Liste de tâches : trois cases qui se cochent l'une après l'autre sur « réaliser » et « tâches »",
  },
  {
    type: "comparison",
    start: 23.55,
    end: 25.42,
    transcript: "Par exemple, au lieu de dire à une",
    lane: "low",
    objective: "Liste de règles écrites une à une, barrée par un « interdit » qui se dessine sur « lieu »",
  },
  {
    type: "explanation",
    start: 25.42,
    end: 27.82,
    transcript: "application comment reconnaître chaque animal,",
    lane: "top",
    objective: "Un téléphone-application, une loupe cherche et les deux têtes d'animaux (chat, chien) s'allument sur « animal »",
  },
  {
    type: "explanation",
    start: 27.82,
    end: 29.55,
    transcript: "on peut lui montrer des milliers de photos de",
    lane: "low",
    objective: "Grille de photos qui se remplit tuile après tuile ; la grille gonfle sur « milliers »",
  },
  {
    type: "explanation",
    start: 29.55,
    end: 31.73,
    transcript: "chats et de chiens pour qu'elle apprenne à faire la",
    lane: "top",
    objective: "Un chat s'allume sur « chats », un chien sur « chiens », puis les deux sont triés dans leur bac sur « apprenne »",
  },
  {
    type: "callout",
    start: 31.73,
    end: 32.76,
    transcript: "différence.",
    lane: "low",
    objective: "Chat ≠ chien : le signe « différent de » claque entre les deux sur « différence »",
  },
  {
    type: "callout",
    start: 32.76,
    end: 35.02,
    transcript: "Et ce n'est qu'un exemple parmi tant d'autres.",
    lane: "top",
    objective: "La tuile chat/chien entourée d'une couronne d'autres tuiles qui s'allument ; mascotte surprise sur « tant »",
    mascot: { pose: "surprised", attitude: "surprised" },
  },
  {
    type: "explanation",
    start: 35.02,
    end: 37.32,
    transcript: "Aujourd'hui, ces compétences sont utilisées",
    lane: "low",
    objective: "Un moyeu « AI » avec quatre rayons vers des emplacements vides ; l'engrenage tourne sur « compétences », les rayons s'allument sur « utilisées »",
  },
  {
    type: "diagram",
    start: 37.32,
    end: 39.5,
    transcript: "dans la santé, les transports, le commerce",
    lane: "top",
    objective: "Trois tuiles de domaines (croix santé, bus, panier) qui s'allument chacune sur son mot",
  },
  {
    type: "callout",
    start: 39.5,
    end: 41.08,
    transcript: "et bien d'autres domaines.",
    lane: "low",
    objective: "Les trois tuiles reculent, une grille de tuiles s'allume en vague sur « autres » et « domaines »",
  },
  {
    type: "callout",
    start: 41.08,
    end: 42.77,
    transcript: "Voilà pourquoi ce métier attire",
    lane: "top",
    objective: "Retour sur la fiche de poste de l'ouverture ; un aimant la tire vers lui sur « attire »",
  },
  {
    type: "callout",
    start: 42.77,
    end: 43.99,
    transcript: "autant l'attention.",
    lane: "low",
    objective: "Des yeux se tournent vers la fiche éclairée au projecteur ; la fiche claque sur « attention »",
  },
  {
    type: "conclusion",
    start: 43.99,
    end: 45.13,
    transcript: "Et toi, tu connaissais",
    lane: "top",
    objective: "Mascotte qui pointe le spectateur ; pastille « ET TOI ? » qui claque sur « toi »",
    mascot: { pose: "point", attitude: "friendly" },
  },
  {
    type: "conclusion",
    start: 45.13,
    end: 46.37,
    transcript: "ce métier avant cette vidéo ?",
    lane: "low",
    objective: "Carte-métier « AI ENGINEER » avec un grand « ? » corail et une bulle de commentaire qui pulse",
  },
];

const pad = (value: number): string => String(value).padStart(2, "0");

const scenes: readonly Scene[] = beats.map((beat, index) => ({
  id: `beat-${pad(index + 1)}`,
  type: beat.type,
  start: beat.start,
  end: beat.end,
  transcript: beat.transcript,
  visual: { component: "AiEngineerScene" },
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
}));

export const aiEngineerEpisode: Episode = {
  id: "metiers-du-web-c-est-quoi-un-ai-engineer",
  title: "C'est quoi un AI engineer ?",
  description:
    "Épisode 1 de la série « Les métiers du web » : ce que fait un AI engineer, expliqué simplement.",
  audio: aiEngineerAudio,
  transcript: aiEngineerTranscript,
  metadata: {
    series: "metiers-du-web",
    subject: "AI engineer",
    angle:
      "Faire comprendre qu'un AI engineer crée des systèmes qui apprennent à partir d'exemples, avec l'exemple chats / chiens.",
    tags: ["metier", "ia", "ai-engineer", "culture-tech"],
    script:
      "C'est l'un des métiers les plus recherchés dans la tech. Mais au fait, c'est quoi un AI engineer ? …",
  },
  scenes,
};
