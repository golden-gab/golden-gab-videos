/**
 * Épisode La tech sans jargon · 5 · « C'est quoi un nom de domaine ? »
 *
 * 66 beats audio-driven de 0,6 à 2,1 secondes, un message par plan.
 * L'audio est la source de vérité temporelle (78,13 s) : chaque plan est défini
 * par l'indice de son premier mot dans le transcript ; ses bornes et son texte
 * en sont déduits (aucune frontière ne peut tomber hors d'un mot).
 * Fil rouge visuel : les trois éléments d'un site (nom de domaine,
 * hébergement, site Internet) d'abord montrés tels quels (barre d'adresse,
 * serveur, fenêtre de site), puis racontés par une maison : l'adresse
 * (nom de domaine), le terrain (hébergement) et la maison (le site).
 * Données pures : aucun import React/Remotion.
 */

import type { CaptionPosition } from "../../../../../captions/types";
import type { MascotAttitude, MascotPose } from "../../../../../components/mascot/types";
import type { Scene, SceneSfx, SceneType, Episode } from "../../../../../scenes/types";
import { nomDeDomaineAudio, nomDeDomaineTranscript } from "./transcript.ts";

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
    objective: "Une barre d'adresse (un nom + « .com ») : « .com » s'allume sur « Google.com »",
  },
  {
    first: 1,
    type: "hero",
    lane: "top",
    objective: "Deux barres d'adresse : la nouvelle s'allume sur « Facebook.com »",
  },
  {
    first: 2,
    type: "hero",
    lane: "low",
    objective: "Trois barres d'adresse empilées : la dernière s'allume sur « YouTube.com »",
  },
  {
    first: 3,
    type: "callout",
    lane: "top",
    objective: "Un œil qui regarde la pile d'adresses : l'iris s'allume sur « vois »",
  },
  {
    first: 9,
    type: "callout",
    lane: "low",
    objective: "Un soleil et sept jours : ils s'allument un à un sur « tous les jours »",
  },
  {
    first: 12,
    type: "callout",
    lane: "top",
    objective: "Une personne et un « ? » qui claque sur « est-ce que tu sais »",
  },
  {
    first: 17,
    type: "diagram",
    lane: "low",
    objective: "Une barre d'adresse dont un rideau se lève sur « cache » : derrière, une forme en pointillés",
  },
  {
    first: 22,
    type: "diagram",
    lane: "top",
    objective: "Une loupe passe derrière une adresse : elle s'allume sur « adresses »",
  },
  {
    first: 25,
    type: "explanation",
    lane: "low",
    objective: "Mascotte pensive appelée par « Imagine » ; une bulle de pensée avec une fenêtre de site vide",
    mascot: { pose: "thinking", attitude: "curious" },
  },
  {
    first: 29,
    type: "diagram",
    lane: "top",
    objective: "Une fenêtre de site qui décolle (flèche vers le haut) : le site s'allume sur « lancer »",
  },
  {
    first: 34,
    type: "callout",
    lane: "low",
    objective: "Un visiteur devant la fenêtre de site, cadenas fermé : le cadenas claque sur « Avant »",
  },
  {
    first: 40,
    type: "diagram",
    lane: "top",
    objective: "Le cadenas s'ouvre et le visiteur entre dans le site sur « visiter »",
  },
  {
    first: 44,
    type: "callout",
    lane: "low",
    objective: "Trois disques 1, 2, 3 : ils s'allument un à un sur « trois », « éléments », « essentiels »",
  },
  {
    first: 47,
    type: "callout",
    lane: "top",
    objective: "Une toque de savoir (casquette) et les trois disques : elle s'allume sur « connaître »",
  },
  {
    first: 51,
    type: "hero",
    lane: "low",
    objective: "Un grand disque « 1 » qui claque sur « premier »",
  },
  {
    first: 55,
    type: "hero",
    lane: "top",
    objective: "La pastille NOM DE DOMAINE claque sur « nom » puis « domaine » ; la barre d'adresse derrière",
    sfx: [{ at: { wordIndex: 55 }, name: "pop", volume: 0.4 }],
  },
  {
    first: 58,
    type: "callout",
    lane: "low",
    objective: "Une barre d'adresse en grand : elle s'allume sur « simplement »",
  },
  {
    first: 61,
    type: "diagram",
    lane: "top",
    objective: "Une barre de recherche où le nom se tape : il se remplit sur « tapent »",
  },
  {
    first: 66,
    type: "diagram",
    lane: "low",
    objective: "Une fenêtre de navigateur qui s'allume sur « navigateur »",
  },
  {
    first: 69,
    type: "diagram",
    lane: "top",
    objective: "Une flèche de la barre d'adresse vers un site qui s'ouvre sur « accéder »",
  },
  {
    first: 74,
    type: "hero",
    lane: "low",
    objective: "La barre d'adresse avec « monsite.com » écrit en clair : elle s'allume sur « monsite.com »",
    sfx: [{ at: { wordIndex: 75 }, name: "ding", volume: 0.4 }],
  },
  {
    first: 76,
    type: "hero",
    lane: "top",
    objective: "Un grand disque « 2 » qui claque sur « deuxième »",
  },
  {
    first: 79,
    type: "hero",
    lane: "low",
    objective: "La pastille HÉBERGEMENT claque sur « hébergement » avec un serveur",
    sfx: [{ at: { wordIndex: 79 }, name: "pop", volume: 0.4 }],
  },
  {
    first: 80,
    type: "callout",
    lane: "top",
    objective: "Une épingle de lieu qui s'allume sur « endroit »",
  },
  {
    first: 83,
    type: "callout",
    lane: "low",
    objective: "Trois fichiers qui s'allument un à un sur « fichiers »",
  },
  {
    first: 88,
    type: "callout",
    lane: "top",
    objective: "Une boîte de stockage fermée avec une coche sur « conservés »",
  },
  {
    first: 90,
    type: "callout",
    lane: "low",
    objective: "Un ordinateur (serveur) dans une bulle de pensée : il s'allume sur « ordinateur »",
  },
  {
    first: 93,
    type: "diagram",
    lane: "top",
    objective: "Le serveur et la mini-fenêtre du site posée dessus : ils s'allument sur « garde » puis « disponible »",
  },
  {
    first: 98,
    type: "diagram",
    lane: "low",
    objective: "Trois visiteurs qui arrivent vers le serveur : ils s'allument un à un sur « visiteurs »",
  },
  {
    first: 103,
    type: "callout",
    lane: "top",
    objective: "Un œil devant la page du site : il s'allume sur « consulter »",
  },
  {
    first: 105,
    type: "hero",
    lane: "low",
    objective: "Un grand disque « 3 » qui claque sur « troisième »",
  },
  {
    first: 109,
    type: "hero",
    lane: "top",
    objective: "La pastille SITE INTERNET claque sur « site » avec une fenêtre de site",
    sfx: [{ at: { wordIndex: 109 }, name: "pop", volume: 0.4 }],
  },
  {
    first: 113,
    type: "callout",
    lane: "low",
    objective: "Une flèche circulaire autour du site (lui-même) qui s'allume sur « lui-même »",
  },
  {
    first: 114,
    type: "callout",
    lane: "top",
    objective: "Un site entier, tout allumé sur « tout »",
  },
  {
    first: 119,
    type: "callout",
    lane: "low",
    objective: "Un visiteur et une loupe sur le site : la loupe s'allume sur « découvrir »",
  },
  {
    first: 122,
    type: "callout",
    lane: "top",
    objective: "Une pile de pages qui s'allume sur « pages »",
  },
  {
    first: 125,
    type: "callout",
    lane: "low",
    objective: "Un cadre d'image (montagne, soleil) qui s'allume sur « images »",
  },
  {
    first: 127,
    type: "callout",
    lane: "top",
    objective: "Des lignes de texte qui se remplissent sur « textes »",
  },
  {
    first: 130,
    type: "callout",
    lane: "low",
    objective: "Un bouton et un interrupteur : un clic sur « fonctionnalités »",
  },
  {
    first: 131,
    type: "explanation",
    lane: "top",
    objective: "Mascotte surprise appelée par « attention » ; un panneau « ! »",
    mascot: { pose: "surprised", attitude: "surprised" },
  },
  {
    first: 133,
    type: "callout",
    lane: "low",
    objective: "Trois disques 1, 2, 3 côte à côte : ils s'allument un à un sur « trois », « éléments »",
  },
  {
    first: 137,
    type: "callout",
    lane: "top",
    objective: "Les trois disques séparés par des signes « différent de » : ils claquent sur « pas » et « chose »",
  },
  {
    first: 142,
    type: "hero",
    lane: "low",
    objective: "Une bulle de pensée avec une maison en pointillés sur « Imagine »",
  },
  {
    first: 145,
    type: "diagram",
    lane: "top",
    objective: "Une maison qui se construit trait par trait sur « construises », se remplit sur « maison » ; un marteau",
  },
  {
    first: 148,
    type: "hero",
    lane: "low",
    objective: "La pastille NOM DE DOMAINE au-dessus de la maison : elle claque sur « nom »",
    sfx: [{ at: { wordIndex: 148 }, name: "pop", volume: 0.4 }],
  },
  {
    first: 152,
    type: "callout",
    lane: "top",
    objective: "Une plaque d'adresse sur son poteau devant la maison : elle s'allume sur « adresse »",
  },
  {
    first: 155,
    type: "hero",
    lane: "low",
    objective: "La pastille HÉBERGEMENT claque sur « hébergement » ; un terrain en pointillés dessous",
    sfx: [{ at: { wordIndex: 155 }, name: "pop", volume: 0.4 }],
  },
  {
    first: 158,
    type: "callout",
    lane: "top",
    objective: "Le terrain en perspective s'allume sur « terrain »",
  },
  {
    first: 161,
    type: "diagram",
    lane: "low",
    objective: "La maison descend et se pose sur le terrain : elle s'ancre sur « construite »",
  },
  {
    first: 164,
    type: "hero",
    lane: "top",
    objective: "La pastille SITE INTERNET claque sur « site » ; la maison est derrière",
    sfx: [{ at: { wordIndex: 164 }, name: "pop", volume: 0.4 }],
  },
  {
    first: 168,
    type: "diagram",
    lane: "low",
    objective: "La maison s'allume sur « maison » et une mini-fenêtre de site s'allume sur « elle-même »",
  },
  {
    first: 172,
    type: "callout",
    lane: "top",
    objective: "Un poteau d'adresse seul sur un terrain vide : il s'allume sur « adresse »",
  },
  {
    first: 177,
    type: "callout",
    lane: "low",
    objective: "Le même terrain avec une maison en pointillés (pas construite) : une croix s'allume sur « construit »",
  },
  {
    first: 182,
    type: "callout",
    lane: "top",
    objective: "Une maison sur son terrain, sans aucune plaque : elle s'allume sur « maison »",
  },
  {
    first: 188,
    type: "callout",
    lane: "low",
    objective: "Trois personnes perdues, des « ? » qui claquent sur « gens » puis « sachent »",
  },
  {
    first: 193,
    type: "diagram",
    lane: "top",
    objective: "Une épingle et une loupe qui cherchent : la loupe balaye jusqu'à « trouver »",
  },
  {
    first: 196,
    type: "callout",
    lane: "low",
    objective: "Un globe terrestre qui s'allume sur « Internet »",
  },
  {
    first: 199,
    type: "explanation",
    lane: "top",
    objective: "Mascotte qui explique, appelée par « exactement » ; trois paires qui s'égalent : plaque = adresse, terrain = serveur, maison = site",
    mascot: { pose: "explaining", attitude: "confident" },
  },
  {
    first: 203,
    type: "callout",
    lane: "low",
    objective: "Un calendrier dont le jour suivant s'allume sur « prochaine fois »",
  },
  {
    first: 207,
    type: "diagram",
    lane: "top",
    objective: "Une barre d'adresse où le nom se tape sur « taperas »",
  },
  {
    first: 210,
    type: "callout",
    lane: "low",
    objective: "La barre d'adresse (nom + « .com ») s'allume sur « Google.com »",
  },
  {
    first: 212,
    type: "callout",
    lane: "top",
    objective: "Une seconde barre d'adresse s'allume sur « YouTube.com »",
  },
  {
    first: 213,
    type: "explanation",
    lane: "low",
    objective: "Mascotte joyeuse appelée par « sauras » ; une barre d'adresse allumée",
    mascot: { pose: "happy", attitude: "excited" },
  },
  {
    first: 218,
    type: "diagram",
    lane: "top",
    objective: "La barre d'adresse devant, et derrière elle les trois pièces (plaque, terrain, maison) qui s'allument sur « plus »",
  },
  {
    first: 223,
    type: "diagram",
    lane: "low",
    objective: "Le rideau de la barre d'adresse se lève sur « derrière » : la maison sur son terrain apparaît",
    sfx: [{ at: { wordIndex: 223 }, name: "ding", volume: 0.4 }],
  },
  {
    first: 226,
    type: "conclusion",
    lane: "top",
    objective: "Les trois disques 1, 2, 3 (domaine, hébergement, site) s'allument un à un sur « connaissais » puis « différence » ; la question relance les commentaires",
    mascot: { pose: "point", attitude: "confident" },
    sfx: [{ at: { wordIndex: 229 }, name: "pop", volume: 0.4 }],
  },
];

const pad = (value: number): string => String(value).padStart(2, "0");

const words = nomDeDomaineTranscript.segments;

const scenes: readonly Scene[] = beats.map((beat, index) => {
  const next = beats[index + 1];
  const start = index === 0 ? 0 : words[beat.first].start;
  const end = next ? words[next.first].start : nomDeDomaineAudio.duration;
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
    visual: { component: "NomDeDomaineScene" },
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

export const nomDeDomaineEpisode: Episode = {
  id: "tech-sans-jargon-nom-de-domaine",
  title: "C'est quoi un nom de domaine ?",
  description:
    "Épisode 5 de la série « La tech sans jargon » : les trois éléments d'un site Internet (nom de domaine, hébergement, site) expliqués avec l'image d'une maison — l'adresse, le terrain et la maison.",
  audio: nomDeDomaineAudio,
  transcript: nomDeDomaineTranscript,
  metadata: {
    series: "tech-sans-jargon",
    subject: "Nom de domaine, hébergement et site Internet",
    angle:
      "Lancer un site demande trois choses distinctes : le nom de domaine (l'adresse que les gens tapent dans leur navigateur, comme monsite.com), l'hébergement (l'endroit où les fichiers du site sont conservés, un ordinateur qui garde le site disponible) et le site lui-même (les pages, images, textes et fonctionnalités). Image de la maison : le nom de domaine est son adresse, l'hébergement le terrain sur lequel elle est construite, le site la maison elle-même. On peut avoir une adresse sans maison, ou une maison que personne ne sait trouver.",
    tags: ["nom-de-domaine", "hebergement", "site-internet", "culture-tech"],
    script:
      "Google.com, Facebook.com, YouTube.com… Tu vois ce genre de termes tous les jours. Mais est-ce que tu sais vraiment ce qui se cache derrière ces adresses ? … Le nom de domaine, c'est son adresse. L'hébergement, c'est le terrain sur lequel elle est construite. Et le site Internet, c'est la maison elle-même. … Tu connaissais cette différence ?",
  },
  scenes,
};
