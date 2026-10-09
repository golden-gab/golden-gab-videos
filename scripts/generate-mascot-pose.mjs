#!/usr/bin/env node
/**
 * Golden Gab — génération de candidats de poses pour la mascotte.
 *
 * À lancer depuis la racine du repo. Node 18+ (fetch natif).
 * Workflow complet et fiche de cohérence : `docs/MASCOT-POSES.md`.
 *
 *   node scripts/generate-mascot-pose.mjs <pose> --brief "intention, posture, expression"
 *   node scripts/generate-mascot-pose.mjs neutral --brief "..." --count 3
 *   node scripts/generate-mascot-pose.mjs confused --brief "..." --dry-run
 *
 * Ce que fait le script :
 *   1. écrit le brief humain `docs/mascot-pose-briefs/<pose>.md` (prompt prêt à
 *      coller + images de référence à joindre) — toujours, même en cas de succès ;
 *   2. rassemble les poses existantes de `public/assets/images/mascot/` comme
 *      images de référence (dédupliquées par empreinte SHA-256) ;
 *   3. appelle l'API Gemini avec `GEMINI_API_KEY` (lue dans `.env`) ;
 *   4. écrit les candidats dans `public/assets/images/mascot/_pending/<pose>-<n>.png`.
 *
 * Le script ne modifie JAMAIS un asset existant, ni `mascotAssets`, ni
 * `mascotPoses` : la promotion est un acte humain séparé, via
 * `scripts/promote-mascot-pose.mjs --validated`.
 *
 * Palier gratuit : les modèles image de Gemini (Nano Banana) ne sont PAS
 * inclus dans le palier gratuit (cf. https://ai.google.dev/gemini-api/docs/pricing).
 * Sans facturation activée, l'API renvoie 403/429. Le script ne contourne rien :
 * il s'arrête, garde le brief et affiche la marche à suivre pour Google AI Studio.
 *
 * Variables d'environnement :
 *   GEMINI_API_KEY      clé API Google AI Studio (obligatoire pour générer)
 *   GEMINI_IMAGE_MODEL  modèle image (défaut : gemini-nano-banana-2.1)
 *   GEMINI_API_BASE     racine de l'API (défaut : https://generativelanguage.googleapis.com)
 *
 * Codes de sortie :
 *   0  candidats écrits dans `_pending/` ;
 *   3  aucun candidat (brief écrit + marche à suivre affichée) ;
 *   1  erreur d'usage (arguments invalides, pose déjà enregistrée…).
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { decodePng, transparentRatio } from "./lib/png.mjs";

const ROOT = process.cwd();
const MASCOT_DIR = path.join(ROOT, "public/assets/images/mascot");
const PENDING_DIR = path.join(MASCOT_DIR, "_pending");
const BRIEF_DIR = path.join(ROOT, "docs/mascot-pose-briefs");
const POSES_FILE = path.join(ROOT, "src/components/mascot/poses.ts");

const DEFAULT_MODEL = "gemini-nano-banana-2.1";
const DEFAULT_COUNT = 3;

// Les URL de base sont surchargeables par variable d'environnement (utile pour les tests).
const base = (name, fallback) => process.env[name] ?? fallback;

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

const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

/** Noms de poses déjà enregistrés dans `mascotPoses` (`src/components/mascot/poses.ts`). */
function readPoseNames(source) {
  const m = source.match(/mascotPoses\s*=\s*\{([\s\S]*?)\}\s*satisfies/);
  if (!m) return [];
  return [...m[1].matchAll(/^ {2}([a-z][a-z0-9-]*):\s*\{/gm)].map((x) => x[1]);
}


/** Fiche de cohérence mesurée sur les 5 poses réelles (voir docs/MASCOT-POSES.md). */
const COHERENCE = `Fiche de cohérence (mesurée sur les 5 poses existantes — docs/MASCOT-POSES.md) :
- Personnage : jeune garçon noir, SANS traits du visage (ni yeux, ni bouche, ni nez).
- Casquette bleu nuit (#183058 / #1D385E), visière vers l'avant.
- T-shirt bleu nuit, logo « gg » + wordmark « golden gab » en blanc sur la poitrine.
- Short cargo beige / crème (#E0D8C0).
- Chaussettes blanches hautes, chaussures bleu nuit (#132642) à semelles et bandes blanches.
- Contour : trait NOIR plein (#000000), épais, sur toute la silhouette (pas de contour blanc).
- Rendu : illustration vectorielle plate, aplats simples, ombrage minimal — pas de dégradé, pas de texture photo, pas de 3D.
- Cadre : carré 1:1, fond 100 % TRANSPARENT, personnage debout de face, pieds en bas,
  occupant ~95 % de la hauteur, centré horizontalement.
- À NE PAS ajouter : décor, texte, ombre portée, éléments de marque autres que le logo du t-shirt.`;

function buildPrompt(brief, pose) {
  return `Use the attached reference images. Draw the SAME character, identical design, colors and proportions.

${COHERENCE}

New pose "${pose}": ${brief}

Full body, standing, facing the camera, feet at the bottom, centered,
filling about 95% of the height, on a fully transparent background,
square 1:1, no text, no background scenery, no props, no drop shadow, no 3D.`;
}

async function listReferences() {
  let names = [];
  try {
    names = (await fs.readdir(MASCOT_DIR)).filter((f) => /^mascot-.*\.png$/.test(f)).sort();
  } catch {
    return [];
  }
  const seen = new Set();
  const refs = [];
  for (const name of names) {
    const file = path.join(MASCOT_DIR, name);
    const buf = await fs.readFile(file);
    const hash = createHash("sha256").update(buf).digest("hex");
    if (seen.has(hash)) continue; // doublon exact (ex. mascot-point.png === mascotte.png)
    seen.add(hash);
    refs.push({ name, file, hash });
  }
  return refs;
}

async function writeBrief(pose, brief, refs, prompt, reason) {
  const rel = refs.map((r) => path.relative(ROOT, r.file).split(path.sep).join("/"));
  const content = `# Pose « ${pose} » — brief de génération

> Fichier généré par \`scripts/generate-mascot-pose.mjs\`. Workflow : \`docs/MASCOT-POSES.md\`.
> Date : ${new Date().toISOString().slice(0, 10)}
> Statut : **candidats non générés${reason ? ` (${reason})` : ""}** — aucun asset n'est enregistré.

## Intention (brief saisi)

${brief}

## Images de référence à joindre

Joins ces ${rel.length} fichiers comme images de référence (dans cet ordre) :

${rel.map((r, i) => `${i + 1}. \`${r}\``).join("\n")}

## Prompt (à coller tel quel)

\`\`\`text
${prompt}
\`\`\`

## Marche à suivre — Google AI Studio (recommandé)

1. ouvrir <https://aistudio.google.com/> et créer un prompt (mode **Image** / Nano Banana) ;
2. joindre **toutes** les images de référence listées ci-dessus ;
3. coller le prompt ci-dessus ;
4. générer, puis **télécharger les 3 meilleurs candidats** en PNG ;
5. les déposer dans \`public/assets/images/mascot/_pending/${pose}-1.png\`, \`-2\`, \`-3\` ;
6. **relire et valider** (fond transparent ? couleurs ? logo ? posture ?) ;
7. promouvoir le candidat retenu :

\`\`\`bash
node scripts/promote-mascot-pose.mjs public/assets/images/mascot/_pending/${pose}-1.png ${pose} --validated
\`\`\`

Alternative : app Gemini (mobile/web) avec les mêmes images + prompt.

## Pourquoi pas via l'API en direct ?

Les modèles image de Gemini (Nano Banana) **ne sont pas inclus dans le palier
gratuit** de l'API (cf. <https://ai.google.dev/gemini-api/docs/pricing>) : sans
facturation active, l'API renvoie 403/429. Le script ne contourne pas cette
limite — il produit ce brief à ta place.

Pour générer par script (projet avec facturation) :

\`\`\`bash
# .env
GEMINI_API_KEY=...
GEMINI_IMAGE_MODEL=gemini-nano-banana-2.1   # optionnel, c'est le défaut
\`\`\`

puis relancer \`node scripts/generate-mascot-pose.mjs ${pose} --brief "..."\`.

## Rappel

- ne jamais enregistrer une pose sans l'avoir vue et validée ;
- ne jamais brancher un candidat de \`_pending/\` dans une vidéo ;
- ne pas retoucher une pose avec un miroir / une rotation d'une autre (règle 39).
`;
  await fs.mkdir(BRIEF_DIR, { recursive: true });
  const file = path.join(BRIEF_DIR, `${pose}.md`);
  await fs.writeFile(file, content);
  return file;
}

/** Récupère tous les blocs image base64 d'une réponse, quelle que soit leur place. */
function extractImages(json) {
  const found = [];
  const seen = new Set();
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (node.type === "image" && typeof node.data === "string" && node.data.length > 100) {
      if (!seen.has(node.data)) {
        seen.add(node.data);
        found.push(node);
      }
    }
    if (typeof node.output_image?.data === "string") walk({ ...node.output_image, type: "image" });
    for (const key of ["steps", "content", "outputs", "output"]) {
      if (node[key]) walk(node[key]);
    }
  };
  walk(json);
  return found;
}

async function callApi(model, prompt, refs) {
  const url = `${base("GEMINI_API_BASE", "https://generativelanguage.googleapis.com")}/v1beta/interactions`;
  const input = [{ type: "text", text: prompt }];
  for (const r of refs) {
    const buf = await fs.readFile(r.file);
    input.push({ type: "image", mime_type: "image/png", data: buf.toString("base64") });
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "x-goog-api-key": process.env.GEMINI_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ model, input }),
  });
  const text = await res.text();
  if (!res.ok) {
    let detail = text;
    try {
      detail = JSON.parse(text).error?.message ?? text;
    } catch {
      /* réponse non JSON */
    }
    return { ok: false, status: res.status, detail: String(detail).slice(0, 400) };
  }
  try {
    return { ok: true, images: extractImages(JSON.parse(text)) };
  } catch {
    return { ok: false, status: res.status, detail: "réponse illisible" };
  }
}

function instructions(pose, briefFile) {
  console.error(`
Aucun candidat généré. Rien n'a été modifié dans les registres.

Ce que tu dois faire pour obtenir les premiers candidats :
  1. ouvre ${path.relative(ROOT, briefFile).split(path.sep).join("/")} ;
  2. va sur https://aistudio.google.com/ (mode Image / Nano Banana) ;
  3. joins les images de référence listées dans le brief ;
  4. colle le prompt du brief, génère, télécharge 3 candidats PNG ;
  5. dépose-les dans public/assets/images/mascot/_pending/${pose}-1.png … -3.png ;
  6. relis-les, puis lance (toi seul, après validation) :
       node scripts/promote-mascot-pose.mjs public/assets/images/mascot/_pending/${pose}-1.png ${pose} --validated
`);
}

// ---------- main ----------
await loadEnv();
const { pos, flags } = parseArgs(process.argv.slice(2));
const pose = pos[0];

if (!pose) die("Nom de pose manquant. Ex. : node scripts/generate-mascot-pose.mjs neutral --brief \"...\"");
if (!/^[a-z][a-z0-9-]*$/.test(pose)) die(`Nom de pose invalide "${pose}" (kebab-case : a-z, 0-9, tirets).`);

const src = await fs.readFile(POSES_FILE, "utf8");
if (readPoseNames(src).includes(pose)) {
  die(`La pose "${pose}" est déjà enregistrée dans mascotPoses. Choisis un autre nom ou retire-la d'abord.`);
}
const existing = path.join(MASCOT_DIR, `mascot-${pose}.png`);
if (await exists(existing)) die(`L'asset mascot-${pose}.png existe déjà. Choisis un autre nom.`);

const brief = typeof flags.brief === "string" ? flags.brief.trim() : "";
if (!brief) die('Le brief est obligatoire : --brief "intention, posture, expression"');

const model = base("GEMINI_IMAGE_MODEL", DEFAULT_MODEL) || DEFAULT_MODEL;
const count = Number(flags.count ?? DEFAULT_COUNT);
if (!Number.isInteger(count) || count < 1 || count > 10) die(`--count attendu entre 1 et 10 (reçu "${flags.count}").`);

const refs = await listReferences();
if (!refs.length) die("Aucune pose de référence trouvée dans public/assets/images/mascot/.");
const prompt = buildPrompt(brief, pose);

// Le brief est toujours écrit : c'est lui qui sert de source si tu passes par AI Studio.
const briefFile = await writeBrief(pose, brief, refs, prompt, flags["dry-run"] ? "mode --dry-run" : "");
console.log(`· brief écrit : ${path.relative(ROOT, briefFile).split(path.sep).join("/")}`);
console.log(`· ${refs.length} image(s) de référence (doublons exacts ignorés) : ${refs.map((r) => r.name).join(", ")}`);

if (flags["dry-run"]) {
  console.log("· --dry-run : aucun appel API.");
  instructions(pose, briefFile);
  process.exit(3);
}

if (!process.env.GEMINI_API_KEY) {
  console.error("✗ GEMINI_API_KEY absente (à renseigner dans .env — clé : https://aistudio.google.com/apikey).");
  instructions(pose, briefFile);
  process.exit(3);
}

await fs.mkdir(PENDING_DIR, { recursive: true });
console.log(`· modèle : ${model}`);

let written = 0;
const opaqueCandidates = [];
for (let n = 1; n <= count; n++) {
  let out;
  try {
    out = await callApi(model, prompt, refs);
  } catch (err) {
    out = { ok: false, status: 0, detail: `réseau : ${err.cause?.code ?? err.message}` };
  }
  if (!out.ok) {
    console.error(`⚠ tentative ${n}/${count} — échec (${out.status}) : ${out.detail}`);
    if (out.status) break;
    continue;
  }
  if (!out.images.length) {
    console.error(`⚠ tentative ${n}/${count} — réponse sans image (le modèle a peut-être répondu en texte).`);
    continue;
  }
  const img = out.images[0];
  const file = path.join(PENDING_DIR, `${pose}-${n}.png`);
  await fs.writeFile(file, Buffer.from(img.data, "base64"));
  written++;
  const relPath = path.relative(ROOT, file).split(path.sep).join("/");
  // Fond transparent = beaucoup de pixels réellement transparents. Un simple
  // « canal alpha présent » ne suffit pas : le modèle rend souvent une image
  // RGBA entièrement opaque (fond plein).
  let verdict;
  try {
    const decoded = decodePng(await fs.readFile(file));
    const ratio = transparentRatio(decoded);
    verdict = `${decoded.width}x${decoded.height}, ${
      ratio === null ? "AUCUN canal alpha" : `${(100 * ratio).toFixed(1)} % de fond transparent`
    }`;
    if (ratio === null || ratio < 0.05) opaqueCandidates.push(relPath);
  } catch (err) {
    verdict = `illisible (${err.message})`;
  }
  console.log(`✓ candidat ${n} → ${relPath} (${verdict})`);
}

if (!written) {
  instructions(pose, briefFile);
  process.exit(3);
}

console.log(`
${written} candidat(s) dans public/assets/images/mascot/_pending/.
Rien n'est enregistré tant que tu n'as pas validé. À relire :
  - fond réellement transparent ?  - mêmes bleus / beige / logo ?  - posture lisible ?
  - pas de traits du visage ?      - pas de décor ni d'ombre ?

Ensuite, toi seul :
  node scripts/promote-mascot-pose.mjs public/assets/images/mascot/_pending/${pose}-1.png ${pose} --validated
`);

// Fond opaque → détourage local suggéré (jamais imposé).
if (opaqueCandidates.length) {
  console.error(`Astuce (optionnelle) — ${opaqueCandidates.length} candidat(s) sans fond transparent :
${opaqueCandidates.map((f) => `  ${f}`).join("\n")}

Détourage local possible :
  pipx install rembg        # ou : pip install "rembg[cpu]"
  rembg i <candidat>.png <candidat>-cut.png

Rien n'est exécuté automatiquement : à toi de juger (relis la checklist de docs/MASCOT-POSES.md).`);
}
