/**
 * Plans 45 à 65 — « Comment pirater un compte WhatsApp en une minute ? »
 *
 * Bloc 3 : l'ingénierie sociale ne concerne pas que WhatsApp (comptes
 * bancaires, réseaux sociaux, e-mails, téléphone) ; le pirate cherche parfois
 * seulement à convaincre ; les bons réflexes (prendre quelques secondes pour
 * vérifier un lien, un code, une information) ; la personne qui te piège n'est
 * pas toujours celle que tu imagines ; la question finale.
 */

import React from "react";

import { BrandText } from "../../../../../components/common/BrandText";
import {
  abs,
  Art,
  BrowserFrame,
  Burst,
  LibIcon,
  lerp,
  lit,
  punch,
  shake,
  Shockwave,
  Sparkle,
  ZoneMascot,
} from "../../../../../components/motion";
import { colors } from "../../../../../config";
import { withAlpha } from "../../../../../utils/color";
import { Arrow, Card, CheckMark, Gear, NotEqual, Shot, Skeleton } from "../../../../web-story/kit";
import {
  Avatar,
  BankCard,
  Chat,
  CodeCard,
  Disc,
  Handset,
  LinkChain,
  Loupe,
  PersonIcon,
  ShieldCheck,
  Stopwatch,
  Thought,
  TypingDots,
} from "../../../kit";
import { AppSquare, type BeatProps, Overlay, Pirate, useClock, Veto } from "./helpers";

const linear = (input: number): number => input;

/** Panneau « stop » : un octogone corail avec un seul mot. */
const StopSign: React.FC<{ readonly size: number }> = ({ size }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M31 4 H69 L96 31 V69 L69 96 H31 L4 69 V31 Z" fill={colors.accent} stroke={colors.inkInverse} strokeWidth={5} strokeLinejoin="round" />
    </svg>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <BrandText role="display" color={colors.inkInverse} style={{ fontSize: size * 0.25, lineHeight: 1 }}>
        STOP
      </BrandText>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  45 · « Et ça ne concerne pas »                                             */
/* -------------------------------------------------------------------------- */
export const Beat45: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const concerns = clock.at("concerne");
  const not = clock.at("pas");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(288, 120, 360, 360), transform: `scale(${punch(clock, concerns, 0.08, 0.4)})` }}>
          <AppSquare size={360} icon="web-message-circle" on />
        </div>
        <Shockwave x={468} y={300} size={420} progress={clock.p(concerns, 0.8)} />
        <Shockwave x={468} y={300} size={420} progress={clock.p(not, 0.8)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  46 · « seulement WhatsApp. »                                               */
/* -------------------------------------------------------------------------- */
export const Beat46: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const only = clock.at("seulement");
  const chat = clock.at("WhatsApp");
  const others = lit(clock, only, 0.3);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(40, 140, 320, 320), transform: `scale(${punch(clock, chat, 0.1, 0.4)})` }}>
          <AppSquare size={320} icon="web-message-circle" on />
        </div>
        {[
          ["web-credit-card", 400],
          ["web-users", 560],
          ["web-mail", 720],
        ].map(([icon, x]) => (
          <div key={String(icon)} style={{ ...abs(Number(x), 180 + (icon === "web-users" ? -50 : 20), 180, 180), transform: `scale(${0.9 + 0.1 * others})` }}>
            <AppSquare size={180} icon={String(icon)} ghost={others < 0.5} on={others > 0.5} />
          </div>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  47 · « Ça peut arriver avec »                                              */
/* -------------------------------------------------------------------------- */
export const Beat47: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const happen = clock.at("arriver");
  const tiles: readonly (readonly [string, number, number])[] = [
    ["web-message-circle", 353, 0],
    ["web-credit-card", 20, 205],
    ["web-users", 686, 205],
    ["web-mail", 353, 410],
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {tiles.map(([icon, x, y]) => (
          <div key={icon} style={abs(x, y, 230, 230)}>
            <AppSquare size={230} icon={icon} on={lit(clock, happen, 0.2) > 0.5} />
          </div>
        ))}
        <div style={{ ...abs(368, 220, 200, 200), transform: `scale(${punch(clock, happen, 0.18, 0.5)})` }}>
          <Disc size={200} sign="!" />
        </div>
        <Burst x={468} y={320} radius={330} progress={clock.p(happen, 0.6)} rays={10} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  48 · « tes comptes bancaires, »                                            */
/* -------------------------------------------------------------------------- */
export const Beat48: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const accounts = clock.at("comptes");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(188, 140, 560, 353), transform: `scale(${punch(clock, accounts, 0.1, 0.4)}) rotate(${-4 + 4 * lit(clock, accounts, 0.3)}deg)` }}>
          <BankCard w={560} on={lit(clock, accounts, 0.2)} />
        </div>
        <Sparkle x={140} y={150} size={80} progress={clock.p(accounts, 0.8)} color={colors.accent} />
        <Sparkle x={800} y={500} size={70} progress={clock.p(accounts + 0.1, 0.8)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  49 · « tes réseaux sociaux, »                                              */
/* -------------------------------------------------------------------------- */
export const Beat49: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const nets = clock.at("réseaux");
  const social = clock.at("sociaux");
  const on = lit(clock, nets, 0.2) > 0.5;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <Overlay w={936} h={640}>
          <path d="M268 410 L468 150 L668 410 M268 410 H668" fill="none" stroke={on ? colors.accent : withAlpha(colors.inkInverse, 0.4)} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        </Overlay>
        <div style={abs(168, 310, 200, 200)}>
          <PersonIcon size={200} on={on} />
        </div>
        <div style={abs(368, 50, 200, 200)}>
          <PersonIcon size={200} on={on} />
        </div>
        <div style={abs(568, 310, 200, 200)}>
          <PersonIcon size={200} on={on} />
        </div>
        <div style={{ ...abs(396, 270, 144, 144), transform: `scale(${punch(clock, social, 0.2, 0.5)})` }}>
          <LibIcon id="web-heart" size={144} color={lit(clock, social, 0.2) > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.55)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  50 · « tes e-mails »                                                       */
/* -------------------------------------------------------------------------- */
export const Beat50: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const mails = clock.at("e-mails");
  const on = lit(clock, mails, 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(188, 90, 560, 460), transform: `scale(${punch(clock, mails, 0.1, 0.4)})` }}>
          <Card w={560} h={460} active={on > 0.5}>
            <LibIcon id="web-mail" size={330} color={on > 0.5 ? colors.accent : colors.inkInverse} />
          </Card>
        </div>
        <Burst x={468} y={320} radius={330} progress={clock.p(mails, 0.6)} rays={8} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  51 · « ou même au téléphone. »                                             */
/* -------------------------------------------------------------------------- */
export const Beat51: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const phone = clock.at("téléphone");
  const ring = clock.p(phone, 0.5);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(238, 70, 460, 460), transform: `rotate(${shake(clock, phone, 9, 0.7)}deg)` }}>
          <Handset size={460} ring={ring} />
        </div>
        <Sparkle x={160} y={140} size={80} progress={clock.p(phone, 0.8)} color={colors.accent} />
        <Sparkle x={790} y={140} size={70} progress={clock.p(phone + 0.1, 0.8)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  52 · « Le pirate ne cherche pas »                                          */
/* -------------------------------------------------------------------------- */
export const Beat52: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const pirate = clock.at("pirate");
  const no = clock.at("pas");
  const t = clock.frame / clock.fps;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(40, 150, 320, 320), transform: `scale(${punch(clock, pirate, 0.08, 0.4)})` }}>
          <Pirate size={320} on={lit(clock, pirate, 0.2)} />
        </div>
        <div style={abs(470 + 20 * Math.sin(t * 5), 190, 280, 280)}>
          <Loupe size={280} />
        </div>
        <div style={abs(420, 120, 400, 400)}>
          <Veto size={400} progress={clock.p(no, 0.5)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  53 · « toujours à casser un système. »                                     */
/* -------------------------------------------------------------------------- */
export const Beat53: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const crack = clock.at("casser");
  const t = clock.frame / clock.fps;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(168, 110, 600, 420)}>
          <BrowserFrame width={600} height={420} tone="dark">
            <div style={{ position: "absolute", left: 40, right: 40, top: 40, display: "flex", flexDirection: "column", gap: 28 }}>
              <Skeleton w="82%" h={26} />
              <Skeleton w="60%" h={26} />
              <Skeleton w="72%" h={26} />
            </div>
          </BrowserFrame>
        </div>
        <Overlay w={936} h={640}>
          <path
            d="M470 150 L430 250 L500 320 L440 400 L490 500"
            fill="none"
            stroke={colors.accent}
            strokeWidth={12}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - clock.p(crack, 0.5)}
          />
        </Overlay>
        <div style={abs(700, 20, 160, 160)}>
          <Gear size={160} angle={t * 50} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  54 · « Parfois, il cherche simplement »                                    */
/* -------------------------------------------------------------------------- */
export const Beat54: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const simply = clock.at("simplement");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 170, 300, 300)}>
          <Pirate size={300} on={1} />
        </div>
        <div style={{ ...abs(350, 150, 500, 220), transform: `scale(${punch(clock, simply, 0.08, 0.4)})` }}>
          <Chat w={500} h={190} tail="left" hot={lit(clock, simply, 0.2) > 0.5}>
            <TypingDots size={30} t={clock.frame / clock.fps} />
          </Chat>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  55 · « à te convaincre. »                                                  */
/* -------------------------------------------------------------------------- */
export const Beat55: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const convince = clock.at("convaincre");
  const on = lit(clock, convince, 0.2) > 0.5;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(10, 220, 400, 200)}>
          <Chat w={380} h={170} tail="right" hot>
            <TypingDots size={28} t={clock.frame / clock.fps} />
          </Chat>
        </div>
        <Overlay w={936} h={640}>
          <Arrow x1={430} y1={310} x2={570} y2={310} progress={clock.p(convince - 0.4, 0.4)} />
        </Overlay>
        <div style={{ ...abs(610, 190, 300, 300), transform: `scale(${punch(clock, convince, 0.1, 0.45)})` }}>
          <PersonIcon size={300} on={on} />
        </div>
        <div style={abs(690, 40, 170, 170)}>
          <CheckMark size={170} progress={clock.p(convince, 0.4)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  56 · « Alors, avant de »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat56: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const before = clock.at("avant");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <div style={{ ...abs(46, 150, 420, 420), transform: `scale(${punch(clock, before, 0.1, 0.45)})` }}>
          <StopSign size={420} />
        </div>
        <Burst x={256} y={360} radius={300} progress={clock.p(before, 0.6)} rays={9} />
      </Art>
      <ZoneMascot scene={scene} pose="point" attitude="confident" from={before} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  57 · « cliquer sur un lien, »                                              */
/* -------------------------------------------------------------------------- */
export const Beat57: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const click = clock.at("cliquer");
  const link = clock.at("lien");
  const t = clock.frame / clock.fps;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(108, 150, 720, 150), transform: `scale(${punch(clock, link, 0.05, 0.4)})` }}>
          <Card w={720} h={150} active={lit(clock, link, 0.2) > 0.5} style={{ flexDirection: "row", justifyContent: "flex-start", padding: "0 44px", gap: 36 }}>
            <LinkChain size={100} on={lit(clock, link, 0.2) > 0.5} />
            <Skeleton w={400} h={26} tone={lit(clock, link, 0.2) > 0.5 ? "accent" : "soft"} />
          </Card>
        </div>
        <div style={abs(500 + 24 * Math.sin(t * 6), 320 + 40 * punch(clock, click, 0.2, 0.4) - 40, 220, 220)}>
          <LibIcon id="web-pointer-click" size={220} color={colors.inkInverse} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  58 · « de donner un code »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat58: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const give = clock.at("donner");
  const code = clock.at("code");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(lerp(80, 120, clock.p(give, 0.5)), 200, 600, 220), transform: `scale(${punch(clock, code, 0.06, 0.4)})` }}>
          <CodeCard w={600} filled={6} active />
        </div>
        <Overlay w={936} h={640}>
          <Arrow x1={560} y1={500} x2={810} y2={500} progress={clock.p(give, 0.6)} />
        </Overlay>
        <div style={abs(780, 190, 150, 150)}>
          <Disc size={150} sign="?" color={withAlpha(colors.inkInverse, 0.3)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  59 · « ou de partager une information personnelle, »                       */
/* -------------------------------------------------------------------------- */
export const Beat59: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const share = clock.at("partager");
  const personal = clock.at("personnelle");
  const fly = clock.p(share, 0.7);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(60, 140, 520, 340), transform: `scale(${punch(clock, personal, 0.06, 0.4)})` }}>
          <Card w={520} h={340} active={lit(clock, personal, 0.2) > 0.5} style={{ flexDirection: "row", justifyContent: "flex-start", padding: "0 40px", gap: 40 }}>
            <PersonIcon size={150} on={lit(clock, personal, 0.2) > 0.5} />
            <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
              <Skeleton w={220} h={24} />
              <Skeleton w={170} h={24} />
              <Skeleton w={200} h={24} />
            </div>
          </Card>
        </div>
        {[0, 1, 2].map((index) => (
          <div key={index} style={abs(lerp(340, 680 + index * 40, fly), 180 + index * 90 + (fly > 0 ? -20 * fly : 0), 220, 28)}>
            <Skeleton w={220 - index * 30} h={26} tone="accent" style={{ opacity: fly > 0.02 ? 1 : 0 }} />
          </div>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  60 · « prends quelques secondes »                                          */
/* -------------------------------------------------------------------------- */
export const Beat60: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const seconds = clock.at("secondes");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(238, 90, 460, 460), transform: `scale(${punch(clock, seconds, 0.06, 0.4)})` }}>
          <Stopwatch size={460} sweep={0.22 * clock.p(0, 0.9, linear)} />
        </div>
        <Sparkle x={170} y={150} size={80} progress={clock.p(seconds, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  61 · « pour vérifier. »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat61: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const verify = clock.at("vérifier");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(90, 110, 420, 420), transform: `scale(${punch(clock, verify + 0.2, 0.08, 0.4)})` }}>
          <ShieldCheck size={420} check={clock.p(verify + 0.15, 0.5)} />
        </div>
        <div style={abs(lerp(440, 520, clock.p(0, 0.9)), 160, 300, 300)}>
          <Loupe size={300} />
        </div>
        <Sparkle x={800} y={110} size={80} progress={clock.p(verify + 0.2, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  62 · « Parce que sur Internet, »                                           */
/* -------------------------------------------------------------------------- */
export const Beat62: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const net = clock.at("Internet");
  const on = lit(clock, net, 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(318, 130, 300, 380), transform: `scale(${punch(clock, net, 0.1, 0.45)})` }}>
          <Card w={300} h={380} active={on > 0.5}>
            <LibIcon id="web-globe" size={220} color={on > 0.5 ? colors.accent : colors.inkInverse} />
          </Card>
        </div>
        {[
          [40, 40],
          [726, 40],
          [40, 400],
          [726, 400],
        ].map(([x, y]) => (
          <div key={`${x}-${y}`} style={abs(x, y, 170, 170)}>
            <PersonIcon size={170} on={on > 0.5} />
          </div>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  63 · « la personne qui te piège »                                          */
/* -------------------------------------------------------------------------- */
export const Beat63: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const trap = clock.at("piège");
  const mask = clock.p(trap, 0.4);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(248, 90, 440, 440), transform: `scale(${punch(clock, trap, 0.1, 0.4)}) translateX(${shake(clock, trap, 10, 0.5)}px)` }}>
          <Avatar size={440} mask={mask} />
        </div>
        <Burst x={468} y={310} radius={340} progress={clock.p(trap, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  64 · « n'est pas toujours celle que tu imagines. »                         */
/* -------------------------------------------------------------------------- */
export const Beat64: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const no = clock.at("pas");
  const imagine = clock.at("imagines");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(20, 10, 440, 330), transform: `scale(${punch(clock, imagine, 0.06, 0.4)})` }}>
          <Thought w={440} h={250}>
            <PersonIcon size={190} on={lit(clock, imagine, 0.2) > 0.5} />
          </Thought>
        </div>
        <div style={{ ...abs(400, 330, 150, 150), transform: `scale(${punch(clock, no, 0.2, 0.45)})` }}>
          <NotEqual size={150} color={lit(clock, no, 0.2) > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.5)} />
        </div>
        <div style={abs(590, 300, 310, 310)}>
          <Pirate size={310} on={lit(clock, no, 0.2)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  65 · « Tu connaissais cette technique ? »                                  */
/* -------------------------------------------------------------------------- */
export const Beat65: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const known = clock.at("connaissais");
  const technique = clock.at("technique");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <div style={{ ...abs(36, 190, 440, 330), transform: `scale(${punch(clock, technique, 0.1, 0.45)})` }}>
          <Chat w={440} h={290} tail="left" hot>
            <Disc size={180} sign="?" color={colors.ink} />
          </Chat>
        </div>
        <div style={{ ...abs(340, 70, 120, 120), transform: `scale(${punch(clock, technique, 0.2, 0.5)})` }}>
          <LibIcon id="web-heart" size={120} color={lit(clock, technique, 0.2) > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.6)} />
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="happy" attitude="excited" from={known} halo="accent" />
    </Shot>
  );
};
