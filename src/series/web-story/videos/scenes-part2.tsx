/**
 * Scènes 11 à 20 — Web Story « Tu dors déjà »
 * Bloc 2 : Les atouts d'un site web et ce qu'on y trouve (23,86 s à 48,76 s)
 */

import React from "react";
import { interpolate } from "remotion";

import { BrandText } from "../../../components/common/BrandText";
import {
  ActionTile,
  Appear,
  BrowserFrame,
  ConceptCard,
  LibIcon,
  MascotShot,
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
/*  Beat 11 · 23,86–27,24 s · Les avantages des sites web                      */
/* -------------------------------------------------------------------------- */
export const Beat11: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const badgeScale = clock.p(clock.at("web", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Appear animation="pop" duration={0.4}>
        <BrowserFrame width={840} height={520} address="ton-activite.fr" secure tone="dark">
          <div style={{ padding: 40, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
            <div style={{ transform: `scale(${badgeScale})` }}>
              <div
                style={{
                  padding: "16px 36px",
                  borderRadius: radius.pill,
                  backgroundColor: colors.accent,
                  boxShadow: `0 14px 34px ${withAlpha(colors.accent, 0.45)}`,
                }}
              >
                <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 44 }}>
                  OUVERT 24H / 24
                </BrandText>
              </div>
            </div>
            <BrandText role="body" color={withAlpha(colors.inkInverse, 0.8)} style={{ fontSize: 26, textAlign: "center" }}>
              Votre vitrine professionnelle toujours accessible
            </BrandText>
          </div>
        </BrowserFrame>
      </Appear>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 12 · 27,24–29,55 s · Présenter toute ton entreprise                   */
/* -------------------------------------------------------------------------- */
export const Beat12: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const entScale = clock.p(clock.at("entreprise", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={840} height={520} address="ton-activite.fr/a-propos" secure tone="dark">
        <div style={{ padding: 36, height: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
          <TagPill tone="accent">À propos de l'entreprise</TagPill>
          <div
            style={{
              padding: 28,
              borderRadius: radius.md,
              backgroundColor: withAlpha(colors.inkInverse, 0.08),
              border: `${strokeWidths.thin}px solid ${withAlpha(colors.inkInverse, 0.2)}`,
              transform: `scale(${entScale})`,
            }}
          >
            <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 36 }}>
              Notre Mission & Nos Valeurs
            </BrandText>
            <BrandText role="body" color={withAlpha(colors.inkInverse, 0.7)} style={{ fontSize: 22, marginTop: 8 }}>
              Une présentation claire et rassurante de votre expertise.
            </BrandText>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 13 · 29,55–31,30 s · Expliquer tes services                           */
/* -------------------------------------------------------------------------- */
export const Beat13: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const sScale = clock.p(clock.at("services", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={840} height={520} address="ton-activite.fr/services" secure tone="dark">
        <div style={{ padding: 30, display: "flex", gap: 18, justifyContent: "center", transform: `scale(${sScale})` }}>
          <div style={{ width: 230, padding: 20, borderRadius: radius.md, backgroundColor: withAlpha(colors.inkInverse, 0.1), border: `${strokeWidths.thin}px solid ${withAlpha(colors.accent, 0.4)}` }}>
            <LibIcon id="web-globe" size={36} color={colors.accent} />
            <BrandText role="h3" color={colors.inkInverse} style={{ fontSize: 22, marginTop: 12 }}>Offre A</BrandText>
            <BrandText role="body" color={withAlpha(colors.inkInverse, 0.6)} style={{ fontSize: 16 }}>Détails clairs</BrandText>
          </div>
          <div style={{ width: 230, padding: 20, borderRadius: radius.md, backgroundColor: withAlpha(colors.inkInverse, 0.1), border: `${strokeWidths.thin}px solid ${withAlpha(colors.accent, 0.4)}` }}>
            <LibIcon id="web-credit-card" size={36} color={colors.accent} />
            <BrandText role="h3" color={colors.inkInverse} style={{ fontSize: 22, marginTop: 12 }}>Offre B</BrandText>
            <BrandText role="body" color={withAlpha(colors.inkInverse, 0.6)} style={{ fontSize: 16 }}>Tarifs transparents</BrandText>
          </div>
          <div style={{ width: 230, padding: 20, borderRadius: radius.md, backgroundColor: withAlpha(colors.inkInverse, 0.1), border: `${strokeWidths.thin}px solid ${withAlpha(colors.accent, 0.4)}` }}>
            <LibIcon id="web-users" size={36} color={colors.accent} />
            <BrandText role="h3" color={colors.inkInverse} style={{ fontSize: 22, marginTop: 12 }}>Offre C</BrandText>
            <BrandText role="body" color={withAlpha(colors.inkInverse, 0.6)} style={{ fontSize: 16 }}>Accompagnement</BrandText>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 14 · 31,30–32,76 s · Montrer tes réalisations                         */
/* -------------------------------------------------------------------------- */
export const Beat14: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const pScale = clock.p(clock.at("réalisations", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={840} height={520} address="ton-activite.fr/portfolio" secure tone="dark">
        <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16, transform: `scale(${pScale})` }}>
          <TagPill tone="accent">Galerie de projets terminés</TagPill>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ height: 160, borderRadius: radius.sm, backgroundColor: withAlpha(colors.inkInverse, 0.12), display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BrandText role="h3" color={colors.inkInverse} style={{ fontSize: 24 }}>Projet #1 ★★★★★</BrandText>
            </div>
            <div style={{ height: 160, borderRadius: radius.sm, backgroundColor: withAlpha(colors.inkInverse, 0.12), display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BrandText role="h3" color={colors.inkInverse} style={{ fontSize: 24 }}>Projet #2 ★★★★★</BrandText>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 15 · 32,76–34,73 s · Indiquer comment te contacter                    */
/* -------------------------------------------------------------------------- */
export const Beat15: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const cScale = clock.p(clock.at("contacter", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={840} height={520} address="ton-activite.fr/contact" secure tone="dark">
        <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 20, transform: `scale(${cScale})` }}>
          <TagPill tone="accent">Prise de contact directe</TagPill>
          <div style={{ display: "flex", gap: 20 }}>
            <ActionTile
              label="Formulaire Rapide"
              icon="web-mail"
              width={260}
              active
            />
            <ActionTile
              label="WhatsApp / Chat"
              icon="web-message-circle"
              width={260}
            />
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 16 · 34,73–37,59 s · Même quand tu n'es pas disponible                */
/* -------------------------------------------------------------------------- */
export const Beat16: React.FC<{ readonly scene: Scene }> = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 32 }}>
      {/* Côté Site : Ouvert */}
      <div
        style={{
          width: 380,
          height: 540,
          borderRadius: radius.md,
          backgroundColor: withAlpha(colors.ink, 0.8),
          border: `${strokeWidths.thick}px solid ${colors.accent}`,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TagPill tone="accent">Site Web</TagPill>
        <LibIcon id="web-globe" size={88} color={colors.accent} />
        <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 32, textAlign: "center" }}>
          ACTIF 24/7
        </BrandText>
      </div>

      {/* Côté Toi : Fermé */}
      <div
        style={{
          width: 380,
          height: 540,
          borderRadius: radius.md,
          backgroundColor: withAlpha(colors.ink, 0.5),
          border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.2)}`,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: 0.6,
        }}
      >
        <TagPill tone="ghost">Toi</TagPill>
        <LibIcon id="web-lock" size={88} color={withAlpha(colors.inkInverse, 0.4)} />
        <BrandText role="h2" color={withAlpha(colors.inkInverse, 0.6)} style={{ fontSize: 32, textAlign: "center" }}>
          INDISPONIBLE
        </BrandText>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 17 · 37,59–39,90 s · Occupé, tu dors, je ne sais pas quoi             */
/* -------------------------------------------------------------------------- */
export const Beat17: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const p1 = clock.p(clock.at("occupé", 0), durations.fast, easings.spring);
  const p2 = clock.p(clock.at("dors", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ ...abs(W / 2 - 280, band.top + 80, 560, 200), display: "flex", gap: 20 }}>
        <div style={{ padding: "16px 24px", borderRadius: radius.md, backgroundColor: withAlpha(colors.ink, 0.8), border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.2)}`, transform: `scale(${p1})` }}>
          <BrandText role="h3" color={colors.inkInverse} style={{ fontSize: 24 }}>Occupé</BrandText>
        </div>
        <div style={{ padding: "16px 24px", borderRadius: radius.md, backgroundColor: withAlpha(colors.accent, 0.2), border: `${strokeWidths.medium}px solid ${colors.accent}`, transform: `scale(${p2})` }}>
          <BrandText role="h3" color={colors.accent} style={{ fontSize: 24 }}>Tu dors</BrandText>
        </div>
      </div>
      <MascotShot scene={scene} pose="thinking" side="right" size={440} lift={30} delay={0.1} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 18 · 39,90–43,54 s · Découvrir ton activité                           */
/* -------------------------------------------------------------------------- */
export const Beat18: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const scrollOffset = interpolate(clock.p(clock.at("activité", 0), 1.2, easings.entrance), [0, 1], [0, -80]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={840} height={520} address="ton-activite.fr" secure tone="dark">
        <div style={{ padding: 32, transform: `translateY(${scrollOffset}px)` }}>
          <TagPill tone="accent">Navigation libre pour le prospect</TagPill>
          <div style={{ marginTop: 24, padding: 24, borderRadius: radius.md, backgroundColor: withAlpha(colors.inkInverse, 0.08) }}>
            <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 32 }}>
              Catalogue des Prestations
            </BrandText>
            <BrandText role="body" color={withAlpha(colors.inkInverse, 0.7)} style={{ fontSize: 20, marginTop: 8 }}>
              Le visiteur découvre l'ensemble de vos offres à son propre rythme.
            </BrandText>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 19 · 43,54–46,47 s · Décider si ce que tu proposes                    */
/* -------------------------------------------------------------------------- */
export const Beat19: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const matchScale = clock.p(clock.at("proposes", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 32 }}>
      <div style={{ width: 360, padding: 28, borderRadius: radius.md, backgroundColor: withAlpha(colors.ink, 0.7), border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.2)}` }}>
        <BrandText role="h3" color={colors.inkInverse} style={{ fontSize: 28 }}>Option 1</BrandText>
        <BrandText role="body" color={withAlpha(colors.inkInverse, 0.6)} style={{ fontSize: 20, marginTop: 8 }}>Formule Essentielle</BrandText>
      </div>
      <div style={{ width: 360, padding: 28, borderRadius: radius.md, backgroundColor: withAlpha(colors.ink, 0.9), border: `${strokeWidths.thick}px solid ${colors.accent}`, transform: `scale(${matchScale})` }}>
        <TagPill tone="accent">Idéal</TagPill>
        <BrandText role="h3" color={colors.accent} style={{ fontSize: 32, marginTop: 8 }}>Option 2</BrandText>
        <BrandText role="body" color={colors.inkInverse} style={{ fontSize: 20, marginTop: 8 }}>Formule Complète</BrandText>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 20 · 46,47–48,76 s · Correspondre à leur besoin                       */
/* -------------------------------------------------------------------------- */
export const Beat20: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const fitScale = clock.p(clock.at("besoin", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: `scale(${fitScale})` }}>
        <ConceptCard
          title="Besoin Confirmé"
          subtitle="Le prospect a trouvé la solution adaptée."
          icon="web-puzzle"
          width={640}
          height={180}
          accent
        />
      </div>
    </div>
  );
};
