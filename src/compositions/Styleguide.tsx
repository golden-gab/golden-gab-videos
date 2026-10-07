/**
 * Composition `GoldenGab / Styleguide`.
 *
 * Outil de QA **et documentation vivante** de la direction artistique :
 * palette, typographies, logo, motif, mascotte, styles de captions,
 * intro et outro.
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
import { mascotAttitudes } from "../components/mascot/animations";
import { GoldenGabMascot } from "../components/mascot/GoldenGabMascot";
import { mascotSizes, type MascotPosition } from "../components/mascot/positions";
import {
  type MascotAttitude,
  type MascotFacing,
  type MascotSize,
} from "../components/mascot/types";
import { GoldenGabIntro } from "../components/intro/GoldenGabIntro";
import { GoldenGabOutro } from "../components/outro/GoldenGabOutro";
import {
  captionZone,
  colors,
  palette,
  radius,
  safeArea,
  spacing,
  videoFormat,
} from "../config";
import { type PaletteColor } from "../config/colors";
import { textRoles, type TextRole } from "../config/typography";
import { type AppearAnimation } from "../utils/animation";
import { withAlpha } from "../utils/color";
import { secondsToFrames } from "../utils/time";

const PALETTE_SECONDS = 6;
const TYPOGRAPHY_SECONDS = 6;
const BRAND_SECONDS = 5;
const MASCOT_SECONDS = 6;
const MASCOT_POSITIONS_SECONDS = 7;
const MASCOT_SCENE_SECONDS = 8;
const CAPTIONS_SECONDS = 12;
const INTRO_SECONDS = 6;
const OUTRO_SECONDS = 6;

/** Durée totale, en secondes. Maintenue en cohérence avec les sections. */
export const STYLEGUIDE_DURATION_IN_SECONDS =
  PALETTE_SECONDS +
  TYPOGRAPHY_SECONDS +
  BRAND_SECONDS +
  MASCOT_SECONDS +
  MASCOT_POSITIONS_SECONDS +
  MASCOT_SCENE_SECONDS +
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

/** Tailles préréglées de la mascotte + miroir, vérifiées une par une. */
const mascotSizeDemos: readonly {
  readonly size: MascotSize;
  readonly facing: MascotFacing;
  readonly label: string;
}[] = [
  { size: "small", facing: "left", label: `small · ${mascotSizes.small} px` },
  { size: "medium", facing: "left", label: `medium · ${mascotSizes.medium} px` },
  { size: "large", facing: "left", label: `large · ${mascotSizes.large} px` },
  { size: "medium", facing: "right", label: "miroir · facing right" },
];

/** Une position par ancrage, chacune avec l'entrée qui lui est la plus naturelle. */
const mascotPositionDemos: readonly {
  readonly position: MascotPosition;
  readonly entrance: AppearAnimation;
}[] = [
  { position: "top-left", entrance: "slide-right" },
  { position: "left", entrance: "fade" },
  { position: "bottom-left", entrance: "slide-up" },
  { position: "center", entrance: "none" },
  { position: "bottom-right", entrance: "slide-down" },
  { position: "right", entrance: "slide-left" },
  { position: "top-right", entrance: "pop" },
];

/** Toutes les attitudes disponibles, dans l'ordre du registre. */
const mascotAttitudeDemos: readonly MascotAttitude[] = [
  "neutral",
  "confident",
  "curious",
  "surprised",
  "excited",
  "serious",
  "confused",
  "friendly",
];

/** Captions de la scène « narration » : la mascotte ne doit pas les masquer. */
const mascotSceneSegments: readonly CaptionSegment[] = [
  { text: "La mascotte", startMs: 150, endMs: 1150 },
  { text: "explique", startMs: 1250, endMs: 2350, emphasis: ["explique"] },
  { text: "le concept", startMs: 2450, endMs: 3550 },
  { text: "à côté des captions", startMs: 3650, endMs: 4750 },
  { text: "sans les masquer", startMs: 4850, endMs: 5950 },
  { text: "et selon l'attitude", startMs: 6050, endMs: 7150 },
  { text: "du moment", startMs: 7250, endMs: 7900 },
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

/**
 * Scène « Mascotte » : tailles préréglées, miroir, interaction avec le logo.
 * Une démo par sous-séquence (montage → l'entrée se rejoue à chaque fois).
 * Seules les poses disposant d'un asset réel sont rendues.
 */
const MascotScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const secondsPerDemo = MASCOT_SECONDS / mascotSizeDemos.length;

  return (
    <AbsoluteFill>
      {/* Fond clair : la tenue bleu nuit de la mascotte se détache sur la crème. */}
      <BrandBackground variant="light" motif motifOpacity={0.35} />
      <Series>
        {mascotSizeDemos.map((demo) => (
          <Series.Sequence
            key={demo.label}
            name={`Mascotte · ${demo.label}`}
            durationInFrames={secondsToFrames(secondsPerDemo, fps)}
            premountFor={fps}
          >
            <SafeArea>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: spacing.md,
                  width: "100%",
                }}
              >
                <GoldenGabLogo name="Mascotte logo" width={300} />
                <GoldenGabMascot
                  position="flow"
                  size={demo.size}
                  facing={demo.facing}
                  attitude="confident"
                />
                <BrandText role="label" align="center" color={colors.ink}>
                  Mascotte · {demo.label}
                </BrandText>
                <BrandText role="label" align="center" color={colors.accent}>
                  Poses prévues (sans asset) : neutral · thinking · explaining ·
                  surprised · happy · confused
                </BrandText>
              </div>
            </SafeArea>
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};

/**
 * Scène « Mascotte · positions » : un ancrage par position, chaque entrée
 * associée à la direction la plus naturelle. Les repères en pointillés
 * permettent de vérifier que la zone sûre est respectée et que la
 * mascotte reste hors de la zone captions.
 */
const MascotPositionsScene: React.FC = () => {
  const { fps, width } = useVideoConfig();
  const secondsPerDemo = MASCOT_POSITIONS_SECONDS / mascotPositionDemos.length;
  const captionZoneWidth = width * captionZone.maxWidthRatio;

  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" motif motifOpacity={0.3} />
      {/* Repères QA (pas du contenu) : zone sûre en blanc, zone captions en corail. */}
      <div
        style={{
          position: "absolute",
          top: safeArea.top,
          right: safeArea.right,
          bottom: safeArea.bottom,
          left: safeArea.left,
          border: `2px dashed ${withAlpha(colors.captionText, 0.25)}`,
          borderRadius: radius.md,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: (width - captionZoneWidth) / 2,
          width: captionZoneWidth,
          bottom: captionZone.bottom,
          height: captionZone.height,
          border: `2px dashed ${withAlpha(colors.captionHighlight, 0.5)}`,
          borderRadius: radius.md,
          pointerEvents: "none",
        }}
      />
      <SafeArea inset={{ top: spacing.xxl }} justify="flex-start">
        <BrandText role="label" align="center" color={colors.captionText}>
          Positions — zone sûre (blanc) · zone captions (corail)
        </BrandText>
      </SafeArea>
      <Series>
        {mascotPositionDemos.map((demo) => (
          <Series.Sequence
            key={demo.position}
            name={`Mascotte · ${demo.position}`}
            durationInFrames={secondsToFrames(secondsPerDemo, fps)}
            premountFor={fps}
          >
            <GoldenGabMascot
              position={demo.position}
              entrance={demo.entrance}
              size="medium"
              attitude="neutral"
            />
            <SafeArea justify="flex-end">
              <BrandText role="label" align="center" color={colors.captionText}>
                {demo.position} · entrée « {demo.entrance} »
              </BrandText>
            </SafeArea>
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};

/**
 * Scène « Mascotte · narration » : la mascotte joue les attitudes, à côté
 * de captions réelles — elle ne doit ni les masquer ni passer devant.
 */
const MascotNarrationScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const secondsPerAttitude = MASCOT_SCENE_SECONDS / mascotAttitudeDemos.length;

  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" bottomScrim />
      <Series>
        {mascotAttitudeDemos.map((attitude) => (
          <Series.Sequence
            key={attitude}
            name={`Mascotte · ${attitude}`}
            durationInFrames={secondsToFrames(secondsPerAttitude, fps)}
            premountFor={fps}
          >
            <GoldenGabMascot
              attitude={attitude}
              position="right"
              size="medium"
            />
            <SafeArea inset={{ top: spacing.xxl }} justify="flex-start">
              <BrandText role="label" align="center" color={colors.captionText}>
                attitude « {attitude} » · entrée «{" "}
                {mascotAttitudes[attitude].entrance} »
              </BrandText>
            </SafeArea>
          </Series.Sequence>
        ))}
      </Series>
      <Captions segments={mascotSceneSegments} style="default" />
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
          name="Mascotte"
          durationInFrames={secondsToFrames(MASCOT_SECONDS, fps)}
          premountFor={fps}
        >
          <MascotScene />
        </Series.Sequence>
        <Series.Sequence
          name="Mascotte · positions"
          durationInFrames={secondsToFrames(MASCOT_POSITIONS_SECONDS, fps)}
          premountFor={fps}
        >
          <MascotPositionsScene />
        </Series.Sequence>
        <Series.Sequence
          name="Mascotte · narration"
          durationInFrames={secondsToFrames(MASCOT_SCENE_SECONDS, fps)}
          premountFor={fps}
        >
          <MascotNarrationScene />
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
