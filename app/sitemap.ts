import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

const routes = ['', '/cards', '/relics', '/builds', '/tools'];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://slay-spire2-guide.pages.dev';

  return locales.flatMap(lang =>
    routes.map(route => ({
      url: `${siteUrl}/${lang}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          zh: `${siteUrl}/zh${route}`,
          en: `${siteUrl}/en${route}`,
        },
      },
    }))
  );
}
