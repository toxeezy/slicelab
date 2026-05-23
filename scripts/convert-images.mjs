#!/usr/bin/env node
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join, parse, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const imagesDir = join(repoRoot, "public", "images");
const htmlPath = join(repoRoot, "index.html");
const QUALITY = 82;
const SOURCE_EXTS = new Set([".jpg", ".jpeg", ".png"]);

async function mtimeOrNull(path) {
  try {
    return (await stat(path)).mtimeMs;
  } catch {
    return null;
  }
}

async function main() {
  const entries = await readdir(imagesDir, { withFileTypes: true });
  const sources = entries
    .filter((e) => e.isFile() && SOURCE_EXTS.has(parse(e.name).ext.toLowerCase()))
    .map((e) => e.name);

  let converted = 0;
  let skipped = 0;
  let failed = 0;
  const convertedBasenames = new Set();

  for (const name of sources) {
    const { name: base } = parse(name);
    const src = join(imagesDir, name);
    const dst = join(imagesDir, `${base}.webp`);

    const [srcMtime, dstMtime] = await Promise.all([mtimeOrNull(src), mtimeOrNull(dst)]);
    if (dstMtime !== null && srcMtime !== null && dstMtime >= srcMtime) {
      skipped++;
      convertedBasenames.add(base);
      continue;
    }

    try {
      await sharp(src).webp({ quality: QUALITY }).toFile(dst);
      converted++;
      convertedBasenames.add(base);
      console.log(`  converted  ${name} -> ${base}.webp`);
    } catch (err) {
      failed++;
      console.error(`  FAILED     ${name}: ${err.message}`);
    }
  }

  console.log(`\nimages: ${converted} converted, ${skipped} up-to-date, ${failed} failed`);

  if (convertedBasenames.size > 0) {
    let html = await readFile(htmlPath, "utf8");
    const before = html;
    const extPattern = "(?:jpe?g|png)";
    let rewrites = 0;
    for (const base of convertedBasenames) {
      const escaped = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(`/images/${escaped}\\.${extPattern}`, "gi");
      html = html.replace(re, () => {
        rewrites++;
        return `/images/${base}.webp`;
      });
    }
    if (html !== before) {
      await writeFile(htmlPath, html);
      console.log(`index.html: rewrote ${rewrites} reference(s) to .webp`);
    } else {
      console.log("index.html: no references needed rewriting");
    }
  }

  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
