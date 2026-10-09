#!/usr/bin/env node
/**
 * Golden Gab — récupération d'assets (icônes, photos, vidéos, lottie, etc.)
 *
 * À lancer depuis la racine du repo. Node 18+ (fetch natif).
 *
 *   node scripts/fetch-asset.mjs search icon  "receipt" [--set lucide]
 *   node scripts/fetch-asset.mjs get    icon  lucide:receipt --id receipt --tags facture,paiement
 *
 *   node scripts/fetch-asset.mjs search photo "restaurant kitchen" [--orientation portrait] [--provider pixabay] [--all]
 *   node scripts/fetch-asset.mjs get    photo pexels:1234567  --id kitchen-pass --tags cuisine
 *   node scripts/fetch-asset.mjs get    photo pixabay:7654321 --id kitchen-pass --tags cuisine
 *   node scripts/fetch-asset.mjs search video "typing on laptop"
 *   node scripts/fetch-asset.mjs get    video pixabay:888 --id typing-laptop
 *
 *   node scripts/fetch-asset.mjs add-url <url> --kind lottie --id loading-dots \
 *        --license "LottieFiles Simple License" --source-url <page> [--author X] [--tags a,b]
 *   node scripts/fetch-asset.mjs list [--kind icon]
 *
 * Fournisseurs photo/vidéo (clé dans l'environnement ou dans `.env`) :
 *   - pexels  → PEXELS_API_KEY
 *   - pixabay → PIXABAY_API_KEY
 * Ordre d'essai par défaut : pexels puis pixabay (variable ASSET_PROVIDERS="pixabay,pexels" pour l'inverser).
 * Sans --provider, la recherche utilise le premier fournisseur qui a une clé ; s'il est en panne ou
 * ne renvoie rien, elle bascule sur le suivant. Avec --all, elle interroge tous ceux qui ont une clé.
 * Les références retournées sont préfixées (pexels:123, pixabay:456) : `get` les réutilise telles quelles.
 * Les icônes (Iconify) n'ont pas besoin de clé.
 *
 * Sortie :
 *   - fichiers  → public/assets/library/<kind>/<id>.<ext>
 *   - registre  → src/config/assets.manifest.json  (fournisseur, source, licence, auteur, tags)
 * Les icônes ne sont pas téléchargées en fichier : leur code SVG (body) est stocké
 * dans le manifeste pour pouvoir être recoloré (currentColor) et animé.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MANIFEST = path.join(ROOT, "src/config/assets.manifest.json");

// Jeux d'icônes autorisés par défaut (licences permissives).
const ICON_LICENSES = {
  lucide: "ISC",
  tabler: "MIT",
  ph: "MIT",
  mdi: "Apache-2.0",
};
const KINDS = ["icon", "photo", "video", "lottie", "image", "sfx"];

// Les URL de base sont surchargeables par variable d'environnement (utile pour les tests).
const base = (name, fallback) => process.env[name] ?? fallback;

// ---------- utilitaires ----------
function parseArgs(argv) {
  const pos = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) flags[key] = true;
      else {
        flags[key] = next;
        i++;
      }
    } else pos.push(a);
  }
  return { pos, flags };
}

async function loadEnv() {
  try {
    const raw = await fs.readFile(path.join(ROOT, ".env"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    /* pas de .env : on utilise l'environnement */
  }
}

function die(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

async function safeFetch(url, options) {
  try {
    return await fetch(url, options);
  } catch (err) {
    throw new Error(`réseau inaccessible (${err.cause?.code ?? err.message})`);
  }
}

async function getJson(url, headers = {}) {
  const res = await safeFetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function download(url, dest) {
  const res = await safeFetch(url);
  if (!res.ok) throw new Error(`téléchargement impossible (HTTP ${res.status})`);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

async function readManifest() {
  try {
    return JSON.parse(await fs.readFile(MANIFEST, "utf8"));
  } catch {
    return [];
  }
}

async function saveEntry(entry, force) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(entry.id)) {
    die(`id invalide "${entry.id}" (kebab-case : a-z, 0-9, tirets).`);
  }
  const list = await readManifest();
  const idx = list.findIndex((e) => e.id === entry.id);
  if (idx >= 0 && !force) die(`L'id "${entry.id}" existe déjà (--force pour remplacer).`);
  if (idx >= 0) list.splice(idx, 1);
  list.push({ ...entry, addedAt: new Date().toISOString().slice(0, 10) });
  list.sort((a, b) => a.id.localeCompare(b.id));
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
  await fs.writeFile(MANIFEST, JSON.stringify(list, null, 2) + "\n");
}

const tagsOf = (flags) =>
  typeof flags.tags === "string" ? flags.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

function extFromUrl(url, fallback) {
  try {
    const ext = path.extname(new URL(url).pathname).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp", ".mp4", ".webm"].includes(ext) ? ext : fallback;
  } catch {
    return fallback;
  }
}

/** Choisit le meilleur fichier vidéo : le plus grand qui tient en 1080 × 1920 (dans l'un ou l'autre sens). */
function pickVideoFile(files) {
  const valid = files.filter((f) => f.url && f.width && f.height);
  if (!valid.length) throw new Error("aucun fichier vidéo exploitable");
  const area = (f) => f.width * f.height;
  const fits = valid.filter((f) => Math.min(f.width, f.height) <= 1080 && Math.max(f.width, f.height) <= 1920);
  return fits.length
    ? fits.sort((a, b) => area(b) - area(a))[0]
    : valid.sort((a, b) => area(a) - area(b))[0];
}

// ---------- fournisseurs photo / vidéo ----------
// Interface commune :
//   search(kind, encodedQuery, orientation, key) → [{ id, width, height, author, url, durationSec? }]
//   fetchOne(kind, id, key) → { downloadUrl, sourceUrl, author, width, height, durationSec? }
const PROVIDERS = {
  pexels: {
    keyVar: "PEXELS_API_KEY",
    license: "Pexels License",
    signup: "https://www.pexels.com/api/",

    async search(kind, q, orientation, key) {
      const b = base("PEXELS_BASE", "https://api.pexels.com");
      const headers = { Authorization: key };
      if (kind === "photo") {
        const d = await getJson(`${b}/v1/search?query=${q}&per_page=12&orientation=${orientation}`, headers);
        return (d.photos ?? []).map((p) => ({
          id: p.id, width: p.width, height: p.height, author: p.photographer, url: p.url,
        }));
      }
      const d = await getJson(`${b}/videos/search?query=${q}&per_page=10&orientation=${orientation}`, headers);
      return (d.videos ?? []).map((v) => ({
        id: v.id, width: v.width, height: v.height, author: v.user?.name ?? "", url: v.url, durationSec: v.duration,
      }));
    },

    async fetchOne(kind, id, key) {
      const b = base("PEXELS_BASE", "https://api.pexels.com");
      const headers = { Authorization: key };
      if (kind === "photo") {
        const p = await getJson(`${b}/v1/photos/${id}`, headers);
        return {
          downloadUrl: p.src?.large2x ?? p.src?.large, sourceUrl: p.url, author: p.photographer,
          width: p.width, height: p.height,
        };
      }
      const v = await getJson(`${b}/videos/videos/${id}`, headers);
      const file = pickVideoFile(
        (v.video_files ?? [])
          .filter((f) => f.file_type === "video/mp4")
          .map((f) => ({ url: f.link, width: f.width, height: f.height })),
      );
      return {
        downloadUrl: file.url, sourceUrl: v.url, author: v.user?.name ?? "",
        width: file.width, height: file.height, durationSec: v.duration,
      };
    },
  },

  pixabay: {
    keyVar: "PIXABAY_API_KEY",
    license: "Pixabay Content License",
    signup: "https://pixabay.com/api/docs/",

    async search(kind, q, orientation, key) {
      const b = base("PIXABAY_BASE", "https://pixabay.com");
      const query = q.slice(0, 100);
      if (kind === "photo") {
        const o = orientation === "portrait" ? "vertical" : orientation === "landscape" ? "horizontal" : "all";
        const d = await getJson(
          `${b}/api/?key=${key}&q=${query}&image_type=photo&orientation=${o}&per_page=12&safesearch=true`,
        );
        return (d.hits ?? []).map((h) => ({
          id: h.id, width: h.imageWidth, height: h.imageHeight, author: h.user, url: h.pageURL,
        }));
      }
      // L'API vidéo de Pixabay n'a pas de filtre d'orientation : on affiche les dimensions.
      const d = await getJson(`${b}/api/videos/?key=${key}&q=${query}&per_page=10&safesearch=true`);
      return (d.hits ?? []).map((h) => {
        const f = h.videos?.medium ?? h.videos?.large ?? h.videos?.small ?? {};
        return { id: h.id, width: f.width, height: f.height, author: h.user, url: h.pageURL, durationSec: h.duration };
      });
    },

    async fetchOne(kind, id, key) {
      const b = base("PIXABAY_BASE", "https://pixabay.com");
      if (kind === "photo") {
        const hit = (await getJson(`${b}/api/?key=${key}&id=${id}`)).hits?.[0];
        if (!hit) throw new Error(`photo ${id} introuvable`);
        return {
          downloadUrl: hit.largeImageURL, sourceUrl: hit.pageURL, author: hit.user,
          width: hit.imageWidth, height: hit.imageHeight,
        };
      }
      const hit = (await getJson(`${b}/api/videos/?key=${key}&id=${id}`)).hits?.[0];
      if (!hit) throw new Error(`vidéo ${id} introuvable`);
      const file = pickVideoFile(Object.values(hit.videos ?? {}));
      return {
        downloadUrl: file.url, sourceUrl: hit.pageURL, author: hit.user,
        width: file.width, height: file.height, durationSec: hit.duration,
      };
    },
  },
};

const keyFor = (name) => process.env[PROVIDERS[name].keyVar] || null;

function providerOrder(flags) {
  if (typeof flags.provider === "string") {
    if (!PROVIDERS[flags.provider]) die(`Fournisseur inconnu "${flags.provider}" (${Object.keys(PROVIDERS).join(", ")}).`);
    return [flags.provider];
  }
  return (process.env.ASSET_PROVIDERS ?? "pexels,pixabay")
    .split(",")
    .map((s) => s.trim())
    .filter((n) => PROVIDERS[n]);
}

function noKeyMessage(names) {
  const lines = names.map((n) => `  - ${PROVIDERS[n].keyVar} (clé gratuite : ${PROVIDERS[n].signup})`);
  return `Aucune clé disponible pour : ${names.join(", ")}.\nAjoute-en une dans .env :\n${lines.join("\n")}`;
}

// ---------- commandes ----------
async function search(kind, query, flags) {
  if (!query) die("Requête manquante.");
  const q = encodeURIComponent(query);

  if (kind === "icon") {
    const sets = typeof flags.set === "string" ? flags.set : Object.keys(ICON_LICENSES).join(",");
    const data = await getJson(`${base("ICONIFY_BASE", "https://api.iconify.design")}/search?query=${q}&limit=24&prefixes=${sets}`);
    if (!data.icons?.length) return console.log("Aucun résultat.");
    data.icons.forEach((name) => console.log(name));
    return;
  }

  if (kind !== "photo" && kind !== "video") die(`Recherche non supportée pour "${kind}" (icon | photo | video).`);

  const orientation = typeof flags.orientation === "string" ? flags.orientation : "portrait";
  const names = providerOrder(flags);
  const usable = names.filter(keyFor);
  if (!usable.length) die(noKeyMessage(names));

  let found = 0;
  for (const name of usable) {
    try {
      const rows = await PROVIDERS[name].search(kind, q, orientation, keyFor(name));
      if (!rows.length) {
        console.error(`· ${name} : aucun résultat`);
        continue;
      }
      for (const r of rows) {
        const dims = r.width && r.height ? `${r.width}x${r.height}` : "?";
        const dur = r.durationSec ? `${r.durationSec}s` : "-";
        console.log(`${name}:${r.id}\t${dims}\t${dur}\t${r.author}\t${r.url}`);
      }
      found += rows.length;
      if (!flags.all) break;
    } catch (err) {
      console.error(`⚠ ${name} indisponible (${err.message}) → fournisseur suivant si disponible`);
    }
  }

  const missing = names.filter((n) => !keyFor(n));
  if (!found) {
    if (missing.length) console.error(`Astuce : ajoute ${missing.map((n) => PROVIDERS[n].keyVar).join(" ou ")} pour avoir un fournisseur de secours.`);
    die("Aucun résultat sur les fournisseurs disponibles.");
  }
}

function parseRef(ref, flags) {
  const m = ref.match(/^([a-z]+):(.+)$/);
  const provider = m ? m[1] : typeof flags.provider === "string" ? flags.provider : null;
  const id = m ? m[2] : ref;
  if (!provider) die('Référence ambiguë : utilise "pexels:123" / "pixabay:456" ou ajoute --provider.');
  if (!PROVIDERS[provider]) die(`Fournisseur inconnu "${provider}" (${Object.keys(PROVIDERS).join(", ")}).`);
  return { provider, id };
}

async function get(kind, ref, flags) {
  if (!ref) die("Référence manquante.");
  const id = typeof flags.id === "string" ? flags.id : null;
  if (!id) die("--id <slug-kebab-case> est obligatoire.");

  if (kind === "icon") {
    const [prefix, name] = ref.split(":");
    if (!prefix || !name) die('Icône attendue au format "set:nom" (ex. lucide:receipt).');
    const license = ICON_LICENSES[prefix] ?? (typeof flags.license === "string" ? flags.license : null);
    if (!license) die(`Jeu "${prefix}" hors liste permissive : précise --license après vérification.`);
    const data = await getJson(`${base("ICONIFY_BASE", "https://api.iconify.design")}/${prefix}.json?icons=${encodeURIComponent(name)}`);
    const icon = data.icons?.[name];
    if (!icon) die(`Icône introuvable : ${ref}`);
    await saveEntry(
      {
        id,
        kind: "icon",
        provider: "iconify",
        sourceUrl: `https://icon-sets.iconify.design/${prefix}/${name}/`,
        license,
        author: prefix,
        tags: tagsOf(flags),
        svg: { body: icon.body, width: icon.width ?? data.width ?? 24, height: icon.height ?? data.height ?? 24 },
      },
      flags.force,
    );
    return console.log(`✓ icône "${id}" enregistrée (${ref}, ${license}).`);
  }

  if (kind !== "photo" && kind !== "video") {
    die(`"get" non supporté pour "${kind}" (icon | photo | video). Pour le reste : add-url.`);
  }

  const { provider, id: providerId } = parseRef(ref, flags);
  const P = PROVIDERS[provider];
  const key = keyFor(provider);
  if (!key) die(`${P.keyVar} manquante pour "${provider}" (clé gratuite : ${P.signup}).`);

  let info;
  try {
    info = await P.fetchOne(kind, providerId, key);
  } catch (err) {
    die(`${provider} indisponible (${err.message}). Les références sont propres à chaque fournisseur : refais une recherche (--provider autre) pour obtenir une autre référence.`);
  }

  const ext = extFromUrl(info.downloadUrl, kind === "photo" ? ".jpg" : ".mp4");
  const file = `library/${kind}/${id}${ext}`;
  await download(info.downloadUrl, path.join(ROOT, "public/assets", file));
  await saveEntry(
    {
      id, kind, provider, sourceUrl: info.sourceUrl, license: P.license, author: info.author ?? "",
      tags: tagsOf(flags), file: `assets/${file}`, width: info.width, height: info.height,
      ...(info.durationSec ? { durationSec: info.durationSec } : {}),
    },
    flags.force,
  );
  console.log(`✓ ${kind} "${id}" (${provider}) → public/assets/${file}`);
}

async function addUrl(url, flags) {
  const kind = flags.kind;
  if (!KINDS.includes(kind)) die(`--kind requis parmi : ${KINDS.join(", ")}`);
  for (const f of ["id", "license", "source-url"]) {
    if (typeof flags[f] !== "string") die(`--${f} est obligatoire (traçabilité de la licence).`);
  }
  const ext = typeof flags.ext === "string" ? flags.ext : path.extname(new URL(url).pathname) || ".bin";
  const file = `library/${kind}/${flags.id}${ext.startsWith(".") ? ext : `.${ext}`}`;
  await download(url, path.join(ROOT, "public/assets", file));
  await saveEntry(
    {
      id: flags.id, kind, provider: "manual", sourceUrl: flags["source-url"], license: flags.license,
      author: typeof flags.author === "string" ? flags.author : "", tags: tagsOf(flags), file: `assets/${file}`,
    },
    flags.force,
  );
  console.log(`✓ "${flags.id}" → public/assets/${file}`);
}

async function list(flags) {
  const items = (await readManifest()).filter((e) => !flags.kind || e.kind === flags.kind);
  if (!items.length) return console.log("Manifeste vide.");
  for (const e of items) console.log(`${e.id}\t${e.kind}\t${e.provider}\t${e.license}\t${e.tags?.join(",") ?? ""}`);
}

// ---------- main ----------
await loadEnv();
const { pos, flags } = parseArgs(process.argv.slice(2));
const [cmd, a, b] = pos;

try {
  if (cmd === "search") await search(a, b, flags);
  else if (cmd === "get") await get(a, b, flags);
  else if (cmd === "add-url") await addUrl(a, flags);
  else if (cmd === "list") await list(flags);
  else die("Commande attendue : search | get | add-url | list (voir l'en-tête du fichier).");
} catch (err) {
  die(err.message);
}
