import type { MetadataRoute } from 'next';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { categoryRoutes, coreArticles } from '@/lib/data/content-pyramid';

type RawCardFile = {
  card?: {
    key?: string;
  };
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://slay-spire2-guide.pages.dev';
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

function localizedAlternates(routePath: string) {
  return {
    languages: {
      zh: `${SITE_URL}/zh${routePath}`,
      en: `${SITE_URL}/en${routePath}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const cardKeys = loadCardKeys();

  const categoryEntries: MetadataRoute.Sitemap = categoryRoutes.flatMap(route =>
    LOCALES.map(lang => ({
      url: `${SITE_URL}/${lang}/${route}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: localizedAlternates(`/${route}`),
    })),
  );

  const articleEntries: MetadataRoute.Sitemap = coreArticles.flatMap(article =>
    LOCALES.map(lang => ({
      url: `${SITE_URL}/${lang}/articles/${article.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: article.priority <= 10 ? 0.9 : 0.8,
      alternates: localizedAlternates(`/articles/${article.slug}`),
    })),
  );

  const homeEntries: MetadataRoute.Sitemap = LOCALES.map(lang => ({
    url: `${SITE_URL}/${lang}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0,
    alternates: localizedAlternates(''),
  }));

  const indexEntries: MetadataRoute.Sitemap = indexRoutes.flatMap(route =>
    LOCALES.map(lang => ({
      url: `${SITE_URL}/${lang}/${route}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: localizedAlternates(`/${route}`),
    })),
  );

  const cardEntries: MetadataRoute.Sitemap = cardKeys.flatMap(key =>
    LOCALES.map(lang => ({
      url: `${SITE_URL}/${lang}/cards/${key}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: localizedAlternates(`/cards/${key}`),
    })),
  );

  return [...homeEntries, ...categoryEntries, ...articleEntries, ...indexEntries, ...cardEntries];
}
