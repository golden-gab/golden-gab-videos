/**
 * Scènes 1 à 11 — « Software Developer »
 *
 * Bloc 1 : les apps qu'on utilise chaque jour, les personnes qui les
 * construisent, le métier (EN → FR), puis ce que fait un développeur
 * (créer des applications et des logiciels qui résolvent un problème).
 *
 * Règles de la série : un message par plan, 3 mots maximum à l'écran, tout est
 * visible dès le début du plan (un mot prononcé déclenche une *réaction*, pas
 * l'apparition) et chaque plan déclare son gabarit de zones.
 */

import React from "react";
import { useCurrentFrame } from "remotion";

import { BrandText } from "../../../../../components/common/BrandText";
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
  shake,
  Shockwave,
  Sparkle,
  useWordClock,
  ZoneMascot,
} from "../../../../../components/motion";
import { colors, radius } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { Arrow, Bubble, CheckMark, Gear, Moon, Pill, Shot, Skeleton } from "../../../../web-story/kit";
import {
  Briefcase,
  CodeLines,
  CodeTag,
  IconTile,
  Person,
  RoleCard,
  Sun,
  Svg,
} from "../../../kit";
import { softwareDeveloperTranscript } from "../data/transcript.ts";

type BeatProps = { readonly scene: Scene };

const useClock = (scene: Scene) => useWordClock(scene, softwareDeveloperTranscript);

/* -------------------------------------------------------------------------- */
/*  01 · « Derrière WhatsApp, Facebook »                                       */
/* -------------------------------------------------------------------------- */
export const Beat01: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const wa = clock.at("WhatsApp", 0);
  const fb = clock.at("Facebook", 0);
  const tiles = [
    { icon: "web-message-circle", t: wa, x: 30, y: 150 },
    { icon: "web-users", t: fb, x: 236, y: 150 },
    { icon: "web-mail", t: 99, x: 30, y: 356 },
    { icon: "web-globe", t: 99, x: 236, y: 356 },
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={860}>
        <div style={abs(233, 20, 470, 820)}>
          <PhoneMock width={470} height={820}>
            {tiles.map((tile) => (
              <div
                key={tile.icon}
                style={{ ...abs(tile.x, tile.y, 170, 170), transform: `scale(${punch(clock, tile.t, 0.14, 0.4)})` }}
              >
                <IconTile size={170} on={lit(clock, tile.t, 0.2)} hot icon={tile.icon} />
              </div>
            ))}
            <div style={abs(30, 570, 410, 36)}>
              <Skeleton w="70%" h={26} />
            </div>
          </PhoneMock>
        </div>
        <Burst x={190} y={235} radius={120} progress={clock.p(wa, 0.6)} rays={9} />
        <Burst x={745} y={235} radius={120} progress={clock.p(fb, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  02 · « ou encore les applications »                                        */
/* -------------------------------------------------------------------------- */
const gridIcons: readonly string[] = [
  "web-bell", "web-credit-card", "web-newspaper", "web-play",
  "web-heart", "web-globe", "web-lock", "web-mail",
  "web-download", "web-users", "web-puzzle", "web-message-circle",
];

export const Beat02: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const start = clock.at("encore", 0);
  const apps = clock.at("applications", 0);
  const step = Math.max(0.03, (apps - start) / gridIcons.length);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(0, 0, 936, 700), transform: `scale(${punch(clock, apps, 0.05, 0.45)})` }}>
          {gridIcons.map((icon, index) => (
            <div key={icon} style={abs((index % 4) * 245, Math.floor(index / 4) * 250, 200, 200)}>
              <IconTile size={200} on={lit(clock, start + index * step, 0.15)} hot={index % 3 === 0} icon={icon} />
            </div>
          ))}
        </div>
        <Sparkle x={930} y={20} size={90} progress={clock.p(apps, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  03 · « que tu utilises chaque jour, »                                      */
/* -------------------------------------------------------------------------- */
export const Beat03: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const tap = clock.at("utilises", 0);
  const each = clock.at("chaque", 0);
  const day = clock.at("jour", 0);
  const press = punch(clock, tap, -0.12, 0.3);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={800}>
        <div style={{ ...abs(20, 40, 220, 220), opacity: 0.35 + 0.65 * lit(clock, each, 0.2) }}>
          <Sun size={220} angle={frame * 1.2} />
        </div>
        <div style={{ ...abs(716, 40, 200, 200), opacity: 0.35 + 0.65 * lit(clock, day, 0.2) }}>
          <Moon size={200} />
        </div>
        <div style={abs(268, 20, 400, 760)}>
          <PhoneMock width={400} height={760}>
            <div style={abs(30, 100, 340, 200)}>
              <Skeleton w="100%" h={200} style={{ borderRadius: radius.md, opacity: 0.6 }} />
            </div>
            <div style={abs(30, 340, 340, 30)}>
              <Skeleton w="80%" h={26} />
            </div>
            <div style={abs(30, 400, 340, 30)}>
              <Skeleton w="55%" h={22} />
            </div>
          </PhoneMock>
        </div>
        <div style={{ ...abs(440, 470, 170, 170), transform: `scale(${press})` }}>
          <LibIcon id="web-pointer-click" size={170} color={colors.accent} />
        </div>
        <Shockwave x={468} y={500} size={300} progress={clock.p(tap, 0.6)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  04 · « Il y a des personnes qui les construisent. »                        */
/* -------------------------------------------------------------------------- */
export const Beat04: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const people = clock.at("personnes", 0);
  const build = clock.at("construisent", 0);
  const snap = clock.p(build, 0.4);
  const gap = lerp(70, 8, snap);
  const blocks = [
    { dx: -1, dy: -1, hot: true },
    { dx: 1, dy: -1, hot: false },
    { dx: -1, dy: 1, hot: false },
    { dx: 1, dy: 1, hot: true },
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(10, 250, 240, 240), transform: `scale(${punch(clock, people, 0.1, 0.4)})` }}>
          <Person size={240} on={lit(clock, people, 0.2) > 0.5} />
        </div>
        <div style={{ ...abs(686, 250, 240, 240), transform: `scale(${punch(clock, people, 0.1, 0.4)})` }}>
          <Person size={240} on={lit(clock, people, 0.2) > 0.5} />
        </div>
        {blocks.map((block, index) => (
          <div
            key={index}
            style={{
              ...abs(468 + block.dx * (82 + gap / 2) - 82, 380 + block.dy * (82 + gap / 2) - 82, 164, 164),
              borderRadius: radius.lg,
              backgroundColor: block.hot ? colors.accent : withAlpha(colors.inkInverse, 0.85),
              boxShadow: `0 14px 36px ${withAlpha(colors.ink, 0.4)}`,
            }}
          />
        ))}
        <Shockwave x={468} y={380} size={420} progress={clock.p(build + 0.3, 0.6)} />
        <Sparkle x={468} y={110} size={90} progress={clock.p(build + 0.3, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  05 · « Et l'un des métiers qui permettent de faire ça, »                   */
/* -------------------------------------------------------------------------- */
export const Beat05: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const job = clock.at("métiers", 0);
  const make = clock.at("faire", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(200, 120, 500, 500), transform: `scale(${punch(clock, job, 0.12, 0.45)})` }}>
          <Briefcase size={500} lit={lit(clock, job, 0.2)} />
        </div>
        <div style={{ ...abs(620, 30, 250, 250), opacity: 0.4 + 0.6 * lit(clock, make, 0.25) }}>
          <Gear size={250} angle={frame * 2.4} />
        </div>
        <Shockwave x={450} y={370} size={460} progress={clock.p(job, 0.7)} />
        <Sparkle x={110} y={150} size={80} progress={clock.p(make, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  06 · « c'est Software Developer. »                                         */
/* -------------------------------------------------------------------------- */
export const Beat06: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const dev = clock.at("Developer", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(38, 30, 860, 640), transform: `scale(${punch(clock, dev, 0.08, 0.5)})` }}>
          <RoleCard
            w={860}
            h={640}
            label="SOFTWARE DEVELOPER"
            badge={
              <Bubble size={270}>
                <CodeTag size={170} />
              </Bubble>
            }
          />
        </div>
        <Shockwave x={468} y={350} size={640} progress={clock.p(dev, 0.7)} />
        <Sparkle x={60} y={60} size={80} progress={clock.p(dev, 0.7)} />
        <Sparkle x={880} y={640} size={70} progress={clock.p(dev + 0.1, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  07 · « En français, on parle de »                                          */
/* -------------------------------------------------------------------------- */
export const Beat07: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const fr = clock.at("français", 0);

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={560}>
        <div style={{ ...abs(0, 30, 512, 140), display: "flex", justifyContent: "center" }}>
          <Pill size={84} tone="dark">EN</Pill>
        </div>
        <Svg w={512} h={560}>
          <Arrow x1={256} y1={190} x2={256} y2={350} progress={clock.p(0.1, 0.5)} />
        </Svg>
        <div
          style={{
            ...abs(0, 390, 512, 140),
            display: "flex",
            justifyContent: "center",
            transform: `scale(${punch(clock, fr, 0.14, 0.45)})`,
          }}
        >
          <Pill size={84} tone={lit(clock, fr, 0.2) > 0.5 ? "accent" : "dark"}>FR</Pill>
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="explaining" attitude="confident" from={fr} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  08 · « développeur logiciel. »                                             */
/* -------------------------------------------------------------------------- */
export const Beat08: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const dev = clock.at("développeur", 0);
  const soft = clock.at("logiciel", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(368, 0, 200, 200), transform: `scale(${punch(clock, dev, 0.18, 0.45)})` }}>
          <Bubble size={200}>
            <CodeTag size={124} />
          </Bubble>
        </div>
        <div style={{ ...abs(88, 220, 760, 460), transform: `scale(${punch(clock, soft, 0.05, 0.45)})` }}>
          <BrowserFrame width={760} height={460} tone="dark">
            <div style={abs(50, 36, 640, 340)}>
              <CodeLines w={560} lit={lit(clock, soft, 0.15)} />
            </div>
          </BrowserFrame>
        </div>
        <Sparkle x={860} y={220} size={80} progress={clock.p(soft, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  09 · « Son travail consiste à créer des »                                  */
/* -------------------------------------------------------------------------- */
export const Beat09: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const make = clock.at("créer", 0);
  const pieces = [
    abs(30, 100, 340, 40),
    abs(30, 170, 340, 190),
    abs(30, 390, 160, 160),
    abs(210, 390, 160, 160),
    abs(30, 590, 340, 70),
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={800}>
        <svg width={936} height={800} style={{ position: "absolute", left: 0, top: 0 }} aria-hidden="true">
          <rect
            x={228}
            y={20}
            width={480}
            height={760}
            rx={56}
            fill="none"
            stroke={colors.accent}
            strokeWidth={6}
            strokeDasharray="22 16"
            opacity={0.6 + 0.4 * lit(clock, make, 0.2)}
          />
        </svg>
        <div style={abs(268, 40, 400, 720)}>
          <PhoneMock width={400} height={720}>
            {pieces.map((style, index) => (
              <div key={index} style={{ ...style, transform: `scale(${punch(clock, make + index * 0.08, 0.14, 0.4)})` }}>
                <Skeleton
                  w="100%"
                  h={typeof style.height === "number" ? style.height : 40}
                  tone={index === 4 && lit(clock, make, 0.4) > 0.5 ? "accent" : "soft"}
                  style={{ borderRadius: radius.md }}
                />
              </div>
            ))}
          </PhoneMock>
        </div>
        <Sparkle x={150} y={160} size={90} progress={clock.p(make, 0.7)} color={colors.accent} />
        <Sparkle x={800} y={640} size={80} progress={clock.p(make + 0.1, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  10 · « applications et des logiciels »                                     */
/* -------------------------------------------------------------------------- */
export const Beat10: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const apps = clock.at("applications", 0);
  const soft = clock.at("logiciels", 0);
  const glow = (on: number) => `0 0 0 ${8 * on}px ${withAlpha(colors.accent, 0.9)}, 0 24px 60px ${withAlpha(colors.ink, 0.4)}`;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div
          style={{
            ...abs(20, 40, 330, 620),
            borderRadius: radius.xl,
            boxShadow: glow(lit(clock, apps, 0.2)),
            transform: `scale(${punch(clock, apps, 0.07, 0.45)})`,
          }}
        >
          <PhoneMock width={330} height={620}>
            <div style={abs(30, 110, 270, 150)}>
              <IconTile size={150} on={lit(clock, apps, 0.2)} hot icon="web-message-circle" />
            </div>
            <div style={abs(30, 300, 270, 30)}>
              <Skeleton w="75%" h={24} />
            </div>
          </PhoneMock>
        </div>
        <div
          style={{
            ...abs(390, 150, 530, 420),
            borderRadius: radius.md,
            boxShadow: glow(lit(clock, soft, 0.2)),
            transform: `scale(${punch(clock, soft, 0.07, 0.45)})`,
          }}
        >
          <BrowserFrame width={530} height={420} tone="dark">
            <div style={abs(36, 30, 440, 320)}>
              <CodeLines w={400} lit={lit(clock, soft, 0.2)} />
            </div>
          </BrowserFrame>
        </div>
        <Burst x={185} y={350} radius={150} progress={clock.p(apps, 0.6)} rays={9} />
        <Burst x={655} y={360} radius={170} progress={clock.p(soft, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  11 · « qui permettent de résoudre des problèmes »                          */
/* -------------------------------------------------------------------------- */
export const Beat11: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const solve = clock.at("résoudre", 0);
  const problems = clock.at("problèmes", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(20, 230, 240, 240), transform: `translateX(${shake(clock, problems, 16, 0.5)}px)` }}>
          <Bubble size={240} active={false}>
            <BrandText role="display" color={colors.accent} style={{ fontSize: 180, lineHeight: 1 }}>
              !
            </BrandText>
          </Bubble>
        </div>
        <Svg w={936} h={700}>
          <Arrow x1={300} y1={350} x2={560} y2={350} progress={clock.p(solve, 0.4)} />
        </Svg>
        <div style={{ ...abs(600, 200, 300, 300), transform: `scale(${punch(clock, solve, 0.1, 0.45)})` }}>
          <IconTile size={300} on={lit(clock, solve, 0.2)} hot icon="web-puzzle" />
        </div>
        <div style={abs(760, 110, 140, 140)}>
          <CheckMark size={140} progress={clock.p(solve + 0.3, 0.4)} />
        </div>
        <Sparkle x={620} y={190} size={80} progress={clock.p(solve + 0.1, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};
