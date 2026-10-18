/**
 * Briques visuelles de la série Web Story : peu de texte, de grandes formes,
 * tout est dessiné dans un repère de dessin (`w × h`) que `<Art />` fait tenir
 * dans la zone d'illustration.
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

import type { Scene } from "../../scenes/types";

import { BrandText } from "../../components/common/BrandText";
import {
  abs,
  getSceneLane,
  LibIcon,
  PhoneMock,
  Sparkle,
  ZoneStage,
  type ZoneLayout,
} from "../../components/motion";
import { colors, radius, strokeWidths } from "../../config";
import { withAlpha } from "../../utils/color";

/** Gros libellé : 2 à 3 mots maximum, jamais de phrase. */
export const Pill: React.FC<{
  readonly children: React.ReactNode;
  readonly tone?: "accent" | "light" | "dark" | "ghost";
  readonly size?: number;
  readonly style?: React.CSSProperties;
}> = ({ children, tone = "accent", size = 64, style }) => {
  const background =
    tone === "accent"
      ? colors.accent
      : tone === "light"
        ? colors.inkInverse
        : tone === "dark"
          ? withAlpha(colors.ink, 0.85)
          : withAlpha(colors.inkInverse, 0.1);
  const foreground = tone === "light" ? colors.secondary : colors.inkInverse;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: `${size * 0.22}px ${size * 0.6}px`,
        borderRadius: radius.pill,
        backgroundColor: background,
        border:
          tone === "ghost" || tone === "dark"
            ? `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.35)}`
            : undefined,
        boxShadow: `0 14px 36px ${withAlpha(colors.ink, 0.35)}`,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <BrandText role="label" color={foreground} style={{ fontSize: size, lineHeight: 1 }}>
        {children}
      </BrandText>
    </div>
  );
};

/** Carte : fond sombre, contour qui s'allume en corail quand elle est active. */
export const Card: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly active?: boolean;
  readonly dim?: number;
  readonly style?: React.CSSProperties;
  readonly children?: React.ReactNode;
}> = ({ w, h, active = false, dim = 1, style, children }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: radius.lg,
      backgroundColor: withAlpha(colors.ink, 0.82),
      border: `${strokeWidths.thick}px solid ${active ? colors.accent : withAlpha(colors.inkInverse, 0.28)}`,
      boxShadow: active
        ? `0 24px 60px ${withAlpha(colors.accent, 0.4)}`
        : `0 16px 40px ${withAlpha(colors.ink, 0.4)}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      opacity: dim,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Barre de texte « fantôme » : suggère du contenu sans écrire de texte. */
export const Skeleton: React.FC<{
  readonly w: number | string;
  readonly h?: number;
  readonly tone?: "soft" | "accent";
  readonly style?: React.CSSProperties;
}> = ({ w, h = 22, tone = "soft", style }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: radius.pill,
      backgroundColor:
        tone === "accent"
          ? withAlpha(colors.accent, 0.85)
          : withAlpha(colors.inkInverse, 0.22),
      ...style,
    }}
  />
);

/** Croissant de lune plein (SVG). */
export const Moon: React.FC<{ readonly size: number; readonly color?: string }> = ({
  size,
  color = colors.accent,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/** Étoiles déterministes qui scintillent dans un rectangle `w × h`. */
export const Stars: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly count?: number;
}> = ({ w, h, count = 9 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items: React.ReactNode[] = [];

  for (let index = 0; index < count; index += 1) {
    const x = ((index * 0.618 + 0.13) % 1) * w;
    const y = ((index * 0.382 + 0.07 * index) % 1) * h;
    const phase = ((frame / fps) * 0.9 + index * 0.37) % 1;
    items.push(
      <Sparkle
        key={index}
        x={x}
        y={y}
        size={26 + (index % 3) * 12}
        progress={phase}
        color={index % 2 === 0 ? colors.inkInverse : colors.accent}
      />,
    );
  }

  return <div style={abs(0, 0, w, h)}>{items}</div>;
};

/** « Z z z » qui montent : `seconds` = temps écoulé depuis leur déclenchement. */
export const Zzz: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly seconds: number;
  readonly size?: number;
}> = ({ x, y, seconds, size = 72 }) => {
  const items: React.ReactNode[] = [];

  for (let index = 0; index < 3; index += 1) {
    const t = Math.max(0, seconds - index * 0.3);
    const life = Math.min(1, t / 1.2);
    items.push(
      <div
        key={index}
        style={{
          position: "absolute",
          left: x + index * size * 0.55 + Math.sin(t * 3 + index) * 8,
          top: y - life * size * 1.4 - index * size * 0.5,
          opacity: life === 0 ? 0 : Math.min(1, life * 4) * (1 - life * 0.6),
        }}
      >
        <BrandText role="display" color={colors.accent} style={{ fontSize: size * (0.7 + index * 0.25), lineHeight: 1 }}>
          Z
        </BrandText>
      </div>,
    );
  }

  return <>{items}</>;
};

/** Cadenas dessiné : `open` 0 → 1 soulève l'anse. */
export const Padlock: React.FC<{
  readonly size: number;
  readonly open: number;
  readonly color?: string;
}> = ({ size, open, color = colors.accent }) => (
  <svg width={size} height={size} viewBox="-10 -40 140 190" aria-hidden="true">
    <path
      d="M34 62 V42 a26 26 0 0 1 52 0 V62"
      fill="none"
      stroke={color}
      strokeWidth={12}
      strokeLinecap="round"
      transform={`translate(${open * 0} ${-open * 22}) rotate(${-open * 28} 34 62)`}
    />
    <rect x="14" y="62" width="92" height="70" rx="16" fill={color} />
    <circle cx="60" cy="92" r="9" fill={colors.ink} />
    <rect x="56" y="96" width="8" height="20" rx="4" fill={colors.ink} />
  </svg>
);

/** Épingle de lieu dessinée. */
export const MapPin: React.FC<{ readonly size: number; readonly color?: string }> = ({
  size,
  color = colors.accent,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

/** Cercle barré « interdit » qui se dessine (`progress` 0 → 1). */
export const Forbidden: React.FC<{
  readonly size: number;
  readonly progress: number;
  readonly color?: string;
}> = ({ size, progress, color = colors.accent }) => {
  const circumference = 2 * Math.PI * 44;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke={color}
        strokeWidth={9}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - Math.min(1, progress * 1.4))}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <line
        x1="19"
        y1="19"
        x2={19 + 62 * Math.max(0, Math.min(1, (progress - 0.4) / 0.6))}
        y2={19 + 62 * Math.max(0, Math.min(1, (progress - 0.4) / 0.6))}
        stroke={color}
        strokeWidth={9}
        strokeLinecap="round"
      />
    </svg>
  );
};

/** Cloche dessinée qui se balance (`swing` en degrés). */
export const Bell: React.FC<{ readonly size: number; readonly swing: number }> = ({
  size,
  swing,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={colors.inkInverse}
    aria-hidden="true"
    style={{ transform: `rotate(${swing}deg)`, transformOrigin: "50% 8%" }}
  >
    <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5v.6A6.5 6.5 0 0 1 18.5 10.5v3.2l1.7 2.6a1 1 0 0 1-.85 1.55H4.65a1 1 0 0 1-.85-1.55l1.7-2.6v-3.2A6.5 6.5 0 0 1 10.5 4.1v-.6A1.5 1.5 0 0 1 12 2zm-2.2 17h4.4a2.2 2.2 0 0 1-4.4 0z" />
  </svg>
);

/** Coche dessinée (SVG), qui se trace avec `progress` 0 → 1. */
export const CheckMark: React.FC<{
  readonly size: number;
  readonly progress?: number;
  readonly color?: string;
}> = ({ size, progress = 1, color = colors.accent }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path
      d="M20 52 L42 74 L82 28"
      fill="none"
      stroke={color}
      strokeWidth={14}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - Math.min(1, Math.max(0, progress))}
    />
  </svg>
);

/** Croix dessinée (SVG). */
export const CrossMark: React.FC<{ readonly size: number; readonly color?: string }> = ({
  size,
  color = colors.inkInverse,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path
      d="M24 24 L76 76 M76 24 L24 76"
      fill="none"
      stroke={color}
      strokeWidth={14}
      strokeLinecap="round"
    />
  </svg>
);

/** Signe « différent de » dessiné (la police de marque n'a pas ce glyphe). */
export const NotEqual: React.FC<{ readonly size: number; readonly color?: string }> = ({
  size,
  color = colors.accent,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path
      d="M22 38 H78 M22 62 H78 M62 18 L38 82"
      fill="none"
      stroke={color}
      strokeWidth={10}
      strokeLinecap="round"
    />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Briques communes aux épisodes de la série                                  */
/* -------------------------------------------------------------------------- */

/** Plateau d'un plan : le gabarit de zones suit la position des captions. */
export const Shot: React.FC<{
  readonly scene: Scene;
  readonly layout: ZoneLayout;
  readonly children: React.ReactNode;
}> = ({ scene, layout, children }) => (
  <ZoneStage lane={getSceneLane(scene)} layout={layout}>
    {children}
  </ZoneStage>
);

/** Secondes écoulées depuis `startSeconds` (0 avant). */
export const useSince = (startSeconds: number): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return Math.max(0, frame / fps - startSeconds);
};

/** Engrenage dessiné (SVG) qui tourne avec `angle`. */
export const Gear: React.FC<{
  readonly size: number;
  readonly angle: number;
  readonly color?: string;
}> = ({ size, angle, color = colors.accent }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ transform: `rotate(${angle}deg)` }}>
    {[0, 45, 90, 135].map((deg) => (
      <rect key={deg} x="42" y="4" width="16" height="92" rx="6" fill={color} transform={`rotate(${deg} 50 50)`} />
    ))}
    <circle cx="50" cy="50" r="33" fill={color} />
    <circle cx="50" cy="50" r="14" fill={colors.ink} />
  </svg>
);

/** Flèche qui se trace de (x1, y1) vers (x2, y2) avec `progress` 0 → 1. */
export const Arrow: React.FC<{
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly progress: number;
  readonly color?: string;
}> = ({ x1, y1, x2, y2, progress, color = colors.accent }) => {
  const p = Math.max(0, Math.min(1, progress));
  const ex = x1 + (x2 - x1) * p;
  const ey = y1 + (y2 - y1) * p;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 34;
  const left = [ex - head * Math.cos(angle - 0.5), ey - head * Math.sin(angle - 0.5)];
  const right = [ex - head * Math.cos(angle + 0.5), ey - head * Math.sin(angle + 0.5)];

  return (
    <g opacity={p > 0 ? 1 : 0}>
      <line x1={x1} y1={y1} x2={ex} y2={ey} stroke={color} strokeWidth={12} strokeLinecap="round" />
      <path d={`M${left[0]} ${left[1]} L${ex} ${ey} L${right[0]} ${right[1]}`} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

/** Pastille ronde avec une icône : un acteur (utilisateur, système, visiteur). */
export const Bubble: React.FC<{
  readonly size: number;
  readonly children: React.ReactNode;
  readonly active?: boolean;
  readonly style?: React.CSSProperties;
}> = ({ size, children, active = true, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.pill,
      backgroundColor: active ? colors.accent : withAlpha(colors.ink, 0.85),
      border: `${strokeWidths.thick}px solid ${active ? withAlpha(colors.inkInverse, 0.5) : withAlpha(colors.inkInverse, 0.35)}`,
      boxShadow: `0 16px 40px ${withAlpha(colors.ink, 0.4)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Tuile d'application (icône + libellé court) pour l'écran d'accueil. */
export const AppTile: React.FC<{
  readonly icon: string;
  readonly label: string;
  readonly on: number;
}> = ({ icon, label, on }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: 0.25 + 0.75 * on, transform: `scale(${0.9 + 0.1 * on})` }}>
    <div
      style={{
        width: 150,
        height: 150,
        borderRadius: radius.lg,
        backgroundColor: on > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LibIcon id={icon} size={88} color={colors.inkInverse} />
    </div>
    <BrandText role="label" color={colors.inkInverse} style={{ fontSize: 34, lineHeight: 1 }}>
      {label}
    </BrandText>
  </div>
);

/** Écran d'accueil d'un téléphone avec ses tuiles. */
export const PhoneHome: React.FC<{
  readonly width: number;
  readonly height: number;
  readonly tiles: readonly { readonly icon: string; readonly label: string; readonly on: number }[];
  readonly children?: React.ReactNode;
}> = ({ width, height, tiles, children }) => (
  <PhoneMock width={width} height={height}>
    <div style={{ padding: 34, display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "center", alignContent: "flex-start", paddingTop: 70 }}>
      {tiles.map((tile) => (
        <AppTile key={tile.label} icon={tile.icon} label={tile.label} on={tile.on} />
      ))}
    </div>
    {children}
  </PhoneMock>
);

/** Carte d'un concept (SITE WEB / APPLICATION WEB) : titre + icône. */
export const ModeCard: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly label: string;
  readonly icon: string;
  readonly active?: boolean;
  readonly dim?: number;
  readonly style?: React.CSSProperties;
}> = ({ w, h, label, icon, active = false, dim = 1, style }) => (
  <Card w={w} h={h} active={active} dim={dim} style={style}>
    <LibIcon id={icon} size={Math.min(w, h) * 0.38} color={active ? colors.accent : colors.inkInverse} />
    <Pill size={Math.min(60, w / 7)} tone={active ? "accent" : "dark"}>
      {label}
    </Pill>
  </Card>
);

/** Ligne de page web : une barre de texte « fantôme ». */
export const Lines: React.FC<{ readonly fill: number; readonly count?: number; readonly w?: number }> = ({ fill, count = 3, w = 520 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
    {Array.from({ length: count }, (_, index) => (
      <div key={index} style={{ width: w * (1 - index * 0.14), height: 24, borderRadius: radius.pill, backgroundColor: withAlpha(colors.inkInverse, 0.18), overflow: "hidden" }}>
        <div style={{ width: `${Math.max(0, Math.min(1, fill * (count + 1) - index)) * 100}%`, height: "100%", backgroundColor: withAlpha(colors.inkInverse, 0.7) }} />
      </div>
    ))}
  </div>
);
