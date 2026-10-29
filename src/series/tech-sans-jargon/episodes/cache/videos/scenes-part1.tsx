/**
 * Plans 1 à 18 — « C'est quoi le cache ? »
 *
 * Bloc 1 : l'accroche (« vide ton cache », on fait semblant de comprendre),
 * puis l'image de la cuisine : le sel qu'on garde sous la main plutôt que d'aller
 * le racheter au marché à chaque fois, et le téléphone qui fait « presque la
 * même chose ».
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
  Icon,
  LibIcon,
  lit,
  punch,
  shake,
  Sparkle,
  ZoneMascot,
} from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import { withAlpha } from "../../../../../utils/color";
import { Arrow, Card, CheckMark, Shot, Zzz, useSince } from "../../../../web-story/kit";
import { BankCard, Disc, PersonIcon, Thought } from "../../../kit";
import {
  At,
  Drop,
  Jar,
  JarOnShelf,
  MsgPhone,
  Overlay,
  PageBody,
  Pot,
  SayArt,
  Stall,
  Tangle,
  DayDot,
  EqualSign,
  type BeatProps,
  useClock,
} from "./helpers";

const linear = (input: number): number => input;

/* -------------------------------------------------------------------------- */
/*  01 · « Quelqu'un t'a déjà dit : »                                          */
/* -------------------------------------------------------------------------- */
export const Beat01: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <SayArt clock={clock} whoAt={clock.at("Quelqu'un")} sayAt={clock.at("dit")} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  02 · « Vide ton cache ? »                                                  */
/* -------------------------------------------------------------------------- */
export const Beat02: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const empty = clock.at("Vide");
  const cache = clock.at("cache");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={90} y={0} w={340} h={640} scale={punch(clock, empty, 0.05, 0.4)}>
          <MsgPhone w={340} h={640} hot={lit(clock, empty, 0.2) > 0.5} />
        </At>
        <At x={520} y={130} w={320} h={320} scale={punch(clock, cache, 0.18, 0.5)}>
          <Disc size={320} sign="?" />
        </At>
        <Sparkle x={820} y={110} size={80} progress={clock.p(cache, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  03 · « Et toi, tu as fait »                                                */
/* -------------------------------------------------------------------------- */
export const Beat03: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const you = clock.at("toi");
  const done = clock.at("fait");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <Overlay w={936} h={640}>
          <Arrow x1={40} y1={320} x2={262} y2={320} progress={clock.p(you, 0.35)} />
        </Overlay>
        <At x={300} y={110} w={360} h={420} scale={punch(clock, you, 0.06, 0.4)}>
          <Card w={360} h={420} active={lit(clock, you, 0.2) > 0.5}>
            <PersonIcon size={280} on={lit(clock, you, 0.2) > 0.5} />
          </Card>
        </At>
        <At x={640} y={70} w={170} h={170} scale={punch(clock, done, 0.2, 0.45)}>
          <Disc size={170}>
            <CheckMark size={110} progress={clock.p(done, 0.3)} color={colors.inkInverse} />
          </Disc>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  04 · « semblant de comprendre ? »                                          */
/* -------------------------------------------------------------------------- */
export const Beat04: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const pretend = clock.at("semblant");
  const understand = clock.at("comprendre");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <div style={abs(26, 30, 460, 380)}>
          <Thought w={460} h={300}>
            <div style={{ transform: `scale(${punch(clock, pretend, 0.1, 0.45)})` }}>
              <CheckMark size={190} progress={clock.p(pretend, 0.35)} color={colors.inkInverse} />
            </div>
          </Thought>
        </div>
        <div style={{ ...abs(176, 480, 160, 160), transform: `scale(${punch(clock, understand, 0.16, 0.45)})` }}>
          <Disc size={160} sign="?" />
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="thinking" attitude="curious" halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  05 · « Pourtant, c'est beaucoup »                                          */
/* -------------------------------------------------------------------------- */
export const Beat05: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const lots = clock.at("beaucoup");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={36} y={40} w={864} h={560} scale={punch(clock, lots, 0.05, 0.4)}>
          <Card w={864} h={560}>
            <Tangle w={700} h={420} calm={0} jitter={shake(clock, lots, 12, 0.55)} />
          </Card>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  06 · « plus simple que tu ne le penses. »                                  */
/* -------------------------------------------------------------------------- */
export const Beat06: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const simple = clock.at("simple");
  const guess = clock.at("penses");
  const calm = clock.p(simple, 0.8);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={36} y={40} w={864} h={560}>
          <Card w={864} h={560} active={calm > 0.9}>
            <Tangle w={700} h={420} calm={calm} />
          </Card>
        </At>
        <At x={650} y={0} w={170} h={170} scale={punch(clock, guess, 0.2, 0.45)}>
          <Disc size={170}>
            <CheckMark size={110} progress={clock.p(guess, 0.3)} color={colors.inkInverse} />
          </Disc>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  07 · « Imagine que tu cuisines »                                           */
/* -------------------------------------------------------------------------- */
export const Beat07: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const cook = clock.at("cuisines");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={190} y={60} w={560} h={504} scale={punch(clock, cook, 0.05, 0.5)}>
          <Pot size={560} steam={clock.p(cook, 1.2, linear)} />
        </At>
        <Sparkle x={150} y={150} size={80} progress={clock.p(cook, 0.9)} color={colors.accent} />
        <Sparkle x={800} y={110} size={64} progress={clock.p(cook + 0.15, 0.9)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  08 · « tous les jours. »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat08: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const every = clock.at("tous");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={36} y={150} w={864} h={340}>
          <Card w={864} h={340} active={lit(clock, every + 0.5, 0.2) > 0.5}>
            <div style={{ display: "flex", gap: 26 }}>
              {Array.from({ length: 7 }, (_, index) => (
                <div key={index} style={{ transform: `scale(${1 + 0.12 * Math.sin(Math.PI * Math.min(1, Math.max(0, clock.p(every + index * 0.08, 0.3, linear))))})` }}>
                  <DayDot size={90} on={lit(clock, every + index * 0.08, 0.1) > 0.5} />
                </div>
              ))}
            </div>
          </Card>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  09 · « Chaque fois que tu as besoin de sel, »                              */
/* -------------------------------------------------------------------------- */
export const Beat09: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const need = clock.at("besoin");
  const salt = clock.at("sel");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={250} y={30} w={360} h={432} scale={punch(clock, salt, 0.08, 0.45)}>
          <Jar size={360} fill={1 - clock.p(need, 0.6, linear)} on={lit(clock, salt, 0.2) > 0.5} />
        </At>
        <At x={640} y={100} w={220} h={220} scale={punch(clock, salt, 0.2, 0.5)}>
          <Disc size={220} sign="!" />
        </At>
        <Burst x={730} y={210} radius={190} progress={clock.p(salt, 0.7)} rays={8} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  10 · « tu dois aller au marché »                                           */
/* -------------------------------------------------------------------------- */
export const Beat10: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const go = clock.at("aller");
  const market = clock.at("marché");
  const walk = clock.p(go, 0.8, linear);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <Overlay w={936} h={640}>
          <line x1={80} y1={500} x2={600} y2={500} stroke={withAlpha(colors.inkInverse, 0.5)} strokeWidth={12} strokeLinecap="round" strokeDasharray="4 26" />
        </Overlay>
        <At x={40 + 480 * walk} y={310 + 8 * Math.sin(walk * 18)} w={190} h={190}>
          <PersonIcon size={190} on />
        </At>
        <At x={600} y={150} w={300} h={258} scale={punch(clock, market, 0.12, 0.5)}>
          <Stall size={300} on={lit(clock, market, 0.2) > 0.5} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  11 · « pour en acheter. »                                                  */
/* -------------------------------------------------------------------------- */
export const Beat11: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const buy = clock.at("acheter");
  const pay = clock.p(buy, 0.5);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={40} y={190} w={400} h={252} scale={punch(clock, buy, 0.08, 0.4)}>
          <BankCard w={400} on={lit(clock, buy, 0.15)} />
        </At>
        <Overlay w={936} h={640}>
          <Arrow x1={470} y1={330} x2={600} y2={330} progress={pay} />
        </Overlay>
        <At x={640} y={90} w={250} h={300} scale={punch(clock, buy + 0.4, 0.1, 0.4)}>
          <Jar size={250} fill={0.08 + 0.92 * pay} on={pay > 0.9} />
        </At>
        <At x={360} y={40} w={120} h={120} scale={punch(clock, buy, 0.2, 0.45)}>
          <Disc size={120}>
            <CheckMark size={80} progress={pay} color={colors.inkInverse} />
          </Disc>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  12 · « C'est fatigant, non ? »                                             */
/* -------------------------------------------------------------------------- */
export const Beat12: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const tired = clock.at("fatigant");
  const since = useSince(tired);
  const sway = Math.sin(clock.frame / 6) * 3;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={310} y={110} w={330} h={330} rotate={sway}>
          <PersonIcon size={330} />
        </At>
        {[0, 1].map((index) => (
          <div key={index} style={abs(index === 0 ? 290 : 600, 110 + ((clock.frame * 3 + index * 50) % 120), 54, 70)}>
            <Drop size={54} />
          </div>
        ))}
        <Zzz x={640} y={250} seconds={since} size={90} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  13 · « Alors, tu décides »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat13: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const decide = clock.at("décides");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={288} y={60} w={360} h={360} scale={punch(clock, decide, 0.14, 0.5)}>
          <Disc size={360}>
            <Icon kind="bulb" size={230} color={colors.inkInverse} strokeWidth={3} />
          </Disc>
        </At>
        <Burst x={468} y={240} radius={290} progress={clock.p(decide, 0.8)} rays={9} />
        <Sparkle x={160} y={120} size={80} progress={clock.p(decide, 0.9)} />
        <Sparkle x={780} y={140} size={80} progress={clock.p(decide + 0.1, 0.9)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  14 · « d'en garder un peu dans ta cuisine »                                */
/* -------------------------------------------------------------------------- */
export const Beat14: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const keep = clock.at("garder");
  const kitchen = clock.at("cuisine");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={198} y={190} w={340} h={300} scale={2}>
          <JarOnShelf drop={0.66 + 0.34 * clock.p(keep, 0.55)} fill={0.55} on={lit(clock, kitchen, 0.2) > 0.5} />
        </At>
        <Sparkle x={150} y={420} size={72} progress={clock.p(kitchen, 0.9)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  15 · « pour l'avoir sous la main. »                                        */
/* -------------------------------------------------------------------------- */
export const Beat15: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const hand = clock.at("main");
  const reach = clock.p(hand - 0.5, 0.5);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={40} y={190} w={280} h={280} scale={punch(clock, hand, 0.06, 0.4)}>
          <PersonIcon size={280} on={lit(clock, hand, 0.2) > 0.5} />
        </At>
        <Overlay w={936} h={640}>
          <Arrow x1={330} y1={360} x2={500} y2={360} progress={reach} />
        </Overlay>
        <At x={540} y={150} w={340} h={300}>
          <JarOnShelf fill={0.55} on={lit(clock, hand, 0.2) > 0.5} />
        </At>
        <At x={660} y={0} w={130} h={130} scale={punch(clock, hand, 0.2, 0.45)}>
          <Disc size={130}>
            <CheckMark size={86} progress={clock.p(hand, 0.3)} color={colors.inkInverse} />
          </Disc>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  16 · « Eh bien, ton téléphone »                                            */
/* -------------------------------------------------------------------------- */
export const Beat16: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const phone = clock.at("téléphone");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={278} y={0} w={380} h={640} scale={punch(clock, phone, 0.08, 0.5)}>
          <MsgPhone w={380} h={640} hot={lit(clock, phone, 0.2) > 0.5} />
        </At>
        <Burst x={468} y={320} radius={440} progress={clock.p(phone, 0.8)} rays={10} />
        <Sparkle x={140} y={140} size={84} progress={clock.p(phone, 0.9)} color={colors.accent} />
        <Sparkle x={800} y={470} size={84} progress={clock.p(phone + 0.1, 0.9)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  17 · « fait presque la même chose ! »                                      */
/* -------------------------------------------------------------------------- */
export const Beat17: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const same = clock.at("même");
  const on = lit(clock, same, 0.2) > 0.5;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={20} y={60} w={260} h={480} scale={punch(clock, same, 0.05, 0.45)}>
          <MsgPhone w={260} h={480} hot={on} />
        </At>
        <At x={370} y={190} w={190} h={190} scale={punch(clock, same, 0.22, 0.5)}>
          <EqualSign size={190} on={on} />
        </At>
        <At x={600} y={100} w={340} h={300} scale={punch(clock, same, 0.05, 0.45)}>
          <JarOnShelf fill={0.55} on={on} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  18 · « Quand tu visites un site Internet »                                 */
/* -------------------------------------------------------------------------- */
export const Beat18: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const site = clock.at("site");
  const net = clock.at("Internet");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={60} y={40} w={760} h={520} scale={punch(clock, site, 0.04, 0.45)}>
          <BrowserFrame width={760} height={520} tone="light">
            <PageBody w={760} fill={1} hot={lit(clock, site, 0.2) > 0.5} />
          </BrowserFrame>
        </At>
        <At x={650} y={400} w={200} h={200} scale={punch(clock, net, 0.2, 0.5)}>
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: radius.pill,
              backgroundColor: lit(clock, net, 0.2) > 0.5 ? colors.accent : withAlpha(colors.ink, 0.88),
              border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.5)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LibIcon id="web-globe" size={116} color={colors.inkInverse} />
          </div>
        </At>
      </Art>
    </Shot>
  );
};
