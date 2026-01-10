// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://pedroagentesocial.github.io',
  base: '/skilled-trade-manpower',
  vite: {
    plugins: [tailwindcss()]
  }
});