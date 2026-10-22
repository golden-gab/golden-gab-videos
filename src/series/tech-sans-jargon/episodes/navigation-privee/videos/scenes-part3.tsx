/**
 * Plans 28 à 41 — « Vrai ou faux : la navigation privée »
 *
 * Bloc 3 : l'image de la feuille (écrite, déchirée, effacée… mais quelqu'un a
 * vu écrire), puis la vraie utilité du mode privé (l'historique du prochain qui
 * prend ton téléphone) et la question finale pour relancer les commentaires.
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
  PhoneMock,
  punch,
  Shockwave,
  Sparkle,
  ZoneMascot,
} from "../../../../../components/motion";
import { colors, radius } from "../../../../../config";
import { Arrow, NotEqual, Shot } from "../../../../web-story/kit";
import {
  ActivityRows,
  Disc,
  EyeIcon,
  Incognito,
  Loupe,
  Pencil,
  PersonIcon,
  PersonOutline,
  Sheet,
  ShieldCheck,
  Thought,
  TornSheet,
} from "../../../kit";
import { type BeatProps, Overlay, useClock, Win } from "./helpers";

/* -------------------------------------------------------------------------- */
/*  28 · « Imagine que tu écrives quelque chose »                              */
/* -------------------------------------------------------------------------- */
export const Beat28: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const imagine = clock.at("Imagine");
  const write = clock.at("écrives");
  const progress = clock.p(write, 1.1);

  return (
    <Shot scene={scene} layout="side-left">
      <Art w={512} h={640}>
        <div style={abs(40, 30, 400, 540)}>
          <Sheet w={400} h={540} fill={progress} lines={6} />
        </div>
        <div style={{ ...abs(250, 420, 230, 230), transform: `translate(${lerp(-40, 0, progress)}px, ${lerp(-250, 0, progress)}px) rotate(${Math.sin(clock.frame * 0.5) * 4}deg)` }}>
          <Pencil size={230} />
        </div>
        <Sparkle x={460} y={50} size={70} progress={clock.p(write, 0.8)} color={colors.accent} />
      </Art>
      <ZoneMascot scene={scene} pose="explaining" attitude="confident" mirrored from={imagine} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  29 · « sur une feuille, puis que tu la déchires. »                         */
/* -------------------------------------------------------------------------- */
export const Beat29: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const sheet = clock.at("feuille");
  const tear = clock.at("déchires");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div style={{ ...abs(208, 30, 520, 640), transform: `scale(${punch(clock, sheet, 0.05, 0.45)})` }}>
          <TornSheet w={520} h={640} tear={clock.p(tear, 0.5)} />
        </div>
        <Burst x={468} y={350} radius={380} progress={clock.p(tear, 0.6)} rays={10} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  30 · « Tu as effacé la feuille, »                                          */
/* -------------------------------------------------------------------------- */
export const Beat30: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const erased = clock.at("effacé");
  const sweep = clock.p(erased, 1.0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={abs(208, 30, 520, 640)}>
          <Sheet w={520} h={640} fill={1 - sweep} lines={6} />
        </div>
        <div
          style={{
            ...abs(0, 0, 220, 120),
            left: lerp(130, 600, sweep),
            top: 250,
            borderRadius: radius.md,
            backgroundColor: colors.accent,
            border: `14px solid ${colors.inkInverse}`,
            boxShadow: `0 18px 40px ${colors.ink}`,
          }}
        />
        <Sparkle x={820} y={90} size={80} progress={clock.p(erased, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  31 · « mais ça ne veut pas dire que »                                      */
/* -------------------------------------------------------------------------- */
export const Beat31: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const not = clock.at("pas");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={460}>
        <div style={abs(0, 30, 280, 380)}>
          <Sheet w={280} h={380} fill={0} lines={4} />
        </div>
        <div style={{ ...abs(340, 120, 200, 200), transform: `scale(${punch(clock, not, 0.2, 0.5)})` }}>
          <NotEqual size={200} />
        </div>
        <div style={abs(610, 130, 320, 192)}>
          <EyeIcon size={320} look={-0.6} hot />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  32 · « personne ne t'a vu écrire. »                                        */
/* -------------------------------------------------------------------------- */
export const Beat32: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const seen = clock.at("vu");
  const write = clock.at("écrire");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={560}>
        <div style={abs(0, 140, 290, 290)}>
          <PersonIcon size={290} />
        </div>
        <div style={{ ...abs(230, 270, 170, 170), transform: `rotate(${Math.sin(clock.frame * 0.6) * 6}deg)` }}>
          <Pencil size={170} />
        </div>
        <div style={{ ...abs(510, 160, 400, 240), transform: `scale(${punch(clock, seen, 0.16, 0.45)})` }}>
          <EyeIcon size={400} look={-0.8} hot={lit(clock, seen, 0.2) > 0.5} />
        </div>
        <Burst x={710} y={280} radius={260} progress={clock.p(seen, 0.6)} rays={9} />
        <Sparkle x={880} y={90} size={70} progress={clock.p(write, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  33 · « En réalité, »                                                       */
/* -------------------------------------------------------------------------- */
export const Beat33: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const real = clock.at("réalité");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={560}>
        <div style={{ ...abs(278, 40, 380, 380), transform: `scale(${punch(clock, real, 0.2, 0.5)})` }}>
          <Disc size={380} sign="!" />
        </div>
        <Shockwave x={468} y={230} size={380} progress={clock.p(real, 0.7)} />
        <Sparkle x={140} y={110} size={90} progress={clock.p(real, 0.8)} color={colors.accent} />
        <Sparkle x={800} y={90} size={80} progress={clock.p(real + 0.1, 0.8)} />
        <Sparkle x={780} y={470} size={70} progress={clock.p(real + 0.2, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  34 · « la navigation privée »                                              */
/* -------------------------------------------------------------------------- */
export const Beat34: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const priv = clock.at("privée");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(68, 50, 800, 540), transform: `scale(${punch(clock, priv, 0.07, 0.45)})` }}>
          <Win w={800} h={540} priv lit={lit(clock, priv, 0.2)} />
        </div>
        <Sparkle x={70} y={60} size={90} progress={clock.p(priv, 0.8)} color={colors.accent} />
        <Sparkle x={870} y={560} size={80} progress={clock.p(priv + 0.1, 0.8)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  35 · « sert surtout à éviter »                                             */
/* -------------------------------------------------------------------------- */
export const Beat35: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const avoid = clock.at("éviter");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={620}>
        <div style={{ ...abs(238, 20, 460, 460), transform: `scale(${punch(clock, avoid, 0.1, 0.5)})` }}>
          <ShieldCheck size={460} check={clock.p(avoid, 0.5)} />
        </div>
        <Shockwave x={468} y={250} size={460} progress={clock.p(avoid + 0.2, 0.7)} />
        <Sparkle x={150} y={100} size={80} progress={clock.p(avoid, 0.8)} color={colors.accent} />
        <Sparkle x={800} y={420} size={70} progress={clock.p(avoid + 0.1, 0.8)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  36 · « que la prochaine personne qui utilise »                             */
/* -------------------------------------------------------------------------- */
export const Beat36: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const next = clock.at("prochaine");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={520}>
        <div style={abs(0, 130, 270, 270)}>
          <PersonIcon size={270} opacity={0.6} />
        </div>
        <div style={{ ...abs(666, 130, 270, 270), transform: `scale(${punch(clock, next + 0.3, 0.12, 0.45)})` }}>
          <PersonIcon size={270} on={lit(clock, next + 0.3, 0.2) > 0.5} />
        </div>
        <Overlay w={936} h={520}>
          <Arrow x1={300} y1={270} x2={640} y2={270} progress={clock.p(next, 0.6)} />
        </Overlay>
        <Burst x={800} y={260} radius={230} progress={clock.p(next + 0.3, 0.6)} rays={8} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  37 · « ton téléphone retrouve facilement »                                 */
/* -------------------------------------------------------------------------- */
export const Beat37: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const find = clock.at("retrouve");
  const sweep = clock.p(find, 1.1);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={680}>
        <div style={abs(0, 20, 300, 620)}>
          <PhoneMock width={300} height={620}>
            <div style={{ ...abs(40, 160, 220, 24), borderRadius: radius.pill, backgroundColor: colors.inkInverse, opacity: 0.25 }} />
            <div style={{ ...abs(40, 220, 160, 24), borderRadius: radius.pill, backgroundColor: colors.inkInverse, opacity: 0.25 }} />
          </PhoneMock>
        </div>
        <div style={abs(380, 110, 520, 400)}>
          <ActivityRows w={520} rows={3} lit={3 * sweep} />
        </div>
        <div style={abs(0, 0, 220, 220)}>
          <div style={{ position: "absolute", left: lerp(660, 560, sweep), top: lerp(30, 360, sweep) }}>
            <Loupe size={220} />
          </div>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  38 · « ton historique. »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat38: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const history = clock.at("historique");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={560}>
        <div style={abs(40, 130, 700, 400)}>
          <ActivityRows w={700} rows={3} empty />
        </div>
        <div style={{ ...abs(600, 0, 300, 300), transform: `scale(${punch(clock, history, 0.12, 0.5)})` }}>
          <ShieldCheck size={300} check={clock.p(history, 0.5)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  39 · « Alors, dis-moi : »                                                  */
/* -------------------------------------------------------------------------- */
export const Beat39: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const so = clock.at("Alors");

  return (
    <Shot scene={scene} layout="mascot">
      <ZoneMascot scene={scene} pose="point" attitude="friendly" from={so} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  40 · « tu pensais vraiment que le mode privé »                             */
/* -------------------------------------------------------------------------- */
export const Beat40: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const really = clock.at("vraiment");
  const priv = clock.at("privé");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={680}>
        <div style={abs(30, 330, 300, 300)}>
          <PersonIcon size={300} />
        </div>
        <div style={{ ...abs(150, 30, 160, 160), transform: `scale(${punch(clock, really, 0.2, 0.5)})` }}>
          <Disc size={160} sign="?" />
        </div>
        <div style={{ ...abs(380, 0, 520, 300), transform: `scale(${punch(clock, priv, 0.08, 0.45)})` }}>
          <Thought w={520} h={290}>
            <Incognito size={210} lit={lit(clock, priv, 0.2)} />
          </Thought>
        </div>
        <Burst x={640} y={150} radius={300} progress={clock.p(priv, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  41 · « te rendait invisible sur Internet ? »                               */
/* -------------------------------------------------------------------------- */
export const Beat41: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const invisible = clock.at("invisible");
  const net = clock.at("Internet");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(10, 200, 320, 320)}>
          <PersonOutline size={320} />
        </div>
        <div style={{ ...abs(60, 40, 300, 180), transform: `scale(${punch(clock, invisible, 0.14, 0.45)})` }}>
          <EyeIcon size={300} look={0.3} hot />
        </div>
        <div style={{ ...abs(520, 140, 380, 380), transform: `scale(${punch(clock, net, 0.16, 0.55)})` }}>
          <Disc size={380}>
            <LibIcon id="web-message-circle" size={220} color={colors.inkInverse} />
          </Disc>
        </div>
        <Shockwave x={710} y={330} size={380} progress={clock.p(net, 0.7)} />
        <Sparkle x={880} y={90} size={80} progress={clock.p(net, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};
