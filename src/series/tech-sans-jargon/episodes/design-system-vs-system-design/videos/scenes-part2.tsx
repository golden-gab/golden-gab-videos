/**
 * Plans 25 à 44 — « Design System ou System Design ? »
 *
 * Bloc 2 : la même maison, mais on l'aménage (couleurs, portes, poignées,
 * interrupteurs, matériaux, même style partout) = le Design System, puis ce
 * que ça devient dans une application web : couleurs, boutons, polices,
 * espacements, règles visuelles, et des pages qui ont toutes la même apparence.
 */

import React from "react";

import { Art, BrowserFrame, LibIcon, punch, lit, Sparkle } from "../../../../../components/motion";
import { PhoneMock } from "../../../../../components/motion";
import { colors } from "../../../../../config";
import { withAlpha } from "../../../../../utils/color";
import { Card, Pill, Shot, Skeleton } from "../../../../web-story/kit";
import { PersonIcon, ShieldCheck, Thought } from "../../../kit";
import {
  At,
  Brush,
  Door,
  EqualSign,
  FontSample,
  House,
  IconCard,
  Knob,
  LightSwitch,
  Materials,
  MiniRoom,
  Overlay,
  RuleList,
  SpacingArt,
  Swatches,
  UiButton,
  UiPage,
  type BeatProps,
  useClock,
  useSeconds,
} from "./helpers";

const linear = (input: number): number => input;

/* -------------------------------------------------------------------------- */
/*  25 · « Maintenant, »                                                       */
/* -------------------------------------------------------------------------- */
export const Beat25: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const now = clock.at("Maintenant");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={20} y={70} w={560} h={480} scale={punch(clock, now, 0.06, 0.4)}>
          <House w={560} draw={1} fill={0.25 + 0.5 * lit(clock, now, 0.4)} />
        </At>
        <At x={600} y={150} w={300} h={300} rotate={-20 + Math.sin(seconds * 5) * 14}>
          <Brush size={300} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  26 · « imagine que tu dois »                                               */
/* -------------------------------------------------------------------------- */
export const Beat26: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const imagine = clock.at("imagine");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={20} y={340} w={280} h={280} scale={punch(clock, imagine, 0.06, 0.4)}>
          <PersonIcon size={280} on={lit(clock, imagine, 0.2) > 0.5} />
        </At>
        <At x={290} y={0} w={620} h={430} scale={punch(clock, imagine, 0.1, 0.5)}>
          <Thought w={620} h={360}>
            <Brush size={240} />
            <Swatches size={56} lit={5} gap={10} />
          </Thought>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  27 · « aménager cette maison. »                                            */
/* -------------------------------------------------------------------------- */
export const Beat27: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const arrange = clock.at("aménager");
  const house = clock.at("maison");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={10} y={60} w={580} h={493} scale={punch(clock, house, 0.04, 0.4)}>
          <House w={580} draw={1} fill={0.2 + 0.8 * clock.p(arrange, 1.0, linear)} />
        </At>
        <At x={610} y={170} w={290} h={290} rotate={-20 + Math.sin(seconds * 5) * 14}>
          <Brush size={290} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  28 · « Tu choisis les couleurs, »                                          */
/* -------------------------------------------------------------------------- */
export const Beat28: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const choose = clock.at("choisis");
  const colours = clock.at("couleurs");
  const count = 1 + Math.floor(clock.p(choose, colours - choose + 0.3, linear) * 4.99);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={110} w={936} h={420} scale={punch(clock, colours, 0.04, 0.4)}>
          <IconCard w={936} h={420} on={count >= 5}>
            <Swatches size={140} lit={count} gap={14} />
          </IconCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  29 · « les portes, les »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat29: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const doors = clock.at("portes");
  const colorsOfDoors = [colors.accent, colors.secondary, colors.neutral];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {colorsOfDoors.map((color, index) => (
          <At key={index} x={80 + index * 270} y={70} w={190} h={330} scale={punch(clock, doors + index * 0.08, 0.06, 0.4)}>
            <Door w={190} color={color} open={index === 0 ? clock.p(doors, 0.4) : 0} />
          </At>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  30 · « poignées, les »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat30: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const handles = clock.at("poignées");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={120} y={110} w={300} h={300} scale={punch(clock, handles, 0.1, 0.45)}>
          <Knob size={300} shine={lit(clock, handles, 0.3)} />
        </At>
        <At x={516} y={110} w={300} h={300} scale={punch(clock, handles + 0.1, 0.1, 0.45)}>
          <Knob size={300} shine={lit(clock, handles + 0.1, 0.3)} />
        </At>
        <Sparkle x={400} y={110} size={80} progress={clock.p(handles, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  31 · « interrupteurs »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat31: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const switches = clock.at("interrupteurs");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={238} y={40} w={460} h={460} scale={punch(clock, switches, 0.08, 0.45)}>
          <LightSwitch size={460} on={lit(clock, switches, 0.2)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  32 · « et les matériaux. »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat32: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const materials = clock.at("matériaux");
  const count = 1 + Math.floor(clock.p(materials - 0.2, 0.6, linear) * 2.99);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={9} y={140} w={918} h={270} scale={punch(clock, materials, 0.05, 0.4)}>
          <Materials size={270} lit={count} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  33 · « Et tu veux garder »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat33: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const keep = clock.at("garder");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={30} y={70} w={620} h={465} scale={punch(clock, keep, 0.04, 0.4)}>
          <MiniRoom w={620} on={lit(clock, keep, 0.2) > 0.5} />
        </At>
        <At x={690} y={150} w={220} h={220} scale={punch(clock, keep, 0.2, 0.5)}>
          <ShieldCheck size={220} check={clock.p(keep, 0.5)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  34 · « le même style partout. »                                            */
/* -------------------------------------------------------------------------- */
export const Beat34: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const times = [clock.at("même"), clock.at("style"), clock.at("partout")];
  const link = clock.p(times[0], times[2] - times[0] + 0.3, linear);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {times.map((t, index) => (
          <At key={index} x={index * 323} y={110} w={290} h={218} scale={punch(clock, t, 0.07, 0.4)}>
            <MiniRoom w={290} on={lit(clock, t, 0.2) > 0.5} />
          </At>
        ))}
        <Overlay w={936} h={640}>
          <path d="M145 380 H791" fill="none" stroke={colors.accent} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - link} opacity={link > 0.01 ? 1 : 0} />
        </Overlay>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  35 · « Ça, c'est le »                                                      */
/* -------------------------------------------------------------------------- */
export const Beat35: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const that = clock.at("Ça");
  const is = clock.at("c'est");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={118} y={70} w={700} h={480} scale={punch(clock, that, 0.04, 0.4)}>
          <IconCard w={700} h={480} on={lit(clock, is, 0.2) > 0.5}>
            <Swatches size={100} lit={5} gap={14} />
            <UiButton w={360} hot />
          </IconCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  36 · « Design System. »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat36: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const design = clock.at("Design");
  const system = clock.at("System");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={20} y={50} w={500} h={425} scale={punch(clock, design, 0.04, 0.4)}>
          <House w={500} draw={1} fill={1} />
        </At>
        <At x={580} y={60} w={300} h={300} rotate={-15 + Math.sin(seconds * 4) * 10}>
          <Brush size={300} />
        </At>
        <div style={{ position: "absolute", left: 0, top: 500, width: 936, display: "flex", justifyContent: "center", transform: `scale(${punch(clock, system, 0.12, 0.45)})` }}>
          <Pill size={66}>DESIGN SYSTEM</Pill>
        </div>
        <Sparkle x={870} y={60} size={90} progress={clock.p(system, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  37 · « Dans le développement web, »                                        */
/* -------------------------------------------------------------------------- */
export const Beat37: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const dev = clock.at("développement");
  const web = clock.at("web");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={20} y={90} w={660} h={460} scale={punch(clock, dev, 0.04, 0.4)}>
          <BrowserFrame width={660} height={460} tone="dark">
            <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 24 }}>
              <Skeleton w="55%" h={34} style={{ backgroundColor: withAlpha(colors.inkInverse, 0.85) }} />
              <Skeleton w="90%" h={24} />
              <Skeleton w="72%" h={24} />
              <UiButton w={260} hot />
            </div>
          </BrowserFrame>
        </At>
        <At x={710} y={150} w={200} h={200} scale={punch(clock, web, 0.2, 0.5)}>
          <LibIcon id="web-globe" size={200} color={lit(clock, web, 0.2) > 0.5 ? colors.accent : colors.inkInverse} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  38 · « il regroupe les couleurs, »                                         */
/* -------------------------------------------------------------------------- */
export const Beat38: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const gather = clock.at("regroupe");
  const colours = clock.at("couleurs");
  const frame = clock.p(gather, 0.5, linear);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={130} w={936} h={380} scale={punch(clock, colours, 0.04, 0.4)}>
          <Card w={936} h={380} active={frame >= 1}>
            <Swatches size={120} lit={5} gap={14} />
          </Card>
        </At>
        <Overlay w={936} h={640}>
          <rect x={30} y={160} width={876} height={320} rx={28} fill="none" stroke={colors.accent} strokeWidth={8} strokeDasharray="22 16" opacity={frame} />
        </Overlay>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  39 · « les boutons, les polices, »                                         */
/* -------------------------------------------------------------------------- */
export const Beat39: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const buttons = clock.at("boutons");
  const fonts = clock.at("polices");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={110} w={450} h={420} scale={punch(clock, buttons, 0.05, 0.4)}>
          <IconCard w={450} h={420} on={lit(clock, buttons, 0.2) > 0.5}>
            <UiButton w={330} hot press={Math.sin(Math.PI * clock.p(buttons, 0.35, linear))} />
            <UiButton w={330} />
          </IconCard>
        </At>
        <At x={486} y={110} w={450} h={420} scale={punch(clock, fonts, 0.05, 0.4)}>
          <IconCard w={450} h={420} on={lit(clock, fonts, 0.2) > 0.5}>
            <FontSample size={230} on={lit(clock, fonts, 0.2) > 0.5} />
          </IconCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  40 · « espacements et »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat40: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const spacing = clock.at("espacements");
  const open = clock.p(spacing, 0.45);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={110} w={936} h={420} scale={punch(clock, spacing, 0.03, 0.4)}>
          <IconCard w={936} h={420} on={open > 0.9}>
            <SpacingArt w={760} h={260} gap={50 + 190 * open} on={open > 0.5} />
          </IconCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  41 · « les règles visuelles »                                              */
/* -------------------------------------------------------------------------- */
export const Beat41: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const rules = clock.at("règles");
  const done = Math.floor(clock.p(rules, 0.9, linear) * 4.99);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={118} y={70} w={700} h={500} scale={punch(clock, rules, 0.04, 0.4)}>
          <IconCard w={700} h={500} on={done >= 4}>
            <RuleList w={520} rows={4} done={done} />
          </IconCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  42 · « pour que toutes les pages »                                         */
/* -------------------------------------------------------------------------- */
export const Beat42: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const times = [clock.at("toutes"), clock.at("les"), clock.at("pages")];
  const variants: readonly (0 | 1 | 2)[] = [0, 1, 2];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {times.map((t, index) => (
          <At key={index} x={index * 333} y={100} w={270} h={405} scale={punch(clock, t, 0.06, 0.4)}>
            <UiPage w={270} on={lit(clock, t, 0.2) > 0.5} variant={variants[index]} />
          </At>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  43 · « d'une application »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat43: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const app = clock.at("application");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={278} y={20} w={380} h={600} scale={punch(clock, app, 0.04, 0.4)}>
          <PhoneMock width={380} height={600}>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 36 }}>
              <UiPage w={300} on={lit(clock, app, 0.2) > 0.5} />
            </div>
          </PhoneMock>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  44 · « aient la même apparence. »                                          */
/* -------------------------------------------------------------------------- */
export const Beat44: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const same = clock.at("même");
  const look = clock.at("apparence");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {[0, 1, 2].map((index) => (
          <At key={index} x={index * 343} y={100} w={250} h={375} scale={punch(clock, look, 0.04, 0.45)}>
            <UiPage w={250} on={lit(clock, look, 0.2) > 0.5} variant={0} />
          </At>
        ))}
        {[0, 1].map((index) => (
          <At key={`eq${index}`} x={258 + index * 343} y={240} w={80} h={80} scale={punch(clock, same, 0.25, 0.45)}>
            <EqualSign size={80} on={lit(clock, same, 0.2) > 0.5} />
          </At>
        ))}
        <Sparkle x={460} y={70} size={90} progress={clock.p(look, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};
