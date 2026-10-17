/**
 * Plans 4 à 8 du montage « Data Analyst × mascotte » :
 *  4. `trend`      — identifier les tendances ;
 *  5. `behavior`   — comprendre les comportements ;
 *  6. `decision`   — aider l'entreprise à décider ;
 *  7. `numbers`    — ne pas se contenter de regarder des chiffres ;
 *  8. `conclusion` — chercher ce que les données racontent.
 *
 * Les trois premiers sont des plans courts enchaînés en coupes franches : la
 * narration énumère trois actions, le montage les énumère avec elle.
 */

import React from "react";
import { getLength, getPointAtLength } from "@remotion/paths";

/** `getPointAtLength` peut renvoyer `null` hors tracé : on se replie sur l'origine. */
const pointAt = (path: string, length: number): { x: number; y: number } =>
  getPointAtLength(path, length) ?? { x: 0, y: 0 };

import { BrandText } from "../../../components/common/BrandText";
import { colors, easings, radius, strokeWidths } from "../../../config";
import type { Scene } from "../../../scenes/types";
import { withAlpha } from "../../../utils/color";
import {
  abs,
  Appear,
  band,
  Confetti,
  H,
  Icon,
  lerp,
  Magnifier,
  MascotShot,
  rand,
  Shockwave,
  Sparkle,
  TagPill,
  useBeat,
  W,
} from "./data-analyst-mascot-kit";

/** Calque SVG plein cadre : les tracés se dessinent dans le repère de la composition. */
const Overlay: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => (
  <svg
    viewBox={`0 0 ${W} ${H}`}
    width={W}
    height={H}
    aria-hidden="true"
    style={abs(0, 0)}
  >
    {children}
  </svg>
);

/* ========================================================================== */
/*  4 · TREND — « Identifier les tendances, »                                 */
/* ========================================================================== */

const POINTS = 18;
const PANEL = { x: band.left, y: 300, w: band.right - band.left, h: 260 };
const trendPath = "M110 520 C 350 505, 560 440, 720 405 S 920 360, 970 350";

export const TrendScene: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const beat = useBeat(scene);
  const identifier = beat.at("identifier");
  const les = beat.at("les");
  const tendances = beat.at("tendances");

  const dots: React.ReactNode[] = [];
  for (let index = 0; index < POINTS; index += 1) {
    const t = index / (POINTS - 1);
    const baseline = lerp(520, 352, t) - Math.sin(t * Math.PI) * 18;
    const y = Math.max(
      PANEL.y + 28,
      Math.min(PANEL.y + PANEL.h - 28, baseline + (rand(index * 3.7 + 2) - 0.5) * 110),
    );
    dots.push(
      <Appear
        key={index}
        delay={identifier + index * 0.045}
        animation="pop"
        duration={0.2}
        style={abs(110 + t * 860 - 10, y - 10, 20, 20)}
      >
        <span
          style={{
            display: "block",
            width: 20,
            height: 20,
            borderRadius: radius.pill,
            backgroundColor: withAlpha(colors.inkInverse, 0.78),
          }}
        />
      </Appear>,
    );
  }

  return (
    <>
      <Appear
        delay={0}
        animation="slide-up"
        distance={80}
        duration={0.3}
        style={abs(PANEL.x, PANEL.y, PANEL.w, PANEL.h)}
      >
        <div
          style={{
            width: PANEL.w,
            height: PANEL.h,
            borderRadius: radius.lg,
            backgroundColor: withAlpha(colors.inkInverse, 0.08),
            border: `${strokeWidths.hairline}px solid ${withAlpha(
              colors.inkInverse,
              0.2,
            )}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          {[0, 1, 2, 3].map((line) => (
            <span
              key={line}
              style={{
                height: strokeWidths.hairline,
                backgroundColor: withAlpha(colors.inkInverse, 0.1),
              }}
            />
          ))}
        </div>
      </Appear>

      {dots}

      <Overlay>
        <path
          d={trendPath}
          pathLength={1}
          fill="none"
          stroke={colors.accent}
          strokeWidth={strokeWidths.thick}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - beat.p(les, 0.55)}
        />
      </Overlay>

      <Appear
        delay={tendances}
        animation="pop"
        style={abs(960 - 18, 350 - 18, 36, 36)}
      >
        <span
          style={{
            display: "block",
            width: 36,
            height: 36,
            borderRadius: radius.pill,
            backgroundColor: colors.accent,
            border: `${strokeWidths.medium}px solid ${colors.inkInverse}`,
          }}
        />
      </Appear>
      <Shockwave
        x={960}
        y={350}
        size={120}
        progress={beat.p(tendances, 0.5)}
      />
      <Appear
        delay={tendances}
        animation="pop"
        style={abs(band.left, 262)}
      >
        <TagPill tone="accent">TENDANCES</TagPill>
      </Appear>
      <Sparkle
        x={860}
        y={395}
        size={44}
        progress={beat.p(tendances + 0.1, 0.55)}
      />
      <Sparkle
        x={990}
        y={300}
        size={30}
        progress={beat.p(tendances + 0.25, 0.55)}
      />

      <MascotShot
        scene={scene}
        pose="point"
        attitude="confident"
        side="left"
        mirrored
        size={420}
        entrance="slide-up"
      />
    </>
  );
};

/* ========================================================================== */
/*  5 · BEHAVIOR — « comprendre les comportements »                           */
/* ========================================================================== */

type Cluster = {
  readonly cx: number;
  readonly cy: number;
  readonly count: number;
  readonly hot?: boolean;
};

const clusters: readonly Cluster[] = [
  { cx: 205, cy: 440, count: 4 },
  { cx: 440, cy: 580, count: 5, hot: true },
  { cx: 240, cy: 770, count: 4 },
];

type Person = {
  readonly x: number;
  readonly y: number;
  readonly cluster: number;
  readonly order: number;
};

const people: Person[] = [];
clusters.forEach((cluster, clusterIndex) => {
  for (let k = 0; k < cluster.count; k += 1) {
    const seed = clusterIndex * 10 + k + 1;
    const angle = (k / cluster.count) * Math.PI * 2 + rand(seed) * 0.8;
    const radiusPx = 72 + rand(seed * 2.1) * 34;
    people.push({
      x: cluster.cx + Math.cos(angle) * radiusPx,
      y: cluster.cy + Math.sin(angle) * radiusPx,
      cluster: clusterIndex,
      order: people.length,
    });
  }
});

const edges: Array<readonly [Person, Person, number]> = [];
clusters.forEach((cluster, clusterIndex) => {
  const members = people.filter((person) => person.cluster === clusterIndex);
  members.forEach((person, k) => {
    edges.push([person, members[(k + 1) % members.length], clusterIndex]);
  });
  edges.push([members[0], members[Math.floor(members.length / 2)], clusterIndex]);
});

export const BehaviorScene: React.FC<{ readonly scene: Scene }> = ({
  scene,
}) => {
  const beat = useBeat(scene);
  const comprendre = beat.at("comprendre");
  const comportements = beat.at("comportements");
  const hotAt = comportements + 0.3;
  const hot = beat.p(hotAt, 0.25) > 0.5;
  const hotCluster = clusters[1];

  const travelers = edges
    .filter((edge) => clusters[edge[2]].hot)
    .map((edge, index) => {
      const t = ((beat.frame / 18 + index * 0.27) % 1) * beat.p(hotAt, 0.2);

      return (
        <circle
          key={index}
          cx={lerp(edge[0].x, edge[1].x, t)}
          cy={lerp(edge[0].y, edge[1].y, t)}
          r={9}
          fill={colors.inkInverse}
        />
      );
    });

  return (
    <>
      <Overlay>
        {edges.map((edge, index) => (
          <line
            key={index}
            x1={edge[0].x}
            y1={edge[0].y}
            x2={edge[1].x}
            y2={edge[1].y}
            pathLength={1}
            stroke={
              clusters[edge[2]].hot && hot
                ? colors.accent
                : withAlpha(colors.inkInverse, 0.45)
            }
            strokeWidth={strokeWidths.thin}
            strokeLinecap="round"
            strokeDasharray={1}
            strokeDashoffset={1 - beat.p(comportements + index * 0.015, 0.35)}
          />
        ))}
        <circle
          cx={hotCluster.cx}
          cy={hotCluster.cy}
          r={142}
          pathLength={1}
          fill="none"
          stroke={colors.accent}
          strokeWidth={strokeWidths.medium}
          strokeDasharray="0.04 0.02"
          strokeDashoffset={1 - beat.p(hotAt, 0.45)}
          opacity={beat.p(hotAt, 0.2)}
        />
        {travelers}
      </Overlay>

      {people.map((person) => (
        <Appear
          key={person.order}
          delay={comprendre + person.order * 0.04}
          animation="pop"
          duration={0.22}
          style={abs(person.x - 32, person.y - 32, 64, 64)}
        >
          <Icon
            kind="user"
            size={64}
            color={
              clusters[person.cluster].hot && hot
                ? colors.accent
                : colors.inkInverse
            }
            strokeWidth={3.4}
          />
        </Appear>
      ))}

      <Appear
        delay={comportements}
        animation="pop"
        style={abs(band.left, 262)}
      >
        <TagPill tone="light">COMPORTEMENTS</TagPill>
      </Appear>

      <MascotShot
        scene={scene}
        pose="thinking"
        attitude="curious"
        size={440}
        entrance="slide-up"
      />
    </>
  );
};

/* ========================================================================== */
/*  6 · DECISION — « aider l'entreprise à prendre de meilleures décisions »   */
/* ========================================================================== */

const company = { x: 150, y: 610 };
const fork = { x: 330, y: 610 };
const optionA = { x: 520, y: 430 };
const optionB = { x: 520, y: 790 };
const NODE_R = 56;

export const DecisionScene: React.FC<{ readonly scene: Scene }> = ({
  scene,
}) => {
  const beat = useBeat(scene);
  const entreprise = beat.at("l'entreprise");
  const a = beat.at("à");
  const prendre = beat.at("prendre");
  const meilleures = beat.at("meilleures");
  const decisions = beat.at("décisions");

  const highlight = beat.p(meilleures, 0.3);
  const confettiSeconds = (beat.frame - Math.round(decisions * beat.fps)) / beat.fps;

  const node = (
    at: { x: number; y: number },
    kind: "shop" | "cart" | "box",
    delay: number,
    muted = 0,
    ring = false,
  ): React.ReactNode => (
    <Appear
      delay={delay}
      animation="pop"
      style={abs(at.x - NODE_R, at.y - NODE_R, NODE_R * 2, NODE_R * 2)}
    >
      <div
        style={{
          width: NODE_R * 2,
          height: NODE_R * 2,
          borderRadius: radius.pill,
          backgroundColor: colors.inkInverse,
          border: ring
            ? `${strokeWidths.medium}px solid ${colors.accent}`
            : undefined,
          opacity: 1 - muted * 0.65,
          boxShadow: `0 12px 30px ${withAlpha(colors.ink, 0.35)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon kind={kind} size={64} color={colors.secondary} strokeWidth={3.2} />
      </div>
    </Appear>
  );

  return (
    <>
      <Overlay>
        <path
          d={`M${company.x + NODE_R} ${company.y} L${fork.x - 14} ${fork.y}`}
          pathLength={1}
          fill="none"
          stroke={withAlpha(colors.inkInverse, 0.7)}
          strokeWidth={strokeWidths.medium}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - beat.p(a, 0.2)}
        />
        <path
          d={`M${fork.x} ${fork.y} C ${fork.x + 90} ${fork.y}, ${optionB.x - 110} ${optionB.y}, ${optionB.x - NODE_R} ${optionB.y}`}
          pathLength={1}
          fill="none"
          stroke={withAlpha(colors.inkInverse, lerp(0.7, 0.25, highlight))}
          strokeWidth={strokeWidths.medium}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - beat.p(prendre, 0.4)}
        />
        <path
          d={`M${fork.x} ${fork.y} C ${fork.x + 90} ${fork.y}, ${optionA.x - 110} ${optionA.y}, ${optionA.x - NODE_R} ${optionA.y}`}
          pathLength={1}
          fill="none"
          stroke={highlight > 0 ? colors.accent : withAlpha(colors.inkInverse, 0.7)}
          strokeWidth={lerp(strokeWidths.medium, strokeWidths.thick, highlight)}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - beat.p(prendre, 0.4)}
        />
      </Overlay>

      {node(company, "shop", entreprise)}
      <Appear
        delay={a + 0.1}
        animation="pop"
        duration={0.2}
        style={abs(fork.x - 14, fork.y - 14, 28, 28)}
      >
        <span
          style={{
            display: "block",
            width: 28,
            height: 28,
            borderRadius: radius.pill,
            backgroundColor: colors.inkInverse,
          }}
        />
      </Appear>
      {node(optionA, "cart", prendre + 0.3, 0, highlight > 0.5)}
      {node(optionB, "box", prendre + 0.38, highlight)}

      <Appear
        delay={decisions}
        animation="pop"
        style={abs(optionA.x + 18, optionA.y - 92, 64, 64)}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: radius.pill,
            backgroundColor: colors.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 10px 24px ${withAlpha(colors.ink, 0.35)}`,
          }}
        >
          <Icon kind="check" size={38} color={colors.inkInverse} strokeWidth={5} />
        </div>
      </Appear>
      <Appear
        delay={decisions + 0.05}
        animation="slide-right"
        style={abs(band.left, 262)}
      >
        <TagPill tone="accent">DÉCISIONS</TagPill>
      </Appear>
      <Shockwave
        x={optionA.x}
        y={optionA.y}
        size={150}
        progress={beat.p(decisions, 0.55)}
      />
      <Sparkle
        x={optionA.x + 110}
        y={optionA.y + 40}
        size={46}
        progress={beat.p(decisions + 0.1, 0.6)}
      />
      <Sparkle
        x={optionA.x - 90}
        y={optionA.y - 80}
        size={34}
        progress={beat.p(decisions + 0.25, 0.6)}
        color={colors.accent}
      />
      <Confetti
        x={band.left}
        y={262}
        width={band.right - band.left}
        fall={640}
        seconds={confettiSeconds}
      />

      <MascotShot
        scene={scene}
        pose="explaining"
        attitude="friendly"
        size={470}
        to={decisions}
        entrance="slide-up"
      />
      <MascotShot
        scene={scene}
        from={decisions}
        pose="happy"
        attitude="excited"
        size={470}
        halo="accent"
        entrance="pop"
      />
    </>
  );
};

/* ========================================================================== */
/*  7 · NUMBERS — « En clair, il ne se contente pas de regarder des chiffres. »*/
/* ========================================================================== */

const GRID_COLS = 6;
const GRID_ROWS = 9;
const CELL_W = 156;
const CELL_H = 66;
const GRID_X0 = band.left;
const GRID_Y0 = 296;
const pattern: ReadonlyArray<readonly [number, number]> = [
  [8, 0],
  [6, 1],
  [5, 2],
  [3, 3],
  [2, 4],
  [0, 5],
];

const cellCenter = (row: number, col: number): { x: number; y: number } => ({
  x: GRID_X0 + col * CELL_W + CELL_W / 2,
  y: GRID_Y0 + row * CELL_H + CELL_H / 2,
});

export const NumbersScene: React.FC<{ readonly scene: Scene }> = ({
  scene,
}) => {
  const beat = useBeat(scene);
  const des = beat.at("des");
  const chiffres = beat.at("chiffres");
  const freezeFrame = Math.round(chiffres * beat.fps);
  const tick = Math.floor(Math.min(beat.frame, freezeFrame) / 3);

  // La loupe parcourt le motif, cellule après cellule.
  const search = beat.p(chiffres + 0.05, 0.75, easings.linear);
  const searchT = search * (pattern.length - 1);
  const searchIndex = Math.min(pattern.length - 2, Math.floor(searchT));
  const from = cellCenter(pattern[searchIndex][0], pattern[searchIndex][1]);
  const to = cellCenter(pattern[searchIndex + 1][0], pattern[searchIndex + 1][1]);
  const lens = {
    x: lerp(from.x, to.x, searchT - searchIndex),
    y: lerp(from.y, to.y, searchT - searchIndex),
  };

  const cells: React.ReactNode[] = [];
  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let col = 0; col < GRID_COLS; col += 1) {
      const patternIndex = pattern.findIndex(
        (cell) => cell[0] === row && cell[1] === col,
      );
      const lit = patternIndex >= 0 && search * pattern.length > patternIndex;
      const value = 10 + Math.floor(rand(row * 97 + col * 13 + tick * 7.31) * 90);
      cells.push(
        <div
          key={`${row}-${col}`}
          style={{
            ...abs(
              GRID_X0 + col * CELL_W + 8,
              GRID_Y0 + row * CELL_H + 6,
              CELL_W - 16,
              CELL_H - 12,
            ),
            borderRadius: radius.sm,
            backgroundColor: lit ? colors.accent : "transparent",
            transform: lit ? "scale(1.12)" : undefined,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BrandText
            role="code"
            color={lit ? colors.inkInverse : withAlpha(colors.inkInverse, 0.32)}
            style={{ fontSize: 40 }}
          >
            {String(value)}
          </BrandText>
        </div>,
      );
    }
  }

  const trace = pattern
    .map((cell, index) => {
      const point = cellCenter(cell[0], cell[1]);

      return `${index === 0 ? "M" : "L"}${point.x} ${point.y}`;
    })
    .join(" ");

  return (
    <>
      <div style={{ opacity: beat.p(0, 0.35) }}>{cells}</div>
      <Overlay>
        <path
          d={trace}
          pathLength={1}
          fill="none"
          stroke={colors.accent}
          strokeWidth={strokeWidths.medium}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={1 - search}
        />
      </Overlay>
      <Magnifier
        x={lens.x}
        y={lens.y}
        size={96}
        opacity={beat.p(chiffres, 0.15)}
      />

      <MascotShot
        scene={scene}
        pose="explaining"
        attitude="serious"
        size={440}
        to={des}
        entrance="slide-up"
      />
      <MascotShot
        scene={scene}
        from={des}
        pose="surprised"
        attitude="surprised"
        size={440}
        entrance="pop"
      />
    </>
  );
};

/* ========================================================================== */
/*  8 · CONCLUSION — « Il cherche ce qu'il raconte. »                         */
/* ========================================================================== */

const storyPath =
  "M90 820 C 190 800, 220 690, 300 680 S 400 600, 470 560 S 580 480, 640 470";
const storyLength = getLength(storyPath);
const storyDots = [0.14, 0.3, 0.46, 0.62, 0.78, 0.94];

export const ConclusionScene: React.FC<{ readonly scene: Scene }> = ({
  scene,
}) => {
  const beat = useBeat(scene);
  const cherche = beat.at("cherche");
  const raconte = beat.at("raconte");
  const draw = beat.p(cherche - 0.05, raconte - cherche + 0.05, easings.linear);
  const lensPoint = pointAt(storyPath, storyLength * draw);
  const confettiSeconds = (beat.frame - Math.round(raconte * beat.fps)) / beat.fps;

  return (
    <>
      <Shockwave
        x={band.right - 260}
        y={band.bottom - 260}
        size={400}
        progress={beat.p(0, 0.7)}
      />
      <Overlay>
        <path
          d={storyPath}
          pathLength={1}
          fill="none"
          stroke={colors.accent}
          strokeWidth={strokeWidths.thick}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
        {storyDots.map((fraction) => {
          const point = pointAt(storyPath, storyLength * fraction);

          return (
            <circle
              key={fraction}
              cx={point.x}
              cy={point.y}
              r={11}
              fill={colors.inkInverse}
              opacity={draw >= fraction ? 1 : 0}
            />
          );
        })}
      </Overlay>
      <Magnifier
        x={lensPoint.x}
        y={lensPoint.y}
        size={92}
        opacity={(1 - beat.p(raconte, 0.15)) * beat.p(0, 0.15)}
      />

      {/* « raconte » : la tendance devient une idée. */}
      <Appear
        delay={raconte}
        animation="pop"
        style={abs(330, 262, 340, 176)}
      >
        <div style={{ position: "relative", width: 340, height: 176 }}>
          <div
            style={{
              width: 340,
              height: 176,
              borderRadius: radius.lg,
              backgroundColor: colors.inkInverse,
              boxShadow: `0 18px 40px ${withAlpha(colors.ink, 0.35)}`,
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "0 32px",
            }}
          >
            <Icon kind="bulb" size={84} color={colors.accent} strokeWidth={3.4} />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <span
                style={{
                  height: 14,
                  borderRadius: radius.pill,
                  backgroundColor: withAlpha(colors.secondary, 0.55),
                }}
              />
              <span
                style={{
                  width: "62%",
                  height: 14,
                  borderRadius: radius.pill,
                  backgroundColor: withAlpha(colors.secondary, 0.25),
                }}
              />
            </div>
          </div>
          <svg
            viewBox="0 0 40 40"
            width={40}
            height={40}
            aria-hidden="true"
            style={abs(250, 166)}
          >
            <path d="M0 0 H40 L26 38 Z" fill={colors.inkInverse} />
          </svg>
        </div>
      </Appear>
      <Shockwave
        x={500}
        y={350}
        size={200}
        progress={beat.p(raconte, 0.6)}
      />
      <Sparkle
        x={720}
        y={300}
        size={50}
        progress={beat.p(raconte + 0.1, 0.6)}
        color={colors.accent}
      />
      <Sparkle
        x={300}
        y={400}
        size={36}
        progress={beat.p(raconte + 0.25, 0.6)}
      />
      <Confetti
        x={band.left}
        y={262}
        width={band.right - band.left}
        fall={660}
        seconds={confettiSeconds}
        count={22}
      />

      <MascotShot
        scene={scene}
        pose="happy"
        attitude="excited"
        size={520}
        halo="accent"
        entrance="slide-up"
      />
    </>
  );
};
