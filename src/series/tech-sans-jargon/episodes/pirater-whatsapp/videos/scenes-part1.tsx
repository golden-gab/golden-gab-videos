/**
 * Plans 1 à 22 — « Comment pirater un compte WhatsApp en une minute ? »
 *
 * Bloc 1 : le hook (pirater un compte en une minute), le faux tutoriel en trois
 * étapes (« prends un cahier et note »), puis le retournement : « Désolé », il
 * n'existe pas de logiciel magique.
 *
 * Règles de la série : un message par plan, 3 mots maximum à l'écran, tout est
 * visible dès le début du plan (un mot prononcé déclenche une *réaction*, pas
 * l'apparition) et chaque plan déclare son gabarit de zones.
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
  Magnifier,
  punch,
  shake,
  Sparkle,
  ZoneMascot,
} from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import { withAlpha } from "../../../../../utils/color";
import { Arrow, Card, Padlock, Pill, Shot, Skeleton } from "../../../../web-story/kit";
import {
  Chat,
  Crosshair,
  Disc,
  Handset,
  KeyIcon,
  Keypad,
  Laptop,
  Notebook,
  PersonIcon,
  Pencil,
  Sheet,
  Stopwatch,
  Sun,
  Thought,
  TypingDots,
  Wand,
} from "../../../kit";
import { type BeatProps, ChatPhone, Checklist, Overlay, Pirate, useClock, Veto } from "./helpers";

const linear = (input: number): number => input;

/* -------------------------------------------------------------------------- */
/*  01 · « Comment pirater un compte »                                         */
/* -------------------------------------------------------------------------- */
export const Beat01: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const hack = clock.at("pirater");
  const account = clock.at("compte");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(0, 170, 300, 300), transform: `scale(${punch(clock, hack, 0.1, 0.4)})` }}>
          <Pirate size={300} on={lit(clock, hack, 0.2)} />
        </div>
        <div style={abs(336, 200, 170, 190)}>
          <Padlock size={170} open={clock.p(hack, 0.5)} />
        </div>
        <div style={{ ...abs(600, 10, 300, 620), transform: `scale(${punch(clock, account, 0.06, 0.4)})` }}>
          <ChatPhone w={300} h={620} hot={lit(clock, account, 0.2) > 0.5} />
        </div>
        <Sparkle x={560} y={140} size={70} progress={clock.p(hack, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  02 · « WhatsApp en une minute ? »                                          */
/* -------------------------------------------------------------------------- */
export const Beat02: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const one = clock.at("une");
  const minute = clock.at("minute");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(0, 20, 470, 470), transform: `scale(${punch(clock, minute, 0.06, 0.4)})` }}>
          <Stopwatch size={470} sweep={clock.p(one, 1.0, linear)} />
        </div>
        <div style={{ ...abs(0, 520, 470, 110), display: "flex", justifyContent: "center" }}>
          <Pill size={76} tone="accent">
            1:00
          </Pill>
        </div>
        <div style={abs(600, 10, 300, 620)}>
          <ChatPhone w={300} h={620} hot />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  03 · « Tu penses que c'est impossible ? »                                  */
/* -------------------------------------------------------------------------- */
export const Beat03: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const think = clock.at("penses");
  const impossible = clock.at("impossible");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <div style={abs(26, 30, 460, 380)}>
          <Thought w={460} h={300}>
            <div style={{ transform: `translateX(${shake(clock, impossible, 10, 0.5)}px)` }}>
              <Padlock size={190} open={0} color={colors.inkInverse} />
            </div>
          </Thought>
        </div>
        <div style={{ ...abs(176, 480, 160, 160), transform: `scale(${punch(clock, impossible, 0.14, 0.45)})` }}>
          <Disc size={160} sign="?" />
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="thinking" attitude="curious" from={think} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  04 · « Alors, prends un cahier »                                           */
/* -------------------------------------------------------------------------- */
export const Beat04: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const notebook = clock.at("cahier");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div style={{ ...abs(218, 40, 500, 640), transform: `rotate(${-3 + 3 * lit(clock, notebook, 0.3)}deg) scale(${punch(clock, notebook, 0.08, 0.45)})` }}>
          <Notebook w={500} h={640} />
        </div>
        <Sparkle x={150} y={150} size={80} progress={clock.p(notebook, 0.8)} color={colors.accent} />
        <Sparkle x={800} y={560} size={70} progress={clock.p(notebook + 0.15, 0.8)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  05 · « et note tout ce qui va suivre. »                                    */
/* -------------------------------------------------------------------------- */
export const Beat05: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const note = clock.at("note");
  const fill = clock.p(note, 1.0, linear);
  const rows = fill * 5.5;
  const index = Math.min(4, Math.floor(rows));
  const frac = Math.min(1, rows - index);
  const tipX = 140 + 52 + 380 * frac;
  const tipY = 40 + 133 + index * 83;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div style={abs(140, 40, 520, 640)}>
          <Sheet w={520} h={640} fill={fill} lines={5} />
        </div>
        <div style={abs(tipX - 17, tipY - 150, 170, 170)}>
          <Pencil size={170} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  06 · « Parce qu'aujourd'hui, je vais te montrer »                          */
/* -------------------------------------------------------------------------- */
export const Beat06: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const today = clock.at("aujourd'hui");
  const show = clock.at("montrer");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <div style={{ ...abs(46, 150, 420, 420), transform: `scale(${punch(clock, today, 0.1, 0.45)})` }}>
          <Sun size={420} on={lit(clock, today, 0.2) > 0.5} />
        </div>
        <Burst x={256} y={360} radius={300} progress={clock.p(today, 0.6)} rays={9} />
      </Art>
      <ZoneMascot scene={scene} pose="point" attitude="confident" from={show} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  07 · « comment les pirates s'y »                                           */
/* -------------------------------------------------------------------------- */
export const Beat07: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const pirates = clock.at("pirates");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 140, 500, 360)}>
          <Laptop size={500} on={3 * lit(clock, pirates, 0.5)} />
        </div>
        <div style={{ ...abs(590, 110, 330, 330), transform: `scale(${punch(clock, pirates, 0.1, 0.4)})` }}>
          <Pirate size={330} on={lit(clock, pirates, 0.2)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  08 · « prennent réellement. »                                              */
/* -------------------------------------------------------------------------- */
export const Beat08: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const real = clock.at("réellement");
  const move = clock.p(0, scene.end - scene.start, linear);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(168, 90, 600, 432)}>
          <Laptop size={600} on={3} />
        </div>
        <Magnifier x={lerp(280, 640, move)} y={lerp(230, 330, move)} size={200} />
        <Sparkle x={780} y={140} size={80} progress={clock.p(real, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  09 · « De 1 : »                                                            */
/* -------------------------------------------------------------------------- */
export const Beat09: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const one = clock.at("1");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(68, 30, 800, 580)}>
          <Checklist w={800} done={lit(clock, one, 0.25)} hot={0} hotScale={punch(clock, one, 0.06, 0.4)} />
        </div>
        <Sparkle x={820} y={90} size={80} progress={clock.p(one, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  10 · « Il te faut le numéro »                                              */
/* -------------------------------------------------------------------------- */
export const Beat10: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const need = clock.at("faut");
  const number = clock.at("numéro");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div style={{ ...abs(188, 20, 560, 680), transform: `scale(${punch(clock, number, 0.05, 0.4)})` }}>
          <Card w={560} h={680} active={lit(clock, number, 0.2) > 0.5}>
            <Keypad size={400} lit={12 * clock.p(need, 0.9, linear)} />
          </Card>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  11 · « de téléphone de la personne que tu veux pirater. »                  */
/* -------------------------------------------------------------------------- */
export const Beat11: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const phone = clock.at("téléphone");
  const person = clock.at("personne");
  const hack = clock.at("pirater");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(0, 30, 380, 280), transform: `scale(${punch(clock, phone, 0.08, 0.4)})` }}>
          <Card w={380} h={280} active={lit(clock, phone, 0.2) > 0.5}>
            <Handset size={150} ring={lit(clock, phone, 0.2)} />
            <Skeleton w={240} h={24} tone={lit(clock, phone, 0.2) > 0.5 ? "accent" : "soft"} />
          </Card>
        </div>
        <Overlay w={936} h={640}>
          <Arrow x1={190} y1={330} x2={560} y2={440} progress={clock.p(person - 0.3, 0.5)} />
        </Overlay>
        <div style={{ ...abs(580, 200, 300, 300), transform: `scale(${punch(clock, person, 0.08, 0.4)})` }}>
          <PersonIcon size={300} on={lit(clock, person, 0.2) > 0.5} />
        </div>
        <div style={abs(500, 120, 460, 460)}>
          <Crosshair size={460} lock={clock.p(hack, 0.5)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  12 · « De 2 : »                                                            */
/* -------------------------------------------------------------------------- */
export const Beat12: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const two = clock.at("2");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(68, 30, 800, 580)}>
          <Checklist w={800} done={1 + lit(clock, two, 0.25)} hot={1} hotScale={punch(clock, two, 0.06, 0.4)} />
        </div>
        <Sparkle x={820} y={90} size={80} progress={clock.p(two, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  13 · « Il te faut un moyen »                                               */
/* -------------------------------------------------------------------------- */
export const Beat13: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const way = clock.at("moyen");
  const on = lit(clock, way, 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(208, 60, 520, 520), transform: `scale(${punch(clock, way, 0.08, 0.4)})` }}>
          <Card w={520} h={520} active={on > 0.5}>
            <KeyIcon size={340} on={on > 0.5} />
          </Card>
        </div>
        <Sparkle x={160} y={120} size={80} progress={clock.p(way, 0.8)} color={colors.accent} />
        <Sparkle x={780} y={520} size={70} progress={clock.p(way + 0.1, 0.8)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  14 · « de la convaincre »                                                  */
/* -------------------------------------------------------------------------- */
export const Beat14: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const convince = clock.at("convaincre");
  const travel = clock.p(convince - 0.1, 0.8);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 170, 300, 300)}>
          <Pirate size={300} on={1} />
        </div>
        <div style={{ ...abs(636, 170, 300, 300), transform: `scale(${punch(clock, convince + 0.6, 0.08, 0.4)})` }}>
          <PersonIcon size={300} on={travel > 0.95} />
        </div>
        <div style={abs(lerp(260, 470, travel), 200, 220, 160)}>
          <Chat w={220} h={130} tail="left" hot>
            <TypingDots size={22} t={clock.frame / clock.fps} />
          </Chat>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  15 · « de te faire confiance. »                                            */
/* -------------------------------------------------------------------------- */
export const Beat15: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const trust = clock.at("confiance");
  const on = lit(clock, trust, 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 190, 280, 280)}>
          <PersonIcon size={280} />
        </div>
        <div style={abs(656, 190, 280, 280)}>
          <PersonIcon size={280} />
        </div>
        <div style={{ ...abs(338, 170, 260, 260), transform: `scale(${punch(clock, trust, 0.2, 0.5)})` }}>
          <LibIcon id="web-heart" size={260} color={on > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.55)} />
        </div>
        <Sparkle x={468} y={110} size={80} progress={clock.p(trust, 0.8)} color={colors.accent} />
        <Sparkle x={300} y={420} size={60} progress={clock.p(trust + 0.1, 0.8)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  16 · « Et de 3 : »                                                         */
/* -------------------------------------------------------------------------- */
export const Beat16: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const three = clock.at("3");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(68, 30, 800, 580)}>
          <Checklist w={800} done={2 + lit(clock, three, 0.25)} hot={2} hotScale={punch(clock, three, 0.06, 0.4)} />
        </div>
        <Sparkle x={820} y={90} size={80} progress={clock.p(three, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  17 · « Désolé, »                                                           */
/* -------------------------------------------------------------------------- */
export const Beat17: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const sorry = clock.at("Désolé");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <div style={{ ...abs(0, 80, 512, 560), transform: `translateX(${shake(clock, sorry + 0.1, 14, 0.6)}px)` }}>
          <Checklist w={512} done={3} broken={2} />
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="surprised" attitude="surprised" from={sorry} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  18 · « mais il n'existe pas »                                              */
/* -------------------------------------------------------------------------- */
export const Beat18: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const not = clock.at("pas");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div
          style={{
            ...abs(168, 110, 600, 420),
            borderRadius: radius.lg,
            border: `${strokeWidths.thick}px dashed ${withAlpha(colors.inkInverse, 0.5)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.85 - 0.3 * lit(clock, not, 0.3),
          }}
        >
          <Disc size={170} sign="?" color={withAlpha(colors.inkInverse, 0.3)} />
        </div>
        <div style={abs(208, 70, 520, 520)}>
          <Veto size={520} progress={clock.p(not, 0.55)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  19 · « de logiciel magique »                                               */
/* -------------------------------------------------------------------------- */
export const Beat19: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const magic = clock.at("magique");
  const t = clock.frame / clock.fps;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(40, 130, 560, 400)}>
          <BrowserFrame width={560} height={400} tone="dark">
            <div style={{ position: "absolute", left: 40, right: 40, top: 40, display: "flex", flexDirection: "column", gap: 26 }}>
              <Skeleton w="80%" h={26} />
              <Skeleton w="55%" h={26} tone="accent" />
              <Skeleton w="68%" h={26} />
            </div>
          </BrowserFrame>
        </div>
        <div style={{ ...abs(560, 60, 330, 330), transformOrigin: "20% 90%", transform: `rotate(${-14 + 28 * Math.sin(t * 7)}deg)` }}>
          <Wand size={330} />
        </div>
        <Sparkle x={820} y={90} size={90} progress={clock.p(magic, 0.7)} color={colors.accent} />
        <Sparkle x={700} y={40} size={60} progress={clock.p(magic + 0.1, 0.7)} color={colors.inkInverse} />
        <Sparkle x={900} y={230} size={70} progress={clock.p(magic + 0.2, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  20 · « capable de pirater n'importe »                                      */
/* -------------------------------------------------------------------------- */
export const Beat20: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const hack = clock.at("pirater");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(318, 60, 420, 480), transform: `translateX(${shake(clock, hack, 12, 0.5)}px)` }}>
          <Padlock size={420} open={0} />
        </div>
        <div style={{ ...abs(20, 190, 300, 300), transform: `translateX(${-60 * Math.sin(Math.PI * clock.p(hack - 0.1, 0.5))}px) rotate(-10deg)` }}>
          <Wand size={300} />
        </div>
        <Burst x={330} y={300} radius={220} progress={clock.p(hack, 0.5)} rays={7} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  21 · « quel compte WhatsApp »                                              */
/* -------------------------------------------------------------------------- */
export const Beat21: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const chat = clock.at("WhatsApp");
  const on = lit(clock, chat, 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(208, 60, 520, 520), transform: `scale(${punch(clock, chat, 0.08, 0.4)})` }}>
          <Card w={520} h={520} active={on > 0.5}>
            <LibIcon id="web-message-circle" size={320} color={on > 0.5 ? colors.accent : colors.inkInverse} />
          </Card>
        </div>
        <Sparkle x={150} y={110} size={80} progress={clock.p(chat, 0.8)} color={colors.accent} />
        <Sparkle x={800} y={540} size={70} progress={clock.p(chat + 0.1, 0.8)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  22 · « en quelques secondes. »                                             */
/* -------------------------------------------------------------------------- */
export const Beat22: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const seconds = clock.at("secondes");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(238, 90, 460, 460)}>
          <Stopwatch size={460} sweep={clock.p(0, 0.8, linear)} />
        </div>
        <div style={abs(188, 40, 560, 560)}>
          <Veto size={560} progress={clock.p(seconds + 0.1, 0.55)} />
        </div>
      </Art>
    </Shot>
  );
};
