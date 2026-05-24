import type { MetadataRoute } from 'next';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { categoryRoutes, coreArticles } from '@/lib/data/content-pyramid';
import { infoPages } from '@/lib/data/site-info';
import { defaultLocale, type Locale } from '@/lib/i18n';

type RawCardFile = {
  card?: {
    key?: string;
  };
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sts2hub.com';
const LOCALES = ['zh', 'en'] as const;
const indexRoutes = ['cards', 'relics', 'builds', 'tools'] as const;
const CARDS_DIR = path.join(process.cwd(), 'cards');

function loadCardKeys(): string[] {
  let files: string[] = [];
  try {
    files = readdirSync(CARDS_DIR);
  } catch {
    return [];
  }

  const keys = new Set<string>();

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    try {
      const fullPath = path.join(CARDS_DIR, file);
      const raw = readFileSync(fullPath, 'utf8');
      const parsed = JSON.parse(raw) as RawCardFile;
      const key = parsed.card?.key;
      if (typeof key === 'string' && key.trim().length > 0) {
        keys.add(key.trim());
      }
    } catch {
      // Ignore malformed files.
    }
  }

  return Array.from(keys);
}

function publicUrl(lang: Locale, routePath: string) {
  if (lang === defaultLocale) {
    return `${SITE_URL}${routePath || '/'}`;
  }

  return `${SITE_URL}/${lang}${routePath}`;
}

function localizedAlternates(routePath: string) {
  return {
    languages: {
      zh: publicUrl('zh', routePath),
      en: publicUrl('en', routePath),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const cardKeys = loadCardKeys();

  const categoryEntries: MetadataRoute.Sitemap = categoryRoutes.flatMap(route =>
    LOCALES.map(lang => ({
      url: publicUrl(lang, `/${route}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: localizedAlternates(`/${route}`),
    })),
  );

  const articleEntries: MetadataRoute.Sitemap = coreArticles.flatMap(article =>
    LOCALES.map(lang => ({
      url: publicUrl(lang, `/articles/${article.slug}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: article.priority <= 10 ? 0.9 : 0.8,
      alternates: localizedAlternates(`/articles/${article.slug}`),
    })),
  );

  const homeEntries: MetadataRoute.Sitemap = LOCALES.map(lang => ({
    url: publicUrl(lang, ''),
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0,
    alternates: localizedAlternates(''),
  }));

  const indexEntries: MetadataRoute.Sitemap = indexRoutes.flatMap(route =>
    LOCALES.map(lang => ({
      url: publicUrl(lang, `/${route}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: localizedAlternates(`/${route}`),
    })),
  );

  const infoEntries: MetadataRoute.Sitemap = infoPages.flatMap(page =>
    LOCALES.map(lang => ({
      url: publicUrl(lang, `/${page.slug}`),
      lastModified: new Date(page.updatedAt),
      changeFrequency: 'yearly',
      priority: page.slug === 'privacy-policy' || page.slug === 'contact' ? 0.7 : 0.6,
      alternates: localizedAlternates(`/${page.slug}`),
    })),
  );

  const cardEntries: MetadataRoute.Sitemap = cardKeys.flatMap(key =>
    LOCALES.map(lang => ({
      url: publicUrl(lang, `/cards/${key}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: localizedAlternates(`/cards/${key}`),
    })),
  );

  return [
    ...homeEntries,
    ...categoryEntries,
    ...articleEntries,
    ...indexEntries,
    ...infoEntries,
    ...cardEntries,
  ];
}
