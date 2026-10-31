/**
 * Plans 45 à 59 — « Design System ou System Design ? »
 *
 * Bloc 3 : la comparaison. Le System Design (engrenage, application qui
 * fonctionne) face au Design System (pinceau, apparence, interfaces
 * cohérentes), puis la question qui relance les commentaires : tu connaissais
 * la différence entre les deux ?
 */

import React from "react";

import { Art, Magnifier, punch, lit, Sparkle, ZoneMascot } from "../../../../../components/motion";
import { colors } from "../../../../../config";
import { CheckMark, Gear, Shot } from "../../../../web-story/kit";
import { Disc, EyeIcon } from "../../../kit";
import {
  At,
  BlueprintCard,
  Brush,
  EqualSign,
  FloorPlan,
  House,
  IconCard,
  PhoneNode,
  Swatches,
  SysMap,
  UiBricks,
  UiPage,
  type BeatProps,
  useClock,
  useSeconds,
} from "./helpers";

const linear = (input: number): number => input;

/* -------------------------------------------------------------------------- */
/*  45 · « Tu vois maintenant la différence ? » (mascotte qui explique)       */
/* -------------------------------------------------------------------------- */
export const Beat45: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const see = clock.at("vois");
  const difference = clock.at("différence");
  const sweep = clock.p(see, difference - see + 0.3, linear);
  const mx = 250;
  const my = 190 + 330 * sweep;

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <At x={26} y={0} w={460} h={310}>
          <BlueprintCard w={460} h={310} active={sweep < 0.5}>
            <FloorPlan w={300} stoveRoom={3} stoveOn water={1} wire={1} />
          </BlueprintCard>
        </At>
        <At x={26} y={380} w={460} h={310}>
          <IconCard w={460} h={310} on={sweep >= 0.5}>
            <House w={240} draw={1} fill={1} />
          </IconCard>
        </At>
        <Magnifier x={mx} y={my} size={90} />
      </Art>
      <ZoneMascot scene={scene} pose="explaining" attitude="confident" halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  46 · « Le System Design »                                                  */
/* -------------------------------------------------------------------------- */
export const Beat46: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const system = clock.at("System");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={118} y={70} w={700} h={480} scale={punch(clock, system, 0.05, 0.4)}>
          <BlueprintCard w={700} h={480} active={lit(clock, system, 0.2) > 0.5}>
            <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
              <Gear size={220} angle={seconds * 40} />
              <House w={290} draw={1} on={lit(clock, system, 0.2) > 0.5} />
            </div>
          </BlueprintCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  47 · « organise le fonctionnement »                                        */
/* -------------------------------------------------------------------------- */
export const Beat47: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const organise = clock.at("organise");
  const works = clock.at("fonctionnement");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={110} w={936} h={420} scale={punch(clock, organise, 0.03, 0.4)}>
          <SysMap w={936} h={420} lit={3} flow={Math.max(0, seconds - works) + 0.01} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  48 · « de ton application. »                                               */
/* -------------------------------------------------------------------------- */
export const Beat48: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const app = clock.at("application");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={90} y={40} w={350} h={565} scale={punch(clock, app, 0.06, 0.45)}>
          <PhoneNode size={565} on={lit(clock, app, 0.2) > 0.5} />
        </At>
        <At x={540} y={170} w={300} h={300} scale={punch(clock, app, 0.15, 0.5)}>
          <Disc size={300}>
            <CheckMark size={200} progress={clock.p(app, 0.5)} color={colors.inkInverse} />
          </Disc>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  49 · « Le Design System »                                                  */
/* -------------------------------------------------------------------------- */
export const Beat49: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const design = clock.at("Design");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={118} y={70} w={700} h={480} scale={punch(clock, design, 0.05, 0.4)}>
          <IconCard w={700} h={480} on={lit(clock, design, 0.2) > 0.5}>
            <div style={{ transform: `rotate(${-15 + Math.sin(seconds * 4) * 8}deg)` }}>
              <Brush size={240} />
            </div>
            <Swatches size={84} lit={5} gap={12} />
          </IconCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  50 · « organise son apparence »                                            */
/* -------------------------------------------------------------------------- */
export const Beat50: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const look = clock.at("apparence");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={20} y={190} w={420} h={252} scale={punch(clock, look, 0.08, 0.45)}>
          <EyeIcon size={420} look={1} hot={lit(clock, look, 0.2) > 0.5} />
        </At>
        <At x={560} y={60} w={320} h={480}>
          <UiPage w={320} on={lit(clock, look, 0.2) > 0.5} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  51 · « et la façon de construire »                                         */
/* -------------------------------------------------------------------------- */
export const Beat51: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const way = clock.at("façon");
  const build = clock.at("construire");
  const count = 1 + Math.floor(clock.p(way, build - way + 0.45, linear) * 3.99);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={188} y={60} w={560} h={520} scale={punch(clock, build, 0.04, 0.4)}>
          <UiBricks w={560} count={count} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  52 · « ses interfaces »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat52: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const interfaces = clock.at("interfaces");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={278} y={60} w={380} h={520} scale={punch(clock, interfaces, 0.05, 0.45)}>
          <UiPage w={346} on={lit(clock, interfaces, 0.2) > 0.5} />
        </At>
        <Sparkle x={730} y={130} size={90} progress={clock.p(interfaces, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  53 · « de manière cohérente. »                                             */
/* -------------------------------------------------------------------------- */
export const Beat53: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const manner = clock.at("manière");
  const coherent = clock.at("cohérente");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={40} y={0} w={330} h={495}>
          <UiPage w={330} on={lit(clock, coherent, 0.2) > 0.5} />
        </At>
        <At x={566} y={0} w={330} h={495}>
          <UiPage w={330} on={lit(clock, coherent, 0.2) > 0.5} />
        </At>
        <At x={418} y={130} w={100} h={100} scale={punch(clock, manner, 0.2, 0.45)}>
          <EqualSign size={100} on={lit(clock, manner, 0.2) > 0.5} />
        </At>
        <At x={388} y={470} w={160} h={160} scale={punch(clock, coherent, 0.15, 0.5)}>
          <Disc size={160}>
            <CheckMark size={104} progress={clock.p(coherent, 0.4)} color={colors.inkInverse} />
          </Disc>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  54 · « L'un s'intéresse à »                                                */
/* -------------------------------------------------------------------------- */
export const Beat54: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const one = clock.at("L'un");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={60} w={430} h={520} scale={punch(clock, one, 0.06, 0.4)}>
          <IconCard w={430} h={520} on={lit(clock, one, 0.2) > 0.5}>
            <Gear size={260} angle={seconds * 40} />
          </IconCard>
        </At>
        <At x={506} y={60} w={430} h={520}>
          <IconCard w={430} h={520} dim={0.55}>
            <Brush size={260} on={false} />
          </IconCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  55 · « comment ça fonctionne, »                                            */
/* -------------------------------------------------------------------------- */
export const Beat55: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const works = clock.at("fonctionne");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={90} y={80} w={470} h={470} scale={punch(clock, works, 0.05, 0.45)}>
          <Gear size={470} angle={seconds * 60} />
        </At>
        <At x={540} y={290} w={300} h={300}>
          <Gear size={300} angle={-seconds * 90 + 22} color={colors.inkInverse} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  56 · « l'autre à comment »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat56: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const other = clock.at("l'autre");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={0} y={60} w={430} h={520}>
          <IconCard w={430} h={520} dim={0.55}>
            <Gear size={260} angle={seconds * 40} color={colors.inkInverse} />
          </IconCard>
        </At>
        <At x={506} y={60} w={430} h={520} scale={punch(clock, other, 0.06, 0.4)}>
          <IconCard w={430} h={520} on={lit(clock, other, 0.2) > 0.5}>
            <Brush size={260} on={lit(clock, other, 0.2) > 0.5} />
          </IconCard>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  57 · « ça se présente. »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat57: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const presents = clock.at("présente");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={20} y={190} w={400} h={240}>
          <EyeIcon size={400} look={1} hot={lit(clock, presents, 0.2) > 0.5} />
        </At>
        <At x={520} y={40} w={360} h={540} scale={punch(clock, presents, 0.05, 0.45)}>
          <UiPage w={360} on={lit(clock, presents, 0.2) > 0.5} />
        </At>
        <Sparkle x={900} y={70} size={90} progress={clock.p(presents, 0.8)} color={colors.accent} />
        <Sparkle x={500} y={600} size={70} progress={clock.p(presents + 0.15, 0.8)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  58 · « Et toi, » (mascotte qui désigne le spectateur)                      */
/* -------------------------------------------------------------------------- */
export const Beat58: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const you = clock.at("toi");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <At x={26} y={30} w={460} h={310} scale={punch(clock, you, 0.05, 0.4)}>
          <IconCard w={460} h={310}>
            <Gear size={200} angle={seconds * 40} />
          </IconCard>
        </At>
        <At x={26} y={390} w={460} h={310} scale={punch(clock, you + 0.1, 0.05, 0.4)}>
          <IconCard w={460} h={310}>
            <Brush size={200} />
          </IconCard>
        </At>
      </Art>
      <ZoneMascot scene={scene} pose="point" attitude="confident" halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  59 · « tu connaissais la différence entre les deux ? »                     */
/* -------------------------------------------------------------------------- */
export const Beat59: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const knew = clock.at("connaissais");
  const two = clock.at("deux");
  const seconds = useSeconds();

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={393} y={0} w={150} h={150} scale={punch(clock, two, 0.25, 0.5)}>
          <Disc size={150} sign="?" />
        </At>
        <At x={0} y={170} w={430} h={440} scale={punch(clock, knew, 0.06, 0.4)}>
          <IconCard w={430} h={440} on={lit(clock, knew, 0.2) > 0.5}>
            <Gear size={230} angle={seconds * 40} />
          </IconCard>
        </At>
        <At x={506} y={170} w={430} h={440} scale={punch(clock, two, 0.06, 0.4)}>
          <IconCard w={430} h={440} on={lit(clock, two, 0.2) > 0.5}>
            <Brush size={230} />
          </IconCard>
        </At>
      </Art>
    </Shot>
  );
};
