import { defineConfig } from 'vite';
import path from 'path';

const rootDir = import.meta.dirname;

// Standard Twilight (Twig) theme build: Vite only bundles the theme's CSS and
// JS assets for Twig consumption ({{ 'app.css' | asset }}). No React SSR, no
// framework plugin — the Twig renderer is owned by the Salla CLI / Twilight.
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(rootDir, './'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler', silenceDeprecations: ['import'] } as any,
    },
  },
  publicDir: false,
  server: {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Private-Network': 'true',
    },
  },
  build: {
    outDir: 'public',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        app: path.resolve(rootDir, 'app/styles/entry.ts'),
        'packages-card': path.resolve(rootDir, 'app/scripts/packages-card.js'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: '[name][extname]',
      },
    },
  },
});