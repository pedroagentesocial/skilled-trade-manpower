// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// The site deploys to two hosts:
//  - Vercel:       served at the domain root (https://skilled-trade-manpower.vercel.app/)
//  - GitHub Pages: served under a project subpath (/skilled-trade-manpower/)
// Vercel sets the VERCEL env var during the build, so we switch `base`/`site`
// accordingly. With the wrong base, asset (_astro/*.css) and link URLs 404 and
// the page renders unstyled.
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';

// https://astro.build/config
export default defineConfig({
  site: isVercel ? 'https://skilled-trade-manpower.vercel.app' : 'https://pedroagentesocial.github.io',
  base: isVercel ? '/' : '/skilled-trade-manpower',
  vite: {
    plugins: [tailwindcss()]
  }
});
