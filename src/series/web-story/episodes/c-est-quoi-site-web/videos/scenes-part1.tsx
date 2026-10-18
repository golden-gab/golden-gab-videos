/**
 * Scènes 1 à 18 — Web Story « C'est quoi un site web »
 *
 * Bloc 1 : Hook, promesse & distinction site vs application web (1 à 9)
 * Bloc 2 : L'application web sur mobile et dans le navigateur (10 à 18)
 */

import React from "react";
import { interpolate } from "remotion";

import { BrandText } from "../../../../../components/common/BrandText";
import {
  ActionTile,
  Appear,
  BrowserFrame,
  ConceptCard,
  LibIcon,
  MascotShot,
  PhoneMock,
  Shockwave,
  Sparkle,
  TagPill,
  abs,
  band,
  H,
  useWordClock,
  W,
} from "../../../../../components/motion";
import { colors, durations, easings, radius, spacing, strokeWidths } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { siteWebTranscript } from "../data/transcript.ts";

/* -------------------------------------------------------------------------- */
/*  Bloc 1 : Beats 01 à 09                                                     */
/* -------------------------------------------------------------------------- */

export const Beat01: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const qScale = clock.p(clock.at("web", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Appear animation="pop" duration={0.4}>
        <BrowserFrame width={820} height={520} address="c-est-quoi-un-site-web" secure tone="dark">
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                width: 170,
                height: 170,
                borderRadius: radius.pill,
                backgroundColor: colors.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${qScale})`,
                boxShadow: `0 14px 34px ${withAlpha(colors.accent, 0.45)}`,
              }}
            >
              <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 130 }}>
                ?
              </BrandText>
            </div>
            <Sparkle x={510} y={150} size={50} progress={qScale} color={colors.accent} />
          </div>
        </BrowserFrame>
      </Appear>
    </div>
  );
};

export const Beat02: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const p1 = clock.p(clock.at("m'a", 0));
  const p2 = clock.p(clock.at("posé", 0));
  const p3 = clock.p(clock.at("question", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
      <div style={{ transform: `scale(${p1})`, opacity: p1 }}>
        <TagPill tone="ghost" icon="bulb">« Comment ça marche ? »</TagPill>
      </div>
      <div style={{ transform: `scale(${p2})`, opacity: p2 }}>
        <TagPill tone="light" icon="user">« C&apos;est quoi la différence ? »</TagPill>
      </div>
      <div style={{ transform: `scale(${p3})`, opacity: p3 }}>
        <TagPill tone="accent" icon="check">« C&apos;est quoi un site web ? »</TagPill>
      </div>
    </div>
  );
};

export const Beat03: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const p1 = clock.p(clock.at("plusieurs", 0));
  const p2 = clock.p(clock.at("tellement", 0));

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ ...abs(120, band.top + 100), transform: `scale(${p1})`, opacity: p1 }}>
        <TagPill tone="ghost" icon="bulb">Plusieurs fois...</TagPill>
      </div>
      <div style={{ ...abs(140, band.top + 240), transform: `scale(${p2})`, opacity: p2 }}>
        <TagPill tone="accent" icon="box">Même question !</TagPill>
      </div>
      <MascotShot
        scene={scene}
        pose="surprised"
        attitude="surprised"
        side="right"
        size={460}
        from={clock.at("tellement", 0)}
        halo="accent"
      />
    </div>
  );
};

export const Beat04: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pOpen = clock.p(clock.at("fonctionne", 0), durations.slow);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: 580,
          height: 440,
          borderRadius: radius.lg,
          backgroundColor: colors.surfaceDark,
          border: `${strokeWidths.medium}px solid ${colors.accent}`,
          boxShadow: `0 20px 50px ${withAlpha(colors.ink, 0.4)}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: spacing.md,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <LibIcon id="web-puzzle" size={130} color={colors.accent} style={{ transform: `rotate(${pOpen * 180}deg)` }} />
        <BrandText role="h2" color={colors.inkInverse}>
          FONCTIONNEMENT
        </BrandText>
        <span style={{ width: "60%", height: strokeWidths.thin, backgroundColor: withAlpha(colors.inkInverse, 0.3) }} />
      </div>
    </div>
  );
};

export const Beat05: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pLine = clock.p(clock.at("simplement", 0), durations.base);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ ...abs(120, band.top + 160, 480) }}>
        <BrandText role="h2" color={colors.inkInverse}>
          EXPLICATION
        </BrandText>
        <BrandText role="display" color={colors.accent} style={{ fontSize: 110 }}>
          SIMPLE
        </BrandText>
        <div style={{ width: 440 * pLine, height: strokeWidths.thick, backgroundColor: colors.accent, borderRadius: radius.pill, marginTop: spacing.sm }} />
      </div>
      <MascotShot
        scene={scene}
        pose="explaining"
        attitude="friendly"
        side="right"
        size={470}
        from={clock.at("je", 0)}
        halo="soft"
      />
    </div>
  );
};

export const Beat06: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pDiff = clock.p(clock.at("différence", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.md }}>
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: radius.pill,
          backgroundColor: colors.surfaceDark,
          border: `${strokeWidths.thick}px solid ${colors.accent}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${pDiff})`,
        }}
      >
        <BrandText role="display" color={colors.accent} style={{ fontSize: 140, lineHeight: 1 }}>
          ≠
        </BrandText>
      </div>
      <BrandText role="h1" color={colors.inkInverse}>
        DIFFÉRENCE
      </BrandText>
    </div>
  );
};

export const Beat07: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pSite = clock.p(clock.at("site", 0));
  const pApp = clock.p(clock.at("application", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: "100px 0" }}>
      <div style={{ transform: `scale(${pSite})`, opacity: pSite }}>
        <ConceptCard title="SITE WEB" subtitle="Présenter des infos" icon="web-globe" width={760} height={180} />
      </div>
      <div style={{ transform: `scale(${pApp})`, opacity: pApp }}>
        <ConceptCard title="APPLICATION WEB" subtitle="Effectuer des actions" icon="web-pointer-click" width={760} height={180} accent />
      </div>
    </div>
  );
};

export const Beat08: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pSwap = clock.p(clock.at("confondent", 0), durations.base);
  const dy = interpolate(pSwap, [0, 1], [0, 180]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ ...abs(80, band.top + 80 + dy) }}>
        <ConceptCard title="SITE WEB" icon="web-globe" width={520} height={150} />
      </div>
      <div style={{ ...abs(80, band.top + 260 - dy) }}>
        <ConceptCard title="APPLICATION WEB" icon="web-pointer-click" width={520} height={150} accent />
      </div>
      <MascotShot
        scene={scene}
        pose="thinking"
        attitude="curious"
        side="right"
        size={450}
        from={clock.at("confondent", 0)}
        halo="accent"
      />
    </div>
  );
};

export const Beat09: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pFocus = clock.p(clock.at("l'application", 0), durations.base, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: `scale(${pFocus})` }}>
        <ConceptCard title="L&apos;APPLICATION WEB" subtitle="Commençons par là !" icon="web-pointer-click" width={820} height={220} accent />
      </div>
      <Shockwave x={W / 2} y={H / 2} size={300} progress={pFocus} color={colors.accent} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Bloc 2 : Beats 10 à 18                                                     */
/* -------------------------------------------------------------------------- */

export const Beat10: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pWa = clock.p(clock.at("whatsapp", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <PhoneMock width={480} height={700}>
        <div style={{ padding: spacing.lg, display: "flex", flexDirection: "column", gap: spacing.md, marginTop: 40 }}>
          <BrandText role="label" color={colors.inkInverse}>Vos applications</BrandText>
          <div style={{ transform: `scale(${pWa})`, opacity: pWa }}>
            <ActionTile icon="web-message-circle" label="WhatsApp" width={400} active />
          </div>
        </div>
      </PhoneMock>
    </div>
  );
};

export const Beat11: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pFb = clock.p(clock.at("facebook", 0));
  const pYt = clock.p(clock.at("youtube", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <PhoneMock width={480} height={700}>
        <div style={{ padding: spacing.lg, display: "flex", flexDirection: "column", gap: spacing.md, marginTop: 40 }}>
          <ActionTile icon="web-message-circle" label="WhatsApp" width={400} />
          <div style={{ transform: `scale(${pFb})`, opacity: pFb }}>
            <ActionTile icon="web-users" label="Facebook" width={400} active />
          </div>
          <div style={{ transform: `scale(${pYt})`, opacity: pYt }}>
            <ActionTile icon="web-play" label="YouTube" width={400} active />
          </div>
        </div>
      </PhoneMock>
    </div>
  );
};

export const Beat12: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pTap = clock.p(clock.at("utilisez", 0));
  const pCal = clock.p(clock.at("jour", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: spacing.xl }}>
      <PhoneMock width={440} height={680}>
        <div style={{ padding: spacing.md, display: "flex", flexDirection: "column", gap: spacing.sm, marginTop: 40 }}>
          <ActionTile icon="web-message-circle" label="WhatsApp" width={380} active={pTap > 0.5} />
          <ActionTile icon="web-users" label="Facebook" width={380} />
          <ActionTile icon="web-play" label="YouTube" width={380} />
        </div>
      </PhoneMock>
      <div style={{ display: "flex", flexDirection: "column", gap: spacing.md, transform: `scale(${pCal})` }}>
        <TagPill tone="accent" icon="calendar">Tous les jours</TagPill>
        <TagPill tone="light" icon="check">Des tas de choses</TagPill>
      </div>
    </div>
  );
};

export const Beat13: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const p1 = clock.p(clock.at("messages", 0));
  const p2 = clock.p(clock.at("publier", 0));
  const p3 = clock.p(clock.at("vidéos", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: spacing.md }}>
      <div style={{ transform: `scale(${p1})`, opacity: p1 }}>
        <ActionTile icon="web-message-circle" label="Messages" width={270} />
      </div>
      <div style={{ transform: `scale(${p2})`, opacity: p2 }}>
        <ActionTile icon="web-newspaper" label="Publier" width={270} active />
      </div>
      <div style={{ transform: `scale(${p3})`, opacity: p3 }}>
        <ActionTile icon="web-play" label="Vidéos" width={270} />
      </div>
    </div>
  );
};

export const Beat14: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pWeb = clock.p(clock.at("web", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ ...abs(70, band.top + 60), transform: `scale(${pWeb})` }}>
        <BrowserFrame width={540} height={420} address="web.service.com" secure tone="dark">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <TagPill tone="accent" icon="bulb">Version Web !</TagPill>
          </div>
        </BrowserFrame>
      </div>
      <MascotShot
        scene={scene}
        pose="surprised"
        attitude="surprised"
        side="right"
        size={460}
        from={clock.at("mais", 0)}
        halo="accent"
      />
    </div>
  );
};

export const Beat15: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pNav = clock.p(clock.at("navigateur", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={840} height={520} address="accessible-en-ligne.com" secure tone="dark">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: spacing.md }}>
          <div style={{ transform: `scale(${pNav})`, opacity: pNav }}>
            <TagPill tone="light" libIcon="web-globe">Dans votre navigateur</TagPill>
          </div>
          <BrandText role="h2" color={colors.inkInverse}>
            Aucun téléchargement !
          </BrandText>
        </div>
      </BrowserFrame>
    </div>
  );
};

export const Beat16: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pChrome = clock.p(clock.at("chrome", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={820} height={480} tabs={["Google Chrome", "Safari", "Firefox"]} address="google.com/chrome" secure>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: spacing.md }}>
          <div style={{ transform: `scale(${pChrome})` }}>
            <TagPill tone="accent" libIcon="web-globe">Comme Chrome</TagPill>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

export const Beat17: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pCross = clock.p(clock.at("d'installer", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
      <div style={{ position: "relative", width: 240, height: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LibIcon id="web-download" size={200} color={colors.inkInverse} />
        <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <line
            x1="15"
            y1="15"
            x2="85"
            y2="85"
            stroke={colors.accent}
            strokeWidth={strokeWidths.thick}
            strokeLinecap="round"
            strokeDasharray={100}
            strokeDashoffset={100 * (1 - pCross)}
          />
        </svg>
      </div>
      <TagPill tone="accent" icon="check">Pas besoin d&apos;installer !</TagPill>
    </div>
  );
};

export const Beat18: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pApp = clock.p(clock.at("téléphone", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: spacing.xl }}>
      <PhoneMock width={400} height={620}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: spacing.md }}>
          <div style={{ border: `${strokeWidths.thin}px dashed ${withAlpha(colors.inkInverse, 0.4)}`, padding: spacing.md, borderRadius: radius.md }}>
            <BrandText role="label" color={colors.neutral}>Mémoire : 0 Mo</BrandText>
          </div>
        </div>
      </PhoneMock>
      <div style={{ transform: `scale(${pApp})` }}>
        <BrowserFrame width={460} height={400} address="app.web" secure tone="dark">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <TagPill tone="accent" libIcon="web-globe">Direct sur le Web</TagPill>
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
};
