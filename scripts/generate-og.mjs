import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '..', 'public');

const BG = '#0c0a08';
const ACCENT = '#ff5a1f';
const ACCENT_SOFT = 'rgba(255,90,31,0.14)';
const INK = '#f5ece0';
const INK_DIM = '#a89a85';
const INK_FAINT = '#8a7d6a';
const LINE = 'rgba(255,220,170,0.08)';

const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="${LINE}" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow1" cx="85%" cy="0%" r="60%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0%" cy="100%" r="55%">
      <stop offset="0%" stop-color="#ffb347" stop-opacity="0.06"/>
      <stop offset="70%" stop-color="#ffb347" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- corner ticks -->
  <g stroke="${ACCENT}" stroke-width="3" fill="none">
    <path d="M 48 48 L 48 96 M 48 48 L 96 48"/>
    <path d="M 1152 48 L 1152 96 M 1152 48 L 1104 48"/>
    <path d="M 48 582 L 48 534 M 48 582 L 96 582"/>
    <path d="M 1152 582 L 1152 534 M 1152 582 L 1104 582"/>
  </g>

  <!-- top meta line -->
  <text x="96" y="118" font-family="'Courier New', monospace" font-size="20" fill="${INK_FAINT}" letter-spacing="6">// 3D-PRINT · MINSK · BY</text>

  <!-- hexagon mark -->
  <g transform="translate(96, 200) scale(5.2)" stroke="${ACCENT}" stroke-width="1.8" fill="none" stroke-linejoin="round">
    <path d="M4 10 L16 4 L28 10 L28 22 L16 28 L4 22 Z"/>
    <path d="M4 10 L16 16 L28 10"/>
    <path d="M16 16 L16 28"/>
  </g>

  <!-- SLICELAB wordmark -->
  <text x="290" y="280" font-family="'Arial Black', 'Helvetica', sans-serif" font-size="120" font-weight="900" fill="${INK}" letter-spacing="-4">SLICELAB</text>

  <!-- tagline -->
  <text x="290" y="345" font-family="'Arial', sans-serif" font-size="38" font-weight="400" fill="${INK_DIM}">3D-печать на заказ · Минск</text>

  <!-- divider -->
  <line x1="96" y1="430" x2="1104" y2="430" stroke="${LINE}" stroke-width="1"/>

  <!-- materials row -->
  <g font-family="'Courier New', monospace" font-size="22" letter-spacing="3">
    <text x="96" y="490" fill="${ACCENT}">PLA</text>
    <text x="200" y="490" fill="${INK_DIM}">·</text>
    <text x="232" y="490" fill="${ACCENT}">PETG</text>
    <text x="354" y="490" fill="${INK_DIM}">·</text>
    <text x="386" y="490" fill="${ACCENT}">ABS</text>
    <text x="488" y="490" fill="${INK_DIM}">·</text>
    <text x="520" y="490" fill="${ACCENT}">ASA</text>
    <text x="622" y="490" fill="${INK_DIM}">·</text>
    <text x="654" y="490" fill="${ACCENT}">NYLON</text>
    <text x="804" y="490" fill="${INK_DIM}">·</text>
    <text x="836" y="490" fill="${ACCENT}">TPU</text>
  </g>

  <!-- bottom line -->
  <text x="96" y="565" font-family="'Arial', sans-serif" font-size="22" fill="${INK_FAINT}">Шестерни · корпуса · крепления · прототипы · автопластик</text>

  <!-- right tag -->
  <g transform="translate(960, 540)">
    <rect x="0" y="0" width="144" height="44" rx="6" fill="${ACCENT_SOFT}" stroke="${ACCENT}" stroke-width="1"/>
    <text x="72" y="29" text-anchor="middle" font-family="'Courier New', monospace" font-size="16" fill="${ACCENT}" letter-spacing="2">slicelab.by</text>
  </g>
</svg>`;

const appleSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <defs>
    <radialGradient id="g" cx="80%" cy="0%" r="80%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.25"/>
      <stop offset="70%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="180" height="180" rx="36" fill="${BG}"/>
  <rect width="180" height="180" rx="36" fill="url(#g)"/>
  <g transform="translate(36, 33) scale(3.4)" stroke="${ACCENT}" stroke-width="2.2" fill="none" stroke-linejoin="round">
    <path d="M4 10 L16 4 L28 10 L28 22 L16 28 L4 22 Z"/>
    <path d="M4 10 L16 16 L28 10"/>
    <path d="M16 16 L16 28"/>
  </g>
</svg>`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="${BG}"/>
  <g stroke="${ACCENT}" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <path d="M5 10.5 L16 5 L27 10.5 L27 21.5 L16 27 L5 21.5 Z"/>
    <path d="M5 10.5 L16 16 L27 10.5"/>
    <path d="M16 16 L16 27"/>
  </g>
</svg>
`;

async function main() {
  await sharp(Buffer.from(ogSvg)).png().toFile(resolve(PUBLIC, 'og-image.png'));
  console.log('Wrote public/og-image.png (1200x630)');

  await sharp(Buffer.from(appleSvg)).png().toFile(resolve(PUBLIC, 'apple-touch-icon.png'));
  console.log('Wrote public/apple-touch-icon.png (180x180)');

  await writeFile(resolve(PUBLIC, 'favicon.svg'), faviconSvg);
  console.log('Wrote public/favicon.svg');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
