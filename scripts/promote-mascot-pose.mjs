#!/usr/bin/env node
/**
 * Golden Gab — promotion d'une pose de mascotte **validée par un humain**.
 *
 *   node scripts/promote-mascot-pose.mjs <candidat.png> <pose> --validated [options]
 *
 * La validation humaine est la seule porte d'entrée : sans `--validated`, le
 * script refuse de s'exécuter. Voir `docs/MASCOT-POSES.md` (workflow en 5 étapes).
 *
 * Ce que fait le script :
 *   1. refuse sans `--validated`, refuse une pose déjà enregistrée, refuse
 *      d'écraser un asset existant (sauf `--force`) ;
 *   2. recadre les marges transparentes puis normalise le cadrage sur un canevas
 *      carré cohérent avec les 5 poses existantes (hauteur du contenu ≈ 95 % du
 *      cadre, pieds en bas, centré horizontalement) — sans rééchantillonnage ;
 *   3. écrit `public/assets/images/mascot/mascot-<pose>.png` ;
 *   4. enregistre la pose dans `mascotAssets` (`src/config/assets.ts`) **et**
 *      `mascotPoses` (`src/components/mascot/poses.ts`) ;
 *   5. retire `<pose>` de `mascotPlannedPoses` si elle y figure.
 *
 * Le fichier candidat d'origine n'est jamais supprimé ni modifié.
 *
 * Options :
 *   --label "<libellé>"          défaut : nom de pose
 *   --description "<texte>"      défaut : « Pose « <pose> » (à documenter). »
 *   --height-fraction <0..1>     part de la hauteur du cadre occupée (défaut 0.95)
 *   --bottom-margin <0..1>       marge basse du contenu (défaut 0.016)
 *   --dry-run                    calcule et affiche tout, n'écrit rien
 *   --force                      autorise l'écrasement de mascot-<pose>.png
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { alphaBounds, decodePng, encodePng } from "./lib/png.mjs";

const ROOT = process.cwd();
const MASCOT_DIR = path.join(ROOT, "public/assets/images/mascot");
const ASSETS_FILE = path.join(ROOT, "src/config/assets.ts");
const POSES_FILE = path.join(ROOT, "src/components/mascot/poses.ts");
const POSES_MARKER = "} satisfies Record<string, MascotPoseDefinition>;";

// Cadrage de référence, mesuré sur les 5 poses existantes (docs/MASCOT-POSES.md).
const DEFAULT_HEIGHT_FRACTION = 0.95;
const DEFAULT_BOTTOM_MARGIN = 0.016;

// ---------- utilitaires (mêmes conventions que scripts/fetch-asset.mjs) ----------
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

function die(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");
const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};
const newlineOf = (src) => (src.includes("\r\n") ? "\r\n" : "\n");

// Le décodage/encodage PNG vient de ./lib/png.mjs (partagé avec le script de génération).

// ---------- main ----------
const { pos, flags } = parseArgs(process.argv.slice(2));
const [file, pose] = pos;

if (!flags.validated) {
  die(`Validation humaine requise.

Ce script enregistre une pose dans le projet : il ne s'exécute que sur ta
demande explicite, après que tu as relu les candidats.

  node scripts/promote-mascot-pose.mjs <candidat.png> <pose> --validated

Workflow : docs/MASCOT-POSES.md`);
}
if (!file || !pose) die("Arguments attendus : <candidat.png> <pose> --validated");
if (!/^[a-z][a-z0-9-]*$/.test(pose)) die(`Nom de pose invalide "${pose}" (kebab-case : a-z, 0-9, tirets).`);
if (!(await exists(file))) die(`Fichier introuvable : ${file}`);

const heightFraction = Number(flags["height-fraction"] ?? DEFAULT_HEIGHT_FRACTION);
const bottomMargin = Number(flags["bottom-margin"] ?? DEFAULT_BOTTOM_MARGIN);
for (const [name, v] of [["--height-fraction", heightFraction], ["--bottom-margin", bottomMargin]]) {
  if (!Number.isFinite(v) || v <= 0 || v >= 1) die(`${name} attendu entre 0 et 1 (exclu).`);
}

const label = typeof flags.label === "string" ? flags.label : pose;
const description =
  typeof flags.description === "string" ? flags.description : `Pose « ${pose} » (à documenter).`;

let assetsSrc = await fs.readFile(ASSETS_FILE, "utf8");
let posesSrc = await fs.readFile(POSES_FILE, "utf8");

if (new RegExp(`^ {2}${pose}:\\s*staticFile`, "m").test(assetsSrc)) {
  die(`La pose "${pose}" est déjà présente dans mascotAssets.`);
}
if (new RegExp(`^ {2}${pose}:\\s*\\{`, "m").test(posesSrc)) {
  die(`La pose "${pose}" est déjà enregistrée dans mascotPoses.`);
}

const dest = path.join(MASCOT_DIR, `mascot-${pose}.png`);
if ((await exists(dest)) && !flags.force) {
  die(`${rel(dest)} existe déjà (--force pour l'écraser).`);
}

// 1. recadrage + normalisation du cadrage
let img;
try {
  img = decodePng(await fs.readFile(file));
} catch (err) {
  die(err.message);
}
if (img.ch !== 4) {
  die("Le candidat n'a pas de canal alpha : détoure-le d'abord (voir docs/MASCOT-POSES.md, étape 3).");
}
const bounds = alphaBounds(img);
if (!bounds) die("Le candidat est entièrement transparent.");
const { x0, y0, x1, y1 } = bounds;

const contentW = x1 - x0 + 1;
const contentH = y1 - y0 + 1;
const side = Math.max(
  Math.round(contentH / heightFraction),
  contentW + 2 * Math.round(0.02 * contentH),
);
const bottom = Math.round(bottomMargin * side);
const dstX = Math.round((side - contentW) / 2);
const dstY = Math.max(0, side - bottom - contentH);

const out = Buffer.alloc(side * side * 4);
for (let y = 0; y < contentH; y++) {
  const srcStart = ((y0 + y) * img.width + x0) * img.ch;
  const dstStart = ((dstY + y) * side + dstX) * 4;
  if (img.ch === 4) {
    img.px.copy(out, dstStart, srcStart, srcStart + contentW * 4);
  } else {
    for (let x = 0; x < contentW; x++) {
      const s = srcStart + x * img.ch;
      const d = dstStart + x * 4;
      out[d] = img.px[s];
      out[d + 1] = img.px[s + 1];
      out[d + 2] = img.px[s + 2];
      out[d + 3] = 255;
    }
  }
}
const encoded = encodePng(side, side, out);

console.log(`· candidat : ${rel(file)} (${img.width}x${img.height})`);
console.log(`· contenu utile recadré : ${contentW}x${contentH}`);
console.log(
  `· canevas normalisé : ${side}x${side} — contenu ${(100 * contentH / side).toFixed(1)} % de la hauteur, ` +
    `marge basse ${(100 * bottom / side).toFixed(1)} %, centré (marges L/R ${dstX} / ${side - contentW - dstX} px)`,
);
console.log(`· destination : ${rel(dest)} (${encoded.length} octets)`);

// 2. registres
const assetsNl = newlineOf(assetsSrc);
const assetsAnchor = assetsSrc.indexOf("} as const;", assetsSrc.indexOf("export const mascotAssets = {"));
if (assetsAnchor < 0) die("Bloc `mascotAssets` introuvable dans src/config/assets.ts.");
assetsSrc =
  assetsSrc.slice(0, assetsSrc.lastIndexOf("\n", assetsAnchor) + 1) +
  `  ${pose}: staticFile("assets/images/mascot/mascot-${pose}.png"),${assetsNl}` +
  assetsSrc.slice(assetsSrc.lastIndexOf("\n", assetsAnchor) + 1);

const posesNl = newlineOf(posesSrc);
const posesAt = posesSrc.indexOf(POSES_MARKER);
if (posesAt < 0) die(`Repère \`${POSES_MARKER}\` introuvable dans src/components/mascot/poses.ts.`);
const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
const entry = [
  `  ${pose}: {`,
  `    src: mascotAssets.${pose},`,
  `    label: "${esc(label)}",`,
  `    aspectRatio: 1,`,
  `    description: "${esc(description)}",`,
  `  },`,
].join(posesNl);
const posesInsertAt = posesSrc.lastIndexOf("\n", posesAt) + 1;
posesSrc = posesSrc.slice(0, posesInsertAt) + entry + posesNl + posesSrc.slice(posesInsertAt);

// 3. mascotPlannedPoses
const plannedIdx = posesSrc.indexOf("export const mascotPlannedPoses");
let plannedNote = "absent de mascotPlannedPoses";
const CLOSE = "] as const;";
if (plannedIdx >= 0) {
  const end = posesSrc.indexOf(CLOSE, plannedIdx);
  if (end < 0) die("Bloc `mascotPlannedPoses` non refermé dans poses.ts.");
  const head = posesSrc.slice(0, plannedIdx);
  const tail = posesSrc.slice(end + CLOSE.length);
  const had = new RegExp(`"${pose}",?`).test(posesSrc.slice(plannedIdx, end));
  let body = posesSrc.slice(plannedIdx, end).replace(new RegExp(`[ \\t]*"${pose}",?[ \\t]*\\r?\\n?`), "");
  if (!/"[a-z]/.test(body)) {
    body = `export const mascotPlannedPoses = [] as const;`;
    plannedNote = had ? "retirée — la liste des poses prévues est maintenant vide" : "absent";
  } else {
    body += CLOSE; // le délimiteur reste : on ne reconstruit que l'intérieur
    plannedNote = had ? "retirée de mascotPlannedPoses" : "absente de mascotPlannedPoses";
  }
  posesSrc = head + body + tail;
}

console.log(`· mascotAssets : + ${pose}`);
console.log(`· mascotPoses  : + ${pose} (label « ${label} »)`);
console.log(`· poses prévues : ${plannedNote}`);

if (flags["dry-run"]) {
  console.log("\n--dry-run : aucune écriture. Aperçu de l'entrée poses.ts :\n");
  console.log(entry.split(posesNl).map((l) => `  | ${l}`).join("\n"));
  console.log("\nRien n'a été modifié.");
  process.exit(0);
}

await fs.mkdir(MASCOT_DIR, { recursive: true });
await fs.writeFile(dest, encoded);
await fs.writeFile(ASSETS_FILE, assetsSrc);
await fs.writeFile(POSES_FILE, posesSrc);

console.log(`
✓ pose « ${pose} » enregistrée.

À faire ensuite, toi-même :
  npm run lint
  npx remotion compositions     # vérifie que le projet compile toujours
  # puis ajoute <GoldenGabMascot pose="${pose}" /> dans le Styleguide et une scène
`);
