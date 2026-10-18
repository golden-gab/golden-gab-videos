/**
 * Scènes 19 à 38 — Web Story « C'est quoi un site web »
 *
 * Bloc 3 : Les actions de l'application & la définition du site web (19 à 28)
 * Bloc 4 : Exemples de sites & fonctionnalités hybrides (29 à 38)
 */

import React from "react";
import { interpolate } from "remotion";

import { BrandText } from "../../../../../components/common/BrandText";
import {
  ActionTile,
  BrowserFrame,
  Burst,
  ConceptCard,
  Icon,
  LibIcon,
  Magnifier,
  MascotShot,
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
/*  Bloc 3 : Beats 19 à 28                                                     */
/* -------------------------------------------------------------------------- */

export const Beat19: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pApp = clock.p(clock.at("particularité", 0), durations.fast);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ ...abs(80, band.top + 160), transform: `scale(${pApp})` }}>
        <ConceptCard title="L'APPLICATION WEB" subtitle="Agir et interagir" icon="web-pointer-click" width={560} height={180} accent />
      </div>
      <MascotShot
        scene={scene}
        pose="explaining"
        attitude="friendly"
        side="right"
        size={460}
        from={0}
        halo="soft"
      />
    </div>
  );
};

export const Beat20: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pAct = clock.p(clock.at("actions", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
      <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
        <LibIcon id="web-pointer-click" size={90} color={colors.accent} />
        <BrandText role="h1" color={colors.inkInverse}>EFFECTUER DES ACTIONS</BrandText>
      </div>
      <div style={{ display: "flex", gap: spacing.md, transform: `scale(${pAct})` }}>
        <TagPill tone="accent" icon="check">Cliquer</TagPill>
        <TagPill tone="light" icon="user">Participer</TagPill>
        <TagPill tone="ghost" icon="bulb">Modifier</TagPill>
      </div>
    </div>
  );
};

export const Beat21: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pLoop = clock.p(clock.at("systèmes", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: spacing.xl }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.sm }}>
        <div style={{ width: 140, height: 140, borderRadius: radius.pill, backgroundColor: colors.surfaceDark, border: `${strokeWidths.medium}px solid ${colors.inkInverse}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon kind="user" size={80} color={colors.inkInverse} />
        </div>
        <BrandText role="label" color={colors.inkInverse}>Utilisateur</BrandText>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.xs, transform: `scale(${pLoop})` }}>
        <BrandText role="h2" color={colors.accent}>⇄</BrandText>
        <TagPill tone="accent" icon="check">Interactions</TagPill>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.sm }}>
        <div style={{ width: 140, height: 140, borderRadius: radius.lg, backgroundColor: colors.surfaceDark, border: `${strokeWidths.medium}px solid ${colors.accent}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon kind="box" size={80} color={colors.accent} />
        </div>
        <BrandText role="label" color={colors.accent}>Système / Serveur</BrandText>
      </div>
    </div>
  );
};

export const Beat22: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pLog = clock.p(clock.at("connectant", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={760} height={460} address="mon-compte / connexion" secure tone="dark">
        <div style={{ padding: spacing.lg, display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.md, marginTop: 20 }}>
          <TagPill tone="ghost" icon="user">Créer un compte</TagPill>
          <div style={{ width: "80%", height: 50, borderRadius: radius.sm, backgroundColor: withAlpha(colors.inkInverse, 0.15) }} />
          <div style={{ width: "80%", height: 50, borderRadius: radius.sm, backgroundColor: withAlpha(colors.inkInverse, 0.15) }} />
          <div style={{ transform: `scale(${pLog > 0 ? 1 : 0.8})` }}>
            <TagPill tone="accent" icon="check">Se connecter</TagPill>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

export const Beat23: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pMsg = clock.p(clock.at("messages", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: `scale(${pMsg})` }}>
        <ActionTile icon="web-message-circle" label="Envoyer des messages" width={460} active />
      </div>
    </div>
  );
};

export const Beat24: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pBuy = clock.p(clock.at("achat", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
      <ActionTile icon="web-play" label="Publier des vidéos" width={340} />
      <div style={{ transform: `scale(${pBuy})` }}>
        <ActionTile icon="web-credit-card" label="Effectuer un achat" width={340} active />
      </div>
    </div>
  );
};

export const Beat25: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pWeb = clock.p(clock.at("web", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={820} height={500} address="c-est-quoi-un-site-web" secure>
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.md }}>
          <div style={{ width: 140, height: 140, borderRadius: radius.pill, backgroundColor: colors.accent, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pWeb})` }}>
            <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 100 }}>?</BrandText>
          </div>
          <BrandText role="h2" color={colors.secondary}>UN SITE WEB</BrandText>
        </div>
      </BrowserFrame>
    </div>
  );
};

export const Beat26: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pObj = clock.p(clock.at("objectif", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={820} height={480} address="mon-site.com" secure>
        <div style={{ padding: spacing.lg, display: "flex", flexDirection: "column", gap: spacing.md }}>
          <div style={{ width: "50%", height: 36, backgroundColor: colors.neutral, borderRadius: radius.sm }} />
          <div style={{ width: "90%", height: 20, backgroundColor: withAlpha(colors.secondary, 0.15), borderRadius: radius.sm }} />
          <div style={{ width: "75%", height: 20, backgroundColor: withAlpha(colors.secondary, 0.15), borderRadius: radius.sm }} />
          <div style={{ display: "flex", justifyContent: "center", marginTop: spacing.md, transform: `scale(${pObj})` }}>
            <TagPill tone="accent" icon="check">Objectif Principal</TagPill>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

export const Beat27: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pVis = clock.p(clock.at("visiteurs", 0));

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ ...abs(70, band.top + 80), transform: `scale(${pVis})` }}>
        <BrowserFrame width={540} height={420} address="informations.com" secure>
          <div style={{ padding: spacing.md, display: "flex", flexDirection: "column", gap: spacing.sm }}>
            <TagPill tone="light" icon="user">Présenter des infos</TagPill>
            <div style={{ width: "90%", height: 16, backgroundColor: withAlpha(colors.secondary, 0.2), borderRadius: radius.sm }} />
            <div style={{ width: "80%", height: 16, backgroundColor: withAlpha(colors.secondary, 0.2), borderRadius: radius.sm }} />
            <div style={{ width: "65%", height: 16, backgroundColor: withAlpha(colors.secondary, 0.2), borderRadius: radius.sm }} />
          </div>
        </BrowserFrame>
      </div>
      <MascotShot
        scene={scene}
        pose="point"
        attitude="confident"
        side="right"
        size={460}
        from={0}
        halo="soft"
      />
    </div>
  );
};

export const Beat28: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pShop = clock.p(clock.at("entreprises", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={820} height={480} address="mon-entreprise.com" secure>
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.md }}>
          <div style={{ transform: `scale(${pShop})` }}>
            <Icon kind="shop" size={130} color={colors.accent} />
          </div>
          <BrandText role="h2" color={colors.secondary}>SITE D&apos;ENTREPRISE</BrandText>
        </div>
      </BrowserFrame>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Bloc 4 : Beats 29 à 38                                                     */
/* -------------------------------------------------------------------------- */

export const Beat29: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const p1 = clock.p(clock.at("services", 0));
  const p2 = clock.p(clock.at("réalisations", 0));
  const p3 = clock.p(clock.at("tarifs", 0));
  const p4 = clock.p(clock.at("coordonnées", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.md }}>
      <div style={{ display: "flex", gap: spacing.md }}>
        <div style={{ transform: `scale(${p1})`, opacity: p1 }}><TagPill tone="light" icon="check">Services</TagPill></div>
        <div style={{ transform: `scale(${p2})`, opacity: p2 }}><TagPill tone="light" icon="box">Réalisations</TagPill></div>
      </div>
      <div style={{ display: "flex", gap: spacing.md }}>
        <div style={{ transform: `scale(${p3})`, opacity: p3 }}><TagPill tone="accent" icon="tag">Tarifs</TagPill></div>
        <div style={{ transform: `scale(${p4})`, opacity: p4 }}><TagPill tone="light" icon="user">Coordonnées</TagPill></div>
      </div>
    </div>
  );
};

export const Beat30: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pArt = clock.p(clock.at("articles", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={780} height={460} address="le-blog-tech.fr" secure>
        <div style={{ padding: spacing.lg, display: "flex", flexDirection: "column", gap: spacing.md }}>
          <div style={{ transform: `scale(${pArt})` }}>
            <TagPill tone="accent" icon="bulb">Blog & Articles</TagPill>
          </div>
          <div style={{ width: "100%", padding: spacing.md, borderRadius: radius.md, backgroundColor: withAlpha(colors.secondary, 0.08) }}>
            <BrandText role="label" color={colors.secondary}>Article 1 : Comment débuter le dev web</BrandText>
          </div>
          <div style={{ width: "100%", padding: spacing.md, borderRadius: radius.md, backgroundColor: withAlpha(colors.secondary, 0.08) }}>
            <BrandText role="label" color={colors.secondary}>Article 2 : Les secrets des navigateurs</BrandText>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

export const Beat31: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pNews = clock.p(clock.at("dernières", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
      <BrowserFrame width={820} height={480} address="actualite-en-direct.com" secure>
        <div style={{ padding: spacing.lg, display: "flex", flexDirection: "column", gap: spacing.md }}>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
            <div style={{ transform: `scale(${pNews})` }}>
              <TagPill tone="accent" icon="check">Dernières actualités</TagPill>
            </div>
            <BrandText role="label" color={colors.secondary}>En continu</BrandText>
          </div>
          <div style={{ width: "90%", height: 24, backgroundColor: withAlpha(colors.secondary, 0.2), borderRadius: radius.sm }} />
          <div style={{ width: "80%", height: 24, backgroundColor: withAlpha(colors.secondary, 0.2), borderRadius: radius.sm }} />
          <div style={{ width: "95%", height: 24, backgroundColor: withAlpha(colors.secondary, 0.2), borderRadius: radius.sm }} />
        </div>
      </BrowserFrame>
    </div>
  );
};

export const Beat32: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pVis = clock.p(clock.at("visiteurs", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.md }}>
      <div style={{ width: 180, height: 180, borderRadius: radius.pill, backgroundColor: colors.surfaceDark, border: `${strokeWidths.thick}px solid ${colors.accent}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pVis})` }}>
        <Icon kind="user" size={100} color={colors.inkInverse} />
      </div>
      <BrandText role="h2" color={colors.inkInverse}>Pour les visiteurs</BrandText>
    </div>
  );
};

export const Beat33: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pFind = clock.p(clock.at("recherchent", 0));
  const magX = interpolate(pFind, [0, 1], [300, 540]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ ...abs(120, band.top + 80) }}>
        <BrowserFrame width={840} height={460} address="trouver-facilement.com" secure>
          <div style={{ padding: spacing.lg, display: "flex", flexDirection: "column", gap: spacing.md }}>
            <TagPill tone="light" icon="bulb">Recherche d&apos;informations</TagPill>
            <div style={{ width: "85%", height: 30, backgroundColor: withAlpha(colors.secondary, 0.15), borderRadius: radius.sm }} />
            <div style={{ width: "70%", height: 30, backgroundColor: withAlpha(colors.secondary, 0.15), borderRadius: radius.sm }} />
            <div style={{ width: "90%", height: 30, backgroundColor: withAlpha(colors.accent, 0.35), borderRadius: radius.sm }} />
          </div>
        </BrowserFrame>
      </div>
      <Magnifier x={magX} y={band.top + 340} size={110} />
    </div>
  );
};

export const Beat34: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pRot = clock.p(clock.at("mais", 0), durations.slow);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: `rotateY(${pRot * 20}deg)` }}>
        <ConceptCard title="MAIS ATTENTION..." subtitle="Un site peut faire plus !" icon="web-puzzle" width={780} height={200} />
      </div>
    </div>
  );
};

export const Beat35: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pPop = clock.p(clock.at("rien", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
      <div style={{ transform: `scale(${pPop})` }}>
        <TagPill tone="accent" icon="bulb">Il ne se limite pas à ça !</TagPill>
      </div>
      <Burst x={W / 2} y={H / 2} radius={120} progress={pPop} color={colors.accent} />
    </div>
  );
};

export const Beat36: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pForm = clock.p(clock.at("formulaire", 0));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={780} height={480} address="mon-site.com/contact" secure>
        <div style={{ padding: spacing.lg, display: "flex", flexDirection: "column", gap: spacing.sm, alignItems: "center" }}>
          <div style={{ transform: `scale(${pForm})` }}>
            <TagPill tone="accent" libIcon="web-mail">Formulaire de contact</TagPill>
          </div>
          <div style={{ width: "80%", height: 36, backgroundColor: withAlpha(colors.secondary, 0.12), borderRadius: radius.sm }} />
          <div style={{ width: "80%", height: 36, backgroundColor: withAlpha(colors.secondary, 0.12), borderRadius: radius.sm }} />
          <div style={{ width: "80%", height: 70, backgroundColor: withAlpha(colors.secondary, 0.12), borderRadius: radius.sm }} />
        </div>
      </BrowserFrame>
    </div>
  );
};

export const Beat37: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pPay = clock.p(clock.at("paiement", 0));

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ ...abs(80, band.top + 80), display: "flex", flexDirection: "column", gap: spacing.md }}>
        <TagPill tone="light" icon="calendar">Réservation en ligne</TagPill>
        <div style={{ transform: `scale(${pPay})` }}>
          <TagPill tone="accent" libIcon="web-credit-card">Paiement sécurisé</TagPill>
        </div>
      </div>
      <MascotShot
        scene={scene}
        pose="surprised"
        attitude="surprised"
        side="right"
        size={460}
        from={clock.at("réservation", 0)}
        halo="accent"
      />
    </div>
  );
};

export const Beat38: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, siteWebTranscript);
  const pClose = clock.p(clock.at("simple", 0), durations.slow);
  const dy = interpolate(pClose, [0, 1], [0, 70]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: "100px 0" }}>
      <div style={{ transform: `translateY(${dy}px)` }}>
        <ConceptCard title="SITE WEB" icon="web-globe" width={760} height={160} />
      </div>
      <div style={{ transform: `translateY(${-dy}px)` }}>
        <ConceptCard title="APPLICATION WEB" icon="web-pointer-click" width={760} height={160} accent />
      </div>
    </div>
  );
};
