/**
 * Scènes 21 à 30 — Web Story « Tu dors déjà »
 * Bloc 3 : La nuance essentielle, la question & l'outro (48,76 s à 74,50 s)
 */

import React from "react";

import { GoldenGabLogo } from "../../../components/brand/GoldenGabLogo";
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
/*  Beat 21 · 48,76–51,65 s · Faire la différence                              */
/* -------------------------------------------------------------------------- */
export const Beat21: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Appear animation="fade" style={{ ...abs(W / 2 - 280, band.top + 80, 560, 200) }}>
        <ConceptCard
          title="Nuance Importante"
          subtitle="Un socle d'information solide, pas de la magie."
          icon="web-newspaper"
          width={560}
          height={180}
          accent
        />
      </Appear>
      <MascotShot scene={scene} pose="explaining" side="right" size={460} lift={30} delay={0.1} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 22 · 51,65–54,56 s · Pas automatiquement des clients                  */
/* -------------------------------------------------------------------------- */
export const Beat22: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const alertScale = clock.p(clock.at("automatiquement", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: 620,
          padding: 36,
          borderRadius: radius.lg,
          backgroundColor: withAlpha(colors.ink, 0.85),
          border: `${strokeWidths.thick}px solid ${colors.accent}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          transform: `scale(${alertScale})`,
          boxShadow: `0 20px 50px ${withAlpha(colors.accent, 0.35)}`,
        }}
      >
        <div style={{ width: 80, height: 80, borderRadius: radius.pill, backgroundColor: withAlpha(colors.accent, 0.2), display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LibIcon id="web-lock" size={48} color={colors.accent} />
        </div>
        <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 36, textAlign: "center" }}>
          Pas d'apport automatique
        </BrandText>
        <BrandText role="body" color={withAlpha(colors.inkInverse, 0.8)} style={{ fontSize: 22, textAlign: "center" }}>
          Un site ne remplace pas votre visibilité ni votre travail.
        </BrandText>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 23 · 54,56–57,32 s · Entendre parler de ton activité                  */
/* -------------------------------------------------------------------------- */
export const Beat23: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const arrowScale = clock.p(clock.at("activité", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
      <TagPill tone="accent">Bouche-à-oreille & TikTok</TagPill>
      <div style={{ display: "flex", alignItems: "center", gap: 24, transform: `scale(${arrowScale})` }}>
        <div style={{ padding: "20px 32px", borderRadius: radius.md, backgroundColor: withAlpha(colors.ink, 0.8), border: `${strokeWidths.thin}px solid ${withAlpha(colors.inkInverse, 0.3)}` }}>
          <BrandText role="h3" color={colors.inkInverse} style={{ fontSize: 28 }}>Prospect Curieux</BrandText>
        </div>
        <BrandText role="display" color={colors.accent} style={{ fontSize: 48 }}>➔</BrandText>
        <div style={{ padding: "20px 32px", borderRadius: radius.md, backgroundColor: colors.accent }}>
          <BrandText role="h3" color={colors.inkInverse} style={{ fontSize: 28 }}>Ton Site Web</BrandText>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 24 · 57,32–59,37 s · Un endroit où se renseigner                      */
/* -------------------------------------------------------------------------- */
export const Beat24: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const popPin = clock.p(clock.at("endroit", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserFrame width={840} height={520} address="ton-activite.fr" secure tone="dark">
        <div style={{ padding: 40, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <div style={{ transform: `scale(${popPin})` }}>
            <LibIcon id="web-globe" size={72} color={colors.accent} />
          </div>
          <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 38, textAlign: "center" }}>
            Le Point d'Ancrage Officiel
          </BrandText>
          <TagPill tone="accent">Toutes les réponses au même endroit</TagPill>
        </div>
      </BrowserFrame>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 25 · 59,37–62,09 s · Sans devoir attendre                             */
/* -------------------------------------------------------------------------- */
export const Beat25: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const unlock = clock.p(clock.at("attendre", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
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
          transform: `scale(${unlock})`,
        }}
      >
        <LibIcon id="web-lock" size={64} color={colors.accent} />
        <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 36 }}>
          Accès Libre & Immédiat
        </BrandText>
        <TagPill tone="accent">Zéro temps d'attente</TagPill>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 26 · 62,09–65,30 s · Alors dis-moi                                    */
/* -------------------------------------------------------------------------- */
export const Beat26: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Appear animation="pop" style={{ ...abs(W / 2 - 240, band.top + 60, 480, 140) }}>
        <div style={{ padding: "16px 28px", borderRadius: radius.pill, backgroundColor: colors.accent, textAlign: "center" }}>
          <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 36 }}>
            Question pour toi !
          </BrandText>
        </div>
      </Appear>
      <MascotShot scene={scene} pose="point" side="left" size={480} lift={40} delay={0.1} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 27 · 65,30–66,80 s · Ce soir pendant que tu dors                      */
/* -------------------------------------------------------------------------- */
export const Beat27: React.FC<{ readonly scene: Scene }> = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Appear animation="pop" duration={0.3}>
        <div
          style={{
            width: 580,
            padding: 36,
            borderRadius: radius.lg,
            backgroundColor: withAlpha(colors.ink, 0.85),
            border: `${strokeWidths.medium}px solid ${withAlpha(colors.accent, 0.4)}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <BrandText role="display" color={colors.accent} style={{ fontSize: 56 }}>
            CE SOIR · 23H
          </BrandText>
          <TagPill tone="accent">Pendant que tu dors</TagPill>
        </div>
      </Appear>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 28 · 66,80–70,28 s · Sans t'envoyer un message ?                      */
/* -------------------------------------------------------------------------- */
export const Beat28: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const qScale = clock.p(clock.at("message", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 32 }}>
      {/* Option A : Bloqué */}
      <div style={{ width: 360, padding: 28, borderRadius: radius.md, backgroundColor: withAlpha(colors.ink, 0.6), border: `${strokeWidths.thin}px solid ${withAlpha(colors.inkInverse, 0.2)}`, opacity: 0.7 }}>
        <LibIcon id="web-message-circle" size={44} color={withAlpha(colors.inkInverse, 0.4)} />
        <BrandText role="h3" color={withAlpha(colors.inkInverse, 0.6)} style={{ fontSize: 24, marginTop: 12 }}>
          Message en attente
        </BrandText>
        <BrandText role="body" color={withAlpha(colors.inkInverse, 0.4)} style={{ fontSize: 18 }}>Réponse demain ?</BrandText>
      </div>

      {/* Option B : Site immédiat */}
      <div style={{ width: 360, padding: 28, borderRadius: radius.md, backgroundColor: withAlpha(colors.ink, 0.9), border: `${strokeWidths.thick}px solid ${colors.accent}`, transform: `scale(${qScale})` }}>
        <LibIcon id="web-globe" size={44} color={colors.accent} />
        <BrandText role="h3" color={colors.accent} style={{ fontSize: 28, marginTop: 12 }}>
          Site Web Vitrine
        </BrandText>
        <BrandText role="body" color={colors.inkInverse} style={{ fontSize: 18 }}>Informé immédiatement</BrandText>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 29 · 70,28–72,36 s · T'abonner                                        */
/* -------------------------------------------------------------------------- */
export const Beat29: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const clock = useWordClock(scene, webStoryTranscript);
  const subScale = clock.p(clock.at("t'abonner", 0), durations.fast, easings.spring);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ ...abs(W / 2 - 280, band.top + 80, 560, 160), transform: `scale(${subScale})` }}>
        <ActionTile
          label="S'abonner aux conseils web"
          icon="web-bell"
          width={560}
          active
        />
      </div>
      <MascotShot scene={scene} pose="happy" side="right" size={460} lift={30} delay={0.1} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat 30 · 72,36–74,50 s · Outro & Ciao                                     */
/* -------------------------------------------------------------------------- */
export const Beat30: React.FC<{ readonly scene: Scene }> = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
      <GoldenGabLogo width={540} />
      <BrandText role="h2" color={colors.inkInverse} style={{ fontSize: 44, letterSpacing: 2 }}>
        golden-gab.fr
      </BrandText>
    </div>
  );
};
