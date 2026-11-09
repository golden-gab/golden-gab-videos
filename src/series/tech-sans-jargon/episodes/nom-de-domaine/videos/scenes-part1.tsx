/**
 * Plans 1 à 22 — « C'est quoi un nom de domaine ? »
 *
 * Bloc 1 : l'accroche (des adresses qu'on voit tous les jours), la question
 * « qu'y a-t-il derrière ? », puis le projet de lancer un site, les trois
 * éléments annoncés et le premier : le nom de domaine, l'adresse que l'on tape.
 *
 * Règles de la série : un message par plan, 3 mots maximum à l'écran, tout est
 * visible dès le début du plan (un mot prononcé déclenche une *réaction*, pas
 * l'apparition) et chaque plan déclare son gabarit de zones.
 */

import React from "react";

import { Art, lit, punch, Sparkle, ZoneMascot } from "../../../../../components/motion";
import { colors, strokeWidths } from "../../../../../config";
import { withAlpha } from "../../../../../utils/color";
import { Arrow, Padlock, Pill, Shot, useSince } from "../../../../web-story/kit";
import { DayDot } from "../../cache/videos/helpers";
import { Disc, EyeIcon, Loupe, PersonIcon, SchoolCap, Sun, Thought } from "../../../kit";
import {
  AddressBar,
  At,
  House,
  Numbered,
  Overlay,
  SiteWindow,
  on,
  pop,
  type BeatProps,
  useClock,
} from "./helpers";

const ART_W = 936;
const ART_H = 640;

/* -------------------------------------------------------------------------- */
/*  01 · « Google.com, »                                                       */
/* -------------------------------------------------------------------------- */
export const Beat01: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("Google.com,");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={38} y={250} w={860} h={129} scale={punch(clock, word, 0.06, 0.4)}>
          <AddressBar w={860} active={on(clock, "Google.com,")} />
        </At>
        <Sparkle x={150} y={210} size={110} progress={clock.p(word, 0.6)} color={colors.accent} />
        <Sparkle x={800} y={420} size={90} progress={clock.p(word + 0.15, 0.6)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  02 · « Facebook.com, »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat02: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("Facebook.com,");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={58} y={120} w={820} h={123}>
          <AddressBar w={820} dim={0.5} nameW={300} />
        </At>
        <At x={58} y={330} w={820} h={123} scale={punch(clock, word, 0.06, 0.4)}>
          <AddressBar w={820} active={on(clock, "Facebook.com,")} nameW={340} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  03 · « YouTube.com… »                                                      */
/* -------------------------------------------------------------------------- */
export const Beat03: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("YouTube.com…");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={78} y={30} w={780} h={117}>
          <AddressBar w={780} dim={0.45} nameW={280} />
        </At>
        <At x={78} y={230} w={780} h={117}>
          <AddressBar w={780} dim={0.45} nameW={320} />
        </At>
        <At x={78} y={430} w={780} h={117} scale={punch(clock, word, 0.06, 0.4)}>
          <AddressBar w={780} active={on(clock, "YouTube.com…")} nameW={300} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  04 · « Tu vois ce genre de termes »                                        */
/* -------------------------------------------------------------------------- */
export const Beat04: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const seen = clock.at("vois");
  const look = Math.sin(useSince(0) * 3.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        {[0, 1, 2].map((index) => (
          <At key={index} x={158} y={index * 108} w={620} h={93}>
            <AddressBar w={620} dim={0.5} nameW={200 + index * 30} />
          </At>
        ))}
        <At x={268} y={360} w={400} h={240} scale={punch(clock, seen, 0.08, 0.4)}>
          <EyeIcon size={400} look={look} hot={on(clock, "vois")} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  05 · « tous les jours. »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat05: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const start = clock.at("tous");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={338} y={40} w={260} h={260} scale={punch(clock, start, 0.1, 0.5)}>
          <Sun size={260} on={on(clock, "tous")} />
        </At>
        <div style={{ position: "absolute", left: 18, top: 400, width: 900, display: "flex", justifyContent: "space-between" }}>
          {Array.from({ length: 7 }, (_, index) => (
            <DayDot key={index} size={100} on={lit(clock, start + 0.05 + index * 0.07, 0.1) > 0.5} />
          ))}
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  06 · « Mais est-ce que tu sais »                                           */
/* -------------------------------------------------------------------------- */
export const Beat06: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const ask = clock.at("est-ce");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={90} y={150} w={340} h={340}>
          <PersonIcon size={340} on={on(clock, "sais")} />
        </At>
        <At x={520} y={110} w={300} h={300} scale={punch(clock, ask, 0.18, 0.5)} rotate={Math.sin(clock.p(ask, 0.6, (t) => t) * Math.PI * 4) * 6}>
          <Disc size={300} sign="?" />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  07 · « vraiment ce qui se cache »                                          */
/* -------------------------------------------------------------------------- */
export const Beat07: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const hide = clock.at("cache");
  const lift = clock.p(hide, 0.5);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={68} y={20} w={800} h={120}>
          <AddressBar w={800} active={lift > 0.5} nameW={300} />
        </At>
        <div style={{ position: "absolute", left: 238, top: 200, width: 460, height: 400, overflow: "hidden", borderRadius: 28 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 460, height: 400, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: withAlpha(colors.ink, 0.6) }}>
            <House w={380} draw={0} fill={0} on={lift > 0.5} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: -lift * 420,
              width: 460,
              height: 400,
              backgroundColor: withAlpha(colors.inkInverse, 0.92),
              borderBottom: `${strokeWidths.thick}px solid ${colors.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Disc size={170} sign="?" />
          </div>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  08 · « derrière ces adresses ? »                                           */
/* -------------------------------------------------------------------------- */
export const Beat08: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const behind = clock.at("derrière");
  const asked = clock.at("adresses?");
  const sweep = clock.p(behind, 1.1, (t) => t);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={68} y={190} w={800} h={120}>
          <AddressBar w={800} dim={0.6} nameW={300} />
        </At>
        <At x={80 + sweep * 420} y={50 + Math.sin(sweep * Math.PI) * 30} w={330} h={330}>
          <Loupe size={330} />
        </At>
        <At x={650} y={380} w={200} h={200} scale={punch(clock, asked, 0.2, 0.5)}>
          <Disc size={200} sign="?" />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  09 · « Imagine que tu veuilles » (mascotte pensive)                        */
/* -------------------------------------------------------------------------- */
export const Beat09: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const imagine = clock.at("Imagine");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <At x={30} y={90} w={452} h={500} scale={punch(clock, imagine, 0.05, 0.5)}>
          <Thought w={452} h={330}>
            <SiteWindow w={330} fill={0.25} active={on(clock, "veuilles")} />
          </Thought>
        </At>
      </Art>
      <ZoneMascot scene={scene} pose="thinking" attitude="curious" halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  10 · « lancer ton propre site Internet. »                                  */
/* -------------------------------------------------------------------------- */
export const Beat10: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const launch = clock.at("lancer");
  const rise = clock.p(launch, 0.7);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <Overlay w={ART_W} h={ART_H}>
          <Arrow x1={468} y1={620} x2={468} y2={430} progress={1} color={rise > 0.3 ? colors.accent : withAlpha(colors.inkInverse, 0.5)} />
        </Overlay>
        <At x={178} y={40 - rise * 40} w={580} h={418}>
          <SiteWindow w={580} active={on(clock, "site")} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  11 · « Avant même que quelqu'un puisse le »                                */
/* -------------------------------------------------------------------------- */
export const Beat11: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const before = clock.at("Avant");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={40} y={180} w={280} h={280}>
          <PersonIcon size={280} on={on(clock, "puisse")} />
        </At>
        <At x={360} y={110} w={540} h={390}>
          <SiteWindow w={540} dim={0.55} />
        </At>
        <At x={540} y={190} w={190} h={190} scale={punch(clock, before, 0.2, 0.45)}>
          <Padlock size={190} open={0} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  12 · « visiter, il y a »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat12: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const visit = clock.at("visiter,");
  const go = clock.p(visit, 0.6);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={360} y={110} w={540} h={390}>
          <SiteWindow w={540} active={go > 0.5} />
        </At>
        <At x={540} y={90 - go * 30} w={190} h={190} rotate={0}>
          <Padlock size={190} open={go} />
        </At>
        <At x={40 + go * 60} y={180} w={280} h={280}>
          <PersonIcon size={280} on />
        </At>
        <Overlay w={ART_W} h={ART_H}>
          <Arrow x1={330} y1={560} x2={560} y2={560} progress={go} />
        </Overlay>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  13 · « trois éléments essentiels »                                         */
/* -------------------------------------------------------------------------- */
export const Beat13: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const keys = ["trois", "éléments", "essentiels"] as const;

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        {keys.map((key, index) => (
          <At key={key} x={52 + index * 288} y={190} w={240} h={240} scale={pop(clock, key, 0.14)}>
            <Numbered size={240} n={index + 1} active={on(clock, key)} />
          </At>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  14 · « que tu dois connaître. »                                            */
/* -------------------------------------------------------------------------- */
export const Beat14: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const know = clock.at("connaître.");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <div style={{ position: "absolute", left: 168, top: 20, width: 600, display: "flex", justifyContent: "space-between" }}>
          {[1, 2, 3].map((n) => (
            <Numbered key={n} size={150} n={n} active />
          ))}
        </div>
        <At x={268} y={230} w={400} h={400} scale={punch(clock, know, 0.1, 0.5)}>
          <SchoolCap size={400} color={on(clock, "connaître.") ? colors.accent : colors.inkInverse} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  15 · « Le premier, c'est le »                                              */
/* -------------------------------------------------------------------------- */
export const Beat15: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={238} y={110} w={460} h={460} scale={pop(clock, "premier,", 0.16)}>
          <Numbered size={460} n={1} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  16 · « nom de domaine. »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat16: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={68} y={330} w={800} h={120}>
          <AddressBar w={800} active={on(clock, "domaine.")} nameW={300} />
        </At>
        <div style={{ position: "absolute", left: 0, top: 130, width: ART_W, display: "flex", justifyContent: "center", transform: `scale(${pop(clock, "nom", 0.12)})` }}>
          <Pill size={64}>NOM DE DOMAINE</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  17 · « C'est tout simplement »                                             */
/* -------------------------------------------------------------------------- */
export const Beat17: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={38} y={240} w={860} h={129} scale={pop(clock, "simplement", 0.06)}>
          <AddressBar w={860} active={on(clock, "simplement")} />
        </At>
        <Sparkle x={780} y={190} size={100} progress={clock.p(clock.at("simplement"), 0.6)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  18 · « l'adresse que les gens tapent »                                     */
/* -------------------------------------------------------------------------- */
export const Beat18: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const type = clock.p(clock.at("adresse") - 0.05, 0.9, (t) => t);
  const people = clock.at("gens");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={68} y={90} w={800} h={120}>
          <AddressBar w={800} active={type > 0.6} typed={type} nameW={330} />
        </At>
        <At x={358} y={290} w={220} h={220} scale={punch(clock, people, 0.12, 0.4)}>
          <PersonIcon size={220} on={on(clock, "tapent")} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  19 · « dans leur navigateur »                                              */
/* -------------------------------------------------------------------------- */
export const Beat19: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={88} y={50} w={760} h={547} scale={pop(clock, "navigateur", 0.05)}>
          <SiteWindow w={760} active={on(clock, "navigateur")} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  20 · « pour accéder à ton site. »                                          */
/* -------------------------------------------------------------------------- */
export const Beat20: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const open = on(clock, "accéder");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={118} y={10} w={700} h={105}>
          <AddressBar w={700} active nameW={260} />
        </At>
        <Overlay w={ART_W} h={ART_H}>
          <Arrow x1={468} y1={140} x2={468} y2={250} progress={1} color={open ? colors.accent : withAlpha(colors.inkInverse, 0.5)} />
        </Overlay>
        <At x={198} y={270} w={540} h={390} scale={pop(clock, "accéder", 0.07)}>
          <SiteWindow w={540} active={open} dim={open ? 1 : 0.6} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  21 · « Comme monsite.com. »                                                */
/* -------------------------------------------------------------------------- */
export const Beat21: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("monsite.com.");
  const float = Math.sin(useSince(0) * 2.4) * 8;

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={38} y={240 + float} w={860} h={129} scale={punch(clock, word, 0.07, 0.5)}>
          <AddressBar w={860} text="monsite.com" active={on(clock, "monsite.com.")} />
        </At>
        <Sparkle x={120} y={200} size={110} progress={clock.p(word, 0.7)} color={colors.accent} />
        <Sparkle x={820} y={440} size={100} progress={clock.p(word + 0.2, 0.7)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  22 · « Le deuxième, c'est »                                                */
/* -------------------------------------------------------------------------- */
export const Beat22: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={238} y={110} w={460} h={460} scale={pop(clock, "deuxième,", 0.16)}>
          <Numbered size={460} n={2} />
        </At>
      </Art>
    </Shot>
  );
};
