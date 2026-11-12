/**
 * Épisode La tech sans jargon · 6 · « Le faux message “tu as gagné un iPhone” »
 * (phishing / hameçonnage).
 *
 * 53 beats audio-driven de 0,5 à 2,3 secondes, un message par plan.
 * L'audio est la source de vérité temporelle (65,36 s) : chaque plan est défini
 * par l'indice de son premier mot dans le transcript ; ses bornes et son texte
 * en sont déduits (aucune frontière ne peut tomber hors d'un mot).
 * Fil rouge visuel : le cadeau (la boîte) est l'appât. On le voit arriver,
 * on se demande à quel jeu on a joué (manette, formulaire, ticket : trois
 * « non »), le lien mène à une fausse page qui copie une vraie, les
 * informations partent chez un inconnu, puis le mot « hameçonnage » : l'hameçon
 * et son appât. Aucune marque dessinée : « iPhone » n'est qu'un mot, le
 * téléphone est générique.
 * Données pures : aucun import React/Remotion.
 */

import type { CaptionPosition } from "../../../../../captions/types";
import type { MascotAttitude, MascotPose } from "../../../../../components/mascot/types";
import type { Scene, SceneSfx, SceneType, Episode } from "../../../../../scenes/types";
import { phishingAudio, phishingTranscript } from "./transcript.ts";

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
  { first: 0, type: "hero", lane: "low", objective: "Une boîte-cadeau qui secoue son couvercle, confettis : tout s'allume sur « Félicitations »", sfx: [{ at: { frame: 0 }, name: "pop", volume: 0.5 }] },
  { first: 1, type: "hero", lane: "top", objective: "Une coupe de vainqueur et une personne : la coupe s'allume sur « gagner »" },
  { first: 6, type: "hero", lane: "low", objective: "Un téléphone générique et un disque « 17 » qui claque sur « 17 »" },
  { first: 8, type: "callout", lane: "top", objective: "La boîte-cadeau et une flèche vers la personne : la flèche se trace sur « récupérer »" },
  { first: 11, type: "callout", lane: "low", objective: "Un lien (chaîne) et un curseur qui clique dessus sur « cliquer »" },
  { first: 19, type: "diagram", lane: "top", objective: "Un formulaire dont les champs se remplissent sur « renseigner »" },
  { first: 22, type: "callout", lane: "low", objective: "Trois cartes d'informations (nom, numéro, e-mail) qui s'allument sur « informations »" },
  { first: 24, type: "explanation", lane: "top", objective: "Mascotte joyeuse appelée par « Franchement » ; trois personnes s'allument un à un sur « n'aimerait »", mascot: { pose: "happy", attitude: "excited" } },
  { first: 27, type: "callout", lane: "low", objective: "Une enveloppe qui tombe dans un téléphone sur « recevoir »" },
  { first: 29, type: "callout", lane: "top", objective: "Un téléphone, une bulle de message qui s'allume en corail sur « pareil »" },
  { first: 32, type: "explanation", lane: "low", objective: "Mascotte pensive appelée par « Mais » ; une personne et un « ? » qui claque sur « participé »", mascot: { pose: "thinking", attitude: "curious" } },
  { first: 36, type: "callout", lane: "top", objective: "Une manette de jeu et un « ? » : la manette s'allume sur « jeu »" },
  { first: 40, type: "callout", lane: "low", objective: "Un formulaire vide et un « ? » : le formulaire s'allume sur « formulaire »" },
  { first: 45, type: "callout", lane: "top", objective: "Un ticket et un « ? » : le ticket s'allume sur « ticket »" },
  { first: 50, type: "callout", lane: "low", objective: "Manette, formulaire, ticket : une grande croix les barre sur « Non »", sfx: [{ at: { wordIndex: 50 }, name: "error", volume: 0.4 }] },
  { first: 51, type: "callout", lane: "top", objective: "Une personne et une boîte-cadeau tendue vers elle : un « ? » claque sur « pourquoi »" },
  { first: 57, type: "callout", lane: "low", objective: "Un téléphone et une pile de pièces : les pièces s'allument sur « cher »" },
  { first: 60, type: "callout", lane: "top", objective: "Une flèche qui tombe sur la boîte-cadeau : elle se trace sur « là »" },
  { first: 64, type: "explanation", lane: "low", objective: "Mascotte surprise appelée par « piège » ; la boîte-cadeau sous un panneau d'avertissement", mascot: { pose: "surprised", attitude: "surprised" } },
  { first: 68, type: "diagram", lane: "top", objective: "Un lien (chaîne) puis une flèche vers une fenêtre de site : la flèche se trace sur « redirige »" },
  { first: 73, type: "diagram", lane: "low", objective: "Une fenêtre de site portant le masque du pirate : il s'allume sur « fausse »" },
  { first: 78, type: "comparison", lane: "top", objective: "Deux fenêtres identiques côte à côte (vrai / faux), un signe égal qui s'allume sur « parfaitement »" },
  { first: 84, type: "diagram", lane: "low", objective: "Un formulaire dont le champ « nom » se remplit sur « nom »" },
  { first: 89, type: "diagram", lane: "top", objective: "Un clavier de téléphone dont les touches s'allument sur « numéro », « téléphone »" },
  { first: 93, type: "diagram", lane: "low", objective: "Une enveloppe qui s'ouvre sur « e-mail »" },
  { first: 96, type: "callout", lane: "top", objective: "Le formulaire a trois champs remplis et un quatrième qui s'allume en secouant sur « parfois »" },
  { first: 100, type: "callout", lane: "low", objective: "Une clé et un champ de points : le cadenas s'ouvre sur « passe »" },
  { first: 103, type: "explanation", lane: "top", objective: "Une personne et sa bulle de pensée : un formulaire anodin avec une coche sur « simple »" },
  { first: 108, type: "diagram", lane: "low", objective: "Le formulaire, une flèche, la boîte-cadeau : la flèche se trace sur « récupérer »" },
  { first: 111, type: "callout", lane: "top", objective: "La boîte-cadeau s'ouvre et révèle le masque du pirate sur « réalité »", sfx: [{ at: { wordIndex: 115 }, name: "pop", volume: 0.4 }] },
  { first: 116, type: "diagram", lane: "low", objective: "Une personne, une flèche, le pirate : la flèche se trace sur « transmettre »" },
  { first: 122, type: "diagram", lane: "top", objective: "Trois cartes d'informations qui s'envolent vers la droite sur « informations »" },
  { first: 124, type: "callout", lane: "low", objective: "Une silhouette en pointillés (l'inconnu) et un « ? » qui claque sur « inconnu »" },
  { first: 127, type: "callout", lane: "top", objective: "Un panneau d'avertissement et une étiquette de nom vide : l'étiquette s'allume sur « nom »" },
  { first: 132, type: "diagram", lane: "low", objective: "La pastille PHISHING claque sur « phishing » ; un hameçon pend avec la boîte-cadeau en appât", sfx: [{ at: { wordIndex: 133 }, name: "ding", volume: 0.4 }] },
  { first: 134, type: "diagram", lane: "top", objective: "La pastille HAMEÇONNAGE claque sur « hameçonnage » ; un poisson mord l'appât" },
  { first: 136, type: "explanation", lane: "low", objective: "Mascotte qui explique appelée par « principe » ; trois pastilles appât → clic → informations", mascot: { pose: "explaining", attitude: "confident" } },
  { first: 140, type: "diagram", lane: "top", objective: "La boîte-cadeau sur un hameçon, une personne qui se penche vers elle sur « attire »" },
  { first: 145, type: "callout", lane: "low", objective: "La boîte-cadeau, grande, qui claque sur « cadeau »" },
  { first: 147, type: "callout", lane: "top", objective: "Un chronomètre dont l'aiguille tourne sur « urgence »" },
  { first: 151, type: "diagram", lane: "low", objective: "Un bouton-lien et un curseur poussé vers lui : le bouton s'enfonce sur « cliquer »" },
  { first: 156, type: "diagram", lane: "top", objective: "Une personne, une flèche, un pirate : une enveloppe voyage sur « donner »" },
  { first: 160, type: "callout", lane: "low", objective: "Une carte d'identité (visage + lignes) qui s'allume sur « personnelles »" },
  { first: 162, type: "callout", lane: "top", objective: "Un carnet : le crayon écrit une ligne sur « retiens »" },
  { first: 166, type: "callout", lane: "low", objective: "Une personne devant une manette : le cercle barré se trace sur « participé »" },
  { first: 170, type: "callout", lane: "top", objective: "La manette barrée : une secousse sur « aucun »" },
  { first: 173, type: "callout", lane: "low", objective: "Une coupe en pointillés et un « ? » : tout s'allume sur « probablement »" },
  { first: 177, type: "callout", lane: "top", objective: "La boîte-cadeau vide, barrée d'une croix qui claque sur « gagné »" },
  { first: 178, type: "callout", lane: "low", objective: "Un bouton-lien barré : le cercle se trace sur « pas »" },
  { first: 181, type: "diagram", lane: "top", objective: "Un formulaire verrouillé : le cadenas se ferme sur « information »" },
  { first: 185, type: "diagram", lane: "low", objective: "Un message sur un téléphone, un drapeau planté sur « signale », une coche sur « message »", sfx: [{ at: { wordIndex: 186 }, name: "pop", volume: 0.4 }] },
  { first: 189, type: "callout", lane: "top", objective: "Un téléphone qui reçoit une bulle de message, la cloche sonne sur « reçu »" },
  { first: 194, type: "conclusion", lane: "low", objective: "Mascotte qui désigne appelée par « message » ; une bulle de discussion et un « ? » qui relancent les commentaires", mascot: { pose: "point", attitude: "confident" }, sfx: [{ at: { wordIndex: 197 }, name: "pop", volume: 0.4 }] },
];

const pad = (value: number): string => String(value).padStart(2, "0");

const words = phishingTranscript.segments;

const scenes: readonly Scene[] = beats.map((beat, index) => {
  const next = beats[index + 1];
  const start = index === 0 ? 0 : words[beat.first].start;
  const end = next ? words[next.first].start : phishingAudio.duration;
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
    visual: { component: "PhishingScene" },
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

export const phishingEpisode: Episode = {
  id: "tech-sans-jargon-phishing",
  title: "Le faux message « tu as gagné un iPhone »",
  description:
    "Épisode 6 de la série « La tech sans jargon » : le phishing (hameçonnage). Un message annonce un cadeau qu'on n'a jamais gagné ; le lien mène à une fausse page qui vole nom, numéro, e-mail et mot de passe. Réflexe : pas de participation, pas de gain ; ne pas cliquer, ne rien renseigner, signaler.",
  audio: phishingAudio,
  transcript: phishingTranscript,
  metadata: {
    series: "tech-sans-jargon",
    subject: "Phishing (hameçonnage) : le faux gain d'un iPhone",
    angle:
      "On n'a participé à aucun jeu, on n'a rempli aucun formulaire ni acheté de ticket : un cadeau qu'on n'a jamais demandé est un appât. Le lien redirige vers une fausse page, parfois identique à un vrai site, qui demande nom, numéro de téléphone, e-mail et parfois mot de passe : on les transmet à un inconnu. Le phishing (hameçonnage) attire avec une promesse, un cadeau ou une urgence pour pousser à cliquer et à donner ses informations. Réflexe : ne pas cliquer, ne rien renseigner, signaler le message.",
    tags: ["phishing", "hameconnage", "arnaque", "securite"],
    script:
      "Félicitations ! Vous venez de gagner un iPhone 17 ! Pour le récupérer, il vous suffit de cliquer sur ce lien et de renseigner quelques informations. Franchement, qui n'aimerait pas recevoir un message pareil ? Mais tu as participé à quel jeu exactement ? Tu as rempli un formulaire ? Tu as acheté un ticket ? Non ? Alors pourquoi est-ce qu'on t'offre un téléphone aussi cher ? C'est justement là que se trouve le piège. Le lien te redirige vers une fausse page qui ressemble parfois parfaitement à un vrai site. On te demande ton nom, ton numéro de téléphone, ton adresse e-mail et parfois même ton mot de passe. Tu penses remplir un simple formulaire pour récupérer ton cadeau, mais en réalité, tu es en train de transmettre tes informations à un inconnu. Cette arnaque porte un nom : le phishing, ou hameçonnage. Le principe est simple : on t'attire avec une promesse, un cadeau ou même une urgence pour te pousser à cliquer et à donner des informations personnelles. Alors, retiens bien ceci : si tu n'as participé à aucun jeu, tu n'as probablement rien gagné. Ne clique pas, ne renseigne aucune information et signale le message. Tu as déjà reçu un message de ce genre ?",
  },
  scenes,
};
