/**
 * Scènes 12 à 22 — « Software Developer »
 *
 * Bloc 2 : faciliter des tâches, puis l'exemple fil rouge d'une app de
 * commande de repas (consulter le menu, choisir ses plats, passer la
 * commande, recevoir la confirmation) et le soin de chaque bouton.
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
  PhoneMock,
  punch,
  shake,
  Shockwave,
  Sparkle,
  useWordClock,
} from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { Arrow, Bell, Bubble, CheckMark, Forbidden, Shot, Skeleton } from "../../../../web-story/kit";
import { Basket, House, IconTile, Meal, Person, Svg } from "../../../kit";
import { softwareDeveloperTranscript } from "../data/transcript.ts";

type BeatProps = { readonly scene: Scene };

const useClock = (scene: Scene) => useWordClock(scene, softwareDeveloperTranscript);

/** Ligne de liste : case à cocher + blocs fantômes ; la coche se trace avec `done`. */
const ListRow: React.FC<{
  readonly w: number;
  readonly h: number;
  readonly done: number;
  readonly lead?: React.ReactNode;
}> = ({ w, h, done, lead }) => (
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
      padding: `0 ${h * 0.2}px`,
    }}
  >
    {lead}
    <div style={{ display: "flex", flexDirection: "column", gap: h * 0.12, flex: 1 }}>
      <Skeleton w="80%" h={h * 0.15} tone={done > 0.5 ? "accent" : "soft"} />
      <Skeleton w="52%" h={h * 0.12} />
    </div>
    <div
      style={{
        width: h * 0.56,
        height: h * 0.56,
        borderRadius: radius.md,
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

/* -------------------------------------------------------------------------- */
/*  12 · « ou de faciliter certaines tâches. »                                 */
/* -------------------------------------------------------------------------- */
export const Beat12: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const times = [clock.at("faciliter", 0), clock.at("certaines", 0), clock.at("tâches", 0)];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {times.map((t, index) => (
          <div key={index} style={{ ...abs(38, index * 215, 860, 170), transform: `scale(${punch(clock, t + 0.2, 0.04, 0.4)})` }}>
            <ListRow w={860} h={170} done={clock.p(t, 0.35)} />
          </div>
        ))}
        <Sparkle x={900} y={40} size={80} progress={clock.p(times[2], 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  13 · « Imagine une application qui permet de »                             */
/* -------------------------------------------------------------------------- */
export const Beat13: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const imagine = clock.at("Imagine", 0);
  const app = clock.at("application", 0);
  const steam = 0.6 + 0.4 * Math.sin(frame * 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={860}>
        <div style={{ ...abs(233, 20, 470, 820), transform: `scale(${punch(clock, app, 0.05, 0.45)})` }}>
          <PhoneMock width={470} height={820}>
            <div style={abs(105, 120, 260, 260)}>
              <Meal size={260} steam={steam} />
            </div>
            <div style={abs(40, 430, 390, 34)}>
              <Skeleton w="75%" h={28} />
            </div>
            <div style={abs(40, 490, 390, 26)}>
              <Skeleton w="50%" h={22} />
            </div>
            <div style={abs(40, 600, 390, 100)}>
              <Skeleton w="100%" h={100} tone="accent" style={{ borderRadius: radius.pill }} />
            </div>
          </PhoneMock>
        </div>
        <Sparkle x={130} y={170} size={100} progress={clock.p(imagine, 0.8)} color={colors.accent} />
        <Sparkle x={820} y={640} size={80} progress={clock.p(imagine + 0.15, 0.8)} />
        <Burst x={468} y={430} radius={300} progress={clock.p(app, 0.6)} rays={10} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  14 · « commander un repas »                                                */
/* -------------------------------------------------------------------------- */
export const Beat14: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const order = clock.at("commander", 0);
  const meal = clock.at("repas", 0);
  const steam = 0.6 + 0.4 * Math.sin(frame * 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={abs(20, 100, 320, 580)}>
          <PhoneMock width={320} height={580}>
            <div style={abs(30, 110, 260, 26)}>
              <Skeleton w="70%" h={24} />
            </div>
            <div style={{ ...abs(30, 440, 260, 80), transform: `scale(${punch(clock, order, -0.1, 0.3)})` }}>
              <Skeleton w="100%" h={80} tone="accent" style={{ borderRadius: radius.pill }} />
            </div>
          </PhoneMock>
        </div>
        <div style={{ ...abs(170, 440, 170, 170), transform: `scale(${punch(clock, order, -0.12, 0.3)})` }}>
          <LibIcon id="web-pointer-click" size={170} color={colors.inkInverse} />
        </div>
        <Shockwave x={170} y={500} size={260} progress={clock.p(order, 0.6)} />
        <div
          style={{
            ...abs(500, 190, 380, 380),
            opacity: 0.35 + 0.65 * lit(clock, meal, 0.2),
            transform: `scale(${punch(clock, meal, 0.16, 0.45)})`,
          }}
        >
          <Meal size={380} steam={steam * lit(clock, meal, 0.2)} />
        </div>
        <Burst x={690} y={380} radius={220} progress={clock.p(meal, 0.6)} rays={10} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  15 · « sans quitter ta maison. »                                           */
/* -------------------------------------------------------------------------- */
export const Beat15: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const leave = clock.at("quitter", 0);
  const home = clock.at("maison", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(40, 150, 460, 460), transform: `scale(${punch(clock, home, 0.1, 0.45)})` }}>
          <House size={460} lit={lit(clock, home, 0.2) > 0.5} />
        </div>
        <div style={abs(110, 400, 150, 150)}>
          <Person size={150} on />
        </div>
        <Svg w={936} h={760}>
          <Arrow x1={540} y1={480} x2={880} y2={480} progress={clock.p(0, 0.4)} color={withAlpha(colors.inkInverse, 0.7)} />
        </Svg>
        <div style={abs(580, 330, 260, 260)}>
          <Forbidden size={260} progress={clock.p(leave, 0.45)} />
        </div>
        <Sparkle x={270} y={110} size={90} progress={clock.p(home, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  16 · « Le développeur est l'une des personnes »                            */
/* -------------------------------------------------------------------------- */
export const Beat16: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const dev = clock.at("développeur", 0);
  const people = clock.at("personnes", 0);
  const around = [
    { icon: "web-message-circle", x: 20, y: 340 },
    { icon: "web-play", x: 716, y: 340 },
    { icon: "web-mail", x: 368, y: 0 },
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(278, 220, 380, 380), transform: `scale(${punch(clock, dev, 0.12, 0.45)})` }}>
          <Person size={380} on={lit(clock, dev, 0.2) > 0.5} />
        </div>
        {around.map((item, index) => (
          <div key={item.icon} style={{ ...abs(item.x, item.y, 200, 200), transform: `scale(${punch(clock, people + index * 0.12, 0.14, 0.4)})` }}>
            <Bubble size={200} active={lit(clock, people + index * 0.12, 0.2) > 0.5}>
              <LibIcon id={item.icon} size={110} color={colors.inkInverse} />
            </Bubble>
          </div>
        ))}
        <Shockwave x={468} y={410} size={460} progress={clock.p(dev, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  17 · « qui font en sorte que tu puisses »                                  */
/* -------------------------------------------------------------------------- */
export const Beat17: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const you = clock.at("tu", 0);
  const can = clock.at("puisses", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(20, 220, 260, 260), transform: `scale(${punch(clock, you, 0.12, 0.4)})` }}>
          <Bubble size={260} active={lit(clock, you, 0.2) > 0.5}>
            <Person size={170} />
          </Bubble>
        </div>
        <Svg w={936} h={700}>
          <Arrow x1={310} y1={350} x2={530} y2={350} progress={clock.p(you, 0.5)} />
        </Svg>
        <div style={abs(570, 60, 330, 600)}>
          <PhoneMock width={330} height={600}>
            <div style={abs(40, 120, 250, 250)}>
              <IconTile size={250} on={lit(clock, can, 0.2)} hot icon="web-message-circle" />
            </div>
            <div style={abs(40, 410, 250, 28)}>
              <Skeleton w="70%" h={24} />
            </div>
          </PhoneMock>
        </div>
        <div style={abs(760, 0, 150, 150)}>
          <CheckMark size={150} progress={clock.p(can, 0.4)} />
        </div>
        <Sparkle x={600} y={90} size={80} progress={clock.p(can, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  18 · « consulter le menu, »                                                */
/* -------------------------------------------------------------------------- */
export const Beat18: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const menu = clock.at("menu", 0);
  const scroll = clock.p(0, Math.max(0.6, clock.duration), (input) => input) * 24;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={800}>
        <div style={abs(248, 10, 440, 780)}>
          <PhoneMock width={440} height={780}>
            <div style={{ ...abs(30, 100, 380, 640), overflow: "hidden" }}>
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} style={{ ...abs(0, 12 + index * 150 - scroll, 380, 125), transform: index === 0 ? `scale(${punch(clock, menu, 0.05, 0.4)})` : undefined }}>
                  <ListRow
                    w={380}
                    h={125}
                    done={index === 0 ? lit(clock, menu, 0.2) : 0}
                    lead={<Meal size={80} steam={index === 0 ? lit(clock, menu, 0.3) : 0} />}
                  />
                </div>
              ))}
            </div>
          </PhoneMock>
        </div>
        <Sparkle x={150} y={150} size={90} progress={clock.p(menu, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  19 · « choisir tes plats, »                                                */
/* -------------------------------------------------------------------------- */
export const Beat19: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const pick = clock.at("choisir", 0);
  const dishes = clock.at("plats", 0);
  const times = [pick, 99, dishes];
  const travel = clock.p(pick, Math.max(0.3, dishes - pick));

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        {times.map((t, index) => (
          <div key={index} style={abs(38, index * 215, 860, 170)}>
            <ListRow w={860} h={170} done={clock.p(t, 0.3)} lead={<Meal size={120} steam={clock.p(t, 0.3)} />} />
          </div>
        ))}
        <div style={abs(700, lerp(80, 440, travel), 150, 150)}>
          <LibIcon id="web-pointer-click" size={150} color={colors.inkInverse} />
        </div>
        <Burst x={840} y={85} radius={110} progress={clock.p(pick, 0.6)} rays={8} />
        <Burst x={840} y={515} radius={110} progress={clock.p(dishes, 0.6)} rays={8} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  20 · « passer ta commande »                                                */
/* -------------------------------------------------------------------------- */
export const Beat20: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const order = clock.at("commande", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(78, 0, 780, 150)}>
          <ListRow w={780} h={150} done={1} lead={<Meal size={100} steam={0.6} />} />
        </div>
        <div
          style={{
            ...abs(78, 220, 780, 220),
            borderRadius: radius.pill,
            backgroundColor: colors.accent,
            boxShadow: `0 24px 60px ${withAlpha(colors.accent, 0.45)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${punch(clock, order, -0.07, 0.35)})`,
          }}
        >
          <Basket size={140} />
        </div>
        <div style={{ ...abs(600, 330, 170, 170), transform: `scale(${punch(clock, order, -0.12, 0.3)})` }}>
          <LibIcon id="web-pointer-click" size={170} color={colors.inkInverse} />
        </div>
        <Shockwave x={690} y={350} size={300} progress={clock.p(order, 0.6)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  21 · « et recevoir une confirmation. »                                     */
/* -------------------------------------------------------------------------- */
export const Beat21: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const receive = clock.at("recevoir", 0);
  const confirm = clock.at("confirmation", 0);
  const done = clock.p(confirm, 0.4);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={abs(60, 0, 200, 200)}>
          <Bell size={200} swing={shake(clock, receive, 24, 0.9)} />
        </div>
        <div
          style={{
            ...abs(38, 260, 860, 300),
            borderRadius: radius.lg,
            backgroundColor: withAlpha(colors.ink, 0.88),
            border: `${strokeWidths.thick}px solid ${done > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.28)}`,
            boxShadow: `0 24px 60px ${withAlpha(colors.ink, 0.45)}`,
            display: "flex",
            alignItems: "center",
            gap: 48,
            padding: "0 56px",
            transform: `scale(${punch(clock, confirm, 0.06, 0.45)})`,
          }}
        >
          <Bubble size={170} active={done > 0.5}>
            <CheckMark size={110} progress={done} color={colors.inkInverse} />
          </Bubble>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, flex: 1 }}>
            <Skeleton w="90%" h={34} tone={done > 0.5 ? "accent" : "soft"} />
            <Skeleton w="60%" h={26} />
          </div>
        </div>
        <Sparkle x={850} y={230} size={90} progress={clock.p(confirm, 0.7)} color={colors.accent} />
        <Sparkle x={80} y={600} size={70} progress={clock.p(confirm + 0.1, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  22 · « Chaque bouton, chaque fonctionnalité »                              */
/* -------------------------------------------------------------------------- */
export const Beat22: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const button = clock.at("bouton", 0);
  const feature = clock.at("fonctionnalité", 0);
  const buttons = Array.from({ length: 8 }, (_, index) => index);
  const step = Math.max(0.05, (feature - 0.05) / buttons.length);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={740}>
        {buttons.map((index) => {
          const on = lit(clock, 0.05 + index * step, 0.15);

          return (
            <div
              key={index}
              style={{
                ...abs(38 + (index % 2) * 450, Math.floor(index / 2) * 190, 410, 140),
                borderRadius: radius.pill,
                backgroundColor: on > 0.5 ? colors.accent : withAlpha(colors.ink, 0.85),
                border: `${strokeWidths.thick}px solid ${on > 0.5 ? withAlpha(colors.inkInverse, 0.5) : withAlpha(colors.inkInverse, 0.28)}`,
                boxShadow: on > 0.5 ? `0 18px 44px ${withAlpha(colors.accent, 0.4)}` : `0 12px 30px ${withAlpha(colors.ink, 0.4)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${index === 0 ? punch(clock, button, 0.08, 0.4) : 1})`,
              }}
            >
              <Skeleton w="46%" h={28} tone="soft" style={{ backgroundColor: withAlpha(colors.inkInverse, on > 0.5 ? 0.85 : 0.3) }} />
            </div>
          );
        })}
        <Burst x={468} y={370} radius={360} progress={clock.p(feature, 0.7)} rays={12} />
      </Art>
    </Shot>
  );
};
