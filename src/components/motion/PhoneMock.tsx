/**
 * `<PhoneMock />` — téléphone générique (cadre, encoche, écran).
 *
 * L'écran reçoit son contenu en `children` ; le cadre ne connaît aucune
 * série. Les dimensions sont celles de l'ensemble (cadre compris).
 */

import React from "react";

import { colors, radius, spacing, strokeWidths } from "../../config";
import { withAlpha } from "../../utils/color";

export type PhoneMockProps = {
  readonly width: number;
  readonly height: number;
  readonly style?: React.CSSProperties;
  readonly children?: React.ReactNode;
};

export const PhoneMock: React.FC<PhoneMockProps> = ({
  width,
  height,
  style,
  children,
}) => (
  <div
    style={{
      width,
      height,
      padding: spacing.sm,
      borderRadius: radius.xl,
      backgroundColor: colors.ink,
      border: `${strokeWidths.thin}px solid ${withAlpha(colors.inkInverse, 0.35)}`,
      boxShadow: `0 ${spacing.md}px ${spacing.xl}px ${withAlpha(colors.ink, 0.4)}`,
      ...style,
    }}
  >
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: radius.lg,
        backgroundColor: colors.secondary,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: spacing.sm,
          left: "50%",
          width: width * 0.26,
          height: spacing.md,
          marginLeft: -width * 0.13,
          borderRadius: radius.pill,
          backgroundColor: colors.ink,
        }}
      />
      {children}
    </div>
  </div>
);
