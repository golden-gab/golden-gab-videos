/**
 * Briques de dessin de la série « Les métiers du web » : petits objets SVG
 * (puce, robot, visage, chat, chien, aimant…) et fiches de poste, dessinés
 * avec les tokens uniquement. Elles complètent le kit partagé de
 * `web-story/kit.tsx` (Pill, Card, Skeleton, Shot, Gear, Arrow…).
 *
 * Un composant utilisé dans un second épisode de la série sera promu dans
 * `src/components/motion` (règle 46).
 */

import React from "react";

import { BrandText } from "../../components/common/BrandText";
import { LibIcon } from "../../components/motion";
import { colors, radius, strokeWidths } from "../../config";
import { withAlpha } from "../../utils/color";
import { Skeleton } from "../web-story/kit";

/* -------------------------------------------------------------------------- */
/*  Fiche de poste                                                             */
/* -------------------------------------------------------------------------- */

/** Fiche de poste : pastille + blocs fantômes ; `hot` l'allume en corail. */
export const JobCard: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly hot?: boolean;
  readonly dim?: number;
  readonly style?: React.CSSProperties;
}> = ({ w, h, hot = false, dim = 1, style }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: radius.lg,
      backgroundColor: withAlpha(colors.ink, 0.82),
      border: `${strokeWidths.thick}px solid ${hot ? colors.accent : withAlpha(colors.inkInverse, 0.28)}`,
      boxShadow: hot ? `0 24px 60px ${withAlpha(colors.accent, 0.45)}` : `0 14px 36px ${withAlpha(colors.ink, 0.4)}`,
      display: "flex",
      alignItems: "center",
      gap: h * 0.2,
      padding: `0 ${h * 0.24}px`,
      opacity: dim,
      ...style,
    }}
  >
    <div
      style={{
        width: h * 0.52,
        height: h * 0.52,
        borderRadius: radius.pill,
        backgroundColor: hot ? colors.accent : withAlpha(colors.inkInverse, 0.3),
        flexShrink: 0,
      }}
    />
    <div style={{ display: "flex", flexDirection: "column", gap: h * 0.12, flex: 1 }}>
      <Skeleton w="82%" h={h * 0.14} tone={hot ? "accent" : "soft"} />
      <Skeleton w="56%" h={h * 0.11} />
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Objets SVG                                                                 */
/* -------------------------------------------------------------------------- */

/** Puce électronique : un carré à broches avec un point lumineux. */
export const Chip: React.FC<{ readonly size: number; readonly glow?: number }> = ({ size, glow = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    {[24, 40, 56, 72].map((p) => (
      <g key={p} stroke={colors.inkInverse} strokeWidth={6} strokeLinecap="round">
        <line x1={p} y1={6} x2={p} y2={22} />
        <line x1={p} y1={78} x2={p} y2={94} />
        <line x1={6} y1={p} x2={22} y2={p} />
        <line x1={78} y1={p} x2={94} y2={p} />
      </g>
    ))}
    <rect x="20" y="20" width="60" height="60" rx="12" fill={colors.ink} stroke={colors.inkInverse} strokeWidth={6} />
    <circle cx="50" cy="50" r={14 + glow * 4} fill={colors.accent} opacity={0.55 + 0.45 * glow} />
    <circle cx="50" cy="50" r="7" fill={colors.inkInverse} />
  </svg>
);

/** Robot-machine : tête carrée, un grand œil (`eye` 0 → 1 l'allume), antenne. */
export const Robot: React.FC<{ readonly size: number; readonly eye: number }> = ({ size, eye }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
    <line x1="60" y1="8" x2="60" y2="24" stroke={colors.inkInverse} strokeWidth={6} strokeLinecap="round" />
    <circle cx="60" cy="8" r="7" fill={colors.accent} />
    <rect x="18" y="24" width="84" height="64" rx="18" fill={colors.ink} stroke={colors.inkInverse} strokeWidth={6} />
    <circle cx="42" cy="54" r="12" fill={withAlpha(colors.inkInverse, 0.2)} />
    <circle cx="78" cy="54" r="12" fill={eye > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.2)} />
    <circle cx="78" cy="54" r={4 + eye * 4} fill={colors.inkInverse} />
    <circle cx="42" cy="54" r={4 + eye * 4} fill={colors.inkInverse} />
    <rect x="40" y="73" width="40" height="7" rx="3.5" fill={withAlpha(colors.inkInverse, 0.5)} />
    <rect x="30" y="92" width="60" height="18" rx="9" fill={withAlpha(colors.inkInverse, 0.25)} />
  </svg>
);

/** Visage simple (cercle, yeux, sourire). */
export const Face: React.FC<{ readonly size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="40" fill={colors.neutral} stroke={colors.inkInverse} strokeWidth={5} />
    <circle cx="36" cy="44" r="5.5" fill={colors.ink} />
    <circle cx="64" cy="44" r="5.5" fill={colors.ink} />
    <path d="M32 62 Q50 78 68 62" fill="none" stroke={colors.ink} strokeWidth={5} strokeLinecap="round" />
  </svg>
);

/** Cadre de détection : quatre coins qui se resserrent (`progress` 0 → 1). */
export const ScanFrame: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly progress: number;
}> = ({ w, h, progress }) => {
  const inset = (1 - progress) * 46;
  const L = 54;
  const x0 = -inset;
  const y0 = -inset;
  const x1 = w + inset;
  const y1 = h + inset;
  const corner = (cx: number, cy: number, dx: number, dy: number) =>
    `M${cx} ${cy + dy * L} L${cx} ${cy} L${cx + dx * L} ${cy}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible", position: "absolute", left: 0, top: 0 }} aria-hidden="true">
      <g fill="none" stroke={colors.accent} strokeWidth={strokeWidths.thick} strokeLinecap="round" strokeLinejoin="round">
        <path d={corner(x0, y0, 1, 1)} />
        <path d={corner(x1, y0, -1, 1)} />
        <path d={corner(x0, y1, 1, -1)} />
        <path d={corner(x1, y1, -1, -1)} />
      </g>
    </svg>
  );
};

/** Tête de chat (oreilles pointues, moustaches). */
export const Cat: React.FC<{ readonly size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M16 46 L18 14 L40 28 Z M84 46 L82 14 L60 28 Z" fill={colors.neutral} stroke={colors.inkInverse} strokeWidth={5} strokeLinejoin="round" />
    <circle cx="50" cy="56" r="34" fill={colors.neutral} stroke={colors.inkInverse} strokeWidth={5} />
    <circle cx="38" cy="52" r="5" fill={colors.ink} />
    <circle cx="62" cy="52" r="5" fill={colors.ink} />
    <path d="M45 62 L55 62 L50 69 Z" fill={colors.accent} />
    <path d="M26 64 L10 60 M26 70 L10 74 M74 64 L90 60 M74 70 L90 74" stroke={colors.inkInverse} strokeWidth={3.5} strokeLinecap="round" />
  </svg>
);

/** Tête de chien (oreilles tombantes, museau). */
export const Dog: React.FC<{ readonly size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <ellipse cx="20" cy="50" rx="13" ry="26" fill={colors.accent} stroke={colors.inkInverse} strokeWidth={5} />
    <ellipse cx="80" cy="50" rx="13" ry="26" fill={colors.accent} stroke={colors.inkInverse} strokeWidth={5} />
    <circle cx="50" cy="50" r="32" fill={colors.neutral} stroke={colors.inkInverse} strokeWidth={5} />
    <circle cx="39" cy="44" r="5" fill={colors.ink} />
    <circle cx="61" cy="44" r="5" fill={colors.ink} />
    <ellipse cx="50" cy="60" rx="13" ry="10" fill={colors.inkInverse} />
    <ellipse cx="50" cy="56" rx="5.5" ry="4" fill={colors.ink} />
    <path d="M50 60 V66 M44 68 Q50 72 56 68" fill="none" stroke={colors.ink} strokeWidth={3} strokeLinecap="round" />
  </svg>
);

/** Tuile photo : cadre + animal (ou rien) ; `on` 0 → 1 l'allume. */
export const PhotoTile: React.FC<{
  readonly size: number;
  readonly kind?: "cat" | "dog" | "none";
  readonly on: number;
  readonly hot?: boolean;
  readonly style?: React.CSSProperties;
}> = ({ size, kind = "none", on, hot = false, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.md,
      backgroundColor: withAlpha(colors.ink, 0.82),
      border: `${strokeWidths.medium}px solid ${hot ? colors.accent : withAlpha(colors.inkInverse, 0.3)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.25 + 0.75 * on,
      transform: `scale(${0.88 + 0.12 * on})`,
      boxShadow: hot ? `0 18px 44px ${withAlpha(colors.accent, 0.45)}` : undefined,
      ...style,
    }}
  >
    {kind === "cat" ? <Cat size={size * 0.74} /> : null}
    {kind === "dog" ? <Dog size={size * 0.74} /> : null}
    {kind === "none" ? (
      <div style={{ width: size * 0.5, height: size * 0.4, borderRadius: radius.sm, backgroundColor: withAlpha(colors.inkInverse, 0.22) }} />
    ) : null}
  </div>
);

/** Aimant en fer à cheval (rouge/crème), orienté vers le bas. */
export const Magnet: React.FC<{ readonly size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M22 18 V54 a28 28 0 0 0 56 0 V18" fill="none" stroke={colors.accent} strokeWidth={22} strokeLinecap="butt" />
    <rect x="11" y="10" width="22" height="22" fill={colors.inkInverse} />
    <rect x="67" y="10" width="22" height="22" fill={colors.inkInverse} />
  </svg>
);

/** Œil dessiné qui regarde vers `look` (-1 gauche, 1 droite). */
export const EyeShape: React.FC<{ readonly size: number; readonly look?: number }> = ({ size, look = 0 }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60" aria-hidden="true">
    <path d="M4 30 Q50 -10 96 30 Q50 70 4 30 Z" fill={colors.inkInverse} stroke={colors.ink} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={50 + look * 14} cy="30" r="15" fill={colors.accent} />
    <circle cx={50 + look * 14} cy="30" r="6" fill={colors.ink} />
  </svg>
);

/** Silhouette de personne : tête + buste, pastille allumée en corail. */
export const Person: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="32" r="17" fill={on ? colors.accent : colors.inkInverse} />
    <path d="M18 88 a32 28 0 0 1 64 0 Z" fill={on ? colors.accent : colors.inkInverse} />
  </svg>
);

/** Croix « santé » (plus arrondi). */
export const MedCross: React.FC<{ readonly size: number; readonly color?: string }> = ({ size, color = colors.inkInverse }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M38 12 H62 V38 H88 V62 H62 V88 H38 V62 H12 V38 H38 Z" fill={color} stroke={color} strokeWidth={6} strokeLinejoin="round" />
  </svg>
);

/** Bus vu de côté. */
export const Bus: React.FC<{ readonly size: number; readonly color?: string }> = ({ size, color = colors.inkInverse }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <rect x="10" y="20" width="80" height="52" rx="12" fill="none" stroke={color} strokeWidth={7} />
    <path d="M10 46 H90" stroke={color} strokeWidth={6} />
    <rect x="20" y="28" width="18" height="14" rx="3" fill={color} />
    <rect x="44" y="28" width="18" height="14" rx="3" fill={color} />
    <rect x="68" y="28" width="14" height="14" rx="3" fill={color} />
    <circle cx="30" cy="76" r="9" fill={colors.ink} stroke={color} strokeWidth={6} />
    <circle cx="70" cy="76" r="9" fill={colors.ink} stroke={color} strokeWidth={6} />
  </svg>
);

/** Panier (commerce). */
export const Basket: React.FC<{ readonly size: number; readonly color?: string }> = ({ size, color = colors.inkInverse }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M8 30 H20 L32 70 H78 L90 38 H24" fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="40" cy="84" r="6" fill={color} />
    <circle cx="70" cy="84" r="6" fill={color} />
  </svg>
);

/** Étiquette « AI » dans un cercle (moyeu du schéma). */
export const AiBadge: React.FC<{ readonly size: number; readonly active?: boolean }> = ({ size, active = true }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.pill,
      backgroundColor: active ? colors.accent : withAlpha(colors.ink, 0.85),
      border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.5)}`,
      boxShadow: `0 20px 50px ${withAlpha(colors.accent, 0.4)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <BrandText role="display" color={colors.inkInverse} style={{ fontSize: size * 0.46, lineHeight: 1 }}>
      AI
    </BrandText>
  </div>
);

/** Icône de la bibliothèque dans une tuile carrée (domaine, outil). */
export const IconTile: React.FC<{
  readonly size: number;
  readonly on: number;
  readonly children?: React.ReactNode;
  readonly icon?: string;
  readonly hot?: boolean;
}> = ({ size, on, children, icon, hot = false }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.lg,
      backgroundColor: on > 0.5 ? (hot ? colors.accent : withAlpha(colors.ink, 0.9)) : withAlpha(colors.ink, 0.7),
      border: `${strokeWidths.thick}px solid ${on > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.28)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.3 + 0.7 * on,
      transform: `scale(${0.9 + 0.1 * on})`,
      boxShadow: on > 0.5 ? `0 18px 44px ${withAlpha(colors.accent, 0.35)}` : undefined,
    }}
  >
    {icon ? <LibIcon id={icon} size={size * 0.5} color={colors.inkInverse} /> : children}
  </div>
);

/** Grand « ? » corail dans un disque. */
export const QuestionMark: React.FC<{ readonly size: number }> = ({ size }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.pill,
      backgroundColor: colors.accent,
      boxShadow: `0 20px 50px ${withAlpha(colors.accent, 0.5)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <BrandText role="display" color={colors.inkInverse} style={{ fontSize: size * 0.78, lineHeight: 1 }}>
      ?
    </BrandText>
  </div>
);

/**
 * Carte-métier « AI ENGINEER » : badge AI, libellé et blocs fantômes.
 * Revient dans plusieurs plans de l'épisode (présentation, rappel, final).
 */
export const RoleCard: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly active?: boolean;
  readonly style?: React.CSSProperties;
}> = ({ w, h, active = true, style }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: radius.lg,
      backgroundColor: withAlpha(colors.ink, 0.86),
      border: `${strokeWidths.thick}px solid ${active ? colors.accent : withAlpha(colors.inkInverse, 0.3)}`,
      boxShadow: active ? `0 28px 70px ${withAlpha(colors.accent, 0.4)}` : `0 16px 40px ${withAlpha(colors.ink, 0.4)}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: h * 0.06,
      ...style,
    }}
  >
    <AiBadge size={h * 0.42} />
    <div
      style={{
        padding: `${h * 0.03}px ${h * 0.1}px`,
        borderRadius: radius.pill,
        backgroundColor: colors.inkInverse,
      }}
    >
      <BrandText role="label" color={colors.secondary} style={{ fontSize: Math.min(h * 0.1, w * 0.075), lineHeight: 1.1, whiteSpace: "nowrap" }}>
        AI ENGINEER
      </BrandText>
    </div>
    <Skeleton w={w * 0.56} h={h * 0.04} />
    <Skeleton w={w * 0.38} h={h * 0.035} />
  </div>
);
