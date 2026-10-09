/**
 * Mise en scène locale de l'épisode Data Analyst, synchronisée au transcript.
 * Les interfaces et schémas restent propres à cette vidéo ; les primitives
 * d'apparition, les captions et les tokens sont ceux du système Golden Gab.
 */

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { AnimatedAppear } from "../../../components/common/AnimatedAppear";
import { BrandText } from "../../../components/common/BrandText";
import { SafeArea } from "../../../components/common/SafeArea";
import {
  captionZone,
  colors,
  durations,
  radius,
  spacing,
  strokeWidths,
} from "../../../config";
import { secondsToFrames } from "../../../utils/time";
import { withAlpha } from "../../../utils/color";
import type { Scene } from "../../../scenes/types";
import { referenceEpisodeTranscript } from "../data/reference-episode";

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
      `Transcript word "${word}" is missing from scene "${scene.id}".`,
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

const ProductTile: React.FC<{
  readonly icon: string;
  readonly delaySeconds: number;
}> = ({ icon, delaySeconds }) => (
  <AnimatedAppear
    animation="slide-up"
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
        minHeight: spacing.xxxl * 1.5,
        borderRadius: radius.lg,
        border: `${strokeWidths.medium}px solid ${withAlpha(colors.ink, 0.1)}`,
        backgroundColor: colors.surfaceLight,
      }}
    >
      <span style={{ fontSize: spacing.xl * 2, lineHeight: 1 }}>{icon}</span>
      <span
        style={{
          width: "62%",
          height: strokeWidths.thin,
          borderRadius: radius.pill,
          backgroundColor: withAlpha(colors.secondary, 0.24),
        }}
      />
      <span
        style={{
          width: "42%",
          height: strokeWidths.thin,
          borderRadius: radius.pill,
          backgroundColor: withAlpha(colors.secondary, 0.14),
        }}
      />
    </div>
  </AnimatedAppear>
);

const CalendarMark: React.FC<{ readonly delaySeconds: number }> = ({
  delaySeconds,
}) => (
  <AnimatedAppear animation="slide-left" delaySeconds={delaySeconds}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: spacing.sm,
        padding: `${spacing.xs}px ${spacing.md}px`,
        borderRadius: radius.pill,
        border: `${strokeWidths.thin}px solid ${withAlpha(
          colors.inkInverse,
          0.35,
        )}`,
      }}
    >
      <span style={{ color: colors.inkInverse, fontSize: spacing.md }}>
        ◷
      </span>
      <BrandText role="label" color={colors.inkInverse}>
        CHAQUE MOIS
      </BrandText>
    </div>
  </AnimatedAppear>
);

const SalesResults: React.FC<{ readonly delaySeconds: number }> = ({
  delaySeconds,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startFrame = secondsToFrames(delaySeconds, fps);
  const moveDuration = secondsToFrames(durations.base, fps);
  const selectedRowTop = interpolate(
    frame,
    [startFrame, startFrame + moveDuration],
    [spacing.xxl, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AnimatedAppear animation="pop" delaySeconds={delaySeconds}>
      <div
        style={{
          width: "100%",
          padding: spacing.md,
          borderRadius: radius.lg,
          backgroundColor: colors.surfaceLight,
        }}
      >
        <BrandText role="label" color={colors.secondary}>
          RÉSULTATS DES VENTES
        </BrandText>
        <div
          style={{
            position: "relative",
            height: spacing.xxl * 1.5,
            marginTop: spacing.sm,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              height: spacing.xxl,
              borderRadius: radius.md,
              backgroundColor: withAlpha(colors.secondary, 0.08),
            }}
          />
          <div
            style={{
              position: "absolute",
              top: selectedRowTop,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              gap: spacing.md,
              height: spacing.xxl,
              padding: spacing.sm,
              borderRadius: radius.md,
              border: `${strokeWidths.medium}px solid ${colors.accent}`,
              backgroundColor: colors.surfaceLight,
            }}
          >
            <span style={{ fontSize: spacing.lg, lineHeight: 1 }}>📦</span>
            <span
              style={{
                flex: 1,
                height: strokeWidths.thin,
                borderRadius: radius.pill,
                backgroundColor: withAlpha(colors.secondary, 0.32),
              }}
            />
            <span style={{ color: colors.secondary, fontSize: spacing.lg }}>
              ↑
            </span>
          </div>
        </div>
      </div>
    </AnimatedAppear>
  );
};

const HookScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const productsOffset = getTranscriptOffset(scene, "productsRevealWord");
  const monthOffset = getTranscriptOffset(scene, "monthRevealWord");
  const questionOffset = getTranscriptOffset(scene, "questionRevealWord");
  const productIcons = ["📦", "🎧", "☕", "👟"];

  return (
    <VisualLane>
      <BrandText role="h2" align="center" color={colors.inkInverse}>
        Des milliers de produits
      </BrandText>
      <div style={{ display: "flex", gap: spacing.md, width: "100%" }}>
        {productIcons.map((icon, index) => (
          <ProductTile
            key={icon}
            icon={icon}
            delaySeconds={productsOffset + index * 0.16}
          />
        ))}
      </div>
      <CalendarMark delaySeconds={monthOffset} />
      <SalesResults delaySeconds={questionOffset} />
    </VisualLane>
  );
};

const BrowserMock: React.FC = () => (
  <div
    style={{
      width: "100%",
      padding: spacing.md,
      borderRadius: radius.lg,
      backgroundColor: colors.surfaceLight,
      boxShadow: `0 ${spacing.xs}px ${spacing.xl}px ${withAlpha(
        colors.ink,
        0.22,
      )}`,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: spacing.xs,
        paddingBottom: spacing.md,
        borderBottom: `${strokeWidths.hairline}px solid ${withAlpha(
          colors.ink,
          0.12,
        )}`,
      }}
    >
      {[0, 1, 2].map((item) => (
        <span
          key={item}
          style={{
            width: spacing.sm,
            height: spacing.sm,
            borderRadius: radius.pill,
            backgroundColor: colors.neutral,
          }}
        />
      ))}
      <div
        style={{
          flex: 1,
          marginLeft: spacing.sm,
          padding: spacing.xs,
          borderRadius: radius.sm,
          backgroundColor: withAlpha(colors.secondary, 0.08),
        }}
      >
        <BrandText role="label" color={colors.secondary}>
          ventes / vue d’ensemble
        </BrandText>
      </div>
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: spacing.md,
        paddingTop: spacing.md,
      }}
    >
      <div
        style={{
          width: "28%",
          display: "flex",
          flexDirection: "column",
          gap: spacing.sm,
        }}
      >
        {[0, 1, 2, 3].map((item) => (
          <span
            key={item}
            style={{
              width: `${72 + item * 4}%`,
              height: strokeWidths.medium,
              borderRadius: radius.pill,
              backgroundColor: withAlpha(colors.secondary, 0.16),
            }}
          />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          height: spacing.xxxl,
          display: "flex",
          alignItems: "flex-end",
          gap: spacing.xs,
          padding: spacing.sm,
          borderRadius: radius.md,
          backgroundColor: withAlpha(colors.secondary, 0.06),
        }}
      >
        {[0.3, 0.52, 0.42, 0.7, 0.86].map((height, index) => (
          <span
            key={index}
            style={{
              flex: 1,
              height: `${height * 100}%`,
              borderRadius: `${radius.sm}px ${radius.sm}px 0 0`,
              backgroundColor: withAlpha(colors.secondary, 0.28),
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

const RoleScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const dataOffset = getTranscriptOffset(scene, "dataRevealWord");
  const analystOffset = getTranscriptOffset(scene, "analystRevealWord");

  return (
    <VisualLane>
      <AnimatedAppear animation="slide-up">
        <BrowserMock />
      </AnimatedAppear>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: spacing.xs,
        }}
      >
        <AnimatedAppear delaySeconds={dataOffset}>
          <BrandText role="display" color={colors.inkInverse}>
            DATA
          </BrandText>
        </AnimatedAppear>
        <AnimatedAppear animation="pop" delaySeconds={analystOffset}>
          <BrandText role="display" color={colors.accent}>
            ANALYST
          </BrandText>
        </AnimatedAppear>
      </div>
    </VisualLane>
  );
};

const DataSheet: React.FC = () => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: spacing.md,
      padding: spacing.md,
      borderRadius: radius.lg,
      backgroundColor: colors.surfaceLight,
    }}
  >
    <BrandText role="label" color={colors.secondary}>
      DONNÉES BRUTES
    </BrandText>
    {["PRODUIT", "DATE", "VENTE", "STOCK"].map((label, index) => (
      <div
        key={label}
        style={{ display: "flex", gap: spacing.sm, alignItems: "center" }}
      >
        <BrandText role="label" color={withAlpha(colors.ink, 0.56)}>
          {label}
        </BrandText>
        <span
          style={{
            flex: 1,
            height: strokeWidths.thin,
            borderRadius: radius.pill,
            backgroundColor: withAlpha(colors.secondary, 0.12 + index * 0.04),
          }}
        />
      </div>
    ))}
  </div>
);

const UsefulChart: React.FC<{ readonly revealAtSeconds: number }> = ({
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
        flex: 1,
        minWidth: 0,
        padding: spacing.md,
        borderRadius: radius.lg,
        backgroundColor: colors.surfaceLight,
      }}
    >
      <BrandText role="label" color={colors.secondary}>
        INFORMATION UTILE
      </BrandText>
      <svg viewBox="0 0 260 108" width="100%" aria-hidden="true">
        <path
          d="M 8 88 C 58 82, 70 61, 112 68 S 178 40, 252 16"
          fill="none"
          stroke={colors.secondary}
          strokeWidth={strokeWidths.thick}
          strokeLinecap="round"
          strokeDasharray={300}
          strokeDashoffset={300 * (1 - draw)}
        />
        <circle cx="252" cy="16" r="10" fill={colors.accent} opacity={draw} />
      </svg>
    </div>
  );
};

const TransformationScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const rawOffset = getTranscriptOffset(scene, "rawRevealWord");
  const transformOffset = getTranscriptOffset(scene, "transformRevealWord");
  const usefulOffset = getTranscriptOffset(scene, "informationRevealWord");

  return (
    <VisualLane>
      <BrandText role="h2" align="center" color={colors.inkInverse}>
        Du brut à l’utile
      </BrandText>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing.sm,
          width: "100%",
        }}
      >
        <AnimatedAppear delaySeconds={rawOffset} style={{ flex: 1 }}>
          <DataSheet />
        </AnimatedAppear>
        <AnimatedAppear animation="pop" delaySeconds={transformOffset}>
          <span
            style={{
              color: colors.inkInverse,
              fontSize: spacing.xl,
              lineHeight: 1,
            }}
          >
            →
          </span>
        </AnimatedAppear>
        <AnimatedAppear delaySeconds={usefulOffset} style={{ flex: 1 }}>
          <UsefulChart revealAtSeconds={usefulOffset} />
        </AnimatedAppear>
      </div>
    </VisualLane>
  );
};

const AnalysisVisual: React.FC<{
  readonly kind: "trend" | "behavior" | "decision";
  readonly startFrame: number;
}> = ({ kind, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(
    frame,
    [startFrame, startFrame + secondsToFrames(durations.base, fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  if (kind === "trend") {
    return (
      <svg viewBox="0 0 220 88" width="220" height="88" aria-hidden="true">
        <path
          d="M 8 70 C 42 64, 46 39, 80 49 S 121 67, 148 35 S 183 40, 212 12"
          fill="none"
          stroke={colors.inkInverse}
          strokeWidth={strokeWidths.medium}
          strokeLinecap="round"
          strokeDasharray={250}
          strokeDashoffset={250 * (1 - progress)}
        />
      </svg>
    );
  }

  if (kind === "behavior") {
    return (
      <div style={{ display: "flex", gap: spacing.sm, alignItems: "center" }}>
        {[0, 1, 2, 3].map((item) => (
          <React.Fragment key={item}>
            <span
              style={{
                width: spacing.md,
                height: spacing.md,
                borderRadius: radius.pill,
                backgroundColor: withAlpha(
                  colors.inkInverse,
                  progress * (item === 1 ? 0.95 : 0.5),
                ),
              }}
            />
            {item < 3 ? (
              <span
                style={{
                  width: spacing.sm,
                  height: strokeWidths.hairline,
                  backgroundColor: withAlpha(colors.inkInverse, progress * 0.3),
                }}
              />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
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
        opacity: progress,
      }}
    >
      <span style={{ fontSize: spacing.xl, lineHeight: 1 }}>✓</span>
    </div>
  );
};

const AnalysisRow: React.FC<{
  readonly scene: Scene;
  readonly wordKey: string;
  readonly label: string;
  readonly kind: "trend" | "behavior" | "decision";
}> = ({ scene, wordKey, label, kind }) => {
  const delaySeconds = getTranscriptOffset(scene, wordKey);
  const { fps } = useVideoConfig();
  const startFrame = secondsToFrames(delaySeconds, fps);

  return (
    <AnimatedAppear animation="slide-up" delaySeconds={delaySeconds}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.md,
          width: "100%",
          minHeight: spacing.xxxl,
          padding: spacing.md,
          borderRadius: radius.lg,
          backgroundColor: withAlpha(colors.inkInverse, 0.08),
        }}
      >
        <BrandText role="h3" color={colors.inkInverse}>
          {label}
        </BrandText>
        <AnalysisVisual kind={kind} startFrame={startFrame} />
      </div>
    </AnimatedAppear>
  );
};

const AnalysisScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => (
  <VisualLane>
    <BrandText role="label" align="center" color={colors.inkInverse}>
      DONNER DU SENS AUX DONNÉES
    </BrandText>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing.md,
        width: "100%",
      }}
    >
      <AnalysisRow
        scene={scene}
        wordKey="trendRevealWord"
        label="Tendances"
        kind="trend"
      />
      <AnalysisRow
        scene={scene}
        wordKey="behaviorRevealWord"
        label="Comportements"
        kind="behavior"
      />
      <AnalysisRow
        scene={scene}
        wordKey="decisionRevealWord"
        label="Décisions"
        kind="decision"
      />
    </div>
  </VisualLane>
);

const NumbersGrid: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: spacing.sm,
      width: "100%",
      padding: spacing.md,
      borderRadius: radius.lg,
      backgroundColor: colors.surfaceLight,
    }}
  >
    {[0, 1, 2, 3, 4].map((row) => (
      <div
        key={row}
        style={{ display: "flex", gap: spacing.sm, alignItems: "center" }}
      >
        {[0, 1, 2, 3, 4].map((cell) => (
          <span
            key={cell}
            style={{
              flex: 1,
              height: strokeWidths.medium,
              borderRadius: radius.pill,
              backgroundColor: withAlpha(
                colors.secondary,
                row === 2 && cell > 1 && cell < 5 ? 0.4 : 0.14,
              ),
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

const InsightLens: React.FC<{ readonly revealAtSeconds: number }> = ({
  revealAtSeconds,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const startFrame = secondsToFrames(revealAtSeconds, fps);
  const progress = interpolate(
    frame,
    [startFrame, durationInFrames - 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const offset = interpolate(progress, [0, 1], [-spacing.xl, spacing.xl]);

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% + ${offset}px)`,
        top: "50%",
        width: spacing.xxxl,
        height: spacing.xxxl,
        transform: "translate(-50%, -50%)",
        border: `${strokeWidths.thick}px solid ${colors.accent}`,
        borderRadius: radius.pill,
        backgroundColor: withAlpha(colors.accent, 0.08),
        boxShadow: `0 0 0 ${spacing.xs}px ${withAlpha(colors.surfaceLight, 0.65)}`,
      }}
    />
  );
};

const InsightScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const figuresOffset = getTranscriptOffset(scene, "figuresRevealWord");

  return (
    <VisualLane>
      <BrandText role="h2" align="center" color={colors.inkInverse}>
        Pas juste des chiffres
      </BrandText>
      <div style={{ position: "relative", width: "100%" }}>
        <AnimatedAppear delaySeconds={figuresOffset}>
          <NumbersGrid />
        </AnimatedAppear>
        <InsightLens revealAtSeconds={figuresOffset} />
      </div>
    </VisualLane>
  );
};

const StoryLine: React.FC<{ readonly revealAtSeconds: number }> = ({
  revealAtSeconds,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startFrame = secondsToFrames(revealAtSeconds, fps);
  const endFrame = startFrame + secondsToFrames(durations.slow, fps);
  const draw = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg viewBox="0 0 300 150" width="100%" aria-hidden="true">
      <path
        d="M 16 128 C 62 118, 76 78, 126 88 S 206 54, 284 20"
        fill="none"
        stroke={colors.accent}
        strokeWidth={strokeWidths.thick}
        strokeLinecap="round"
        strokeDasharray={360}
        strokeDashoffset={360 * (1 - draw)}
      />
      <circle cx="284" cy="20" r="12" fill={colors.inkInverse} opacity={draw} />
    </svg>
  );
};

const ConclusionScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const searchOffset = getTranscriptOffset(scene, "searchRevealWord");
  const storyOffset = getTranscriptOffset(scene, "storyRevealWord");

  return (
    <VisualLane>
      <AnimatedAppear delaySeconds={searchOffset}>
        <BrandText role="h2" align="center" color={colors.inkInverse}>
          Il cherche ce qu’il raconte.
        </BrandText>
      </AnimatedAppear>
      <AnimatedAppear delaySeconds={storyOffset} style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.md,
            width: "100%",
            padding: spacing.md,
            borderRadius: radius.lg,
            backgroundColor: withAlpha(colors.inkInverse, 0.08),
          }}
        >
          <BrandText role="label" color={colors.inkInverse}>
            LES DONNÉES
          </BrandText>
          <BrandText role="h3" color={colors.inkInverse}>
            un motif
          </BrandText>
          <div style={{ flex: 1 }}>
            <StoryLine revealAtSeconds={storyOffset} />
          </div>
        </div>
      </AnimatedAppear>
    </VisualLane>
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
