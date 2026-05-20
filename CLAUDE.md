# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page Russian-language landing for a Minsk 3D-printing service ("toxeezy"). The page mirrors a Kufar listing: hero, photo slider, services, materials, the Qidi Q2 printer, and contact. There is no backend — leads go to the Kufar URL or a tel: link.

## Commands

- `npm run dev` — Vite dev server (default port 5173). HMR works for `index.html`, `src/style.css`, `src/main.ts`.
- `npm run build` — runs `tsc` (type-check only, `noEmit: true`) then `vite build` to `dist/`.
- `npm run preview` — serves the production build.
- `npx tsc --noEmit` — type-check without invoking Vite. Use this for quick verification — there is no test suite or linter.

## Architecture

Vanilla TS + Vite, no framework. The page is **HTML-first**: all content and structure live in `index.html` as static markup. `src/main.ts` only wires up runtime behavior; `src/style.css` carries the entire design system.

- **`index.html`** — the entire landing as semantic sections (`.hero`, `.slider-section`, `.services`, `.process`, `.materials`, `.contact`). Section anchors (`#услуги`, `#процесс`, `#материалы`, `#контакты`) are Cyrillic and referenced by `.site-nav` links. Russian copy is the source of truth here, not in TS.
- **`src/main.ts`** — does two things only: (1) initializes Swiper on `#slider`; (2) sets the footer year. Static config (Kufar URL, phone number) lives directly on the anchors in `index.html` — do not move it back into TS.
- **Slider** — [Swiper](https://swiperjs.com/) with the `Navigation`, `Pagination`, `Autoplay`, `Keyboard`, and `A11y` modules. Auto-advance 5.5 s with `pauseOnMouseEnter`, loop on, clickable bullet pagination, keyboard arrows in-viewport. Adding a slide = adding a `<figure class="slide swiper-slide">` inside `.swiper-wrapper` in `index.html`; no JS change required. Swiper's default theme is blue — `:root` overrides (`--swiper-theme-color`, `--swiper-pagination-bullet-inactive-color`, etc.) and selectors scoped under `.slider` keep the amber/dark design.
- **`src/style.css`** — CSS variables at `:root` define the design tokens (`--bg`, `--ink`, `--accent`, `--font-display`, `--font-body`, `--font-mono`). The aesthetic is intentional (dark warm base + amber `#ff5a1f` accent, Unbounded + IBM Plex Sans/Mono from Google Fonts loaded in `index.html`) — avoid generic refactors like swapping in Inter or a purple gradient.

## Assets

- **`public/images/`** — Vite serves this at site root (`/images/...`). The slider references `example-1.JPG` … `example-7.jpg` (note: mixed case extensions, kept literally). `printer.jpg` powers the Qidi block, `materials.jpg` the materials section header. `cover.png` is the Kufar ad artwork — currently unused on the landing.
- **Image orientation matters**: slides use `object-fit: contain` because the source photos are portrait phone shots. Switching to `cover` will crop them. The slide aspect ratio is `16/10` on desktop, `4/5` on mobile.
- **`src/assets/`** — leftover from the Vite scaffold (`hero.png`, `typescript.svg`, `vite.svg`), not referenced.

## TS config gotchas

`tsconfig.json` enables `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, and `erasableSyntaxOnly`. This means:
- Prefix unused params with `_` or omit them.
- Use `import type` for type-only imports.
- No `enum`, `namespace`, or other emit-bearing TS syntax.
