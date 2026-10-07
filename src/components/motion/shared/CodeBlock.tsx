/**
 * `<CodeBlock />` — rendu d'un extrait de code, sans animation.
 *
 * Primitive partagée par `CodeShowcase`, `Comparison` et `BeforeAfter` : elle
 * gère la coloration, les numéros de ligne, les lignes mises en évidence et le
 * mode diff. Les animations **ne sont pas** ici : chaque composant les ajoute
 * au-dessus (`CodeShowcase` anime la révélation, `Comparison` anime le bloc).
 *
 * Le panneau est toujours sombre (bleu nuit) : c'est un parti-pris de
 * lisibilité, la coloration `codeTokenColors` étant calibrée pour ce fond.
 */

import React from "react";

import { colors, fontFamilies, fontWeights, radius, spacing, typeScale } from "../../../config";
import { withAlpha } from "../../../utils/color";
import {
  codeTokenColors,
  tokenizeLine,
  type CodeLanguage,
  type CodeTokenType,
} from "./highlight";

export type CodeBlockVariant = "default" | "highlight" | "diff";

export type CodeBlockProps = {
  /** Code source complet, multi-lignes. */
  readonly code: string;
  readonly language?: CodeLanguage;
  readonly variant?: CodeBlockVariant;
  /** Affiche la gouttière des numéros de ligne. */
  readonly showLineNumbers?: boolean;
  /** Numéro de la première ligne (1 par défaut). */
  readonly startLine?: number;
  /** Lignes (1-based) mises en évidence — variante `highlight`. */
  readonly highlightLines?: readonly number[];
  /**
   * Nombre de caractères visibles depuis le début du code (effet machine à
   * écrire). `undefined` = tout le code est visible.
   */
  readonly visibleChars?: number;
  /**
   * Opacité (0..1) d'une ligne, pilotée par le parent pour animer l'apparition
   * ligne par ligne (progression 0 → 1). `undefined` = toutes visibles.
   */
  readonly lineReveal?: (index: number) => number;
  /** Taille de police ; par défaut `typeScale.code`. */
  readonly fontSize?: number;
  /** Coupe le code au-delà de N lignes (évite tout débordement). */
  readonly maxLines?: number;
  readonly style?: React.CSSProperties;
};

const DIFF_ADD_COLOR = colors.accent;
const DIFF_REMOVE_COLOR = colors.neutral;

const gutterStyle: React.CSSProperties = {
  color: withAlpha(colors.inkInverse, 0.35),
  minWidth: typeScale.code * 1.4,
  textAlign: "right",
  userSelect: "none",
};

const markerFor = (line: string): { readonly marker: string; readonly content: string; readonly color: string } | null => {
  const first = line.charAt(0);

  if (first === "+") {
    return { marker: "+", content: line.slice(1), color: DIFF_ADD_COLOR };
  }

  if (first === "-") {
    return { marker: "-", content: line.slice(1), color: DIFF_REMOVE_COLOR };
  }

  if (first === " ") {
    return { marker: " ", content: line.slice(1), color: withAlpha(colors.inkInverse, 0.4) };
  }

  return null;
};

/**
 * Rendu d'une ligne : tokens colorés, éventuellement tronqués pour l'effet
 * machine à écrire.
 */
const renderTokens = (content: string, language: CodeLanguage, limit: number) => {
  const visible = limit < content.length ? content.slice(0, limit) : content;
  const tokens = tokenizeLine(visible, language);

  return tokens.map((token, index) => (
    <span key={index} style={{ color: codeTokenColors[token.type as CodeTokenType] }}>
      {token.value}
    </span>
  ));
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "plain",
  variant = "default",
  showLineNumbers = false,
  startLine = 1,
  highlightLines,
  visibleChars,
  lineReveal,
  fontSize = typeScale.code,
  maxLines,
  style,
}) => {
  let lines = code.split("\n");

  if (maxLines !== undefined && lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
  }

  const highlighted =
    highlightLines !== undefined && highlightLines.length > 0;
  let charsBefore = 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: fontFamilies.mono,
        fontSize,
        fontWeight: fontWeights.regular,
        lineHeight: 1.5,
        whiteSpace: "pre",
        ...style,
      }}
    >
      {lines.map((rawLine, index) => {
        const lineStart = charsBefore;
        charsBefore += rawLine.length + 1;

        const lineNumber = startLine + index;
        const isHighlighted =
          highlighted && highlightLines.indexOf(lineNumber) !== -1;
        const limit =
          visibleChars === undefined
            ? rawLine.length
            : Math.max(0, Math.min(rawLine.length, visibleChars - lineStart));

        const diff =
          variant === "diff" && rawLine.length > 0 ? markerFor(rawLine) : null;
        const content = diff ? diff.content : rawLine;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: spacing.sm,
              paddingLeft: spacing.sm,
              paddingRight: spacing.sm,
              borderRadius: radius.sm,
              backgroundColor: isHighlighted
                ? withAlpha(colors.accent, 0.16)
                : undefined,
              borderLeft: `4px solid ${
                isHighlighted ? colors.accent : "transparent"
              }`,
              // Hors mise en évidence : on estompe quand des lignes le sont.
              opacity:
                (highlighted && !isHighlighted ? 0.45 : 1) *
                (lineReveal ? lineReveal(index) : 1),
            }}
          >
            {showLineNumbers ? <span style={gutterStyle}>{lineNumber}</span> : null}
            {diff ? (
              <span style={{ color: diff.color, minWidth: fontSize * 0.7 }}>
                {diff.marker}
              </span>
            ) : null}
            <span>
              {renderTokens(content, language, limit)}
              {limit < content.length ? (
                <span style={{ color: colors.accent }}>▍</span>
              ) : null}
            </span>
          </div>
        );
      })}
    </div>
  );
};
