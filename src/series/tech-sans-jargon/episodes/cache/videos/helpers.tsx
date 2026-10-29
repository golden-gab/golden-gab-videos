/**
 * Aides communes aux plans de l'épisode « C'est quoi le cache ? » : l'horloge
 * des mots, un calque SVG, et les petits objets du quotidien dessinés avec les
 * tokens uniquement (pot de sel, étal de marché, étagère, casserole, boîte de
 * réserve, poubelle, balai, fichiers, cadres photo, jauge de stockage, éclair,
 * panneau d'avertissement, calendrier…). Aucune marque, aucun texte lu.
 */

import React from "react";

import { abs, LibIcon, PhoneMock, punch, useWordClock, lit, type Beat } from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { Card, Forbidden, Skeleton } from "../../../../web-story/kit";
import { Chat, PersonIcon } from "../../../kit";
import { cacheTranscript } from "../data/transcript.ts";

export type BeatProps = { readonly scene: Scene };

export const useClock = (scene: Scene) => useWordClock(scene, cacheTranscript);

/** Couleur « éteinte » (crème) ou « allumée » (corail). */
const tone = (on: boolean | number): string => (on === true || (typeof on === "number" && on > 0.5) ? colors.accent : colors.inkInverse);

/** Calque SVG plein cadre (flèches, fils, éclats) dans un `Art`. */
export const Overlay: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly children: React.ReactNode;
}> = ({ w, h, children }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
    {children}
  </svg>
);

/** Cercle barré qui se trace avec `progress` ; invisible tant que le mot n'est pas prononcé. */
export const Veto: React.FC<{
  readonly size: number;
  readonly progress: number;
  readonly color?: string;
}> = ({ size, progress, color }) => (
  <div style={{ opacity: progress > 0.02 ? 1 : 0 }}>
    <Forbidden size={size} progress={progress} color={color} />
  </div>
);

/** Pose un élément à (x, y), taille w × h, avec une échelle et une rotation facultatives. */
export const At: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly scale?: number;
  readonly rotate?: number;
  readonly children: React.ReactNode;
}> = ({ x, y, w, h, scale = 1, rotate = 0, children }) => (
  <div style={{ ...abs(x, y, w, h), transform: `rotate(${rotate}deg) scale(${scale})`, transformOrigin: "50% 50%" }}>{children}</div>
);

/* -------------------------------------------------------------------------- */
/*  La cuisine : pot de sel, casserole, étagère                                */
/* -------------------------------------------------------------------------- */

/** Pot de sel en verre ; `fill` (0 → 1) règle le niveau de sel, `on` allume le couvercle. */
export const Jar: React.FC<{
  readonly size: number;
  readonly fill?: number;
  readonly on?: boolean;
}> = ({ size, fill = 1, on = false }) => {
  const level = Math.max(0, Math.min(1, fill));
  const saltH = 74 * level;

  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" aria-hidden="true">
      <rect x="28" y="6" width="44" height="16" rx="5" fill={on ? colors.accent : colors.inkInverse} />
      <rect x="34" y="20" width="32" height="8" fill={withAlpha(colors.inkInverse, 0.55)} />
      <rect x="14" y="26" width="72" height="90" rx="18" fill={withAlpha(colors.ink, 0.55)} stroke={on ? colors.accent : colors.inkInverse} strokeWidth={5} />
      {level > 0 ? <rect x="21" y={109 - saltH} width="58" height={saltH} rx="12" fill={withAlpha(colors.inkInverse, 0.92)} /> : null}
      <rect x="30" y="52" width="40" height="26" rx="6" fill={withAlpha(colors.surfaceDark, 0.9)} opacity={level > 0.3 ? 0.9 : 0.5} />
      <rect x="35" y="60" width="30" height="5" rx="2.5" fill={withAlpha(colors.inkInverse, 0.7)} />
      <rect x="35" y="68" width="20" height="5" rx="2.5" fill={withAlpha(colors.inkInverse, 0.45)} />
    </svg>
  );
};

/** Casserole sur le feu ; `steam` (0 → 1) fait monter la vapeur, `flame` allume le feu. */
export const Pot: React.FC<{
  readonly size: number;
  readonly steam?: number;
  readonly flame?: boolean;
}> = ({ size, steam = 0, flame = true }) => {
  const s = Math.max(0, Math.min(1, steam));

  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 120 108" aria-hidden="true">
      {[34, 60, 86].map((x, index) => (
        <path
          key={x}
          d={`M${x} 34 q-9 -10 0 -20 q9 -10 0 -22`}
          transform={`translate(${Math.sin(s * 6 + index) * 3} ${-s * 14 - index * 2})`}
          fill="none"
          stroke={colors.inkInverse}
          strokeWidth={6}
          strokeLinecap="round"
          opacity={0.25 + 0.65 * s}
        />
      ))}
      <rect x="22" y="40" width="76" height="8" rx="4" fill={colors.inkInverse} />
      <rect x="26" y="46" width="68" height="40" rx="10" fill={withAlpha(colors.ink, 0.9)} stroke={colors.inkInverse} strokeWidth={5} />
      <rect x="8" y="58" width="18" height="8" rx="4" fill={colors.inkInverse} />
      <rect x="94" y="58" width="18" height="8" rx="4" fill={colors.inkInverse} />
      <rect x="54" y="32" width="12" height="8" rx="3" fill={colors.accent} />
      {flame
        ? [38, 60, 82].map((x) => <path key={x} d={`M${x} 104 q-8 -8 0 -18 q3 6 8 4 q4 8 -8 14 Z`} fill={colors.accent} />)
        : null}
    </svg>
  );
};

/** Étagère de cuisine ; `on` l'allume en corail. */
export const Shelf: React.FC<{ readonly w: number; readonly on?: boolean }> = ({ w, on = false }) => (
  <svg width={w} height={w * 0.3} viewBox="0 0 200 60" aria-hidden="true">
    <rect x="4" y="8" width="192" height="16" rx="6" fill={tone(on)} />
    <path d="M30 24 V50 L56 24 M170 24 V50 L144 24" fill="none" stroke={withAlpha(colors.inkInverse, 0.6)} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Le marché et l'argent                                                      */
/* -------------------------------------------------------------------------- */

/** Étal de marché : auvent rayé, comptoir et cageots ; `on` l'allume. */
export const Stall: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on = false }) => (
  <svg width={size} height={size * 0.86} viewBox="0 0 140 120" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((index) => (
      <path
        key={index}
        d={`M${10 + index * 24} 12 H${34 + index * 24} L${40 + index * 24} 44 H${4 + index * 24} Z`}
        fill={index % 2 === 0 ? colors.accent : colors.inkInverse}
      />
    ))}
    {[0, 1, 2, 3, 4].map((index) => (
      <circle key={index} cx={22 + index * 24} cy={44} r={12} fill={index % 2 === 0 ? colors.accent : colors.inkInverse} />
    ))}
    <rect x="12" y="52" width="6" height="62" rx="3" fill={withAlpha(colors.inkInverse, 0.7)} />
    <rect x="122" y="52" width="6" height="62" rx="3" fill={withAlpha(colors.inkInverse, 0.7)} />
    <rect x="8" y="82" width="124" height="14" rx="5" fill={on ? colors.accent : withAlpha(colors.inkInverse, 0.9)} />
    <rect x="24" y="98" width="38" height="18" rx="4" fill={withAlpha(colors.inkInverse, 0.5)} />
    <rect x="76" y="98" width="38" height="18" rx="4" fill={withAlpha(colors.inkInverse, 0.5)} />
    <circle cx="42" cy="72" r="8" fill={tone(on)} />
    <circle cx="62" cy="72" r="8" fill={tone(on)} />
    <circle cx="98" cy="72" r="8" fill={tone(on)} />
  </svg>
);

/** Petite pièce de monnaie (le paiement). */
export const Coin: React.FC<{ readonly size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="42" fill={colors.accent} stroke={colors.inkInverse} strokeWidth={7} />
    <circle cx="50" cy="50" r="26" fill="none" stroke={colors.inkInverse} strokeWidth={6} strokeDasharray="10 9" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Le téléphone et ses données                                                */
/* -------------------------------------------------------------------------- */

/** Fichier (feuille au coin plié) ; `dim` l'éteint, `on` l'allume. */
export const FileIcon: React.FC<{
  readonly size: number;
  readonly on?: boolean;
  readonly dim?: boolean;
}> = ({ size, on = false, dim = false }) => {
  const color = dim ? withAlpha(colors.inkInverse, 0.3) : tone(on);

  return (
    <svg width={size * 0.8} height={size} viewBox="0 0 80 100" aria-hidden="true">
      <path d="M8 4 H50 L72 26 V94 H8 Z" fill={withAlpha(colors.ink, 0.85)} stroke={color} strokeWidth={7} strokeLinejoin="round" />
      <path d="M50 4 V26 H72" fill="none" stroke={color} strokeWidth={7} strokeLinejoin="round" />
      <rect x="20" y="46" width="40" height="7" rx="3.5" fill={color} opacity={0.8} />
      <rect x="20" y="62" width="30" height="7" rx="3.5" fill={color} opacity={0.5} />
      <rect x="20" y="78" width="36" height="7" rx="3.5" fill={color} opacity={0.5} />
    </svg>
  );
};

/** Cadre d'image (montagne et soleil) ; `on` l'allume en corail. */
export const PicFrame: React.FC<{
  readonly w: number;
  readonly on?: boolean;
  readonly dim?: boolean;
}> = ({ w, on = false, dim = false }) => {
  const color = dim ? withAlpha(colors.inkInverse, 0.3) : tone(on);

  return (
    <svg width={w} height={w * 0.84} viewBox="0 0 100 84" aria-hidden="true">
      <rect x="4" y="4" width="92" height="76" rx="12" fill={withAlpha(colors.ink, 0.85)} stroke={color} strokeWidth={6} />
      <circle cx="30" cy="28" r="9" fill={color} />
      <path d="M10 70 L38 40 L56 58 L68 46 L90 70 Z" fill={color} opacity={0.85} />
    </svg>
  );
};

/**
 * Jauge de stockage : `used` (0 → 1) est la part occupée, `freed` (0 → 1) la
 * part libérée (corail, en bout de partie occupée), `dream` une part rêvée
 * dessinée en pointillés.
 */
export const StorageBar: React.FC<{
  readonly w: number;
  readonly h?: number;
  readonly used: number;
  readonly freed?: number;
  readonly dream?: number;
  /** Colore la part occupée en corail (jauge presque pleine). */
  readonly hot?: boolean;
}> = ({ w, h = 110, used, freed = 0, dream = 0, hot = false }) => {
  const u = Math.max(0, Math.min(1, used));
  const f = Math.max(0, Math.min(u, freed));
  const d = Math.max(0, Math.min(1, dream));

  return (
    <div
      style={{
        position: "relative",
        width: w,
        height: h,
        borderRadius: radius.pill,
        backgroundColor: withAlpha(colors.ink, 0.85),
        border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.4)}`,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div style={{ ...abs(0, 0, (w - 28) * (u - f), h), backgroundColor: hot ? withAlpha(colors.accent, 0.85) : withAlpha(colors.inkInverse, 0.55) }} />
      {f > 0 ? <div style={{ ...abs((w - 28) * (u - f), 0, (w - 28) * f, h), backgroundColor: colors.accent }} /> : null}
      {d > 0 ? (
        <div
          style={{
            ...abs((w - 28) * (1 - d), 0, (w - 28) * d, h),
            border: `${strokeWidths.medium}px dashed ${colors.accent}`,
            boxSizing: "border-box",
            borderRadius: radius.pill,
          }}
        />
      ) : null}
    </div>
  );
};

/** Flèche de téléchargement : flèche vers le bas au-dessus d'un plateau. */
export const DownArrow: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on = true }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M50 10 V62 M28 42 L50 64 L72 42" fill="none" stroke={tone(on)} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 82 H84" fill="none" stroke={tone(on)} strokeWidth={13} strokeLinecap="round" />
  </svg>
);

/** Boîte-réserve ouverte avec ses objets ; `eject` (0 → 1) les fait s'envoler, `on` allume le contour. */
export const CacheBox: React.FC<{
  readonly size: number;
  readonly eject?: number;
  readonly on?: boolean;
}> = ({ size, eject = 0, on = false }) => {
  const e = Math.max(0, Math.min(1, eject));
  const items = [
    { x: 30, y: 38, s: 20, dx: -46, dy: -34 },
    { x: 52, y: 30, s: 22, dx: 0, dy: -56 },
    { x: 74, y: 38, s: 18, dx: 46, dy: -30 },
  ];

  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 120 108" aria-hidden="true" style={{ overflow: "visible" }}>
      {items.map((item, index) => (
        <g key={index} transform={`translate(${item.dx * e} ${item.dy * e}) rotate(${e * (index - 1) * 40} ${item.x} ${item.y})`}>
          <rect x={item.x - item.s / 2} y={item.y - item.s / 2} width={item.s} height={item.s} rx="5" fill={index === 1 ? colors.accent : colors.inkInverse} />
        </g>
      ))}
      <path d="M12 50 L30 36 H90 L108 50 Z" fill={withAlpha(colors.inkInverse, 0.5)} />
      <rect x="12" y="50" width="96" height="52" rx="8" fill={withAlpha(colors.ink, 0.9)} stroke={on ? colors.accent : colors.inkInverse} strokeWidth={6} />
      <rect x="40" y="64" width="40" height="9" rx="4.5" fill={on ? colors.accent : withAlpha(colors.inkInverse, 0.8)} />
    </svg>
  );
};

/** Poubelle ; `lid` (0 → 1) soulève et incline le couvercle. */
export const Trash: React.FC<{ readonly size: number; readonly lid?: number; readonly on?: boolean }> = ({ size, lid = 0, on = false }) => {
  const l = Math.max(0, Math.min(1, lid));

  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110" aria-hidden="true" style={{ overflow: "visible" }}>
      <g transform={`rotate(${-l * 38} 22 28)`}>
        <rect x="14" y="20" width="72" height="10" rx="5" fill={tone(on)} />
        <rect x="40" y="10" width="20" height="10" rx="4" fill={tone(on)} />
      </g>
      <path d="M20 34 H80 L74 100 Q73 104 69 104 H31 Q27 104 26 100 Z" fill={withAlpha(colors.ink, 0.9)} stroke={tone(on)} strokeWidth={6} strokeLinejoin="round" />
      <path d="M40 46 V92 M50 46 V92 M60 46 V92" stroke={tone(on)} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
    </svg>
  );
};

/** Balai : manche incliné et poils ; `angle` le fait balayer. */
export const Broom: React.FC<{ readonly size: number; readonly angle?: number }> = ({ size, angle = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ overflow: "visible" }}>
    <g transform={`rotate(${angle} 50 92)`}>
      <path d="M50 6 V58" stroke={colors.inkInverse} strokeWidth={9} strokeLinecap="round" />
      <path d="M32 58 H68 L78 94 H22 Z" fill={colors.accent} />
      <path d="M36 70 L34 94 M46 70 V94 M56 70 V94 M66 70 L66 94" stroke={colors.ink} strokeWidth={4} strokeLinecap="round" opacity={0.5} />
    </g>
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Signes : éclair, avertissement, égalité, ampoule, calendrier               */
/* -------------------------------------------------------------------------- */

/** Éclair (la rapidité). */
export const Lightning: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on = true }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M60 4 L22 56 H46 L38 96 L80 40 H54 Z" fill={tone(on)} stroke={colors.ink} strokeWidth={4} strokeLinejoin="round" />
  </svg>
);

/** Panneau d'avertissement : triangle et point d'exclamation. */
export const Warning: React.FC<{ readonly size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M50 8 L94 86 H6 Z" fill={colors.accent} stroke={colors.inkInverse} strokeWidth={6} strokeLinejoin="round" />
    <rect x="45" y="34" width="10" height="28" rx="5" fill={colors.inkInverse} />
    <circle cx="50" cy="72" r="6" fill={colors.inkInverse} />
  </svg>
);

/** Signe « égal » : deux barres dans un disque ; `on` l'allume. */
export const EqualSign: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="44" fill={on ? colors.accent : withAlpha(colors.ink, 0.85)} stroke={withAlpha(colors.inkInverse, 0.5)} strokeWidth={6} />
    <rect x="26" y="34" width="48" height="10" rx="5" fill={colors.inkInverse} />
    <rect x="26" y="56" width="48" height="10" rx="5" fill={colors.inkInverse} />
  </svg>
);

/** Une journée de la semaine : disque qui s'allume. */
export const DayDot: React.FC<{ readonly size: number; readonly on: boolean }> = ({ size, on }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.pill,
      backgroundColor: on ? colors.accent : withAlpha(colors.inkInverse, 0.18),
      border: `${strokeWidths.medium}px solid ${on ? withAlpha(colors.inkInverse, 0.6) : withAlpha(colors.inkInverse, 0.3)}`,
      boxSizing: "border-box",
    }}
  />
);

/** Calendrier : en-tête, grille de jours ; `day` est le jour allumé (0 → 20). */
export const Calendar: React.FC<{ readonly w: number; readonly day: number; readonly today?: number }> = ({ w, day, today = 9 }) => (
  <svg width={w} height={w * 0.92} viewBox="0 0 120 110" aria-hidden="true">
    <rect x="4" y="10" width="112" height="96" rx="14" fill={withAlpha(colors.ink, 0.88)} stroke={withAlpha(colors.inkInverse, 0.4)} strokeWidth={5} />
    <path d="M4 24 a14 14 0 0 1 14 -14 H102 a14 14 0 0 1 14 14 V36 H4 Z" fill={colors.accent} />
    <rect x="30" y="2" width="8" height="18" rx="4" fill={colors.inkInverse} />
    <rect x="82" y="2" width="8" height="18" rx="4" fill={colors.inkInverse} />
    {Array.from({ length: 21 }, (_, index) => {
      const x = 14 + (index % 7) * 13.5;
      const y = 46 + Math.floor(index / 7) * 18;
      const on = index === day;

      return <rect key={index} x={x} y={y} width="11" height="11" rx="3" fill={on ? colors.accent : index === today ? colors.inkInverse : withAlpha(colors.inkInverse, 0.3)} />;
    })}
  </svg>
);

/** Nœud de fils emmêlés qui se détend en ligne droite (`calm` 0 → 1). */
export const Tangle: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly calm: number;
  readonly jitter?: number;
}> = ({ w, h, calm, jitter = 0 }) => {
  const c = Math.max(0, Math.min(1, calm));
  const count = 22;
  const points = Array.from({ length: count }, (_, index) => {
    const t = index / (count - 1);
    const angle = t * Math.PI * 9;
    const wild = { x: w * 0.5 + Math.cos(angle * 1.3) * w * 0.34 * (0.5 + 0.5 * Math.sin(t * 7 + 1)), y: h * 0.5 + Math.sin(angle) * h * 0.4 };
    const straight = { x: w * 0.06 + t * w * 0.88, y: h * 0.5 };

    return `${index === 0 ? "M" : "L"}${(wild.x + (straight.x - wild.x) * c + jitter * (index % 2 ? 1 : -1)).toFixed(1)} ${(wild.y + (straight.y - wild.y) * c).toFixed(1)}`;
  });

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ overflow: "visible" }}>
      <path d={points.join(" ")} fill="none" stroke={c > 0.9 ? colors.accent : colors.inkInverse} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/** Goutte de sueur. */
export const Drop: React.FC<{ readonly size: number }> = ({ size }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 40 52" aria-hidden="true">
    <path d="M20 2 Q4 26 4 34 a16 16 0 0 0 32 0 Q36 26 20 2 Z" fill={colors.inkInverse} stroke={colors.accent} strokeWidth={4} strokeLinejoin="round" />
  </svg>
);

/** Flèche circulaire (recharger) qui tourne avec `angle`. */
export const Reload: React.FC<{ readonly size: number; readonly angle?: number; readonly on?: boolean }> = ({ size, angle = 0, on = true }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ transform: `rotate(${angle}deg)` }}>
    <path d="M82 50 A32 32 0 1 1 68 24" fill="none" stroke={tone(on)} strokeWidth={12} strokeLinecap="round" />
    <path d="M62 8 L72 28 L50 30" fill="none" stroke={tone(on)} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Un petit dessin de page de site : bandeau d'image et lignes, dans une carte. */
export const PageBody: React.FC<{
  readonly w: number;
  readonly fill?: number;
  readonly hot?: boolean;
}> = ({ w, fill = 1, hot = false }) => (
  <div style={{ width: w, padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
    <div
      style={{
        height: w * 0.28,
        borderRadius: radius.md,
        backgroundColor: hot ? withAlpha(colors.accent, 0.85) : withAlpha(colors.secondary, 0.25),
        opacity: 0.3 + 0.7 * fill,
      }}
    />
    {[0.92, 0.7, 0.5].map((part, index) => (
      <div
        key={index}
        style={{ width: `${part * 100}%`, height: 20, borderRadius: radius.pill, backgroundColor: withAlpha(colors.secondary, 0.3), opacity: 0.3 + 0.7 * fill }}
      />
    ))}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Assemblages récurrents                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Téléphone de messagerie (aucune marque) : en-tête fantôme et une bulle
 * entrante ; `hot` allume la bulle en corail.
 */
export const MsgPhone: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly hot?: boolean;
  readonly style?: React.CSSProperties;
}> = ({ w, h, hot = false, style }) => {
  const sw = w - 32;

  return (
    <PhoneMock width={w} height={h} style={style}>
      <div style={{ ...abs(0, 0, sw, h - 32), backgroundColor: colors.surfaceDark }}>
        <div style={{ ...abs(0, 52, sw, 100), backgroundColor: withAlpha(colors.inkInverse, 0.1), display: "flex", alignItems: "center", gap: 18, padding: "0 24px" }}>
          <div style={{ width: 64, height: 64, borderRadius: radius.pill, backgroundColor: withAlpha(colors.inkInverse, 0.25) }} />
          <Skeleton w={sw * 0.34} h={20} />
        </div>
        <div
          style={{
            ...abs(24, 200, sw * 0.7, 120),
            borderRadius: radius.lg,
            backgroundColor: hot ? colors.accent : withAlpha(colors.inkInverse, 0.2),
            padding: "0 26px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Skeleton w="88%" h={20} style={{ backgroundColor: withAlpha(colors.inkInverse, hot ? 0.85 : 0.4) }} />
          <Skeleton w="56%" h={20} style={{ backgroundColor: withAlpha(colors.inkInverse, hot ? 0.6 : 0.3) }} />
        </div>
        <div style={{ ...abs(sw * 0.3, 350, sw * 0.62, 84), borderRadius: radius.lg, backgroundColor: withAlpha(colors.inkInverse, 0.34) }} />
        <div style={{ ...abs(24, 464, sw * 0.5, 84), borderRadius: radius.lg, backgroundColor: withAlpha(colors.inkInverse, 0.2) }} />
      </div>
    </PhoneMock>
  );
};

/** Tuile d'application : carte carrée avec une icône de la bibliothèque. */
export const AppSquare: React.FC<{
  readonly size: number;
  readonly icon: string;
  readonly on?: boolean;
}> = ({ size, icon, on = false }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.lg,
      backgroundColor: on ? withAlpha(colors.accent, 0.22) : withAlpha(colors.ink, 0.85),
      border: `${strokeWidths.thick}px solid ${on ? colors.accent : withAlpha(colors.inkInverse, 0.3)}`,
      boxShadow: `0 14px 34px ${withAlpha(colors.ink, on ? 0.2 : 0.4)}`,
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <LibIcon id={icon} size={size * 0.5} color={on ? colors.accent : colors.inkInverse} />
  </div>
);

/**
 * Le pot de sel posé sur l'étagère (340 × 300) ; `drop` (0 → 1) le fait
 * descendre depuis le haut, `fill` règle son niveau, `on` allume l'étagère.
 */
export const JarOnShelf: React.FC<{
  readonly fill?: number;
  readonly drop?: number;
  readonly on?: boolean;
}> = ({ fill = 1, drop = 1, on = false }) => (
  <div style={{ position: "relative", width: 340, height: 300 }}>
    <div style={{ ...abs(85, 7 - 250 * (1 - Math.max(0, Math.min(1, drop))), 170, 204) }}>
      <Jar size={170} fill={fill} on={on} />
    </div>
    <div style={abs(0, 190, 340, 102)}>
      <Shelf w={340} on={on} />
    </div>
  </div>
);

/**
 * Une personne qui parle : sa silhouette et une bulle de discussion fantôme,
 * qui claque quand `sayAt` (secondes) est atteint. Sert au début de la vidéo
 * et à son écho (« qu'on te dit »).
 */
export const SayArt: React.FC<{
  readonly clock: Beat;
  readonly whoAt: number;
  readonly sayAt: number;
}> = ({ clock, whoAt, sayAt }) => (
  <>
    <At x={30} y={180} w={300} h={300} scale={punch(clock, whoAt, 0.08, 0.4)}>
      <PersonIcon size={300} on={lit(clock, whoAt, 0.2) > 0.5} />
    </At>
    <At x={360} y={90} w={540} h={290} scale={punch(clock, sayAt, 0.12, 0.45)}>
      <Chat w={540} h={290} tail="left" hot={lit(clock, sayAt, 0.15) > 0.5}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
          <Skeleton w={380} h={28} style={{ backgroundColor: withAlpha(colors.inkInverse, 0.75) }} />
          <Skeleton w={250} h={28} style={{ backgroundColor: withAlpha(colors.inkInverse, 0.5) }} />
        </div>
      </Chat>
    </At>
  </>
);

/** Une carte-choix (DÉJÀ / NOUVEAU) : cadre, icône et gros libellé ; `on` l'allume. */
export const ChoiceCard: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly on?: boolean;
  readonly children: React.ReactNode;
}> = ({ w, h, on = false, children }) => (
  <Card w={w} h={h} active={on} dim={on ? 1 : 0.8}>
    {children}
  </Card>
);
