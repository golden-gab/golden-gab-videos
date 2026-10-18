// Transcrit un fichier audio (mp3/m4a/wav) en mots horodatés (secondes).
// Usage : node scripts/transcribe-audio.mjs <audio> <sortie.json>
// Modèle et langue : whisper-config.mjs. Sortie : [{ start, end, text }].
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  downloadWhisperModel,
  installWhisperCpp,
  toCaptions,
  transcribe,
} from "@remotion/install-whisper-cpp";
import {
  WHISPER_LANG,
  WHISPER_MODEL,
  WHISPER_PATH,
  WHISPER_VERSION,
} from "../whisper-config.mjs";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage : node scripts/transcribe-audio.mjs <audio> <sortie.json>");
  process.exit(1);
}

const tmpDir = path.join(process.cwd(), "out", "tmp");
mkdirSync(tmpDir, { recursive: true });
const wav = path.join(tmpDir, "transcribe-input.wav");
execSync(`npx remotion ffmpeg -i "${input}" -ar 16000 -ac 1 "${wav}" -y`, {
  stdio: ["ignore", "ignore", "inherit"],
});

if (!existsSync(WHISPER_PATH)) {
  await installWhisperCpp({ to: WHISPER_PATH, version: WHISPER_VERSION });
}
await downloadWhisperModel({ model: WHISPER_MODEL, folder: WHISPER_PATH });

const whisperCppOutput = await transcribe({
  inputPath: wav,
  model: WHISPER_MODEL,
  tokenLevelTimestamps: true,
  whisperPath: WHISPER_PATH,
  whisperCppVersion: WHISPER_VERSION,
  printOutput: false,
  translateToEnglish: false,
  language: WHISPER_LANG,
  splitOnWord: true,
});

const { captions } = toCaptions({ whisperCppOutput });
const words = captions.map((c) => ({
  start: Math.round(c.startMs) / 1000,
  end: Math.round(c.endMs) / 1000,
  text: c.text.trim(),
}));
mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(output, JSON.stringify(words, null, 2));
console.log(`${words.length} mots -> ${output}`);
