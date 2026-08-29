// Re-encodes JPEGs under public/ with mozjpeg (via sharp) to keep the repo
// free of oversized, uncompressed image exports. Run after adding new
// images: npm run optimize-images
//
// Only overwrites a file when the mozjpeg re-encode is meaningfully smaller,
// so running it repeatedly doesn't keep degrading already-optimized images.

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const quality = Number(process.argv[2]) || 80;
const minSavingsPct = 5; // skip files that don't shrink by at least this much

function findJpegs(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...findJpegs(full));
    } else if (/\.(jpe?g)$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function replaceWithRetry(full, tmp, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    try {
      fs.rmSync(full, { force: true });
      fs.renameSync(tmp, full);
      return;
    } catch (e) {
      if (i === attempts - 1) throw e;
      await sleep(300);
    }
  }
}

async function main() {
  const files = findJpegs(publicDir);
  let totalBefore = 0;
  let totalAfter = 0;
  let changed = 0;

  for (const full of files) {
    const rel = path.relative(publicDir, full);
    const before = fs.statSync(full).size;
    const tmp = full + '.tmp';

    await sharp(full).jpeg({ quality, mozjpeg: true, progressive: true }).toFile(tmp);
    const after = fs.statSync(tmp).size;
    const savingsPct = 100 - (after / before) * 100;

    if (savingsPct >= minSavingsPct) {
      await replaceWithRetry(full, tmp);
      totalBefore += before;
      totalAfter += after;
      changed++;
      console.log(`${rel}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${savingsPct.toFixed(0)}% smaller)`);
    } else {
      fs.rmSync(tmp, { force: true });
    }
  }

  console.log('---');
  if (changed === 0) {
    console.log('Nothing to do - all images already optimized.');
  } else {
    console.log(`${changed} file(s) optimized. Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
