/**
 * Épisode La tech sans jargon · 4 · « Design System ou System Design ? »
 *
 * 59 beats audio-driven de 0,5 à 2,4 secondes, un message par plan.
 * L'audio est la source de vérité temporelle (71 s) : chaque plan est défini
 * par l'indice de son premier mot dans le transcript ; ses bornes et son texte
 * en sont déduits (aucune frontière ne peut tomber hors d'un mot).
 * Fil rouge visuel : une maison. Le plan (pièces, eau, électricité) = System
 * Design ; la décoration (couleurs, poignées, matériaux, même style partout) =
 * Design System. Données pures : aucun import React/Remotion.
 */

import type { CaptionPosition } from "../../../../../captions/types";
import type { MascotAttitude, MascotPose } from "../../../../../components/mascot/types";
import type { Scene, SceneSfx, SceneType, Episode } from "../../../../../scenes/types";
import { designSystemAudio, designSystemTranscript } from "./transcript.ts";

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
  { first: 0, type: "hero", lane: "low", objective: "Une carte-palette (couleurs, bouton) : la pastille DESIGN SYSTEM claque sur « Design System »" },
  { first: 2, type: "hero", lane: "top", objective: "Face à elle, une carte-plan (maison en plan, engrenage) : la pastille SYSTEM DESIGN claque sur « System Design » ; un « ? » sur le dernier mot", sfx: [{ at: { wordIndex: 4 }, name: "pop", volume: 0.4 }] },
  { first: 5, type: "callout", lane: "low", objective: "Deux cartes presque jumelles (même cadre, même ton) : les noms se ressemblent, elles s'allument sur « noms » puis « identiques »" },
  { first: 10, type: "callout", lane: "top", objective: "Deux choses distinctes : la carte-palette et la carte-plan, chacune à son tour sur « deux » puis « choses »" },
  {
    first: 14,
    type: "explanation",
    lane: "low",
    objective: "Un signe « différent » entre les deux cartes ; mascotte surprise appelée par « différentes »",
    mascot: { pose: "surprised", attitude: "surprised" },
    sfx: [{ at: { wordIndex: 15 }, name: "pop", volume: 0.45 }],
  },
  { first: 16, type: "hero", lane: "top", objective: "Une personne qui imagine : une bulle de pensée avec une maison en pointillés sur « Imagine »" },
  { first: 20, type: "diagram", lane: "low", objective: "Une maison se dessine trait par trait (toit puis murs) sur « construire », s'allume sur « maison »" },
  {
    first: 23,
    type: "explanation",
    lane: "top",
    objective: "Mascotte pensive appelée par « réfléchir » ; une feuille de plan vierge et un crayon",
    mascot: { pose: "thinking", attitude: "curious" },
  },
  { first: 27, type: "diagram", lane: "low", objective: "Le plan de la maison s'organise : les murs intérieurs se tracent sur « organisation »" },
  { first: 30, type: "callout", lane: "top", objective: "Des pièces qui s'allument une à une sur « combien », « de », « pièces »" },
  { first: 33, type: "diagram", lane: "low", objective: "Une cuisinière (deux feux) cherche sa place dans le plan : elle saute de pièce en pièce puis s'ancre sur « cuisine »" },
  { first: 37, type: "diagram", lane: "top", objective: "Un tuyau d'eau se trace à travers les pièces ; la goutte claque sur « circuler »" },
  { first: 40, type: "diagram", lane: "low", objective: "Le tuyau reste ; un fil électrique se trace et un éclair claque sur « électricité »" },
  { first: 43, type: "diagram", lane: "top", objective: "Eau et électricité circulent ensemble dans le plan : les pièces s'allument toutes ensemble sur « ensemble »" },
  { first: 48, type: "hero", lane: "low", objective: "La maison en plan (déjà vue) : le cadre s'allume sur « Ça », « c'est », « un peu »" },
  { first: 53, type: "hero", lane: "top", objective: "La pastille SYSTEM DESIGN claque sur « System Design » avec un engrenage qui tourne", sfx: [{ at: { wordIndex: 54 }, name: "ding", volume: 0.4 }] },
  { first: 55, type: "callout", lane: "low", objective: "Un ordinateur (écran de code fantôme) s'allume sur « informatique »" },
  { first: 57, type: "diagram", lane: "top", objective: "Une loupe sur le plan de la maison devenu plan d'application : la loupe s'allume sur « réfléchir »" },
  { first: 62, type: "diagram", lane: "low", objective: "Quatre blocs-parties d'une application s'allument un à un sur « différentes parties »" },
  { first: 66, type: "diagram", lane: "top", objective: "Un téléphone (l'application) au centre ; ses voisins s'éveillent sur « application »" },
  { first: 68, type: "diagram", lane: "low", objective: "Des paquets de données circulent entre téléphone, serveur et base de données sur « communiquent »" },
  { first: 71, type: "diagram", lane: "top", objective: "Les paquets se croisent sans accroc, une coche se trace sur « fonctionne »" },
  { first: 75, type: "callout", lane: "low", objective: "Une coche bien nette dans un cercle sur « correctement »" },
  { first: 76, type: "callout", lane: "top", objective: "Une petite foule de silhouettes qui grossit : une silhouette pour dix s'allume sur « milliers », la foule claque sur « utilisateurs »" },
  { first: 81, type: "hero", lane: "low", objective: "Retour à la maison : une plaque « changement de page » (volet qui glisse) sur « Maintenant »" },
  { first: 82, type: "diagram", lane: "top", objective: "La maison dont les murs sont posés attend sa déco : un pinceau s'allume sur « imagine »" },
  { first: 86, type: "diagram", lane: "low", objective: "La maison passe de plan à habillée : les couleurs montent sur « aménager » puis « maison »" },
  { first: 89, type: "callout", lane: "top", objective: "Une palette de couleurs (les tons de la marque) : une pastille s'allume par mot, sur « couleurs »" },
  { first: 93, type: "callout", lane: "low", objective: "Des portes de couleurs différentes ; l'une s'ouvre sur « portes »" },
  { first: 96, type: "callout", lane: "top", objective: "Deux poignées de porte rondes : un éclat sur « poignées »" },
  { first: 98, type: "callout", lane: "low", objective: "Un interrupteur qui bascule sur « interrupteurs » ; la lampe s'allume" },
  { first: 99, type: "callout", lane: "top", objective: "Trois matériaux (bois, brique, carreaux) : ils s'allument sur « matériaux »" },
  { first: 102, type: "diagram", lane: "low", objective: "Une pièce où tout est bien rangé dans le même style : les objets se rangent sur « garder »" },
  { first: 106, type: "diagram", lane: "top", objective: "Trois pièces avec la même décoration : un fil les relie sur « même », « style », « partout »" },
  { first: 110, type: "hero", lane: "low", objective: "La carte-palette (couleurs, bouton) : le cadre s'allume sur « Ça », « c'est », « le »" },
  { first: 113, type: "hero", lane: "top", objective: "La pastille DESIGN SYSTEM claque sur « Design System » avec un pinceau", sfx: [{ at: { wordIndex: 114 }, name: "ding", volume: 0.4 }] },
  { first: 115, type: "callout", lane: "low", objective: "Une fenêtre de navigateur avec une page : le globe s'allume sur « développement web »" },
  { first: 119, type: "callout", lane: "top", objective: "Une pastille de couleur et sa petite carte : le jeu de couleurs s'allume sur « couleurs »" },
  { first: 123, type: "callout", lane: "low", objective: "Des boutons arrondis, un clic sur « boutons » ; une police Aa s'allume sur « polices »" },
  { first: 128, type: "callout", lane: "top", objective: "Deux blocs et l'espace entre eux (flèches d'espacement) qui s'ouvrent sur « espacements »" },
  { first: 130, type: "callout", lane: "low", objective: "Un carnet de règles : des lignes cochées une à une sur « règles », « visuelles »" },
  { first: 133, type: "diagram", lane: "top", objective: "Trois pages de l'application côte à côte : elles s'allument une à une sur « toutes les pages »" },
  { first: 138, type: "diagram", lane: "low", objective: "Une page-modèle (en-tête, bouton, lignes) devant les autres sur « application »" },
  { first: 140, type: "diagram", lane: "top", objective: "Les trois pages ont exactement la même apparence : un signe égal s'allume sur « même apparence »" },
  {
    first: 144,
    type: "explanation",
    lane: "low",
    objective: "Mascotte qui explique, appelée par « vois » ; la maison-plan et la maison-déco côte à côte, une loupe passe de l'une à l'autre",
    mascot: { pose: "explaining", attitude: "confident" },
  },
  { first: 149, type: "diagram", lane: "top", objective: "Carte SYSTEM DESIGN : l'engrenage tourne sur « System Design »" },
  { first: 152, type: "callout", lane: "low", objective: "Des engrenages et un flux de données : « organise » range les blocs, « fonctionnement » lance la rotation" },
  { first: 155, type: "callout", lane: "top", objective: "Le téléphone de l'application s'allume sur « application » ; coche du bon fonctionnement" },
  { first: 158, type: "diagram", lane: "low", objective: "Carte DESIGN SYSTEM : le pinceau s'allume sur « Design System »" },
  { first: 161, type: "callout", lane: "top", objective: "Un œil qui regarde une page : il s'allume sur « apparence »" },
  { first: 164, type: "diagram", lane: "low", objective: "Des briques (boutons, cartes) qui s'empilent en un écran sur « construire »" },
  { first: 169, type: "callout", lane: "top", objective: "Une interface (écran avec en-tête et boutons) qui s'allume sur « interfaces »" },
  { first: 171, type: "callout", lane: "low", objective: "Deux écrans cohérents reliés par un fil sur « cohérente »" },
  { first: 174, type: "hero", lane: "top", objective: "Carte gauche : engrenage ; elle s'allume sur « L'un » et « fonctionne »" },
  { first: 177, type: "callout", lane: "low", objective: "Un engrenage qui tourne sur « fonctionne »" },
  { first: 180, type: "hero", lane: "top", objective: "Carte droite : pinceau ; elle s'allume sur « l'autre »" },
  { first: 183, type: "callout", lane: "low", objective: "Un œil et une page : la page s'embellit sur « présente »" },
  {
    first: 186,
    type: "explanation",
    lane: "top",
    objective: "Mascotte qui désigne le spectateur, appelée par « toi » ; deux cartes (engrenage, pinceau)",
    mascot: { pose: "point", attitude: "confident" },
  },
  { first: 188, type: "conclusion", lane: "low", objective: "Les deux cartes s'allument une à une sur « connaissais » puis « deux » ; la question relance les commentaires", sfx: [{ at: { wordIndex: 194 }, name: "pop", volume: 0.4 }] },
];

const pad = (value: number): string => String(value).padStart(2, "0");

const words = designSystemTranscript.segments;

const scenes: readonly Scene[] = beats.map((beat, index) => {
  const next = beats[index + 1];
  const start = index === 0 ? 0 : words[beat.first].start;
  const end = next ? words[next.first].start : designSystemAudio.duration;
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
    visual: { component: "DesignSystemScene" },
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

export const designSystemEpisode: Episode = {
  id: "tech-sans-jargon-design-system-vs-system-design",
  title: "Design System ou System Design ?",
  description:
    "Épisode 4 de la série « La tech sans jargon » : deux notions aux noms presque identiques expliquées avec l'image d'une maison — le plan (System Design) et la décoration (Design System).",
  audio: designSystemAudio,
  transcript: designSystemTranscript,
  metadata: {
    series: "tech-sans-jargon",
    subject: "Design System vs System Design",
    angle:
      "Construire une maison : le System Design, c'est le plan (combien de pièces, où la cuisine, comment l'eau et l'électricité circulent, comment les parties d'une application communiquent même avec des milliers d'utilisateurs). Le Design System, c'est l'aménagement : couleurs, portes, poignées, interrupteurs, matériaux, avec le même style partout (couleurs, boutons, polices, espacements, règles visuelles d'une application). L'un organise le fonctionnement, l'autre l'apparence.",
    tags: ["design-system", "system-design", "developpement-web", "culture-tech"],
    script:
      "Design System ou System Design ? malgré leurs noms presque identiques, ce sont deux choses complètement différentes ! … L'un s'intéresse à comment ça fonctionne, l'autre à comment ça se présente. Et toi, tu connaissais la différence entre les deux ?",
  },
  scenes,
};
