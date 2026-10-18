/**
 * Scènes 39 à 48 — Web Story « C'est quoi un site web »
 *
 * Bloc 5 : Conclusion, synthèse & appel à l'action (39 à 48)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

import { BrandText } from "../../../../../components/common/BrandText";
import {
  ActionTile,
  ConceptCard,
  Confetti,
  Icon,
  LibIcon,
  MascotShot,
  TagPill,
  abs,
  band,
  useWordClock,
} from "../../../../../components/motion";
import { colors, durations, easings, radius, spacing, strokeWidths } from "../../../../../config";
import type { Scene } from "../../../../../scenes/types";
import { withAlpha } from "../../../../../utils/color";
import { siteWebTranscript } from "../data/transcript.ts";

export const Beat39: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pPuzzle = clock.p(clock.at("fonctionnalités", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
      <ConceptCard title="SITE HYBRIDE" subtitle="Intègre des fonctionnalités" icon="web-puzzle" width={800} height={200} />
      <div style={{ display: "flex", gap: spacing.md, transform: `scale(${pPuzzle})` }}>
        <TagPill tone="accent" icon="check">Réservation</TagPill>
        <TagPill tone="light" icon="box">Paiement</TagPill>
        <TagPill tone="ghost" icon="user">Espace Membre</TagPill>
      </div>
    </div>
  );
};

export const Beat40: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pRet = clock.p(clock.at("retenez", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ ...abs(100, band.top + 160), transform: `scale(${pRet})` }}>
        <TagPill tone="accent" icon="bulb">EN RÉSUMÉ : RETENEZ CECI</TagPill>
      </div>
      <MascotShot
        scene={scene}
        pose="explaining"
        attitude="friendly"
        side="right"
        size={470}
        from={0}
        halo="accent"
      />
    </div>
  );
};

export const Beat41: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pSite = clock.p(clock.at("site", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.md }}>
      <div style={{ transform: `scale(${pSite})` }}>
        <ConceptCard title="LE SITE WEB" subtitle="Principalement des informations" icon="web-globe" width={820} height={220} />
      </div>
      <TagPill tone="light" icon="check">Consulter du contenu</TagPill>
    </div>
  );
};

export const Beat42: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pApp = clock.p(clock.at("application", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.md }}>
      <div style={{ transform: `scale(${pApp})` }}>
        <ConceptCard title="L'APPLICATION WEB" subtitle="L'accent sur les actions !" icon="web-pointer-click" width={820} height={220} accent />
      </div>
      <TagPill tone="accent" icon="check">Interagir et agir</TagPill>
    </div>
  );
};

export const Beat43: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pAct = clock.p(clock.at("actions", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
      <ActionTile icon="web-message-circle" label="Discuter" width={280} />
      <div style={{ transform: `scale(${pAct})` }}>
        <ActionTile icon="web-pointer-click" label="Effectuer" width={280} active />
      </div>
      <ActionTile icon="web-play" label="Créer" width={280} />
    </div>
  );
};

export const Beat44: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pBoth = clock.p(clock.at("deux", 0), durations.fast);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
      <div style={{ display: "flex", gap: spacing.md, transform: `scale(${pBoth})` }}>
        <ConceptCard title="SITE" icon="web-globe" width={400} height={180} />
        <ConceptCard title="APPLICATION" icon="web-pointer-click" width={400} height={180} accent />
      </div>
      <BrandText role="h2" color={colors.inkInverse}>Les deux peuvent...</BrandText>
    </div>
  );
};

export const Beat45: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pTog = clock.p(clock.at("fonctionner", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ ...abs(70, band.top + 80), transform: `scale(${pTog})` }}>
        <ConceptCard title="ENSEMBLE" subtitle="Le meilleur des deux mondes" icon="web-puzzle" width={560} height={210} accent />
      </div>
      <MascotShot
        scene={scene}
        pose="happy"
        attitude="excited"
        side="right"
        size={460}
        from={0}
        halo="accent"
      />
    </div>
  );
};

export const Beat46: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pClair = clock.p(clock.at("clair", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.md }}>
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: radius.pill,
          backgroundColor: colors.surfaceDark,
          border: `${strokeWidths.thick}px solid ${colors.accent}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${pClair})`,
        }}
      >
        <Icon kind="bulb" size={110} color={colors.accent} />
      </div>
      <BrandText role="h2" color={colors.inkInverse}>C&apos;est plus clair ?</BrandText>
    </div>
  );
};

export const Beat47: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pLike = clock.p(clock.at("aimé", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
      <div style={{ transform: `scale(${pLike})` }}>
        <LibIcon id="web-heart" size={180} color={colors.accent} />
      </div>
      <TagPill tone="light" icon="bulb">Si vous avez aimé la vidéo</TagPill>
    </div>
  );
};

export const Beat48: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clock = useWordClock(scene, siteWebTranscript);
  const pSub = clock.p(clock.at("abonner", 0), durations.fast, easings.spring);
  const secondsFromSub = Math.max(0, frame / fps - clock.at("abonner", 0));

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ ...abs(70, band.top + 80), transform: `scale(${pSub})` }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: spacing.md,
            padding: `${spacing.md}px ${spacing.xl}px`,
            borderRadius: radius.pill,
            backgroundColor: colors.accent,
            boxShadow: `0 16px 40px ${withAlpha(colors.accent, 0.45)}`,
          }}
        >
          <LibIcon id="web-bell" size={54} color={colors.inkInverse} />
          <BrandText role="h2" color={colors.inkInverse}>S&apos;ABONNER !</BrandText>
        </div>
      </div>
      <Confetti x={120} y={band.top + 180} width={400} fall={500} seconds={secondsFromSub} />
      <MascotShot
        scene={scene}
        pose="happy"
        attitude="excited"
        side="right"
        size={460}
        from={0}
        halo="accent"
      />
    </div>
  );
};
