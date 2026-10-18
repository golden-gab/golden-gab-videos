/**
 * `<BrowserFrame />` — fenêtre de navigateur générique (barre de titre,
 * onglets optionnels, barre d'adresse, zone de contenu).
 *
 * Le contenu de la page est passé en `children` (composant composite, règle
 * 49) ; la fenêtre ne connaît aucune série et n'affiche jamais d'URL réelle :
 * `address` est un libellé générique choisi par l'appelant.
 *
 * ```tsx
 * <BrowserFrame width={820} height={560} address="nom-du-site" secure>
 *   …page…
 * </BrowserFrame>
 * ```
 */

import React from "react";

import { colors, radius, spacing, strokeWidths } from "../../config";
import { withAlpha } from "../../utils/color";
import { BrandText } from "../common/BrandText";
import { LibIcon } from "./stage/LibIcon";

export type BrowserFrameProps = {
  readonly width: number;
  readonly height: number;
  /** Texte de la barre d'adresse (générique : jamais une URL réelle). */
  readonly address?: string;
  /** Affiche un cadenas devant l'adresse. */
  readonly secure?: boolean;
  /** Libellés d'onglets ; le premier est actif. */
  readonly tabs?: readonly string[];
  /** Fond sombre (fenêtre « application ») ou clair (page de site). */
  readonly tone?: "light" | "dark";
  readonly style?: React.CSSProperties;
  readonly children?: React.ReactNode;
};

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  width,
  height,
  address,
  secure = false,
  tabs,
  tone = "light",
  style,
  children,
}) => {
  const dark = tone === "dark";
  const chrome = dark ? withAlpha(colors.inkInverse, 0.1) : colors.neutral;
  const pageBackground = dark ? colors.surfaceDark : colors.surfaceLight;
  const text = dark ? colors.inkInverse : colors.secondary;

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: radius.md,
        backgroundColor: pageBackground,
        border: `${strokeWidths.thin}px solid ${withAlpha(colors.inkInverse, dark ? 0.35 : 0)}`,
        boxShadow: `0 ${spacing.sm}px ${spacing.xl}px ${withAlpha(colors.ink, 0.35)}`,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing.sm,
          padding: `${spacing.sm}px ${spacing.md}px`,
          backgroundColor: chrome,
        }}
      >
        {[colors.accent, colors.secondary, colors.neutral].map((dot, index) => (
          <span
            key={index}
            style={{
              width: spacing.md,
              height: spacing.md,
              borderRadius: radius.pill,
              backgroundColor: dot,
            }}
          />
        ))}
        {tabs
          ? tabs.map((tab, index) => (
              <BrandText
                key={tab}
                role="label"
                color={text}
                style={{
                  padding: `${spacing.xs}px ${spacing.md}px`,
                  borderRadius: radius.sm,
                  backgroundColor: withAlpha(
                    dark ? colors.inkInverse : colors.surfaceLight,
                    index === 0 ? 0.9 : 0.25,
                  ),
                  color: index === 0 ? colors.secondary : text,
                }}
              >
                {tab}
              </BrandText>
            ))
          : null}
      </div>
      {address !== undefined ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
            margin: `${spacing.sm}px ${spacing.md}px`,
            padding: `${spacing.xs}px ${spacing.md}px`,
            borderRadius: radius.pill,
            backgroundColor: withAlpha(dark ? colors.inkInverse : colors.secondary, 0.1),
          }}
        >
          {secure ? <LibIcon id="web-lock" size={30} color={text} /> : null}
          <BrandText role="label" color={text}>
            {address}
          </BrandText>
        </div>
      ) : null}
      <div style={{ position: "relative", flex: 1 }}>{children}</div>
    </div>
  );
};
