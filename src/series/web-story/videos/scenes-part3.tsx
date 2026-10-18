/**
 * Scènes 21 à 30 — Web Story « Tu dors déjà »
 * Bloc 3 : la nuance, la question finale et l'outro (48,76 s à 74,50 s).
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

import { GoldenGabLogo } from "../../../components/brand/GoldenGabLogo";
import { BrandText } from "../../../components/common/BrandText";
import {
  abs,
  Art,
  Confetti,
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
import {
  Bell,
  Card,
  CheckMark,
  Forbidden,
  MapPin,
  Moon,
  NotEqual,
  Padlock,
  Pill,
  Skeleton,
  Stars,
  Zzz,
} from "./kit";

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

const useSince = (startSeconds: number): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return Math.max(0, frame / fps - startSeconds);
};

/* -------------------------------------------------------------------------- */
/*  21 · 48,76–51,65 s · « Mais il faut faire la différence… »                  */
/* -------------------------------------------------------------------------- */
export const Beat21: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const diff = lit(clock, clock.at("différence", 0), 0.2);
  const second = lit(clock, clock.at("dire", 0), 0.2);
  const hit = punch(clock, clock.at("différence", 0), 0.25, 0.5);

  return (
    <Shot scene={scene} layout="stack-right">
      <Art w={936} h={510}>
        <div style={{ ...abs(0, 0, 936, 130), display: "flex", justifyContent: "center" }}>
          <Pill size={80} tone="light">
            Site web
          </Pill>
        </div>
        <div style={{ ...abs(0, 140, 936, 220), display: "flex", justifyContent: "center", opacity: 0.2 + 0.8 * diff, transform: `scale(${hit})` }}>
          <NotEqual size={210} />
        </div>
        <div style={{ ...abs(0, 380, 936, 130), display: "flex", justifyContent: "center", opacity: 0.25 + 0.75 * second }}>
          <Pill size={80} tone="dark">
            Clients auto
          </Pill>
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="explaining" attitude="serious" delay={0.1} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  22 · 51,65–54,56 s · « …va automatiquement t'apporter des clients »         */
/* -------------------------------------------------------------------------- */
export const Beat22: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const frame = useCurrentFrame();
  const ban = clock.p(clock.at("clients", 0), 0.6, (x) => x);
  const twinkle = (frame % 40) / 40;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(468 - 210, 10, 420, 420), display: "flex", alignItems: "center", justifyContent: "center", opacity: 1 - 0.55 * ban }}>
          <Sparkle x={210} y={210} size={380} progress={0.5} color={colors.accent} />
        </div>
        <Sparkle x={200} y={90} size={70} progress={twinkle} />
        <Sparkle x={740} y={110} size={60} progress={(twinkle + 0.5) % 1} color={colors.accent} />
        <Sparkle x={730} y={360} size={70} progress={(twinkle + 0.25) % 1} />
        <div style={abs(468 - 210, 10, 420, 420)}>
          <Forbidden size={420} progress={ban} />
        </div>
        <div style={{ ...abs(0, 500, 936, 140), display: "flex", justifyContent: "center" }}>
          <Pill size={84} tone="dark">
            Pas magique
          </Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  23 · 54,56–57,32 s · « si quelqu'un entend parler de ton activité »         */
/* -------------------------------------------------------------------------- */
export const Beat23: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const ring = clock.p(clock.at("entend", 0), 0.8);
  const center = { x: 468, y: 390 };
  const people = [
    { x: 110, y: 120 },
    { x: 826, y: 150 },
    { x: 90, y: 600 },
    { x: 846, y: 620 },
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={780}>
        <svg width={936} height={780} style={{ position: "absolute", left: 0, top: 0 }} aria-hidden="true">
          {people.map((person, index) => {
            const on = lit(clock, 0.2 + index * 0.35, 0.3);

            return (
              <line
                key={index}
                x1={person.x}
                y1={person.y}
                x2={person.x + (center.x - person.x) * on}
                y2={person.y + (center.y - person.y) * on}
                stroke={colors.accent}
                strokeWidth={10}
                strokeLinecap="round"
                opacity={0.9}
              />
            );
          })}
        </svg>
        {people.map((person, index) => (
          <div
            key={index}
            style={{
              ...abs(person.x - 60, person.y - 60, 120, 120),
              borderRadius: radius.pill,
              backgroundColor: withAlpha(colors.ink, 0.85),
              border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.6)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LibIcon id="web-user-plus" size={64} color={colors.inkInverse} />
          </div>
        ))}
        <Shockwave x={center.x} y={center.y} size={240} progress={ring} />
        <div
          style={{
            ...abs(center.x - 120, center.y - 120, 240, 240),
            borderRadius: radius.pill,
            backgroundColor: colors.accent,
            boxShadow: `0 24px 60px ${withAlpha(colors.accent, 0.5)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LibIcon id="web-globe" size={140} color={colors.inkInverse} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  24 · 57,32–59,37 s · « il aura au moins un endroit où se renseigner »       */
/* -------------------------------------------------------------------------- */
export const Beat24: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const land = clock.at("endroit", 0);
  const fall = clock.p(0, land > 0.2 ? land : 0.8, (x) => x * x);
  const bounce = Math.abs(Math.sin(clock.p(land, 0.5, (x) => x) * Math.PI)) * 40 * (1 - clock.p(land, 0.5, (x) => x));
  const ring = clock.p(land, 0.6);
  const pinY = 20 + fall * 120 - bounce;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={780}>
        <div style={abs(118, 240, 700, 440)}>
          <div
            style={{
              width: 700,
              height: 440,
              borderRadius: radius.lg,
              backgroundColor: withAlpha(colors.ink, 0.8),
              border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.3)}`,
              padding: 40,
              display: "flex",
              flexDirection: "column",
              gap: 26,
              justifyContent: "flex-end",
            }}
          >
            <Skeleton w="85%" h={28} />
            <Skeleton w="60%" h={24} />
            <Skeleton w="75%" h={24} />
          </div>
        </div>
        <Shockwave x={468} y={330} size={200} progress={ring} />
        <div style={abs(468 - 110, pinY, 220, 220)}>
          <MapPin size={220} />
        </div>
        <div style={{ ...abs(0, 700, 936, 80), display: "flex", justifyContent: "center", opacity: lit(clock, land, 0.2) }}>
          <Pill size={64}>Un endroit</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  25 · 59,37–62,09 s · « sans devoir attendre que tu sois disponible »        */
/* -------------------------------------------------------------------------- */
export const Beat25: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const t = clock.at("attendre", 0);
  const open = clock.p(t, 0.5);
  const ring = clock.p(t + 0.35, 0.6);
  const glow = lit(clock, t + 0.3, 0.3);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={780}>
        <div style={{ ...abs(468 - 210, 60, 420, 460), display: "flex", alignItems: "center", justifyContent: "center", filter: `drop-shadow(0 0 ${40 * glow}px ${colors.accent})` }}>
          <Padlock size={420} open={open} />
        </div>
        <Shockwave x={468} y={300} size={360} progress={ring} />
        <Sparkle x={180} y={150} size={80} progress={glow} />
        <Sparkle x={760} y={200} size={90} progress={glow} color={colors.accent} />
        <div style={{ ...abs(0, 580, 936, 150), display: "flex", justifyContent: "center" }}>
          <Pill size={84}>Sans attendre</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  26 · 62,09–65,30 s · « Alors dis-moi, si quelqu'un découvre ton entreprise » */
/* -------------------------------------------------------------------------- */
export const Beat26: React.FC<BeatProps> = ({ scene }) => (
  <Shot scene={scene} layout="mascot">
    <ZoneMascot scene={scene} pose="point" attitude="curious" halo="accent" delay={0.1} />
  </Shot>
);

/* -------------------------------------------------------------------------- */
/*  27 · 65,30–66,80 s · « ce soir pendant que tu dors »                        */
/* -------------------------------------------------------------------------- */
export const Beat27: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const zzz = useSince(clock.at("dors", 0));
  const soir = lit(clock, clock.at("soir", 0), 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={800}>
        <div
          style={{
            ...abs(468 - 280, 0, 560, 640),
            borderRadius: radius.lg,
            backgroundColor: withAlpha(colors.ink, 0.9),
            border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.55)}`,
            overflow: "hidden",
          }}
        >
          <Stars w={560} h={640} count={9} />
          <div style={abs(300, 90, 190, 190)}>
            <Moon size={190} />
          </div>
        </div>
        <Zzz x={560} y={420} seconds={zzz} size={84} />
        <div style={{ ...abs(0, 670, 936, 130), display: "flex", justifyContent: "center", opacity: soir }}>
          <Pill size={84}>Ce soir</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  28 · 66,80–70,28 s · « …sans t'envoyer un message ? »                       */
/* -------------------------------------------------------------------------- */
export const Beat28: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const frame = useCurrentFrame();
  const site = lit(clock, clock.at("savoir", 0), 0.3);
  const blocked = lit(clock, clock.at("sans", 0), 0.3);
  const dots = Math.floor(frame / 8) % 4;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <Card w={440} h={600} dim={1 - 0.6 * blocked} style={{ position: "absolute", left: 0, top: 30 }}>
          <LibIcon id="web-message-circle" size={170} color={colors.inkInverse} />
          <div style={{ display: "flex", gap: 18, height: 40, alignItems: "center" }}>
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: radius.pill,
                  backgroundColor: dot <= dots ? colors.accent : withAlpha(colors.inkInverse, 0.25),
                }}
              />
            ))}
          </div>
          <Pill size={52} tone="ghost">
            Message
          </Pill>
        </Card>
        <Card w={440} h={600} active={site > 0.5} dim={0.5 + 0.5 * site} style={{ position: "absolute", left: 496, top: 30 }}>
          <LibIcon id="web-globe" size={170} color={colors.accent} />
          <CheckMark size={110} progress={site} />
          <Pill size={52}>Site web</Pill>
        </Card>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  29 · 70,28–72,36 s · « N'hésite pas à t'abonner… »                          */
/* -------------------------------------------------------------------------- */
export const Beat29: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const t = clock.at("t'abonner", 0);
  const swing = Math.sin(clock.p(t, 0.9, (x) => x) * Math.PI * 6) * 22 * (1 - clock.p(t, 0.9, (x) => x));
  const press = punch(clock, t, 0.08, 0.4);
  const ring = clock.p(t, 0.6);
  const confetti = useSince(clock.at("contenu", 0));

  return (
    <Shot scene={scene} layout="stack-left">
      <Art w={936} h={510}>
        <div
          style={{
            ...abs(38, 150, 860, 200),
            borderRadius: radius.pill,
            backgroundColor: colors.accent,
            boxShadow: `0 24px 60px ${withAlpha(colors.accent, 0.5)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
            transform: `scale(${press})`,
          }}
        >
          <Bell size={110} swing={swing} />
          <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 88, lineHeight: 1 }}>
            S'abonner
          </BrandText>
        </div>
        <Shockwave x={468} y={250} size={240} progress={ring} />
        <Confetti x={80} y={0} width={780} fall={440} seconds={confetti} count={22} />
      </Art>
      <ZoneMascot scene={scene} pose="happy" attitude="excited" mirrored delay={0.1} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  30 · 72,36–74,50 s · « Allez, ciao ! » — signature                          */
/* -------------------------------------------------------------------------- */
export const Beat30: React.FC<BeatProps> = ({ scene }) => (
  <Shot scene={scene} layout="art">
    <Art w={936} h={540}>
      <div style={{ ...abs(0, 0, 936, 540), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
        {/* « gab » est bleu nuit : le logo vit sur une plaque claire pour rester lisible sur le fond sombre. */}
        <div style={{ padding: 36, borderRadius: radius.lg, backgroundColor: colors.inkInverse, boxShadow: `0 24px 60px ${withAlpha(colors.ink, 0.4)}` }}>
          <GoldenGabLogo width={400} />
        </div>
        <Pill size={60} tone="dark">
          golden-gab.com
        </Pill>
      </div>
    </Art>
  </Shot>
);
