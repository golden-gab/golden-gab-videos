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
import {
  AnimatedList,
  BeforeAfter,
  Callout,
  CodeShowcase,
  Comparison,
  FlowDiagram,
  HeroTitle,
  InfoCard,
  MascotScene as MascotSceneComponent,
  NodeGraph,
  ProcessSteps,
  SectionTitle,
  Stat,
} from "../components/motion";
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

/* Durées de la galerie Motion (voir `src/components/motion`). */
const HERO_TITLE_SECONDS = 12;
const SECTION_TITLE_SECONDS = 9;
const FLOW_SECONDS = 9;
const STEPS_SECONDS = 9;
const CODE_SECONDS = 12;
const COMPARISON_SECONDS = 8;
const CALLOUT_SECONDS = 8;
const INFO_CARD_SECONDS = 8;
const LIST_SECONDS = 8;
const STAT_SECONDS = 8;
const BEFORE_AFTER_SECONDS = 8;
const NODE_GRAPH_SECONDS = 8;
const MASCOT_MOTION_SECONDS = 8;

/** Durée totale, en secondes. Maintenue en cohérence avec les sections. */
export const STYLEGUIDE_DURATION_IN_SECONDS =
  PALETTE_SECONDS +
  TYPOGRAPHY_SECONDS +
  BRAND_SECONDS +
  MASCOT_SECONDS +
  MASCOT_POSITIONS_SECONDS +
  MASCOT_SCENE_SECONDS +
  CAPTIONS_SECONDS +
  HERO_TITLE_SECONDS +
  SECTION_TITLE_SECONDS +
  FLOW_SECONDS +
  STEPS_SECONDS +
  CODE_SECONDS +
  COMPARISON_SECONDS +
  CALLOUT_SECONDS +
  INFO_CARD_SECONDS +
  LIST_SECONDS +
  STAT_SECONDS +
  BEFORE_AFTER_SECONDS +
  NODE_GRAPH_SECONDS +
  MASCOT_MOTION_SECONDS +
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
  code: "const user = await getUser();",
  label: "Darker Grotesque + Inter",
};

const captionDemoSegments: readonly CaptionSegment[] = [
  { text: "Golden Gab", startMs: 150, endMs: 1050 },
  { text: "Les métiers de la tech", startMs: 1150, endMs: 2250 },
  { text: "sans filtre", startMs: 2350, endMs: 3450, emphasis: ["filtre"] },
];

const captionDemos: readonly {
  readonly style: "default" | "card" | "subtle" | "highlight";
  readonly position: CaptionPosition;
}[] = [
  { style: "default", position: "bottom" },
  { style: "card", position: "bottom" },
  { style: "subtle", position: "center" },
  { style: "highlight", position: "bottom" },
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

/* ------------------------------------------------------------------ */
/* Bibliothèque Motion — galerie                                        */
/* ------------------------------------------------------------------ */

/** Étiquette + démo, pour identifier chaque exemple de la galerie Motion. */
const MotionDemo: React.FC<{
  readonly label: string;
  readonly children: React.ReactNode;
}> = ({ label, children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: spacing.sm,
      width: "100%",
    }}
  >
    <BrandText role="label" color={colors.accent}>
      {label}
    </BrandText>
    {children}
  </div>
);

const TYPESCRIPT_SAMPLE = `const user = await getUser(id);

return {
  id: user.id,
  name: user.name,
};`;

const HIGHLIGHT_SAMPLE = `async function fetchUser() {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}`;

const DIFF_SAMPLE = `- const data = await getUser();
- console.log(data);
+ const { user } = await getUser();
+ return user;`;

const COMPARE_LOOP = `let total = 0;
for (const item of items) {
  total += item;
}`;

const COMPARE_REDUCE = `return items
  .reduce(sum);`;

const MotionHeroTitleScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const per = HERO_TITLE_SECONDS / 3;

  return (
    <AbsoluteFill>
      <BrandBackground variant="light" motif motifOpacity={0.25} />
      <Series>
        <Series.Sequence
          name="Motion · HeroTitle · default"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <HeroTitle
              eyebrow="Métiers de la tech"
              title="C'est quoi un AI Engineer ?"
              emphasis="AI Engineer"
              subtitle="Sans filtre, en 45 secondes."
            />
          </SafeArea>
        </Series.Sequence>
        <Series.Sequence
          name="Motion · HeroTitle · centered"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <HeroTitle
              variant="centered"
              title="C'est quoi une API ?"
              emphasis="API"
              subtitle="La porte d'entrée d'un système."
            />
          </SafeArea>
        </Series.Sequence>
        <Series.Sequence
          name="Motion · HeroTitle · compact"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <HeroTitle
              variant="compact"
              align="left"
              eyebrow="Prérequis"
              title="SQL, Python, Cloud"
              emphasis="Cloud"
            />
          </SafeArea>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

const MotionSectionTitleScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const per = SECTION_TITLE_SECONDS / 3;

  return (
    <AbsoluteFill>
      <BrandBackground variant="light" motif motifOpacity={0.25} />
      <Series>
        <Series.Sequence
          name="Motion · SectionTitle · default"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <MotionDemo label="default">
              <SectionTitle title="Mais concrètement, il fait quoi ?" />
            </MotionDemo>
          </SafeArea>
        </Series.Sequence>
        <Series.Sequence
          name="Motion · SectionTitle · accent"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <MotionDemo label="accent">
              <SectionTitle variant="accent" title="Les missions au quotidien" />
            </MotionDemo>
          </SafeArea>
        </Series.Sequence>
        <Series.Sequence
          name="Motion · SectionTitle · numbered"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <MotionDemo label="numbered">
              <SectionTitle
                variant="numbered"
                number="02"
                title="Les compétences clés"
              />
            </MotionDemo>
          </SafeArea>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

const MotionFlowScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const per = FLOW_SECONDS / 2;

  return (
    <AbsoluteFill>
      <BrandBackground variant="light" motif motifOpacity={0.25} />
      <Series>
        <Series.Sequence
          name="Motion · FlowDiagram · vertical"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <MotionDemo label="vertical · 4 nodes · timed reveals">
              <FlowDiagram
                direction="vertical"
                showNumbers
                itemRevealOffsets={[0, 1.2, 2.4, 3.6]}
                nodes={[
                  {
                    title: "Utilisateur",
                    description: "Envoie une requête",
                    accent: "accent",
                  },
                  {
                    title: "API",
                    description: "Vérifie et route",
                    accent: "secondary",
                  },
                  {
                    title: "Serveur",
                    description: "Exécute la logique",
                    accent: "secondary",
                  },
                  {
                    title: "Base de données",
                    description: "Lit et écrit",
                    accent: "accent",
                  },
                ]}
              />
            </MotionDemo>
          </SafeArea>
        </Series.Sequence>
        <Series.Sequence
          name="Motion · FlowDiagram · horizontal"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <MotionDemo label="horizontal · 3 nodes">
              <FlowDiagram
                direction="horizontal"
                nodes={[
                  { title: "Client" },
                  { title: "API" },
                  { title: "Données" },
                ]}
              />
            </MotionDemo>
          </SafeArea>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

const MOTION_STEPS = [
  { title: "Collecter", description: "Récupérer les données brutes." },
  { title: "Transformer", description: "Nettoyer et normaliser." },
  { title: "Stocker", description: "Écrire dans l'entrepôt." },
  { title: "Analyser", description: "En tirer des décisions." },
];

const MotionProcessStepsScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const per = STEPS_SECONDS / 2;

  return (
    <AbsoluteFill>
      <BrandBackground variant="light" motif motifOpacity={0.25} />
      <Series>
        <Series.Sequence
          name="Motion · ProcessSteps · vertical"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <MotionDemo label="vertical · étape active">
              <ProcessSteps steps={MOTION_STEPS} activeStep={1} />
            </MotionDemo>
          </SafeArea>
        </Series.Sequence>
        <Series.Sequence
          name="Motion · ProcessSteps · horizontal"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <MotionDemo label="horizontal · 3 étapes">
              <ProcessSteps
                orientation="horizontal"
                steps={MOTION_STEPS.slice(0, 3)}
                activeStep={0}
              />
            </MotionDemo>
          </SafeArea>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

const MotionCodeScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const per = CODE_SECONDS / 4;

  return (
    <AbsoluteFill>
      <BrandBackground variant="light" motif motifOpacity={0.25} />
      <Series>
        <Series.Sequence
          name="Motion · CodeShowcase · line"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <CodeShowcase
              title="user.ts"
              language="typescript"
              showLineNumbers
              code={TYPESCRIPT_SAMPLE}
            />
          </SafeArea>
        </Series.Sequence>
        <Series.Sequence
          name="Motion · CodeShowcase · highlight"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <CodeShowcase
              title="fetch.ts"
              language="typescript"
              variant="highlight"
              highlightLines={[3]}
              code={HIGHLIGHT_SAMPLE}
            />
          </SafeArea>
        </Series.Sequence>
        <Series.Sequence
          name="Motion · CodeShowcase · diff"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <CodeShowcase
              title="refactor.ts"
              language="typescript"
              variant="diff"
              code={DIFF_SAMPLE}
            />
          </SafeArea>
        </Series.Sequence>
        <Series.Sequence
          name="Motion · CodeShowcase · typewriter"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <CodeShowcase
              title="terminal"
              language="bash"
              reveal="typewriter"
              code="npm run dev"
            />
          </SafeArea>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};const MotionComparisonScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const per = COMPARISON_SECONDS / 2;

  return (
    <AbsoluteFill>
      <BrandBackground variant="light" motif motifOpacity={0.25} />
      <Series>
        <Series.Sequence
          name="Motion · Comparison · columns"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <MotionDemo label="columns · deux pratiques">
              <Comparison
                leftBadge="✕"
                rightBadge="✓"
                left={{
                  title: "À éviter",
                  items: ["Tout dans un fichier", "Peu testable"],
                  accent: "secondary",
                }}
                right={{
                  title: "À privilégier",
                  items: ["Séparer les rôles", "Facile à tester"],
                  accent: "accent",
                }}
              />
            </MotionDemo>
          </SafeArea>
        </Series.Sequence>
        <Series.Sequence
          name="Motion · Comparison · stack"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <MotionDemo label="stack · avant / après">
              <Comparison
                orientation="stack"
                staggerSeconds={0.4}
                left={{
                  title: "Avant",
                  code: COMPARE_LOOP,
                  codeLanguage: "typescript",
                  accent: "secondary",
                }}
                right={{
                  title: "Après",
                  code: COMPARE_REDUCE,
                  codeLanguage: "typescript",
                  accent: "accent",
                }}
              />
            </MotionDemo>
          </SafeArea>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

const MotionCalloutScene: React.FC = () => (
  <AbsoluteFill>
    <BrandBackground variant="light" motif motifOpacity={0.25} />
    <SafeArea>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.md,
          width: "100%",
        }}
      >
        <MotionDemo label="info">
          <Callout
            variant="info"
            title="Définition"
            text="Une API expose des fonctions à d'autres programmes."
          />
        </MotionDemo>
        <MotionDemo label="success">
          <Callout variant="success" text="Un endpoint = une ressource." />
        </MotionDemo>
        <MotionDemo label="warning">
          <Callout
            variant="warning"
            text="Toujours valider une entrée utilisateur."
          />
        </MotionDemo>
        <MotionDemo label="important">
          <Callout
            variant="important"
            text="Une API n'est pas seulement une URL."
          />
        </MotionDemo>
      </div>
    </SafeArea>
  </AbsoluteFill>
);

const MotionInfoCardScene: React.FC = () => (
  <AbsoluteFill>
    <BrandBackground variant="light" motif motifOpacity={0.25} />
    <SafeArea>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.lg,
          width: "100%",
        }}
      >
        <MotionDemo label="InfoCard · icône + badge">
          <InfoCard
            icon="🛡"
            title="Cybersecurity"
            description="Protège les systèmes contre les attaques."
            badge="Métier"
          />
        </MotionDemo>
        <MotionDemo label="InfoCard · tone dark">
          <InfoCard
            tone="dark"
            accent="secondary"
            title="API REST"
            description="Un style d'architecture pour exposer des ressources."
            badge="Concept"
          />
        </MotionDemo>
      </div>
    </SafeArea>
  </AbsoluteFill>
);

const MotionListScene: React.FC = () => (
  <AbsoluteFill>
    <BrandBackground variant="light" motif motifOpacity={0.25} />
    <SafeArea>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.xl,
          width: "100%",
        }}
      >
        <MotionDemo label="check · titre">
          <AnimatedList
            title="Un Data Engineer doit connaître"
            marker="check"
            items={[
              { text: "SQL" },
              { text: "Python" },
              { text: "Data pipelines" },
              { text: "Cloud" },
            ]}
          />
        </MotionDemo>
        <MotionDemo label="number · accents">
          <AnimatedList
            marker="number"
            items={[
              { text: "Collecter", accent: "accent" },
              { text: "Transformer", accent: "secondary" },
              { text: "Stocker", accent: "accent" },
            ]}
          />
        </MotionDemo>
      </div>
    </SafeArea>
  </AbsoluteFill>
);

const MotionStatScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const per = STAT_SECONDS / 2;

  return (
    <AbsoluteFill>
      <BrandBackground variant="dark" motif motifOpacity={0.3} />
      <Series>
        <Series.Sequence
          name="Motion · Stat · compteur"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <Stat
              tone="dark"
              count
              size="hero"
              value={1.3}
              decimals={1}
              suffix="M"
              label="nouveaux emplois liés à l'IA"
            />
          </SafeArea>
        </Series.Sequence>
        <Series.Sequence
          name="Motion · Stat · fixe"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <Stat
              tone="dark"
              value={99.9}
              decimals={1}
              suffix="%"
              label="de disponibilité"
            />
          </SafeArea>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

const MotionBeforeAfterScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const per = BEFORE_AFTER_SECONDS / 2;

  return (
    <AbsoluteFill>
      <BrandBackground variant="light" motif motifOpacity={0.25} />
      <Series>
        <Series.Sequence
          name="Motion · BeforeAfter · valeurs"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <BeforeAfter
              before={{ label: "Avant", value: "100 lignes de code" }}
              after={{ label: "Après", value: "20 lignes de code" }}
            />
          </SafeArea>
        </Series.Sequence>
        <Series.Sequence
          name="Motion · BeforeAfter · code"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <SafeArea>
            <BeforeAfter
              before={{
                label: "Boucle manuelle",
                code: COMPARE_LOOP,
                codeLanguage: "typescript",
              }}
              after={{
                label: "Fonction dédiée",
                code: COMPARE_REDUCE,
                codeLanguage: "typescript",
              }}
            />
          </SafeArea>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

const MotionNodeGraphScene: React.FC = () => (
  <AbsoluteFill>
    <BrandBackground variant="light" motif motifOpacity={0.25} />
    <SafeArea>
      <MotionDemo label="NodeGraph · client → api → données">
        <NodeGraph
          nodes={[
            { id: "client", title: "Client" },
            { id: "api", title: "API" },
            { id: "db", title: "Base de données", accent: "secondary" },
            { id: "cache", title: "Cache", accent: "secondary" },
          ]}
          edges={[
            { from: "client", to: "api" },
            { from: "api", to: "db", label: "SQL" },
            { from: "api", to: "cache", label: "get" },
          ]}
        />
      </MotionDemo>
    </SafeArea>
  </AbsoluteFill>
);

const MotionMascotSceneScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const per = MASCOT_MOTION_SECONDS / 2;

  return (
    <AbsoluteFill>
      <BrandBackground variant="light" motif motifOpacity={0.25} />
      <Series>
        <Series.Sequence
          name="Motion · MascotScene · droite"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <MascotSceneComponent
            mascot={{
              pose: "point",
              attitude: "confident",
              position: "right",
              size: "small",
            }}
            content={
              <Callout
                variant="info"
                title="Une API, c'est quoi ?"
                text="Une porte d'entrée vers un système."
              />
            }
          />
        </Series.Sequence>
        <Series.Sequence
          name="Motion · MascotScene · gauche"
          durationInFrames={secondsToFrames(per, fps)}
          premountFor={fps}
        >
          <MascotSceneComponent
            side="left"
            mascot={{ pose: "point", attitude: "friendly", size: "small" }}
            content={
              <AnimatedList
                marker="check"
                items={[{ text: "Lire" }, { text: "Créer" }, { text: "Supprimer" }]}
              />
            }
          />
        </Series.Sequence>
      </Series>
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
          name="Motion · HeroTitle"
          durationInFrames={secondsToFrames(HERO_TITLE_SECONDS, fps)}
          premountFor={fps}
        >
          <MotionHeroTitleScene />
        </Series.Sequence>
        <Series.Sequence
          name="Motion · SectionTitle"
          durationInFrames={secondsToFrames(SECTION_TITLE_SECONDS, fps)}
          premountFor={fps}
        >
          <MotionSectionTitleScene />
        </Series.Sequence>
        <Series.Sequence
          name="Motion · FlowDiagram"
          durationInFrames={secondsToFrames(FLOW_SECONDS, fps)}
          premountFor={fps}
        >
          <MotionFlowScene />
        </Series.Sequence>
        <Series.Sequence
          name="Motion · ProcessSteps"
          durationInFrames={secondsToFrames(STEPS_SECONDS, fps)}
          premountFor={fps}
        >
          <MotionProcessStepsScene />
        </Series.Sequence>
        <Series.Sequence
          name="Motion · CodeShowcase"
          durationInFrames={secondsToFrames(CODE_SECONDS, fps)}
          premountFor={fps}
        >
          <MotionCodeScene />
        </Series.Sequence>
        <Series.Sequence
          name="Motion · Comparison"
          durationInFrames={secondsToFrames(COMPARISON_SECONDS, fps)}
          premountFor={fps}
        >
          <MotionComparisonScene />
        </Series.Sequence>
        <Series.Sequence
          name="Motion · Callout"
          durationInFrames={secondsToFrames(CALLOUT_SECONDS, fps)}
          premountFor={fps}
        >
          <MotionCalloutScene />
        </Series.Sequence>
        <Series.Sequence
          name="Motion · InfoCard"
          durationInFrames={secondsToFrames(INFO_CARD_SECONDS, fps)}
          premountFor={fps}
        >
          <MotionInfoCardScene />
        </Series.Sequence>
        <Series.Sequence
          name="Motion · AnimatedList"
          durationInFrames={secondsToFrames(LIST_SECONDS, fps)}
          premountFor={fps}
        >
          <MotionListScene />
        </Series.Sequence>
        <Series.Sequence
          name="Motion · Stat"
          durationInFrames={secondsToFrames(STAT_SECONDS, fps)}
          premountFor={fps}
        >
          <MotionStatScene />
        </Series.Sequence>
        <Series.Sequence
          name="Motion · BeforeAfter"
          durationInFrames={secondsToFrames(BEFORE_AFTER_SECONDS, fps)}
          premountFor={fps}
        >
          <MotionBeforeAfterScene />
        </Series.Sequence>
        <Series.Sequence
          name="Motion · NodeGraph"
          durationInFrames={secondsToFrames(NODE_GRAPH_SECONDS, fps)}
          premountFor={fps}
        >
          <MotionNodeGraphScene />
        </Series.Sequence>
        <Series.Sequence
          name="Motion · MascotScene"
          durationInFrames={secondsToFrames(MASCOT_MOTION_SECONDS, fps)}
          premountFor={fps}
        >
          <MotionMascotSceneScene />
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
