import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getInfoPage } from '@/lib/data/site-info';
import { isLocale, type Locale } from '@/lib/i18n';
import { localizedAlternates, localizedPath } from '@/lib/routes';
import { InfoPageView } from '../_components/InfoPageView';

const slug = 'privacy-policy';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) notFound();

  const page = getInfoPage(slug);
  if (!page) notFound();

  const lang = rawLang as Locale;

  return {
    title: page.title[lang],
    description: page.description[lang],
    alternates: {
      canonical: localizedPath(lang, slug),
      languages: localizedAlternates(slug),
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) notFound();

  const page = getInfoPage(slug);
  if (!page) notFound();

  return <InfoPageView lang={rawLang} page={page} />;
}
