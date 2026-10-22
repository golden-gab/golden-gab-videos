/**
 * Aides communes aux plans de l'épisode « Navigation privée » : l'horloge des
 * mots, la fenêtre de navigateur (normale ou privée), les tuiles de sites et
 * un calque SVG pour tracer des flèches.
 */

import React from "react";

import { BrowserFrame, LibIcon, useWordClock } from "../../../../../components/motion";
import { colors, strokeWidths } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { Card, Forbidden } from "../../../../web-story/kit";
import { Incognito } from "../../../kit";
import { navigationPriveeTranscript } from "../data/transcript.ts";

export type BeatProps = { readonly scene: Scene };

export const useClock = (scene: Scene) => useWordClock(scene, navigationPriveeTranscript);

/**
 * Fenêtre de navigateur. `priv` = 1 : fenêtre sombre au masque de navigation
 * privée ; `lit` (0 → 1) allume le contour et le masque en corail.
 */
export const Win: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly priv?: boolean;
  readonly lit?: number;
}> = ({ w, h, priv = false, lit = 0 }) => (
  <BrowserFrame
    width={w}
    height={h}
    tone={priv ? "dark" : "light"}
    style={lit > 0.5 ? { border: `${strokeWidths.thick}px solid ${colors.accent}` } : undefined}
  >
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {priv ? <Incognito size={h * 0.42} lit={lit} /> : <LibIcon id="web-globe" size={h * 0.34} color={colors.secondary} />}
    </div>
  </BrowserFrame>
);

/** Tuile de site : carte carrée avec une icône de la bibliothèque. */
export const SiteTile: React.FC<{
  readonly size: number;
  readonly icon: string;
  readonly on?: number;
}> = ({ size, icon, on = 1 }) => (
  <Card w={size} h={size} active={on > 0.5} dim={0.55 + 0.45 * on}>
    <LibIcon id={icon} size={size * 0.5} color={on > 0.5 ? colors.accent : colors.inkInverse} />
  </Card>
);

/** Calque SVG plein cadre (pour tracer des flèches dans un `Art`). */
export const Overlay: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly children: React.ReactNode;
}> = ({ w, h, children }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
    {children}
  </svg>
);

/** Cercle barré qui se trace avec `progress` ; invisible tant que le mot n'est pas prononcé (évite le point de départ du trait). */
export const Veto: React.FC<{
  readonly size: number;
  readonly progress: number;
  readonly color?: string;
}> = ({ size, progress, color }) => (
  <div style={{ opacity: progress > 0.02 ? 1 : 0 }}>
    <Forbidden size={size} progress={progress} color={color} />
  </div>
);
