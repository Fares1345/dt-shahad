// dev/serve.mjs — Local static preview server.
//
// 1. Renders dev/index.html from the real src/views/*.twig templates
//    (see dev/render.mjs) on startup and whenever a .twig or locale file
//    changes, so the preview never drifts out of sync with the source.
// 2. Serves the dev/ folder on http://localhost:5000 (override: PORT=...).
//
// Visual-only mockup: no live Salla data, no native Salla web components.
// For real runtime testing use `salla theme preview -E -s "<store>"`.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, VIEWS, ROOT } from './render.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 5000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
};

// Initial render (fails loudly so a broken twig is visible at startup).
try {
  render();
  console.log('Rendered dev/index.html from src/views/*.twig');
} catch (err) {
  console.error('Initial render failed:', err.message);
  process.exit(1);
}

// Re-render on any twig/locale change (debounced).
const watchDirs = [VIEWS, path.join(ROOT, 'locales')];
let timer = null;
for (const dir of watchDirs) {
  fs.watch(dir, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        render();
        console.log('[dev] re-rendered dev/index.html (source change detected)');
      } catch (err) {
        console.error('[dev] render failed:', err.message);
      }
    }, 120);
  });
}

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (urlPath === '/') urlPath = '/dev/index.html';
    const filePath = path.join(ROOT, urlPath);
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('404 Not Found');
        return;
      }
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(data);
    });
  })
  .listen(port, () => {
    console.log(`DT. SHAHAD static preview: http://localhost:${port}`);
  });