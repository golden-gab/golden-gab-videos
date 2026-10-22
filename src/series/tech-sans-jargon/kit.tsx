/**
 * Briques de dessin de la série « La tech sans jargon » : petits objets SVG
 * du quotidien numérique (masque de navigation privée, œil, Wi-Fi, antenne,
 * feuille, historique…), dessinés avec les tokens uniquement. Elles complètent
 * le kit partagé de `web-story/kit.tsx` (Pill, Card, Skeleton, Shot, Gear,
 * Arrow, CheckMark, Forbidden…).
 *
 * Un composant utilisé dans un second épisode de la série sera promu dans
 * `src/components/motion` (règle 46).
 */

import React from "react";

import { BrandText } from "../../components/common/BrandText";
import { colors, radius, strokeWidths } from "../../config";
import { withAlpha } from "../../utils/color";
import { Skeleton } from "../web-story/kit";

/** Couleur d'un élément « éteint » (crème) ou « allumé » (corail). */
const tone = (on: number | boolean): string => (on === true || (typeof on === "number" && on > 0.5) ? colors.accent : colors.inkInverse);

/* -------------------------------------------------------------------------- */
/*  Personnages et regards                                                     */
/* -------------------------------------------------------------------------- */

/** Silhouette de personne : tête + buste ; `on` l'allume en corail. */
export const PersonIcon: React.FC<{
  readonly size: number;
  readonly on?: boolean;
  readonly opacity?: number;
}> = ({ size, on = false, opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ opacity }}>
    <circle cx="50" cy="32" r="17" fill={tone(on)} />
    <path d="M18 88 a32 28 0 0 1 64 0 Z" fill={tone(on)} />
  </svg>
);

/** Silhouette en pointillés : « la personne qu'on ne verrait pas ». */
export const PersonOutline: React.FC<{ readonly size: number; readonly opacity?: number }> = ({ size, opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ opacity }}>
    <circle cx="50" cy="32" r="17" fill="none" stroke={colors.inkInverse} strokeWidth={5} strokeDasharray="7 9" strokeLinecap="round" />
    <path d="M18 88 a32 28 0 0 1 64 0 Z" fill="none" stroke={colors.inkInverse} strokeWidth={5} strokeDasharray="7 9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Œil dessiné qui regarde vers `look` (-1 gauche, 1 droite) ; `hot` allume l'iris. */
export const EyeIcon: React.FC<{
  readonly size: number;
  readonly look?: number;
  readonly hot?: boolean;
}> = ({ size, look = 0, hot = true }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60" aria-hidden="true">
    <path d="M4 30 Q50 -10 96 30 Q50 70 4 30 Z" fill={colors.inkInverse} stroke={colors.ink} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={50 + look * 14} cy="30" r="15" fill={hot ? colors.accent : colors.secondary} />
    <circle cx={50 + look * 14} cy="30" r="6" fill={colors.ink} />
  </svg>
);

/** Masque de navigation privée : chapeau et lunettes (générique, sans marque). */
export const Incognito: React.FC<{ readonly size: number; readonly lit?: number }> = ({ size, lit = 0 }) => {
  const color = tone(lit);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M30 50 L36 20 Q50 12 64 20 L70 50 Z" fill={color} />
      <path d="M10 52 Q50 62 90 52 L88 46 Q50 56 12 46 Z" fill={color} />
      <circle cx="34" cy="73" r="12" fill={colors.ink} stroke={color} strokeWidth={7} />
      <circle cx="66" cy="73" r="12" fill={colors.ink} stroke={color} strokeWidth={7} />
      <path d="M46 71 Q50 67 54 71" fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/*  Réseau : Wi-Fi, antenne, points                                            */
/* -------------------------------------------------------------------------- */

const arc = (radiusValue: number): string => {
  const d = radiusValue * 0.7071;

  return `M${50 - d} ${78 - d} A${radiusValue} ${radiusValue} 0 0 1 ${50 + d} ${78 - d}`;
};

/** Symbole Wi-Fi ; `on` (0 → 3) allume les arcs un à un en corail. */
export const WifiIcon: React.FC<{ readonly size: number; readonly on?: number }> = ({ size, on = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    {[20, 38, 56].map((r, index) => (
      <path
        key={r}
        d={arc(r)}
        fill="none"
        stroke={on > index ? colors.accent : withAlpha(colors.inkInverse, 0.4)}
        strokeWidth={9}
        strokeLinecap="round"
      />
    ))}
    <circle cx="50" cy="80" r="8" fill={on > 0 ? colors.accent : colors.inkInverse} />
  </svg>
);

/** Antenne relais (le fournisseur Internet) ; `on` 0 → 1 allume ses ondes. */
export const Tower: React.FC<{ readonly size: number; readonly on?: number }> = ({ size, on = 0 }) => {
  const wave = on > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.4);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 38 L30 94 M50 38 L70 94 M39 70 H61 M44 54 H56" fill="none" stroke={colors.inkInverse} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="30" r="8" fill={on > 0.5 ? colors.accent : colors.inkInverse} />
      <path d="M32 20 A24 24 0 0 0 32 44 M68 20 A24 24 0 0 1 68 44" fill="none" stroke={wave} strokeWidth={7} strokeLinecap="round" />
      <path d="M20 12 A40 40 0 0 0 20 52 M80 12 A40 40 0 0 1 80 52" fill="none" stroke={wave} strokeWidth={7} strokeLinecap="round" />
    </svg>
  );
};

/** Réseau de points reliés ; `on` (0 → 1) allume les points en corail. */
export const NetNodes: React.FC<{ readonly w: number; readonly h: number; readonly on: number }> = ({ w, h, on }) => {
  const nodes = [
    [0.1, 0.5],
    [0.34, 0.15],
    [0.34, 0.85],
    [0.62, 0.5],
    [0.9, 0.2],
    [0.9, 0.8],
  ];
  const links = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [3, 5],
  ];

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      {links.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0] * w}
          y1={nodes[a][1] * h}
          x2={nodes[b][0] * w}
          y2={nodes[b][1] * h}
          stroke={on > 0.5 ? withAlpha(colors.accent, 0.8) : withAlpha(colors.inkInverse, 0.35)}
          strokeWidth={8}
          strokeLinecap="round"
        />
      ))}
      {nodes.map(([x, y], index) => (
        <circle key={index} cx={x * w} cy={y * h} r={22} fill={on > 0.5 ? colors.accent : colors.inkInverse} stroke={colors.ink} strokeWidth={5} />
      ))}
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/*  Lieux et objets                                                            */
/* -------------------------------------------------------------------------- */

/** Toque de diplômé (l'école). */
export const SchoolCap: React.FC<{ readonly size: number; readonly color?: string }> = ({ size, color = colors.inkInverse }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M50 20 L94 42 L50 64 L6 42 Z" fill={color} />
    <path d="M26 54 V74 Q50 90 74 74 V54" fill="none" stroke={color} strokeWidth={9} strokeLinejoin="round" />
    <path d="M90 46 V72" stroke={color} strokeWidth={6} strokeLinecap="round" />
  </svg>
);

/** Mallette (le travail). */
export const CaseIcon: React.FC<{ readonly size: number; readonly color?: string }> = ({ size, color = colors.inkInverse }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <rect x="10" y="34" width="80" height="50" rx="9" fill={color} />
    <path d="M36 34 V24 a4 4 0 0 1 4 -4 H60 a4 4 0 0 1 4 4 V34" fill="none" stroke={color} strokeWidth={7} />
    <path d="M10 56 H90" stroke={colors.ink} strokeWidth={5} />
    <rect x="44" y="52" width="12" height="10" rx="3" fill={colors.ink} />
  </svg>
);

/** Bouclier ; la coche se trace avec `check` 0 → 1. */
export const ShieldCheck: React.FC<{ readonly size: number; readonly check?: number }> = ({ size, check = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M50 6 L87 21 V50 C87 72 71 87 50 95 C29 87 13 72 13 50 V21 Z" fill={withAlpha(colors.ink, 0.85)} stroke={colors.accent} strokeWidth={7} strokeLinejoin="round" />
    <path
      d="M31 51 L45 65 L70 36"
      fill="none"
      stroke={colors.accent}
      strokeWidth={10}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - Math.min(1, Math.max(0, check))}
    />
  </svg>
);

/** Crayon incliné ; sa pointe est en bas à gauche. */
export const Pencil: React.FC<{ readonly size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M66 12 L88 34 L38 84 L12 90 L16 64 Z" fill={colors.accent} />
    <path d="M16 64 L12 90 L38 84 Z" fill={colors.inkInverse} />
    <path d="M13 83 L11 90 L18 88 Z" fill={colors.ink} />
    <path d="M60 18 L82 40" stroke={colors.ink} strokeWidth={5} strokeLinecap="round" />
  </svg>
);

/** Loupe (sans mise en forme d'effet) : rôle d'outil de recherche. */
export const Loupe: React.FC<{ readonly size: number; readonly color?: string }> = ({ size, color = colors.inkInverse }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="42" cy="42" r="28" fill="none" stroke={color} strokeWidth={10} />
    <path d="M63 63 L90 90" stroke={colors.accent} strokeWidth={13} strokeLinecap="round" />
  </svg>
);

/** Disque plein avec un signe court (« ! », « ? ») ou un enfant. */
export const Disc: React.FC<{
  readonly size: number;
  readonly children?: React.ReactNode;
  readonly sign?: string;
  readonly color?: string;
}> = ({ size, children, sign, color = colors.accent }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.pill,
      backgroundColor: color,
      border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.5)}`,
      boxShadow: `0 20px 50px ${withAlpha(colors.accent, 0.4)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {sign ? (
      <BrandText role="display" color={colors.inkInverse} style={{ fontSize: size * 0.62, lineHeight: 1 }}>
        {sign}
      </BrandText>
    ) : (
      children
    )}
  </div>
);

/** Bulle de pensée : une ellipse et deux petits ronds qui descendent vers le bas gauche. */
export const Thought: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly children?: React.ReactNode;
}> = ({ w, h, children }) => (
  <div style={{ position: "relative", width: w, height: h + 70 }}>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: w,
        height: h,
        borderRadius: radius.pill,
        backgroundColor: withAlpha(colors.ink, 0.85),
        border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.4)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
    <div style={{ position: "absolute", left: w * 0.14, top: h + 4, width: 34, height: 34, borderRadius: radius.pill, backgroundColor: withAlpha(colors.ink, 0.85), border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.4)}` }} />
    <div style={{ position: "absolute", left: w * 0.06, top: h + 46, width: 20, height: 20, borderRadius: radius.pill, backgroundColor: withAlpha(colors.ink, 0.85), border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.4)}` }} />
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Feuille, historique, recherche                                             */
/* -------------------------------------------------------------------------- */

/** Feuille de papier : `fill` (0 → 1) trace ses lignes d'écriture. */
export const Sheet: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly fill?: number;
  readonly lines?: number;
  readonly clip?: string;
}> = ({ w, h, fill = 1, lines = 5, clip }) => (
  <div
    style={{
      position: "relative",
      width: w,
      height: h,
      borderRadius: radius.md,
      backgroundColor: colors.inkInverse,
      boxShadow: `0 18px 44px ${withAlpha(colors.ink, 0.4)}`,
      padding: `${h * 0.12}px ${w * 0.1}px`,
      display: "flex",
      flexDirection: "column",
      gap: h * 0.08,
      clipPath: clip,
    }}
  >
    {Array.from({ length: lines }, (_, index) => {
      const progress = Math.max(0, Math.min(1, fill * (lines + 0.5) - index));

      return (
        <div key={index} style={{ width: `${100 - (index % 3) * 14}%`, height: h * 0.05, borderRadius: radius.pill, backgroundColor: withAlpha(colors.ink, 0.12), overflow: "hidden" }}>
          <div style={{ width: `${progress * 100}%`, height: "100%", backgroundColor: withAlpha(colors.secondary, 0.85) }} />
        </div>
      );
    })}
  </div>
);

/** Feuille déchirée en deux : `tear` (0 → 1) écarte les moitiés le long d'un bord en dents de scie. */
export const TornSheet: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly tear: number;
  readonly fill?: number;
}> = ({ w, h, tear, fill = 1 }) => {
  const steps = 9;
  const zig = Array.from({ length: steps }, (_, index) => `${index % 2 === 0 ? 47 : 53}% ${(index / (steps - 1)) * 100}%`);
  const left = `polygon(0 0, ${zig.join(", ")}, 0 100%)`;
  const right = `polygon(${zig.join(", ")}, 100% 100%, 100% 0)`;

  return (
    <div style={{ position: "relative", width: w, height: h }}>
      <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${-34 * tear}px, ${10 * tear}px) rotate(${-9 * tear}deg)`, transformOrigin: "20% 100%" }}>
        <Sheet w={w} h={h} fill={fill} clip={left} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${34 * tear}px, ${18 * tear}px) rotate(${12 * tear}deg)`, transformOrigin: "80% 100%" }}>
        <Sheet w={w} h={h} fill={fill} clip={right} />
      </div>
    </div>
  );
};

/** Petite horloge (une ligne d'historique) ; les aiguilles tournent avec `angle`. */
const MiniClock: React.FC<{ readonly size: number; readonly color: string; readonly angle?: number }> = ({ size, color, angle = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth={10} />
    <path d="M50 50 V24" stroke={color} strokeWidth={9} strokeLinecap="round" transform={`rotate(${angle} 50 50)`} />
    <path d="M50 50 L68 58" stroke={color} strokeWidth={9} strokeLinecap="round" />
  </svg>
);

/**
 * Liste d'activité (horloge + barre « fantôme » par ligne), dans une carte.
 * `lit` (0 → rows) allume les lignes une à une ; `eyes` donne les lignes sur
 * lesquelles un œil s'ouvre ; `empty` dessine des lignes vides en pointillés.
 */
export const ActivityRows: React.FC<{
  readonly w: number;
  readonly rows?: number;
  readonly lit?: number;
  readonly eyes?: readonly number[];
  readonly eyeOn?: number;
  readonly empty?: boolean;
}> = ({ w, rows = 4, lit = 0, eyes = [], eyeOn = 0, empty = false }) => {
  const rowH = 96;
  const bars = [0.72, 0.5, 0.64, 0.4, 0.58];

  return (
    <div
      style={{
        width: w,
        borderRadius: radius.lg,
        backgroundColor: withAlpha(colors.ink, 0.82),
        border: `${strokeWidths.thick}px solid ${lit > 0 && !empty ? colors.accent : withAlpha(colors.inkInverse, 0.28)}`,
        boxShadow: `0 16px 40px ${withAlpha(colors.ink, 0.4)}`,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {Array.from({ length: rows }, (_, index) => {
        const on = lit > index;

        return (
          <div
            key={index}
            style={{
              height: rowH - 16,
              display: "flex",
              alignItems: "center",
              gap: 22,
              borderRadius: radius.md,
              padding: "0 16px",
              border: empty ? `${strokeWidths.medium}px dashed ${withAlpha(colors.inkInverse, 0.3)}` : `${strokeWidths.medium}px solid transparent`,
              backgroundColor: on ? withAlpha(colors.accent, 0.16) : "transparent",
            }}
          >
            <MiniClock size={44} color={on ? colors.accent : withAlpha(colors.inkInverse, empty ? 0.3 : 0.6)} angle={index * 70} />
            {empty ? null : <Skeleton w={(w - 220) * bars[index % bars.length]} h={22} tone={on ? "accent" : "soft"} />}
            <div style={{ flex: 1 }} />
            {eyes.includes(index) ? (
              <div style={{ opacity: 0.2 + 0.8 * eyeOn }}>
                <EyeIcon size={84} hot={eyeOn > 0.5} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

/** Barre de recherche : loupe + barre fantôme qui se remplit (`typed` 0 → 1). */
export const SearchBar: React.FC<{ readonly w: number; readonly typed: number }> = ({ w, typed }) => (
  <div
    style={{
      width: w,
      height: 132,
      borderRadius: radius.pill,
      backgroundColor: withAlpha(colors.ink, 0.85),
      border: `${strokeWidths.thick}px solid ${typed > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.4)}`,
      boxShadow: `0 16px 40px ${withAlpha(colors.ink, 0.4)}`,
      display: "flex",
      alignItems: "center",
      gap: 28,
      padding: "0 38px",
    }}
  >
    <Loupe size={74} />
    <div style={{ flex: 1, height: 26, borderRadius: radius.pill, backgroundColor: withAlpha(colors.inkInverse, 0.18), overflow: "hidden" }}>
      <div style={{ width: `${Math.max(0, Math.min(1, typed)) * 100}%`, height: "100%", backgroundColor: withAlpha(colors.inkInverse, 0.75) }} />
    </div>
  </div>
);
