/**
 * Coloration syntaxique minimale pour le motion design.
 *
 * ⚠️ Ce n'est **pas** un éditeur de code ni un highlighter de production :
 * c'est un tokeniseur ligne à ligne, volontairement réduit, qui colore juste
 * assez de choses pour qu'un extrait reste lisible dans une vidéo verticale.
 *
 * Aucune dépendance : ajouter un paquet de coloration (Prism, Shiki…) serait
 * disproportionné pour 5 lignes de code affichées à l'écran (règle 29).
 *
 * Les couleurs proviennent uniquement de la palette (`palette`) et des alias
 * sémantiques (`colors`) : pas de thème de coloration arbitraire.
 */

import { colors, palette } from "../../../config";
import { withAlpha } from "../../../utils/color";

/** Langages reconnus par le tokeniseur (volontairement peu nombreux). */
export type CodeLanguage =
  | "typescript"
  | "javascript"
  | "json"
  | "bash"
  | "python"
  | "plain";

/** Nature d'un fragment de code, qui détermine sa couleur. */
export type CodeTokenType =
  | "plain"
  | "punctuation"
  | "keyword"
  | "string"
  | "number"
  | "comment"
  | "function"
  | "type";

export type CodeToken = {
  readonly value: string;
  readonly type: CodeTokenType;
};

/** Couleurs de la coloration, pour un panneau sombre (bleu nuit). */
export const codeTokenColors: Record<CodeTokenType, string> = {
  plain: colors.inkInverse,
  punctuation: withAlpha(colors.inkInverse, 0.72),
  keyword: palette.coral,
  string: palette.rose,
  number: palette.coral,
  comment: withAlpha(colors.inkInverse, 0.5),
  function: palette.white,
  type: palette.rose,
};

const commonKeywords: readonly string[] = [
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "import",
  "from",
  "export",
  "default",
  "class",
  "extends",
  "new",
  "await",
  "async",
  "try",
  "catch",
  "finally",
  "throw",
  "typeof",
  "instanceof",
  "void",
  "delete",
  "in",
  "of",
  "this",
  "super",
  "switch",
  "case",
  "break",
  "continue",
  "do",
  "null",
  "undefined",
  "true",
  "false",
];

const languageKeywords: Record<CodeLanguage, readonly string[]> = {
  typescript: commonKeywords.concat([
    "interface",
    "type",
    "enum",
    "implements",
    "readonly",
    "public",
    "private",
    "protected",
    "abstract",
    "declare",
    "as",
    "satisfies",
  ]),
  javascript: commonKeywords,
  json: ["true", "false", "null"],
  bash: [
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "for",
    "while",
    "do",
    "done",
    "case",
    "esac",
    "function",
    "in",
    "return",
    "export",
    "local",
    "echo",
    "cd",
    "sudo",
    "npm",
    "npx",
    "node",
    "git",
    "mkdir",
    "chmod",
    "rm",
    "curl",
  ],
  python: [
    "def",
    "return",
    "if",
    "elif",
    "else",
    "for",
    "while",
    "import",
    "from",
    "as",
    "class",
    "try",
    "except",
    "finally",
    "with",
    "lambda",
    "None",
    "True",
    "False",
    "and",
    "or",
    "not",
    "in",
    "is",
    "pass",
    "raise",
    "yield",
    "global",
    "nonlocal",
    "async",
    "await",
    "self",
    "print",
  ],
  plain: [],
};

/**
 * Motif de tokenisation, mémoïsé par langage.
 * La première alternative (commentaire) varie selon le langage ; pour JSON et
 * `plain`, un groupe qui ne peut jamais matcher garde les index stables.
 */
const NEVER_MATCH = "((?!)x)";

const patternCache: Partial<Record<CodeLanguage, RegExp>> = {};

const getPattern = (language: CodeLanguage): RegExp => {
  const cached = patternCache[language];

  if (cached) {
    return cached;
  }

  let comment: string;

  if (language === "typescript" || language === "javascript") {
    comment = "(\\/\\/[^\\n]*)";
  } else if (language === "python" || language === "bash") {
    comment = "(#[^\\n]*)";
  } else {
    comment = NEVER_MATCH;
  }

  const pattern = new RegExp(
    [
      comment,
      "(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)",
      "(\\b\\d[\\d_]*(?:\\.\\d+)?\\b)",
      "([A-Za-z_$][A-Za-z0-9_$]*)",
      "([^\\sA-Za-z0-9_$]+)",
    ].join("|"),
    "g",
  );

  patternCache[language] = pattern;

  return pattern;
};

const isUppercaseStart = (value: string): boolean => {
  const code = value.charCodeAt(0);

  return code >= 65 && code <= 90;
};

const classifyIdentifier = (
  value: string,
  nextChar: string,
  language: CodeLanguage,
): CodeTokenType => {
  if (languageKeywords[language].indexOf(value) !== -1) {
    return "keyword";
  }

  if (nextChar === "(") {
    return "function";
  }

  if (isUppercaseStart(value)) {
    return "type";
  }

  return "plain";
};

/**
 * Découpe une ligne de code en tokens colorés.
 * Les espaces sont conservés sous forme de tokens `plain`.
 */
export const tokenizeLine = (
  line: string,
  language: CodeLanguage = "plain",
): CodeToken[] => {
  const tokens: CodeToken[] = [];
  const pattern = getPattern(language);
  let lastIndex = 0;
  let match = pattern.exec(line);

  while (match !== null) {
    if (match.index > lastIndex) {
      tokens.push({ value: line.slice(lastIndex, match.index), type: "plain" });
    }

    const value = match[0];
    const nextChar = line.charAt(match.index + value.length);
    let type: CodeTokenType;

    if (match[1] !== undefined) {
      type = "comment";
    } else if (match[2] !== undefined) {
      type = "string";
    } else if (match[3] !== undefined) {
      type = "number";
    } else if (match[4] !== undefined) {
      type = classifyIdentifier(value, nextChar, language);
    } else {
      type = "punctuation";
    }

    tokens.push({ value, type });
    lastIndex = match.index + value.length;
    match = pattern.exec(line);
  }

  if (lastIndex < line.length) {
    tokens.push({ value: line.slice(lastIndex), type: "plain" });
  }

  return tokens;
};
