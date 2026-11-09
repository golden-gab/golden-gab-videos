/**
 * Plans 45 à 66 — « C'est quoi un nom de domaine ? »
 *
 * Bloc 3 : la maison (le nom de domaine est son adresse, l'hébergement le
 * terrain, le site la maison elle-même), une adresse sans maison et une maison
 * introuvable, le même principe sur Internet, puis la chute : derrière
 * « Google.com » il y a bien plus qu'un nom, et la question finale.
 */

import React from "react";

import { Art, LibIcon, lit, punch, Sparkle, ZoneMascot } from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import { withAlpha } from "../../../../../utils/color";
import { CheckMark, CrossMark, MapPin, Pill, Shot, useSince } from "../../../../web-story/kit";
import { Calendar } from "../../cache/videos/helpers";
import { Disc, Loupe, PersonIcon } from "../../../kit";
import {
  AddressBar,
  AddressSign,
  At,
  EqualSign,
  House,
  Numbered,
  Overlay,
  Plot,
  ServerNode,
  SiteWindow,
  on,
  pop,
  type BeatProps,
  useClock,
} from "./helpers";

const ART_W = 936;
const ART_H = 640;

const easeOut = (t: number): number => 1 - (1 - t) * (1 - t);

/* -------------------------------------------------------------------------- */
/*  45 · « Le nom de domaine, »                                                */
/* -------------------------------------------------------------------------- */
export const Beat45: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <div style={{ position: "absolute", left: 0, top: 10, width: ART_W, display: "flex", justifyContent: "center", transform: `scale(${pop(clock, "nom", 0.12)})` }}>
          <Pill size={64}>NOM DE DOMAINE</Pill>
        </div>
        <At x={238} y={170} w={460} h={391}>
          <House w={460} draw={1} fill={1} on={on(clock, "domaine,")} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  46 · « c'est son adresse. »                                                */
/* -------------------------------------------------------------------------- */
export const Beat46: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("adresse.");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={30} y={150} w={480} h={408}>
          <House w={480} draw={1} fill={1} />
        </At>
        <At x={560} y={150} w={320} h={384} scale={punch(clock, word, 0.14, 0.45)}>
          <AddressSign size={320} active={on(clock, "adresse.")} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  47 · « L'hébergement, c'est le »                                           */
/* -------------------------------------------------------------------------- */
export const Beat47: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const key = "l'hébergement,";

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <div style={{ position: "absolute", left: 0, top: 40, width: ART_W, display: "flex", justifyContent: "center", transform: `scale(${pop(clock, key, 0.12)})` }}>
          <Pill size={64}>HÉBERGEMENT</Pill>
        </div>
        <At x={118} y={320} w={700} h={182}>
          <Plot w={700} ghost active={on(clock, key)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  48 · « terrain sur lequel »                                                */
/* -------------------------------------------------------------------------- */
export const Beat48: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("terrain");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={48} y={190} w={840} h={218} scale={punch(clock, word, 0.06, 0.45)}>
          <Plot w={840} active={on(clock, "terrain")} />
        </At>
        <Sparkle x={150} y={170} size={110} progress={clock.p(word, 0.6)} color={colors.accent} />
        <Sparkle x={790} y={440} size={90} progress={clock.p(word + 0.15, 0.6)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  49 · « elle est construite. »                                              */
/* -------------------------------------------------------------------------- */
export const Beat49: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("construite.");
  const drop = easeOut(clock.p(word - 0.45, 0.6, (t) => t));

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={118} y={360} w={700} h={182}>
          <Plot w={700} active />
        </At>
        <At x={288} y={20 + drop * 160} w={360} h={306}>
          <House w={360} draw={1} fill={1} on={drop > 0.95} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  50 · « Et le site Internet, »                                              */
/* -------------------------------------------------------------------------- */
export const Beat50: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <div style={{ position: "absolute", left: 0, top: 10, width: ART_W, display: "flex", justifyContent: "center", transform: `scale(${pop(clock, "site", 0.12)})` }}>
          <Pill size={64}>SITE INTERNET</Pill>
        </div>
        <At x={238} y={170} w={460} h={391}>
          <House w={460} draw={1} fill={1} on={on(clock, "site")} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  51 · « c'est la maison elle-même. »                                        */
/* -------------------------------------------------------------------------- */
export const Beat51: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const self = on(clock, "elle-même.");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={218} y={60} w={500} h={425} scale={pop(clock, "maison", 0.06)}>
          <House w={500} draw={1} fill={1} on={on(clock, "maison")} />
        </At>
        <At x={338} y={380} w={260} h={187} scale={pop(clock, "elle-même.", 0.1)}>
          <SiteWindow w={260} active={self} dim={self ? 1 : 0.65} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  52 · « Tu peux avoir une adresse »                                         */
/* -------------------------------------------------------------------------- */
export const Beat52: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={88} y={350} w={760} h={198}>
          <Plot w={760} ghost />
        </At>
        <At x={318} y={90} w={300} h={360} scale={pop(clock, "adresse", 0.1)}>
          <AddressSign size={300} active={on(clock, "adresse")} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  53 · « sans avoir construit ta maison. »                                   */
/* -------------------------------------------------------------------------- */
export const Beat53: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const no = on(clock, "construit");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={88} y={380} w={760} h={198}>
          <Plot w={760} ghost />
        </At>
        <At x={80} y={160} w={240} h={288}>
          <AddressSign size={240} active />
        </At>
        <At x={420} y={170} w={400} h={340}>
          <House w={400} draw={0} fill={0} />
        </At>
        <At x={660} y={60} w={150} h={150} scale={pop(clock, "construit", 0.3)}>
          <CrossMark size={150} color={no ? colors.accent : withAlpha(colors.inkInverse, 0.4)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  54 · « Et tu peux avoir une maison »                                       */
/* -------------------------------------------------------------------------- */
export const Beat54: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={88} y={380} w={760} h={198}>
          <Plot w={760} active />
        </At>
        <At x={238} y={90} w={460} h={391} scale={pop(clock, "maison", 0.06)}>
          <House w={460} draw={1} fill={1} on={on(clock, "maison")} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  55 · « sans que les gens sachent »                                         */
/* -------------------------------------------------------------------------- */
export const Beat55: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const gens = clock.at("gens");
  const know = clock.at("sachent");
  const starts = [gens, gens + 0.18, know];

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        {[0, 1, 2].map((index) => (
          <React.Fragment key={index}>
            <At x={62 + index * 308} y={330} w={200} h={200}>
              <PersonIcon size={200} on={lit(clock, starts[index], 0.1) > 0.5} opacity={0.85} />
            </At>
            <At x={107 + index * 308} y={130} w={110} h={110} scale={punch(clock, starts[index], 0.3, 0.4)}>
              <Disc size={110} sign="?" />
            </At>
          </React.Fragment>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  56 · « où la trouver. »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat56: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const search = clock.p(clock.at("où"), 0.8, (t) => t);
  const found = on(clock, "trouver.");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        {[0, 1, 2].map((index) => (
          <At key={index} x={40 + index * 318} y={370} w={220} h={187}>
            <div style={{ opacity: index === 2 && found ? 1 : 0.5 }}>
              <House w={220} draw={1} fill={1} on={index === 2 && found} />
            </div>
          </At>
        ))}
        <At x={40 + search * 300} y={100 + Math.sin(search * Math.PI) * 30} w={250} h={250}>
          <Loupe size={250} />
        </At>
        <At x={678} y={150} w={150} h={150} scale={pop(clock, "trouver.", 0.25)}>
          <MapPin size={150} color={found ? colors.accent : withAlpha(colors.inkInverse, 0.4)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  57 · « Sur Internet, c'est »                                               */
/* -------------------------------------------------------------------------- */
export const Beat57: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const spin = Math.sin(useSince(0) * 2) * 6;

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={258} y={110} w={420} h={420} scale={pop(clock, "Internet,", 0.1)} rotate={spin}>
          <LibIcon id="web-globe" size={420} color={on(clock, "Internet,") ? colors.accent : colors.inkInverse} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  58 · « exactement le même principe. » (mascotte qui explique)              */
/* -------------------------------------------------------------------------- */
export const Beat58: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const rows = [
    { key: "exactement", y: 20 },
    { key: "même", y: 250 },
    { key: "principe.", y: 480 },
  ] as const;

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        {rows.map((row, index) => {
          const active = on(clock, row.key);

          return (
            <At key={row.key} x={0} y={row.y} w={512} h={200} scale={pop(clock, row.key, 0.06)}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 512, height: 200, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", boxSizing: "border-box" }}>
                <div style={{ width: 200, display: "flex", justifyContent: "center" }}>
                  {index === 0 ? <AddressSign size={170} active={active} /> : index === 1 ? <Plot w={200} active={active} /> : <House w={190} draw={1} fill={1} on={active} />}
                </div>
                <EqualSign size={84} on={active} />
                <div style={{ width: 200, display: "flex", justifyContent: "center" }}>
                  {index === 0 ? <AddressBar w={200} active={active} nameW={64} ratio={0.3} /> : index === 1 ? <ServerNode size={150} on={active} /> : <SiteWindow w={190} active={active} dim={active ? 1 : 0.7} />}
                </div>
              </div>
            </At>
          );
        })}
      </Art>
      <ZoneMascot scene={scene} pose="explaining" attitude="confident" halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  59 · « Alors, la prochaine fois »                                          */
/* -------------------------------------------------------------------------- */
export const Beat59: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const next = on(clock, "prochaine");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={208} y={50} w={520} h={478} scale={pop(clock, "fois", 0.06)}>
          <Calendar w={520} day={next ? 10 : -1} today={9} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  60 · « que tu taperas »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat60: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const type = clock.p(clock.at("taperas") - 0.1, 0.8, (t) => t);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={68} y={90} w={800} h={120}>
          <AddressBar w={800} active={type > 0.6} typed={type} nameW={330} />
        </At>
        <At x={358} y={290} w={220} h={220} scale={punch(clock, clock.at("taperas"), 0.12, 0.4)}>
          <PersonIcon size={220} on />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  61 · « Google.com ou »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat61: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("Google.com");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={38} y={250} w={860} h={129} scale={punch(clock, word, 0.06, 0.4)}>
          <AddressBar w={860} active={on(clock, "Google.com")} />
        </At>
        <Sparkle x={150} y={210} size={110} progress={clock.p(word, 0.6)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  62 · « YouTube.com, »                                                      */
/* -------------------------------------------------------------------------- */
export const Beat62: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("YouTube.com,");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={58} y={120} w={820} h={123}>
          <AddressBar w={820} dim={0.5} nameW={300} />
        </At>
        <At x={58} y={330} w={820} h={123} scale={punch(clock, word, 0.06, 0.4)}>
          <AddressBar w={820} active={on(clock, "YouTube.com,")} nameW={300} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  63 · « tu sauras qu'il y a » (mascotte joyeuse)                            */
/* -------------------------------------------------------------------------- */
export const Beat63: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("sauras");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <At x={126} y={90} w={260} h={260} scale={punch(clock, word, 0.18, 0.45)}>
          <CheckMark size={260} progress={clock.p(word, 0.45)} color={on(clock, "sauras") ? colors.accent : withAlpha(colors.inkInverse, 0.3)} />
        </At>
        <At x={21} y={420} w={470} h={70}>
          <AddressBar w={470} active={on(clock, "sauras")} nameW={170} />
        </At>
      </Art>
      <ZoneMascot scene={scene} pose="happy" attitude="excited" halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  64 · « bien plus qu'un simple nom »                                        */
/* -------------------------------------------------------------------------- */
export const Beat64: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const keys = ["bien", "plus", "simple"] as const;

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={78} y={20} w={780} h={117}>
          <AddressBar w={780} active nameW={280} />
        </At>
        <At x={30} y={230} w={240} h={288} scale={pop(clock, keys[0], 0.12)}>
          <AddressSign size={240} active={on(clock, keys[0])} />
        </At>
        <At x={318} y={380} w={300} h={78} scale={pop(clock, keys[1], 0.12)}>
          <Plot w={300} active={on(clock, keys[1])} />
        </At>
        <At x={650} y={290} w={260} h={221} scale={pop(clock, keys[2], 0.12)}>
          <House w={260} draw={1} fill={1} on={on(clock, keys[2])} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  65 · « derrière cette adresse. »                                           */
/* -------------------------------------------------------------------------- */
export const Beat65: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const lift = easeOut(clock.p(clock.at("derrière"), 0.6, (t) => t));

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <div style={{ position: "absolute", left: 138, top: 70, width: 660, height: 500, overflow: "hidden", borderRadius: radius.lg, backgroundColor: withAlpha(colors.ink, 0.6) }}>
          <div style={{ position: "absolute", left: 50, top: 270 }}>
            <Plot w={560} active />
          </div>
          <div style={{ position: "absolute", left: 130, top: 70 }}>
            <House w={400} draw={1} fill={1} on={lift > 0.9} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: -lift * 520,
              width: 660,
              height: 500,
              backgroundColor: withAlpha(colors.inkInverse, 0.94),
              borderBottom: `${strokeWidths.thick}px solid ${colors.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AddressBar w={560} active nameW={200} />
          </div>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  66 · « Tu connaissais cette différence ? » (mascotte qui désigne)          */
/* -------------------------------------------------------------------------- */
export const Beat66: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const keys = ["connaissais", "cette", "différence?"] as const;

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <Overlay w={512} h={720}>
          {[0, 1].map((index) => (
            <path key={index} d={`M256 ${196 + index * 270} V${250 + index * 270}`} stroke={withAlpha(colors.inkInverse, 0.35)} strokeWidth={8} strokeLinecap="round" strokeDasharray="2 14" />
          ))}
        </Overlay>
        {keys.map((key, index) => (
          <At key={key} x={166} y={index * 270} w={180} h={180} scale={pop(clock, key, 0.16)}>
            <Numbered size={180} n={index + 1} active={on(clock, key)} />
          </At>
        ))}
      </Art>
      <ZoneMascot scene={scene} pose="point" attitude="confident" halo="accent" />
    </Shot>
  );
};
