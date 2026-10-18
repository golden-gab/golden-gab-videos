/**
 * Scènes 33 à 48 — Web Story « C'est quoi un site web »
 *
 * Bloc 4 (fin) : trouver l'information, puis « un site peut aussi faire autre
 * chose » (33-38)
 * Bloc 5 : conclusion, les deux se mélangent, appel à s'abonner (39-48)
 */

import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

import { BrandText } from "../../../../../components/common/BrandText";
import {
  abs,
  Art,
  Confetti,
  Icon,
  LibIcon,
  lit,
  Magnifier,
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
  Bell,
  Bubble,
  Card,
  CheckMark,
  Forbidden,
  Lines,
  ModeCard,
  Pill,
  Shot,
  Skeleton,
  useSince,
} from "../../../kit";
import { siteWebTranscript } from "../data/transcript.ts";

type BeatProps = { readonly scene: Scene };

const useClock = (scene: Scene) => useWordClock(scene, siteWebTranscript);

/** Une « page » de blocs (grille 3 × 2) dans laquelle on cherche. */
const BlockGrid: React.FC<{ readonly pick: number; readonly on: number }> = ({ pick, on }) => (
  <div style={{ display: "grid", gridTemplateColumns: "260px 260px 260px", gap: 28 }}>
    {Array.from({ length: 6 }, (_, index) => (
      <div
        key={index}
        style={{
          height: 200,
          borderRadius: radius.md,
          backgroundColor: index === pick && on > 0.5 ? colors.accent : withAlpha(colors.inkInverse, 0.2),
          border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.3)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {index === pick ? <CheckMark size={110} progress={on} color={colors.inkInverse} /> : null}
      </div>
    ))}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  33 · « de trouver facilement les informations qu'ils recherchent. »         */
/* -------------------------------------------------------------------------- */
export const Beat33: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const sweep = clock.p(clock.at("trouver", 0), 1.6, (x) => x);
  const found = lit(clock, clock.at("recherchent.", 0), 0.25);
  const x = interpolate(sweep, [0, 0.35, 0.7, 1], [150, 560, 150, 430]);
  const y = interpolate(sweep, [0, 0.35, 0.7, 1], [130, 130, 360, 360]);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={abs(24, 40, 888, 460)}>
          <BlockGrid pick={4} on={found} />
        </div>
        <Magnifier x={x} y={y} size={150} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  34 · « Mais ça ne veut pas dire qu'un site web »                            */
/* -------------------------------------------------------------------------- */
export const Beat34: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const reveal = clock.p(clock.at("veut", 0), 0.5);
  const icons = ["web-message-circle", "web-credit-card", "web-user-plus"];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        <div style={{ ...abs(38, 20, 860, 600), display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
          {icons.map((icon, index) => (
            <div key={icon} style={{ opacity: reveal, transform: `scale(${0.6 + 0.4 * reveal})` }}>
              <Bubble size={240} active={index === 1}>
                <LibIcon id={icon} size={120} color={colors.inkInverse} />
              </Bubble>
            </div>
          ))}
        </div>
        <div style={{ ...abs(38, 20, 860, 600), transform: `translateX(${interpolate(reveal, [0, 1], [0, 920])}px)` }}>
          <Card w={860} h={600} style={{ justifyContent: "flex-start", alignItems: "stretch", padding: 50, gap: 30 }}>
            <Skeleton w="50%" h={34} />
            <Skeleton w="100%" h={160} style={{ borderRadius: radius.md }} />
            <Lines fill={1} w={600} />
          </Card>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  35 · « ne peut rien faire d'autre, »                                        */
/* -------------------------------------------------------------------------- */
export const Beat35: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("d'autre,", 0);
  const crack = clock.p(t, 0.5, (x) => x);
  const ring = clock.p(t, 0.6);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(468 - 210, 20, 420, 420), borderRadius: radius.pill, backgroundColor: withAlpha(colors.ink, 0.85), border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.4)}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 + 0.05 * Math.sin(Math.PI * crack)})` }}>
          <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 150, lineHeight: 1, opacity: 1 - 0.7 * crack }}>
            Rien
          </BrandText>
        </div>
        <div style={abs(468 - 210, 20, 420, 420)}>
          <Forbidden size={420} progress={clock.p(clock.at("rien", 0), 0.5, (x) => x)} />
        </div>
        <Shockwave x={468} y={230} size={420} progress={ring} />
        <div style={{ ...abs(0, 520, 936, 120), display: "flex", justifyContent: "center", opacity: lit(clock, t, 0.2) }}>
          <Pill size={72}>Faux !</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  36 · « un site peut aussi proposer un formulaire de contact, »              */
/* -------------------------------------------------------------------------- */
export const Beat36: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const star = lit(clock, clock.at("aussi", 0), 0.4);
  const form = clock.p(clock.at("formulaire", 0), 0.6, (x) => x);
  const send = lit(clock, clock.at("contact,", 0), 0.2);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <Card w={720} h={700} active={send > 0.5} style={{ position: "absolute", left: 108, top: 30, gap: 34 }}>
          <Bubble size={130}>
            <LibIcon id="web-mail" size={76} color={colors.inkInverse} />
          </Bubble>
          {[0, 1, 2].map((field) => (
            <div key={field} style={{ width: 560, height: 70, borderRadius: radius.md, backgroundColor: withAlpha(colors.inkInverse, 0.15), border: `${strokeWidths.medium}px solid ${withAlpha(colors.inkInverse, 0.35)}`, overflow: "hidden" }}>
              <div style={{ width: `${Math.max(0, Math.min(1, form * 3 - field)) * 100}%`, height: "100%", backgroundColor: withAlpha(colors.accent, 0.8) }} />
            </div>
          ))}
          <Pill size={56} tone={send > 0.5 ? "accent" : "ghost"}>
            Contact
          </Pill>
        </Card>
        <Sparkle x={80} y={90} size={100} progress={star} />
        <Sparkle x={860} y={140} size={80} progress={Math.min(1, star * 1.2)} color={colors.accent} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  37 · « une réservation ou même un paiement. »                               */
/* -------------------------------------------------------------------------- */
export const Beat37: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const booking = lit(clock, 0, 0.2);
  const pay = lit(clock, clock.at("paiement.", 0), 0.25);

  return (
    <Shot scene={scene} layout="stack-right">
      <Art w={936} h={510}>
        <Card w={440} h={470} active={booking > 0.5} style={{ position: "absolute", left: 0, top: 20 }}>
          <Icon kind="calendar" size={180} color={colors.accent} />
          <CheckMark size={80} progress={booking} />
          <Pill size={48}>Réservation</Pill>
        </Card>
        <Card w={440} h={470} active={pay > 0.5} dim={0.35 + 0.65 * pay} style={{ position: "absolute", left: 496, top: 20 }}>
          <LibIcon id="web-credit-card" size={180} color={colors.accent} />
          <CheckMark size={80} progress={pay} />
          <Pill size={48}>Paiement</Pill>
        </Card>
      </Art>
      <ZoneMascot scene={scene} pose="surprised" attitude="surprised" from={clock.at("même", 0)} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  38 · « Et c'est justement pour ça que la différence entre les deux est aussi simple » */
/* -------------------------------------------------------------------------- */
export const Beat38: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const close = clock.p(clock.at("entre", 0), 0.9);
  const gap = interpolate(close, [0, 1], [160, 40]);
  const line = lit(clock, clock.at("simple.", 0), 0.25);
  const total = 400 * 2 + gap;
  const left = (936 - total) / 2;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={440}>
        <ModeCard w={400} h={360} label="Site" icon="web-globe" active style={{ position: "absolute", left, top: 20 }} />
        <ModeCard w={400} h={360} label="Appli web" icon="web-pointer-click" style={{ position: "absolute", left: left + 400 + gap, top: 20 }} />
        <div style={{ ...abs(left + 400 - 10, 190, gap + 20, 12), borderRadius: radius.pill, backgroundColor: colors.accent, opacity: line }} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  39 · « Un site web peut intégrer des fonctionnalités d'application. »       */
/* -------------------------------------------------------------------------- */
export const Beat39: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const pieces = [
    clock.p(clock.at("intégrer", 0), 0.5),
    clock.p(clock.at("fonctionnalités", 0), 0.5),
    clock.p(clock.at("d'application.", 0), 0.5),
  ];
  const spots = [
    { x: 30, y: 60, from: [-300, 0] },
    { x: 706, y: 60, from: [300, 0] },
    { x: 368, y: 600, from: [0, 260] },
  ];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <ModeCard w={440} h={440} label="Site web" icon="web-globe" active style={{ position: "absolute", left: 248, top: 150 }} />
        {spots.map((spot, index) => (
          <div key={index} style={{ ...abs(spot.x, spot.y, 200, 200), opacity: 0.15 + 0.85 * pieces[index], transform: `translate(${(1 - pieces[index]) * spot.from[0]}px, ${(1 - pieces[index]) * spot.from[1]}px) rotate(${(1 - pieces[index]) * 25}deg)` }}>
            <LibIcon id="web-puzzle" size={200} color={colors.accent} />
          </div>
        ))}
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  40 · « En gros, retenez ceci. »                                             */
/* -------------------------------------------------------------------------- */
export const Beat40: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("retenez", 0);
  const on = lit(clock, t, 0.25);
  const hit = punch(clock, t, 0.15, 0.5);

  return (
    <Shot scene={scene} layout="stack-right">
      <Art w={936} h={510}>
        <div style={{ ...abs(468 - 150, 10, 300, 300), opacity: 0.3 + 0.7 * on, filter: `drop-shadow(0 0 ${50 * on}px ${colors.accent})` }}>
          <Icon kind="bulb" size={300} color={on > 0.5 ? colors.accent : colors.inkInverse} strokeWidth={2.4} />
        </div>
        <div style={{ ...abs(0, 340, 936, 150), display: "flex", justifyContent: "center", transform: `scale(${hit})`, opacity: 0.4 + 0.6 * on }}>
          <Pill size={100}>À retenir</Pill>
        </div>
      </Art>
      <ZoneMascot scene={scene} pose="explaining" attitude="friendly" from={0} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  41 · « Le site web c'est principalement à présenter des informations, »     */
/* -------------------------------------------------------------------------- */
export const Beat41: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const fill = clock.p(clock.at("informations,", 0), 0.8, (x) => x);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <Card w={860} h={640} active style={{ position: "absolute", left: 38, top: 20, justifyContent: "flex-start", alignItems: "stretch", padding: 50, gap: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <LibIcon id="web-globe" size={110} color={colors.accent} />
            <Pill size={72}>Site web</Pill>
          </div>
          <Skeleton w="100%" h={150} style={{ borderRadius: radius.md, opacity: 0.4 + 0.6 * lit(clock, clock.at("présenter", 0), 0.3) }} />
          <Lines fill={fill} w={720} count={3} />
        </Card>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  42 · « tandis que l'application web met davantage l'accent sur »            */
/* -------------------------------------------------------------------------- */
export const Beat42: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const spot = lit(clock, clock.at("l'accent", 0), 0.3);
  const icons = ["web-message-circle", "web-play", "web-credit-card"];

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={760}>
        <Card w={860} h={700} active style={{ position: "absolute", left: 38, top: 30, justifyContent: "flex-start", gap: 40, paddingTop: 50, boxShadow: `0 0 ${60 * spot}px ${withAlpha(colors.accent, 0.5 * spot)}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <LibIcon id="web-pointer-click" size={110} color={colors.accent} />
            <Pill size={72}>Appli web</Pill>
          </div>
          <div style={{ display: "flex", gap: 30 }}>
            {icons.map((icon, index) => (
              <div key={icon} style={{ opacity: lit(clock, clock.at("web", 0) + index * 0.25, 0.2), transform: `scale(${1 + 0.12 * spot})` }}>
                <Bubble size={220} active>
                  <LibIcon id={icon} size={110} color={colors.inkInverse} />
                </Bubble>
              </div>
            ))}
          </div>
        </Card>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  43 · « les actions que l'utilisateur peut effectuer. »                      */
/* -------------------------------------------------------------------------- */
export const Beat43: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const taps = [lit(clock, clock.at("actions", 0), 0.2), lit(clock, clock.at("peut", 0), 0.2), lit(clock, clock.at("effectuer.", 0), 0.2)];
  const icons = ["web-message-circle", "web-play", "web-credit-card"];
  const cursor = clock.p(clock.at("actions", 0), 1.6, (x) => x);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={640}>
        {icons.map((icon, index) => (
          <div key={icon} style={{ ...abs(index * 320, 80, 280, 320), borderRadius: radius.lg, backgroundColor: taps[index] > 0.5 ? colors.accent : withAlpha(colors.ink, 0.85), border: `${strokeWidths.thick}px solid ${withAlpha(colors.inkInverse, 0.4)}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.3 + 0.7 * taps[index] }}>
            <LibIcon id={icon} size={150} color={colors.inkInverse} />
          </div>
        ))}
        <div style={abs(interpolate(cursor, [0, 1], [90, 700]), 330, 110, 110)}>
          <LibIcon id="web-pointer-click" size={110} color={colors.inkInverse} />
        </div>
        <div style={abs(790, 40, 140, 140)}>
          <CheckMark size={140} progress={taps[2]} />
        </div>
        <div style={{ ...abs(0, 480, 936, 120), display: "flex", justifyContent: "center" }}>
          <Pill size={72}>Actions</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  44 · « Et aujourd'hui, les deux peuvent »                                   */
/* -------------------------------------------------------------------------- */
export const Beat44: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const close = clock.p(clock.at("deux", 0), 0.7);
  const gap = interpolate(close, [0, 1], [180, 30]);
  const left = (936 - (400 * 2 + gap)) / 2;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={520}>
        <ModeCard w={400} h={400} label="Site" icon="web-globe" active style={{ position: "absolute", left, top: 60 }} />
        <ModeCard w={400} h={400} label="Appli web" icon="web-pointer-click" style={{ position: "absolute", left: left + 400 + gap, top: 60 }} />
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  45 · « parfaitement fonctionner ensemble. »                                 */
/* -------------------------------------------------------------------------- */
export const Beat45: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("ensemble.", 0);
  const snap = lit(clock, t, 0.25);
  const hit = punch(clock, t, 0.12, 0.5);
  const ring = clock.p(t, 0.6);

  return (
    <Shot scene={scene} layout="stack-left">
      <Art w={936} h={510}>
        <div style={{ ...abs(0, 40, 936, 430), display: "flex", justifyContent: "center", alignItems: "center", transform: `scale(${hit})` }}>
          <ModeCard w={420} h={400} label="Site" icon="web-globe" active style={{ marginRight: -20 }} />
          <ModeCard w={420} h={400} label="Appli web" icon="web-pointer-click" active={snap > 0.5} style={{ marginLeft: -20 }} />
        </div>
        <Shockwave x={468} y={255} size={300} progress={ring} />
        <Sparkle x={468} y={20} size={110} progress={snap} />
      </Art>
      <ZoneMascot scene={scene} pose="happy" attitude="excited" mirrored from={clock.at("parfaitement", 0)} />
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  46 · « Voilà, j'espère que c'est un peu plus clair maintenant, »            */
/* -------------------------------------------------------------------------- */
export const Beat46: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const frame = useCurrentFrame();
  const t = clock.at("clair", 0);
  const on = lit(clock, t, 0.3);
  const halo = clock.p(t, 0.9);
  const flicker = 1 + Math.sin(frame / 3) * 0.02;

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(468 - 320 * halo - 10, 250 - 320 * halo, 640 * halo + 20, 640 * halo), borderRadius: radius.pill, backgroundColor: withAlpha(colors.accent, 0.22 * on), filter: "blur(10px)" }} />
        <div style={{ ...abs(468 - 220, 30, 440, 440), transform: `scale(${flicker})`, opacity: 0.35 + 0.65 * on, filter: `drop-shadow(0 0 ${60 * on}px ${colors.accent})` }}>
          <Icon kind="bulb" size={440} color={on > 0.5 ? colors.accent : colors.inkInverse} strokeWidth={2.2} />
        </div>
        <div style={{ ...abs(0, 520, 936, 130), display: "flex", justifyContent: "center", opacity: on }}>
          <Pill size={84}>Plus clair</Pill>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  47 · « si vous avez aimé, n'hésitez surtout pas à »                         */
/* -------------------------------------------------------------------------- */
export const Beat47: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const heart = punch(clock, clock.at("aimé,", 0), 0.35, 0.5);
  const button = clock.p(clock.at("n'hésitez", 0), 0.4);

  return (
    <Shot scene={scene} layout="art">
      <Art w={936} h={700}>
        <div style={{ ...abs(468 - 150, 20, 300, 300), transform: `scale(${heart})` }}>
          <Bubble size={300}>
            <LibIcon id="web-heart" size={170} color={colors.inkInverse} />
          </Bubble>
        </div>
        <div style={{ ...abs(38, 400, 860, 190), borderRadius: radius.pill, backgroundColor: colors.accent, boxShadow: `0 24px 60px ${withAlpha(colors.accent, 0.5)}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 36, opacity: button, transform: `translateX(${interpolate(button, [0, 1], [500, 0])}px)` }}>
          <LibIcon id="web-bell" size={100} color={colors.inkInverse} />
          <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 84, lineHeight: 1 }}>
            S'abonner
          </BrandText>
        </div>
      </Art>
    </Shot>
  );
};

/* -------------------------------------------------------------------------- */
/*  48 · « à vous abonner. Ciao ! »                                             */
/* -------------------------------------------------------------------------- */
export const Beat48: React.FC<BeatProps> = ({ scene }) => {
  const clock = useClock(scene);
  const t = clock.at("abonner.", 0);
  const press = punch(clock, t, 0.08, 0.35);
  const swing = Math.sin(clock.p(t, 0.9, (x) => x) * Math.PI * 6) * 22 * (1 - clock.p(t, 0.9, (x) => x));
  const ring = clock.p(t, 0.6);
  const confetti = useSince(clock.at("Ciao!", 0));

  return (
    <Shot scene={scene} layout="stack-left">
      <Art w={936} h={510}>
        <div style={{ ...abs(38, 150, 860, 200), borderRadius: radius.pill, backgroundColor: colors.accent, boxShadow: `0 24px 60px ${withAlpha(colors.accent, 0.5)}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 36, transform: `scale(${press})` }}>
          <Bell size={110} swing={swing} />
          <BrandText role="display" color={colors.inkInverse} style={{ fontSize: 88, lineHeight: 1 }}>
            S'abonner
          </BrandText>
        </div>
        <Shockwave x={468} y={250} size={240} progress={ring} />
        <Confetti x={80} y={0} width={780} fall={440} seconds={confetti} count={22} />
      </Art>
      <ZoneMascot scene={scene} pose="happy" attitude="excited" mirrored from={0} />
    </Shot>
  );
};
