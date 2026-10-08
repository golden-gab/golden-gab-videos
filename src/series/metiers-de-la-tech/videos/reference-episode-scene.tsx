import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { captionZone, colors, durations, radius, spacing, strokeWidths } from "../../../config";
import { GoldenGabLogo } from "../../../components/brand/GoldenGabLogo";
import { BrandText } from "../../../components/common/BrandText";
import { SafeArea } from "../../../components/common/SafeArea";
import { AnimatedAppear } from "../../../components/common/AnimatedAppear";
import { MascotScene } from "../../../components/motion/MascotScene";
import type { MascotSceneMascot } from "../../../components/motion/MascotScene";
import { referenceEpisodeTranscript } from "../data/reference-episode";
import type { AppearAnimation } from "../../../utils/animation";
import { withAlpha } from "../../../utils/color";
import { secondsToFrames } from "../../../utils/time";
import type { Scene } from "../../../scenes/types";

const getTranscriptOffset = (scene: Scene, beatKey: string): number => {
  const word = scene.visual.props?.[beatKey];
  if (typeof word !== "string") {
    throw new Error(
      `Storyboard beat "${beatKey}" is missing from scene "${scene.id}".`,
    );
  }

  const segment = referenceEpisodeTranscript.segments.find(
    (candidate) => candidate.text.toLowerCase() === word.toLowerCase(),
  );

  if (!segment || segment.start < scene.start || segment.start >= scene.end) {
    throw new Error(
      `Storyboard beat "${word}" is missing from scene "${scene.id}".`,
    );
  }

  return segment.start - scene.start;
};

const VisualLane: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => (
  <SafeArea
    inset={{ bottom: captionZone.bottom + captionZone.height }}
    style={{ justifyContent: "center" }}
  >
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: spacing.lg,
      }}
    >
      {children}
    </div>
  </SafeArea>
);

const SceneTransition: React.FC<{
  readonly scene: Scene;
  readonly children: React.ReactNode;
}> = ({ scene, children }) => (
  <AnimatedAppear
    animation={scene.transition?.enter ?? "fade"}
    exitAnimation={scene.transition?.exit ?? "fade"}
    appearDuration={durations.fast}
    exitDuration={durations.fast}
    style={{ width: "100%", height: "100%" }}
  >
    {children}
  </AnimatedAppear>
);

const NarratorWithMascot: React.FC<{
  readonly scene: Scene;
  readonly content: React.ReactNode;
  readonly entrance: AppearAnimation;
}> = ({ scene, content, entrance }) => {
  const config = scene.mascot;

  if (!config?.enabled) {
    return <VisualLane>{content}</VisualLane>;
  }

  const mascot: MascotSceneMascot = {
    pose: config.pose,
    attitude: config.attitude,
    position: config.position,
    size: config.size,
    facing: config.facing,
    entrance,
  };

  return (
    <MascotScene mascot={mascot} gap={spacing.lg} content={content} />
  );
};

const ProductTile: React.FC<{
  readonly icon: string;
  readonly delaySeconds: number;
}> = ({ icon, delaySeconds }) => (
  <AnimatedAppear
    animation="pop"
    delaySeconds={delaySeconds}
    style={{ flex: 1, minWidth: 0 }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        minHeight: 180,
        borderRadius: radius.lg,
        border: `2px solid ${withAlpha(colors.ink, 0.1)}`,
        backgroundColor: colors.surfaceLight,
      }}
    >
      <span style={{ fontSize: 68, lineHeight: 1 }}>{icon}</span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.xs,
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: 68,
            height: strokeWidths.thin,
            borderRadius: radius.pill,
            backgroundColor: withAlpha(colors.secondary, 0.24),
          }}
        />
        <span
          style={{
            width: 44,
            height: strokeWidths.thin,
            borderRadius: radius.pill,
            backgroundColor: withAlpha(colors.accent, 0.42),
          }}
        />
      </div>
    </div>
  </AnimatedAppear>
);

const OrderSlip: React.FC<{ readonly delaySeconds: number }> = ({
  delaySeconds,
}) => (
  <AnimatedAppear animation="slide-up" delaySeconds={delaySeconds}>
    <div
      style={{
        width: 72,
        height: 44,
        borderRadius: radius.sm,
        backgroundColor: colors.surfaceLight,
        border: `2px solid ${withAlpha(colors.secondary, 0.22)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xs,
      }}
    >
      <span
        style={{
          width: spacing.xs,
          height: spacing.xs,
          borderRadius: radius.pill,
          backgroundColor: colors.accent,
        }}
      />
      <span
        style={{
          width: spacing.md,
          height: strokeWidths.hairline,
          borderRadius: radius.pill,
          backgroundColor: withAlpha(colors.ink, 0.42),
        }}
      />
    </div>
  </AnimatedAppear>
);

const HookScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const questionOffset = getTranscriptOffset(scene, "questionRevealWord");

  return (
    <VisualLane>
      <div style={{ textAlign: "center" }}>
        <BrandText role="label" align="center" color={colors.accent}>
          DES MILLIERS DE PRODUITS
        </BrandText>
        <BrandText
          role="h2"
          align="center"
          color={colors.ink}
          style={{ marginTop: spacing.sm }}
        >
          Chaque mois.
        </BrandText>
      </div>
      <div style={{ display: "flex", gap: spacing.md, width: "100%" }}>
        <ProductTile icon="📦" delaySeconds={0.3} />
        <ProductTile icon="🎧" delaySeconds={0.65} />
        <ProductTile icon="☕" delaySeconds={1} />
        <ProductTile icon="👟" delaySeconds={1.35} />
      </div>
      <div style={{ display: "flex", gap: spacing.sm, justifyContent: "center" }}>
        {[1.7, 1.85, 2, 2.15, 2.3, 2.45, 2.6, 2.75].map((delaySeconds) => (
          <OrderSlip key={delaySeconds} delaySeconds={delaySeconds} />
        ))}
      </div>
      <AnimatedAppear animation="slide-up" delaySeconds={questionOffset}>
        <div
          style={{
            padding: `${spacing.sm}px ${spacing.lg}px`,
            borderRadius: radius.pill,
            backgroundColor: colors.secondary,
          }}
        >
          <BrandText role="h3" align="center" color={colors.inkInverse}>
            Mais lesquels ?
          </BrandText>
        </div>
      </AnimatedAppear>
    </VisualLane>
  );
};

const RoleScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  return (
    <NarratorWithMascot
      scene={scene}
      entrance="slide-up"
      content={
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          <BrandText role="label" color={colors.accent}>LE MÉTIER QUI ÉCLAIRE</BrandText>
          <BrandText role="h2" color={colors.ink}>Data Analyst</BrandText>
          <BrandText role="body" color={colors.ink}>
            Il transforme une question en pistes à comprendre.
          </BrandText>
        </div>
      }
    />
  );
};

const DataTable: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: spacing.sm,
      width: "100%",
      padding: spacing.md,
      borderRadius: radius.lg,
      backgroundColor: colors.surfaceLight,
      border: `2px solid ${withAlpha(colors.secondary, 0.16)}`,
    }}
  >
    <BrandText role="label" color={colors.secondary}>
      DONNÉES BRUTES
    </BrandText>
    {["PRODUIT", "DATE", "VENTE"].map((label, index) => (
      <div
        key={label}
        style={{ display: "flex", gap: spacing.sm, alignItems: "center" }}
      >
        <BrandText role="label" color={withAlpha(colors.ink, 0.54)}>
          {label}
        </BrandText>
        <div
          style={{
            flex: 1,
            height: strokeWidths.thin,
            borderRadius: radius.pill,
            backgroundColor: withAlpha(colors.secondary, 0.16 + index * 0.08),
          }}
        />
      </div>
    ))}
  </div>
);

const UsefulCard: React.FC<{ readonly revealAtSeconds: number }> = ({
  revealAtSeconds,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startFrame = secondsToFrames(revealAtSeconds, fps);
  const endFrame = startFrame + secondsToFrames(durations.base, fps);
  const draw = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        padding: spacing.md,
        borderRadius: radius.lg,
        backgroundColor: colors.secondary,
        display: "flex",
        flexDirection: "column",
        gap: spacing.sm,
      }}
    >
      <BrandText role="label" color={colors.inkInverse}>
        INFORMATION UTILE
      </BrandText>
      <svg viewBox="0 0 260 108" width="100%" aria-hidden="true">
        <path
          d="M 8 88 C 58 82, 70 61, 112 68 S 178 40, 252 16"
          fill="none"
          stroke={colors.inkInverse}
          strokeWidth={strokeWidths.thick}
          strokeLinecap="round"
          strokeDasharray={300}
          strokeDashoffset={300 * (1 - draw)}
        />
        <circle
          cx="252"
          cy="16"
          r="10"
          fill={colors.accent}
          opacity={draw}
        />
      </svg>
    </div>
  );
};

const TransformationScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const transformOffset = getTranscriptOffset(scene, "transformRevealWord");
  const usefulInfoOffset = getTranscriptOffset(scene, "informationRevealWord");

  return (
  <VisualLane>
    <BrandText role="h2" align="center" color={colors.ink}>
      Du brut à l'utile
    </BrandText>
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: spacing.sm,
      }}
    >
      <AnimatedAppear animation="slide-right" style={{ flex: 1 }}>
        <DataTable />
      </AnimatedAppear>
      <AnimatedAppear animation="pop" delaySeconds={transformOffset}>
        <div
          style={{
            width: spacing.xxl,
            height: spacing.xxl,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: radius.pill,
            backgroundColor: withAlpha(colors.accent, 0.14),
            color: colors.accent,
            fontSize: spacing.xl,
          }}
        >
          ↗
        </div>
      </AnimatedAppear>
      <AnimatedAppear animation="slide-left" delaySeconds={transformOffset} style={{ flex: 1 }}>
        <UsefulCard revealAtSeconds={usefulInfoOffset} />
      </AnimatedAppear>
    </div>
    <BrandText role="label" align="center" color={colors.secondary}>
      RENDRE LES DONNÉES LISIBLES
    </BrandText>
  </VisualLane>
  );
};

const TrendChart: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg viewBox="0 0 220 88" width="220" height="88" aria-hidden="true">
      <path
        d="M 8 70 C 42 64, 46 39, 80 49 S 121 67, 148 35 S 183 40, 212 12"
        fill="none"
        stroke={colors.accent}
        strokeWidth={strokeWidths.medium}
        strokeLinecap="round"
        strokeDasharray={250}
        strokeDashoffset={250 * (1 - draw)}
      />
    </svg>
  );
};

const BehaviorMarks: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
    {["●", "●", "●"].map((person, index) => (
      <React.Fragment key={index}>
        <span
          style={{
            fontSize: spacing.lg,
            lineHeight: 1,
            color: index === 1 ? colors.accent : colors.secondary,
          }}
        >
          {person}
        </span>
        {index < 2 ? (
          <span
            style={{
              width: spacing.md,
              height: strokeWidths.thin,
              borderRadius: radius.pill,
              backgroundColor: withAlpha(colors.secondary, 0.28),
            }}
          />
        ) : null}
      </React.Fragment>
    ))}
  </div>
);

const DecisionMark: React.FC = () => (
  <div
    style={{
      width: spacing.xxl,
      height: spacing.xxl,
      borderRadius: radius.pill,
      border: `${strokeWidths.medium}px solid ${colors.accent}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: colors.accent,
      fontSize: spacing.xl,
      lineHeight: 1,
    }}
  >
    ✓
  </div>
);

const AnalysisRow: React.FC<{
  readonly number: string;
  readonly title: string;
  readonly delaySeconds: number;
  readonly children: React.ReactNode;
}> = ({ number, title, delaySeconds, children }) => (
  <AnimatedAppear animation="slide-up" delaySeconds={delaySeconds}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: spacing.md,
        width: "100%",
        padding: spacing.md,
        borderRadius: radius.lg,
        backgroundColor: colors.surfaceLight,
        borderLeft: `${strokeWidths.thick}px solid ${colors.accent}`,
      }}
    >
      <BrandText role="h3" color={colors.accent}>
        {number}
      </BrandText>
      <BrandText role="h3" color={colors.ink} style={{ flex: 1 }}>
        {title}
      </BrandText>
      <div style={{ width: 220, display: "flex", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  </AnimatedAppear>
);

const AnalysisScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const trendOffset = getTranscriptOffset(scene, "trendRevealWord");
  const behaviorOffset = getTranscriptOffset(scene, "behaviorRevealWord");
  const decisionOffset = getTranscriptOffset(scene, "decisionRevealWord");

  return (
    <VisualLane>
      <BrandText role="label" align="center" color={colors.secondary}>
        TROIS FAÇONS DE LIRE LES DONNÉES
      </BrandText>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: spacing.sm }}>
        <AnalysisRow number="01" title="Repérer les tendances" delaySeconds={trendOffset}>
          <TrendChart />
        </AnalysisRow>
        <AnalysisRow number="02" title="Comprendre les comportements" delaySeconds={behaviorOffset}>
          <BehaviorMarks />
        </AnalysisRow>
        <AnalysisRow number="03" title="Éclairer les décisions" delaySeconds={decisionOffset}>
          <DecisionMark />
        </AnalysisRow>
      </div>
    </VisualLane>
  );
};

const InsightScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  return (
    <NarratorWithMascot
      scene={scene}
      entrance="fade"
      content={
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          <BrandText role="label" color={colors.accent}>
            AU-DELÀ DU TABLEAU
          </BrandText>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.md,
              padding: spacing.md,
              borderRadius: radius.lg,
              backgroundColor: colors.surfaceLight,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.xs }}>
              {[0, 1, 2, 3].map((item) => (
                <span
                  key={item}
                  style={{
                    width: item % 2 === 0 ? 120 : 88,
                    height: strokeWidths.thin,
                    borderRadius: radius.pill,
                    backgroundColor: withAlpha(colors.secondary, 0.24),
                  }}
                />
              ))}
            </div>
            <span
              style={{
                color: colors.accent,
                fontSize: spacing.xl,
                lineHeight: 1,
              }}
            >
              →
            </span>
            <div
              style={{
                width: spacing.xxl,
                height: spacing.xxl,
                borderRadius: radius.pill,
                backgroundColor: withAlpha(colors.accent, 0.14),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ color: colors.accent, fontSize: spacing.xl }}>?</span>
            </div>
          </div>
          <BrandText role="h3" color={colors.ink}>
            Chercher ce qui se cache derrière.
          </BrandText>
        </div>
      }
    />
  );
};

const ConclusionScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  return (
    <NarratorWithMascot
      scene={scene}
      entrance="slide-up"
      content={
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          <BrandText role="label" color={colors.accent}>
            LA BONNE QUESTION
          </BrandText>
          <BrandText role="h2" color={colors.ink}>
            Que racontent ces chiffres ?
          </BrandText>
          <BrandText role="body" color={colors.ink}>
            C'est là que commence l'analyse.
          </BrandText>
          <GoldenGabLogo width={200} />
        </div>
      }
    />
  );
};

export const ReferenceEpisodeScene: React.FC<{ readonly scene: Scene }> = ({
  scene,
}) => {
  let content: React.ReactNode;

  switch (scene.id) {
    case "hook":
      content = <HookScene scene={scene} />;
      break;
    case "role":
      content = <RoleScene scene={scene} />;
      break;
    case "transformation":
      content = <TransformationScene scene={scene} />;
      break;
    case "analyse":
      content = <AnalysisScene scene={scene} />;
      break;
    case "insight":
      content = <InsightScene scene={scene} />;
      break;
    case "conclusion":
      content = <ConclusionScene scene={scene} />;
      break;
    default:
      throw new Error(`Unknown reference episode scene "${scene.id}".`);
  }

  return (
    <AbsoluteFill>
      <SceneTransition scene={scene}>{content}</SceneTransition>
    </AbsoluteFill>
  );
};
