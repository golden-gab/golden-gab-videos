/**
 * Pastille d'étiquette. Promu depuis le montage mascotte (règle 46).
 */

import React from "react";

import { colors, radius, strokeWidths } from "../../../config";
import { withAlpha } from "../../../utils/color";
import { BrandText } from "../../common/BrandText";
import { Icon, type IconKind } from "./icons";
import { LibIcon } from "./LibIcon";

export const TagPill: React.FC<{
  readonly children: React.ReactNode;
  readonly tone?: "accent" | "light" | "ghost";
  readonly icon?: IconKind;
  readonly libIcon?: string;
  readonly style?: React.CSSProperties;
}> = ({ children, tone = "light", icon, libIcon, style }) => {
  const background =
    tone === "accent"
      ? colors.accent
      : tone === "light"
        ? colors.inkInverse
        : withAlpha(colors.inkInverse, 0.1);
  const foreground =
    tone === "accent"
      ? colors.inkInverse
      : tone === "light"
        ? colors.secondary
        : colors.inkInverse;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 30px",
        borderRadius: radius.pill,
        backgroundColor: background,
        border:
          tone === "ghost"
            ? `${strokeWidths.thin}px solid ${withAlpha(colors.inkInverse, 0.35)}`
            : undefined,
        boxShadow:
          tone === "ghost"
            ? undefined
            : `0 10px 30px ${withAlpha(colors.ink, 0.28)}`,
        ...style,
      }}
    >
      {icon ? <Icon kind={icon} size={40} color={foreground} /> : null}
      {libIcon ? <LibIcon id={libIcon} size={40} color={foreground} /> : null}
      <BrandText role="label" color={foreground} style={{ fontSize: 40 }}>
        {children}
      </BrandText>
    </div>
  );
};
