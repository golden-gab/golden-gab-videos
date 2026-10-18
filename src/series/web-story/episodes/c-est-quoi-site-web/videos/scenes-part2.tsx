/**
 * Scènes 17 à 32 — Web Story « C'est quoi un site web »
 *
 * Bloc 2 (fin) : on n'installe rien (17-18)
 * Bloc 3 : les actions d'une application web (19-24), puis le site web (25-28)
 * Bloc 4 (début) : exemples de sites et visiteurs (29-32)
 */

import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

import { BrandText } from "../../../../../components/common/BrandText";
import {
  abs,
  Art,
  BrowserFrame,
  Icon,
  LibIcon,
  lit,
  PhoneMock,
  punch,
  Shockwave,
  Sparkle,
  useWordClock,
  ZoneMascot,
} from "../../../../../components/motion";
import { colors, radius, strokeWidths } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import {
  Arrow,
  Bubble,
  Card,
  CheckMark,
  Forbidden,
  Lines,
  ModeCard,
  Pill,
  Shot,
  Skeleton,
} from "../../../kit";
import { siteWebTranscript } from "../data/transcript.ts";

type BeatProps = { readonly scene: Scene };

const useClock = (scene: Scene) => useWordClock(scene, siteWebTranscript);

/* -------------------------------------------------------------------------- */
/*  17 · « on n'a pas besoin d'installer »                                      */
/* -------------------------------------------------------------------------- */
export const Beat17: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("d'installer", 0);
  const ban = clock.p(t, 0.5, (x) => x);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(468 - 210, 30, 420, 420), display: "flex", alignItems: "center", justifyContent: "center", opacity: 1 - 0.5 * ban }}>
          <LibIcon id="web-download" size={340} color={colors.inkInverse} />
        </div>
        <div style={abs(468 - 210, 30, 420, 420)}>
          <Forbidden size={420} progress={ban} />
        </div>
        <div style={{ ...abs(0, 500, 936, 120), display: "flex", justifyContent: "center", opacity: lit(clock, t, 0.2) }}>
          <Pill size={80}>Rien à installer</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  18 · « l'application web sur son téléphone. »                               */
/* -------------------------------------------------------------------------- */
export const Beat18: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const dashed = lit(clock, clock.at("sur", 0), 0.25);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(0, 40, 300, 560), outline: `8px dashed ${withAlpha(colors.accent, dashed)}`, outlineOffset: 14, borderRadius: radius.xl }}>
          <PhoneMock width={300} height={560}>
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ opacity: dashed }}>
                <Icon kind="check" size={0} color={colors.accent} />
              </div>
              <div style={{ width: 110, height: 110, borderRadius: radius.lg, border: `8px dashed ${withAlpha(colors.inkInverse, 0.5)}` }} />
            </div>
          </PhoneMock>
        </div>
        <div style={{ ...abs(350, 90, 586, 460), opacity: lit(clock, clock.at("web", 0), 0.3) }}>
          <BrowserFrame width={586} height={460} address="nom-du-site" secure tone="dark">
            <div style={{ padding: 30, display: "flex", flexDirection: "column", gap: 22 }}>
              <Skeleton w="60%" h={26} />
              <div style={{ display: "flex", gap: 16 }}>
                {[0, 1, 2].map((tile) => (
                  <div key={tile} style={{ flex: 1, height: 130, borderRadius: radius.md, backgroundColor: tile === 1 ? colors.accent : withAlpha(colors.inkInverse, 0.2) }} />
                ))}
              </div>
              <Skeleton w="80%" h={22} />
            </div>
          </BrowserFrame>
        </div>
        <div style={{ ...abs(0, 620, 300, 70), display: "flex", justifyContent: "center" }}>
          <Pill size={44} tone="ghost">
            Pas installée
          </Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  19 · « La particularité de ce type d'application, c'est qu'elle permet »    */
/* -------------------------------------------------------------------------- */
export const Beat19: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const star = lit(clock, clock.at("particularité", 0), 0.4);
  const word = lit(clock, clock.at("permet", 0), 0.2);

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={760}>
        <ModeCard w={480} h={420} label="Appli web" icon="web-pointer-click" active style={{ position: "absolute", left: 16, top: 60 }} />
        <Sparkle x={60} y={50} size={90} progress={star} />
        <Sparkle x={460} y={30} size={70} progress={Math.min(1, star * 1.3)} color={colors.accent} />
        <div style={{ ...abs(0, 560, 512, 110), display: "flex", justifyContent: "center", opacity: word }}>
          <Pill size={72}>Actions</Pill>
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="explaining" attitude="friendly" mirrored from={0} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  20 · « généralement l'utilisateur d'effectuer des actions »                 */
/* -------------------------------------------------------------------------- */
export const Beat20: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const buttons = [
    lit(clock, clock.at("d'effectuer", 0), 0.2),
    lit(clock, clock.at("des", 0), 0.2),
    lit(clock, clock.at("actions", 0), 0.2),
  ];
  const icons = ["web-message-circle", "web-play", "web-credit-card"];
  const cursor = clock.p(clock.at("d'effectuer", 0), 1.0, (x) => x);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={abs(0, 240, 280, 280)}>
          <Bubble size={280}>
            <Icon kind="user" size={170} color={colors.inkInverse} strokeWidth={3} />
          </Bubble>
        </div>
        {buttons.map((on, index) => (
          <div key={index} style={{ ...abs(420, index * 250, 516, 220), borderRadius: radius.lg, backgroundColor: on > 0.5 ? colors.accent : withAlpha(colors.ink, 0.85), border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.4)}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.3 + 0.7 * on, transform: `scale(${0.92 + 0.08 * on})` }}>
            <LibIcon id={icons[index]} size={110} color={colors.inkInverse} />
          </div>
        ))}
        <div style={abs(interpolate(cursor, [0, 1], [300, 760]), interpolate(cursor, [0, 1], [380, 560]), 110, 110)}>
          <LibIcon id="web-pointer-click" size={110} color={colors.inkInverse} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  21 · « d'interagir avec les systèmes, »                                     */
/* -------------------------------------------------------------------------- */
export const Beat21: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const go = clock.p(clock.at("avec", 0), 0.35, (x) => x);
  const back = clock.p(clock.at("systèmes", 0), 0.35, (x) => x);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(0, 180, 240, 240)}>
          <Bubble size={240}>
            <Icon kind="user" size={140} color={colors.inkInverse} />
          </Bubble>
        </div>
        <div style={abs(696, 40, 240, 520)}>
          <Card w={240} h={520} dim={1} style={{ gap: 26 }}>
            {[0, 1, 2].map((box) => (
              <div key={box} style={{ width: 160, height: 100, borderRadius: radius.md, backgroundColor: box === 1 ? colors.accent : withAlpha(colors.inkInverse, 0.25) }} />
            ))}
          </Card>
        </div>
        <svg width={936} height={640} style={{ position: "absolute", left: 0, top: 0 }} aria-hidden="true">
          <Arrow x1={270} y1={240} x2={660} y2={240} progress={go} />
          <Arrow x1={660} y1={360} x2={270} y2={360} progress={back} color={colors.inkInverse} />
        </svg>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  22 · « par exemple en créant un compte, en se connectant, »                 */
/* -------------------------------------------------------------------------- */
export const Beat22: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const f1 = clock.p(clock.at("créant", 0), 0.4, (x) => x);
  const f2 = clock.p(clock.at("compte,", 0), 0.4, (x) => x);
  const done = lit(clock, clock.at("connectant,", 0), 0.25);
  const hit = punch(clock, clock.at("connectant,", 0), 0.1, 0.4);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <Card w={720} h={640} active={done > 0.5} style={{ position: "absolute", left: 108, top: 20, gap: 36, transform: `scale(${hit})` }}>
          <Bubble size={120}>
            <LibIcon id="web-user-plus" size={70} color={colors.inkInverse} />
          </Bubble>
          {[f1, f2].map((fill, index) => (
            <div key={index} style={{ width: 560, height: 70, borderRadius: radius.md, backgroundColor: withAlpha(colors.inkInverse, 0.15), border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.35)}`, overflow: "hidden" }}>
              <div style={{ width: `${fill * 100}%`, height: "100%", backgroundColor: withAlpha(colors.accent, 0.8) }} />
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Pill size={56} tone={done > 0.5 ? "accent" : "ghost"}>
              Connexion
            </Pill>
            <CheckMark size={80} progress={done} />
          </div>
        </Card>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  23 · « envoyer des messages, » — dans le navigateur                         */
/* -------------------------------------------------------------------------- */
export const Beat23: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("messages,", 0);
  const hit = punch(clock, t, 0.1, 0.4);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={600}>
        <div style={abs(38, 0, 860, 560)}>
          <BrowserFrame width={860} height={560} address="nom-du-site" secure tone="dark">
            <div style={{ padding: 60, display: "flex", justifyContent: "center", paddingTop: 110 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 40, padding: "30px 60px", borderRadius: radius.lg, backgroundColor: colors.accent, transform: `scale(${hit})`, boxShadow: `0 20px 50px ${withAlpha(colors.accent, 0.5)}` }}>
                <LibIcon id="web-message-circle" size={120} color={colors.inkInverse} />
                <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 84, lineHeight: 1 }}>
                  Message
                </BrandText>
              </div>
            </div>
          </BrowserFrame>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  24 · « publier des vidéos ou effectuer un achat. »                          */
/* -------------------------------------------------------------------------- */
export const Beat24: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const video = lit(clock, 0, 0.2);
  const buy = lit(clock, clock.at("achat.", 0), 0.25);
  const drop = clock.p(clock.at("effectuer", 0), 0.8);
  const ring = clock.p(clock.at("achat.", 0), 0.6);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={620}>
        <Card w={400} h={460} active={video > 0.5} dim={0.5 + 0.5 * video} style={{ position: "absolute", left: 0, top: 80 }}>
          <LibIcon id="web-play" size={190} color={colors.accent} />
          <Pill size={52}>Vidéo</Pill>
        </Card>
        <Card w={400} h={460} active={buy > 0.5} dim={0.5 + 0.5 * Math.max(drop, buy)} style={{ position: "absolute", left: 536, top: 80 }}>
          <Icon kind="cart" size={190} color={colors.accent} />
          <Pill size={52}>Achat</Pill>
        </Card>
        <div style={{ ...abs(626, interpolate(drop, [0, 1], [-60, 120]), 90, 90), opacity: drop * (1 - buy) }}>
          <Icon kind="box" size={90} color={colors.inkInverse} />
        </div>
        <div style={abs(700, 30, 140, 140)}>
          <CheckMark size={140} progress={buy} />
        </div>
        <Shockwave x={736} y={310} size={300} progress={ring} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  25 · « Maintenant, c'est quoi un site web ? »                               */
/* -------------------------------------------------------------------------- */
export const Beat25: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const flip = clock.p(0, 0.5);
  const q = clock.at("web?", 0);
  const hit = punch(clock, q, 0.2, 0.45);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(38, 40, 860, 560), transform: `perspective(1400px) rotateY(${interpolate(flip, [0, 1], [90, 0])}deg)` }}>
          <BrowserFrame width={860} height={560} address="nom-du-site" secure tone="dark">
            <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 28 }}>
              <Skeleton w="50%" h={32} />
              <Skeleton w="100%" h={120} style={{ borderRadius: radius.md }} />
              <Lines fill={1} w={560} />
            </div>
          </BrowserFrame>
        </div>
        <div style={{ ...abs(660, 0, 220, 220), transform: `scale(${hit})`, opacity: lit(clock, clock.at("site", 0), 0.2) }}>
          <BrandText role="display" color={colors.inkInverse} style={{ display: "none" }}>
            ?
          </BrandText>
          <div style={{ width: 220, height: 220, borderRadius: radius.pill, backgroundColor: colors.accent, boxShadow: `0 20px 50px ${withAlpha(colors.accent, 0.5)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 170, lineHeight: 1 }}>
              ?
            </BrandText>
          </div>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  26 · « Un site web a généralement pour objectif principal »                 */
/* -------------------------------------------------------------------------- */
export const Beat26: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const drop = clock.p(clock.at("objectif", 0), 0.5);
  const spin = (frame % 90) / 90;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={abs(38, 0, 860, 540)}>
          <BrowserFrame width={860} height={540} address="nom-du-site" secure tone="dark">
            <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 26 }}>
              <Skeleton w="45%" h={32} style={{ opacity: lit(clock, 0, 0.2) }} />
              <Skeleton w="100%" h={120} style={{ borderRadius: radius.md, opacity: lit(clock, clock.at("a", 0), 0.3) }} />
              <div style={{ opacity: lit(clock, clock.at("pour", 0), 0.3) }}>
                <Lines fill={1} w={560} />
              </div>
            </div>
          </BrowserFrame>
        </div>
        <svg width={260} height={260} viewBox="0 0 100 100" style={{ position: "absolute", left: 600, top: interpolate(drop, [0, 1], [-120, 250]), opacity: drop }} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="none" stroke={colors.accent} strokeWidth={8} />
          <circle cx="50" cy="50" r="28" fill="none" stroke={colors.inkInverse} strokeWidth={8} />
          <circle cx="50" cy="50" r="10" fill={colors.accent} transform={`scale(${1 + 0.1 * Math.sin(spin * Math.PI * 2)})`} style={{ transformOrigin: "50px 50px" }} />
        </svg>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  27 · « de présenter des informations aux visiteurs. »                       */
/* -------------------------------------------------------------------------- */
export const Beat27: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const fill = clock.p(clock.at("informations", 0), 0.7, (x) => x);
  const visit = clock.p(clock.at("visiteurs.", 0), 0.5);

  return (
    <Shot scene={scene} layout="side-left">
      <Art w={512} h={820}>
        <Card w={480} h={560} style={{ position: "absolute", left: 16, top: 40, gap: 32, justifyContent: "flex-start", paddingTop: 50 }}>
          <Skeleton w={300} h={34} />
          <Lines fill={fill} w={380} count={4} />
        </Card>
        {[0, 1, 2].map((index) => (
          <div key={index} style={{ ...abs(40 + index * 150, interpolate(visit, [0, 1], [820, 640]), 120, 120), opacity: visit }}>
            <Bubble size={120} active={index === 1}>
              <Icon kind="user" size={72} color={colors.inkInverse} />
            </Bubble>
          </div>
        ))}
      </Art>
      <ZoneMascot scene={scene} pose="point" attitude="confident" mirrored from={clock.at("présenter", 0)} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  28 · « Par exemple, un site web d'entreprises peut présenter ces »          */
/* -------------------------------------------------------------------------- */
export const Beat28: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("d'entreprises", 0);
  const shop = lit(clock, t, 0.3);
  const hit = punch(clock, t, 0.12, 0.5);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(468 - 250, 10, 500, 500), transform: `scale(${hit})`, opacity: 0.4 + 0.6 * shop }}>
          <Bubble size={500} active={shop > 0.5}>
            <Icon kind="shop" size={310} color={colors.inkInverse} strokeWidth={2.4} />
          </Bubble>
        </div>
        <div style={{ ...abs(0, 550, 936, 120), display: "flex", justifyContent: "center", opacity: shop }}>
          <Pill size={84}>Entreprise</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  29 · « services, ses réalisations, ses tarifs et ses coordonnées. »         */
/* -------------------------------------------------------------------------- */
const SectionRow: React.FC<{
  readonly label: string;
  readonly kind: "box" | "tag" | "cart" | "user" | "calendar";
  readonly on: number;
}> = ({ label, kind, on }) => (
  <Card w={860} h={150} active={on > 0.5} dim={0.3 + 0.7 * on} style={{ flexDirection: "row", justifyContent: "flex-start", gap: 36, paddingLeft: 50 }}>
    <Bubble size={96} active={on > 0.5}>
      <Icon kind={kind} size={58} color={colors.inkInverse} />
    </Bubble>
    <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 68, lineHeight: 1 }}>
      {label}
    </BrandText>
  </Card>
);

export const Beat29: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const rows = [
    { label: "Services", kind: "box" as const, at: 0 },
    { label: "Réalisations", kind: "shop" as never, at: clock.at("réalisations,", 0) },
    { label: "Tarifs", kind: "tag" as const, at: clock.at("tarifs", 0) },
    { label: "Coordonnées", kind: "user" as const, at: clock.at("coordonnées.", 0) },
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        {rows.map((row, index) => (
          <div key={row.label} style={abs(38, index * 175, 860, 150)}>
            <SectionRow label={row.label} kind={row.kind} on={lit(clock, row.at, 0.2)} />
          </div>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  30 · « Un blog peut publier les articles »                                  */
/* -------------------------------------------------------------------------- */
export const Beat30: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const cards = [lit(clock, clock.at("publier", 0), 0.2), lit(clock, clock.at("les", 0), 0.2), lit(clock, clock.at("articles", 0), 0.2)];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(0, 0, 936, 100), display: "flex", justifyContent: "center" }}>
          <Pill size={72}>Blog</Pill>
        </div>
        {cards.map((on, index) => (
          <div key={index} style={{ ...abs(38, 130 + index * 195, 860, 170), borderRadius: radius.lg, backgroundColor: withAlpha(colors.ink, 0.85), border: `${strokeWidths.thick}px solid ${on > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.3)}`, display: "flex", alignItems: "center", gap: 36, padding: "0 36px", opacity: 0.25 + 0.75 * on, transform: `translateY(${(1 - on) * 30}px)` }}>
            <div style={{ width: 130, height: 110, borderRadius: radius.md, backgroundColor: colors.accent, flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Skeleton w={440} h={28} />
              <Skeleton w={320} h={22} />
            </div>
          </div>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  31 · « et un site d'actualité peut partager les dernières informations. »   */
/* -------------------------------------------------------------------------- */
export const Beat31: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const scroll = clock.p(0, clock.duration, (x) => x);
  const offset = interpolate(scroll, [0, 1], [0, -520]);
  const t = clock.at("dernières", 0);
  const hit = punch(clock, t, 0.15, 0.5);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={abs(38, 100, 860, 640)}>
          <Card w={860} h={640} style={{ overflow: "hidden", justifyContent: "flex-start", alignItems: "stretch", gap: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28, padding: 36, transform: `translateY(${offset}px)` }}>
              {Array.from({ length: 9 }, (_, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: 28, height: 110 }}>
                  <div style={{ width: 24, height: 24, borderRadius: radius.pill, backgroundColor: colors.accent, flexShrink: 0 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <Skeleton w={560 - (index % 3) * 80} h={30} />
                    <Skeleton w={380} h={20} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div style={{ ...abs(0, 0, 936, 100), display: "flex", justifyContent: "center", transform: `scale(${hit})` }}>
          <Pill size={72}>Nouveau</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  32 · « L'objectif ici, c'est surtout de permettre aux visiteurs »           */
/* -------------------------------------------------------------------------- */
export const Beat32: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const walk = clock.p(clock.at("permettre", 0), 0.9);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={abs(300, 40, 600, 480)}>
          <BrowserFrame width={600} height={480} address="nom-du-site" secure tone="dark">
            <div style={{ padding: 30, display: "flex", flexDirection: "column", gap: 24 }}>
              <Skeleton w="50%" h={28} />
              <Skeleton w="100%" h={110} style={{ borderRadius: radius.md }} />
              <Lines fill={1} w={400} />
            </div>
          </BrowserFrame>
        </div>
        <div style={abs(interpolate(walk, [0, 1], [-20, 130]), 160, 170, 170)}>
          <Bubble size={170}>
            <Icon kind="user" size={100} color={colors.inkInverse} />
          </Bubble>
        </div>
        <div style={{ ...abs(0, 560, 936, 110), display: "flex", justifyContent: "center", opacity: lit(clock, clock.at("visiteurs", 0), 0.25) }}>
          <Pill size={72}>Visiteurs</Pill>
        </div>
      </Art>
    </Shot>
  );
};
