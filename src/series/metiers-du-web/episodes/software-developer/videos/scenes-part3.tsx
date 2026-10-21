/**
 * Scènes 23 à 33 — « Software Developer »
 *
 * Bloc 3 : des boutons qui fonctionnent correctement, le résumé (une idée
 * devient un outil utilisé par des gens) et la question finale au spectateur.
 */

import React from "react";
import { useCurrentFrame } from "remotion";

import {
  abs,
  Art,
  Burst,
  Confetti,
  LibIcon,
  lit,
  PhoneMock,
  punch,
  shake,
  Shockwave,
  Sparkle,
  useWordClock,
  ZoneMascot,
} from "../../../../../components/motion";
import { BrandText } from "../../../../../components/common/BrandText";
import { colors, radius } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { Arrow, Bubble, CheckMark, Gear, Pill, Shot, Skeleton } from "../../../../web-story/kit";
import {
  Bulb,
  Clock,
  CodeTag,
  IconTile,
  Person,
  QuestionMark,
  RoleCard,
  Svg,
} from "../../../kit";
import { softwareDeveloperTranscript } from "../data/transcript.ts";

type BeatProps = { readonly scene: Scene };

const useClock = (scene: Scene) => useWordClock(scene, softwareDeveloperTranscript);

/* -------------------------------------------------------------------------- */
/*  23 · « doit être conçue pour fonctionner »                                 */
/* -------------------------------------------------------------------------- */
export const Beat23: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const run = clock.at("fonctionner", 0);
  const seconds = clock.frame / clock.fps;
  const angle = seconds * 120 + 260 * Math.max(0, seconds - run);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={abs(40, 130, 440, 440)}>
          <Gear size={440} angle={angle} />
        </div>
        <div style={abs(450, 330, 320, 320)}>
          <Gear size={320} angle={-angle * 1.38 + 22} color={colors.inkInverse} />
        </div>
        <Shockwave x={468} y={420} size={520} progress={clock.p(run, 0.7)} />
        <Sparkle x={820} y={160} size={90} progress={clock.p(run, 0.7)} color={colors.accent} />
        <Sparkle x={90} y={650} size={80} progress={clock.p(run + 0.1, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  24 · « correctement. »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat24: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const ok = clock.at("correctement", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(208, 90, 520, 520), transform: `scale(${punch(clock, ok, 0.1, 0.5)})` }}>
          <Bubble size={520}>
            <CheckMark size={330} progress={clock.p(ok + 0.05, 0.5)} color={colors.inkInverse} />
          </Bubble>
        </div>
        <Shockwave x={468} y={350} size={640} progress={clock.p(ok + 0.1, 0.7)} />
        <Sparkle x={120} y={130} size={90} progress={clock.p(ok + 0.1, 0.8)} color={colors.accent} />
        <Sparkle x={820} y={560} size={90} progress={clock.p(ok + 0.2, 0.8)} />
        <Sparkle x={800} y={110} size={70} progress={clock.p(ok + 0.3, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  25 · « En résumé, »                                                        */
/* -------------------------------------------------------------------------- */
export const Beat25: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const recap = clock.at("résumé", 0);
  const squeeze = clock.p(recap, 0.7, (input) => input);
  const spots = [
    { x: -260, y: -230 },
    { x: 260, y: -230 },
    { x: -260, y: 230 },
    { x: 260, y: 230 },
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(268, 200, 400, 360), transform: `scale(${0.9 + 0.1 * squeeze})`, opacity: 0.45 + 0.55 * squeeze }}>
          <div
            style={{
              width: 400,
              height: 360,
              borderRadius: radius.xl,
              backgroundColor: withAlpha(colors.ink, 0.9),
              border: `6px solid ${colors.accent}`,
              boxShadow: `0 28px 70px ${withAlpha(colors.accent, 0.4)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CodeTag size={230} />
          </div>
        </div>
        {spots.map((spot, index) => (
          <div
            key={index}
            style={{
              ...abs(468 + spot.x * (1 - squeeze) - 150, 380 + spot.y * (1 - squeeze) - 110, 300, 220),
              opacity: 1 - squeeze,
              transform: `scale(${1 - 0.25 * squeeze})`,
            }}
          >
            <div
              style={{
                width: 300,
                height: 220,
                borderRadius: radius.lg,
                backgroundColor: withAlpha(colors.ink, 0.85),
                border: `3px solid ${withAlpha(colors.inkInverse, 0.3)}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 22,
              }}
            >
              <Skeleton w="62%" h={24} />
              <Skeleton w="40%" h={20} />
            </div>
          </div>
        ))}
        <Shockwave x={468} y={380} size={520} progress={clock.p(recap + 0.4, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  26 · « Un software developer »                                             */
/* -------------------------------------------------------------------------- */
export const Beat26: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const dev = clock.at("developer", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(38, 30, 860, 640), transform: `scale(${punch(clock, dev, 0.08, 0.5)})` }}>
          <RoleCard
            w={860}
            h={640}
            label="SOFTWARE DEVELOPER"
            active={lit(clock, dev, 0.2) > 0.5}
            badge={
              <Bubble size={270}>
                <CodeTag size={170} />
              </Bubble>
            }
          />
        </div>
        <Burst x={468} y={350} radius={420} progress={clock.p(dev, 0.7)} rays={12} />
        <Sparkle x={70} y={80} size={80} progress={clock.p(dev, 0.7)} color={colors.accent} />
        <Sparkle x={870} y={620} size={70} progress={clock.p(dev + 0.1, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  27 · « transforme une idée en »                                            */
/* -------------------------------------------------------------------------- */
export const Beat27: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const turn = clock.at("transforme", 0);
  const idea = clock.at("idée", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(20, 140, 380, 380), transform: `scale(${punch(clock, idea, 0.14, 0.45)})` }}>
          <Bulb size={380} glow={lit(clock, idea, 0.25)} />
        </div>
        <div style={{ ...abs(440, 150, 150, 150), opacity: 0.4 + 0.6 * lit(clock, turn, 0.25) }}>
          <Gear size={150} angle={frame * 3} />
        </div>
        <Svg w={936} h={700}>
          <Arrow x1={430} y1={350} x2={600} y2={350} progress={clock.p(turn, 0.5)} />
        </Svg>
        <div style={abs(630, 210, 280, 280)}>
          <IconTile size={280} on={0} icon="web-message-circle" />
        </div>
        <Sparkle x={200} y={110} size={90} progress={clock.p(idea, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  28 · « un outil que les gens peuvent »                                     */
/* -------------------------------------------------------------------------- */
export const Beat28: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const tool = clock.at("outil", 0);
  const people = clock.at("gens", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={860}>
        <div style={{ ...abs(298, 10, 340, 600), transform: `scale(${punch(clock, tool, 0.07, 0.45)})` }}>
          <PhoneMock width={340} height={600}>
            <div style={abs(60, 120, 220, 220)}>
              <IconTile size={220} on={lit(clock, tool, 0.2)} hot icon="web-message-circle" />
            </div>
            <div style={abs(40, 380, 260, 28)}>
              <Skeleton w="70%" h={24} />
            </div>
          </PhoneMock>
        </div>
        {[0, 1, 2].map((index) => (
          <div key={index} style={{ ...abs(88 + index * 270, 650, 200, 200), transform: `scale(${punch(clock, people + index * 0.1, 0.12, 0.4)})` }}>
            <Person size={200} on={lit(clock, people + index * 0.1, 0.2) > 0.5} />
          </div>
        ))}
        <Burst x={468} y={310} radius={300} progress={clock.p(tool, 0.6)} rays={10} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  29 · « réellement utiliser. »                                              */
/* -------------------------------------------------------------------------- */
export const Beat29: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const use = clock.at("utiliser", 0);

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={560}>
        <div style={abs(86, 20, 300, 520)}>
          <PhoneMock width={300} height={520}>
            <div style={abs(40, 90, 220, 220)}>
              <IconTile size={220} on={1} hot icon="web-message-circle" />
            </div>
            <div style={abs(30, 350, 240, 26)}>
              <Skeleton w="70%" h={22} />
            </div>
          </PhoneMock>
        </div>
        <div style={{ ...abs(330, 10, 150, 150), transform: `scale(${punch(clock, use, 0.3, 0.5)})` }}>
          <Bubble size={150}>
            <LibIcon id="web-heart" size={86} color={colors.inkInverse} />
          </Bubble>
        </div>
        <Burst x={405} y={85} radius={130} progress={clock.p(use, 0.6)} rays={9} />
        <Confetti x={0} y={0} width={512} fall={520} seconds={clock.frame / clock.fps - use} count={16} />
      </Art>
      <ZoneMascot scene={scene} pose="happy" attitude="excited" from={use} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  30 · « Et toi, si tu pouvais »                                             */
/* -------------------------------------------------------------------------- */
export const Beat30: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const you = clock.at("toi", 0);

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={560}>
        <div style={{ ...abs(0, 20, 512, 150), display: "flex", justifyContent: "center", transform: `scale(${punch(clock, you, 0.12, 0.45)})` }}>
          <Pill size={72}>ET TOI ?</Pill>
        </div>
        <div style={abs(96, 230, 320, 320)}>
          <Person size={320} on />
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="point" attitude="friendly" from={0} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  31 · « créer une application pour résoudre »                               */
/* -------------------------------------------------------------------------- */
export const Beat31: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const make = clock.at("créer", 0);
  const solve = clock.at("résoudre", 0);
  const plus = punch(clock, make, 0.25, 0.45);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={860}>
        <div style={abs(40, 50, 400, 760)}>
          <PhoneMock width={400} height={760}>
            <div style={{ ...abs(125, 300, 150, 150), transform: `scale(${plus})` }}>
              <div style={{ ...abs(0, 60, 150, 30), borderRadius: radius.pill, backgroundColor: colors.accent }} />
              <div style={{ ...abs(60, 0, 30, 150), borderRadius: radius.pill, backgroundColor: colors.accent }} />
            </div>
            <div style={abs(40, 110, 320, 30)}>
              <Skeleton w="60%" h={26} />
            </div>
          </PhoneMock>
        </div>
        <Svg w={936} h={860}>
          <Arrow x1={470} y1={430} x2={570} y2={430} progress={clock.p(solve, 0.4)} />
        </Svg>
        <div style={{ ...abs(600, 290, 290, 290), transform: `scale(${punch(clock, solve, 0.12, 0.45)})` }}>
          <IconTile size={290} on={lit(clock, solve, 0.2)} hot icon="web-puzzle" />
        </div>
        <Sparkle x={120} y={140} size={90} progress={clock.p(make, 0.8)} color={colors.accent} />
        <Burst x={745} y={435} radius={200} progress={clock.p(solve, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  32 · « un problème de ton quotidien, »                                     */
/* -------------------------------------------------------------------------- */
export const Beat32: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const problem = clock.at("problème", 0);
  const daily = clock.at("quotidien", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(40, 160, 500, 500), transform: `scale(${punch(clock, daily, 0.08, 0.45)})` }}>
          <Clock size={500} angle={frame * 4} />
        </div>
        <div style={{ ...abs(600, 70, 270, 270), transform: `translateX(${shake(clock, problem, 18, 0.5)}px)` }}>
          <Bubble size={270} active={lit(clock, problem, 0.2) > 0.5}>
            <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 200, lineHeight: 1 }}>
              !
            </BrandText>
          </Bubble>
        </div>
        <Shockwave x={735} y={205} size={330} progress={clock.p(problem, 0.6)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  33 · « ce serait laquelle? »                                               */
/* -------------------------------------------------------------------------- */
export const Beat33: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const which = clock.at("laquelle", 0);
  const would = clock.at("serait", 0);

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={560}>
        <Svg w={512} h={560}>
          <rect
            x={86}
            y={20}
            width={340}
            height={520}
            rx={52}
            fill="none"
            stroke={colors.accent}
            strokeWidth={6}
            strokeDasharray="22 16"
          />
        </Svg>
        <div style={{ ...abs(106, 130, 300, 300), transform: `scale(${punch(clock, which, 0.14, 0.5)})` }}>
          <QuestionMark size={300} />
        </div>
        <Shockwave x={256} y={280} size={380} progress={clock.p(which, 0.7)} />
      </Art>
      <ZoneMascot scene={scene} pose="thinking" attitude="curious" from={would} halo="accent" />
    </Shot>
  );
};
