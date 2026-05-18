export const locales = ['zh', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export async function getDictionary(locale: Locale) {
  switch (locale) {
    case 'en':
      return (await import('@/dictionaries/en.json')).default;
    case 'zh':
    default:
      return (await import('@/dictionaries/zh.json')).default;
  }
}
