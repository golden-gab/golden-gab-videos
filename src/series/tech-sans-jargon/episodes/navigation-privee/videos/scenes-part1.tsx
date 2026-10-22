/**
 * Plans 1 à 14 — « Vrai ou faux : la navigation privée »
 *
 * Bloc 1 : la question (vrai ou faux ?), la croyance (« personne ne peut
 * savoir »), la réponse « Faux ! », puis la scène du quotidien : tu ouvres une
 * fenêtre privée et tu te dis « parfait » — sauf que ça ne marche pas comme ça.
 *
 * Règles de la série : un message par plan, 3 mots maximum à l'écran, tout est
 * visible dès le début du plan (un mot prononcé déclenche une *réaction*, pas
 * l'apparition) et chaque plan déclare son gabarit de zones.
 */

import React from "react";

import {
  abs,
  Art,
  Burst,
  LibIcon,
  lerp,
  lit,
  Magnifier,
  punch,
  shake,
  Shockwave,
  Sparkle,
  ZoneMascot,
} from "../../../../../components/motion";
import { colors } from "../../../../../config";
import { Card, CheckMark, CrossMark, Gear, Pill, Shot, Skeleton } from "../../../../web-story/kit";
import { Disc, EyeIcon, Incognito, PersonIcon, SearchBar, Thought } from "../../../kit";
import { PersonOutline } from "../../../kit";
import { PhoneMock } from "../../../../../components/motion";
import { type BeatProps, useClock, Veto, Win } from "./helpers";

/* -------------------------------------------------------------------------- */
/*  01 · « Vrai ou faux »                                                      */
/* -------------------------------------------------------------------------- */
export const Beat01: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const vrai = clock.at("Vrai");
  const faux = clock.at("faux");
  const a = lit(clock, vrai, 0.2);
  const b = lit(clock, faux, 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={560}>
        <div style={abs(378, 0, 180, 180)}>
          <Disc size={180} sign="?" />
        </div>
        <div style={{ ...abs(0, 240, 430, 300), transform: `scale(${punch(clock, vrai, 0.12, 0.4)})` }}>
          <Card w={430} h={300} active={a > 0.5}>
            <Pill size={88} tone={a > 0.5 ? "accent" : "dark"}>
              VRAI
            </Pill>
          </Card>
        </div>
        <div style={{ ...abs(506, 240, 430, 300), transform: `scale(${punch(clock, faux, 0.12, 0.4)})` }}>
          <Card w={430} h={300} active={b > 0.5}>
            <Pill size={88} tone={b > 0.5 ? "accent" : "dark"}>
              FAUX
            </Pill>
          </Card>
        </div>
        <Sparkle x={120} y={120} size={80} progress={clock.p(vrai, 0.8)} color={colors.accent} />
        <Sparkle x={820} y={120} size={80} progress={clock.p(faux, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  02 · « quand tu navigues en mode privé sur »                               */
/* -------------------------------------------------------------------------- */
export const Beat02: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const priv = clock.at("privé");
  const on = lit(clock, priv, 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div style={{ ...abs(0, 0, 600, 400), opacity: 0.75 }}>
          <Win w={600} h={400} />
        </div>
        <div style={{ ...abs(300, 240, 636, 440), transform: `scale(${punch(clock, priv, 0.08, 0.45)})` }}>
          <Win w={636} h={440} priv lit={on} />
        </div>
        <Burst x={620} y={460} radius={330} progress={clock.p(priv, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  03 · « Internet, personne ne peut savoir »                                 */
/* -------------------------------------------------------------------------- */
export const Beat03: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const net = clock.at("Internet");
  const know = clock.at("savoir");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(0, 140, 380, 380), transform: `scale(${punch(clock, net, 0.12, 0.45)})` }}>
          <Card w={380} h={380} active={lit(clock, net, 0.2) > 0.5}>
            <LibIcon id="web-globe" size={220} color={colors.inkInverse} />
          </Card>
        </div>
        <div style={abs(500, 150, 400, 240)}>
          <EyeIcon size={400} hot={false} />
        </div>
        <div style={abs(470, 90, 460, 460)}>
          <Veto size={460} progress={clock.p(know, 0.5)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  04 · « ce que tu fais ? »                                                  */
/* -------------------------------------------------------------------------- */
export const Beat04: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const does = clock.at("fais");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 170, 270, 270)}>
          <PersonIcon size={270} />
        </div>
        <div style={abs(320, 60, 616, 340)}>
          <Card w={616} h={340} style={{ padding: 40, alignItems: "flex-start" }}>
            <Skeleton w={500} h={28} />
            <Skeleton w={380} h={28} />
            <Skeleton w={450} h={28} />
          </Card>
        </div>
        <div style={{ ...abs(690, 380, 230, 230), transform: `scale(${punch(clock, does, 0.18, 0.5)})` }}>
          <Disc size={230} sign="?" />
        </div>
        <Burst x={805} y={495} radius={190} progress={clock.p(does, 0.6)} rays={8} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  05 · « Faux ! »                                                            */
/* -------------------------------------------------------------------------- */
export const Beat05: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("Faux");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div style={{ ...abs(258, 0, 420, 420), transform: `scale(${punch(clock, t, 0.2, 0.5)})` }}>
          <Disc size={420}>
            <CrossMark size={260} color={colors.inkInverse} />
          </Disc>
        </div>
        <div style={{ ...abs(0, 500, 936, 190), display: "flex", justifyContent: "center", transform: `scale(${punch(clock, t, 0.14, 0.5)})` }}>
          <Pill size={150}>FAUX</Pill>
        </div>
        <Shockwave x={468} y={210} size={420} progress={clock.p(t, 0.7)} />
        <Sparkle x={90} y={110} size={90} progress={clock.p(t, 0.8)} color={colors.accent} />
        <Sparkle x={850} y={90} size={80} progress={clock.p(t + 0.1, 0.8)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  06 · « Imagine, tu es sur ton téléphone, »                                 */
/* -------------------------------------------------------------------------- */
export const Beat06: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const imagine = clock.at("Imagine");
  const phone = clock.at("téléphone");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <div style={{ ...abs(96, 20, 320, 640), transform: `scale(${punch(clock, phone, 0.08, 0.45)})` }}>
          <PhoneMock width={320} height={640}>
            <div style={{ ...abs(80, 200, 160, 160), borderRadius: 40, backgroundColor: lit(clock, phone, 0.2) > 0.5 ? colors.accent : colors.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LibIcon id="web-globe" size={90} color={colors.inkInverse} />
            </div>
          </PhoneMock>
        </div>
        <Sparkle x={440} y={90} size={80} progress={clock.p(phone, 0.8)} color={colors.accent} />
      </Art>
      <ZoneMascot scene={scene} pose="thinking" attitude="curious" from={imagine} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  07 · « tu ouvres une fenêtre de navigation »                               */
/* -------------------------------------------------------------------------- */
export const Beat07: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const open = clock.at("ouvres");
  const win = clock.at("fenêtre");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div style={{ ...abs(118, 200, 700, 460), transform: `scale(${punch(clock, win, 0.08, 0.45)})` }}>
          <Win w={700} h={460} />
        </div>
        <div style={{ ...abs(690, 20, 190, 190), transform: `scale(${punch(clock, open, 0.2, 0.4)})` }}>
          <Disc size={190} sign="+" />
        </div>
        <div style={{ ...abs(520, 150, 150, 150), transform: `translate(${lerp(0, 40, clock.p(open, 0.3))}px, ${lerp(0, -40, clock.p(open, 0.3))}px) scale(${punch(clock, open, 0.25, 0.35)})` }}>
          <LibIcon id="web-pointer-click" size={150} color={colors.inkInverse} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  08 · « privée et tu te dis : »                                             */
/* -------------------------------------------------------------------------- */
export const Beat08: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const priv = clock.at("privée");
  const say = clock.at("dis");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div style={abs(0, 0, 360, 270)}>
          <Thought w={360} h={200}>
            <CheckMark size={130} progress={clock.p(say, 0.4)} />
          </Thought>
        </div>
        <div style={abs(20, 320, 240, 240)}>
          <PersonIcon size={240} />
        </div>
        <div style={{ ...abs(300, 220, 636, 440), transform: `scale(${punch(clock, priv, 0.08, 0.45)})` }}>
          <Win w={636} h={440} priv lit={lit(clock, priv, 0.2)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  09 · « Parfait, personne ne saura »                                        */
/* -------------------------------------------------------------------------- */
export const Beat09: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const perfect = clock.at("Parfait");
  const nobody = clock.at("personne");
  const know = clock.at("saura");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={620}>
        <div style={{ ...abs(40, 110, 380, 380), transform: `scale(${punch(clock, perfect, 0.16, 0.5)})` }}>
          <Disc size={380}>
            <CheckMark size={240} progress={clock.p(perfect, 0.4)} color={colors.inkInverse} />
          </Disc>
        </div>
        <div style={abs(530, 140, 300, 300)}>
          <PersonOutline size={300} opacity={0.5 + 0.5 * lit(clock, nobody, 0.2)} />
        </div>
        <div style={abs(510, 120, 340, 340)}>
          <Veto size={340} progress={clock.p(know, 0.5)} />
        </div>
        <Sparkle x={60} y={90} size={80} progress={clock.p(perfect, 0.8)} color={colors.accent} />
        <Sparkle x={440} y={500} size={70} progress={clock.p(perfect + 0.1, 0.8)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  10 · « ce que je suis allé chercher. »                                     */
/* -------------------------------------------------------------------------- */
export const Beat10: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const went = clock.at("allé");
  const search = clock.at("chercher");
  const typed = 0.25 + 0.75 * clock.p(went - 0.4, 1.0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={560}>
        <div style={{ ...abs(38, 40, 860, 132), transform: `scale(${punch(clock, search, 0.05, 0.4)})` }}>
          <SearchBar w={860} typed={typed} />
        </div>
        <div style={abs(120, 240, 700, 220)}>
          <Card w={700} h={220} style={{ padding: 36, alignItems: "flex-start", gap: 20 }}>
            <Skeleton w={540} h={24} tone="accent" />
            <Skeleton w={420} h={24} />
            <Skeleton w={480} h={24} />
          </Card>
        </div>
        <Magnifier x={760} y={420} size={110} opacity={0.4 + 0.6 * lit(clock, search, 0.2)} />
        <Sparkle x={830} y={30} size={80} progress={clock.p(search, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  11 · « Sauf que ce n'est pas vraiment »                                    */
/* -------------------------------------------------------------------------- */
export const Beat11: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const but = clock.at("Sauf");
  const not = clock.at("pas");

  return (
    <Shot scene={scene} layout="side-left">
      <Art w={512} h={560}>
        <div style={{ ...abs(86, 90, 340, 340), transform: `translateX(${shake(clock, but, 16, 0.6)}px)` }}>
          <Incognito size={340} lit={lit(clock, but, 0.2)} />
        </div>
        <div style={abs(46, 50, 420, 420)}>
          <Veto size={420} progress={clock.p(not, 0.5)} />
        </div>
        <Burst x={256} y={260} radius={250} progress={clock.p(but, 0.6)} rays={9} />
      </Art>
      <ZoneMascot scene={scene} pose="surprised" attitude="surprised" mirrored from={but} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  12 · « comme ça que ça fonctionne. »                                       */
/* -------------------------------------------------------------------------- */
export const Beat12: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const works = clock.at("fonctionne");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(0, 100, 380, 380), transform: `scale(${punch(clock, works, 0.1, 0.45)})` }}>
          <Gear size={380} angle={clock.frame * 2} />
        </div>
        <div style={abs(300, 400, 240, 240)}>
          <Gear size={240} angle={-clock.frame * 3 + 20} color={colors.inkInverse} />
        </div>
        <div style={abs(500, 60, 436, 300)}>
          <Win w={436} h={300} />
        </div>
        <Sparkle x={440} y={90} size={80} progress={clock.p(works, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  13 · « La navigation privée empêche »                                      */
/* -------------------------------------------------------------------------- */
export const Beat13: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const priv = clock.at("privée");
  const stop = clock.at("empêche");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={680}>
        <div style={{ ...abs(68, 70, 800, 540), transform: `translateX(${shake(clock, stop, 18, 0.5)}px) scale(${punch(clock, priv, 0.06, 0.45)})` }}>
          <Win w={800} h={540} priv lit={lit(clock, priv, 0.2)} />
        </div>
        <Shockwave x={468} y={340} size={500} progress={clock.p(stop, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  14 · « surtout ton navigateur »                                            */
/* -------------------------------------------------------------------------- */
export const Beat14: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const browser = clock.at("navigateur");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(118, 80, 700, 470), transform: `scale(${punch(clock, browser, 0.08, 0.45)})` }}>
          <Win w={700} h={470} lit={lit(clock, browser, 0.2)} />
        </div>
        <Sparkle x={60} y={90} size={90} progress={clock.p(browser, 0.8)} color={colors.accent} />
        <Sparkle x={880} y={560} size={80} progress={clock.p(browser + 0.1, 0.8)} />
      </Art>
    </Shot>
  );
};
