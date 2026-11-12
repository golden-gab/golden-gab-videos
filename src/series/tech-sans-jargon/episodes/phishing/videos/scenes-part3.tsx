/**
 * Plans 37 à 53 — « Le faux message “tu as gagné un iPhone” »
 *
 * Bloc 3 : le principe (appât, clic, informations), puis le réflexe : pas de
 * participation, pas de gain ; ne pas cliquer, ne rien renseigner, signaler ;
 * et la question finale qui relance les commentaires.
 */

import React from "react";

import { Art, lerp, punch, shake, Sparkle, ZoneMascot } from "../../../../../components/motion";
import { colors } from "../../../../../config";
import { withAlpha } from "../../../../../utils/color";
import { Arrow, Bell, CheckMark, CrossMark, Padlock, Shot, Skeleton } from "../../../../web-story/kit";
import { Chat, PersonIcon, Pencil, Sheet, Stopwatch, Incognito, BankCard } from "../../../kit";
import {
  At,
  BigDisc,
  Cursor,
  Envelope,
  FormCard,
  Flag,
  GamePad,
  Gift,
  Hook,
  IdCard,
  MsgPhone,
  Overlay,
  Trophy,
  UiButton,
  Veto,
  Warning,
  easeOut,
  on,
  pop,
  since,
  type BeatProps,
  useClock,
} from "./helpers";

const ART_W = 936;
const ART_H = 640;
const SIDE_W = 512;
const SIDE_H = 720;

const lin = (t: number): number => t;

/* -------------------------------------------------------------------------- */
/*  37 · « Le principe est simple : » (mascotte qui explique)                  */
/* -------------------------------------------------------------------------- */
export const Beat37: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const keys = ["principe", "est", "simple:"] as const;

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={SIDE_W} h={SIDE_H}>
        <Overlay w={SIDE_W} h={SIDE_H}>
          {[0, 1].map((index) => (
            <path key={index} d={`M256 ${190 + index * 250} V${252 + index * 250}`} stroke={withAlpha(colors.inkInverse, 0.4)} strokeWidth={8} strokeLinecap="round" strokeDasharray="2 14" />
          ))}
        </Overlay>
        <At x={166} y={10} w={180} h={180} scale={pop(clock, keys[0], 0.14)}>
          <Gift size={180} on={on(clock, keys[0])} />
        </At>
        <At x={166} y={260} w={180} h={180} scale={pop(clock, keys[1], 0.14)}>
          <Cursor size={180} press={on(clock, keys[1]) ? since(clock, keys[1], 0.4) : 0} />
        </At>
        <At x={116} y={505} w={280} h={179} scale={pop(clock, keys[2], 0.14)}>
          <IdCard w={280} on={on(clock, keys[2])} />
        </At>
      </Art>
      <ZoneMascot scene={scene} pose="explaining" attitude="confident" halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  38 · « on t'attire avec une promesse, »                                    */
/* -------------------------------------------------------------------------- */
export const Beat38: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const lure = clock.at("t'attire");
  const lean = easeOut(clock.p(lure, 1.1, lin));
  const promise = clock.at("promesse,");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={640} y={10} w={150} h={300}>
          <Hook size={300} on />
        </At>
        <At x={562} y={160} w={180} h={180} scale={punch(clock, promise, 0.14, 0.45)}>
          <Gift size={180} on={on(clock, "promesse,")} />
        </At>
        <At x={lerp(40, 250, lean)} y={250} w={300} h={300}>
          <PersonIcon size={300} on={on(clock, "t'attire")} />
        </At>
        <Sparkle x={830} y={190} size={110} progress={clock.p(promise, 0.6)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  39 · « un cadeau »                                                         */
/* -------------------------------------------------------------------------- */
export const Beat39: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const gift = clock.at("cadeau");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={238} y={90} w={460} h={460} scale={punch(clock, gift, 0.14, 0.45)}>
          <Gift size={460} on={on(clock, "cadeau")} />
        </At>
        <Sparkle x={200} y={150} size={110} progress={clock.p(gift, 0.6)} color={colors.accent} />
        <Sparkle x={760} y={470} size={100} progress={clock.p(gift + 0.1, 0.6)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  40 · « ou même une urgence »                                               */
/* -------------------------------------------------------------------------- */
export const Beat40: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const urgent = clock.at("urgence");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={130} y={130} w={360} h={360}>
          <Stopwatch size={360} sweep={clock.p(0, clock.duration, lin)} />
        </At>
        <At x={560} y={170} w={280} h={280} scale={punch(clock, urgent, 0.16, 0.45)} rotate={shake(clock, urgent, 6, 0.5)}>
          <Warning size={280} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  41 · « pour te pousser à cliquer »                                         */
/* -------------------------------------------------------------------------- */
export const Beat41: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const push = easeOut(clock.p(clock.at("pousser"), 0.7, lin));
  const click = clock.p(clock.at("cliquer"), 0.4, lin);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={238} y={400} w={460} h={156}>
          <UiButton w={460} h={156} hot={on(clock, "cliquer")} press={Math.sin(click * Math.PI)} />
        </At>
        <At x={lerp(720, 435, push)} y={lerp(40, 440, push)} w={150} h={150}>
          <Cursor size={150} press={click} />
        </At>
        <Overlay w={ART_W} h={ART_H}>
          <Arrow x1={760} y1={90} x2={lerp(760, 560, push)} y2={lerp(90, 330, push)} progress={push} />
        </Overlay>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  42 · « et à donner des »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat42: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const give = clock.p(clock.at("donner"), 0.7, lin);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={30} y={190} w={260} h={260}>
          <PersonIcon size={260} on />
        </At>
        <At x={650} y={180} w={260} h={260}>
          <Incognito size={260} lit={give > 0.9 ? 1 : 0} />
        </At>
        <Overlay w={ART_W} h={ART_H}>
          <Arrow x1={320} y1={320} x2={620} y2={320} progress={clock.p(clock.at("donner") - 0.1, 0.5)} />
        </Overlay>
        <At x={lerp(330, 500, give)} y={255} w={130} h={94}>
          <Envelope size={130} on />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  43 · « informations personnelles. »                                        */
/* -------------------------------------------------------------------------- */
export const Beat43: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const personal = clock.at("personnelles.");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={40} y={50} w={460} h={294} scale={pop(clock, "informations", 0.08)}>
          <IdCard w={460} on={on(clock, "personnelles.")} />
        </At>
        <At x={520} y={230} w={380} h={239} scale={punch(clock, personal, 0.12, 0.45)}>
          <BankCard w={380} on={on(clock, "personnelles.") ? 1 : 0} />
        </At>
        <Sparkle x={850} y={190} size={110} progress={clock.p(personal, 0.6)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  44 · « Alors, retiens bien ceci : »                                        */
/* -------------------------------------------------------------------------- */
export const Beat44: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const write = clock.p(clock.at("retiens"), 1.3, lin);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={190} y={40} w={420} h={540} scale={pop(clock, "retiens", 0.05)}>
          <Sheet w={420} h={540} fill={write} lines={5} />
        </At>
        <At x={lerp(400, 470, write)} y={lerp(120, 380, write)} w={260} h={260}>
          <Pencil size={260} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  45 · « si tu n'as participé »                                              */
/* -------------------------------------------------------------------------- */
export const Beat45: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const played = clock.at("participé");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={50} y={180} w={290} h={290}>
          <PersonIcon size={290} on={on(clock, "tu")} />
        </At>
        <At x={450} y={190} w={420} h={294}>
          <GamePad size={420} />
        </At>
        <At x={510} y={145} w={300} h={300}>
          <Veto size={300} progress={clock.p(played, 0.6)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  46 · « à aucun jeu, »                                                      */
/* -------------------------------------------------------------------------- */
export const Beat46: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const none = clock.at("aucun");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={238 + shake(clock, none, 14, 0.5)} y={90} w={460} h={322} scale={punch(clock, none, 0.06, 0.4)}>
          <GamePad size={460} />
        </At>
        <At x={278 + shake(clock, none, 14, 0.5)} y={30} w={380} h={380}>
          <Veto size={380} progress={1} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  47 · « tu n'as probablement rien »                                         */
/* -------------------------------------------------------------------------- */
export const Beat47: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const maybe = clock.at("probablement");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={130} y={130} w={380} h={380} scale={pop(clock, "probablement", 0.08)}>
          <Trophy size={380} ghost />
        </At>
        <At x={600} y={150} w={240} h={240} scale={punch(clock, maybe, 0.2, 0.5)}>
          <BigDisc size={240}>?</BigDisc>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  48 · « gagné. »                                                            */
/* -------------------------------------------------------------------------- */
export const Beat48: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const won = clock.at("gagné.");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={248} y={90} w={440} h={440}>
          <Gift size={440} />
        </At>
        <At x={238} y={60} w={460} h={460} scale={punch(clock, won, 0.22, 0.45)}>
          <CrossMark size={460} color={colors.accent} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  49 · « Ne clique pas, »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat49: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const no = clock.at("pas,");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={208} y={270} w={520} h={176}>
          <UiButton w={520} h={176} hot />
        </At>
        <At x={440} y={330} w={170} h={170}>
          <Cursor size={170} />
        </At>
        <At x={303 + shake(clock, no, 12, 0.5)} y={165} w={330} h={330}>
          <Veto size={330} progress={clock.p(no, 0.5)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  50 · « ne renseigne aucune information »                                   */
/* -------------------------------------------------------------------------- */
export const Beat50: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const info = clock.at("information");
  const lock = clock.p(info, 0.45);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={50} y={80} w={440} h={480}>
          <FormCard w={440} rows={3} />
        </At>
        <At x={590} y={170} w={240} h={310} scale={punch(clock, info, 0.14, 0.45)}>
          <Padlock size={240} open={1 - lock} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  51 · « et signale le message. »                                            */
/* -------------------------------------------------------------------------- */
export const Beat51: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const report = clock.at("signale");
  const done = clock.at("message.");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={110} y={50} w={320} h={540}>
          <MsgPhone w={320} h={540} hot />
        </At>
        <At x={520} y={80} w={300} h={300}>
          <Flag size={300} plant={clock.p(report, 0.5)} />
        </At>
        <At x={560} y={400} w={200} h={200} scale={pop(clock, "message.", 0.2)}>
          <CheckMark size={200} progress={clock.p(done, 0.4)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  52 · « Tu as déjà reçu un »                                                */
/* -------------------------------------------------------------------------- */
export const Beat52: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const got = clock.at("reçu");
  const ring = clock.p(got, 1.0, lin);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={110} y={50} w={320} h={540}>
          <MsgPhone w={320} h={540} hot={ring > 0} />
        </At>
        <At x={540} y={150} w={260} h={260}>
          <Bell size={260} swing={Math.sin(ring * Math.PI * 8) * 24 * (1 - ring)} />
        </At>
        <Sparkle x={820} y={140} size={100} progress={clock.p(got, 0.6)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  53 · « message de ce genre ? » (mascotte qui désigne)                      */
/* -------------------------------------------------------------------------- */
export const Beat53: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const kind = clock.at("genre?");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={SIDE_W} h={SIDE_H}>
        <At x={36} y={70} w={440} h={300} scale={pop(clock, "message", 0.08)}>
          <Chat w={440} h={300} tail="left" hot={on(clock, "message")}>
            <div style={{ display: "flex", flexDirection: "column", gap: 26, alignItems: "flex-start" }}>
              <Skeleton w={300} h={28} style={{ backgroundColor: withAlpha(colors.inkInverse, 0.8) }} />
              <Skeleton w={200} h={28} style={{ backgroundColor: withAlpha(colors.inkInverse, 0.55) }} />
            </div>
          </Chat>
        </At>
        <At x={146} y={450} w={220} h={220} scale={punch(clock, kind, 0.2, 0.5)} rotate={Math.sin(clock.p(kind, 0.6, lin) * Math.PI * 4) * 6}>
          <BigDisc size={220}>?</BigDisc>
        </At>
      </Art>
      <ZoneMascot scene={scene} pose="point" attitude="confident" halo="accent" />
    </Shot>
  );
};
