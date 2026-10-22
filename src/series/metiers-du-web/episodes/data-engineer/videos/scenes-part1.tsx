/**
 * Scènes 1 à 13 — « Data Engineer »
 *
 * Bloc 1 : l'accroche (et si les apps perdaient toutes leurs données), ce qui
 * disparaîtrait (historique, vidéos regardées, recommandations), le métier,
 * puis ce que construit un data engineer : des systèmes.
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
  lit,
  PhoneMock,
  punch,
  shake,
  Shockwave,
  Sparkle,
  useWordClock,
  ZoneMascot,
} from "../../../../../components/motion";
import { colors, radius } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { Arrow, Bubble, Card, Forbidden, Gear, Lines, Shot } from "../../../../web-story/kit";
import {
  BarChart,
  Building,
  Calendar,
  Clock,
  Database,
  EyeShape,
  IconTile,
  JobCard,
  Person,
  RoleCard,
  Shield,
  Svg,
  Tv,
} from "../../../kit";
import { dataEngineerTranscript } from "../data/transcript.ts";

type BeatProps = { readonly scene: Scene };

const useClock = (scene: Scene) => useWordClock(scene, dataEngineerTranscript);

/* -------------------------------------------------------------------------- */
/*  01 · « Imagine que demain »                                                */
/* -------------------------------------------------------------------------- */
export const Beat01: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("demain", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(208, 90, 520, 520), transform: `scale(${punch(clock, t, 0.12, 0.45)})` }}>
          <Calendar size={520} hot={lit(clock, t, 0.2)} />
        </div>
        <Shockwave x={468} y={350} size={520} progress={clock.p(t, 0.7)} />
        <Sparkle x={150} y={120} size={90} progress={clock.p(t, 0.8)} color={colors.accent} />
        <Sparkle x={800} y={580} size={80} progress={clock.p(t + 0.1, 0.8)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  02 · « Facebook, TikTok et »                                               */
/* -------------------------------------------------------------------------- */
export const Beat02: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const fb = clock.at("Facebook", 0);
  const tk = clock.at("TikTok", 0);
  const tiles = [
    { icon: "web-users", t: fb },
    { icon: "web-play", t: tk },
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={460}>
        {tiles.map((tile, index) => (
          <div key={tile.icon} style={{ ...abs(index * 338, 100, 260, 260), transform: `scale(${punch(clock, tile.t, 0.14, 0.4)})` }}>
            <IconTile size={260} on={lit(clock, tile.t, 0.2)} hot icon={tile.icon} />
          </div>
        ))}
        <div style={abs(676, 100, 260, 260)}>
          <IconTile size={260} on={0}>
            <Tv size={150} on={0} />
          </IconTile>
        </div>
        <Burst x={130} y={230} radius={150} progress={clock.p(fb, 0.6)} rays={9} />
        <Burst x={468} y={230} radius={150} progress={clock.p(tk, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  03 · « Netflix perdent »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat03: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const nf = clock.at("Netflix", 0);
  const lose = clock.at("perdent", 0);
  const on = lit(clock, nf, 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={460}>
        <div style={{ ...abs(0, 0, 936, 460), transform: `translateX(${shake(clock, lose, 20, 0.6)}px)` }}>
          <div style={abs(0, 100, 260, 260)}>
            <IconTile size={260} on={1} hot icon="web-users" />
          </div>
          <div style={abs(338, 100, 260, 260)}>
            <IconTile size={260} on={1} hot icon="web-play" />
          </div>
          <div style={{ ...abs(676, 100, 260, 260), transform: `scale(${punch(clock, nf, 0.14, 0.4)})` }}>
            <IconTile size={260} on={on} hot>
              <Tv size={150} on={on} />
            </IconTile>
          </div>
        </div>
        <Burst x={806} y={230} radius={150} progress={clock.p(nf, 0.6)} rays={9} />
        <Shockwave x={468} y={230} size={760} progress={clock.p(lose, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  04 · « toutes les informations »                                           */
/* -------------------------------------------------------------------------- */
export const Beat04: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const info = clock.at("informations", 0);
  const corners = [
    { icon: "web-mail", t: clock.at("toutes", 0), x: 0, y: 0 },
    { icon: "web-credit-card", t: clock.at("les", 0), x: 766, y: 0 },
    { icon: "receipt", t: info, x: 0, y: 590 },
    { icon: "web-message-circle", t: info + 0.1, x: 766, y: 590 },
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(238, 150, 460, 460), transform: `scale(${punch(clock, info, 0.1, 0.45)})` }}>
          <Database size={460} glow={lit(clock, info, 0.2)} />
        </div>
        {corners.map((corner) => (
          <div key={corner.icon} style={{ ...abs(corner.x, corner.y, 170, 170), transform: `scale(${punch(clock, corner.t, 0.14, 0.4)})` }}>
            <IconTile size={170} on={lit(clock, corner.t, 0.2)} hot icon={corner.icon} />
          </div>
        ))}
        <Shockwave x={468} y={380} size={520} progress={clock.p(info, 0.7)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  05 · « sur leurs utilisateurs. »                                           */
/* -------------------------------------------------------------------------- */
export const Beat05: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const users = clock.at("utilisateurs", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={abs(328, 0, 280, 280)}>
          <Database size={280} glow={1} />
        </div>
        {[0, 1, 2].map((index) => (
          <div key={index} style={{ ...abs(index * 348, 400, 240, 240), transform: `scale(${punch(clock, users + index * 0.1, 0.14, 0.4)})` }}>
            <Person size={240} on={lit(clock, users + index * 0.1, 0.2) > 0.5} />
          </div>
        ))}
        <Burst x={468} y={520} radius={380} progress={clock.p(users, 0.7)} rays={12} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  06 · « plus d'historique, »                                                */
/* -------------------------------------------------------------------------- */
export const Beat06: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const history = clock.at("historique", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={abs(0, 180, 340, 340)}>
          <Clock size={340} angle={-clock.frame * 5} />
        </div>
        <div style={{ ...abs(416, 130, 520, 440), opacity: 1 - 0.5 * lit(clock, history, 0.3) }}>
          <Card w={520} h={440}>
            <Lines fill={1} count={4} w={380} />
          </Card>
        </div>
        <div style={abs(456, 130, 440, 440)}>
          <Forbidden size={440} progress={clock.p(history, 0.45)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  07 · « plus de vidéos regardées, »                                         */
/* -------------------------------------------------------------------------- */
export const Beat07: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const videos = clock.at("vidéos", 0);
  const watched = clock.at("regardées", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={abs(298, 40, 340, 680)}>
          <PhoneMock width={340} height={680}>
            <div
              style={{
                ...abs(30, 120, 280, 280),
                borderRadius: radius.lg,
                backgroundColor: colors.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${punch(clock, videos, 0.08, 0.4)})`,
              }}
            >
              <LibIcon id="web-play" size={150} color={colors.inkInverse} />
            </div>
          </PhoneMock>
        </div>
        <div style={abs(10, 60, 240, 144)}>
          <EyeShape size={240} look={Math.sin(clock.frame * 0.15)} />
        </div>
        <div style={abs(238, 180, 460, 460)}>
          <Forbidden size={460} progress={clock.p(watched, 0.45)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  08 · « plus de recommandations. »                                          */
/* -------------------------------------------------------------------------- */
export const Beat08: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const reco = clock.at("recommandations", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {[0, 1, 2].map((index) => (
          <div key={index} style={{ ...abs(0, index * 220, 936, 170), opacity: 1 - 0.55 * lit(clock, reco, 0.3) }}>
            <div style={abs(0, 0, 780, 170)}>
              <JobCard w={780} h={170} hot={index === 0} />
            </div>
            <div style={abs(816, 25, 120, 120)}>
              <Bubble size={120} active={index === 0}>
                <LibIcon id="web-heart" size={64} color={colors.inkInverse} />
              </Bubble>
            </div>
          </div>
        ))}
        <div style={abs(238, 90, 460, 460)}>
          <Forbidden size={460} progress={clock.p(reco, 0.45)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  09 · « Pour éviter ce genre de situation, »                                */
/* -------------------------------------------------------------------------- */
export const Beat09: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const avoid = clock.at("éviter", 0);
  const situation = clock.at("situation", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(208, 90, 520, 520), transform: `scale(${punch(clock, avoid, 0.1, 0.5)})` }}>
          <Shield size={520} check={clock.p(avoid, 0.5)} />
        </div>
        <Shockwave x={468} y={350} size={620} progress={clock.p(avoid + 0.2, 0.7)} />
        <Sparkle x={130} y={140} size={90} progress={clock.p(situation, 0.8)} color={colors.accent} />
        <Sparkle x={810} y={560} size={80} progress={clock.p(situation + 0.1, 0.8)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  10 · « certaines entreprises ont besoin »                                  */
/* -------------------------------------------------------------------------- */
export const Beat10: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const company = clock.at("entreprises", 0);
  const need = clock.at("besoin", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(20, 60, 520, 520), transform: `scale(${punch(clock, company, 0.08, 0.45)})` }}>
          <Building size={520} lit={clock.p(company, 0.9, (input) => input)} />
        </div>
        <div style={{ ...abs(620, 220, 280, 280), transform: `scale(${punch(clock, need, 0.14, 0.45)})` }}>
          <IconTile size={280} on={lit(clock, need, 0.2)} hot icon="web-puzzle" />
        </div>
        <Burst x={760} y={360} radius={210} progress={clock.p(need, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  11 · « d'un data engineer. »                                               */
/* -------------------------------------------------------------------------- */
export const Beat11: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const engineer = clock.at("engineer", 0);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(38, 30, 860, 640), transform: `scale(${punch(clock, engineer, 0.08, 0.5)})` }}>
          <RoleCard
            w={860}
            h={640}
            label="DATA ENGINEER"
            badge={
              <Bubble size={270}>
                <Database size={180} glow={1} />
              </Bubble>
            }
          />
        </div>
        <Shockwave x={468} y={350} size={640} progress={clock.p(engineer, 0.7)} />
        <Sparkle x={60} y={60} size={80} progress={clock.p(engineer, 0.7)} />
        <Sparkle x={880} y={640} size={70} progress={clock.p(engineer + 0.1, 0.7)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  12 · « Son travail, c'est de »                                             */
/* -------------------------------------------------------------------------- */
export const Beat12: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const work = clock.at("travail", 0);

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={560}>
        <div style={{ ...abs(0, 30, 330, 330), transform: `scale(${punch(clock, work, 0.1, 0.45)})` }}>
          <Gear size={330} angle={clock.frame * 2} />
        </div>
        <div style={abs(250, 310, 220, 220)}>
          <Gear size={220} angle={-clock.frame * 3 + 20} color={colors.inkInverse} />
        </div>
        <Sparkle x={420} y={70} size={80} progress={clock.p(work, 0.7)} color={colors.accent} />
      </Art>
      <ZoneMascot scene={scene} pose="explaining" attitude="confident" from={work} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  13 · « construire les systèmes »                                           */
/* -------------------------------------------------------------------------- */
export const Beat13: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const build = clock.at("construire", 0);
  const systems = clock.at("systèmes", 0);
  const starts = [build, build + 0.15, build + 0.3];
  const pop = punch(clock, systems, 0.1, 0.45);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={520}>
        <div style={{ ...abs(0, 150, 220, 220), transform: `scale(${pop})` }}>
          <IconTile size={220} on={lit(clock, starts[0], 0.2)} hot>
            <Database size={140} glow={1} />
          </IconTile>
        </div>
        <div style={{ ...abs(358, 150, 220, 220), transform: `scale(${pop})` }}>
          <IconTile size={220} on={lit(clock, starts[1], 0.2)} hot>
            <Gear size={130} angle={clock.frame * 3} color={colors.inkInverse} />
          </IconTile>
        </div>
        <div style={{ ...abs(716, 150, 220, 220), transform: `scale(${pop})` }}>
          <IconTile size={220} on={lit(clock, starts[2], 0.2)} hot>
            <BarChart w={130} h={120} grow={1} />
          </IconTile>
        </div>
        <Svg w={936} h={520}>
          <Arrow x1={235} y1={260} x2={343} y2={260} progress={clock.p(build + 0.1, 0.3)} />
          <Arrow x1={593} y1={260} x2={701} y2={260} progress={clock.p(build + 0.25, 0.3)} />
        </Svg>
        <Burst x={468} y={260} radius={420} progress={clock.p(systems, 0.7)} rays={12} />
      </Art>
    </Shot>
  );
};
