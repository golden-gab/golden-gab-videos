/**
 * Plans 23 à 44 — « C'est quoi un nom de domaine ? »
 *
 * Bloc 2 : le deuxième élément (l'hébergement : l'endroit où les fichiers sont
 * conservés, un ordinateur toujours disponible), le troisième (le site
 * lui-même : pages, images, textes, fonctionnalités), le « Mais attention » qui
 * sépare les trois, puis la maison qu'on imagine construire.
 */

import React from "react";

import { Art, lit, punch, Sparkle, ZoneMascot } from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import { withAlpha } from "../../../../../utils/color";
import { Card, CheckMark, Lines, MapPin, NotEqual, Pill, Shot, useSince } from "../../../../web-story/kit";
import { FileIcon, PicFrame, Warning } from "../../cache/videos/helpers";
import { EyeIcon, Hammer, Loupe, PersonIcon, Thought } from "../../../kit";
import {
  At,
  House,
  LoopArrow,
  Numbered,
  Overlay,
  ServerNode,
  SiteWindow,
  UiButton,
  Visitors,
  on,
  pop,
  type BeatProps,
  useClock,
} from "./helpers";

const ART_W = 936;
const ART_H = 640;

/* -------------------------------------------------------------------------- */
/*  23 · « l'hébergement. »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat23: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const key = "l'hébergement.";

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <div style={{ position: "absolute", left: 0, top: 40, width: ART_W, display: "flex", justifyContent: "center", transform: `scale(${pop(clock, key, 0.12)})` }}>
          <Pill size={64}>HÉBERGEMENT</Pill>
        </div>
        <At x={278} y={190} w={380} h={380} scale={pop(clock, key, 0.08)}>
          <ServerNode size={380} on={on(clock, key)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  24 · « C'est l'endroit où »                                                */
/* -------------------------------------------------------------------------- */
export const Beat24: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const place = clock.at("l'endroit");
  const bounce = Math.abs(Math.sin(useSince(0) * 4)) * 26;

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <div style={{ position: "absolute", left: 318, top: 520, width: 300, height: 40, borderRadius: radius.pill, backgroundColor: withAlpha(colors.inkInverse, 0.22) }} />
        <At x={258} y={90 - bounce} w={420} h={420} scale={punch(clock, place, 0.12, 0.4)}>
          <MapPin size={420} color={on(clock, "l'endroit") ? colors.accent : colors.inkInverse} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  25 · « les fichiers de ton site »                                          */
/* -------------------------------------------------------------------------- */
export const Beat25: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const start = clock.at("fichiers");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        {[0, 1, 2].map((index) => (
          <At key={index} x={58 + index * 300} y={150 + (index === 1 ? -30 : 20)} w={230} h={290} scale={punch(clock, start + index * 0.12, 0.12, 0.35)}>
            <FileIcon size={290} on={lit(clock, start + index * 0.12, 0.1) > 0.5} />
          </At>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  26 · « sont conservés. »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat26: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const kept = on(clock, "conservés.");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={168} y={90} w={600} h={420}>
          <Card w={600} h={420} active={kept}>
            <div style={{ display: "flex", gap: 40 }}>
              {[0, 1, 2].map((index) => (
                <FileIcon key={index} size={190} on={kept} />
              ))}
            </div>
          </Card>
        </At>
        <At x={578} y={380} w={230} h={230} scale={pop(clock, "conservés.", 0.2)}>
          <CheckMark size={230} progress={clock.p(clock.at("conservés."), 0.5)} color={kept ? colors.accent : withAlpha(colors.inkInverse, 0.3)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  27 · « Imagine un ordinateur »                                             */
/* -------------------------------------------------------------------------- */
export const Beat27: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={148} y={20} w={640} h={560} scale={pop(clock, "ordinateur", 0.06)}>
          <Thought w={640} h={470}>
            <ServerNode size={340} on={on(clock, "ordinateur")} />
          </Thought>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  28 · « qui garde ton site disponible »                                     */
/* -------------------------------------------------------------------------- */
export const Beat28: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const keep = on(clock, "garde");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={48} y={140} w={360} h={360} scale={pop(clock, "garde", 0.08)}>
          <ServerNode size={360} on={keep} />
        </At>
        <At x={478} y={170} w={400} h={288}>
          <SiteWindow w={400} active={keep} dim={keep ? 1 : 0.6} />
        </At>
        <Overlay w={ART_W} h={ART_H}>
          <path d="M410 320 H476" stroke={keep ? colors.accent : withAlpha(colors.inkInverse, 0.5)} strokeWidth={12} strokeLinecap="round" strokeDasharray="2 18" />
        </Overlay>
        <At x={738} y={20} w={150} h={150} scale={pop(clock, "disponible", 0.2)}>
          <CheckMark size={150} progress={clock.p(clock.at("disponible"), 0.4)} color={on(clock, "disponible") ? colors.accent : withAlpha(colors.inkInverse, 0.3)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  29 · « pour que les visiteurs puissent »                                   */
/* -------------------------------------------------------------------------- */
export const Beat29: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const start = clock.at("visiteurs");
  const count = [0, 1, 2].filter((index) => lit(clock, start + index * 0.14, 0.1) > 0.5).length;

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={318} y={0} w={300} h={300}>
          <ServerNode size={300} on={count > 0} />
        </At>
        <Overlay w={ART_W} h={ART_H}>
          {[0, 1, 2].map((index) => (
            <path key={index} d={`M${190 + index * 278} 400 L${468 + (index - 1) * 60} 320`} stroke={count > index ? colors.accent : withAlpha(colors.inkInverse, 0.35)} strokeWidth={10} strokeLinecap="round" strokeDasharray="2 16" />
          ))}
        </Overlay>
        <div style={{ position: "absolute", left: 148, top: 410 }}>
          <Visitors size={200} count={3} litCount={count} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  30 · « le consulter. »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat30: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const read = on(clock, "consulter.");
  const look = Math.sin(useSince(0) * 3);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={268} y={10} w={400} h={240} scale={pop(clock, "consulter.", 0.08)}>
          <EyeIcon size={400} look={look} hot={read} />
        </At>
        <At x={238} y={290} w={460} h={331}>
          <SiteWindow w={460} active={read} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  31 · « Et enfin, le troisième, »                                           */
/* -------------------------------------------------------------------------- */
export const Beat31: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={238} y={110} w={460} h={460} scale={pop(clock, "troisième,", 0.16)}>
          <Numbered size={460} n={3} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  32 · « c'est le site Internet »                                            */
/* -------------------------------------------------------------------------- */
export const Beat32: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <div style={{ position: "absolute", left: 0, top: 20, width: ART_W, display: "flex", justifyContent: "center", transform: `scale(${pop(clock, "site", 0.12)})` }}>
          <Pill size={64}>SITE INTERNET</Pill>
        </div>
        <At x={178} y={170} w={580} h={418}>
          <SiteWindow w={580} active={on(clock, "site")} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  33 · « lui-même. »                                                         */
/* -------------------------------------------------------------------------- */
export const Beat33: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("lui-même.");
  const spin = clock.p(word, 0.7) * 360;

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={208} y={60} w={520} h={520}>
          <LoopArrow size={520} angle={spin} active={on(clock, "lui-même.")} />
        </At>
        <At x={278} y={190} w={380} h={274} scale={pop(clock, "lui-même.", 0.06)}>
          <SiteWindow w={380} active={on(clock, "lui-même.")} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  34 · « C'est tout ce que les »                                             */
/* -------------------------------------------------------------------------- */
export const Beat34: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const all = on(clock, "tout");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <div
          style={{
            position: "absolute",
            left: 78,
            top: 60,
            width: 780,
            height: 520,
            borderRadius: radius.lg,
            border: `${strokeWidths.thick}px dashed ${all ? colors.accent : withAlpha(colors.inkInverse, 0.4)}`,
            transform: `scale(${pop(clock, "tout", 0.04)})`,
          }}
        />
        <At x={178} y={130} w={580} h={418}>
          <SiteWindow w={580} active={all} />
        </At>
        <Sparkle x={110} y={80} size={100} progress={clock.p(clock.at("tout"), 0.6)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  35 · « visiteurs vont découvrir : »                                        */
/* -------------------------------------------------------------------------- */
export const Beat35: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const find = clock.at("découvrir:");
  const sweep = clock.p(find - 0.3, 1, (t) => t);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={30} y={190} w={240} h={240}>
          <PersonIcon size={240} on={on(clock, "visiteurs")} />
        </At>
        <At x={330} y={160} w={560} h={403}>
          <SiteWindow w={560} dim={0.7} />
        </At>
        <At x={380 + sweep * 220} y={90 + Math.sin(sweep * Math.PI) * 40} w={260} h={260}>
          <Loupe size={260} color={on(clock, "découvrir:") ? colors.accent : colors.inkInverse} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  36 · « les pages, les »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat36: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const pages = on(clock, "pages,");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={118} y={90} w={420} h={300} rotate={-8} scale={0.96}>
          <SiteWindow w={420} dim={0.5} />
        </At>
        <At x={398} y={110} w={420} h={300} rotate={7} scale={0.96}>
          <SiteWindow w={420} dim={0.7} />
        </At>
        <At x={258} y={260} w={420} h={300} scale={pop(clock, "pages,", 0.08)}>
          <SiteWindow w={420} active={pages} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  37 · « images, les »                                                       */
/* -------------------------------------------------------------------------- */
export const Beat37: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={168} y={90} w={600} h={504} scale={pop(clock, "images,", 0.08)}>
          <PicFrame w={600} on={on(clock, "images,")} />
        </At>
        <Sparkle x={780} y={110} size={110} progress={clock.p(clock.at("images,"), 0.6)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  38 · « textes et les »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat38: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const fill = clock.p(clock.at("textes") - 0.1, 0.7, (t) => t);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={78} y={150} w={780} h={340} scale={pop(clock, "textes", 0.04)}>
          <Lines fill={fill} count={4} w={780} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  39 · « fonctionnalités. »                                                  */
/* -------------------------------------------------------------------------- */
export const Beat39: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("fonctionnalités.");
  const press = Math.sin(Math.PI * clock.p(word, 0.35, (t) => t));
  const flip = clock.p(word + 0.1, 0.35);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={258} y={80} w={420} h={143}>
          <UiButton w={420} hot press={press} />
        </At>
        <At x={338} y={330} w={260} h={130}>
          <div style={{ width: 260, height: 130, borderRadius: radius.pill, backgroundColor: flip > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.25), border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.5)}`, boxSizing: "border-box", position: "relative" }}>
            <div style={{ position: "absolute", top: 12, left: 12 + flip * 130, width: 90, height: 90, borderRadius: radius.pill, backgroundColor: colors.inkInverse }} />
          </div>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  40 · « Mais attention, » (mascotte surprise)                               */
/* -------------------------------------------------------------------------- */
export const Beat40: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("attention,");
  const wobble = Math.sin(clock.p(word, 0.5, (t) => t) * Math.PI * 6) * 6 * (1 - clock.p(word, 0.5, (t) => t));

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <At x={66} y={150} w={380} h={380} scale={punch(clock, word, 0.16, 0.45)} rotate={wobble}>
          <Warning size={380} />
        </At>
      </Art>
      <ZoneMascot scene={scene} pose="surprised" attitude="surprised" halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  41 · « ces trois éléments ne »                                             */
/* -------------------------------------------------------------------------- */
export const Beat41: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const keys = ["ces", "trois", "éléments"] as const;

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        {keys.map((key, index) => (
          <At key={key} x={44 + index * 300} y={210} w={230} h={230} scale={pop(clock, key, 0.14)}>
            <Numbered size={230} n={index + 1} active={on(clock, key)} />
          </At>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  42 · « désignent pas la même chose ! »                                     */
/* -------------------------------------------------------------------------- */
export const Beat42: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const first = clock.at("pas");
  const second = clock.at("chose!");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        {[1, 2, 3].map((n, index) => (
          <At key={n} x={30 + index * 340} y={230} w={190} h={190}>
            <Numbered size={190} n={n} />
          </At>
        ))}
        <At x={235} y={265} w={120} h={120} scale={punch(clock, first, 0.3, 0.45)} rotate={Math.sin(clock.p(first, 0.5, (t) => t) * Math.PI * 4) * 8}>
          <NotEqual size={120} color={on(clock, "pas") ? colors.accent : withAlpha(colors.inkInverse, 0.5)} />
        </At>
        <At x={575} y={265} w={120} h={120} scale={punch(clock, second, 0.3, 0.45)}>
          <NotEqual size={120} color={on(clock, "chose!") ? colors.accent : withAlpha(colors.inkInverse, 0.5)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  43 · « Imagine que tu »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat43: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={208} y={50} w={520} h={450} scale={pop(clock, "Imagine", 0.06)}>
          <Thought w={520} h={380}>
            <House w={340} draw={0} fill={0} on={on(clock, "Imagine")} />
          </Thought>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  44 · « construises une maison. »                                           */
/* -------------------------------------------------------------------------- */
export const Beat44: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const build = clock.p(clock.at("construises") - 0.05, 0.9, (t) => t);
  const paint = clock.p(clock.at("maison."), 0.4);
  const swing = Math.sin(useSince(0) * 9) * 22;

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={118} y={100} w={560} h={476}>
          <House w={560} draw={build} fill={paint} on={build > 0.95} />
        </At>
        <At x={700} y={150} w={200} h={200} rotate={swing - 20}>
          <Hammer size={200} />
        </At>
      </Art>
    </Shot>
  );
};
