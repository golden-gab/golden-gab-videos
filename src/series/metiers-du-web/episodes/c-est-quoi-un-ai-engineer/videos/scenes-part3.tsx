/**
 * Scènes 19 à 27 — « C'est quoi un AI engineer »
 *
 * Bloc 3 : la différence chat / chien, « un exemple parmi tant d'autres »,
 * les domaines d'application, puis la chute (attention, « et toi ? »).
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

import {
  abs,
  Art,
  Burst,
  LibIcon,
  lerp,
  lit,
  punch,
  Shockwave,
  Sparkle,
  useWordClock,
  ZoneMascot,
} from "../../../../../components/motion";
import { colors, radius } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { Gear, NotEqual, Pill, Shot } from "../../../../web-story/kit";
import {
  AiBadge,
  Basket,
  Bus,
  EyeShape,
  IconTile,
  JobCard,
  Magnet,
  MedCross,
  PhotoTile,
  QuestionMark,
  RoleCard,
} from "../../../kit";
import { aiEngineerTranscript } from "../data/transcript.ts";

type BeatProps = { readonly scene: Scene };

const useClock = (scene: Scene) => useWordClock(scene, aiEngineerTranscript);

/* -------------------------------------------------------------------------- */
/*  19 · « différence. »                                                       */
/* -------------------------------------------------------------------------- */
export const Beat19: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("différence", 0);
  const pop = punch(clock, t, 0.25, 0.45);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={460}>
        <div style={abs(0, 60, 330, 330)}>
          <PhotoTile size={330} kind="cat" on={1} />
        </div>
        <div style={{ ...abs(368, 130, 200, 200), transform: `scale(${pop})` }}>
          <NotEqual size={200} />
        </div>
        <div style={abs(606, 60, 330, 330)}>
          <PhotoTile size={330} kind="dog" on={1} />
        </div>
        <Burst x={468} y={230} radius={130} progress={clock.p(t, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  20 · « Et ce n'est qu'un exemple parmi tant d'autres. »                    */
/* -------------------------------------------------------------------------- */
const ringIcons: readonly string[] = [
  "web-globe",
  "web-mail",
  "web-newspaper",
  "web-users",
  "web-credit-card",
  "web-bell",
  "web-lock",
  "web-message-circle",
];

export const Beat20: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const example = clock.at("exemple", 0);
  const many = clock.at("parmi", 0);
  const tant = clock.at("tant", 0);

  return (
    <Shot scene={scene} layout="stack-right">
      <Art w={936} h={498}>
        {ringIcons.map((icon, index) => {
          const angle = (index / ringIcons.length) * Math.PI * 2 - Math.PI / 2;
          const x = 468 + Math.cos(angle) * 380 - 60;
          const y = 249 + Math.sin(angle) * 190 - 60;

          return (
            <div key={icon} style={abs(x, y, 120, 120)}>
              <IconTile size={120} on={lit(clock, many + index * 0.1, 0.15)} icon={icon} />
            </div>
          );
        })}
        <div style={{ ...abs(358, 139, 220, 220), transform: `scale(${punch(clock, example, 0.1, 0.45)})` }}>
          <PhotoTile size={220} kind="cat" on={1} hot />
        </div>
        <Sparkle x={468} y={40} size={70} progress={clock.p(tant, 0.7)} />
      </Art>
      <ZoneMascot scene={scene} pose="surprised" attitude="surprised" from={tant} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  21 · « Aujourd'hui, ces compétences sont utilisées »                       */
/* -------------------------------------------------------------------------- */
export const Beat21: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const skills = clock.at("compétences", 0);
  const used = clock.at("utilisées", 0);
  const spokes = lit(clock, used, 0.3);
  const slots: readonly (readonly [number, number])[] = [
    [10, 10],
    [736, 10],
    [10, 560],
    [736, 560],
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <svg width={936} height={760} style={{ position: "absolute", left: 0, top: 0 }} aria-hidden="true">
          {slots.map(([x, y], index) => (
            <line
              key={index}
              x1={468}
              y1={380}
              x2={x + 95}
              y2={y + 95}
              stroke={colors.accent}
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray="2 22"
              opacity={0.25 + 0.75 * spokes}
            />
          ))}
        </svg>
        <div style={{ ...abs(238, 150, 460, 460), opacity: 0.35 }}>
          <Gear size={460} angle={frame * 1.2 + 120 * clock.p(skills, 0.7)} color={colors.inkInverse} />
        </div>
        {slots.map(([x, y], index) => (
          <div key={index} style={abs(x, y, 190, 190)}>
            <IconTile size={190} on={0.35 + 0.65 * spokes} hot={spokes > 0.6}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: radius.pill,
                  border: `6px dashed ${withAlpha(colors.inkInverse, 0.6)}`,
                }}
              />
            </IconTile>
          </div>
        ))}
        <div style={{ ...abs(338, 250, 260, 260), transform: `scale(${punch(clock, skills, 0.12, 0.45)})` }}>
          <AiBadge size={260} />
        </div>
        <Shockwave x={468} y={380} size={260} progress={clock.p(skills, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  22 · « dans la santé, les transports, le commerce »                        */
/* -------------------------------------------------------------------------- */
export const Beat22: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const health = clock.at("santé", 0);
  const transport = clock.at("transports", 0);
  const trade = clock.at("commerce", 0);
  const items = [
    { x: 15, t: health, node: (c: string) => <MedCross size={150} color={c} /> },
    { x: 333, t: transport, node: (c: string) => <Bus size={150} color={c} /> },
    { x: 651, t: trade, node: (c: string) => <Basket size={150} color={c} /> },
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={620}>
        <svg width={936} height={620} style={{ position: "absolute", left: 0, top: 0 }} aria-hidden="true">
          {items.map((item) => (
            <line
              key={item.x}
              x1={468}
              y1={150}
              x2={item.x + 135}
              y2={320}
              stroke={colors.accent}
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray="2 22"
              opacity={0.25 + 0.75 * lit(clock, item.t, 0.2)}
            />
          ))}
        </svg>
        <div style={abs(398, 0, 140, 140)}>
          <AiBadge size={140} />
        </div>
        {items.map((item) => {
          const on = lit(clock, item.t, 0.15);

          return (
            <div key={item.x} style={{ ...abs(item.x, 330, 270, 270), transform: `scale(${punch(clock, item.t, 0.08, 0.4)})` }}>
              <IconTile size={270} on={on} hot={on > 0.5}>
                {item.node(colors.inkInverse)}
              </IconTile>
            </div>
          );
        })}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  23 · « et bien d'autres domaines. »                                        */
/* -------------------------------------------------------------------------- */
export const Beat23: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const icons: readonly (string | null)[] = [
    null, null, null, "web-globe",
    "web-mail", "web-newspaper", "web-users", "web-credit-card",
    "web-bell", "web-lock", "web-message-circle", "web-puzzle",
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={868} h={642}>
        {icons.map((icon, index) => {
          const on = index < 3 ? 1 : lit(clock, 0.1 + (index - 3) * 0.1, 0.15);
          const x = (index % 4) * 226;
          const y = Math.floor(index / 4) * 226;

          return (
            <div key={index} style={abs(x, y, 190, 190)}>
              <IconTile size={190} on={on} icon={icon ?? undefined} hot={index < 3}>
                {index === 0 ? <MedCross size={100} /> : null}
                {index === 1 ? <Bus size={100} /> : null}
                {index === 2 ? <Basket size={100} /> : null}
              </IconTile>
            </div>
          );
        })}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  24 · « Voilà pourquoi ce métier attire »                                   */
/* -------------------------------------------------------------------------- */
export const Beat24: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pull = clock.at("attire", 0);
  const flow = frame / fps;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(303, 0, 330, 330), transform: "rotate(180deg)" }}>
          <Magnet size={330} />
        </div>
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const phase = (flow * 0.9 + index / 6) % 1;
          const x = 140 + index * 130;

          return (
            <div
              key={index}
              style={{
                ...abs(lerp(x, 468, phase * 0.7) - 18, lerp(560, 280, phase), 36, 36),
                borderRadius: radius.pill,
                backgroundColor: index % 2 === 0 ? colors.accent : colors.inkInverse,
                opacity: Math.min(1, phase * 5) * Math.min(1, (1 - phase) * 3) * (0.35 + 0.65 * lit(clock, pull, 0.3)),
              }}
            />
          );
        })}
        <div style={{ ...abs(78, 520, 780, 230), transform: `scale(${punch(clock, pull, 0.07, 0.5)})` }}>
          <JobCard w={780} h={230} hot />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  25 · « autant l'attention. »                                               */
/* -------------------------------------------------------------------------- */
export const Beat25: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const att = clock.at("attention", 0);
  const looks = [1, 0.5, -0.5, -1];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={600}>
        {looks.map((look, index) => (
          <div key={index} style={abs(10 + index * 240, 20, 200, 120)}>
            <EyeShape size={200} look={look} />
          </div>
        ))}
        <div style={{ ...abs(78, 250, 780, 250), transform: `scale(${punch(clock, att, 0.08, 0.5)})` }}>
          <JobCard w={780} h={250} hot />
        </div>
        <Shockwave x={468} y={375} size={420} progress={clock.p(att, 0.7)} />
        <Sparkle x={90} y={540} size={70} progress={clock.p(att, 0.7)} />
        <Sparkle x={850} y={560} size={70} progress={clock.p(att + 0.1, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  26 · « Et toi, tu connaissais »                                            */
/* -------------------------------------------------------------------------- */
export const Beat26: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const toi = clock.at("toi", 0);

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={560}>
        <div style={{ ...abs(0, 40, 512, 160), display: "flex", justifyContent: "center", transform: `scale(${punch(clock, toi, 0.12, 0.45)})` }}>
          <Pill size={72}>ET TOI ?</Pill>
        </div>
        <div style={abs(106, 260, 300, 300)}>
          <QuestionMark size={300} />
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="point" attitude="friendly" from={0} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  27 · « ce métier avant cette vidéo ? »                                     */
/* -------------------------------------------------------------------------- */
export const Beat27: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const video = clock.at("vidéo", 0);
  const pulse = 1 + 0.06 * Math.sin((frame / fps) * Math.PI * 3);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={abs(40, 90, 640, 540)}>
          <RoleCard w={640} h={540} />
        </div>
        <div style={{ ...abs(620, 0, 260, 260), transform: `scale(${punch(clock, video, 0.14, 0.45)})` }}>
          <QuestionMark size={260} />
        </div>
        <div
          style={{
            ...abs(690, 450, 200, 200),
            borderRadius: radius.pill,
            backgroundColor: colors.inkInverse,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${pulse})`,
            boxShadow: `0 16px 40px ${withAlpha(colors.ink, 0.4)}`,
          }}
        >
          <LibIcon id="web-message-circle" size={110} color={colors.accent} />
        </div>
      </Art>
    </Shot>
  );
};
