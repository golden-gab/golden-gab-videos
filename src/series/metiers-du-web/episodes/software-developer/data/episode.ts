/**
 * Épisode Les métiers du web · 2 · « Software Developer »
 *
 * 33 beats audio-driven de 0,9 à 2,4 secondes, un message par plan.
 * L'audio est la source de vérité temporelle (50,05 s) : chaque plan est défini
 * par l'indice de son premier mot dans le transcript ; ses bornes et son texte
 * en sont déduits (aucune frontière ne peut tomber hors d'un mot).
 * Données pures : aucun import React/Remotion.
 */

import type { CaptionPosition } from "../../../../../captions/types";
import type { MascotAttitude, MascotPose } from "../../../../../components/mascot/types";
import type { Scene, SceneSfx, SceneType, Episode } from "../../../../../scenes/types";
import { softwareDeveloperAudio, softwareDeveloperTranscript } from "./transcript.ts";

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
    objective: "Téléphone et ses tuiles d'apps génériques ; la tuile messagerie s'allume sur « WhatsApp », la tuile réseau sur « Facebook »",
  },
  {
    first: 3,
    type: "callout",
    lane: "top",
    objective: "Une grille d'apps qui s'allument une à une ; la grille gonfle sur « applications »",
  },
  {
    first: 7,
    type: "callout",
    lane: "low",
    objective: "Un pouce tape sur l'écran (« utilises ») ; soleil et lune s'allument sur « chaque jour »",
  },
  {
    first: 12,
    type: "explanation",
    lane: "top",
    objective: "Deux personnes assemblent une tuile d'app en blocs ; les blocs s'emboîtent sur « construisent »",
  },
  {
    first: 20,
    type: "callout",
    lane: "low",
    objective: "Une mallette (le métier) qui s'allume sur « métiers », un engrenage qui tourne sur « faire »",
  },
  {
    first: 29,
    type: "hero",
    lane: "top",
    objective: "Carte-métier « SOFTWARE DEVELOPER » avec la balise </> ; la carte claque sur « Developer »",
    sfx: [{ at: { wordIndex: 31 }, name: "pop", volume: 0.5 }],
  },
  {
    first: 32,
    type: "callout",
    lane: "low",
    objective: "Pastilles EN → FR reliées par une flèche ; FR s'allume sur « français » ; mascotte qui explique",
    mascot: { pose: "explaining", attitude: "confident" },
  },
  {
    first: 37,
    type: "callout",
    lane: "top",
    objective: "Fenêtre de code ; la balise </> claque sur « développeur », la fenêtre s'allume sur « logiciel »",
  },
  {
    first: 39,
    type: "explanation",
    lane: "low",
    objective: "Un écran d'app dessiné en blocs fantômes ; les blocs apparaissent en cascade sur « créer »",
  },
  {
    first: 45,
    type: "comparison",
    lane: "top",
    objective: "Téléphone (« applications ») et fenêtre d'ordinateur (« logiciels ») côte à côte, chacun s'allume sur son mot",
  },
  {
    first: 49,
    type: "diagram",
    lane: "low",
    objective: "Une pastille « ! » (problème) qui tremble, une flèche qui se trace vers une pièce de puzzle qui s'emboîte sur « résoudre »",
  },
  {
    first: 55,
    type: "callout",
    lane: "top",
    objective: "Trois lignes de liste dont les coches se tracent à la suite sur « faciliter certaines tâches »",
  },
  {
    first: 60,
    type: "explanation",
    lane: "low",
    objective: "Téléphone avec l'écran d'une app de repas ; l'écran claque sur « application »",
  },
  {
    first: 66,
    type: "callout",
    lane: "top",
    objective: "Un pouce appuie sur « commander » (onde de choc) ; le bol fumant apparaît en réaction sur « repas »",
  },
  {
    first: 69,
    type: "callout",
    lane: "low",
    objective: "Une maison avec quelqu'un dedans ; la flèche de sortie est barrée sur « quitter », la maison claque sur « maison »",
  },
  {
    first: 73,
    type: "explanation",
    lane: "top",
    objective: "Une personne s'allume sur « développeur », entourée des apps qu'elle construit (messagerie, vidéo, courrier)",
  },
  {
    first: 79,
    type: "explanation",
    lane: "low",
    objective: "Un utilisateur (« tu »), une flèche vers le téléphone ; la coche se trace sur « puisses »",
  },
  {
    first: 86,
    type: "callout",
    lane: "top",
    objective: "Écran de téléphone avec la liste du menu qui défile ; la première ligne s'allume sur « menu »",
  },
  {
    first: 89,
    type: "callout",
    lane: "low",
    objective: "Une liste de plats ; le pouce coche deux lignes sur « choisir » puis « plats »",
  },
  {
    first: 92,
    type: "callout",
    lane: "top",
    objective: "Gros bouton avec un panier ; le pouce appuie sur « commande » (onde de choc)",
  },
  {
    first: 95,
    type: "callout",
    lane: "low",
    objective: "Une cloche qui sonne sur « recevoir », une notification dont la coche se trace sur « confirmation »",
    sfx: [{ at: { wordIndex: 98 }, name: "ding", volume: 0.5 }],
  },
  {
    first: 99,
    type: "explanation",
    lane: "top",
    objective: "Une grille de boutons qui s'allument un à un sur « bouton » puis « fonctionnalité »",
  },
  {
    first: 103,
    type: "explanation",
    lane: "low",
    objective: "Deux engrenages qui s'engrènent et tournent ; ils s'emballent sur « fonctionner »",
  },
  {
    first: 108,
    type: "callout",
    lane: "top",
    objective: "Un grand disque avec une coche qui se trace sur « correctement » (onde de choc, étincelles)",
  },
  {
    first: 109,
    type: "explanation",
    lane: "low",
    objective: "Quatre cartes qui se resserrent en une seule portant </> sur « résumé »",
  },
  {
    first: 111,
    type: "hero",
    lane: "top",
    objective: "Retour sur la carte-métier « SOFTWARE DEVELOPER » qui claque sur « developer »",
  },
  {
    first: 114,
    type: "diagram",
    lane: "low",
    objective: "Ampoule (idée) qui s'allume sur « idée », flèche et engrenage qui tourne vers une tuile d'app encore éteinte",
    sfx: [{ at: { wordIndex: 116 }, name: "pop", volume: 0.5 }],
  },
  {
    first: 118,
    type: "callout",
    lane: "top",
    objective: "L'app terminée dans un téléphone s'allume sur « outil » ; trois personnes s'allument sur « gens »",
  },
  {
    first: 124,
    type: "callout",
    lane: "low",
    objective: "Une app utilisée : cœur qui claque et éclats sur « utiliser » ; mascotte joyeuse",
    mascot: { pose: "happy", attitude: "excited" },
    sfx: [{ at: { wordIndex: 125 }, name: "ding", volume: 0.5 }],
  },
  {
    first: 126,
    type: "conclusion",
    lane: "top",
    objective: "Mascotte qui pointe le spectateur ; pastille « ET TOI ? » qui claque sur « toi »",
    mascot: { pose: "point", attitude: "friendly" },
    sfx: [{ at: { wordIndex: 127 }, name: "pop", volume: 0.5 }],
  },
  {
    first: 131,
    type: "conclusion",
    lane: "low",
    objective: "Un téléphone vierge et un grand « + » qui pulse sur « créer » ; une pièce de puzzle s'allume sur « résoudre »",
  },
  {
    first: 136,
    type: "conclusion",
    lane: "top",
    objective: "Une horloge dont les aiguilles tournent (le quotidien) et une pastille « ! » qui tremble sur « problème »",
  },
  {
    first: 141,
    type: "conclusion",
    lane: "low",
    objective: "Un téléphone vierge en pointillés et un grand « ? » qui claque sur « laquelle » ; mascotte pensive",
    mascot: { pose: "thinking", attitude: "curious" },
  },
];

const pad = (value: number): string => String(value).padStart(2, "0");

const words = softwareDeveloperTranscript.segments;

const scenes: readonly Scene[] = beats.map((beat, index) => {
  const next = beats[index + 1];
  const start = index === 0 ? 0 : words[beat.first].start;
  const end = next ? words[next.first].start : softwareDeveloperAudio.duration;
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
    visual: { component: "SoftwareDeveloperScene" },
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

export const softwareDeveloperEpisode: Episode = {
  id: "metiers-du-web-software-developer",
  title: "C'est quoi un Software Developer ?",
  description:
    "Épisode 2 de la série « Les métiers du web » : ce que fait un développeur logiciel, expliqué simplement avec l'exemple d'une app de commande de repas.",
  audio: softwareDeveloperAudio,
  transcript: softwareDeveloperTranscript,
  metadata: {
    series: "metiers-du-web",
    subject: "Software Developer (développeur logiciel)",
    angle:
      "Faire comprendre qu'un développeur transforme une idée en un outil utilisable, avec l'exemple d'une app de commande de repas.",
    tags: ["metier", "developpement", "software-developer", "culture-tech"],
    script:
      "Derrière WhatsApp, Facebook ou encore les applications que tu utilises chaque jour, il y a des personnes qui les construisent. …",
  },
  scenes,
};
