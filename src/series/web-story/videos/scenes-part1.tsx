/**
 * Scènes 01 à 10 — Web Story « Tu dors déjà »
 * Bloc 1 : Le problème du prospect nocturne (0,00 s à 23,86 s)
 */

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { BrandText } from "../../../components/common/BrandText";
import {
  ActionTile,
  Appear,
  LibIcon,
  MascotShot,
  PhoneMock,
  TagPill,
  abs,
  band,
  useWordClock,
  W,
} from "../../../components/motion";
import {
  colors,
  durations,
  easings,
  radius,
  strokeWidths,
} from "../../../config";
import type { Scene } from "../../../scenes/types";
import { withAlpha } from "../../../utils/color";
import { webStoryTranscript } from "../data/transcript.ts";

/* -------------------------------------------------------------------------- */
/*  Beat 01 · 0,00–4,20 s · Hook nocturne & lune                               */
/* -------------------------------------------------------------------------- */
export const Beat01: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zzzProgress = clock.p(clock.at("dors", 0), durations.base, easings.entrance);
  const pulse = 1 + Math.sin((frame / fps) * 2) * 0.04;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Appear animation="pop" style={{ ...abs(W / 2 - 220, band.top + 80, 440, 440) }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: radius.pill,
            border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.2)}`,
            backgroundColor: withAlpha(colors.ink, 0.4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${pulse})`,
            boxShadow: `0 20px 50px ${withAlpha(colors.accent, 0.2)}`,
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", top: 40, right: 60 }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill={colors.accent}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>
          <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 96, letterSpacing: 4 }}>
            00:00
          </BrandText>
          <TagPill tone="accent">Nuit · 23h - 06h</TagPill>
        </div>
      </Appear>

      {zzzProgress > 0 && (
        <div style={{ ...abs(W / 2 + 120, band.top + 40, 150, 150), opacity: zzzProgress }}>
          <BrandText role="h2" color={colors.accent} style={{ fontSize: 52 }}>
            Zzz...
          </BrandText>
        </div>
      )}

      <MascotShot scene={scene} pose="thinking" side="left" size={440} lift={40} delay={0.2} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 02 · 4,20–7,11 s · Client X & Notification smartphone                 */
/* -------------------------------------------------------------------------- */
export const Beat02: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const popNote = clock.p(clock.at("client", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Appear animation="slide-up" duration={0.4}>
        <PhoneMock width={480} height={820}>
          <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <BrandText role="label" color={withAlpha(colors.inkInverse, 0.6)}>23:08</BrandText>
              <TagPill tone="accent">TikTok</TagPill>
            </div>

            <div
              style={{
                marginTop: 40,
                padding: 24,
                borderRadius: radius.md,
                backgroundColor: withAlpha(colors.inkInverse, 0.12),
                border: `${strokeWidths.thin}px solid ${withAlpha(colors.accent, 0.4)}`,
                transform: `scale(${popNote})`,
                boxShadow: `0 12px 30px ${withAlpha(colors.ink, 0.5)}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: radius.pill,
                    backgroundColor: colors.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 26 }}>
                    X
                  </BrandText>
                </div>
                <div>
                  <BrandText role="h3" color={colors.inkInverse} style={{ fontSize: 28 }}>
                    Client X
                  </BrandText>
                  <BrandText role="body" color={withAlpha(colors.inkInverse, 0.7)} style={{ fontSize: 20 }}>
                    A découvert votre profil
                  </BrandText>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <TagPill tone="ghost">Intéressé par tes services</TagPill>
            </div>
          </div>
        </PhoneMock>
      </Appear>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 03 · 7,11–10,04 s · Feed vidéo TikTok stylisé                         */
/* -------------------------------------------------------------------------- */
export const Beat03: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const postScale = clock.p(clock.at("présentes", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <PhoneMock width={480} height={820}>
        <div style={{ padding: 24, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div
            style={{
              height: 520,
              borderRadius: radius.md,
              backgroundColor: withAlpha(colors.ink, 0.6),
              border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.2)}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transform: `scale(${postScale})`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ width: 80, height: 80, borderRadius: radius.pill, backgroundColor: colors.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LibIcon id="web-play" size={44} color={colors.inkInverse} />
            </div>
            <div style={{ position: "absolute", bottom: 24, left: 20 }}>
              <TagPill tone="accent">Chaque jour sur TikTok</TagPill>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: radius.pill, backgroundColor: colors.accent }} />
            <BrandText role="label" color={colors.inkInverse}>@ton-activite</BrandText>
          </div>
        </div>
      </PhoneMock>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 04 · 10,04–11,88 s · Prospect intéressé & tap profil                  */
/* -------------------------------------------------------------------------- */
export const Beat04: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const heartScale = clock.p(clock.at("intéressé", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Appear animation="pop" duration={0.3}>
        <div
          style={{
            width: 580,
            padding: 36,
            borderRadius: radius.lg,
            backgroundColor: withAlpha(colors.ink, 0.8),
            border: `${strokeWidths.thick}px solid ${colors.accent}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            boxShadow: `0 20px 50px ${withAlpha(colors.accent, 0.3)}`,
          }}
        >
          <div style={{ transform: `scale(${heartScale})` }}>
            <LibIcon id="web-heart" size={88} color={colors.accent} />
          </div>
          <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 44, textAlign: "center" }}>
            Prospect Intéressé
          </BrandText>
          <TagPill tone="accent">Veut en savoir plus</TagPill>
        </div>
      </Appear>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 05 · 11,88–13,38 s · Bouton CTA En savoir plus                        */
/* -------------------------------------------------------------------------- */
export const Beat05: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const pulse = clock.p(clock.at("plus", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: `scale(${pulse})` }}>
        <ActionTile
          label="En savoir plus sur l'offre"
          icon="web-pointer-click"
          width={480}
          active
        />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 06 · 13,38–15,09 s · Il est déjà 23h                                  */
/* -------------------------------------------------------------------------- */
export const Beat06: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const shake = clock.p(clock.at("23h", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Appear animation="pop" duration={0.3}>
        <div
          style={{
            width: 680,
            padding: 44,
            borderRadius: radius.lg,
            backgroundColor: withAlpha(colors.ink, 0.9),
            border: `${strokeWidths.thick}px solid ${colors.accent}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            transform: `scale(${shake})`,
            boxShadow: `0 24px 60px ${withAlpha(colors.accent, 0.4)}`,
          }}
        >
          <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 110, letterSpacing: 4 }}>
            23:00
          </BrandText>
          <TagPill tone="accent">Horaires de fermeture</TagPill>
        </div>
      </Appear>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 07 · 15,09–17,05 s · Plus disponible, tu dors déjà                   */
/* -------------------------------------------------------------------------- */
export const Beat07: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Appear animation="fade" style={{ ...abs(W / 2 - 260, band.top + 80, 520, 200) }}>
        <div
          style={{
            padding: 24,
            borderRadius: radius.md,
            backgroundColor: withAlpha(colors.ink, 0.7),
            border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.2)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <div style={{ width: 20, height: 20, borderRadius: radius.pill, backgroundColor: colors.accent }} />
          <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 34 }}>
            Statut : Indisponible
          </BrandText>
        </div>
      </Appear>
      <MascotShot scene={scene} pose="thinking" side="right" size={460} lift={30} delay={0.2} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 08 · 17,05–18,77 s · Qu'est-ce qu'il va faire ?                       */
/* -------------------------------------------------------------------------- */
export const Beat08: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const qScale = clock.p(clock.at("faire", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: radius.pill,
          backgroundColor: colors.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${qScale})`,
          boxShadow: `0 20px 50px ${withAlpha(colors.accent, 0.5)}`,
        }}
      >
        <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 160 }}>
          ?
        </BrandText>
      </div>
      <MascotShot scene={scene} pose="surprised" side="right" size={460} lift={20} delay={0.1} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 09 · 18,77–21,17 s · Attendre demain ?                                */
/* -------------------------------------------------------------------------- */
export const Beat09: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const calScale = clock.p(clock.at("demain", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Appear animation="pop" duration={0.3}>
        <div
          style={{
            width: 580,
            padding: 36,
            borderRadius: radius.lg,
            backgroundColor: withAlpha(colors.ink, 0.8),
            border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.3)}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            transform: `scale(${calScale})`,
          }}
        >
          <BrandText role="label" color={colors.accent} style={{ fontSize: 28, textTransform: "uppercase" }}>
            Délai d'attente
          </BrandText>
          <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 88 }}>
            DEMAIN ?
          </BrandText>
          <TagPill tone="ghost">8 à 12h d'attente</TagPill>
        </div>
      </Appear>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 10 · 21,17–23,86 s · Non, passer à autre chose                        */
/* -------------------------------------------------------------------------- */
export const Beat10: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const swipeProgress = clock.p(clock.at("passer", 0), durations.fast, easings.entrance);
  const translateY = interpolate(swipeProgress, [0, 1], [0, -400]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: `translateY(${translateY}px)`, opacity: 1 - swipeProgress * 0.8 }}>
        <PhoneMock width={480} height={700}>
          <div style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 24 }}>
            <div style={{ width: 90, height: 90, borderRadius: radius.pill, backgroundColor: withAlpha(colors.accent, 0.2), display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BrandText role="display" color={colors.accent} style={{ fontSize: 64 }}>✕</BrandText>
            </div>
            <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 36, textAlign: "center" }}>
              Prospect Perdu
            </BrandText>
            <TagPill tone="accent">Swipe vers un autre profil</TagPill>
          </div>
        </PhoneMock>
      </div>
    </div>
  );
};
