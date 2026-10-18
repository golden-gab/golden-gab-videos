/**
 * `<LibIcon />` — icône du manifeste d'assets rendue inline, sans animation
 * propre ni limite de teinte : la couleur est passée en token (`colors`).
 *
 * Complète `LibraryIcon` (qui anime l'apparition et ne choisit que parmi les
 * accents Motion) pour les plans où l'icône doit être crème sur fond bleu nuit
 * et où l'apparition est gérée par l'appelant (`Appear`, `useWordClock`).
 */

import React from "react";

import { libraryIcon } from "../../../config";

export type LibIconProps = {
  readonly id: string;
  readonly size: number;
  /** Couleur (token de `colors`) ; hérite de `currentColor` si absente. */
  readonly color?: string;
  readonly style?: React.CSSProperties;
};

export const LibIcon: React.FC<LibIconProps> = ({
  id,
  size,
  color,
  style,
}) => {
  const icon = libraryIcon(id);

  return (
    <svg
      aria-hidden={true}
      viewBox={`0 0 ${icon.width} ${icon.height}`}
      width={size}
      height={size}
      style={{
        display: "block",
        flexShrink: 0,
        width: size,
        height: size,
        color,
        ...style,
      }}
    >
      <g dangerouslySetInnerHTML={{ __html: icon.body }} />
    </svg>
  );
};
