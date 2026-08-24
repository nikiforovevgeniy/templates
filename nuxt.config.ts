import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  experimental: {
    inlineRouteRules: true,
  },
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@pinia/colada-nuxt'],
  css: ['~/global/assets/css/main.css'],
  vite: {
    envPrefix: ['VITE_', 'NUXT_PUBLIC_'],
    plugins: [tailwindcss()],
  },
  dir: {
    middleware: 'global/middleware',
    assets: 'global/assets',
  },
  typescript: {
    nodeTsConfig: {
      include: [
        '../drizzle.config.ts',
        '../eslint.config.ts',
        '../eslint-boundaries.config.ts',
      ],
    },
  },
  hooks: {
    'app:resolve'(app) {
      app.mainComponent = resolve('./app/global/app.vue');
    },
  },
});
