# dt-shahad

Salla storefront theme for **DT. SHAHAD — Clinical Nutrition** built on the
standard [Twilight Twig](https://docs.salla.dev/421929m0) architecture
(Twig views + Vite asset bundling). No React runtime.

## Architecture

```
src/views/
  layouts/master.twig      — base layout: RTL, theme colors, hooks, app.css, header/footer
  pages/index.twig         — homepage: renders home.dt-hero + home.dt-packages components
  partials/
    logo.twig              — inline BrandLogo SVG (bezier leaves, Arabic tagline)
    header.twig            — sticky blurred header: nav, cart badge, CSS-only mobile menu
    footer.twig            — brand block, social/contact links (store.social / store.contacts), nav
  components/home/
    dt-hero.twig           — hero section (editable via theme settings)
    dt-packages.twig       — 4 package cards, featured card with «الأكثر طلبًا» badge

app/styles/
  app.css                  — Tailwind directives + app.scss
  04-components/dt-shahad.scss — DT. Shahad design system (palette, header/hero/packages/footer)

app/components/            — legacy React source (reference only, not shipped)
```

The Vite build emits `public/app.css`, which `master.twig` loads via
`{{ 'app.css' | asset }}`.

## Quick start

```bash
pnpm install
pnpm build      # compiles CSS into public/app.css
```

Work on the theme in the [Salla Theme Editor](https://salla.sa) (store
552247687, theme 689128367): the repo is the theme source, Salla builds and
publishes it from GitHub.

## Scripts

| Script           | Description                          |
| ---------------- | ------------------------------------ |
| `pnpm build`     | Compile CSS via Vite → `public/app.css` |
| `pnpm dev`       | Start the Vite dev server (React sources only) |
| `pnpm typecheck` | TypeScript type checking (React sources) |
| `pnpm test`      | Run the test suite (Vitest)          |

## Migration status

| Area            | Status                                            |
| --------------- | ------------------------------------------------- |
| Layout/master   | ✅ Twig, RTL, theme colors, hooks                  |
| Header          | ✅ Twig partial (nav, search/cart/account, cart badge, mobile menu) |
| Footer          | ✅ Twig partial (social/contact from store data)   |
| Homepage hero   | ✅ Twig component (badge, title, subtitle, image, CTAs, stats) |
| Homepage packages | ✅ Twig component (static cards, featured badge) |
| Products loop   | ⏳ Next — bind `home.dt-packages.products` to real store products |
| Remaining sections (how it works, why, plan mockup) | ⏳ Next |
| React cleanup   | ⏳ Remove `app/` React sources once migration is complete |

## Deployment

Push to the theme repository — Salla builds and publishes the theme
automatically. No deploy configuration or credentials ship with this theme.