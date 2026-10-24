/**
 * Plans 23 à 44 — « Comment pirater un compte WhatsApp en une minute ? »
 *
 * Bloc 2 : la vérité (les pirates ne cassent pas la sécurité, ils manipulent la
 * personne pour obtenir son code de vérification reçu par SMS), le nom du
 * concept (l'ingénierie sociale) et ses trois leviers : la confiance, la peur,
 * la curiosité.
 */

import React from "react";

import {
  abs,
  Art,
  Burst,
  LibIcon,
  lerp,
  lit,
  punch,
  shake,
  Sparkle,
  ZoneMascot,
} from "../../../../../components/motion";
import { colors } from "../../../../../config";
import { withAlpha } from "../../../../../utils/color";
import { Arrow, Bell, Card, CheckMark, Gear, Padlock, Pill, Shot } from "../../../../web-story/kit";
import {
  Avatar,
  Chat,
  CodeCard,
  Disc,
  EyeIcon,
  Hammer,
  KeyIcon,
  PersonIcon,
  ShieldCheck,
  Thought,
  TypingDots,
} from "../../../kit";
import { type BeatProps, ChatPhone, Overlay, Pirate, useClock, Veto } from "./helpers";

const linear = (input: number): number => input;

/* -------------------------------------------------------------------------- */
/*  23 · « En réalité, »                                                       */
/* -------------------------------------------------------------------------- */
export const Beat23: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const real = clock.at("réalité");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(288, 140, 360, 360), transform: `scale(${punch(clock, real, 0.16, 0.5)})` }}>
          <Disc size={360} sign="!" />
        </div>
        <Burst x={468} y={320} radius={340} progress={clock.p(real, 0.6)} rays={11} />
        <Sparkle x={120} y={110} size={80} progress={clock.p(real, 0.8)} color={colors.accent} />
        <Sparkle x={820} y={530} size={80} progress={clock.p(real + 0.1, 0.8)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  24 · « beaucoup de pirates »                                               */
/* -------------------------------------------------------------------------- */
export const Beat24: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const many = clock.at("beaucoup");
  const of = clock.at("de");
  const pirates = clock.at("pirates");
  const starts = [many, of, pirates];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {starts.map((start, index) => (
          <div key={index} style={{ ...abs(index * 338, 190 + (index === 1 ? -40 : 20), 260, 260), transform: `scale(${punch(clock, start, 0.1, 0.4)})` }}>
            <Pirate size={260} on={lit(clock, start, 0.2)} />
          </div>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  25 · « ne cassent même pas »                                               */
/* -------------------------------------------------------------------------- */
export const Beat25: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const hit = clock.at("cassent");
  const no = clock.at("pas");
  const swing = -65 + 65 * Math.sin(Math.PI * clock.p(hit - 0.1, 0.45));

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(110, 120, 380, 420), transform: `translateX(${shake(clock, hit + 0.1, 12, 0.5)}px)` }}>
          <Padlock size={380} open={0} color={colors.inkInverse} />
        </div>
        <div style={{ ...abs(500, 80, 360, 360), transformOrigin: "50% 95%", transform: `rotate(${swing}deg)` }}>
          <Hammer size={360} />
        </div>
        <div style={abs(50, 60, 520, 520)}>
          <Veto size={520} progress={clock.p(no, 0.55)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  26 · « la sécurité de WhatsApp. »                                          */
/* -------------------------------------------------------------------------- */
export const Beat26: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const safe = clock.at("sécurité");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(120, 10, 300, 620)}>
          <ChatPhone w={300} h={620} />
        </div>
        <div style={{ ...abs(480, 120, 380, 380), transform: `scale(${punch(clock, safe + 0.3, 0.08, 0.4)})` }}>
          <ShieldCheck size={380} check={clock.p(safe + 0.2, 0.5)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  27 · « Ils manipulent leurs victimes »                                     */
/* -------------------------------------------------------------------------- */
export const Beat27: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const manipulate = clock.at("manipulent");
  const victims = clock.at("victimes");
  const t = clock.frame / clock.fps;
  const sway = 7 * Math.sin(t * 6) * lit(clock, manipulate, 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={680}>
        <div style={abs(338, 0, 260, 260)}>
          <Pirate size={260} on={1} />
        </div>
        <div style={{ ...abs(0, 0, 936, 680), transformOrigin: "468px 290px", transform: `rotate(${sway}deg)` }}>
          <Overlay w={936} h={680}>
            <path d="M468 262 V292" stroke={colors.inkInverse} strokeWidth={8} strokeLinecap="round" />
            <path d="M380 292 H556" stroke={colors.inkInverse} strokeWidth={12} strokeLinecap="round" />
            <path d="M380 292 L410 420 M468 292 V400 M556 292 L526 420" stroke={withAlpha(colors.inkInverse, 0.75)} strokeWidth={5} strokeLinecap="round" />
          </Overlay>
        </div>
        <div style={{ ...abs(318, 380, 300, 300), transform: `scale(${punch(clock, victims, 0.08, 0.4)})` }}>
          <PersonIcon size={300} on={lit(clock, victims, 0.2) > 0.5} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  28 · « pour qu'elles leur donnent elles-mêmes »                            */
/* -------------------------------------------------------------------------- */
export const Beat28: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const give = clock.at("donnent");
  const themselves = clock.at("elles-mêmes");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(0, 190, 260, 260), transform: `scale(${punch(clock, themselves, 0.1, 0.45)})` }}>
          <PersonIcon size={260} on={lit(clock, give, 0.2) > 0.5} />
        </div>
        <div style={abs(676, 190, 260, 260)}>
          <Pirate size={260} on={clock.p(give + 0.5, 0.3)} />
        </div>
        <Overlay w={936} h={640}>
          <Arrow x1={290} y1={320} x2={650} y2={320} progress={clock.p(give, 0.7)} />
        </Overlay>
        <Sparkle x={130} y={140} size={80} progress={clock.p(themselves, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  29 · « le code de vérification »                                           */
/* -------------------------------------------------------------------------- */
export const Beat29: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const code = clock.at("code");
  const verify = clock.at("vérification");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(393, 40, 150, 150), transform: `scale(${punch(clock, verify, 0.1, 0.4)})` }}>
          <LibIcon id="web-lock" size={150} color={lit(clock, verify, 0.2) > 0.5 ? colors.accent : colors.inkInverse} />
        </div>
        <div style={abs(68, 250, 800, 220)}>
          <CodeCard w={800} filled={6 * clock.p(code, 1.0, linear)} active />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  30 · « reçu par SMS. »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat30: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const sms = clock.at("SMS");
  const ring = clock.p(sms, 0.8);
  const swing = 20 * Math.sin(ring * Math.PI * 6) * (1 - ring);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(120, 10, 320, 620)}>
          <ChatPhone w={320} h={620}>
            <div
              style={{
                ...abs(18, 190, 284, 150),
                borderRadius: 36,
                backgroundColor: withAlpha(colors.inkInverse, 0.92),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 22,
                transform: `scale(${punch(clock, sms, 0.08, 0.4)})`,
              }}
            >
              <LibIcon id="web-mail" size={84} color={colors.secondary} />
              <div style={{ width: 90, height: 22, borderRadius: 11, backgroundColor: withAlpha(colors.secondary, 0.5) }} />
            </div>
          </ChatPhone>
        </div>
        <div style={abs(560, 80, 240, 240)}>
          <Bell size={240} swing={swing} />
        </div>
        <div style={abs(540, 400, 300, 120)}>
          <Pill size={88} tone={lit(clock, sms, 0.2) > 0.5 ? "accent" : "dark"}>
            SMS
          </Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  31 · « Et une fois ce code »                                               */
/* -------------------------------------------------------------------------- */
export const Beat31: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const code = clock.at("code");
  const fly = clock.p(code - 0.2, 0.7);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 190, 260, 260)}>
          <PersonIcon size={260} />
        </div>
        <div style={abs(676, 190, 260, 260)}>
          <Pirate size={260} on={fly > 0.9 ? 1 : 0} />
        </div>
        <div style={{ ...abs(lerp(220, 380, fly), 300, 300, 120), transform: `scale(${punch(clock, code, 0.08, 0.4)})` }}>
          <CodeCard w={300} filled={6} active />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  32 · « récupéré, »                                                         */
/* -------------------------------------------------------------------------- */
export const Beat32: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const got = clock.at("récupéré");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={680}>
        <div style={abs(318, 0, 300, 300)}>
          <Pirate size={300} on={1} />
        </div>
        <div style={{ ...abs(158, 350, 620, 240), transform: `scale(${punch(clock, got, 0.06, 0.4)})` }}>
          <CodeCard w={620} filled={6} active />
        </div>
        <div style={abs(640, 20, 220, 220)}>
          <CheckMark size={220} progress={clock.p(got, 0.4)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  33 · « ils peuvent tenter »                                                */
/* -------------------------------------------------------------------------- */
export const Beat33: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const attempt = clock.at("tenter");
  const t = clock.frame / clock.fps;
  const approach = clock.p(0, 0.5);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(318, 100, 420, 460), transform: `rotate(${Math.sin(t * 18) * 5 * lit(clock, attempt, 0.2)}deg)` }}>
          <Padlock size={420} open={0.35 * lit(clock, attempt, 0.2)} />
        </div>
        <div style={abs(lerp(-40, 90, approach), 220, 220, 220)}>
          <KeyIcon size={220} on />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  34 · « de prendre le contrôle »                                            */
/* -------------------------------------------------------------------------- */
export const Beat34: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const control = clock.at("contrôle");
  const mask = clock.p(control, 0.45);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(298, 0, 340, 640), transform: `scale(${punch(clock, control, 0.05, 0.4)})` }}>
          <ChatPhone w={340} h={640} mask={mask} hot={mask > 0.5} />
        </div>
        <Sparkle x={200} y={160} size={80} progress={clock.p(control, 0.8)} color={colors.accent} />
        <Sparkle x={760} y={470} size={70} progress={clock.p(control + 0.1, 0.8)} color={colors.inkInverse} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  35 · « du compte. »                                                        */
/* -------------------------------------------------------------------------- */
export const Beat35: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const account = clock.at("compte");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(268, 30, 400, 400), transform: `scale(${punch(clock, account, 0.08, 0.4)})` }}>
          <Avatar size={400} mask={1} />
        </div>
        <div style={{ ...abs(520, 330, 260, 290), transform: `scale(${punch(clock, account, 0.16, 0.5)})` }}>
          <Padlock size={260} open={clock.p(account, 0.4)} />
        </div>
        <Burst x={468} y={230} radius={330} progress={clock.p(account, 0.6)} rays={9} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  36 · « C'est ce qu'on appelle »                                            */
/* -------------------------------------------------------------------------- */
export const Beat36: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const call = clock.at("appelle");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <div style={abs(36, 140, 440, 400)}>
          <Thought w={440} h={300}>
            <div style={{ transform: `scale(${punch(clock, call, 0.14, 0.45)})` }}>
              <Disc size={170} sign="?" />
            </div>
          </Thought>
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="explaining" attitude="confident" from={call - 0.2} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  37 · « l'ingénierie sociale. »                                             */
/* -------------------------------------------------------------------------- */
export const Beat37: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const eng = clock.at("ingénierie");
  const social = clock.at("sociale");
  const t = clock.frame / clock.fps;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div style={{ ...abs(0, 60, 340, 340), transform: `scale(${punch(clock, eng, 0.1, 0.45)})` }}>
          <Gear size={340} angle={t * 60} color={lit(clock, eng, 0.2) > 0.5 ? colors.accent : colors.inkInverse} />
        </div>
        <div style={{ ...abs(440, 40, 496, 380), transform: `scale(${punch(clock, social, 0.1, 0.45)})` }}>
          <div style={abs(0, 120, 200, 200)}>
            <PersonIcon size={200} on={lit(clock, social, 0.2) > 0.5} />
          </div>
          <div style={abs(150, 0, 200, 200)}>
            <PersonIcon size={200} on={lit(clock, social, 0.2) > 0.5} />
          </div>
          <div style={abs(296, 120, 200, 200)}>
            <PersonIcon size={200} on={lit(clock, social, 0.2) > 0.5} />
          </div>
        </div>
        <div style={abs(0, 500, 420, 110)}>
          <Pill size={64} tone={lit(clock, eng, 0.2) > 0.5 ? "accent" : "dark"}>
            INGÉNIERIE
          </Pill>
        </div>
        <div style={abs(500, 500, 436, 110)}>
          <Pill size={64} tone={lit(clock, social, 0.2) > 0.5 ? "accent" : "dark"}>
            SOCIALE
          </Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  38 · « En gros, c'est quand »                                              */
/* -------------------------------------------------------------------------- */
export const Beat38: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const gist = clock.at("gros");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 200, 260, 260)}>
          <PersonIcon size={260} />
        </div>
        <div style={{ ...abs(676, 190, 260, 260), transform: `scale(${punch(clock, gist, 0.08, 0.4)})` }}>
          <Pirate size={260} on={1} />
        </div>
        <div style={abs(300, 170, 320, 170)}>
          <Chat w={320} h={140} tail="right" hot>
            <TypingDots size={26} t={clock.frame / clock.fps} />
          </Chat>
        </div>
      </Art>
    </Shot>
  );
};

/** Les trois cartes retournées : confiance (cœur), peur (« ! »), curiosité (œil). */
const Levers: React.FC<{
  readonly on: readonly [number, number, number];
  readonly shakeX?: number;
}> = ({ on, shakeX = 0 }) => (
  <>
    {[0, 1, 2].map((index) => (
      <div key={index} style={{ ...abs(370 + index * 190, 150, 170, 250), transform: `translateX(${shakeX * (index % 2 === 0 ? 1 : -1)}px) scale(${1 + 0.06 * on[index]})` }}>
        <Card w={170} h={250} active={on[index] > 0.5}>
          {on[index] > 0.5 ? (
            index === 0 ? (
              <LibIcon id="web-heart" size={110} color={colors.accent} />
            ) : index === 1 ? (
              <Disc size={110} sign="!" />
            ) : (
              <EyeIcon size={130} hot />
            )
          ) : (
            <Disc size={90} sign="?" color={withAlpha(colors.inkInverse, 0.3)} />
          )}
        </Card>
      </div>
    ))}
  </>
);

/* -------------------------------------------------------------------------- */
/*  39 · « quelqu'un utilise »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat39: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const use = clock.at("utilise");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 150, 300, 300)}>
          <Pirate size={300} on={1} />
        </div>
        <Levers on={[0, 0, 0]} shakeX={shake(clock, use, 8, 0.6)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  40 · « la confiance, »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat40: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const trust = clock.at("confiance");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 150, 300, 300)}>
          <Pirate size={300} on={1} />
        </div>
        <Levers on={[lit(clock, trust, 0.2), 0, 0]} />
        <Sparkle x={455} y={120} size={80} progress={clock.p(trust, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  41 · « la peur ou la curiosité »                                           */
/* -------------------------------------------------------------------------- */
export const Beat41: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const fear = clock.at("peur");
  const curious = clock.at("curiosité");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 150, 300, 300)}>
          <Pirate size={300} on={1} />
        </div>
        <Levers on={[1, lit(clock, fear, 0.2), lit(clock, curious, 0.2)]} shakeX={shake(clock, fear, 8, 0.5)} />
        <Sparkle x={645} y={120} size={80} progress={clock.p(fear, 0.8)} color={colors.accent} />
        <Sparkle x={835} y={120} size={80} progress={clock.p(curious, 0.8)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  42 · « pour te pousser à »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat42: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const push = clock.at("pousser");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 210, 220, 220)}>
          <Pirate size={220} on={1} />
        </div>
        <div style={abs(330, 170, 300, 300)}>
          <PersonIcon size={300} on={lit(clock, push, 0.2) > 0.5} />
        </div>
        <div style={{ ...abs(700, 200, 236, 236), transform: `scale(${punch(clock, push + 0.3, 0.08, 0.4)})` }}>
          <Card w={236} h={236} active={clock.p(push + 0.2, 0.4) > 0.9}>
            <LibIcon id="web-pointer-click" size={130} color={colors.inkInverse} />
          </Card>
        </div>
        <Overlay w={936} h={640}>
          <Arrow x1={240} y1={320} x2={330} y2={320} progress={clock.p(push, 0.35)} />
          <Arrow x1={640} y1={320} x2={690} y2={320} progress={clock.p(push + 0.2, 0.35)} />
        </Overlay>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  43 · « faire quelque chose que tu n'aurais normalement »                   */
/* -------------------------------------------------------------------------- */
export const Beat43: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const act = clock.at("faire");
  const never = clock.at("n'aurais");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 270, 300, 300)}>
          <PersonIcon size={300} />
        </div>
        <div style={{ ...abs(330, 300, 280, 280), transform: `scale(${punch(clock, act, 0.12, 0.45)})` }}>
          <Card w={280} h={280} active={lit(clock, act, 0.2) > 0.5}>
            <LibIcon id="web-pointer-click" size={160} color={lit(clock, act, 0.2) > 0.5 ? colors.accent : colors.inkInverse} />
          </Card>
        </div>
        <div style={abs(520, 10, 400, 340)}>
          <Thought w={400} h={250}>
            <div style={abs(100, 30, 200, 200)}>
              <LibIcon id="web-pointer-click" size={200} color={withAlpha(colors.inkInverse, 0.6)} />
            </div>
            <div style={abs(80, 10, 240, 240)}>
              <Veto size={240} progress={clock.p(never, 0.5)} />
            </div>
          </Thought>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  44 · « jamais fait. »                                                      */
/* -------------------------------------------------------------------------- */
export const Beat44: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const never = clock.at("jamais");
  const done = clock.at("fait");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(40, 150, 340, 340)}>
          <Card w={340} h={340}>
            <LibIcon id="web-pointer-click" size={190} color={colors.inkInverse} />
          </Card>
        </div>
        <div style={abs(0, 110, 420, 420)}>
          <Veto size={420} progress={clock.p(never, 0.5)} />
        </div>
        <div style={{ ...abs(500, 120, 380, 380), transform: `scale(${punch(clock, done, 0.14, 0.45)})` }}>
          <CheckMark size={380} progress={clock.p(done, 0.4)} />
        </div>
      </Art>
    </Shot>
  );
};
