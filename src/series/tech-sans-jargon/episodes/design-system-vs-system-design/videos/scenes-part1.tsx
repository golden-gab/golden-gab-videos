/**
 * Plans 1 à 24 — « Design System ou System Design ? »
 *
 * Bloc 1 : l'accroche (deux noms presque identiques, deux choses différentes),
 * puis la maison et son plan (System Design) : pièces, cuisine, eau,
 * électricité, et les parties d'une application qui communiquent.
 *
 * Règles de la série : un message par plan, 3 mots maximum à l'écran, tout est
 * visible dès le début du plan (un mot prononcé déclenche une *réaction*, pas
 * l'apparition) et chaque plan déclare son gabarit de zones.
 */

import React from "react";

import { Art, Magnifier, punch, lit, shake, Sparkle, ZoneMascot } from "../../../../../components/motion";
import { colors } from "../../../../../config";
import { withAlpha } from "../../../../../utils/color";
import { CheckMark, Gear, NotEqual, Pill, Shot, Skeleton } from "../../../../web-story/kit";
import { Disc, PersonIcon, Pencil, Thought } from "../../../kit";
import {
  At,
  BlueprintCard,
  CodeScreen,
  Crowd,
  Drop,
  EqualSign,
  FloorPlan,
  House,
  IconCard,
  Lightning,
  Overlay,
  PhoneNode,
  ServerNode,
  DbNode,
  Swatches,
  SysMap,
  UiButton,
  type BeatProps,
  useClock,
  useSeconds,
} from "./helpers";

const linear = (input: number): number => input;

/* -------------------------------------------------------------------------- */
/*  01 · « Design System »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat01: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const design = clock.at("Design");
  const system = clock.at("System");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={0} w={936} h={500} scale={punch(clock, design, 0.04, 0.4)}>
          <IconCard w={936} h={500} on={lit(clock, design, 0.2) > 0.5}>
            <Swatches size={110} lit={5} />
            <UiButton w={380} hot press={punch(clock, system, 0.5, 0.3) - 1} />
          </IconCard>
        </At>
        <div style={{ position: "absolute", left: 0, top: 530, width: 936, display: "flex", justifyContent: "center", transform: `scale(${punch(clock, system, 0.12, 0.45)})` }}>
          <Pill size={60}>DESIGN SYSTEM</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  02 · « ou System Design ? »                                                */
/* -------------------------------------------------------------------------- */
export const Beat02: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const system = clock.at("System");
  const design = clock.at("Design");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={110} w={400} h={360}>
          <IconCard w={400} h={360} dim={0.55}>
            <Swatches size={52} lit={5} gap={12} />
            <UiButton w={220} hot />
          </IconCard>
        </At>
        <At x={440} y={90} w={496} h={400} scale={punch(clock, system, 0.05, 0.4)}>
          <BlueprintCard w={496} h={400} active={lit(clock, system, 0.2) > 0.5}>
            <House w={330} draw={1} on={lit(clock, system, 0.2) > 0.5} />
          </BlueprintCard>
        </At>
        <div style={{ position: "absolute", left: 360, top: 530, width: 576, display: "flex", justifyContent: "center", transform: `scale(${punch(clock, design, 0.12, 0.45)})` }}>
          <Pill size={54}>SYSTEM DESIGN</Pill>
        </div>
        <At x={340} y={0} w={130} h={130} scale={punch(clock, design, 0.22, 0.5)}>
          <Disc size={130} sign="?" />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  03 · « malgré leurs noms presque identiques, »                             */
/* -------------------------------------------------------------------------- */
export const Beat03: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const names = clock.at("noms");
  const almost = clock.at("presque");
  const same = clock.at("identiques");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={80} y={20} w={776} h={230} scale={punch(clock, names, 0.05, 0.4)}>
          <IconCard w={776} h={230} on={lit(clock, names, 0.2) > 0.5}>
            <Skeleton w={560} h={34} style={{ backgroundColor: withAlpha(colors.inkInverse, 0.85) }} />
            <Skeleton w={340} h={34} tone="accent" />
          </IconCard>
        </At>
        <At x={388} y={240} w={160} h={160} scale={punch(clock, same, 0.2, 0.45)}>
          <EqualSign size={160} on={lit(clock, almost, 0.2) > 0.5} />
        </At>
        <At x={80} y={390} w={776} h={230} scale={punch(clock, almost, 0.05, 0.4)}>
          <IconCard w={776} h={230} on={lit(clock, almost, 0.2) > 0.5}>
            <Skeleton w={340} h={34} tone="accent" />
            <Skeleton w={560} h={34} style={{ backgroundColor: withAlpha(colors.inkInverse, 0.85) }} />
          </IconCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  04 · « ce sont deux choses »                                               */
/* -------------------------------------------------------------------------- */
export const Beat04: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const two = clock.at("deux");
  const things = clock.at("choses");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={70} w={430} h={500} scale={punch(clock, two, 0.06, 0.4)}>
          <IconCard w={430} h={500} on={lit(clock, two, 0.2) > 0.5}>
            <Swatches size={58} lit={5} gap={12} />
            <UiButton w={260} hot />
          </IconCard>
        </At>
        <At x={506} y={70} w={430} h={500} scale={punch(clock, things, 0.06, 0.4)}>
          <BlueprintCard w={430} h={500} active={lit(clock, things, 0.2) > 0.5}>
            <House w={300} draw={1} on={lit(clock, things, 0.2) > 0.5} />
          </BlueprintCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  05 · « complètement différentes ! » (mascotte surprise)                    */
/* -------------------------------------------------------------------------- */
export const Beat05: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const different = clock.at("différentes");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <At x={36} y={0} w={440} h={270}>
          <IconCard w={440} h={270}>
            <Swatches size={52} lit={5} gap={10} />
            <UiButton w={200} hot />
          </IconCard>
        </At>
        <At x={186} y={290} w={140} h={140} scale={punch(clock, different, 0.25, 0.5)} rotate={shake(clock, different, 8, 0.5)}>
          <NotEqual size={140} />
        </At>
        <At x={36} y={450} w={440} h={270}>
          <BlueprintCard w={440} h={270} active={lit(clock, different, 0.2) > 0.5}>
            <House w={230} draw={1} />
          </BlueprintCard>
        </At>
      </Art>
      <ZoneMascot scene={scene} pose="surprised" attitude="surprised" halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  06 · « Imagine que tu dois »                                               */
/* -------------------------------------------------------------------------- */
export const Beat06: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const imagine = clock.at("Imagine");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={20} y={340} w={280} h={280} scale={punch(clock, imagine, 0.06, 0.4)}>
          <PersonIcon size={280} on={lit(clock, imagine, 0.2) > 0.5} />
        </At>
        <At x={290} y={0} w={620} h={430} scale={punch(clock, imagine, 0.1, 0.5)}>
          <Thought w={620} h={360}>
            <House w={380} draw={0} />
          </Thought>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  07 · « construire une maison. »                                            */
/* -------------------------------------------------------------------------- */
export const Beat07: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const build = clock.at("construire");
  const house = clock.at("maison");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={20} w={936} h={600} scale={punch(clock, house, 0.04, 0.4)}>
          <BlueprintCard w={936} h={600} active={lit(clock, house, 0.2) > 0.5}>
            <House w={640} draw={clock.p(build, 0.85, linear)} on={lit(clock, house, 0.2) > 0.5} />
          </BlueprintCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  08 · « D'abord, tu dois réfléchir » (mascotte pensive)                     */
/* -------------------------------------------------------------------------- */
export const Beat08: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const think = clock.at("réfléchir");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <At x={26} y={40} w={460} h={560} scale={punch(clock, think, 0.04, 0.4)}>
          <BlueprintCard w={460} h={560} active={lit(clock, think, 0.2) > 0.5}>
            <FloorPlan w={390} walls={0.3} />
          </BlueprintCard>
        </At>
        <At x={330} y={470} w={130} h={130} rotate={Math.sin(seconds * 6) * 10}>
          <Pencil size={130} />
        </At>
      </Art>
      <ZoneMascot scene={scene} pose="thinking" attitude="curious" halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  09 · « à son organisation : »                                              */
/* -------------------------------------------------------------------------- */
export const Beat09: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const organise = clock.at("organisation");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={20} w={936} h={600} scale={punch(clock, organise, 0.03, 0.4)}>
          <BlueprintCard w={936} h={600} active={lit(clock, organise, 0.2) > 0.5}>
            <FloorPlan w={760} walls={0.3 + 0.7 * clock.p(organise, 0.6, linear)} />
          </BlueprintCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  10 · « combien de pièces ? »                                               */
/* -------------------------------------------------------------------------- */
export const Beat10: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const how = clock.at("combien");
  const rooms = clock.at("pièces");
  const count = Math.floor(clock.p(how, 0.95, linear) * 6.99);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={20} w={936} h={600}>
          <BlueprintCard w={936} h={600} active={count >= 6}>
            <FloorPlan w={760} rooms={count} />
          </BlueprintCard>
        </At>
        <At x={776} y={0} w={130} h={130} scale={punch(clock, rooms, 0.25, 0.5)}>
          <Disc size={130} sign="?" />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  11 · « Où placer la cuisine ? »                                            */
/* -------------------------------------------------------------------------- */
export const Beat11: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const place = clock.at("placer");
  const kitchen = clock.at("cuisine");
  const seconds = useSeconds();
  const landed = seconds >= kitchen;
  const hop = [1, 4, 2, 5, 0][Math.floor(Math.max(0, seconds - place) / 0.16) % 5];
  const room = landed ? 3 : hop;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={20} w={936} h={600} scale={punch(clock, kitchen, 0.03, 0.4)}>
          <BlueprintCard w={936} h={600} active={landed}>
            <FloorPlan w={760} stoveRoom={room} stoveOn={landed} hotRoom={landed ? 3 : -1} />
          </BlueprintCard>
        </At>
        <Sparkle x={150} y={420} size={90} progress={clock.p(kitchen, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  12 · « Comment faire circuler »                                            */
/* -------------------------------------------------------------------------- */
export const Beat12: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const flow = clock.at("circuler");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={20} w={936} h={600}>
          <BlueprintCard w={936} h={600}>
            <FloorPlan w={760} stoveRoom={3} stoveOn water={clock.p(0, 0.75, linear)} />
          </BlueprintCard>
        </At>
        <At x={780} y={0} w={110} h={150} scale={punch(clock, flow, 0.25, 0.5)}>
          <Drop size={110} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  13 · « l'eau et l'électricité ? »                                          */
/* -------------------------------------------------------------------------- */
export const Beat13: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const water = clock.at("eau");
  const and = clock.at("et");
  const power = clock.at("électricité");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={20} w={936} h={600}>
          <BlueprintCard w={936} h={600}>
            <FloorPlan w={760} stoveRoom={3} stoveOn water={1} wire={clock.p(and, 1.0, linear)} />
          </BlueprintCard>
        </At>
        <At x={60} y={0} w={110} h={150} scale={punch(clock, water, 0.25, 0.5)}>
          <Drop size={110} />
        </At>
        <At x={760} y={0} w={130} h={130} scale={punch(clock, power, 0.25, 0.5)}>
          <Lightning size={130} on={lit(clock, power, 0.2) > 0.5} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  14 · « Comment tout faire fonctionner ensemble ? »                         */
/* -------------------------------------------------------------------------- */
export const Beat14: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const work = clock.at("fonctionner");
  const together = clock.at("ensemble");
  const seconds = useSeconds();
  const rooms = Math.floor(clock.p(together, 0.4, linear) * 6.99);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={20} w={936} h={600} scale={punch(clock, together, 0.03, 0.4)}>
          <BlueprintCard w={936} h={600} active={rooms >= 6}>
            <FloorPlan w={760} stoveRoom={3} stoveOn water={1} wire={1} rooms={rooms} flow={Math.max(0, seconds - work) * 0.45 + 0.01} />
          </BlueprintCard>
        </At>
        <Sparkle x={830} y={90} size={80} progress={clock.p(together, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  15 · « Ça, c'est un peu le »                                               */
/* -------------------------------------------------------------------------- */
export const Beat15: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const that = clock.at("Ça");
  const little = clock.at("peu");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={40} w={936} h={560} scale={punch(clock, that, 0.04, 0.4)}>
          <BlueprintCard w={936} h={560} active={lit(clock, little, 0.2) > 0.5}>
            <FloorPlan w={600} stoveRoom={3} stoveOn water={1} wire={1} rooms={6} />
          </BlueprintCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  16 · « System Design. »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat16: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const system = clock.at("System");
  const design = clock.at("Design");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={20} y={60} w={380} h={380}>
          <Gear size={380} angle={seconds * 40} />
        </At>
        <At x={440} y={90} w={480} h={340} scale={punch(clock, system, 0.05, 0.4)}>
          <BlueprintCard w={480} h={340} active>
            <House w={310} draw={1} on />
          </BlueprintCard>
        </At>
        <div style={{ position: "absolute", left: 0, top: 500, width: 936, display: "flex", justifyContent: "center", transform: `scale(${punch(clock, design, 0.12, 0.45)})` }}>
          <Pill size={66}>SYSTEM DESIGN</Pill>
        </div>
        <Sparkle x={880} y={60} size={90} progress={clock.p(design, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  17 · « En informatique, »                                                  */
/* -------------------------------------------------------------------------- */
export const Beat17: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const computing = clock.at("informatique");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={148} y={90} w={640} h={470} scale={punch(clock, computing, 0.07, 0.45)}>
          <CodeScreen w={640} on={lit(clock, computing, 0.2) > 0.5} />
        </At>
        <Sparkle x={860} y={50} size={90} progress={clock.p(computing, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  18 · « c'est réfléchir à la façon »                                        */
/* -------------------------------------------------------------------------- */
export const Beat18: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const think = clock.at("réfléchir");
  const seconds = useSeconds();
  const x = 470 + Math.sin(seconds * 2.2) * 190;
  const y = 300 + Math.cos(seconds * 1.7) * 90;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={20} w={936} h={600} scale={punch(clock, think, 0.03, 0.4)}>
          <BlueprintCard w={936} h={600}>
            <FloorPlan w={700} stoveRoom={3} stoveOn water={1} wire={1} />
          </BlueprintCard>
        </At>
        <Magnifier x={x} y={y} size={120} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  19 · « dont les différentes parties »                                      */
/* -------------------------------------------------------------------------- */
export const Beat19: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const times = [clock.at("dont"), clock.at("différentes"), clock.at("parties"), clock.at("parties") + 0.22];
  const on = times.map((t) => lit(clock, t, 0.2) > 0.5);
  const spots: readonly (readonly [number, number])[] = [
    [0, 20],
    [496, 20],
    [0, 330],
    [496, 330],
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {spots.map(([x, y], index) => (
          <At key={index} x={x} y={y} w={440} h={290} scale={punch(clock, times[index], 0.06, 0.4)}>
            <IconCard w={440} h={290} on={on[index]}>
              {index === 0 ? <PhoneNode size={200} on={on[0]} /> : null}
              {index === 1 ? <ServerNode size={180} on={on[1]} /> : null}
              {index === 2 ? <DbNode size={180} on={on[2]} /> : null}
              {index === 3 ? <PersonIcon size={180} on={on[3]} /> : null}
            </IconCard>
          </At>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  20 · « d'une application »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat20: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const app = clock.at("application");
  const together = clock.p(app, 0.5, linear);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={110} w={936} h={420}>
          <SysMap w={936} h={420} lit={1 + 2 * together} />
        </At>
        <Overlay w={936} h={640}>
          <rect x={4} y={90} width={928} height={460} rx={34} fill="none" stroke={colors.accent} strokeWidth={8} strokeDasharray="22 16" opacity={0.25 + 0.75 * together} />
        </Overlay>
        <Sparkle x={90} y={80} size={80} progress={clock.p(app, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  21 · « communiquent entre elles »                                          */
/* -------------------------------------------------------------------------- */
export const Beat21: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const talk = clock.at("communiquent");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={110} w={936} h={420} scale={punch(clock, talk, 0.03, 0.4)}>
          <SysMap w={936} h={420} lit={3} flow={seconds + 0.05} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  22 · « pour que tout fonctionne »                                          */
/* -------------------------------------------------------------------------- */
export const Beat22: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const works = clock.at("fonctionne");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={150} w={936} h={420}>
          <SysMap w={936} h={420} lit={3} flow={seconds + 0.4} ok={clock.p(works, 0.5)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  23 · « correctement, »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat23: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const right = clock.at("correctement");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={278} y={120} w={380} h={380} scale={punch(clock, right, 0.1, 0.5)}>
          <Disc size={380}>
            <CheckMark size={250} progress={clock.p(right, 0.45)} color={colors.inkInverse} />
          </Disc>
        </At>
        <Sparkle x={220} y={110} size={90} progress={clock.p(right, 0.8)} color={colors.inkInverse} />
        <Sparkle x={730} y={450} size={80} progress={clock.p(right + 0.15, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  24 · « même avec des milliers d'utilisateurs. »                            */
/* -------------------------------------------------------------------------- */
export const Beat24: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const thousands = clock.at("milliers");
  const users = clock.at("utilisateurs");
  const fraction = 0.12 + 0.88 * clock.p(thousands, users - thousands + 0.3, linear);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ position: "absolute", left: 408, top: 0, transform: `translateX(${shake(clock, thousands, 10, 0.6)}px)` }}>
          <ServerNode size={120} on={lit(clock, thousands, 0.2) > 0.5} />
        </div>
        <At x={50} y={170} w={836} h={420} scale={punch(clock, users, 0.05, 0.45)}>
          <Crowd cols={8} rows={4} size={96} lit={fraction} />
        </At>
      </Art>
    </Shot>
  );
};
