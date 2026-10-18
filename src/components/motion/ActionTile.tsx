/**
 * `<ActionTile />` — une action que l'utilisateur effectue (envoyer un
 * message, publier, acheter…) : pastille ronde + libellé.
 *
 * Donnée en entrée (`icon` = id du manifeste d'assets, `label`) ; l'apparition
 * est gérée par l'appelant. `active` renverse les couleurs (action en cours).
 */

import React from "react";

import { colors, radius, spacing, strokeWidths } from "../../config";
import { withAlpha } from "../../utils/color";
import { BrandText } from "../common/BrandText";
import { LibIcon } from "./stage/LibIcon";

export type ActionTileProps = {
  /** Id d'une icône du manifeste d'assets (ex. `web-mail`). */
  readonly icon: string;
  readonly label: string;
  readonly width?: number;
  readonly active?: boolean;
  readonly style?: React.CSSProperties;
};

export const ActionTile: React.FC<ActionTileProps> = ({
  icon,
  label,
  width = 280,
  active = false,
  style,
}) => (
  <div
    style={{
      width,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: spacing.sm,
      padding: `${spacing.md}px ${spacing.sm}px`,
      borderRadius: radius.lg,
      backgroundColor: active ? colors.accent : colors.surfaceLight,
      border: `${strokeWidths.thin}px solid ${active ? colors.inkInverse : withAlpha(colors.secondary, 0.12)}`,
      boxShadow: `0 ${spacing.xs}px ${spacing.lg}px ${withAlpha(colors.ink, 0.25)}`,
      ...style,
    }}
  >
    <LibIcon
      id={icon}
      size={width * 0.36}
      color={active ? colors.inkInverse : colors.accent}
    />
    <BrandText
      role="label"
      align="center"
      color={active ? colors.inkInverse : colors.secondary}
    >
      {label}
    </BrandText>
  </div>
);
