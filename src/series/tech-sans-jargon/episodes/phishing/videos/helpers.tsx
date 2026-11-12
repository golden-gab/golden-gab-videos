/**
 * Aides communes aux plans de l'épisode « Le faux message “tu as gagné un
 * iPhone” » (phishing) : l'horloge des mots et les objets dessinés avec les
 * tokens uniquement : boîte-cadeau, coupe, curseur, manette, ticket, formulaire,
 * enveloppe, hameçon, poisson, étiquette de nom, carte d'identité, drapeau,
 * carte d'information. Aucune marque, aucun texte lu : « iPhone » n'est qu'un
 * mot, le téléphone est générique.
 *
 * Réutilisés d'autres épisodes : `At`, `Overlay`, `Veto`, `Warning`, `Coin`,
 * `MsgPhone`, `AddressBar`, `SiteWindow`, `Numbered`, `EqualSign`… Les objets
 * créés ici sont candidats à la promotion dans le kit de la série (règle 46)
 * dès qu'un autre épisode les utilise.
 */

import React from "react";

import { BrandText } from "../../../../../components/common/BrandText";
import { lit, punch, useWordClock, type Beat } from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { Skeleton } from "../../../../web-story/kit";
import { Handset, PersonIcon } from "../../../kit";
import { phishingTranscript } from "../data/transcript.ts";

export { At, Coin, MsgPhone, Overlay, Veto, Warning } from "../../cache/videos/helpers";
export { EqualSign } from "../../cache/videos/helpers";
export { AddressBar, Numbered, SiteWindow } from "../../nom-de-domaine/videos/helpers";
export { UiButton } from "../../design-system-vs-system-design/videos/helpers";

export type BeatProps = { readonly scene: Scene };

export const useClock = (scene: Scene) => useWordClock(scene, phishingTranscript);

/** Vrai dès que le mot est prononcé : allume un élément (jamais d'apparition). */
export const on = (clock: Beat, word: string, nth = 0): boolean => lit(clock, clock.at(word, nth), 0.2) > 0.5;

/** Petit « coup » d'échelle quand le mot est prononcé. */
export const pop = (clock: Beat, word: string, amplitude = 0.1, nth = 0): number => punch(clock, clock.at(word, nth), amplitude, 0.4);

/** Progression 0 → 1 d'une animation qui démarre au mot. */
export const since = (clock: Beat, word: string, seconds = 0.5, nth = 0): number => clock.p(clock.at(word, nth), seconds, (t) => t);

export const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));

/** Sortie douce d'une progression linéaire. */
export const easeOut = (t: number): number => 1 - (1 - t) * (1 - t);

const col = (active: boolean | number): string => (active === true || (typeof active === "number" && active > 0.5) ? colors.accent : colors.inkInverse);

/* -------------------------------------------------------------------------- */
/*  Le cadeau, la coupe                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Boîte-cadeau (ruban et nœud). `lid` (0 → 1) envoie le couvercle en haut à
 * droite en l'inclinant (0,3 ≈ simple entrebâillement) ; `on` allume la boîte
 * en corail.
 */
export const Gift: React.FC<{
  readonly size: number;
  readonly on?: boolean;
  readonly lid?: number;
}> = ({ size, on: active = false, lid = 0 }) => {
  const l = clamp01(lid);
  const body = col(active);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ overflow: "visible" }}>
      <rect x="14" y="46" width="72" height="46" rx="6" fill={body} />
      <rect x="44" y="46" width="12" height="46" fill={colors.ink} opacity={0.35} />
      <g transform={`translate(${l * 58} ${-l * 58}) rotate(${-l * 38} 50 40)`}>
        <rect x="8" y="30" width="84" height="20" rx="6" fill={body} stroke={colors.ink} strokeWidth={3} strokeOpacity={0.35} />
        <rect x="44" y="30" width="12" height="20" fill={colors.ink} opacity={0.35} />
        <path d="M50 30 C32 6 12 14 22 28 C30 36 44 32 50 30 Z" fill={body} stroke={colors.ink} strokeWidth={3} strokeOpacity={0.45} />
        <path d="M50 30 C68 6 88 14 78 28 C70 36 56 32 50 30 Z" fill={body} stroke={colors.ink} strokeWidth={3} strokeOpacity={0.45} />
      </g>
    </svg>
  );
};

/** Coupe de vainqueur ; `ghost` la laisse en pointillés (« rien gagné »). */
export const Trophy: React.FC<{
  readonly size: number;
  readonly on?: boolean;
  readonly ghost?: boolean;
}> = ({ size, on: active = false, ghost = false }) => {
  const color = ghost ? withAlpha(colors.inkInverse, 0.55) : col(active);
  const dash = ghost ? "2 11" : undefined;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M28 12 H72 V40 A22 22 0 0 1 28 40 Z" fill={ghost ? "none" : color} stroke={color} strokeWidth={ghost ? 5 : 0} strokeDasharray={dash} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 20 H14 C14 40 22 46 32 48 M72 20 H86 C86 40 78 46 68 48" fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" strokeDasharray={dash} />
      <path d="M50 62 V78 M34 90 H66 M38 78 H62" fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" strokeDasharray={dash} />
    </svg>
  );
};

/** Curseur de souris ; `press` (0 → 1) fait naître une onde de clic au bout. */
export const Cursor: React.FC<{ readonly size: number; readonly press?: number }> = ({ size, press = 0 }) => {
  const p = clamp01(press);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ overflow: "visible" }}>
      <circle cx="22" cy="12" r={10 + p * 34} fill="none" stroke={colors.accent} strokeWidth={6} opacity={p > 0 && p < 1 ? 1 - p : 0} />
      <path d="M20 8 L20 80 L38 64 L50 92 L64 86 L52 60 L76 60 Z" fill={colors.inkInverse} stroke={colors.ink} strokeWidth={5} strokeLinejoin="round" />
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/*  Les trois « jeux » auxquels on n'a pas participé                           */
/* -------------------------------------------------------------------------- */

/** Manette de jeu : croix directionnelle et deux boutons. */
export const GamePad: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on: active = false }) => {
  const color = col(active);

  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 100 70" aria-hidden="true">
      <path d="M18 14 H82 C92 14 98 24 96 40 C94 56 90 62 82 62 C74 62 70 54 64 48 H36 C30 54 26 62 18 62 C10 62 6 56 4 40 C2 24 8 14 18 14 Z" fill={color} />
      <path d="M26 28 V44 M18 36 H34" stroke={colors.ink} strokeWidth={6} strokeLinecap="round" />
      <circle cx="68" cy="36" r="5.5" fill={colors.ink} />
      <circle cx="80" cy="28" r="5.5" fill={colors.ink} />
    </svg>
  );
};

/** Ticket à encoches ; `on` l'allume. */
export const TicketIcon: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on: active = false }) => {
  const color = col(active);

  return (
    <svg width={size} height={size * 0.64} viewBox="0 0 100 64" aria-hidden="true">
      <path d="M6 6 H94 V22 A10 10 0 0 0 94 42 V58 H6 V42 A10 10 0 0 0 6 22 Z" fill={color} />
      <path d="M66 10 V54" stroke={colors.ink} strokeWidth={4} strokeDasharray="5 6" strokeLinecap="round" opacity={0.6} />
      <rect x="16" y="22" width="40" height="8" rx="4" fill={colors.ink} opacity={0.55} />
      <rect x="16" y="36" width="26" height="8" rx="4" fill={colors.ink} opacity={0.35} />
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/*  Formulaire, enveloppe, cartes d'informations                               */
/* -------------------------------------------------------------------------- */

/**
 * Formulaire : `rows` champs (barres vides). `filled` (0 → rows) remplit les
 * champs un à un en corail ; `hot` entoure un champ ; `ghost` dessine un champ
 * en pointillés (le champ qui s'ajoute) ; `locked` éteint tout.
 */
export const FormCard: React.FC<{
  readonly w: number;
  readonly rows?: number;
  readonly filled?: number;
  readonly hot?: number;
  readonly ghost?: number;
  readonly button?: boolean;
}> = ({ w, rows = 3, filled = 0, hot = -1, ghost = -1, button = true }) => {
  const rowH = Math.round(w * 0.2);
  const gap = Math.round(w * 0.065);

  return (
    <div
      style={{
        width: w,
        borderRadius: radius.lg,
        backgroundColor: withAlpha(colors.ink, 0.88),
        border: `${strokeWidths.thick}px solid ${filled > 0 || hot >= 0 ? colors.accent : withAlpha(colors.inkInverse, 0.3)}`,
        boxShadow: `0 16px 40px ${withAlpha(colors.ink, 0.4)}`,
        padding: Math.round(w * 0.07),
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap,
      }}
    >
      {Array.from({ length: rows }, (_, index) => {
        const progress = clamp01(filled - index);
        const isGhost = ghost === index;
        const isHot = hot === index;

        return (
          <div
            key={index}
            style={{
              height: rowH,
              borderRadius: radius.md,
              border: `${strokeWidths.medium}px ${isGhost ? "dashed" : "solid"} ${isHot || progress > 0 ? colors.accent : withAlpha(colors.inkInverse, isGhost ? 0.5 : 0.3)}`,
              backgroundColor: isHot ? withAlpha(colors.accent, 0.18) : withAlpha(colors.inkInverse, 0.06),
              display: "flex",
              alignItems: "center",
              gap: rowH * 0.3,
              padding: `0 ${rowH * 0.3}px`,
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: rowH * 0.34, height: rowH * 0.34, borderRadius: radius.pill, backgroundColor: progress > 0 || isHot ? colors.accent : withAlpha(colors.inkInverse, 0.35) }} />
            <div style={{ flex: 1, height: rowH * 0.2, borderRadius: radius.pill, backgroundColor: withAlpha(colors.inkInverse, 0.16), overflow: "hidden" }}>
              <div style={{ width: `${progress * 100}%`, height: "100%", backgroundColor: withAlpha(colors.inkInverse, 0.85) }} />
            </div>
          </div>
        );
      })}
      {button ? (
        <div style={{ height: rowH * 0.8, borderRadius: radius.pill, backgroundColor: filled >= rows ? colors.accent : withAlpha(colors.inkInverse, 0.2), alignSelf: "center", width: "56%" }} />
      ) : null}
    </div>
  );
};

/** Enveloppe ; `open` (0 → 1) soulève le rabat, `on` l'allume. */
export const Envelope: React.FC<{
  readonly size: number;
  readonly on?: boolean;
  readonly open?: number;
}> = ({ size, on: active = false, open = 0 }) => {
  const o = clamp01(open);
  const color = col(active);

  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 100 72" aria-hidden="true" style={{ overflow: "visible" }}>
      <rect x="6" y="14" width="88" height="54" rx="9" fill={color} />
      <path d="M6 24 L50 52 L94 24" fill="none" stroke={colors.ink} strokeWidth={5} strokeLinejoin="round" opacity={0.45} />
      <path d={`M10 16 L50 ${44 - o * 38} L90 16`} fill={withAlpha(colors.ink, 0.2)} stroke={colors.ink} strokeWidth={4} strokeLinejoin="round" strokeOpacity={0.4} />
    </svg>
  );
};

/** Carte d'information (nom, numéro ou e-mail) : pictogramme et barre fantôme. */
export const InfoCard: React.FC<{
  readonly w: number;
  readonly kind: "name" | "phone" | "mail";
  readonly on?: boolean;
}> = ({ w, kind, on: active = false }) => (
  <div
    style={{
      width: w,
      height: w * 0.36,
      borderRadius: radius.lg,
      backgroundColor: withAlpha(colors.ink, 0.88),
      border: `${strokeWidths.thick}px solid ${active ? colors.accent : withAlpha(colors.inkInverse, 0.3)}`,
      boxShadow: active ? `0 20px 50px ${withAlpha(colors.accent, 0.4)}` : `0 14px 36px ${withAlpha(colors.ink, 0.4)}`,
      display: "flex",
      alignItems: "center",
      gap: w * 0.07,
      padding: `0 ${w * 0.07}px`,
      boxSizing: "border-box",
    }}
  >
    <div style={{ width: w * 0.2, height: w * 0.2, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {kind === "name" ? <PersonIcon size={w * 0.2} on={active} /> : null}
      {kind === "phone" ? <Handset size={w * 0.2} ring={active ? 1 : 0} /> : null}
      {kind === "mail" ? <Envelope size={w * 0.2} on={active} /> : null}
    </div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: w * 0.04 }}>
      <Skeleton w="90%" h={Math.max(12, w * 0.05)} style={{ backgroundColor: withAlpha(colors.inkInverse, active ? 0.8 : 0.3) }} />
      <Skeleton w="55%" h={Math.max(12, w * 0.05)} />
    </div>
  </div>
);

/** Carte d'identité : portrait et lignes ; `on` l'allume. */
export const IdCard: React.FC<{ readonly w: number; readonly on?: boolean }> = ({ w, on: active = false }) => (
  <div
    style={{
      width: w,
      height: w * 0.64,
      borderRadius: radius.lg,
      backgroundColor: withAlpha(colors.ink, 0.88),
      border: `${strokeWidths.thick}px solid ${active ? colors.accent : withAlpha(colors.inkInverse, 0.35)}`,
      boxShadow: active ? `0 20px 50px ${withAlpha(colors.accent, 0.4)}` : `0 14px 36px ${withAlpha(colors.ink, 0.4)}`,
      display: "flex",
      alignItems: "center",
      gap: w * 0.07,
      padding: `0 ${w * 0.08}px`,
      boxSizing: "border-box",
    }}
  >
    <div style={{ width: w * 0.3, height: w * 0.36, borderRadius: radius.md, backgroundColor: withAlpha(colors.inkInverse, 0.14), display: "flex", alignItems: "center", justifyContent: "center" }}>
      <PersonIcon size={w * 0.27} on={active} />
    </div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: w * 0.05 }}>
      <Skeleton w="95%" h={Math.max(12, w * 0.045)} style={{ backgroundColor: withAlpha(colors.inkInverse, active ? 0.8 : 0.3) }} />
      <Skeleton w="70%" h={Math.max(12, w * 0.045)} />
      <Skeleton w="82%" h={Math.max(12, w * 0.045)} />
    </div>
  </div>
);

/** Étiquette de nom (« mon nom est… ») : bandeau corail et ligne vide. */
export const NameTag: React.FC<{ readonly w: number; readonly on?: boolean }> = ({ w, on: active = false }) => (
  <div
    style={{
      width: w,
      height: w * 0.62,
      borderRadius: radius.lg,
      backgroundColor: colors.inkInverse,
      border: `${strokeWidths.thick}px solid ${active ? colors.accent : withAlpha(colors.ink, 0.25)}`,
      boxShadow: active ? `0 20px 50px ${withAlpha(colors.accent, 0.45)}` : `0 14px 36px ${withAlpha(colors.ink, 0.4)}`,
      overflow: "hidden",
      boxSizing: "border-box",
    }}
  >
    <div style={{ height: "36%", backgroundColor: colors.accent }} />
    <div style={{ height: "64%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "62%", height: w * 0.05, borderRadius: radius.pill, backgroundColor: withAlpha(colors.ink, 0.22) }} />
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  L'hameçon et le poisson                                                    */
/* -------------------------------------------------------------------------- */

/** Ligne et hameçon (pointe en haut à gauche de la courbe) ; `on` l'allume. */
export const Hook: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on: active = false }) => {
  const color = col(active);

  return (
    <svg width={size * 0.5} height={size} viewBox="0 0 50 100" aria-hidden="true" style={{ overflow: "visible" }}>
      <path d="M30 0 V58 C30 90 4 94 4 68 M4 68 L-4 58 M4 68 L12 58" fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/** Poisson qui regarde à droite ; `on` l'allume. */
export const Fish: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on: active = false }) => {
  const color = col(active);

  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" aria-hidden="true">
      <path d="M8 30 L28 12 L28 48 Z" fill={color} />
      <ellipse cx="54" cy="30" rx="36" ry="21" fill={color} />
      <circle cx="74" cy="25" r="4.5" fill={colors.ink} />
      <path d="M52 16 Q60 30 52 44" fill="none" stroke={colors.ink} strokeWidth={3} opacity={0.35} strokeLinecap="round" />
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/*  Divers                                                                     */
/* -------------------------------------------------------------------------- */

/** Drapeau planté sur un mât ; `plant` (0 → 1) le fait descendre et se poser. */
export const Flag: React.FC<{ readonly size: number; readonly plant?: number }> = ({ size, plant = 1 }) => {
  const p = clamp01(plant);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ overflow: "visible" }}>
      <g transform={`translate(0 ${-(1 - easeOut(p)) * 60}) rotate(${(1 - p) * -14} 30 90)`} opacity={p > 0 ? 1 : 0}>
        <path d="M30 94 V10" stroke={colors.inkInverse} strokeWidth={8} strokeLinecap="round" />
        <path d="M30 12 H84 L70 32 L84 52 H30 Z" fill={colors.accent} stroke={colors.ink} strokeWidth={3} strokeOpacity={0.4} strokeLinejoin="round" />
      </g>
    </svg>
  );
};

/** Une grosse pastille ronde avec un chiffre ou un signe (« 17 », « ? »). */
export const BigDisc: React.FC<{ readonly size: number; readonly children: string; readonly font?: number }> = ({ size, children, font = 0.5 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.pill,
      backgroundColor: colors.accent,
      border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.5)}`,
      boxShadow: `0 20px 50px ${withAlpha(colors.accent, 0.4)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
    }}
  >
    <BrandText role="display" color={colors.inkInverse} style={{ fontSize: size * font, lineHeight: 1 }}>
      {children}
    </BrandText>
  </div>
);
