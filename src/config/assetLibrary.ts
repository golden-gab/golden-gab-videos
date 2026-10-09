/**
 * Golden Gab — bibliothèque d'assets externes.
 *
 * Lit `src/config/assets.manifest.json`, le registre produit par
 * `scripts/fetch-asset.mjs` (commande `npm run asset`). Chaque entrée porte sa
 * **source, sa licence et son auteur** : une entrée sans licence est un bug
 * (règle 74).
 *
 * ⚠️ `staticFile()` est appelé **uniquement ici** (règle 21). Les composants et
 * les vidéos ne connaissent jamais un chemin de fichier : ils passent par
 * `libraryAsset(id)` / `libraryIcon(id)`.
 *
 * ```ts
 * const url = libraryAsset("kitchen-pass");   // -> URL staticFile
 * const icon = libraryIcon("receipt");        // -> { body, width, height }
 * const photos = listLibrary({ tag: "cuisine", kind: "photo" });
 * ```
 */

import { staticFile } from "remotion";

import manifest from "./assets.manifest.json" with { type: "json" };

/** Nature d'un asset de la bibliothèque. */
export type AssetKind = "icon" | "photo" | "video" | "lottie" | "image" | "sfx";

/** SVG inline d'une icône (body + gabarit), stocké dans le manifeste. */
export type SvgAsset = {
  readonly body: string;
  readonly width: number;
  readonly height: number;
};

/** Entrée du manifeste, telle que produite par `scripts/fetch-asset.mjs`. */
export type AssetEntry = {
  readonly id: string;
  readonly kind: AssetKind;
  readonly provider: string;
  readonly sourceUrl: string;
  readonly license: string;
  readonly author: string;
  readonly tags: readonly string[];
  /** Chemin relatif à `public/` (assets téléchargés). Absent pour les icônes. */
  readonly file?: string;
  /** SVG inline (icônes uniquement). */
  readonly svg?: SvgAsset;
  readonly width?: number;
  readonly height?: number;
  readonly durationSec?: number;
  readonly addedAt?: string;
};

/** Forme brute lue depuis le JSON : `kind` n'est pas encore contraint. */
type RawAssetEntry = Omit<AssetEntry, "kind" | "tags"> & {
  readonly kind: string;
  readonly tags?: readonly string[];
};

const rawEntries = manifest as readonly RawAssetEntry[];

/** Contenu complet du manifeste, normalisé (tags toujours présents). */
export const libraryManifest: readonly AssetEntry[] = rawEntries.map((entry) => ({
  ...entry,
  kind: entry.kind as AssetKind,
  tags: entry.tags ?? [],
}));

/** Entrée correspondant à un id, ou `undefined` (ne lève jamais). */
export const getLibraryEntry = (id: string): AssetEntry | undefined =>
  libraryManifest.find((entry) => entry.id === id);

/** `true` si l'id est enregistré (sert aux démos / aux gardes de rendu). */
export const hasLibraryEntry = (id: string): boolean =>
  getLibraryEntry(id) !== undefined;

/** Entrée obligatoire : lève une erreur explicite si l'id ou la licence manque. */
const requireEntry = (id: string): AssetEntry => {
  const entry = getLibraryEntry(id);
  if (!entry) {
    throw new Error(
      `Unknown library asset "${id}". Run \`npm run asset -- list\` to see the registered ids.`,
    );
  }
  if (!entry.license) {
    throw new Error(
      `Library asset "${id}" has no license recorded in src/config/assets.manifest.json. ` +
        `Every entry must carry source, license and author (rule 74).`,
    );
  }
  return entry;
};

/**
 * Résout un asset téléchargé en URL lisible par Remotion.
 * Lève une erreur claire si l'id n'existe pas, n'a pas de licence, n'a pas de
 * fichier, ou si le `kind` attendu ne correspond pas.
 */
export const libraryFile = (id: string, kind?: AssetKind): string => {
  const entry = requireEntry(id);

  if (kind !== undefined && entry.kind !== kind) {
    throw new Error(
      `Library asset "${id}" is a <${entry.kind}>, expected <${kind}>.`,
    );
  }
  if (!entry.file) {
    throw new Error(
      `Library asset "${id}" (<${entry.kind}>) has no file on disk. ` +
        `Icons are read with libraryIcon(); only downloaded assets have a file path.`,
    );
  }

  return staticFile(entry.file);
};

/** Alias de `libraryFile(id)` : URL d'un asset téléchargé. */
export const libraryAsset = (id: string): string => libraryFile(id);

/** SVG inline d'une icône du manifeste (jamais un chemin). */
export const libraryIcon = (id: string): SvgAsset => {
  const entry = requireEntry(id);
  if (!entry.svg) {
    throw new Error(
      `Library asset "${id}" (<${entry.kind}>) is not an inline icon. ` +
        `Use libraryAsset() for downloaded files.`,
    );
  }
  return entry.svg;
};

/** Filtre de recherche d'assets par nature et/ou tag. */
export type LibraryFilter = {
  readonly kind?: AssetKind;
  readonly tag?: string;
};

/**
 * Liste les entrées correspondant à un filtre (pour qu'un agent retrouve un
 * asset par tag avant d'en chercher un nouveau).
 */
export const listLibrary = (filter: LibraryFilter = {}): readonly AssetEntry[] =>
  libraryManifest.filter((entry) => {
    if (filter.kind !== undefined && entry.kind !== filter.kind) {
      return false;
    }
    if (filter.tag !== undefined && entry.tags.indexOf(filter.tag) === -1) {
      return false;
    }
    return true;
  });
