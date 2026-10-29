/**
 * Plans 19 à 36 — « C'est quoi le cache ? »
 *
 * Bloc 2 : ce que garde le téléphone (des copies temporaires d'images, de
 * pages), le mot « cache » et ce qu'il apporte (vitesse, efficacité), puis le
 * revers : ces fichiers prennent de la place.
 */

import React from "react";

import {
  abs,
  Art,
  BrowserFrame,
  Burst,
  LibIcon,
  lit,
  punch,
  shake,
  Sparkle,
  ZoneMascot,
} from "../../../../../components/motion";
import { colors } from "../../../../../config";
import { withAlpha } from "../../../../../utils/color";
import { Card, CheckMark, Gear, Pill, Shot } from "../../../../web-story/kit";
import { Disc, Stopwatch } from "../../../kit";
import {
  AppSquare,
  At,
  type BeatProps,
  CacheBox,
  DownArrow,
  FileIcon,
  Lightning,
  MsgPhone,
  PageBody,
  PicFrame,
  Reload,
  StorageBar,
  useClock,
  Veto,
} from "./helpers";

const linear = (input: number): number => input;

/** Cinq barres montantes qui s'allument de gauche à droite (`level` 0 → 1). */
const Meter: React.FC<{ readonly w: number; readonly h: number; readonly level: number }> = ({ w, h, level }) => {
  const count = 5;
  const gap = 22;
  const barW = (w - gap * (count - 1)) / count;

  return (
    <div style={{ position: "relative", width: w, height: h }}>
      {Array.from({ length: count }, (_, index) => {
        const on = level * count > index + 0.2;
        const barH = h * (0.3 + 0.7 * ((index + 1) / count));

        return (
          <div
            key={index}
            style={{
              ...abs(index * (barW + gap), h - barH, barW, barH),
              borderRadius: 18,
              backgroundColor: on ? colors.accent : withAlpha(colors.inkInverse, 0.25),
            }}
          />
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  19 · « ou que tu utilises une application, »                               */
/* -------------------------------------------------------------------------- */
export const Beat19: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const use = clock.at("utilises");
  const app = clock.at("application");
  const on = lit(clock, app, 0.15) > 0.5;
  const tap = clock.p(use, 0.5);
  const icons = ["web-message-circle", "web-play", "web-mail", "web-newspaper"];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={158} y={20} w={620} h={600}>
          <Card w={620} h={600} active={on}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 220px)", gap: 36 }}>
              {icons.map((icon, index) => (
                <div key={icon} style={{ transform: `scale(${index === 1 ? punch(clock, app, 0.12, 0.45) : 1})` }}>
                  <AppSquare size={220} icon={icon} on={index === 1 && on} />
                </div>
              ))}
            </div>
          </Card>
        </At>
        <div style={abs(640 + 160 * (1 - tap), 230 + 170 * (1 - tap), 130, 130)}>
          <LibIcon id="web-pointer-click" size={130} color={colors.inkInverse} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  20 · « ton téléphone garde »                                               */
/* -------------------------------------------------------------------------- */
export const Beat20: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const phone = clock.at("téléphone");
  const keep = clock.at("garde");
  const fall = clock.p(phone, 0.6);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={318} y={150} w={300} h={470} scale={punch(clock, keep, 0.06, 0.4)}>
          <MsgPhone w={300} h={470} hot={lit(clock, keep, 0.2) > 0.5} />
        </At>
        <At x={383} y={120 * fall} w={170} h={170}>
          <DownArrow size={170} />
        </At>
        <Sparkle x={200} y={250} size={80} progress={clock.p(keep, 0.9)} color={colors.accent} />
        <Sparkle x={740} y={330} size={72} progress={clock.p(keep + 0.1, 0.9)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  21 · « temporairement »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat21: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const temp = clock.at("temporairement");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={248} y={100} w={440} h={440} scale={punch(clock, temp, 0.06, 0.4)}>
          <Stopwatch size={440} sweep={clock.p(0, 0.6, linear)} />
        </At>
        <Sparkle x={170} y={150} size={76} progress={clock.p(temp, 0.5)} color={colors.accent} />
        <Sparkle x={770} y={470} size={76} progress={clock.p(temp + 0.05, 0.5)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  22 · « certains éléments, »                                                */
/* -------------------------------------------------------------------------- */
export const Beat22: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const some = clock.at("certains");
  const chosen = [1, 3, 4];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(65, 56, 806, 528)}>
          {Array.from({ length: 6 }, (_, index) => {
            const pick = chosen.indexOf(index);
            const on = pick !== -1 && lit(clock, some + pick * 0.1, 0.12) > 0.5;

            return (
              <div
                key={index}
                style={{
                  ...abs((index % 3) * 278, Math.floor(index / 3) * 278, 250, 250),
                  transform: `scale(${pick !== -1 ? punch(clock, some + pick * 0.1, 0.1, 0.4) : 1})`,
                }}
              >
                <Card w={250} h={250} active={on} dim={pick === -1 ? 0.5 : 1}>
                  <FileIcon size={150} on={on} dim={pick === -1} />
                </Card>
              </div>
            );
          })}
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  23 · « comme des images, »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat23: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const images = clock.at("images");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {[0, 1, 2].map((index) => {
          const at = images + index * 0.12;
          const on = lit(clock, at, 0.1) > 0.5;

          return (
            <At key={index} x={20 + index * 308} y={190} w={280} h={260} scale={punch(clock, at, 0.1, 0.4)}>
              <Card w={280} h={260} active={on}>
                <PicFrame w={210} on={on} />
              </Card>
            </At>
          );
        })}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  24 · « pour éviter de devoir »                                             */
/* -------------------------------------------------------------------------- */
export const Beat24: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const avoid = clock.at("éviter");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={338} y={180} w={260} h={260} rotate={shake(clock, avoid, 6, 0.5)}>
          <DownArrow size={260} />
        </At>
        <At x={258} y={110} w={420} h={420}>
          <Veto size={420} progress={clock.p(avoid, 0.6)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  25 · « tout recharger la prochaine fois. »                                 */
/* -------------------------------------------------------------------------- */
export const Beat25: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const next = clock.at("prochaine");
  const times = clock.at("fois");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={40} y={190} w={260} h={260}>
          <Reload size={260} angle={clock.frame * 7} />
        </At>
        <At x={10} y={160} w={320} h={320}>
          <Veto size={320} progress={clock.p(next, 0.6)} color={colors.inkInverse} />
        </At>
        <At x={440} y={140} w={460} h={380} scale={punch(clock, times, 0.05, 0.4)}>
          <BrowserFrame width={460} height={380} tone="light">
            <PageBody w={460} fill={1} hot={lit(clock, times, 0.2) > 0.5} />
          </BrowserFrame>
        </At>
        <At x={760} y={40} w={170} h={170} scale={punch(clock, times, 0.25, 0.5)}>
          <Lightning size={170} on={lit(clock, times, 0.2) > 0.5} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  26 · « C'est ce qu'on appelle »                                            */
/* -------------------------------------------------------------------------- */
export const Beat26: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const call = clock.at("appelle");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <At x={66} y={170} w={380} h={380} scale={punch(clock, call, 0.12, 0.5)}>
          <Disc size={380} sign="?" />
        </At>
        <Burst x={256} y={360} radius={250} progress={clock.p(call, 0.8)} rays={9} />
        <Sparkle x={70} y={110} size={72} progress={clock.p(call + 0.1, 0.9)} color={colors.accent} />
      </Art>
      <ZoneMascot scene={scene} pose="explaining" attitude="confident" halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  27 · « le cache. »                                                         */
/* -------------------------------------------------------------------------- */
export const Beat27: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const cache = clock.at("cache");
  const on = lit(clock, cache, 0.15) > 0.5;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={228} y={10} w={480} h={432} scale={punch(clock, cache, 0.08, 0.45)}>
          <CacheBox size={480} on={on} />
        </At>
        <div style={{ ...abs(0, 490, 936, 130), display: "flex", justifyContent: "center", transform: `scale(${punch(clock, cache, 0.12, 0.45)})` }}>
          <Pill tone={on ? "accent" : "dark"} size={84}>
            CACHE
          </Pill>
        </div>
        <Sparkle x={150} y={150} size={80} progress={clock.p(cache, 0.9)} color={colors.accent} />
        <Sparkle x={790} y={120} size={80} progress={clock.p(cache + 0.1, 0.9)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  28 · « Grâce à lui, »                                                      */
/* -------------------------------------------------------------------------- */
export const Beat28: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const him = clock.at("lui");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={208} y={80} w={520} h={468} scale={punch(clock, him, 0.08, 0.45)}>
          <CacheBox size={520} on />
        </At>
        <Burst x={468} y={310} radius={400} progress={clock.p(him, 0.8)} rays={11} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  29 · « certaines pages »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat29: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const pages = clock.at("pages");
  const on = lit(clock, pages, 0.15) > 0.5;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {[0, 1, 2].map((index) => (
          <At key={index} x={42 + index * 296} y={130} w={260} h={380} scale={index === 1 ? punch(clock, pages, 0.1, 0.45) : 1}>
            <Card w={260} h={380} active={index === 1 && on} dim={index === 1 && on ? 1 : 0.55}>
              <PageBody w={204} fill={1} hot={index === 1 && on} />
            </Card>
          </At>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  30 · « s'ouvrent plus vite »                                               */
/* -------------------------------------------------------------------------- */
export const Beat30: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const open = clock.at("ouvrent");
  const fast = clock.at("vite");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={70} y={150} w={340} h={340}>
          <Stopwatch size={340} sweep={clock.p(open, 0.6, linear)} />
        </At>
        <At x={520} y={170} w={290} h={290} scale={punch(clock, fast, 0.14, 0.45)}>
          <Lightning size={290} on={lit(clock, fast, 0.15) > 0.5} />
        </At>
        <Burst x={665} y={315} radius={230} progress={clock.p(fast, 0.7)} rays={8} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  31 · « et tes applications »                                               */
/* -------------------------------------------------------------------------- */
export const Beat31: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const apps = clock.at("applications");
  const icons = ["web-message-circle", "web-play", "web-mail", "web-newspaper"];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {icons.map((icon, index) => {
          const at = apps + index * 0.1;

          return (
            <At key={icon} x={23 + index * 230} y={220} w={200} h={200} scale={punch(clock, at, 0.1, 0.4)}>
              <AppSquare size={200} icon={icon} on={lit(clock, at, 0.1) > 0.5} />
            </At>
          );
        })}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  32 · « peuvent fonctionner »                                               */
/* -------------------------------------------------------------------------- */
export const Beat32: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const work = clock.at("fonctionner");
  const boost = Math.max(0, clock.frame - work * clock.fps);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={170} y={130} w={360} h={360}>
          <Gear size={360} angle={clock.frame * 2 + boost * 3} />
        </At>
        <At x={500} y={290} w={260} h={260}>
          <Gear size={260} angle={-(clock.frame * 2 + boost * 3) * 1.38 + 22} color={colors.inkInverse} />
        </At>
        <Sparkle x={780} y={160} size={80} progress={clock.p(work, 0.9)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  33 · « plus efficacement. »                                                */
/* -------------------------------------------------------------------------- */
export const Beat33: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const more = clock.at("plus");
  const done = clock.at("efficacement");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={118} y={160} w={560} h={380}>
          <Meter w={560} h={380} level={clock.p(more, 0.9, linear)} />
        </At>
        <At x={720} y={150} w={170} h={170} scale={punch(clock, done, 0.18, 0.45)}>
          <Disc size={170}>
            <CheckMark size={110} progress={clock.p(done, 0.3)} color={colors.inkInverse} />
          </Disc>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  34 · « Mais parfois, »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat34: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const sometimes = clock.at("parfois");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={278} y={130} w={380} h={380} scale={punch(clock, sometimes, 0.16, 0.45)} rotate={shake(clock, sometimes, 5, 0.5)}>
          <Disc size={380} sign="!" />
        </At>
        <Burst x={468} y={320} radius={380} progress={clock.p(sometimes, 0.7)} rays={10} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  35 · « ces fichiers »                                                      */
/* -------------------------------------------------------------------------- */
export const Beat35: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const files = clock.at("fichiers");
  const rotations = [-12, -4, 5, 13];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {rotations.map((rotate, index) => (
          <At key={index} x={110 + index * 150} y={150 + (index % 2) * 50} w={260} h={260} rotate={rotate} scale={punch(clock, files + index * 0.05, 0.08, 0.4)}>
            <FileIcon size={260} on={index === 3 && lit(clock, files, 0.15) > 0.5} />
          </At>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  36 · « prennent de la place »                                              */
/* -------------------------------------------------------------------------- */
export const Beat36: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const take = clock.at("prennent");
  const place = clock.at("place");
  const used = 0.3 + 0.65 * clock.p(take, 0.8, linear);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={68} y={300} w={800} h={140}>
          <StorageBar w={800} h={140} used={used} hot={used > 0.85} />
        </At>
        <At x={383} y={60} w={170} h={170} scale={punch(clock, place, 0.18, 0.45)}>
          <Disc size={170} sign="!" />
        </At>
        <Sparkle x={810} y={270} size={72} progress={clock.p(place, 0.9)} color={colors.accent} />
      </Art>
    </Shot>
  );
};
