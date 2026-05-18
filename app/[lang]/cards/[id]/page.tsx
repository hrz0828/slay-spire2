import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllCardIds, getCardById } from '@/lib/data/cards';
import { isLocale, locales, type Locale } from '@/lib/i18n';
import CardDetailView from './CardDetailView';

type Props = {
  params: Promise<{ lang: string; id: string }>;
};

export async function generateStaticParams() {
  const ids = await getAllCardIds();
  return locales.flatMap(lang => ids.map(id => ({ lang, id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) {
    return {};
  }

  const card = await getCardById(id);
  if (!card) {
    return {};
  }

  const zh = lang === 'zh';
  const name = zh ? card.nameZh : card.nameEn;
  const title = zh
    ? `《杀戮尖塔2》${name} 属性图鉴与流派搭配指南`
    : `${name} Guide & Builds - Slay the Spire 2 Wiki`;
  const description = zh
    ? `${name}卡牌详情：费用、类型、稀有度、升级前后描述与实战搭配建议。`
    : `${name} card details: energy cost, type, rarity, upgraded text, and build synergies.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/cards/${id}`,
      languages: {
        zh: `/zh/cards/${id}`,
        en: `/en/cards/${id}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/${lang}/cards/${id}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function CardDetailPage({ params }: Props) {
  const { lang, id } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const card = await getCardById(id);
  if (!card) {
    notFound();
  }

  return <CardDetailView lang={lang as Locale} card={card} />;
}
