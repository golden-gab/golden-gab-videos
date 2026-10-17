/**
 * Plans 1 à 3 du montage « Data Analyst × mascotte » :
 *  1. `hook`      — le mur de produits, puis la question ;
 *  2. `role`      — l'arrivée du data analyst ;
 *  3. `transform` — des données brutes aux informations utiles.
 *
 * Chaque révélation se cale sur le mot prononcé (`beat.at("mot")`). Les
 * visuels sont locaux à la vidéo (règle 12) ; ils n'utilisent que les tokens
 * et les courbes du design system.
 */

import React from "react";
import { noise2D } from "@remotion/noise";

import { BrandText } from "../../../components/common/BrandText";
import {
  colors,
  durations,
  easings,
  radius,
  strokeWidths,
} from "../../../config";
import type { Scene } from "../../../scenes/types";
import { withAlpha } from "../../../utils/color";
import {
  abs,
  Appear,
  band,
  H,
  Icon,
  lerp,
  getSceneLane,
  getStage,
  Magnifier,
  MascotShot,
  rand,
  Shockwave,
  Sparkle,
  TagPill,
  useBeat,
  W,
  type IconKind,
} from "./data-analyst-mascot-kit";

/* ========================================================================== */
/*  1 · HOOK — « Imaginez une entreprise… lesquels se vendent vraiment ? »    */
/* ========================================================================== */

const TILE = 128;
const GAP = 12;
const COLS = 7;
const ROWS = 14;
const STEP = TILE + GAP;
const GRID_X = (W - (COLS * TILE + (COLS - 1) * GAP)) / 2;
const GRID_Y = 20;
const wallKinds: IconKind[] = [
  "box",
  "bag",
  "cup",
  "shirt",
  "headphones",
  "tag",
  "cart",
];
const CHOSEN = { row: 3, col: 1 } as const;
const chosenCenter = {
  x: GRID_X + CHOSEN.col * STEP + TILE / 2,
  y: GRID_Y + CHOSEN.row * STEP + TILE / 2,
};
const months = [
  "JAN",
  "FÉV",
  "MAR",
  "AVR",
  "MAI",
  "JUN",
  "JUL",
  "AOÛ",
  "SEP",
  "OCT",
  "NOV",
  "DÉC",
];

/** Le mur : des produits qui pleuvent, rangée après rangée. */
const ProductWall: React.FC<{ readonly floodAt: number }> = ({ floodAt }) => {
  const tiles: React.ReactNode[] = [];

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const seed = row * COLS + col + 1;
      const kind = wallKinds[Math.floor(rand(seed * 3.1) * wallKinds.length)];
      tiles.push(
        <Appear
          key={seed}
          delay={floodAt + row * 0.05 + rand(seed) * 0.2}
          animation="slide-down"
          distance={180}
          style={abs(GRID_X + col * STEP, GRID_Y + row * STEP, TILE, TILE)}
        >
          <div
            style={{
              width: TILE,
              height: TILE,
              borderRadius: radius.md,
              backgroundColor: withAlpha(colors.inkInverse, 0.1),
              border: `${strokeWidths.hairline}px solid ${withAlpha(
                colors.inkInverse,
                0.22,
              )}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              kind={kind}
              size={72}
              color={withAlpha(colors.inkInverse, 0.85)}
            />
          </div>
        </Appear>,
      );
    }
  }

  return <>{tiles}</>;
};

/** Bulle de pensée : le nuage, sa traîne vers la tête, son contenu centré. */
const ThoughtCloud: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => (
  <div style={{ position: "relative", width: 340, height: 260 }}>
    <svg
      viewBox="0 0 340 260"
      width={340}
      height={260}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        filter: `drop-shadow(0 14px 24px ${withAlpha(colors.ink, 0.3)})`,
      }}
    >
      <g fill={colors.inkInverse}>
        <circle cx="72" cy="118" r="52" />
        <circle cx="128" cy="76" r="56" />
        <circle cx="198" cy="66" r="58" />
        <circle cx="262" cy="100" r="52" />
        <circle cx="276" cy="148" r="40" />
        <circle cx="200" cy="148" r="54" />
        <circle cx="126" cy="152" r="48" />
        <circle cx="266" cy="222" r="14" />
        <circle cx="290" cy="244" r="9" />
      </g>
    </svg>
    <div
      style={{
        ...abs(20, 18, 296, 180),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  </div>
);

const scanPath: ReadonlyArray<readonly [number, number]> = [
  [430, 660],
  [250, 340],
  [430, 440],
  [chosenCenter.x, chosenCenter.y],
];

export const HookScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const beat = useBeat(scene);
  const entreprise = beat.at("entreprise");
  const milliers = beat.at("milliers");
  const chaque = beat.at("chaque");
  const mais = beat.at("mais");
  const lesquels = beat.at("lesquels");
  const vendent = beat.at("vendent");

  const monthIndex = Math.min(
    months.length - 1,
    Math.floor(beat.p(chaque, 0.74, easings.linear) * months.length),
  );
  const chipOut = 1 - beat.p(mais, 0.2);
  const storyCloudOut = 1 - beat.p(milliers - 0.1, 0.18);

  // La loupe fouille le mur, puis se pose sur un produit.
  const scan = beat.p(lesquels + 0.1, 0.95, easings.linear);
  const scanT = scan * (scanPath.length - 1);
  const scanIndex = Math.min(scanPath.length - 2, Math.floor(scanT));
  const scanLocal = easings.entrance(scanT - scanIndex);
  const lensX = lerp(
    scanPath[scanIndex][0],
    scanPath[scanIndex + 1][0],
    scanLocal,
  );
  const lensY = lerp(
    scanPath[scanIndex][1],
    scanPath[scanIndex + 1][1],
    scanLocal,
  );

  const pulseStart = Math.round(vendent * beat.fps);
  const pulse =
    beat.frame >= pulseStart ? ((beat.frame - pulseStart) % 24) / 24 : 1;

  return (
    <>
      <ProductWall floodAt={milliers} />
      <div
        style={{
          ...abs(0, 0, W, H),
          backgroundColor: withAlpha(colors.surfaceDark, 0.84),
          opacity: beat.p(mais, 0.3),
        }}
      />

      {/* « chaque mois » : le calendrier qui défile. */}
      <Appear
        delay={chaque}
        animation="slide-right"
        style={{ ...abs(band.left, 300), opacity: chipOut }}
      >
        <TagPill icon="calendar">
          CHAQUE MOIS
          <span
            style={{
              display: "inline-block",
              minWidth: 96,
              marginLeft: 14,
              color: colors.accent,
            }}
          >
            {months[monthIndex]}
          </span>
        </TagPill>
      </Appear>

      {/* « Imaginez une entreprise » → la boutique dans une bulle de pensée. */}
      <Appear
        delay={entreprise}
        animation="pop"
        style={{ ...abs(440, 262), opacity: storyCloudOut }}
      >
        <ThoughtCloud>
          <Icon
            kind="shop"
            size={120}
            color={colors.secondary}
            strokeWidth={3.2}
          />
        </ThoughtCloud>
      </Appear>

      {/* « lesquels » : la question, la loupe, l'élu. */}
      <Appear delay={lesquels} animation="pop" style={abs(440, 262)}>
        <ThoughtCloud>
          <BrandText role="display" color={colors.accent}>
            ?
          </BrandText>
        </ThoughtCloud>
      </Appear>
      <div
        style={{
          ...abs(
            chosenCenter.x - TILE * 0.5,
            chosenCenter.y - TILE * 0.5,
            TILE,
            TILE,
          ),
          transform: `scale(${lerp(1, 1.6, beat.p(lesquels + 0.7, 0.3))})`,
        }}
      >
        <Appear delay={lesquels + 0.7} animation="pop">
          <div
            style={{
              width: TILE,
              height: TILE,
              borderRadius: radius.lg,
              backgroundColor: colors.surfaceLight,
              border: `${strokeWidths.medium}px solid ${colors.accent}`,
              boxShadow: `0 20px 50px ${withAlpha(colors.ink, 0.4)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              kind="bag"
              size={76}
              color={colors.secondary}
              strokeWidth={3.2}
            />
          </div>
        </Appear>
      </div>
      {pulse < 1 ? (
        <div
          style={{
            ...abs(
              chosenCenter.x - TILE * 0.8,
              chosenCenter.y - TILE * 0.8,
              TILE * 1.6,
              TILE * 1.6,
            ),
            borderRadius: radius.xl,
            border: `${strokeWidths.medium}px solid ${colors.accent}`,
            opacity: 1 - pulse,
            transform: `scale(${lerp(1, 1.45, pulse)})`,
          }}
        />
      ) : null}
      <Magnifier
        x={lensX}
        y={lensY}
        size={130}
        opacity={beat.p(lesquels + 0.05, 0.15)}
      />

      <MascotShot
        scene={scene}
        pose="thinking"
        attitude="curious"
        size={520}
        lift={-getStage(getSceneLane(scene)).dy}
        delay={0.1}
        entrance="slide-up"
      />
    </>
  );
};

/* ========================================================================== */
/*  2 · ROLE — « C'est là qu'intervient le data analyst. »                    */
/* ========================================================================== */

const dashboardBars = [0.35, 0.5, 0.42, 0.7, 0.62, 0.92];

const DashboardMock: React.FC<{ readonly growFrom: number; readonly scene: Scene }> =
  ({ growFrom, scene }) => {
    const beat = useBeat(scene);

    return (
      <div
        style={{
          width: 560,
          height: 290,
          borderRadius: radius.lg,
          backgroundColor: colors.surfaceLight,
          boxShadow: `0 24px 60px ${withAlpha(colors.ink, 0.4)}`,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              style={{
                width: 16,
                height: 16,
                borderRadius: radius.pill,
                backgroundColor: dot === 0 ? colors.accent : colors.neutral,
              }}
            />
          ))}
          <span
            style={{
              flex: 1,
              height: 22,
              marginLeft: 12,
              borderRadius: radius.pill,
              backgroundColor: withAlpha(colors.secondary, 0.1),
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 22, flex: 1 }}>
          <div
            style={{
              width: 130,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {[0.9, 0.7, 0.8].map((width, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  borderRadius: radius.sm,
                  backgroundColor: withAlpha(colors.secondary, 0.08),
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: `${width * 100}%`,
                    height: 8,
                    borderRadius: radius.pill,
                    backgroundColor: withAlpha(colors.secondary, 0.35),
                  }}
                />
                <span
                  style={{
                    width: "45%",
                    height: 8,
                    borderRadius: radius.pill,
                    backgroundColor: withAlpha(colors.secondary, 0.15),
                  }}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              gap: 12,
              padding: "0 6px",
              borderBottom: `${strokeWidths.thin}px solid ${withAlpha(
                colors.secondary,
                0.2,
              )}`,
            }}
          >
            {dashboardBars.map((height, index) => (
              <span
                key={index}
                style={{
                  flex: 1,
                  height: `${height * beat.p(growFrom + index * 0.07, 0.4) * 100}%`,
                  borderRadius: `${radius.sm}px ${radius.sm}px 0 0`,
                  backgroundColor:
                    index === dashboardBars.length - 1
                      ? colors.accent
                      : withAlpha(colors.secondary, 0.4),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

export const RoleScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const beat = useBeat(scene);
  const intervient = beat.at("qu'intervient");
  const dataAt = beat.at("data");
  const analystAt = beat.at("analyst");

  const slam = (at: number): React.CSSProperties => {
    const progress = beat.p(at, 0.28);

    return {
      opacity: progress,
      transform: `scale(${lerp(1.55, 1, progress)})`,
      transformOrigin: "left center",
    };
  };

  return (
    <>
      <Shockwave
        x={band.right - 240}
        y={band.bottom - 240}
        size={420}
        progress={beat.p(0, 0.7)}
      />
      <Appear
        delay={0.05}
        animation="slide-right"
        duration={durations.base}
        distance={260}
        style={abs(band.left, 300)}
      >
        <DashboardMock growFrom={intervient} scene={scene} />
      </Appear>

      <div style={{ ...abs(band.left, 622), ...slam(dataAt) }}>
        <BrandText role="display" color={colors.inkInverse}>
          DATA
        </BrandText>
      </div>
      <div style={{ ...abs(band.left, 786), ...slam(analystAt) }}>
        <BrandText role="display" color={colors.accent}>
          ANALYST
        </BrandText>
        <div
          style={{
            marginTop: 8,
            height: strokeWidths.thick,
            width: `${beat.p(analystAt + 0.15, 0.35) * 100}%`,
            borderRadius: radius.pill,
            backgroundColor: colors.inkInverse,
          }}
        />
      </div>

      <MascotShot
        scene={scene}
        pose="point"
        attitude="confident"
        size={480}
        halo="accent"
        entrance="slide-up"
      />
    </>
  );
};

/* ========================================================================== */
/*  3 · TRANSFORM — « transformer des données brutes en informations utiles » */
/* ========================================================================== */

const CHIP_W = 76;
const CHIP_H = 36;
const CHIP_PITCH_X = 88;
const CHIP_PITCH_Y = 42;
const BASE_Y = 900;
const barHeights = [2, 3, 3, 4, 5, 5];
const chipOrigin = { x: 930, y: 340 };

type ChipSlot = {
  readonly col: number;
  readonly row: number;
  readonly index: number;
};

const chipSlots: ChipSlot[] = [];
barHeights.forEach((height, col) => {
  for (let row = 0; row < height; row += 1) {
    chipSlots.push({ col, row, index: chipSlots.length });
  }
});

const barTopY = (col: number): number =>
  BASE_Y - CHIP_H - (barHeights[col] - 1) * CHIP_PITCH_Y;
const barCenterX = (col: number): number =>
  band.left + col * CHIP_PITCH_X + CHIP_W / 2;

const Gear: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly angle: number;
  readonly opacity: number;
}> = ({ x, y, size, angle, opacity }) => (
  <svg
    viewBox="-50 -50 100 100"
    width={size}
    height={size}
    aria-hidden="true"
    style={{
      position: "absolute",
      left: x - size / 2,
      top: y - size / 2,
      opacity,
      transform: `rotate(${angle}deg)`,
    }}
  >
    {[0, 1, 2, 3, 4, 5, 6, 7].map((tooth) => (
      <rect
        key={tooth}
        x={-7}
        y={-47}
        width={14}
        height={18}
        rx={3}
        fill={colors.inkInverse}
        transform={`rotate(${tooth * 45})`}
      />
    ))}
    <circle
      r={32}
      fill="none"
      stroke={colors.inkInverse}
      strokeWidth={11}
    />
    <circle r={11} fill={colors.accent} />
  </svg>
);

export const TransformScene: React.FC<{ readonly scene: Scene }> = ({
  scene,
}) => {
  const beat = useBeat(scene);
  const transformer = beat.at("transformer");
  const donnees = beat.at("données");
  const brutes = beat.at("brutes");
  const informations = beat.at("informations");
  const utiles = beat.at("utiles");

  const gearIn = beat.p(transformer, 0.3);
  const gearOut = 1 - beat.p(informations + 1.3, 0.3);
  const gearSpeed = beat.frame * lerp(3, 9, beat.p(informations, 0.4));
  const rawLabelOut = 1 - beat.p(informations, 0.2);
  const accentPulse = beat.p(utiles, 0.25);
  const bump = 1 + Math.sin(accentPulse * Math.PI) * 0.1;

  const chips = chipSlots.map((slot) => {
    const seed = slot.index + 1;
    const chaos = {
      x: lerp(band.left, 480, rand(seed * 2.3)),
      y: lerp(380, 780, rand(seed * 4.7 + 1)),
      rotation: (rand(seed * 5.1) - 0.5) * 70,
    };
    const arrive = beat.p(donnees + slot.index * 0.022, 0.4);
    const snap = beat.p(
      informations + slot.col * 0.07 + slot.row * 0.012,
      0.55,
    );
    const amplitude =
      lerp(10, 26, beat.p(brutes, 0.3, easings.linear)) * (1 - snap);
    const jitterX = noise2D("chip-x", seed, beat.frame * 0.04) * amplitude;
    const jitterY = noise2D("chip-y", seed, beat.frame * 0.04) * amplitude;
    const slotX = band.left + slot.col * CHIP_PITCH_X;
    const slotY = BASE_Y - CHIP_H - slot.row * CHIP_PITCH_Y;
    const x = lerp(lerp(chipOrigin.x, chaos.x, arrive) + jitterX, slotX, snap);
    const y = lerp(lerp(chipOrigin.y, chaos.y, arrive) + jitterY, slotY, snap);
    const rotation = lerp(chaos.rotation + jitterX * 0.6, 0, snap);
    const isAccent = slot.col === barHeights.length - 1;

    return (
      <div
        key={slot.index}
        style={{
          ...abs(x, y, CHIP_W, CHIP_H),
          borderRadius: radius.sm / 2,
          backgroundColor: withAlpha(colors.inkInverse, lerp(0.3, 0.96, snap)),
          opacity: arrive,
          transform: `rotate(${rotation}deg) scale(${isAccent ? bump : 1})`,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          paddingLeft: 12,
        }}
      >
        <span
          style={{
            width: "52%",
            height: 7,
            borderRadius: radius.pill,
            backgroundColor: withAlpha(colors.secondary, 0.4),
          }}
        />
        {isAccent ? (
          <span
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: colors.accent,
              opacity: accentPulse,
            }}
          />
        ) : null}
      </div>
    );
  });

  const trend = barHeights
    .map(
      (_, col) =>
        `${col === 0 ? "M" : "L"}${barCenterX(col)} ${barTopY(col) - 26}`,
    )
    .join(" ");

  return (
    <>
      {/* Les axes du graphique à venir. */}
      <div
        style={{
          ...abs(
            band.left,
            BASE_Y + 6,
            (barHeights.length * CHIP_PITCH_X - 12) * beat.p(0.1, 0.5),
            strokeWidths.thin,
          ),
          borderRadius: radius.pill,
          backgroundColor: withAlpha(colors.inkInverse, 0.4),
        }}
      />

      <Gear
        x={900}
        y={365}
        size={130}
        angle={gearSpeed}
        opacity={gearIn * gearOut}
      />

      <Appear
        delay={donnees}
        animation="slide-right"
        style={{ ...abs(band.left, 300), opacity: rawLabelOut }}
      >
        <TagPill tone="ghost">DONNÉES BRUTES</TagPill>
      </Appear>
      <Appear
        delay={informations}
        animation="pop"
        style={abs(band.left, 300)}
      >
        <TagPill tone="accent" icon="check">
          INFORMATIONS UTILES
        </TagPill>
      </Appear>

      {chips}

      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        aria-hidden="true"
        style={abs(0, 0)}
      >
        <path
          d={trend}
          pathLength={1}
          fill="none"
          stroke={colors.accent}
          strokeWidth={strokeWidths.medium}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={1 - beat.p(utiles, 0.45)}
        />
      </svg>

      <Appear
        delay={utiles + 0.1}
        animation="pop"
        style={abs(
          barCenterX(barHeights.length - 1) - 34,
          barTopY(barHeights.length - 1) - 118,
          68,
          68,
        )}
      >
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: radius.pill,
            backgroundColor: colors.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 10px 24px ${withAlpha(colors.ink, 0.35)}`,
          }}
        >
          <Icon kind="check" size={40} color={colors.inkInverse} strokeWidth={5} />
        </div>
      </Appear>

      <Sparkle
        x={150}
        y={650}
        size={46}
        progress={beat.p(informations + 0.25, 0.6)}
      />
      <Sparkle
        x={470}
        y={600}
        size={34}
        progress={beat.p(informations + 0.5, 0.6)}
      />
      <Sparkle
        x={300}
        y={560}
        size={28}
        progress={beat.p(utiles + 0.1, 0.6)}
        color={colors.accent}
      />

      <MascotShot
        scene={scene}
        pose="explaining"
        attitude="friendly"
        size={470}
        delay={0.15}
        entrance="slide-up"
      />
    </>
  );
};
