/**
 * Golden Gab — helpers PNG sans dépendance (8 bits, RGBA/RGB).
 *
 * Partagés par `scripts/generate-mascot-pose.mjs` et
 * `scripts/promote-mascot-pose.mjs`. Aucun paquet ajouté (règle 29).
 *
 * Sur un PNG non supporté, les fonctions **lèvent une Error** : c'est à
 * l'appelant de décider comment l'afficher (chaque script a son `die()`).
 */

import { deflateSync, inflateSync } from "node:zlib";

/** En-tête PNG : dimensions + type de couleur, ou `null` si ce n'est pas un PNG. */
export function pngInfo(buf) {
  if (buf.length < 33 || buf.toString("ascii", 1, 4) !== "PNG") return null;
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
    bitDepth: buf[24],
    colorType: buf[25],
  };
}

/** Décode un PNG en `{ width, height, ch, px }` (px = canaux contigus). */
export function decodePng(buf) {
  if (pngInfo(buf) === null) throw new Error("ce fichier n'est pas un PNG.");
  let pos = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let interlace = 0;
  const idat = [];
  while (pos + 8 <= buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    pos += 12 + len;
  }
  if (bitDepth !== 8) throw new Error(`PNG ${bitDepth} bits non supporté (8 bits attendu).`);
  if (interlace !== 0) throw new Error("PNG entrelacé non supporté.");
  const ch = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 0 ? 1 : 0;
  if (!ch) throw new Error(`PNG colorType ${colorType} non supporté (2, 0 ou 6 attendu).`);
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * ch;
  const px = Buffer.alloc(width * height * ch);
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const ft = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
    const cur = Buffer.alloc(stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= ch ? cur[x - ch] : 0;
      const b = prev[x];
      const c = x >= ch ? prev[x - ch] : 0;
      let v = line[x];
      if (ft === 1) v += a;
      else if (ft === 2) v += b;
      else if (ft === 3) v += (a + b) >> 1;
      else if (ft === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[x] = v & 255;
    }
    cur.copy(px, y * stride);
    prev = cur;
  }
  return { width, height, ch, px };
}

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

/** Encode un buffer RGBA en PNG (filtre « None », RGBA 8 bits). */
export function encodePng(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/**
 * Boîte englobante du contenu non transparent (`null` si tout est transparent).
 * Sans canal alpha, l'image entière est considérée opaque.
 */
export function alphaBounds(img, threshold = 8) {
  const { width, height, ch, px } = img;
  if (ch !== 4) return { x0: 0, y0: 0, x1: width - 1, y1: height - 1 };
  let x0 = width;
  let y0 = height;
  let x1 = -1;
  let y1 = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (px[(y * width + x) * 4 + 3] < threshold) continue;
      if (x < x0) x0 = x;
      if (y < y0) y0 = y;
      if (x > x1) x1 = x;
      if (y > y1) y1 = y;
    }
  }
  return x1 < 0 ? null : { x0, y0, x1, y1 };
}

/**
 * Part de pixels réellement transparents (0 → 1).
 * `null` si l'image n'a pas de canal alpha : le fond ne peut pas être transparent.
 */
export function transparentRatio(img, threshold = 8) {
  const { width, height, ch, px } = img;
  if (ch !== 4) return null;
  let n = 0;
  for (let i = 3; i < px.length; i += 4) if (px[i] < threshold) n++;
  return n / (width * height);
}
