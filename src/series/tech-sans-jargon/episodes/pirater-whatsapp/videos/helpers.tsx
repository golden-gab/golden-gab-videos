/**
 * Aides communes aux plans de l'épisode « Pirater un compte WhatsApp » :
 * l'horloge des mots, un calque SVG pour les flèches et les fils, le pirate
 * (masque générique), un téléphone de discussion sans marque, une tuile
 * d'application et le cercle barré qui se trace avec le mot.
 */

import React from "react";

import { LibIcon, PhoneMock, abs, useWordClock } from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { BrandText } from "../../../../../components/common/BrandText";
import { Card, CrossMark, Forbidden, Skeleton } from "../../../../web-story/kit";
import { Avatar, Incognito } from "../../../kit";
import { piraterWhatsappTranscript } from "../data/transcript.ts";

export type BeatProps = { readonly scene: Scene };

export const useClock = (scene: Scene) => useWordClock(scene, piraterWhatsappTranscript);

/** Calque SVG plein cadre (flèches, fils, fissures) dans un `Art`. */
export const Overlay: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly children: React.ReactNode;
}> = ({ w, h, children }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
    {children}
  </svg>
);

/** Cercle barré qui se trace avec `progress` ; invisible tant que le mot n'est pas prononcé. */
export const Veto: React.FC<{
  readonly size: number;
  readonly progress: number;
  readonly color?: string;
}> = ({ size, progress, color }) => (
  <div style={{ opacity: progress > 0.02 ? 1 : 0 }}>
    <Forbidden size={size} progress={progress} color={color} />
  </div>
);

/** Le pirate : le masque générique, sur une carte sombre ; `on` (0 → 1) l'allume en corail. */
export const Pirate: React.FC<{ readonly size: number; readonly on?: number }> = ({ size, on = 0 }) => (
  <Card w={size} h={size} active={on > 0.5}>
    <Incognito size={size * 0.7} lit={on} />
  </Card>
);

/**
 * Téléphone de discussion (aucune marque) : en-tête avec avatar, deux bulles
 * fantômes. `mask` (0 → 1) remplace l'avatar par le masque du pirate ;
 * `hot` allume la bulle sortante en corail.
 */
export const ChatPhone: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly mask?: number;
  readonly hot?: boolean;
  readonly children?: React.ReactNode;
}> = ({ w, h, mask = 0, hot = false, children }) => (
  <PhoneMock width={w} height={h}>
    <div style={{ ...abs(0, 0, w, h), backgroundColor: colors.surfaceDark }}>
      <div style={{ ...abs(0, 56, w, 120), backgroundColor: withAlpha(colors.inkInverse, 0.1), display: "flex", alignItems: "center", gap: 22, padding: "0 28px" }}>
        <Avatar size={84} mask={mask} />
        <Skeleton w={w * 0.34} h={22} />
      </div>
      <div style={{ ...abs(28, 220, w * 0.58, 70), borderRadius: radius.lg, backgroundColor: withAlpha(colors.inkInverse, 0.18) }} />
      <div
        style={{
          ...abs(w * 0.34, 330, w * 0.56, 70),
          borderRadius: radius.lg,
          backgroundColor: hot ? colors.accent : withAlpha(colors.inkInverse, 0.34),
        }}
      />
      <div style={{ ...abs(28, 440, w * 0.5, 70), borderRadius: radius.lg, backgroundColor: withAlpha(colors.inkInverse, 0.18) }} />
      {children}
    </div>
  </PhoneMock>
);

/** Tuile d'application : carte carrée avec une icône de la bibliothèque. */
export const AppSquare: React.FC<{
  readonly size: number;
  readonly icon: string;
  readonly on?: boolean;
  readonly ghost?: boolean;
}> = ({ size, icon, on = false, ghost = false }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.lg,
      backgroundColor: ghost ? "transparent" : withAlpha(colors.ink, 0.85),
      border: `${strokeWidths.thick}px ${ghost ? "dashed" : "solid"} ${on ? colors.accent : withAlpha(colors.inkInverse, ghost ? 0.4 : 0.3)}`,
      boxShadow: ghost ? undefined : `0 14px 34px ${withAlpha(colors.ink, on ? 0.2 : 0.4)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <LibIcon id={icon} size={size * 0.5} color={on ? colors.accent : withAlpha(colors.inkInverse, ghost ? 0.45 : 1)} />
  </div>
);

/**
 * La liste des trois étapes (1, 2, 3) : une ligne par étape avec son numéro et
 * une barre fantôme. `done` (0 → 3) allume les lignes en corail ; `broken`
 * désigne la ligne qui s'effondre (croix + contour en pointillés).
 */
export const Checklist: React.FC<{
  readonly w: number;
  readonly done: number;
  readonly hot?: number;
  readonly broken?: number;
  readonly hotScale?: number;
}> = ({ w, done, hot = -1, broken = -1, hotScale = 1 }) => (
  <div
    style={{
      width: w,
      borderRadius: radius.lg,
      backgroundColor: withAlpha(colors.ink, 0.85),
      border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.3)}`,
      boxShadow: `0 16px 40px ${withAlpha(colors.ink, 0.4)}`,
      padding: 30,
      display: "flex",
      flexDirection: "column",
      gap: 26,
    }}
  >
    {[1, 2, 3].map((number, index) => {
      const on = done > index;
      const isBroken = broken === index;

      return (
        <div
          key={number}
          style={{
            height: 150,
            display: "flex",
            alignItems: "center",
            gap: 30,
            padding: "0 26px",
            borderRadius: radius.md,
            backgroundColor: on ? withAlpha(colors.accent, 0.16) : "transparent",
            border: `${strokeWidths.medium}px ${isBroken ? "dashed" : "solid"} ${on ? colors.accent : withAlpha(colors.inkInverse, 0.25)}`,
            transform: `scale(${hot === index ? hotScale : 1})`,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: radius.pill,
              backgroundColor: on ? colors.accent : withAlpha(colors.inkInverse, 0.2),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 66, lineHeight: 1 }}>
              {number}
            </BrandText>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
            <Skeleton w="92%" h={24} tone={on ? "accent" : "soft"} />
            <Skeleton w="62%" h={24} />
          </div>
          {isBroken ? <CrossMark size={86} color={colors.accent} /> : null}
        </div>
      );
    })}
  </div>
);
