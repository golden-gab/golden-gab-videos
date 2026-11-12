/**
 * Plans 19 à 36 — « Le faux message “tu as gagné un iPhone” »
 *
 * Bloc 2 : le piège se referme. Le lien redirige vers une fausse page qui
 * copie une vraie ; elle réclame nom, numéro, e-mail et parfois mot de passe ;
 * on croit remplir un simple formulaire alors qu'on envoie tout à un inconnu.
 * Puis le mot : phishing, hameçonnage (l'hameçon et son appât).
 */

import React from "react";

import { Art, Burst, lerp, punch, shake, Sparkle, ZoneMascot } from "../../../../../components/motion";
import { colors, radius } from "../../../../../config";
import { withAlpha } from "../../../../../utils/color";
import { Arrow, Card, CheckMark, Padlock, Pill, Shot } from "../../../../web-story/kit";
import { Handset, Incognito, Keypad, KeyIcon, LinkChain, PersonIcon, PersonOutline, Thought } from "../../../kit";
import {
  At,
  BigDisc,
  Envelope,
  EqualSign,
  FormCard,
  Fish,
  Gift,
  Hook,
  InfoCard,
  NameTag,
  Overlay,
  SiteWindow,
  Warning,
  clamp01,
  easeOut,
  on,
  pop,
  type BeatProps,
  useClock,
} from "./helpers";

const ART_W = 936;
const ART_H = 640;
const SIDE_W = 512;
const SIDE_H = 720;

const lin = (t: number): number => t;

/* -------------------------------------------------------------------------- */
/*  19 · « se trouve le piège. » (mascotte surprise)                           */
/* -------------------------------------------------------------------------- */
export const Beat19: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const trap = clock.at("piège.");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={SIDE_W} h={SIDE_H}>
        <At x={80} y={330} w={340} h={340}>
          <Gift size={340} on />
        </At>
        <At x={131} y={20} w={250} h={250} rotate={shake(clock, trap, 8, 0.6)} scale={punch(clock, trap, 0.12, 0.45)}>
          <Warning size={250} />
        </At>
        <Burst x={256} y={150} radius={220} progress={clock.p(trap, 0.8)} rays={9} />
      </Art>
      <ZoneMascot scene={scene} pose="surprised" attitude="surprised" halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  20 · « Le lien te redirige vers »                                          */
/* -------------------------------------------------------------------------- */
export const Beat20: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const go = clock.at("redirige");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={30} y={210} w={210} h={210} scale={pop(clock, "lien", 0.14)}>
          <LinkChain size={210} on={on(clock, "lien")} />
        </At>
        <At x={520} y={170} w={390} h={281}>
          <SiteWindow w={390} active={on(clock, "vers")} />
        </At>
        <Overlay w={ART_W} h={ART_H}>
          <Arrow x1={270} y1={315} x2={500} y2={315} progress={clock.p(go, 0.5)} />
        </Overlay>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  21 · « une fausse page qui ressemble »                                     */
/* -------------------------------------------------------------------------- */
export const Beat21: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const fake = clock.at("fausse");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={178} y={140} w={520} h={374}>
          <SiteWindow w={520} active={on(clock, "fausse")} />
        </At>
        <At x={600} y={30} w={250} h={250} scale={punch(clock, fake, 0.2, 0.5)} rotate={shake(clock, fake, 6, 0.5)}>
          <Incognito size={250} lit={clock.p(fake, 0.25, lin)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  22 · « parfois parfaitement à un vrai site. »                              */
/* -------------------------------------------------------------------------- */
export const Beat22: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const perfect = clock.at("parfaitement");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={20} y={150} w={360} h={259}>
          <SiteWindow w={360} />
        </At>
        <At x={556} y={150} w={360} h={259}>
          <SiteWindow w={360} />
        </At>
        <At x={408} y={210} w={120} h={120} scale={punch(clock, perfect, 0.25, 0.5)}>
          <EqualSign size={120} on={on(clock, "parfaitement")} />
        </At>
        <At x={125} y={440} w={150} h={150} scale={pop(clock, "vrai", 0.2)}>
          <CheckMark size={150} progress={clock.p(clock.at("vrai"), 0.4)} />
        </At>
        <At x={661} y={440} w={150} h={150} scale={pop(clock, "site.", 0.2)}>
          <Incognito size={150} lit={clock.p(clock.at("site."), 0.3, lin)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  23 · « On te demande ton nom, »                                            */
/* -------------------------------------------------------------------------- */
export const Beat23: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const name = clock.at("nom,");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={40} y={35} w={520} h={570}>
          <FormCard w={520} rows={3} hot={0} filled={clock.p(name, 0.5, lin)} />
        </At>
        <At x={620} y={170} w={290} h={290} scale={pop(clock, "nom,", 0.14)}>
          <PersonIcon size={290} on={on(clock, "nom,")} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  24 · « ton numéro de téléphone, »                                          */
/* -------------------------------------------------------------------------- */
export const Beat24: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const phone = clock.at("téléphone,");
  const keys = Math.floor(clock.p(clock.at("numéro"), 1.3, lin) * 12);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={120} y={110} w={340} h={425}>
          <Keypad size={340} lit={keys} />
        </At>
        <At x={540} y={140} w={280} h={280} scale={punch(clock, phone, 0.15, 0.45)} rotate={shake(clock, phone, 8, 0.6)}>
          <Handset size={280} ring={clock.p(phone, 0.4, lin)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  25 · « ton adresse e-mail »                                                */
/* -------------------------------------------------------------------------- */
export const Beat25: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const mail = clock.at("e-mail");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={238} y={150} w={460} h={331} scale={punch(clock, mail, 0.1, 0.45)}>
          <Envelope size={460} on={on(clock, "e-mail")} open={clock.p(mail, 0.4)} />
        </At>
        <Sparkle x={730} y={140} size={110} progress={clock.p(mail, 0.6)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  26 · « et parfois même ton »                                               */
/* -------------------------------------------------------------------------- */
export const Beat26: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const sometimes = clock.at("parfois");
  const extra = on(clock, "parfois");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={233 + shake(clock, sometimes, 10, 0.5)} y={55} w={470} h={532}>
          <FormCard w={470} rows={4} filled={3} hot={extra ? 3 : -1} ghost={extra ? -1 : 3} button={false} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  27 · « mot de passe. »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat27: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const pass = clock.at("passe.");
  const dots = Math.floor(clock.p(clock.at("mot"), 1.0, lin) * 7);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={158} y={90} w={620} h={190}>
          <Card w={620} h={190} active={dots > 0}>
            <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
              <KeyIcon size={110} on={dots > 0} />
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div key={index} style={{ width: 44, height: 44, borderRadius: radius.pill, backgroundColor: dots > index ? colors.accent : withAlpha(colors.inkInverse, 0.25) }} />
              ))}
            </div>
          </Card>
        </At>
        <At x={358} y={330} w={220} h={290} scale={punch(clock, pass, 0.12, 0.45)}>
          <Padlock size={220} open={clock.p(pass, 0.5)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  28 · « Tu penses remplir un simple »                                       */
/* -------------------------------------------------------------------------- */
export const Beat28: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const simple = clock.at("simple");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={60} y={330} w={260} h={260} scale={pop(clock, "penses", 0.1)}>
          <PersonIcon size={260} on={on(clock, "penses")} />
        </At>
        <At x={330} y={30} w={540} h={400}>
          <Thought w={540} h={330}>
            <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
              <FormCard w={270} rows={2} filled={clock.p(simple, 0.5, lin) * 2} button={false} />
              <CheckMark size={130} progress={clock.p(simple, 0.4)} />
            </div>
          </Thought>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  29 · « formulaire pour récupérer »                                         */
/* -------------------------------------------------------------------------- */
export const Beat29: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const get = clock.at("récupérer");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={30} y={110} w={340} h={410}>
          <FormCard w={340} rows={3} filled={3} />
        </At>
        <At x={580} y={150} w={330} h={330} scale={pop(clock, "récupérer", 0.12)}>
          <Gift size={330} on={on(clock, "récupérer")} />
        </At>
        <Overlay w={ART_W} h={ART_H}>
          <Arrow x1={400} y1={310} x2={560} y2={310} progress={clock.p(get - 0.2, 0.5)} />
        </Overlay>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  30 · « ton cadeau, mais en réalité, »                                      */
/* -------------------------------------------------------------------------- */
export const Beat30: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const real = clock.at("réalité,");
  const reveal = easeOut(clock.p(real, 0.6, lin));

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={368} y={lerp(380, 150, reveal)} w={200} h={200}>
          <Incognito size={200} lit={reveal} />
        </At>
        <At x={238} y={150} w={460} h={460} rotate={shake(clock, real, 5, 0.5)}>
          <Gift size={460} on={on(clock, "cadeau,")} lid={reveal} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  31 · « tu es en train de transmettre »                                     */
/* -------------------------------------------------------------------------- */
export const Beat31: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const send = clock.p(clock.at("transmettre"), 0.8, lin);

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={30} y={190} w={270} h={270}>
          <PersonIcon size={270} on />
        </At>
        <At x={640} y={180} w={270} h={270} scale={1 + 0.1 * Math.sin(Math.PI * clamp01((send - 0.6) / 0.4))}>
          <Incognito size={270} lit={send > 0.9 ? 1 : 0} />
        </At>
        <Overlay w={ART_W} h={ART_H}>
          <Arrow x1={330} y1={320} x2={610} y2={320} progress={clock.p(clock.at("train"), 0.6)} />
        </Overlay>
        <At x={lerp(330, 520, send)} y={250} w={130} h={94}>
          <Envelope size={130} on />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  32 · « tes informations »                                                  */
/* -------------------------------------------------------------------------- */
export const Beat32: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const info = clock.at("informations");
  const fly = easeOut(clock.p(info, 0.7, lin));
  const kinds = ["name", "phone", "mail"] as const;

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        {kinds.map((kind, index) => (
          <At key={kind} x={20 + fly * 200} y={50 + index * 190} w={380} h={137}>
            <InfoCard w={380} kind={kind} on={on(clock, "informations")} />
          </At>
        ))}
        <Overlay w={ART_W} h={ART_H}>
          <Arrow x1={650} y1={320} x2={900} y2={320} progress={clock.p(info, 0.6)} />
        </Overlay>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  33 · « à un inconnu. »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat33: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const unknown = clock.at("inconnu.");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={130} y={120} w={400} h={400} scale={pop(clock, "inconnu.", 0.08)}>
          <PersonOutline size={400} />
        </At>
        <At x={590} y={150} w={240} h={240} scale={punch(clock, unknown, 0.2, 0.5)}>
          <BigDisc size={240}>?</BigDisc>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  34 · « Cette arnaque porte un nom : »                                      */
/* -------------------------------------------------------------------------- */
export const Beat34: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const scam = clock.at("arnaque");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <At x={70} y={170} w={310} h={310} scale={punch(clock, scam, 0.14, 0.45)} rotate={shake(clock, scam, 6, 0.5)}>
          <Warning size={310} />
        </At>
        <At x={470} y={190} w={400} h={248} scale={pop(clock, "nom:", 0.14)}>
          <NameTag w={400} on={on(clock, "nom:")} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  35 · « le phishing, » — l'hameçon et son appât                             */
/* -------------------------------------------------------------------------- */
export const Beat35: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("phishing,");

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <div style={{ position: "absolute", left: 0, top: 0, width: ART_W, display: "flex", justifyContent: "center", transform: `scale(${1 + 0.14 * Math.sin(Math.PI * clock.p(word, 0.45, lin))})` }}>
          <Pill size={84} tone={on(clock, "phishing,") ? "accent" : "dark"}>
            PHISHING
          </Pill>
        </div>
        <At x={330} y={130} w={170} h={340}>
          <Hook size={340} on={on(clock, "phishing,")} />
        </At>
        <At x={244} y={290} w={200} h={200}>
          <Gift size={200} on />
        </At>
        <div style={{ position: "absolute", left: 640, top: 340, opacity: 0.55, transform: "scaleX(-1)" }}>
          <Fish size={260} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  36 · « ou hameçonnage. » — le poisson mord                                 */
/* -------------------------------------------------------------------------- */
export const Beat36: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const word = clock.at("hameçonnage.");
  const bite = easeOut(clock.p(word, 0.45, lin));

  return (
    <Shot scene={scene} layout="art">
      <Art w={ART_W} h={ART_H}>
        <div style={{ position: "absolute", left: 0, top: 0, width: ART_W, display: "flex", justifyContent: "center", transform: `scale(${1 + 0.12 * Math.sin(Math.PI * clock.p(word, 0.45, lin))})` }}>
          <Pill size={70} tone={on(clock, "hameçonnage.") ? "accent" : "dark"}>
            HAMEÇONNAGE
          </Pill>
        </div>
        <At x={330} y={130} w={170} h={340}>
          <Hook size={340} on />
        </At>
        <At x={244} y={290} w={200} h={200}>
          <Gift size={200} on />
        </At>
        <div style={{ position: "absolute", left: lerp(640, 430, bite), top: 340, transform: "scaleX(-1)" }}>
          <Fish size={260} on={bite > 0.9} />
        </div>
        <Burst x={420} y={430} radius={170} progress={clock.p(word + 0.3, 0.6)} rays={8} />
      </Art>
    </Shot>
  );
};
