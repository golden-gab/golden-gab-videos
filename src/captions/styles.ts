/**
 * Golden Gab — styles de captions.
 *
 * Un style est un preset complet : typographie, couleurs, gabarit et
 * animations. Les composants de captions ne connaissent que ce contrat.
 *
 * Pour ajouter un style : ajouter une entrée dans `captionStyles` et la
 * clé correspondante dans `CaptionStyleName`. Rien d'autre à toucher.
 */

import { defaultAppearAnimation, durations } from "../config/animation";
import { colors, palette } from "../config/colors";
import { radius } from "../config/spacing";
import { fontFamilies, fontWeights, typeScale } from "../config/typography";
import { captionZone } from "../config/video";
import type { AppearAnimation } from "../utils/animation";
import { withAlpha } from "../utils/color";

export type CaptionStyleName = "default" | "card" | "subtle";

/** Comment le mot actif est mis en évidence. */
export type CaptionEmphasisMode =
  /** Le mot prononcé est mis en avant (karaoké), calculé depuis son timing. */
  | "word"
  /** Tous les mots marqués `emphasis` restent mis en avant. */
  | "segment"
  /** Aucune mise en évidence. */
  | "none";

export type CaptionStylePreset = {
  readonly name: CaptionStyleName;
  readonly fontFamily: string;
  readonly fontWeight: number;
  readonly letterSpacing: string;
  readonly uppercase: boolean;
  /** Taille maximale ; réduite automatiquement si le texte est trop large. */
  readonly maxFontSize: number;
  readonly lineHeight: number;
  readonly color: string;
  readonly emphasisColor: string;
  readonly emphasisMode: CaptionEmphasisMode;
  /** Contour du texte (0 = aucun). */
  readonly strokeWidth: number;
  readonly strokeColor: string;
  /** Fond du bloc (null = aucun). */
  readonly backgroundColor: string | null;
  readonly paddingX: number;
  readonly paddingY: number;
  readonly borderRadius: number;
  readonly textAlign: "left" | "center" | "right";
  /** Largeur maximale du texte, en ratio de la largeur de composition. */
  readonly maxWidthRatio: number;
  /** Décalage depuis le bas, en pixels. */
  readonly bottom: number;
  readonly appearAnimation: AppearAnimation;
  readonly exitAnimation: AppearAnimation;
  /** Durée d'apparition, en secondes. */
  readonly appearDuration: number;
  /** Durée de disparition, en secondes. */
  readonly exitDuration: number;
};

/**
 * Style par défaut : reprend le parti-pris "TikTok" du template
 * (capitales grasses + contour), recoloré aux couleurs Golden Gab.
 */
const defaultStyle: CaptionStylePreset = {
  name: "default",
  fontFamily: fontFamilies.title,
  fontWeight: fontWeights.black,
  letterSpacing: "0em",
  uppercase: true,
  maxFontSize: typeScale.caption,
  lineHeight: 1,
  color: colors.captionText,
  emphasisColor: colors.captionHighlight,
  emphasisMode: "word",
  // Contour fin : Darker Grotesque a des fûts plus fins que la police du
  // template. Un contour trop épais recouvre le remplissage du glyphe.
  strokeWidth: 8,
  strokeColor: colors.outline,
  backgroundColor: null,
  paddingX: 0,
  paddingY: 0,
  borderRadius: 0,
  textAlign: "center",
  maxWidthRatio: captionZone.maxWidthRatio,
  bottom: captionZone.bottom,
  appearAnimation: defaultAppearAnimation,
  exitAnimation: "fade",
  appearDuration: durations.fast,
  exitDuration: durations.instant,
};

/**
 * Style "card" : bloc bleu nuit arrondi, texte crème.
 * Lisible sur n'importe quel fond vidéo.
 */
const cardStyle: CaptionStylePreset = {
  name: "card",
  fontFamily: fontFamilies.title,
  fontWeight: fontWeights.bold,
  letterSpacing: "0em",
  uppercase: true,
  maxFontSize: typeScale.caption * 0.8,
  lineHeight: 1.05,
  color: colors.inkInverse,
  emphasisColor: palette.coral,
  emphasisMode: "word",
  strokeWidth: 0,
  strokeColor: "transparent",
  backgroundColor: colors.surfaceDark,
  paddingX: 44,
  paddingY: 28,
  borderRadius: radius.lg,
  textAlign: "center",
  maxWidthRatio: 0.82,
  bottom: captionZone.bottom,
  appearAnimation: "slide-up",
  exitAnimation: "fade",
  appearDuration: durations.base,
  exitDuration: durations.fast,
};

/**
 * Style "subtle" : texte crème sans contour, sur un fond sombre diffus.
 * À réserver aux passages posés / narratifs.
 */
const subtleStyle: CaptionStylePreset = {
  name: "subtle",
  fontFamily: fontFamilies.title,
  fontWeight: fontWeights.semibold,
  letterSpacing: "0.01em",
  uppercase: false,
  maxFontSize: typeScale.caption * 0.72,
  lineHeight: 1.15,
  color: colors.inkInverse,
  emphasisColor: palette.coral,
  emphasisMode: "segment",
  strokeWidth: 0,
  strokeColor: "transparent",
  backgroundColor: withAlpha(palette.charcoal, 0.62),
  paddingX: 36,
  paddingY: 22,
  borderRadius: radius.md,
  textAlign: "left",
  maxWidthRatio: 0.8,
  bottom: captionZone.bottom,
  appearAnimation: "fade",
  exitAnimation: "fade",
  appearDuration: durations.base,
  exitDuration: durations.base,
};

export const captionStyles: Record<CaptionStyleName, CaptionStylePreset> = {
  default: defaultStyle,
  card: cardStyle,
  subtle: subtleStyle,
};

export type CaptionStyleOverrides = Partial<
  Omit<CaptionStylePreset, "name">
>;

/** Fusionne un preset avec des surcharges ponctuelles. */
export const resolveCaptionStyle = (
  style: CaptionStyleName,
  overrides?: CaptionStyleOverrides,
): CaptionStylePreset => {
  const preset = captionStyles[style];

  return overrides ? { ...preset, ...overrides, name: preset.name } : preset;
};
