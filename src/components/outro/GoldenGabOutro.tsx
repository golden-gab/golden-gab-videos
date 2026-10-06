/**
 * `<GoldenGabOutro />` — conclusion réutilisable des vidéos Golden Gab.
 *
 * Affiche le logo, la baseline de la marque, le handle et un CTA.
 * Comme l'intro, aucune donnée de série n'est codée en dur : tout passe par
 * les props, avec des valeurs par défaut issues de `src/config/brand.ts`.
 *
 * ```tsx
 * <Sequence durationInFrames={120} premountFor={fps}>
 *   <GoldenGabOutro />
 * </Sequence>
 * ```
 */

import React from "react";
import { AbsoluteFill } from "remotion";

import {
  BrandBackground,
  type BrandBackgroundVariant,
} from "../brand/BrandBackground";
import { GoldenGabLogo } from "../brand/GoldenGabLogo";
import { AnimatedAppear } from "../common/AnimatedAppear";
import { BrandText } from "../common/BrandText";
import { SafeArea } from "../common/SafeArea";
import { brand } from "../../config/brand";
import { colors } from "../../config/colors";
import { radius, spacing } from "../../config/spacing";
import { withAlpha } from "../../utils/color";

export type GoldenGabOutroProps = {
  /** Appel à l'action affiché dans la pastille. */
  readonly cta?: string;
  /** Baseline de la marque. Passer `null` pour la masquer. */
  readonly tagline?: string | null;
  /** Handle social. Passer `null` pour le masquer. */
  readonly handle?: string | null;
  /** Variante de fond. */
  readonly variant?: BrandBackgroundVariant;
  /** Affiche le motif en fond. */
  readonly motif?: boolean;
  readonly logoWidth?: number;
};

export const GoldenGabOutro: React.FC<GoldenGabOutroProps> = ({
  cta = brand.defaultCta,
  tagline = brand.tagline,
  handle = brand.handle,
  // Même raison que l'intro : le logo bicolore a besoin d'un fond clair.
  variant = "light",
  motif = true,
  logoWidth = 460,
}) => {
  const textColor = variant === "light" ? colors.ink : colors.inkInverse;

  return (
    <AbsoluteFill>
      <BrandBackground variant={variant} motif={motif} motifOpacity={0.2} />
      <SafeArea>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.lg,
            width: "100%",
          }}
        >
          <AnimatedAppear animation="pop">
            <GoldenGabLogo name="Outro logo" width={logoWidth} />
          </AnimatedAppear>

          {tagline ? (
            <AnimatedAppear animation="slide-up" delaySeconds={0.2}>
              <BrandText role="h2" align="center" color={textColor}>
                {tagline}
              </BrandText>
            </AnimatedAppear>
          ) : null}

          <AnimatedAppear animation="slide-up" delaySeconds={0.35}>
            <div
              style={{
                backgroundColor: colors.accent,
                color: colors.surfaceLight,
                borderRadius: radius.pill,
                paddingLeft: spacing.lg,
                paddingRight: spacing.lg,
                paddingTop: spacing.sm,
                paddingBottom: spacing.sm,
              }}
            >
              <BrandText role="h3" align="center" color={colors.surfaceLight}>
                {cta}
              </BrandText>
            </div>
          </AnimatedAppear>

          {handle ? (
            <AnimatedAppear animation="fade" delaySeconds={0.5}>
              <div
                style={{
                  borderBottom: `6px solid ${withAlpha(colors.accent, 0.8)}`,
                  paddingBottom: spacing.xs,
                }}
              >
                <BrandText role="body" align="center" color={colors.accent}>
                  {handle}
                </BrandText>
              </div>
            </AnimatedAppear>
          ) : null}
        </div>
      </SafeArea>
    </AbsoluteFill>
  );
};
