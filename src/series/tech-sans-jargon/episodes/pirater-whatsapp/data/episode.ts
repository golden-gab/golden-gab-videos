/**
 * Épisode La tech sans jargon · 2 · « Comment pirater un compte WhatsApp en une minute ? »
 *
 * 65 beats audio-driven de 0,5 à 2,6 secondes, un message par plan.
 * L'audio est la source de vérité temporelle (78,47 s) : chaque plan est défini
 * par l'indice de son premier mot dans le transcript ; ses bornes et son texte
 * en sont déduits (aucune frontière ne peut tomber hors d'un mot).
 * Données pures : aucun import React/Remotion.
 */

import type { CaptionPosition } from "../../../../../captions/types";
import type { MascotAttitude, MascotPose } from "../../../../../components/mascot/types";
import type { Scene, SceneSfx, SceneType, Episode } from "../../../../../scenes/types";
import { piraterWhatsappAudio, piraterWhatsappTranscript } from "./transcript.ts";

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
  { first: 0, type: "hero", lane: "low", objective: "Un pirate au masque devant un téléphone ; le cadenas s'ouvre sur « pirater », le téléphone claque sur « compte »" },
  { first: 4, type: "hero", lane: "top", objective: "Un chronomètre dont l'aiguille fait un tour complet sur « minute » ; un téléphone avec une bulle de discussion" },
  {
    first: 8,
    type: "explanation",
    lane: "top",
    objective: "Une bulle de pensée avec un cadenas : « impossible » ; mascotte pensive appelée par « penses »",
    mascot: { pose: "thinking", attitude: "curious" },
  },
  { first: 13, type: "callout", lane: "low", objective: "Un cahier à spirale qui se pose sur « cahier »" },
  { first: 17, type: "callout", lane: "top", objective: "Une feuille où le crayon écrit ligne à ligne sur « note », « tout », « suivre »" },
  {
    first: 24,
    type: "explanation",
    lane: "low",
    objective: "Un soleil (« aujourd'hui ») ; mascotte qui désigne le spectateur sur « montrer »",
    mascot: { pose: "point", attitude: "confident" },
  },
  { first: 30, type: "callout", lane: "top", objective: "Un pirate au masque devant un ordinateur portable ; il s'allume sur « pirates »" },
  { first: 34, type: "diagram", lane: "low", objective: "Une loupe passe sur le pirate et révèle ce qu'il fait vraiment sur « réellement »" },
  {
    first: 36,
    type: "hero",
    lane: "top",
    objective: "Le chiffre 1 dans un disque, coché dans une liste ; il claque sur « 1 »",
    sfx: [{ at: { wordIndex: 36 }, name: "click", volume: 0.4 }],
  },
  { first: 38, type: "callout", lane: "low", objective: "Un clavier de téléphone dont les touches s'allument une à une sur « numéro »" },
  { first: 43, type: "diagram", lane: "top", objective: "Une carte « numéro » relie une personne ; un viseur se verrouille sur elle sur « pirater »" },
  {
    first: 52,
    type: "hero",
    lane: "low",
    objective: "Le chiffre 2 dans un disque ; il claque sur « 2 »",
    sfx: [{ at: { wordIndex: 52 }, name: "click", volume: 0.4 }],
  },
  { first: 54, type: "callout", lane: "top", objective: "Une clé (« un moyen ») qui s'allume sur « moyen »" },
  { first: 59, type: "diagram", lane: "low", objective: "Un pirate envoie une bulle de discussion vers une personne ; la bulle voyage sur « convaincre »" },
  { first: 62, type: "callout", lane: "top", objective: "Deux personnes et un cœur entre elles, qui s'allume sur « confiance »" },
  {
    first: 66,
    type: "hero",
    lane: "low",
    objective: "Le chiffre 3 dans un disque ; il claque sur « 3 »",
    sfx: [{ at: { wordIndex: 66 }, name: "click", volume: 0.4 }],
  },
  {
    first: 69,
    type: "explanation",
    lane: "top",
    objective: "La liste qui s'arrête net ; mascotte surprise appelée par « Désolé »",
    mascot: { pose: "surprised", attitude: "surprised" },
    sfx: [{ at: { wordIndex: 69 }, name: "error", volume: 0.4 }],
  },
  { first: 70, type: "callout", lane: "low", objective: "Une fenêtre de logiciel en pointillés (qui n'existe pas) ; un cercle barré se trace sur « pas »" },
  { first: 74, type: "callout", lane: "top", objective: "Une fenêtre de logiciel et une baguette magique qui lance des étincelles sur « magique »" },
  { first: 77, type: "callout", lane: "low", objective: "Un cadenas fermé qui résiste : il tremble sur « pirater », la baguette rebondit" },
  { first: 81, type: "callout", lane: "top", objective: "Un téléphone avec une bulle de discussion ; il s'allume sur « WhatsApp »" },
  { first: 84, type: "callout", lane: "low", objective: "Un chronomètre qui s'emballe puis barré d'une croix sur « secondes »" },
  {
    first: 87,
    type: "hero",
    lane: "top",
    objective: "Un grand « ! » qui claque sur « réalité » avec des étincelles",
    sfx: [{ at: { wordIndex: 87 }, name: "pop", volume: 0.5 }],
  },
  { first: 89, type: "callout", lane: "low", objective: "Trois pirates au masque qui s'allument un à un sur « beaucoup »" },
  { first: 92, type: "callout", lane: "top", objective: "Un cadenas intact : le marteau rebondit sur « cassent », cercle barré sur « pas »" },
  { first: 96, type: "callout", lane: "low", objective: "Un téléphone protégé par un bouclier coché ; la coche se trace sur « sécurité »" },
  { first: 100, type: "diagram", lane: "top", objective: "Un pirate tient des fils attachés à une personne (marionnette) ; les fils bougent sur « manipulent »" },
  { first: 104, type: "diagram", lane: "low", objective: "La personne tend elle-même une carte-code vers le pirate : la flèche se trace sur « donnent »" },
  { first: 109, type: "callout", lane: "top", objective: "Une carte de code : six cases qui se remplissent sur « vérification »" },
  {
    first: 113,
    type: "callout",
    lane: "low",
    objective: "Un téléphone qui reçoit un message : la cloche se balance sur « SMS »",
    sfx: [{ at: { wordIndex: 115 }, name: "ding", volume: 0.4 }],
  },
  { first: 116, type: "diagram", lane: "top", objective: "La carte de code vole de la personne vers le pirate sur « code »" },
  { first: 121, type: "callout", lane: "low", objective: "Le pirate tient la carte de code ; une coche claque sur « récupéré »" },
  { first: 122, type: "callout", lane: "top", objective: "Un cadenas qui tressaille, à moitié ouvert, sur « tenter »" },
  { first: 125, type: "diagram", lane: "low", objective: "L'avatar d'un téléphone bascule de la personne au masque sur « contrôle »" },
  { first: 129, type: "hero", lane: "top", objective: "Un grand cadenas ouvert qui s'allume sur « compte »" },
  {
    first: 131,
    type: "explanation",
    lane: "low",
    objective: "Mascotte qui explique, appelée par « appelle »",
    mascot: { pose: "explaining", attitude: "confident" },
  },
  {
    first: 135,
    type: "hero",
    lane: "top",
    objective: "Un engrenage (ingénierie) et des personnes (sociale) ; deux pastilles « INGÉNIERIE » « SOCIALE »",
    sfx: [{ at: { wordIndex: 135 }, name: "pop", volume: 0.5 }],
  },
  { first: 137, type: "callout", lane: "low", objective: "Deux personnes ; des points de frappe dans une bulle sur « gros »" },
  { first: 141, type: "diagram", lane: "top", objective: "Un pirate et trois cartes retournées ; elles tremblent sur « utilise »" },
  { first: 143, type: "callout", lane: "low", objective: "La première carte se retourne : un cœur s'allume sur « confiance »" },
  { first: 145, type: "callout", lane: "top", objective: "La carte « peur » (« ! ») tremble sur « peur », puis l'œil s'allume sur « curiosité »" },
  { first: 150, type: "diagram", lane: "low", objective: "Des flèches poussent une personne vers un bouton sur « pousser »" },
  { first: 154, type: "diagram", lane: "top", objective: "La personne clique ; la pensée « jamais » barrée apparaît sur « n'aurais »" },
  { first: 161, type: "callout", lane: "low", objective: "Un cercle barré sur « jamais » puis une grande coche sur « fait »" },
  { first: 163, type: "callout", lane: "top", objective: "Une tuile de discussion ; une onde de choc sur « concerne » et un cercle barré sur « pas »" },
  { first: 168, type: "diagram", lane: "low", objective: "La tuile de discussion à côté de trois tuiles en pointillés qui attendent ; elle s'allume sur « WhatsApp »" },
  { first: 170, type: "diagram", lane: "top", objective: "Quatre tuiles (carte, réseaux, e-mail, téléphone) autour d'un « ! » qui claque sur « arriver »" },
  { first: 174, type: "callout", lane: "low", objective: "Une carte bancaire dessinée qui s'allume sur « comptes »" },
  { first: 177, type: "callout", lane: "top", objective: "Un cercle de personnes reliées qui s'allument sur « réseaux »" },
  { first: 180, type: "callout", lane: "low", objective: "Une enveloppe qui s'ouvre sur « e-mails »" },
  { first: 182, type: "callout", lane: "top", objective: "Un combiné de téléphone qui sonne sur « téléphone »" },
  { first: 186, type: "callout", lane: "low", objective: "Un pirate et une loupe ; un cercle barré sur « pas »" },
  { first: 191, type: "diagram", lane: "top", objective: "Une fenêtre de système qui se fissure sur « casser »" },
  { first: 196, type: "callout", lane: "low", objective: "Un pirate et une bulle de discussion qui se remplit sur « simplement »" },
  { first: 200, type: "callout", lane: "top", objective: "Une personne reçoit la bulle et se range de son côté : coche sur « convaincre »" },
  {
    first: 203,
    type: "explanation",
    lane: "low",
    objective: "Mascotte qui désigne le spectateur, appelée par « avant »",
    mascot: { pose: "point", attitude: "confident" },
  },
  { first: 206, type: "callout", lane: "top", objective: "Un lien (chaîne) et un curseur qui hésite au-dessus ; le lien s'allume sur « lien »" },
  { first: 210, type: "callout", lane: "low", objective: "Une carte de code qu'on tend vers la sortie ; elle s'allume sur « code »" },
  { first: 214, type: "callout", lane: "top", objective: "Une carte d'identité : l'information s'envole sur « partager » et s'allume sur « personnelle »" },
  { first: 220, type: "callout", lane: "low", objective: "Un chronomètre calme : l'aiguille avance sur « secondes »" },
  {
    first: 223,
    type: "callout",
    lane: "top",
    objective: "Un bouclier, une loupe et une coche qui se trace sur « vérifier »",
    sfx: [{ at: { wordIndex: 224 }, name: "ding", volume: 0.4 }],
  },
  { first: 225, type: "callout", lane: "low", objective: "Un globe entouré de personnes ; il s'allume sur « Internet »" },
  { first: 229, type: "diagram", lane: "top", objective: "Un avatar sympathique qui se fend et révèle un masque sur « piège »" },
  { first: 234, type: "diagram", lane: "low", objective: "La personne imaginée dans une bulle de pensée, un signe « différent » vers le masque sur « pas »" },
  {
    first: 241,
    type: "conclusion",
    lane: "top",
    objective: "Mascotte qui sourit et appelle à commenter ; un « ? » dans une bulle de discussion sur « technique »",
    mascot: { pose: "happy", attitude: "excited" },
  },
];

const pad = (value: number): string => String(value).padStart(2, "0");

const words = piraterWhatsappTranscript.segments;

const scenes: readonly Scene[] = beats.map((beat, index) => {
  const next = beats[index + 1];
  const start = index === 0 ? 0 : words[beat.first].start;
  const end = next ? words[next.first].start : piraterWhatsappAudio.duration;
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
    visual: { component: "PiraterWhatsappScene" },
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

export const piraterWhatsappEpisode: Episode = {
  id: "tech-sans-jargon-pirater-whatsapp",
  title: "Comment pirater un compte WhatsApp en une minute ?",
  description:
    "Épisode 2 de la série « La tech sans jargon » : il n'existe pas de logiciel magique pour pirater un compte, les pirates piratent la personne (ingénierie sociale) en lui faisant donner elle-même son code de vérification.",
  audio: piraterWhatsappAudio,
  transcript: piraterWhatsappTranscript,
  metadata: {
    series: "tech-sans-jargon",
    subject: "Piratage de compte WhatsApp et ingénierie sociale",
    angle:
      "Un hook « comment pirater un compte WhatsApp en une minute » qui se retourne : il n'y a pas de logiciel magique, les pirates manipulent la personne pour qu'elle donne elle-même le code reçu par SMS ; c'est l'ingénierie sociale, qui vaut aussi pour les comptes bancaires, réseaux sociaux, e-mails et appels.",
    tags: ["arnaques", "securite", "ingenierie-sociale", "culture-tech"],
    script:
      "Comment pirater un compte WhatsApp en une minute ? Tu penses que c'est impossible ? Alors, prends un cahier et note tout ce qui va suivre. … Tu connaissais cette technique ?",
  },
  scenes,
};
