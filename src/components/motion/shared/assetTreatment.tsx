/**
 * Traitement DA Golden Gab appliqué aux assets externes (photos, b-roll).
 *
 * Une photo brute « jure » avec le bleu nuit de la marque : on la désature
 * (côté composant) puis on superpose deux voiles issus **uniquement** des
 * tokens (règle 47) — un multiplicative bleu nuit pour les ombres, un écran
 * corail pour les hautes lumières. Résultat : un duotone dans la palette.
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import { resolveMotionAccent, type MotionAccent } from "./tokens";

export type AssetTreatmentProps = {
  /** Teinte des ombres (token). `secondary` = bleu nuit. */
  readonly accent?: MotionAccent;
  /** Opacité du voile principal, 0 à 1. */
  readonly overlay?: number;
};

export const AssetTreatment: React.FC<AssetTreatmentProps> = ({
  accent = "secondary",
  overlay = 0.5,
}) => (
  <>
    <AbsoluteFill
      style={{
        backgroundColor: resolveMotionAccent(accent),
        opacity: overlay,
        mixBlendMode: "multiply",
      }}
    />
    <AbsoluteFill
      style={{
        backgroundColor: resolveMotionAccent("accent"),
        opacity: 0.16,
        mixBlendMode: "screen",
      }}
    />
  </>
);
