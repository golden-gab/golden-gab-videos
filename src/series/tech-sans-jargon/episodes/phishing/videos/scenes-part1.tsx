/**
 * Plans 1 à 18 — « Le faux message “tu as gagné un iPhone” »
 *
 * Bloc 1 : le message arrive (cadeau, téléphone générique, lien à cliquer,
 * formulaire à remplir), puis le doute : à quel jeu a-t-on joué ? (manette,
 * formulaire, ticket : trois « non »), pourquoi un téléphone aussi cher, et
 * « le piège ».
 *
 * Règles de la série : un message par plan, 3 mots maximum à l'écran, tout est
 * visible dès le début du plan (un mot prononcé déclenche une *réaction*, pas
 * l'apparition) et chaque plan déclare son gabarit de zones.
 */

import React from "react";

import { Art, Confetti, lerp, PhoneMock, punch, shake, Sparkle, ZoneMascot } from "../../../../../components/motion";
import { colors } from "../../../../../config";
import { Arrow, Shot } from "../../../../web-story/kit";
import { LinkChain, PersonIcon } from "../../../kit";
import {
  At,
  BigDisc,
  Coin,
  Cursor,
  Envelope,
  FormCard,
  GamePad,
  Gift,
  InfoCard,
  MsgPhone,
  Overlay,
  TicketIcon,
  Trophy,
  UiButton,
  Veto,
  clamp01,
  easeOut,
  on,
  pop,
  type BeatProps,
  useClock,
} from "./helpers";

const ART_W = 936;
const ART_H = 640;
const SIDE_W = 512;
const SIDE_H = 720;

const lin = (t: number): number => t;

/* -------------------------------------------------------------------------- */
/*  01 · « Félicitations ! »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat01: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("Félicitations!");
  const seconds = clock.frame / clock.fps - word;

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={308} y={150} w={320} h={320} scale={punch(clock, word, 0.1, 0.5)} rotate={Math.sin(clock.p(word, 0.5, lin) * Math.PI * 6) * 6}>
          <Gift size={320} on={on(clock, "Félicitations!")} lid={clock.p(word, 0.4) * 0.35} />
        </At>
        <Sparkle x={200} y={190} size={120} progress={clock.p(word, 0.6)} color={colors.accent} />
        <Sparkle x={740} y={250} size={100} progress={clock.p(word + 0.1, 0.6)} color={colors.inkInverse} />
        <Confetti x={110} y={-20} width={716} fall={560} seconds={seconds} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  02 · « Vous venez de gagner »                                              */
/* -------------------------------------------------------------------------- */
export const Beat02: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const win = clock.at("gagner");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={90} y={150} w={340} h={340}>
          <PersonIcon size={340} on={on(clock, "Vous")} />
        </At>
        <At x={520} y={110} w={340} h={340} scale={pop(clock, "gagner", 0.14)}>
          <Trophy size={340} on={on(clock, "gagner")} />
        </At>
        <Sparkle x={730} y={90} size={120} progress={clock.p(win, 0.6)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  03 · « un iPhone 17 ! »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat03: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const num = clock.at("17!");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={200} y={30} w={300} h={580} scale={pop(clock, "iPhone", 0.06)}>
          <PhoneMock width={300} height={580}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Gift size={190} on />
            </div>
          </PhoneMock>
        </At>
        <At x={560} y={170} w={260} h={260} scale={punch(clock, num, 0.2, 0.5)}>
          <BigDisc size={260}>17</BigDisc>
        </At>
        <Sparkle x={790} y={140} size={110} progress={clock.p(num, 0.6)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  04 · « Pour le récupérer, »                                                */
/* -------------------------------------------------------------------------- */
export const Beat04: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const get = clock.at("récupérer,");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={40} y={160} w={320} h={320} scale={pop(clock, "récupérer,", 0.1)}>
          <Gift size={320} on={on(clock, "récupérer,")} />
        </At>
        <At x={580} y={160} w={320} h={320}>
          <PersonIcon size={320} on={clock.p(get + 0.3, 0.2, lin) > 0.5} />
        </At>
        <Overlay w={ART_W} h={ART_H}>
          <Arrow x1={380} y1={320} x2={560} y2={320} progress={clock.p(get, 0.5)} />
        </Overlay>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  05 · « il vous suffit de cliquer sur ce lien »                             */
/* -------------------------------------------------------------------------- */
export const Beat05: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const click = clock.at("cliquer");
  const approach = easeOut(clock.p(clock.at("suffit"), 0.7, lin));
  const press = clock.p(click, 0.4, lin);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={368} y={20} w={200} h={200} scale={pop(clock, "lien", 0.14)}>
          <LinkChain size={200} on={on(clock, "lien")} />
        </At>
        <At x={238} y={300} w={460} h={156}>
          <UiButton w={460} h={156} hot={on(clock, "cliquer")} press={Math.sin(press * Math.PI)} />
        </At>
        <At x={lerp(720, 440, approach)} y={lerp(560, 360, approach)} w={150} h={150}>
          <Cursor size={150} press={press} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  06 · « et de renseigner »                                                  */
/* -------------------------------------------------------------------------- */
export const Beat06: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const fill = clock.p(clock.at("renseigner"), 0.55, lin) * 3;

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={198} y={40} w={540} h={560}>
          <FormCard w={540} rows={3} filled={fill} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  07 · « quelques informations. »                                            */
/* -------------------------------------------------------------------------- */
export const Beat07: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const q = clock.at("quelques");
  const kinds = ["name", "phone", "mail"] as const;

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        {kinds.map((kind, index) => {
          const t = q + 0.08 + index * 0.38;

          return (
            <At key={kind} x={228} y={30 + index * 200} w={480} h={173} scale={1 + 0.08 * Math.sin(Math.PI * clock.p(t, 0.35, lin))}>
              <InfoCard w={480} kind={kind} on={clock.p(t, 0.15, lin) > 0.5} />
            </At>
          );
        })}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  08 · « Franchement, qui n'aimerait » (mascotte joyeuse)                    */
/* -------------------------------------------------------------------------- */
export const Beat08: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const want = clock.at("n'aimerait");

  return (
    <Shot scene={scene} layout="side-left">
      <Art w={SIDE_W} h={SIDE_H}>
        {[0, 1, 2].map((index) => (
          <At key={index} x={index * 172} y={230 + (index === 1 ? -50 : 0)} w={168} h={168} scale={1 + 0.14 * Math.sin(Math.PI * clock.p(want + index * 0.12, 0.4, lin))}>
            <PersonIcon size={168} on={clock.p(want + index * 0.12, 0.15, lin) > 0.5} />
          </At>
        ))}
        <Sparkle x={256} y={120} size={110} progress={clock.p(want, 0.6)} color={colors.accent} />
        <Sparkle x={90} y={500} size={90} progress={clock.p(want + 0.2, 0.6)} color={colors.inkInverse} />
      </Art>
      <ZoneMascot scene={scene} pose="happy" attitude="excited" mirrored halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  09 · « pas recevoir »                                                      */
/* -------------------------------------------------------------------------- */
export const Beat09: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const fall = easeOut(clock.p(clock.at("recevoir"), 0.5, lin));

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={318} y={150} w={300} h={480}>
          <MsgPhone w={300} h={480} hot={fall > 0.8} />
        </At>
        <At x={358} y={lerp(0, 230, fall)} w={220} h={158} scale={lerp(1, 0.55, fall)}>
          <Envelope size={220} on />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  10 · « un message pareil ? »                                               */
/* -------------------------------------------------------------------------- */
export const Beat10: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const same = clock.at("pareil?");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={110} y={40} w={330} h={560} scale={pop(clock, "message", 0.06)}>
          <MsgPhone w={330} h={560} hot={on(clock, "pareil?")} />
        </At>
        <At x={530} y={170} w={320} h={320} scale={punch(clock, same, 0.14, 0.45)}>
          <Gift size={320} on={on(clock, "pareil?")} />
        </At>
        <Sparkle x={820} y={140} size={110} progress={clock.p(same, 0.6)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  11 · « Mais tu as participé » (mascotte pensive)                           */
/* -------------------------------------------------------------------------- */
export const Beat11: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const played = clock.at("participé");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={SIDE_W} h={SIDE_H}>
        <At x={126} y={330} w={260} h={260}>
          <PersonIcon size={260} on={on(clock, "tu")} />
        </At>
        <At x={136} y={60} w={240} h={240} scale={punch(clock, played, 0.18, 0.5)} rotate={Math.sin(clock.p(played, 0.6, lin) * Math.PI * 4) * 6}>
          <BigDisc size={240}>?</BigDisc>
        </At>
      </Art>
      <ZoneMascot scene={scene} pose="thinking" attitude="curious" halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  12 · « à quel jeu exactement ? »                                           */
/* -------------------------------------------------------------------------- */
export const Beat12: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const exact = clock.at("exactement?");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={90} y={170} w={480} h={336} scale={pop(clock, "jeu", 0.1)}>
          <GamePad size={480} on={on(clock, "jeu")} />
        </At>
        <At x={650} y={110} w={220} h={220} scale={punch(clock, exact, 0.2, 0.5)}>
          <BigDisc size={220}>?</BigDisc>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  13 · « Tu as rempli un formulaire ? »                                      */
/* -------------------------------------------------------------------------- */
export const Beat13: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const form = clock.at("formulaire?");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={140} y={90} w={420} h={460} scale={pop(clock, "formulaire?", 0.06)}>
          <FormCard w={420} rows={3} hot={on(clock, "formulaire?") ? 1 : -1} />
        </At>
        <At x={630} y={170} w={220} h={220} scale={punch(clock, form, 0.2, 0.5)}>
          <BigDisc size={220}>?</BigDisc>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  14 · « Tu as acheté un ticket ? »                                          */
/* -------------------------------------------------------------------------- */
export const Beat14: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const ticket = clock.at("ticket?");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={100} y={170} w={500} h={320} scale={pop(clock, "ticket?", 0.1)} rotate={-8}>
          <TicketIcon size={500} on={on(clock, "ticket?")} />
        </At>
        <At x={650} y={150} w={220} h={220} scale={punch(clock, ticket, 0.2, 0.5)}>
          <BigDisc size={220}>?</BigDisc>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  15 · « Non ? »                                                             */
/* -------------------------------------------------------------------------- */
export const Beat15: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const no = clock.at("Non?");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={30} y={230} w={250} h={175}>
          <GamePad size={250} />
        </At>
        <At x={360} y={190} w={210} h={260}>
          <FormCard w={210} rows={3} button={false} />
        </At>
        <At x={650} y={240} w={250} h={160}>
          <TicketIcon size={250} />
        </At>
        <At x={168 + shake(clock, no, 14, 0.5)} y={20} w={600} h={600}>
          <Veto size={600} progress={clock.p(no, 0.45)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  16 · « Alors pourquoi est-ce qu'on t'offre un »                            */
/* -------------------------------------------------------------------------- */
export const Beat16: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const why = clock.at("pourquoi");
  const give = clock.at("t'offre");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={50} y={200} w={300} h={300}>
          <PersonIcon size={300} on={on(clock, "t'offre")} />
        </At>
        <At x={580} y={190} w={320} h={320} scale={pop(clock, "t'offre", 0.1)}>
          <Gift size={320} on={on(clock, "t'offre")} />
        </At>
        <At x={375} y={0} w={190} h={190} scale={punch(clock, why, 0.2, 0.5)}>
          <BigDisc size={190}>?</BigDisc>
        </At>
        <Overlay w={ART_W} h={ART_H}>
          <Arrow x1={560} y1={380} x2={380} y2={380} progress={clock.p(give, 0.5)} />
        </Overlay>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  17 · « téléphone aussi cher ? »                                            */
/* -------------------------------------------------------------------------- */
export const Beat17: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const dear = clock.at("cher?");
  const coins: readonly (readonly [number, number])[] = [
    [520, 430],
    [650, 430],
    [585, 330],
    [520, 230],
    [650, 230],
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={110} y={50} w={290} h={560} scale={pop(clock, "téléphone", 0.06)}>
          <PhoneMock width={290} height={560}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Gift size={170} on={on(clock, "cher?")} />
            </div>
          </PhoneMock>
        </At>
        {coins.map(([x, y], index) => (
          <At key={index} x={x} y={y} w={130} h={130} scale={1 + 0.2 * Math.sin(Math.PI * clock.p(dear + index * 0.06, 0.35, lin))}>
            <Coin size={130} />
          </At>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  18 · « C'est justement là que »                                            */
/* -------------------------------------------------------------------------- */
export const Beat18: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const there = clock.at("là");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={500} y={130} w={360} h={360} scale={pop(clock, "justement", 0.12)}>
          <Gift size={360} on={on(clock, "là")} />
        </At>
        <Overlay w={ART_W} h={ART_H}>
          <Arrow x1={60} y1={310} x2={470} y2={310} progress={clamp01(clock.p(there - 0.2, 0.5))} />
        </Overlay>
        <Sparkle x={820} y={120} size={110} progress={clock.p(there, 0.6)} color={colors.accent} />
      </Art>
    </Shot>
  );
};
