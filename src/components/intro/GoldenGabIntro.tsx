/**
 * `<GoldenGabIntro />` — ouverture réutilisable des vidéos Golden Gab.
 *
 * Poser ce composant dans une `<Sequence>` (ou à la racine d'une composition) :
 * il anime automatiquement son entrée, puis sa sortie à la fin de la séquence
 * qui le contient.
 *
 * Il ne contient aucun contenu de série : titre, sur-titre et sous-titre sont
 * passés en props.
 *
 * ```tsx
 * <Sequence durationInFrames={90} premountFor={fps}>
 *   <GoldenGabIntro eyebrow="Métiers de la tech" title="Data Analyst" />
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
import { colors } from "../../config/colors";
import { spacing } from "../../config/spacing";

export type GoldenGabIntroProps = {
  /** Titre principal de la vidéo. */
  readonly title: string;
  /** Sur-titre (série, numéro d'épisode, catégorie). */
  readonly eyebrow?: string;
  /** Sous-titre optionnel. */
  readonly subtitle?: string;
  /** Variante de fond. */
  readonly variant?: BrandBackgroundVariant;
  /** Affiche le motif en fond. */
  readonly motif?: boolean;
  /** Largeur du logo affiché. */
  readonly logoWidth?: number;
};

export const GoldenGabIntro: React.FC<GoldenGabIntroProps> = ({
  title,
  eyebrow,
  subtitle,
  // Le logo est bicolore (corail + bleu nuit) : il disparaîtrait sur un fond
  // bleu nuit. `light` est donc la variante par défaut des écrans à logo.
  variant = "light",
  motif = true,
  logoWidth = 420,
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
          <AnimatedAppear animation="pop" delaySeconds={0}>
            <GoldenGabLogo name="Intro logo" width={logoWidth} />
          </AnimatedAppear>

          {eyebrow ? (
            <AnimatedAppear animation="slide-up" delaySeconds={0.15}>
              <BrandText role="label" align="center" color={colors.accent}>
                {eyebrow}
              </BrandText>
            </AnimatedAppear>
          ) : null}

          <AnimatedAppear animation="slide-up" delaySeconds={0.3}>
            <BrandText role="h1" align="center" color={textColor}>
              {title}
            </BrandText>
          </AnimatedAppear>

          {subtitle ? (
            <AnimatedAppear animation="slide-up" delaySeconds={0.45}>
            <BrandText role="body" align="center" color={textColor}>
              {subtitle}
            </BrandText>
            </AnimatedAppear>
          ) : null}
        </div>
      </SafeArea>
    </AbsoluteFill>
  );
};
