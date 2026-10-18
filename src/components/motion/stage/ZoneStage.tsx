/**
 * Plateau à zones : captions / mascotte / illustration sans chevauchement.
 *
 * Le plan déclare seulement son gabarit (`layout`) ; `ZoneStage` calcule les
 * rectangles (voir `zones.ts`) et les fournit à ses enfants :
 * - `<ZoneMascot />` place la mascotte dans son carré ;
 * - `<Art w h>` fait tenir une illustration de `w × h` dans sa zone.
 */

import React, { createContext, useContext } from "react";
import { AbsoluteFill } from "remotion";

import type { CaptionPosition } from "../../../captions/types";
import type { Scene } from "../../../scenes/types";
import type { MascotAttitude, MascotPose } from "../../mascot/types";
import { Appear } from "./Appear";
import { MascotShot } from "./MascotShot";
import {
  fitScale,
  getZones,
  type Rect,
  type ZoneLayout,
  type Zones,
} from "./zones";

const ZonesContext = createContext<Zones | null>(null);

const useZones = (): Zones => {
  const zones = useContext(ZonesContext);

  if (!zones) {
    throw new Error("<Art /> et <ZoneMascot /> vivent dans un <ZoneStage />.");
  }

  return zones;
};

export const ZoneStage: React.FC<{
  readonly lane: CaptionPosition;
  readonly layout: ZoneLayout;
  readonly children: React.ReactNode;
}> = ({ lane, layout, children }) => (
  <ZonesContext.Provider value={getZones(lane, layout)}>
    <AbsoluteFill>{children}</AbsoluteFill>
  </ZonesContext.Provider>
);

/** La mascotte, inscrite dans son carré. Une prise = une pose. */
export const ZoneMascot: React.FC<{
  readonly scene: Scene;
  readonly pose: MascotPose;
  readonly attitude?: MascotAttitude;
  readonly from?: number;
  readonly to?: number;
  readonly mirrored?: boolean;
  readonly halo?: "accent" | "soft" | "none";
  readonly delay?: number;
}> = ({ scene, pose, attitude, from, to, mirrored, halo, delay }) => {
  const { mascot } = useZones();

  if (!mascot) {
    return null;
  }

  return (
    <MascotShot
      scene={scene}
      pose={pose}
      attitude={attitude}
      from={from}
      to={to}
      mirrored={mirrored}
      halo={halo}
      delay={delay}
      rect={mascot}
    />
  );
};

/**
 * Illustration de `w × h` pixels (taille « de dessin »), centrée dans la zone
 * d'illustration et réduite si elle ne tient pas : elle ne déborde jamais.
 */
export const Art: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly enter?: "pop" | "slide-up" | "fade" | "none";
  readonly delay?: number;
  /** Agrandissement maximal quand la zone est plus grande que le dessin. */
  readonly maxScale?: number;
  readonly children: React.ReactNode;
}> = ({ w, h, enter = "pop", delay = 0, maxScale = 1.25, children }) => {
  const { art } = useZones();

  if (!art) {
    return null;
  }

  const scale = fitScale(art, w, h, maxScale);
  const rect: Rect = {
    x: art.x + (art.w - w) / 2,
    y: art.y + (art.h - h) / 2,
    w,
    h,
  };
  const content = (
    <div
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: w,
        height: h,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );

  if (enter === "none") {
    return content;
  }

  return (
    <Appear animation={enter} duration={0.3} delay={delay} style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
      {content}
    </Appear>
  );
};
