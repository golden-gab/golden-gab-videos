/**
 * Scènes 1 à 9 — « C'est quoi un AI engineer »
 *
 * Bloc 1 : l'accroche, la question, ce qu'une machine « intelligente » sait
 * faire (visage, question, recommandation), puis la carte-métier.
 *
 * Règles de la série : un message par plan, 3 mots maximum à l'écran, tout est
 * visible dès le début du plan (un mot prononcé déclenche une *réaction*, pas
 * l'apparition) et chaque plan déclare son gabarit de zones.
 */

import React from "react";
import { useCurrentFrame } from "remotion";

import {
  abs,
  Art,
  Burst,
  LibIcon,
  lerp,
  lit,
  Magnifier,
  PhoneMock,
  punch,
  Shockwave,
  Sparkle,
  useWordClock,
  ZoneMascot,
} from "../../../../../components/motion";
import { colors, radius } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { Card, CheckMark, Gear, Pill, Shot, Skeleton } from "../../../../web-story/kit";
import {
  Chip,
  Face,
  JobCard,
  QuestionMark,
  Robot,
  RoleCard,
  ScanFrame,
} from "../../../kit";
import { aiEngineerTranscript } from "../data/transcript.ts";

type BeatProps = { readonly scene: Scene };

const useClock = (scene: Scene) => useWordClock(scene, aiEngineerTranscript);

/* -------------------------------------------------------------------------- */
/*  01 · « C'est l'un des métiers les plus recherchés »                        */
/* -------------------------------------------------------------------------- */
export const Beat01: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const hit = clock.at("recherchés", 0);
  const travel = clock.p(0.1, Math.max(0.3, hit - 0.1));
  const on = lit(clock, hit, 0.15);
  const pop = punch(clock, hit, 0.06, 0.4);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={788}>
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            style={{ ...abs(78, index * 206, 780, 170), transform: index === 0 ? `scale(${pop})` : undefined }}
          >
            <JobCard w={780} h={170} hot={index === 0 && on > 0.5} dim={index === 0 ? 1 : 0.55} />
          </div>
        ))}
        <Magnifier x={lerp(700, 640, travel)} y={lerp(3 * 206 + 85, 85, travel)} size={110} />
        <Burst x={140} y={85} radius={90} progress={clock.p(hit, 0.6)} rays={8} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  02 · « dans la tech »                                                      */
/* -------------------------------------------------------------------------- */
export const Beat02: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("tech", 0);
  const hit = punch(clock, t, 0.14, 0.45);
  const glow = lit(clock, t, 0.3);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(208, 0, 520, 520), transform: `scale(${hit})` }}>
          <Chip size={520} glow={glow} />
        </div>
        <div style={{ ...abs(0, 590, 936, 150), display: "flex", justifyContent: "center", transform: `scale(${hit})` }}>
          <Pill size={84}>TECH</Pill>
        </div>
        <Sparkle x={150} y={120} size={80} progress={clock.p(t, 0.7)} />
        <Sparkle x={800} y={380} size={64} progress={clock.p(t + 0.1, 0.7)} color={colors.accent} />
        <Shockwave x={468} y={260} size={360} progress={clock.p(t, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  03 · « Mais au fait, c'est quoi un »                                       */
/* -------------------------------------------------------------------------- */
export const Beat03: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("quoi", 0);
  const hit = punch(clock, t, 0.12, 0.45);

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={520}>
        <div style={{ ...abs(41, 45, 430, 430), transform: `scale(${hit})` }}>
          <QuestionMark size={430} />
        </div>
        <Shockwave x={256} y={260} size={430} progress={clock.p(t, 0.7)} />
      </Art>
      <ZoneMascot scene={scene} pose="thinking" attitude="curious" from={t} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  04 · « AI engineer ? »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat04: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("engineer", 0);
  const pop = punch(clock, t, 0.1, 0.45);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <Shockwave x={468} y={350} size={420} progress={clock.p(t, 0.7)} />
        <div style={{ ...abs(58, 30, 820, 640), transform: `scale(${pop})` }}>
          <RoleCard w={820} h={640} />
        </div>
        <Sparkle x={60} y={60} size={70} progress={clock.p(t, 0.7)} />
        <Sparkle x={880} y={620} size={70} progress={clock.p(t + 0.1, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  05 · « Imagine une machine capable de »                                    */
/* -------------------------------------------------------------------------- */
export const Beat05: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const m = clock.at("machine", 0);
  const c = clock.at("capable", 0);
  const eye = lit(clock, m, 0.2);
  const turn = frame * 1.5 + 90 * clock.p(c, 0.6);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(188, 90, 560, 560), transform: `scale(${punch(clock, m, 0.1, 0.4)})` }}>
          <Robot size={560} eye={eye} />
        </div>
        <div style={abs(700, 20, 200, 200)}>
          <Gear size={200} angle={turn} />
        </div>
        <div style={abs(30, 500, 140, 140)}>
          <Gear size={140} angle={-turn} color={colors.inkInverse} />
        </div>
        <Burst x={468} y={380} radius={300} progress={clock.p(m, 0.7)} rays={10} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  06 · « reconnaître un visage, »                                            */
/* -------------------------------------------------------------------------- */
export const Beat06: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const v = clock.at("visage", 0);
  const close = clock.p(0.05, Math.max(0.3, v - 0.05));

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(258, 170, 420, 420), transform: `scale(${punch(clock, v, 0.06, 0.4)})` }}>
          <Face size={420} />
          <ScanFrame w={420} h={420} progress={close} />
        </div>
        <div style={abs(650, 60, 150, 150)}>
          <CheckMark size={150} progress={clock.p(v, 0.3)} />
        </div>
        <Burst x={468} y={380} radius={280} progress={clock.p(v, 0.6)} rays={8} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  07 · « comprendre une question ou de te »                                  */
/* -------------------------------------------------------------------------- */
export const Beat07: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const q = clock.at("question", 0);
  const a = q + 0.3;
  const asked = lit(clock, q, 0.15);
  const answered = lit(clock, a, 0.15);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div style={{ ...abs(0, 20, 440, 300), transform: `scale(${punch(clock, q, 0.08, 0.4)})` }}>
          <Card w={440} h={300} active={asked > 0.5}>
            <QuestionMark size={200} />
          </Card>
        </div>
        <div style={{ ...abs(496, 400, 440, 300), transform: `scale(${punch(clock, a, 0.08, 0.4)})` }}>
          <Card w={440} h={300} active={answered > 0.5}>
            <Skeleton w={300} h={26} tone={answered > 0.5 ? "accent" : "soft"} />
            <Skeleton w={220} h={22} />
            <CheckMark size={90} progress={clock.p(a, 0.3)} />
          </Card>
        </div>
        <svg width={936} height={720} style={{ position: "absolute", left: 0, top: 0 }} aria-hidden="true">
          <path
            d="M330 330 Q330 420 480 440"
            fill="none"
            stroke={colors.accent}
            strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray="1 26"
            opacity={0.35 + 0.65 * asked}
          />
        </svg>
        <Sparkle x={860} y={380} size={70} progress={clock.p(a, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  08 · « proposer une vidéo que tu pourrais aimer. »                         */
/* -------------------------------------------------------------------------- */
export const Beat08: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const v = clock.at("vidéo", 0);
  const l = clock.at("aimer", 0);
  const slide = (1 - clock.p(0, 0.5)) * 60;
  const playOn = lit(clock, v, 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={860}>
        <div style={abs(233, 20, 470, 820)}>
          <PhoneMock width={470} height={820}>
            <div
              style={{
                ...abs(30, 110 + slide, 378, 380),
                borderRadius: radius.lg,
                backgroundColor: playOn > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.2),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${punch(clock, v, 0.06, 0.4)})`,
              }}
            >
              <LibIcon id="web-play" size={170} color={colors.inkInverse} />
            </div>
            <div style={abs(30, 530, 378, 36)}>
              <Skeleton w="80%" h={26} />
            </div>
            <div style={abs(30, 590, 378, 130)}>
              <Skeleton w="100%" h={110} style={{ borderRadius: radius.md, opacity: 0.6 }} />
            </div>
          </PhoneMock>
        </div>
        <div
          style={{
            ...abs(640, 330, 150, 150),
            borderRadius: radius.pill,
            backgroundColor: colors.inkInverse,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${punch(clock, l, 0.3, 0.5)})`,
            boxShadow: `0 16px 40px ${withAlpha(colors.ink, 0.4)}`,
          }}
        >
          <LibIcon id="web-heart" size={92} color={colors.accent} />
        </div>
        <Burst x={715} y={405} radius={110} progress={clock.p(l, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  09 · « Eh bien, l'AI engineer est l'une des »                              */
/* -------------------------------------------------------------------------- */
export const Beat09: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("engineer", 0);
  const pop = punch(clock, t, 0.08, 0.45);

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={640}>
        <Shockwave x={256} y={320} size={320} progress={clock.p(t, 0.7)} />
        <div style={{ ...abs(6, 10, 500, 620), transform: `scale(${pop})` }}>
          <RoleCard w={500} h={620} />
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="explaining" attitude="confident" from={0.15} halo="soft" />
    </Shot>
  );
};
