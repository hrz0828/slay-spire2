import { defaultLocale, type Locale } from '@/lib/i18n';

export function localizedPath(lang: Locale, route = '') {
  const cleanRoute = route.replace(/^\/+/, '');
  const suffix = cleanRoute ? `/${cleanRoute}` : '';

  return lang === defaultLocale ? suffix || '/' : `/${lang}${suffix}`;
}

export function localizedAlternates(route = '') {
  return {
    zh: localizedPath('zh', route),
    en: localizedPath('en', route),
  };
}
