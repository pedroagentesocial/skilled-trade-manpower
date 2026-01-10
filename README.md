# Skilled Trade Manpower Website

A bilingual (English + Spanish) staffing agency website built with Astro and Tailwind CSS.

## Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── CTASection.astro
│   ├── FAQ.astro
│   ├── Footer.astro
│   ├── Header.astro
│   ├── HeroSplit.astro
│   ├── IndustryCards.astro
│   ├── LeadForm.astro
│   ├── ProofBar.astro
│   ├── ServicesGrid.astro
│   └── TestimonialGrid.astro
├── i18n/                # Translation files
│   ├── en.json
│   └── es.json
├── layouts/             # Main layout with SEO & i18n logic
│   └── Layout.astro
├── pages/               # Route definitions
│   ├── index.astro      # English Home
│   ├── about.astro
│   ├── contact.astro
│   ├── employers.astro
│   ├── job-seekers.astro
│   ├── privacy.astro
│   ├── services.astro
│   ├── industries/      # English Industry Pages
│   └── es/              # Spanish Pages (Mirrors English structure)
│       ├── index.astro
│       ├── nosotros.astro
│       └── ...
├── styles/
│   └── global.css       # Tailwind directives
└── utils/
    └── i18n.ts          # Translation and routing utilities
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository (if applicable) or navigate to the project directory.
2. Install dependencies:

```bash
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321`.

### Build

Build the project for production:

```bash
npm run build
```

The static assets will be generated in the `dist/` directory.

## Internationalization (i18n)

- **Routing**: English is at the root `/`. Spanish is at `/es/`.
- **Translations**: All text content is stored in `src/i18n/en.json` and `src/i18n/es.json`.
- **Adding Content**: To add new text, update both JSON files and use the `t('key')` helper in components.

## Forms

The `LeadForm` component is set up for frontend use. To make it functional, integrate with a service like Netlify Forms or Formspree:

- **Netlify**: Add `netlify` attribute to the `<form>` tag in `src/components/LeadForm.astro`.
- **Formspree**: Set the `action` attribute to your Formspree endpoint.

## Deployment

This project is ready to be deployed to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.).

For Netlify, simply connect your repository and run `npm run build`. The output directory is `dist`.
