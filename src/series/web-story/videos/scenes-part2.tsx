/**
 * Scènes 11 à 20 — Web Story « Tu dors déjà »
 * Bloc 2 : ce qu'un site web change (23,86 s à 48,76 s).
 *
 * Mêmes règles que le bloc 1 : peu de texte, tout visible dès le début, les
 * mots déclenchent des réactions, zones sans chevauchement.
 */

import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

import { BrandText } from "../../../components/common/BrandText";
import {
  abs,
  Art,
  BrowserFrame,
  getSceneLane,
  LibIcon,
  lit,
  punch,
  Shockwave,
  Sparkle,
  useWordClock,
  ZoneMascot,
  ZoneStage,
  type ZoneLayout,
} from "../../../components/motion";
import { colors, radius, strokeWidths } from "../../../config";
import type { Scene } from "../../../scenes/types";
import { withAlpha } from "../../../utils/color";
import { webStoryTranscript } from "../data/transcript.ts";
import { Card, CheckMark, CrossMark, Moon, Pill, Skeleton } from "./kit";

type BeatProps = { readonly scene: Scene };

const Shot: React.FC<{
  readonly scene: Scene;
  readonly layout: ZoneLayout;
  readonly children: React.ReactNode;
}> = ({ scene, layout, children }) => (
  <ZoneStage lane={getSceneLane(scene)} layout={layout}>
    {children}
  </ZoneStage>
);

/** Mini page de site : bandeau + blocs fantômes (aucun texte). */
const SitePage: React.FC<{ readonly children?: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 24 }}>{children}</div>
);

/* -------------------------------------------------------------------------- */
/*  11 · 23,86–27,24 s · « …l'un des avantages des sites web »                  */
/* -------------------------------------------------------------------------- */
export const Beat11: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const badge = punch(clock, clock.at("sites", 0), 0.18, 0.5);
  const glow = lit(clock, clock.at("avantages", 0), 0.4);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={720}>
        <div style={abs(38, 0, 860, 520)}>
          <BrowserFrame width={860} height={520} address="ton-activite" secure tone="dark">
            <SitePage>
              <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
                <div style={{ width: 120, height: 120, borderRadius: radius.pill, backgroundColor: colors.accent }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <Skeleton w={380} h={30} />
                  <Skeleton w={260} h={24} />
                </div>
              </div>
              <Skeleton w="100%" h={90} style={{ borderRadius: radius.md }} />
              <Skeleton w="70%" h={26} />
            </SitePage>
          </BrowserFrame>
        </div>
        <div
          style={{
            ...abs(0, 560, 936, 140),
            display: "flex",
            justifyContent: "center",
            transform: `scale(${badge})`,
            filter: `drop-shadow(0 0 ${30 * glow}px ${colors.accent})`,
          }}
        >
          <Pill size={88}>Ouvert 24h/24</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  12 · 27,24–29,55 s · « Tu peux y présenter toute ton entreprise »           */
/* -------------------------------------------------------------------------- */
export const Beat12: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const hit = punch(clock, clock.at("entreprise", 0), 0.06, 0.5);
  const ring = lit(clock, clock.at("entreprise", 0), 0.5);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <div style={{ ...abs(38, 0, 860, 560), transform: `scale(${hit})`, borderRadius: radius.lg, boxShadow: `0 0 0 ${10 * ring}px ${withAlpha(colors.accent, 0.5 * ring)}` }}>
          <BrowserFrame width={860} height={560} address="ton-activite/a-propos" secure tone="dark">
            <SitePage>
              <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
                <div style={{ width: 200, height: 200, borderRadius: radius.pill, backgroundColor: colors.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LibIcon id="web-users" size={110} color={colors.inkInverse} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  <Skeleton w={380} h={34} />
                  <Skeleton w={320} h={26} />
                  <Skeleton w={240} h={26} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                <Skeleton w={240} h={90} style={{ borderRadius: radius.md }} />
                <Skeleton w={240} h={90} style={{ borderRadius: radius.md }} />
              </div>
            </SitePage>
          </BrowserFrame>
        </div>
        <div style={{ ...abs(0, 610, 936, 140), display: "flex", justifyContent: "center" }}>
          <Pill size={80}>Ton entreprise</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  13 · 29,55–31,30 s · « expliquer tes services »                             */
/* -------------------------------------------------------------------------- */
const ServiceCard: React.FC<{ readonly icon: string; readonly on: number }> = ({ icon, on }) => (
  <Card w={280} h={400} active={on > 0.5} dim={0.35 + 0.65 * on} style={{ gap: 36, transform: `scale(${0.94 + 0.06 * on})` }}>
    <LibIcon id={icon} size={150} color={on > 0.5 ? colors.accent : colors.inkInverse} />
    <Skeleton w={170} h={26} />
    <Skeleton w={120} h={22} />
  </Card>
);

export const Beat13: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const a = lit(clock, 0, 0.2);
  const b = lit(clock, clock.at("tes", 0), 0.2);
  const c = lit(clock, clock.at("services", 0), 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={600}>
        <div style={{ ...abs(0, 0, 936, 420), display: "flex", justifyContent: "center", gap: 28 }}>
          <ServiceCard icon="web-globe" on={a} />
          <ServiceCard icon="web-credit-card" on={b} />
          <ServiceCard icon="web-users" on={c} />
        </div>
        <div style={{ ...abs(0, 460, 936, 130), display: "flex", justifyContent: "center" }}>
          <Pill size={84}>Services</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  14 · 31,30–32,76 s · « montrer tes réalisations »                           */
/* -------------------------------------------------------------------------- */
const ProjectTile: React.FC<{ readonly on: number; readonly hue: number }> = ({ on, hue }) => (
  <div
    style={{
      width: 420,
      height: 250,
      borderRadius: radius.lg,
      background: `linear-gradient(${135 + hue * 40}deg, ${withAlpha(colors.accent, 0.9 - hue * 0.25)}, ${withAlpha(colors.secondary, 0.95)})`,
      border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.3)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.3 + 0.7 * on,
      transform: `scale(${0.92 + 0.08 * on})`,
    }}
  >
    <CheckMark size={110} progress={on} color={colors.inkInverse} />
  </div>
);

export const Beat14: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const tiles = [
    lit(clock, 0, 0.2),
    lit(clock, clock.at("tes", 0), 0.2),
    lit(clock, clock.at("réalisations", 0), 0.2),
    lit(clock, clock.at("réalisations", 0) + 0.25, 0.2),
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(18, 0, 900, 540), display: "grid", gridTemplateColumns: "420px 420px", gap: 40, justifyContent: "center" }}>
          {tiles.map((on, index) => (
            <ProjectTile key={index} on={on} hue={index % 2} />
          ))}
        </div>
        <div style={{ ...abs(0, 560, 936, 130), display: "flex", justifyContent: "center" }}>
          <Pill size={84}>Réalisations</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  15 · 32,76–34,73 s · « indiquer comment te contacter »                      */
/* -------------------------------------------------------------------------- */
const ContactRow: React.FC<{
  readonly icon: string;
  readonly label: string;
  readonly on: number;
}> = ({ icon, label, on }) => (
  <Card w={860} h={210} active={on > 0.5} dim={0.35 + 0.65 * on} style={{ flexDirection: "row", gap: 40, justifyContent: "flex-start", paddingLeft: 60 }}>
    <div
      style={{
        width: 130,
        height: 130,
        borderRadius: radius.pill,
        backgroundColor: on > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LibIcon id={icon} size={72} color={colors.inkInverse} />
    </div>
    <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 80, lineHeight: 1 }}>
      {label}
    </BrandText>
  </Card>
);

export const Beat15: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const first = lit(clock, 0, 0.2);
  const second = lit(clock, clock.at("contacter", 0), 0.2);
  const ring = clock.p(clock.at("contacter", 0), 0.6);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={560}>
        <div style={abs(38, 0, 860, 210)}>
          <ContactRow icon="web-message-circle" label="WhatsApp" on={first} />
        </div>
        <div style={abs(38, 270, 860, 210)}>
          <ContactRow icon="web-mail" label="Formulaire" on={second} />
        </div>
        <Shockwave x={170} y={375} size={200} progress={ring} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  16 · 34,73–37,59 s · « même quand tu n'es pas disponible »                  */
/* -------------------------------------------------------------------------- */
export const Beat16: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const away = lit(clock, clock.at("disponible", 0) - 0.4, 0.4);
  const frame = useCurrentFrame();
  const glow = 0.6 + Math.sin(frame / 6) * 0.2;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <Card w={440} h={620} active style={{ position: "absolute", left: 0, top: 40, boxShadow: `0 24px 70px ${withAlpha(colors.accent, glow * 0.6)}` }}>
          <LibIcon id="web-globe" size={190} color={colors.accent} />
          <Pill size={54}>Ouvert</Pill>
        </Card>
        <Card w={440} h={620} dim={1 - 0.6 * away} style={{ position: "absolute", left: 496, top: 40 }}>
          <Moon size={170} color={withAlpha(colors.inkInverse, 0.7)} />
          <Pill size={54} tone="ghost">
            Absent
          </Pill>
        </Card>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  17 · 37,59–39,90 s · « tu es occupé, tu dors, je ne sais pas quoi »         */
/* -------------------------------------------------------------------------- */
export const Beat17: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const rows = [
    { label: "Occupé", at: clock.at("occupé", 0) },
    { label: "Tu dors", at: clock.at("dors", 0) },
    { label: "Je sais pas", at: clock.at("sais", 0) },
  ];

  return (
    <Shot scene={scene} layout="stack-right">
      <Art w={936} h={510}>
        {rows.map((row, index) => {
          const on = lit(clock, row.at - 0.1, 0.2);
          const next = index < rows.length - 1 ? lit(clock, rows[index + 1].at - 0.1, 0.2) : 0;
          const active = on > 0.5 && next < 0.5;

          return (
            <div key={row.label} style={{ ...abs(0, index * 175, 936, 150), display: "flex", justifyContent: "center", opacity: 0.35 + 0.65 * on }}>
              <Pill size={84} tone={active ? "accent" : "dark"} style={{ width: 860 }}>
                {row.label}
              </Pill>
            </div>
          );
        })}
      </Art>
      <ZoneMascot scene={scene} pose="thinking" attitude="friendly" delay={0.1} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  18 · 39,90–43,54 s · « les personnes intéressées peuvent découvrir »        */
/* -------------------------------------------------------------------------- */
export const Beat18: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const scroll = clock.p(0, clock.duration, (x) => x);
  const offset = interpolate(scroll, [0, 1], [0, -340]);
  const cursorX = interpolate(scroll, [0, 0.5, 1], [620, 380, 560]);
  const cursorY = interpolate(scroll, [0, 0.5, 1], [420, 300, 380]);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={abs(38, 20, 860, 660)}>
          <BrowserFrame width={860} height={660} address="ton-activite" secure tone="dark">
            <div style={{ height: 560, overflow: "hidden" }}>
            <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 28, transform: `translateY(${offset}px)` }}>
              {[0, 1, 2, 3].map((row) => (
                <div key={row} style={{ display: "flex", gap: 28, alignItems: "center" }}>
                  <div style={{ width: 200, height: 160, borderRadius: radius.md, backgroundColor: row % 2 === 0 ? withAlpha(colors.accent, 0.85) : withAlpha(colors.inkInverse, 0.22), flexShrink: 0 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <Skeleton w={380} h={30} />
                    <Skeleton w={300} h={24} />
                  </div>
                </div>
              ))}
            </div>
            </div>
          </BrowserFrame>
        </div>
        <div style={abs(cursorX, cursorY, 110, 110)}>
          <LibIcon id="web-pointer-click" size={110} color={colors.inkInverse} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  19 · 43,54–46,47 s · « décider si ce que tu proposes correspond »           */
/* -------------------------------------------------------------------------- */
export const Beat19: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const t = clock.at("correspond", 0);
  const win = lit(clock, t, 0.3);
  const hit = punch(clock, t, 0.1, 0.5);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <Card w={440} h={600} dim={1 - 0.55 * win} style={{ position: "absolute", left: 0, top: 20 }}>
          <CrossMark size={170} color={withAlpha(colors.inkInverse, 0.6)} />
          <Skeleton w={260} h={26} />
          <Skeleton w={180} h={22} />
        </Card>
        <Card w={440} h={600} active={win > 0.5} style={{ position: "absolute", left: 496, top: 20, transform: `scale(${hit})` }}>
          <CheckMark size={190} progress={win} />
          <Skeleton w={260} h={26} tone={win > 0.5 ? "accent" : "soft"} />
          <Skeleton w={180} h={22} />
        </Card>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  20 · 46,47–48,76 s · « …correspond à leur besoin »                          */
/* -------------------------------------------------------------------------- */
export const Beat20: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const t = clock.at("besoin", 0);
  const slide = clock.p(0, t > 0.2 ? t : 1.4);
  const lock = lit(clock, t, 0.2);
  const ring = clock.p(t, 0.6);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(468 - 190, 20, 380, 380), opacity: 0.28 }}>
          <LibIcon id="web-puzzle" size={380} color={colors.inkInverse} />
        </div>
        <div
          style={{
            ...abs(468 - 190, 20, 380, 380),
            transform: `translateX(${interpolate(slide, [0, 1], [320, 0])}px) rotate(${interpolate(slide, [0, 1], [14, 0])}deg)`,
          }}
        >
          <LibIcon id="web-puzzle" size={380} color={colors.accent} />
        </div>
        <Shockwave x={468} y={210} size={380} progress={ring} />
        <Sparkle x={250} y={70} size={80} progress={lock} />
        <Sparkle x={700} y={330} size={90} progress={lock} color={colors.accent} />
        <div style={{ ...abs(0, 500, 936, 140), display: "flex", justifyContent: "center", opacity: lock }}>
          <Pill size={84}>Besoin trouvé</Pill>
        </div>
      </Art>
    </Shot>
  );
};
