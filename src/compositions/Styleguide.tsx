/**
 * Composition `GoldenGab / Styleguide`.
 *
 * Outil de QA **et documentation vivante** de la direction artistique :
 * palette, typographies, logo, motif, styles de captions, intro et outro.
 *
 * Ce n'est pas un contenu de marque : elle n'est jamais montée dans une
 * série. Elle sert à vérifier que le socle visuel fonctionne après chaque
 * modification de `src/config` ou de `src/components`.
 */

import React from "react";
import { AbsoluteFill, Composition, Series, useVideoConfig } from "remotion";

import { Captions, type CaptionSegment } from "../captions";
import { type CaptionPosition } from "../captions/types";
import { BrandBackground } from "../components/brand/BrandBackground";
import { GoldenGabLogo } from "../components/brand/GoldenGabLogo";
import { GoldenGabWatermark } from "../components/brand/GoldenGabWatermark";
import { BrandText } from "../components/common/BrandText";
import { SafeArea } from "../components/common/SafeArea";
import { GoldenGabIntro } from "../components/intro/GoldenGabIntro";
import { GoldenGabOutro } from "../components/outro/GoldenGabOutro";
import { colors, palette, radius, spacing, videoFormat } from "../config";
import { type PaletteColor } from "../config/colors";
import { textRoles, type TextRole } from "../config/typography";
import { secondsToFrames } from "../utils/time";

const PALETTE_SECONDS = 6;
const TYPOGRAPHY_SECONDS = 6;
const BRAND_SECONDS = 5;
const CAPTIONS_SECONDS = 12;
const INTRO_SECONDS = 6;
const OUTRO_SECONDS = 6;

/** Durée totale, en secondes. Maintenue en cohérence avec les sections. */
export const STYLEGUIDE_DURATION_IN_SECONDS =
  PALETTE_SECONDS +
  TYPOGRAPHY_SECONDS +
  BRAND_SECONDS +
  CAPTIONS_SECONDS +
  INTRO_SECONDS +
  OUTRO_SECONDS;

const paletteKeys = Object.keys(palette) as PaletteColor[];

const typographySamples: Record<TextRole, string> = {
  display: "Golden Gab",
  h1: "Les métiers de la tech",
  h2: "Data Analyst",
  h3: "Salaire & missions",
  caption: "Caption par défaut",
  body: "Texte courant, pour les explications un peu plus longues.",
  label: "Darker Grotesque + Inter",
};

const captionDemoSegments: readonly CaptionSegment[] = [
  { text: "Golden Gab", startMs: 150, endMs: 1050 },
  { text: "Les métiers de la tech", startMs: 1150, endMs: 2250 },
  { text: "sans filtre", startMs: 2350, endMs: 3450, emphasis: ["filtre"] },
];

const captionDemos: readonly {
  readonly style: "default" | "card" | "subtle";
  readonly position: CaptionPosition;
}[] = [
  { style: "default", position: "bottom" },
  { style: "card", position: "bottom" },
  { style: "subtle", position: "center" },
];

const PaletteScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.surface }}>
      <SafeArea>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.lg,
            width: "100%",
          }}
        >
          <BrandText role="h2" align="center" color={colors.ink}>
            Palette de marque
          </BrandText>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: spacing.md,
              justifyContent: "center",
            }}
          >
            {paletteKeys.map((key) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: spacing.xs,
                  width: 300,
                }}
              >
                <div
                  style={{
                    width: 300,
                    height: 180,
                    backgroundColor: palette[key],
                    borderRadius: radius.md,
                    border: `2px solid ${colors.neutral}`,
                  }}
                />
                <BrandText role="label" color={colors.ink}>
                  {key}
                </BrandText>
                <BrandText role="label" color={colors.ink}>
                  {palette[key]}
                </BrandText>
              </div>
            ))}
          </div>
        </div>
      </SafeArea>
    </AbsoluteFill>
  );
};

const TypographyScene: React.FC = () => {
  const roles = Object.keys(typographySamples) as TextRole[];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.surface }}>
      <SafeArea>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.md,
            width: "100%",
          }}
        >
          <BrandText role="label" color={colors.accent}>
            Typographie
          </BrandText>
          {roles.map((role) => (
            <div
              key={role}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: spacing.xs,
                borderBottom: `2px solid ${colors.neutral}`,
                paddingBottom: spacing.sm,
              }}
            >
              <BrandText role="label" color={colors.ink}>
                {role} · {String(textRoles[role].fontSize)}px
              </BrandText>
              <BrandText role={role} color={colors.ink}>
                {typographySamples[role]}
              </BrandText>
            </div>
          ))}
        </div>
      </SafeArea>
    </AbsoluteFill>
  );
};

const BrandScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Fond clair : le logo corail + bleu nuit serait illisible sur navy. */}
      <BrandBackground variant="light" motif motifOpacity={0.35} />
      <SafeArea>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.xl,
          }}
        >
          <GoldenGabLogo width={560} />
          <BrandText role="label" align="center" color={colors.accent}>
            Logo · motif · filigrane
          </BrandText>
        </div>
      </SafeArea>
      <GoldenGabWatermark />
    </AbsoluteFill>
  );
};

const CaptionsScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const secondsPerStyle = CAPTIONS_SECONDS / captionDemos.length;

  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" bottomScrim />
      <Series>
        {captionDemos.map((demo) => (
          <Series.Sequence
            key={demo.style}
            name={`Captions · ${demo.style}`}
            durationInFrames={secondsToFrames(secondsPerStyle, fps)}
            premountFor={fps}
          >
            <Captions
              segments={captionDemoSegments}
              style={demo.style}
              position={demo.position}
            />
          </Series.Sequence>
        ))}
      </Series>
      <SafeArea inset={{ top: spacing.xxl }}>
        <BrandText role="label" color={colors.captionText}>
          Captions : default · card · subtle
        </BrandText>
      </SafeArea>
    </AbsoluteFill>
  );
};

export const Styleguide: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence
          name="Palette"
          durationInFrames={secondsToFrames(PALETTE_SECONDS, fps)}
          premountFor={fps}
        >
          <PaletteScene />
        </Series.Sequence>
        <Series.Sequence
          name="Typographie"
          durationInFrames={secondsToFrames(TYPOGRAPHY_SECONDS, fps)}
          premountFor={fps}
        >
          <TypographyScene />
        </Series.Sequence>
        <Series.Sequence
          name="Marque"
          durationInFrames={secondsToFrames(BRAND_SECONDS, fps)}
          premountFor={fps}
        >
          <BrandScene />
        </Series.Sequence>
        <Series.Sequence
          name="Captions"
          durationInFrames={secondsToFrames(CAPTIONS_SECONDS, fps)}
          premountFor={fps}
        >
          <CaptionsScene />
        </Series.Sequence>
        <Series.Sequence
          name="Intro"
          durationInFrames={secondsToFrames(INTRO_SECONDS, fps)}
          premountFor={fps}
        >
          <GoldenGabIntro
            eyebrow="Styleguide"
            title="Intro"
            subtitle="Composant réutilisable"
          />
        </Series.Sequence>
        <Series.Sequence
          name="Outro"
          durationInFrames={secondsToFrames(OUTRO_SECONDS, fps)}
          premountFor={fps}
        >
          <GoldenGabOutro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

/**
 * Enregistrement Studio du styleguide.
 * La composition est déclarée à côté de son composant (convention projet).
 */
export const StyleguideComposition: React.FC = () => {
  return (
    <Composition
      id="Styleguide"
      component={Styleguide}
      durationInFrames={STYLEGUIDE_DURATION_IN_SECONDS * videoFormat.fps}
      fps={videoFormat.fps}
      width={videoFormat.width}
      height={videoFormat.height}
    />
  );
};
