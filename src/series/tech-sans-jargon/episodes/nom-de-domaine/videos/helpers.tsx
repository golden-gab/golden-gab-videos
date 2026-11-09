/**
 * Aides communes aux plans de l'épisode « C'est quoi un nom de domaine ? » :
 * l'horloge des mots, la barre d'adresse (le nom puis « .com », jamais une
 * marque dessinée), la fenêtre de site, le terrain, la plaque d'adresse et
 * les petites réactions calées sur un mot. Tokens uniquement.
 *
 * La maison (`House`, `BlueprintCard`), le serveur, le calendrier, le fichier
 * et l'image viennent des épisodes « Design System » et « cache » : déjà
 * réutilisés ici, ils sont candidats à la promotion dans le kit de la série
 * (règle 46).
 */

import React from "react";

import { BrandText } from "../../../../../components/common/BrandText";
import { BrowserFrame, LibIcon, lit, punch, useWordClock, type Beat } from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { Skeleton } from "../../../../web-story/kit";
import { PersonIcon } from "../../../kit";
import { nomDeDomaineTranscript } from "../data/transcript.ts";

export { At, Calendar, EqualSign, FileIcon, Overlay, PageBody, PicFrame } from "../../cache/videos/helpers";
export { BlueprintCard, House, ServerNode, UiButton, tone } from "../../design-system-vs-system-design/videos/helpers";

export type BeatProps = { readonly scene: Scene };

export const useClock = (scene: Scene) => useWordClock(scene, nomDeDomaineTranscript);

/** Vrai dès que le mot est prononcé : allume un élément (jamais d'apparition). */
export const on = (clock: Beat, word: string, nth = 0): boolean => lit(clock, clock.at(word, nth), 0.2) > 0.5;

/** Petit « coup » d'échelle quand le mot est prononcé. */
export const pop = (clock: Beat, word: string, amplitude = 0.1, nth = 0): number => punch(clock, clock.at(word, nth), amplitude, 0.4);

const col = (active: boolean): string => (active ? colors.accent : colors.inkInverse);

/* -------------------------------------------------------------------------- */
/*  Barre d'adresse                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Barre d'adresse d'un navigateur. Sans `text`, le nom est une barre fantôme
 * suivie de « .com » (on lit « un nom + .com », jamais une vraie marque) ;
 * avec `text`, le libellé générique est écrit tel quel (« monsite.com »).
 * `typed` (0 → 1) fait entrer le nom comme s'il était tapé.
 */
export const AddressBar: React.FC<{
  readonly w: number;
  readonly active?: boolean;
  readonly dim?: number;
  readonly text?: string;
  readonly typed?: number;
  readonly nameW?: number;
  /** Hauteur / largeur de la barre (0,15 par défaut ; plus haute pour les petites vignettes). */
  readonly ratio?: number;
}> = ({ w, active = false, dim = 1, text, typed = 1, nameW, ratio = 0.15 }) => {
  const h = Math.round(w * ratio);
  const t = Math.max(0, Math.min(1, typed));

  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: radius.pill,
        backgroundColor: withAlpha(colors.ink, 0.88),
        border: `${strokeWidths.thick}px solid ${active ? colors.accent : withAlpha(colors.inkInverse, 0.4)}`,
        boxShadow: active ? `0 20px 50px ${withAlpha(colors.accent, 0.4)}` : `0 14px 36px ${withAlpha(colors.ink, 0.4)}`,
        display: "flex",
        alignItems: "center",
        gap: h * 0.24,
        padding: `0 ${h * 0.36}px`,
        boxSizing: "border-box",
        opacity: dim,
      }}
    >
      <LibIcon id="web-globe" size={h * 0.5} color={col(active)} />
      {text ? (
        <BrandText role="label" color={colors.inkInverse} style={{ fontSize: h * 0.42, lineHeight: 1, whiteSpace: "nowrap", textTransform: "none" }}>
          {text}
        </BrandText>
      ) : (
        <>
          <div style={{ width: nameW ?? w * 0.42, height: h * 0.2, borderRadius: radius.pill, backgroundColor: withAlpha(colors.inkInverse, 0.2), overflow: "hidden" }}>
            <div style={{ width: `${t * 100}%`, height: "100%", backgroundColor: withAlpha(colors.inkInverse, 0.8) }} />
          </div>
          <BrandText role="label" color={active ? colors.accent : colors.inkInverse} style={{ fontSize: h * 0.42, lineHeight: 1, whiteSpace: "nowrap", textTransform: "none" }}>
            .com
          </BrandText>
        </>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Fenêtre de site, terrain, plaque d'adresse                                 */
/* -------------------------------------------------------------------------- */

/** Fenêtre de navigateur (sans adresse) contenant un petit site fantôme. */
export const SiteWindow: React.FC<{
  readonly w: number;
  readonly active?: boolean;
  readonly dim?: number;
  readonly fill?: number;
}> = ({ w, active = false, dim = 1, fill = 1 }) => {
  const h = Math.round(w * 0.72);

  return (
    <div style={{ opacity: dim }}>
      <BrowserFrame
        width={w}
        height={h}
        tone="light"
        style={active ? { border: `${strokeWidths.thick}px solid ${colors.accent}`, boxShadow: `0 24px 60px ${withAlpha(colors.accent, 0.4)}` } : undefined}
      >
        <div style={{ padding: w * 0.07, display: "flex", flexDirection: "column", gap: w * 0.05 }}>
          <div style={{ height: w * 0.22, borderRadius: radius.md, backgroundColor: active ? withAlpha(colors.accent, 0.85) : withAlpha(colors.secondary, 0.25), opacity: 0.3 + 0.7 * fill }} />
          {[0.9, 0.68, 0.46].map((part) => (
            <div key={part} style={{ width: `${part * 100}%`, height: w * 0.045, borderRadius: radius.pill, backgroundColor: withAlpha(colors.secondary, 0.3), opacity: 0.3 + 0.7 * fill }} />
          ))}
        </div>
      </BrowserFrame>
    </div>
  );
};

/** Terrain vu en perspective ; `active` l'allume, `ghost` le laisse en pointillés. */
export const Plot: React.FC<{ readonly w: number; readonly active?: boolean; readonly ghost?: boolean }> = ({ w, active = false, ghost = false }) => (
  <svg width={w} height={w * 0.26} viewBox="0 0 300 78" aria-hidden="true">
    <path
      d="M34 6 H266 L296 70 H4 Z"
      fill={withAlpha(col(active), active ? 0.34 : 0.14)}
      stroke={col(active)}
      strokeWidth={5}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={ghost ? "2 11" : undefined}
    />
    <path d="M62 32 H238 M48 52 H252" stroke={col(active)} strokeWidth={4} strokeLinecap="round" opacity={0.4} />
  </svg>
);

/** Poteau et plaque d'adresse (barres fantômes : aucun texte) ; `active` l'allume. */
export const AddressSign: React.FC<{ readonly size: number; readonly active?: boolean }> = ({ size, active = false }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120" aria-hidden="true">
    <path d="M50 52 V112" stroke={colors.inkInverse} strokeWidth={9} strokeLinecap="round" />
    <rect x="6" y="6" width="88" height="48" rx="10" fill={withAlpha(colors.ink, 0.92)} stroke={col(active)} strokeWidth={6} />
    <rect x="20" y="20" width="60" height="9" rx="4.5" fill={col(active)} />
    <rect x="30" y="35" width="40" height="7" rx="3.5" fill={col(active)} opacity={0.6} />
  </svg>
);

/** Rangée de `count` visiteurs ; les `litCount` premiers sont allumés. */
export const Visitors: React.FC<{ readonly size: number; readonly count?: number; readonly litCount?: number }> = ({ size, count = 3, litCount = 0 }) => (
  <div style={{ display: "flex", gap: size * 0.1 }}>
    {Array.from({ length: count }, (_, index) => (
      <PersonIcon key={index} size={size} on={litCount > index} opacity={litCount > index ? 1 : 0.55} />
    ))}
  </div>
);

/** Un disque numéroté plein (1, 2, 3) pour les trois éléments du site. */
export const Numbered: React.FC<{ readonly size: number; readonly n: number; readonly active?: boolean }> = ({ size, n, active = true }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.pill,
      backgroundColor: active ? colors.accent : withAlpha(colors.ink, 0.88),
      border: `${strokeWidths.thick}px solid ${active ? withAlpha(colors.inkInverse, 0.5) : withAlpha(colors.inkInverse, 0.4)}`,
      boxShadow: active ? `0 20px 50px ${withAlpha(colors.accent, 0.4)}` : undefined,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
    }}
  >
    <BrandText role="display" color={colors.inkInverse} style={{ fontSize: size * 0.62, lineHeight: 1 }}>
      {String(n)}
    </BrandText>
  </div>
);

/** Flèche circulaire (« sur lui-même ») : `angle` la fait tourner, `active` l'allume. */
export const LoopArrow: React.FC<{ readonly size: number; readonly angle: number; readonly active?: boolean }> = ({ size, angle, active = false }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ transform: `rotate(${angle}deg)` }} aria-hidden="true">
    <path d="M100 14 A86 86 0 1 1 25.5 57" fill="none" stroke={col(active)} strokeWidth={13} strokeLinecap="round" />
    <path d="M32.5 44.9 L13.4 50 L37.6 64 Z" fill={col(active)} stroke={col(active)} strokeWidth={6} strokeLinejoin="round" />
  </svg>
);

/** Œil qui regarde (cadre simple pour « voir tous les jours »). */
export const Skel: React.FC<{ readonly w: number; readonly h?: number; readonly active?: boolean }> = ({ w, h = 22, active = false }) => (
  <Skeleton w={w} h={h} tone={active ? "accent" : "soft"} />
);
