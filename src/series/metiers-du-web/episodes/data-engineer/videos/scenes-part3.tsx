/**
 * Scènes 29 à 39 — « Data Engineer »
 *
 * Bloc 3 : les données prêtes à servir, les coulisses (le rideau qui s'ouvre),
 * des données qui circulent correctement, ce qui se passerait sans le métier,
 * puis la question finale au spectateur.
 */

import React from "react";

import { BrandText } from "../../../../../components/common/BrandText";
import {
  abs,
  Art,
  BrowserFrame,
  Burst,
  LibIcon,
  lerp,
  lit,
  Magnifier,
  punch,
  shake,
  Shockwave,
  Sparkle,
  useWordClock,
  ZoneMascot,
} from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { Arrow, Bubble, CheckMark, Forbidden, Gear, Shot, Skeleton } from "../../../../web-story/kit";
import {
  BarChart,
  Building,
  Curtains,
  DataDot,
  Database,
  IconTile,
  JobCard,
  Person,
  QuestionMark,
  Svg,
} from "../../../kit";
import { dataEngineerTranscript } from "../data/transcript.ts";

type BeatProps = { readonly scene: Scene };

const useClock = (scene: Scene) => useWordClock(scene, dataEngineerTranscript);

const linear = (input: number): number => input;

/* -------------------------------------------------------------------------- */
/*  29 · « à être utilisées. »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat29: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const used = clock.at("utilisées", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div style={{ ...abs(58, 40, 820, 620), transform: `scale(${punch(clock, used, 0.05, 0.5)})` }}>
          <BrowserFrame width={820} height={620} tone="dark">
            <div style={abs(50, 60, 380, 340)}>
              <BarChart w={380} h={340} grow={0.4 + 0.6 * lit(clock, used, 0.4)} />
            </div>
            <div style={abs(500, 60, 230, 230)}>
              <Bubble size={230} active={lit(clock, used, 0.2) > 0.5}>
                <LibIcon id="web-heart" size={120} color={colors.inkInverse} />
              </Bubble>
            </div>
            <div style={abs(480, 330, 270, 36)}>
              <Skeleton w="100%" h={30} />
            </div>
            <div style={abs(480, 400, 270, 30)}>
              <Skeleton w="62%" h={26} />
            </div>
          </BrowserFrame>
        </div>
        <Sparkle x={70} y={50} size={90} progress={clock.p(used, 0.8)} color={colors.accent} />
        <Sparkle x={880} y={650} size={80} progress={clock.p(used + 0.1, 0.8)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  30 · « En gros, il construit les coulisses »                               */
/* -------------------------------------------------------------------------- */
export const Beat30: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const build = clock.at("construit", 0);
  const backstage = clock.at("coulisses", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div
          style={{
            ...abs(68, 100, 800, 500),
            borderRadius: radius.md,
            backgroundColor: withAlpha(colors.ink, 0.9),
            border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.3)}`,
            transform: `scale(${punch(clock, build, 0.04, 0.4)})`,
          }}
        >
          <div style={abs(80, 130, 260, 260)}>
            <Gear size={260} angle={clock.frame * 3} />
          </div>
          <div style={abs(320, 270, 170, 170)}>
            <Gear size={170} angle={-clock.frame * 4 + 20} color={colors.inkInverse} />
          </div>
          <div style={abs(540, 150, 200, 200)}>
            <Database size={200} glow={1} />
          </div>
          <Curtains w={800} h={500} open={clock.p(backstage, 0.8)} />
        </div>
        <Sparkle x={60} y={90} size={90} progress={clock.p(backstage, 0.8)} color={colors.accent} />
        <Sparkle x={880} y={620} size={80} progress={clock.p(backstage + 0.1, 0.8)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  31 · « qui permettent aux données de circuler »                            */
/* -------------------------------------------------------------------------- */
export const Beat31: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const data = clock.at("données", 0);
  const flow = clock.at("circuler", 0);
  const time = clock.frame / clock.fps;
  const angle = time * 70 + Math.max(0, time - flow) * 260;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div
          style={{
            ...abs(168, 80, 600, 600),
            borderRadius: radius.pill,
            border: `${strokeWidths.thick}px dashed ${withAlpha(colors.inkInverse, 0.4)}`,
          }}
        />
        <div style={{ ...abs(348, 260, 240, 240), transform: `scale(${punch(clock, data, 0.1, 0.45)})` }}>
          <Database size={240} glow={lit(clock, data, 0.2)} />
        </div>
        {Array.from({ length: 8 }, (_, index) => {
          const radians = ((angle + index * 45) * Math.PI) / 180;

          return (
            <div key={index} style={abs(468 + 300 * Math.cos(radians) - 25, 380 + 300 * Math.sin(radians) - 25)}>
              <DataDot size={50} hot={index % 2 === 0} />
            </div>
          );
        })}
        <Shockwave x={468} y={380} size={640} progress={clock.p(flow, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  32 · « correctement. »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat32: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const ok = clock.at("correctement", 0);

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={560}>
        <div style={{ ...abs(46, 70, 420, 420), transform: `scale(${punch(clock, ok, 0.1, 0.5)})` }}>
          <Bubble size={420}>
            <CheckMark size={260} progress={clock.p(ok + 0.05, 0.5)} color={colors.inkInverse} />
          </Bubble>
        </div>
        <Shockwave x={256} y={280} size={500} progress={clock.p(ok + 0.1, 0.7)} />
        <Sparkle x={50} y={60} size={80} progress={clock.p(ok + 0.1, 0.8)} color={colors.accent} />
        <Sparkle x={450} y={500} size={80} progress={clock.p(ok + 0.2, 0.8)} />
      </Art>
      <ZoneMascot scene={scene} pose="happy" attitude="excited" from={ok} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  33 · « Sans lui, beaucoup »                                                */
/* -------------------------------------------------------------------------- */
export const Beat33: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const without = clock.at("Sans", 0);
  const him = clock.at("lui", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(258, 110, 420, 420), opacity: 1 - 0.55 * lit(clock, him, 0.3), transform: `translateX(${shake(clock, without, 14, 0.5)}px)` }}>
          <Person size={420} on />
        </div>
        <div style={abs(238, 80, 460, 460)}>
          <Forbidden size={460} progress={clock.p(him, 0.45)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  34 · « d'entreprises auraient du mal »                                     */
/* -------------------------------------------------------------------------- */
export const Beat34: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const hard = clock.at("mal", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(40, 90, 500, 500), transform: `translateX(${shake(clock, hard, 20, 0.6)}px)` }}>
          <Building size={500} lit={0.4} />
        </div>
        <div style={{ ...abs(600, 110, 270, 270), transform: `scale(${punch(clock, hard, 0.16, 0.45)})` }}>
          <Bubble size={270} active={lit(clock, hard, 0.2) > 0.5}>
            <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 200, lineHeight: 1 }}>
              !
            </BrandText>
          </Bubble>
        </div>
        <Shockwave x={735} y={245} size={340} progress={clock.p(hard, 0.6)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  35 · « à exploiter toutes les »                                            */
/* -------------------------------------------------------------------------- */
export const Beat35: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const dig = clock.at("exploiter", 0);
  const sweep = clock.p(dig, 1.2, linear);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        {Array.from({ length: 12 }, (_, index) => {
          const done = index < Math.floor(sweep * 12);

          return (
            <div
              key={index}
              style={{
                ...abs((index % 4) * 245, Math.floor(index / 4) * 225, 200, 170),
                borderRadius: radius.lg,
                backgroundColor: withAlpha(colors.ink, 0.8),
                border: `${strokeWidths.thick}px solid ${done ? colors.accent : withAlpha(colors.inkInverse, 0.25)}`,
                opacity: done ? 1 : 0.55,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 18,
              }}
            >
              <Skeleton w="62%" h={22} tone={done ? "accent" : "soft"} />
              <Skeleton w="40%" h={18} />
            </div>
          );
        })}
        <Magnifier x={lerp(110, 760, sweep)} y={lerp(120, 520, sweep)} size={170} opacity={0.5 + 0.5 * lit(clock, dig, 0.2)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  36 · « informations qu'elles collectent. »                                 */
/* -------------------------------------------------------------------------- */
export const Beat36: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const collect = clock.at("collectent", 0);
  const move = clock.p(0.1, Math.max(0.5, collect - 0.1));
  const tiles = [
    { icon: "web-mail", x0: 0, y0: 0, x1: 100, y1: 200 },
    { icon: "web-credit-card", x0: 786, y0: 0, x1: 686, y1: 200 },
    { icon: "receipt", x0: 0, y0: 610, x1: 100, y1: 420 },
    { icon: "web-message-circle", x0: 786, y0: 610, x1: 686, y1: 420 },
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(278, 190, 380, 380), transform: `scale(${punch(clock, collect, 0.1, 0.45)})` }}>
          <Database size={380} glow={lit(clock, collect, 0.2)} />
        </div>
        {tiles.map((tile) => (
          <div key={tile.icon} style={abs(lerp(tile.x0, tile.x1, move), lerp(tile.y0, tile.y1, move), 150, 150)}>
            <IconTile size={150} on={1} hot icon={tile.icon} />
          </div>
        ))}
        <Shockwave x={468} y={380} size={520} progress={clock.p(collect, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  37 · « Quel est le métier »                                                */
/* -------------------------------------------------------------------------- */
export const Beat37: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const job = clock.at("métier", 0);

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={560}>
        {[0, 1, 2].map((index) => (
          <div key={index} style={{ ...abs(16, 40 + index * 180, 480, 150), transform: index === 2 ? `scale(${punch(clock, job, 0.08, 0.45)})` : undefined }}>
            <JobCard w={480} h={150} hot={index === 2} dim={index === 2 ? 1 : 0.55} />
          </div>
        ))}
        <Sparkle x={480} y={560} size={80} progress={clock.p(job, 0.7)} color={colors.accent} />
      </Art>
      <ZoneMascot scene={scene} pose="point" attitude="friendly" from={0} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  38 · « que tu veux découvrir »                                             */
/* -------------------------------------------------------------------------- */
export const Beat38: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const discover = clock.at("découvrir", 0);
  const slide = clock.p(0, Math.max(0.5, discover), linear);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(228, 140, 480, 480), transform: `scale(${punch(clock, discover, 0.12, 0.5)})` }}>
          <QuestionMark size={480} />
        </div>
        <Magnifier x={lerp(120, 650, slide)} y={lerp(640, 260, slide)} size={240} opacity={0.6 + 0.4 * lit(clock, discover, 0.2)} />
        <Burst x={468} y={380} radius={400} progress={clock.p(discover, 0.7)} rays={12} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  39 · « par la suite ? »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat39: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const next = clock.at("suite", 0);

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={560}>
        <div style={{ ...abs(116, 20, 280, 280), transform: `scale(${punch(clock, next, 0.14, 0.5)})` }}>
          <QuestionMark size={280} />
        </div>
        <Svg w={512} h={560}>
          <Arrow x1={50} y1={440} x2={450} y2={440} progress={0.35 + 0.65 * clock.p(0.2, 0.6)} />
        </Svg>
      </Art>
      <ZoneMascot scene={scene} pose="thinking" attitude="curious" from={next} halo="accent" />
    </Shot>
  );
};
