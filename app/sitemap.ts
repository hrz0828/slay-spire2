import type { MetadataRoute } from 'next';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

type Card = { id: string };
type Article = { slug: string };

const SITE_URL = 'https://sts2hub.com';
const LOCALES = ['zh', 'en'] as const;

const HOME_PRIORITY = 1.0;
const ARTICLE_PRIORITY = 0.9;
const CARD_PRIORITY = 0.8;

const HOME_FREQ: MetadataRoute.Sitemap[number]['changeFrequency'] = 'daily';
const ARTICLE_FREQ: MetadataRoute.Sitemap[number]['changeFrequency'] = 'daily';
const CARD_FREQ: MetadataRoute.Sitemap[number]['changeFrequency'] = 'weekly';

async function readJsonArray<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function buildLocalizedAlternates(routePath: string) {
  return {
    languages: {
      zh: `${SITE_URL}/zh${routePath}`,
      en: `${SITE_URL}/en${routePath}`,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const cardsPath = path.join(process.cwd(), 'public', 'data', 'cards.json');
  const articlesPath = path.join(process.cwd(), 'public', 'data', 'articles.json');

  const [cards, articles] = await Promise.all([
    readJsonArray<Card>(cardsPath),
    readJsonArray<Article>(articlesPath),
  ]);

  const homeUrls: MetadataRoute.Sitemap = LOCALES.map(lang => ({
    url: `${SITE_URL}/${lang}`,
    lastModified: now,
    changeFrequency: HOME_FREQ,
    priority: HOME_PRIORITY,
    alternates: buildLocalizedAlternates(''),
  }));

  const cardUrls: MetadataRoute.Sitemap = cards
    .filter(card => typeof card.id === 'string' && card.id.trim().length > 0)
    .flatMap(card =>
      LOCALES.map(lang => ({
        url: `${SITE_URL}/${lang}/cards/${card.id}`,
        lastModified: now,
        changeFrequency: CARD_FREQ,
        priority: CARD_PRIORITY,
        alternates: buildLocalizedAlternates(`/cards/${card.id}`),
      })),
    );

  const articleUrls: MetadataRoute.Sitemap = articles
    .filter(article => typeof article.slug === 'string' && article.slug.trim().length > 0)
    .flatMap(article =>
      LOCALES.map(lang => ({
        url: `${SITE_URL}/${lang}/articles/${article.slug}`,
        lastModified: now,
        changeFrequency: ARTICLE_FREQ,
        priority: ARTICLE_PRIORITY,
        alternates: buildLocalizedAlternates(`/articles/${article.slug}`),
      })),
    );

  return [...homeUrls, ...articleUrls, ...cardUrls];
}
