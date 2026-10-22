/**
 * Épisode La tech sans jargon · 1 · « Vrai ou faux : la navigation privée »
 *
 * 41 beats audio-driven de 0,6 à 2,3 secondes, un message par plan.
 * L'audio est la source de vérité temporelle (59,74 s) : chaque plan est défini
 * par l'indice de son premier mot dans le transcript ; ses bornes et son texte
 * en sont déduits (aucune frontière ne peut tomber hors d'un mot).
 * Données pures : aucun import React/Remotion.
 */

import type { CaptionPosition } from "../../../../../captions/types";
import type { MascotAttitude, MascotPose } from "../../../../../components/mascot/types";
import type { Scene, SceneSfx, SceneType, Episode } from "../../../../../scenes/types";
import { navigationPriveeAudio, navigationPriveeTranscript } from "./transcript.ts";

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
    objective: "Deux pastilles VRAI / FAUX ; chacune s'allume sur le mot qui la nomme",
  },
  {
    first: 3,
    type: "callout",
    lane: "top",
    objective: "Une fenêtre de navigateur ; une seconde fenêtre sombre au masque de navigation privée s'allume sur « privé »",
  },
  {
    first: 10,
    type: "callout",
    lane: "low",
    objective: "Un globe (« Internet ») ; un œil barré se trace sur « savoir » : la croyance que personne ne voit rien",
  },
  {
    first: 15,
    type: "callout",
    lane: "top",
    objective: "Une personne et des lignes d'activité ; un grand « ? » claque sur « fais »",
  },
  {
    first: 19,
    type: "hero",
    lane: "low",
    objective: "Pastille FAUX qui claque avec une croix et une onde de choc",
    sfx: [{ at: { wordIndex: 19 }, name: "pop", volume: 0.5 }],
  },
  {
    first: 20,
    type: "explanation",
    lane: "top",
    objective: "Un téléphone ; mascotte pensive appelée par « Imagine »",
    mascot: { pose: "thinking", attitude: "curious" },
  },
  {
    first: 26,
    type: "callout",
    lane: "low",
    objective: "Un doigt tape (« ouvres ») et une nouvelle fenêtre de navigateur apparaît sur « fenêtre »",
  },
  {
    first: 32,
    type: "diagram",
    lane: "top",
    objective: "La fenêtre devient sombre, le masque s'allume sur « privée » ; une bulle de pensée sur « dis »",
  },
  {
    first: 37,
    type: "callout",
    lane: "low",
    objective: "Un grand disque coché qui claque sur « Parfait » ; une personne qui se cache sur « personne »",
  },
  {
    first: 41,
    type: "diagram",
    lane: "top",
    objective: "Une barre de recherche qui se remplit, une loupe qui brille sur « chercher »",
  },
  {
    first: 47,
    type: "explanation",
    lane: "low",
    objective: "Le masque de navigation privée tremble sur « Sauf » ; mascotte surprise ; une croix se trace sur « pas »",
    mascot: { pose: "surprised", attitude: "surprised" },
  },
  {
    first: 53,
    type: "diagram",
    lane: "top",
    objective: "Un engrenage qui tourne derrière une fenêtre ; il s'allume sur « fonctionne »",
  },
  {
    first: 58,
    type: "callout",
    lane: "low",
    objective: "La fenêtre sombre au masque, qui s'allume sur « privée » et tremble sur « empêche »",
  },
  {
    first: 62,
    type: "callout",
    lane: "top",
    objective: "Une fenêtre de navigateur claire avec un globe ; elle s'allume sur « navigateur »",
  },
  {
    first: 65,
    type: "diagram",
    lane: "low",
    objective: "Un point d'enregistrement qui s'allume sur « enregistrer » ; trois pages tombent dans un carnet",
  },
  {
    first: 68,
    type: "diagram",
    lane: "top",
    objective: "Une personne et trois tuiles de sites ; la flèche se trace de l'une vers les autres sur « visites »",
  },
  {
    first: 73,
    type: "callout",
    lane: "low",
    objective: "Une liste d'historique (horloge + lignes) qui se remplit ligne à ligne sur « historique »",
  },
  {
    first: 75,
    type: "callout",
    lane: "top",
    objective: "Une personne en pointillés et une croix qui se trace sur « pas »",
  },
  {
    first: 81,
    type: "callout",
    lane: "low",
    objective: "Une personne sous un projecteur ; un œil la regarde et claque sur « invisible »",
  },
  {
    first: 82,
    type: "callout",
    lane: "top",
    objective: "Trois tuiles de sites (globe, journal, vidéo) qui s'allument une à une sur « sites » puis « consultes »",
  },
  {
    first: 87,
    type: "diagram",
    lane: "low",
    objective: "Une tuile de site et un grand œil ; un visiteur arrive sur « visite »",
  },
  {
    first: 92,
    type: "callout",
    lane: "top",
    objective: "Une antenne relais qui s'allume sur « fournisseur » ; un globe sur « Internet »",
  },
  {
    first: 95,
    type: "explanation",
    lane: "low",
    objective: "Un œil au-dessus de lignes d'activité ; seules quelques lignes s'allument, sur « partie » puis « activité »",
  },
  {
    first: 103,
    type: "callout",
    lane: "top",
    objective: "Un téléphone et un grand Wi-Fi qui émet des ondes sur « Wi-Fi »",
  },
  {
    first: 109,
    type: "callout",
    lane: "low",
    objective: "Deux tuiles (école, bureau) sous un Wi-Fi ; elles s'allument sur « école » puis « travail »",
  },
  {
    first: 116,
    type: "explanation",
    lane: "top",
    objective: "Une carte d'activités dont quelques lignes s'ouvrent sur un œil, sur « certaines » puis « visibles »",
  },
  {
    first: 121,
    type: "diagram",
    lane: "low",
    objective: "Une personne-administrateur avec un engrenage devant un réseau de points ; le réseau s'allume sur « réseau »",
  },
  {
    first: 128,
    type: "explanation",
    lane: "top",
    objective: "Une feuille et un crayon qui écrit ; mascotte qui explique, appelée par « Imagine »",
    mascot: { pose: "explaining", attitude: "confident" },
  },
  {
    first: 134,
    type: "callout",
    lane: "low",
    objective: "Une feuille écrite qui se déchire en deux sur « déchires »",
    sfx: [{ at: { wordIndex: 141 }, name: "swipe", volume: 0.5 }],
  },
  {
    first: 142,
    type: "callout",
    lane: "top",
    objective: "Une feuille dont les lignes s'effacent sur « effacé »",
  },
  {
    first: 147,
    type: "comparison",
    lane: "low",
    objective: "Une feuille blanche, un signe « différent de » qui se trace sur « pas », un œil",
  },
  {
    first: 154,
    type: "callout",
    lane: "top",
    objective: "Une personne qui écrit, un témoin dont l'œil la suit ; l'œil s'allume sur « vu »",
  },
  {
    first: 159,
    type: "hero",
    lane: "low",
    objective: "Un disque « ! » qui claque sur « réalité », avec des étincelles",
    sfx: [{ at: { wordIndex: 160 }, name: "ding", volume: 0.5 }],
  },
  {
    first: 161,
    type: "callout",
    lane: "top",
    objective: "La fenêtre sombre au masque de navigation privée s'allume sur « privée »",
  },
  {
    first: 164,
    type: "diagram",
    lane: "low",
    objective: "Un bouclier dont la coche se trace sur « éviter »",
  },
  {
    first: 168,
    type: "diagram",
    lane: "top",
    objective: "Une première personne, une flèche, une seconde personne qui s'allume sur « prochaine »",
  },
  {
    first: 174,
    type: "callout",
    lane: "low",
    objective: "Un téléphone et une loupe qui le parcourt sur « retrouve »",
  },
  {
    first: 178,
    type: "callout",
    lane: "top",
    objective: "Une liste d'historique vide, protégée par un bouclier coché, sur « historique »",
  },
  {
    first: 180,
    type: "conclusion",
    lane: "low",
    objective: "Mascotte qui pointe le spectateur, appelée par « dis-moi »",
    mascot: { pose: "point", attitude: "friendly" },
  },
  {
    first: 182,
    type: "explanation",
    lane: "top",
    objective: "Une personne pensive et une bulle avec le masque de navigation privée ; « ? » sur « vraiment »",
  },
  {
    first: 189,
    type: "conclusion",
    lane: "low",
    objective: "Une personne sous un œil : la bulle de commentaire claque sur « Internet » pour inviter à répondre",
  },
];

const pad = (value: number): string => String(value).padStart(2, "0");

const words = navigationPriveeTranscript.segments;

const scenes: readonly Scene[] = beats.map((beat, index) => {
  const next = beats[index + 1];
  const start = index === 0 ? 0 : words[beat.first].start;
  const end = next ? words[next.first].start : navigationPriveeAudio.duration;
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
    visual: { component: "NavigationPriveeScene" },
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

export const navigationPriveeEpisode: Episode = {
  id: "tech-sans-jargon-navigation-privee",
  title: "Vrai ou faux : la navigation privée te rend invisible ?",
  description:
    "Épisode 1 de la série « La tech sans jargon » : ce que la navigation privée cache vraiment (l'historique sur ton téléphone) et ce qu'elle ne cache pas.",
  audio: navigationPriveeAudio,
  transcript: navigationPriveeTranscript,
  metadata: {
    series: "tech-sans-jargon",
    subject: "Navigation privée (mode privé du navigateur)",
    angle:
      "Vrai ou faux : la navigation privée n'efface que l'historique sur ton appareil ; les sites, le fournisseur Internet et le réseau Wi-Fi (école, travail) peuvent toujours voir.",
    tags: ["vrai-ou-faux", "vie-privee", "navigateur", "culture-tech"],
    script:
      "Vrai ou faux : quand tu navigues en mode privé sur Internet, personne ne peut savoir ce que tu fais ? Faux ! …",
  },
  scenes,
};
