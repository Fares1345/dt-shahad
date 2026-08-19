// dev/render.mjs — Static Twig preview generator for the DT. SHAHAD theme.
//
// Renders the REAL Twig sources (src/views/**/*.twig) into dev/index.html
// using twig.js, with mock data standing in for the Salla runtime
// (store/theme/cart objects, trans()/link()/is_page() functions and the
// asset/cdn/number filters).
//
// IMPORTANT: this is a VISUAL-ONLY MOCKUP. It has no live Salla data and no
// native Salla web components. Use `salla theme preview -E -s "<store>"`
// for real runtime testing.
//
// The preprocessor below maps Twilight-specific syntax that only exists in
// a real Salla runtime onto plain Twig:
//   - {% hook 'x' %}                 → removed (empty in a static preview)
//   - {% component 'home.dt-hero' %} → {% include 'components/home/dt-hero.twig' %}
//   - {% component x with {component: x} %}
//                                   → {% include 'components/' ~ x.name ~ '.twig' with x %}
//   - dot-notation paths             → filesystem paths against src/views
//     ('layouts.master', 'partials.logo')

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import twig from 'twig';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..');
export const VIEWS = path.join(ROOT, 'src', 'views');
const BUILD = path.join(__dirname, '.twig-build');
const OUT_FILE = path.join(__dirname, 'index.html');
const LOCALE_FILE = path.join(ROOT, 'locales', 'ar.json');

twig.cache(false);

// ── Mock data (representative values for a static preview) ────────────────

function shade(hex, factor, towardsWhite) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex));
  if (!m) return hex;
  const mix = towardsWhite ? 255 : 0;
  const out = m[1].match(/../g).map((h) => {
    const v = parseInt(h, 16);
    return Math.round(v + (mix - v) * factor);
  });
  return '#' + out.map((v) => v.toString(16).padStart(2, '0')).join('');
}

const PRIMARY = '#5A6340';

// Mirrors the twilight.json defaults so the mockup shows the theme's
// shipped content (badge/title/subtitle/image for dt-hero, products
// config for dt-packages).
const homeComponents = [
  {
    name: 'home/dt-hero',
    badge: 'خطط غذائية مخصصة ٠١٠٠٪',
    title: 'تغذية مصممة\nلحياتك',
    subtitle:
      'خطط غذائية مدروسة تساعدك على بناء أسلوب حياة أكثر توازنًا، بطريقة تناسب احتياجاتك وروتينك اليومي.',
    image: '/assets/images/hero.jpg',
  },
  {
    name: 'home/dt-packages',
    title: '٤ باقات، وخطة تناسبك',
    subtitle:
      'اختر المدة التي تناسب أهدافك، وابدأ رحلتك مع خطة تغذية علاجية مصممة خصيصًا لك.',
    products: { source: 'product_ids', source_value: [1, 2, 3, 4] },
    featured: { source_value: [2] },
  },
];

function buildMock() {
  return {
    language: { code: 'ar' },
    page: { slug: 'index', title: 'الرئيسية' },
    store: {
      name: 'DT. SHAHAD',
      url: '/',
      products_count: 24,
      contacts: {
        email: 'hello@dtshahad.com',
        mobile: '0550000000',
        phone: '0550000000',
        whatsapp: '966550000000',
        telegram: '',
      },
      social: {
        instagram: 'dtshahad',
        tiktok: 'dtshahad',
        youtube: 'dtshahad',
        facebook: 'dtshahad',
        whatsapp: '966550000000',
        twitter: '',
        snapchat: '',
      },
    },
    cart: { items_count: 0 },
    theme: {
      is_rtl: true,
      name: 'dt-shahad',
      color: {
        primary: PRIMARY,
        reverse_text: '#FFFFFF',
        text: '#000000',
        is_dark: false,
        darker: (a) => shade(PRIMARY, a, false),
        lighter: (a) => shade(PRIMARY, a, true),
      },
      components(name) {
        return name === 'home' ? homeComponents : [];
      },
    },
  };
}

// ── Salla runtime shims (filters / functions) ─────────────────────────────

let locale = {};
let langCode = 'ar';
function loadLocale() {
  try {
    locale = JSON.parse(fs.readFileSync(LOCALE_FILE, 'utf8'));
  } catch {
    locale = {};
  }
}

twig.extendFilter('asset', (value) => {
  if (typeof value !== 'string') return value;
  if (/^(https?:)?\/\//.test(value) || value.startsWith('data:')) return value;
  return '../public/' + value;
});

// sallaicons.css lives on the Salla CDN only — the static preview uses
// inline SVGs instead, so the empty href is stripped in post-processing.
twig.extendFilter('cdn', () => '');

twig.extendFilter('number', (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return value;
  const s = String(n);
  return langCode === 'ar' ? s.replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]) : s;
});

twig.extendFunction('trans', (key) =>
  String(key)
    .split('.')
    .reduce((o, k) => (o && typeof o === 'object' ? o[k] : undefined), locale) ?? key
);

twig.extendFunction('link', (pathName) => pathName ?? '/');

twig.extendFunction('is_page', (type) => type === 'index');

// ── Preprocessing (Twilight-only syntax → plain Twig) ─────────────────────

function preprocess(source) {
  return source
    .replace(/\{%\s*hook\s+[^%]*?%\}/g, '')
    .replace(
      /\{%\s*component\s+([A-Za-z0-9_.-]+)\s+with\s+\{component:\s*component\}\s*%\}/g,
      "{% include 'components/' ~ component.name ~ '.twig' with component %}"
    )
    .replace(/\{%\s*component\s+'([A-Za-z0-9_.-]+)'\s*%\}/g, (m, name) => {
      return "{% include 'components/" + name.replace(/\./g, '/') + ".twig' %}";
    })
    .replace(/(\{%\s*(?:extends|include)\s+["'])([A-Za-z0-9_.-]+)(["'])/g, (m, pre, p, post) => {
      if (p.includes('.') && !p.includes('/') && !p.endsWith('.twig')) {
        return pre + p.replace(/\./g, '/') + '.twig' + post;
      }
      return m;
    });
}

function buildTree() {
  fs.rmSync(BUILD, { recursive: true, force: true });
  fs.mkdirSync(BUILD, { recursive: true });
  const walk = (dir, rel) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, rel + '/' + entry.name);
      } else if (entry.name.endsWith('.twig')) {
        const out = path.join(BUILD, rel, entry.name);
        fs.mkdirSync(path.dirname(out), { recursive: true });
        fs.writeFileSync(out, preprocess(fs.readFileSync(full, 'utf8')), 'utf8');
      }
    }
  };
  walk(VIEWS, '');
}

// ── Output extras (static preview only — NOT part of the theme) ───────────

const HEAD_EXTRAS = `
    <!-- Static-preview only: fonts + tweaks (NOT part of the theme). -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Cairo:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Cinzel:wght@500;600&family=Noto+Serif+Arabic:wght@500&display=swap" rel="stylesheet">
    <style>
        body.dt-shahad { font-family: 'Tajawal', sans-serif; }
        .dt-logo--white { filter: brightness(0) invert(1); opacity: 0.94; }
        .dt-preview-note {
            position: fixed; bottom: 12px; inset-inline-start: 12px; z-index: 9999;
            background: rgba(24, 24, 24, 0.82); color: #fff; font: 11px/1.5 'Tajawal', sans-serif;
            padding: 6px 10px; border-radius: 999px; pointer-events: none; direction: rtl;
        }
    </style>`;

const BODY_EXTRAS = `
    <div class="dt-preview-note">معاينة ثابتة — بدون بيانات حية أو مكونات Salla الأصلية</div>
    <script src="preview-extras.js"></script>`;

// ── Render ────────────────────────────────────────────────────────────────

export function render() {
  loadLocale();
  langCode = buildMock().language.code;
  buildTree();
  const template = twig.twig({
    path: path.join(BUILD, 'pages', 'index.twig'),
    base: BUILD,
    async: false,
    rethrow: true,
  });
  let html = template.render(buildMock());
  // Static-preview cleanups
  html = html.replace(/<link rel="stylesheet" href="">/g, '');
  html = html.replace(/src="\/assets\//g, 'src="../public/assets/');
  html = html.replace('</head>', HEAD_EXTRAS + '\n</head>');
  html = html.replace('</body>', BODY_EXTRAS + '\n</body>');
  html =
    '<!-- ═══ GENERATED by dev/render.mjs from src/views/*.twig — DO NOT EDIT MANUALLY ═══ -->\n' +
    html;
  fs.writeFileSync(OUT_FILE, html, 'utf8');
  return html;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    render();
    console.log('dev/index.html rendered from src/views/*.twig');
  } catch (err) {
    console.error('Render failed:', err.message);
    process.exit(1);
  }
}