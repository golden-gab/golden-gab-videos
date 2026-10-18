/**
 * Icônes à tracé simple (héritent de la couleur passée). Promu depuis le
 * montage mascotte Data Analyst (règle 46).
 */

import React from "react";

export type IconKind =
  | "box"
  | "bag"
  | "cup"
  | "shirt"
  | "headphones"
  | "tag"
  | "cart"
  | "shop"
  | "calendar"
  | "check"
  | "bulb"
  | "user";

const iconShapes: Record<IconKind, React.ReactNode> = {
  box: (
    <path d="M24 6 L40 14 V34 L24 42 L8 34 V14 Z M8 14 L24 22 L40 14 M24 22 V42" />
  ),
  bag: (
    <>
      <path d="M10 16 H38 L40 41 H8 Z" />
      <path d="M17 16 V13 a7 7 0 0 1 14 0 V16" />
    </>
  ),
  cup: (
    <>
      <path d="M10 16 H34 V30 a8 8 0 0 1 -8 8 H18 a8 8 0 0 1 -8 -8 Z" />
      <path d="M34 20 h3 a4.5 4.5 0 0 1 0 9 h-3" />
    </>
  ),
  shirt: (
    <path d="M17 8 L7 14 L11 23 L16 21 V40 H32 V21 L37 23 L41 14 L31 8 a7 5 0 0 1 -14 0 Z" />
  ),
  headphones: (
    <>
      <path d="M10 29 V24 a14 14 0 0 1 28 0 V29" />
      <path d="M8 29 h6 v11 h-6 Z M34 29 h6 v11 h-6 Z" />
    </>
  ),
  tag: (
    <>
      <path d="M8 8 H24 L41 25 L25 41 L8 24 Z" />
      <circle cx="16" cy="16" r="2.5" />
    </>
  ),
  cart: (
    <>
      <path d="M5 9 H11 L15 30 H37 L41 15 H12" />
      <circle cx="19" cy="38" r="3" />
      <circle cx="33" cy="38" r="3" />
    </>
  ),
  shop: (
    <>
      <path d="M8 21 L12 8 H36 L40 21 Z" />
      <path d="M10 21 V41 H38 V21 M20 41 V29 H28 V41" />
    </>
  ),
  calendar: (
    <>
      <path d="M8 12 H40 V41 H8 Z M8 21 H40" />
      <path d="M16 7 V15 M32 7 V15" />
    </>
  ),
  check: <path d="M9 25 L20 36 L39 13" />,
  bulb: (
    <>
      <path d="M24 5 a13 13 0 0 1 8 23 v6 H16 v-6 A13 13 0 0 1 24 5 Z" />
      <path d="M18 41 H30" />
    </>
  ),
  user: (
    <>
      <circle cx="24" cy="15" r="8" />
      <path d="M8 41 a16 14 0 0 1 32 0" />
    </>
  ),
};

export const Icon: React.FC<{
  readonly kind: IconKind;
  readonly size: number;
  readonly color: string;
  readonly strokeWidth?: number;
  readonly fill?: string;
  readonly style?: React.CSSProperties;
}> = ({ kind, size, color, strokeWidth = 3, fill = "none", style }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    fill={fill}
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={style}
  >
    {iconShapes[kind]}
  </svg>
);
