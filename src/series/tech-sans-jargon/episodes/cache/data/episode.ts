/**
 * Épisode La tech sans jargon · 3 · « C'est quoi le cache ? »
 *
 * 54 beats audio-driven de 0,5 à 2,1 secondes, un message par plan.
 * L'audio est la source de vérité temporelle (63,82 s) : chaque plan est défini
 * par l'indice de son premier mot dans le transcript ; ses bornes et son texte
 * en sont déduits (aucune frontière ne peut tomber hors d'un mot).
 * Données pures : aucun import React/Remotion.
 */

import type { CaptionPosition } from "../../../../../captions/types";
import type { MascotAttitude, MascotPose } from "../../../../../components/mascot/types";
import type { Scene, SceneSfx, SceneType, Episode } from "../../../../../scenes/types";
import { cacheAudio, cacheTranscript } from "./transcript.ts";

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
  { first: 0, type: "hero", lane: "low", objective: "Une personne dit quelque chose : sa bulle de discussion claque sur « dit »" },
  { first: 4, type: "hero", lane: "top", objective: "Un téléphone avec un message qui clignote ; un « ? » claque sur « cache »" },
  { first: 7, type: "callout", lane: "low", objective: "Le spectateur (« toi ») s'allume ; une coche de façade se pose sur « fait »" },
  {
    first: 12,
    type: "explanation",
    lane: "top",
    objective: "Une bulle de pensée avec une coche qui hoche et un « ? » ; mascotte pensive appelée par « semblant »",
    mascot: { pose: "thinking", attitude: "curious" },
  },
  { first: 15, type: "callout", lane: "low", objective: "Un nœud de fils emmêlés qui tremble sur « beaucoup »" },
  { first: 18, type: "diagram", lane: "top", objective: "Le nœud se détend en une ligne droite sur « simple » ; une coche se trace" },
  { first: 25, type: "hero", lane: "low", objective: "Une casserole sur le feu, la vapeur monte sur « cuisines »" },
  { first: 29, type: "callout", lane: "top", objective: "Une semaine : sept jours qui s'allument un à un sur « tous », « les », « jours »" },
  { first: 32, type: "callout", lane: "low", objective: "Un pot de sel qui se vide ; un « ! » éclate sur « sel »" },
  { first: 40, type: "diagram", lane: "top", objective: "Un chemin jusqu'à un étal de marché ; la personne marche, l'étal claque sur « marché »" },
  { first: 45, type: "diagram", lane: "low", objective: "Une carte bancaire paie ; le pot se remplit sur « acheter »" },
  { first: 48, type: "callout", lane: "top", objective: "Une personne épuisée : gouttes de sueur et « Z » sur « fatigant »" },
  {
    first: 51,
    type: "hero",
    lane: "low",
    objective: "Une ampoule s'allume sur « décides »",
    sfx: [{ at: { wordIndex: 53 }, name: "ding", volume: 0.4 }],
  },
  { first: 54, type: "diagram", lane: "top", objective: "Le pot tombe sur une étagère de cuisine, qui s'allume sur « cuisine »" },
  { first: 61, type: "diagram", lane: "low", objective: "La personne attrape le pot d'un geste : la flèche est courte, coche sur « main »" },
  { first: 66, type: "hero", lane: "top", objective: "Un téléphone qui claque avec des étincelles sur « téléphone »" },
  {
    first: 70,
    type: "diagram",
    lane: "low",
    objective: "Le téléphone et le pot de sel côte à côte, un signe « égal » qui s'allume sur « même »",
    sfx: [{ at: { wordIndex: 73 }, name: "pop", volume: 0.5 }],
  },
  { first: 75, type: "callout", lane: "top", objective: "Une fenêtre de navigateur avec une page ; elle s'allume sur « site », le globe sur « Internet »" },
  { first: 81, type: "callout", lane: "low", objective: "Un écran d'accueil de téléphone : une application s'allume sur « application »" },
  { first: 87, type: "diagram", lane: "top", objective: "Une flèche de téléchargement tombe dans le téléphone qui s'allume sur « garde »" },
  { first: 90, type: "callout", lane: "low", objective: "Un chronomètre qui tourne : « temporairement »" },
  { first: 91, type: "callout", lane: "top", objective: "Six tuiles dont quelques-unes seulement s'allument sur « certains »" },
  { first: 93, type: "callout", lane: "low", objective: "Trois cadres d'images ; ils s'allument un à un sur « images »" },
  { first: 96, type: "diagram", lane: "top", objective: "Un téléchargement barré d'un cercle qui se trace sur « éviter »" },
  { first: 100, type: "diagram", lane: "low", objective: "Une flèche de rechargement tourne puis est barrée d'un cercle sur « prochaine » ; la page s'affiche d'un coup, un éclair claque sur « fois »" },
  {
    first: 105,
    type: "explanation",
    lane: "top",
    objective: "Mascotte qui explique, appelée par « appelle » ; un grand « ? » au-dessus de la tête",
    mascot: { pose: "explaining", attitude: "confident" },
  },
  {
    first: 109,
    type: "hero",
    lane: "low",
    objective: "Une boîte-réserve s'ouvre : la pastille CACHE claque sur « cache »",
    sfx: [{ at: { wordIndex: 110 }, name: "pop", volume: 0.5 }],
  },
  { first: 111, type: "callout", lane: "top", objective: "La boîte rayonne : des rayons partent sur « lui »" },
  { first: 114, type: "callout", lane: "low", objective: "Trois pages dont une s'allume sur « pages »" },
  { first: 116, type: "diagram", lane: "top", objective: "Un chronomètre qui file et un éclair sur « vite »" },
  { first: 119, type: "callout", lane: "low", objective: "Quatre applications qui s'allument une à une sur « applications »" },
  { first: 122, type: "callout", lane: "top", objective: "Deux engrenages qui tournent sur « fonctionner »" },
  { first: 124, type: "diagram", lane: "low", objective: "Cinq barres montantes qui s'allument une à une ; une coche claque sur « efficacement »" },
  { first: 126, type: "hero", lane: "top", objective: "Un « ! » qui claque sur « parfois »" },
  { first: 128, type: "callout", lane: "low", objective: "Une pile de fichiers qui s'allume sur « fichiers »" },
  { first: 130, type: "diagram", lane: "top", objective: "Une jauge de stockage qui se remplit jusqu'au rouge sur « place »" },
  { first: 134, type: "callout", lane: "low", objective: "Les fichiers se ternissent et une croix tombe sur « inutiles »" },
  { first: 137, type: "diagram", lane: "top", objective: "La boîte se vide : les objets s'envolent sur « vider »" },
  {
    first: 143,
    type: "callout",
    lane: "low",
    objective: "Une poubelle : les fichiers tombent dedans sur « supprimer », étincelles sur « temporaires »",
    sfx: [{ at: { wordIndex: 143 }, name: "whoosh", volume: 0.3 }],
  },
  {
    first: 147,
    type: "explanation",
    lane: "top",
    objective: "Mascotte surprise appelée par « Attention » ; un panneau d'avertissement qui tremble",
    mascot: { pose: "surprised", attitude: "surprised" },
    sfx: [{ at: { wordIndex: 147 }, name: "error", volume: 0.35 }],
  },
  { first: 153, type: "diagram", lane: "low", objective: "Un téléphone et un éclair ; un cercle barré se trace sur « forcément »" },
  { first: 160, type: "diagram", lane: "top", objective: "Une jauge de stockage presque pleine : une toute petite part se libère sur « récupérer »" },
  { first: 165, type: "diagram", lane: "low", objective: "Une jauge à peine entamée et une grande part rêvée en pointillés (qui réagit sur « énormément ») barrée d'un cercle sur « espace »" },
  { first: 167, type: "callout", lane: "top", objective: "Un balai qui nettoie la boîte sur « vider »" },
  { first: 171, type: "diagram", lane: "low", objective: "Une poubelle barrée d'un cercle sur « pas » ; un bouclier dont la coche se trace sur « normalement »" },
  { first: 175, type: "callout", lane: "top", objective: "Une carte de profil protégée ; elle s'allume sur « comptes »" },
  { first: 178, type: "callout", lane: "low", objective: "Trois photos avec un cœur qui s'allume sur « photos »" },
  { first: 180, type: "callout", lane: "top", objective: "Un calendrier : le jour suivant s'allume sur « prochaine »" },
  { first: 183, type: "callout", lane: "low", objective: "La personne du début redit la phrase : la bulle claque sur « dit »" },
  { first: 186, type: "callout", lane: "top", objective: "Le téléphone du début : le « ? » devient une coche sur « cache »" },
  {
    first: 189,
    type: "explanation",
    lane: "low",
    objective: "Mascotte contente, appelée par « sauras » ; une grande coche et des confettis sur « parle »",
    mascot: { pose: "happy", attitude: "excited" },
    sfx: [{ at: { wordIndex: 190 }, name: "ding", volume: 0.4 }],
  },
  {
    first: 195,
    type: "explanation",
    lane: "top",
    objective: "Mascotte qui désigne le spectateur, appelée par « dis-moi » ; deux cartes DÉJÀ / NOUVEAU",
    mascot: { pose: "point", attitude: "confident" },
  },
  { first: 197, type: "callout", lane: "low", objective: "La carte DÉJÀ s'allume sur « déjà »" },
  {
    first: 201,
    type: "conclusion",
    lane: "top",
    objective: "La carte NOUVEAU s'allume sur « découvrir » ; étincelles, la question relance les commentaires",
    sfx: [{ at: { wordIndex: 206 }, name: "pop", volume: 0.4 }],
  },
];

const pad = (value: number): string => String(value).padStart(2, "0");

const words = cacheTranscript.segments;

const scenes: readonly Scene[] = beats.map((beat, index) => {
  const next = beats[index + 1];
  const start = index === 0 ? 0 : words[beat.first].start;
  const end = next ? words[next.first].start : cacheAudio.duration;
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
    visual: { component: "CacheScene" },
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

export const cacheEpisode: Episode = {
  id: "tech-sans-jargon-cache",
  title: "C'est quoi le cache ?",
  description:
    "Épisode 3 de la série « La tech sans jargon » : le cache expliqué avec l'image du sel gardé dans la cuisine plutôt que racheté au marché, et ce que vider le cache fait (ou ne fait pas).",
  audio: cacheAudio,
  transcript: cacheTranscript,
  metadata: {
    series: "tech-sans-jargon",
    subject: "Le cache d'un téléphone ou d'un navigateur",
    angle:
      "Le cache, c'est le sel qu'on garde dans sa cuisine au lieu d'aller le racheter au marché à chaque fois : le téléphone garde des copies (images…) de ce qu'il a déjà chargé pour que ça s'ouvre plus vite. Vider le cache supprime ces fichiers temporaires, sans forcément accélérer le téléphone ni libérer énormément d'espace, et sans toucher aux comptes ni aux photos.",
    tags: ["cache", "telephone", "internet", "culture-tech"],
    script:
      "Quelqu'un t'a déjà dit : « Vide ton cache » ? Et toi, tu as fait semblant de comprendre ? … Mais dis-moi, tu le savais déjà ou tu viens de le découvrir ?",
  },
  scenes,
};
