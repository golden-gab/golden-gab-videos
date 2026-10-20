/**
 * Scènes 10 à 18 — « C'est quoi un AI engineer »
 *
 * Bloc 2 : ce que fait l'AI engineer (rendre possible, créer des systèmes qui
 * apprennent d'exemples) puis l'exemple chats / chiens.
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

import {
  abs,
  Art,
  lerp,
  lit,
  Magnifier,
  PhoneMock,
  punch,
  Sparkle,
  useWordClock,
} from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import {
  Arrow,
  Card,
  CheckMark,
  Forbidden,
  Gear,
  Lines,
  Shot,
  Skeleton,
} from "../../../../web-story/kit";
import {
  Chip,
  Face,
  IconTile,
  Person,
  PhotoTile,
} from "../../../kit";
import { aiEngineerTranscript } from "../data/transcript.ts";

type BeatProps = { readonly scene: Scene };

const useClock = (scene: Scene) => useWordClock(scene, aiEngineerTranscript);

/* -------------------------------------------------------------------------- */
/*  10 · « personnes qui travaillent à rendre »                                */
/* -------------------------------------------------------------------------- */
export const Beat10: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const p1 = lit(clock, clock.at("personnes", 0), 0.15);
  const p2 = lit(clock, clock.at("travaillent", 0), 0.15);
  const p3 = lit(clock, clock.at("rendre", 0), 0.15);
  const turn = frame * 2.5;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={780}>
        <svg width={936} height={780} style={{ position: "absolute", left: 0, top: 0 }} aria-hidden="true">
          {[
            [155, 420, p1],
            [468, 190, p2],
            [781, 420, p3],
          ].map(([x, y, on], index) => (
            <line
              key={index}
              x1={x}
              y1={y}
              x2={468}
              y2={430}
              stroke={colors.accent}
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray="2 22"
              opacity={0.3 + 0.7 * on}
            />
          ))}
        </svg>
        <div style={abs(318, 280, 300, 300)}>
          <Gear size={300} angle={turn} />
        </div>
        <div style={{ ...abs(60, 330, 190, 190), transform: `scale(${punch(clock, clock.at("personnes", 0), 0.1, 0.4)})` }}>
          <Person size={190} on={p1 > 0.5} />
        </div>
        <div style={{ ...abs(373, 60, 190, 190), transform: `scale(${punch(clock, clock.at("travaillent", 0), 0.1, 0.4)})` }}>
          <Person size={190} on={p2 > 0.5} />
        </div>
        <div style={{ ...abs(686, 330, 190, 190), transform: `scale(${punch(clock, clock.at("rendre", 0), 0.1, 0.4)})` }}>
          <Person size={190} on={p3 > 0.5} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  11 · « tout ça possible. »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat11: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const poss = clock.at("possible", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={620}>
        <div style={abs(24, 0, 260, 260)}>
          <IconTile size={260} on={lit(clock, 0, 0.15)}>
            <Face size={150} />
          </IconTile>
        </div>
        <div style={abs(338, 0, 260, 260)}>
          <IconTile size={260} on={lit(clock, 0.2, 0.15)} icon="web-message-circle" />
        </div>
        <div style={abs(652, 0, 260, 260)}>
          <IconTile size={260} on={lit(clock, 0.4, 0.15)} icon="web-play" />
        </div>
        <div style={{ ...abs(348, 330, 240, 240), transform: `scale(${punch(clock, poss, 0.15, 0.4)})` }}>
          <CheckMark size={240} progress={clock.p(poss, 0.35)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  12 · « Son travail, c'est de créer des systèmes »                          */
/* -------------------------------------------------------------------------- */
export const Beat12: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const sys = clock.at("systèmes", 0);
  const all = lit(clock, sys, 0.2);
  const a1 = clock.p(clock.at("créer", 0), 0.3);
  const a2 = clock.p(clock.at("des", 0), 0.3);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={520}>
        <svg width={936} height={520} style={{ position: "absolute", left: 0, top: 0 }} aria-hidden="true">
          <Arrow x1={262} y1={260} x2={338} y2={260} progress={a1} />
          <Arrow x1={610} y1={260} x2={686} y2={260} progress={a2} />
        </svg>
        <div style={{ ...abs(10, 140, 240, 240), transform: `scale(${punch(clock, sys, 0.06, 0.4)})` }}>
          <IconTile size={240} on={0.5 + 0.5 * all} icon="web-download" hot={all > 0.5} />
        </div>
        <div style={{ ...abs(348, 140, 240, 240), transform: `scale(${punch(clock, sys, 0.06, 0.4)})` }}>
          <IconTile size={240} on={0.5 + 0.5 * all} hot={all > 0.5}>
            <Chip size={150} glow={all} />
          </IconTile>
        </div>
        <div style={{ ...abs(686, 140, 240, 240), transform: `scale(${punch(clock, sys, 0.06, 0.4)})` }}>
          <IconTile size={240} on={0.5 + 0.5 * all} icon="web-pointer-click" hot={all > 0.5} />
        </div>
        <Sparkle x={468} y={60} size={80} progress={clock.p(sys, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  13 · « capables d'apprendre à partir d'exemples »                          */
/* -------------------------------------------------------------------------- */
export const Beat13: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const learn = clock.at("apprendre", 0);
  const fill = clock.p(learn + 0.15, 1.4);
  const flow = frame / fps;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        {[0, 1, 2].map((index) => {
          const phase = (flow * 0.9 + index / 3) % 1;
          return (
            <div
              key={index}
              style={{
                ...abs(lerp(0, 330, phase), 40 + index * 210, 170, 170),
                opacity: Math.min(1, phase * 6) * Math.min(1, (1 - phase) * 6),
              }}
            >
              <PhotoTile size={170} on={1} kind={index === 1 ? "dog" : "cat"} />
            </div>
          );
        })}
        <div style={{ ...abs(560, 100, 340, 340), transform: `scale(${punch(clock, learn, 0.06, 0.4)})` }}>
          <IconTile size={340} on={0.6 + 0.4 * fill} hot={fill > 0.5}>
            <Chip size={220} glow={fill} />
          </IconTile>
        </div>
        <div style={{ ...abs(500, 520, 420, 44), borderRadius: radius.pill, backgroundColor: withAlpha(colors.inkInverse, 0.2), overflow: "hidden" }}>
          <div style={{ width: `${fill * 100}%`, height: "100%", backgroundColor: colors.accent }} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  14 · « pour réaliser certaines tâches. »                                   */
/* -------------------------------------------------------------------------- */
export const Beat14: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const times = [clock.at("réaliser", 0), clock.at("certaines", 0), clock.at("tâches", 0)];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {times.map((time, index) => {
          const done = lit(clock, time, 0.15);
          return (
            <div key={index} style={{ ...abs(78, index * 220, 780, 180), transform: `scale(${punch(clock, time, 0.05, 0.4)})` }}>
              <Card
                w={780}
                h={180}
                active={done > 0.5}
                style={{ flexDirection: "row", justifyContent: "flex-start", gap: 40, padding: "0 50px" }}
              >
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: radius.md,
                    border: `${strokeWidths.thick}px solid ${done > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.5)}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CheckMark size={70} progress={clock.p(time, 0.3)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
                  <Skeleton w="85%" h={28} tone={done > 0.5 ? "accent" : "soft"} />
                  <Skeleton w="55%" h={22} />
                </div>
              </Card>
            </div>
          );
        })}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  15 · « Par exemple, au lieu de dire à une »                                */
/* -------------------------------------------------------------------------- */
export const Beat15: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const lieu = clock.at("lieu", 0);
  const write = clock.p(0, 0.9);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={620}>
        <div style={{ ...abs(118, 40, 700, 520), transform: `scale(${punch(clock, lieu, 0.03, 0.4)})` }}>
          <Card w={700} h={520} dim={1 - 0.35 * lit(clock, lieu, 0.3)}>
            <Lines fill={write} count={4} w={460} />
          </Card>
        </div>
        <div style={abs(258, 100, 420, 420)}>
          <Forbidden size={420} progress={clock.p(lieu, 0.45)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  16 · « application comment reconnaître chaque animal, »                    */
/* -------------------------------------------------------------------------- */
export const Beat16: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const app = clock.at("application", 0);
  const rec = clock.at("reconnaître", 0);
  const each = clock.at("chaque", 0);
  const animal = clock.at("animal", 0);
  const sweep = clock.p(rec, Math.max(0.4, animal - rec));

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(40, 40, 360, 640), transform: `scale(${punch(clock, app, 0.06, 0.4)})` }}>
          <PhoneMock width={360} height={640}>
            <div
              style={{
                ...abs(60, 190, 200, 200),
                borderRadius: radius.lg,
                backgroundColor: colors.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Chip size={130} glow={lit(clock, app, 0.2)} />
            </div>
          </PhoneMock>
        </div>
        <div style={abs(500, 40, 300, 300)}>
          <PhotoTile size={300} kind="cat" on={0.5 + 0.5 * lit(clock, each, 0.15)} hot={lit(clock, each, 0.15) > 0.5} />
        </div>
        <div style={abs(500, 400, 300, 300)}>
          <PhotoTile size={300} kind="dog" on={0.5 + 0.5 * lit(clock, animal, 0.15)} hot={lit(clock, animal, 0.15) > 0.5} />
        </div>
        <Magnifier x={lerp(700, 700, sweep)} y={lerp(210, 560, sweep)} size={110} opacity={0.4 + 0.6 * lit(clock, rec, 0.2)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  17 · « on peut lui montrer des milliers de photos de »                     */
/* -------------------------------------------------------------------------- */
const gridKinds: readonly ("cat" | "dog" | "none")[] = [
  "cat", "dog", "none", "cat",
  "dog", "cat", "dog", "none",
  "none", "dog", "cat", "dog",
  "cat", "none", "dog", "cat",
];

export const Beat17: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const thousands = clock.at("milliers", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={850} h={850}>
        <div style={{ ...abs(0, 0, 850, 850), transform: `scale(${punch(clock, thousands, 0.05, 0.5)})` }}>
          {gridKinds.map((kind, index) => (
            <div key={index} style={abs((index % 4) * 220, Math.floor(index / 4) * 220, 190, 190)}>
              <PhotoTile size={190} kind={kind} on={lit(clock, 0.3 + index * 0.07, 0.15)} />
            </div>
          ))}
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  18 · « chats et de chiens pour qu'elle apprenne à faire la »               */
/* -------------------------------------------------------------------------- */
export const Beat18: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const cats = clock.at("chats", 0);
  const dogs = clock.at("chiens", 0);
  const learn = clock.at("apprenne", 0);
  const sort = clock.p(learn, 0.55);
  const catOn = lit(clock, cats, 0.15);
  const dogOn = lit(clock, dogs, 0.15);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={780}>
        <div style={{ ...abs(20, 460, 400, 260), opacity: 0.55 + 0.45 * sort }}>
          <Card w={400} h={260} active={sort > 0.6}>
            <Skeleton w={200} h={24} />
          </Card>
        </div>
        <div style={{ ...abs(516, 460, 400, 260), opacity: 0.55 + 0.45 * sort }}>
          <Card w={400} h={260} active={sort > 0.6}>
            <Skeleton w={200} h={24} />
          </Card>
        </div>
        <div style={{ ...abs(60, lerp(40, 470, sort), 300, 300), transform: `scale(${lerp(1, 0.42, sort) * punch(clock, cats, 0.1, 0.4)})`, transformOrigin: "center top" }}>
          <PhotoTile size={300} kind="cat" on={0.4 + 0.6 * catOn} hot={catOn > 0.5} />
        </div>
        <div style={{ ...abs(576, lerp(40, 470, sort), 300, 300), transform: `scale(${lerp(1, 0.42, sort) * punch(clock, dogs, 0.1, 0.4)})`, transformOrigin: "center top" }}>
          <PhotoTile size={300} kind="dog" on={0.4 + 0.6 * dogOn} hot={dogOn > 0.5} />
        </div>
        <div style={abs(398, 340, 140, 140)}>
          <CheckMark size={140} progress={clock.p(learn + 0.5, 0.3)} />
        </div>
      </Art>
    </Shot>
  );
};
