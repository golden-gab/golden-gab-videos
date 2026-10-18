/**
 * Scènes 1 à 16 — Web Story « C'est quoi un site web »
 *
 * Bloc 1 : hook et promesse, site vs application web (1 à 9)
 * Bloc 2 : l'application web sur le téléphone puis dans le navigateur (10 à 16)
 *
 * Règles de la série : un message par plan, 3 mots maximum à l'écran, tout est
 * visible dès le début du plan (un mot prononcé déclenche une *réaction*, pas
 * l'apparition), et chaque plan déclare son gabarit de zones : la mascotte,
 * l'illustration et les captions ne se recouvrent jamais.
 */

import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

import { BrandText } from "../../../../../components/common/BrandText";
import {
  abs,
  Art,
  BrowserFrame,
  LibIcon,
  lit,
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
  Bubble,
  Card,
  Gear,
  ModeCard,
  PhoneHome,
  Pill,
  Shot,
  Skeleton,
} from "../../../kit";
import { siteWebTranscript } from "../data/transcript.ts";

type BeatProps = { readonly scene: Scene };

const useClock = (scene: Scene) => useWordClock(scene, siteWebTranscript);

/** Gros « ? » corail. */
const Question: React.FC<{ readonly size: number }> = ({ size }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.pill,
      backgroundColor: colors.accent,
      boxShadow: `0 20px 50px ${withAlpha(colors.accent, 0.5)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <BrandText role="display" color={colors.inkInverse} style={{ fontSize: size * 0.78, lineHeight: 1 }}>
      ?
    </BrandText>
  </div>
);

/** Page de site : bandeau + blocs fantômes. */
const PageBody: React.FC<{ readonly fill?: number }> = ({ fill = 1 }) => (
  <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 26 }}>
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <div style={{ width: 100, height: 100, borderRadius: radius.pill, backgroundColor: colors.accent }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Skeleton w={340} h={28} />
        <Skeleton w={240} h={22} />
      </div>
    </div>
    <Skeleton w="100%" h={110} style={{ borderRadius: radius.md, opacity: fill }} />
    <Skeleton w="75%" h={24} />
  </div>
);

/* -------------------------------------------------------------------------- */
/*  01 · « C'est quoi un site web ? »                                          */
/* -------------------------------------------------------------------------- */
export const Beat01: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("web", 0);
  const hit = punch(clock, t, 0.2, 0.45);
  const ring = clock.p(t, 0.6);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={abs(38, 40, 860, 560)}>
          <BrowserFrame width={860} height={560} address="nom-du-site" secure tone="dark">
            <PageBody />
          </BrowserFrame>
        </div>
        <div style={{ ...abs(468 - 150, 190, 300, 300), transform: `scale(${hit})` }}>
          <Question size={300} />
        </div>
        <Shockwave x={468} y={340} size={300} progress={ring} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  02 · « On m'a déjà posé cette question »                                   */
/* -------------------------------------------------------------------------- */
const AskBubble: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly on: number;
  readonly hot?: boolean;
}> = ({ x, y, on, hot = false }) => (
  <div
    style={{
      ...abs(x, y, 400, 190),
      borderRadius: radius.lg,
      backgroundColor: hot ? colors.accent : withAlpha(colors.ink, 0.85),
      border: `${strokeWidths.thick}px solid ${hot ? withAlpha(colors.inkInverse, 0.5) : withAlpha(colors.inkInverse, 0.3)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.3 + 0.7 * on,
      transform: `scale(${0.9 + 0.1 * on})`,
    }}
  >
    <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 150, lineHeight: 1 }}>
      ?
    </BrandText>
  </div>
);

export const Beat02: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <AskBubble x={0} y={0} on={lit(clock, 0, 0.2)} />
        <AskBubble x={536} y={220} on={lit(clock, clock.at("posé", 0), 0.2)} />
        <AskBubble x={60} y={440} on={lit(clock, clock.at("question", 0), 0.2)} hot />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  03 · « plusieurs fois, c'est tellement même déjà demandé »                  */
/* -------------------------------------------------------------------------- */
export const Beat03: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const total = 15;

  return (
    <Shot scene={scene} layout="stack-right">
      <Art w={936} h={510}>
        {Array.from({ length: total }, (_, index) => {
          const on = lit(clock, (index / total) * 1.7, 0.18);
          const col = index % 5;
          const row = Math.floor(index / 5);

          return (
            <div
              key={index}
              style={{
                ...abs(col * 190 + 6, row * 165, 150, 140),
                borderRadius: radius.lg,
                backgroundColor: index % 4 === 0 ? colors.accent : withAlpha(colors.ink, 0.85),
                border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.3)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.2 + 0.8 * on,
                transform: `scale(${0.8 + 0.2 * on})`,
              }}
            >
              <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 100, lineHeight: 1 }}>
                ?
              </BrandText>
            </div>
          );
        })}
      </Art>
      <ZoneMascot scene={scene} pose="surprised" attitude="surprised" from={clock.at("tellement", 0)} halo="accent" />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  04 · « comment est-ce que ça fonctionne, »                                  */
/* -------------------------------------------------------------------------- */
export const Beat04: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const open = clock.p(clock.at("fonctionne", 0), 0.5);
  const spin = frame * 3;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(168, 200, 600, 420), borderRadius: radius.lg, backgroundColor: withAlpha(colors.ink, 0.92), border: `${strokeWidths.thick}px solid ${colors.accent}`, overflow: "hidden", boxShadow: `0 24px 60px ${withAlpha(colors.ink, 0.5)}` }}>
          <div style={{ ...abs(0, 0, 600, 420), display: "flex", alignItems: "center", justifyContent: "center", gap: 20, opacity: open }}>
            <Gear size={200} angle={spin} />
            <Gear size={150} angle={-spin * 1.3 + 20} color={colors.inkInverse} />
          </div>
        </div>
        <div
          style={{
            ...abs(150, 120, 636, 120),
            borderRadius: radius.md,
            backgroundColor: colors.accent,
            transformOrigin: "0% 100%",
            transform: `translateY(${-open * 40}px) rotate(${-open * 38}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 14px 36px ${withAlpha(colors.ink, 0.4)}`,
          }}
        >
          <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 96, lineHeight: 1, opacity: 1 - open }}>
            ?
          </BrandText>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  05 · « aujourd'hui, je vais essayer de vous expliquer ça simplement. »      */
/* -------------------------------------------------------------------------- */
export const Beat05: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const tidy = clock.p(clock.at("simplement", 0), 0.5);
  const amp = (1 - tidy) * 130;
  const points: string[] = [];

  for (let y = 0; y <= 760; y += 20) {
    points.push(`${256 + Math.sin(y / 38) * amp + Math.sin(y / 17) * amp * 0.4},${y + 40}`);
  }

  return (
    <Shot scene={scene} layout="side-right">
      <Art w={512} h={860}>
        <svg width={512} height={860} aria-hidden="true">
          <polyline points={points.join(" ")} fill="none" stroke={colors.accent} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ ...abs(0, 790, 512, 90), display: "flex", justifyContent: "center", opacity: tidy }}>
          <Pill size={64}>Simple</Pill>
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="explaining" attitude="friendly" mirrored from={clock.at("je", 0)} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  06 · « Déjà, il faut faire une différence »                                 */
/* -------------------------------------------------------------------------- */
const NotEqualBig: React.FC<{ readonly size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M22 38 H78 M22 62 H78 M62 18 L38 82" fill="none" stroke={colors.accent} strokeWidth={10} strokeLinecap="round" />
  </svg>
);

export const Beat06: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("différence", 0);
  const hit = punch(clock, t, 0.3, 0.5);
  const ring = clock.p(t, 0.6);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(468 - 260, 40, 520, 520), transform: `scale(${hit})`, filter: `drop-shadow(0 0 ${40 * lit(clock, t, 0.3)}px ${colors.accent})` }}>
          <NotEqualBig size={520} />
        </div>
        <Shockwave x={468} y={300} size={420} progress={ring} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  07 · « ce qu'est un site et ce qu'est une application web » (captions center) */
/* -------------------------------------------------------------------------- */
export const Beat07: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const site = lit(clock, clock.at("site", 0), 0.2);
  const app = lit(clock, clock.at("application", 0), 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={440}>
        <ModeCard w={440} h={420} label="Site" icon="web-globe" active={site > 0.5} dim={0.35 + 0.65 * site} style={{ position: "absolute", left: 0, top: 10 }} />
        <ModeCard w={440} h={420} label="Appli web" icon="web-pointer-click" active={app > 0.5} dim={0.35 + 0.65 * app} style={{ position: "absolute", left: 496, top: 10 }} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  08 · « parce que les gens confondent les deux, »                            */
/* -------------------------------------------------------------------------- */
export const Beat08: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const swap = clock.p(clock.at("confondent", 0), 0.6);
  const shift = interpolate(swap, [0, 1], [0, 340]);

  return (
    <Shot scene={scene} layout="side-left">
      <Art w={512} h={720}>
        <ModeCard w={480} h={320} label="Site" icon="web-globe" active style={{ position: "absolute", left: 16, top: 20 + shift }} />
        <ModeCard w={480} h={320} label="Appli web" icon="web-pointer-click" style={{ position: "absolute", left: 16, top: 380 - shift }} />
      </Art>
      <ZoneMascot scene={scene} pose="thinking" attitude="curious" mirrored from={clock.at("confondent", 0)} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  09 · « commençant par l'application web. »                                  */
/* -------------------------------------------------------------------------- */
export const Beat09: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const out = clock.p(0, 0.5);
  const ring = lit(clock, clock.at("l'application", 0), 0.4);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={620}>
        <ModeCard w={480} h={460} label="Site" icon="web-globe" dim={1 - out} style={{ position: "absolute", left: interpolate(out, [0, 1], [0, -520]), top: 60 }} />
        <ModeCard
          w={560}
          h={500}
          label="Appli web"
          icon="web-pointer-click"
          active
          style={{
            position: "absolute",
            left: interpolate(out, [0, 1], [496, 188]),
            top: interpolate(out, [0, 1], [80, 40]),
            boxShadow: `0 0 0 ${14 * ring}px ${withAlpha(colors.accent, 0.5 * ring)}, 0 24px 60px ${withAlpha(colors.accent, 0.4)}`,
          }}
        />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  10 · « Imaginez des applications comme WhatsApp, »                          */
/* -------------------------------------------------------------------------- */
export const Beat10: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const wa = lit(clock, clock.at("WhatsApp", 0), 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={520} h={740} enter="slide-up">
        <PhoneHome
          width={520}
          height={740}
          tiles={[
            { icon: "web-message-circle", label: "WhatsApp", on: wa },
            { icon: "web-globe", label: "", on: 0 },
            { icon: "web-play", label: "", on: 0 },
          ]}
        />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  11 · « Facebook ou YouTube qui sont sur votre téléphone, »                  */
/* -------------------------------------------------------------------------- */
export const Beat11: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={520} h={740}>
        <PhoneHome
          width={520}
          height={740}
          tiles={[
            { icon: "web-message-circle", label: "WhatsApp", on: 1 },
            { icon: "web-users", label: "Facebook", on: lit(clock, 0, 0.2) },
            { icon: "web-play", label: "YouTube", on: lit(clock, clock.at("YouTube", 0), 0.2) },
          ]}
        />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  12 · « vous les utilisez chaque jour pour faire tout un tas de choses, »    */
/* -------------------------------------------------------------------------- */
export const Beat12: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const tap = clock.p(clock.at("utilisez", 0), 0.6);
  const cursorX = interpolate(tap, [0, 0.5, 1], [420, 150, 260]);
  const cursorY = interpolate(tap, [0, 0.5, 1], [620, 230, 230]);
  const badges = lit(clock, clock.at("jour", 0), 0.3);

  return (
    <Shot scene={scene} layout="art">
      <Art w={520} h={760}>
        <PhoneHome
          width={520}
          height={740}
          tiles={[
            { icon: "web-message-circle", label: "WhatsApp", on: 1 },
            { icon: "web-users", label: "Facebook", on: 1 },
            { icon: "web-play", label: "YouTube", on: 1 },
          ]}
        />
        <div style={{ ...abs(150, 130, 36, 36), borderRadius: radius.pill, backgroundColor: colors.accent, transform: `scale(${badges})`, border: `4px solid ${colors.inkInverse}` }} />
        <div style={{ ...abs(300, 130, 36, 36), borderRadius: radius.pill, backgroundColor: colors.accent, transform: `scale(${badges})`, border: `4px solid ${colors.inkInverse}` }} />
        <div style={abs(cursorX, cursorY, 110, 110)}>
          <LibIcon id="web-pointer-click" size={110} color={colors.inkInverse} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  13 · « envoyer des messages, publier du contenu ou regarder des vidéos. »   */
/* -------------------------------------------------------------------------- */
const ActionRow: React.FC<{
  readonly icon: string;
  readonly label: string;
  readonly on: number;
}> = ({ icon, label, on }) => (
  <Card w={860} h={190} active={on > 0.5} dim={0.35 + 0.65 * on} style={{ flexDirection: "row", justifyContent: "flex-start", gap: 40, paddingLeft: 60 }}>
    <Bubble size={120} active={on > 0.5}>
      <LibIcon id={icon} size={68} color={colors.inkInverse} />
    </Bubble>
    <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 80, lineHeight: 1 }}>
      {label}
    </BrandText>
  </Card>
);

export const Beat13: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(38, 0, 860, 190)}>
          <ActionRow icon="web-message-circle" label="Envoyer" on={lit(clock, 0, 0.2)} />
        </div>
        <div style={abs(38, 225, 860, 190)}>
          <ActionRow icon="web-newspaper" label="Publier" on={lit(clock, clock.at("publier", 0), 0.2)} />
        </div>
        <div style={abs(38, 450, 860, 190)}>
          <ActionRow icon="web-play" label="Regarder" on={lit(clock, clock.at("regarder", 0), 0.2)} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  14 · « Mais ces services ont aussi une version web, »                       */
/* -------------------------------------------------------------------------- */
export const Beat14: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("web", 0);
  const pill = punch(clock, t, 0.2, 0.45);
  const slide = clock.p(0, 0.4);

  return (
    <Shot scene={scene} layout="stack-left">
      <Art w={936} h={510}>
        <div style={{ ...abs(0, 0, 260, 460), transform: `translateX(${interpolate(slide, [0, 1], [180, 0])}px)` }}>
          <PhoneHome width={260} height={460} tiles={[]} />
        </div>
        <div style={{ ...abs(316, 30, 620, 420), opacity: slide, transform: `translateX(${interpolate(slide, [0, 1], [300, 0])}px)` }}>
          <BrowserFrame width={620} height={420} address="nom-du-site" secure tone="dark">
            <PageBody />
          </BrowserFrame>
        </div>
        <div style={{ ...abs(520, -20, 330, 90), transform: `scale(${pill})` }}>
          <Pill size={52}>Version web</Pill>
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="surprised" attitude="surprised" mirrored from={0} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  15 · « c'est-à-dire accessible depuis un navigateur »                       */
/* -------------------------------------------------------------------------- */
export const Beat15: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const page = lit(clock, clock.at("accessible", 0), 0.3);
  const label = lit(clock, clock.at("navigateur", 0), 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={abs(38, 0, 860, 540)}>
          <BrowserFrame width={860} height={540} address="nom-du-site" secure tone="dark">
            <div style={{ opacity: 0.15 + 0.85 * page }}>
              <PageBody />
            </div>
          </BrowserFrame>
        </div>
        <div style={{ ...abs(0, 580, 936, 110), display: "flex", justifyContent: "center", opacity: 0.4 + 0.6 * label }}>
          <Pill size={72}>Navigateur</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  16 · « comme Chrome par exemple, »                                          */
/* -------------------------------------------------------------------------- */
export const Beat16: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const chrome = lit(clock, clock.at("Chrome", 0), 0.2);
  const pop = punch(clock, clock.at("Chrome", 0), 0.15, 0.4);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={560}>
        <div style={{ ...abs(38, 0, 860, 90), display: "flex", gap: 20 }}>
          {[0, 1, 2].map((tab) => (
            <div key={tab} style={{ flex: 1, height: 90, borderRadius: `${radius.md}px ${radius.md}px 0 0`, backgroundColor: tab === 0 ? withAlpha(colors.inkInverse, 0.22) : withAlpha(colors.ink, 0.85), border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.3)}`, display: "flex", alignItems: "center", padding: "0 28px" }}>
              <Skeleton w="70%" h={20} />
            </div>
          ))}
        </div>
        <div style={{ ...abs(0, 160, 936, 300), display: "flex", justifyContent: "center", alignItems: "center", gap: 36, transform: `scale(${pop})`, opacity: 0.35 + 0.65 * chrome }}>
          <LibIcon id="web-globe" size={200} color={colors.accent} />
          <Pill size={96}>Chrome</Pill>
        </div>
        <Sparkle x={150} y={330} size={70} progress={chrome} />
      </Art>
    </Shot>
  );
};
