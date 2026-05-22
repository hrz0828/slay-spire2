import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategory } from '@/lib/data/content-pyramid';
import { isLocale, type Locale } from '@/lib/i18n';
import { CategoryLanding } from '../_components/CategoryLanding';

const categoryId = 'characters';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) {
    notFound();
  }

  const lang = rawLang as Locale;
  const category = getCategory(categoryId);

  return {
    title: category.title[lang],
    description: category.description[lang],
  };
}

export default async function CharactersPage({ params }: Props) {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) {
    notFound();
  }

  return <CategoryLanding categoryId={categoryId} lang={rawLang} />;
}
