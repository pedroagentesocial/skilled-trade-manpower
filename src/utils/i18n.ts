import en from '../i18n/en.json';
import es from '../i18n/es.json';

export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
  en,
  es,
} as const;

export type Lang = keyof typeof languages;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = ui[lang];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        return key; // Fallback to key if not found
      }
    }
    return typeof value === 'string' ? value : key;
  }
}

// Route mapping for language switcher
// This maps internal route names to their paths in each language
export const routes = {
  home: { en: '/', es: '/es' },
  employers: { en: '/employers', es: '/es/empleadores' },
  jobSeekers: { en: '/job-seekers', es: '/es/candidatos' },
  services: { en: '/services', es: '/es/servicios' },
  industries: { en: '/industries', es: '/es/industrias' },
  'industries/healthcare': { en: '/industries/healthcare', es: '/es/industrias/salud' },
  'industries/construction': { en: '/industries/construction', es: '/es/industrias/construccion' },
  'industries/technology': { en: '/industries/technology', es: '/es/industrias/tecnologia' },
  'industries/general-labor': { en: '/industries/general-labor', es: '/es/industrias/labor-general' },
  about: { en: '/about', es: '/es/nosotros' },
  contact: { en: '/contact', es: '/es/contacto' },
  privacy: { en: '/privacy', es: '/es/privacidad' },
};

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = url.pathname;
  const currentLang = getLangFromUrl(url);

  // Normalize path (remove trailing slash unless it's root)
  const path = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  for (const [key, paths] of Object.entries(routes)) {
    if (paths[currentLang] === path) {
      return key;
    }
  }
  return undefined;
}

export function getTranslatedPath(routeName: string, lang: Lang): string {
    const route = routes[routeName as keyof typeof routes];
    return route ? route[lang] : routes.home[lang];
}
