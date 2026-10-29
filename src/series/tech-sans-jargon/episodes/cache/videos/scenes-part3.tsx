/**
 * Plans 37 à 54 — « C'est quoi le cache ? »
 *
 * Bloc 3 : vider le cache (supprimer des fichiers temporaires), ce que ça ne
 * promet pas (plus de vitesse, énormément d'espace) et ce que ça ne touche pas
 * (comptes, photos), puis la chute : « tu le savais déjà ou tu viens de le
 * découvrir ? ».
 */

import React from "react";

import {
  Art,
  Burst,
  LibIcon,
  lit,
  punch,
  shake,
  Sparkle,
  ZoneMascot,
} from "../../../../../components/motion";
import { BrandText } from "../../../../../components/common/BrandText";
import { colors } from "../../../../../config";
import { withAlpha } from "../../../../../utils/color";
import { Card, CheckMark, CrossMark, Shot, Skeleton } from "../../../../web-story/kit";
import { Disc, PersonIcon, ShieldCheck } from "../../../kit";
import {
  At,
  type BeatProps,
  Broom,
  CacheBox,
  Calendar,
  ChoiceCard,
  FileIcon,
  Lightning,
  MsgPhone,
  PicFrame,
  SayArt,
  StorageBar,
  Trash,
  useClock,
  Veto,
  Warning,
} from "./helpers";

/** Libellé d'une carte-choix (un seul mot, gros). */
const ChoiceLabel: React.FC<{ readonly children: string; readonly on: boolean; readonly size?: number }> = ({ children, on, size = 84 }) => (
  <BrandText role="display" color={on ? colors.accent : colors.inkInverse} style={{ fontSize: size, lineHeight: 1 }}>
    {children}
  </BrandText>
);

/* -------------------------------------------------------------------------- */
/*  37 · « ou deviennent inutiles. »                                           */
/* -------------------------------------------------------------------------- */
export const Beat37: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const become = clock.at("deviennent");
  const useless = clock.at("inutiles");
  const faded = lit(clock, become, 0.3) > 0.5;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {[0, 1, 2].map((index) => (
          <At key={index} x={70 + index * 270} y={110} w={250} h={310}>
            <FileIcon size={250} dim={faded} />
          </At>
        ))}
        <At x={393} y={440} w={150} h={150} scale={punch(clock, useless, 0.2, 0.45)}>
          <div style={{ opacity: 0.3 + 0.7 * lit(clock, useless, 0.15) }}>
            <CrossMark size={150} color={colors.accent} />
          </div>
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  38 · « Vider le cache permet alors de »                                    */
/* -------------------------------------------------------------------------- */
export const Beat38: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const empty = clock.at("Vider");
  const cache = clock.at("cache");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={248} y={150} w={440} h={396}>
          <CacheBox size={440} eject={clock.p(empty, 0.9)} on={lit(clock, cache, 0.2) > 0.5} />
        </At>
        <Sparkle x={150} y={150} size={80} progress={clock.p(empty, 0.9)} color={colors.accent} />
        <Sparkle x={790} y={130} size={80} progress={clock.p(empty + 0.1, 0.9)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  39 · « supprimer ces fichiers temporaires. »                               */
/* -------------------------------------------------------------------------- */
export const Beat39: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const remove = clock.at("supprimer");
  const temp = clock.at("temporaires");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {[0, 1, 2].map((index) => {
          const fall = clock.p(remove + index * 0.15, 0.5);

          return (
            <At key={index} x={250 + index * 130 + (index - 1) * -40 * fall} y={10 + 230 * fall} w={120} h={150} rotate={(index - 1) * 12 * fall}>
              <FileIcon size={150} />
            </At>
          );
        })}
        <At x={303} y={150} w={330} h={363}>
          <Trash size={330} lid={clock.p(remove, 0.3)} on={lit(clock, temp, 0.2) > 0.5} />
        </At>
        <Sparkle x={170} y={300} size={76} progress={clock.p(temp, 0.9)} color={colors.accent} />
        <Sparkle x={770} y={330} size={76} progress={clock.p(temp + 0.1, 0.9)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  40 · « Attention, ça ne veut pas dire »                                    */
/* -------------------------------------------------------------------------- */
export const Beat40: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const warn = clock.at("Attention");

  return (
    <Shot scene={scene} layout="side-left">
      <Art w={512} h={720}>
        <At x={66} y={170} w={380} h={380} rotate={shake(clock, warn, 8, 0.6)} scale={punch(clock, warn, 0.1, 0.45)}>
          <Warning size={380} />
        </At>
        <Burst x={256} y={360} radius={240} progress={clock.p(warn, 0.8)} rays={9} />
      </Art>
      <ZoneMascot scene={scene} pose="surprised" attitude="surprised" mirrored halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  41 · « que ton téléphone sera forcément plus rapide, »                     */
/* -------------------------------------------------------------------------- */
export const Beat41: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const phone = clock.at("téléphone");
  const surely = clock.at("forcément");
  const fast = clock.at("rapide");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={60} y={40} w={300} h={560} scale={punch(clock, phone, 0.05, 0.4)}>
          <MsgPhone w={300} h={560} />
        </At>
        <At x={500} y={170} w={300} h={300} scale={punch(clock, fast, 0.1, 0.45)}>
          <Lightning size={300} />
        </At>
        <At x={460} y={130} w={380} h={380}>
          <Veto size={380} progress={clock.p(surely, 0.7)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  42 · « ni que tu vas récupérer »                                           */
/* -------------------------------------------------------------------------- */
export const Beat42: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const recover = clock.at("récupérer");
  const freed = 0.06 * clock.p(recover, 0.5);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={68} y={260} w={800} h={130}>
          <StorageBar w={800} h={130} used={0.92} freed={freed} hot />
        </At>
        <Sparkle x={742} y={240} size={80} progress={clock.p(recover, 0.9)} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  43 · « énormément d'espace. »                                              */
/* -------------------------------------------------------------------------- */
export const Beat43: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const huge = clock.at("énormément");
  const space = clock.at("espace");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={68} y={260} w={800} h={140} scale={punch(clock, huge, 0.05, 0.4)}>
          <StorageBar w={800} h={140} used={0.3} dream={0.62} />
        </At>
        <At x={450} y={170} w={300} h={300}>
          <Veto size={300} progress={clock.p(space, 0.6)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  44 · « Et vider le cache »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat44: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const empty = clock.at("vider");
  const sweep = lit(clock, empty, 0.1) * Math.sin(clock.frame / 2.2) * 22;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={60} y={150} w={380} h={342}>
          <CacheBox size={380} on />
        </At>
        <At x={500} y={110} w={340} h={340}>
          <Broom size={340} angle={sweep} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  45 · « ne supprime normalement pas »                                       */
/* -------------------------------------------------------------------------- */
export const Beat45: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const normally = clock.at("normalement");
  const not = clock.at("pas");

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={60} y={180} w={280} h={308}>
          <Trash size={280} />
        </At>
        <At x={20} y={155} w={360} h={360}>
          <Veto size={360} progress={clock.p(not, 0.5)} />
        </At>
        <At x={500} y={140} w={330} h={330} scale={punch(clock, normally, 0.08, 0.45)}>
          <ShieldCheck size={330} check={clock.p(normally, 0.5)} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  46 · « tes comptes ou »                                                    */
/* -------------------------------------------------------------------------- */
export const Beat46: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const accounts = clock.at("comptes");
  const on = lit(clock, accounts, 0.15) > 0.5;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={158} y={150} w={620} h={360} scale={punch(clock, accounts, 0.06, 0.4)}>
          <Card w={620} h={360} active={on}>
            <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
              <PersonIcon size={200} on={on} />
              <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
                <Skeleton w={240} h={30} />
                <Skeleton w={170} h={30} />
              </div>
            </div>
          </Card>
        </At>
        <At x={690} y={90} w={140} h={140}>
          <ShieldCheck size={140} />
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  47 · « tes photos. »                                                       */
/* -------------------------------------------------------------------------- */
export const Beat47: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const photos = clock.at("photos");
  const on = lit(clock, photos, 0.15) > 0.5;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {[-9, 0, 9].map((rotate, index) => (
          <At key={index} x={30 + index * 288} y={230 + (index === 1 ? 20 : 0)} w={300} h={252} rotate={rotate}>
            <PicFrame w={300} on={on && index === 1} />
          </At>
        ))}
        <At x={383} y={20} w={170} h={170} scale={punch(clock, photos, 0.2, 0.45)}>
          <Disc size={170} color={on ? colors.accent : withAlpha(colors.ink, 0.88)}>
            <LibIcon id="web-heart" size={100} color={colors.inkInverse} />
          </Disc>
        </At>
        <Burst x={468} y={105} radius={190} progress={clock.p(photos, 0.7)} rays={8} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  48 · « La prochaine fois »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat48: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const next = clock.at("prochaine");
  const on = lit(clock, next, 0.1) > 0.5;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={168} y={50} w={600} h={552} scale={punch(clock, next, 0.05, 0.45)}>
          <Calendar w={600} day={on ? 10 : -1} today={9} />
        </At>
        <Sparkle x={800} y={140} size={80} progress={clock.p(next, 0.9)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  49 · « qu'on te dit »                                                      */
/* -------------------------------------------------------------------------- */
export const Beat49: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <SayArt clock={clock} whoAt={clock.at("on")} sayAt={clock.at("dit")} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  50 · « vide ton cache, »                                                   */
/* -------------------------------------------------------------------------- */
export const Beat50: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const empty = clock.at("vide");
  const cache = clock.at("cache");
  const done = lit(clock, cache, 0.12) > 0.5;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={100} y={20} w={340} h={600} scale={punch(clock, empty, 0.05, 0.4)}>
          <MsgPhone w={340} h={600} hot={lit(clock, empty, 0.2) > 0.5} />
        </At>
        <At x={520} y={150} w={320} h={320} scale={punch(clock, cache, 0.18, 0.45)}>
          {done ? (
            <Disc size={320}>
              <CheckMark size={210} progress={clock.p(cache, 0.3)} color={colors.inkInverse} />
            </Disc>
          ) : (
            <Disc size={320} sign="?" />
          )}
        </At>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  51 · « tu sauras de quoi on parle ! »                                      */
/* -------------------------------------------------------------------------- */
export const Beat51: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const know = clock.at("sauras");
  const talk = clock.at("parle");

  return (
    <Shot scene={scene} layout="stack-left">
      <Art w={936} h={480}>
        <At x={288} y={60} w={360} h={360} scale={punch(clock, talk, 0.12, 0.5)}>
          <Disc size={360}>
            <CheckMark size={230} progress={clock.p(know, 0.5)} color={colors.inkInverse} />
          </Disc>
        </At>
        <Burst x={468} y={240} radius={220} progress={clock.p(talk, 0.8)} rays={12} />
        <Sparkle x={110} y={110} size={84} progress={clock.p(talk, 0.9)} color={colors.accent} />
        <Sparkle x={830} y={90} size={84} progress={clock.p(talk + 0.08, 0.9)} />
        <Sparkle x={150} y={400} size={72} progress={clock.p(talk + 0.16, 0.9)} />
        <Sparkle x={800} y={400} size={72} progress={clock.p(talk + 0.12, 0.9)} color={colors.accent} />
      </Art>
      <ZoneMascot scene={scene} pose="happy" attitude="excited" mirrored from={know - 0.1} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  52 · « Mais dis-moi, »                                                     */
/* -------------------------------------------------------------------------- */
export const Beat52: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const tell = clock.at("dis-moi");

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={720}>
        <At x={36} y={60} w={440} h={280} scale={punch(clock, tell, 0.06, 0.4)}>
          <ChoiceCard w={440} h={280}>
            <ChoiceLabel on={false}>DÉJÀ</ChoiceLabel>
          </ChoiceCard>
        </At>
        <At x={36} y={380} w={440} h={280} scale={punch(clock, tell + 0.1, 0.06, 0.4)}>
          <ChoiceCard w={440} h={280}>
            <ChoiceLabel on={false} size={76}>
              NOUVEAU
            </ChoiceLabel>
          </ChoiceCard>
        </At>
      </Art>
      <ZoneMascot scene={scene} pose="point" attitude="confident" from={tell - 0.1} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  53 · « tu le savais déjà »                                                 */
/* -------------------------------------------------------------------------- */
export const Beat53: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const already = clock.at("déjà");
  const on = lit(clock, already, 0.15) > 0.5;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={40} y={160} w={400} h={320} scale={punch(clock, already, 0.1, 0.45)}>
          <ChoiceCard w={400} h={320} on={on}>
            <ChoiceLabel on={on}>DÉJÀ</ChoiceLabel>
          </ChoiceCard>
        </At>
        <At x={496} y={160} w={400} h={320}>
          <ChoiceCard w={400} h={320}>
            <ChoiceLabel on={false} size={70}>
              NOUVEAU
            </ChoiceLabel>
          </ChoiceCard>
        </At>
        <Sparkle x={240} y={110} size={72} progress={clock.p(already, 0.9)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  54 · « ou tu viens de le découvrir ? »                                     */
/* -------------------------------------------------------------------------- */
export const Beat54: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const discover = clock.at("découvrir");
  const on = lit(clock, discover, 0.15) > 0.5;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <At x={40} y={190} w={400} h={320}>
          <ChoiceCard w={400} h={320}>
            <ChoiceLabel on={false}>DÉJÀ</ChoiceLabel>
          </ChoiceCard>
        </At>
        <At x={496} y={190} w={400} h={320} scale={punch(clock, discover, 0.1, 0.5)}>
          <ChoiceCard w={400} h={320} on={on}>
            <ChoiceLabel on={on} size={70}>
              NOUVEAU
            </ChoiceLabel>
          </ChoiceCard>
        </At>
        <At x={750} y={60} w={130} h={130} scale={punch(clock, discover, 0.2, 0.5)}>
          <Disc size={130}>
            <LibIcon id="web-message-circle" size={76} color={colors.inkInverse} />
          </Disc>
        </At>
        <Sparkle x={880} y={470} size={72} progress={clock.p(discover + 0.05, 0.9)} color={colors.accent} />
        <Sparkle x={560} y={140} size={76} progress={clock.p(discover + 0.1, 0.9)} />
      </Art>
    </Shot>
  );
};
