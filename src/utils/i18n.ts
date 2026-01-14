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

// Explicitly define base URL logic to be robust in both dev and prod
const REPO_NAME = '/skilled-trade-manpower';
const BASE_URL = import.meta.env.PROD ? REPO_NAME : (import.meta.env.BASE_URL === '/' ? '/' : import.meta.env.BASE_URL);

function removeBase(path: string): string {
  // If we are in prod and path starts with repo name, strip it
  if (import.meta.env.PROD && path.startsWith(REPO_NAME)) {
    const stripped = path.slice(REPO_NAME.length);
    // Ensure we return a path starting with /
    return stripped.startsWith('/') ? stripped : (stripped === '' ? '/' : '/' + stripped);
  }
  
  if (path.startsWith(BASE_URL) && BASE_URL !== '/') {
    const stripped = path.slice(BASE_URL.length);
    return stripped.startsWith('/') ? stripped : (stripped === '' ? '/' : '/' + stripped);
  }
  
  return path;
}

export function getLangFromUrl(url: URL): Lang {
  const path = removeBase(url.pathname);
  const [, lang] = path.split('/');
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
  services: { en: '/services', es: '/es/servicios' },
  employers: { en: '/employers', es: '/es/empleadores' },
  ourProcess: { en: '/our-process', es: '/es/nuestro-proceso' },
  about: { en: '/about', es: '/es/nosotros' },
  contact: { en: '/contact', es: '/es/contacto' },
  privacy: { en: '/privacy', es: '/es/privacidad' },
  'industries/healthcare': { en: '/industries/healthcare', es: '/es/industrias/salud' },
  'industries/construction': { en: '/industries/construction', es: '/es/industrias/construccion' },
  'industries/technology': { en: '/industries/technology', es: '/es/industrias/tecnologia' },
  'industries/general-labor': { en: '/industries/general-labor', es: '/es/industrias/mano-de-obra-general' },
};

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = removeBase(url.pathname);
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
    const path = route ? route[lang] : routes.home[lang];
    
    // In production, always prepend the repo name if not present
    if (import.meta.env.PROD) {
       // Avoid double slash issues
       const prefix = REPO_NAME;
       const cleanPath = path === '/' ? '' : path;
       return `${prefix}${cleanPath}`;
    }
    
    if (BASE_URL === '/') return path;
    
    const fullPath = `${BASE_URL}${path === '/' ? '' : path}`;
    return fullPath.endsWith('/') && fullPath.length > 1 ? fullPath.slice(0, -1) : fullPath;
}
