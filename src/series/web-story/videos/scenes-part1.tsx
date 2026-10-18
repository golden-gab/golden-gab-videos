/**
 * Scènes 01 à 10 — Web Story « Tu dors déjà »
 * Bloc 1 : le prospect de 23h (0,00 s à 23,86 s).
 *
 * Règles de la série : un message par plan, 3 mots maximum à l'écran, tout est
 * visible dès le début du plan (le mot prononcé déclenche une *réaction*, pas
 * l'apparition), et chaque plan déclare son gabarit de zones (`ZoneStage`) :
 * la mascotte, l'illustration et les captions ne se recouvrent jamais.
 */

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { BrandText } from "../../../components/common/BrandText";
import {
  abs,
  Art,
  Burst,
  getSceneLane,
  LibIcon,
  lit,
  PhoneMock,
  punch,
  shake,
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
import { Card, Moon, Pill, Skeleton, Stars, Zzz } from "./kit";

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

/** Secondes écoulées depuis `startSeconds` (0 avant). */
const useSince = (startSeconds: number): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return Math.max(0, frame / fps - startSeconds);
};

/* -------------------------------------------------------------------------- */
/*  01 · 0,00–4,20 s · « …alors que tu dors déjà ? » — la nuit                  */
/* -------------------------------------------------------------------------- */
export const Beat01: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zzz = useSince(clock.at("dors", 0));
  const bubble = clock.p(clock.at("client", 0), 0.3);
  const breathe = 1 + Math.sin((frame / fps) * 2) * 0.03;

  return (
    <Shot scene={scene} layout="stack-right">
      <Art w={936} h={510}>
        <Stars w={936} h={510} count={10} />
        <div
          style={{
            ...abs(468 - 215, 40, 430, 430),
            borderRadius: radius.pill,
            border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.25)}`,
            backgroundColor: withAlpha(colors.ink, 0.55),
            boxShadow: `0 20px 60px ${withAlpha(colors.accent, 0.25)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${breathe})`,
          }}
        >
          <Moon size={240} />
        </div>
        <Zzz x={640} y={190} seconds={zzz} size={80} />
        <div
          style={{
            ...abs(150, 60, 150, 150),
            borderRadius: radius.pill,
            backgroundColor: colors.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${bubble})`,
            boxShadow: `0 14px 36px ${withAlpha(colors.ink, 0.4)}`,
          }}
        >
          <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 100, lineHeight: 1 }}>
            ?
          </BrandText>
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="thinking" attitude="curious" delay={0.2} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  02 · 4,20–7,11 s · « …un client a entendu parler de ton activité »          */
/* -------------------------------------------------------------------------- */
export const Beat02: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const pop = punch(clock, clock.at("client", 0), 0.1);
  const ring = clock.p(clock.at("client", 0), 0.7);

  return (
    <Shot scene={scene} layout="art">
      <Art w={560} h={820} enter="slide-up">
        <PhoneMock width={560} height={820}>
          <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <BrandText role="label" color={withAlpha(colors.inkInverse, 0.7)} style={{ fontSize: 40 }}>
                23:08
              </BrandText>
              <LibIcon id="web-bell" size={52} color={colors.accent} />
            </div>
            <div
              style={{
                position: "relative",
                padding: 28,
                borderRadius: radius.lg,
                backgroundColor: withAlpha(colors.inkInverse, 0.14),
                border: `${strokeWidths.medium}px solid ${colors.accent}`,
                transform: `scale(${pop})`,
                boxShadow: `0 18px 44px ${withAlpha(colors.ink, 0.5)}`,
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  flexShrink: 0,
                  borderRadius: radius.pill,
                  backgroundColor: colors.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 60, lineHeight: 1 }}>
                  X
                </BrandText>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 52, lineHeight: 1 }}>
                  Client X
                </BrandText>
                <Skeleton w={220} h={20} />
              </div>
            </div>
            <Skeleton w="80%" h={24} />
            <Skeleton w="55%" h={24} />
          </div>
        </PhoneMock>
        <Shockwave x={280} y={300} size={260} progress={ring} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  03 · 7,11–10,04 s · « …que tu présentes chaque jour sur TikTok »            */
/* -------------------------------------------------------------------------- */
const FeedCard: React.FC<{ readonly tone: number }> = ({ tone }) => (
  <div
    style={{
      width: "100%",
      height: 640,
      borderRadius: radius.lg,
      background: `linear-gradient(160deg, ${withAlpha(colors.accent, 0.55 - tone * 0.25)}, ${withAlpha(colors.ink, 0.9)})`,
      border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.2)}`,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        width: 150,
        height: 150,
        borderRadius: radius.pill,
        backgroundColor: withAlpha(colors.inkInverse, 0.92),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LibIcon id="web-play" size={80} color={colors.secondary} />
    </div>
    <div style={{ position: "absolute", left: 28, bottom: 28, display: "flex", alignItems: "center", gap: 18 }}>
      <div style={{ width: 64, height: 64, borderRadius: radius.pill, backgroundColor: colors.accent }} />
      <Skeleton w={190} h={26} />
    </div>
    <div style={{ position: "absolute", right: 24, bottom: 28, display: "flex", flexDirection: "column", gap: 24 }}>
      <LibIcon id="web-heart" size={60} color={colors.inkInverse} />
    </div>
  </div>
);

export const Beat03: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const scroll = clock.p(clock.at("chaque", 0), 0.45);
  const offset = interpolate(scroll, [0, 1], [0, -664]);

  return (
    <Shot scene={scene} layout="art">
      <Art w={560} h={820}>
        <PhoneMock width={560} height={820}>
          <div style={{ padding: 28, height: "100%", overflow: "hidden" }}>
            <div style={{ transform: `translateY(${offset}px)`, display: "flex", flexDirection: "column", gap: 24 }}>
              <FeedCard tone={0} />
              <FeedCard tone={1} />
            </div>
          </div>
        </PhoneMock>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  04 · 10,04–11,88 s · « Il semble intéressé »                                */
/* -------------------------------------------------------------------------- */
export const Beat04: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const t = clock.at("intéressé", 0);
  const heart = punch(clock, t, 0.22, 0.5);
  const ring = clock.p(t, 0.7);
  const sparks = clock.p(clock.at("proposes", 0), 0.7);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div
          style={{
            ...abs(468 - 190, 20, 380, 380),
            borderRadius: radius.pill,
            backgroundColor: withAlpha(colors.ink, 0.75),
            border: `${strokeWidths.thick}px solid ${colors.accent}`,
            boxShadow: `0 24px 60px ${withAlpha(colors.accent, 0.4)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${heart})`,
          }}
        >
          <LibIcon id="web-heart" size={210} color={colors.accent} />
        </div>
        <Shockwave x={468} y={210} size={380} progress={ring} />
        <Sparkle x={200} y={90} size={90} progress={sparks} color={colors.accent} />
        <Sparkle x={760} y={120} size={70} progress={Math.min(1, sparks * 1.2)} />
        <Sparkle x={730} y={350} size={80} progress={sparks} color={colors.accent} />
        <div style={{ ...abs(0, 470, 936, 140), display: "flex", justifyContent: "center" }}>
          <Pill size={84}>Intéressé</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  05 · 11,88–13,38 s · « …il va en savoir plus »                              */
/* -------------------------------------------------------------------------- */
export const Beat05: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const t = clock.at("plus", 0);
  const press = 1 - 0.07 * Math.sin(Math.PI * clock.p(t, 0.3, (x) => x));
  const ring = clock.p(t, 0.6);
  const cursor = clock.p(0, t > 0 ? t : 0.6);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={520}>
        <div
          style={{
            ...abs(38, 120, 860, 190),
            borderRadius: radius.pill,
            backgroundColor: colors.accent,
            boxShadow: `0 24px 60px ${withAlpha(colors.accent, 0.5)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${press})`,
          }}
        >
          <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 84, lineHeight: 1 }}>
            En savoir plus
          </BrandText>
        </div>
        <Shockwave x={468} y={215} size={220} progress={ring} />
        <div
          style={{
            ...abs(interpolate(cursor, [0, 1], [760, 560]), interpolate(cursor, [0, 1], [440, 250]), 120, 120),
          }}
        >
          <LibIcon id="web-pointer-click" size={120} color={colors.inkInverse} />
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  06 · 13,38–15,09 s · « Mais le problème, il est déjà 23h »                  */
/* -------------------------------------------------------------------------- */
export const Beat06: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const t = clock.at("23h", 0);
  const hit = punch(clock, t, 0.14, 0.4);
  const ring = clock.p(t, 0.7);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={620}>
        <div style={abs(40, 20, 100, 100)}>
          <Moon size={100} />
        </div>
        <div
          style={{
            ...abs(0, 120, 936, 380),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `translateX(${shake(clock, t)}px) scale(${hit})`,
          }}
        >
          <BrandText
            role="display"
            color={colors.inkInverse}
            style={{
              fontSize: 290,
              lineHeight: 1,
              textShadow: `0 0 60px ${withAlpha(colors.accent, 0.55 * lit(clock, t))}`,
            }}
          >
            23:00
          </BrandText>
        </div>
        <Shockwave x={468} y={310} size={420} progress={ring} />
        <div style={{ ...abs(0, 520, 936, 100), display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 520,
              height: 14,
              borderRadius: radius.pill,
              backgroundColor: withAlpha(colors.inkInverse, 0.2),
            }}
          >
            <div
              style={{
                width: `${96 * lit(clock, 0, 1.2)}%`,
                height: "100%",
                borderRadius: radius.pill,
                backgroundColor: colors.accent,
              }}
            />
          </div>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  07 · 15,09–17,05 s · « tu n'es plus disponible, tu dors déjà »              */
/* -------------------------------------------------------------------------- */
export const Beat07: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const t = clock.at("disponible", 0);
  const off = lit(clock, t, 0.2);
  const zzz = useSince(clock.at("déjà", 0));
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame / 5) * 0.12 * (1 - off);

  return (
    <Shot scene={scene} layout="stack-left">
      <Art w={936} h={510}>
        <Card w={860} h={330} active={off < 0.5} style={{ position: "absolute", left: 38, top: 60, flexDirection: "row", gap: 40 }}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: radius.pill,
              backgroundColor: off < 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.4),
              transform: `scale(${pulse})`,
              boxShadow: off < 0.5 ? `0 0 40px ${colors.accent}` : "none",
            }}
          />
          <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 112, lineHeight: 1 }}>
            {off < 0.5 ? "En ligne" : "Hors ligne"}
          </BrandText>
        </Card>
        <Zzz x={680} y={90} seconds={zzz} size={84} />
      </Art>
      <ZoneMascot scene={scene} pose="thinking" attitude="serious" mirrored delay={0.1} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  08 · 17,05–18,77 s · « Alors, qu'est-ce qu'il va faire ? »                  */
/* -------------------------------------------------------------------------- */
export const Beat08: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const t = clock.at("faire", 0);
  const hit = punch(clock, t, 0.2, 0.5);
  const burst = clock.p(t, 0.5);

  return (
    <Shot scene={scene} layout="side-left">
      <Art w={512} h={540}>
        <div
          style={{
            ...abs(56, 70, 400, 400),
            borderRadius: radius.pill,
            backgroundColor: colors.accent,
            boxShadow: `0 24px 60px ${withAlpha(colors.accent, 0.5)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${hit})`,
          }}
        >
          <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 300, lineHeight: 1 }}>
            ?
          </BrandText>
        </div>
        <Burst x={256} y={270} radius={250} progress={burst} />
      </Art>
      <ZoneMascot scene={scene} pose="surprised" attitude="excited" mirrored delay={0.05} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  09 · 18,77–21,17 s · « Est-ce qu'il va attendre demain ? »                  */
/* -------------------------------------------------------------------------- */
export const Beat09: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const frame = useCurrentFrame();
  const t = clock.at("demain", 0);
  const hit = punch(clock, t, 0.08, 0.4);
  const minute = frame * 9;
  const hour = frame * 0.75;

  return (
    <Shot scene={scene} layout="art">
      <Art w={640} h={780}>
        <Card w={640} h={780} active style={{ overflow: "hidden", gap: 0, justifyContent: "flex-start", transform: `scale(${hit})` }}>
          <div
            style={{
              width: "100%",
              height: 190,
              backgroundColor: colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 112, lineHeight: 1 }}>
              DEMAIN
            </BrandText>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={380} height={380} viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="46" fill="none" stroke={colors.inkInverse} strokeWidth={5} />
              <line x1="50" y1="50" x2="50" y2="18" stroke={colors.accent} strokeWidth={6} strokeLinecap="round" transform={`rotate(${minute} 50 50)`} />
              <line x1="50" y1="50" x2="50" y2="30" stroke={colors.inkInverse} strokeWidth={7} strokeLinecap="round" transform={`rotate(${hour} 50 50)`} />
              <circle cx="50" cy="50" r="5" fill={colors.inkInverse} />
            </svg>
          </div>
        </Card>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  10 · 21,17–23,86 s · « Non, il va passer à autre chose »                    */
/* -------------------------------------------------------------------------- */
export const Beat10: React.FC<BeatProps> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const swipe = clock.p(clock.at("passer", 0), 0.5);
  const stamp = clock.p(0, 0.3);

  return (
    <Shot scene={scene} layout="art">
      <Art w={560} h={820}>
        <div
          style={{
            ...abs(0, 0, 560, 820),
            transform: `translateY(${interpolate(swipe, [0, 1], [980, 0])}px)`,
          }}
        >
          <PhoneMock width={560} height={820}>
            <div style={{ padding: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
              <div style={{ width: 170, height: 170, borderRadius: radius.pill, backgroundColor: withAlpha(colors.inkInverse, 0.5), marginTop: 60 }} />
              <Skeleton w={300} h={30} />
              <Skeleton w={220} h={24} />
              <LibIcon id="web-play" size={110} color={withAlpha(colors.inkInverse, 0.5)} />
            </div>
          </PhoneMock>
        </div>
        <div
          style={{
            ...abs(0, 0, 560, 820),
            transform: `translateY(${interpolate(swipe, [0, 1], [0, -980])}px)`,
          }}
        >
          <PhoneMock width={560} height={820}>
            <div style={{ padding: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
              <div style={{ width: 170, height: 170, borderRadius: radius.pill, backgroundColor: colors.accent, marginTop: 60 }} />
              <Skeleton w={300} h={30} />
              <Skeleton w={220} h={24} />
              <LibIcon id="web-heart" size={110} color={withAlpha(colors.inkInverse, 0.5)} />
            </div>
          </PhoneMock>
          <div
            style={{
              ...abs(40, 280, 480, 260),
              borderRadius: radius.lg,
              border: `18px solid ${colors.accent}`,
              backgroundColor: withAlpha(colors.ink, 0.8),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(-12deg) scale(${interpolate(stamp, [0, 1], [1.7, 1])})`,
              opacity: stamp,
            }}
          >
            <BrandText role="display" color={colors.accent} style={{ fontSize: 210, lineHeight: 1 }}>
              NON
            </BrandText>
          </div>
        </div>
      </Art>
    </Shot>
  );
};
