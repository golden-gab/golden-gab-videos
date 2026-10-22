/**
 * Scènes 14 à 28 — « Data Engineer »
 *
 * Bloc 2 : récupérer, organiser et transporter de grandes quantités de
 * données pour qu'elles soient utilisées, puis l'exemple fil rouge d'une vidéo
 * regardée sur une appli : les informations sont enregistrées, suivent un
 * itinéraire, arrivent au bon endroit et sont prêtes.
 */

import React from "react";

import {
  abs,
  Art,
  BrowserFrame,
  Burst,
  LibIcon,
  lerp,
  lit,
  PhoneMock,
  punch,
  Shockwave,
  Sparkle,
  useWordClock,
} from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { Arrow, Bubble, CheckMark, Gear, MapPin, Pill, Shot, Skeleton } from "../../../../web-story/kit";
import {
  BarChart,
  DataDot,
  Database,
  EyeShape,
  Funnel,
  IconTile,
  LoopArrow,
  Person,
  Svg,
} from "../../../kit";
import { dataEngineerTranscript } from "../data/transcript.ts";

type BeatProps = { readonly scene: Scene };

const useClock = (scene: Scene) => useWordClock(scene, dataEngineerTranscript);

/** Nombre pseudo-aléatoire déterministe dans [0, 1[ (jamais `Math.random`). */
const seeded = (n: number): number => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;

  return x - Math.floor(x);
};

const linear = (input: number): number => input;

/** Ligne de liste : blocs fantômes + coche qui se trace avec `done`. */
const CheckRow: React.FC<{ readonly w: number; readonly h: number; readonly done: number }> = ({ w, h, done }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: radius.lg,
      backgroundColor: withAlpha(colors.ink, 0.85),
      border: `${strokeWidths.thick}px solid ${done > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.28)}`,
      boxShadow: done > 0.5 ? `0 20px 50px ${withAlpha(colors.accent, 0.35)}` : `0 14px 36px ${withAlpha(colors.ink, 0.4)}`,
      display: "flex",
      alignItems: "center",
      gap: h * 0.2,
      padding: `0 ${h * 0.25}px`,
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: h * 0.12, flex: 1 }}>
      <Skeleton w="82%" h={h * 0.15} tone={done > 0.5 ? "accent" : "soft"} />
      <Skeleton w="54%" h={h * 0.12} />
    </div>
    <div
      style={{
        width: h * 0.58,
        height: h * 0.58,
        borderRadius: radius.pill,
        border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.5)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <CheckMark size={h * 0.5} progress={done} />
    </div>
  </div>
);

/* Itinéraire téléphone → base de données (partagé par les plans 25 et 26). */
const routePoints: readonly (readonly [number, number])[] = [
  [270, 440],
  [390, 440],
  [390, 170],
  [600, 170],
  [600, 440],
  [700, 440],
];

const routeLength = routePoints.reduce((total, point, index) => {
  if (index === 0) {
    return 0;
  }
  const previous = routePoints[index - 1];

  return total + Math.abs(point[0] - previous[0]) + Math.abs(point[1] - previous[1]);
}, 0);

/** Point situé à la fraction `t` (0 → 1) de l'itinéraire. */
const pointOnRoute = (t: number): readonly [number, number] => {
  let remaining = Math.min(1, Math.max(0, t)) * routeLength;

  for (let index = 1; index < routePoints.length; index += 1) {
    const from = routePoints[index - 1];
    const to = routePoints[index];
    const length = Math.abs(to[0] - from[0]) + Math.abs(to[1] - from[1]);

    if (remaining <= length) {
      const f = length === 0 ? 0 : remaining / length;

      return [lerp(from[0], to[0], f), lerp(from[1], to[1], f)];
    }
    remaining -= length;
  }

  return routePoints[routePoints.length - 1];
};

const routePath = routePoints.map((point, index) => `${index === 0 ? "M" : "L"}${point[0]} ${point[1]}`).join(" ");

/* -------------------------------------------------------------------------- */
/*  14 · « qui permettent de récupérer, »                                      */
/* -------------------------------------------------------------------------- */
export const Beat14: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const collect = clock.at("récupérer", 0);
  const fall = clock.p(collect, 1.0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={abs(238, 250, 460, 460)}>
          <Funnel size={460} />
        </div>
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            style={abs(
              lerp(40 + seeded(index + 1) * 800, 468 - 23 + (seeded(index + 20) - 0.5) * 70, fall),
              lerp(seeded(index + 40) * 170, 330 + (seeded(index + 60) - 0.5) * 30, fall),
            )}
          >
            <DataDot size={46} hot={index % 3 === 0} />
          </div>
        ))}
        <Shockwave x={468} y={330} size={420} progress={clock.p(collect + 0.9, 0.6)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  15 · « organiser et »                                                      */
/* -------------------------------------------------------------------------- */
export const Beat15: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const sort = clock.at("organiser", 0);
  const settle = clock.p(sort, 0.9);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={560}>
        {Array.from({ length: 12 }, (_, index) => {
          const col = index % 4;
          const row = Math.floor(index / 4);

          return (
            <div
              key={index}
              style={abs(
                lerp(seeded(index + 3) * 840, 110 + col * 214, settle),
                lerp(seeded(index + 30) * 460, 70 + row * 190, settle),
              )}
            >
              <DataDot size={90} hot={col % 2 === 0} />
            </div>
          );
        })}
        <Sparkle x={468} y={20} size={90} progress={clock.p(sort + 0.8, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  16 · « transporter de grandes »                                            */
/* -------------------------------------------------------------------------- */
export const Beat16: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const carry = clock.at("transporter", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={520}>
        <div style={abs(0, 150, 220, 220)}>
          <IconTile size={220} on={1} hot icon="web-globe" />
        </div>
        <div style={{ ...abs(250, 235, 436, 50), transform: `scale(${punch(clock, carry, 0.12, 0.45)})`, borderRadius: radius.pill, backgroundColor: withAlpha(colors.ink, 0.85), border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.4)}` }} />
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} style={abs(268 + ((clock.frame * 6 + index * 84) % 380), 241)}>
            <DataDot size={38} hot={index % 2 === 0} />
          </div>
        ))}
        <div style={abs(696, 140, 240, 240)}>
          <Database size={240} glow={lit(clock, carry, 0.3)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  17 · « quantités de données »                                              */
/* -------------------------------------------------------------------------- */
export const Beat17: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const amount = clock.at("quantités", 0);
  const data = clock.at("données", 0);
  const spots = [
    { x: 0, y: 100, t: amount },
    { x: 606, y: 100, t: amount + 0.1 },
    { x: 303, y: 360, t: data },
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        {spots.map((spot, index) => (
          <div
            key={index}
            style={{
              ...abs(spot.x, spot.y, 330, 330),
              transform: `scale(${(0.74 + 0.26 * lit(clock, spot.t, 0.3)) * punch(clock, data, 0.08, 0.45)})`,
            }}
          >
            <Database size={330} glow={lit(clock, spot.t, 0.2)} />
          </div>
        ))}
        <Burst x={468} y={380} radius={440} progress={clock.p(data, 0.7)} rays={12} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  18 · « pour qu'elles puissent être utilisées. »                            */
/* -------------------------------------------------------------------------- */
export const Beat18: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const can = clock.at("puissent", 0);
  const used = clock.at("utilisées", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div style={{ ...abs(58, 40, 820, 620), transform: `scale(${punch(clock, used, 0.05, 0.5)})` }}>
          <BrowserFrame width={820} height={620} tone="dark">
            <div style={abs(130, 70, 560, 400)}>
              <BarChart w={560} h={400} grow={clock.p(can, 0.9)} />
            </div>
          </BrowserFrame>
        </div>
        <Sparkle x={70} y={60} size={90} progress={clock.p(used, 0.8)} color={colors.accent} />
        <Sparkle x={870} y={640} size={80} progress={clock.p(used + 0.1, 0.8)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  19 · « Par exemple, chaque fois »                                          */
/* -------------------------------------------------------------------------- */
export const Beat19: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const example = clock.at("exemple", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={880}>
        <div style={{ ...abs(0, 0, 936, 120), display: "flex", justifyContent: "center", transform: `scale(${punch(clock, example, 0.14, 0.45)})` }}>
          <Pill size={72}>EXEMPLE</Pill>
        </div>
        <div style={abs(148, 150, 440, 720)}>
          <PhoneMock width={440} height={720}>
            <div
              style={{
                ...abs(40, 130, 360, 300),
                borderRadius: radius.lg,
                backgroundColor: colors.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LibIcon id="web-play" size={160} color={colors.inkInverse} />
            </div>
            <div style={abs(40, 470, 360, 30)}>
              <Skeleton w="75%" h={26} />
            </div>
          </PhoneMock>
        </div>
        <div style={abs(630, 380, 260, 260)}>
          <LoopArrow size={260} angle={clock.frame * 4} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  20 · « que tu regardes une vidéo »                                         */
/* -------------------------------------------------------------------------- */
export const Beat20: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const watch = clock.at("regardes", 0);
  const video = clock.at("vidéo", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={620}>
        <div style={abs(0, 180, 260, 260)}>
          <Person size={260} on />
        </div>
        <div style={{ ...abs(320, 230, 300, 180), transform: `scale(${punch(clock, watch, 0.14, 0.4)})` }}>
          <EyeShape size={300} look={lerp(-0.8, 1, clock.p(watch, 0.6, linear))} />
        </div>
        <div style={{ ...abs(656, 170, 280, 280), transform: `scale(${punch(clock, video, 0.14, 0.45)})` }}>
          <IconTile size={280} on={lit(clock, video, 0.2)} hot icon="web-play" />
        </div>
        <Burst x={796} y={310} radius={210} progress={clock.p(video, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  21 · « sur TikTok, »                                                       */
/* -------------------------------------------------------------------------- */
export const Beat21: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const app = clock.at("TikTok", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={800}>
        <div style={abs(288, 70, 360, 660)}>
          <PhoneMock width={360} height={660}>
            <div
              style={{
                ...abs(30, 120, 300, 300),
                borderRadius: radius.lg,
                backgroundColor: colors.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LibIcon id="web-play" size={160} color={colors.inkInverse} />
            </div>
          </PhoneMock>
        </div>
        <div style={{ ...abs(600, 90, 170, 170), transform: `scale(${punch(clock, app, 0.3, 0.5)})` }}>
          <Bubble size={170}>
            <LibIcon id="web-heart" size={92} color={colors.inkInverse} />
          </Bubble>
        </div>
        <Burst x={685} y={175} radius={160} progress={clock.p(app, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  22 · « certaines informations »                                            */
/* -------------------------------------------------------------------------- */
export const Beat22: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const info = clock.at("informations", 0);
  const icons = ["web-mail", "web-credit-card", "receipt"];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 50, 300, 540)}>
          <PhoneMock width={300} height={540}>
            <div style={abs(30, 100, 240, 28)}>
              <Skeleton w="70%" h={24} />
            </div>
          </PhoneMock>
        </div>
        {icons.map((icon, index) => {
          const move = clock.p(info + index * 0.12, 1.0);

          return (
            <div key={icon} style={abs(lerp(85, 400 + index * 60, move), lerp(150 + index * 110, 90 + index * 160, move))}>
              <IconTile size={130} on={1} hot icon={icon} />
            </div>
          );
        })}
        <div style={{ ...abs(676, 190, 260, 260), transform: `scale(${punch(clock, info + 1.0, 0.1, 0.45)})` }}>
          <Database size={260} glow={lit(clock, info + 1.0, 0.2)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  23 · « peuvent être enregistrées. »                                        */
/* -------------------------------------------------------------------------- */
export const Beat23: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const can = clock.at("peuvent", 0);
  const saved = clock.at("enregistrées", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={abs(238, 250, 460, 460)}>
          <Database size={460} glow={lit(clock, saved, 0.25)} />
        </div>
        <div style={abs(393, lerp(0, 190, clock.p(can, 1.0)), 150, 150)}>
          <IconTile size={150} on={1} hot icon="receipt" />
        </div>
        <div style={abs(700, 60, 180, 180)}>
          <CheckMark size={180} progress={clock.p(saved, 0.4)} />
        </div>
        <Shockwave x={468} y={300} size={460} progress={clock.p(saved, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  24 · « Le Data Engineer aide »                                             */
/* -------------------------------------------------------------------------- */
export const Beat24: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const engineer = clock.at("Engineer", 0);
  const help = clock.at("aide", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(0, 150, 380, 380), transform: `scale(${punch(clock, engineer, 0.1, 0.45)})` }}>
          <Person size={380} on={lit(clock, engineer, 0.2) > 0.5} />
        </div>
        <div style={abs(300, 20, 200, 200)}>
          <Gear size={200} angle={clock.frame * 3} />
        </div>
        <Svg w={936} h={700}>
          <Arrow x1={400} y1={380} x2={545} y2={380} progress={clock.p(help, 0.4)} />
        </Svg>
        <div style={{ ...abs(580, 230, 320, 320), transform: `scale(${punch(clock, help, 0.1, 0.45)})` }}>
          <Database size={320} glow={lit(clock, help, 0.2)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  25 · « à faire en sorte que »                                              */
/* -------------------------------------------------------------------------- */
export const Beat25: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const make = clock.at("faire", 0);
  const trace = clock.p(make, 1.3, linear);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(70, 340, 200, 200)}>
          <IconTile size={200} on={1} hot icon="web-globe" />
        </div>
        <div style={abs(700, 330, 240, 240)}>
          <Database size={240} />
        </div>
        <Svg w={936} h={640}>
          <path d={routePath} fill="none" stroke={withAlpha(colors.inkInverse, 0.25)} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 22" />
          <path d={routePath} fill="none" stroke={colors.accent} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - trace} />
        </Svg>
        <Sparkle x={390} y={120} size={80} progress={clock.p(make + 0.3, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  26 · « ces informations arrivent »                                         */
/* -------------------------------------------------------------------------- */
export const Beat26: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const arrive = clock.at("arrivent", 0);
  const time = clock.frame / clock.fps;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(70, 340, 200, 200)}>
          <IconTile size={200} on={1} hot icon="web-globe" />
        </div>
        <div style={{ ...abs(700, 330, 240, 240), transform: `scale(${punch(clock, arrive, 0.1, 0.45)})` }}>
          <Database size={240} glow={lit(clock, arrive, 0.2)} />
        </div>
        <Svg w={936} h={640}>
          <path d={routePath} fill="none" stroke={colors.accent} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
        {Array.from({ length: 5 }, (_, index) => {
          const point = pointOnRoute((time * 0.55 + index / 5) % 1);

          return (
            <div key={index} style={abs(point[0] - 24, point[1] - 24)}>
              <DataDot size={48} hot={index % 2 === 0} />
            </div>
          );
        })}
        <Shockwave x={820} y={450} size={360} progress={clock.p(arrive, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  27 · « au bon endroit »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat27: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const good = clock.at("bon", 0);
  const place = clock.at("endroit", 0);
  const drop = clock.p(good, 0.7);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={abs(268, 300, 400, 400)}>
          <Database size={400} glow={lit(clock, place, 0.2)} />
        </div>
        <div style={{ ...abs(338, lerp(-80, 50, drop), 260, 260), transform: `scale(${punch(clock, place, 0.14, 0.45)})` }}>
          <MapPin size={260} />
        </div>
        <Shockwave x={468} y={330} size={420} progress={clock.p(place, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  28 · « et soient prêtes »                                                  */
/* -------------------------------------------------------------------------- */
export const Beat28: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const ready = clock.at("prêtes", 0);
  const times = [clock.at("et", 0), clock.at("soient", 0), ready];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {times.map((t, index) => (
          <div key={index} style={{ ...abs(38, index * 215, 860, 170), transform: `scale(${punch(clock, t + 0.15, 0.04, 0.4)})` }}>
            <CheckRow w={860} h={170} done={clock.p(t, 0.35)} />
          </div>
        ))}
        <Sparkle x={900} y={30} size={80} progress={clock.p(ready, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};
