/**
 * Aides communes aux plans de l'épisode « Design System ou System Design ? » :
 * l'horloge des mots et les dessins SVG de la maison (plan, pièces, cuisinière,
 * tuyau et fil électrique, décoration) et de l'application (téléphone, serveur,
 * base de données, foule, pages, boutons, règles). Tokens uniquement, aucune
 * marque, aucun texte lu à part les pastilles et « Aa ».
 *
 * Les petits outils génériques (`At`, `Overlay`, `Veto`, `Drop`, `Lightning`,
 * `EqualSign`) viennent de l'épisode « cache » : à promouvoir dans le kit de la
 * série si un troisième épisode les réutilise.
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

import { BrandText } from "../../../../../components/common/BrandText";
import { abs, useWordClock } from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { Skeleton } from "../../../../web-story/kit";
import { PersonIcon } from "../../../kit";
import { designSystemTranscript } from "../data/transcript.ts";

export {
  At,
  Drop,
  EqualSign,
  Lightning,
  Overlay,
  Veto,
} from "../../cache/videos/helpers";

export type BeatProps = { readonly scene: Scene };

export const useClock = (scene: Scene) => useWordClock(scene, designSystemTranscript);

/** Couleur « éteinte » (crème) ou « allumée » (corail). */
export const tone = (on: boolean | number): string => (on === true || (typeof on === "number" && on > 0.5) ? colors.accent : colors.inkInverse);

/** Secondes écoulées depuis le début du plan (mouvement continu déterministe). */
export const useSeconds = (): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return frame / fps;
};

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));

/** Trait qui se dessine avec `progress` (0 → 1). */
const Trace: React.FC<{
  readonly d: string;
  readonly progress: number;
  readonly color?: string;
  readonly width?: number;
  readonly dash?: string;
}> = ({ d, progress, color = colors.inkInverse, width = 5, dash }) => (
  <path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    pathLength={dash ? undefined : 1}
    strokeDasharray={dash ?? 1}
    strokeDashoffset={dash ? 0 : 1 - clamp01(progress)}
    opacity={progress > 0.01 ? 1 : 0}
  />
);

/* -------------------------------------------------------------------------- */
/*  La maison                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Maison (200 × 170) : `draw` trace le plan (toit, murs, porte, fenêtre),
 * `fill` la « habille » (toit corail, murs crème, porte, fenêtre), `on` allume le trait.
 */
export const House: React.FC<{
  readonly w: number;
  readonly draw?: number;
  readonly fill?: number;
  readonly on?: boolean;
}> = ({ w, draw = 1, fill = 0, on = false }) => {
  const stroke = on ? colors.accent : colors.inkInverse;
  const f = clamp01(fill);

  return (
    <svg width={w} height={w * 0.85} viewBox="0 0 200 170" aria-hidden="true">
      <g opacity={f}>
        <path d="M18 86 L100 20 L182 86 Z" fill={colors.accent} />
        <rect x="36" y="84" width="128" height="70" fill={colors.inkInverse} />
        <rect x="86" y="112" width="28" height="42" rx="4" fill={colors.secondary} />
        <rect x="46" y="100" width="28" height="26" rx="3" fill={colors.neutral} />
        <rect x="126" y="100" width="28" height="26" rx="3" fill={colors.neutral} />
        <circle cx="108" cy="134" r="2.6" fill={colors.accent} />
      </g>
      <g opacity={0.3 * (1 - clamp01(fill))}>
        <Trace d="M18 86 L100 20 L182 86 M36 80 V154 H164 V80 M86 154 V112 H114 V154 M46 100 H74 V126 H46 Z M126 100 H154 V126 H126 Z" progress={1} color={colors.inkInverse} dash="2 12" />
      </g>
      <Trace d="M18 86 L100 20 L182 86" progress={draw * 3} color={stroke} />
      <Trace d="M36 80 V154 H164 V80" progress={draw * 3 - 0.9} color={stroke} />
      <Trace d="M86 154 V112 H114 V154" progress={draw * 3 - 1.8} color={stroke} />
      <Trace d="M46 100 H74 V126 H46 Z M126 100 H154 V126 H126 Z" progress={draw * 3 - 2.2} color={stroke} />
    </svg>
  );
};

/** Carte « plan » : fond sombre quadrillé, comme une feuille d'architecte. */
export const BlueprintCard: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly active?: boolean;
  readonly children?: React.ReactNode;
}> = ({ w, h, active = false, children }) => (
  <div
    style={{
      position: "relative",
      width: w,
      height: h,
      borderRadius: radius.lg,
      backgroundColor: withAlpha(colors.ink, 0.82),
      border: `${strokeWidths.thick}px solid ${active ? colors.accent : withAlpha(colors.inkInverse, 0.3)}`,
      boxShadow: active ? `0 24px 60px ${withAlpha(colors.accent, 0.4)}` : `0 16px 40px ${withAlpha(colors.ink, 0.4)}`,
      overflow: "hidden",
    }}
  >
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ position: "absolute", left: 0, top: 0 }}>
      {Array.from({ length: Math.floor(w / 48) }, (_, index) => (
        <line key={`v${index}`} x1={(index + 1) * 48} y1={0} x2={(index + 1) * 48} y2={h} stroke={withAlpha(colors.inkInverse, 0.08)} strokeWidth={2} />
      ))}
      {Array.from({ length: Math.floor(h / 48) }, (_, index) => (
        <line key={`h${index}`} x1={0} y1={(index + 1) * 48} x2={w} y2={(index + 1) * 48} stroke={withAlpha(colors.inkInverse, 0.08)} strokeWidth={2} />
      ))}
    </svg>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
  </div>
);

/** Casserole sur un feu (la cuisine) : corps, couvercle, anses, vapeur ; `on` allume le feu. */
export const Stove: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M38 8 q-8 8 0 16 M54 8 q-8 8 0 16 M70 8 q-8 8 0 16" fill="none" stroke={tone(on)} strokeWidth={5} strokeLinecap="round" opacity={0.8} />
    <rect x="22" y="30" width="56" height="8" rx="4" fill={tone(on)} />
    <path d="M26 38 H74 L70 74 a6 6 0 0 1 -6 5 H36 a6 6 0 0 1 -6 -5 Z" fill={withAlpha(colors.ink, 0.9)} stroke={tone(on)} strokeWidth={6} strokeLinejoin="round" />
    <path d="M22 48 H8 M78 48 H92" stroke={tone(on)} strokeWidth={7} strokeLinecap="round" />
    <path d="M34 92 q4 -10 8 0 M46 92 q4 -12 8 0 M58 92 q4 -10 8 0" fill="none" stroke={on ? colors.accent : colors.inkInverse} strokeWidth={5} strokeLinecap="round" />
  </svg>
);

const ROOMS: readonly (readonly [number, number, number, number])[] = [
  [10, 10, 95, 100],
  [105, 10, 90, 100],
  [195, 10, 95, 100],
  [10, 110, 95, 100],
  [105, 110, 90, 100],
  [195, 110, 95, 100],
];

/**
 * Plan de la maison (300 × 220) : six pièces (`rooms` = nombre allumé),
 * un tuyau d'eau (`water`) et un fil électrique (`wire`) qui se tracent,
 * une cuisinière posée dans la pièce `stoveRoom` (−1 = absente).
 */
export const FloorPlan: React.FC<{
  readonly w: number;
  readonly rooms?: number;
  readonly walls?: number;
  readonly water?: number;
  readonly wire?: number;
  readonly stoveRoom?: number;
  readonly stoveOn?: boolean;
  readonly hotRoom?: number;
  readonly flow?: number;
}> = ({ w, rooms = 0, walls = 1, water = 0, wire = 0, stoveRoom = -1, stoveOn = false, hotRoom = -1, flow = 0 }) => {
  const stove = stoveRoom >= 0 ? ROOMS[Math.min(5, stoveRoom)] : null;
  const dot = (t: number, pts: readonly [number, number][]): [number, number] => {
    const seg = pts.length - 1;
    const scaled = ((t % 1) + 1) % 1 * seg;
    const index = Math.min(seg - 1, Math.floor(scaled));
    const local = scaled - index;

    return [pts[index][0] + (pts[index + 1][0] - pts[index][0]) * local, pts[index][1] + (pts[index + 1][1] - pts[index][1]) * local];
  };
  const waterPts: [number, number][] = [[30, 196], [150, 196], [150, 62], [262, 62]];
  const wirePts: [number, number][] = [[270, 196], [180, 196], [180, 30], [40, 30]];
  const [wx, wy] = dot(flow, waterPts);
  const [ex, ey] = dot(flow + 0.35, wirePts);

  return (
    <svg width={w} height={w * (220 / 300)} viewBox="0 0 300 220" aria-hidden="true" style={{ overflow: "visible" }}>
      {ROOMS.map(([x, y, rw, rh], index) => (
        <rect
          key={index}
          x={x}
          y={y}
          width={rw}
          height={rh}
          fill={index < rooms || index === hotRoom ? withAlpha(colors.accent, 0.38) : "none"}
          stroke={index < rooms || index === hotRoom ? colors.accent : withAlpha(colors.inkInverse, 0.85)}
          strokeWidth={5}
          strokeLinejoin="round"
          opacity={0.25 + 0.75 * clamp01(walls)}
        />
      ))}
      <Trace d="M30 196 H150 V62 H262" progress={water} color={colors.inkInverse} width={7} />
      <Trace d="M270 196 H180 V30 H40" progress={wire} color={colors.accent} width={7} />
      {water >= 1 && flow > 0 ? <circle cx={wx} cy={wy} r={9} fill={colors.inkInverse} /> : null}
      {wire >= 1 && flow > 0 ? <circle cx={ex} cy={ey} r={9} fill={colors.accent} /> : null}
      {stove ? (
        <g transform={`translate(${stove[0] + stove[2] / 2 - 26} ${stove[1] + stove[3] / 2 - 26})`}>
          <Stove size={52} on={stoveOn} />
        </g>
      ) : null}
    </svg>
  );
};

/** Pinceau : manche et poils ; `on` allume les poils en corail. */
export const Brush: React.FC<{ readonly size: number; readonly on?: boolean; readonly angle?: number }> = ({ size, on = true, angle = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ transform: `rotate(${angle}deg)` }}>
    <path d="M78 10 L90 22 L48 64 L36 52 Z" fill={colors.inkInverse} stroke={colors.ink} strokeWidth={3} strokeLinejoin="round" />
    <path d="M36 52 L48 64 C46 80 32 90 12 90 C16 78 18 62 36 52 Z" fill={on ? colors.accent : colors.neutral} stroke={colors.ink} strokeWidth={3} strokeLinejoin="round" />
  </svg>
);

/** Rangée de pastilles de couleur de la marque ; `lit` (0 → 5) en allume autant. */
export const Swatches: React.FC<{ readonly size: number; readonly lit?: number; readonly gap?: number }> = ({ size, lit = 5, gap = 14 }) => {
  const set = [colors.accent, colors.secondary, colors.inkInverse, colors.neutral, colors.surfaceLight];

  return (
    <div style={{ display: "flex", gap }}>
      {set.map((color, index) => (
        <div
          key={index}
          style={{
            width: size,
            height: size,
            borderRadius: radius.pill,
            backgroundColor: color,
            border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.55)}`,
            opacity: index < lit ? 1 : 0.28,
            transform: `scale(${index < lit ? 1 : 0.9})`,
          }}
        />
      ))}
    </div>
  );
};

/** Porte (110 × 190) : panneau, poignée ; `open` (0 → 1) l'ouvre sur un fond sombre. */
export const Door: React.FC<{
  readonly w: number;
  readonly color?: string;
  readonly open?: number;
}> = ({ w, color = colors.accent, open = 0 }) => {
  const o = clamp01(open);

  return (
    <svg width={w} height={w * 1.72} viewBox="0 0 110 190" aria-hidden="true">
      <rect x="6" y="6" width="98" height="178" rx="8" fill={withAlpha(colors.ink, 0.95)} stroke={colors.inkInverse} strokeWidth={5} />
      <g transform={`translate(6 6) scale(${1 - 0.62 * o} 1)`}>
        <rect x="0" y="0" width="98" height="178" rx="8" fill={color} />
        <rect x="14" y="16" width="70" height="62" rx="5" fill="none" stroke={withAlpha(colors.ink, 0.35)} strokeWidth={4} />
        <rect x="14" y="94" width="70" height="66" rx="5" fill="none" stroke={withAlpha(colors.ink, 0.35)} strokeWidth={4} />
        <circle cx="80" cy="92" r="6" fill={colors.inkInverse} />
      </g>
    </svg>
  );
};

/** Poignée ronde de porte sur sa plaque ; `shine` (0 → 1) fait briller. */
export const Knob: React.FC<{ readonly size: number; readonly shine?: number }> = ({ size, shine = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <rect x="30" y="4" width="40" height="92" rx="20" fill={withAlpha(colors.inkInverse, 0.2)} stroke={colors.inkInverse} strokeWidth={4} />
    <circle cx="50" cy="50" r="26" fill={colors.accent} stroke={colors.inkInverse} strokeWidth={5} />
    <circle cx="42" cy="42" r="7" fill={colors.inkInverse} opacity={0.35 + 0.65 * clamp01(shine)} />
  </svg>
);

/** Interrupteur mural et sa lampe : `on` (0 → 1) bascule la touche et allume l'ampoule. */
export const LightSwitch: React.FC<{ readonly size: number; readonly on?: number }> = ({ size, on = 0 }) => {
  const o = clamp01(on) > 0.5;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect x="30" y="34" width="40" height="62" rx="9" fill={colors.inkInverse} stroke={colors.ink} strokeWidth={3} />
      <rect x="40" y={o ? 42 : 62} width="20" height="22" rx="5" fill={o ? colors.accent : colors.secondary} />
      <circle cx="50" cy="16" r="12" fill={o ? colors.accent : "none"} stroke={o ? colors.accent : colors.inkInverse} strokeWidth={4} />
      {o ? (
        <g stroke={colors.accent} strokeWidth={4} strokeLinecap="round">
          <path d="M26 16 H20 M74 16 H80 M33 -1 L28 -6 M67 -1 L72 -6" />
        </g>
      ) : null}
    </svg>
  );
};

/** Trois matériaux : bois, brique, carreaux ; `lit` (0 → 3) en allume autant. */
export const Materials: React.FC<{ readonly size: number; readonly lit?: number }> = ({ size, lit = 3 }) => {
  const tile = (index: number, children: React.ReactNode): React.ReactNode => (
    <svg
      key={index}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{ opacity: index < lit ? 1 : 0.3, transform: `scale(${index < lit ? 1 : 0.92})` }}
    >
      <defs>
        <clipPath id={`mat-${index}`}>
          <rect x="4" y="4" width="92" height="92" rx="14" />
        </clipPath>
      </defs>
      <g clipPath={`url(#mat-${index})`}>{children}</g>
      <rect x="4" y="4" width="92" height="92" rx="14" fill="none" stroke={colors.inkInverse} strokeWidth={5} />
    </svg>
  );

  return (
    <div style={{ display: "flex", gap: size * 0.2 }}>
      {tile(
        0,
        <>
          <rect width="100" height="100" fill={colors.neutral} />
          {[18, 38, 58, 78].map((y) => (
            <path key={y} d={`M0 ${y} C30 ${y - 8} 60 ${y + 8} 100 ${y}`} fill="none" stroke={colors.accent} strokeWidth={5} />
          ))}
        </>,
      )}
      {tile(
        1,
        <>
          <rect width="100" height="100" fill={colors.accent} />
          {[0, 1, 2, 3].map((row) => (
            <g key={row}>
              <line x1="0" y1={row * 25 + 25} x2="100" y2={row * 25 + 25} stroke={colors.inkInverse} strokeWidth={4} />
              {[0, 1, 2].map((col) => (
                <line key={col} x1={col * 34 + (row % 2) * 17} y1={row * 25} x2={col * 34 + (row % 2) * 17} y2={row * 25 + 25} stroke={colors.inkInverse} strokeWidth={4} />
              ))}
            </g>
          ))}
        </>,
      )}
      {tile(
        2,
        <>
          <rect width="100" height="100" fill={colors.inkInverse} />
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <rect key={`${row}${col}`} x={col * 34 + 2} y={row * 34 + 2} width="30" height="30" rx="4" fill={(row + col) % 2 === 0 ? colors.secondary : colors.neutral} />
            )),
          )}
        </>,
      )}
    </div>
  );
};

/** Petite pièce (160 × 120) : mur, sol, fenêtre, porte, lampe, tous dans le même style. */
export const MiniRoom: React.FC<{ readonly w: number; readonly on?: boolean }> = ({ w, on = false }) => (
  <svg width={w} height={w * 0.75} viewBox="0 0 160 120" aria-hidden="true">
    <rect x="4" y="4" width="152" height="112" rx="12" fill={withAlpha(colors.neutral, 0.9)} stroke={on ? colors.accent : colors.inkInverse} strokeWidth={5} />
    <rect x="4" y="84" width="152" height="32" fill={colors.secondary} opacity={0.9} />
    <rect x="20" y="22" width="40" height="34" rx="4" fill={colors.inkInverse} stroke={colors.secondary} strokeWidth={4} />
    <path d="M40 22 V56 M20 39 H60" stroke={colors.secondary} strokeWidth={3} />
    <rect x="104" y="40" width="34" height="62" rx="5" fill={colors.accent} />
    <circle cx="132" cy="72" r="3" fill={colors.inkInverse} />
    <path d="M80 4 V20" stroke={colors.ink} strokeWidth={3} />
    <circle cx="80" cy="26" r="8" fill={colors.accent} />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  L'application : téléphone, serveur, base de données, foule                  */
/* -------------------------------------------------------------------------- */

/** Téléphone générique (aucune marque) ; `on` allume l'écran. */
export const PhoneNode: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on = false }) => (
  <svg width={size * 0.62} height={size} viewBox="0 0 62 100" aria-hidden="true">
    <rect x="4" y="3" width="54" height="94" rx="12" fill={withAlpha(colors.ink, 0.9)} stroke={tone(on)} strokeWidth={5} />
    <rect x="11" y="14" width="40" height="66" rx="5" fill={on ? withAlpha(colors.accent, 0.35) : withAlpha(colors.inkInverse, 0.14)} />
    <rect x="16" y="22" width="30" height="8" rx="4" fill={tone(on)} opacity={0.9} />
    <rect x="16" y="38" width="22" height="6" rx="3" fill={tone(on)} opacity={0.6} />
    <rect x="16" y="50" width="26" height="6" rx="3" fill={tone(on)} opacity={0.6} />
    <circle cx="31" cy="88" r="3" fill={tone(on)} />
  </svg>
);

/** Serveur : trois étages à voyants. */
export const ServerNode: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    {[8, 36, 64].map((y) => (
      <g key={y}>
        <rect x="8" y={y} width="84" height="26" rx="8" fill={withAlpha(colors.ink, 0.9)} stroke={tone(on)} strokeWidth={5} />
        <circle cx="24" cy={y + 13} r="4" fill={tone(on)} />
        <rect x="40" y={y + 10} width="40" height="6" rx="3" fill={tone(on)} opacity={0.6} />
      </g>
    ))}
  </svg>
);

/** Base de données : cylindre. */
export const DbNode: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M14 22 V78 C14 92 86 92 86 78 V22" fill={withAlpha(colors.ink, 0.9)} stroke={tone(on)} strokeWidth={5} />
    <ellipse cx="50" cy="22" rx="36" ry="12" fill={withAlpha(colors.ink, 0.9)} stroke={tone(on)} strokeWidth={5} />
    <path d="M14 50 C14 64 86 64 86 50" fill="none" stroke={tone(on)} strokeWidth={5} opacity={0.7} />
  </svg>
);

/**
 * Les parties d'une application (téléphone, serveur, base) reliées par des
 * fils où circulent des paquets (`flow`, secondes ; 0 = pas de paquets).
 * `lit` (0 → 3) allume les parties une à une.
 */
export const SysMap: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly lit?: number;
  readonly flow?: number;
  readonly ok?: number;
}> = ({ w, h, lit = 3, flow = 0, ok = 0 }) => {
  const nodeSize = Math.min(w * 0.22, h * 0.7);
  const xs = [w * 0.14, w * 0.5, w * 0.86];
  const cy = h * 0.5;
  const packet = (offset: number, from: number, to: number): React.ReactNode => {
    const t = (((flow * 0.8 + offset) % 1) + 1) % 1;
    const x = xs[from] + (xs[to] - xs[from]) * t;

    return <circle key={`${from}-${to}-${offset}`} cx={x} cy={cy} r={13} fill={colors.accent} opacity={flow > 0 ? 1 : 0} />;
  };

  return (
    <div style={{ position: "relative", width: w, height: h }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ position: "absolute", left: 0, top: 0 }}>
        <line x1={xs[0] + nodeSize * 0.4} y1={cy} x2={xs[1] - nodeSize * 0.5} y2={cy} stroke={withAlpha(colors.inkInverse, 0.7)} strokeWidth={6} strokeDasharray="4 14" strokeLinecap="round" />
        <line x1={xs[1] + nodeSize * 0.5} y1={cy} x2={xs[2] - nodeSize * 0.5} y2={cy} stroke={withAlpha(colors.inkInverse, 0.7)} strokeWidth={6} strokeDasharray="4 14" strokeLinecap="round" />
        {packet(0, 0, 1)}
        {packet(0.5, 1, 0)}
        {packet(0.25, 1, 2)}
        {packet(0.75, 2, 1)}
        {ok > 0 ? (
          <path d={`M${w * 0.44} ${cy - nodeSize * 0.8} l22 22 l48 -52`} fill="none" stroke={colors.accent} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - clamp01(ok)} />
        ) : null}
      </svg>
      <div style={abs(xs[0] - nodeSize * 0.31, cy - nodeSize / 2, nodeSize * 0.62, nodeSize)}>
        <PhoneNode size={nodeSize} on={lit > 0.5} />
      </div>
      <div style={abs(xs[1] - nodeSize / 2, cy - nodeSize / 2, nodeSize, nodeSize)}>
        <ServerNode size={nodeSize} on={lit > 1.5} />
      </div>
      <div style={abs(xs[2] - nodeSize / 2, cy - nodeSize / 2, nodeSize, nodeSize)}>
        <DbNode size={nodeSize} on={lit > 2.5} />
      </div>
    </div>
  );
};

/** Foule : `cols × rows` silhouettes ; la fraction `lit` (0 → 1) est allumée. */
export const Crowd: React.FC<{
  readonly cols: number;
  readonly rows: number;
  readonly size: number;
  readonly lit?: number;
}> = ({ cols, rows, size, lit = 1 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${size}px)`, gap: size * 0.1 }}>
    {Array.from({ length: cols * rows }, (_, index) => (
      <PersonIcon key={index} size={size} on={index / (cols * rows) < lit} opacity={index / (cols * rows) < lit ? 1 : 0.5} />
    ))}
  </div>
);

/** Ordinateur d'un développeur : écran de lignes de code fantômes. */
export const CodeScreen: React.FC<{ readonly w: number; readonly on?: boolean }> = ({ w, on = false }) => (
  <div style={{ width: w }}>
    <div
      style={{
        width: w,
        height: w * 0.62,
        borderRadius: radius.md,
        backgroundColor: withAlpha(colors.ink, 0.92),
        border: `${strokeWidths.thick}px solid ${tone(on)}`,
        padding: w * 0.07,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: w * 0.05,
      }}
    >
      <Skeleton w="48%" h={w * 0.055} tone={on ? "accent" : "soft"} />
      <Skeleton w="76%" h={w * 0.055} style={{ marginLeft: w * 0.08 }} />
      <Skeleton w="62%" h={w * 0.055} style={{ marginLeft: w * 0.08 }} />
      <Skeleton w="38%" h={w * 0.055} tone={on ? "accent" : "soft"} />
    </div>
    <div style={{ width: w * 1.14, height: w * 0.06, marginLeft: -w * 0.07, borderRadius: radius.pill, backgroundColor: tone(on), opacity: 0.8 }} />
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Le design system : pages, boutons, polices, espacements, règles             */
/* -------------------------------------------------------------------------- */

/** Bouton arrondi fantôme ; `hot` le passe en corail. */
export const UiButton: React.FC<{ readonly w: number; readonly h?: number; readonly hot?: boolean; readonly press?: number }> = ({ w, h = w * 0.34, hot = false, press = 0 }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: radius.pill,
      backgroundColor: hot ? colors.accent : withAlpha(colors.inkInverse, 0.22),
      border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, hot ? 0.5 : 0.4)}`,
      boxShadow: hot ? `0 ${12 - press * 8}px 30px ${withAlpha(colors.accent, 0.4)}` : undefined,
      transform: `scale(${1 - 0.06 * press})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Skeleton w="46%" h={Math.max(10, h * 0.2)} style={{ backgroundColor: withAlpha(colors.inkInverse, 0.85) }} />
  </div>
);

/** Page d'application : en-tête, titre, bouton et deux cartes — toujours le même style. */
export const UiPage: React.FC<{
  readonly w: number;
  readonly on?: boolean;
  readonly variant?: 0 | 1 | 2;
}> = ({ w, on = false, variant = 0 }) => {
  const h = w * 1.5;

  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: radius.lg,
        backgroundColor: withAlpha(colors.ink, 0.88),
        border: `${strokeWidths.thick}px solid ${on ? colors.accent : withAlpha(colors.inkInverse, 0.3)}`,
        boxShadow: on ? `0 20px 50px ${withAlpha(colors.accent, 0.4)}` : `0 14px 36px ${withAlpha(colors.ink, 0.4)}`,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div style={{ height: h * 0.1, backgroundColor: colors.accent }} />
      <div style={{ padding: w * 0.09, display: "flex", flexDirection: "column", gap: w * 0.07 }}>
        <Skeleton w="62%" h={w * 0.07} style={{ backgroundColor: withAlpha(colors.inkInverse, 0.85) }} />
        {variant === 1 ? (
          <div style={{ display: "flex", gap: w * 0.06 }}>
            <div style={{ flex: 1, height: w * 0.4, borderRadius: radius.md, backgroundColor: withAlpha(colors.inkInverse, 0.2) }} />
            <div style={{ flex: 1, height: w * 0.4, borderRadius: radius.md, backgroundColor: withAlpha(colors.inkInverse, 0.2) }} />
          </div>
        ) : (
          <>
            <Skeleton w="90%" h={w * 0.05} />
            <Skeleton w="70%" h={w * 0.05} />
          </>
        )}
        <UiButton w={w * 0.5} hot />
        <div style={{ height: w * (variant === 2 ? 0.32 : 0.22), borderRadius: radius.md, backgroundColor: withAlpha(colors.inkInverse, 0.2) }} />
      </div>
    </div>
  );
};

/** Échantillon de police : « Aa » (deux lettres, pas une phrase). */
export const FontSample: React.FC<{ readonly size: number; readonly on?: boolean }> = ({ size, on = false }) => (
  <BrandText role="display" color={tone(on)} style={{ fontSize: size, lineHeight: 1, textTransform: "none" }}>
    Aa
  </BrandText>
);

/** Deux blocs et l'espace entre eux (flèches) ; `gap` (px) règle l'espace. */
export const SpacingArt: React.FC<{ readonly w: number; readonly h: number; readonly gap: number; readonly on?: boolean }> = ({ w, h, gap, on = false }) => {
  const bw = (w - gap) / 2;
  const cy = h / 2;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <rect x={0} y={10} width={bw} height={h - 20} rx={18} fill={withAlpha(colors.inkInverse, 0.25)} stroke={colors.inkInverse} strokeWidth={5} />
      <rect x={bw + gap} y={10} width={bw} height={h - 20} rx={18} fill={withAlpha(colors.inkInverse, 0.25)} stroke={colors.inkInverse} strokeWidth={5} />
      {gap > 40 ? (
        <g stroke={tone(on)} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d={`M${bw + 12} ${cy} H${bw + gap - 12}`} />
          <path d={`M${bw + 28} ${cy - 16} L${bw + 12} ${cy} L${bw + 28} ${cy + 16}`} />
          <path d={`M${bw + gap - 28} ${cy - 16} L${bw + gap - 12} ${cy} L${bw + gap - 28} ${cy + 16}`} />
        </g>
      ) : null}
    </svg>
  );
};

/** Carnet de règles : `rows` lignes ; `done` (0 → rows) en coche autant. */
export const RuleList: React.FC<{ readonly w: number; readonly rows: number; readonly done: number }> = ({ w, rows, done }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: w * 0.07, width: w }}>
    {Array.from({ length: rows }, (_, index) => {
      const ok = index < done;

      return (
        <div key={index} style={{ display: "flex", alignItems: "center", gap: w * 0.06 }}>
          <div
            style={{
              width: w * 0.14,
              height: w * 0.14,
              borderRadius: radius.pill,
              backgroundColor: ok ? colors.accent : withAlpha(colors.inkInverse, 0.15),
              border: `${strokeWidths.medium}px solid ${ok ? colors.accent : withAlpha(colors.inkInverse, 0.4)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {ok ? (
              <svg width={w * 0.09} height={w * 0.09} viewBox="0 0 100 100" aria-hidden="true">
                <path d="M20 52 L42 74 L82 28" fill="none" stroke={colors.inkInverse} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </div>
          <Skeleton w={w * (0.74 - index * 0.1)} h={w * 0.07} style={{ backgroundColor: withAlpha(colors.inkInverse, ok ? 0.7 : 0.25) }} />
        </div>
      );
    })}
  </div>
);

/** Briques d'interface qui s'empilent : bouton, carte, champ, pastille (`count` de 0 à 4). */
export const UiBricks: React.FC<{ readonly w: number; readonly count: number }> = ({ w, count }) => {
  const bricks: readonly React.ReactNode[] = [
    <div key="b" style={{ width: w * 0.9, height: w * 0.16, borderRadius: radius.md, backgroundColor: withAlpha(colors.inkInverse, 0.25), border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.5)}` }} />,
    <div key="c" style={{ width: w * 0.9, height: w * 0.26, borderRadius: radius.md, backgroundColor: withAlpha(colors.accent, 0.3), border: `${strokeWidths.medium}px solid ${colors.accent}` }} />,
    <UiButton key="u" w={w * 0.6} hot />,
    <div key="d" style={{ display: "flex", gap: w * 0.08 }}>
      <div style={{ width: w * 0.16, height: w * 0.16, borderRadius: radius.pill, backgroundColor: colors.accent }} />
      <Skeleton w={w * 0.5} h={w * 0.07} style={{ marginTop: w * 0.045 }} />
    </div>,
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column-reverse", alignItems: "center", gap: w * 0.06, width: w }}>
      {bricks.map((brick, index) => (
        <div key={index} style={{ opacity: index < count ? 1 : 0.28, transform: `scale(${index < count ? 1 : 0.94})` }}>
          {brick}
        </div>
      ))}
    </div>
  );
};

/** Carte-choix (une icône dans un cadre) ; `on` l'allume. */
export const IconCard: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly on?: boolean;
  readonly dim?: number;
  readonly children: React.ReactNode;
}> = ({ w, h, on = false, dim = 1, children }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: radius.lg,
      backgroundColor: withAlpha(colors.ink, 0.82),
      border: `${strokeWidths.thick}px solid ${on ? colors.accent : withAlpha(colors.inkInverse, 0.28)}`,
      boxShadow: on ? `0 24px 60px ${withAlpha(colors.accent, 0.4)}` : `0 16px 40px ${withAlpha(colors.ink, 0.4)}`,
      opacity: dim,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);
