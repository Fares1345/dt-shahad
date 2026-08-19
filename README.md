# DT. SHAHAD

Salla storefront theme for **DT. SHAHAD — Clinical Nutrition**, built on the
standard [Twilight Twig](https://docs.salla.dev/421929m0) architecture (Twig
views + Vite asset bundling). No React runtime.

Current version: **1.0.60**

## Requirements

- Node.js (LTS, 20+ recommended)
- pnpm

## Install

```bash
pnpm install
```

## Build

```bash
pnpm build
```

Compiles the styles into `public/app.css` and the scripts into
`public/assets/`. The theme references these outputs from Twig via
`{{ 'app.css' | asset }}` and `{{ 'assets/packages-card.js' | asset }}`.

## Watch / development

```bash
pnpm watch
```

Rebuilds assets continuously while editing SCSS/JS sources.

## Official Salla preview

Preview the theme against a real Salla store with the Salla CLI:

```bash
salla theme preview -E -s "<your-store-name>"
```

Replace `<your-store-name>` with your Salla CLI store alias (see
`salla store list`). The CLI starts a local asset server and opens a
draft preview of the theme on the Salla storefront. Assets render from
`localhost` during preview, so keep the CLI session running.

The theme is also built and published automatically by Salla from the
GitHub repository (`master` branch) — push a commit, then use the Salla
Theme Editor to publish it.

## Static visual preview (no Salla runtime)

```bash
node dev/serve.mjs
```

Then open `http://localhost:5000` (override with `PORT=...`).

`dev/index.html` is **auto-generated** from the real Twig sources
(`src/views/**/*.twig` + `locales/ar.json`) by `dev/render.mjs`
(twig.js + mock Salla data). The server re-renders it automatically
whenever a Twig or locale file changes — editing `header.twig` etc. is
reflected immediately after a page refresh. Render once without the
server: `pnpm dev:render`.

**Important:** this is a *visual-only* mockup. It has no live Salla store
data and no native Salla web components — those only work inside a real
Salla storefront (see "Official Salla preview" above). Do not treat it as
a substitute for runtime testing.

## Theme structure

```
src/views/
  layouts/master.twig        — base layout: RTL, fonts, app.css, hooks, header/footer
  layouts/customer.twig      — customer-area layout (profile sidebar + user menu)
  partials/                  — header.twig, footer.twig, logo.twig
  pages/
    index.twig               — homepage (dt-hero + dt-packages components)
    product/index.twig       — category / offers / search / tag listings
    product/single.twig      — product page
    cart.twig                — cart page (native salla cart components)
    blog/, customer/, page-single.twig, page.twig, category/single.twig
  components/home/
    dt-hero.twig             — hero section
    dt-packages.twig         — products grid (featured badge)

app/styles/                  — SCSS sources (Tailwind directives + design system)
app/scripts/packages-card.js — source for the products-card script
locales/                     — ar.json / en.json (translation keys, kept in sync)
twilight.json                — theme metadata, version, features, settings
```

The design system lives in `app/styles/04-components/dt-shahad.scss`
(DT. SHAHAD palette, header/hero/products/cart/customer styles).

## Important

The homepage packages section is driven by real store products. The
merchant selects which products appear through the **Salla Theme Editor**
(theme settings) — not by editing the theme source.

## Validation

- `pnpm build` — compiles and verifies the asset pipeline.
- Locale files must stay symmetric (`locales/ar.json` ↔ `locales/en.json`).
- Final runtime verification happens in the Salla preview (see above).

## Deployment

Push to the theme repository (`master`) — Salla builds and publishes the
theme automatically. No deploy configuration or credentials ship with
this theme.