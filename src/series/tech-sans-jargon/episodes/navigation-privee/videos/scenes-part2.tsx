/**
 * Plans 15 à 27 — « Vrai ou faux : la navigation privée »
 *
 * Bloc 2 : ce que la navigation privée fait vraiment (elle n'enregistre pas
 * l'historique sur ton téléphone) puis ce qu'elle ne cache pas : les sites,
 * le fournisseur Internet, le Wi-Fi de l'école ou du travail.
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
  shake,
  Shockwave,
  Sparkle,
} from "../../../../../components/motion";
import { colors } from "../../../../../config";
import { Arrow, Card, Gear, Shot } from "../../../../web-story/kit";
import {
  ActivityRows,
  CaseIcon,
  Disc,
  EyeIcon,
  NetNodes,
  PersonIcon,
  PersonOutline,
  SchoolCap,
  Sheet,
  Tower,
  WifiIcon,
} from "../../../kit";
import { type BeatProps, Overlay, SiteTile, useClock, Veto } from "./helpers";

/* -------------------------------------------------------------------------- */
/*  15 · « d'enregistrer les sites »                                           */
/* -------------------------------------------------------------------------- */
export const Beat15: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const rec = clock.at("d'enregistrer");
  const sites = clock.at("sites");
  const icons = ["web-globe", "web-newspaper", "web-play"];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(500, 40, 400, 540)}>
          <Sheet w={400} h={540} fill={clock.p(rec, 1.2)} lines={6} />
        </div>
        {icons.map((icon, index) => (
          <div
            key={icon}
            style={{
              ...abs(20, 40 + index * 190, 140, 140),
              transform: `translateX(${lerp(0, 330, clock.p(rec + index * 0.12, 0.55))}px) scale(${punch(clock, sites + index * 0.1, 0.1, 0.4)})`,
            }}
          >
            <SiteTile size={140} icon={icon} on={1} />
          </div>
        ))}
        <div style={{ ...abs(800, 0, 120, 120), transform: `scale(${punch(clock, rec, 0.25, 0.45)})` }}>
          <Disc size={120}>
            <div style={{ width: 46, height: 46, borderRadius: 999, backgroundColor: colors.inkInverse }} />
          </Disc>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  16 · « que tu visites dans ton »                                           */
/* -------------------------------------------------------------------------- */
export const Beat16: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const visit = clock.at("visites");
  const icons = ["web-globe", "web-newspaper", "web-play"];
  const ys = [30, 245, 460];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 190, 260, 260)}>
          <PersonIcon size={260} on />
        </div>
        {icons.map((icon, index) => (
          <div key={icon} style={{ ...abs(640, ys[index], 150, 150), transform: `scale(${punch(clock, visit + index * 0.15, 0.1, 0.4)})` }}>
            <SiteTile size={150} icon={icon} on={lit(clock, visit + index * 0.15, 0.2)} />
          </div>
        ))}
        <Overlay w={936} h={640}>
          {ys.map((y, index) => (
            <Arrow key={y} x1={280} y1={320} x2={620} y2={y + 75} progress={clock.p(visit + index * 0.15, 0.45)} />
          ))}
        </Overlay>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  17 · « historique habituel. »                                              */
/* -------------------------------------------------------------------------- */
export const Beat17: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const history = clock.at("historique");
  const usual = clock.at("habituel");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={480}>
        <div style={{ ...abs(88, 0, 760, 460), transform: `scale(${punch(clock, history, 0.05, 0.45)})` }}>
          <ActivityRows w={760} rows={4} lit={4 * clock.p(history, 1.1)} />
        </div>
        <Sparkle x={850} y={20} size={80} progress={clock.p(usual, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  18 · « Mais ça ne te rend pas »                                            */
/* -------------------------------------------------------------------------- */
export const Beat18: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const but = clock.at("Mais");
  const not = clock.at("pas");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(238, 100, 460, 460), transform: `translateX(${shake(clock, but, 14, 0.5)}px)` }}>
          <PersonOutline size={460} />
        </div>
        <div style={abs(238, 100, 460, 460)}>
          <Veto size={460} progress={clock.p(not, 0.5)} />
        </div>
        <Burst x={468} y={330} radius={330} progress={clock.p(but, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  19 · « invisible. »                                                        */
/* -------------------------------------------------------------------------- */
export const Beat19: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const invisible = clock.at("invisible");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(370, 40, 560, 560), borderRadius: 999, backgroundColor: colors.accent, opacity: 0.16 + 0.1 * lit(clock, invisible, 0.3) }} />
        <div style={abs(500, 150, 300, 300)}>
          <PersonIcon size={300} />
        </div>
        <div style={{ ...abs(30, 210, 340, 204), transform: `scale(${punch(clock, invisible, 0.14, 0.45)})` }}>
          <EyeIcon size={340} look={0.9} hot />
        </div>
        <Burst x={200} y={310} radius={250} progress={clock.p(invisible, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  20 · « Les sites que tu consultes »                                        */
/* -------------------------------------------------------------------------- */
export const Beat20: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const sites = clock.at("sites");
  const read = clock.at("consultes");
  const marks = [
    { icon: "web-globe", t: sites },
    { icon: "web-newspaper", t: sites + 0.25 },
    { icon: "web-play", t: read },
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={300}>
        {marks.map((mark, index) => (
          <div key={mark.icon} style={{ ...abs(index * 343, 20, 250, 250), transform: `scale(${punch(clock, mark.t, 0.12, 0.4)})` }}>
            <SiteTile size={250} icon={mark.icon} on={lit(clock, mark.t, 0.2)} />
          </div>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  21 · « peuvent toujours voir ta visite. »                                  */
/* -------------------------------------------------------------------------- */
export const Beat21: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const see = clock.at("voir");
  const visit = clock.at("visite");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={480}>
        <div style={abs(0, 150, 280, 280)}>
          <SiteTile size={280} icon="web-globe" on={1} />
        </div>
        <div style={{ ...abs(330, 220, 300, 180), transform: `scale(${punch(clock, see, 0.16, 0.45)})` }}>
          <EyeIcon size={300} look={0.7} hot />
        </div>
        <div style={{ ...abs(656, 150, 270, 270), transform: `scale(${punch(clock, visit, 0.1, 0.45)})` }}>
          <PersonIcon size={270} on={lit(clock, visit, 0.2) > 0.5} />
        </div>
        <Overlay w={936} h={480}>
          <Arrow x1={790} y1={70} x2={150} y2={70} progress={clock.p(visit, 0.6)} />
        </Overlay>
        <Burst x={480} y={310} radius={210} progress={clock.p(see, 0.6)} rays={8} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  22 · « Ton fournisseur Internet »                                          */
/* -------------------------------------------------------------------------- */
export const Beat22: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const provider = clock.at("fournisseur");
  const net = clock.at("Internet");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={520}>
        <div style={{ ...abs(20, 60, 380, 380), transform: `scale(${punch(clock, provider, 0.1, 0.45)})` }}>
          <Tower size={380} on={lit(clock, provider, 0.25)} />
        </div>
        <div style={{ ...abs(580, 120, 320, 320), transform: `scale(${punch(clock, net, 0.12, 0.45)})` }}>
          <Card w={320} h={320} active={lit(clock, net, 0.2) > 0.5}>
            <LibIcon id="web-globe" size={190} color={colors.inkInverse} />
          </Card>
        </div>
        <Overlay w={936} h={520}>
          <Arrow x1={410} y1={280} x2={560} y2={280} progress={clock.p(net, 0.45)} />
        </Overlay>
        <Shockwave x={210} y={150} size={300} progress={clock.p(provider, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  23 · « peut aussi voir une partie de ton activité. »                       */
/* -------------------------------------------------------------------------- */
export const Beat23: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const see = clock.at("voir");
  const part = clock.at("partie");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={680}>
        <div style={{ ...abs(318, 0, 300, 180), transform: `scale(${punch(clock, see, 0.16, 0.45)})` }}>
          <EyeIcon size={300} look={0} hot />
        </div>
        <div style={abs(88, 230, 760, 400)}>
          <ActivityRows w={760} rows={3} lit={2 * clock.p(part, 0.7)} />
        </div>
        <Sparkle x={850} y={210} size={70} progress={clock.p(part, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  24 · « Et si tu utilises le Wi-Fi »                                        */
/* -------------------------------------------------------------------------- */
export const Beat24: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const use = clock.at("utilises");
  const wifi = clock.at("Wi-Fi");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(30, 60, 300, 520)}>
          <PhoneMock width={300} height={520}>
            <div style={{ ...abs(70, 180, 160, 160), borderRadius: 40, backgroundColor: lit(clock, use, 0.2) > 0.5 ? colors.accent : colors.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LibIcon id="web-globe" size={90} color={colors.inkInverse} />
            </div>
          </PhoneMock>
        </div>
        <div style={{ ...abs(380, 40, 520, 520), transform: `scale(${punch(clock, wifi, 0.1, 0.45)})` }}>
          <WifiIcon size={520} on={1 + 2 * clock.p(use, 0.8)} />
        </div>
        <Shockwave x={640} y={430} size={420} progress={clock.p(wifi, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  25 · « de ton école ou de ton travail, »                                   */
/* -------------------------------------------------------------------------- */
export const Beat25: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const school = clock.at("école");
  const work = clock.at("travail");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={680}>
        <div style={abs(358, 0, 220, 220)}>
          <WifiIcon size={220} on={3} />
        </div>
        <div style={{ ...abs(40, 270, 380, 380), transform: `scale(${punch(clock, school, 0.1, 0.45)})` }}>
          <Card w={380} h={380} active={lit(clock, school, 0.2) > 0.5}>
            <SchoolCap size={240} color={lit(clock, school, 0.2) > 0.5 ? colors.accent : colors.inkInverse} />
          </Card>
        </div>
        <div style={{ ...abs(516, 270, 380, 380), transform: `scale(${punch(clock, work, 0.1, 0.45)})` }}>
          <Card w={380} h={380} active={lit(clock, work, 0.2) > 0.5}>
            <CaseIcon size={240} color={lit(clock, work, 0.2) > 0.5 ? colors.accent : colors.inkInverse} />
          </Card>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  26 · « certaines activités peuvent être visibles »                         */
/* -------------------------------------------------------------------------- */
export const Beat26: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const some = clock.at("certaines");
  const visible = clock.at("visibles");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={480}>
        <div style={abs(88, 0, 760, 460)}>
          <ActivityRows w={760} rows={4} lit={4 * clock.p(some, 1.0)} eyes={[1, 3]} eyeOn={lit(clock, visible, 0.25)} />
        </div>
        <Burst x={780} y={110} radius={130} progress={clock.p(visible, 0.6)} rays={7} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  27 · « par les personnes qui gèrent le réseau. »                           */
/* -------------------------------------------------------------------------- */
export const Beat27: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const manage = clock.at("gèrent");
  const network = clock.at("réseau");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={480}>
        <div style={abs(0, 90, 260, 260)}>
          <PersonIcon size={260} on={lit(clock, manage, 0.2) > 0.5} />
        </div>
        <div style={{ ...abs(250, 230, 160, 160), transform: `scale(${punch(clock, manage, 0.12, 0.45)})` }}>
          <Gear size={160} angle={clock.frame * 3} />
        </div>
        <div style={{ ...abs(440, 50, 496, 380), transform: `scale(${punch(clock, network, 0.06, 0.45)})` }}>
          <NetNodes w={496} h={380} on={lit(clock, network, 0.2)} />
        </div>
      </Art>
    </Shot>
  );
};
