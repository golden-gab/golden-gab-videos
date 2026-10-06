/**
 * `<SafeArea />` — conteneur qui respecte les marges de sécurité TikTok.
 *
 * À utiliser pour tout contenu important (titres, textes, cards) afin qu'il
 * ne passe pas sous l'UI de l'application.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { safeArea, type SafeAreaInsets } from "../../config/video";

export type SafeAreaProps = {
  /** Surcharge ponctuelle de certaines marges, en pixels. */
  readonly inset?: Partial<SafeAreaInsets>;
  /** Alignement vertical du contenu. */
  readonly justify?: React.CSSProperties["justifyContent"];
  readonly style?: React.CSSProperties;
  readonly className?: string;
  readonly children: React.ReactNode;
};

export const SafeArea: React.FC<SafeAreaProps> = ({
  inset,
  justify = "center",
  style,
  className,
  children,
}) => {
  return (
    <AbsoluteFill
      className={className}
      style={{
        paddingTop: inset?.top ?? safeArea.top,
        paddingBottom: inset?.bottom ?? safeArea.bottom,
        paddingLeft: inset?.left ?? safeArea.left,
        paddingRight: inset?.right ?? safeArea.right,
        justifyContent: justify,
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
